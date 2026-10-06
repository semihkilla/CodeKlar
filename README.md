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

- 23 ausführbare JavaScript-Codeaufgaben: Variablen, Datentypen und Typumwandlung, Funktionen, Rechnen, Vergleiche, Restoperator, Logik, fehlende Werte, Entscheidungen, Schleifen, Objekte, Strings und Arrays.
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

JavaScript wird synchron in einem Worker innerhalb eines `sandbox`-Iframes ohne gemeinsame Herkunft ausgeführt. Die CSP blockiert Netzwerkzugriffe; nach zwei Sekunden wird die Ausführungsumgebung entfernt. Diese erste Version stellt keine Laufzeitumgebungen für andere Sprachen und keinen geschützten Online-Wettbewerb bereit. Sie führt keine Befehle auf dem Server aus.

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
