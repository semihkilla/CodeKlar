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

- 81 ausführbare JavaScript-Codeaufgaben: Variablen, Datentypen und Typumwandlung, Funktionen, Rechnen, Vergleiche, Restoperator, Logik, fehlende Werte, Entscheidungen, Schleifen, Objekte, Map, Set, Strings und Arrays.
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
- `src/graphs.js`: Nachbarlisten und Graph-Breitensuche mit Set und FIFO-Queue.
- `src/trees.js`: Zehn Aufgaben zu Knotenzahl, Höhe, Traversierungen und Suchbaumoperationen.
- `src/recursion.js`: Vier Aufgaben zu Basisfällen, Rückgabewerten, Knotenzählen und verschachtelten Arrays.
- `src/linkedStructures.js`: Klammerprüfung und sechs Aufgaben zum Aufbau, Lesen, Ergänzen, Suchen, Löschen und Umkehren verketteter Listen.
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

## Klammerprüfung und verkettete Listen

Die Klammerprüfung im Thema **Stack & Queue** verarbeitet `()`, `[]` und `{}` mit einem Stack. Sie erkennt falsche Verschachtelungen, ungeöffnete schließende Klammern und ungeschlossene öffnende Klammern. Andere Textzeichen werden ignoriert; die Funktion ist kein JavaScript-Parser und behandelt Klammern in Strings und Kommentaren genauso wie andere Klammern.

Drei Übungen im Thema **Verkettete Listen** bauen Knoten `{wert, next}` aus einem Array, lesen eine Kette und setzen einen neuen Knoten vor den Kopf. `next` ist ein frei gewählter Eigenschaftsname. Die Endreferenz `null` unterscheidet sich von einem gültigen Knoten mit `wert: null`. Die Aufgaben verwenden endliche, gültige Listen ohne Zyklen und erhalten die Eingabedaten. Vorne einfügen kann bestehende Knoten über Referenzen teilen; eine tiefe Kopie wird ebenfalls akzeptiert, da die Prüfung Struktur und unveränderte Eingabe bewertet. Zyklenerkennung sowie Bäume und Graphen folgen später.

## Weitere Listenoperationen

Drei weitere Übungen behandeln die Position des ersten strikt gleichen Werts, das Entfernen genau des ersten passenden Knotens und das Umkehren einer Liste ohne Eingabemutation. Die Suchposition beginnt bei 0, ein fehlender Treffer ergibt -1. Zahlen und Strings bleiben durch `===` verschieden; `null`, `0`, `false` und leere Strings sind gültige Nutzdaten.

Löschen und Umkehren erzeugen in den gezeigten Lösungen neue Knoten. Beim Löschen verknüpft ein Hilfsknoten die neue Kette und eine Markierung verhindert das Entfernen späterer Duplikate. Beim Umkehren wird jeder gelesene Wert vor den bisherigen Ergebniskopf gesetzt. Die Übungen prüfen Ergebnis und unveränderte Eingabe, nicht eine vorgeschriebene Implementierung. In-place-Verfahren werden als Alternative bei ausdrücklich erlaubter Mutation erklärt, sind hier aber keine gültige Lösung.

## Rekursion

Vier Übungen im Thema **Rekursion** behandeln einen Countdown mit Basisfall, die Fakultät, die rekursive Länge einer verketteten Liste und die Summe verschachtelter Arrays. Erklärungen zeigen lokale Variablen pro Aufruf, den Call Stack, Rückgabewerte und die Verkleinerung des Problems. `Array.isArray` unterscheidet Zahlen als Basisfälle von Arrays als Teilstrukturen. Das mathematische `n!` wird ausdrücklich von JavaScripts logischem `!` unterschieden.

Die Übungen verwenden kleine, gültige Eingaben: Countdown 0–20, Fakultät 0–10, kurze endliche Listen und kleine zyklusfreie Arrays aus Zahlen und weiteren Arrays. Sie prüfen Ergebnisse und unveränderte Eingaben, keine vorgeschriebene Syntax; iterative Alternativen sind ebenfalls gültig. Fehlende Basisfälle, falsche Startwerte und ignorierte Teilergebnisse werden durch die Lernprüfungen sichtbar. Rekursive Stacküberläufe bleiben in der Ausführungsumgebung, und die Oberfläche bleibt benutzbar. Bäume, Graphen, Memoisierung und weiterführende Laufzeitbetrachtungen folgen später.

## Binärbäume

Vier Übungen im Thema **Bäume** verwenden Knoten `{wert, links, rechts}`. `null` als Kindreferenz bezeichnet einen leeren Teilbaum; ein vorhandener Knoten mit `wert: null` bleibt ein Knoten. Jede Eingabe ist ein kleiner gültiger Binärbaum ohne Zyklen oder gemeinsam genutzte Kindknoten.

Knotenzählen addiert die Wurzel und beide Teilbaumgrößen. Die Höhe zählt in diesen Übungen **Knoten auf dem längsten Wurzel-Blatt-Weg**: leerer Baum 0, Blatt 1. `Math.max` wählt die größere Teilhöhe. Preorder besucht Wurzel–links–rechts, Inorder links–Wurzel–rechts. Es werden allgemeine Binärbäume verwendet; Inorder ist daher keine Sortieraufgabe. Die Tests enthalten leere, einseitige, verzweigte und unsortierte Bäume sowie Duplikate und falsy-Werte. Alle Eingabeknoten bleiben unverändert. Weitere Suchbaumoperationen und Graphen folgen später.

## Postorder, Breitensuche und Suchbäume

Postorder verarbeitet links–rechts–Wurzel. Breitensuche verwendet eine FIFO-Queue mit Kopfindex und besucht Ebenen von oben nach unten, innerhalb einer Ebene von links nach rechts. Beide Aufgaben lesen allgemeine Binärbäume mit primitiven JSON-Werten und erhalten die Eingabe.

Zwei Übungen im Thema **Binäre Suchbäume** behandeln Suche und Einfügen in gültige Suchbäume mit unterschiedlichen endlichen Zahlen. Die Ordnung gilt für ganze Teilbäume: links stehen kleinere, rechts größere Werte. Suche folgt nur dem passenden Zweig. Einfügen erzeugt neue Knoten entlang des Suchpfads und ignoriert vorhandene Werte; unveränderte Teilbäume dürfen geteilt werden. Tiefe Kopien mit gleicher Struktur werden ebenfalls akzeptiert. Weder Ordnungsvalidierung noch automatisches Balancieren ist Teil dieser ersten Stufe. Ein unbalancierter Suchbaum kann zu einer Kette werden. Weitere Suchbaumoperationen, Balancierung und Graphen folgen später.

## Suchbaumprüfung und Graphen

Zwei weitere Suchbaumübungen finden das Minimum und prüfen die strikte Ordnung mit geerbten unteren/oberen Grenzen. Direkte Kindvergleiche allein übersehen Verstöße gegen weiter entfernte Vorfahren. Duplikate sind in der Validierung ungültig; die Eingaben enthalten endliche Zahlen in strukturell gültigen, zyklusfreien Binärbäumen.

Das Thema **Graphen** stellt gerichtete Nachbarlisten als Objekte mit eigenen String-Schlüsseln vor. Alle genannten Nachbarn sind eigene vorhandene Knoten. Die Nachbarübung bewahrt Reihenfolge und doppelte Kanten; `Object.hasOwn` unterscheidet eigene Knoten von geerbten Eigenschaften. BFS besucht nur vom Start erreichbare Knoten, hält die Nachbarreihenfolge ein und markiert Namen bereits beim Einreihen in einem Set. Dadurch sind Rückkanten, Selbstschleifen und mehrere Wege zum selben Knoten erlaubt. Ein fehlender eigener Start ergibt []; auch leere Stringnamen und Namen wie __proto__ werden unterstützt. Eingabedaten bleiben unverändert. Tiefensuche, kürzeste Wege und weitere Graphoperationen folgen später.

## Praktische Projektbeispiele für alle Lernbereiche

Der Bereich **Projekte** ist über die Seitenleiste oder **Übungen → Projektideen für alle Lernbereiche** erreichbar. Zwölf vollständige Einsteigerprojekte decken JavaScript, Java, Python, HTML/CSS, SQL, React, Angular, Spring Boot, C, C++, C# und Docker ab. Sie enthalten sämtliche Quelldateien, eine Startanleitung, Erklärungen der verwendeten APIs und Herausforderungen zum Weiterbauen. Der ZIP-Download enthält zusätzlich eine README. Die bestehenden Lernpfade werden dadurch ergänzt; die anderen Sprachen haben noch nicht dieselbe Kurstiefe wie JavaScript.

Die Klick-Challenge und die CSS-Quest-Karten lassen sich direkt in einer isolierten iframe-Vorschau ausprobieren. Die Vorschau erlaubt Skripte, aber weder Zugriff auf den App-Ursprung noch Netzwerkverbindungen. Andere Beispiele laufen in der angegebenen eigenen Entwicklungsumgebung. Projektbeispiele schreiben keine automatischen Übungserfolge in den Lernfortschritt.

Die Bibliothek wird als eigener Chunk geladen und vom Service Worker vorab gespeichert: Filtern, Lesen, Browser-Demos und ZIP-Download funktionieren nach der ersten vollständigen Online-Ladung auch offline. Mobil bleiben die vier Hauptbereiche der unteren Navigation bestehen; Projektkarten und Dateireiter scrollen innerhalb ihrer Zeilen.

Validierung dieser Beispiele: C/C++ kompiliert und ausgeführt, SQLite-Rangliste ausgeführt, Python-Eingabeprüfung und JSON-Rekord getestet, Java-Quellstart geprüft sowie React und Angular installiert und erfolgreich gebaut. Spring Boot, C# und der Docker-Container sind hier nicht mit ihrer vollständigen Laufzeit getestet. Die Browser-Tests prüfen mobile Filter, Quellcodewechsel, ZIP-Inhalte, die interaktive Demo und den ersten Offline-Aufruf des Projektbereichs.

## JavaScript: Tiefensuche und kürzeste Wege

Zwei weitere ausführbare Lektionen im Thema **Graphen** ergänzen den JavaScript-Lernpfad. DFS besucht einen Nachbarzweig vollständig, bevor sie zum nächsten zurückkehrt; die rekursive Preorder hält die gespeicherte Nachbarreihenfolge ein. Eine frühe Set-Markierung verhindert Endlosschleifen bei Zyklen. Sehr tiefe Graphen können den JavaScript-Aufrufstack überlaufen; eine iterative Variante folgt später.

Die Wegsuche verwendet BFS mit einer Vorgänger-Map. Sie findet einen Weg mit der kleinsten Kantenzahl in einem gerichteten, ungewichteten Graphen. Bei gleich kurzen Wegen entscheidet die Nachbarreihenfolge. Die Map markiert Knoten beim Einreihen und speichert ihren ersten Vorgänger. Rückverfolgung endet ausdrücklich bei `null`, damit leere Stringnamen erhalten bleiben; `reverse()` verändert ausschließlich das neu erzeugte Pfadarray. Fehlende Endpunkte oder unerreichbare Ziele ergeben `[]`, ein vorhandener Start gleich Ziel ergibt `[start]`. Unterschiedliche Kantengewichte benötigen andere Algorithmen.

Tests prüfen DFS gegenüber BFS, Zyklen, Selbstschleifen, doppelte Kanten, gerichtete Erreichbarkeit, längere Alternativrouten, Gleichstände und eigene Schlüssel wie `__proto__` und `constructor`. Beide Aufgaben erhalten die Eingaben, haben Hinweise und erklärten Lösungscode und funktionieren im Offline-Spielplatz. Damit enthält JavaScript 83 automatisch geprüfte Aufgaben.

## JavaScript: Sortieren und Suchen

Vier Lektionen im Thema **Sortieren & Suchen** erklären numerisches `sort`, Vergleichsfunktionen mit mehreren Regeln, `findIndex` und binäre Suche auf bereits sortierten Zahlenlisten. Zahlen werden auf einer Kopie aufsteigend sortiert; eine Spiele-Bestenliste verwendet Punkte absteigend und ASCII-Namen aufsteigend, bei vollständigem Gleichstand bleibt die Eingabereihenfolge erhalten. Spread kopiert nur das äußere Array: Die Lösung verändert keine geteilten Spielerobjekte.

`findIndex` erwartet einen Boolean-Callback und liefert den ersten Index oder -1; Index 0 ist ein gültiger Treffer. `sort` erwartet dagegen einen negativen, null oder positiven Vergleichswert. Die binäre Suche halbiert den Suchbereich, merkt Treffer und sucht links weiter, um die erste Position bei Duplikaten zu finden. Sie setzt numerische aufsteigende Sortierung voraus und sortiert nicht selbst. Die automatische Prüfung bewertet Ergebnisse und Eingabemutation, nicht die verwendete Syntax oder Laufzeitkomplexität.

