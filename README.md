# codeklar

Eine persönliche, deutschsprachige Programmier-Lernplattform. Sie verbindet kurze Erklärungen und Beispiele im Stil von W3Schools mit Aufgaben, Testfällen und Fortschritt im Stil von LeetCode.

## Lokal starten

Voraussetzung: Node.js ab 20.19 oder 22.12 und npm.

```sh
npm ci
npm run dev
```

Die App ist unter `http://localhost:5173` erreichbar. Mit `npm run build` entsteht der Produktionsbuild in `dist`; `npm run preview` zeigt diesen lokal an.

## Auf Cloudflare Pages veröffentlichen

In Cloudflare unter **Workers & Pages → Create application → Pages → Connect to Git** dieses GitHub-Repository auswählen. Die Bezeichnungen können je nach Dashboard-Version leicht abweichen.

| Einstellung | Wert |
| --- | --- |
| Produktionsbranch | `main` |
| Framework | React / Vite (oder keine Voreinstellung) |
| Build-Befehl | `npm run build` |
| Ausgabeordner | `dist` |
| Projektwurzel | Repository-Wurzel; leer lassen |
| Node.js | 22; über `.node-version` festgelegt |

Cloudflare installiert die npm-Abhängigkeiten und veröffentlicht den Build unter einer HTTPS-Adresse mit `pages.dev`. Spätere Pushes auf `main` lösen automatisch einen neuen Build aus. Eine eigene Domain lässt sich danach unter **Custom domains** verbinden. API-Schlüssel und zusätzliche Umgebungsvariablen werden für diese Version nicht benötigt.

Fortschritt wird pro Webadresse gespeichert. Beim Wechsel von der bisherigen Adresse zu Cloudflare oder einer eigenen Domain wird vorhandener Fortschritt nicht automatisch übernommen. Vorher kann er in der App als JSON exportiert werden; ein Import ist noch nicht umgesetzt.

## Erste Version

- 58 ausführbare JavaScript-Codeaufgaben: Variablen, Datentypen und Typumwandlung, Funktionen, Rechnen, Vergleiche, Restoperator, Logik, fehlende Werte, Entscheidungen, Schleifen, Objekte, Map, Set, Strings und Arrays.
- Navigation nach Programmiersprachen, Webgestaltung, Frameworks, Datenbanken und Werkzeugen; Lernpfade aller Bereiche mit Themen und Fortschritt je Thema.
- Geordneter JavaScript-Lernpfad mit direktem Einstieg, Fortsetzen bei der ersten offenen Aufgabe, Übersicht aller Schritte und Vor-/Zurück-Navigation.
- Miniprojekt Budget-Rechner: Ausgaben summieren, Rest berechnen und Budgetgrenze prüfen; alle Beträge in ganzen Cent.
- Elf weitere Lektionen mit Wissensfragen zu Java, Python, HTML/CSS, SQL, React, Angular, Spring Boot, C, C++, C# und Docker.
- Erklärungen mit Syntax, einzelnen Bestandteilen, Verhalten, Hinweisen und Lösungsweg.
- Bearbeitbarer JavaScript-Spielplatz mit Ausgabe, Zurücksetzen und mehreren Testfällen pro Aufgabe. Strg/⌘ + Enter führt den Code aus.
- Suchbares Nachschlagewerk und Aufgabenfilter nach Lernbereich und Lösungsstatus.
- Tatsächlicher Lernfortschritt in versioniertem `localStorage`; Export als JSON.
- Mobile Navigation und lokal mitgelieferte Schriftdateien.
- Dunkles Design mit wählbarer, gespeicherter Akzentfarbe: Lila, Blau oder Grün.
- Handy-Navigation am unteren Bildschirmrand und direkter Wechsel zwischen Lektion und Spielplatz.
- Installierbare PWA mit Icons für Android und iPhone, Offline-Cache und einem Hinweis auf verfügbare Updates.

## Auf dem Handy verwenden

