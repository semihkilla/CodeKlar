import { pythonDataProjects } from './pythonDataProjects.js';
import { pythonPackageProjects } from './pythonPackageProjects.js';
import { pythonApiProjects } from './pythonApiProjects.js';
import { pythonNextProjects } from './pythonNextProjects.js';
import { pythonFurtherProjects } from './pythonFurtherProjects.js';
const originalPythonProjects = [
  {
    "id": "python-task-cli",
    "course": "python",
    "language": "Python",
    "title": "Python: Aufgabenverwaltung mit JSON",
    "description": "Eine Idee wird zu einem mehrteiligen Python-Package: Aufgaben hinzufügen, abhaken und speichern. Mit Datenmodell, Terminalbefehlen, JSON-Validierung und zwölf Tests.",
    "files": {
      "codeklar_tasks/__init__.py": "\"\"\"Lernprojekt: Modell, Speicherung und Terminal-Einstieg getrennt.\"\"\"\n",
      "codeklar_tasks/__main__.py": "import argparse\nimport sys\nfrom pathlib import Path\nfrom .model import add, toggle, remove\nfrom .storage import load, save\n\n\ndef main(argv=None):\n    parser = argparse.ArgumentParser(description=\"CodeKlar: Aufgaben lokal in JSON speichern.\")\n    parser.add_argument(\"--file\", type=Path, default=Path(\"aufgaben.json\"), help=\"Dateipfad; relativ zum aktuellen Arbeitsordner\")\n    commands = parser.add_subparsers(dest=\"command\", required=True)\n    commands.add_parser(\"list\", help=\"Aufgaben anzeigen\")\n    create = commands.add_parser(\"add\", help=\"Aufgabe hinzufügen\")\n    create.add_argument(\"title\")\n    for name in (\"done\", \"remove\"):\n        command = commands.add_parser(name, help=\"Fertig umschalten\" if name == \"done\" else \"Aufgabe löschen\")\n        command.add_argument(\"id\", type=int)\n    args = parser.parse_args(argv)\n    try:\n        tasks = load(args.file)\n        if args.command == \"list\":\n            if not tasks:\n                print(\"Noch keine Aufgaben.\")\n            for task in tasks:\n                print(f\"{task.id}. [{'x' if task.done else ' '}] {task.title}\")\n            return 0\n        if args.command == \"add\":\n            tasks = add(tasks, args.title)\n            message = f\"Aufgabe {tasks[-1].id} angelegt.\"\n        elif args.command == \"done\":\n            tasks = toggle(tasks, args.id)\n            message = f\"Status von Aufgabe {args.id} umgeschaltet.\"\n        else:\n            tasks = remove(tasks, args.id)\n            message = f\"Aufgabe {args.id} gelöscht.\"\n        save(args.file, tasks)\n        print(message)\n        return 0\n    except (ValueError, OSError) as error:\n        print(f\"Fehler: {error}\", file=sys.stderr)\n        return 1\n\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n",
      "codeklar_tasks/model.py": "from dataclasses import dataclass, replace\n\n\n@dataclass(frozen=True)\nclass Task:\n    id: int\n    title: str\n    done: bool = False\n\n    def __post_init__(self):\n        if type(self.id) is not int or self.id < 1:\n            raise ValueError(\"ID muss eine positive ganze Zahl sein.\")\n        if not isinstance(self.title, str) or not 1 <= len(self.title.strip()) <= 200:\n            raise ValueError(\"Titel muss 1 bis 200 Zeichen enthalten.\")\n        if type(self.done) is not bool:\n            raise ValueError(\"done muss ein bool sein.\")\n        object.__setattr__(self, \"title\", self.title.strip())\n\n\ndef add(tasks, title):\n    if len(tasks) >= 1000:\n        raise ValueError(\"Höchstens 1000 Aufgaben erlaubt.\")\n    task = Task(max((t.id for t in tasks), default=0) + 1, title)\n    return [*tasks, task]\n\n\ndef toggle(tasks, task_id):\n    if not any(t.id == task_id for t in tasks):\n        raise ValueError(\"Aufgabe nicht gefunden.\")\n    return [replace(t, done=not t.done) if t.id == task_id else t for t in tasks]\n\n\ndef remove(tasks, task_id):\n    if not any(t.id == task_id for t in tasks):\n        raise ValueError(\"Aufgabe nicht gefunden.\")\n    return [t for t in tasks if t.id != task_id]\n",
      "codeklar_tasks/storage.py": "import json\nimport os\nfrom dataclasses import asdict\nfrom pathlib import Path\nfrom tempfile import NamedTemporaryFile\nfrom .model import Task\n\n\ndef validate(tasks):\n    if not isinstance(tasks, list) or len(tasks) > 1000:\n        raise ValueError(\"Erwartet wird eine Liste mit höchstens 1000 Aufgaben.\")\n    ids = set()\n    for task in tasks:\n        if not isinstance(task, Task):\n            raise ValueError(\"Ungültiges Aufgabenobjekt.\")\n        if task.id in ids:\n            raise ValueError(\"Aufgaben-IDs müssen eindeutig sein.\")\n        ids.add(task.id)\n    return tasks\n\n\ndef invalid_constant(value):\n    raise ValueError(f\"Ungültige JSON-Zahl: {value}\")\n\n\ndef load(file):\n    path = Path(file)\n    if not path.exists():\n        return []\n    if path.stat().st_size > 1_000_000:\n        raise ValueError(\"Datei ist größer als 1 MB.\")\n    data = json.loads(path.read_text(encoding=\"utf-8\"), parse_constant=invalid_constant)\n    if not isinstance(data, dict) or set(data) != {\"version\", \"tasks\"}:\n        raise ValueError(\"Erforderliche Felder: version und tasks.\")\n    if type(data[\"version\"]) is not int or data[\"version\"] != 1:\n        raise ValueError(\"Unbekannte Dateiversion.\")\n    entries = data[\"tasks\"]\n    if not isinstance(entries, list) or len(entries) > 1000:\n        raise ValueError(\"Ungültige Aufgabenliste.\")\n    tasks = []\n    for entry in entries:\n        if not isinstance(entry, dict) or set(entry) != {\"id\", \"title\", \"done\"}:\n            raise ValueError(\"Jede Aufgabe benötigt genau id, title und done.\")\n        tasks.append(Task(**entry))\n    return validate(tasks)\n\n\ndef save(file, tasks):\n    validate(tasks)\n    path = Path(file)\n    path.parent.mkdir(parents=True, exist_ok=True)\n    temporary = None\n    try:\n        with NamedTemporaryFile(\"w\", encoding=\"utf-8\", dir=path.parent, prefix=\".tasks-\", suffix=\".tmp\", delete=False) as output:\n            temporary = Path(output.name)\n            json.dump({\"version\": 1, \"tasks\": [asdict(t) for t in tasks]}, output, ensure_ascii=False, indent=2)\n            output.write(\"\\n\")\n            output.flush()\n            os.fsync(output.fileno())\n        # Gleicher Ordner: altes Ziel erst nach vollständigem Schreiben ersetzen.\n        os.replace(temporary, path)\n    finally:\n        if temporary is not None:\n            temporary.unlink(missing_ok=True)\n",
      "test_tasks.py": "import json\nimport tempfile\nimport unittest\nfrom pathlib import Path\nfrom unittest.mock import patch\nfrom codeklar_tasks.model import Task, add, toggle, remove\nfrom codeklar_tasks.storage import load, save\nfrom codeklar_tasks.__main__ import main\n\n\nclass TaskTests(unittest.TestCase):\n    def setUp(self):\n        self.folder = tempfile.TemporaryDirectory()\n        self.addCleanup(self.folder.cleanup)\n        self.file = Path(self.folder.name) / \"tasks.json\"\n\n    def test_missing_is_empty(self):\n        self.assertEqual(load(self.file), [])\n\n    def test_add_copies_source(self):\n        old = []\n        new = add(old, \"  Lernen  \")\n        self.assertEqual(old, [])\n        self.assertEqual(new, [Task(1, \"Lernen\")])\n\n    def test_validation(self):\n        for args in [(0, \"A\"), (True, \"A\"), (1, \" \"), (1, \"A\", \"false\")]:\n            with self.subTest(args=args), self.assertRaises(ValueError):\n                Task(*args)\n\n    def test_toggle_and_remove(self):\n        tasks = add([], \"Lernen\")\n        changed = toggle(tasks, 1)\n        self.assertFalse(tasks[0].done)\n        self.assertTrue(changed[0].done)\n        self.assertEqual(remove(changed, 1), [])\n\n    def test_missing_id(self):\n        for operation in (toggle, remove):\n            with self.assertRaises(ValueError):\n                operation([], 9)\n\n    def test_utf8_roundtrip(self):\n        tasks = [Task(3, 'Grüße, \"Python\"', True)]\n        save(self.file, tasks)\n        self.assertEqual(load(self.file), tasks)\n        self.assertIn(\"Grüße\", self.file.read_text(encoding=\"utf-8\"))\n\n    def test_invalid_json(self):\n        self.file.write_text(\"kaputt\", encoding=\"utf-8\")\n        with self.assertRaises(ValueError):\n            load(self.file)\n\n    def test_bad_fields_and_duplicates(self):\n        invalid = [\n            {\"version\": 2, \"tasks\": []},\n            {\"version\": True, \"tasks\": []},\n            {\"version\": 1, \"tasks\": [{\"id\": 1, \"title\": \"A\"}]},\n            {\"version\": 1, \"tasks\": [{\"id\": 1, \"title\": \"A\", \"done\": \"false\"}]},\n            {\"version\": 1, \"tasks\": [{\"id\": 1, \"title\": \"A\", \"done\": False}] * 2},\n        ]\n        for data in invalid:\n            with self.subTest(data=data):\n                self.file.write_text(json.dumps(data), encoding=\"utf-8\")\n                with self.assertRaises(ValueError):\n                    load(self.file)\n\n    def test_failed_replace_preserves_file(self):\n        save(self.file, [Task(1, \"Alt\")])\n        with patch(\"codeklar_tasks.storage.os.replace\", side_effect=OSError(\"Testfehler\")):\n            with self.assertRaises(OSError):\n                save(self.file, [Task(1, \"Neu\")])\n        self.assertEqual(load(self.file), [Task(1, \"Alt\")])\n        self.assertEqual(list(self.file.parent.glob(\".tasks-*.tmp\")), [])\n\n    def test_cli_and_persistence(self):\n        arguments = [\"--file\", str(self.file)]\n        with patch(\"sys.stdout\"):\n            self.assertEqual(main([*arguments, \"add\", \"Üben\"]), 0)\n            self.assertEqual(main([*arguments, \"done\", \"1\"]), 0)\n            self.assertEqual(main([*arguments, \"list\"]), 0)\n        self.assertEqual(load(self.file), [Task(1, \"Üben\", True)])\n\n    def test_cli_invalid_does_not_overwrite(self):\n        self.file.write_text(\"kaputt\", encoding=\"utf-8\")\n        with patch(\"sys.stderr\"):\n            self.assertEqual(main([\"--file\", str(self.file), \"add\", \"Neu\"]), 1)\n        self.assertEqual(self.file.read_text(encoding=\"utf-8\"), \"kaputt\")\n\n    def test_size_limit(self):\n        self.file.write_text(\" \" * 1_000_001, encoding=\"utf-8\")\n        with self.assertRaises(ValueError):\n            load(self.file)\n\n\nif __name__ == \"__main__\":\n    unittest.main()\n",
      "BAUPLAN.md": "# Von einer Idee zu Python-Code\n\nIdee: Ich möchte Aufgaben merken und später abhaken.\n\n1. Daten: Jede Aufgabe hat id, title und done. Das Modell ist eine dataclass. Regeln gelten in __post_init__, weil Typannotationen allein keine Eingaben prüfen.\n2. Aktionen: add, toggle und remove erhalten eine Liste und geben eine neue äußere Liste zurück. So können Tests vorher und nachher vergleichen.\n3. Speicherung: storage.py übersetzt Datenmodelle mit asdict in JSON und prüft beim Lesen Felder, Typen, IDs und Titel. Kein eval.\n4. Darstellung: __main__.py liest Terminalargumente mit argparse und druckt die Liste. Ein späteres Fenster könnte dasselbe Modell und dieselbe Speicherung verwenden.\n5. Datenübermittlung: Zwischen Modell und Speicherung werden Python-Objekte übergeben. Auf der Festplatte steht UTF-8-JSON mit version und tasks. Es wird nichts über ein Netzwerk gesendet.\n6. Prüfung: test_tasks.py importiert die Funktionen. Temporäre Ordner halten Tests von echten Aufgaben getrennt. Ein simulierter Schreibfehler beweist, dass die vorherige Zieldatei erhalten bleibt.\n\n## Struktur\n\ncodeklar_tasks/__init__.py   Package-Markierung und Beschreibung\ncodeklar_tasks/model.py      Datenmodell und Fachregeln\ncodeklar_tasks/storage.py    JSON laden und speichern\ncodeklar_tasks/__main__.py   Einstieg für python3 -m codeklar_tasks\ntest_tasks.py                Automatische Tests\n\n## Start\n\nPython 3.10 oder neuer. Alle Befehle im entpackten Projektordner starten:\n\n    python3 -m unittest -v\n    python3 -m codeklar_tasks --file aufgaben.json add \"Python lernen\"\n    python3 -m codeklar_tasks --file aufgaben.json list\n    python3 -m codeklar_tasks --file aufgaben.json done 1\n    python3 -m codeklar_tasks --file aufgaben.json remove 1\n\nUnter Windows je nach Installation python oder py statt python3 verwenden. --file steht vor dem Unterbefehl. done schaltet den Zustand bei jedem Aufruf um. remove löscht den bezeichneten Eintrag ohne zusätzliche Rückfrage. Relative Pfade beziehen sich auf den aktuellen Arbeitsordner. Nicht gefunden: leerer Anfangsstand. Ungültige vorhandene Dateien: Fehler, keine automatische Ersetzung.\n\nOptional eine virtuelle Umgebung anlegen: python3 -m venv .venv. Danach Linux/macOS .venv/bin/python und Windows .venv\\Scripts\\python.exe verwenden. Die Anwendung benötigt nur die Standardbibliothek, kein pip install.\n\n## Grenzen\n\nMaximal 1000 Aufgaben, Titel nach strip 1 bis 200 Zeichen, positive eindeutige IDs, done als bool. Die Datei hat Version 1 und die Wurzelfelder version/tasks. Beim Laden höchstens 1 MB. Beim Speichern entsteht erst eine temporäre Datei im selben Ordner, die nach vollständigem Schreiben das Ziel mit os.replace ersetzt. Das schützt gegen einen unvollständigen normalen Schreibvorgang; es ist keine Garantie gegen jeden Stromausfall. Der Inhalt ist nicht verschlüsselt. Nur ein gleichzeitig schreibender Prozess ist vorgesehen; keine Konfliktauflösung oder Synchronisierung.\n\n## Eigene Erweiterung\n\nErgänze zuerst eine prioritaet im Datenmodell, definiere erlaubte Werte und eine neue Dateiversion. Schreibe Tests für gültige und ungültige Prioritäten. Erst danach erweiterst du Argumente und Anzeige. So wird aus einer Idee eine Folge kleiner überprüfbarer Schritte.\n"
    },
    "pythonTestCommand": [
      "-m",
      "unittest",
      "-v"
    ],
    "steps": [
      "Python 3.10 oder neuer installieren. ZIP entpacken und alle Befehle im Projektordner ausführen. Unter Windows heißt der Befehl je nach Installation python oder py statt python3. Keine externen Pakete nötig.",
      "Tests starten: python3 -m unittest -v. Die zwölf Testmethoden prüfen Modellregeln, UTF-8, JSON, fehlende IDs, Fehler beim Speichern und Terminalaktionen mit eigenen temporären Dateien.",
      "Aufgabe anlegen: python3 -m codeklar_tasks --file aufgaben.json add \"Python lernen\". Die Datei wird nach einer erfolgreichen Änderung gespeichert.",
      "Anzeigen: python3 -m codeklar_tasks --file aufgaben.json list. Fertig umschalten: python3 -m codeklar_tasks --file aufgaben.json done 1.",
      "Löschen: python3 -m codeklar_tasks --file aufgaben.json remove 1. Der Befehl entfernt die angegebene ID ohne weitere Rückfrage. --file steht vor dem Unterbefehl.",
      "BAUPLAN.md erklärt Idee, Daten, Aktionen, Speicherung, Darstellung, Übermittlung und Tests Schritt für Schritt. model.py ist die Fachlogik, storage.py die Dateigrenze und __main__.py die Terminalansicht.",
      "Der Standardpfad aufgaben.json ist relativ zum aktuellen Arbeitsverzeichnis. Fehlende Datei beginnt leer, ungültige vorhandene Daten erzeugen einen Fehler. Es ist eine lokale Lernanwendung für einen gleichzeitig schreibenden Prozess."
    ],
    "concepts": [
      {
        "name": "dataclass und Validierung",
        "explanation": "Task prüft positive IDs, nichtleere Titel und echten bool-Status. Typannotationen allein erzwingen das nicht."
      },
      {
        "name": "Package und Einstieg",
        "explanation": "__init__.py markiert das Package. python3 -m codeklar_tasks führt __main__.py aus; interne Imports verwenden den Punkt für das eigene Package."
      },
      {
        "name": "Modell statt Drucktext",
        "explanation": "Fachfunktionen rechnen mit Datenobjekten. Erst die Terminalansicht macht daraus lesbare Zeilen."
      },
      {
        "name": "JSON und Datei",
        "explanation": "Ein versionsgebundener JSON-Vertrag trennt gespeicherte Werte vom Python-Quellcode. Speichern schreibt zunächst eine temporäre Datei und ersetzt danach das Ziel."
      },
      {
        "name": "Testbare Grenzen",
        "explanation": "Tests verwenden TemporaryDirectory und simulieren einen fehlschlagenden os.replace-Aufruf; alte Daten und Aufräumen werden geprüft."
      }
    ],
    "ideas": [
      "Ergänze eine Priorität mit Validierung, Tests und einer bewusst neuen Dateiversion.",
      "Füge einen Filter für offene Aufgaben hinzu.",
      "Baue später eine tkinter-Oberfläche über demselben Modell und Speicherbaustein."
    ],
    "lessonIds": [
      "python-dataclass",
      "python-function",
      "python-json",
      "python-main",
      "python-unittest"
    ]
  },
  {
    "id": "python-word-report",
    "course": "python",
    "language": "Python",
    "title": "Python: Wörterbericht mit CSV-Export",
    "description": "Textdatei lesen, Wörter zählen, Ergebnisse sortieren und als CSV exportieren. Mit erklärter Wortregel, Terminaloptionen und acht Tests.",
    "files": {
      "report.py": "\"\"\"Wortregel: Unicode-Buchstabenfolgen, ohne Ziffern/Unterstrich; casefold vereinheitlicht.\"\"\"\nimport argparse\nimport csv\nimport re\nimport sys\nfrom collections import Counter\nfrom pathlib import Path\n\n\ndef frequencies(text):\n    words = re.findall(r\"[^\\W\\d_]+\", text.casefold())\n    return sorted(Counter(words).items(), key=lambda entry: (-entry[1], entry[0]))\n\n\ndef export_csv(file, rows):\n    with Path(file).open(\"w\", encoding=\"utf-8\", newline=\"\") as output:\n        writer = csv.writer(output)\n        writer.writerow([\"wort\", \"anzahl\"])\n        writer.writerows(rows)\n\n\ndef main(argv=None):\n    parser = argparse.ArgumentParser(description=\"Wörter zählen und als CSV exportieren.\")\n    parser.add_argument(\"input\", type=Path)\n    parser.add_argument(\"--csv\", type=Path, help=\"Zieldatei, darf nicht die Eingabe sein\")\n    parser.add_argument(\"--top\", type=int, default=10)\n    args = parser.parse_args(argv)\n    try:\n        if args.top < 1:\n            raise ValueError(\"--top muss positiv sein.\")\n        if args.csv is not None and args.input.resolve() == args.csv.resolve():\n            raise ValueError(\"CSV-Ziel darf nicht die Eingabedatei sein.\")\n        if args.input.stat().st_size > 1_000_000:\n            raise ValueError(\"Eingabe ist größer als 1 MB.\")\n        rows = frequencies(args.input.read_text(encoding=\"utf-8\"))\n        if args.csv is not None:\n            export_csv(args.csv, rows)\n        print(f\"Wörter insgesamt: {sum(count for _, count in rows)}\")\n        print(f\"Verschiedene Wörter: {len(rows)}\")\n        for word, count in rows[:args.top]:\n            print(f\"{word}: {count}\")\n        return 0\n    except (OSError, ValueError) as error:\n        print(f\"Fehler: {error}\", file=sys.stderr)\n        return 1\n\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n",
      "test_report.py": "import csv\nimport tempfile\nimport unittest\nfrom pathlib import Path\nfrom unittest.mock import patch\nfrom report import frequencies, export_csv, main\n\n\nclass ReportTests(unittest.TestCase):\n    def test_empty(self):\n        self.assertEqual(frequencies(\"\"), [])\n\n    def test_case_and_punctuation(self):\n        self.assertEqual(frequencies(\"Python, PYTHON! Java.\"), [(\"python\", 2), (\"java\", 1)])\n\n    def test_umlauts_and_casefold(self):\n        self.assertEqual(frequencies(\"Grüße GRÜSSE\"), [(\"grüsse\", 2)])\n\n    def test_tie_is_alphabetical(self):\n        self.assertEqual(frequencies(\"z a\"), [(\"a\", 1), (\"z\", 1)])\n\n    def test_numbers_and_underscores(self):\n        self.assertEqual(frequencies(\"42 a_b\"), [(\"a\", 1), (\"b\", 1)])\n\n    def test_csv_roundtrip(self):\n        with tempfile.TemporaryDirectory() as folder:\n            file = Path(folder) / \"report.csv\"\n            rows = [(\"Grüße, Welt\", 2)]\n            export_csv(file, rows)\n            with file.open(encoding=\"utf-8\", newline=\"\") as source:\n                self.assertEqual(list(csv.reader(source)), [[\"wort\", \"anzahl\"], [\"Grüße, Welt\", \"2\"]])\n\n    def test_cli_and_same_file_guard(self):\n        with tempfile.TemporaryDirectory() as folder:\n            file = Path(folder) / \"input.txt\"\n            file.write_text(\"Python Python Java\", encoding=\"utf-8\")\n            with patch(\"sys.stdout\"):\n                self.assertEqual(main([str(file), \"--top\", \"1\"]), 0)\n            with patch(\"sys.stderr\"):\n                self.assertEqual(main([str(file), \"--csv\", str(file)]), 1)\n            self.assertEqual(file.read_text(encoding=\"utf-8\"), \"Python Python Java\")\n\n    def test_bad_limit_and_missing_file(self):\n        with patch(\"sys.stderr\"):\n            self.assertEqual(main([\"fehlt-nicht-vorhanden.txt\", \"--top\", \"0\"]), 1)\n            self.assertEqual(main([\"fehlt-nicht-vorhanden.txt\"]), 1)\n\n\nif __name__ == \"__main__\":\n    unittest.main()\n",
      "beispiel.txt": "Python lernen macht Spaß. Python hilft beim Lernen.\n",
      "BAUPLAN.md": "# Text → Daten → Bericht\n\n1. input.read_text liest UTF-8. Die Grenze liegt bei 1 MB.\n2. casefold vereinheitlicht die Schreibweise. Die Wortregel verwendet Unicode-Buchstabenfolgen; Ziffern und Unterstriche zählen nicht zum Wort. Apostrophe und Bindestriche trennen. Das ist eine bewusst einfache technische Regel, keine vollständige sprachwissenschaftliche Worterkennung.\n3. Counter zählt die Tokens. Sortierschlüssel (-anzahl, wort) ordnet häufige Wörter zuerst, bei Gleichstand alphabetisch nach Python-Stringordnung.\n4. print zeigt Gesamtzahl, unterschiedliche Wörter und die ersten --top Ergebnisse. --csv exportiert alle Ergebnisse, nicht nur die angezeigte Spitze.\n5. csv.writer übernimmt Trennzeichen und Anführungszeichen. Beim späteren Lesen sind die Anzahlen zunächst Strings.\n6. Tests behandeln leere Eingaben, Schreibweise, Umlaute, Gleichstand, CSV, ungültige Optionen und den Schutz der Eingabedatei.\n\nStart im entpackten Ordner, Python 3.10+:\n\n    python3 -m unittest -v\n    python3 report.py beispiel.txt --top 5\n    python3 report.py beispiel.txt --top 5 --csv bericht.csv\n\nUnter Windows je nach Installation py oder python verwenden. Keine externen Pakete nötig. Eine vorhandene CSV-Zieldatei wird überschrieben; das Ziel darf nicht auf dieselbe aufgelöste Pfadadresse wie die Eingabe zeigen. Hardlink-Sonderfälle sind kein Teil dieses Lernmodells. Es wird nichts im Netzwerk übertragen. --top muss positiv sein. Fehler stehen auf stderr und liefern Exit-Code 1; argparse verwendet bei unpassenden Argumenten Exit-Code 2.\n\nEigene Aufgabe: Erweitere die Wortregel für einen Apostroph im Inneren von Wörtern. Definiere erst Beispiele wie \"geht's\" und schreibe einen Test, bevor du den Regex änderst.\n"
    },
    "pythonTestCommand": [
      "-m",
      "unittest",
      "-v"
    ],
    "steps": [
      "Python 3.10 oder neuer installieren, ZIP entpacken und im Projektordner arbeiten. Unter Windows je nach Installation py oder python statt python3 verwenden. Keine zusätzlichen Bibliotheken erforderlich.",
      "Tests ausführen: python3 -m unittest -v. Acht Testmethoden prüfen Token-Regel, Häufigkeiten, UTF-8, CSV, Fehlerfälle und den Schutz vor Export auf den Eingabepfad.",
      "Beispiel analysieren: python3 report.py beispiel.txt --top 5.",
      "Alle Häufigkeiten exportieren: python3 report.py beispiel.txt --top 5 --csv bericht.csv. Eine vorhandene CSV-Zieldatei wird überschrieben; wähle bewusst einen neuen Ausgabepfad.",
      "BAUPLAN.md erklärt den Datenfluss: UTF-8-Text → Wortfolge → Counter → sortierte Paare → Terminal und CSV. Die Ausgabe ist nachvollziehbar sortiert, auch bei gleichen Häufigkeiten.",
      "Das Wortmodell zählt Buchstabenfolgen nach casefold; Ziffern, Unterstriche, Satzzeichen und Bindestriche trennen. Das ist eine vereinfachte technische Definition. Eingaben größer als 1 MB werden abgewiesen."
    ],
    "concepts": [
      {
        "name": "Counter",
        "explanation": "Ein Counter zählt jeden normalisierten Wortwert."
      },
      {
        "name": "Explizite Sortierung",
        "explanation": "Der Schlüssel (-anzahl, wort) macht Ergebnisreihenfolge auch bei Gleichstand reproduzierbar."
      },
      {
        "name": "CSV statt Stringverkettung",
        "explanation": "csv.writer schützt die Tabellenstruktur bei Kommas und Anführungszeichen in einem Feld."
      },
      {
        "name": "Funktion und Terminal",
        "explanation": "frequencies verarbeitet bereits vorhandenen Text, main übernimmt Dateien und Optionen. Tests können die Fachfunktion direkt importieren."
      }
    ],
    "ideas": [
      "Schließe häufige Stoppwörter über eine explizite Set-Regel aus.",
      "Vergleiche zwei Texte nach gemeinsamen Wörtern.",
      "Füge eine alternative Wortregel mit Apostrophen hinzu und teste sie."
    ],
    "lessonIds": [
      "python-counter",
      "python-csv",
      "python-sorted",
      "python-split-join",
      "python-files"
    ]
  }
];

export const pythonProjects = [...originalPythonProjects, ...pythonFurtherProjects, ...pythonNextProjects, ...pythonApiProjects, ...pythonPackageProjects, ...pythonDataProjects];
