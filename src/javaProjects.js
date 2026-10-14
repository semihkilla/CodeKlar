import { javaConceptProjects } from './javaConceptProjects.js';
import { javaDataProjects } from './javaDataProjects.js';
import { javaFurtherProjects } from './javaFurtherProjects.js';
import { javaNextProjects } from './javaNextProjects.js';
const originalJavaProjects = [
  {
    "id": "java-calculator",
    "course": "java",
    "language": "Java",
    "title": "Java: Terminal-Taschenrechner",
    "description": "Baue einen Ganzzahl-Taschenrechner mit Eingabeprüfung, Überlauf-Erkennung und eigenen Tests.",
    "files": {
      "Calculator.java": "import java.util.Scanner;\n\npublic class Calculator {\n    static long berechnen(long a, String operator, long b) {\n        return switch (operator) {\n            case \"+\" -> Math.addExact(a, b);\n            case \"-\" -> Math.subtractExact(a, b);\n            case \"*\" -> Math.multiplyExact(a, b);\n            case \"/\" -> {\n                if (b == 0) throw new ArithmeticException(\"Division durch null\");\n                if (a == Long.MIN_VALUE && b == -1) throw new ArithmeticException(\"Überlauf\");\n                yield a / b; // Ganzzahldivision, zum Beispiel 5 / 2 = 2.\n            }\n            case \"%\" -> {\n                if (b == 0) throw new ArithmeticException(\"Rest bei Division durch null\");\n                yield a % b;\n            }\n            default -> throw new IllegalArgumentException(\"Unbekannter Operator\");\n        };\n    }\n    static void gleich(long ist, long soll) {\n        if (ist != soll) throw new AssertionError(\"Erwartet \" + soll + \", erhalten \" + ist);\n    }\n    static void fehler(Runnable code, Class<? extends RuntimeException> typ) {\n        try { code.run(); }\n        catch (RuntimeException e) {\n            if (typ.isInstance(e)) return;\n            throw new AssertionError(\"Falscher Fehlertyp\", e);\n        }\n        throw new AssertionError(\"Erwartete Ausnahme fehlt\");\n    }\n    static void tests() {\n        gleich(berechnen(2, \"+\", 3), 5);\n        gleich(berechnen(2, \"-\", 5), -3);\n        gleich(berechnen(-2, \"*\", 3), -6);\n        gleich(berechnen(5, \"/\", 2), 2);\n        gleich(berechnen(-7, \"%\", 3), -1);\n        fehler(() -> berechnen(1, \"/\", 0), ArithmeticException.class);\n        fehler(() -> berechnen(Long.MAX_VALUE, \"+\", 1), ArithmeticException.class);\n        fehler(() -> berechnen(Long.MIN_VALUE, \"/\", -1), ArithmeticException.class);\n        fehler(() -> berechnen(1, \"?\", 2), IllegalArgumentException.class);\n        System.out.println(\"9 Rechnertests bestanden\");\n    }\n    public static void main(String[] args) {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        System.out.println(\"Ganzzahl-Rechner: 12 + 3; Operatoren + - * / %. q beendet.\");\n        try (Scanner input = new Scanner(System.in)) {\n            while (input.hasNextLine()) {\n                String zeile = input.nextLine().strip();\n                if (zeile.equalsIgnoreCase(\"q\")) break;\n                try {\n                    String[] teile = zeile.split(\"\\\\s+\");\n                    if (teile.length != 3) throw new IllegalArgumentException(\"Format: Zahl Operator Zahl\");\n                    long a = Long.parseLong(teile[0]), b = Long.parseLong(teile[2]);\n                    System.out.println(berechnen(a, teile[1], b));\n                } catch (RuntimeException e) {\n                    System.out.println(\"Ungültige Rechnung: \" + e.getMessage());\n                }\n            }\n        }\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Die Programme laufen lokal im Terminal, nicht in der Browser-Vorschau.",
      "java Calculator.java test ausführen: Die neun Tests müssen bestehen.",
      "java Calculator.java starten und beispielsweise 12 + 3, 5 / 2 und 1 / 0 eingeben.",
      "q oder das Ende der Eingabe beendet die Sitzung."
    ],
    "concepts": [
      {
        "name": "switch / yield",
        "explanation": "Wählt die Rechenoperation; yield liefert das Ergebnis eines mehrzeiligen switch-Zweigs."
      },
      {
        "name": "Math.addExact",
        "explanation": "Meldet Überlauf, statt einen falschen Integerwert still zu akzeptieren."
      },
      {
        "name": "Logik getrennt vom Terminal",
        "explanation": "berechnen ist ohne Benutzereingabe testbar. Die main-Methode kümmert sich um das Lesen und Anzeigen."
      }
    ],
    "ideas": [
      "Eine BigDecimal-Variante für Dezimalzahlen mit ausdrücklicher Rundungsregel bauen.",
      "Neue Operatoren ergänzen und zuerst Grenzfalltests schreiben.",
      "Eine Berechnungshistorie in einer Datei speichern."
    ],
    "lessonIds": [
      "java-switch",
      "java-exact",
      "java-parse-int",
      "java-test-exception"
    ]
  },
  {
    "id": "java-tic-tac-toe",
    "course": "java",
    "language": "Java",
    "title": "Java: Tic-Tac-Toe",
    "description": "Ein Spiel für zwei Personen am selben Terminal: Spielfeld, Zugprüfung, Sieg, Unentschieden und Tests.",
    "files": {
      "TicTacToe.java": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class TicTacToe {\n    static char[] neu() { char[] b = new char[9]; Arrays.fill(b, ' '); return b; }\n    static boolean setzen(char[] b, int index, char spieler) {\n        if (index < 0 || index >= 9 || (spieler != 'X' && spieler != 'O') || b[index] != ' ') return false;\n        b[index] = spieler; return true;\n    }\n    static char gewinner(char[] b) {\n        int[][] linien = {{0,1,2},{3,4,5},{6,7,8},{0,3,6},{1,4,7},{2,5,8},{0,4,8},{2,4,6}};\n        for (int[] l : linien)\n            if (b[l[0]] != ' ' && b[l[0]] == b[l[1]] && b[l[1]] == b[l[2]]) return b[l[0]];\n        return ' ';\n    }\n    static boolean voll(char[] b) { for (char c : b) if (c == ' ') return false; return true; }\n    static void anzeigen(char[] b) {\n        for (int i = 0; i < 9; i++) {\n            System.out.print(b[i] == ' ' ? Integer.toString(i + 1) : Character.toString(b[i]));\n            System.out.print(i % 3 == 2 ? \"\\n\" : \" | \");\n        }\n    }\n    static void pruefen(boolean bedingung, String name) {\n        if (!bedingung) throw new AssertionError(name);\n    }\n    static void tests() {\n        char[] b = neu();\n        pruefen(gewinner(b) == ' ' && !voll(b), \"Leeres Brett\");\n        pruefen(!setzen(b, -1, 'X') && !setzen(b, 9, 'X'), \"Indexgrenzen\");\n        pruefen(!setzen(b, 0, '?'), \"Spieler prüfen\");\n        pruefen(setzen(b, 0, 'X') && !setzen(b, 0, 'O'), \"Belegtes Feld\");\n        pruefen(gewinner(new char[]{'X','X','X',' ',' ',' ',' ',' ',' '}) == 'X', \"Zeile\");\n        pruefen(gewinner(new char[]{'O',' ',' ','O',' ',' ','O',' ',' '}) == 'O', \"Spalte\");\n        pruefen(gewinner(new char[]{'X',' ',' ',' ','X',' ',' ',' ','X'}) == 'X', \"Diagonale\");\n        char[] unentschieden = {'X','O','X','X','O','O','O','X','X'};\n        pruefen(voll(unentschieden) && gewinner(unentschieden) == ' ', \"Unentschieden\");\n        System.out.println(\"8 Spieltests bestanden\");\n    }\n    public static void main(String[] args) {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        char[] b = neu(); char spieler = 'X';\n        System.out.println(\"Tic-Tac-Toe: Feld 1 bis 9 wählen. q beendet.\");\n        try (Scanner input = new Scanner(System.in)) {\n            while (true) {\n                anzeigen(b);\n                System.out.println(spieler + \" ist dran:\");\n                if (!input.hasNextLine()) break;\n                String zeile = input.nextLine().strip();\n                if (zeile.equalsIgnoreCase(\"q\")) break;\n                int index;\n                try { index = Integer.parseInt(zeile) - 1; }\n                catch (NumberFormatException e) { System.out.println(\"Bitte eine Feldnummer eingeben.\"); continue; }\n                if (!setzen(b, index, spieler)) { System.out.println(\"Feld ungültig oder belegt.\"); continue; }\n                char sieger = gewinner(b);\n                if (sieger != ' ') { anzeigen(b); System.out.println(sieger + \" gewinnt!\"); break; }\n                if (voll(b)) { anzeigen(b); System.out.println(\"Unentschieden!\"); break; }\n                spieler = spieler == 'X' ? 'O' : 'X';\n            }\n        }\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Die Programme laufen lokal im Terminal, nicht in der Browser-Vorschau.",
      "java TicTacToe.java test ausführen.",
      "java TicTacToe.java starten. Zwei Personen wechseln sich mit Feldnummern 1 bis 9 ab.",
      "Eine belegte oder ungültige Position verbraucht keinen Zug. q beendet das Spiel."
    ],
    "concepts": [
      {
        "name": "char[]",
        "explanation": "Speichert das Brett; die Anzeige verwendet für freie Plätze die Nummern 1 bis 9."
      },
      {
        "name": "Spielregeln als Methoden",
        "explanation": "setzen, gewinner und voll sind unabhängig von Scanner und Konsole testbar."
      },
      {
        "name": "Zustand wechseln",
        "explanation": "Nur ein gültiger Zug ändert den nächsten Spieler."
      }
    ],
    "ideas": [
      "Einen Computergegner bauen: zuerst zufällig, danach mit Minimax.",
      "Den Spielstand und eine Zugliste als Datei speichern.",
      "Eine Swing-Oberfläche ergänzen, die dieselben Spielregeln verwendet."
    ],
    "lessonIds": [
      "java-array-index",
      "java-matrix",
      "java-ternary",
      "java-test-boundary"
    ]
  },
  {
    "id": "java-notebook",
    "course": "java",
    "language": "Java",
    "title": "Java: Aufgaben-Notizbuch",
    "description": "Ein Terminal-Werkzeug mit dauerhafter Speicherung, IDs, erledigten Aufgaben und Datei-Rundlauf-Tests.",
    "files": {
      "Notebook.java": "import java.io.IOException;\nimport java.nio.charset.StandardCharsets;\nimport java.nio.file.*;\nimport java.util.*;\n\npublic class Notebook {\n    record Notiz(int id, String text, boolean erledigt) {}\n    static List<Notiz> laden(Path pfad) throws IOException {\n        if (!Files.exists(pfad)) return new ArrayList<>();\n        var out = new ArrayList<Notiz>(); var ids = new HashSet<Integer>();\n        int zeile = 0;\n        for (String line : Files.readAllLines(pfad, StandardCharsets.UTF_8)) {\n            zeile++;\n            try {\n                String[] teile = line.split(\"\\t\", -1);\n                if (teile.length != 3) throw new IllegalArgumentException(\"Drei Spalten erwartet\");\n                int id = Integer.parseInt(teile[0]);\n                if (id <= 0 || !ids.add(id)) throw new IllegalArgumentException(\"Ungültige oder doppelte ID\");\n                if (!teile[1].equals(\"true\") && !teile[1].equals(\"false\")) throw new IllegalArgumentException(\"Status ungültig\");\n                String text = new String(Base64.getDecoder().decode(teile[2]), StandardCharsets.UTF_8);\n                if (text.isBlank()) throw new IllegalArgumentException(\"Leerer Text\");\n                out.add(new Notiz(id, text, Boolean.parseBoolean(teile[1])));\n            } catch (IllegalArgumentException e) { throw new IOException(\"Datenfehler in Zeile \" + zeile, e); }\n        }\n        return out;\n    }\n    static void speichern(Path pfad, List<Notiz> notizen) throws IOException {\n        Path ziel = pfad.toAbsolutePath();\n        Files.createDirectories(ziel.getParent());\n        Path tmp = Files.createTempFile(ziel.getParent(), \"codeklar-\", \".tmp\");\n        try {\n            var zeilen = new ArrayList<String>();\n            for (Notiz n : notizen) {\n                String encoded = Base64.getEncoder().encodeToString(n.text().getBytes(StandardCharsets.UTF_8));\n                zeilen.add(n.id() + \"\\t\" + n.erledigt() + \"\\t\" + encoded);\n            }\n            Files.write(tmp, zeilen, StandardCharsets.UTF_8);\n            try { Files.move(tmp, ziel, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING); }\n            catch (AtomicMoveNotSupportedException e) { Files.move(tmp, ziel, StandardCopyOption.REPLACE_EXISTING); }\n        } finally { Files.deleteIfExists(tmp); }\n    }\n    static int neueId(List<Notiz> notizen) {\n        return Math.addExact(notizen.stream().mapToInt(Notiz::id).max().orElse(0), 1);\n    }\n    static void tests() throws IOException {\n        Path root = Files.createTempDirectory(\"notebook-test-\"); Path p = root.resolve(\"notizen.tsv\");\n        try {\n            if (!laden(p).isEmpty()) throw new AssertionError(\"Neue Datei muss leer sein\");\n            var daten = List.of(new Notiz(1, \"Grüße\\tmit\\nUmbruch\", false), new Notiz(2, \"Testen\", true));\n            speichern(p, daten);\n            if (!laden(p).equals(daten)) throw new AssertionError(\"Rundlauf verändert Daten\");\n            if (neueId(daten) != 3) throw new AssertionError(\"Nächste ID\");\n            Files.writeString(p, \"kaputte Datei\");\n            try { laden(p); throw new AssertionError(\"Ungültige Daten akzeptiert\"); }\n            catch (IOException erwartet) { /* Dieser Fehler ist Teil des Tests. */ }\n            System.out.println(\"4 Dateitests bestanden\");\n        } finally { Files.deleteIfExists(p); Files.deleteIfExists(root); }\n    }\n    public static void main(String[] args) {\n        try {\n            if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n            Path pfad = Path.of(\"notizen.tsv\");\n            if (args.length == 0) { System.out.println(\"Befehle: list | add Text | done ID | test\"); return; }\n            List<Notiz> daten = laden(pfad);\n            switch (args[0]) {\n                case \"list\" -> {\n                    if (daten.isEmpty()) System.out.println(\"Noch keine Aufgaben.\");\n                    for (Notiz n : daten) System.out.println(n.id() + \" [\" + (n.erledigt() ? \"x\" : \" \") + \"] \" + n.text());\n                }\n                case \"add\" -> {\n                    String text = String.join(\" \", Arrays.copyOfRange(args, 1, args.length)).strip();\n                    if (text.isBlank()) throw new IllegalArgumentException(\"Ein Aufgabentext fehlt\");\n                    int id = neueId(daten); daten.add(new Notiz(id, text, false)); speichern(pfad, daten);\n                    System.out.println(\"Gespeichert: \" + id);\n                }\n                case \"done\" -> {\n                    if (args.length != 2) throw new IllegalArgumentException(\"done benötigt genau eine ID\");\n                    int id = Integer.parseInt(args[1]); boolean gefunden = false;\n                    for (int i = 0; i < daten.size(); i++) {\n                        Notiz n = daten.get(i);\n                        if (n.id() == id) { daten.set(i, new Notiz(id, n.text(), true)); gefunden = true; break; }\n                    }\n                    if (!gefunden) throw new IllegalArgumentException(\"ID nicht gefunden\");\n                    speichern(pfad, daten); System.out.println(\"Erledigt: \" + id);\n                }\n                default -> throw new IllegalArgumentException(\"Unbekannter Befehl\");\n            }\n        } catch (IOException | IllegalArgumentException | ArithmeticException e) {\n            System.err.println(\"Fehler: \" + e.getMessage()); System.exit(1);\n        }\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren. Die Programme laufen lokal im Terminal, nicht in der Browser-Vorschau.",
      "java Notebook.java test ausführen: Die Tests verwenden einen eigenen temporären Ordner.",
      "java Notebook.java add Java lernen fügt eine Aufgabe hinzu.",
      "java Notebook.java list zeigt gespeicherte Aufgaben; java Notebook.java done 1 erledigt ID 1.",
      "notizen.tsv liegt im aktuellen Arbeitsordner. Diese Lernversion ist für einen einzelnen schreibenden Prozess gedacht."
    ],
    "concepts": [
      {
        "name": "record / List",
        "explanation": "Notizen werden als Datensätze verwaltet; der Statuswechsel erzeugt einen neuen Record."
      },
      {
        "name": "UTF-8 und Base64",
        "explanation": "UTF-8 legt die Textkodierung fest; Base64 schützt das einfache Tabellenformat vor Tabs und Zeilenumbrüchen im Text. Es ist keine Verschlüsselung."
      },
      {
        "name": "Datei austauschen",
        "explanation": "Zuerst wird eine temporäre Datei geschrieben, dann die Zieldatei ersetzt. Der Fallback ist nicht atomar."
      },
      {
        "name": "Rundlauf-Test",
        "explanation": "Speichern und erneutes Laden müssen dieselben Datensätze liefern. Ungültige Dateiinhalte werden nicht still überschrieben."
      }
    ],
    "ideas": [
      "Aufgaben nach Text oder Status filtern.",
      "Mit eigenen Tests eine delete-Operation ergänzen.",
      "Eine SQLite-Variante mit Transaktionen entwickeln."
    ],
    "lessonIds": [
      "java-record",
      "java-list-add",
      "java-file-write",
      "java-file-bytes",
      "java-test-equality"
    ]
  }
];

export const javaProjects = [...originalJavaProjects, ...javaFurtherProjects, ...javaNextProjects, ...javaDataProjects, ...javaConceptProjects];
