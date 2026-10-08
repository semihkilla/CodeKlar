# Persönliche Programmier-Lernplattform

## Ziel

Eine deutschsprachige Lernplattform gemeinsam entwickeln und dabei programmieren lernen. Der Schwerpunkt liegt auf Operatoren, Methoden und ihrem praktischen Einsatz. Logisches Verständnis ist bereits vorhanden; Bedeutung, Syntax und Verhalten sollen durch kleine Experimente greifbar werden.

## Lernablauf

1. Eine kurze Erklärung und ein konkretes Codebeispiel lesen.
2. Das Ergebnis vorhersagen.
3. Code ausführen und Eingaben verändern.
4. Das tatsächliche Ergebnis mit der Vorhersage vergleichen.
5. Eine Erklärung der einzelnen Schritte lesen.
6. Eine passende Aufgabe selbst lösen und später wiederholen.

Bei Methoden erklären wir Eingaben, Rückgabewert, mögliche Änderungen an bestehenden Daten und typische Fehler. Bei Operatoren erklären wir Operanden, Ergebnis, Typverhalten und Auswertungsreihenfolge.

## Erste Version – Vorschlag

- JavaScript als erster Lernbereich.
- Operatoren: Zuweisung, Rechnen, Vergleiche, logische Verknüpfungen und Inkrement.
- Methoden: zunächst String- und Array-Methoden, etwa `includes`, `slice`, `push`, `map` und `filter`.
- Kleine Aufgaben: Ausgabe vorhersagen, Fehler korrigieren und Code selbst schreiben.
- Hilfestufen: zuerst Denkanstoß, dann genauerer Hinweis, anschließend erklärter Lösungsweg.
- Nachschlagehilfe direkt an der Aufgabe, damit Begriffe ohne lange Dokumentationssuche erklärt werden.
- Fortschritt pro Thema: begonnen, geübt und erfolgreich gelöst. Der jeweilige Status ergibt sich aus den tatsächlich bearbeiteten Aufgaben.
- Fortschritt zunächst lokal im Browser speichern; später in einer Datenbank.

## Spätere Lernbereiche

- Sprachen: Java, JavaScript, Python, C, C++ und C#.
- Gestaltung: HTML und CSS.
- Frameworks und Bibliotheken: React, Angular und Spring Boot.
- Datenbanken: SQL und relationale Datenmodellierung.
- Werkzeuge: Docker.

Die Bereiche benötigen unterschiedliche Übungen: CSS beispielsweise eine sichtbare Vorschau, SQL Beispieldaten und Abfrageergebnisse, Docker Aufgaben zu Images, Containern und Konfiguration. Sie werden schrittweise ergänzt.

## Technischer Vorschlag

Für die erste Version React mit Vite und JavaScript. Später kann ein Java-Backend mit Spring Boot und PostgreSQL hinzukommen. So werden Technologien aus dem Lernangebot auch beim Bau eingesetzt.

Frei eingegebener Code benötigt eine getrennte Ausführungsumgebung mit Zeit- und Ressourcenlimits. Für JavaScript ist eine isolierte Browser-Ausführung zu prüfen; weitere Sprachen benötigen passende Laufzeitumgebungen. Keine Ausführung direkt im Hauptprozess der Anwendung.

## Gemeinsames Arbeiten

Die App gemeinsam mit dem Assistenten entwickeln, der die Umsetzung übernimmt. Das eigentliche Programmierenlernen erfolgt innerhalb der App. Als Vorbilder dienen LeetCode für Aufgaben und Fortschritt sowie W3Schools für verständliche Erklärungen und direkt nutzbare Beispiele.

## Umgesetzt in Version 0.1

React und Vite bilden die Oberfläche. Die App enthält 58 JavaScript-Codeaufgaben, elf weitere Wissenslektionen, eine durchsuchbare Referenz, Aufgabenfilter und tatsächlichen lokalen Fortschritt mit JSON-Export. Nur JavaScript ist derzeit ausführbar; die übrigen Bereiche enthalten Erklärungen und Wissensfragen.

Weitere Kursinhalte, Konten, Synchronisierung, SQL-Ausführung und Laufzeitumgebungen für andere Sprachen sind spätere Ausbauschritte.

## Mobile Webapp

Das Design ist dunkel; Lila, Blau und Grün sind als gespeicherte Akzentfarben wählbar. Auf dem Handy gibt es eine feste Navigation am unteren Rand und einen direkten Wechsel zwischen Erklärung und Code-Spielplatz. Bedienelemente berücksichtigen Berührung, Bildschirmränder und die Bildschirmtastatur.

Der Produktionsbuild enthält ein PWA-Manifest, Startbildschirm-Icons und einen Offline-Cache. Mitgelieferte Inhalte und JavaScript-Aufgaben funktionieren nach einem ersten vollständigen Laden auch ohne Internet. iPhone- und Android-Installationswege werden in der App erklärt. Für die Nutzung unterwegs wird der Build privat mit Sites über HTTPS bereitgestellt. Die vorgesehene Adresse steht im README; der erfolgreiche Deploymentstatus bestätigt die Veröffentlichung.

## Ausbau: JavaScript-Lernpfad

Zwölf neue Aufgaben ergänzen die bisherigen Methodenlektionen: let/const, function/return, Rechnen, Restoperator, Vergleiche und Negation, if/else, for-Schleifen, Objekte, ??, Template-Strings, push und ein Budget-Rechner. Ein geordneter Pfad bietet eine Übersicht mit Lösungsstatus, die erste offene Aufgabe und Vor-/Zurück-Navigation. Das Nachschlagewerk und die Aufgabenliste übernehmen alle neuen Inhalte. Bestehende Fortschritts-IDs bleiben erhalten.

