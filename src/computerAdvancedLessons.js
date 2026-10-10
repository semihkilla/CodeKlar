export const computerAdvancedLessons = [
  {
    "id": "computer-transistor",
    "course": "computer",
    "category": "Logik & Schaltungen",
    "name": "Transistor",
    "title": "Aus Schaltern werden Logikgatter",
    "description": "Transistoren können elektrische Signale steuern. Digitale Schaltungen kombinieren viele davon zu Logikgattern.",
    "syntax": "Eingangssignal → Transistorschaltung → Ausgangssignal",
    "parts": [
      [
        "Begriff",
        "Transistoren können elektrische Signale steuern. Digitale Schaltungen kombinieren viele davon zu Logikgattern."
      ],
      [
        "Modell",
        "0 und 1 werden durch zulässige Signalbereiche dargestellt. Ein Gatter setzt eine logische Funktion um; es ist keine einzelne Software-Anweisung. Ein realer Chip hat Verzögerungen und verbraucht Energie."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "0 und 1 werden durch zulässige Signalbereiche dargestellt. Ein Gatter setzt eine logische Funktion um; es ist keine einzelne Software-Anweisung. Ein realer Chip hat Verzögerungen und verbraucht Energie.",
    "example": "Eingangssignal → Transistorschaltung → Ausgangssignal",
    "task": "Was beschreibt ein Logikgatter?",
    "question": "Was beschreibt ein Logikgatter?",
    "options": [
      "Eine logische Verknüpfung von Eingängen",
      "Eine Dateiendung",
      "Eine Internetadresse"
    ],
    "answer": 0,
    "hints": [
      "Transistoren können elektrische Signale steuern. Digitale Schaltungen kombinieren viele davon zu Logikgattern."
    ],
    "explanation": "Ein Gatter erzeugt nach einer logischen Regel Ausgangssignale aus Eingangssignalen."
  },
  {
    "id": "computer-and-gate",
    "course": "computer",
    "category": "Logik & Schaltungen",
    "name": "AND",
    "title": "AND: beide Eingänge müssen 1 sein",
    "description": "AND liefert nur dann 1, wenn beide Eingänge 1 sind.",
    "syntax": "A B | AND",
    "parts": [
      [
        "Begriff",
        "AND liefert nur dann 1, wenn beide Eingänge 1 sind."
      ],
      [
        "Modell",
        "Eine Wahrheitstabelle zeigt alle Eingangskombinationen. Für einzelne Bits entspricht dies einer UND-Verknüpfung. In JavaScript ist && dagegen ein kurzschließender Operator, der Operandenwerte zurückgeben kann."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Eine Wahrheitstabelle zeigt alle Eingangskombinationen. Für einzelne Bits entspricht dies einer UND-Verknüpfung. In JavaScript ist && dagegen ein kurzschließender Operator, der Operandenwerte zurückgeben kann.",
    "example": "A B | AND\n0 0 | 0\n0 1 | 0\n1 0 | 0\n1 1 | 1",
    "task": "Welches Ergebnis hat AND für A=1 und B=0?",
    "question": "Welches Ergebnis hat AND für A=1 und B=0?",
    "options": [
      "1",
      "0",
      "2"
    ],
    "answer": 1,
    "hints": [
      "AND liefert nur dann 1, wenn beide Eingänge 1 sind."
    ],
    "explanation": "Nur 1 UND 1 ergibt 1."
  },
  {
    "id": "computer-or-gate",
    "course": "computer",
    "category": "Logik & Schaltungen",
    "name": "OR und NOT",
    "title": "OR und NOT: auswählen und umkehren",
    "description": "OR liefert 1, wenn mindestens ein Eingang 1 ist. NOT kehrt ein einzelnes Bit um.",
    "syntax": "1 OR 0 = 1",
    "parts": [
      [
        "Begriff",
        "OR liefert 1, wenn mindestens ein Eingang 1 ist. NOT kehrt ein einzelnes Bit um."
      ],
      [
        "Modell",
        "OR ist inklusiv: Auch 1 OR 1 ergibt 1. Bei einzelnen modellierten Bits bedeutet NOT 1−Bit. Der bitweise JavaScript-Operator ~ invertiert hingegen 32 Bits eines Number-Operanden."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "OR ist inklusiv: Auch 1 OR 1 ergibt 1. Bei einzelnen modellierten Bits bedeutet NOT 1−Bit. Der bitweise JavaScript-Operator ~ invertiert hingegen 32 Bits eines Number-Operanden.",
    "example": "1 OR 0 = 1\nNOT 1 = 0\nNOT 0 = 1",
    "task": "Was ergibt NOT(0 OR 1)?",
    "question": "Was ergibt NOT(0 OR 1)?",
    "options": [
      "0",
      "1",
      "2"
    ],
    "answer": 0,
    "hints": [
      "OR liefert 1, wenn mindestens ein Eingang 1 ist. NOT kehrt ein einzelnes Bit um."
    ],
    "explanation": "0 OR 1 ist 1; NOT kehrt diesen Wert in 0 um."
  },
  {
    "id": "computer-xor-gate",
    "course": "computer",
    "category": "Logik & Schaltungen",
    "name": "XOR",
    "title": "XOR erkennt unterschiedliche Bits",
    "description": "XOR ergibt 1, wenn genau einer von zwei Eingängen 1 ist.",
    "syntax": "0 XOR 0 = 0",
    "parts": [
      [
        "Begriff",
        "XOR ergibt 1, wenn genau einer von zwei Eingängen 1 ist."
      ],
      [
        "Modell",
        "XOR unterscheidet sich von OR bei 1 und 1. Bitweise XOR kann Bits umschalten; es ersetzt keine kryptografisch sichere Verschlüsselung."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "XOR unterscheidet sich von OR bei 1 und 1. Bitweise XOR kann Bits umschalten; es ersetzt keine kryptografisch sichere Verschlüsselung.",
    "example": "0 XOR 0 = 0\n0 XOR 1 = 1\n1 XOR 0 = 1\n1 XOR 1 = 0",
    "task": "Was ergibt 1 XOR 1?",
    "question": "Was ergibt 1 XOR 1?",
    "options": [
      "0",
      "1",
      "2"
    ],
    "answer": 0,
    "hints": [
      "XOR ergibt 1, wenn genau einer von zwei Eingängen 1 ist."
    ],
    "explanation": "Beide Eingänge sind gleich; XOR liefert 0."
  },
  {
    "id": "computer-half-adder",
    "course": "computer",
    "category": "Logik & Schaltungen",
    "name": "Halbaddierer",
    "title": "Zwei Bits addieren: Summe und Übertrag",
    "description": "Ein Halbaddierer berechnet ein Summenbit mit XOR und einen Übertrag mit AND.",
    "syntax": "A=1, B=1",
    "parts": [
      [
        "Begriff",
        "Ein Halbaddierer berechnet ein Summenbit mit XOR und einen Übertrag mit AND."
      ],
      [
        "Modell",
        "Ein Übertrag wird in die nächste höherwertige Stelle weitergereicht. Ein Halbaddierer hat keinen Eingang für einen vorherigen Übertrag."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein Übertrag wird in die nächste höherwertige Stelle weitergereicht. Ein Halbaddierer hat keinen Eingang für einen vorherigen Übertrag.",
    "example": "A=1, B=1\nSumme = A XOR B = 0\nÜbertrag = A AND B = 1\nErgebnis: 10 (binär)",
    "task": "Welche Ausgänge entstehen bei 1 + 1?",
    "question": "Welche Ausgänge entstehen bei 1 + 1?",
    "options": [
      "Summe 1, Übertrag 0",
      "Summe 0, Übertrag 1",
      "Summe 1, Übertrag 1"
    ],
    "answer": 1,
    "hints": [
      "Ein Halbaddierer berechnet ein Summenbit mit XOR und einen Übertrag mit AND."
    ],
    "explanation": "Dezimal 2 ist binär 10: Übertrag 1 und Summenbit 0."
  },
  {
    "id": "computer-full-adder",
    "course": "computer",
    "category": "Logik & Schaltungen",
    "name": "Volladdierer",
    "title": "Mit Übertrag mehrere Stellen addieren",
    "description": "Ein Volladdierer verarbeitet A, B und einen eingehenden Übertrag. Mehrere können eine Binäraddition bilden.",
    "syntax": "1 + 1 + Carry-In 1 = 3",
    "parts": [
      [
        "Begriff",
        "Ein Volladdierer verarbeitet A, B und einen eingehenden Übertrag. Mehrere können eine Binäraddition bilden."
      ],
      [
        "Modell",
        "Eine einfache Kette reicht den Übertrag von rechts nach links weiter. Echte Prozessoren nutzen häufig aufwendigere Schaltungen, um die Wartezeit zu verkürzen. Das Addierlabor zeigt eine Vier-Bit-Kette."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Eine einfache Kette reicht den Übertrag von rechts nach links weiter. Echte Prozessoren nutzen häufig aufwendigere Schaltungen, um die Wartezeit zu verkürzen. Das Addierlabor zeigt eine Vier-Bit-Kette.",
    "example": "1 + 1 + Carry-In 1 = 3\nSumme = 1, Carry-Out = 1",
    "task": "Was ergibt 1111 + 0001 als vier Bits mit zusätzlichem Übertrag?",
    "question": "Was ergibt 1111 + 0001 als vier Bits mit zusätzlichem Übertrag?",
    "options": [
      "0000 und Übertrag 1",
      "1111 und Übertrag 0",
      "0001 und Übertrag 0"
    ],
    "answer": 0,
    "hints": [
      "Ein Volladdierer verarbeitet A, B und einen eingehenden Übertrag. Mehrere können eine Binäraddition bilden."
    ],
    "explanation": "15 + 1 = 16. In vier Bits bleibt 0000, der Übertrag ist 1."
  },
  {
    "id": "computer-opcode",
    "course": "computer",
    "category": "Maschinencode & Assembly",
    "name": "Opcode",
    "title": "Befehle brauchen eine Kodierung",
    "description": "Ein Opcode bezeichnet eine Maschinenoperation. Weitere Bits können Register, Adressen oder Werte kodieren.",
    "syntax": "Lern-CPU: 01 07 → SET 7",
    "parts": [
      [
        "Begriff",
        "Ein Opcode bezeichnet eine Maschinenoperation. Weitere Bits können Register, Adressen oder Werte kodieren."
      ],
      [
        "Modell",
        "Die Kodierung hängt von der Befehlssatzarchitektur ab. Die Lern-CPU verwendet erfundene feste Zwei-Byte-Befehle, kein x86 oder ARM. Assembly bezeichnet eine lesbare Darstellung von Maschinenbefehlen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Die Kodierung hängt von der Befehlssatzarchitektur ab. Die Lern-CPU verwendet erfundene feste Zwei-Byte-Befehle, kein x86 oder ARM. Assembly bezeichnet eine lesbare Darstellung von Maschinenbefehlen.",
    "example": "Lern-CPU: 01 07 → SET 7\nLern-CPU: 02 05 → ADD 5",
    "task": "Warum ist 01 07 nicht überall derselbe Befehl?",
    "question": "Warum ist 01 07 nicht überall derselbe Befehl?",
    "options": [
      "Die Bedeutung hängt von der Architektur ab",
      "Bytes können keine Befehle enthalten",
      "Jede CPU kennt nur Text"
    ],
    "answer": 0,
    "hints": [
      "Ein Opcode bezeichnet eine Maschinenoperation. Weitere Bits können Register, Adressen oder Werte kodieren."
    ],
    "explanation": "Eine Architektur definiert, welche Bytefolgen welchen Maschinenoperationen entsprechen."
  },
  {
    "id": "computer-pc",
    "course": "computer",
    "category": "Maschinencode & Assembly",
    "name": "Programmzähler",
    "title": "Der Programmzähler zeigt den nächsten Befehl",
    "description": "Der Programmzähler bezeichnet im Modell die nächste Befehlsposition. Nach einem normalen Schritt geht er weiter.",
    "syntax": "PC=0: SET 7",
    "parts": [
      [
        "Begriff",
        "Der Programmzähler bezeichnet im Modell die nächste Befehlsposition. Nach einem normalen Schritt geht er weiter."
      ],
      [
        "Modell",
        "Echte CPUs adressieren häufig Bytepositionen, nicht Zeilennummern. Unsere Lern-CPU zählt Befehlszeilen. Sie zeigt Register, RAM, Befehlsbytes und den nächsten Schritt."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Echte CPUs adressieren häufig Bytepositionen, nicht Zeilennummern. Unsere Lern-CPU zählt Befehlszeilen. Sie zeigt Register, RAM, Befehlsbytes und den nächsten Schritt.",
    "example": "PC=0: SET 7\nPC=1: ADD 5\nPC=2: HALT",
    "task": "Welche Position folgt im Modell auf PC=1 nach einem normalen ADD?",
    "question": "Welche Position folgt im Modell auf PC=1 nach einem normalen ADD?",
    "options": [
      "0",
      "2",
      "Immer 1"
    ],
    "answer": 1,
    "hints": [
      "Der Programmzähler bezeichnet im Modell die nächste Befehlsposition. Nach einem normalen Schritt geht er weiter."
    ],
    "explanation": "Ein normaler Schritt erhöht den Modell-PC um eine Befehlszeile."
  },
  {
    "id": "computer-jump",
    "course": "computer",
    "category": "Maschinencode & Assembly",
    "name": "Sprünge",
    "title": "Sprünge machen Bedingungen und Schleifen möglich",
    "description": "Ein Sprung setzt den Programmzähler auf ein anderes Ziel. Ein bedingter Sprung tut dies nur bei erfüllter Bedingung.",
    "syntax": "0: SET 0",
    "parts": [
      [
        "Begriff",
        "Ein Sprung setzt den Programmzähler auf ein anderes Ziel. Ein bedingter Sprung tut dies nur bei erfüllter Bedingung."
      ],
      [
        "Modell",
        "JZ heißt im Lernmodell: Springe, wenn das Register null ist. Reale Befehlssätze prüfen oft zuvor gesetzte Statusflags. Sprünge können Endlosschleifen erzeugen; das Labor begrenzt die Schrittzahl."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "JZ heißt im Lernmodell: Springe, wenn das Register null ist. Reale Befehlssätze prüfen oft zuvor gesetzte Statusflags. Sprünge können Endlosschleifen erzeugen; das Labor begrenzt die Schrittzahl.",
    "example": "0: SET 0\n1: JZ 3\n2: ADD 5\n3: HALT",
    "task": "Wird ADD 5 hier ausgeführt?",
    "question": "Wird ADD 5 hier ausgeführt?",
    "options": [
      "Ja",
      "Nein",
      "Es läuft immer zweimal"
    ],
    "answer": 1,
    "hints": [
      "Ein Sprung setzt den Programmzähler auf ein anderes Ziel. Ein bedingter Sprung tut dies nur bei erfüllter Bedingung."
    ],
    "explanation": "Das Register ist 0; JZ springt direkt zu HALT und überspringt ADD."
  },
  {
    "id": "computer-assembly",
    "course": "computer",
    "category": "Maschinencode & Assembly",
    "name": "Assembler",
    "title": "Assembly und Assembler unterscheiden",
    "description": "Assembly ist die lesbare Befehlsnotation. Ein Assembler übersetzt sie gemäß einer Architektur in Maschinenkodierung.",
    "syntax": "ADD 5 → Assembler → Befehlsbytes",
    "parts": [
      [
        "Begriff",
        "Assembly ist die lesbare Befehlsnotation. Ein Assembler übersetzt sie gemäß einer Architektur in Maschinenkodierung."
      ],
      [
        "Modell",
        "Ein Hochsprachen-Compiler kann Assembly oder unmittelbar Maschinenobjektdateien erzeugen. Linker verbinden Objektdateien und lösen Verweise auf. Assembly ist architekturspezifisch und nicht einfach eine universelle schnellere Sprache."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein Hochsprachen-Compiler kann Assembly oder unmittelbar Maschinenobjektdateien erzeugen. Linker verbinden Objektdateien und lösen Verweise auf. Assembly ist architekturspezifisch und nicht einfach eine universelle schnellere Sprache.",
    "example": "ADD 5 → Assembler → Befehlsbytes",
    "task": "Was tut ein Assembler?",
    "question": "Was tut ein Assembler?",
    "options": [
      "Er übersetzt Assembly in Maschinenkodierung",
      "Er speichert ausschließlich Bilder",
      "Er ersetzt das Betriebssystem durch JavaScript"
    ],
    "answer": 0,
    "hints": [
      "Assembly ist die lesbare Befehlsnotation. Ein Assembler übersetzt sie gemäß einer Architektur in Maschinenkodierung."
    ],
    "explanation": "Er ordnet die lesbaren Befehle der vorgegebenen Maschinenkodierung zu."
  },
  {
    "id": "computer-syscall",
    "course": "computer",
    "category": "Betriebssystem praktisch",
    "name": "Systemaufruf",
    "title": "Programme bitten das Betriebssystem um Dienste",
    "description": "Systemaufrufe vermitteln kontrolliert Dienste wie Dateioperationen, Prozesse und Netzwerkzugriffe.",
    "syntax": "Programm → Bibliothek → Systemaufruf → Kernel → Gerät",
    "parts": [
      [
        "Begriff",
        "Systemaufrufe vermitteln kontrolliert Dienste wie Dateioperationen, Prozesse und Netzwerkzugriffe."
      ],
      [
        "Modell",
        "Normale Anwendungen dürfen nicht beliebig Hardware oder fremden Speicher bedienen. Browser fügen eine weitere Sandbox hinzu: JavaScript im Web bekommt ausgewählte APIs und braucht für bestimmte Zugriffe Nutzeraktionen oder Erlaubnisse."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Normale Anwendungen dürfen nicht beliebig Hardware oder fremden Speicher bedienen. Browser fügen eine weitere Sandbox hinzu: JavaScript im Web bekommt ausgewählte APIs und braucht für bestimmte Zugriffe Nutzeraktionen oder Erlaubnisse.",
    "example": "Programm → Bibliothek → Systemaufruf → Kernel → Gerät",
    "task": "Warum kann Web-JavaScript nicht beliebig jede Datei deiner SSD lesen?",
    "question": "Warum kann Web-JavaScript nicht beliebig jede Datei deiner SSD lesen?",
    "options": [
      "Browser-Sandbox und API-Regeln begrenzen den Zugriff",
      "Dateien bestehen nicht aus Bytes",
      "JavaScript kann keinerlei Text lesen"
    ],
    "answer": 0,
    "hints": [
      "Systemaufrufe vermitteln kontrolliert Dienste wie Dateioperationen, Prozesse und Netzwerkzugriffe."
    ],
    "explanation": "Der Browser vermittelt eingeschränkte APIs, etwa vom Nutzer ausgewählte Dateien."
  },
  {
    "id": "computer-permissions",
    "course": "computer",
    "category": "Betriebssystem praktisch",
    "name": "Dateirechte",
    "title": "Dateirechte steuern erlaubte Aktionen",
    "description": "Unter Unix-artigen Systemen unterscheiden Rechte unter anderem Lesen, Schreiben und Ausführen für Eigentümer, Gruppe und andere.",
    "syntax": "r = lesen, w = schreiben, x = ausführen",
    "parts": [
      [
        "Begriff",
        "Unter Unix-artigen Systemen unterscheiden Rechte unter anderem Lesen, Schreiben und Ausführen für Eigentümer, Gruppe und andere."
      ],
      [
        "Modell",
        "Für Verzeichnisse bedeutet x insbesondere Durchqueren, nicht das Ausführen eines Programms. ACLs, Plattformen und zusätzliche Sicherheitsregeln erweitern das Modell. Eine Dateiendung allein erteilt keine Ausführungsrechte."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Für Verzeichnisse bedeutet x insbesondere Durchqueren, nicht das Ausführen eines Programms. ACLs, Plattformen und zusätzliche Sicherheitsregeln erweitern das Modell. Eine Dateiendung allein erteilt keine Ausführungsrechte.",
    "example": "r = lesen, w = schreiben, x = ausführen\nDatei: rw-r-----",
    "task": "Was erlaubt w bei einer gewöhnlichen Datei grundsätzlich?",
    "question": "Was erlaubt w bei einer gewöhnlichen Datei grundsätzlich?",
    "options": [
      "Inhalt schreiben",
      "Nur den Dateinamen anzeigen",
      "Die CPU schneller takten"
    ],
    "answer": 0,
    "hints": [
      "Unter Unix-artigen Systemen unterscheiden Rechte unter anderem Lesen, Schreiben und Ausführen für Eigentümer, Gruppe und andere."
    ],
    "explanation": "w steht für Schreibrecht; weitere Regeln können die konkrete Aktion trotzdem verhindern."
  },
  {
    "id": "computer-paths",
    "course": "computer",
    "category": "Betriebssystem praktisch",
    "name": "Pfade",
    "title": "Relative und absolute Pfade",
    "description": "Ein absoluter Pfad beginnt im Dateisystem am Wurzelpunkt beziehungsweise auf Windows typischerweise am Laufwerk. Relative Pfade beziehen sich auf einen Ausgangsort.",
    "syntax": "Ausgang: /home/mira/projekt",
    "parts": [
      [
        "Begriff",
        "Ein absoluter Pfad beginnt im Dateisystem am Wurzelpunkt beziehungsweise auf Windows typischerweise am Laufwerk. Relative Pfade beziehen sich auf einen Ausgangsort."
      ],
      [
        "Modell",
        "In Programmen ist der Ausgangsort häufig das aktuelle Arbeitsverzeichnis und nicht automatisch der Ort der Quelldatei. URLs verwenden ähnliche Regeln, sind aber keine lokalen Dateipfade."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "In Programmen ist der Ausgangsort häufig das aktuelle Arbeitsverzeichnis und nicht automatisch der Ort der Quelldatei. URLs verwenden ähnliche Regeln, sind aber keine lokalen Dateipfade.",
    "example": "Ausgang: /home/mira/projekt\n./daten.txt → /home/mira/projekt/daten.txt\n../notiz.txt → /home/mira/notiz.txt",
    "task": "Worauf bezieht sich ../notiz.txt im Beispiel?",
    "question": "Worauf bezieht sich ../notiz.txt im Beispiel?",
    "options": [
      "/home/mira/notiz.txt",
      "/home/mira/projekt/notiz.txt",
      "Immer /notiz.txt"
    ],
    "answer": 0,
    "hints": [
      "Ein absoluter Pfad beginnt im Dateisystem am Wurzelpunkt beziehungsweise auf Windows typischerweise am Laufwerk. Relative Pfade beziehen sich auf einen Ausgangsort."
    ],
    "explanation": ".. geht eine Verzeichnisebene nach oben."
  },
  {
    "id": "computer-race",
    "course": "computer",
    "category": "Betriebssystem praktisch",
    "name": "Race Condition",
    "title": "Wenn gemeinsame Änderungen kollidieren",
    "description": "Eine Race Condition entsteht, wenn das Ergebnis unerwünscht von der Reihenfolge konkurrierender Aktionen abhängt.",
    "syntax": "Stand 10",
    "parts": [
      [
        "Begriff",
        "Eine Race Condition entsteht, wenn das Ergebnis unerwünscht von der Reihenfolge konkurrierender Aktionen abhängt."
      ],
      [
        "Modell",
        "Lesen, rechnen und schreiben ist nicht automatisch eine unteilbare Operation. Threads mit gemeinsamem Speicher brauchen passende Synchronisation. Auch asynchrone Browseranfragen können logische Reihenfolgefehler verursachen, ohne dass zwei JS-Callbacks gleichzeitig laufen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Lesen, rechnen und schreiben ist nicht automatisch eine unteilbare Operation. Threads mit gemeinsamem Speicher brauchen passende Synchronisation. Auch asynchrone Browseranfragen können logische Reihenfolgefehler verursachen, ohne dass zwei JS-Callbacks gleichzeitig laufen.",
    "example": "Stand 10\nThread A liest 10; B liest 10\nA schreibt 11; B schreibt 11\nErwartet zwei Erhöhungen: 12; tatsächlich: 11",
    "task": "Warum geht im Beispiel eine Erhöhung verloren?",
    "question": "Warum geht im Beispiel eine Erhöhung verloren?",
    "options": [
      "Beide verwenden denselben alten Stand",
      "Die Zahl 12 passt nicht in RAM",
      "Threads können keine Zahlen lesen"
    ],
    "answer": 0,
    "hints": [
      "Eine Race Condition entsteht, wenn das Ergebnis unerwünscht von der Reihenfolge konkurrierender Aktionen abhängt."
    ],
    "explanation": "Beide berechnen 11 aus 10; der zweite Schreibvorgang überschreibt mit demselben Ergebnis."
  },
  {
    "id": "computer-deadlock",
    "course": "computer",
    "category": "Betriebssystem praktisch",
    "name": "Deadlock",
    "title": "Zwei Aufgaben können aufeinander warten",
    "description": "Ein Deadlock ist ein Zustand, in dem Aufgaben nicht weiterkommen, weil benötigte Ressourcen gegenseitig blockiert sind.",
    "syntax": "A hält Schloss 1 und wartet auf 2",
    "parts": [
      [
        "Begriff",
        "Ein Deadlock ist ein Zustand, in dem Aufgaben nicht weiterkommen, weil benötigte Ressourcen gegenseitig blockiert sind."
      ],
      [
        "Modell",
        "Eine einheitliche Reihenfolge beim Erwerb von Schlössern kann diesen einfachen Fall verhindern. Zeitlimits und andere Entwürfe können helfen, müssen aber fachlich sauber behandelt werden. Ein langsames Programm ist nicht automatisch im Deadlock."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Eine einheitliche Reihenfolge beim Erwerb von Schlössern kann diesen einfachen Fall verhindern. Zeitlimits und andere Entwürfe können helfen, müssen aber fachlich sauber behandelt werden. Ein langsames Programm ist nicht automatisch im Deadlock.",
    "example": "A hält Schloss 1 und wartet auf 2\nB hält Schloss 2 und wartet auf 1",
    "task": "Welche Änderung verhindert den gezeigten Kreislauf?",
    "question": "Welche Änderung verhindert den gezeigten Kreislauf?",
    "options": [
      "Beide erwerben Schloss 1 vor Schloss 2",
      "Beide warten länger",
      "Mehr Dateiendungen"
    ],
    "answer": 0,
    "hints": [
      "Ein Deadlock ist ein Zustand, in dem Aufgaben nicht weiterkommen, weil benötigte Ressourcen gegenseitig blockiert sind."
    ],
    "explanation": "Die gleiche Erwerbsreihenfolge vermeidet den hier gezeigten gegenseitigen Sperrkreislauf."
  },
  {
    "id": "computer-crash",
    "course": "computer",
    "category": "Betriebssystem praktisch",
    "name": "Absturz",
    "title": "Fehler, Abstürze und Speicherschutz",
    "description": "Eine unbehandelte Ausnahme kann eine Anwendung beenden. Ungültige Speicherzugriffe können einen Prozess durch das Betriebssystem stoppen.",
    "syntax": "C: ungültiger Pointerzugriff → möglicher Prozessabbruch",
    "parts": [
      [
        "Begriff",
        "Eine unbehandelte Ausnahme kann eine Anwendung beenden. Ungültige Speicherzugriffe können einen Prozess durch das Betriebssystem stoppen."
      ],
      [
        "Modell",
        "Ein Syntaxfehler, eine Ausnahme, ein Prozessabbruch und ein Systemabsturz sind verschiedene Dinge. Diagnose braucht Fehlermeldung, Stacktrace und einen reproduzierbaren Auslöser. Speicherschutz hilft, Fehler zwischen Prozessen zu isolieren."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein Syntaxfehler, eine Ausnahme, ein Prozessabbruch und ein Systemabsturz sind verschiedene Dinge. Diagnose braucht Fehlermeldung, Stacktrace und einen reproduzierbaren Auslöser. Speicherschutz hilft, Fehler zwischen Prozessen zu isolieren.",
    "example": "C: ungültiger Pointerzugriff → möglicher Prozessabbruch\nJavaScript: throw ohne Behandlung → fehlgeschlagener Ablauf",
    "task": "Was hilft beim Finden einer reproduzierbaren Fehlerstelle?",
    "question": "Was hilft beim Finden einer reproduzierbaren Fehlerstelle?",
    "options": [
      "Stacktrace und konkrete Eingabeschritte",
      "Nur ein anderer Hintergrund",
      "Immer mehr RAM kaufen"
    ],
    "answer": 0,
    "hints": [
      "Eine unbehandelte Ausnahme kann eine Anwendung beenden. Ungültige Speicherzugriffe können einen Prozess durch das Betriebssystem stoppen."
    ],
    "explanation": "Stacktrace und reproduzierbarer Auslöser verbinden Symptom und betroffene Codeposition."
  },
  {
    "id": "computer-ip",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "IP und Port",
    "title": "IP adressiert Geräte, Ports Dienste",
    "description": "IP-Adressen werden für die Zustellung im Netzwerk verwendet. Ports helfen, Transportverbindungen einem Dienst zuzuordnen.",
    "syntax": "127.0.0.1:3000",
    "parts": [
      [
        "Begriff",
        "IP-Adressen werden für die Zustellung im Netzwerk verwendet. Ports helfen, Transportverbindungen einem Dienst zuzuordnen."
      ],
      [
        "Modell",
        "127.0.0.1 ist IPv4-Loopback für das eigene Gerät, nicht für deinen entfernten Server. IPv6 verwendet andere Adressnotation. NAT, mehrere Netzwerkschnittstellen und Firewalls machen echte Netze komplexer."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "127.0.0.1 ist IPv4-Loopback für das eigene Gerät, nicht für deinen entfernten Server. IPv6 verwendet andere Adressnotation. NAT, mehrere Netzwerkschnittstellen und Firewalls machen echte Netze komplexer.",
    "example": "127.0.0.1:3000\nLoopback-Adresse + Port eines lokalen Dienstes",
    "task": "Welches Gerät meint 127.0.0.1 im Browser auf deinem Handy?",
    "question": "Welches Gerät meint 127.0.0.1 im Browser auf deinem Handy?",
    "options": [
      "Das Handy selbst",
      "Immer deinen PC",
      "Jeden Cloudflare-Server"
    ],
    "answer": 0,
    "hints": [
      "IP-Adressen werden für die Zustellung im Netzwerk verwendet. Ports helfen, Transportverbindungen einem Dienst zuzuordnen."
    ],
    "explanation": "Loopback verweist auf das eigene Gerät. Ein Server auf deinem PC ist darüber vom Handy nicht erreichbar."
  },
  {
    "id": "computer-dns",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "DNS",
    "title": "DNS löst Namen in passende Informationen auf",
    "description": "DNS kann Domainnamen auf IP-Adressen abbilden, damit ein Client einen Zielserver finden kann.",
    "syntax": "example.com → DNS-Antwort → IP-Adresse",
    "parts": [
      [
        "Begriff",
        "DNS kann Domainnamen auf IP-Adressen abbilden, damit ein Client einen Zielserver finden kann."
      ],
      [
        "Modell",
        "DNS hat verschiedene Recordtypen wie A, AAAA und MX. Antworten werden zeitweise gecacht. DNS lädt nicht den eigentlichen HTML-Inhalt und garantiert keine unveränderliche Adresse."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "DNS hat verschiedene Recordtypen wie A, AAAA und MX. Antworten werden zeitweise gecacht. DNS lädt nicht den eigentlichen HTML-Inhalt und garantiert keine unveränderliche Adresse.",
    "example": "example.com → DNS-Antwort → IP-Adresse",
    "task": "Welche Aufgabe hat eine A-Antwort im DNS?",
    "question": "Welche Aufgabe hat eine A-Antwort im DNS?",
    "options": [
      "Einen Namen einer IPv4-Adresse zuordnen",
      "JavaScript ausführen",
      "Eine SSD formatieren"
    ],
    "answer": 0,
    "hints": [
      "DNS kann Domainnamen auf IP-Adressen abbilden, damit ein Client einen Zielserver finden kann."
    ],
    "explanation": "A-Records liefern IPv4-Adressen; AAAA-Records liefern IPv6-Adressen."
  },
  {
    "id": "computer-packets",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "Pakete",
    "title": "Große Daten werden in kleinere Einheiten übertragen",
    "description": "Netzwerke übertragen Daten in Paketen beziehungsweise Transportsegmenten. Protokolle tragen Adressen und weitere Steuerinformationen.",
    "syntax": "Datei → viele Transportsegmente → IP-Pakete → Empfänger",
    "parts": [
      [
        "Begriff",
        "Netzwerke übertragen Daten in Paketen beziehungsweise Transportsegmenten. Protokolle tragen Adressen und weitere Steuerinformationen."
      ],
      [
        "Modell",
        "Pakete können verloren gehen, verzögert eintreffen oder unterschiedliche Wege nehmen. IP allein liefert keine Garantie auf vollständige, geordnete Zustellung. Transportprotokolle lösen unterschiedliche Teile dieser Aufgabe."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Pakete können verloren gehen, verzögert eintreffen oder unterschiedliche Wege nehmen. IP allein liefert keine Garantie auf vollständige, geordnete Zustellung. Transportprotokolle lösen unterschiedliche Teile dieser Aufgabe.",
    "example": "Datei → viele Transportsegmente → IP-Pakete → Empfänger",
    "task": "Was garantiert IP allein nicht?",
    "question": "Was garantiert IP allein nicht?",
    "options": [
      "Geordnete vollständige Zustellung aller Daten",
      "Das Vorhandensein von Adressinformationen",
      "Dass Daten digital sein können"
    ],
    "answer": 0,
    "hints": [
      "Netzwerke übertragen Daten in Paketen beziehungsweise Transportsegmenten. Protokolle tragen Adressen und weitere Steuerinformationen."
    ],
    "explanation": "Für zuverlässige geordnete Übertragung braucht es zusätzliche Protokollfunktionen."
  },
  {
    "id": "computer-tcp",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "TCP",
    "title": "TCP liefert einen geordneten Bytestrom",
    "description": "TCP sorgt innerhalb einer Verbindung für geordnete, zuverlässige Übertragung oder meldet beziehungsweise endet bei einem Verbindungsproblem.",
    "syntax": "Anwendung schreibt Bytes → TCP segmentiert → Empfänger liest Bytestrom",
    "parts": [
      [
        "Begriff",
        "TCP sorgt innerhalb einer Verbindung für geordnete, zuverlässige Übertragung oder meldet beziehungsweise endet bei einem Verbindungsproblem."
      ],
      [
        "Modell",
        "TCP erhält keine eigenen Anwendungsnachrichtengrenzen: Ein einzelner write kann in mehreren reads erscheinen. Ein Protokoll braucht daher Längen, Trennzeichen oder andere Nachrichtenrahmen. Zuverlässig bedeutet nicht, dass ein Server die fachliche Aktion schon erfolgreich gespeichert hat."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "TCP erhält keine eigenen Anwendungsnachrichtengrenzen: Ein einzelner write kann in mehreren reads erscheinen. Ein Protokoll braucht daher Längen, Trennzeichen oder andere Nachrichtenrahmen. Zuverlässig bedeutet nicht, dass ein Server die fachliche Aktion schon erfolgreich gespeichert hat.",
    "example": "Anwendung schreibt Bytes → TCP segmentiert → Empfänger liest Bytestrom",
    "task": "Was muss eine Anwendung für Nachrichten auf TCP selbst festlegen?",
    "question": "Was muss eine Anwendung für Nachrichten auf TCP selbst festlegen?",
    "options": [
      "Nachrichtengrenzen",
      "Die Binärziffern 0 und 1",
      "Die Größe jedes CPU-Registers"
    ],
    "answer": 0,
    "hints": [
      "TCP sorgt innerhalb einer Verbindung für geordnete, zuverlässige Übertragung oder meldet beziehungsweise endet bei einem Verbindungsproblem."
    ],
    "explanation": "TCP stellt einen Bytestrom bereit; die Anwendung definiert, wo Nachrichten beginnen und enden."
  },
  {
    "id": "computer-udp",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "UDP",
    "title": "UDP sendet Datagramme ohne Zustellgarantie",
    "description": "UDP erhält Datagrammgrenzen, verspricht aber weder Zustellung noch Reihenfolge und wiederholt verlorene Datagramme nicht selbst.",
    "syntax": "Position im Spiel → UDP-Datagramm",
    "parts": [
      [
        "Begriff",
        "UDP erhält Datagrammgrenzen, verspricht aber weder Zustellung noch Reihenfolge und wiederholt verlorene Datagramme nicht selbst."
      ],
      [
        "Modell",
        "Ob UDP passt, hängt vom Protokoll ab. Anwendungen können eigene Zuverlässigkeit ergänzen; QUIC baut beispielsweise über UDP zusätzliche Transportfunktionen auf. UDP ist nicht pauschal immer schneller."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ob UDP passt, hängt vom Protokoll ab. Anwendungen können eigene Zuverlässigkeit ergänzen; QUIC baut beispielsweise über UDP zusätzliche Transportfunktionen auf. UDP ist nicht pauschal immer schneller.",
    "example": "Position im Spiel → UDP-Datagramm\nEin späterer Positionsstand kann einen alten ersetzen.",
    "task": "Was garantiert UDP selbst?",
    "question": "Was garantiert UDP selbst?",
    "options": [
      "Zustellung jedes Datagramms",
      "Datagrammgrenzen für empfangene Datagramme",
      "Automatische Wiederholung aller Verluste"
    ],
    "answer": 1,
    "hints": [
      "UDP erhält Datagrammgrenzen, verspricht aber weder Zustellung noch Reihenfolge und wiederholt verlorene Datagramme nicht selbst."
    ],
    "explanation": "UDP arbeitet mit Datagrammen, ohne TCP-artige Zustell- und Reihenfolgegarantie."
  },
  {
    "id": "computer-http",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "HTTP",
    "title": "HTTP verbindet Anfrage und Antwort",
    "description": "HTTP definiert Methoden, Ziele, Header und Statuscodes für Kommunikation zwischen Client und Server.",
    "syntax": "GET /notizen → 200 + Antwortinhalt",
    "parts": [
      [
        "Begriff",
        "HTTP definiert Methoden, Ziele, Header und Statuscodes für Kommunikation zwischen Client und Server."
      ],
      [
        "Modell",
        "Eine HTTP-Antwort kann auch einen Fehlerstatus enthalten. fetch lehnt bei 404 nicht automatisch ab; prüfe response.ok oder status. HTTP-Versionen nutzen unterschiedliche Transportmechanismen, und CORS ist eine Browserregel zusätzlich zu HTTP."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Eine HTTP-Antwort kann auch einen Fehlerstatus enthalten. fetch lehnt bei 404 nicht automatisch ab; prüfe response.ok oder status. HTTP-Versionen nutzen unterschiedliche Transportmechanismen, und CORS ist eine Browserregel zusätzlich zu HTTP.",
    "example": "GET /notizen → 200 + Antwortinhalt\nGET /fehlt → 404",
    "task": "Wofür steht HTTP-Status 404 typischerweise?",
    "question": "Wofür steht HTTP-Status 404 typischerweise?",
    "options": [
      "Ressource nicht gefunden",
      "Immer erfolgreich gespeichert",
      "Der Rechner hat kein RAM"
    ],
    "answer": 0,
    "hints": [
      "HTTP definiert Methoden, Ziele, Header und Statuscodes für Kommunikation zwischen Client und Server."
    ],
    "explanation": "404 bedeutet, dass die Zielressource nicht gefunden wurde."
  },
  {
    "id": "computer-tls",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "HTTPS und TLS",
    "title": "HTTPS schützt den Transport mit TLS",
    "description": "HTTPS schützt HTTP-Kommunikation mit Verschlüsselung und Serverauthentifizierung über TLS.",
    "syntax": "Browser ↔ TLS-geschützte Verbindung ↔ Server",
    "parts": [
      [
        "Begriff",
        "HTTPS schützt HTTP-Kommunikation mit Verschlüsselung und Serverauthentifizierung über TLS."
      ],
      [
        "Modell",
        "Zertifikate helfen beim Prüfen der Serveridentität. HTTPS bedeutet nicht automatisch, dass der Betreiber vertrauenswürdig oder die Anwendung fehlerfrei ist. Metadaten können weiterhin sichtbar sein, und der Endserver verarbeitet die entschlüsselten Inhalte."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Zertifikate helfen beim Prüfen der Serveridentität. HTTPS bedeutet nicht automatisch, dass der Betreiber vertrauenswürdig oder die Anwendung fehlerfrei ist. Metadaten können weiterhin sichtbar sein, und der Endserver verarbeitet die entschlüsselten Inhalte.",
    "example": "Browser ↔ TLS-geschützte Verbindung ↔ Server",
    "task": "Was garantiert HTTPS allein nicht?",
    "question": "Was garantiert HTTPS allein nicht?",
    "options": [
      "Dass die Website inhaltlich vertrauenswürdig ist",
      "Verschlüsselung des HTTP-Transports",
      "Prüfung der Serveridentität im üblichen Zertifikatsmodell"
    ],
    "answer": 0,
    "hints": [
      "HTTPS schützt HTTP-Kommunikation mit Verschlüsselung und Serverauthentifizierung über TLS."
    ],
    "explanation": "Transportabsicherung ersetzt keine Prüfung des Inhalts oder Betreibers."
  },
  {
    "id": "computer-latency",
    "course": "computer",
    "category": "Netzwerke verstehen",
    "name": "Latenz und Bandbreite",
    "title": "Schnelle Leitung und schnelle Antwort unterscheiden",
    "description": "Bandbreite beschreibt übertragbare Datenmenge pro Zeit. Latenz beschreibt Wartezeit, etwa bis zu einer Antwort.",
    "syntax": "Kleine Anfrage: oft Wartezeit entscheidend",
    "parts": [
      [
        "Begriff",
        "Bandbreite beschreibt übertragbare Datenmenge pro Zeit. Latenz beschreibt Wartezeit, etwa bis zu einer Antwort."
      ],
      [
        "Modell",
        "Serverarbeit, Entfernung, Warteschlangen und Verbindungsaufbau beeinflussen die Antwortzeit. Hohe Bandbreite beseitigt nicht jede Latenz. Das Netzwerk-Labor zeigt eine vereinfachte Anfragefolge, keine Messung echter Netze."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Serverarbeit, Entfernung, Warteschlangen und Verbindungsaufbau beeinflussen die Antwortzeit. Hohe Bandbreite beseitigt nicht jede Latenz. Das Netzwerk-Labor zeigt eine vereinfachte Anfragefolge, keine Messung echter Netze.",
    "example": "Kleine Anfrage: oft Wartezeit entscheidend\nGroßer Download: oft Durchsatz entscheidend",
    "task": "Warum kann eine kleine Anfrage trotz hoher Bandbreite langsam sein?",
    "question": "Warum kann eine kleine Anfrage trotz hoher Bandbreite langsam sein?",
    "options": [
      "Hohe Latenz oder langsame Serververarbeitung",
      "Ein Bit hat plötzlich neun Bytes",
      "HTTPS benötigt immer eine Stunde"
    ],
    "answer": 0,
    "hints": [
      "Bandbreite beschreibt übertragbare Datenmenge pro Zeit. Latenz beschreibt Wartezeit, etwa bis zu einer Antwort."
    ],
    "explanation": "Wartezeit und Verarbeitung können dominieren, obwohl die Leitung viele Bytes pro Sekunde schafft."
  },
  {
    "id": "computer-cores",
    "course": "computer",
    "category": "Hardware & Leistung",
    "name": "Kerne und Takt",
    "title": "Mehr Kerne beschleunigen nicht jeden Ablauf",
    "description": "Mehrere CPU-Kerne können unabhängige Arbeit parallel bearbeiten. Eine streng abhängige Schrittfolge kann davon kaum profitieren.",
    "syntax": "Ein einzelner serieller Ablauf ≠ automatisch auf 8 Kerne verteilbar",
    "parts": [
      [
        "Begriff",
        "Mehrere CPU-Kerne können unabhängige Arbeit parallel bearbeiten. Eine streng abhängige Schrittfolge kann davon kaum profitieren."
      ],
      [
        "Modell",
        "Taktfrequenz, Architektur, thermische Grenzen, Speicherzugriffe und Software bestimmen gemeinsam die Leistung. GHz zwischen verschiedenen Architekturen direkt zu vergleichen ist zu grob."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Taktfrequenz, Architektur, thermische Grenzen, Speicherzugriffe und Software bestimmen gemeinsam die Leistung. GHz zwischen verschiedenen Architekturen direkt zu vergleichen ist zu grob.",
    "example": "Ein einzelner serieller Ablauf ≠ automatisch auf 8 Kerne verteilbar",
    "task": "Welche Arbeit profitiert grundsätzlich gut von mehreren Kernen?",
    "question": "Welche Arbeit profitiert grundsätzlich gut von mehreren Kernen?",
    "options": [
      "Mehrere unabhängige Aufgaben",
      "Ein unteilbarer einzelner Rechenschritt",
      "Jeder Ablauf exakt um die Kernzahl"
    ],
    "answer": 0,
    "hints": [
      "Mehrere CPU-Kerne können unabhängige Arbeit parallel bearbeiten. Eine streng abhängige Schrittfolge kann davon kaum profitieren."
    ],
    "explanation": "Unabhängige Aufgaben können gleichzeitig auf unterschiedlichen Kernen laufen."
  },
  {
    "id": "computer-gpu",
    "course": "computer",
    "category": "Hardware & Leistung",
    "name": "GPU",
    "title": "Die GPU verarbeitet viele ähnliche Operationen",
    "description": "GPUs sind auf viele parallele Operationen ausgelegt, etwa auf Pixeln, Vektoren oder großen Datenblöcken.",
    "syntax": "Viele Pixel → ähnliche Farboperationen parallel",
    "parts": [
      [
        "Begriff",
        "GPUs sind auf viele parallele Operationen ausgelegt, etwa auf Pixeln, Vektoren oder großen Datenblöcken."
      ],
      [
        "Modell",
        "Datenübertragung, Speicherlayout und Aufgabengröße beeinflussen den Nutzen. Eine GPU ersetzt nicht generell die CPU. Kleine, stark verzweigte oder serielle Aufgaben können auf der CPU besser passen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Datenübertragung, Speicherlayout und Aufgabengröße beeinflussen den Nutzen. Eine GPU ersetzt nicht generell die CPU. Kleine, stark verzweigte oder serielle Aufgaben können auf der CPU besser passen.",
    "example": "Viele Pixel → ähnliche Farboperationen parallel",
    "task": "Welche Aufgabe passt oft gut zu einer GPU?",
    "question": "Welche Aufgabe passt oft gut zu einer GPU?",
    "options": [
      "Dieselbe Operation auf sehr vielen Bildpixeln",
      "Eine einzelne kleine Verzweigung",
      "Jede Dateiumbenennung"
    ],
    "answer": 0,
    "hints": [
      "GPUs sind auf viele parallele Operationen ausgelegt, etwa auf Pixeln, Vektoren oder großen Datenblöcken."
    ],
    "explanation": "Viele ähnliche Operationen lassen sich breit parallel ausführen."
  },
  {
    "id": "computer-bottleneck",
    "course": "computer",
    "category": "Hardware & Leistung",
    "name": "Engpass",
    "title": "Warum mehr RAM nicht jedes Problem löst",
    "description": "Ein Engpass begrenzt den gesamten Ablauf. Das kann CPU, Speicherzugriff, Datenträger, Netzwerk oder die Software selbst sein.",
    "syntax": "CPU wartet auf Server → mehr RAM behebt die Serverwartezeit nicht",
    "parts": [
      [
        "Begriff",
        "Ein Engpass begrenzt den gesamten Ablauf. Das kann CPU, Speicherzugriff, Datenträger, Netzwerk oder die Software selbst sein."
      ],
      [
        "Modell",
        "Wenn RAM knapp ist und viel ausgelagert wird, hilft mehr RAM möglicherweise. Wenn ein Algorithmus unnötig viel Arbeit macht, kann eine bessere Datenstruktur mehr bringen. Miss vor einer Optimierung den betroffenen Ablauf."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Wenn RAM knapp ist und viel ausgelagert wird, hilft mehr RAM möglicherweise. Wenn ein Algorithmus unnötig viel Arbeit macht, kann eine bessere Datenstruktur mehr bringen. Miss vor einer Optimierung den betroffenen Ablauf.",
    "example": "CPU wartet auf Server → mehr RAM behebt die Serverwartezeit nicht",
    "task": "Was ist bei langen Serverantwortzeiten zunächst sinnvoll?",
    "question": "Was ist bei langen Serverantwortzeiten zunächst sinnvoll?",
    "options": [
      "Wartezeit und Serververarbeitung untersuchen",
      "Blind mehr Arbeitsspeicher kaufen",
      "Jede Zahl in Hex schreiben"
    ],
    "answer": 0,
    "hints": [
      "Ein Engpass begrenzt den gesamten Ablauf. Das kann CPU, Speicherzugriff, Datenträger, Netzwerk oder die Software selbst sein."
    ],
    "explanation": "Eine gezielte Messung hilft, den tatsächlichen Engpass zu finden."
  },
  {
    "id": "computer-ssd",
    "course": "computer",
    "category": "Hardware & Leistung",
    "name": "SSD intern",
    "title": "SSDs speichern mit Flash und verwalten Schreibvorgänge",
    "description": "SSDs verwenden nichtflüchtigen Flash. Der Controller organisiert Adressen, Schreibvorgänge und die Verteilung von Verschleiß.",
    "syntax": "Logischer Block → Controller → Flash-Speicher",
    "parts": [
      [
        "Begriff",
        "SSDs verwenden nichtflüchtigen Flash. Der Controller organisiert Adressen, Schreibvorgänge und die Verteilung von Verschleiß."
      ],
      [
        "Modell",
        "Flash arbeitet mit Seiten und Löschblöcken; logische Schreibvorgänge müssen nicht an derselben physischen Stelle landen. Viele kleine zufällige Zugriffe unterscheiden sich von einem großen sequenziellen Transfer. Backups bleiben unabhängig von der Datenträgerart nötig."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Flash arbeitet mit Seiten und Löschblöcken; logische Schreibvorgänge müssen nicht an derselben physischen Stelle landen. Viele kleine zufällige Zugriffe unterscheiden sich von einem großen sequenziellen Transfer. Backups bleiben unabhängig von der Datenträgerart nötig.",
    "example": "Logischer Block → Controller → Flash-Speicher",
    "task": "Warum beschreibt die große sequenzielle MB/s-Zahl nicht jede SSD-Aufgabe?",
    "question": "Warum beschreibt die große sequenzielle MB/s-Zahl nicht jede SSD-Aufgabe?",
    "options": [
      "Kleine zufällige Zugriffe haben andere Kosten",
      "SSDs enthalten keinen Speicher",
      "Alle Zugriffe dauern exakt gleich lang"
    ],
    "answer": 0,
    "hints": [
      "SSDs verwenden nichtflüchtigen Flash. Der Controller organisiert Adressen, Schreibvorgänge und die Verteilung von Verschleiß."
    ],
    "explanation": "Zugriffsmuster, Warteschlangen und Controller beeinflussen die beobachtete Leistung."
  },
  {
    "id": "computer-benchmark",
    "course": "computer",
    "category": "Hardware & Leistung",
    "name": "Messen",
    "title": "Benchmarks müssen zum echten Ablauf passen",
    "description": "Ein Benchmark misst eine konkrete Arbeit unter konkreten Bedingungen. Eine einzelne Messung kann irreführend sein.",
    "syntax": "Gleiche Eingaben → mehrere Läufe → Zeiten vergleichen",
    "parts": [
      [
        "Begriff",
        "Ein Benchmark misst eine konkrete Arbeit unter konkreten Bedingungen. Eine einzelne Messung kann irreführend sein."
      ],
      [
        "Modell",
        "JIT-Aufwärmung, Hintergrundlast, Cachezustand und Messauflösung beeinflussen Ergebnisse. In JavaScript misst performance.now verstrichene Zeit; es erklärt allein nicht die Ursache. Korrektheit muss vor Optimierung erhalten bleiben."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "JIT-Aufwärmung, Hintergrundlast, Cachezustand und Messauflösung beeinflussen Ergebnisse. In JavaScript misst performance.now verstrichene Zeit; es erklärt allein nicht die Ursache. Korrektheit muss vor Optimierung erhalten bleiben.",
    "example": "Gleiche Eingaben → mehrere Läufe → Zeiten vergleichen",
    "task": "Warum sollte man denselben Ablauf mehrfach messen?",
    "question": "Warum sollte man denselben Ablauf mehrfach messen?",
    "options": [
      "Um zufällige Schwankungen besser zu erkennen",
      "Damit falscher Code richtig wird",
      "Weil ein Byte sonst kleiner wird"
    ],
    "answer": 0,
    "hints": [
      "Ein Benchmark misst eine konkrete Arbeit unter konkreten Bedingungen. Eine einzelne Messung kann irreführend sein."
    ],
    "explanation": "Mehrere Messungen zeigen Schwankungen; die Bedingungen müssen weiterhin vergleichbar sein."
  },
  {
    "id": "computer-compression",
    "course": "computer",
    "category": "Hardware & Leistung",
    "name": "Kompression",
    "title": "Dateigröße verkleinern heißt Daten kodieren",
    "description": "Verlustfreie Kompression stellt dieselben Informationen kompakter dar, wenn die Daten passende Muster enthalten.",
    "syntax": "AAAAAA → vereinfachtes Muster 6×A",
    "parts": [
      [
        "Begriff",
        "Verlustfreie Kompression stellt dieselben Informationen kompakter dar, wenn die Daten passende Muster enthalten."
      ],
      [
        "Modell",
        "Die einfache Lauflängenkodierung ist nur ein Lernmodell. Beliebige Daten lassen sich nicht garantiert kleiner machen; schon komprimierte Inhalte können sogar wachsen. Verlustbehaftete Verfahren verwerfen Informationen, etwa bei manchen Bild- oder Audioformaten."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Die einfache Lauflängenkodierung ist nur ein Lernmodell. Beliebige Daten lassen sich nicht garantiert kleiner machen; schon komprimierte Inhalte können sogar wachsen. Verlustbehaftete Verfahren verwerfen Informationen, etwa bei manchen Bild- oder Audioformaten.",
    "example": "AAAAAA → vereinfachtes Muster 6×A\nBeim Entpacken entsteht wieder AAAAAA.",
    "task": "Kann verlustfreie Kompression jede beliebige Datei kleiner machen?",
    "question": "Kann verlustfreie Kompression jede beliebige Datei kleiner machen?",
    "options": [
      "Ja, immer",
      "Nein",
      "Nur wenn der Name lang ist"
    ],
    "answer": 1,
    "hints": [
      "Verlustfreie Kompression stellt dieselben Informationen kompakter dar, wenn die Daten passende Muster enthalten."
    ],
    "explanation": "Nicht alle Daten haben nutzbare Redundanz; Header und Kodierung können den Inhalt auch vergrößern."
  },
  {
    "id": "computer-compare-integers",
    "course": "computer",
    "category": "Sprachen & Speicher",
    "name": "Ganzzahltypen",
    "title": "Dieselbe große Zahl in verschiedenen Sprachen",
    "description": "Sprachen und Datentypen haben unterschiedliche Ganzzahlbereiche und Überlaufregeln.",
    "syntax": "Java int: 32 Bit mit Überlauf",
    "parts": [
      [
        "Begriff",
        "Sprachen und Datentypen haben unterschiedliche Ganzzahlbereiche und Überlaufregeln."
      ],
      [
        "Modell",
        "C signed overflow ist undefiniert; unsigned rechnet modulo der Typbreite. C# checked kann Überlauf melden, unchecked hat andere Regeln. Variable Größe bedeutet nicht unbegrenzten verfügbaren Speicher."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "C signed overflow ist undefiniert; unsigned rechnet modulo der Typbreite. C# checked kann Überlauf melden, unchecked hat andere Regeln. Variable Größe bedeutet nicht unbegrenzten verfügbaren Speicher.",
    "example": "Java int: 32 Bit mit Überlauf\nPython int: wächst mit dem Wert\nJavaScript Number: sichere Integer bis 2^53−1\nJavaScript BigInt: Ganzzahlen mit variabler Größe",
    "task": "Welcher JavaScript-Typ eignet sich für exakt große ganze Zahlen jenseits des sicheren Number-Bereichs?",
    "question": "Welcher JavaScript-Typ eignet sich für exakt große ganze Zahlen jenseits des sicheren Number-Bereichs?",
    "options": [
      "BigInt",
      "Immer Number",
      "Boolean"
    ],
    "answer": 0,
    "hints": [
      "Sprachen und Datentypen haben unterschiedliche Ganzzahlbereiche und Überlaufregeln."
    ],
    "explanation": "BigInt speichert große ganze Zahlen exakt, benötigt aber ebenfalls Speicher und eigene Typregeln."
  },
  {
    "id": "computer-compare-copy",
    "course": "computer",
    "category": "Sprachen & Speicher",
    "name": "Wert und Referenz",
    "title": "Zuweisung bedeutet nicht immer eine Kopie aller Daten",
    "description": "Die Wirkung einer Zuweisung hängt vom Typ und Sprachmodell ab. Ein zweiter Name kann dasselbe Objekt erreichen.",
    "syntax": "JavaScript-Objekt: b = a → dasselbe Objekt",
    "parts": [
      [
        "Begriff",
        "Die Wirkung einer Zuweisung hängt vom Typ und Sprachmodell ab. Ein zweiter Name kann dasselbe Objekt erreichen."
      ],
      [
        "Modell",
        "C-Strukturzuweisung kopiert Strukturwerte, aber enthaltene Pointerwerte bleiben Pointer auf die gleichen Ziele. In C# sind class und struct unterschiedlich. Flache und tiefe Kopien brauchen eine bewusste Entscheidung."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "C-Strukturzuweisung kopiert Strukturwerte, aber enthaltene Pointerwerte bleiben Pointer auf die gleichen Ziele. In C# sind class und struct unterschiedlich. Flache und tiefe Kopien brauchen eine bewusste Entscheidung.",
    "example": "JavaScript-Objekt: b = a → dasselbe Objekt\nPython-Liste: b = a → dieselbe Liste\nJava-Objektvariable: zweite Referenz",
    "task": "Was passiert bei b = a für eine Python-Liste?",
    "question": "Was passiert bei b = a für eine Python-Liste?",
    "options": [
      "Eine neue tiefe Kopie entsteht",
      "Beide Namen referenzieren dieselbe Liste",
      "Die Liste wird automatisch gespeichert"
    ],
    "answer": 1,
    "hints": [
      "Die Wirkung einer Zuweisung hängt vom Typ und Sprachmodell ab. Ein zweiter Name kann dasselbe Objekt erreichen."
    ],
    "explanation": "Die Zuweisung bindet den zweiten Namen an dieselbe Liste."
  },
  {
    "id": "computer-pointers",
    "course": "computer",
    "category": "Sprachen & Speicher",
    "name": "Pointer",
    "title": "Pointer zeigen auf Speicher, Besitz regelt die Lebensdauer",
    "description": "Ein C-Pointer kann einen Speicherort adressieren. Der Pointerwert allein sagt nicht, wer den Speicher freigeben muss.",
    "syntax": "int x = 7;",
    "parts": [
      [
        "Begriff",
        "Ein C-Pointer kann einen Speicherort adressieren. Der Pointerwert allein sagt nicht, wer den Speicher freigeben muss."
      ],
      [
        "Modell",
        "Ein Pointer muss auf gültigen Speicher mit passender Lebensdauer und Zugriffserlaubnis zeigen. Freigegebener Speicher wird nicht durch einen noch vorhandenen Pointer wieder gültig. Andere Sprachen abstrahieren Speicheradressen oft stärker."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "Ein Pointer muss auf gültigen Speicher mit passender Lebensdauer und Zugriffserlaubnis zeigen. Freigegebener Speicher wird nicht durch einen noch vorhandenen Pointer wieder gültig. Andere Sprachen abstrahieren Speicheradressen oft stärker.",
    "example": "int x = 7;\nint *p = &x;\n*p = 9; // x ist jetzt 9",
    "task": "Was bewirkt *p = 9 im Beispiel?",
    "question": "Was bewirkt *p = 9 im Beispiel?",
    "options": [
      "Es ändert x auf 9",
      "Es ändert die Adresse von x",
      "Es speichert x auf der SSD"
    ],
    "answer": 0,
    "hints": [
      "Ein C-Pointer kann einen Speicherort adressieren. Der Pointerwert allein sagt nicht, wer den Speicher freigeben muss."
    ],
    "explanation": "p zeigt auf x; der dereferenzierte Schreibzugriff verändert dessen Inhalt."
  },
  {
    "id": "computer-ownership",
    "course": "computer",
    "category": "Sprachen & Speicher",
    "name": "Lebensdauer",
    "title": "Speicherverwaltung und Ressourcenverwaltung unterscheiden",
    "description": "Garbage Collection verwaltet erreichbare Speicherobjekte. Dateien, Verbindungen und andere Ressourcen brauchen oft ausdrücklich begrenzte Lebensdauern.",
    "syntax": "Python: with open(...) as f",
    "parts": [
      [
        "Begriff",
        "Garbage Collection verwaltet erreichbare Speicherobjekte. Dateien, Verbindungen und andere Ressourcen brauchen oft ausdrücklich begrenzte Lebensdauern."
      ],
      [
        "Modell",
        "RAII koppelt Ressourcen an Objektlebensdauer. GC garantiert nicht, dass eine Datei sofort geschlossen wird, wenn eine Variable nicht mehr gebraucht wird. JavaScript nutzt etwa finally, AbortController oder passende API-Aufräumfunktionen."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "RAII koppelt Ressourcen an Objektlebensdauer. GC garantiert nicht, dass eine Datei sofort geschlossen wird, wenn eine Variable nicht mehr gebraucht wird. JavaScript nutzt etwa finally, AbortController oder passende API-Aufräumfunktionen.",
    "example": "Python: with open(...) as f\nJava: try-with-resources\nC++: RAII\nC#: using",
    "task": "Warum reicht GC allein für eine offene Datei häufig nicht?",
    "question": "Warum reicht GC allein für eine offene Datei häufig nicht?",
    "options": [
      "Der Freigabezeitpunkt ist nicht geeignet garantiert",
      "Dateien sind keine Bytes",
      "GC kann nur CPU-Takt ändern"
    ],
    "answer": 0,
    "hints": [
      "Garbage Collection verwaltet erreichbare Speicherobjekte. Dateien, Verbindungen und andere Ressourcen brauchen oft ausdrücklich begrenzte Lebensdauern."
    ],
    "explanation": "Ressourcen sollen planbar geschlossen werden; automatische Speicherbereinigung ersetzt das nicht."
  },
  {
    "id": "computer-runtime",
    "course": "computer",
    "category": "Sprachen & Speicher",
    "name": "Laufzeitvergleich",
    "title": "Compiler, VM und Browser sind verschiedene Umgebungen",
    "description": "Laufzeitumgebungen bestimmen verfügbare APIs zusätzlich zu den Regeln einer Sprache.",
    "syntax": "JavaScript im Browser: document",
    "parts": [
      [
        "Begriff",
        "Laufzeitumgebungen bestimmen verfügbare APIs zusätzlich zu den Regeln einer Sprache."
      ],
      [
        "Modell",
        "React und Angular sind Werkzeuge auf JavaScript/TypeScript, keine eigene CPU-Sprache. SQL beschreibt Datenbankoperationen; Docker paketiert Prozesse und ihre Umgebung. Ein Browser hat nicht automatisch Node-Datei-APIs."
      ]
    ],
    "note": "Beachte das vereinfachte Modell und die Unterschiede echter Hardware und Laufzeiten.",
    "detail": "React und Angular sind Werkzeuge auf JavaScript/TypeScript, keine eigene CPU-Sprache. SQL beschreibt Datenbankoperationen; Docker paketiert Prozesse und ihre Umgebung. Ein Browser hat nicht automatisch Node-Datei-APIs.",
    "example": "JavaScript im Browser: document\nJavaScript in Node: fs\nJava: JVM-Bibliotheken",
    "task": "Warum funktioniert import von node:fs nicht einfach im Browser?",
    "question": "Warum funktioniert import von node:fs nicht einfach im Browser?",
    "options": [
      "Die Node-Laufzeit und ihre API sind dort nicht vorhanden",
      "JavaScript kennt keine imports",
      "Dateien gibt es nur unter Linux"
    ],
    "answer": 0,
    "hints": [
      "Laufzeitumgebungen bestimmen verfügbare APIs zusätzlich zu den Regeln einer Sprache."
    ],
    "explanation": "Gleiche Sprache bedeutet nicht gleiche Laufzeit-APIs oder Zugriffsrechte."
  }
];
