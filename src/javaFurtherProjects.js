export const javaFurtherProjects = [
  {
    "id": "java-word-report",
    "course": "java",
    "language": "Java",
    "title": "Java: Textanalyse mit Wortstatistik",
    "description": "Analysiere eine UTF-8-Textdatei: Wörter erkennen, Schreibweisen vereinheitlichen, Häufigkeiten zählen und sortiert ausgeben.",
    "files": {
      "WordReport.java": "import java.nio.charset.StandardCharsets;\nimport java.nio.file.*;\nimport java.text.Normalizer;\nimport java.util.*;\nimport java.util.regex.Pattern;\n\npublic class WordReport {\n    static final Pattern WORT = Pattern.compile(\"\\\\p{L}+\");\n    static SortedMap<String,Integer> zaehlen(String text) {\n        String normal = Normalizer.normalize(text, Normalizer.Form.NFC).toLowerCase(Locale.ROOT);\n        var result = new TreeMap<String,Integer>();\n        var matcher = WORT.matcher(normal);\n        while (matcher.find()) result.merge(matcher.group(), 1, Integer::sum);\n        return result;\n    }\n    static void pruefen(boolean ok, String name) {\n        if (!ok) throw new AssertionError(name);\n    }\n    static void tests() {\n        pruefen(zaehlen(\"\").isEmpty(), \"Leerer Text\");\n        pruefen(zaehlen(\"123 !\").isEmpty(), \"Keine Buchstaben\");\n        pruefen(zaehlen(\"Java java SQL\").equals(Map.of(\"java\", 2, \"sql\", 1)), \"Schreibweise und Häufigkeit\");\n        pruefen(zaehlen(\"Äpfel äpfel\").equals(Map.of(\"äpfel\", 2)), \"Unicode\");\n        pruefen(zaehlen(\"Cafe\\u0301 Café\").equals(Map.of(\"café\", 2)), \"Normalisierung\");\n        pruefen(new ArrayList<>(zaehlen(\"z a b\").keySet()).equals(List.of(\"a\", \"b\", \"z\")), \"Schlüsselordnung\");\n        System.out.println(\"6 Texttests bestanden\");\n    }\n    public static void main(String[] args) throws Exception {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        if (args.length != 1) { System.err.println(\"Start: java WordReport.java sample.txt | test\"); System.exit(1); }\n        Path p = Path.of(args[0]);\n        // Diese Lernversion liest den ganzen Text; große Dateien brauchen Streaming.\n        if (!Files.isRegularFile(p) || Files.size(p) > 1_000_000) {\n            System.err.println(\"Eine reguläre Textdatei bis 1 MB wird benötigt.\"); System.exit(1);\n        }\n        String text = Files.readString(p, StandardCharsets.UTF_8);\n        var result = zaehlen(text);\n        int anzahl = result.values().stream().mapToInt(Integer::intValue).sum();\n        System.out.println(\"Wörter: \" + anzahl + \" · Unterschiedlich: \" + result.size());\n        for (var entry : result.entrySet()) System.out.println(entry.getKey() + \": \" + entry.getValue());\n    }\n}\n",
      "sample.txt": "Java lernen macht Spaß. Java und SQL helfen beim Bauen.\nÄpfel und äpfel sind hier dieselben Wörter.\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Das Projekt läuft lokal im Terminal.",
      "java WordReport.java test ausführen.",
      "java WordReport.java sample.txt analysiert die enthaltene Beispieldatei.",
      "Eigene UTF-8-Dateien bis 1 MB verwenden. Die Wortregel zählt Folgen von Unicode-Buchstaben; Bindestriche und Zahlen trennen."
    ],
    "concepts": [
      {
        "name": "Pattern und Matcher.find",
        "explanation": "Erkennt Buchstabenfolgen statt ein festes Trennzeichen vorauszusetzen."
      },
      {
        "name": "Normalizer / Locale.ROOT",
        "explanation": "Vereinheitlicht hier kombinierte Akzente und eine sprachunabhängige Kleinschreibung."
      },
      {
        "name": "TreeMap / merge",
        "explanation": "Zählt Wörter und liefert eine technische, natürliche Schlüsselordnung; keine zugesicherte deutsche Wörterbuchsortierung."
      }
    ],
    "ideas": [
      "Die fünf häufigsten Wörter nach Häufigkeit und anschließend nach Namen ausgeben.",
      "Eine Stopwortliste mit Set und einem eigenen Test ergänzen.",
      "Die Datei mit BufferedReader zeilenweise verarbeiten, statt den gesamten Text einzulesen."
    ],
    "lessonIds": [
      "java-regex-find",
      "java-regex-unicode",
      "java-tree-map",
      "java-map-default",
      "java-reader-loop"
    ]
  },
  {
    "id": "java-mini-shop",
    "course": "java",
    "language": "Java",
    "title": "Java: Mini-Shop mit Warenkorb",
    "description": "Verbinde Records, Listen, Centbeträge, Rabattregeln und Tests zu einer kleinen Abrechnungslogik.",
    "files": {
      "Basket.java": "import java.math.BigDecimal;\nimport java.util.*;\n\npublic class Basket {\n    record Artikel(String name, long cent) {\n        Artikel {\n            if (name == null || name.isBlank() || cent < 0) throw new IllegalArgumentException(\"Artikel ungültig\");\n        }\n    }\n    record Posten(Artikel artikel, int anzahl) {\n        Posten {\n            Objects.requireNonNull(artikel, \"Artikel fehlt\");\n            if (anzahl <= 0) throw new IllegalArgumentException(\"Anzahl muss positiv sein\");\n        }\n    }\n    static long gesamt(List<Posten> posten, int rabattProzent) {\n        if (rabattProzent < 0 || rabattProzent > 100) throw new IllegalArgumentException(\"Rabatt 0 bis 100\");\n        long summe = 0;\n        for (Posten p : posten) summe = Math.addExact(summe, Math.multiplyExact(p.artikel().cent(), p.anzahl()));\n        if (rabattProzent == 0) return summe;\n        // Festgelegte Lernregel: Endpreis auf ganze Cent abrunden.\n        return Math.multiplyExact(summe, 100 - rabattProzent) / 100;\n    }\n    static String euro(long cent) { return BigDecimal.valueOf(cent, 2).toPlainString() + \" EUR\"; }\n    static void gleich(long ist, long soll) { if (ist != soll) throw new AssertionError(\"Erwartet \" + soll + \", erhalten \" + ist); }\n    static void fehler(Runnable code, Class<? extends RuntimeException> typ) {\n        try { code.run(); }\n        catch (RuntimeException e) { if (typ.isInstance(e)) return; throw new AssertionError(\"Falscher Fehler\", e); }\n        throw new AssertionError(\"Fehler fehlt\");\n    }\n    static void tests() {\n        var waren = List.of(new Posten(new Artikel(\"Heft\", 125), 2), new Posten(new Artikel(\"Stift\", 400), 1));\n        gleich(gesamt(List.of(), 0), 0);\n        gleich(gesamt(waren, 0), 650);\n        gleich(gesamt(waren, 10), 585);\n        gleich(gesamt(waren, 100), 0);\n        gleich(gesamt(List.of(new Posten(new Artikel(\"Cent-Test\", 101), 1)), 10), 90);\n        fehler(() -> new Posten(new Artikel(\"Heft\", 125), 0), IllegalArgumentException.class);\n        fehler(() -> gesamt(waren, 101), IllegalArgumentException.class);\n        fehler(() -> new Artikel(\"Fehler\", -1), IllegalArgumentException.class);\n        fehler(() -> gesamt(List.of(new Posten(new Artikel(\"Überlauf\", Long.MAX_VALUE), 2)), 0), ArithmeticException.class);\n        if (!euro(585).equals(\"5.85 EUR\")) throw new AssertionError(\"Euroformat\");\n        System.out.println(\"10 Warenkorbtests bestanden\");\n    }\n    public static void main(String[] args) {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        var waren = List.of(new Posten(new Artikel(\"Heft\", 125), 2), new Posten(new Artikel(\"Stift\", 400), 1));\n        for (Posten p : waren) System.out.println(p.anzahl() + \" x \" + p.artikel().name() + \" à \" + euro(p.artikel().cent()));\n        System.out.println(\"Ohne Rabatt: \" + euro(gesamt(waren, 0)));\n        System.out.println(\"Mit 10 Prozent Rabatt: \" + euro(gesamt(waren, 10)));\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Das Projekt läuft lokal im Terminal.",
      "java Basket.java test ausführen.",
      "java Basket.java zeigt den Beispielwarenkorb und seine beiden Preise.",
      "Die Lernregel rundet den rabattierten Endpreis auf ganze Cent ab. Passe Regeln nur zusammen mit den entsprechenden Tests an."
    ],
    "concepts": [
      {
        "name": "Cent als long",
        "explanation": "Vermeidet binäre Nachkommabeträge bei der Kernberechnung; der Wertebereich bleibt begrenzt."
      },
      {
        "name": "Records mit Validierung",
        "explanation": "Verhindert negative Preise, fehlende Artikel und unzulässige Anzahlen."
      },
      {
        "name": "Math.addExact / multiplyExact",
        "explanation": "Meldet Überlauf ausdrücklich."
      },
      {
        "name": "BigDecimal.valueOf(cent, 2)",
        "explanation": "Formatiert den centgenauen Betrag als Dezimalzahl, ohne eine double-Zwischenrechnung."
      }
    ],
    "ideas": [
      "Gutscheine nach einem Code aus einer Map auswählen.",
      "Portokosten und eine Freigrenze mit Grenztests ergänzen.",
      "Eine Scanner-Eingabe oder Swing-Oberfläche ergänzen, die gesamt wiederverwendet."
    ],
    "lessonIds": [
      "java-record",
      "java-exact",
      "java-decimal",
      "java-list-of",
      "java-test-boundary",
      "java-test-exception"
    ]
  }
];