27 Übungsfälle prüfen numerische statt lexikografischer Ordnung, negative Zahlen, Dezimalzahlen, Sortiergleichstände, unveränderte Eingaben, fehlende Werte, erste/letzte Positionen und Duplikate. Alle vier Lektionen stehen auch offline im mobilen Spielplatz bereit. JavaScript enthält damit 87 automatisch geprüfte Aufgaben.

## JavaScript: find, some, every und reduce

Vier weitere ausführbare Lektionen erweitern **Arrays**. `find` liefert den ersten passenden Wert und bei fehlendem Treffer `undefined`; die Übung normalisiert diesen zu `null` mit `??`, damit ein gültiger Treffer `0` erhalten bleibt. `some` prüft mindestens einen passenden Artikelbestand und ergibt für `[]` false. `every` prüft alle vorhandenen Zahlen auf Nichtnegativität und ergibt für `[]` true. Die Beispiele verwenden ausdrücklich dichte Arrays und gültige endliche Zahlen; Lücken in Arrays und unbekannte Datentypen gehören nicht zu diesen Aufgaben.

`reduce` berechnet einen Warenkorbwert aus `preisCent * menge`. Der ausdrücklich erklärte Startwert `0` liefert auch bei einem leeren Warenkorb ein Ergebnis. Cent-Beträge und sichere ganzzahlige Eingaben halten dieses Beispiel frei von Dezimalpreis-Rundungsproblemen. Der Lösungstext verfolgt den Akkumulator über zwei Positionen und unterscheidet implizite Arrow-Rückgabe von einem Funktionsblock mit `return`.

24 neue Fälle prüfen erste statt aller Treffer, Wert statt Index, Treffer `0`, leere Listen, some/every-Verwechslungen, Startwert und Stückzahlen. Die Aufgaben erhalten ihre Eingaben und sind mobil sowie offline ausführbar. JavaScript enthält nun 91 automatisch geprüfte Aufgaben.

## Größerer JavaScript-Ausbau: Funktionen, Objektzugriffe, Strings und Promises

26 weitere Lektionen mit 108 neuen Prüffällen bringen den JavaScript-Lernpfad auf **117 automatisch geprüfte Aufgaben**:

- **Funktionen:** Arrow-Ausdrücke und Objekt-Rückgaben, Callbacks, Standardparameter, Rest-Parameter, Spread beim Aufruf, Block-Scope, Closure-Zähler, unabhängige Closures und Funktions-Factories.
- **Objektzugriffe:** Destructuring mit Umbenennung und Standardwerten, Object Rest, flache und verschachtelte Kopien, Optional Chaining mit `??` und berechnete eigene Schlüssel.
- **Asynchroner Code:** `Promise.resolve`, `then`-Ketten, `async/await`, lokale Fehlerbehandlung, `Promise.all` mit unterschiedlich schnellen lokalen Timer-Jobs und `Promise.allSettled`.
- **String-Werkzeuge:** `split`/`join`, wörtliche `replaceAll`-Suche, `padStart` und negative Indizes mit `at`.

Jede Lektion enthält Syntaxbausteine, Erklärung, Aufgabe, Hinweise und Lösung. Die Funktionen werden mit variierenden Eingaben und unveränderten Eingabedaten geprüft. Syntax und bestimmte Methoden sind Lernziele; die automatische Bewertung schreibt keine konkrete Implementierung vor. Die neuen Bereiche ergänzen den Lernpfad vor ihren Anwendungen. DOM-Ereignisse, HTTP-Fetch und Browser-Speicherung folgen in späteren Lektionen.

Der isolierte Worker führt normalen Spielplatzcode jetzt über einen AsyncFunction-Körper aus und wartet auf dessen Abschluss. Damit lässt sich `await` auch auf oberster Ebene im Spielplatz nutzen, einschließlich Beispielen und Aufgabenprüfungen. Das ist eine Spielplatzfunktion: In einer üblichen Script-Datei braucht `await` weiterhin eine async-Funktion oder ein Modul mit Top-Level-Await. Netzwerkzugriff bleibt durch den bestehenden iframe-CSP blockiert. Nicht erfüllte Promises und Endlosschleifen bleiben vom harten Zeitlimit begrenzt. Unbeaufsichtigte Timer oder Promise-Ketten ohne `await` werden nicht automatisch bis zum Abschluss verfolgt; die Beispiele warten ausdrücklich auf ihre Arbeit.

Regressionsprüfungen erkennen fehlende Arrow-Rückgaben, gekoppelte Closure-Zustände, verlustbehaftete `||`-Fallbacks, Mutation über flach kopierte verschachtelte Objekte, nur einmalige Stringersetzung und `return promise` ohne das für ein lokales catch notwendige await. Ein eigener Spielplatztest prüft Timer-Ergebnisse, abgelehntes await, Timeout, Wiederherstellung und Promise.all-Reihenfolge. Mobile Offline-Prüfungen führen auch Closures, Objektkopien, Promises und Stringformatierung aus. Reacts Laufzeit liegt in einem getrennten Build-Chunk und wird ebenfalls für Offline-Nutzung vorab gespeichert.

## Klassen, Fehler, Regex, UTC-Zeit und weitere Promises

22 weitere Lektionen mit 92 Prüffällen erweitern den Lernpfad auf **139 JavaScript-Aufgaben**. **Klassen & this** behandelt Konstruktoren, Instanzmethoden, Getter, gebundene Methoden als Callbacks, private `#`-Felder und `extends`/`super`. **Fehlerbehandlung** behandelt geworfene Error-Objekte, gezielt abgefangene JSON-Syntaxfehler, eigene Fehlerklassen mit Codes und synchrones `finally`.

**Reguläre Ausdrücke** erklärt `.test`, Anker, das i-Flag, globale Treffer, Capture Groups und den veränderlichen `lastIndex` globaler RegExp-Objekte. Die Aufgaben prüfen bewusst auch den Unterschied zwischen Stringgrenzen ohne m-Flag und Zeilengrenzen mit m-Flag; vollständige Eingabeprüfungen dürfen abschließende Zeilenumbrüche nicht versehentlich akzeptieren. Die Beispiele sind keine vollständigen Formulare, E-Mail-Parser oder Zahlenparser.

**Datum & Uhrzeit** nutzt feste ISO-Zeitpunkte mit Zeitzone und UTC-Methoden: ISO-Ausgabe, Datumsteile, Kalendertagaddition und Minutendifferenzen. Die Fälle behandeln Schaltjahre, Monats-/Jahreswechsel, Offsetgleichheit, negative Zeitspannen und halbe Minuten. Ein zusätzlicher Browserkontext in Pacific/Honolulu prüft die Unabhängigkeit von der lokalen Zeitzone. ISO-Eingaben sind entweder garantiert gültige Zeitpunkte oder ausdrücklich klar ungültiger Text; eine umfassende Validierung beliebiger Kalenderstrings ist nicht Teil dieser Stufe.

`Promise.race`, `Promise.any` und `Promise.finally` ergänzen den asynchronen Bereich. Lokale Timer-Jobs benötigen keinen Netzwerkzugriff. Race wird für eine leere Eingabe ausdrücklich umgangen; any fängt auch die Ablehnung für eine leere Liste ab. Hinweise erklären den Unterschied zwischen erstem Abschluss und erstem Erfolg, fehlenden automatischen Jobabbruch und die Weitergabe des ursprünglichen Ergebnisses durch finally. Timerwerte sind keine Echtzeitgarantie; die kurzen Beispieljobs verwenden unterschiedliche Wartezeiten mit Abstand.

Gezielte Browser-Regressionsprüfungen erkennen verlorenes `this`, globalen Regex-Zustand, falsche inklusive Bereichsgrenzen, `race` statt `any` und `then` statt `finally`. Alle neuen Aufgaben erhalten ihre Eingaben, besitzen Erklärungen, Hinweise und Lösungen und bleiben im mobilen Offline-Spielplatz verfügbar. Die Bewertung prüft Verhalten statt einer vorgeschriebenen Syntax.

## Browser-JavaScript: DOM, Events, Speicherung und HTTP

23 neue Lektionen mit 90 Prüffällen erweitern JavaScript auf **162 automatisch geprüfte Aufgaben**. DOM-Lektionen behandeln `querySelector`, `querySelectorAll`, `textContent`, `createElement`, `append`, `classList`, Attribute, `dataset` und Entfernen von Knoten. Events behandeln Klicks, Eingaben, Tastatur, Formularprüfung mit `preventDefault` und Event-Delegation über `closest`. Speicherung erklärt Stringwerte, JSON, defensive Wiederherstellung und gezieltes Löschen. HTTP erklärt `fetch`, `response.json`, Status/`ok`, Fehler, JSON-POST und eine asynchrone UI.

Drei zusammenhängende Browser-Projekte verbinden diese Grundlagen: Taschenrechner mit Eingabeprüfung, Aufgabenliste mit Speicherung und Event-Delegation sowie Klick-Spiel mit dauerhaftem Highscore. Eine vierte Projektlektion trennt Rechenlogik und Oberfläche in lokale ES-Module. Alle Projekte bieten vollständige Referenzlösungen als ZIP mit HTML, JS, CSS und Startanleitung. Der Download enthält die Referenzlösung, nicht den aktuellen Editorinhalt. Die Dateien laufen auf einem lokalen Webserver mit dem echten Browser-DOM; der Speicher gehört dort zur lokalen Website.

Der Browser-Spielplatz besitzt getrennte HTML/JavaScript-Reiter und eine bedienbare Vorschau. Aufgabe und Lösung werden beim manuellen Ausführen automatisch über ihre Übungsfunktion initialisiert. Die Aufgaben zeigen die simulierten Eingaben und Klicks ihres Beispieltests. Die automatische Prüfung startet für jeden Fall eine neue Umgebung, simuliert Eingaben und Events und liest anschließend den von der Aufgabe zurückgegebenen Beobachter. Dadurch lassen sich zustandsbehaftete UIs prüfen. Vorschauaktionen zählen nicht als gelöste Aufgaben; nur bestandene Prüfungen schreiben den Lernfortschritt.

### Ausführungsmodell und Grenzen

Das DOM-Modell kommt aus LinkeDOM und läuft ausschließlich im bestehenden Worker einer iframe mit undurchsichtigem Ursprung. Es unterstützt die in den Lektionen verwendeten Baumoperationen und Events. Layout, Navigation und weitere vollständige Browser-APIs sind nicht implementiert. `select.value` ergänzt die fehlende LinkeDOM-Zuweisung einschließlich der Standardauswahl. Der Worker wird nach zwei Sekunden durch Entfernen seiner iframe beendet, auch bei Endlosschleifen in Event-Handlern.

Die sichtbare Vorschau führt ausschließlich einen eigenen Event-Adapter aus. Nutzer-Skripte und Inline-Handler werden entfernt; CSP sperrt fremde Skripte und Netzwerkanfragen. Klicks und Eingaben werden in einer frisch gestarteten Worker-Umgebung gegen den ursprünglichen Speicherzustand wiederholt. Dies ist ein Lernmodell für deterministische Anwendungen, kein vollständiger Browser: zufällige Werte, freie Timer und beliebige asynchrone Vorgänge können vom interaktiven Browser abweichen. Nach 200 aufgezeichneten Aktionen muss der Code erneut gestartet werden. Der Adapter unterstützt außerdem Enter zum Absenden eines Formulars.

`localStorage` ist im Modell ein isolierter Stringspeicher. Manuelle Läufe speichern ihn pro Lektion unter einem eigenen App-Schlüssel; erneute Läufe und Neuladen stellen ihn wieder her. **Übungsspeicher leeren** setzt nur diesen Speicher zurück. Prüfungen verwenden stattdessen ihre festen Testdaten und verändern den Vorschau-Spielstand nicht. `fetch` verwendet ausschließlich lokale Übungsantworten, einschließlich HTTP- und Netzwerkfehlern. POST-Beispiele verlangen POST, JSON-Header und parsbaren JSON-Text. Unbekannte URLs schlagen fehl; echte APIs sind in diesem Spielplatz nicht erreichbar. Der DOM-Runner wird als eigener Chunk geladen und vom Service Worker für die erste Offline-Nutzung vorab gespeichert.

Browserprüfungen decken mobile Eingaben und Enter, Rechenfehler, sichere Textausgabe, delegiertes Löschen, gespeicherte Aufgaben/Highscores nach Neuladen, bearbeitete Module, ZIP-Inhalte und Ausführung der ZIP-Dateien im nativen Browser ab. Weitere Prüfungen vergleichen die Referenzlösungen mit nativen DOM-/Event-/Response-Objekten und kontrollieren Timeout, Speicherisolation und gesperrte externe Fetch-Aufrufe. Die PWA-Prüfung lädt DOM- und Modul-Runner sowie ZIP-Download erstmals offline. Der Browser-Plugin-Workflow war in dieser Umgebung nicht verfügbar; die Verifikation verwendet Playwright mit installiertem Chromium. Echtes iPhone-Safari wurde nicht ausgeführt.

