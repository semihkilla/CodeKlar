import { computerProcessingLessons } from "./computerProcessingLessons";
import { computerAdvancedLessons } from "./computerAdvancedLessons";
// Sprachübergreifende Grundlagen; bewusst getrennt vom JavaScript-Lernpfad.
const basics = [
  {
    "id": "computer-bit",
    "course": "computer",
    "category": "Bits & Bytes",
    "name": "Bit",
    "title": "Ein Bit: zwei unterscheidbare Zustände",
    "description": "Ein Bit ist die kleinste Informationseinheit: 0 oder 1. Hardware stellt diese Zustände physikalisch dar, etwa durch unterschiedliche Spannungsbereiche.",
    "syntax": "1 Bit: 0 oder 1",
    "parts": [
      [
        "Begriff",
        "Ein Bit ist die kleinste Informationseinheit: 0 oder 1. Hardware stellt diese Zustände physikalisch dar, etwa durch unterschiedliche Spannungsbereiche."
      ],
      [
        "Einordnung",
        "2³ = 8: 000 bis 111."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Bits sind keine winzigen geschriebenen Ziffern im Chip. Die Ziffern beschreiben Zustände. Mit n Bits gibt es 2ⁿ mögliche Kombinationen. Unterschiedliche Bauteile speichern Zustände auf unterschiedliche Weise.",
    "example": "1 Bit: 0 oder 1\n2 Bits: 00, 01, 10, 11",
    "task": "Wie viele Kombinationen sind mit 3 Bits möglich?",
    "question": "Wie viele Kombinationen sind mit 3 Bits möglich?",
    "options": [
      "3",
      "6",
      "8"
    ],
    "answer": 2,
    "hints": [
      "Ein Bit ist die kleinste Informationseinheit: 0 oder 1. Hardware stellt diese Zustände physikalisch dar, etwa durch unterschiedliche Spannungsbereiche."
    ],
    "explanation": "2³ = 8: 000 bis 111."
  },
  {
    "id": "computer-byte",
    "course": "computer",
    "category": "Bits & Bytes",
    "name": "Byte",
    "title": "Acht Bits ergeben ein Byte",
    "description": "Ein Byte besteht heute aus 8 Bits. Es kann 256 unterschiedliche Bitmuster darstellen.",
    "syntax": "00000000 = 0",
    "parts": [
      [
        "Begriff",
        "Ein Byte besteht heute aus 8 Bits. Es kann 256 unterschiedliche Bitmuster darstellen."
      ],
      [
        "Einordnung",
        "Es gibt 256 Muster; bei Start bei 0 endet der Bereich bei 255."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Die 256 Muster sind zunächst nur Muster. Ob sie eine Zahl, einen Teil eines Buchstabens oder eine Farbe bedeuten, entscheidet die Interpretation. Bytes sind eine übliche Einheit für Dateigrößen.",
    "example": "00000000 = 0\n11111111 = 255 (ohne Vorzeichen)",
    "task": "Was kann ein einzelnes Byte als vorzeichenlose ganze Zahl darstellen?",
    "question": "Was kann ein einzelnes Byte als vorzeichenlose ganze Zahl darstellen?",
    "options": [
      "0 bis 255",
      "0 bis 256",
      "1 bis 8"
    ],
    "answer": 0,
    "hints": [
      "Ein Byte besteht heute aus 8 Bits. Es kann 256 unterschiedliche Bitmuster darstellen."
    ],
    "explanation": "Es gibt 256 Muster; bei Start bei 0 endet der Bereich bei 255."
  },
  {
    "id": "computer-binary",
    "course": "computer",
    "category": "Zahlensysteme",
    "name": "Binär",
    "title": "Binärzahlen über Stellenwerte lesen",
    "description": "Im Binärsystem hat jede Stelle den doppelten Wert ihrer rechten Nachbarstelle.",
    "syntax": "Stellen: 128 64 32 16 8 4 2 1",
    "parts": [
      [
        "Begriff",
        "Im Binärsystem hat jede Stelle den doppelten Wert ihrer rechten Nachbarstelle."
      ],
      [
        "Einordnung",
        "Die gesetzten Stellen sind 32, 8 und 2. Zusammen 42."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Das Dezimalsystem verwendet Zehnerpotenzen; Binär verwendet Zweierpotenzen. Führende Nullen ändern den Wert nicht. Das Bit-Labor zeigt dir die Beiträge jeder Stelle.",
    "example": "Stellen: 128 64 32 16 8 4 2 1\nBits:      0  0  0  0 1 1 0 1\nWert: 8 + 4 + 1 = 13",
    "task": "Welchen Dezimalwert hat 00101010?",
    "question": "Welchen Dezimalwert hat 00101010?",
    "options": [
      "24",
      "42",
      "84"
    ],
    "answer": 1,
    "hints": [
      "Im Binärsystem hat jede Stelle den doppelten Wert ihrer rechten Nachbarstelle."
    ],
    "explanation": "Die gesetzten Stellen sind 32, 8 und 2. Zusammen 42."
  },
  {
    "id": "computer-hex",
    "course": "computer",
    "category": "Zahlensysteme",
    "name": "Hexadezimal",
    "title": "Bytes kompakt als Hex darstellen",
    "description": "Hexadezimal verwendet 16 Ziffern: 0 bis 9 sowie A bis F. Vier Bits entsprechen genau einer Hex-Ziffer.",
    "syntax": "1111 = F",
    "parts": [
      [
        "Begriff",
        "Hexadezimal verwendet 16 Ziffern: 0 bis 9 sowie A bis F. Vier Bits entsprechen genau einer Hex-Ziffer."
      ],
      [
        "Einordnung",
        "Die beiden Vierergruppen 1111 ergeben jeweils F."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Hex ist eine Schreibweise derselben Zahl, keine andere Art von Speicher. Zwei Hex-Ziffern reichen für ein Byte. 0x kennzeichnet in vielen Programmiersprachen eine Hex-Zahl.",
    "example": "1111 = F\n0010 1010 = 2A\n0x2A = 42",
    "task": "Welcher Hex-Wert entspricht 11111111?",
    "question": "Welcher Hex-Wert entspricht 11111111?",
    "options": [
      "FF",
      "100",
      "88"
    ],
    "answer": 0,
    "hints": [
      "Hexadezimal verwendet 16 Ziffern: 0 bis 9 sowie A bis F. Vier Bits entsprechen genau einer Hex-Ziffer."
    ],
    "explanation": "Die beiden Vierergruppen 1111 ergeben jeweils F."
  },
  {
    "id": "computer-units",
    "course": "computer",
    "category": "Bits & Bytes",
    "name": "KB und KiB",
    "title": "Speichergrößen: dezimal und binär",
    "description": "1 kB sind 1.000 Bytes; 1 KiB sind 1.024 Bytes. MB und MiB setzen diese unterschiedlichen Systeme fort.",
    "syntax": "1 MB = 1.000.000 Bytes",
    "parts": [
      [
        "Begriff",
        "1 kB sind 1.000 Bytes; 1 KiB sind 1.024 Bytes. MB und MiB setzen diese unterschiedlichen Systeme fort."
      ],
      [
        "Einordnung",
        "2 × 1.024 = 2.048 Bytes."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Hersteller geben Datenträger oft dezimal an. Software zeigt teilweise binäre Größen, beschriftet sie aber ungenau. Kleine b stehen normalerweise für Bits, große B für Bytes. Ein Laufwerk wirkt dadurch in anderer Einheit kleiner, ohne Bytes zu verlieren.",
    "example": "1 MB = 1.000.000 Bytes\n1 MiB = 1.048.576 Bytes\n1 MiB = 8.388.608 Bits",
    "task": "Wie viele Bytes sind 2 KiB?",
    "question": "Wie viele Bytes sind 2 KiB?",
    "options": [
      "2.000",
      "2.048",
      "16.384"
    ],
    "answer": 1,
    "hints": [
      "1 kB sind 1.000 Bytes; 1 KiB sind 1.024 Bytes. MB und MiB setzen diese unterschiedlichen Systeme fort."
    ],
    "explanation": "2 × 1.024 = 2.048 Bytes."
  },
  {
    "id": "computer-transfer",
    "course": "computer",
    "category": "Bits & Bytes",
    "name": "Mbit/s",
    "title": "Datenrate und Dateigröße vergleichen",
    "description": "Netzwerkgeschwindigkeiten stehen häufig in Bits pro Sekunde, Dateigrößen in Bytes.",
    "syntax": "80 Mbit/s ÷ 8 = 10 MB/s",
    "parts": [
      [
        "Begriff",
        "Netzwerkgeschwindigkeiten stehen häufig in Bits pro Sekunde, Dateigrößen in Bytes."
      ],
      [
        "Einordnung",
        "40 Mbit/s sind 5 MB/s. 50 ÷ 5 = 10 Sekunden."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Reale Übertragungen sind durch Protokollaufwand, Server, WLAN und andere Nutzer langsamer. Die Rechnung verwendet dezimale Einheiten und eine konstante Datenrate; sie ist eine theoretische Untergrenze.",
    "example": "80 Mbit/s ÷ 8 = 10 MB/s\n100 MB ÷ 10 MB/s = 10 s (idealisiert)",
    "task": "Wie lange dauern 50 MB bei 40 Mbit/s idealisiert?",
    "question": "Wie lange dauern 50 MB bei 40 Mbit/s idealisiert?",
    "options": [
      "1,25 Sekunden",
      "10 Sekunden",
      "40 Sekunden"
    ],
    "answer": 1,
    "hints": [
      "Netzwerkgeschwindigkeiten stehen häufig in Bits pro Sekunde, Dateigrößen in Bytes."
    ],
    "explanation": "40 Mbit/s sind 5 MB/s. 50 ÷ 5 = 10 Sekunden."
  },
  {
    "id": "computer-unsigned",
    "course": "computer",
    "category": "Zahlen im Speicher",
    "name": "Überlauf",
    "title": "Was passiert bei einem vollen Byte?",
    "description": "Ein vorzeichenloser 8-Bit-Wert reicht von 0 bis 255. Das nächste Bit passt nicht mehr in diese Breite.",
    "syntax": "11111111 + 1 = 1 00000000",
    "parts": [
      [
        "Begriff",
        "Ein vorzeichenloser 8-Bit-Wert reicht von 0 bis 255. Das nächste Bit passt nicht mehr in diese Breite."
      ],
      [
        "Einordnung",
        "Bei diesem Typ bleiben die unteren 8 Bits: 0. Das gilt nicht allgemein für alle Zahlentypen."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Das Verhalten hängt von Sprache und Typ ab: Ein Uint8Array in JavaScript reduziert ganzzahlige Werte modulo 256; JavaScript Number selbst ist kein 8-Bit-Typ. Vorzeichenloses C-Rechnen läuft modulo der Typbreite, vorzeichenbehafteter C-Überlauf ist undefiniert. Python-Ganzzahlen wachsen mit.",
    "example": "11111111 + 1 = 1 00000000\nNur die unteren 8 Bits: 00000000",
    "task": "Was wird in einem Uint8Array aus der Zahl 256?",
    "question": "Was wird in einem Uint8Array aus der Zahl 256?",
    "options": [
      "256",
      "0",
      "-1"
    ],
    "answer": 1,
    "hints": [
      "Ein vorzeichenloser 8-Bit-Wert reicht von 0 bis 255. Das nächste Bit passt nicht mehr in diese Breite."
    ],
    "explanation": "Bei diesem Typ bleiben die unteren 8 Bits: 0. Das gilt nicht allgemein für alle Zahlentypen."
  },
  {
    "id": "computer-signed",
    "course": "computer",
    "category": "Zahlen im Speicher",
    "name": "Vorzeichen",
    "title": "Dasselbe Byte: 255 oder −1",
    "description": "Beim Zweierkomplement werden negative ganze Zahlen mit denselben Bitmustern gespeichert.",
    "syntax": "11111111",
    "parts": [
      [
        "Begriff",
        "Beim Zweierkomplement werden negative ganze Zahlen mit denselben Bitmustern gespeichert."
      ],
      [
        "Einordnung",
        "Unsigned sind es 254. 254 − 256 = −2."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Für 8-Bit-Zweierkomplement reicht der Bereich von −128 bis 127. Hat das oberste Bit den Wert 1, kannst du den unsigned Wert minus 256 rechnen. Die Bits allein verraten dir den Typ nicht.",
    "example": "11111111\nUnsigned 8 Bit: 255\nSigned 8 Bit: -1\n10000000 (signed): -128",
    "task": "Wie lautet 11111110 als signed 8-Bit-Zweierkomplement?",
    "question": "Wie lautet 11111110 als signed 8-Bit-Zweierkomplement?",
    "options": [
      "254",
      "-2",
      "-126"
    ],
    "answer": 1,
    "hints": [
      "Beim Zweierkomplement werden negative ganze Zahlen mit denselben Bitmustern gespeichert."
    ],
    "explanation": "Unsigned sind es 254. 254 − 256 = −2."
  },
  {
    "id": "computer-float",
    "course": "computer",
    "category": "Zahlen im Speicher",
    "name": "Gleitkomma",
    "title": "Warum 0.1 + 0.2 nicht genau 0.3 ist",
    "description": "Viele Dezimalbrüche haben keine endliche Binärdarstellung. Gleitkommazahlen speichern eine gerundete Näherung.",
    "syntax": "JavaScript:",
    "parts": [
      [
        "Begriff",
        "Viele Dezimalbrüche haben keine endliche Binärdarstellung. Gleitkommazahlen speichern eine gerundete Näherung."
      ],
      [
        "Einordnung",
        "Die Operanden und das Ergebnis müssen in eine endliche binäre Darstellung passen."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "JavaScript Number verwendet IEEE-754 binary64. Python float und Java double verwenden üblicherweise ebenfalls binary64. Genauigkeit und Wertebereich sind unterschiedliche Dinge. Für Geld helfen ganzzahlige Cent innerhalb des sicheren Ganzzahlbereichs oder geeignete Dezimalbibliotheken.",
    "example": "JavaScript:\n0.1 + 0.2 === 0.3 // false\n0.1 + 0.2 // 0.30000000000000004",
    "task": "Warum kann das Ergebnis minimal abweichen?",
    "question": "Warum kann das Ergebnis minimal abweichen?",
    "options": [
      "Der Computer rechnet zufällig",
      "Binäre Näherungen werden gerundet",
      "0.3 ist eine Zeichenkette"
    ],
    "answer": 1,
    "hints": [
      "Viele Dezimalbrüche haben keine endliche Binärdarstellung. Gleitkommazahlen speichern eine gerundete Näherung."
    ],
    "explanation": "Die Operanden und das Ergebnis müssen in eine endliche binäre Darstellung passen."
  },
  {
    "id": "computer-endian",
    "course": "computer",
    "category": "Zahlen im Speicher",
    "name": "Byte-Reihenfolge",
    "title": "Little Endian und Big Endian",
    "description": "Mehrbyte-Zahlen brauchen eine festgelegte Reihenfolge ihrer Bytes.",
    "syntax": "Zahl 0x1234",
    "parts": [
      [
        "Begriff",
        "Mehrbyte-Zahlen brauchen eine festgelegte Reihenfolge ihrer Bytes."
      ],
      [
        "Einordnung",
        "Das niederwertige Byte 34 steht zuerst."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Endian beschreibt die Reihenfolge der Bytes, nicht eine Umkehr der Bits jedes Bytes. Dateiformate und Netzwerkprotokolle legen sie fest. DataView kann in JavaScript die Byte-Reihenfolge ausdrücklich wählen.",
    "example": "Zahl 0x1234\nLittle Endian: 34 12\nBig Endian:    12 34",
    "task": "Wie wird 0x1234 in zwei Bytes als Little Endian abgelegt?",
    "question": "Wie wird 0x1234 in zwei Bytes als Little Endian abgelegt?",
    "options": [
      "12 34",
      "34 12",
      "43 21"
    ],
    "answer": 1,
    "hints": [
      "Mehrbyte-Zahlen brauchen eine festgelegte Reihenfolge ihrer Bytes."
    ],
    "explanation": "Das niederwertige Byte 34 steht zuerst."
  },
  {
    "id": "computer-encoding",
    "course": "computer",
    "category": "Text & Dateien",
    "name": "UTF-8",
    "title": "Text wird mit einer Kodierung zu Bytes",
    "description": "Eine Zeichenkodierung ordnet Zeichen beziehungsweise Unicode-Codepoints einer Bytefolge zu. UTF-8 benötigt pro Codepoint 1 bis 4 Bytes.",
    "syntax": "A → 41 (1 Byte)",
    "parts": [
      [
        "Begriff",
        "Eine Zeichenkodierung ordnet Zeichen beziehungsweise Unicode-Codepoints einer Bytefolge zu. UTF-8 benötigt pro Codepoint 1 bis 4 Bytes."
      ],
      [
        "Einordnung",
        "1 Byte für A, 2 für ä und 4 für 😀: insgesamt 7."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "UTF-8 und JavaScript-Stringlänge sind verschieden: JavaScript length zählt UTF-16-Codeunits, nicht UTF-8-Bytes und nicht sichtbare Zeichen. Ein sichtbares Zeichen kann aus mehreren Codepoints bestehen. Probiere Aä😀 im Text-Labor.",
    "example": "A → 41 (1 Byte)\nä → C3 A4 (2 Bytes)\n😀 → F0 9F 98 80 (4 Bytes)",
    "task": "Wie viele UTF-8-Bytes braucht Aä😀?",
    "question": "Wie viele UTF-8-Bytes braucht Aä😀?",
    "options": [
      "3",
      "4",
      "7"
    ],
    "answer": 2,
    "hints": [
      "Eine Zeichenkodierung ordnet Zeichen beziehungsweise Unicode-Codepoints einer Bytefolge zu. UTF-8 benötigt pro Codepoint 1 bis 4 Bytes."
    ],
    "explanation": "1 Byte für A, 2 für ä und 4 für 😀: insgesamt 7."
  },
  {
    "id": "computer-grapheme",
    "course": "computer",
    "category": "Text & Dateien",
    "name": "Zeichen zählen",
    "title": "Ein sichtbares Zeichen kann mehrere Teile haben",
    "description": "Ein Codepoint ist ein Unicode-Wert. Ein Graphem ist eine für Menschen zusammengehörende Einheit, etwa ein Buchstabe mit Akzent.",
    "syntax": "e + U+0301 (kombinierender Akzent) → é",
    "parts": [
      [
        "Begriff",
        "Ein Codepoint ist ein Unicode-Wert. Ein Graphem ist eine für Menschen zusammengehörende Einheit, etwa ein Buchstabe mit Akzent."
      ],
      [
        "Einordnung",
        "Der Buchstabe e und der kombinierende Akzent sind zwei Codepoints."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Eine Zeichenkette kann gleich aussehen und unterschiedlich kodiert sein. Normalisierung kann manche Darstellungen vereinheitlichen. Intl.Segmenter mit granularity grapheme hilft beim Zählen sichtbarer Einheiten; einfache length genügt dafür nicht.",
    "example": "e + U+0301 (kombinierender Akzent) → é\n2 Codepoints, meist 1 sichtbares Zeichen",
    "task": "Wie viele Codepoints hat e gefolgt von U+0301?",
    "question": "Wie viele Codepoints hat e gefolgt von U+0301?",
    "options": [
      "1",
      "2",
      "Immer 3"
    ],
    "answer": 1,
    "hints": [
      "Ein Codepoint ist ein Unicode-Wert. Ein Graphem ist eine für Menschen zusammengehörende Einheit, etwa ein Buchstabe mit Akzent."
    ],
    "explanation": "Der Buchstabe e und der kombinierende Akzent sind zwei Codepoints."
  },
  {
    "id": "computer-file",
    "course": "computer",
    "category": "Text & Dateien",
    "name": "Dateiformate",
    "title": "Eine Datei ist eine Folge von Bytes",
    "description": "Das Dateiformat legt fest, wie Programme die Bytes interpretieren: als Text, Bild, Ton oder andere Daten.",
    "syntax": "report.txt: Text mit einer Kodierung",
    "parts": [
      [
        "Begriff",
        "Das Dateiformat legt fest, wie Programme die Bytes interpretieren: als Text, Bild, Ton oder andere Daten."
      ],
      [
        "Einordnung",
        "Die Bytefolge bleibt gleich. Ein anderes Programm kann sie nun falsch interpretieren."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Eine Dateiendung ist ein Hinweis. Manche Formate haben Kennungen im Inhalt. Ein Texteditor versucht Bytes als Text zu lesen; dadurch wird ein PNG nicht zu Text. Für eine Konvertierung muss ein Programm das alte Format lesen und das neue schreiben.",
    "example": "report.txt: Text mit einer Kodierung\nreport.png: Bildstruktur mit Header und Daten\nUmbenennen .txt → .png konvertiert nichts",
    "task": "Was bewirkt allein das Umbenennen von bild.png in bild.txt?",
    "question": "Was bewirkt allein das Umbenennen von bild.png in bild.txt?",
    "options": [
      "Es wandelt das Bild in Text um",
      "Es ändert den Namen, nicht den Inhalt",
      "Es komprimiert das Bild"
    ],
    "answer": 1,
    "hints": [
      "Das Dateiformat legt fest, wie Programme die Bytes interpretieren: als Text, Bild, Ton oder andere Daten."
    ],
    "explanation": "Die Bytefolge bleibt gleich. Ein anderes Programm kann sie nun falsch interpretieren."
  },
  {
    "id": "computer-pixels",
    "course": "computer",
    "category": "Text & Dateien",
    "name": "Pixel",
    "title": "Wie ein Bild Speicher braucht",
    "description": "Ein unkomprimiertes RGBA-Bild mit 8 Bits pro Kanal braucht vier Bytes pro Pixel: Rot, Grün, Blau und Alpha.",
    "syntax": "100 × 100 Pixel × 4 Bytes = 40.000 Bytes",
    "parts": [
      [
        "Begriff",
        "Ein unkomprimiertes RGBA-Bild mit 8 Bits pro Kanal braucht vier Bytes pro Pixel: Rot, Grün, Blau und Alpha."
      ],
      [
        "Einordnung",
        "100 Pixel × 4 Bytes = 400 Bytes."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Die Rechnung beschreibt reine Pixeldaten ohne Metadaten oder Zeilenauffüllung. Eine PNG-Datei kann durch verlustfreie Kompression wesentlich kleiner sein. Dateigröße und Speicherbedarf eines dekodierten Bildes sind unterschiedliche Größen.",
    "example": "100 × 100 Pixel × 4 Bytes = 40.000 Bytes\nRGBA: [255, 0, 0, 255] = deckendes Rot",
    "task": "Wie groß sind die reinen RGBA-Pixeldaten eines 10 × 10-Bildes?",
    "question": "Wie groß sind die reinen RGBA-Pixeldaten eines 10 × 10-Bildes?",
    "options": [
      "100 Bytes",
      "400 Bytes",
      "4.000 Bytes"
    ],
    "answer": 1,
    "hints": [
      "Ein unkomprimiertes RGBA-Bild mit 8 Bits pro Kanal braucht vier Bytes pro Pixel: Rot, Grün, Blau und Alpha."
    ],
    "explanation": "100 Pixel × 4 Bytes = 400 Bytes."
  },
  {
    "id": "computer-cpu",
    "course": "computer",
    "category": "CPU & Programme",
    "name": "CPU",
    "title": "Die CPU verarbeitet Maschinenbefehle",
    "description": "Die CPU führt Maschinenbefehle aus: Werte laden, rechnen, vergleichen, springen und speichern.",
    "syntax": "Vereinfachtes Modell:",
    "parts": [
      [
        "Begriff",
        "Die CPU führt Maschinenbefehle aus: Werte laden, rechnen, vergleichen, springen und speichern."
      ],
      [
        "Einordnung",
        "Die CPU führt Befehle aus und verarbeitet dabei Daten."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Ein Prozessor arbeitet mit Registern und Speicher. Moderne CPUs nutzen Pipelines, Caches und mehrere Kerne. Das Lernmodell zeigt Schritte einzeln; real können Arbeitsschritte überlappen. Taktfrequenz allein sagt nicht, welches Gerät schneller ist.",
    "example": "Vereinfachtes Modell:\nLade 7\nAddiere 5\nSpeichere 12",
    "task": "Was macht eine CPU hauptsächlich?",
    "question": "Was macht eine CPU hauptsächlich?",
    "options": [
      "Dateien dauerhaft ohne Strom aufbewahren",
      "Maschinenbefehle ausführen",
      "Nur Internetseiten speichern"
    ],
    "answer": 1,
    "hints": [
      "Die CPU führt Maschinenbefehle aus: Werte laden, rechnen, vergleichen, springen und speichern."
    ],
    "explanation": "Die CPU führt Befehle aus und verarbeitet dabei Daten."
  },
  {
    "id": "computer-languages",
    "course": "computer",
    "category": "CPU & Programme",
    "name": "Vom Code zum Befehl",
    "title": "Wie Quellcode ausführbar wird",
    "description": "Programmiersprachen beschreiben Arbeit auf einem höheren Niveau. Werkzeuge und Laufzeitumgebungen übersetzen oder interpretieren sie.",
    "syntax": "C → Compiler → Maschinenprogramm",
    "parts": [
      [
        "Begriff",
        "Programmiersprachen beschreiben Arbeit auf einem höheren Niveau. Werkzeuge und Laufzeitumgebungen übersetzen oder interpretieren sie."
      ],
      [
        "Einordnung",
        "Die JVM führt Bytecode aus und kann ihn mit einem JIT-Compiler in Maschinencode übersetzen."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Die konkrete Umsetzung variiert: JavaScript-Engines können häufig ausgeführten Code in Maschinencode übersetzen. Python CPython verwendet Bytecode und einen Interpreter; native Erweiterungen funktionieren anders. Compiler und Interpreter sind Umsetzungsstrategien, keine starre Eigenschaft einer Sprache.",
    "example": "C → Compiler → Maschinenprogramm\nJava → Bytecode → JVM (mit JIT)\nJavaScript → Engine (Interpreter / JIT)",
    "task": "Was ist Java-Bytecode üblicherweise?",
    "question": "Was ist Java-Bytecode üblicherweise?",
    "options": [
      "Ein Programm für die JVM",
      "Immer direkt ausführbare CPU-Befehle",
      "Eine Bilddatei"
    ],
    "answer": 0,
    "hints": [
      "Programmiersprachen beschreiben Arbeit auf einem höheren Niveau. Werkzeuge und Laufzeitumgebungen übersetzen oder interpretieren sie."
    ],
    "explanation": "Die JVM führt Bytecode aus und kann ihn mit einem JIT-Compiler in Maschinencode übersetzen."
  },
  {
    "id": "computer-ram",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "RAM und SSD",
    "title": "Arbeitsspeicher und dauerhafte Speicherung",
    "description": "RAM hält Daten für laufende Programme bereit. Eine SSD speichert Daten auch ohne Strom.",
    "syntax": "Datei auf SSD → ins RAM laden → CPU verarbeitet",
    "parts": [
      [
        "Begriff",
        "RAM hält Daten für laufende Programme bereit. Eine SSD speichert Daten auch ohne Strom."
      ],
      [
        "Einordnung",
        "Eine SSD oder ein anderer dauerhafter Datenträger bewahrt Daten ohne Strom auf."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Üblicher RAM ist flüchtig. Eine ungespeicherte Änderung ist nach Stromverlust nicht zuverlässig wieder da. Betriebssysteme verwenden Caches; erfolgreiche Schreibaufrufe bedeuten nicht unter allen Umständen sofort dauerhaft physisch gespeicherte Daten.",
    "example": "Datei auf SSD → ins RAM laden → CPU verarbeitet\nErgebnis im RAM → speichern → Datei auf SSD",
    "task": "Wo liegt eine Datei dauerhaft nach regulärem Speichern?",
    "question": "Wo liegt eine Datei dauerhaft nach regulärem Speichern?",
    "options": [
      "Nur in einem CPU-Register",
      "Auf einem dauerhaften Datenträger wie einer SSD",
      "Immer ausschließlich im RAM"
    ],
    "answer": 1,
    "hints": [
      "RAM hält Daten für laufende Programme bereit. Eine SSD speichert Daten auch ohne Strom."
    ],
    "explanation": "Eine SSD oder ein anderer dauerhafter Datenträger bewahrt Daten ohne Strom auf."
  },
  {
    "id": "computer-hierarchy",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Speicherhierarchie",
    "title": "Register, Cache, RAM und SSD",
    "description": "Nähe zur CPU, Geschwindigkeit, Größe und Kosten unterscheiden die Speicherstufen.",
    "syntax": "Typisch: Register → CPU-Cache → RAM → SSD",
    "parts": [
      [
        "Begriff",
        "Nähe zur CPU, Geschwindigkeit, Größe und Kosten unterscheiden die Speicherstufen."
      ],
      [
        "Einordnung",
        "Der Cache spart langsamere Zugriffe auf andere Speicherstufen."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Register sind Teil der CPU und enthalten unmittelbar verwendete Werte. Caches halten Kopien oft benötigter Speicherdaten. Zugriffskosten hängen von Hardware und Zugriffsmustern ab; die Reihenfolge ist eine Orientierung, keine garantierte Zeitangabe.",
    "example": "Typisch: Register → CPU-Cache → RAM → SSD\nKleine schnelle Speicher puffern oft benötigte Daten.",
    "task": "Wozu dient ein CPU-Cache vor allem?",
    "question": "Wozu dient ein CPU-Cache vor allem?",
    "options": [
      "Häufig benötigte Daten schneller bereitzustellen",
      "Alle Dateien für immer aufzubewahren",
      "Die CPU durch eine SSD zu ersetzen"
    ],
    "answer": 0,
    "hints": [
      "Nähe zur CPU, Geschwindigkeit, Größe und Kosten unterscheiden die Speicherstufen."
    ],
    "explanation": "Der Cache spart langsamere Zugriffe auf andere Speicherstufen."
  },
  {
    "id": "computer-address",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Adressen",
    "title": "Speicheradressen und Werte unterscheiden",
    "description": "Eine Adresse bezeichnet einen Speicherort; der Wert ist dessen Inhalt. In modernen Programmen sind Adressen meist virtuell.",
    "syntax": "Modell:",
    "parts": [
      [
        "Begriff",
        "Eine Adresse bezeichnet einen Speicherort; der Wert ist dessen Inhalt. In modernen Programmen sind Adressen meist virtuell."
      ],
      [
        "Einordnung",
        "1000 benennt den Ort. 42 ist der darin gespeicherte Wert."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Das Betriebssystem und Hardware übersetzen virtuelle Adressen auf physischen Speicher. Zwei Prozesse können dieselbe virtuelle Adresse für unterschiedliche Daten verwenden. C-Pointer enthalten Adressen; JavaScript gibt gewöhnlich keine rohen Speicheradressen preis.",
    "example": "Modell:\nAdresse 1000 → Inhalt 42\nAdresse 1001 → Inhalt 7",
    "task": "Was ist die Adresse im Beispiel Adresse 1000 → Inhalt 42?",
    "question": "Was ist die Adresse im Beispiel Adresse 1000 → Inhalt 42?",
    "options": [
      "42",
      "1000",
      "Beides dasselbe"
    ],
    "answer": 1,
    "hints": [
      "Eine Adresse bezeichnet einen Speicherort; der Wert ist dessen Inhalt. In modernen Programmen sind Adressen meist virtuell."
    ],
    "explanation": "1000 benennt den Ort. 42 ist der darin gespeicherte Wert."
  },
  {
    "id": "computer-stack",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Stack und Heap",
    "title": "Funktionsaufrufe und langlebige Daten",
    "description": "Ein Call Stack verfolgt Funktionsaufrufe. Ein Heap dient in vielen Laufzeiten zur dynamischen Speicherverwaltung.",
    "syntax": "main ruft rechnen auf",
    "parts": [
      [
        "Begriff",
        "Ein Call Stack verfolgt Funktionsaufrufe. Ein Heap dient in vielen Laufzeiten zur dynamischen Speicherverwaltung."
      ],
      [
        "Einordnung",
        "Die innerste Funktion addieren beendet ihren Aufruf zuerst; danach kann rechnen fortfahren."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Lokale Werte können je nach Sprache, Typ und Optimierung in Stackframes, Registern oder anderen Speicherbereichen liegen. Die Regel alle Variablen auf Stack, alle Objekte auf Heap ist zu grob. JavaScript-Engines optimieren ihre interne Darstellung.",
    "example": "main ruft rechnen auf\nrechnen ruft addieren auf\naddieren kehrt zuerst zurück",
    "task": "Welche Funktion kehrt in dieser Aufrufkette zuerst zurück?",
    "question": "Welche Funktion kehrt in dieser Aufrufkette zuerst zurück?",
    "options": [
      "main",
      "rechnen",
      "addieren"
    ],
    "answer": 2,
    "hints": [
      "Ein Call Stack verfolgt Funktionsaufrufe. Ein Heap dient in vielen Laufzeiten zur dynamischen Speicherverwaltung."
    ],
    "explanation": "Die innerste Funktion addieren beendet ihren Aufruf zuerst; danach kann rechnen fortfahren."
  },
  {
    "id": "computer-reference",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Referenzen",
    "title": "Zwei Namen können dasselbe Objekt erreichen",
    "description": "Eine Referenz erlaubt Zugriff auf ein Objekt. Zwei Variablen können dasselbe veränderbare Objekt referenzieren.",
    "syntax": "const a = { punkte: 1 };",
    "parts": [
      [
        "Begriff",
        "Eine Referenz erlaubt Zugriff auf ein Objekt. Zwei Variablen können dasselbe veränderbare Objekt referenzieren."
      ],
      [
        "Einordnung",
        "a und b referenzieren dasselbe Objekt. Die Änderung ist über beide sichtbar."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "b = a erstellt in diesem Beispiel keine Objektkopie. Ein Spread erzeugt eine neue äußere Objektstruktur, kopiert verschachtelte Referenzen aber nur flach. Referenzen als Pfeile zu zeichnen hilft, Änderungen zu verstehen.",
    "example": "const a = { punkte: 1 };\nconst b = a;\nb.punkte = 5;\n// a.punkte ist jetzt 5",
    "task": "Welchen Wert hat a.punkte nach diesem Beispiel?",
    "question": "Welchen Wert hat a.punkte nach diesem Beispiel?",
    "options": [
      "1",
      "5",
      "undefined"
    ],
    "answer": 1,
    "hints": [
      "Eine Referenz erlaubt Zugriff auf ein Objekt. Zwei Variablen können dasselbe veränderbare Objekt referenzieren."
    ],
    "explanation": "a und b referenzieren dasselbe Objekt. Die Änderung ist über beide sichtbar."
  },
  {
    "id": "computer-gc",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Speicher freigeben",
    "title": "Garbage Collection und Speicherlecks",
    "description": "Garbage Collector können Speicher nicht mehr erreichbarer Objekte automatisch freigeben. Erreichbare, unnötige Daten bleiben jedoch liegen.",
    "syntax": "Ein Array sammelt alte Ergebnisse ohne Limit.",
    "parts": [
      [
        "Begriff",
        "Garbage Collector können Speicher nicht mehr erreichbarer Objekte automatisch freigeben. Erreichbare, unnötige Daten bleiben jedoch liegen."
      ],
      [
        "Einordnung",
        "Automatische Verwaltung entscheidet nicht, welche weiterhin erreichbaren Daten du fachlich nicht mehr brauchst."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "JavaScript, Java und Python verwalten viel Speicher automatisch, mit unterschiedlichen Verfahren. Ein unerwünschter Listener, Timer oder Cache kann Objekte erreichbar halten. Freigabezeitpunkt und Zurückgabe an das Betriebssystem sind nicht garantiert. In C muss dynamischer Speicher passend manuell freigegeben werden.",
    "example": "Ein Array sammelt alte Ergebnisse ohne Limit.\nDas Array bleibt erreichbar.\nDie Ergebnisse werden nicht automatisch vergessen.",
    "task": "Warum kann ein grenzenlos wachsender, erreichbarer Cache ein Speicherproblem werden?",
    "question": "Warum kann ein grenzenlos wachsender, erreichbarer Cache ein Speicherproblem werden?",
    "options": [
      "Ein Garbage Collector löscht beliebige erreichbare Daten",
      "Die Einträge bleiben erreichbar und belegen weiterhin Speicher",
      "Ein Cache kann nie Speicher verwenden"
    ],
    "answer": 1,
    "hints": [
      "Garbage Collector können Speicher nicht mehr erreichbarer Objekte automatisch freigeben. Erreichbare, unnötige Daten bleiben jedoch liegen."
    ],
    "explanation": "Automatische Verwaltung entscheidet nicht, welche weiterhin erreichbaren Daten du fachlich nicht mehr brauchst."
  },
  {
    "id": "computer-process",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Prozess und Thread",
    "title": "Das Betriebssystem organisiert Programme",
    "description": "Ein Prozess ist eine laufende Programminstanz mit Ressourcen und einem Adressraum. Threads führen Arbeit innerhalb eines Prozesses aus.",
    "syntax": "Zwei gestartete Programme → typischerweise zwei Prozesse",
    "parts": [
      [
        "Begriff",
        "Ein Prozess ist eine laufende Programminstanz mit Ressourcen und einem Adressraum. Threads führen Arbeit innerhalb eines Prozesses aus."
      ],
      [
        "Einordnung",
        "Sie können auf gemeinsamen Prozessspeicher zugreifen; ihre Aufrufstacks sind getrennt."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Threads eines Prozesses teilen typischerweise den Adressraum, besitzen aber eigene Aufrufstacks. Das Betriebssystem plant CPU-Zeit ein. Gleichzeitigkeit kann durch Zeitwechsel entstehen; parallele Ausführung braucht passende Hardware/Ressourcen. Browser verwenden mehrere Prozesse.",
    "example": "Zwei gestartete Programme → typischerweise zwei Prozesse\nMehrere Threads → können Prozessspeicher teilen",
    "task": "Was teilen Threads desselben Prozesses typischerweise?",
    "question": "Was teilen Threads desselben Prozesses typischerweise?",
    "options": [
      "Den Adressraum",
      "Immer genau einen gemeinsamen Aufrufstack",
      "Alle Dateien sämtlicher anderer Prozesse"
    ],
    "answer": 0,
    "hints": [
      "Ein Prozess ist eine laufende Programminstanz mit Ressourcen und einem Adressraum. Threads führen Arbeit innerhalb eines Prozesses aus."
    ],
    "explanation": "Sie können auf gemeinsamen Prozessspeicher zugreifen; ihre Aufrufstacks sind getrennt."
  },
  {
    "id": "computer-virtual",
    "course": "computer",
    "category": "Speicher & Betriebssystem",
    "name": "Virtueller Speicher",
    "title": "Wenn RAM knapp wird",
    "description": "Virtueller Speicher trennt den Adressraum eines Programms von der physischen RAM-Belegung. Das Betriebssystem kann bestimmte Speicherseiten auslagern.",
    "syntax": "Virtuelle Seite → RAM",
    "parts": [
      [
        "Begriff",
        "Virtueller Speicher trennt den Adressraum eines Programms von der physischen RAM-Belegung. Das Betriebssystem kann bestimmte Speicherseiten auslagern."
      ],
      [
        "Einordnung",
        "Der Zugriff auf ausgelagerte Seiten erfordert zusätzliche und meist langsamere Ein-/Ausgabe."
      ]
    ],
    "note": "Ein Lernmodell vereinfacht Hardware und Laufzeit. Beachte den genannten Datentyp und die Einheit.",
    "detail": "Virtueller Speicher dient auch Isolation und Adressverwaltung, nicht nur Auslagerung. Eine Auslagerungsdatei macht die SSD nicht so schnell wie RAM. Häufiges Nachladen kann stark bremsen; ohne genug Ressourcen können Programme scheitern oder beendet werden.",
    "example": "Virtuelle Seite → RAM\nAusgelagerte Seite → bei Bedarf zurück in RAM laden",
    "task": "Warum kann starke Auslagerung ein Programm langsamer machen?",
    "question": "Warum kann starke Auslagerung ein Programm langsamer machen?",
    "options": [
      "Die SSD ersetzt CPU-Befehle",
      "Speicherseiten müssen über langsamere Datenträgerzugriffe nachgeladen werden",
      "Virtuelle Adressen enthalten keine Daten"
    ],
    "answer": 1,
    "hints": [
      "Virtueller Speicher trennt den Adressraum eines Programms von der physischen RAM-Belegung. Das Betriebssystem kann bestimmte Speicherseiten auslagern."
    ],
    "explanation": "Der Zugriff auf ausgelagerte Seiten erfordert zusätzliche und meist langsamere Ein-/Ausgabe."
  }
];

export const computerLessons = [...basics, ...computerAdvancedLessons, ...computerProcessingLessons];
