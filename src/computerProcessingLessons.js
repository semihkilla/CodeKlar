export const computerProcessingLessons = [
  {
    "id": "computer-cache-hit",
    "course": "computer",
    "category": "Caches & Zugriffe",
    "name": "Treffer und Fehlschlag",
    "title": "Ein Cache-Treffer vermeidet eine langsamere Beschaffung",
    "description": "Ein Cache hält Daten bereit, die bei erneutem Bedarf schneller gefunden werden können. Ein Fehlschlag benötigt zunächst die eigentliche Quelle.",
    "syntax": "A lesen: Miss → A ablegen",
    "parts": [
      [
        "Begriff",
        "Ein Cache hält Daten bereit, die bei erneutem Bedarf schneller gefunden werden können. Ein Fehlschlag benötigt zunächst die eigentliche Quelle."
      ],
      [
        "Modell",
        "Der Cache im Labor speichert symbolische Schlüssel, keine echten CPU-Speicherzeilen. Ein Treffer kostet weiterhin etwas Arbeit; reale Hardware-Caches und Anwendungscaches unterscheiden sich."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Der Cache im Labor speichert symbolische Schlüssel, keine echten CPU-Speicherzeilen. Ein Treffer kostet weiterhin etwas Arbeit; reale Hardware-Caches und Anwendungscaches unterscheiden sich.",
    "example": "A lesen: Miss → A ablegen\nA erneut lesen: Hit",
    "task": "Was passiert bei einem Cache-Miss grundsätzlich?",
    "question": "Was passiert bei einem Cache-Miss grundsätzlich?",
    "options": [
      "Die Daten müssen aus einer anderen Quelle beschafft werden",
      "Die Datei verschwindet sofort",
      "Die CPU kann keine Bits mehr lesen"
    ],
    "answer": 0,
    "hints": [
      "Ein Cache hält Daten bereit, die bei erneutem Bedarf schneller gefunden werden können. Ein Fehlschlag benötigt zunächst die eigentliche Quelle."
    ],
    "explanation": "Ein Miss bedeutet, dass die angefragten Daten dort nicht schon bereitliegen."
  },
  {
    "id": "computer-locality",
    "course": "computer",
    "category": "Caches & Zugriffe",
    "name": "Lokalität",
    "title": "Nahe und wiederholte Zugriffe nutzen Caches besser",
    "description": "Zeitliche Lokalität heißt erneuter Zugriff auf dieselben Daten. Räumliche Lokalität heißt Zugriff auf benachbarte Daten.",
    "syntax": "Zeitlich: A, A, A",
    "parts": [
      [
        "Begriff",
        "Zeitliche Lokalität heißt erneuter Zugriff auf dieselben Daten. Räumliche Lokalität heißt Zugriff auf benachbarte Daten."
      ],
      [
        "Modell",
        "CPU-Caches laden typischerweise Speicherzeilen, die mehrere benachbarte Bytes enthalten. Zufällige Zugriffe auf weit verteilte Daten können schlechter passen. Die tatsächliche Leistung muss gemessen werden."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "CPU-Caches laden typischerweise Speicherzeilen, die mehrere benachbarte Bytes enthalten. Zufällige Zugriffe auf weit verteilte Daten können schlechter passen. Die tatsächliche Leistung muss gemessen werden.",
    "example": "Zeitlich: A, A, A\nRäumlich: Array[0], Array[1], Array[2]",
    "task": "Was beschreibt zeitliche Lokalität?",
    "question": "Was beschreibt zeitliche Lokalität?",
    "options": [
      "Dieselben Daten werden bald erneut gebraucht",
      "Alle Daten liegen zwingend auf einer SSD",
      "Es gibt keine Speicherzugriffe"
    ],
    "answer": 0,
    "hints": [
      "Zeitliche Lokalität heißt erneuter Zugriff auf dieselben Daten. Räumliche Lokalität heißt Zugriff auf benachbarte Daten."
    ],
    "explanation": "Wiederholte Nutzung derselben Daten kann von einem noch vorhandenen Cache-Eintrag profitieren."
  },
  {
    "id": "computer-eviction",
    "course": "computer",
    "category": "Caches & Zugriffe",
    "name": "LRU und Verdrängung",
    "title": "Ein voller Cache braucht eine Verdrängungsregel",
    "description": "LRU verdrängt den am längsten nicht verwendeten Eintrag. Ein Zugriff auf einen vorhandenen Eintrag aktualisiert dessen Position.",
    "syntax": "Limit 2: A, B, A, C",
    "parts": [
      [
        "Begriff",
        "LRU verdrängt den am längsten nicht verwendeten Eintrag. Ein Zugriff auf einen vorhandenen Eintrag aktualisiert dessen Position."
      ],
      [
        "Modell",
        "LRU ist eine Modellregel, nicht die universelle Regel jedes CPU-Caches. Andere Verfahren berücksichtigen Einfügereihenfolge, Häufigkeit oder vereinfachte Näherungen. Unbegrenzte Anwendungscaches können Speicher verbrauchen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "LRU ist eine Modellregel, nicht die universelle Regel jedes CPU-Caches. Andere Verfahren berücksichtigen Einfügereihenfolge, Häufigkeit oder vereinfachte Näherungen. Unbegrenzte Anwendungscaches können Speicher verbrauchen.",
    "example": "Limit 2: A, B, A, C\nBeim Zugriff C wird B verdrängt.",
    "task": "Welcher Eintrag wird im Beispiel bei C entfernt?",
    "question": "Welcher Eintrag wird im Beispiel bei C entfernt?",
    "options": [
      "A",
      "B",
      "C selbst"
    ],
    "answer": 1,
    "hints": [
      "LRU verdrängt den am längsten nicht verwendeten Eintrag. Ein Zugriff auf einen vorhandenen Eintrag aktualisiert dessen Position."
    ],
    "explanation": "A wurde gerade erneut verwendet; B ist der am längsten ungenutzte Eintrag."
  },
  {
    "id": "computer-stale-cache",
    "course": "computer",
    "category": "Caches & Zugriffe",
    "name": "Invalidierung",
    "title": "Ein schneller Cache kann veraltete Daten liefern",
    "description": "Caches brauchen eine Regel, wann Einträge erneuert, verworfen oder umgangen werden.",
    "syntax": "Serverwert 7 → Cache 7",
    "parts": [
      [
        "Begriff",
        "Caches brauchen eine Regel, wann Einträge erneuert, verworfen oder umgangen werden."
      ],
      [
        "Modell",
        "TTL begrenzt die Gültigkeitsdauer, garantiert aber keine sofortige Aktualität. Änderungen können gezielte Invalidierung auslösen. Offline-Daten und Service-Worker-Caches brauchen ebenfalls ein bewusstes Aktualisierungsmodell."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "TTL begrenzt die Gültigkeitsdauer, garantiert aber keine sofortige Aktualität. Änderungen können gezielte Invalidierung auslösen. Offline-Daten und Service-Worker-Caches brauchen ebenfalls ein bewusstes Aktualisierungsmodell.",
    "example": "Serverwert 7 → Cache 7\nServerwert wird 9 → Cache bleibt ohne Erneuerung 7",
    "task": "Was garantiert eine TTL von einer Minute allein nicht?",
    "question": "Was garantiert eine TTL von einer Minute allein nicht?",
    "options": [
      "Dass jede Änderung sofort sichtbar wird",
      "Dass Zeit zur Entscheidung verwendet wird",
      "Dass ein Cache Daten enthalten kann"
    ],
    "answer": 0,
    "hints": [
      "Caches brauchen eine Regel, wann Einträge erneuert, verworfen oder umgangen werden."
    ],
    "explanation": "Ein Eintrag kann bis zum Ablauf oder bis zu einer gezielten Invalidierung veraltet bleiben."
  },
  {
    "id": "computer-scheduling",
    "course": "computer",
    "category": "Zeitplanung & Nebenläufigkeit",
    "name": "Zeitscheiben",
    "title": "Das Betriebssystem verteilt CPU-Zeit",
    "description": "Ein Scheduler wählt aus, welche ausführbare Aufgabe als Nächstes CPU-Zeit erhält.",
    "syntax": "A kurz laufen lassen → B → C → A",
    "parts": [
      [
        "Begriff",
        "Ein Scheduler wählt aus, welche ausführbare Aufgabe als Nächstes CPU-Zeit erhält."
      ],
      [
        "Modell",
        "Das Labor modelliert einen Kern und Aufgaben, die zum Start alle bereit sind. Reale Scheduler kennen Prioritäten, mehrere Kerne, wartende Ein-/Ausgabe und zusätzliche Kosten. Nebenläufigkeit ist nicht automatisch gleichzeitige parallele Ausführung."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Das Labor modelliert einen Kern und Aufgaben, die zum Start alle bereit sind. Reale Scheduler kennen Prioritäten, mehrere Kerne, wartende Ein-/Ausgabe und zusätzliche Kosten. Nebenläufigkeit ist nicht automatisch gleichzeitige parallele Ausführung.",
    "example": "A kurz laufen lassen → B → C → A",
    "task": "Können Aufgaben auf einem einzelnen Kern im Modell abwechselnd Fortschritt machen?",
    "question": "Können Aufgaben auf einem einzelnen Kern im Modell abwechselnd Fortschritt machen?",
    "options": [
      "Ja, durch Zeitscheiben",
      "Nein, nur mit einer GPU",
      "Nur wenn sie dieselbe Datei heißen"
    ],
    "answer": 0,
    "hints": [
      "Ein Scheduler wählt aus, welche ausführbare Aufgabe als Nächstes CPU-Zeit erhält."
    ],
    "explanation": "Zeitwechsel ermöglichen Fortschritt mehrerer Aufgaben, obwohl pro Zeitpunkt nur eine im Modell läuft."
  },
  {
    "id": "computer-quantum",
    "course": "computer",
    "category": "Zeitplanung & Nebenläufigkeit",
    "name": "Quantum",
    "title": "Die Zeitscheibe beeinflusst Reaktionszeit und Wechsel",
    "description": "Ein Quantum ist die maximale Rechenzeit pro Runde im einfachen Round-Robin-Modell.",
    "syntax": "Quantum 1: A, B, C, A ...",
    "parts": [
      [
        "Begriff",
        "Ein Quantum ist die maximale Rechenzeit pro Runde im einfachen Round-Robin-Modell."
      ],
      [
        "Modell",
        "Kleine Quanten verteilen Zeit häufiger, verursachen real aber mehr Umschaltaufwand. Große Quanten können andere Aufgaben länger warten lassen. Das Labor zählt Wechsel ohne reale Zeitkosten."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Kleine Quanten verteilen Zeit häufiger, verursachen real aber mehr Umschaltaufwand. Große Quanten können andere Aufgaben länger warten lassen. Das Labor zählt Wechsel ohne reale Zeitkosten.",
    "example": "Quantum 1: A, B, C, A ...\nQuantum 3: A länger am Stück, dann B ...",
    "task": "Welche Folge können sehr große Quanten im Modell haben?",
    "question": "Welche Folge können sehr große Quanten im Modell haben?",
    "options": [
      "Andere Aufgaben warten länger auf ihre nächste Runde",
      "Jeder Task verbraucht kein RAM mehr",
      "Alle Threads werden automatisch parallel"
    ],
    "answer": 0,
    "hints": [
      "Ein Quantum ist die maximale Rechenzeit pro Runde im einfachen Round-Robin-Modell."
    ],
    "explanation": "Eine Aufgabe kann länger am Stück laufen, bevor eine andere wieder an die Reihe kommt."
  },
  {
    "id": "computer-io-wait",
    "course": "computer",
    "category": "Zeitplanung & Nebenläufigkeit",
    "name": "I/O-Wartezeit",
    "title": "Wartende Aufgaben brauchen nicht ständig die CPU",
    "description": "Bei geeigneten Ein-/Ausgabe-APIs kann eine Aufgabe auf eine Datei oder Antwort warten, während andere Arbeit weiterläuft.",
    "syntax": "Anfrage starten → auf Antwort warten → später fortsetzen",
    "parts": [
      [
        "Begriff",
        "Bei geeigneten Ein-/Ausgabe-APIs kann eine Aufgabe auf eine Datei oder Antwort warten, während andere Arbeit weiterläuft."
      ],
      [
        "Modell",
        "Asynchrone I/O ist nicht automatisch ein eigener Thread pro Anfrage. Laufzeiten und Betriebssysteme setzen unterschiedliche Mechanismen ein. Aktives Polling in einer engen Schleife kann dagegen CPU-Zeit verschwenden."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Asynchrone I/O ist nicht automatisch ein eigener Thread pro Anfrage. Laufzeiten und Betriebssysteme setzen unterschiedliche Mechanismen ein. Aktives Polling in einer engen Schleife kann dagegen CPU-Zeit verschwenden.",
    "example": "Anfrage starten → auf Antwort warten → später fortsetzen",
    "task": "Welche Strategie vermeidet im beschriebenen Modell unnötige aktive Wartearbeit?",
    "question": "Welche Strategie vermeidet im beschriebenen Modell unnötige aktive Wartearbeit?",
    "options": [
      "Eine passende asynchrone I/O-API verwenden",
      "Ohne Pause ständig dieselbe Variable prüfen",
      "Den Dateinamen länger machen"
    ],
    "answer": 0,
    "hints": [
      "Bei geeigneten Ein-/Ausgabe-APIs kann eine Aufgabe auf eine Datei oder Antwort warten, während andere Arbeit weiterläuft."
    ],
    "explanation": "Die Aufgabe kann auf ein Ereignis warten, statt die CPU mit einer Prüfschleife zu beschäftigen."
  },
  {
    "id": "computer-worker",
    "course": "computer",
    "category": "Zeitplanung & Nebenläufigkeit",
    "name": "Web Worker",
    "title": "Rechenarbeit im Browser aus dem UI-Ablauf auslagern",
    "description": "Ein Web Worker führt JavaScript in einem anderen Ausführungskontext aus und kann die Hauptoberfläche entlasten.",
    "syntax": "Hauptthread → postMessage → Worker",
    "parts": [
      [
        "Begriff",
        "Ein Web Worker führt JavaScript in einem anderen Ausführungskontext aus und kann die Hauptoberfläche entlasten."
      ],
      [
        "Modell",
        "Ein gewöhnlicher Worker hat keinen direkten Zugriff auf document. Nachrichten werden üblicherweise strukturiert geklont oder bestimmte Daten übertragen. Startkosten und Datentransport können den Nutzen kleiner Aufgaben überwiegen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein gewöhnlicher Worker hat keinen direkten Zugriff auf document. Nachrichten werden üblicherweise strukturiert geklont oder bestimmte Daten übertragen. Startkosten und Datentransport können den Nutzen kleiner Aufgaben überwiegen.",
    "example": "Hauptthread → postMessage → Worker\nWorker → Ergebnisnachricht → Hauptthread",
    "task": "Kann ein gewöhnlicher Web Worker direkt document.querySelector verwenden?",
    "question": "Kann ein gewöhnlicher Web Worker direkt document.querySelector verwenden?",
    "options": [
      "Nein",
      "Ja, immer",
      "Nur bei Zahlen größer 255"
    ],
    "answer": 0,
    "hints": [
      "Ein Web Worker führt JavaScript in einem anderen Ausführungskontext aus und kann die Hauptoberfläche entlasten."
    ],
    "explanation": "DOM-Arbeit erfolgt gewöhnlich im Hauptkontext; der Worker kann dazu Ergebnisnachrichten schicken."
  },
  {
    "id": "computer-transfer-buffer",
    "course": "computer",
    "category": "Zeitplanung & Nebenläufigkeit",
    "name": "Übertragen und teilen",
    "title": "Buffer übertragen gibt dem Ausgangskontext den Besitz ab",
    "description": "Ein übertragener ArrayBuffer wird im Ausgangskontext abgetrennt. Das unterscheidet sich von gemeinsam genutztem Speicher.",
    "syntax": "Buffer mit 3 Bytes → Transfer",
    "parts": [
      [
        "Begriff",
        "Ein übertragener ArrayBuffer wird im Ausgangskontext abgetrennt. Das unterscheidet sich von gemeinsam genutztem Speicher."
      ],
      [
        "Modell",
        "SharedArrayBuffer verwendet ein anderes Modell und zusätzliche Plattformbedingungen. Transfer erspart geeigneten Daten eine gewöhnliche Kopie, aber Nachrichten haben weiterhin Verwaltungskosten. Die konkrete interne Implementierung ist keine universelle Nullkosten-Garantie."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "SharedArrayBuffer verwendet ein anderes Modell und zusätzliche Plattformbedingungen. Transfer erspart geeigneten Daten eine gewöhnliche Kopie, aber Nachrichten haben weiterhin Verwaltungskosten. Die konkrete interne Implementierung ist keine universelle Nullkosten-Garantie.",
    "example": "Buffer mit 3 Bytes → Transfer\nAusgangsbuffer byteLength = 0",
    "task": "Kann der abgetrennte Ausgangsbuffer danach normal weiterverwendet werden?",
    "question": "Kann der abgetrennte Ausgangsbuffer danach normal weiterverwendet werden?",
    "options": [
      "Nein",
      "Ja, unverändert",
      "Nur wenn die Datei .txt heißt"
    ],
    "answer": 0,
    "hints": [
      "Ein übertragener ArrayBuffer wird im Ausgangskontext abgetrennt. Das unterscheidet sich von gemeinsam genutztem Speicher."
    ],
    "explanation": "Nach dem Transfer ist der Ausgangsbuffer detached; der empfangene Buffer ist nutzbar."
  },
  {
    "id": "computer-backpressure",
    "course": "computer",
    "category": "Streams & Datenfluss",
    "name": "Backpressure",
    "title": "Ein langsamer Empfänger soll den Produzenten bremsen",
    "description": "Backpressure hilft, Produktion und Verbrauch von Daten aufeinander abzustimmen, statt unbegrenzt zu puffern.",
    "syntax": "Produzent schnell → Queue füllt sich → Nachfrage sinkt",
    "parts": [
      [
        "Begriff",
        "Backpressure hilft, Produktion und Verbrauch von Daten aufeinander abzustimmen, statt unbegrenzt zu puffern."
      ],
      [
        "Modell",
        "Eine Queue-Grenze ist nicht automatisch ein hartes Gesamt-Speicherlimit. Chunkgrößen, weitere Puffer und eine Quelle, die Nachfrage ignoriert, beeinflussen das Verhalten. Web Streams bieten Mechanismen zur Nachfragekoordination."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Eine Queue-Grenze ist nicht automatisch ein hartes Gesamt-Speicherlimit. Chunkgrößen, weitere Puffer und eine Quelle, die Nachfrage ignoriert, beeinflussen das Verhalten. Web Streams bieten Mechanismen zur Nachfragekoordination.",
    "example": "Produzent schnell → Queue füllt sich → Nachfrage sinkt",
    "task": "Warum ist unbegrenztes Puffern problematisch?",
    "question": "Warum ist unbegrenztes Puffern problematisch?",
    "options": [
      "Es kann immer mehr Speicher belegen",
      "Es macht Bytes automatisch genauer",
      "Es ersetzt sämtliche Netzwerkprotokolle"
    ],
    "answer": 0,
    "hints": [
      "Backpressure hilft, Produktion und Verbrauch von Daten aufeinander abzustimmen, statt unbegrenzt zu puffern."
    ],
    "explanation": "Wenn Produktion dauerhaft schneller ist als Verbrauch, wächst eine ungebremste Queue."
  },
  {
    "id": "computer-stream-boundary",
    "course": "computer",
    "category": "Streams & Datenfluss",
    "name": "Chunkgrenzen",
    "title": "Ein Datenstück ist nicht automatisch eine Nachricht",
    "description": "Chunkgrenzen hängen vom Transport und Lesen ab. Eine Nachricht oder ein UTF-8-Zeichen kann mehrere Chunks umfassen.",
    "syntax": "UTF-8 für ä: C3 A4",
    "parts": [
      [
        "Begriff",
        "Chunkgrenzen hängen vom Transport und Lesen ab. Eine Nachricht oder ein UTF-8-Zeichen kann mehrere Chunks umfassen."
      ],
      [
        "Modell",
        "Ein zustandsbehafteter Decoder hält unvollständige Sequenzen zurück. Für Nachrichten braucht die Anwendung zusätzlich ein Format, etwa Zeilentrenner oder Längenpräfixe. Ein read ist keine Garantie auf eine ganze Nachricht."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein zustandsbehafteter Decoder hält unvollständige Sequenzen zurück. Für Nachrichten braucht die Anwendung zusätzlich ein Format, etwa Zeilentrenner oder Längenpräfixe. Ein read ist keine Garantie auf eine ganze Nachricht.",
    "example": "UTF-8 für ä: C3 A4\nChunk 1: C3\nChunk 2: A4",
    "task": "Was muss ein UTF-8-Decoder im Beispiel berücksichtigen?",
    "question": "Was muss ein UTF-8-Decoder im Beispiel berücksichtigen?",
    "options": [
      "Das Zeichen geht über zwei Chunks",
      "Jeder Chunk ist ein eigenes vollständiges Zeichen",
      "A4 ist immer ASCII"
    ],
    "answer": 0,
    "hints": [
      "Chunkgrenzen hängen vom Transport und Lesen ab. Eine Nachricht oder ein UTF-8-Zeichen kann mehrere Chunks umfassen."
    ],
    "explanation": "Die beiden Bytes gehören zusammen zu einer UTF-8-Sequenz."
  },
  {
    "id": "computer-file-signature",
    "course": "computer",
    "category": "Dateien & Formate",
    "name": "Magic Bytes",
    "title": "Eine Signatur ist ein Hinweis auf das Dateiformat",
    "description": "Einige Formate haben erkennbare Startbytes. Eine passende Signatur beweist aber nicht, dass der restliche Inhalt gültig ist.",
    "syntax": "PNG beginnt mit 89 50 4E 47 0D 0A 1A 0A",
    "parts": [
      [
        "Begriff",
        "Einige Formate haben erkennbare Startbytes. Eine passende Signatur beweist aber nicht, dass der restliche Inhalt gültig ist."
      ],
      [
        "Modell",
        "Ein vollständiger Parser muss weitere Strukturen prüfen. Dateiendungen, MIME-Typen und Signaturen sind unterschiedliche Informationsquellen. Die Byte-Werkstatt zeigt nur Hinweise und eine begrenzte Vorschau."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein vollständiger Parser muss weitere Strukturen prüfen. Dateiendungen, MIME-Typen und Signaturen sind unterschiedliche Informationsquellen. Die Byte-Werkstatt zeigt nur Hinweise und eine begrenzte Vorschau.",
    "example": "PNG beginnt mit 89 50 4E 47 0D 0A 1A 0A",
    "task": "Reichen acht passende PNG-Startbytes für die Prüfung einer vollständigen PNG-Datei?",
    "question": "Reichen acht passende PNG-Startbytes für die Prüfung einer vollständigen PNG-Datei?",
    "options": [
      "Nein",
      "Ja, jede Datei ist danach garantiert ein Bild",
      "Nur wenn sie in Hex angezeigt werden"
    ],
    "answer": 0,
    "hints": [
      "Einige Formate haben erkennbare Startbytes. Eine passende Signatur beweist aber nicht, dass der restliche Inhalt gültig ist."
    ],
    "explanation": "Der restliche Inhalt kann trotzdem beschädigt oder unvollständig sein."
  },
  {
    "id": "computer-decompress-limit",
    "course": "computer",
    "category": "Dateien & Formate",
    "name": "Ausgabegrenzen",
    "title": "Kleine komprimierte Eingaben können große Ausgaben erzeugen",
    "description": "Eine Entpackfunktion braucht Grenzen für die erzeugte Datenmenge, nicht nur für die Größe der Eingabe.",
    "syntax": "[7, 1000000] steht im Modell für eine Million Wiederholungen.",
    "parts": [
      [
        "Begriff",
        "Eine Entpackfunktion braucht Grenzen für die erzeugte Datenmenge, nicht nur für die Größe der Eingabe."
      ],
      [
        "Modell",
        "Grenzen sollten vor großen Allokationen geprüft werden. Bei Streaming muss auch die bisherige Gesamtausgabe gezählt werden. Verschachtelte Formate können zusätzliche Grenzen für Tiefe, Anzahl und Zeit brauchen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Grenzen sollten vor großen Allokationen geprüft werden. Bei Streaming muss auch die bisherige Gesamtausgabe gezählt werden. Verschachtelte Formate können zusätzliche Grenzen für Tiefe, Anzahl und Zeit brauchen.",
    "example": "[7, 1000000] steht im Modell für eine Million Wiederholungen.",
    "task": "Welche Grenze ist beim Entpacken besonders relevant?",
    "question": "Welche Grenze ist beim Entpacken besonders relevant?",
    "options": [
      "Maximale Gesamtausgabe",
      "Nur die Länge des Dateinamens",
      "Nur die Hintergrundfarbe"
    ],
    "answer": 0,
    "hints": [
      "Eine Entpackfunktion braucht Grenzen für die erzeugte Datenmenge, nicht nur für die Größe der Eingabe."
    ],
    "explanation": "Die erzeugte Ausgabe kann erheblich größer sein als die Eingabe."
  },
  {
    "id": "computer-endianness-file",
    "course": "computer",
    "category": "Dateien & Formate",
    "name": "Dateityp und Endian",
    "title": "Binärdaten nach der Formatspezifikation lesen",
    "description": "Ein binäres Format legt fest, welche Bytes Zahlen, Längen und andere Felder bilden und in welcher Reihenfolge sie gespeichert sind.",
    "syntax": "Bytes 01 00:",
    "parts": [
      [
        "Begriff",
        "Ein binäres Format legt fest, welche Bytes Zahlen, Längen und andere Felder bilden und in welcher Reihenfolge sie gespeichert sind."
      ],
      [
        "Modell",
        "Nicht jedes Zahlenfeld nutzt dieselbe Breite oder dasselbe Vorzeichen. DataView erlaubt die Reihenfolge explizit zu wählen. Eine Hexansicht zeigt Bytes; erst die Spezifikation liefert die Bedeutung."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Nicht jedes Zahlenfeld nutzt dieselbe Breite oder dasselbe Vorzeichen. DataView erlaubt die Reihenfolge explizit zu wählen. Eine Hexansicht zeigt Bytes; erst die Spezifikation liefert die Bedeutung.",
    "example": "Bytes 01 00:\nLittle Endian uint16: 1\nBig Endian uint16: 256",
    "task": "Warum kann dieselbe Bytefolge zwei verschiedene Zahlen ergeben?",
    "question": "Warum kann dieselbe Bytefolge zwei verschiedene Zahlen ergeben?",
    "options": [
      "Die Interpretation und Byte-Reihenfolge unterscheiden sich",
      "Die Bytes ändern sich beim Anzeigen zufällig",
      "Eine SSD enthält nur Dezimaltext"
    ],
    "answer": 0,
    "hints": [
      "Ein binäres Format legt fest, welche Bytes Zahlen, Längen und andere Felder bilden und in welcher Reihenfolge sie gespeichert sind."
    ],
    "explanation": "Die beiden Interpretationen verwenden unterschiedliche Stellenwerte für die Bytepositionen."
  }
];