## Zahlen, Array-Werkzeuge und praktische Rechenlogik

20 weitere Lektionen mit 106 Prüffällen erweitern JavaScript auf **182 automatisch geprüfte Aufgaben**. **Zahlen & Math** unterscheidet `round`, `floor`, `ceil` und `trunc`, erklärt Beträge, Minima/Maxima, Begrenzung, 2D-Abstände, Würfelwürfe, Number-Typprüfungen, numerische Textpräfixe und `toFixed`. `parseInt` und `parseFloat` werden ausdrücklich als Präfixparser erklärt, nicht als vollständige Formularvalidierung. `toFixed` dient der Textausgabe; Geldbeträge werden in den Aufgaben mit ganzen Cent berechnet.

Weitere **Array**-Lektionen erklären `flat(1)`, `flatMap`, `concat`, `splice` auf einer Kopie sowie ein Spielbrett mit pro Zeile neu erzeugten Arrays. **Objekte** ergänzt `Object.fromEntries` und `Object.assign` mit letztem Wert statt Truthiness-Fallback und ausdrücklich flacher Kopie. Zwei **Praxisaufgaben** verbinden die Grundlagen: AABB-Rechteckkollision mit positiver Überschneidungsfläche und ein Checkout mit Centbeträgen, begrenztem Rabatt und Versandprüfung nach dem Rabatt.

Alle Lektionen besitzen Erklärungen, Syntaxbausteine, zwei ausführbare Beispiele, Hinweise und automatisch geprüfte Lösungen. Die Würfelaufgabe nimmt eine feste Zufallsprobe entgegen; für eigene Würfe wird diese Probe aus `Math.random()` erzeugt. So bleiben Prüfungen deterministisch. Die Abstandsfälle verwenden kleine Punkte mit ganzzahligen Ergebnissen; allgemeine Fließkomma-Toleranzen, Kryptozufall und Physiksimulation sind keine Bestandteile dieser Aufgaben. Die Kollision betrachtet achsenparallele Rechtecke ohne Rotation und zählt reine Kantenberührung nicht als Treffer. Beim Checkout sind Grenze und Reihenfolge feste Geschäftsregeln, keine allgemeingültigen Shop-Regeln.

Regressionsprüfungen erkennen falsches Runden bei negativen Zahlen, ungleichmäßige Würfelbereiche durch `round`, zu tiefe Abflachung, direkte Array-Mutation, geteilte Spielbrett-Zeilen, Kantenberührung und eine falsche Versandgrenze. Mobile Offline-Prüfungen führen auch diese neuen Themen aus und erhalten den bisherigen Lernfortschritt. Die automatische Bewertung prüft Ergebnisse und Eingabemutation statt einer vorgeschriebenen Methode oder Laufzeitkomplexität.

## Timer, Animationen und zeitgesteuerte Browser-Projekte

13 weitere Lektionen mit 56 Prüffällen erweitern JavaScript auf **195 automatisch geprüfte Aufgaben**. **Timer & Animation** behandelt `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`, Fälligkeit und Reihenfolge, Debounce, führenden Throttle, `requestAnimationFrame`, `cancelAnimationFrame`, wiederholtes Planen von Frames und Delta-Zeit mit `performance.now`. Die neuen **Browser-Projekte** enthalten eine pausierbare Stoppuhr, einen Reaktionstest mit Fehlstart-Erkennung und eine per Button/Pfeiltaste steuerbare Spielfigur. Alle drei stehen als vollständige Referenzprojekte zum ZIP-Download bereit.

Diese Lektionen verwenden ausdrücklich eine **Übungsuhr**. Die Vorschau läuft nicht automatisch in Echtzeit; Buttons schieben die Zeit um 16, 100 oder 1000 ms vor. Die Prüfungen verwenden feste Zeitvorschübe und lesen anschließend die Ergebnisse. So lassen sich Abläufe an Grenzen reproduzierbar prüfen. Im heruntergeladenen Projekt laufen dieselben Browser-API-Aufrufe mit echten Timern beziehungsweise echten Animationsframes. Die Stoppuhr misst verstrichene Zeit mit Zeitstempeln statt mit der Anzahl ihrer Anzeige-Ticks; mehrfaches Starten erzeugt kein zweites Intervall. Pause und Reset entfernen den ausstehenden Anzeige-Timer.

Die Uhr ist pro Testfall frisch und startet bei 0. Sie ersetzt in den markierten Lektionen Timeout-/Intervall-APIs, `Date.now`, `performance.now` und Animationsframes. Ein Frame wird nach 16 ms geplant; Timerverzögerungen werden mindestens auf 1 ms begrenzt. Reale Framefrequenzen, Hintergrundtab-Verhalten, Mindestwartezeiten und eine vollständige Event-Loop-/Microtask-Simulation sind nicht Bestandteil des Modells. Die Initialisierung soll Timer planen und einen Leser zurückgeben; sie darf nicht vor dem ersten Zeitvorschub auf einen solchen Timer warten. Andere Browser-Lektionen und der normale JavaScript-Runner behalten ihre echten Timer.

Ein Zeitvorschub darf höchstens 60000 ms betragen und höchstens 1000 Callbacks ausführen. Das verhindert Callback-Stürme; zusätzlich bleibt das harte Worker-Zeitlimit bei zwei Sekunden wirksam, auch innerhalb eines Timer-Callbacks. ArrowLeft/Right/Up/Down und die Leertaste werden jetzt ebenfalls aus der Vorschau als Tastaturaktionen übertragen. Das Bewegungsspiel verwendet einen festen Schritt, keine Physiksimulation; die Delta-Zeit-Lektion zeigt die Alternative für variable Zeitabstände.

Die Browserprüfungen decken Start/Pause/Fortsetzen/Reset, Fehlstarts, neue Runden, Tastatursteuerung, sichtbare CSS-Bewegung, begrenzte Callback-Anzahl und Endlosschleifen in Callbacks ab. Eine heruntergeladene Stoppuhr wird zusätzlich mit echten Browser-Timern ausgeführt. Die mobilen PWA-Prüfungen prüfen neue Timer-, Frame- und Projektaufgaben nach dem ersten Offline-Aufruf. Vorschauaktionen verändern weiterhin keinen Übungserfolg.

## Dateien, Canvas, Node.js, SQL und selbst gebaute Projekte

27 neue JavaScript-Lektionen mit 108 Prüffällen erweitern den Lernpfad auf **222 automatisch geprüfte Aufgaben**. Die Bereiche **Dateien & Bilder**, **Canvas & Spiele**, **Node.js & Terminal**, **APIs & SQL** und **Projekte & Tests** behandeln Blob/Text, UTF-8-Bytes, Dateimetadaten, JSON-Schemata, Bildskalierung, Canvas-Koordinaten, Kreis- und Wandkollisionen, Snake-Schritte, Spielzustände, CLI-Argumente, Dateifehler, Portprüfung, HTTP-Routen/Statuscodes, SQL-Parameter, Filter, LEFT JOIN, Pagination und reine Projektlogik. Zwei neue Testwerkstätten prüfen eigene Assertions gegen fehlerhafte API-Validierung und SQL-Parameterpläne.

Die Projektbibliothek enthält jetzt **19 Projekte**. Sieben neue JavaScript-Projekte bieten vollständige ZIP-Referenzen und eigene Startgerüste:

- **Datei-Explorer:** echte vom Benutzer ausgewählte Textdateien lesen, Größenlimit, sichere Textausgabe und JSON-Download.
- **Bildwerkstatt:** PNG/JPEG dekodieren, ohne Verzerrung einpassen, Graustufen und PNG-Export.
- **Canvas-Malstudio:** Pointer-Events für Maus/Finger, skalierte Koordinaten, Farbe, Leeren und PNG-Export.
- **Pong mit Touchsteuerung:** Animationsloop, Delta-Zeit, Schläger, Wand-/Schlägerkollision, Punkte, Pause und Neustart.
- **Node.js-Notizbuch:** echte Ordner/JSON-Dateien, Argumente, readline-Eingaben, Fehlerbehandlung und Prozess-/Dateitests.
- **Aufgaben-API mit SQLite:** Browser-Frontend, echter lokaler HTTP-Server, persistente Datenbank, GET/POST/PATCH/DELETE, gebundene SQL-Werte, Körperlimit und Integrationstests. Zusätzliche SQL-Rezepte zeigen JOIN, LIMIT/OFFSET und Transaktionen.
- **Haushaltsbuch mit Tests:** getrennte ES-Module für Centparser, unveränderliche Datenänderungen, Speicher und DOM; Tests für Grenzen, Fehler und Mutation.

Im **Selbst-bauen-Modus** bleibt der vollständige Referenzcode verborgen, bis du ihn gezielt öffnest. Startgerüste enthalten TODOs statt fertiger Lösungen. Jede Etappe besitzt ein beobachtbares Prüfkriterium und einen separat aufdeckbaren Hinweis. Bestätigte Etappen werden unter `codeklar-build-v1-<projekt-id>` lokal gespeichert. Die UI bezeichnet sie ausdrücklich als **selbst geprüft**; sie verändern keinen automatisch bewerteten Lernfortschritt. Ein Speicherfehler wird angezeigt. Die Programmierung der vollständigen Projekte erfolgt im eigenen Editor; die eingebettete Vorschau zeigt das Referenzverhalten.

Die vier neuen Browserdemos laufen mit echten Browser-APIs in einer isolierten Vorschau ohne Netzwerkzugriff. Ausgewählte Dateien werden nicht hochgeladen. Bild-URLs werden nach dem Dekodieren freigegeben, Download-URLs nach Benutzung. Die Sandbox erlaubt Downloads; Bilder dürfen ausschließlich aus `data:` oder `blob:` stammen. Dateitypen und Größen sind Bedienprüfungen, keine serverseitige Inhaltsprüfung. Pong ist eine kleine Einzelspieler-Demo mit vereinfachter Kollision und auf 40 ms begrenztem Animationsschritt, keine vollständige Physikengine.

**Node.js 24 oder neuer** wird für die externen Node-Projekte vorausgesetzt; sie benötigen keine npm-Abhängigkeiten. SQLite wird über `node:sqlite` ausgeführt (je nach Node-Version mit Experimental-Warnung). Der Server bindet lokal an `127.0.0.1`; das Beispiel ist für eigene Lernprojekte ohne Mehrbenutzer-Anmeldung ausgelegt. Das CLI-Notizbuch ist für einen gleichzeitig schreibenden Prozess gedacht. Das modulare Haushaltsbuch wird über einen lokalen Webserver gestartet; für seine Tests genügt Node.js. Die Cloudflare-Webapp selbst bleibt statisch: Node und SQLite werden nicht im Browser ausgeführt. Die dazugehörigen Browseraufgaben prüfen Parser, Abfragepläne und Datenlogik und benennen diese Grenze ausdrücklich.

Die Browserprüfung verwendet Playwright mit Chromium, weil der Browser-Plugin hier nicht verfügbar ist. Sie prüft Dateiupload/Unicode/sichere Ausgabe, Bildpixel und PNG-Größen, mobile Canvas-Koordinaten, Spielpause, Startgerüst-ZIP und gespeicherte Etappen. Referenz-ZIPs für Node/SQLite/Haushaltsbuch werden entpackt und ihre echten Testdateien ausgeführt. Offline-Prüfungen laden auch die neue Projektbibliothek erstmals ohne Netz. Echtes iPhone-Safari und native Dateiauswahl auf iOS sind weiterhin nicht geprüft.

## URLs, Sprachformate, Generatoren und robuste Anfragen

20 weitere JavaScript-Lektionen mit 73 Prüffällen erweitern den Lernpfad auf **242 automatisch geprüfte Aufgaben**. **URL & Web-Daten** behandelt URL-Bestandteile, relative Pfade, wiederholte Suchparameter, sicheres Schreiben/Kodieren und validierte Seitennummern. **Intl & Anzeige** ergänzt Währungsteile, Prozentwerte, Pluralregeln und Datumsdarstellung mit fester UTC-Zeitzone. **Iteratoren & Generatoren** zeigt `next`, `done`, `function*`, `yield`, `yield*` und eigene wiederholt lesbare Iterables. **Asynchrone Abläufe** und **Projektarchitektur** behandeln native AbortController-Signale, Abbruchgründe, begrenzte Retries, Statusentscheidungen, veraltete Antworten und Caches, die auch 0 speichern.

