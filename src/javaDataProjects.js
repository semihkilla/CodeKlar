export const javaDataProjects = [
  {
    "id": "java-csv-report",
    "course": "java",
    "language": "Java",
    "title": "Java: CSV importieren und auswerten",
    "description": "Lies echte Felder mit Kommas und maskierten Anführungszeichen, prüfe Preise und berechne die Summe ohne Gleitkommafehler.",
    "files": {
      "CsvReport.java": "import java.io.*;\nimport java.math.BigDecimal;\nimport java.nio.charset.StandardCharsets;\nimport java.nio.file.*;\nimport java.util.*;\n\npublic class CsvReport {\n    // Lernformat: Komma, doppelte Anführungszeichen, genau ein Datensatz pro Zeile.\n    // Zeilenumbrüche innerhalb eines Felds werden bewusst nicht unterstützt.\n    static List<String> felder(String line) {\n        var out = new ArrayList<String>();\n        var field = new StringBuilder();\n        boolean quoted = false, closed = false;\n        for (int i = 0; i < line.length(); i++) {\n            char c = line.charAt(i);\n            if (c == '\\n' || c == '\\r') throw new IllegalArgumentException(\"Ein Datensatz pro Zeile\");\n            if (quoted) {\n                if (c == '\"') {\n                    if (i + 1 < line.length() && line.charAt(i + 1) == '\"') {\n                        field.append('\"'); i++;\n                    } else { quoted = false; closed = true; }\n                } else field.append(c);\n            } else if (c == ',') {\n                out.add(field.toString()); field.setLength(0); closed = false;\n            } else if (closed) {\n                throw new IllegalArgumentException(\"Zeichen nach Schluss-Anführungszeichen\");\n            } else if (c == '\"') {\n                if (field.length() != 0) throw new IllegalArgumentException(\"Anführungszeichen mitten im Feld\");\n                quoted = true;\n            } else field.append(c);\n        }\n        if (quoted) throw new IllegalArgumentException(\"Offenes Anführungszeichen\");\n        out.add(field.toString()); return out;\n    }\n    record Bericht(int anzahl, BigDecimal summe) {}\n    static Bericht lesen(Reader input) throws IOException {\n        var reader = new BufferedReader(input);\n        String header = reader.readLine();\n        if (header == null || !felder(header).equals(List.of(\"name\", \"betrag\")))\n            throw new IllegalArgumentException(\"Kopfzeile name,betrag erwartet\");\n        int count = 0, lineNumber = 1; BigDecimal sum = new BigDecimal(\"0.00\");\n        String line;\n        while ((line = reader.readLine()) != null) {\n            lineNumber++;\n            if (count >= 10000) throw new IllegalArgumentException(\"Maximal 10000 Datenzeilen\");\n            try {\n                var f = felder(line);\n                if (f.size() != 2 || f.get(0).isBlank()) throw new IllegalArgumentException(\"Name und Betrag erwartet\");\n                // Format: 1 bis 9 Ziffern, Punkt, genau zwei Nachkommastellen.\n                if (!f.get(1).matches(\"[0-9]{1,9}[.][0-9]{2}\")) throw new IllegalArgumentException(\"Betrag wie 12.50 erwartet\");\n                sum = sum.add(new BigDecimal(f.get(1))); count++;\n            } catch (IllegalArgumentException e) {\n                throw new IllegalArgumentException(\"Zeile \" + lineNumber + \": \" + e.getMessage());\n            }\n        }\n        return new Bericht(count, sum);\n    }\n    static void pruefen(boolean ok) { if (!ok) throw new AssertionError(\"CSV-Test fehlgeschlagen\"); }\n    static void falsch(Runnable action) {\n        try { action.run(); } catch (IllegalArgumentException expected) { return; }\n        throw new AssertionError(\"Fehler erwartet\");\n    }\n    static Bericht text(String s) {\n        try { return lesen(new StringReader(s)); } catch (IOException e) { throw new UncheckedIOException(e); }\n    }\n    static void tests() {\n        pruefen(felder(\"a,b,\").equals(List.of(\"a\", \"b\", \"\")));\n        pruefen(felder(\"\\\"Ada, Team\\\",2.50\").equals(List.of(\"Ada, Team\", \"2.50\")));\n        pruefen(felder(\"\\\"A\\\"\\\"B\\\",2.50\").get(0).equals(\"A\\\"B\"));\n        falsch(() -> felder(\"\\\"offen\"));\n        falsch(() -> felder(\"\\\"zu\\\"x\"));\n        falsch(() -> felder(\"ab\\\"c\"));\n        pruefen(text(\"name,betrag\\nA,0.10\\nB,0.20\\n\").equals(new Bericht(2, new BigDecimal(\"0.30\"))));\n        falsch(() -> text(\"name,preis\\nA,1.00\"));\n        falsch(() -> text(\"name,betrag\\nA,1,50\"));\n        falsch(() -> text(\"name,betrag\\n,1.50\"));\n        falsch(() -> text(\"name,betrag\\nA,-1.50\"));\n        pruefen(text(\"name,betrag\\n\").anzahl() == 0);\n        falsch(() -> felder(\"\\\"a\\nb\\\"\"));\n        System.out.println(\"13 CSV-Tests bestanden\");\n    }\n    public static void main(String[] args) {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        if (args.length > 1) { System.err.println(\"Aufruf: java CsvReport.java [datei.csv]\"); System.exit(1); }\n        Path file = Path.of(args.length == 0 ? \"einkauf.csv\" : args[0]);\n        try (var reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {\n            var b = lesen(reader);\n            System.out.println(\"Einträge: \" + b.anzahl());\n            System.out.println(\"Summe: \" + b.summe().toPlainString());\n        } catch (IOException | IllegalArgumentException e) {\n            System.err.println(\"Import fehlgeschlagen: \" + e.getMessage()); System.exit(1);\n        }\n    }\n}\n",
      "einkauf.csv": "name,betrag\n\"Ada, Team\",2.50\n\"Heft \"\"Java\"\"\",3.20\nStift,0.30\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren und die ZIP-Datei entpacken. Alle Dateien im selben Ordner lassen.",
      "Mit java CsvReport.java test die 13 Format- und Rechentests ausführen.",
      "Mit java CsvReport.java einkauf.csv die Beispieldatei auswerten: drei Einträge, Summe 6.00.",
      "Lernformat: UTF-8, Kopfzeile name,betrag, Komma als Trenner, ein Datensatz pro Zeile. Anführungszeichen im Feld werden verdoppelt; mehrzeilige Felder werden nicht unterstützt.",
      "Beträge haben einen Punkt und genau zwei Nachkommastellen, maximal neun Ziffern davor. Leere Namen, negative Beträge und mehr als 10000 Datenzeilen sind Fehler.",
      "Ändere eine Kopie der Beispieldatei und beobachte Fehlermeldungen mit Zeilennummern. Das Programm liest Dateien und überschreibt sie nicht."
    ],
    "concepts": [
      {
        "name": "Parserzustand",
        "explanation": "quoted und closed unterscheiden Text im Feld, ein abgeschlossenes Zitat und neue Feldgrenzen."
      },
      {
        "name": "BigDecimal",
        "explanation": "Dezimalbeträge werden direkt aus geprüftem Text erzeugt; 0.10 plus 0.20 ergibt exakt 0.30."
      },
      {
        "name": "Reader-Verantwortung",
        "explanation": "main öffnet und schließt die Datei. lesen verarbeitet den übergebenen Reader."
      }
    ],
    "ideas": [
      "Erweitere die Tests um Unicode-Namen und sehr große erlaubte Summen.",
      "Füge eine Mengen-Spalte hinzu und prüfe sie vor dem Multiplizieren.",
      "Unterstütze mehrzeilige Felder erst mit einer Parserlogik, die Datensatzgrenzen außerhalb von Zitaten erkennt."
    ],
    "lessonIds": [
      "java-csv-escape",
      "java-split-trailing-fields",
      "java-decimal-import",
      "java-decimal"
    ]
  },
  {
    "id": "java-config-check",
    "course": "java",
    "language": "Java",
    "title": "Java: Konfiguration prüfen",
    "description": "Lade eine UTF-8-Properties-Datei, unterscheide Pflichtwerte und Standards und melde Tippfehler vor dem Programmstart.",
    "files": {
      "ConfigCheck.java": "import java.io.*;\nimport java.nio.charset.StandardCharsets;\nimport java.nio.file.*;\nimport java.util.*;\n\npublic class ConfigCheck {\n    record Einstellung(String titel, boolean aktiv, int limit) {}\n    static Einstellung lesen(Reader reader) throws IOException {\n        var p = new Properties(); p.load(reader);\n        for (String key : p.stringPropertyNames())\n            if (!Set.of(\"titel\", \"aktiv\", \"limit\").contains(key))\n                throw new IllegalArgumentException(\"Unbekannter Schlüssel: \" + key);\n        String titel = p.getProperty(\"titel\", \"\").strip();\n        if (titel.isEmpty() || titel.length() > 80) throw new IllegalArgumentException(\"titel: 1 bis 80 Zeichen nötig\");\n        String aktiv = p.getProperty(\"aktiv\", \"true\").strip();\n        if (!aktiv.equals(\"true\") && !aktiv.equals(\"false\")) throw new IllegalArgumentException(\"aktiv: true oder false nötig\");\n        String zahl = p.getProperty(\"limit\", \"20\").strip();\n        // Bewusst nur 1 bis 3 Dezimalziffern, kein Vorzeichen oder Exponent.\n        if (!zahl.matches(\"[0-9]{1,3}\")) throw new IllegalArgumentException(\"limit: Ganzzahl erwartet\");\n        int limit = Integer.parseInt(zahl);\n        if (limit < 1 || limit > 100) throw new IllegalArgumentException(\"limit: 1 bis 100 nötig\");\n        return new Einstellung(titel, aktiv.equals(\"true\"), limit);\n    }\n    static Einstellung text(String s) {\n        try { return lesen(new StringReader(s)); } catch (IOException e) { throw new UncheckedIOException(e); }\n    }\n    static void pruefen(boolean ok) { if (!ok) throw new AssertionError(\"Konfigurationstest fehlgeschlagen\"); }\n    static void falsch(String input) {\n        try { text(input); } catch (IllegalArgumentException expected) { return; }\n        throw new AssertionError(\"Ungültige Einstellung akzeptiert\");\n    }\n    static void tests() {\n        pruefen(text(\"titel=Lernen\").equals(new Einstellung(\"Lernen\", true, 20)));\n        pruefen(text(\"titel= Übung \\naktiv=false\\nlimit=100\").equals(new Einstellung(\"Übung\", false, 100)));\n        falsch(\"aktiv=true\");\n        falsch(\"titel=\\nlimit=10\");\n        falsch(\"titel=A\\naktiv=treu\");\n        falsch(\"titel=A\\nlimit=0\");\n        falsch(\"titel=A\\nlimit=101\");\n        falsch(\"titel=A\\nlimit=3.5\");\n        falsch(\"titel=A\\nlimti=20\");\n        falsch(\"titel=\" + \"x\".repeat(81));\n        pruefen(text(\"# Kommentar\\ntitel=Java\\nlimit=1\").limit() == 1);\n        // Properties-Regel: Bei gleichem Schlüssel gewinnt der letzte Wert.\n        pruefen(text(\"titel=Alt\\ntitel=Neu\").titel().equals(\"Neu\"));\n        System.out.println(\"12 Konfigurationstests bestanden\");\n    }\n    public static void main(String[] args) {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        if (args.length > 1) { System.err.println(\"Aufruf: java ConfigCheck.java [datei.properties]\"); System.exit(1); }\n        Path file = Path.of(args.length == 0 ? \"lernen.properties\" : args[0]);\n        try (var reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {\n            var e = lesen(reader);\n            System.out.println(\"Titel: \" + e.titel());\n            System.out.println(\"Aktiv: \" + e.aktiv());\n            System.out.println(\"Limit: \" + e.limit());\n        } catch (IOException | IllegalArgumentException e) {\n            System.err.println(\"Konfiguration ungültig: \" + e.getMessage()); System.exit(1);\n        }\n    }\n}\n",
      "lernen.properties": "# Einstellungen für die Lernanwendung\ntitel=Java üben\naktiv=true\nlimit=20\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren und das Projekt entpacken.",
      "Mit java ConfigCheck.java test die zwölf Validierungstests ausführen.",
      "Mit java ConfigCheck.java lernen.properties die Beispieldatei prüfen.",
      "titel ist Pflicht: 1 bis 80 UTF-16-Codeeinheiten nach strip. aktiv erlaubt true/false und hat Standard true. limit erlaubt 1 bis 100 und hat Standard 20.",
      "Unbekannte Schlüssel sind Fehler. Es gelten die Properties-Regeln für Kommentare und Escapezeichen; bei doppelten Schlüsseln gewinnt der letzte Wert.",
      "Arbeite mit einer Kopie: Schreibe aktiv=treu oder limti=20 und lies die gezielte Fehlermeldung. Bei Fehlern beendet sich das Programm mit Status 1."
    ],
    "concepts": [
      {
        "name": "Properties und UTF-8",
        "explanation": "Files.newBufferedReader legt die Kodierung fest. load(Reader) verarbeitet anschließend die Properties-Syntax."
      },
      {
        "name": "Strenge Validierung",
        "explanation": "Ein ungültiger boolean wird nicht stillschweigend false; unbekannte Schlüssel werden zurückgewiesen."
      },
      {
        "name": "Standard oder Pflichtwert",
        "explanation": "Titel fehlt ohne Vorgabe, während aktiv und limit bewusst eigene Standardwerte erhalten."
      }
    ],
    "ideas": [
      "Füge einen Modus mit genau den Werten lernen und wiederholen hinzu.",
      "Sammle mehrere Validierungsfehler in einer Liste, bevor du sie ausgibst.",
      "Lass gültige Einstellungen als record an die eigentliche Anwendung weiterreichen."
    ],
    "lessonIds": [
      "java-properties-reader",
      "java-properties-defaults",
      "java-strict-config-boolean",
      "java-bounded-config-int"
    ]
  }
];
