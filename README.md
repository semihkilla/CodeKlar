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