Die Bewertung verwendet native URL-, Intl-, Iterator- und AbortController-APIs im isolierten Worker. Intl-Fälle wählen Sprache und Zeitzone ausdrücklich; bei Währung und Prozent werden semantische `formatToParts`-Werte geprüft, damit unsichtbare Leerzeichen keine falschen Fehler erzeugen. Generatoraufgaben haben kleine begrenzte Bereiche und erklären, dass vollständiges Sammeln wieder Speicher benötigt. Die Retry-Übung simuliert Antworten durch aufgelöste/abgelehnte Promises ohne Netzwerk oder Wartezeiten; das Limit zählt alle Versuche. Der Statusfilter erlaubt Wiederholen nur im vorgegebenen GET-Modell. Reales Backoff, Retry-After und fachliche Idempotenz bleiben zusätzliche Entwurfsentscheidungen.

Die Bibliothek enthält jetzt **21 Projekte**. Zwei neue Beispiele haben vollständige Referenzen, separate Startgerüste, Selbst-bauen-Etappen und native Tests:

- **URL-Katalog:** Suche, deutsche Titel-/Preissortierung, Pagination und EUR-Ausgabe; Module für Query und Auswahl, echte URL-Änderungen durch `history.replaceState` und Wiederherstellung beim Öffnen eines Links. Die eingebettete Sandbox zeigt ausdrücklich eine Beispiel-URL; der lokal gestartete Download aktualisiert die echte Adresszeile. Node-Tests prüfen Query-Rundlauf, Sonderzeichen, Seitengrenzen, Nullpreise und unveränderte Quelldaten.
- **Anfrage-Labor:** Ladezustände, Abbruch mit `fetch(signal)`, HTTP-Fehler und Schutz vor verspäteten Antworten. Die netzwerkfreie eingebettete Demo benutzt ausdrücklich einen lokalen simulierten Transport mit echten AbortController-Signalen. Der Download startet einen echten lokalen Node-HTTP-Server mit verzögerten Antworten; bei Client-Abbruch wird dessen ausstehender Antworttimer entfernt. Frontend und Node-Tests prüfen Erfolg, Fehler und echte Fetch-Abbrüche.

Katalogmodule benötigen einen lokalen Webserver (z. B. `python3 -m http.server 8000`); Tests laufen mit Node.js 24+. Das Anfrage-Labor startet mit `node server.mjs` auf `127.0.0.1:3000`. Beide benötigen keine npm-Abhängigkeiten. Sie sind Lernprojekte mit festen Beispieldaten. Der Server wird nicht in Cloudflare Pages oder im Browser gestartet. Browserprüfungen vergleichen eingebettete Demos und native ZIP-Projekte; die PWA-Prüfung besucht beide Projekte und ihre Startgerüste erstmals offline. Regressionsfälle erkennen verlorene mehrfach vorkommende Query-Werte, Cache-Fehler bei 0, fehlende Generator-Endwerte und unerwünschte Retries nach Abbruch.

Die interaktive Übungsvorschau bestätigt nun nach dem Installieren ihrer vertrauenswürdigen Eingabe-Bridge ihre Bereitschaft. Der Eltern-Listener wird vor der Darstellung registriert; Zeigeraktionen bleiben bis zur passenden Bestätigung gesperrt. Jede neue Vorschau hat eine eigene Kennung, sodass eine verspätete Bestätigung einer älteren Darstellung sie nicht freigibt. Eine Regression hält die Bestätigung absichtlich zurück, prüft die Sperre, verwirft eine falsche Kennung und bedient danach ein echtes Formular. Dies ergänzt die bestehende Aktionswarteschlange und schützt schnelle Eingaben beim Laden der Vorschau.

## Computer verstehen

Der eigene Lernbereich **Computer verstehen** liegt unter **Computergrundlagen** und ergänzt die Sprachen um **24 Wissenslektionen**. Er behandelt Bits/Bytes, Binär/Hex, kB/KiB und Datenraten, Überlauf/Zweierkomplement/Gleitkomma/Endian, UTF-8/Codepoints/Grapheme/Dateiformate/Pixel sowie CPU, Übersetzung von Quellcode, RAM/SSD, Caches, Adressen, Stack/Heap, Referenzen, Garbage Collection, Prozesse/Threads und virtuellen Speicher. Die JavaScript-Aufgaben bleiben bei 242; Grundlagenfragen haben einen eigenen Fortschritt und sind auch unter Übungen/Nachschlagen verfügbar.

Das **Computer-Labor** bietet drei native, netzwerkfreie Experimente: acht umschaltbare Bits und ein 0–255-Regler mit Binär/Dezimal/Hex/signed Auswertung; echte UTF-8-Kodierung über TextEncoder mit UTF-16-Codeunit- und Codepoint-Zählung; eine schrittweise Simulation LOAD → ADD → STORE → SAVE → Strom aus. Das Modell unterscheidet CPU-Register, flüchtigen RAM und dauerhafte SSD ausdrücklich. Es ändert keine Dateien und bildet keine echten Maschinencodes oder Schreibbarrieren ab. Laboraktionen gelten nicht als gelöste Wissensfragen. Quiz-Ergebnisse nutzen die bestehende persistente Fortschrittsverwaltung.

Die QA verwendet reguläres Playwright mit Chromium (`Browser plugin not available`). Geprüfter Ablauf: Lernbereich öffnen → falsche/richtige Quizantworten prüfen → alle 24 Fragen abschließen und nach Reload wiederfinden → Bit-/UTF-8-/Speichermodell bedienen. Desktop (1505×1045) und Mobil (390×844) prüfen Darstellung, horizontales Überlaufen, Konsolenfehler und Screenshots. Der PWA-Test besucht den Kurs erstmals offline, bedient alle drei Experimente und prüft gespeicherten Fortschritt nach einem Offline-Reload. Echtes iPhone-Safari ist nicht geprüft.

## Schaltungen, Lern-CPU, Systeme und JavaScript-Speicher

**35 weitere Computerlektionen** erweitern „Computer verstehen“ auf **59 Wissensfragen**. Alle vorgeschlagenen Themenbereiche sind enthalten: Transistoren und AND/OR/NOT/XOR, Halb-/Volladdierer, Opcodes/Assembly/Programmzähler/Sprünge, Systemaufrufe/Dateirechte/Pfade/Races/Deadlocks/Abstürze, IP/Ports/DNS/Pakete/TCP/UDP/HTTP/TLS/Latenz, CPU-Kerne/GPU/Engpässe/SSD/Benchmarks/Kompression sowie Zahlentypen/Referenzen/Pointer/Ressourcenverwaltung und unterschiedliche Sprachlaufzeiten. Das sind Grundlagen mit konkreten Beispielen; sie ersetzen keinen vollständigen Elektronik-, Betriebssystem- oder Netzwerklehrgang.

Das neue **System-Labor** hat vier Ansichten. „Gatter & Addition“ enthält Wahrheitstabellen mit veränderbaren Eingängen und eine Vier-Bit-Volladdiererkette mit sichtbaren eingehenden/ausgehenden Überträgen. Die **Lern-CPU** verarbeitet frei editierbare Programme mit `SET`, `ADD`, `LOAD`, `STORE`, `JZ`, `JMP`, `HALT`, Kommentaren und auswählbaren Beispielen. Sie zeigt Register, Programmzähler, 16 RAM-Zellen und feste Zwei-Byte-Befehle; diese Kodierung ist ausdrücklich erfunden. Es gibt kein `eval`, keine native Maschinen-Ausführung und keine Datei- oder Netzwerkoperation. Programme sind auf 64 Befehle/4.000 Zeichen/128 Schritte begrenzt; Adressen, Operanden und Sprungziele werden vor der Ausführung geprüft. ADD rechnet modulo 256. Ein fehlendes HALT oder eine Endlosschleife wird nachvollziehbar gestoppt.

„Referenzen“ zeichnet gemeinsame und getrennte Modellobjekte für Zuweisung, flache und tiefe Kopie. Änderungen am verschachtelten Profil zeigen den Unterschied. Die Nummern sind keine echten Speicheradressen. „Netzwerk“ zeigt eine neue HTTP/1.1-HTTPS-Verbindung als DNS → TCP → TLS → Anfrage → Antwort → Darstellung, mit wählbarem Status 200/404, ohne echtes Netz. Andere HTTP-Versionen, wiederverwendete Verbindungen, Ausfälle und Cachepfade sind bewusst zusätzliche Fälle, keine Behauptung eines universellen Ablaufs. Laboraktionen zählen weiterhin nicht als gelöste Wissensfragen.

**30 JavaScript-Lektionen mit 103 Prüffällen** erweitern den JavaScript-Lernpfad auf **272 Codeaufgaben**. Neue Kategorien: Bits & Binärdaten, Text & Kodierung, Zahlen & Genauigkeit, Speicher & Referenzen, Objekte & Prototypen, Ausführungsmodell, Daten & Protokolle. Sie behandeln Bitmasken/Schieben, Uint8/Int8/ArrayBuffer/DataView/Endian, geteilte TypedArray-Ansichten, strenge UTF-8-Dekodierung, BigInt/sichere Integer/Toleranzen, structuredClone/flaches Freeze/WeakMap/begrenzte LRU-Caches, Prototypen/eigene Eigenschaften/Deskriptoren, native Microtasks/Promise-Reihenfolge/async-Fehler sowie Laufkodierung/Nachrichtenrahmen/Volladdierer/CPU-Zustandsübergänge. Rückgaben mit BigInt werden bewusst als Strings normalisiert. Die Beispiele erklären Datentypgrenzen, Browser-/Node-Unterschiede und dass GC-Zeitpunkte nicht garantiert sind.

QA: reguläres Playwright mit Chromium (`Browser plugin not available`). Die neue Lern-CPU prüft auch ungültige Befehle, Kommentare, Sprünge, Überlauf, Endlosschleifen und Zustandsisolation; alle 256 Vier-Bit-Eingangspaare werden gegen das mathematische Ergebnis geprüft. Alle 30 neuen JavaScript-Referenzen und falsche konstante Antworten laufen im echten isolierten Browser-Worker. Zusätzliche Mutanten prüfen verlorene Präzision, falsche Bitmasken, geteilte Kopien, Microtask-Reihenfolge, LRU-Aktualität und falsche Sprungbedingungen. Alle 59 Quizantworten und ihr gespeicherter Fortschritt werden geprüft. UI-Prüfungen bedienen alle Laboransichten auf Desktop und Mobil; die PWA-Prüfung besucht sie erstmals offline und führt neue Binär-/Speicher-/Microtask-Aufgaben ohne Netzwerk aus. Screenshots bleiben außerhalb des Repos. Echtes iPhone-Safari ist weiterhin nicht geprüft.

Die Laboransichten behalten Eingaben und CPU-Zustand beim Wechsel innerhalb des System-Labors. Die Tabs unterstützen Pfeiltasten, Home und End; benannte Eingabefelder sind auch über assistive Bedienung erreichbar.

## Datenströme, Zeitplanung und Byte-Werkstatt

**20 weitere JavaScript-Lektionen mit 71 Prüffällen** erweitern den Lernpfad auf **292 Codeaufgaben**. Sie behandeln asynchrone Generatoren, serielle Abhängigkeiten, ReadableStream-Reader, pull, cancel, Reader-Sperren, TransformStream, TextDecoderStream, Decoder-Flush mit strenger UTF-8-Prüfung, JSON Lines, begrenzte Promise-Batches, Ergebnisberichte, native ArrayBuffer-Transfers, Worker-Nachrichtenvalidierung/Clone-Fehler, Round Robin sowie Signaturen, Byte-Histogramme, begrenztes Entpacken und Längenpräfixe. Streams und Transfers laufen mit nativen APIs im isolierten Worker; Job-, Netzwerk- und Schedulerübungen verwenden ausdrücklich lokale Modelle. Batch-Verarbeitung ist kein gleitender Pool; Sammeln eines Streams verbraucht weiterhin Speicher für das Ergebnis.

**14 neue Computerlektionen** erweitern „Computer verstehen“ auf **73 Wissensfragen**. Caches/Lokalität/LRU/Invalidierung, Scheduler/Quanten/I/O/Worker/Transfers sowie Backpressure/Chunkgrenzen/Signaturen/Ausgabegrenzen/Endian verbinden Theorie und Anwendung. Das neue **Cache- und Zeitplanungs-Labor** simuliert ein begrenztes LRU-Modell mit Treffer-/Fehlschlagzähler und Verlauf sowie einen Kern mit drei festen Aufgaben und wählbaren Round-Robin-Zeitscheiben. Alle kommen zum Start an; Umschaltkosten und I/O-Wartezeiten werden nicht berechnet. Symbolische Cache-Einträge sind keine echten CPU-Cachelines. Die Aktionen verändern keinen Quiz-Fortschritt.