Für die Installation muss der Produktionsbuild aus `dist` unter einer erreichbaren **HTTPS-Adresse** bereitgestellt werden. Für die private Veröffentlichung mit Sites ist [diese Webadresse](https://codeklar-mobil-oktober.semiherden.chatgpt.site) vorgesehen. `localhost` ist für lokale Tests eine Ausnahme; ein unverschlüsselter Aufruf über die IP-Adresse eines anderen Geräts reicht für Service Worker normalerweise nicht aus.

- **Android:** Öffne die HTTPS-Adresse in Chrome. Über das Paletten-Symbol lässt sich „App installieren“ aufrufen, sobald der Browser die Installation anbietet. Alternativ nutze das Browser-Menü.
- **iPhone:** Öffne die Adresse in Safari und wähle **Teilen → Zum Home-Bildschirm → Hinzufügen**.
- Öffne die installierte App zunächst einmal mit Internetverbindung und warte, bis die Einstellungen **Offline bereit** anzeigen. Danach funktionieren die mitgelieferten Lektionen, Suche, Wissensfragen und JavaScript-Aufgaben ohne Netz.
- Fortschritt und Farbe werden auf dem jeweiligen Gerät gespeichert; sie werden nicht mit anderen Geräten synchronisiert. Manche Browser trennen die Speicherung der installierten App von der normalen Browseransicht.

Für die lokale Prüfung der vollständigen PWA:

```sh
npm run build
npm run preview
```

Der Entwicklungsserver registriert bewusst keinen Service Worker. Im Produktionsbuild werden App-Dateien und Schriftdateien vorab gecacht. Updates werden angekündigt und erst nach einem Klick auf „Neu laden“ übernommen, damit gerade bearbeiteter Code nicht automatisch verloren geht.

JavaScript wird in einem Worker innerhalb eines `sandbox`-Iframes ohne gemeinsame Herkunft ausgeführt. Die CSP blockiert Netzwerkzugriffe; nach zwei Sekunden wird die Ausführungsumgebung entfernt. Diese erste Version stellt keine Laufzeitumgebungen für andere Sprachen und keinen geschützten Online-Wettbewerb bereit. Sie führt keine Befehle auf dem Server aus.

Es gibt noch kein Benutzerkonto, keine Datenbank, keine Synchronisierung und keinen Fortschrittsimport. Der Fortschritt gilt für diesen Browser; das Löschen seiner Websitedaten entfernt ihn. Die Lernbereiche sind erste Einstiege und keine vollständigen Kurse.

## Browserprüfungen

```sh
npx playwright install chromium
npm test
```

Bei einem bereits installierten Chromium kann dessen Pfad verwendet werden:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test
```

Die Tests prüfen Code-Ausführung, Fehler und Zeitlimit, alle JavaScript-Lösungen, unveränderte Eingaben, Wissensfragen, Suche, Filter, dauerhaften Fortschritt, fehlerhafte/blockierte Speicherung und mobile Navigation. Temporäre Screenshots liegen außerhalb des Projekts in `/tmp`.

Die zusätzlichen Prüfungen für den Produktionsbuild laufen mit:

```sh
npm run test:pwa
```

Bei System-Chromium: `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:pwa`. Diese Tests prüfen Manifest und PNG-Icongrößen, Neuladen ohne Netz, tatsächliche Code-Ausführung und Fortschritt offline, mobile Navigation, Farbauswahl nach einem Neuladen, Berührungsflächen und die Installationsoberfläche. Der browsergesteuerte Installationsdialog wird im Test simuliert; die Installation auf einem echten iPhone oder Android-Gerät wurde nicht durchgeführt.

## Aufbau

- `src/data.js`: Lernbereiche, Lektionen, Aufgaben und Testfälle.
- `src/modules.js`: Vier mehrteilige Modulaufgaben zu benannten und Standard-Exports, Aliasen und Re-Exports.
- `src/testing.js`: Vier Aufgaben für selbst geschriebene Assertions, Randfälle, Strukturvergleiche und erwartete Fehler.
- `src/moduleFiles.js`: Syntaxprüfung und Auflösung lokaler virtueller Modulpfade mit Acorn.
- `src/linearStructures.js`: Vier Aufgaben zu Stack, Undo-Verlauf, Queue und Kopfindex.
- `src/structures.js`: Fünf Aufgaben zu Object.keys/entries, Map-Zuordnungen und Set-Eindeutigkeit.
- `src/io.js`: Sechs Aufgaben zu Eingaben, Textzeilen, JSON und einfachem CSV.
- `src/components/FileLab.jsx`: Echte Text-/JSON-/CSV-Dateien öffnen, bearbeiten und herunterladen; persistenter Notizentwurf.
- `src/fileFormats.js`: JSON-Formatierung und CSV-Parser/-Writer mit zitierten Feldern.
- `src/loops.js`: Vier Aufgaben zu while, for…of, break und continue. Zusammen mit for bilden sie das Thema Schleifen.
- `src/decisions.js`: Drei Aufgaben zu else if, ternärer Auswahl und switch.
- `src/logic.js`: Fünf Aufgaben zu Oder, Negation, Ersatzwerten, Kurzschluss und Operatorrangfolge.
- `src/types.js`: Fünf Aufgaben zu typeof, null/undefined, Number/NaN, String und Boolean.
- `src/foundations.js`: Zwölf neue Grundlagen- und Projektaufgaben mit Erklärungen, Grenzfällen und Lösungen.
- `src/components`: Navigation, Lernansicht, Editor, Spielplatz und Übersichten.
- `src/runner.js`: Getrennte JavaScript-Ausführung.
- `src/useProgress.js`: Lesen, Prüfen und Speichern des Fortschritts.
- `src/useWebApp.js`: Installationsereignisse, Offline-Bereitschaft und Updates.
- `src/components/Appearance.jsx`: Farbauswahl und Installation.
- `vite.config.js`: Manifest und Offline-Cache für den Produktionsbuild.
- `src/styles.css`: Gemeinsame Designregeln und responsive Darstellung.

Anforderungen und visuelle Referenz sind in `PROJEKT.md` und `DESIGN.md` beschrieben. Als nächster fachlicher Ausbau bieten sich zusätzliche Operatoren, mehr Methoden, Wiederholungsaufgaben und ein SQL-Spielplatz an.

## Ein-/Ausgabe und Dateien

Wähle in JavaScript das Thema **Ein-/Ausgabe & Dateien**. Unter den Lektionen findest du **Notizen & Datei-Labor**; ein direkter Link führt dorthin. Du kannst ausgewählte UTF-8-Textdateien bis 256 KiB öffnen, eine Kopie bearbeiten, Text/JSON/CSV als Ausgabeformat wählen und die Datei herunterladen. JSON wird geprüft und lesbar formatiert. CSV verwendet Kommas und unterstützt zitierte Felder, maskierte Anführungszeichen und eingebettete Zeilenumbrüche; die Vorschau zeigt höchstens zehn Zeilen. Die CSV-Codeaufgaben beginnen bewusst mit einfacheren Feldern ohne diese Sonderzeichen.

Der aktuelle Notizentwurf wird lokal gespeichert und bleibt bei einem Neuladen erhalten. Bei blockierter Speicherung erscheint ein Hinweis. Originaldateien werden nicht überschrieben. Nach dem ersten vollständigen Laden funktionieren das Labor und die Downloads auch offline. Die Dateiauswahl und das Speichern/Teilen bestimmt der Browser; ein echter iPhone-Download wurde nicht manuell geprüft.

Das Labor zeigt zusätzlich die verwendeten Browser-APIs und ein Node.js-Beispiel zu Ordnern, Lesen und Schreiben mit node:fs/promises. Node.js-Dateisystem- und Terminalzugriffe laufen nicht im isolierten Browser-Spielplatz.

## Imports und Module

Das Thema **Imports & Module** enthält vier Projekte mit jeweils zwei oder drei Dateien. Die Datei-Reiter im Spielplatz wechseln zwischen main.js und Hilfsmodulen, ohne ihre Änderungen zu verlieren. Ausführen und Prüfen verwenden das gesamte Projekt. Die Aufgabenfunktion muss aus main.js exportiert werden; die Lösungsansicht zeigt alle Dateien. Zurücksetzen stellt alle Dateien des aktuellen Beispiels beziehungsweise der Aufgabe wieder her.

Der Browser führt native ES-Module als temporäre Blob-Module innerhalb des bestehenden isolierten Workers aus. Acorn liest Imports und Re-Exports als Syntaxknoten; lokale relative Pfade werden auf vorhandene Projektdateien aufgelöst. Externe URLs, npm-Paketnamen und dynamische Imports sind in dieser ersten Stufe nicht verfügbar; zyklische Imports werden mit einer Meldung abgewiesen. Wie bisher blockiert die CSP Netzwerkzugriffe und die Ausführung endet nach zwei Sekunden. Das Projekt bleibt nach dem ersten Laden offline ausführbar.

Die Aufgaben erklären zusätzlich, wie npm-Pakete in eigenen Node-/Vite-Projekten installiert und importiert werden. Der Lernspielplatz lädt solche Pakete nicht nach.

## Eigene Tests schreiben

Das Thema **Eigene Tests** führt die Testhilfen `gleich(ist, soll, name)` und `wirft(aufruf, name)` ein. Das sind Hilfen dieses Spielplatzes, keine eingebauten JavaScript-Funktionen und kein Jest/Vitest. `gleich` vergleicht einfache Daten rekursiv; `wirft` prüft einen synchron geworfenen Fehler. Fehler-Typen, Promise-Ablehnungen und spezialisierte Map-/Set-Assertions folgen später.

In `main.js` exportierst du `pruefe(funktion, { gleich, wirft })` und schreibst deine Assertions. **Code ausführen** verwendet die aktuelle, editierbare `funktion.js` und zeigt Testnamen, Erwartungen und Ergebnisse. **Lösung prüfen** übergibt der Testfunktion unabhängig von dieser Datei zuerst eine korrekte Implementierung und danach absichtlich fehlerhafte Varianten. Verwende deshalb den Funktionsparameter für deine Aufrufe. Der korrekte Code muss alle Assertions bestehen und jede fehlerhafte Variante muss durch mindestens eine fehlgeschlagene Assertion erkannt werden. Leere Tests, bloße Ausgaben und Programmfehler reichen nicht zum Bestehen. Nur die Aufgabenprüfung aktualisiert den Fortschritt. Dies ist eine Lernprüfung, kein manipulationssicherer Wettbewerb.

Alle vier Übungen funktionieren auch offline nach dem vollständigen ersten Laden der PWA. Die Browserprüfungen decken fehlende Randfälle, Selbstvergleiche, leere und fehlerhafte Tests, das Bearbeiten der zu testenden Funktion, Fehler-Assertions und erhaltenen Fortschritt ab.

## Stack und Queue

Das Thema **Stack & Queue** ergänzt vier ausführbare Übungen. Ein Stack entnimmt mit `pop` den zuletzt abgelegten Wert (LIFO); eine Queue entnimmt mit `shift` den zuerst eingefügten Wert (FIFO). Der Undo-Verlauf sichert den alten Text vor einer Änderung und stellt frühere Zustände wieder her. Das Queue-Protokoll verwendet einen Kopfindex statt wiederholtem Verschieben der Arrayelemente.

Tests prüfen die Entnahmereihenfolge, leere Eingaben, doppelte Werte, gültige Werte `0`/`false`/`''`, leere Entnahmen vor späteren Einfügungen und unveränderte Eingabedaten. Es wird das Verhalten geprüft, keine vorgeschriebene Syntax oder Laufzeitkomplexität. Beim Kopfindex bleiben verbrauchte Einträge in dieser ersten Version gespeichert; Kompaktierung, Ringpuffer, Redo und weitere Datenstrukturen folgen später.
