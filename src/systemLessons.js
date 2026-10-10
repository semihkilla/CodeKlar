export const systemLessons = [
  {
    "id": "js-system-binary",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "toString(2)",
    "title": "Ein Byte binär und hexadezimal darstellen",
    "description": "toString(radix) schreibt eine Zahl in einer gewählten Basis; padStart ergänzt führende Nullen.",
    "syntax": "wert.toString(2).padStart(8, \"0\")",
    "parts": [
      [
        "2 / 16",
        "Binäre beziehungsweise hexadezimale Schreibweise."
      ],
      [
        "padStart",
        "Füllt nur die Darstellung auf."
      ]
    ],
    "note": "Die Eingabe ist eine ganze Zahl von 0 bis 255; die Umwandlung ändert ihren Wert nicht.",
    "detail": "Gib {binaer,hex} zurück; binaer hat acht Stellen, hex zwei große Hex-Ziffern ohne 0x.",
    "task": "Gib {binaer,hex} zurück; binaer hat acht Stellen, hex zwei große Hex-Ziffern ohne 0x. Verändere die Eingabe nicht.",
    "functionName": "systemBinary",
    "parameter": "daten",
    "tests": [
      {
        "input": 0,
        "expected": {
          "binaer": "00000000",
          "hex": "00"
        }
      },
      {
        "input": 42,
        "expected": {
          "binaer": "00101010",
          "hex": "2A"
        }
      },
      {
        "input": 255,
        "expected": {
          "binaer": "11111111",
          "hex": "FF"
        }
      }
    ],
    "starter": "function systemBinary(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemBinary(daten) {\n  return {binaer:daten.toString(2).padStart(8,\"0\"),hex:daten.toString(16).toUpperCase().padStart(2,\"0\")};\n}",
    "example": "function systemBinary(daten) {\n  return {binaer:daten.toString(2).padStart(8,\"0\"),hex:daten.toString(16).toUpperCase().padStart(2,\"0\")};\n}\n\nconsole.log(systemBinary(0));",
    "preserveInput": true,
    "hints": [
      "Nutze Basen 2 und 16.",
      "Hex-Ziffern mit toUpperCase vereinheitlichen."
    ],
    "explanation": "toString(radix) schreibt eine Zahl in einer gewählten Basis; padStart ergänzt führende Nullen. Die Eingabe ist eine ganze Zahl von 0 bis 255; die Umwandlung ändert ihren Wert nicht."
  },
  {
    "id": "js-system-mask-has",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "& / Bitmaske",
    "title": "Prüfen, ob alle Rechte-Bits gesetzt sind",
    "description": "Bitweises AND behält nur Stellen, die in beiden Number-Operanden gesetzt sind.",
    "syntax": "(flags & maske) === maske",
    "parts": [
      [
        "flags",
        "Vorhandene Rechte."
      ],
      [
        "maske",
        "Alle verlangten Rechte."
      ]
    ],
    "note": "Number-Bitoperatoren arbeiten hier mit 32-Bit-Ganzzahlen. Eingaben sind 0 bis 255; eine leere Maske ist erfüllt.",
    "detail": "daten ist {flags,maske}. Gib true zurück, wenn alle Bits der maske in flags gesetzt sind.",
    "task": "daten ist {flags,maske}. Gib true zurück, wenn alle Bits der maske in flags gesetzt sind. Verändere die Eingabe nicht.",
    "functionName": "systemMaskHas",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "flags": 5,
          "maske": 1
        },
        "expected": true
      },
      {
        "input": {
          "flags": 5,
          "maske": 3
        },
        "expected": false
      },
      {
        "input": {
          "flags": 0,
          "maske": 0
        },
        "expected": true
      },
      {
        "input": {
          "flags": 255,
          "maske": 128
        },
        "expected": true
      }
    ],
    "starter": "function systemMaskHas(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemMaskHas(daten) {\n  return (daten.flags & daten.maske) === daten.maske;\n}",
    "example": "function systemMaskHas(daten) {\n  return (daten.flags & daten.maske) === daten.maske;\n}\n\nconsole.log(systemMaskHas({\"flags\": 5, \"maske\": 1}));",
    "preserveInput": true,
    "hints": [
      "AND mit der Maske bilden.",
      "Ein einzelnes passendes Bit reicht nicht, wenn mehrere verlangt sind."
    ],
    "explanation": "Bitweises AND behält nur Stellen, die in beiden Number-Operanden gesetzt sind. Number-Bitoperatoren arbeiten hier mit 32-Bit-Ganzzahlen. Eingaben sind 0 bis 255; eine leere Maske ist erfüllt."
  },
  {
    "id": "js-system-mask-edit",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "| / & / ~ / ^",
    "title": "Rechte setzen, entfernen und umschalten",
    "description": "OR setzt Bits, AND mit invertierter Maske entfernt Bits, XOR schaltet Bits um.",
    "syntax": "flags | maske; flags & ~maske; flags ^ maske",
    "parts": [
      [
        "~",
        "Invertiert bei Number 32 Bits."
      ],
      [
        "^",
        "Unterschiedliche Bits ergeben 1."
      ]
    ],
    "note": "Eingaben sind Bytes. AND mit 255 begrenzt eine Ausgabe ausdrücklich auf acht Bits. Diese Operatoren sind andere als || und &&.",
    "detail": "Gib für {flags,maske} {gesetzt,entfernt,umgeschaltet} zurück.",
    "task": "Gib für {flags,maske} {gesetzt,entfernt,umgeschaltet} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemMaskEdit",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "flags": 5,
          "maske": 3
        },
        "expected": {
          "gesetzt": 7,
          "entfernt": 4,
          "umgeschaltet": 6
        }
      },
      {
        "input": {
          "flags": 0,
          "maske": 128
        },
        "expected": {
          "gesetzt": 128,
          "entfernt": 0,
          "umgeschaltet": 128
        }
      },
      {
        "input": {
          "flags": 255,
          "maske": 255
        },
        "expected": {
          "gesetzt": 255,
          "entfernt": 0,
          "umgeschaltet": 0
        }
      }
    ],
    "starter": "function systemMaskEdit(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemMaskEdit(daten) {\n  return {gesetzt:(daten.flags|daten.maske)&255,entfernt:(daten.flags&~daten.maske)&255,umgeschaltet:(daten.flags^daten.maske)&255};\n}",
    "example": "function systemMaskEdit(daten) {\n  return {gesetzt:(daten.flags|daten.maske)&255,entfernt:(daten.flags&~daten.maske)&255,umgeschaltet:(daten.flags^daten.maske)&255};\n}\n\nconsole.log(systemMaskEdit({\"flags\": 5, \"maske\": 3}));",
    "preserveInput": true,
    "hints": [
      "Berechne jede Ausgabe aus dem ursprünglichen flags.",
      "~maske liefert die Gegenmaske."
    ],
    "explanation": "OR setzt Bits, AND mit invertierter Maske entfernt Bits, XOR schaltet Bits um. Eingaben sind Bytes. AND mit 255 begrenzt eine Ausgabe ausdrücklich auf acht Bits. Diese Operatoren sind andere als || und &&."
  },
  {
    "id": "js-system-shift",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": ">> / >>>",
    "title": "Vorzeichenbehaftet oder mit Nullen schieben",
    "description": ">> erhält das Vorzeichen beim Rechtsschieben; >>> schiebt Nullen nach und liefert einen unsigned 32-Bit-Wert.",
    "syntax": "wert >> stellen; wert >>> stellen",
    "parts": [
      [
        ">>",
        "Erweitert links das Vorzeichen."
      ],
      [
        ">>>",
        "Füllt links Nullen auf."
      ]
    ],
    "note": "Eingaben: signed 32-Bit-Zahl wert und stellen 0 bis 31. Größere Schiebweiten werden bei Number modulo 32 behandelt. BigInt kennt kein >>>.",
    "detail": "Gib für {wert,stellen} {signed,unsigned} zurück.",
    "task": "Gib für {wert,stellen} {signed,unsigned} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemShift",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "wert": -1,
          "stellen": 1
        },
        "expected": {
          "signed": -1,
          "unsigned": 2147483647
        }
      },
      {
        "input": {
          "wert": 8,
          "stellen": 2
        },
        "expected": {
          "signed": 2,
          "unsigned": 2
        }
      },
      {
        "input": {
          "wert": -2147483648,
          "stellen": 31
        },
        "expected": {
          "signed": -1,
          "unsigned": 1
        }
      }
    ],
    "starter": "function systemShift(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemShift(daten) {\n  return {signed:daten.wert>>daten.stellen,unsigned:daten.wert>>>daten.stellen};\n}",
    "example": "function systemShift(daten) {\n  return {signed:daten.wert>>daten.stellen,unsigned:daten.wert>>>daten.stellen};\n}\n\nconsole.log(systemShift({\"wert\": -1, \"stellen\": 1}));",
    "preserveInput": true,
    "hints": [
      "Vergleiche >> mit >>> für negative Werte."
    ],
    "explanation": ">> erhält das Vorzeichen beim Rechtsschieben; >>> schiebt Nullen nach und liefert einen unsigned 32-Bit-Wert. Eingaben: signed 32-Bit-Zahl wert und stellen 0 bis 31. Größere Schiebweiten werden bei Number modulo 32 behandelt. BigInt kennt kein >>>."
  },
  {
    "id": "js-system-uint8",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "Uint8Array",
    "title": "Werte als vorzeichenlose Bytes ablegen",
    "description": "Uint8Array speichert Werte als vorzeichenlose 8-Bit-Ganzzahlen.",
    "syntax": "Uint8Array.from(werte)",
    "parts": [
      [
        "Uint8",
        "0 bis 255."
      ],
      [
        "Array.from",
        "Wandelt die Ansicht für die Rückgabe in ein gewöhnliches Array."
      ]
    ],
    "note": "Die Aufgabe verwendet nur endliche ganze Zahlen. Der TypedArray konvertiert sie modulo 256; normale Arrays tun das nicht.",
    "detail": "Gib die Werte des Eingabearrays nach Speicherung in einem Uint8Array als gewöhnliches Array zurück.",
    "task": "Gib die Werte des Eingabearrays nach Speicherung in einem Uint8Array als gewöhnliches Array zurück. Verändere die Eingabe nicht.",
    "functionName": "systemUint8",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          0,
          255,
          256,
          -1
        ],
        "expected": [
          0,
          255,
          0,
          255
        ]
      },
      {
        "input": [
          511,
          -257
        ],
        "expected": [
          255,
          255
        ]
      },
      {
        "input": [],
        "expected": []
      }
    ],
    "starter": "function systemUint8(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemUint8(daten) {\n  return Array.from(Uint8Array.from(daten));\n}",
    "example": "function systemUint8(daten) {\n  return Array.from(Uint8Array.from(daten));\n}\n\nconsole.log(systemUint8([0, 255, 256, -1]));",
    "preserveInput": true,
    "hints": [
      "Erzeuge den TypedArray, sammle danach seine Werte."
    ],
    "explanation": "Uint8Array speichert Werte als vorzeichenlose 8-Bit-Ganzzahlen. Die Aufgabe verwendet nur endliche ganze Zahlen. Der TypedArray konvertiert sie modulo 256; normale Arrays tun das nicht."
  },
  {
    "id": "js-system-int8",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "Int8Array",
    "title": "Dieselben Bytes mit Vorzeichen lesen",
    "description": "Int8Array interpretiert die unteren acht Bits im Bereich −128 bis 127.",
    "syntax": "Int8Array.from(werte)",
    "parts": [
      [
        "Int8",
        "Signed 8-Bit-Werte."
      ]
    ],
    "note": "Die Eingaben sind ganze Zahlen; die gleichen unteren Bits werden anders gelesen als bei Uint8Array.",
    "detail": "Gib das Eingabearray nach Speicherung als Int8Array als gewöhnliches Array zurück.",
    "task": "Gib das Eingabearray nach Speicherung als Int8Array als gewöhnliches Array zurück. Verändere die Eingabe nicht.",
    "functionName": "systemInt8",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          127,
          128,
          255,
          256
        ],
        "expected": [
          127,
          -128,
          -1,
          0
        ]
      },
      {
        "input": [
          -129,
          -128,
          0
        ],
        "expected": [
          127,
          -128,
          0
        ]
      },
      {
        "input": [],
        "expected": []
      }
    ],
    "starter": "function systemInt8(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemInt8(daten) {\n  return Array.from(Int8Array.from(daten));\n}",
    "example": "function systemInt8(daten) {\n  return Array.from(Int8Array.from(daten));\n}\n\nconsole.log(systemInt8([127, 128, 255, 256]));",
    "preserveInput": true,
    "hints": [
      "Nutze Int8Array und Array.from."
    ],
    "explanation": "Int8Array interpretiert die unteren acht Bits im Bereich −128 bis 127. Die Eingaben sind ganze Zahlen; die gleichen unteren Bits werden anders gelesen als bei Uint8Array."
  },
  {
    "id": "js-system-buffer",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "ArrayBuffer / byteLength",
    "title": "Speicherblock und Ansicht unterscheiden",
    "description": "Ein ArrayBuffer ist ein Byteblock; TypedArrays sind typisierte Ansichten auf diesen Block.",
    "syntax": "new Uint16Array(new ArrayBuffer(8))",
    "parts": [
      [
        "byteLength",
        "Größe in Bytes."
      ],
      [
        "length",
        "Anzahl der Elemente in der Ansicht."
      ]
    ],
    "note": "daten ist eine nichtnegative gerade Bytezahl bis 64. Uint16Array benötigt zwei Bytes je Element; Native Endian ist keine Dateiformatgarantie.",
    "detail": "Erzeuge einen ArrayBuffer mit daten Bytes und eine Uint16Array-Ansicht. Gib {bytes,elemente} zurück.",
    "task": "Erzeuge einen ArrayBuffer mit daten Bytes und eine Uint16Array-Ansicht. Gib {bytes,elemente} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemBuffer",
    "parameter": "daten",
    "tests": [
      {
        "input": 8,
        "expected": {
          "bytes": 8,
          "elemente": 4
        }
      },
      {
        "input": 2,
        "expected": {
          "bytes": 2,
          "elemente": 1
        }
      },
      {
        "input": 0,
        "expected": {
          "bytes": 0,
          "elemente": 0
        }
      }
    ],
    "starter": "function systemBuffer(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemBuffer(daten) {\n  const buffer=new ArrayBuffer(daten); const view=new Uint16Array(buffer);\n  return {bytes:buffer.byteLength,elemente:view.length};\n}",
    "example": "function systemBuffer(daten) {\n  const buffer=new ArrayBuffer(daten); const view=new Uint16Array(buffer);\n  return {bytes:buffer.byteLength,elemente:view.length};\n}\n\nconsole.log(systemBuffer(8));",
    "preserveInput": true,
    "hints": [
      "length ist nicht byteLength."
    ],
    "explanation": "Ein ArrayBuffer ist ein Byteblock; TypedArrays sind typisierte Ansichten auf diesen Block. daten ist eine nichtnegative gerade Bytezahl bis 64. Uint16Array benötigt zwei Bytes je Element; Native Endian ist keine Dateiformatgarantie."
  },
  {
    "id": "js-system-views",
    "course": "js",
    "category": "Speicher & Referenzen",
    "name": "subarray / slice",
    "title": "Eine Ansicht teilt Speicher, eine Kopie nicht",
    "description": "TypedArray.subarray liefert eine Ansicht auf denselben Puffer; slice kopiert die ausgewählten Werte.",
    "syntax": "const view = bytes.subarray(1); const copy = bytes.slice(1);",
    "parts": [
      [
        "subarray",
        "Geteilter Speicher."
      ],
      [
        "slice",
        "Neuer Speicherblock."
      ]
    ],
    "note": "daten hat mindestens zwei Bytewerte. Die ursprüngliche JSON-Eingabe bleibt unverändert, nur der neu angelegte TypedArray wird geändert.",
    "detail": "Erzeuge bytes aus daten, view=bytes.subarray(1), copy=bytes.slice(1). Setze bytes[1]=99. Gib {view,copy} als gewöhnliche Arrays zurück.",
    "task": "Erzeuge bytes aus daten, view=bytes.subarray(1), copy=bytes.slice(1). Setze bytes[1]=99. Gib {view,copy} als gewöhnliche Arrays zurück. Verändere die Eingabe nicht.",
    "functionName": "systemViews",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          1,
          2,
          3
        ],
        "expected": {
          "view": [
            99,
            3
          ],
          "copy": [
            2,
            3
          ]
        }
      },
      {
        "input": [
          0,
          0
        ],
        "expected": {
          "view": [
            99
          ],
          "copy": [
            0
          ]
        }
      },
      {
        "input": [
          255,
          255,
          4
        ],
        "expected": {
          "view": [
            99,
            4
          ],
          "copy": [
            255,
            4
          ]
        }
      }
    ],
    "starter": "function systemViews(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemViews(daten) {\n  const bytes=Uint8Array.from(daten); const view=bytes.subarray(1); const copy=bytes.slice(1); bytes[1]=99;\n  return {view:Array.from(view),copy:Array.from(copy)};\n}",
    "example": "function systemViews(daten) {\n  const bytes=Uint8Array.from(daten); const view=bytes.subarray(1); const copy=bytes.slice(1); bytes[1]=99;\n  return {view:Array.from(view),copy:Array.from(copy)};\n}\n\nconsole.log(systemViews([1, 2, 3]));",
    "preserveInput": true,
    "hints": [
      "Beide Ausschnitte vor der Änderung erzeugen."
    ],
    "explanation": "TypedArray.subarray liefert eine Ansicht auf denselben Puffer; slice kopiert die ausgewählten Werte. daten hat mindestens zwei Bytewerte. Die ursprüngliche JSON-Eingabe bleibt unverändert, nur der neu angelegte TypedArray wird geändert."
  },
  {
    "id": "js-system-endian-write",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "DataView.setUint16",
    "title": "Zwei Bytes in festgelegter Reihenfolge schreiben",
    "description": "DataView erlaubt unabhängig von der Plattform ausdrücklich festgelegte Byte-Reihenfolge.",
    "syntax": "view.setUint16(0, wert, littleEndian)",
    "parts": [
      [
        "0",
        "Byteoffset."
      ],
      [
        "littleEndian",
        "true schreibt das niederwertige Byte zuerst."
      ]
    ],
    "note": "daten ist {wert:0..65535,little:boolean}. Gib gewöhnliche Bytearrays zurück.",
    "detail": "Schreibe wert in einen Zwei-Byte-Puffer mit der vorgegebenen Endian-Reihenfolge. Gib dessen zwei Bytes zurück.",
    "task": "Schreibe wert in einen Zwei-Byte-Puffer mit der vorgegebenen Endian-Reihenfolge. Gib dessen zwei Bytes zurück. Verändere die Eingabe nicht.",
    "functionName": "systemEndianWrite",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "wert": 4660,
          "little": true
        },
        "expected": [
          52,
          18
        ]
      },
      {
        "input": {
          "wert": 4660,
          "little": false
        },
        "expected": [
          18,
          52
        ]
      },
      {
        "input": {
          "wert": 65535,
          "little": true
        },
        "expected": [
          255,
          255
        ]
      },
      {
        "input": {
          "wert": 0,
          "little": false
        },
        "expected": [
          0,
          0
        ]
      }
    ],
    "starter": "function systemEndianWrite(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemEndianWrite(daten) {\n  const buffer=new ArrayBuffer(2); new DataView(buffer).setUint16(0,daten.wert,daten.little);\n  return Array.from(new Uint8Array(buffer));\n}",
    "example": "function systemEndianWrite(daten) {\n  const buffer=new ArrayBuffer(2); new DataView(buffer).setUint16(0,daten.wert,daten.little);\n  return Array.from(new Uint8Array(buffer));\n}\n\nconsole.log(systemEndianWrite({\"wert\": 4660, \"little\": true}));",
    "preserveInput": true,
    "hints": [
      "Erst schreiben, dann die Uint8Array-Ansicht auslesen."
    ],
    "explanation": "DataView erlaubt unabhängig von der Plattform ausdrücklich festgelegte Byte-Reihenfolge. daten ist {wert:0..65535,little:boolean}. Gib gewöhnliche Bytearrays zurück."
  },
  {
    "id": "js-system-endian-read",
    "course": "js",
    "category": "Bits & Binärdaten",
    "name": "DataView.getUint16",
    "title": "Mehrbyte-Zahlen aus Dateibytes lesen",
    "description": "getUint16 liest zwei Bytes am Offset in einer ausdrücklich gewählten Reihenfolge.",
    "syntax": "view.getUint16(0, littleEndian)",
    "parts": [
      [
        "getUint16",
        "Vorzeichenlose 16-Bit-Zahl."
      ]
    ],
    "note": "daten hat {bytes:[a,b],little:boolean}; beide Bytewerte sind 0 bis 255.",
    "detail": "Lies aus daten.bytes einen unsigned 16-Bit-Wert mit daten.little zurück.",
    "task": "Lies aus daten.bytes einen unsigned 16-Bit-Wert mit daten.little zurück. Verändere die Eingabe nicht.",
    "functionName": "systemEndianRead",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "bytes": [
            52,
            18
          ],
          "little": true
        },
        "expected": 4660
      },
      {
        "input": {
          "bytes": [
            52,
            18
          ],
          "little": false
        },
        "expected": 13330
      },
      {
        "input": {
          "bytes": [
            0,
            1
          ],
          "little": false
        },
        "expected": 1
      },
      {
        "input": {
          "bytes": [
            0,
            1
          ],
          "little": true
        },
        "expected": 256
      }
    ],
    "starter": "function systemEndianRead(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemEndianRead(daten) {\n  const bytes=Uint8Array.from(daten.bytes);\n  return new DataView(bytes.buffer).getUint16(0,daten.little);\n}",
    "example": "function systemEndianRead(daten) {\n  const bytes=Uint8Array.from(daten.bytes);\n  return new DataView(bytes.buffer).getUint16(0,daten.little);\n}\n\nconsole.log(systemEndianRead({\"bytes\": [52, 18], \"little\": true}));",
    "preserveInput": true,
    "hints": [
      "Uint8Array stellt den Puffer bereit."
    ],
    "explanation": "getUint16 liest zwei Bytes am Offset in einer ausdrücklich gewählten Reihenfolge. daten hat {bytes:[a,b],little:boolean}; beide Bytewerte sind 0 bis 255."
  },
  {
    "id": "js-system-decode",
    "course": "js",
    "category": "Text & Kodierung",
    "name": "TextDecoder",
    "title": "UTF-8-Bytes wieder in Text verwandeln",
    "description": "TextDecoder dekodiert eine Bytefolge gemäß einer Kodierung.",
    "syntax": "new TextDecoder(\"utf-8\").decode(bytes)",
    "parts": [
      [
        "decode",
        "Liefert einen String."
      ]
    ],
    "note": "Die Eingabe enthält vollständige gültige UTF-8-Bytefolgen. Eine Bytezahl ist nicht grundsätzlich eine Zeichennummer.",
    "detail": "Dekodiere das Array daten mit UTF-8 und gib den Text zurück.",
    "task": "Dekodiere das Array daten mit UTF-8 und gib den Text zurück. Verändere die Eingabe nicht.",
    "functionName": "systemDecode",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          65,
          195,
          164,
          240,
          159,
          152,
          128
        ],
        "expected": "Aä😀"
      },
      {
        "input": [],
        "expected": ""
      },
      {
        "input": [
          226,
          130,
          172
        ],
        "expected": "€"
      },
      {
        "input": [
          0
        ],
        "expected": "\u0000"
      }
    ],
    "starter": "function systemDecode(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemDecode(daten) {\n  return new TextDecoder(\"utf-8\").decode(Uint8Array.from(daten));\n}",
    "example": "function systemDecode(daten) {\n  return new TextDecoder(\"utf-8\").decode(Uint8Array.from(daten));\n}\n\nconsole.log(systemDecode([65, 195, 164, 240, 159, 152, 128]));",
    "preserveInput": true,
    "hints": [
      "Erzeuge erst die Uint8Array-Ansicht."
    ],
    "explanation": "TextDecoder dekodiert eine Bytefolge gemäß einer Kodierung. Die Eingabe enthält vollständige gültige UTF-8-Bytefolgen. Eine Bytezahl ist nicht grundsätzlich eine Zeichennummer."
  },
  {
    "id": "js-system-decode-fatal",
    "course": "js",
    "category": "Text & Kodierung",
    "name": "TextDecoder / fatal",
    "title": "Kaputte UTF-8-Daten erkennen",
    "description": "Mit fatal:true wirft TextDecoder bei ungültigen Sequenzen, statt Ersatzzeichen einzusetzen.",
    "syntax": "new TextDecoder(\"utf-8\", {fatal:true})",
    "parts": [
      [
        "fatal",
        "Strenge Prüfung ungültiger Bytefolgen."
      ]
    ],
    "note": "Die Aufgabe dekodiert eine vollständige Datei in einem Aufruf; für gestückelte Streams ist stream:true relevant.",
    "detail": "Gib {ok:true,text} für gültige Bytes oder {ok:false,text:null} für ungültige UTF-8-Bytes zurück.",
    "task": "Gib {ok:true,text} für gültige Bytes oder {ok:false,text:null} für ungültige UTF-8-Bytes zurück. Verändere die Eingabe nicht.",
    "functionName": "systemDecodeFatal",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          195,
          164
        ],
        "expected": {
          "ok": true,
          "text": "ä"
        }
      },
      {
        "input": [
          195
        ],
        "expected": {
          "ok": false,
          "text": null
        }
      },
      {
        "input": [
          255
        ],
        "expected": {
          "ok": false,
          "text": null
        }
      },
      {
        "input": [],
        "expected": {
          "ok": true,
          "text": ""
        }
      }
    ],
    "starter": "function systemDecodeFatal(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemDecodeFatal(daten) {\n  try { return {ok:true,text:new TextDecoder(\"utf-8\",{fatal:true}).decode(Uint8Array.from(daten))}; }\n  catch { return {ok:false,text:null}; }\n}",
    "example": "function systemDecodeFatal(daten) {\n  try { return {ok:true,text:new TextDecoder(\"utf-8\",{fatal:true}).decode(Uint8Array.from(daten))}; }\n  catch { return {ok:false,text:null}; }\n}\n\nconsole.log(systemDecodeFatal([195, 164]));",
    "preserveInput": true,
    "hints": [
      "Den Fehler mit try/catch in ein Ergebnis umwandeln."
    ],
    "explanation": "Mit fatal:true wirft TextDecoder bei ungültigen Sequenzen, statt Ersatzzeichen einzusetzen. Die Aufgabe dekodiert eine vollständige Datei in einem Aufruf; für gestückelte Streams ist stream:true relevant."
  },
  {
    "id": "js-system-bigint",
    "course": "js",
    "category": "Zahlen & Genauigkeit",
    "name": "BigInt",
    "title": "Große Ganzzahlen exakt addieren",
    "description": "BigInt verarbeitet Ganzzahlen jenseits des sicheren Number-Bereichs ohne Rundung.",
    "syntax": "BigInt(textA) + BigInt(textB)",
    "parts": [
      [
        "BigInt",
        "Eingaben direkt aus Dezimalstrings lesen."
      ],
      [
        "toString",
        "Die Ausgabe ist wieder ein JSON-fähiger String."
      ]
    ],
    "note": "daten ist ein Paar gültiger Ganzzahlstrings. Number zuerst zu verwenden kann schon Präzision verlieren. BigInt und Number dürfen bei + nicht gemischt werden.",
    "detail": "Addiere die beiden Ganzzahlstrings in daten exakt und gib das Ergebnis als Dezimalstring zurück.",
    "task": "Addiere die beiden Ganzzahlstrings in daten exakt und gib das Ergebnis als Dezimalstring zurück. Verändere die Eingabe nicht.",
    "functionName": "systemBigint",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          "9007199254740993",
          "2"
        ],
        "expected": "9007199254740995"
      },
      {
        "input": [
          "-999999999999999999",
          "1"
        ],
        "expected": "-999999999999999998"
      },
      {
        "input": [
          "0",
          "0"
        ],
        "expected": "0"
      }
    ],
    "starter": "function systemBigint(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemBigint(daten) {\n  return (BigInt(daten[0])+BigInt(daten[1])).toString();\n}",
    "example": "function systemBigint(daten) {\n  return (BigInt(daten[0])+BigInt(daten[1])).toString();\n}\n\nconsole.log(systemBigint([\"9007199254740993\", \"2\"]));",
    "preserveInput": true,
    "hints": [
      "Keine Zwischenumwandlung in Number."
    ],
    "explanation": "BigInt verarbeitet Ganzzahlen jenseits des sicheren Number-Bereichs ohne Rundung. daten ist ein Paar gültiger Ganzzahlstrings. Number zuerst zu verwenden kann schon Präzision verlieren. BigInt und Number dürfen bei + nicht gemischt werden."
  },
  {
    "id": "js-system-bigint-width",
    "course": "js",
    "category": "Zahlen & Genauigkeit",
    "name": "BigInt.asUintN",
    "title": "Eine feste Bitbreite ausdrücklich wählen",
    "description": "asUintN reduziert eine BigInt-Ganzzahl auf einen unsigned Wert der vorgegebenen Bitbreite.",
    "syntax": "BigInt.asUintN(bits, wert)",
    "parts": [
      [
        "bits",
        "Anzahl der niederwertigen Bits."
      ]
    ],
    "note": "daten hat bits 1 bis 32 und wert als Ganzzahlstring. BigInt-Ausgaben werden hier als Dezimalstrings zurückgegeben.",
    "detail": "Gib daten.wert auf daten.bits unsigned Bits reduziert als String zurück.",
    "task": "Gib daten.wert auf daten.bits unsigned Bits reduziert als String zurück. Verändere die Eingabe nicht.",
    "functionName": "systemBigintWidth",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "bits": 8,
          "wert": "256"
        },
        "expected": "0"
      },
      {
        "input": {
          "bits": 8,
          "wert": "-1"
        },
        "expected": "255"
      },
      {
        "input": {
          "bits": 16,
          "wert": "65537"
        },
        "expected": "1"
      },
      {
        "input": {
          "bits": 1,
          "wert": "2"
        },
        "expected": "0"
      }
    ],
    "starter": "function systemBigintWidth(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemBigintWidth(daten) {\n  return BigInt.asUintN(daten.bits,BigInt(daten.wert)).toString();\n}",
    "example": "function systemBigintWidth(daten) {\n  return BigInt.asUintN(daten.bits,BigInt(daten.wert)).toString();\n}\n\nconsole.log(systemBigintWidth({\"bits\": 8, \"wert\": \"256\"}));",
    "preserveInput": true,
    "hints": [
      "BigInt.asUintN liefert wieder BigInt."
    ],
    "explanation": "asUintN reduziert eine BigInt-Ganzzahl auf einen unsigned Wert der vorgegebenen Bitbreite. daten hat bits 1 bis 32 und wert als Ganzzahlstring. BigInt-Ausgaben werden hier als Dezimalstrings zurückgegeben."
  },
  {
    "id": "js-system-safe-integer",
    "course": "js",
    "category": "Zahlen & Genauigkeit",
    "name": "MAX_SAFE_INTEGER",
    "title": "Große Integer vor einer Number-Umwandlung prüfen",
    "description": "Nur ein begrenzter Ganzzahlbereich ist für Number allgemein exakt und eindeutig darstellbar.",
    "syntax": "Number.MAX_SAFE_INTEGER",
    "parts": [
      [
        "Sicher",
        "Bereich −(2^53−1) bis +(2^53−1)."
      ]
    ],
    "note": "daten ist ein gültiger Dezimal-Ganzzahlstring. Auch manche größere Integer sind darstellbar, gelten aber nicht allgemein als sicher.",
    "detail": "Gib true zurück, wenn der exakte Eingabewert im sicheren Number-Integerbereich liegt.",
    "task": "Gib true zurück, wenn der exakte Eingabewert im sicheren Number-Integerbereich liegt. Verändere die Eingabe nicht.",
    "functionName": "systemSafeInteger",
    "parameter": "daten",
    "tests": [
      {
        "input": "9007199254740991",
        "expected": true
      },
      {
        "input": "9007199254740992",
        "expected": false
      },
      {
        "input": "-9007199254740992",
        "expected": false
      },
      {
        "input": "0",
        "expected": true
      }
    ],
    "starter": "function systemSafeInteger(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemSafeInteger(daten) {\n  const n=BigInt(daten); const limit=BigInt(Number.MAX_SAFE_INTEGER);\n  return n>=-limit && n<=limit;\n}",
    "example": "function systemSafeInteger(daten) {\n  const n=BigInt(daten); const limit=BigInt(Number.MAX_SAFE_INTEGER);\n  return n>=-limit && n<=limit;\n}\n\nconsole.log(systemSafeInteger(\"9007199254740991\"));",
    "preserveInput": true,
    "hints": [
      "Zuerst exakt als BigInt prüfen."
    ],
    "explanation": "Nur ein begrenzter Ganzzahlbereich ist für Number allgemein exakt und eindeutig darstellbar. daten ist ein gültiger Dezimal-Ganzzahlstring. Auch manche größere Integer sind darstellbar, gelten aber nicht allgemein als sicher."
  },
  {
    "id": "js-system-float-tolerance",
    "course": "js",
    "category": "Zahlen & Genauigkeit",
    "name": "Math.abs / Toleranz",
    "title": "Gleitkommawerte mit passender Toleranz vergleichen",
    "description": "Ein Vergleich mit Toleranz kann kleine Rundungsabweichungen akzeptieren.",
    "syntax": "Math.abs(a - b) <= toleranz",
    "parts": [
      [
        "toleranz",
        "Hier ausdrücklich vorgegebene absolute Fehlerschranke."
      ]
    ],
    "note": "daten enthält endliche Zahlen und toleranz>=0. Die passende absolute/relative Toleranz hängt von der Aufgabe ab; Number.EPSILON ist nicht universell.",
    "detail": "Gib für {a,b,toleranz} zurück, ob der absolute Abstand höchstens toleranz ist.",
    "task": "Gib für {a,b,toleranz} zurück, ob der absolute Abstand höchstens toleranz ist. Verändere die Eingabe nicht.",
    "functionName": "systemFloatTolerance",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "a": 0.30000000000000004,
          "b": 0.3,
          "toleranz": 1e-12
        },
        "expected": true
      },
      {
        "input": {
          "a": 1,
          "b": 1.1,
          "toleranz": 0.01
        },
        "expected": false
      },
      {
        "input": {
          "a": 0,
          "b": 0,
          "toleranz": 0
        },
        "expected": true
      },
      {
        "input": {
          "a": -5,
          "b": -4,
          "toleranz": 1
        },
        "expected": true
      }
    ],
    "starter": "function systemFloatTolerance(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemFloatTolerance(daten) {\n  return Math.abs(daten.a-daten.b)<=daten.toleranz;\n}",
    "example": "function systemFloatTolerance(daten) {\n  return Math.abs(daten.a-daten.b)<=daten.toleranz;\n}\n\nconsole.log(systemFloatTolerance({\"a\": 0.30000000000000004, \"b\": 0.3, \"toleranz\": 1e-12}));",
    "preserveInput": true,
    "hints": [
      "Grenzfall mit <= einschließen."
    ],
    "explanation": "Ein Vergleich mit Toleranz kann kleine Rundungsabweichungen akzeptieren. daten enthält endliche Zahlen und toleranz>=0. Die passende absolute/relative Toleranz hängt von der Aufgabe ab; Number.EPSILON ist nicht universell."
  },
  {
    "id": "js-system-deep-copy",
    "course": "js",
    "category": "Speicher & Referenzen",
    "name": "structuredClone",
    "title": "Verschachtelte Daten unabhängig kopieren",
    "description": "structuredClone kopiert unterstützte Strukturen einschließlich verschachtelter Objekte.",
    "syntax": "const kopie = structuredClone(original)",
    "parts": [
      [
        "Kopie",
        "Änderungen der kopierten Unterstruktur treffen nicht das Original."
      ]
    ],
    "note": "daten ist {profil:{punkte:number}}. Funktionen sind nicht structured-clone-fähig; JSON-Konvertierung ist kein allgemeiner gleichwertiger Ersatz.",
    "detail": "Erzeuge eine tiefe Kopie, erhöhe darin profil.punkte um 1 und gib die Kopie zurück.",
    "task": "Erzeuge eine tiefe Kopie, erhöhe darin profil.punkte um 1 und gib die Kopie zurück. Verändere die Eingabe nicht.",
    "functionName": "systemDeepCopy",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "profil": {
            "punkte": 0
          }
        },
        "expected": {
          "profil": {
            "punkte": 1
          }
        }
      },
      {
        "input": {
          "profil": {
            "punkte": 9
          }
        },
        "expected": {
          "profil": {
            "punkte": 10
          }
        }
      },
      {
        "input": {
          "profil": {
            "punkte": -1
          }
        },
        "expected": {
          "profil": {
            "punkte": 0
          }
        }
      }
    ],
    "starter": "function systemDeepCopy(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemDeepCopy(daten) {\n  const copy=structuredClone(daten); copy.profil.punkte+=1; return copy;\n}",
    "example": "function systemDeepCopy(daten) {\n  const copy=structuredClone(daten); copy.profil.punkte+=1; return copy;\n}\n\nconsole.log(systemDeepCopy({\"profil\": {\"punkte\": 0}}));",
    "preserveInput": true,
    "hints": [
      "Ein äußerer Spread würde profil weiterhin teilen."
    ],
    "explanation": "structuredClone kopiert unterstützte Strukturen einschließlich verschachtelter Objekte. daten ist {profil:{punkte:number}}. Funktionen sind nicht structured-clone-fähig; JSON-Konvertierung ist kein allgemeiner gleichwertiger Ersatz."
  },
  {
    "id": "js-system-prototype",
    "course": "js",
    "category": "Objekte & Prototypen",
    "name": "Object.create",
    "title": "Eigene und geerbte Eigenschaften unterscheiden",
    "description": "Object.create(proto) erzeugt ein Objekt mit dem gewählten Prototyp.",
    "syntax": "const obj = Object.create(proto)",
    "parts": [
      [
        "Prototyp",
        "Fallback beim Lesen einer fehlenden eigenen Eigenschaft."
      ]
    ],
    "note": "daten ist {basis,eigen}. Die Übung erstellt ein frisches Objekt; sie ändert keine globalen Prototypen.",
    "detail": "Erzeuge proto={wert:basis}, obj=Object.create(proto), setze obj.extra=eigen. Gib {wert:obj.wert,eigeneKeys:Object.keys(obj),hatWert:Object.hasOwn(obj,\"wert\")} zurück.",
    "task": "Erzeuge proto={wert:basis}, obj=Object.create(proto), setze obj.extra=eigen. Gib {wert:obj.wert,eigeneKeys:Object.keys(obj),hatWert:Object.hasOwn(obj,\"wert\")} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemPrototype",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "basis": 5,
          "eigen": 9
        },
        "expected": {
          "wert": 5,
          "eigeneKeys": [
            "extra"
          ],
          "hatWert": false
        }
      },
      {
        "input": {
          "basis": 0,
          "eigen": 0
        },
        "expected": {
          "wert": 0,
          "eigeneKeys": [
            "extra"
          ],
          "hatWert": false
        }
      },
      {
        "input": {
          "basis": "x",
          "eigen": null
        },
        "expected": {
          "wert": "x",
          "eigeneKeys": [
            "extra"
          ],
          "hatWert": false
        }
      }
    ],
    "starter": "function systemPrototype(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemPrototype(daten) {\n  const obj=Object.create({wert:daten.basis}); obj.extra=daten.eigen;\n  return {wert:obj.wert,eigeneKeys:Object.keys(obj),hatWert:Object.hasOwn(obj,\"wert\")};\n}",
    "example": "function systemPrototype(daten) {\n  const obj=Object.create({wert:daten.basis}); obj.extra=daten.eigen;\n  return {wert:obj.wert,eigeneKeys:Object.keys(obj),hatWert:Object.hasOwn(obj,\"wert\")};\n}\n\nconsole.log(systemPrototype({\"basis\": 5, \"eigen\": 9}));",
    "preserveInput": true,
    "hints": [
      "Object.keys sammelt eigene enumerable Keys."
    ],
    "explanation": "Object.create(proto) erzeugt ein Objekt mit dem gewählten Prototyp. daten ist {basis,eigen}. Die Übung erstellt ein frisches Objekt; sie ändert keine globalen Prototypen."
  },
  {
    "id": "js-system-own",
    "course": "js",
    "category": "Objekte & Prototypen",
    "name": "Object.hasOwn",
    "title": "Eigenschaften sicher auf eigene Existenz prüfen",
    "description": "Object.hasOwn prüft eigene Eigenschaften unabhängig von deren Wert.",
    "syntax": "Object.hasOwn(obj, key)",
    "parts": [
      [
        "hasOwn",
        "Auch 0, false und null können vorhandene Werte sein."
      ]
    ],
    "note": "daten ist {obj,key}. Die Eingabe ist ein JSON-Objekt; geerbte Namen wie toString sind ohne eigenen Eintrag nicht vorhanden.",
    "detail": "Gib true zurück, wenn daten.obj einen eigenen Eintrag mit daten.key besitzt.",
    "task": "Gib true zurück, wenn daten.obj einen eigenen Eintrag mit daten.key besitzt. Verändere die Eingabe nicht.",
    "functionName": "systemOwn",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "obj": {
            "x": 0
          },
          "key": "x"
        },
        "expected": true
      },
      {
        "input": {
          "obj": {
            "x": false
          },
          "key": "x"
        },
        "expected": true
      },
      {
        "input": {
          "obj": {},
          "key": "toString"
        },
        "expected": false
      },
      {
        "input": {
          "obj": {
            "hasOwnProperty": 1
          },
          "key": "hasOwnProperty"
        },
        "expected": true
      }
    ],
    "starter": "function systemOwn(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemOwn(daten) {\n  return Object.hasOwn(daten.obj,daten.key);\n}",
    "example": "function systemOwn(daten) {\n  return Object.hasOwn(daten.obj,daten.key);\n}\n\nconsole.log(systemOwn({\"obj\": {\"x\": 0}, \"key\": \"x\"}));",
    "preserveInput": true,
    "hints": [
      "Nicht auf die Wahrheit des Werts prüfen."
    ],
    "explanation": "Object.hasOwn prüft eigene Eigenschaften unabhängig von deren Wert. daten ist {obj,key}. Die Eingabe ist ein JSON-Objekt; geerbte Namen wie toString sind ohne eigenen Eintrag nicht vorhanden."
  },
  {
    "id": "js-system-descriptor",
    "course": "js",
    "category": "Objekte & Prototypen",
    "name": "Object.defineProperty",
    "title": "Unsichtbare eigene Eigenschaften anlegen",
    "description": "Eigenschaftsdeskriptoren legen unter anderem fest, ob ein Key beim Aufzählen erscheint.",
    "syntax": "Object.defineProperty(obj,\"intern\",{value,enumerable:false})",
    "parts": [
      [
        "enumerable",
        "Bestimmt die Sichtbarkeit etwa in Object.keys."
      ]
    ],
    "note": "Die Übung setzt die Eigenschaft auf einem frisch erzeugten Objekt, nicht auf der Eingabe. Fehlende Descriptor-Flags sind standardmäßig false.",
    "detail": "Erzeuge obj={offen:daten}, ergänze intern=42 als eigene nicht-enumerable Eigenschaft. Gib {keys:Object.keys(obj),intern:obj.intern,hatIntern:Object.hasOwn(obj,\"intern\")} zurück.",
    "task": "Erzeuge obj={offen:daten}, ergänze intern=42 als eigene nicht-enumerable Eigenschaft. Gib {keys:Object.keys(obj),intern:obj.intern,hatIntern:Object.hasOwn(obj,\"intern\")} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemDescriptor",
    "parameter": "daten",
    "tests": [
      {
        "input": 0,
        "expected": {
          "keys": [
            "offen"
          ],
          "intern": 42,
          "hatIntern": true
        }
      },
      {
        "input": "x",
        "expected": {
          "keys": [
            "offen"
          ],
          "intern": 42,
          "hatIntern": true
        }
      },
      {
        "input": null,
        "expected": {
          "keys": [
            "offen"
          ],
          "intern": 42,
          "hatIntern": true
        }
      }
    ],
    "starter": "function systemDescriptor(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemDescriptor(daten) {\n  const obj={offen:daten}; Object.defineProperty(obj,\"intern\",{value:42,enumerable:false});\n  return {keys:Object.keys(obj),intern:obj.intern,hatIntern:Object.hasOwn(obj,\"intern\")};\n}",
    "example": "function systemDescriptor(daten) {\n  const obj={offen:daten}; Object.defineProperty(obj,\"intern\",{value:42,enumerable:false});\n  return {keys:Object.keys(obj),intern:obj.intern,hatIntern:Object.hasOwn(obj,\"intern\")};\n}\n\nconsole.log(systemDescriptor(0));",
    "preserveInput": true,
    "hints": [
      "Nicht-enumerable bedeutet nicht unlesbar oder geheim."
    ],
    "explanation": "Eigenschaftsdeskriptoren legen unter anderem fest, ob ein Key beim Aufzählen erscheint. Die Übung setzt die Eigenschaft auf einem frisch erzeugten Objekt, nicht auf der Eingabe. Fehlende Descriptor-Flags sind standardmäßig false."
  },
  {
    "id": "js-system-freeze",
    "course": "js",
    "category": "Speicher & Referenzen",
    "name": "Object.freeze",
    "title": "Einfrieren ist zunächst nur flach",
    "description": "Object.freeze verhindert Änderungen an eigenen Eigenschaften eines Objekts; enthaltene Objekte werden nicht automatisch eingefroren.",
    "syntax": "Object.freeze(obj)",
    "parts": [
      [
        "Flach",
        "Unterobjekte bleiben ohne weitere Maßnahmen veränderbar."
      ]
    ],
    "note": "daten ist {punkte:number}. Die Aufgabe arbeitet auf einem neuen Objekt und prüft den Freeze-Status ohne Schreibversuch auf eingefrorene eigene Felder.",
    "detail": "Erzeuge obj={profil:{punkte:daten.punkte}}, friere obj ein, erhöhe obj.profil.punkte. Gib {aussen:Object.isFrozen(obj),innen:Object.isFrozen(obj.profil),punkte:obj.profil.punkte} zurück.",
    "task": "Erzeuge obj={profil:{punkte:daten.punkte}}, friere obj ein, erhöhe obj.profil.punkte. Gib {aussen:Object.isFrozen(obj),innen:Object.isFrozen(obj.profil),punkte:obj.profil.punkte} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemFreeze",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "punkte": 0
        },
        "expected": {
          "aussen": true,
          "innen": false,
          "punkte": 1
        }
      },
      {
        "input": {
          "punkte": 5
        },
        "expected": {
          "aussen": true,
          "innen": false,
          "punkte": 6
        }
      },
      {
        "input": {
          "punkte": -1
        },
        "expected": {
          "aussen": true,
          "innen": false,
          "punkte": 0
        }
      }
    ],
    "starter": "function systemFreeze(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemFreeze(daten) {\n  const obj={profil:{punkte:daten.punkte}}; Object.freeze(obj); obj.profil.punkte++;\n  return {aussen:Object.isFrozen(obj),innen:Object.isFrozen(obj.profil),punkte:obj.profil.punkte};\n}",
    "example": "function systemFreeze(daten) {\n  const obj={profil:{punkte:daten.punkte}}; Object.freeze(obj); obj.profil.punkte++;\n  return {aussen:Object.isFrozen(obj),innen:Object.isFrozen(obj.profil),punkte:obj.profil.punkte};\n}\n\nconsole.log(systemFreeze({\"punkte\": 0}));",
    "preserveInput": true,
    "hints": [
      "Nur das äußere Objekt einfrieren."
    ],
    "explanation": "Object.freeze verhindert Änderungen an eigenen Eigenschaften eines Objekts; enthaltene Objekte werden nicht automatisch eingefroren. daten ist {punkte:number}. Die Aufgabe arbeitet auf einem neuen Objekt und prüft den Freeze-Status ohne Schreibversuch auf eingefrorene eigene Felder."
  },
  {
    "id": "js-system-microtasks",
    "course": "js",
    "category": "Ausführungsmodell",
    "name": "queueMicrotask",
    "title": "Synchroner Code läuft vor Microtasks weiter",
    "description": "queueMicrotask plant Arbeit nach dem aktuellen synchronen Ablauf innerhalb des Microtask-Checkpoints.",
    "syntax": "queueMicrotask(() => logs.push(\"micro\"))",
    "parts": [
      [
        "Microtask",
        "Läuft nicht mitten in deinem synchronen Funktionscode."
      ]
    ],
    "note": "Die Übung erzeugt keine Timer. Sie wartet auf eine ausdrücklich eingereihte Abschluss-Microtask, damit die Rückgabe stabil ist.",
    "detail": "daten ist ein String. Sammle zuerst start, plane eine Microtask mit daten, füge synchron ende hinzu und warte auf die geplante Microtask. Gib die Reihenfolge zurück.",
    "task": "daten ist ein String. Sammle zuerst start, plane eine Microtask mit daten, füge synchron ende hinzu und warte auf die geplante Microtask. Gib die Reihenfolge zurück. Verändere die Eingabe nicht.",
    "functionName": "systemMicrotasks",
    "parameter": "daten",
    "tests": [
      {
        "input": "micro",
        "expected": [
          "start",
          "ende",
          "micro"
        ]
      },
      {
        "input": "x",
        "expected": [
          "start",
          "ende",
          "x"
        ]
      },
      {
        "input": "",
        "expected": [
          "start",
          "ende",
          ""
        ]
      }
    ],
    "starter": "function systemMicrotasks(daten) {\n  // Deine Lösung\n}",
    "solution": "async function systemMicrotasks(daten) {\n  const logs=[\"start\"]; queueMicrotask(()=>logs.push(daten)); logs.push(\"ende\");\n  await new Promise(resolve=>queueMicrotask(resolve)); return logs;\n}",
    "example": "async function systemMicrotasks(daten) {\n  const logs=[\"start\"]; queueMicrotask(()=>logs.push(daten)); logs.push(\"ende\");\n  await new Promise(resolve=>queueMicrotask(resolve)); return logs;\n}\n\nsystemMicrotasks(\"micro\").then(console.log);",
    "preserveInput": true,
    "hints": [
      "Die Funktion muss async sein.",
      "Der synchrone Eintrag ende entsteht vor dem Microtask-Eintrag."
    ],
    "explanation": "queueMicrotask plant Arbeit nach dem aktuellen synchronen Ablauf innerhalb des Microtask-Checkpoints. Die Übung erzeugt keine Timer. Sie wartet auf eine ausdrücklich eingereihte Abschluss-Microtask, damit die Rückgabe stabil ist."
  },
  {
    "id": "js-system-promise-order",
    "course": "js",
    "category": "Ausführungsmodell",
    "name": "Promise.then / await",
    "title": "Promise-Reaktionen werden als Microtasks ausgeführt",
    "description": "then auf einem bereits erfüllten Promise ruft den Callback trotzdem nicht sofort synchron auf.",
    "syntax": "Promise.resolve(wert).then(callback)",
    "parts": [
      [
        "then",
        "Plant eine Reaktion."
      ],
      [
        "await",
        "Setzt die async-Funktion später fort."
      ]
    ],
    "note": "Die Aufgabe beschreibt die Reihenfolge dieser einen Funktion; sie setzt keine universelle Reihenfolge sämtlicher Browser- oder Node-Queues voraus.",
    "detail": "Starte logs mit A. Plane Promise.resolve(daten).then, dessen Callback daten einträgt. Trage synchron B ein, warte auf das Reaktions-Promise und trage C ein. Gib logs zurück.",
    "task": "Starte logs mit A. Plane Promise.resolve(daten).then, dessen Callback daten einträgt. Trage synchron B ein, warte auf das Reaktions-Promise und trage C ein. Gib logs zurück. Verändere die Eingabe nicht.",
    "functionName": "systemPromiseOrder",
    "parameter": "daten",
    "tests": [
      {
        "input": "X",
        "expected": [
          "A",
          "B",
          "X",
          "C"
        ]
      },
      {
        "input": 0,
        "expected": [
          "A",
          "B",
          0,
          "C"
        ]
      },
      {
        "input": false,
        "expected": [
          "A",
          "B",
          false,
          "C"
        ]
      }
    ],
    "starter": "function systemPromiseOrder(daten) {\n  // Deine Lösung\n}",
    "solution": "async function systemPromiseOrder(daten) {\n  const logs=[\"A\"]; const pending=Promise.resolve(daten).then(value=>logs.push(value)); logs.push(\"B\"); await pending; logs.push(\"C\"); return logs;\n}",
    "example": "async function systemPromiseOrder(daten) {\n  const logs=[\"A\"]; const pending=Promise.resolve(daten).then(value=>logs.push(value)); logs.push(\"B\"); await pending; logs.push(\"C\"); return logs;\n}\n\nsystemPromiseOrder(\"X\").then(console.log);",
    "preserveInput": true,
    "hints": [
      "Speichere das von then gelieferte Promise und warte darauf."
    ],
    "explanation": "then auf einem bereits erfüllten Promise ruft den Callback trotzdem nicht sofort synchron auf. Die Aufgabe beschreibt die Reihenfolge dieser einen Funktion; sie setzt keine universelle Reihenfolge sämtlicher Browser- oder Node-Queues voraus."
  },
  {
    "id": "js-system-async-error",
    "course": "js",
    "category": "Ausführungsmodell",
    "name": "async / throw",
    "title": "Ein throw in async wird zum abgelehnten Promise",
    "description": "Eine async-Funktion liefert immer ein Promise. Ein geworfener Fehler lehnt dieses Promise ab.",
    "syntax": "try { await arbeit(); } catch (error) { ... }",
    "parts": [
      [
        "await",
        "Macht die Ablehnung im try/catch behandelbar."
      ]
    ],
    "note": "daten ist boolean. Die lokale async-Funktion wirft Error(\"kaputt\") bei false und liefert 7 bei true.",
    "detail": "Rufe die lokale async-Funktion auf und gib {ok:true,wert:7} oder {ok:false,fehler:\"kaputt\"} zurück.",
    "task": "Rufe die lokale async-Funktion auf und gib {ok:true,wert:7} oder {ok:false,fehler:\"kaputt\"} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemAsyncError",
    "parameter": "daten",
    "tests": [
      {
        "input": true,
        "expected": {
          "ok": true,
          "wert": 7
        }
      },
      {
        "input": false,
        "expected": {
          "ok": false,
          "fehler": "kaputt"
        }
      }
    ],
    "starter": "function systemAsyncError(daten) {\n  // Deine Lösung\n}",
    "solution": "async function systemAsyncError(daten) {\n  async function arbeit(){if(!daten)throw new Error(\"kaputt\"); return 7;}\n  try{return {ok:true,wert:await arbeit()};}catch(error){return {ok:false,fehler:error.message};}\n}",
    "example": "async function systemAsyncError(daten) {\n  async function arbeit(){if(!daten)throw new Error(\"kaputt\"); return 7;}\n  try{return {ok:true,wert:await arbeit()};}catch(error){return {ok:false,fehler:error.message};}\n}\n\nsystemAsyncError(true).then(console.log);",
    "preserveInput": true,
    "hints": [
      "Ohne await wird die Promise-Ablehnung nicht vom umgebenden synchronen catch behandelt."
    ],
    "explanation": "Eine async-Funktion liefert immer ein Promise. Ein geworfener Fehler lehnt dieses Promise ab. daten ist boolean. Die lokale async-Funktion wirft Error(\"kaputt\") bei false und liefert 7 bei true."
  },
  {
    "id": "js-system-weakmap",
    "course": "js",
    "category": "Speicher & Referenzen",
    "name": "WeakMap",
    "title": "Metadaten an Objekte binden",
    "description": "WeakMap speichert Werte zu Objektschlüsseln, ohne allein durch den Schlüsseleintrag dessen Lebensdauer festzuhalten.",
    "syntax": "metadata.set(obj, wert); metadata.get(obj)",
    "parts": [
      [
        "Objektschlüssel",
        "Hier sind Schlüssel frisch erzeugte Objekte."
      ]
    ],
    "note": "Der tatsächliche GC-Zeitpunkt ist nicht testbar garantiert. WeakMap ist nicht aufzählbar und hat keine size-Eigenschaft; die Aufgabe prüft nur set/get/has.",
    "detail": "Erzeuge für jedes Element in daten ein neues Schlüsselobjekt und speichere dessen index in einer WeakMap. Gib die gelesenen Indizes und has für ein anderes frisches Objekt als {indizes,fremd} zurück.",
    "task": "Erzeuge für jedes Element in daten ein neues Schlüsselobjekt und speichere dessen index in einer WeakMap. Gib die gelesenen Indizes und has für ein anderes frisches Objekt als {indizes,fremd} zurück. Verändere die Eingabe nicht.",
    "functionName": "systemWeakmap",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          1,
          1
        ],
        "expected": {
          "indizes": [
            0,
            1
          ],
          "fremd": false
        }
      },
      {
        "input": [],
        "expected": {
          "indizes": [],
          "fremd": false
        }
      },
      {
        "input": [
          "x"
        ],
        "expected": {
          "indizes": [
            0
          ],
          "fremd": false
        }
      }
    ],
    "starter": "function systemWeakmap(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemWeakmap(daten) {\n  const map=new WeakMap(); const keys=daten.map((_,index)=>{const key={};map.set(key,index);return key;});\n  return {indizes:keys.map(key=>map.get(key)),fremd:map.has({})};\n}",
    "example": "function systemWeakmap(daten) {\n  const map=new WeakMap(); const keys=daten.map((_,index)=>{const key={};map.set(key,index);return key;});\n  return {indizes:keys.map(key=>map.get(key)),fremd:map.has({})};\n}\n\nconsole.log(systemWeakmap([1, 1]));",
    "preserveInput": true,
    "hints": [
      "Gleich aussehende neue Objekte sind unterschiedliche Schlüssel."
    ],
    "explanation": "WeakMap speichert Werte zu Objektschlüsseln, ohne allein durch den Schlüsseleintrag dessen Lebensdauer festzuhalten. Der tatsächliche GC-Zeitpunkt ist nicht testbar garantiert. WeakMap ist nicht aufzählbar und hat keine size-Eigenschaft; die Aufgabe prüft nur set/get/has."
  },
  {
    "id": "js-system-bounded-cache",
    "course": "js",
    "category": "Speicher & Referenzen",
    "name": "Map / LRU",
    "title": "Einen Cache bewusst begrenzen",
    "description": "Ein begrenzter LRU-Cache entfernt den am längsten nicht verwendeten Schlüssel. Map erhält Einfügereihenfolge.",
    "syntax": "map.delete(key); map.set(key,value)",
    "parts": [
      [
        "Treffer",
        "Löscht und fügt erneut ein, um die Aktualität zu markieren."
      ],
      [
        "Limit",
        "Maximale Anzahl gespeicherter Schlüssel."
      ]
    ],
    "note": "daten hat limit 0 bis 5 und zugriffe als Array von Strings. Die Ausgabe enthält Keys vom ältesten zum neuesten Zugriff, keine echten Netzwerkdaten.",
    "detail": "Verarbeite die Zugriffe in einem LRU-Key-Cache. Bei einem Treffer aktualisiere die Position. Entferne bei Überschreitung den ältesten Key. Gib verbleibende Keys zurück.",
    "task": "Verarbeite die Zugriffe in einem LRU-Key-Cache. Bei einem Treffer aktualisiere die Position. Entferne bei Überschreitung den ältesten Key. Gib verbleibende Keys zurück. Verändere die Eingabe nicht.",
    "functionName": "systemBoundedCache",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "limit": 2,
          "zugriffe": [
            "a",
            "b",
            "a",
            "c"
          ]
        },
        "expected": [
          "a",
          "c"
        ]
      },
      {
        "input": {
          "limit": 0,
          "zugriffe": [
            "a",
            "b"
          ]
        },
        "expected": []
      },
      {
        "input": {
          "limit": 2,
          "zugriffe": [
            "",
            "x",
            ""
          ]
        },
        "expected": [
          "x",
          ""
        ]
      },
      {
        "input": {
          "limit": 3,
          "zugriffe": []
        },
        "expected": []
      }
    ],
    "starter": "function systemBoundedCache(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemBoundedCache(daten) {\n  const cache=new Map(); for(const key of daten.zugriffe){cache.delete(key);cache.set(key,true);if(cache.size>daten.limit)cache.delete(cache.keys().next().value);}\n  return [...cache.keys()];\n}",
    "example": "function systemBoundedCache(daten) {\n  const cache=new Map(); for(const key of daten.zugriffe){cache.delete(key);cache.set(key,true);if(cache.size>daten.limit)cache.delete(cache.keys().next().value);}\n  return [...cache.keys()];\n}\n\nconsole.log(systemBoundedCache({\"limit\": 2, \"zugriffe\": [\"a\", \"b\", \"a\", \"c\"]}));",
    "preserveInput": true,
    "hints": [
      "Bei Treffern muss die Reihenfolge aktualisiert werden.",
      "Map.keys().next().value liefert den ältesten Key, auch wenn dieser leer ist."
    ],
    "explanation": "Ein begrenzter LRU-Cache entfernt den am längsten nicht verwendeten Schlüssel. Map erhält Einfügereihenfolge. daten hat limit 0 bis 5 und zugriffe als Array von Strings. Die Ausgabe enthält Keys vom ältesten zum neuesten Zugriff, keine echten Netzwerkdaten."
  },
  {
    "id": "js-system-rle",
    "course": "js",
    "category": "Daten & Protokolle",
    "name": "Lauflängenkodierung",
    "title": "Wiederholte Bytewerte als Läufe sammeln",
    "description": "Eine einfache verlustfreie Kodierung speichert aufeinanderfolgende gleiche Werte mit ihrer Anzahl.",
    "syntax": "[7,7,7,2] → [[7,3],[2,1]]",
    "parts": [
      [
        "Lauf",
        "Eine direkt aufeinanderfolgende Wiederholung."
      ]
    ],
    "note": "Dieses Arraymodell ist kein echtes kompaktes Dateiformat. Header und Anzahlfelder können Daten vergrößern. Die Eingabe sind Bytewerte.",
    "detail": "Gib daten als Array von [wert,anzahl]-Läufen zurück. Getrennte gleiche Werte bleiben getrennte Läufe.",
    "task": "Gib daten als Array von [wert,anzahl]-Läufen zurück. Getrennte gleiche Werte bleiben getrennte Läufe. Verändere die Eingabe nicht.",
    "functionName": "systemRle",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          7,
          7,
          7,
          2
        ],
        "expected": [
          [
            7,
            3
          ],
          [
            2,
            1
          ]
        ]
      },
      {
        "input": [
          0,
          0,
          1,
          0
        ],
        "expected": [
          [
            0,
            2
          ],
          [
            1,
            1
          ],
          [
            0,
            1
          ]
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          255
        ],
        "expected": [
          [
            255,
            1
          ]
        ]
      }
    ],
    "starter": "function systemRle(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemRle(daten) {\n  const out=[]; for(const value of daten){const last=out[out.length-1];if(last&&last[0]===value)last[1]++;else out.push([value,1]);} return out;\n}",
    "example": "function systemRle(daten) {\n  const out=[]; for(const value of daten){const last=out[out.length-1];if(last&&last[0]===value)last[1]++;else out.push([value,1]);} return out;\n}\n\nconsole.log(systemRle([7, 7, 7, 2]));",
    "preserveInput": true,
    "hints": [
      "Nur mit dem letzten Lauf vergleichen."
    ],
    "explanation": "Eine einfache verlustfreie Kodierung speichert aufeinanderfolgende gleiche Werte mit ihrer Anzahl. Dieses Arraymodell ist kein echtes kompaktes Dateiformat. Header und Anzahlfelder können Daten vergrößern. Die Eingabe sind Bytewerte."
  },
  {
    "id": "js-system-frames",
    "course": "js",
    "category": "Daten & Protokolle",
    "name": "Nachrichtenrahmen",
    "title": "Nachrichten über beliebige Text-Chunks hinweg lesen",
    "description": "Ein Stream liefert nicht automatisch ganze Anwendungsnachrichten. Ein Trennzeichen kann im einfachen Textprotokoll die Grenze bilden.",
    "syntax": "buffer += chunk; dann vollständige Zeilen entnehmen",
    "parts": [
      [
        "Rest",
        "Unvollständige letzte Nachricht für später behalten."
      ]
    ],
    "note": "daten ist ein Array von Text-Chunks. \n trennt Nachrichten; leere Nachrichten gelten. Dies ist ein Textmodell, kein UTF-8-Streamingdecoder oder vollständiger TCP-Parser.",
    "detail": "Gib {nachrichten,rest} zurück. Sammle jede mit \n abgeschlossene Nachricht ohne Trennzeichen; behalte das letzte unvollständige Stück.",
    "task": "Gib {nachrichten,rest} zurück. Sammle jede mit \n abgeschlossene Nachricht ohne Trennzeichen; behalte das letzte unvollständige Stück. Verändere die Eingabe nicht.",
    "functionName": "systemFrames",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          "ha",
          "llo\nwe",
          "lt\nrest"
        ],
        "expected": {
          "nachrichten": [
            "hallo",
            "welt"
          ],
          "rest": "rest"
        }
      },
      {
        "input": [
          "\n\n"
        ],
        "expected": {
          "nachrichten": [
            "",
            ""
          ],
          "rest": ""
        }
      },
      {
        "input": [],
        "expected": {
          "nachrichten": [],
          "rest": ""
        }
      },
      {
        "input": [
          "ohne Ende"
        ],
        "expected": {
          "nachrichten": [],
          "rest": "ohne Ende"
        }
      }
    ],
    "starter": "function systemFrames(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemFrames(daten) {\n  const buffer=daten.join(\"\"); const parts=buffer.split(\"\\n\"); const rest=parts.pop();\n  return {nachrichten:parts,rest};\n}",
    "example": "function systemFrames(daten) {\n  const buffer=daten.join(\"\"); const parts=buffer.split(\"\\n\"); const rest=parts.pop();\n  return {nachrichten:parts,rest};\n}\n\nconsole.log(systemFrames([\"ha\", \"llo\\nwe\", \"lt\\nrest\"]));",
    "preserveInput": true,
    "hints": [
      "Das Ende ohne Trennzeichen ist noch keine vollständige Nachricht."
    ],
    "explanation": "Ein Stream liefert nicht automatisch ganze Anwendungsnachrichten. Ein Trennzeichen kann im einfachen Textprotokoll die Grenze bilden. daten ist ein Array von Text-Chunks. \n trennt Nachrichten; leere Nachrichten gelten. Dies ist ein Textmodell, kein UTF-8-Streamingdecoder oder vollständiger TCP-Parser."
  },
  {
    "id": "js-system-adder",
    "course": "js",
    "category": "Daten & Protokolle",
    "name": "Volladdierer",
    "title": "Ein Bit mit eingehendem Übertrag addieren",
    "description": "Ein Volladdierer verbindet drei Bits und liefert Summenbit plus ausgehenden Übertrag.",
    "syntax": "summe = a ^ b ^ carry",
    "parts": [
      [
        "carry",
        "Übertrag in die nächsthöhere Stelle."
      ]
    ],
    "note": "daten ist {a,b,carry}, alle Werte 0 oder 1. Die Ausgabe enthält echte Zahlenbits, keine Strings.",
    "detail": "Gib {summe,uebertrag} für die Addition der drei Eingangsbits zurück.",
    "task": "Gib {summe,uebertrag} für die Addition der drei Eingangsbits zurück. Verändere die Eingabe nicht.",
    "functionName": "systemAdder",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "a": 0,
          "b": 0,
          "carry": 0
        },
        "expected": {
          "summe": 0,
          "uebertrag": 0
        }
      },
      {
        "input": {
          "a": 1,
          "b": 0,
          "carry": 1
        },
        "expected": {
          "summe": 0,
          "uebertrag": 1
        }
      },
      {
        "input": {
          "a": 1,
          "b": 1,
          "carry": 1
        },
        "expected": {
          "summe": 1,
          "uebertrag": 1
        }
      },
      {
        "input": {
          "a": 0,
          "b": 1,
          "carry": 0
        },
        "expected": {
          "summe": 1,
          "uebertrag": 0
        }
      }
    ],
    "starter": "function systemAdder(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemAdder(daten) {\n  return {summe:daten.a^daten.b^daten.carry,uebertrag:(daten.a&daten.b)|((daten.a^daten.b)&daten.carry)};\n}",
    "example": "function systemAdder(daten) {\n  return {summe:daten.a^daten.b^daten.carry,uebertrag:(daten.a&daten.b)|((daten.a^daten.b)&daten.carry)};\n}\n\nconsole.log(systemAdder({\"a\": 0, \"b\": 0, \"carry\": 0}));",
    "preserveInput": true,
    "hints": [
      "XOR liefert die Summe.",
      "Der Übertrag entsteht, wenn mindestens zwei Eingänge 1 sind."
    ],
    "explanation": "Ein Volladdierer verbindet drei Bits und liefert Summenbit plus ausgehenden Übertrag. daten ist {a,b,carry}, alle Werte 0 oder 1. Die Ausgabe enthält echte Zahlenbits, keine Strings."
  },
  {
    "id": "js-system-cpu-step",
    "course": "js",
    "category": "Daten & Protokolle",
    "name": "Lern-CPU",
    "title": "Einen Maschinenbefehl als Zustandsänderung modellieren",
    "description": "Ein CPU-Schritt liest einen Befehl und erzeugt einen neuen Zustand. Ein Modell hilft, Register und Programmzähler zu verstehen.",
    "syntax": "{pc,register} → Befehl → neuer Zustand",
    "parts": [
      [
        "SET",
        "Setzt das Register."
      ],
      [
        "ADD",
        "Addiert modulo 256."
      ],
      [
        "JZ",
        "Springt nur bei Register 0."
      ]
    ],
    "note": "daten hat {zustand:{pc,register},befehl:{op,wert}}. Erlaubt sind SET, ADD und JZ, Register und SET/ADD-Werte sind Bytes, Sprungziele nichtnegativ. Dies ist eine erfundene Lernarchitektur.",
    "detail": "Gib den Folgezustand {pc,register} zurück. SET/ADD erhöhen pc um 1; JZ setzt pc bei register=0 auf wert, sonst auf pc+1. ADD läuft modulo 256.",
    "task": "Gib den Folgezustand {pc,register} zurück. SET/ADD erhöhen pc um 1; JZ setzt pc bei register=0 auf wert, sonst auf pc+1. ADD läuft modulo 256. Verändere die Eingabe nicht.",
    "functionName": "systemCpuStep",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "zustand": {
            "pc": 0,
            "register": 8
          },
          "befehl": {
            "op": "SET",
            "wert": 0
          }
        },
        "expected": {
          "pc": 1,
          "register": 0
        }
      },
      {
        "input": {
          "zustand": {
            "pc": 1,
            "register": 255
          },
          "befehl": {
            "op": "ADD",
            "wert": 1
          }
        },
        "expected": {
          "pc": 2,
          "register": 0
        }
      },
      {
        "input": {
          "zustand": {
            "pc": 2,
            "register": 0
          },
          "befehl": {
            "op": "JZ",
            "wert": 0
          }
        },
        "expected": {
          "pc": 0,
          "register": 0
        }
      },
      {
        "input": {
          "zustand": {
            "pc": 2,
            "register": 1
          },
          "befehl": {
            "op": "JZ",
            "wert": 0
          }
        },
        "expected": {
          "pc": 3,
          "register": 1
        }
      }
    ],
    "starter": "function systemCpuStep(daten) {\n  // Deine Lösung\n}",
    "solution": "function systemCpuStep(daten) {\n  const {pc,register}=daten.zustand; const {op,wert}=daten.befehl;\n  if(op===\"SET\")return {pc:pc+1,register:wert};\n  if(op===\"ADD\")return {pc:pc+1,register:(register+wert)&255};\n  return {pc:register===0?wert:pc+1,register};\n}",
    "example": "function systemCpuStep(daten) {\n  const {pc,register}=daten.zustand; const {op,wert}=daten.befehl;\n  if(op===\"SET\")return {pc:pc+1,register:wert};\n  if(op===\"ADD\")return {pc:pc+1,register:(register+wert)&255};\n  return {pc:register===0?wert:pc+1,register};\n}\n\nconsole.log(systemCpuStep({\"zustand\": {\"pc\": 0, \"register\": 8}, \"befehl\": {\"op\": \"SET\", \"wert\": 0}}));",
    "preserveInput": true,
    "hints": [
      "Ausgangszustand nicht ändern.",
      "Prüfe das Register explizit auf 0."
    ],
    "explanation": "Ein CPU-Schritt liest einen Befehl und erzeugt einen neuen Zustand. Ein Modell hilft, Register und Programmzähler zu verstehen. daten hat {zustand:{pc,register},befehl:{op,wert}}. Erlaubt sind SET, ADD und JZ, Register und SET/ADD-Werte sind Bytes, Sprungziele nichtnegativ. Dies ist eine erfundene Lernarchitektur."
  }
];