Die Projektbibliothek enthält nun **22 Beispiele**. **Byte-Werkstatt** liest echte lokale Dateien bis **64 KiB** mit File.arrayBuffer, zeigt bis zu 64 Hexbytes und bis zu 256 Text-Codepoints, prüft UTF-8 streng, wertet zwei Bytes in gewählter Byte-Reihenfolge aus und zählt Byte-Häufigkeiten. PNG/JPEG-Signaturen sind ausdrücklich nur Hinweise, keine vollständige Formatprüfung. Ein gültiger UTF-8-Text beweist nicht, dass es sich um eine Textdatei handelt. TextDecoder nutzt seine normale BOM-Behandlung; die Hexansicht behält Originalbytes. textContent verhindert HTML-Ausführung. Ein JSON-Bericht enthält auch die vollständige Häufigkeitsverteilung. Die eingebettete Demo verwendet dieselben nativen APIs wie die Module im Download; sie benötigt keine Netzwerkverbindung. Ein Versionszähler verwirft verspätete Dateileseergebnisse.

Referenz und Startgerüst enthalten HTML, main.js, bytes.js, sechs native Node-Tests und package.json. Das Startgerüst lässt die UI bestehen und fordert die Implementierung des Analysemoduls. ZIP entpacken, lokal z. B. mit `python3 -m http.server 8000` servieren; Tests mit Node.js 24+ und `npm test`. Dateiinhalte werden nicht hochgeladen oder verändert. Ein Berichtsexport erzeugt nur eine neue JSON-Datei.

QA verwendet Playwright/Chromium (`Browser plugin not available`): alle neuen Stream-/Transfer-Referenzen sowie konstante falsche Lösungen und Mutanten für falsche Stream-Endbedingungen, fehlendes Decoder-Flush, veraltete Nachrichten und fehlende Gesamtausgabelimits. Cache/Scheduler werden auf Zustandsisolation, Verdrängung und vollständige Arbeit geprüft. Die Byte-Werkstatt prüft native Datei-Uploads, Unicode, ungültige Bytes, sichere Ausgabe, Endian, leere/zu große Dateien, Berichtsexport sowie tatsächliche Downloadmodule; ihre ZIP-Tests werden mit Node ausgeführt. Mobil/Desktop prüfen Darstellung und Bedienung, neue Offline-Prüfungen besuchen Labore/Projekt erstmals ohne Netz und führen native Stream-/Transfer-Aufgaben aus. Screenshots bleiben außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

Die Lernnavigation bündelt JavaScript in sieben Hauptbereiche und Computergrundlagen in fünf. Unter dem Hauptbereich stehen nur dessen Themen; der vollständige Lernpfad ist nach aufklappbaren Kapiteln geordnet. Sprünge aus Übungen und die Vorwärtsnavigation wählen den passenden Bereich automatisch. Bestehende Lektions-IDs, die Reihenfolge des Lernpfads und gespeicherter Fortschritt bleiben erhalten. Neue, noch nicht zugeordnete Themen erscheinen unter „Weitere Themen“.

JavaScript-Praxispaket: 16 Fehlerlabore beginnen mit tatsächlich fehlerhaftem Code; 8 Projektbausteine verbinden die Regeln in klaren Funktionsverträgen. Alle 24 Aufgaben werden im isolierten Runner geprüft, einschließlich Eingabemutation. Unter „Projekte & Werkzeuge“ bleiben sie in der bestehenden Kapitelstruktur. Die drei Praxisprojekte Lernkarten-Trainer, Inventar-Dashboard und Schlüssel-Labyrinth bieten jeweils ein interaktives Beispiel, fünf selbst bestätigte Etappen, passende Übungslinks und separate Referenz-/Start-ZIPs mit Node-Tests. Node.js 24 und ein lokaler Webserver reichen aus; zusätzliche Pakete sind nicht nötig. Der Lerntag des Kartentrainers wird ausdrücklich simuliert.

„Fortschritt → Gezielt wiederholen“ schlägt fehlgeschlagene Prüfungen zuerst und fällige gelöste Aufgaben danach vor. Erfolgsserien verwenden 1, 3, 7 und 14 Tage; Fehler setzen die Serie zurück. Historische Abschlüsse bleiben bestehen, auch wenn eine Wiederholung scheitert. Alte Fortschrittsdateien ohne Wiederholungsdaten funktionieren weiter; abgeschlossene Aufgaben werden nach sieben Tagen vorgeschlagen. Die ergänzenden Wiederholungsdaten werden im bestehenden lokalen Fortschritt gespeichert und exportiert. Ein Projekt-Häkchen ist weiterhin eine eigene Bestätigung und kein automatisch geprüfter Abschluss.

QA für dieses Paket: Browser plugin not available, daher vorhandene Playwright-Prüfungen mit Chromium; Zielablauf: Fortschritt → Wiederholung → fehlerhaften Code reparieren → gespeicherter Wiederholungsplan, außerdem Projekt → Demo/Start-ZIP → eigene Umsetzung. Mobile 390×844 und Desktop 1505×844 werden auf Überlauf und Fehler geprüft. Safari auf einem echten iPhone wird hier nicht geprüft.

## Computer verstehen: ruhiger Einstieg

Die 24 Grundlagenlektionen erklären die Idee zuerst in Alltagssprache und drei kleinen Schritten. Alle 73 Computerlektionen zeigen zunächst Erklärung und Beispiel; genaue Begriffe, Datentypgrenzen und weitere Hinweise stehen in „Genauer verstehen“. Der doppelte Beispiel-/Detailbereich neben der Lektion entfällt. Quizfragen, Antworten, IDs und Fortschritt bleiben erhalten.

„Selbst ausprobieren“ öffnet eine Werkstatt mit drei Bereichen. Im Einstieg ist jeweils Bits, Text oder Speichern sichtbar; Cache und Zeitverteilung sind ebenfalls getrennte Ansichten. Das System-Labor trennt Schalterlogik und Addition in eigene Tabs. Eingaben und Modellzustände bleiben beim Wechsel erhalten. Hex/Vorzeichen, Unicode-Zählungen, CPU-Befehlsreferenz, vollständiger CPU-Speicher und Zugriffshistorie sind bei Bedarf aufklappbar.

QA: vorhandenes Playwright/Chromium (Browser plugin not available). Geprüft werden die 73 Quizantworten einschließlich Speicherung, alle Experimentabläufe, erhaltene Zustände nach Bereichswechsel, Darstellung bei 320/390/768/1505 Pixeln und der erste Besuch der Werkstatt ohne Netzwerk in der gebauten PWA. Die Grundlagenmodelle simulieren Hardware; die UTF-8-Ansicht verwendet TextEncoder. Echtes iPhone-Safari ist nicht geprüft.

## Methodenvergleich und Fehlerhilfe

Unter **Nachschlagen** stehen jetzt „Begriffe suchen“, „Methoden vergleichen“ und „Fehler verstehen“. Der Methodenvergleich verwendet dieselbe JSON-Zahlenliste für native `map`, `filter` und `forEach`: frei wählbare Rechen-/Filterregeln, Rückgabe, ausdrücklich befüllte Nebenliste und aufklappbare Callback-Schritte. Die Eingabe ist auf 20 endliche Zahlen im Bereich ±10.000 begrenzt. Ungültige Eingaben zeigen eine verständliche Meldung und keine veralteten Ergebnisse. Die leere Liste ist ein eigenes Beispiel. Es wird kein eingegebener Code ausgeführt.

Die Fehlerhilfe bietet zehn durchsuchbare JavaScript-Beispiele: falscher Methodentyp, Zugriff auf undefined, unbekannter Name, const-Zuweisung, ungültiges JSON, reduce ohne Startwert, fehlendes return, forEach-Rückgabe, numerisches Sortieren und ungültige Array-Länge. Fehlermeldung bzw. falsches Ergebnis, Ursache und Korrektur stehen auf Desktop nebeneinander und mobil in drei getrennten Karten. Feste Beispiele und Korrekturen lassen sich ausführen; native Fehler werden abgefangen. Nur die const-Meldung wird ausdrücklich nachgebildet, da der Bundler die fehlerhafte Zuweisung beim Bauen ablehnt. Browserwortlaut kann variieren. `undefined` in Listen wird sichtbar ausgegeben, statt durch JSON.stringify irreführend zu null zu werden. Links führen direkt in passende bestehende Übungen. Die Werkzeuge verändern keinen Quiz- oder Aufgabenfortschritt und behalten ihren Zustand beim internen Ansichtswechsel.

QA: Browser plugin not available, daher vorhandenes Playwright/Chromium. Ablauf: Nachschlagen → Methodenvergleich → Daten/Regeln ändern → Callback verfolgen; Nachschlagen → Fehlerhilfe → Fehler und Korrektur ausführen → passende Reparaturaufgabe. Geprüft sind alle zehn Beispiele und Übungsziele, leere/ungültige Listen, Eingabegrenzen, Zustandswechsel, 320/390/768/1505-Pixel-Ansichten, Seitenidentität, Framework-Overlay und Konsole sowie der erste Offline-Besuch beider Werkzeuge in der gebauten PWA. Screenshots liegen außerhalb des Repos. Echtes iPhone-Safari ist nicht geprüft.

## Algorithmus-Challenges und eigenständige Projekte

Unter **Übungen → Algorithmus-Challenges** stehen zwölf neue JavaScript-Aufgaben in drei Stufen mit Schwierigkeit-/Statusfilter, nächster offener Aufgabe und bestehendem Aufgabenfortschritt. Vier leichte Aufgaben behandeln Summe, Palindrom, erste Wiederholung und Paarsuche; vier mittlere Aufgaben Klammern, binäre Untergrenze, gleitendes Fenster und Intervalle; vier schwere Aufgaben Raster-Breitensuche, Münzwechsel, Abhängigkeiten und maximale Teilsumme. Jede Aufgabe hat Eingabevertrag, Grenzfälle, eine effiziente Referenz, gestufte Hinweise und Tests auf unveränderte Eingaben. 66 zusätzliche Prüffälle ergänzen den JavaScript-Lernpfad auf 328 Codeaufgaben. Die Challenges bleiben im vorhandenen Hauptbereich „Datenstrukturen & Algorithmen“.

Eine **optionale Stoppuhr** misst Lösungszeit, nicht Code-Laufzeit. Start/Pause/Reset und laufende Zeit bleiben pro Challenge lokal gespeichert; nach Neuladen oder im Hintergrund läuft eine gestartete Uhr weiter. Die Zeitzielwerte sind Orientierung, keine Deadline oder zusätzliche Bestehensregel. Nach Ablauf kann weitergearbeitet werden. Speicherfehler werden sichtbar gemeldet.

Der aufklappbare **Effizienzcheck** fragt Zeit- und Speicherbedarf eines ausdrücklich beschriebenen Ansatzes ab. Er enthält Erklärungen zu Big O, Schleifen, Sortierung, Kopien, Queue-Kopfindex und durchschnittlichen Map-/Set-Zugriffen. Für Sortierung wird O(n log n) angenommen, ohne dies als JavaScript-Spezifikationsgarantie auszugeben. Die Tests prüfen Korrektheit, nicht automatisch Big O; die Einschätzung einer Strategie bewertet keinen beliebigen eingegebenen Code. Der zusätzliche Speicher umfasst Ergebnislisten, nicht die Eingabe. Effizienzantworten und Zeitziel beeinflussen Aufgabenabschlüsse nicht.

„Projekte → Selbst bauen“ ergänzt die Stufen **Mit Hinweisen bauen** und **Eigenständig ohne Hinweise**. Ziele und prüfbare Anforderungen bleiben in beiden Stufen sichtbar; in der eigenständigen Stufe entfallen die Etappenhinweise. Referenzcode bleibt im bestehenden Baumodus verborgen und kann ausdrücklich aufgerufen werden. Etappenhäkchen bleiben eigene Bestätigungen.

QA: Browser plugin not available; vorhandenes Playwright/Chromium prüft alle zwölf Referenzen im isolierten Runner, falsche konstante Antworten, Randfälle, Fortschritt nach Neuladen, Stufenauswahl, Stoppuhr/Pause/Reset/Zeitziel, Komplexitätseinschätzungen und Projektstufen. UI wird bei 320/390/768/1505 Pixeln geprüft; die gebaute PWA löst eine Challenge beim ersten Offline-Besuch. Bestehende Kapitelabdeckung wird geprüft. Screenshots liegen außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Computergrundlagen praktisch anwenden

16 neue **Praxisaufgaben** ergänzen die Computergrundlagen auf 89 Wissensfragen: Bitkombinationen, Binärwerte, 8-Bit-Überlauf, RGB-Pixeldaten, KiB, UTF-8-Größe, falsche Dekodierung, Zweierkomplement, Little Endian, RAM/SSD nach Stromverlust, flache Objektkopien, LRU-Verdrängung, Round Robin, HTTP 404, Transferzeit und zyklische Voraussetzungen. Die Aufgaben bleiben in den bestehenden Themen und Kapiteln. Leicht/Mittel/Knifflig kennzeichnen die Stufen auch in der mobilen Aufgabenansicht. Keine neuen Navigationsgruppen kommen hinzu.