Objektantworten werden unabhängig von ihrer Eigenschaftsreihenfolge verglichen; Arrayreihenfolge und Typen müssen übereinstimmen. Die App ist weiterhin eine erste Kursstufe und kein vollständiger JavaScript-Kurs.

## Ausbau: Datentypen und mobile Themenleiste

Fünf neue Lektionen ergänzen den Lernpfad direkt nach Variablen: typeof, null/undefined, Number mit NaN-Prüfung, String und Boolean. Sie behandeln typische Unterschiede wie 42 und '42', leere Texte, 0, false, leere Arrays und ungültige Zahlentexte.

Beim Lektionswechsel bleibt die Themenleiste bestehen und behält ihre horizontale Scrollposition. Außerhalb des sichtbaren Ausschnitts ausgewählte Themen oder Lektionen werden nur innerhalb ihrer Zeile sichtbar gemacht.

## Ausbau: Logische Operatoren

Fünf neue Aufgaben erklären ||, !, Rückgabewerte von ||, Kurzschluss mit && und die Rangfolge ! vor && vor ||. Grenzfälle behandeln gesperrte Admins, fehlende Konten und die Unterschiede zwischen || und ??. Die bestehenden Fortschritts-IDs bleiben unverändert.

## Ausbau: Entscheidungen und Kategorien

Drei weitere JavaScript-Aufgaben behandeln else if, den ternären Operator und switch. Die Navigation gruppiert Sprachen, Webgestaltung, Frameworks/Bibliotheken, Datenbanken und Werkzeuge. Alle vorhandenen Kurse zeigen einen Lernpfad mit Themen und Fortschritt je Thema. Die anderen Kurse bleiben erste Wissenslektionen; nur JavaScript ist ausführbar.

## Ausbau: Schleifen

Das eigene Thema Schleifen verbindet die bestehende for-Lektion mit vier neuen Aufgaben zu while, for…of, break und continue. Übungen behandeln inklusive Grenzen, leere Listen, einen negativen Stopwert und das Überspringen einzelner Werte. Alternative korrekte Lösungen sind erlaubt; die Tests prüfen Verhalten statt vorgeschriebener Syntax. Fortschritts-IDs bleiben erhalten.

## Ausbau: Eingaben, Ausgaben und Dateien

Sechs Aufgaben ergänzen trim, Zeilenzerlegung, JSON.parse mit Strukturprüfung und try/catch, JSON.stringify sowie einfaches CSV-Lesen und -Schreiben. Ein eigenes Datei-Labor öffnet ausgewählte Text-/JSON-/CSV-Dateien, hält einen lokalen bearbeitbaren Notizentwurf und erstellt Downloads. CSV-Sonderzeichen werden im Labor korrekt verarbeitet. Ordnererstellung und Dateizugriff in Node.js werden als separate APIs mit Beispiel erklärt. Die eigentliche Node.js-Laufzeit und Funktionen anderer Sprachen bleiben nächste Ausbauschritte.

## Ausbau: Datenstrukturen, erste Stufe

Zwei neue Objektlektionen erklären Object.keys und Object.entries. Drei Aufgaben im Thema Datenstrukturen behandeln Map-Zähler, has/get/set und Set-Eindeutigkeit. Die Übungen prüfen auch vorhandene Werte 0/false/null, unterschiedliche Schlüsseltypen, doppelte Schlüssel, Einfügereihenfolge und unveränderte Eingaben. Weitere Datenstrukturen, Module mit import/export und selbst geschriebene Tests folgen schrittweise.

## Ausbau: Imports und Module

Vier Projekte ergänzen benannte Imports/Exports, Standard-Exports, Import-Aliase und Re-Exports. Mehrere virtuelle Dateien sind direkt editierbar und werden gemeinsam als native ES-Module geprüft. Ungültige Syntax, fehlende Pfade oder Exporte, Zyklen und Endlosschleifen führen zu Rückmeldungen. Nur lokale mitgelieferte Module laufen im Browser-Spielplatz; npm und dynamische Imports folgen später. Selbst geschriebene Tests sind der nächste Lernschritt.

## Ausbau: Eigene Tests

Vier neue Übungen behandeln Assertions, leere Arrays und Null als Randfälle, verschachtelte Strukturvergleiche und erwartete synchrone Fehler. Lernende schreiben echte Testfunktionen in main.js. Der Spielplatz zeigt benannte Assertion-Ergebnisse und prüft die Tests zusätzlich gegen fehlerhafte Implementierungen. Fortschritt zählt nur, wenn die korrekte Implementierung besteht und alle vorgegebenen Fehler erkannt werden. Testhilfen sind lokal im Spielplatz verfügbar; Jest/Vitest, asynchrone Fehler und weitere Datenstrukturen folgen als spätere Schritte.

## Ausbau: Stack und Queue

Vier neue Übungen erklären Stack mit push/pop, einen Undo-Verlauf, Queue mit push/shift und die Entnahme mit einem Kopfindex. Das eigene Thema Stack & Queue liegt im JavaScript-Lernpfad nach Map und Set. Alle Übungen prüfen unveränderte Eingaben sowie passende Randfälle und sind offline verfügbar. Klammerprüfung, verkettete Listen, Bäume und Graphen bleiben spätere Lernschritte.
