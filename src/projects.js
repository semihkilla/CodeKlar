import { buildProjects } from "./buildProjects";

const existingProjects = [
  {
    "id": "js-click",
    "course": "js",
    "language": "JavaScript",
    "title": "Klick-Challenge",
    "description": "Baue ein kleines Spiel mit Punkten, Countdown und Neustart.",
    "files": {
      "index.html": "<!doctype html>\n<html lang=\"de\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>Klick-Challenge</title>\n<style>body{background:#101625;color:#eee;font:18px system-ui;text-align:center;padding:24px}button{background:#a18aff;border:0;border-radius:16px;padding:24px;font:inherit;cursor:pointer}button:disabled{opacity:.5}</style>\n<h1>Klick-Challenge</h1><p>Wie viele Klicks schaffst du in 10 Sekunden?</p>\n<p id=\"score\" aria-live=\"polite\">Punkte: 0 · Zeit: 10</p>\n<button id=\"start\">Neue Runde</button> <button id=\"target\" disabled>Klick!</button>\n<script>\nlet points = 0, seconds = 10, timer;\nconst score = document.querySelector('#score');\nconst target = document.querySelector('#target');\nfunction render() { score.textContent = `Punkte: ${points} · Zeit: ${seconds}`; }\ndocument.querySelector('#start').addEventListener('click', () => {\n  clearInterval(timer); // Vorherige Runde beenden.\n  points = 0; seconds = 10; target.disabled = false; render();\n  timer = setInterval(() => {\n    seconds -= 1; render();\n    if (seconds === 0) { clearInterval(timer); target.disabled = true; }\n  }, 1000);\n});\ntarget.addEventListener('click', () => { points += 1; render(); });\n</script></html>"
    },
    "steps": [
      "index.html im Browser öffnen.",
      "Neue Runde starten und zehn Sekunden lang Punkte sammeln."
    ],
    "concepts": [
      {
        "name": "addEventListener()",
        "explanation": "Verknüpft einen Klick mit deiner Funktion. So reagiert ein Spiel auf Eingaben."
      },
      {
        "name": "setInterval() / clearInterval()",
        "explanation": "Aktualisiert den Countdown jede Sekunde und stoppt alte Timer beim Neustart."
      },
      {
        "name": "textContent / disabled",
        "explanation": "Zeigt den Spielstand an und sperrt Eingaben nach Ablauf der Runde."
      }
    ],
    "ideas": [
      "Speichere den Highscore mit localStorage.",
      "Lass den Zielknopf zufällig seine Position wechseln.",
      "Teste, dass ein Neustart keine zwei Timer erzeugt."
    ],
    "demo": "<!doctype html>\n<html lang=\"de\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>Klick-Challenge</title>\n<style>body{background:#101625;color:#eee;font:18px system-ui;text-align:center;padding:24px}button{background:#a18aff;border:0;border-radius:16px;padding:24px;font:inherit;cursor:pointer}button:disabled{opacity:.5}</style>\n<h1>Klick-Challenge</h1><p>Wie viele Klicks schaffst du in 10 Sekunden?</p>\n<p id=\"score\" aria-live=\"polite\">Punkte: 0 · Zeit: 10</p>\n<button id=\"start\">Neue Runde</button> <button id=\"target\" disabled>Klick!</button>\n<script>\nlet points = 0, seconds = 10, timer;\nconst score = document.querySelector('#score');\nconst target = document.querySelector('#target');\nfunction render() { score.textContent = `Punkte: ${points} · Zeit: ${seconds}`; }\ndocument.querySelector('#start').addEventListener('click', () => {\n  clearInterval(timer); // Vorherige Runde beenden.\n  points = 0; seconds = 10; target.disabled = false; render();\n  timer = setInterval(() => {\n    seconds -= 1; render();\n    if (seconds === 0) { clearInterval(timer); target.disabled = true; }\n  }, 1000);\n});\ntarget.addEventListener('click', () => { points += 1; render(); });\n</script></html>"
  },
  {
    "id": "java-guess",
    "course": "java",
    "language": "Java",
    "title": "Zahlenraten",
    "description": "Ein Konsolenspiel mit Zufallszahl, Eingabeprüfung und Versuchszähler.",
    "files": {
      "Guess.java": "import java.util.Random;\nimport java.util.Scanner;\n\npublic class Guess {\n    public static void main(String[] args) {\n        int secret = new Random().nextInt(100) + 1;\n        int attempts = 0;\n        try (Scanner input = new Scanner(System.in)) {\n            System.out.println(\"Rate eine Zahl zwischen 1 und 100!\");\n            while (input.hasNextLine()) {\n                String line = input.nextLine();\n                try {\n                    int guess = Integer.parseInt(line.trim());\n                    if (guess < 1 || guess > 100) {\n                        System.out.println(\"Bitte 1 bis 100 eingeben.\");\n                        continue;\n                    }\n                    attempts++;\n                    if (guess == secret) {\n                        System.out.println(\"Gewonnen nach \" + attempts + \" Versuchen!\");\n                        break;\n                    }\n                    System.out.println(guess < secret ? \"Zu klein!\" : \"Zu groß!\");\n                } catch (NumberFormatException error) {\n                    System.out.println(\"Bitte eine ganze Zahl eingeben.\");\n                }\n            }\n        }\n    }\n}\n"
    },
    "steps": [
      "Ein JDK ab Version 17 installieren.",
      "Im Projektordner starten: java Guess.java"
    ],
    "concepts": [
      {
        "name": "Random.nextInt(100)",
        "explanation": "Liefert 0 bis 99; + 1 verschiebt den Bereich auf 1 bis 100."
      },
      {
        "name": "Scanner / parseInt()",
        "explanation": "Liest eine Zeile und wandelt sie in eine ganze Zahl um."
      },
      {
        "name": "try / catch / continue",
        "explanation": "Fängt ungültige Eingaben ab und setzt die Spielrunde fort."
      }
    ],
    "ideas": [
      "Schwierigkeitsstufen mit verschiedenen Zahlenbereichen.",
      "Begrenze die Anzahl der Versuche.",
      "Lagere den Vergleich in eine Methode aus und teste sie."
    ],
    "demo": null
  },
  {
    "id": "python-guess",
    "course": "python",
    "language": "Python",
    "title": "Zahlenraten mit Bestenliste",
    "description": "Ein Spiel, das deinen besten Versuch in einer JSON-Datei speichert.",
    "files": {
      "game.py": "import json\nimport random\nfrom pathlib import Path\n\nscore_file = Path(__file__).with_name(\"score.json\")\nbest = None\ntry:\n    saved = json.loads(score_file.read_text(encoding=\"utf-8\"))\n    if isinstance(saved, int) and not isinstance(saved, bool) and saved > 0:\n        best = saved\nexcept (OSError, ValueError):\n    pass\nsecret = random.randint(1, 100)\nattempts = 0\nprint(\"Rate 1 bis 100. Beste Runde:\", best)\nwhile True:\n    try:\n        text = input(\"Deine Zahl: \")\n    except (EOFError, KeyboardInterrupt):\n        print(\"\\nRunde beendet.\")\n        break\n    try:\n        guess = int(text)\n    except ValueError:\n        print(\"Bitte eine ganze Zahl eingeben.\")\n        continue\n    if not 1 <= guess <= 100:\n        print(\"Bitte 1 bis 100 eingeben.\")\n        continue\n    attempts += 1\n    if guess == secret:\n        print(f\"Gewonnen nach {attempts} Versuchen!\")\n        if best is None or attempts < best:\n            try:\n                score_file.write_text(json.dumps(attempts), encoding=\"utf-8\")\n                print(\"Neuer Rekord gespeichert!\")\n            except OSError:\n                print(\"Rekord konnte nicht gespeichert werden.\")\n        break\n    print(\"Zu klein!\" if guess < secret else \"Zu groß!\")\n"
    },
    "steps": [
      "Python 3 installieren.",
      "Im Projektordner starten: python3 game.py",
      "Nach einem Sieg liegt der Rekord in score.json neben game.py."
    ],
    "concepts": [
      {
        "name": "random.randint()",
        "explanation": "Wählt hier eine geheime Zahl einschließlich 1 und 100."
      },
      {
        "name": "Path.read_text() / write_text()",
        "explanation": "Lädt und speichert den Rekord in einer Datei."
      },
      {
        "name": "json.loads() / dumps()",
        "explanation": "Verbindet Textdateien mit Python-Werten; gespeicherte Daten werden vor der Nutzung geprüft."
      }
    ],
    "ideas": [
      "Speichere Spielername und Datum als Dictionary.",
      "Erstelle eine Top-5-Liste statt eines einzelnen Rekords.",
      "Schreibe unittest-Tests für die Auswertung eines Tipps."
    ],
    "demo": null
  },
  {
    "id": "css-quests",
    "course": "css",
    "language": "HTML & CSS",
    "title": "Quest-Karten",
    "description": "Ein responsives Aufgabenboard mit anklickbaren Quests und visuellen Zuständen.",
    "files": {
      "index.html": "<!doctype html><html lang=\"de\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Quest-Karten</title>\n<style>body{background:#101625;color:#eee;font:18px system-ui;padding:24px}main{max-width:680px;margin:auto}.quests{display:grid;gap:12px}label{display:block;padding:20px;background:#202840;border-radius:16px;cursor:pointer}input{accent-color:#a18aff;width:20px;height:20px}label:has(input:checked){background:#173f38}input:checked+span{text-decoration:line-through}small{display:block;margin-top:8px}@media(min-width:600px){.quests{grid-template-columns:1fr 1fr}}</style>\n<main><h1>Meine täglichen Quests</h1><p>Hake erledigte Aufgaben ab – ganz ohne JavaScript.</p><div class=\"quests\">\n<label><input type=\"checkbox\"> <span>Eine Funktion schreiben</span><small>+10 Erfahrungspunkte</small></label>\n<label><input type=\"checkbox\"> <span>Einen Fehler finden</span><small>+20 Erfahrungspunkte</small></label>\n<label><input type=\"checkbox\"> <span>Einen Test schreiben</span><small>+15 Erfahrungspunkte</small></label>\n<label><input type=\"checkbox\"> <span>Etwas Neues ausprobieren</span><small>+25 Erfahrungspunkte</small></label>\n</div><p>Die Häkchen gelten für diese Sitzung. Dauerhafte Speicherung kannst du später mit JavaScript ergänzen.</p></main></html>"
    },
    "steps": [
      "index.html in einem aktuellen Browser öffnen.",
      "Quests abhaken und das Fenster schmaler machen."
    ],
    "concepts": [
      {
        "name": "input type=\"checkbox\"",
        "explanation": "Stellt einen bedienbaren Ja/Nein-Zustand bereit, auch über die Tastatur."
      },
      {
        "name": ":checked / :has()",
        "explanation": "Ändert Text und Kartenfarbe, wenn eine Aufgabe erledigt ist."
      },
      {
        "name": "Grid / @media",
        "explanation": "Wechselt zwischen einer und zwei Spalten, abhängig von der verfügbaren Breite."
      }
    ],
    "ideas": [
      "Ergänze Fokusmarkierungen und Animationen.",
      "Baue eine umklappbare Lernkarte mit details/summary.",
      "Ergänze später eine Speicherung mit JavaScript."
    ],
    "demo": "<!doctype html><html lang=\"de\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Quest-Karten</title>\n<style>body{background:#101625;color:#eee;font:18px system-ui;padding:24px}main{max-width:680px;margin:auto}.quests{display:grid;gap:12px}label{display:block;padding:20px;background:#202840;border-radius:16px;cursor:pointer}input{accent-color:#a18aff;width:20px;height:20px}label:has(input:checked){background:#173f38}input:checked+span{text-decoration:line-through}small{display:block;margin-top:8px}@media(min-width:600px){.quests{grid-template-columns:1fr 1fr}}</style>\n<main><h1>Meine täglichen Quests</h1><p>Hake erledigte Aufgaben ab – ganz ohne JavaScript.</p><div class=\"quests\">\n<label><input type=\"checkbox\"> <span>Eine Funktion schreiben</span><small>+10 Erfahrungspunkte</small></label>\n<label><input type=\"checkbox\"> <span>Einen Fehler finden</span><small>+20 Erfahrungspunkte</small></label>\n<label><input type=\"checkbox\"> <span>Einen Test schreiben</span><small>+15 Erfahrungspunkte</small></label>\n<label><input type=\"checkbox\"> <span>Etwas Neues ausprobieren</span><small>+25 Erfahrungspunkte</small></label>\n</div><p>Die Häkchen gelten für diese Sitzung. Dauerhafte Speicherung kannst du später mit JavaScript ergänzen.</p></main></html>"
  },
  {
    "id": "sql-ranking",
    "course": "sql",
    "language": "SQL",
    "title": "Spiele-Bestenliste",
    "description": "Verwandle einzelne Spielrunden in eine Rangliste und Spielerstatistik.",
    "files": {
      "ranking.sql": "-- SQLite: Diese Demo ist erneut ausführbar, weil sie TEMP-Tabellen nutzt.\nDROP TABLE IF EXISTS temp.demo_players;\nDROP TABLE IF EXISTS temp.demo_rounds;\nCREATE TEMP TABLE demo_players (id INTEGER PRIMARY KEY, name TEXT NOT NULL);\nCREATE TEMP TABLE demo_rounds (\n  id INTEGER PRIMARY KEY,\n  player_id INTEGER NOT NULL,\n  points INTEGER NOT NULL CHECK (points >= 0)\n);\nINSERT INTO demo_players VALUES (1, 'Ada'), (2, 'Linus'), (3, 'Grace');\nINSERT INTO demo_rounds VALUES (1, 1, 45), (2, 2, 70), (3, 1, 90), (4, 2, 30);\n-- Spieler ohne Runden erscheinen ebenfalls mit 0 Punkten.\nSELECT p.name, COALESCE(MAX(r.points), 0) AS best,\n       COUNT(r.id) AS rounds\nFROM demo_players AS p\nLEFT JOIN demo_rounds AS r ON r.player_id = p.id\nGROUP BY p.id, p.name\nORDER BY best DESC, p.name;\n"
    },
    "steps": [
      "SQLite installieren oder einen SQLite-Editor verwenden.",
      "Im Terminal: sqlite3 :memory: < ranking.sql",
      "Erwartete Reihenfolge: Ada (90), Linus (70), Grace (0)."
    ],
    "concepts": [
      {
        "name": "LEFT JOIN",
        "explanation": "Verbindet Spieler und Runden und behält auch Spieler ohne Spielrunde."
      },
      {
        "name": "GROUP BY / MAX / COUNT",
        "explanation": "Fasst Runden pro Spieler zu Bestwert und Anzahl zusammen."
      },
      {
        "name": "COALESCE()",
        "explanation": "Ersetzt den fehlenden Bestwert eines neuen Spielers durch 0."
      }
    ],
    "ideas": [
      "Ergänze Spielnamen und Datumsangaben.",
      "Zeige nur die besten drei Spieler.",
      "Vergleiche Highscore, Durchschnitt und Gesamtpunkte."
    ],
    "demo": null
  },
  {
    "id": "react-game",
    "course": "react",
    "language": "React",
    "title": "Reaktionsspiel",
    "description": "Triff den leuchtenden Knopf: React hält Punkte und Zielposition synchron.",
    "files": {
      "package.json": "{\n  \"name\": \"react-click-game\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\"\n  },\n  \"dependencies\": {\n    \"react\": \"^19.2.0\",\n    \"react-dom\": \"^19.2.0\",\n    \"vite\": \"^7.3.0\"\n  }\n}",
      "index.html": "<!doctype html><html lang=\"de\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Reaktionsspiel</title><div id=\"root\"></div><script type=\"module\" src=\"/src.jsx\"></script></html>",
      "src.jsx": "import React, { useState } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport './style.css';\nfunction Game() {\n  const [points, setPoints] = useState(0);\n  const [target, setTarget] = useState(4);\n  function hit(index) {\n    if (index !== target) return;\n    setPoints(previous => previous + 1);\n    // Wähle eine der anderen acht Positionen.\n    const next = Math.floor(Math.random() * 8);\n    setTarget(next >= target ? next + 1 : next);\n  }\n  return <main><h1>Triff das Licht</h1><p aria-live=\"polite\">Punkte: {points}</p>\n    <div className=\"board\">{Array.from({ length: 9 }, (_, i) =>\n      <button key={i} className={target === i ? 'lit' : ''}\n        aria-label={`Feld ${i + 1}${target === i ? ': Ziel' : ''}`}\n        onClick={() => hit(i)}>{target === i ? '★' : '·'}</button>)}</div>\n    <button onClick={() => { setPoints(0); setTarget(4); }}>Neustart</button></main>;\n}\ncreateRoot(document.getElementById('root')).render(<Game />);\n",
      "style.css": "body{background:#101625;color:white;font:20px system-ui}main{max-width:400px;margin:32px auto;padding:16px}.board{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}button{font:inherit;padding:20px;background:#29314a;color:white;border:0;border-radius:12px}.lit{background:#9175ef}"
    },
    "steps": [
      "Node.js ab 22.12 installieren.",
      "Im Projektordner: npm install",
      "Starten: npm run dev; die angezeigte lokale Adresse öffnen.",
      "Produktionsdateien erzeugen: npm run build"
    ],
    "concepts": [
      {
        "name": "useState()",
        "explanation": "Speichert Punkte und Ziel; Änderungen aktualisieren die Darstellung."
      },
      {
        "name": "Funktionaler State-Setter",
        "explanation": "setPoints(previous => previous + 1) zählt auf Grundlage des letzten Zustands."
      },
      {
        "name": "map() / onClick",
        "explanation": "Erzeugt neun Spielfelder und verbindet jedes mit einer Eingabe."
      }
    ],
    "ideas": [
      "Ergänze einen Countdown mit useEffect und sauberem Timer-Cleanup.",
      "Speichere den Highscore.",
      "Baue einen Test: Ein falsches Feld erhöht die Punkte nicht."
    ],
    "demo": null
  },
  {
    "id": "angular-click",
    "course": "angular",
    "language": "Angular",
    "title": "Clicker mit Upgrade",
    "description": "Kaufe stärkere Klicks mit deinen gesammelten Punkten.",
    "files": {
      "package.json": "{\n  \"name\": \"angular-counter\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"scripts\": {\n    \"start\": \"ng serve\",\n    \"build\": \"ng build\"\n  },\n  \"dependencies\": {\n    \"@angular/core\": \"^20.0.0\",\n    \"@angular/common\": \"^20.0.0\",\n    \"@angular/compiler\": \"^20.0.0\",\n    \"@angular/platform-browser\": \"^20.0.0\",\n    \"rxjs\": \"^7.8.0\",\n    \"tslib\": \"^2.8.0\",\n    \"zone.js\": \"~0.15.0\"\n  },\n  \"devDependencies\": {\n    \"@angular/cli\": \"^20.0.0\",\n    \"@angular/build\": \"^20.0.0\",\n    \"typescript\": \"~5.8.3\"\n  }\n}",
      "angular.json": "{\n  \"version\": 1,\n  \"projects\": {\n    \"clicker\": {\n      \"projectType\": \"application\",\n      \"root\": \"\",\n      \"sourceRoot\": \"src\",\n      \"architect\": {\n        \"build\": {\n          \"builder\": \"@angular/build:application\",\n          \"options\": {\n            \"browser\": \"src/main.ts\",\n            \"index\": \"src/index.html\",\n            \"tsConfig\": \"tsconfig.json\",\n            \"polyfills\": [\n              \"zone.js\"\n            ],\n            \"outputPath\": \"dist/clicker\"\n          }\n        },\n        \"serve\": {\n          \"builder\": \"@angular/build:dev-server\",\n          \"options\": {\n            \"buildTarget\": \"clicker:build\"\n          }\n        }\n      }\n    }\n  }\n}",
      "tsconfig.json": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"preserve\",\n    \"moduleResolution\": \"bundler\",\n    \"experimentalDecorators\": true,\n    \"strict\": true,\n    \"skipLibCheck\": true,\n    \"lib\": [\n      \"ES2022\",\n      \"DOM\"\n    ]\n  },\n  \"angularCompilerOptions\": {\n    \"strictTemplates\": true\n  },\n  \"files\": [\n    \"src/main.ts\"\n  ]\n}",
      "src/index.html": "<!doctype html><html lang=\"de\"><head><meta charset=\"utf-8\"><base href=\"/\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Clicker</title></head><body><app-root></app-root></body></html>",
      "src/main.ts": "import { Component, signal } from '@angular/core';\nimport { bootstrapApplication } from '@angular/platform-browser';\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  template: `<h1>Upgrade-Clicker</h1>\n    <p aria-live=\"polite\">Punkte: {{ points() }} · Stärke: {{ power() }}</p>\n    <button (click)=\"click()\">+{{ power() }} Punkte</button>\n    <button (click)=\"upgrade()\" [disabled]=\"points() < cost()\">Upgrade: {{ cost() }} Punkte</button>\n    <button (click)=\"reset()\">Neustart</button>`,\n  styles: [`:host{display:block;max-width:500px;margin:32px auto;padding:24px;font:20px system-ui}button{font:inherit;margin:8px;padding:16px;border-radius:12px}`]\n})\nclass Clicker {\n  points = signal(0);\n  power = signal(1);\n  cost = signal(10);\n  click() { this.points.update(value => value + this.power()); }\n  upgrade() {\n    if (this.points() < this.cost()) return;\n    this.points.update(value => value - this.cost());\n    this.power.update(value => value + 1);\n    this.cost.update(value => value * 2);\n  }\n  reset() { this.points.set(0); this.power.set(1); this.cost.set(10); }\n}\nbootstrapApplication(Clicker).catch(console.error);\n"
    },
    "steps": [
      "Node.js ab 22.12 installieren.",
      "Im Projektordner: npm install",
      "Starten: npm start; http://localhost:4200 öffnen.",
      "Produktionsdateien: npm run build"
    ],
    "concepts": [
      {
        "name": "signal() / update()",
        "explanation": "Hält Punkte, Klickstärke und Preis als reaktive Werte."
      },
      {
        "name": "(click) / [disabled]",
        "explanation": "Verbindet Eingaben mit Methoden und deaktiviert nicht bezahlbare Upgrades."
      },
      {
        "name": "bootstrapApplication()",
        "explanation": "Startet eine eigenständige Angular-Komponente ohne zusätzliches NgModule."
      }
    ],
    "ideas": [
      "Speichere den Spielstand als JSON.",
      "Ergänze automatische Punkte pro Sekunde.",
      "Teste den Kauf ohne ausreichende Punkte."
    ],
    "demo": null
  },
  {
    "id": "spring-calculator",
    "course": "spring",
    "language": "Spring Boot",
    "title": "Taschenrechner-API",
    "description": "Ein HTTP-Endpunkt berechnet Ergebnisse und meldet ungültige Eingaben.",
    "files": {
      "pom.xml": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n  <modelVersion>4.0.0</modelVersion>\n  <parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>3.5.0</version><relativePath/></parent>\n  <groupId>de.codeklar</groupId><artifactId>calculator</artifactId><version>1.0.0</version>\n  <properties><java.version>17</java.version></properties>\n  <dependencies><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId></dependency></dependencies>\n  <build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build>\n</project>",
      "src/main/java/de/codeklar/Calculator.java": "package de.codeklar;\nimport java.util.Map;\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\nimport org.springframework.web.bind.annotation.*;\nimport org.springframework.web.server.ResponseStatusException;\nimport org.springframework.http.HttpStatus;\n@SpringBootApplication\n@RestController\npublic class Calculator {\n    public static void main(String[] args) {\n        SpringApplication.run(Calculator.class, args);\n    }\n    @GetMapping(\"/calculate\")\n    public Map<String, Double> calculate(@RequestParam(\"a\") double a,\n            @RequestParam(\"b\") double b, @RequestParam(\"op\") String op) {\n        if (!Double.isFinite(a) || !Double.isFinite(b)) {\n            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Endliche Zahlen erforderlich\");\n        }\n        double result = switch (op) {\n            case \"add\" -> a + b;\n            case \"subtract\" -> a - b;\n            case \"multiply\" -> a * b;\n            case \"divide\" -> {\n                if (b == 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Division durch null\");\n                yield a / b;\n            }\n            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Unbekannte Operation\");\n        };\n        if (!Double.isFinite(result)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, \"Ergebnis zu groß\");\n        return Map.of(\"result\", result);\n    }\n}\n"
    },
    "steps": [
      "JDK 17 oder neuer und Maven installieren.",
      "Im Projektordner: mvn spring-boot:run",
      "Im Browser: http://localhost:8080/calculate?a=7&b=3&op=add",
      "Erwartet: {\"result\":10.0}. op=divide&b=0 liefert HTTP 400."
    ],
    "concepts": [
      {
        "name": "@GetMapping / @RequestParam",
        "explanation": "Ordnet eine URL einer Java-Methode zu und liest ihre Parameter."
      },
      {
        "name": "switch / yield",
        "explanation": "Wählt die Rechenoperation und gibt deren Ergebnis zurück."
      },
      {
        "name": "ResponseStatusException",
        "explanation": "Meldet fehlerhafte Anfragen mit HTTP 400 statt eines falschen Ergebnisses."
      }
    ],
    "ideas": [
      "Schreibe MockMvc-Tests für gültige und ungültige Anfragen.",
      "Baue eine React-Oberfläche dazu.",
      "Ergänze einen POST-Endpunkt und eine Rechenhistorie."
    ],
    "demo": null
  },
  {
    "id": "c-calculator",
    "course": "c",
    "language": "C",
    "title": "Terminal-Taschenrechner",
    "description": "Verarbeite Eingaben, prüfe Fehler und wähle Rechenoperationen.",
    "files": {
      "calculator.c": "#include <stdio.h>\n#include <math.h>\nint main(void) {\n    char line[256], op, extra;\n    double a, b, result;\n    puts(\"Eingabe: 12 + 3 (oder EOF zum Beenden)\");\n    while (fgets(line, sizeof line, stdin)) {\n        if (sscanf(line, \" %lf %c %lf %c\", &a, &op, &b, &extra) != 3 || !isfinite(a) || !isfinite(b)) {\n            puts(\"Bitte Zahl Operator Zahl eingeben.\");\n            continue;\n        }\n        switch (op) {\n            case '+': result = a + b; break;\n            case '-': result = a - b; break;\n            case '*': result = a * b; break;\n            case '/':\n                if (b == 0) { puts(\"Division durch null ist nicht erlaubt.\"); continue; }\n                result = a / b; break;\n            default: puts(\"Erlaubt sind + - * /\"); continue;\n        }\n        if (!isfinite(result)) { puts(\"Ergebnis zu groß.\"); continue; }\n        printf(\"Ergebnis: %.10g\\n\", result);\n    }\n    return 0;\n}\n"
    },
    "steps": [
      "Einen C-Compiler installieren, zum Beispiel GCC.",
      "Kompilieren: gcc -std=c11 -Wall -Wextra calculator.c -o calculator",
      "Starten unter Linux/macOS: ./calculator",
      "Unter Windows mit MinGW: calculator.exe"
    ],
    "concepts": [
      {
        "name": "fgets() / sscanf()",
        "explanation": "Liest eine Zeile und zerlegt sie in Zahl, Operator und Zahl."
      },
      {
        "name": "& / Zeiger",
        "explanation": "sscanf bekommt die Speicheradressen, an denen es gelesene Werte ablegt."
      },
      {
        "name": "switch / break / continue",
        "explanation": "Wählt die Operation; bei ungültiger Eingabe beginnt die nächste Schleifenrunde."
      }
    ],
    "ideas": [
      "Lagere die Berechnung in eine Funktion aus.",
      "Speichere Ergebnisse in einer Datei.",
      "Teste Division durch null und ungültige Operatoren."
    ],
    "demo": null
  },
  {
    "id": "cpp-game",
    "course": "c",
    "language": "C++",
    "title": "Stein, Papier, Schere",
    "description": "Ein Konsolenspiel mit zufälligem Gegner und einfacher Sieglogik.",
    "files": {
      "game.cpp": "#include <iostream>\n#include <random>\n#include <string>\n#include <array>\nint main() {\n    std::mt19937 generator(std::random_device{}());\n    std::uniform_int_distribution<int> randomChoice(0, 2);\n    const std::array<std::string, 3> names{\"Stein\", \"Papier\", \"Schere\"};\n    std::string input;\n    std::cout << \"0 = Stein, 1 = Papier, 2 = Schere, q = Ende\\n\";\n    while (std::getline(std::cin, input) && input != \"q\") {\n        if (input != \"0\" && input != \"1\" && input != \"2\") {\n            std::cout << \"Bitte 0, 1 oder 2 eingeben.\\n\";\n            continue;\n        }\n        int player = input[0] - '0';\n        int opponent = randomChoice(generator);\n        std::cout << \"Computer: \" << names[opponent] << \"\\n\";\n        if (player == opponent) std::cout << \"Unentschieden!\\n\";\n        else if ((player - opponent + 3) % 3 == 1) std::cout << \"Gewonnen!\\n\";\n        else std::cout << \"Verloren!\\n\";\n    }\n}\n"
    },
    "steps": [
      "Einen C++-Compiler installieren.",
      "Kompilieren: g++ -std=c++17 -Wall -Wextra game.cpp -o game",
      "Starten: ./game (Windows: game.exe)"
    ],
    "concepts": [
      {
        "name": "std::array",
        "explanation": "Speichert drei feste Namen und erlaubt Zugriff über einen Index."
      },
      {
        "name": "mt19937 / uniform_int_distribution",
        "explanation": "Erzeugt einen zufälligen Gegnerzug zwischen 0 und 2."
      },
      {
        "name": "% (Modulo)",
        "explanation": "Ordnet die drei zyklischen Siegpaare zu: Papier schlägt Stein, Schere schlägt Papier, Stein schlägt Schere."
      }
    ],
    "ideas": [
      "Spiele eine Best-of-5-Runde.",
      "Schreibe Tests für alle neun Zugpaare.",
      "Baue später mit SDL oder SFML eine grafische Oberfläche."
    ],
    "demo": null
  },
  {
    "id": "csharp-quiz",
    "course": "c",
    "language": "C#",
    "title": "Mini-Quiz",
    "description": "Ein Spiel mit Fragen, Antworten und Punktestand.",
    "files": {
      "Quiz.csproj": "<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup></Project>",
      "Program.cs": "var questions = new (string Text, string Answer)[] {\n    (\"Wie viel ist 7 * 8?\", \"56\"),\n    (\"Welcher Operator berechnet den Rest?\", \"%\"),\n    (\"Welcher Typ speichert true oder false in C#?\", \"bool\")\n};\nint points = 0;\nforeach (var question in questions) {\n    Console.WriteLine(question.Text);\n    string? input = Console.ReadLine();\n    if (input is null) break;\n    if (string.Equals(input.Trim(), question.Answer, StringComparison.OrdinalIgnoreCase)) {\n        points++;\n        Console.WriteLine(\"Richtig!\");\n    } else {\n        Console.WriteLine($\"Antwort: {question.Answer}\");\n    }\n}\nConsole.WriteLine($\"Ergebnis: {points}/{questions.Length}\");\n"
    },
    "steps": [
      "Das .NET 8 SDK installieren.",
      "Im Projektordner: dotnet run",
      "Alle drei richtigen Antworten liefern Ergebnis: 3/3."
    ],
    "concepts": [
      {
        "name": "Tuple-Array / foreach",
        "explanation": "Bündelt Frage und Antwort und verarbeitet jeden Eintrag."
      },
      {
        "name": "ReadLine() / Trim()",
        "explanation": "Liest Eingaben und entfernt überflüssige Leerzeichen."
      },
      {
        "name": "OrdinalIgnoreCase",
        "explanation": "Vergleicht Antworten unabhängig von Groß- und Kleinschreibung."
      }
    ],
    "ideas": [
      "Lade die Fragen aus einer JSON-Datei.",
      "Mische die Reihenfolge.",
      "Baue das Quiz später mit Godot und C# als grafisches Spiel."
    ],
    "demo": null
  },
  {
    "id": "docker-game",
    "course": "docker",
    "language": "Docker",
    "title": "Spiel im Container",
    "description": "Verpacke die Klick-Challenge als lokal erreichbare Website.",
    "files": {
      "index.html": "<!doctype html>\n<html lang=\"de\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>Klick-Challenge</title>\n<style>body{background:#101625;color:#eee;font:18px system-ui;text-align:center;padding:24px}button{background:#a18aff;border:0;border-radius:16px;padding:24px;font:inherit;cursor:pointer}button:disabled{opacity:.5}</style>\n<h1>Klick-Challenge</h1><p>Wie viele Klicks schaffst du in 10 Sekunden?</p>\n<p id=\"score\" aria-live=\"polite\">Punkte: 0 · Zeit: 10</p>\n<button id=\"start\">Neue Runde</button> <button id=\"target\" disabled>Klick!</button>\n<script>\nlet points = 0, seconds = 10, timer;\nconst score = document.querySelector('#score');\nconst target = document.querySelector('#target');\nfunction render() { score.textContent = `Punkte: ${points} · Zeit: ${seconds}`; }\ndocument.querySelector('#start').addEventListener('click', () => {\n  clearInterval(timer); // Vorherige Runde beenden.\n  points = 0; seconds = 10; target.disabled = false; render();\n  timer = setInterval(() => {\n    seconds -= 1; render();\n    if (seconds === 0) { clearInterval(timer); target.disabled = true; }\n  }, 1000);\n});\ntarget.addEventListener('click', () => { points += 1; render(); });\n</script></html>",
      "Dockerfile": "FROM nginx:stable-alpine\nCOPY index.html /usr/share/nginx/html/index.html\nEXPOSE 80\n",
      "compose.yaml": "services:\n  game:\n    build: .\n    ports:\n      - \"127.0.0.1:8080:80\"\n"
    },
    "steps": [
      "Docker mit Compose installieren und starten.",
      "Im Projektordner: docker compose up --build",
      "Öffnen: http://localhost:8080",
      "Stoppen: Strg+C, anschließend docker compose down"
    ],
    "concepts": [
      {
        "name": "FROM / COPY",
        "explanation": "Nutzt nginx als Webserver und kopiert dein Spiel in dessen Webverzeichnis."
      },
      {
        "name": "ports",
        "explanation": "Verbindet den lokalen Port 8080 mit Port 80 im Container."
      },
      {
        "name": "docker compose up --build",
        "explanation": "Baut das Image und startet den Container; nach Codeänderungen erneut bauen."
      }
    ],
    "ideas": [
      "Ersetze das Spiel durch deinen React-Build.",
      "Ergänze einen zweiten Container für eine API.",
      "Erkläre den Unterschied zwischen Image, Container und Volume."
    ],
    "demo": null
  }
];

export const projects = [...existingProjects, ...buildProjects];