Jede Aufgabe hat eine kurze Einführung, ein Beispiel, eine konkrete Situation, gestufte Hinweise und einen erklärten Lösungsweg nach der Antwort. Modellregeln und Einheiten sind ausdrücklich genannt: rohe RGB-Pixeldaten ohne Dateikopf, UTF-8 ohne BOM/Zeilenumbruch, dezimale MB/Mbit, reine Transferzeit, Zweierkomplement und Queue-Zeitscheiben ohne Umschaltkosten. Die Fragen verwenden den bestehenden Quiz-Fortschritt und bleiben offline erreichbar.

QA: Browser plugin not available; Playwright/Chromium prüft sämtliche 89 Quizantworten und gespeicherten Fortschritt, falsche Antworten mit Hinweis/erneutem Versuch, vorhandene Kapitelzuordnung sowie 320/390/768/1505-Pixel-Ansichten. Rechenantworten werden zusätzlich mit nativen TypedArrays/DataView/TextEncoder und den vorhandenen Cache-/Scheduler-Modellen verglichen. Die gebaute PWA prüft den ersten Offline-Besuch einer Praxisaufgabe. Screenshots liegen außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Erweiterter Lernstoff: Computer verstehen

24 weitere Lehrlektionen erweitern die Computergrundlagen auf **113 Lektionen mit Verständnisfragen**. Sie behandeln Firmware/Bootloader/Kernel, Benutzermodus, Interrupts und Polling, MMU/virtuelle Adressen, Page Faults, Dateisysteme/Metadaten/Journaling, Schreibpuffer und Dauerhaftigkeit, Backup versus Spiegelung, Treiber, Takt versus tatsächliche Leistung, Pipelines/Sprungvorhersage, Cache-Zeilen/Ausrichtung, Objektlayout/Aufrufstapel, System-VMs/Container, Routing/NAT/DNS-Caches und Browser-Rendering.

Jede neue Lektion beginnt mit einer einfachen Einführung, **drei Erklärungsschritten** und einem kleinen Ablauf- oder Datenbeispiel. Zusätzliche Begriffe und technische Grenzen stehen unter „Genauer verstehen“. Die Verständnisfrage, Hinweise und der Lösungsweg nutzen die bestehende Antwortprüfung und den lokalen Fortschritt. „Lernstoff · Grundlage/Vertiefung“ unterscheidet diese Lektionen von den zuvor ergänzten Praxisaufgaben. Alle Themen bleiben in den vorhandenen fünf Hauptbereichen.

Die Texte unterscheiden unter anderem normale Seitenbereitstellung von unerlaubten Speicherzugriffen, Konsistenz von Backups, Taktzyklen von fertiger Arbeit, Durchsatz von Befehlsdauer, VM-Kernel von Containerumgebungen sowie NAT von Verschlüsselung. Beispiele behaupten keine universelle Cache-Zeilengröße, exakte RAM-Objektgröße oder garantierte Geschwindigkeit; Grenzen werden in den Details erklärt.

QA: Browser plugin not available; vorhandenes Playwright/Chromium prüft alle 113 Quizantworten und Fortschritt nach Neuladen, alle 24 neuen Lehransichten mit drei Schritten und aufklappbaren Details, bestehende Kapitelabdeckung sowie Darstellung bei 320/390/768/1505 Pixeln. Die gebaute PWA öffnet und löst eine neue Lektion beim ersten Offline-Besuch. Screenshots liegen außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Linux, macOS, Windows, Physik und Elektrotechnik

Fünf neue Kurse ergänzen **69 Lehrlektionen mit Verständnisfragen**: Linux-Befehle (14), macOS-Befehle (14), Windows-Befehle (14), Physik-Grundlagen (13) und Elektrotechnik (14). Die Navigation bündelt sie unter „Betriebssysteme & Terminal“ und „Naturwissenschaft & Technik“. Je Kurs bleiben drei Themen statt vieler einzelner Kategorien. Alle Lektionen nutzen die ruhige Einspaltenansicht mit Einführung, drei Schritten, Beispiel, optionalen Details, Hinweisen und bestehendem Quiz-Fortschritt.

Die Betriebssystemkurse unterscheiden Terminal und Shell sowie Unix-Bytestrom-Pipelines und PowerShell-Objekt-Pipelines. Linux behandelt Navigation, Dateien, grep, Umleitungen, chmod, Prozesse und Hilfe. macOS ergänzt BSD-/GNU-Unterschiede, open, pbcopy/pbpaste und sw_vers. Windows orientiert sich an PowerShell 7 und behandelt Dateien, LiteralPath, WhatIf, Select-String, Objekt-Pipelines, Get-Help und cmd /c. Befehle sind lesbare Lernbeispiele; **keine native Ausführung, Dateiänderung oder Zwischenablageoperation** erfolgt in der App. Überschreiben und Entfernen werden ausdrücklich eingeordnet.

Physik behandelt SI-Einheiten/Vorsilben, mittlere Geschwindigkeit, Beschleunigung, Kraft/Gewichtskraft, Arbeit, kinetische/Lageenergie, Leistung, Dichte, Frequenz und Temperatur. Elektrotechnik behandelt Spannung/Strom/Widerstand, Ohmsches Gesetz, Gleichstromleistung, Reihe/Parallel, Knoten/Maschen, Kondensatoren, Dioden, LED-Strombegrenzung, Messanordnung und Masse versus Schutzerde. Die Beispiele nennen ihre klassischen, idealen oder quasistatischen Voraussetzungen. Es sind Begriffslektionen und Kleinspannungsmodelle, keine Anleitung zu Netzspannungsarbeiten.

Das aufklappbare **Bewegungs-Labor** berechnet Weg pro Zeit in m/s und km/h. Das **Ohm-Labor** berechnet I = U/R und P = U·I für ideale Gleichstromwiderstände. Eingabebereiche sind begrenzt; leere/ungültige Werte und eine nichtpositive Zeit bzw. ein ungültiger Widerstand zeigen eine Meldung statt alter Ergebnisse. Labore sind Modellrechnungen, keine Gerätemessungen, und verändern keinen Quiz-Fortschritt.

QA: Browser plugin not available; vorhandenes Playwright/Chromium prüft sämtliche 69 neuen Antworten und gespeicherte Abschlüsse, die Erweiterung der Navigation, bestehende Kapitelabdeckung, beide Rechenlabore einschließlich ungültiger Werte, 320/390/768/1505-Pixel-Ansichten und den ersten Offline-Besuch aller fünf Kurse in der gebauten PWA. Numerische Übungsantworten werden zusätzlich gegen die angegebenen Formeln geprüft. Terminal-Beispiele werden zur QA nicht auf dem Host ausgeführt. Screenshots liegen außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Mathematische Formeln statt Codeblöcken

Physik und Elektrotechnik zeigen ihre Formeln mit **nativem MathML**: Brüche, Indizes, Hochzahlen, griechische Formelzeichen und aufrecht gesetzte Einheiten. Allgemeine Formel, eingesetzte Werte und Variablenlegende stehen in einer eigenen Formeldarstellung. Konzeptionelle Beispiele ohne Gleichung erscheinen als normaler Text. Das gilt in der Lektion, in aufklappbaren Details, beim Nachschlagen und in beiden Rechenlaboren. Die Labore zeigen auch den Bruch mit den aktuell eingegebenen Werten.

Es gibt keine externe Formel-Bibliothek, keine externen Scripts/Fonts und keinen Parser für eingegebenen LaTeX-Code. Die festen MathML-Ausdrücke und die normalen Browser-Schriftarten funktionieren offline. Variablen, Einheiten und Operatoren sind semantisch ausgezeichnet; zusätzlich enthält die zugängliche Beschriftung eine lesbare Beschreibung der Formel. Bestehende Beispiele, Quizantworten, Berechnungen und Fortschritts-IDs bleiben erhalten.

QA: Browser plugin not available; Playwright/Chromium prüft alle 27 Physik-/Elektrotechnik-Ansichten ohne Codeblöcke, mathematische Darstellung auch im Nachschlagebereich, variable Laboreingaben, bestehende Rechenantworten und 320/390/768/1505-Pixel-Ansichten. Die gebaute PWA prüft den ersten Offline-Besuch mit Formeln und eingesetzten Werten. Screenshots liegen außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Einfach erklärte Grundlagen und 75 weitere Lektionen

Die fünf neuen Lernbereiche umfassen jetzt **144 Lektionen**: Linux 29, macOS 29, Windows 29, Physik 28 und Elektrotechnik 29. **75 zusätzliche Lektionen** vermitteln jeweils Grundidee, drei Erklärungsschritte, ein Beispiel, Verständnisfrage, Hinweise und Lösungsbegründung. Alle 144 Lektionen bieten ein kontextbezogenes, aufklappbares Begriffslexikon. Ausgewählte Themen ergänzen Alltagsvergleiche und typische Stolpersteine. Die bestehenden drei Kategorien je Kurs bleiben erhalten; zusätzliche Informationen sind eingeklappt, um die Handyansicht lesbar zu halten.

Linux/macOS behandeln zusätzlich Befehlsbausteine, Pfade, Variablen/Anführungszeichen, Wildcards, find, head/tail, sort/uniq, Exit-Status, Standardfehler und Umgebung/PATH. Linux ergänzt Speicherplatz, Benutzeridentität, distributionsabhängige Paketmanager, Netzwerkadressen und HTTP-Header. macOS ergänzt Spotlight, Datenträgerinformationen, Hardwareinformationen, zsh-Konfiguration und Homebrew. Windows erweitert Parameter, Variablen, Pfadprüfung, Objekt-Eigenschaften, Sortieren/Filtern, Umgebung, Befehlsauflösung, Prozesse, Fehlerbehandlung, CSV/JSON, TCP-Tests, Skript-Richtlinien und vollständige Hilfe. Beispiele verändern keine echten Dateien und werden nicht von der App ausgeführt; Folgen verändernder Beispielbefehle werden erklärt.

Physik ergänzt Skalare/Vektoren, Einheitenkontrolle, Flächen-/Volumenumrechnung, Messgenauigkeit, gleichförmige Bewegung, Diagrammsteigung, Trägheit/Kraft-Gegenkraft, Gleitreibung, Druck, Impuls, Energieerhaltung, Wirkungsgrad, Wärme und Wellen. Elektrotechnik ergänzt Ladung, Leiter/Isolatoren, Unterbrechung/Kurzschluss, unbelasteten Spannungsteiler, Quelleninnenwiderstand, Wattstunden, Widerstandsbelastbarkeit/Toleranz, Potentiometer, RC-Zeitkonstante, Kondensatorenergie, Spulen, DC/AC, sinusförmigen Effektivwert und Transistoren. Weitere Gleichungen werden als natives MathML dargestellt, einschließlich Quadratwurzel mit lesbarer zugänglicher Beschreibung. Voraussetzungen wie unbelasteter Ausgang, konstante Größen und reine Sinusform stehen unmittelbar bei der Erklärung.

QA: Browser plugin not available; Playwright/Chromium prüft alle 144 Quizabschlüsse einschließlich Fortschritt nach Neuladen, sämtliche 57 wissenschaftlichen Lehransichten ohne Codeblöcke, zusätzliche Rechenantworten, Quadratwurzeln, Begriffserklärungen, Labore und 320/390/768/1505-Pixel-Ansichten. Die gebaute PWA prüft alle fünf Kurse und neue Inhalte/Begriffe/Formeln beim ersten Offline-Besuch. Build erfolgreich; die bestehende Warnung zur Größe des Hauptbundles bleibt. Screenshots außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Weitere 50 Lektionen: Abläufe und Zusammenhänge

Die fünf Bereiche enthalten jetzt **194 Lektionen**: Linux 39, macOS 39, Windows 39, Physik 38 und Elektrotechnik 39. Die 50 neuen Lektionen ergänzen je Kurs zehn Themen mit drei Erklärungsschritten, Beispiel, gezielten Begriffserklärungen, Verständnisfrage und Lösungsbegründung. Fortgeschrittenere Modelle sind als „Vertiefung“ gekennzeichnet. Vorhandene Kategorien, Fortschritts-IDs und Antworten bleiben erhalten.

Linux und macOS behandeln cut, awk, sed, tar-Inhaltslisten sowie for- und if-Abläufe. Linux ergänzt symbolische Links, rwx-Anzeigen, systemd-Journale und SSH-Grundlagen. macOS ergänzt BSD-stat, plutil, Dateityperkennung und Netzwerkdienstlisten. Windows erweitert Arrays, ForEach-Object, Group-Object, Anzeigeformatierung versus Datenexport, Funktionen, SHA-256-Vergleiche, Profile, cmd-Variablen/Existenzprüfungen und Textkodierungen. Beispiele werden weiterhin nur dargestellt; keine nativen Befehle werden ausgeführt. Plattformabhängigkeiten stehen bei den jeweiligen Beispielen.

