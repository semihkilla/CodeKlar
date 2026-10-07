# Dunkles Design und mobile Webapp

Aktuelle Referenz: `generated_images/exec-c8d9e206-a78c-40f0-b01f-2ee73673a127.png` (853 × 1844; entspricht einem mobilen Verhältnis von ungefähr 390 × 844). Der ältere Entwurf mit Orange ist durch diese Richtung ersetzt. Der Desktop behält seine zwei Lernspalten und übernimmt die dunklen Farben.

## Designsystem

- Hintergrund `#0b101b`, Arbeitsflächen `#121a29`, Code `#0a111d`, Trennlinien `#293449`.
- Text `#edf1fc`, sekundärer Text `#a4afc3`.
- Lila `#9b87ff` als Standard; Blau `#77b7ff` oder Grün `#66d4a2` sind wählbar. Aktionsflächen verwenden dunkle Schrift für einen klaren Kontrast.
- Lokale DM Sans und JetBrains Mono. Programmierligaturen bleiben deaktiviert.
- Mobil: feste Kopfzeile, Paletten-Einstellungen, große Themen- und Lektionsauswahl, Wechsel zwischen Lektion und Spielplatz, feste Navigation am unteren Rand.
- Berührungsflächen sind mindestens 44 px hoch für Hauptaktionen. Suchfelder und Code-Eingabe verwenden mobil 16 px, um automatisches Zoomen beim Tippen auf iOS zu vermeiden.
- Bildschirmränder und Geräteaussparungen werden über Safe-Area-Abstände berücksichtigt; auch Geräte mit Touch-Bedienung in breiten Ansichten nutzen das mobile Layout.
- Native Dialogfunktion für Einstellungen einschließlich Tastaturfokus und Escape. Installation und Offline-Bereitschaft teilen sich diesen Dialog.

## Absichtliche Anpassungen gegenüber dem Bild

Der Lerninhalt bleibt aus der bisherigen App erhalten; insbesondere die Erklärungen der Syntaxbestandteile sind kürzer. Inhalte dürfen vertikal scrollen, statt die Schrift zum Einpassen zu verkleinern. Die Kopfzeile nennt den tatsächlichen Speicherzustand. Der Fortschritt bleibt als zusätzliches Element unter der Lektion erhalten. Im mobilen Spielplatz entfällt die große Einleitung, damit Ausführen und Zurücksetzen bequem erreichbar sind. Auf dem Desktop werden beide Arbeitsbereiche gleichzeitig angezeigt.

## Visueller und funktionaler Abgleich

Referenz und aktuelle Playwright-Screenshots werden mit `view_image` direkt geprüft. Browser-Plugin ist nicht verfügbar; deshalb wird Playwright mit Chromium verwendet. Die Referenz wurde in ihrer nativen Bildgröße angesehen; die App wird in den passenden logischen Handymaßen 390 × 844 geprüft. Weitere geprüfte Größen: 320 × 568, 768 × 1024, 844 × 390 und 1505 × 1045.

| Vergleichspunkt | Prüfung                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Texte           | Hauptüberschrift, Themen, Reiter, Lektion/Spielplatz und Navigation sind vorhanden. Bewusste Textunterschiede stehen oben.                                                    |
| Aufbau          | Kopfzeile, Lernpanel, Lektionsauswahl, Segmentsteuerung und untere Navigation entsprechen der mobilen Referenz.                                                               |
| Farben          | Dunkle Flächen, lila Auswahlzustände und kontrastreiche Aktionsbuttons ersetzen sämtliche orangefarbenen UI-Akzente. Blau und Grün sind geprüfte Alternativen.                |
| Typografie      | Sans-Serif-Inhalte und Monospace-Code bleiben getrennt, Operatoren sind als einzelne Zeichen sichtbar.                                                                        |
| Abstände        | Touch-Flächen, Außenabstände, Rahmen und Safe Areas sind berücksichtigt; Code scrollt innerhalb seines Editors.                                                               |
| Bedienung       | Kein horizontaler Seitenüberlauf; mobiles Umschalten, Ausführen, Testen, Themenwechsel und Dialogbedienung funktionieren.                                                     |
| Offline         | Manifest und alle angegebenen PNG-Icongrößen sind korrekt. Mit aktivem Service Worker funktionieren Neuladen, Suche, Aufgabenprüfung und Fortschritt bei abgeschaltetem Netz. |

Produktionsbuild sowie neun Lern-Integrationstests und fünf PWA-Tests bestehen. Die Installationsoberfläche ist mit simulierten Browserereignissen geprüft; die Anleitung für iPhone wird mit passendem User-Agent geprüft. Es liegt kein Nachweis einer tatsächlichen Installation auf einem physischen Gerät vor. Die anschließende private Veröffentlichung unter einer HTTPS-Adresse wird mit dem Sites-Deploymentstatus verifiziert.

## Lernpfad-Erweiterung

Eine kompakte aufklappbare Pfadübersicht ergänzt die Lernansicht. 18 Schritte sind direkt erreichbar; gelöste Aufgaben bleiben markiert. Die Themenleiste scrollt innerhalb ihres Bereichs, damit auch acht Kategorien auf dem Handy keinen Seitenüberlauf erzeugen. Der Desktop behält die beiden Arbeitsbereiche. Die erweiterten Erklärungen zeigen auch bisher nicht sichtbare Methodendetails.

Neun Lern- und fünf Produktions-PWA-Tests bestehen mit Chromium. Der neue Ablauf wird auf Desktop und 390 × 844 getestet: Grundlagenaufgabe lösen, nach Neuladen fortsetzen, Pfad aufklappen und Budget-Projekt öffnen. Die PWA-Prüfungen decken weiterhin fünf Ansichtsgrößen und Offline-Ausführung ab. Browser plugin not available; Playwright dient als Browserprüfung.

## Korrektur der mobilen Themenauswahl

Die Lernansicht wird nicht mehr bei jedem Lektionswechsel vollständig neu eingehängt. Die horizontale Themenposition bleibt bei Auswahl eines sichtbaren Bereichs erhalten; außerhalb der Zeile liegende aktive Einträge werden ohne vertikales Scrollen sichtbar gemacht. Ein Regressionstest prüft Projekte → Arrays → filter → map und Neuladen bei 390 × 844. Die fünf neuen Typ-Lektionen nutzen das vorhandene Design.

## Logik-Lektionen und längere Lektionsauswahl

Der JavaScript-Lernpfad enthält jetzt 28 Codeaufgaben. Themen und Lektionsauswahl stehen auf eigenen Zeilen; beide scrollen bei Bedarf horizontal innerhalb ihres Bereichs. Elf Lern-Integrationstests und fünf PWA-Tests prüfen unter anderem die Operatorrangfolge, Rückgabewerte, fehlende Konten und den erhaltenen Themenausschnitt. Die Operatorenansicht wird zusätzlich auf Seitenüberlauf bei 390 und 1505 Pixeln Breite geprüft.

## Kategorisierte Lernbereiche

Die Navigation besitzt fünf Gruppen: Programmiersprachen, Webgestaltung, Frameworks/Bibliotheken, Datenbanken und Werkzeuge. Der Lernpfad ist nun in jedem vorhandenen Kurs verfügbar und gruppiert seine Schritte nach Themen mit dem tatsächlichen Lösungsfortschritt. Zwölf Lern-Integrationstests und fünf PWA-Prüfungen decken die Erweiterung ab; dazu gehört ein mobiler Wechsel von einer JavaScript-Kontrollflussaufgabe zum Java-Lernpfad und die gruppierte Navigation.
