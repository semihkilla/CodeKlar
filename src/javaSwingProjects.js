export const javaSwingProjects = [
  {
    "id": "java-swing-counter",
    "course": "java",
    "language": "Java",
    "title": "Java: Fenster-Zähler mit Swing",
    "description": "Dein erstes Desktop-Fenster: Eingabefeld, Buttons, Fehleranzeige und zwölf Tests. Vier Java-Dateien zeigen Packages, Imports und die Trennung von Daten und Oberfläche.",
    "files": {
      "src/de/codeklar/desktop/App.java": "package de.codeklar.desktop;\n\nimport java.awt.GraphicsEnvironment;\nimport javax.swing.JFrame;\nimport javax.swing.SwingUtilities;\n\npublic class App {\n    static void tests() throws Exception { CounterPanelTests.run(); }\n\n    public static void main(String[] args) throws Exception {\n        if (args.length == 1 && args[0].equals(\"test\")) { tests(); return; }\n        if (args.length != 0) {\n            System.err.println(\"Start: java -cp out de.codeklar.desktop.App [test]\");\n            System.exit(1);\n        }\n        if (GraphicsEnvironment.isHeadless()) {\n            System.err.println(\"Für das Fenster wird eine grafische Desktop-Umgebung benötigt. Tests laufen auch ohne Fenster.\");\n            System.exit(1);\n        }\n        SwingUtilities.invokeLater(() -> {\n            JFrame fenster = new JFrame(\"CodeKlar – Zähler\");\n            fenster.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);\n            fenster.setContentPane(new CounterPanel(new CounterModel()));\n            fenster.pack();\n            fenster.setLocationRelativeTo(null);\n            fenster.setVisible(true);\n        });\n    }\n}\n",
      "src/de/codeklar/desktop/CounterModel.java": "package de.codeklar.desktop;\n\npublic class CounterModel {\n    private int value;\n    public CounterModel() { this(0); }\n    CounterModel(int initialValue) { value = initialValue; }\n    public int value() { return value; }\n    public void add(int step) {\n        if (step < 1 || step > 100) throw new IllegalArgumentException(\"Schritt muss zwischen 1 und 100 liegen.\");\n        // Bei Überlauf wird value nicht neu zugewiesen.\n        value = Math.addExact(value, step);\n    }\n    public void reset() { value = 0; }\n}\n",
      "src/de/codeklar/desktop/CounterPanel.java": "package de.codeklar.desktop;\n\nimport java.awt.BorderLayout;\nimport java.awt.FlowLayout;\nimport javax.swing.BorderFactory;\nimport javax.swing.JButton;\nimport javax.swing.JLabel;\nimport javax.swing.JPanel;\nimport javax.swing.JTextField;\n\npublic class CounterPanel extends JPanel {\n    private final CounterModel model;\n    // Absichtlich package-private für den Komponententest im selben Package.\n    final JLabel valueLabel = new JLabel();\n    final JTextField stepField = new JTextField(\"1\", 6);\n    final JButton addButton = new JButton(\"Addieren\");\n    final JButton resetButton = new JButton(\"Zurücksetzen\");\n    final JLabel statusLabel = new JLabel(\"Bereit\");\n\n    public CounterPanel(CounterModel model) {\n        super(new BorderLayout(12, 12));\n        this.model = model;\n        setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));\n        JPanel controls = new JPanel(new FlowLayout(FlowLayout.LEADING));\n        JLabel stepLabel = new JLabel(\"Schritt (1–100):\");\n        stepLabel.setLabelFor(stepField);\n        controls.add(stepLabel);\n        controls.add(stepField);\n        controls.add(addButton);\n        controls.add(resetButton);\n        add(valueLabel, BorderLayout.NORTH);\n        add(controls, BorderLayout.CENTER);\n        add(statusLabel, BorderLayout.SOUTH);\n        addButton.addActionListener(event -> addStep());\n        stepField.addActionListener(event -> addStep());\n        resetButton.addActionListener(event -> {\n            model.reset();\n            updateValue();\n            statusLabel.setText(\"Zurückgesetzt\");\n        });\n        updateValue();\n    }\n    private void updateValue() { valueLabel.setText(\"Zähler: \" + model.value()); }\n    private void addStep() {\n        try {\n            int step = Integer.parseInt(stepField.getText().strip());\n            model.add(step);\n            updateValue();\n            statusLabel.setText(\"Addiert\");\n        } catch (NumberFormatException error) {\n            statusLabel.setText(\"Bitte eine ganze Zahl zwischen 1 und 100 eingeben.\");\n        } catch (IllegalArgumentException error) {\n            statusLabel.setText(error.getMessage());\n        } catch (ArithmeticException error) {\n            statusLabel.setText(\"Zahl zu groß; Zähler bleibt unverändert.\");\n        }\n    }\n}\n",
      "src/de/codeklar/desktop/CounterPanelTests.java": "package de.codeklar.desktop;\n\nimport javax.swing.SwingUtilities;\n\npublic class CounterPanelTests {\n    private static int count;\n    private static void check(boolean condition) {\n        if (!condition) throw new AssertionError(\"Swing-Test \" + (count + 1) + \" fehlgeschlagen\");\n        count++;\n    }\n    private static void add(CounterPanel panel, String text) {\n        panel.stepField.setText(text);\n        panel.addButton.doClick(0);\n    }\n    public static void run() throws Exception {\n        count = 0;\n        // Kein JFrame: Die echten Swing-Komponenten funktionieren auch headless.\n        SwingUtilities.invokeAndWait(() -> {\n            CounterModel model = new CounterModel();\n            CounterPanel panel = new CounterPanel(model);\n            check(SwingUtilities.isEventDispatchThread() && panel.valueLabel.getText().equals(\"Zähler: 0\"));\n            add(panel, \"10\");\n            check(model.value() == 10 && panel.valueLabel.getText().equals(\"Zähler: 10\"));\n            add(panel, \"2\");\n            check(model.value() == 12 && panel.statusLabel.getText().equals(\"Addiert\"));\n            panel.resetButton.doClick(0);\n            check(model.value() == 0 && panel.valueLabel.getText().equals(\"Zähler: 0\") && panel.statusLabel.getText().equals(\"Zurückgesetzt\"));\n            add(panel, \"sieben\");\n            check(model.value() == 0 && panel.statusLabel.getText().startsWith(\"Bitte eine ganze Zahl\"));\n            add(panel, \"0\");\n            check(model.value() == 0 && panel.statusLabel.getText().equals(\"Schritt muss zwischen 1 und 100 liegen.\"));\n            add(panel, \"101\");\n            check(model.value() == 0 && panel.statusLabel.getText().equals(\"Schritt muss zwischen 1 und 100 liegen.\"));\n            add(panel, \" \");\n            check(model.value() == 0 && panel.statusLabel.getText().startsWith(\"Bitte eine ganze Zahl\"));\n            add(panel, \" 3 \");\n            check(model.value() == 3 && panel.valueLabel.getText().equals(\"Zähler: 3\"));\n            panel.stepField.setText(\"4\");\n            panel.stepField.postActionEvent();\n            check(model.value() == 7 && panel.valueLabel.getText().equals(\"Zähler: 7\"));\n            CounterModel large = new CounterModel(Integer.MAX_VALUE);\n            CounterPanel largePanel = new CounterPanel(large);\n            add(largePanel, \"1\");\n            check(large.value() == Integer.MAX_VALUE && largePanel.statusLabel.getText().startsWith(\"Zahl zu groß\"));\n            add(panel, \"100\");\n            check(model.value() == 107 && panel.statusLabel.getText().equals(\"Addiert\"));\n        });\n        System.out.println(count + \" Swing-Tests bestanden (Komponenten und Ereignisse ohne Fenster)\");\n    }\n}\n"
    },
    "javaMainClass": "de.codeklar.desktop.App",
    "steps": [
      "Ein JDK ab Version 17 installieren und das ZIP entpacken. Alle folgenden Befehle im entpackten Projektordner ausführen. Swing gehört zum vollständigen Desktop-JDK; es wird kein Maven-Paket benötigt.",
      "Die Dateien liegen unter src/de/codeklar/desktop/ und beginnen mit package de.codeklar.desktop;. App startet, CounterModel rechnet, CounterPanel zeigt die Oberfläche und CounterPanelTests prüft ihr Verhalten.",
      "Kompilieren: javac -encoding UTF-8 -d out src/de/codeklar/desktop/App.java src/de/codeklar/desktop/CounterModel.java src/de/codeklar/desktop/CounterPanel.java src/de/codeklar/desktop/CounterPanelTests.java",
      "Tests ohne sichtbares Fenster: java -Djava.awt.headless=true -cp out de.codeklar.desktop.App test",
      "Fenster am Desktop starten: java -cp out de.codeklar.desktop.App. Das benötigt eine grafische Umgebung. Auf dem Handy und in CodeKlar liest du die Beispiele; Swing läuft nicht als Browser-Oberfläche.",
      "Tippe eine Schrittweite von 1 bis 100 ein und klicke Addieren oder drücke Enter. Zurücksetzen setzt den Stand auf 0. Ungültiger Text, leere Felder, falsche Grenzen und int-Überlauf ändern den Stand nicht.",
      "javac erzeugt .class-Dateien unter out/de/codeklar/desktop/. Der Classpath ist out und der Startname de.codeklar.desktop.App. src und out sind Projektkonventionen; die Package-Deklaration bestimmt den Klassennamen.",
      "Der EDT verarbeitet UI-Ereignisse. Die Modellrechnung ist kurz. Bei langsamer Arbeit später SwingWorker verwenden. DISPOSE_ON_CLOSE gibt die Ressourcen dieses Fensters frei; die Komponententests überprüfen kein sichtbares Fensterlayout."
    ],
    "concepts": [
      {
        "name": "JFrame → JPanel → Komponenten",
        "explanation": "App setzt CounterPanel in den Inhaltsbereich eines JFrame. Das Panel enthält Label, Eingabefeld, Buttons und Statuszeile."
      },
      {
        "name": "package und import",
        "explanation": "package benennt den Namensraum der eigenen Datei. import erlaubt kurze Namen für vorhandene Typen. Klassen im selben Package brauchen gegenseitig keinen Import."
      },
      {
        "name": "Modell und Ansicht",
        "explanation": "CounterModel enthält den Zahlenwert und die Regeln. CounterPanel übersetzt Eingaben in Modellaufrufe und aktualisiert die Texte."
      },
      {
        "name": "Sichtbarkeit",
        "explanation": "public ist für zugängliche Klassen und Methoden gedacht; private schützt interne Details. Felder ohne Modifier sind hier für Tests im selben Package sichtbar, nicht für beliebige Unterpackages."
      },
      {
        "name": "Bibliotheken entdecken",
        "explanation": "java.lang: Grundtypen; java.util: Collections; java.io und java.nio.file: Dateien; java.time: Datum; java.net.http: HTTP; javax.swing und java.awt: Desktop-Oberflächen. Externe JARs können per Classpath oder Build-Werkzeug ergänzt werden."
      }
    ],
    "ideas": [
      "Ergänze einen Minus-Button und definiere vorab, ob negative Zählerstände erlaubt sind.",
      "Ersetze die Statuszeile durch einen Verlauf in JTextArea und JScrollPane.",
      "Baue daraus einen Taschenrechner: erst Modellmethoden und Tests, dann die Buttons."
    ],
    "lessonIds": [
      "java-swing-frame",
      "java-swing-panel",
      "java-swing-button",
      "java-swing-textfield",
      "java-packages-lang",
      "java-packages-files"
    ]
  }
];