Physik ergänzt konstant beschleunigte Ortsänderung, freien Fall, lineare Federn, Drehmoment/Hebel, Kreisbewegung, Auftrieb, ideales Gas, lineare Wärmeausdehnung und Schmelzwärme. Elektrotechnik erweitert Leitungswiderstand, gemischte Widerstandsnetze, Reihen-/Parallelkondensatoren, exponentielle RC-Entladung, Spulenenergie, kapazitiven Blindwiderstand, PWM-Mittelwert, digitale Pegel und Pull-ups. 19 weitere Formeldatensätze verwenden natives MathML; Voraussetzungen und die Bedeutung der Formelzeichen stehen unmittelbar daneben. Die Lektionen unterscheiden unter anderem Betrag/Richtung, absolute Temperatur/Celsius, Mittelwert/momentanen PWM-Pegel, Blindwiderstand/Wirkleistung und Modellrechnung/reale Entladeprüfung.

QA: Browser plugin not available; vorhandenes Playwright/Chromium prüft sämtliche 50 neuen Lehransichten und Antworten inklusive Fehlversuch, Begriffserklärungen und Fortschritt nach Neuladen. Unabhängige Rechenprüfungen kontrollieren die neuen Zahlenbeispiele und wichtige Modellgrenzen. Alle 77 wissenschaftlichen Ansichten werden auf mathematische Darstellung ohne Codeblöcke geprüft; bestehende Kursnavigation und beide Labore bleiben getestet. Exponentialformeln sind bei 320/390/768/1505 Pixeln geprüft. Die gebaute PWA öffnet und löst eine neue Lektion je Kurs beim ersten Offline-Besuch einschließlich Begriffslexikon, Exponentialformel und Fortschritt nach Neuladen. Build erfolgreich; bestehende Warnung zur Größe des Hauptbundles bleibt. Screenshots außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Formelwerkstatt: gesuchte Größe umstellen und selbst lösen

Eine aufklappbare **Formelwerkstatt** ergänzt Physik und Elektrotechnik. **22 fest hinterlegte Formeln mit jeweils drei Zielgrößen** ergeben 66 Umstellungen: Quotienten (auch Zähler/Nenner), Produkte und halbierte Produkte mit einer quadrierten Größe. Die Werkstatt ist sowohl kursweit als auch direkt bei unterstützten Lektionen verfügbar. Ausgangsformel, gleiche Operation auf beiden Seiten, umgestellte Formel und eingesetzte Werte werden als MathML dargestellt. Wurzelumstellungen erklären die mathematischen Vorzeichenmöglichkeiten und wählen im verwendeten Betragsmodell den nichtnegativen Wert.

„Rechnen“ zeigt ein Ergebnis aus den gegebenen Größen. „Selbst lösen“ verbirgt es bis zur erfolgreichen numerischen Antwortprüfung oder dem ausdrücklichen Einblenden der Lösung. Eine relative Rundungsabweichung bis 0,01 % (absolute Untergrenze 10⁻¹²) wird akzeptiert. Das ist eine Prüfung des Zahlenwerts, kein Parser für selbst eingegebene symbolische Umformungen. Formel-/Zielwechsel starten neue Eingaben; Änderungen an gegebenen Werten löschen alte Rückmeldungen und eingeblendete Lösungen. Dezimalkomma und wissenschaftliche Schreibweise werden unterstützt, Tausendertrennzeichen nicht. Nicht endliche, negative oder über 10¹² liegende Eingabewerte werden abgewiesen; Division durch null und nichtpositive Nenner erhalten Erklärungen statt Ergebnissen. Es werden nichtnegative Modellbeträge verwendet, keine allgemeine Rechnung mit gerichteten Größen.

**Zwölf neue Fortschrittslektionen** erklären die Gleichungswaage, Zähler/Nenner, Faktoren, Quadrate, Einheitenwechsel, Nullfälle und eine Differenzumstellung. Die fünf Bereiche umfassen jetzt 206 Lektionen (Linux/macOS/Windows je 39, Physik 44, Elektrotechnik 45). Freies Werkstatttraining verändert den Quiz-Fortschritt nicht; die zwölf Verständnisaufgaben verwenden die bestehende Speicherung. Eigene Folien oder Übungsblätter wurden nicht importiert, da keine Dateien vorliegen. Die Werkstatt umfasst die gelisteten Modelle, keinen allgemeinen symbolischen Algebra-Löser.

QA: Browser plugin not available; Playwright/Chromium prüft alle 66 Berechnungsrichtungen, ungültige/mehrdeutige Nullfälle, Eingabeformate, Wurzelzweige, versteckte Lösungen, Fehler-/Erfolgsantworten und Rückmeldungsreset. Alle zwölf Quizantworten samt Speicherung sind geprüft, ebenso die passende Werkstatt in der Lektion, bestehende Labore und sämtliche 89 wissenschaftlichen Lehransichten ohne Codeblöcke. Die Werkstatt passt bei 320/390/768/1505 Pixeln; erster Offline-Besuch samt Selbstprüfung funktioniert. Build erfolgreich, bestehende Bundle-Größenwarnung bleibt. Screenshots außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Networking, Cloud, Cybersecurity und Reverse Engineering

Vier eigene Lernbereiche ergänzen **48 Lektionen**, jeweils zwölf mit Einführung, drei Erklärungsschritten, Beispiel, gezielten Begriffserklärungen, Verständnisfrage, Hinweisen und Lösungsbegründung. Die Navigation bündelt sie unter „Netzwerke & Cloud“ und „Sicherheit & Analyse“. Jeder Kurs hat drei Kategorien und die bestehende Einspaltenansicht; Übungen, Nachschlagen und lokaler Fortschritt sind integriert.

Networking behandelt Pakete, Schichten, IP-Adressen, Präfixe, Routing, DNS, Ports, TCP/UDP, HTTP/TLS, NAT, Firewalls und schrittweise Diagnose. Cloud vermittelt IaaS/PaaS/SaaS, Regionen/Zonen, VM/Container/Functions, Speicherarten, IAM, geteilte Verantwortung, Skalierung, Load Balancer, Wiederherstellung, Kosten, IaC und Observability. Cybersecurity behandelt Schutzziele, Risiken, Authentifizierung/Autorisierung, Passwortspeicherung, MFA/Passkeys, minimale Rechte, SQL-Parameter, kontextgerechte Webausgabe, Validierung, Updates, Logs und Vorfallreaktion. Reverse Engineering beginnt mit konkreten Analysefragen, Hexzahlen, Byte-Reihenfolge, Textkodierungen, Dateiformaten, Instruktionen, Registern, Aufrufen, Kontrollfluss, statischer/dynamischer Analyse, Decompiler-Grenzen und reproduzierbaren Ergebnissen.

Zwei aufklappbare Experimente ergänzen das Lesen. Das **Byte-Labor** verarbeitet ein bis vier explizit eingegebene Hexbytes als vorzeichenlose Big-/Little-Endian-Zahlen und zeigt Rechenschritte sowie druckbare ASCII-Zeichen. Es lädt und startet keine Binärdateien. Das **Netzwerk-Labor** vergleicht zwei IPv4-Adressen bei Präfixlängen 0 bis 32 und zeigt Adressbereich, Anzahl der Adresswerte und gemeinsamen Präfixanteil. Es prüft keine Erreichbarkeit, führt keine Scans aus und unterscheidet Adresswerte von nutzbaren Hostadressen. Beide Modelle rechnen ausschließlich lokal und verändern keinen Quiz-Fortschritt.

QA: Browser plugin not available; vorhandenes Playwright/Chromium prüft alle 48 Lehransichten, Begriffe und richtigen Antworten einschließlich Fortschritt nach Neuladen, vollständige Kapitelabdeckung, bestehende Formelwerkstatt, neue Navigation/Nachschlagen, ungültige Eingaben und 320/390/768/1505-Pixel-Ansichten. Rechenprüfungen decken Byte-Reihenfolge, den maximalen 32-Bit-Wert, ASCII-Grenzen sowie /0, /31, /32 und ungültige IPv4-Adressen ab. Die gebaute PWA öffnet und löst jeden neuen Kurs beim ersten Offline-Besuch; beide Experimente arbeiten offline. Build erfolgreich, bestehende Warnung zur Hauptbundlegröße bleibt. Screenshots außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Vertiefung der vier Technik- und Sicherheitsbereiche

**60 zusätzliche Lektionen** erweitern Networking, Cloud, Cybersecurity und Reverse Engineering auf jeweils **27 Lektionen**, zusammen 108. Jede Ergänzung enthält drei Erklärungsschritte, ein Beispiel, gezielte Begriffe, Verständnisfrage und Lösungsbegründung; anspruchsvollere Modelle sind als Vertiefung gekennzeichnet. Die bisherigen drei Kategorien je Kurs bleiben erhalten, bestehende Quiz-IDs und Antworten unverändert.

Networking ergänzt ARP, DHCP, IPv6, ICMP, MTU, VLANs, WLAN, VPNs, DNS-Aliase, HTTP/2-/HTTP/3-Streams, Rate versus Latenz, /26-Präfixe, Traceroute, TCP-Nachrichtenrahmung und Verbindungsaufbau. Cloud behandelt virtuelle/private Netze, öffentliche Erreichbarkeit, private Dienstendpunkte, CDN-Caches, verwaltete Datenbanken, Connection Pools, Queues, Idempotenz, begrenzte Retries, Circuit Breaker, zustandsarme Instanzen, Rollouts, Function-Startzeiten, SLOs und Speicher-Lifecycle. Cybersecurity erweitert Sitzungen, Cookie-Eigenschaften, CSRF/CORS, JWT-Prüfung, Hash/Kodierung/Verschlüsselung, Signaturen, Secret-Rotation, begrenzte Serverabrufe, Uploads, kontrollierte Dateipfade, Rate Limits, Lieferketten, Segmentierung und Berechtigungs-Negativtests. Reverse Engineering ergänzt signed-Zahlen/Vorzeichenerweiterung, Bitfelder, Binary32, Textgrenzen, Dateioffset versus Adresse, Padding, Längenprüfungen, CRC/Authentizität, Symbole, Relokation/ASLR, Importe, Optimierungen, Zustandsautomaten und Binärvergleiche.

Das bestehende Byte-Labor zeigt auf Wunsch zusätzlich signed-Werte im Zweierkomplement für seine tatsächliche Bitbreite und beide Byte-Reihenfolgen. Das **Cloud-Labor** berechnet Instanzen × Stunden × Beispielpreis sowie die maximale gemeinsame Poolgrenze. Eingaben sind begrenzt; ungültige Werte blenden alte Ergebnisse aus. Die Kosten enthalten keine weiteren Gebühren und keinen live abgefragten Anbieterpreis. Das **Rechte-Labor** stellt ein festes Modell für Besitzer, Administratoren, andere Benutzer und Gäste dar: Besitzer/Admin dürfen lesen und ändern, alle anderen nur öffentliche Dokumente lesen. Diese Simulation ersetzt keine echte serverseitige Zugriffskontrolle. Alle Experimente sind lokal und beeinflussen keinen Quiz-Fortschritt.

QA: Browser plugin not available; vorhandenes Playwright/Chromium prüft sämtliche 108 Lehransichten, Begriffe und Antworten mit Fortschritt nach Neuladen, vollständige Kapitelabdeckung, bestehende Experimente/Navigation sowie neue Cloud-, Rechte- und signed-Ansichten. Unabhängige Rechnungen prüfen MTU, Bit-/Byte-Rate, /26, Poolgrenzen, SLO und Vorzeichendeutung. Tests decken alle 16 Kombinationen des Rechtemodells, signed-Grenzwerte, ungültige Kosteneingaben und 320/390/768/1505-Pixel-Ansichten ab. Die gebaute PWA öffnet eine neue Lektion je Bereich und sämtliche ergänzten Experimentansichten beim ersten Offline-Besuch. Build erfolgreich; bestehende Warnung zur Hauptbundlegröße bleibt. Screenshots außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Einheitliche Lesedarstellung und weitere 40 Techniklektionen

Networking, Cloud, Cybersecurity und Reverse Engineering enthalten jetzt jeweils **37 Lektionen**, zusammen **148**. Vierzig weitere Lektionen ergänzen TLS-Namensprüfung, autoritative DNS-Dienste, SLAAC, private IPv4-Bereiche, Serverbindung, Proxys, WebSocket, Routingmetrik, TCP-Kontrolle und Mitschnittgrenzen; Cloud-Orchestrierung, Probes, Geheimnisse, Skalierungssignale, Caches, Lesereplikate, Outbox, Partitionen, Kostenzuordnung und Wiederherstellungsübungen; OAuth/OIDC, PKCE, Passwort-Reset, CSP, Browser-Speicher, Zufälligkeit, tatsächliche Rechte-Durchsetzung, fachliche Regeln, Log-Redaktion und Schutzschichten; TLV, Varints, UTF-16, Array-Abstände, Sprungtabellen, Lebensdauer, Haltepunkte, Ablaufspuren, Überlaufmodelle und Parserplanung. Kategorien und vorhandene Fortschritts-IDs bleiben bestehen.

