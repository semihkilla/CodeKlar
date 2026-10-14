export const javaNextProjects = [
  {
    "id": "java-mini-api",
    "course": "java",
    "language": "Java",
    "title": "Java: Kleine HTTP-API",
    "description": "Baue mit der JDK-Standardbibliothek einen lokalen Server mit Gesundheitsprüfung, geprüfter Addition und echten HTTP-Tests.",
    "files": {
      "Api.java": "import com.sun.net.httpserver.HttpServer;\nimport java.net.*;\nimport java.net.http.*;\nimport java.nio.charset.StandardCharsets;\nimport java.util.*;\nimport java.util.concurrent.*;\n\npublic class Api {\n    record Antwort(int status, String text) {}\n    static Map<String,String> parameter(String query) {\n        if (query == null || query.isEmpty()) throw new IllegalArgumentException(\"Parameter fehlen\");\n        var out = new HashMap<String,String>();\n        for (String teil : query.split(\"&\", -1)) {\n            int gleich = teil.indexOf('=');\n            if (gleich < 1) throw new IllegalArgumentException(\"Parameterformat\");\n            String key = URLDecoder.decode(teil.substring(0, gleich), StandardCharsets.UTF_8);\n            String value = URLDecoder.decode(teil.substring(gleich + 1), StandardCharsets.UTF_8);\n            if (out.putIfAbsent(key, value) != null) throw new IllegalArgumentException(\"Doppelter Parameter\");\n        }\n        return out;\n    }\n    static Antwort antwort(String methode, String pfad, String query) {\n        if (!methode.equals(\"GET\")) return new Antwort(405, \"Nur GET erlaubt\\n\");\n        if (pfad.equals(\"/health\")) return new Antwort(200, \"ok\\n\");\n        if (!pfad.equals(\"/sum\")) return new Antwort(404, \"Nicht gefunden\\n\");\n        try {\n            var p = parameter(query);\n            if (!p.keySet().equals(Set.of(\"a\", \"b\"))) throw new IllegalArgumentException(\"a und b benötigt\");\n            long a = Long.parseLong(p.get(\"a\")), b = Long.parseLong(p.get(\"b\"));\n            return new Antwort(200, Math.addExact(a, b) + \"\\n\");\n        } catch (IllegalArgumentException | ArithmeticException e) {\n            return new Antwort(400, \"Ungültige Zahlen oder Parameter\\n\");\n        }\n    }\n    static HttpServer starten(int port, ExecutorService pool) throws Exception {\n        HttpServer server = HttpServer.create(new InetSocketAddress(\"127.0.0.1\", port), 0);\n        server.setExecutor(pool);\n        server.createContext(\"/\", exchange -> {\n            try {\n                var uri = exchange.getRequestURI();\n                Antwort a = antwort(exchange.getRequestMethod(), uri.getPath(), uri.getRawQuery());\n                exchange.getResponseHeaders().set(\"Content-Type\", \"text/plain; charset=utf-8\");\n                if (a.status() == 405) exchange.getResponseHeaders().set(\"Allow\", \"GET\");\n                byte[] bytes = a.text().getBytes(StandardCharsets.UTF_8);\n                if (exchange.getRequestMethod().equals(\"HEAD\")) {\n                    exchange.sendResponseHeaders(a.status(), -1);\n                } else {\n                    exchange.sendResponseHeaders(a.status(), bytes.length);\n                    try (var out = exchange.getResponseBody()) { out.write(bytes); }\n                }\n            } finally { exchange.close(); }\n        });\n        server.start(); return server;\n    }\n    static void pruefen(boolean ok, String name) { if (!ok) throw new AssertionError(name); }\n    static void tests() throws Exception {\n        pruefen(antwort(\"GET\", \"/sum\", \"a=2&b=3\").equals(new Antwort(200, \"5\\n\")), \"Addition\");\n        pruefen(antwort(\"GET\", \"/sum\", \"a=x&b=3\").status() == 400, \"Zahlfehler\");\n        pruefen(antwort(\"GET\", \"/sum\", \"a=1&a=2&b=3\").status() == 400, \"Doppelte Schlüssel\");\n        pruefen(antwort(\"GET\", \"/sum\", \"a=1&b=2&c=3\").status() == 400, \"Unbekannte Parameter\");\n        pruefen(antwort(\"GET\", \"/sum\", \"a=9223372036854775807&b=1\").status() == 400, \"Überlauf\");\n        pruefen(antwort(\"POST\", \"/sum\", \"a=1&b=2\").status() == 405, \"Methode\");\n        pruefen(antwort(\"GET\", \"/sum/extra\", \"a=1&b=2\").status() == 404, \"Exakter Pfad\");\n        var pool = Executors.newFixedThreadPool(2); HttpServer server = null;\n        try {\n            server = starten(0, pool);\n            String base = \"http://127.0.0.1:\" + server.getAddress().getPort();\n            HttpClient client = HttpClient.newBuilder().connectTimeout(java.time.Duration.ofSeconds(3)).build();\n            var health = client.send(HttpRequest.newBuilder(URI.create(base + \"/health\")).GET().build(), HttpResponse.BodyHandlers.ofString());\n            pruefen(health.statusCode() == 200 && health.body().equals(\"ok\\n\"), \"HTTP health\");\n            var sum = client.send(HttpRequest.newBuilder(URI.create(base + \"/sum?a=7&b=-2\")).GET().build(), HttpResponse.BodyHandlers.ofString());\n            pruefen(sum.statusCode() == 200 && sum.body().equals(\"5\\n\"), \"HTTP sum\");\n            var bad = client.send(HttpRequest.newBuilder(URI.create(base + \"/sum?a=x&b=2\")).GET().build(), HttpResponse.BodyHandlers.ofString());\n            pruefen(bad.statusCode() == 400, \"HTTP Fehler\");\n            var post = client.send(HttpRequest.newBuilder(URI.create(base + \"/health\")).POST(HttpRequest.BodyPublishers.noBody()).build(), HttpResponse.BodyHandlers.ofString());\n            pruefen(post.statusCode() == 405 && post.headers().firstValue(\"Allow\").orElse(\"\").equals(\"GET\"), \"HTTP Methode\");\n            System.out.println(\"11 API-Tests bestanden\");\n        } finally {\n            if (server != null) server.stop(0);\n            pool.shutdownNow(); pool.awaitTermination(3, TimeUnit.SECONDS);\n        }\n    }\n    public static void main(String[] args) throws Exception {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        int port = args.length == 0 ? 8080 : Integer.parseInt(args[0]);\n        if (port < 0 || port > 65535) throw new IllegalArgumentException(\"Port 0 bis 65535\");\n        var pool = Executors.newFixedThreadPool(2);\n        HttpServer server;\n        try { server = starten(port, pool); }\n        catch (Exception e) { pool.shutdownNow(); throw e; }\n        Runtime.getRuntime().addShutdownHook(new Thread(() -> { server.stop(0); pool.shutdownNow(); }));\n        System.out.println(\"Lokale API: http://127.0.0.1:\" + server.getAddress().getPort());\n        System.out.println(\"/health und /sum?a=2&b=3 · Strg+C beendet den Server.\");\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Das Projekt wird lokal im Terminal ausgeführt.",
      "java Api.java test führt sieben Logik- und vier echte lokale HTTP-Prüfungen aus.",
      "java Api.java startet auf Port 8080; java Api.java 8787 wählt einen anderen Port.",
      "Im Browser http://127.0.0.1:8080/health und http://127.0.0.1:8080/sum?a=2&b=3 öffnen.",
      "Der Lernserver bindet nur an 127.0.0.1. Strg+C beendet ihn. Die Antwort ist einfacher UTF-8-Text."
    ],
    "concepts": [
      {
        "name": "HttpServer / HttpClient",
        "explanation": "Verbindet echte eingehende HTTP-Anfragen mit eigenen Java-Methoden; die Tests nutzen einen freien lokalen Port."
      },
      {
        "name": "Antwort als Record",
        "explanation": "Trennt fachliche Pfad-/Parameterlogik von HTTP-Ausgabe und Ressourcen."
      },
      {
        "name": "Status 200, 400, 404, 405",
        "explanation": "Unterscheidet Erfolg, ungültige Eingabe, unbekannten Pfad und nicht erlaubte Methode."
      },
      {
        "name": "URLDecoder und geprüfte Addition",
        "explanation": "Dekodiert Parameter und verhindert doppelte Schlüssel sowie unbemerkten Zahlenüberlauf."
      }
    ],
    "ideas": [
      "Eine Multiplikationsroute mit eigenen Grenztests ergänzen.",
      "Antworten über eine richtige JSON-Bibliothek serialisieren.",
      "Eine kleine Browseroberfläche ergänzen und bewusst die gleiche Origin verwenden."
    ],
    "lessonIds": [
      "java-http-request",
      "java-uri",
      "java-map-null",
      "java-exact",
      "java-record",
      "java-executor"
    ]
  },
  {
    "id": "java-route-planner",
    "course": "java",
    "language": "Java",
    "title": "Java: Routenplaner mit Dijkstra",
    "description": "Berechne den günstigsten Weg durch ein gerichtetes Netz, rekonstruiere die Route und teste unerreichbare sowie ungültige Fälle.",
    "files": {
      "RoutePlanner.java": "import java.util.*;\n\npublic class RoutePlanner {\n    record Kante(int ziel, long kosten) {}\n    record Kandidat(int knoten, long distanz) {}\n    record Route(long kosten, List<Integer> knoten) {}\n    static Optional<Route> kuerzeste(List<List<Kante>> graph, int start, int ziel) {\n        int n = graph.size();\n        if (start < 0 || ziel < 0 || start >= n || ziel >= n) throw new IllegalArgumentException(\"Knoten ungültig\");\n        for (List<Kante> liste : graph) for (Kante k : liste)\n            if (k.ziel() < 0 || k.ziel() >= n || k.kosten() < 0) throw new IllegalArgumentException(\"Kante ungültig\");\n        long[] d = new long[n]; int[] vorher = new int[n]; boolean[] erreichbar = new boolean[n];\n        Arrays.fill(vorher, -1); d[start] = 0; erreichbar[start] = true;\n        var queue = new PriorityQueue<Kandidat>(Comparator.comparingLong(Kandidat::distanz).thenComparingInt(Kandidat::knoten));\n        queue.offer(new Kandidat(start, 0));\n        while (!queue.isEmpty()) {\n            Kandidat aktuell = queue.poll(); int u = aktuell.knoten();\n            if (aktuell.distanz() != d[u]) continue; // Veralteter Kandidat.\n            if (u == ziel) break;\n            for (Kante k : graph.get(u)) {\n                long neu = Math.addExact(d[u], k.kosten());\n                if (!erreichbar[k.ziel()] || neu < d[k.ziel()]) {\n                    d[k.ziel()] = neu; erreichbar[k.ziel()] = true; vorher[k.ziel()] = u;\n                    queue.offer(new Kandidat(k.ziel(), neu));\n                }\n            }\n        }\n        if (!erreichbar[ziel]) return Optional.empty();\n        var weg = new ArrayList<Integer>();\n        for (int u = ziel; u != -1; u = vorher[u]) weg.add(u);\n        Collections.reverse(weg);\n        return Optional.of(new Route(d[ziel], List.copyOf(weg)));\n    }\n    static List<List<Kante>> beispiel() {\n        return List.of(List.of(new Kante(1, 4), new Kante(2, 1)), List.of(new Kante(3, 1)),\n            List.of(new Kante(1, 1), new Kante(3, 5)), List.of(), List.of());\n    }\n    static void pruefen(boolean ok, String name) { if (!ok) throw new AssertionError(name); }\n    static void fehler(Runnable code, Class<? extends RuntimeException> typ) {\n        try { code.run(); }\n        catch (RuntimeException e) { if (typ.isInstance(e)) return; throw new AssertionError(\"Falscher Fehler\", e); }\n        throw new AssertionError(\"Fehler fehlt\");\n    }\n    static void tests() {\n        var g = beispiel();\n        pruefen(kuerzeste(g, 0, 3).orElseThrow().equals(new Route(3, List.of(0, 2, 1, 3))), \"Route und Kosten\");\n        pruefen(kuerzeste(g, 0, 4).isEmpty(), \"Unerreichbar\");\n        pruefen(kuerzeste(g, 2, 2).orElseThrow().equals(new Route(0, List.of(2))), \"Start ist Ziel\");\n        pruefen(kuerzeste(List.of(List.of(new Kante(1, 0)), List.of()), 0, 1).orElseThrow().kosten() == 0, \"Nullkosten\");\n        fehler(() -> kuerzeste(g, -1, 2), IllegalArgumentException.class);\n        fehler(() -> kuerzeste(List.of(List.of(new Kante(0, -1))), 0, 0), IllegalArgumentException.class);\n        fehler(() -> kuerzeste(List.of(List.of(new Kante(2, 1))), 0, 0), IllegalArgumentException.class);\n        var gross = List.of(List.of(new Kante(1, Long.MAX_VALUE)), List.of(new Kante(2, 1)), List.<Kante>of());\n        fehler(() -> kuerzeste(gross, 0, 2), ArithmeticException.class);\n        System.out.println(\"8 Routentests bestanden\");\n    }\n    public static void main(String[] args) {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        int ziel = args.length == 0 ? 3 : Integer.parseInt(args[0]);\n        var route = kuerzeste(beispiel(), 0, ziel);\n        if (route.isEmpty()) System.out.println(\"Kein Weg\");\n        else { System.out.println(\"Kosten: \" + route.get().kosten()); System.out.println(\"Route: \" + route.get().knoten()); }\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Das Projekt wird lokal im Terminal ausgeführt.",
      "java RoutePlanner.java test ausführen.",
      "java RoutePlanner.java zeigt die günstigste Route von Knoten 0 nach 3.",
      "java RoutePlanner.java 4 zeigt den unerreichbaren Zielknoten.",
      "Die Kosten sind nichtnegative Ganzzahlen. Bei mehreren gleich günstigen Routen genügt eine davon; sehr große Zwischensummen werden als Überlauf gemeldet."
    ],
    "concepts": [
      {
        "name": "PriorityQueue",
        "explanation": "Entnimmt den Kandidaten mit der kleinsten bislang gefundenen Distanz."
      },
      {
        "name": "Veraltete Kandidaten überspringen",
        "explanation": "Wenn eine bessere Distanz gefunden wurde, darf ein älterer Queueeintrag keine unnötige Arbeit auslösen."
      },
      {
        "name": "Vorgänger rekonstruieren",
        "explanation": "Die gespeicherten Vorgänger bauen am Ende den eigentlichen Weg rückwärts auf."
      },
      {
        "name": "Komplexität",
        "explanation": "Diese Lazy-Queue-Variante benötigt höchstens O(V + E) gespeicherte Graph-/Queueinformationen und O((V + E) log(E + 2)) Zeit als allgemeine obere Schranke; bei einfachen Graphen üblich O((V + E) log V)."
      }
    ],
    "ideas": [
      "Knotennamen aus einer Map statt nur Nummern anzeigen.",
      "Mit eigenen Tests mehrere gleich günstige Wege prüfen, ohne genau einen Weg zu verlangen.",
      "Ein Dateiformat für das Netz festlegen und vor der Berechnung vollständig validieren."
    ],
    "lessonIds": [
      "java-dijkstra-matrix",
      "java-priority-queue",
      "java-comparator-chain",
      "java-copy-of-snapshot",
      "java-optional-or-throw",
      "java-exact"
    ]
  }
];