Eine gerenderte Bestandsaufnahme bei 390 Pixeln zeigte unterschiedliche Schriftgrößen: Einführung 17 px, Fließtext 16 px, Abschnittslabels 13 px, Beispiele 14 px in Codeschrift und Hinweise 15 px. Für die vier Technikbereiche verwenden Einführung, Erklärungsschritte, Abschnittslabels, Begriffserklärungen, Details, Hinweise und Labor-Fließtext jetzt **16 px bei 1,75 Zeilenhöhe**. Normale Beispiele erscheinen in Leseschrift; die SQL-Anweisung bleibt ein Codebeispiel. Die Nachschlagekarten verwenden denselben Textbeispiel-Baustein. Titel behalten ihre größere Überschriftenrolle, kleine Rechenannotationen ihre eigene Nebenrolle.

Aufgeklappte Details wiederholen nicht mehr Einleitung, Beispiel und den ersten Erklärungsschritt, sondern zeigen die zusätzliche Begründung und Voraussetzungen. Labore verwenden gleich große Ergebnisfelder in zwei Desktopspalten beziehungsweise einer Handyspalte. Eingabe- und Auswahlfelder übernehmen die Leseschrift. Änderungen sind auf diese vier Bereiche begrenzt; Formeldarstellung und andere Kurse behalten ihre bestehenden Ansichten.

QA: Browser plugin not available; Playwright/Chromium erfasst Vorher-Screenshots und gemessene Schriftgrößen, prüft alle 148 Lehransichten und Antworten mit gespeichertem Fortschritt sowie Kapitelabdeckung. Gerenderte Schrift-/Zeilenhöhen werden für alle vier Kurse bei 320/390/768/1505 Pixeln kontrolliert, ebenso Ergebnisfelder, Text-/SQL-Beispiele beim Nachschlagen, bestehende Formelwerkstatt, Seitenidentität, meaningful content, Fehler-Overlay und Konsole. Die gebaute PWA prüft neue Lektionen und einheitliche Beispiele beim ersten Offline-Besuch; alle bestehenden neuen Experimentansichten bleiben offline geprüft. Build erfolgreich; bestehende Warnung zur Hauptbundlegröße bleibt. Screenshots liegen außerhalb des Repos. Echtes iPhone-Safari ist nicht geprüft.

## Weitere 40 Falllektionen in allen vier Technikbereichen

Networking, Cloud, Cybersecurity und Reverse Engineering enthalten jetzt jeweils **47 Lektionen**, zusammen **188**. Vierzig zusätzliche Falllektionen sind als „Vertiefung“ gekennzeichnet und nutzen die bestehende einheitliche Lesedarstellung, die drei vorhandenen Kategorien je Kurs, gezielte Begriffe und den gespeicherten Quiz-Fortschritt. Jede Lektion trennt Beobachtung, mögliche Ursache und die Grenzen einer Schlussfolgerung.

Networking ergänzt negative/geteilte DNS-Antworten, HTTP 401/403, Verbindungsablehnung versus Timeout, sequenzielle RTT-Wartezeiten, DNS-Änderung versus bestehende Verbindung, UDP-Kürzung, asymmetrisches Routing, lokale Sockets und /23-Präfixrechnung. Cloud behandelt Objektversionen, Dead-Letter-Queues, Leases/Fencing, API-Gateways, Trace-Sampling, unterbrechbare Instanzen, persistente Volumes, verträgliche Schemaänderung, regionalen Wiederanlauf und geplante Jobs. Cybersecurity vertieft Token-Zielgruppen, Abmeldung/Widerruf, Webhook-Herkunft/Wiederholung, Envelope-Verschlüsselung, Archivgrenzen, Unicode-Identitäten, TOCTOU, HSTS, sichere Fehlerantworten und signierte URLs. Reverse Engineering ergänzt Puffer-Anzahlprüfungen, Dateikopf-Längen, ELF-Ladesichten, RVA-Abbildung, Architekturvarianten, ABI-Datenbreiten, Instruktionsgrenzen, Bitfelder, Speicherverantwortung und differenzielle Eingabefälle.

Alle Beispiele bleiben feste lokale Lernfälle. Es werden keine Systeme geprüft, Cloud-Ressourcen bereitgestellt, Archive entpackt oder Binärprogramme gestartet. Bestehende Antworten und IDs bleiben erhalten; neue Lektionen sind an die bisherigen Exporte angehängt.

QA: Browser plugin not available; Playwright/Chromium prüft alle 40 neuen Lehransichten, Beispiele/Begriffe, Fehlversuche und richtige Antworten mit Fortschritt nach Neuladen. Unabhängige Rechnungen prüfen RTT, /23, Elementlängen, Little-Endian-Header, RVA-Offsets und Nibbles; Identitäts-/Kapitelprüfungen verhindern doppelte oder unerreichbare Lektionen. Die bestehende einheitliche Schrift, Nachschlagebeispiele und Labore werden bei 320/390/768/1505 Pixeln kontrolliert. Die gebaute PWA öffnet, erklärt und löst eine neue Lektion je Bereich beim ersten Offline-Besuch und erhält den Fortschritt nach Neuladen. Build erfolgreich; bestehende Warnung zur Hauptbundlegröße bleibt. Screenshots außerhalb des Repos; echtes iPhone-Safari ist nicht geprüft.

## Mobiler Lektionswechsler mit Liste von unten

Die genehmigte Kombination ersetzt auf Handybreiten die horizontale Leiste einzelner Methoden/Lektionen: links/rechts wechseln innerhalb des aktuellen Themas, die Mitte zeigt den vollständigen Namen und die echte Position. Antippen öffnet eine native modale Liste von unten mit allen Lektionen des Themas, aktuellem Eintrag und gespeicherten „Gelöst“-Markierungen. Namen umbrechen; erste/letzte Pfeile sind passend deaktiviert. Das gilt für alle Lernbereiche. Desktop und bestehende Themenauswahl bleiben erhalten.

Die Liste schließt nach Auswahl, über X, Escape, Antippen des Hintergrunds oder einen Abwärts-Pointerzug im Kopfbereich. Native Modalfunktion macht den Hintergrund inert; Fokus und Body-Scrolling werden beim Schließen wiederhergestellt. Lange Listen scrollen intern unter einem festen Titel. Die gewählte Akzentfarbe wird übernommen. Die Auswahl setzt den Lektionstab auf Erklärung; die bisherige Standardauswahl beim vollständigen Neuladen wird nicht geändert. Fortschritt bleibt gespeichert, es gibt keine neuen Lektionen oder Datenformate.

QA: Browser plugin not available; Playwright/Chromium prüft Bedienung, Randpositionen, Fokus/Rückkehr, Escape, Hintergrund-/Gesture-Schließen, Scrollwiederherstellung, Desktopwechsel, Namen/Listen bei 320/390 Pixeln, Themen-Scrollregression sowie die bestehende Schleifenprüfung. Die gebaute PWA prüft Offline-Navigation, JS-Antwortprüfung und gespeicherte Gelöst-Markierungen. Designvergleich mit der ausgewählten Bildreferenz ist in `design-qa.md` dokumentiert; nach Verkleinerung der Liste und interner Flex-Scrollaufteilung bestanden. Build erfolgreich, bestehende Bundle-Größenwarnung bleibt. Screenshotbelege außerhalb des Repos; echtes iPhone-Safari und tatsächliche Hardware-Touchgesten sind nicht geprüft.

## Java: großer Lernpfad und lokale Praxisprojekte

Java enthält jetzt **131 Lektionen**: die bestehende `.equals()`-Lektion bleibt mit ihrer ID und gespeichertem Fortschritt erhalten, dazu kommen **130 neue Lektionen**. Sechs Hauptbereiche bündeln die Themen:

- Einstieg & Sprache: main, Ausgabe, Variablen, Typen, Referenzen, Operatoren, Kontrollfluss, Schleifen, Methoden und Rekursion.
- Strings, Arrays & Collections: Indexgrenzen, Kopieren, Unicode, StringBuilder, Listen, Sets, Maps, Stack, Queue, Comparator, Iterator, Lambdas und Streams.
- Objektorientierung: Konstruktoren, Instanz-/Klassenfelder, Kapselung, Vererbung, Polymorphie, equals/hashCode, Komposition, Interfaces, Records, Enums und Generics.
- Eingaben, Dateien & Fehler: Scanner, Startargumente, parseInt, printf, Paths, UTF-8, Dateien schreiben/lesen/anhängen, Verzeichnisse und Ressourcen, checked/unchecked Exceptions, throw, catch und finally.
- Werkzeuge, Tests & Zahlen: Imports, Pakete, Compiler/Bytecode/JVM, Assertions, Grenz- und Fehlertests, Testdoubles, Array-/Leertests, BigDecimal, BigInteger und java.time.
- Algorithmen, Threads & HTTP: lineare/binäre Suche, Two Sum, Palindrom, Stack-Prüfung, Häufigkeiten, BFS, Komplexität, Threads, Executor, Future, AtomicInteger, synchronized, URI und Request-Aufbau.

Neue Lektionen enthalten drei Erklärungsschritte, ein vollständiges `Main.java`-Programm, eine Ausgabe-Frage mit begründeter Antwort und passende Begriffserklärungen. Mehrzeilige Quizausgaben bleiben mehrzeilig. Wissensaufgaben werden in der App geprüft; es gibt keinen Java-Compiler im Browser. Beispiele benötigen ein **JDK ab Version 17** und starten lokal mit `java Main.java`. Die Beispiele verwenden nur die Standardbibliothek und benötigen keine Netzwerkverbindung. Datei-Beispiele arbeiten in eigenen temporären Dateien/Ordnern und entfernen diese danach.

Drei zusätzliche herunterladbare Projekte enthalten vollständige Quellen, Startanleitungen, Erweiterungsaufgaben, verknüpfte Lektionen und explizit ausgeführte Tests (ohne Abhängigkeit von `-ea`):

- `Calculator.java`: Ganzzahl-Rechner mit Operatorprüfung, Überlauf-/Divisionsfehlern und neun Tests.
- `TicTacToe.java`: lokales Zwei-Personen-Spiel mit gültigen Zügen, Zeilen-/Spalten-/Diagonalgewinnen, Unentschieden und acht Tests.
- `Notebook.java`: Aufgaben mit IDs und Erledigt-Status, UTF-8-Dateispeicherung, Base64 als Formatkodierung und vier Tests. Ein Prozess schreibt die Datei; parallele Schreibzugriffe sind nicht unterstützt. Das Ersetzen der Datei ist atomar, soweit das Dateisystem dies unterstützt; der Fallback ist nicht atomar.

`npm run test:java` kompiliert die tatsächlichen 130 Lernprogramme, führt sie aus und vergleicht ihre Ausgaben. Danach werden Projektquellen kompiliert, alle 21 eingebauten Projektprüfungen ausgeführt und die Terminal-/Dateiabläufe geprüft. Dafür ist ein JDK mit dem Modul `jdk.compiler` erforderlich. Normalerweise wird mit `--release 17` geprüft. Fehlen die Java-17-API-Signaturen in einer abgespeckten Umgebung, meldet das Skript den Fallback auf `-source 17 -target 17`; dieser prüft Syntax/Bytecode gegen die installierte JDK-Bibliothek, nicht gegen einen vollständigen JDK-17-API-Satz. In dieser Umgebung wurden die Programme mit OpenJDK 21 ausgeführt.

QA für diesen Ausbau: Alle 130 neuen Programme kompiliert und mit ihrer erwarteten Ausgabe abgeglichen; drei Projekte mit 21 eingebauten Prüfungen sowie interaktiven Rechner-/Spiel- und Persistenztests bestanden. Sechs gezielte Browserprüfungen bestanden, darunter jede der 131 Java-Lektionen mit Antwortprüfung und Fortschritt nach Neuladen, Kapitel-/ID-Konsistenz, Handyansichten, mehrzeilige Antworten, Nachschlagen, unveränderte Python-Fragen und vollständige Projekt-ZIPs. Die frisch gebaute PWA öffnet den erweiterten Java-Kurs und seine Projekte offline und erhält den Quizfortschritt. Build erfolgreich; bestehende Bundle-Größenwarnung bleibt. Screenshots liegen außerhalb des Repos, echtes iPhone-Safari ist nicht geprüft.
