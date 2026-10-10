export const utilityLessons = [
  {
    "id": "js-math-round",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "round / floor / ceil / trunc",
    "title": "Vier Arten des Rundens unterscheiden",
    "description": "round wählt die nächste ganze Zahl, floor geht Richtung minus unendlich, ceil Richtung plus unendlich und trunc entfernt die Nachkommastellen.",
    "syntax": "Math.floor(-1.8); // -2\nMath.trunc(-1.8); // -1",
    "parts": [
      [
        "round",
        "Bei einem Gleichstand entscheidet die Richtung plus unendlich."
      ],
      [
        "floor / ceil",
        "Gehen immer abwärts beziehungsweise aufwärts."
      ],
      [
        "trunc",
        "Geht Richtung 0, unabhängig vom Vorzeichen."
      ]
    ],
    "note": "Math.round(-1.5) ergibt -1. floor ist bei negativen Zahlen kein Abschneiden. JavaScript kann auch -0 erzeugen; in dieser Aufgabe wird es wie 0 bewertet.",
    "detail": "daten ist eine endliche Zahl. Gib {round, floor, ceil, trunc} mit den vier ganzzahligen Ergebnissen zurück.",
    "functionName": "rundungsArten",
    "parameter": "daten",
    "task": "daten ist eine endliche Zahl. Gib {round, floor, ceil, trunc} mit den vier ganzzahligen Ergebnissen zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": 1.8,
        "expected": {
          "round": 2,
          "floor": 1,
          "ceil": 2,
          "trunc": 1
        }
      },
      {
        "input": -1.8,
        "expected": {
          "round": -2,
          "floor": -2,
          "ceil": -1,
          "trunc": -1
        }
      },
      {
        "input": -1.5,
        "expected": {
          "round": -1,
          "floor": -2,
          "ceil": -1,
          "trunc": -1
        }
      },
      {
        "input": 2,
        "expected": {
          "round": 2,
          "floor": 2,
          "ceil": 2,
          "trunc": 2
        }
      },
      {
        "input": 0,
        "expected": {
          "round": 0,
          "floor": 0,
          "ceil": 0,
          "trunc": 0
        }
      }
    ],
    "hints": [
      "Rufe jede Math-Methode mit derselben Zahl auf.",
      "Gib ein Objekt mit genau den vier genannten Schlüsseln zurück."
    ],
    "solution": "function rundungsArten(daten) {\n  return { round: Math.round(daten), floor: Math.floor(daten), ceil: Math.ceil(daten), trunc: Math.trunc(daten) };\n}",
    "explanation": "Bei -1.8 ist die kleinere ganze Zahl -2, die größere -1. trunc liefert -1, weil nur die Nachkommastellen entfernt werden. Das ist etwa beim Einteilen negativer Koordinaten wichtig.",
    "preserveInput": true,
    "starter": "function rundungsArten(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function rundungsArten(daten) {\n  return { round: Math.round(daten), floor: Math.floor(daten), ceil: Math.ceil(daten), trunc: Math.trunc(daten) };\n}\n\nconsole.log(rundungsArten(1.8));\nconsole.log(rundungsArten(-1.8));"
  },
  {
    "id": "js-math-abs",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Math.abs",
    "title": "Abstände ohne negatives Vorzeichen berechnen",
    "description": "Math.abs liefert den Betrag einer Zahl. Die Entfernung zwischen zwei Positionen hängt nicht davon ab, welche Position zuerst genannt wird.",
    "syntax": "Math.abs(ziel - start)",
    "parts": [
      [
        "ziel - start",
        "Die Differenz kann positiv oder negativ sein."
      ],
      [
        "Math.abs",
        "Entfernt das negative Vorzeichen."
      ]
    ],
    "note": "Betrag ist kein Runden. Auch Dezimalabstände bleiben erhalten.",
    "detail": "daten enthält endliche Zahlen start und ziel mit einem endlichen Abstand. Gib den nichtnegativen Abstand zurück.",
    "functionName": "abstand",
    "parameter": "daten",
    "task": "daten enthält endliche Zahlen start und ziel mit einem endlichen Abstand. Gib den nichtnegativen Abstand zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "start": 3,
          "ziel": 10
        },
        "expected": 7
      },
      {
        "input": {
          "start": 10,
          "ziel": 3
        },
        "expected": 7
      },
      {
        "input": {
          "start": -4,
          "ziel": 2
        },
        "expected": 6
      },
      {
        "input": {
          "start": 2.5,
          "ziel": 2
        },
        "expected": 0.5
      },
      {
        "input": {
          "start": 0,
          "ziel": 0
        },
        "expected": 0
      }
    ],
    "hints": [
      "Berechne zuerst ziel minus start.",
      "Wende Math.abs auf die Differenz an."
    ],
    "solution": "function abstand(daten) {\n  return Math.abs(daten.ziel - daten.start);\n}",
    "explanation": "Ein Spielfigur-Abstand von 7 bleibt 7, egal ob die Figur nach links oder rechts läuft. Math.abs ändert allein das Vorzeichen einer negativen Differenz.",
    "preserveInput": true,
    "starter": "function abstand(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function abstand(daten) {\n  return Math.abs(daten.ziel - daten.start);\n}\n\nconsole.log(abstand({\"start\": 3, \"ziel\": 10}));\nconsole.log(abstand({\"start\": 10, \"ziel\": 3}));"
  },
  {
    "id": "js-math-minmax",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Math.min / Math.max",
    "title": "Den kleinsten und größten Messwert finden",
    "description": "Math.min und Math.max erwarten einzelne Zahlen. Spread macht aus einem Array einzelne Argumente.",
    "syntax": "Math.min(...zahlen)\nMath.max(...zahlen)",
    "parts": [
      [
        "...zahlen",
        "Verteilt Arraywerte auf die Funktionsargumente."
      ],
      [
        "[]",
        "Braucht in unserer Aufgabe einen eigenen Rückgabewert."
      ]
    ],
    "note": "Math.min() ergibt Infinity, Math.max() -Infinity. Wir geben für eine leere Liste stattdessen null zurück. Spread eignet sich für kleine Listen; sehr große Listen können die Argumentgrenze überschreiten.",
    "detail": "daten ist eine kleine dichte Liste endlicher Zahlen. Gib {min, max} zurück; bei [] gib null zurück.",
    "functionName": "extreme",
    "parameter": "daten",
    "task": "daten ist eine kleine dichte Liste endlicher Zahlen. Gib {min, max} zurück; bei [] gib null zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          4,
          1,
          9
        ],
        "expected": {
          "min": 1,
          "max": 9
        }
      },
      {
        "input": [
          -7,
          -2,
          -11
        ],
        "expected": {
          "min": -11,
          "max": -2
        }
      },
      {
        "input": [
          0
        ],
        "expected": {
          "min": 0,
          "max": 0
        }
      },
      {
        "input": [],
        "expected": null
      },
      {
        "input": [
          2.5,
          -0.5,
          2.5
        ],
        "expected": {
          "min": -0.5,
          "max": 2.5
        }
      }
    ],
    "hints": [
      "Prüfe die Länge, bevor du Spread verwendest.",
      "Baue danach ein Objekt mit min und max."
    ],
    "solution": "function extreme(daten) {\n  if (daten.length === 0) return null;\n  return { min: Math.min(...daten), max: Math.max(...daten) };\n}",
    "explanation": "Math.min(daten) übergibt ein einziges Array statt mehrerer Zahlen. Der Spread-Operator verteilt seine Elemente. Der leere Sonderfall verhindert unendliche Rückgabewerte.",
    "preserveInput": true,
    "starter": "function extreme(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function extreme(daten) {\n  if (daten.length === 0) return null;\n  return { min: Math.min(...daten), max: Math.max(...daten) };\n}\n\nconsole.log(extreme([4, 1, 9]));\nconsole.log(extreme([-7, -2, -11]));"
  },
  {
    "id": "js-math-clamp",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Werte begrenzen",
    "title": "Lebenspunkte innerhalb ihrer Grenzen halten",
    "description": "Eine Begrenzung hält einen Wert zwischen einer unteren und einer oberen Grenze. Das ist praktisch für Lebenspunkte, Lautstärke oder Fortschritt.",
    "syntax": "Math.min(max, Math.max(min, wert))",
    "parts": [
      [
        "Math.max(min, wert)",
        "Hebt zu kleine Werte auf die Untergrenze."
      ],
      [
        "Math.min(max, …)",
        "Senkt zu große Werte auf die Obergrenze."
      ]
    ],
    "note": "Die Aufgabe setzt min <= max voraus. Eine Begrenzung verändert gültige Zwischenwerte nicht und ist kein Runden.",
    "detail": "daten enthält endliche Zahlen wert, min und max mit min <= max. Gib wert begrenzt auf diesen Bereich zurück.",
    "functionName": "begrenze",
    "parameter": "daten",
    "task": "daten enthält endliche Zahlen wert, min und max mit min <= max. Gib wert begrenzt auf diesen Bereich zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "wert": -5,
          "min": 0,
          "max": 100
        },
        "expected": 0
      },
      {
        "input": {
          "wert": 130,
          "min": 0,
          "max": 100
        },
        "expected": 100
      },
      {
        "input": {
          "wert": 23.5,
          "min": 0,
          "max": 100
        },
        "expected": 23.5
      },
      {
        "input": {
          "wert": -9,
          "min": -10,
          "max": -2
        },
        "expected": -9
      },
      {
        "input": {
          "wert": 5,
          "min": 3,
          "max": 3
        },
        "expected": 3
      }
    ],
    "hints": [
      "Eine if-Kette funktioniert ebenfalls.",
      "Verschachtelte min/max-Aufrufe drücken dieselbe Regel kompakt aus."
    ],
    "solution": "function begrenze(daten) {\n  return Math.min(daten.max, Math.max(daten.min, daten.wert));\n}",
    "explanation": "Zuerst verhindert Math.max ein Unterschreiten, dann Math.min ein Überschreiten. Für Lebenspunkte kann ein Schaden dadurch niemals einen negativen Wert hinterlassen.",
    "preserveInput": true,
    "starter": "function begrenze(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function begrenze(daten) {\n  return Math.min(daten.max, Math.max(daten.min, daten.wert));\n}\n\nconsole.log(begrenze({\"wert\": -5, \"min\": 0, \"max\": 100}));\nconsole.log(begrenze({\"wert\": 130, \"min\": 0, \"max\": 100}));"
  },
  {
    "id": "js-math-hypot",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Math.hypot",
    "title": "Entfernungen auf einer Spielkarte berechnen",
    "description": "Math.hypot berechnet die Länge eines Vektors aus seinen Komponenten. In 2D sind das die horizontalen und vertikalen Differenzen.",
    "syntax": "Math.hypot(b.x - a.x, b.y - a.y)",
    "parts": [
      [
        "dx / dy",
        "Die Unterschiede zwischen den Koordinaten."
      ],
      [
        "Math.hypot",
        "Berechnet die Quadratwurzel der Quadratsumme."
      ]
    ],
    "note": "Die festen Prüffälle liefern mit Math.hypot exakte ganzzahlige Ergebnisse. Bei anderen Zahlen kann eine Rundungstoleranz nötig sein. Ein beliebiger 2D-Abstand kann eine Dezimalzahl sein.",
    "detail": "daten enthält Punkte a und b mit endlichen Koordinaten. Gib den euklidischen Abstand zurück. Die Prüffälle haben einen ganzzahligen Abstand.",
    "functionName": "kartenAbstand",
    "parameter": "daten",
    "task": "daten enthält Punkte a und b mit endlichen Koordinaten. Gib den euklidischen Abstand zurück. Die Prüffälle haben einen ganzzahligen Abstand. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": 3,
            "y": 4
          }
        },
        "expected": 5
      },
      {
        "input": {
          "a": {
            "x": 3,
            "y": 4
          },
          "b": {
            "x": 0,
            "y": 0
          }
        },
        "expected": 5
      },
      {
        "input": {
          "a": {
            "x": -2,
            "y": -3
          },
          "b": {
            "x": -2,
            "y": 4
          }
        },
        "expected": 7
      },
      {
        "input": {
          "a": {
            "x": 5,
            "y": 5
          },
          "b": {
            "x": 5,
            "y": 5
          }
        },
        "expected": 0
      },
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0
          },
          "b": {
            "x": -5,
            "y": 12
          }
        },
        "expected": 13
      }
    ],
    "hints": [
      "Bilde die Differenz jeweils für x und y.",
      "Übergebe beide Differenzen an Math.hypot."
    ],
    "solution": "function kartenAbstand(daten) {\n  return Math.hypot(daten.b.x - daten.a.x, daten.b.y - daten.a.y);\n}",
    "explanation": "Bei dx=3 und dy=4 ergibt hypot den Abstand 5. Einfach dx+dy wäre ein anderer Abstand: für Bewegungen auf einem Raster kann das sinnvoll sein, für eine direkte Luftlinie passt hypot.",
    "preserveInput": true,
    "starter": "function kartenAbstand(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function kartenAbstand(daten) {\n  return Math.hypot(daten.b.x - daten.a.x, daten.b.y - daten.a.y);\n}\n\nconsole.log(kartenAbstand({\"a\": {\"x\": 0, \"y\": 0}, \"b\": {\"x\": 3, \"y\": 4}}));\nconsole.log(kartenAbstand({\"a\": {\"x\": 3, \"y\": 4}, \"b\": {\"x\": 0, \"y\": 0}}));"
  },
  {
    "id": "js-math-dice",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Math.random / Würfel",
    "title": "Eine Zufallsprobe in einen Würfelwurf umwandeln",
    "description": "Math.random liefert eine Zahl von 0 einschließlich bis 1 ausschließlich. Durch Skalieren und floor entsteht daraus ein gleich breiter Bereich pro Würfelseite.",
    "syntax": "const probe = Math.random();\nconst wurf = Math.floor(probe * seiten) + 1;",
    "parts": [
      [
        "probe * seiten",
        "Skaliert von [0,1) auf [0,seiten)."
      ],
      [
        "Math.floor",
        "Erzeugt eine der ganzen Zahlen 0 bis seiten-1."
      ],
      [
        "+ 1",
        "Verschiebt den Bereich auf 1 bis seiten."
      ]
    ],
    "note": "Die Prüfung übergibt feste Zufallsproben, damit Ergebnisse reproduzierbar sind. Im echten Aufruf stammt zufall aus Math.random(). Math.random eignet sich nicht für Sicherheitscodes.",
    "detail": "daten enthält zufall mit 0 <= zufall < 1 und seiten als positive ganze Zahl. Gib den zugehörigen Würfelwurf von 1 bis seiten zurück.",
    "functionName": "wuerfel",
    "parameter": "daten",
    "task": "daten enthält zufall mit 0 <= zufall < 1 und seiten als positive ganze Zahl. Gib den zugehörigen Würfelwurf von 1 bis seiten zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "zufall": 0,
          "seiten": 6
        },
        "expected": 1
      },
      {
        "input": {
          "zufall": 0.999999,
          "seiten": 6
        },
        "expected": 6
      },
      {
        "input": {
          "zufall": 0.5,
          "seiten": 6
        },
        "expected": 4
      },
      {
        "input": {
          "zufall": 0.249,
          "seiten": 4
        },
        "expected": 1
      },
      {
        "input": {
          "zufall": 0.999,
          "seiten": 1
        },
        "expected": 1
      }
    ],
    "hints": [
      "Verwende in der geprüften Funktion daten.zufall statt eines neuen Math.random-Aufrufs.",
      "Probiere im Beispiel danach wuerfel({zufall: Math.random(), seiten: 6}) aus."
    ],
    "solution": "function wuerfel(daten) {\n  return Math.floor(daten.zufall * daten.seiten) + 1;\n}",
    "explanation": "Beim Sechserwürfel wird 0.5 zuerst zu 3, floor lässt 3 stehen und +1 ergibt 4. round wäre falsch, weil die Randbereiche dann schmaler wären als die mittleren.",
    "preserveInput": true,
    "starter": "function wuerfel(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function wuerfel(daten) {\n  return Math.floor(daten.zufall * daten.seiten) + 1;\n}\n\nconsole.log(wuerfel({\"zufall\": 0, \"seiten\": 6}));\nconsole.log(wuerfel({\"zufall\": 0.999999, \"seiten\": 6}));"
  },
  {
    "id": "js-number-finite",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Number.isFinite",
    "title": "Zahlen prüfen, ohne Strings automatisch umzuwandeln",
    "description": "Number.isFinite akzeptiert ausschließlich endliche Number-Werte. Anders als die globale isFinite-Funktion wandelt es Strings und null nicht um.",
    "syntax": "Number.isFinite(\"2\"); // false\nNumber.isFinite(2); // true",
    "parts": [
      [
        "Number.isFinite",
        "Prüft Typ und Endlichkeit zusammen."
      ],
      [
        "isFinite",
        "Die globale Funktion führt dagegen eine Umwandlung aus."
      ]
    ],
    "note": "Ein JSON-Wert kann hier Number, String, Boolean, null, Array oder Objekt sein. JSON stellt NaN und Infinity nicht als Zahlen dar.",
    "detail": "daten ist eine Liste von JSON-Werten. Gib für jeden Wert zurück, ob er bereits eine endliche Number ist.",
    "functionName": "endlicheZahlen",
    "parameter": "daten",
    "task": "daten ist eine Liste von JSON-Werten. Gib für jeden Wert zurück, ob er bereits eine endliche Number ist. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          2,
          "2",
          null,
          true,
          0
        ],
        "expected": [
          true,
          false,
          false,
          false,
          true
        ]
      },
      {
        "input": [
          [],
          {},
          "",
          -3.5
        ],
        "expected": [
          false,
          false,
          false,
          true
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          "Infinity",
          "NaN",
          "3e2"
        ],
        "expected": [
          false,
          false,
          false
        ]
      },
      {
        "input": [
          1e+100,
          -1e+100
        ],
        "expected": [
          true,
          true
        ]
      }
    ],
    "hints": [
      "map erzeugt eine Prüfaussage pro Element.",
      "Rufe Number.isFinite direkt mit dem ursprünglichen Wert auf."
    ],
    "solution": "function endlicheZahlen(daten) {\n  return daten.map(wert => Number.isFinite(wert));\n}",
    "explanation": "Ein Formular liefert oft \"2\" statt 2. Number.isFinite gibt für den String false zurück. Willst du Eingabetext umwandeln, musst du dies bewusst vor der Prüfung tun und leere Texte gesondert behandeln.",
    "preserveInput": true,
    "starter": "function endlicheZahlen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function endlicheZahlen(daten) {\n  return daten.map(wert => Number.isFinite(wert));\n}\n\nconsole.log(endlicheZahlen([2, \"2\", null, true, 0]));\nconsole.log(endlicheZahlen([[], {}, \"\", -3.5]));"
  },
  {
    "id": "js-number-integer",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Number.isInteger",
    "title": "Gültige Stückzahlen erkennen",
    "description": "Number.isInteger prüft ganze Number-Werte. Für eine Stückzahl muss zusätzlich gelten, dass sie nicht negativ ist.",
    "syntax": "Number.isInteger(menge) && menge >= 0",
    "parts": [
      [
        "Number.isInteger",
        "Gibt für 3 und 3.0 true, für \"3\" false zurück."
      ],
      [
        ">= 0",
        "Null Stück sind in dieser Aufgabe erlaubt."
      ]
    ],
    "note": "Eine ganze Number muss nicht automatisch eine sichere Ganzzahl sein. Für exakt darstellbare sehr große Zähler gibt es Number.isSafeInteger; diese Aufgabe verwendet kleine Werte.",
    "detail": "daten ist eine Liste kleiner JSON-Werte. Gib pro Wert true zurück, wenn er eine nichtnegative ganze Number ist, sonst false.",
    "functionName": "stueckzahlen",
    "parameter": "daten",
    "task": "daten ist eine Liste kleiner JSON-Werte. Gib pro Wert true zurück, wenn er eine nichtnegative ganze Number ist, sonst false. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          0,
          3,
          -1,
          2.5,
          "3"
        ],
        "expected": [
          true,
          true,
          false,
          false,
          false
        ]
      },
      {
        "input": [
          null,
          true,
          [],
          {}
        ],
        "expected": [
          false,
          false,
          false,
          false
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          3.0,
          0.1,
          -0.5
        ],
        "expected": [
          true,
          false,
          false
        ]
      },
      {
        "input": [
          1,
          2,
          20
        ],
        "expected": [
          true,
          true,
          true
        ]
      }
    ],
    "hints": [
      "Prüfe zuerst den Number-Wert mit isInteger.",
      "Verbinde die beiden Bedingungen mit &&."
    ],
    "solution": "function stueckzahlen(daten) {\n  return daten.map(wert => Number.isInteger(wert) && wert >= 0);\n}",
    "explanation": "Number.isInteger verhindert Teilstücke und falsche Typen. Das zusätzliche >=0 verhindert negative Mengen. Die Zahl 0 darf nicht durch eine Truthiness-Prüfung verloren gehen.",
    "preserveInput": true,
    "starter": "function stueckzahlen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function stueckzahlen(daten) {\n  return daten.map(wert => Number.isInteger(wert) && wert >= 0);\n}\n\nconsole.log(stueckzahlen([0, 3, -1, 2.5, \"3\"]));\nconsole.log(stueckzahlen([null, true, [], {}]));"
  },
  {
    "id": "js-number-parse-int",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Number.parseInt",
    "title": "Ganzzahlige Textpräfixe mit einer Basis lesen",
    "description": "parseInt liest ab dem Anfang ein ganzzahliges Präfix und stoppt am ersten unpassenden Zeichen. Die Basis legt fest, welche Ziffern erlaubt sind.",
    "syntax": "Number.parseInt(\"ff\", 16); // 255\nNumber.parseInt(\"12px\", 10); // 12",
    "parts": [
      [
        "radix",
        "Die Zahlenbasis; in dieser Aufgabe 2, 10 oder 16."
      ],
      [
        "Präfix",
        "Unpassender Resttext kann ignoriert werden."
      ],
      [
        "NaN",
        "Entsteht, wenn kein gültiges Präfix gelesen werden kann."
      ]
    ],
    "note": "parseInt ist keine vollständige Validierung von Formulareingaben. \"12px\" wird akzeptiert und \"1e2\" mit Basis 10 ergibt 1, nicht 100.",
    "detail": "daten enthält text als String und basis aus 2,10,16. Gib das von Number.parseInt gelesene Ergebnis zurück; normalisiere NaN zu null.",
    "functionName": "ganzzahlPraefix",
    "parameter": "daten",
    "task": "daten enthält text als String und basis aus 2,10,16. Gib das von Number.parseInt gelesene Ergebnis zurück; normalisiere NaN zu null. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "text": "12px",
          "basis": 10
        },
        "expected": 12
      },
      {
        "input": {
          "text": "ff",
          "basis": 16
        },
        "expected": 255
      },
      {
        "input": {
          "text": "1011",
          "basis": 2
        },
        "expected": 11
      },
      {
        "input": {
          "text": "  -7rest",
          "basis": 10
        },
        "expected": -7
      },
      {
        "input": {
          "text": "xyz",
          "basis": 10
        },
        "expected": null
      },
      {
        "input": {
          "text": "1e2",
          "basis": 10
        },
        "expected": 1
      }
    ],
    "hints": [
      "Gib die Basis ausdrücklich als zweiten Parameter an.",
      "Prüfe NaN mit Number.isNaN; NaN === NaN ist false."
    ],
    "solution": "function ganzzahlPraefix(daten) {\n  const wert = Number.parseInt(daten.text, daten.basis);\n  return Number.isNaN(wert) ? null : wert;\n}",
    "explanation": "Die Basis 16 erlaubt a bis f als Ziffern; ff bedeutet 15*16+15. Bei Basis 10 wird 12px zu 12. Number.isNaN erkennt gezielt das fehlende Präfix, ohne eine gültige 0 zu verwerfen.",
    "preserveInput": true,
    "starter": "function ganzzahlPraefix(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function ganzzahlPraefix(daten) {\n  const wert = Number.parseInt(daten.text, daten.basis);\n  return Number.isNaN(wert) ? null : wert;\n}\n\nconsole.log(ganzzahlPraefix({\"text\": \"12px\", \"basis\": 10}));\nconsole.log(ganzzahlPraefix({\"text\": \"ff\", \"basis\": 16}));"
  },
  {
    "id": "js-number-parse-float",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "Number.parseFloat",
    "title": "Dezimalzahlen aus CSS-ähnlichen Texten lesen",
    "description": "parseFloat liest ein dezimales Zahlpräfix einschließlich eines passenden Exponenten. Es stoppt vor Resttext wie px.",
    "syntax": "Number.parseFloat(\"12.5px\"); // 12.5\nNumber(\"12.5px\"); // NaN",
    "parts": [
      [
        "Number.parseFloat",
        "Liest ein numerisches Präfix des Strings."
      ],
      [
        "Number.isFinite",
        "Verwirft NaN und unendliche Ergebnisse."
      ]
    ],
    "note": "parseFloat verwendet einen Dezimalpunkt. Ein deutsches Komma wird nicht als Dezimaltrenner erkannt: \"1,5\" ergibt 1. Dies ist kein allgemeiner Parser für lokalisierte Zahlen.",
    "detail": "daten ist ein String. Gib sein endliches Dezimalpräfix zurück; wenn keines existiert oder es unendlich ist, gib null zurück.",
    "functionName": "dezimalPraefix",
    "parameter": "daten",
    "task": "daten ist ein String. Gib sein endliches Dezimalpräfix zurück; wenn keines existiert oder es unendlich ist, gib null zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "12.5px",
        "expected": 12.5
      },
      {
        "input": " -0.25em",
        "expected": -0.25
      },
      {
        "input": "1e2rest",
        "expected": 100
      },
      {
        "input": "px12",
        "expected": null
      },
      {
        "input": "Infinity",
        "expected": null
      },
      {
        "input": "1,5",
        "expected": 1
      },
      {
        "input": "0px",
        "expected": 0
      }
    ],
    "hints": [
      "Lies das Präfix und speichere den Rückgabewert.",
      "Benutze isFinite statt eines Truthiness-Fallbacks, damit 0 erhalten bleibt."
    ],
    "solution": "function dezimalPraefix(daten) {\n  const wert = Number.parseFloat(daten);\n  return Number.isFinite(wert) ? wert : null;\n}",
    "explanation": "Number(\"12.5px\") verwirft den ganzen Text. parseFloat liefert dagegen 12.5. Die anschließende Endlichkeitsprüfung ist wichtig, weil auch der Text Infinity von parseFloat gelesen werden kann.",
    "preserveInput": true,
    "starter": "function dezimalPraefix(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function dezimalPraefix(daten) {\n  const wert = Number.parseFloat(daten);\n  return Number.isFinite(wert) ? wert : null;\n}\n\nconsole.log(dezimalPraefix(\"12.5px\"));\nconsole.log(dezimalPraefix(\" -0.25em\"));"
  },
  {
    "id": "js-number-fixed",
    "course": "js",
    "category": "Zahlen & Math",
    "name": "toFixed",
    "title": "Cent-Beträge als festen Dezimaltext anzeigen",
    "description": "toFixed formatiert eine Number mit einer festgelegten Anzahl Nachkommastellen und gibt einen String zurück.",
    "syntax": "(cent / 100).toFixed(2)",
    "parts": [
      [
        "/ 100",
        "Wandelt Cent in Euro um."
      ],
      [
        "toFixed(2)",
        "Schreibt genau zwei Nachkommastellen."
      ],
      [
        "String",
        "Das Ergebnis dient der Anzeige."
      ]
    ],
    "note": "Rechne in dieser Aufgabe mit ganzen Cent und formatiere erst am Ende. toFixed ist kein allgemeines System für exakte Geldrechnung; Binärfließkommazahlen können beim Runden überraschen.",
    "detail": "daten ist ein ganzer Cent-Betrag zwischen -9999 und 9999. Gib den Eurobetrag als String mit zwei Nachkommastellen und einem Punkt zurück.",
    "functionName": "euroText",
    "parameter": "daten",
    "task": "daten ist ein ganzer Cent-Betrag zwischen -9999 und 9999. Gib den Eurobetrag als String mit zwei Nachkommastellen und einem Punkt zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": 105,
        "expected": "1.05"
      },
      {
        "input": 100,
        "expected": "1.00"
      },
      {
        "input": 0,
        "expected": "0.00"
      },
      {
        "input": -1,
        "expected": "-0.01"
      },
      {
        "input": 9999,
        "expected": "99.99"
      }
    ],
    "hints": [
      "Teile durch 100, bevor du formatierst.",
      "Gib den toFixed-Rückgabewert direkt zurück."
    ],
    "solution": "function euroText(daten) {\n  return (daten / 100).toFixed(2);\n}",
    "explanation": "105 Cent werden zu 1.05 Euro. toFixed macht daraus den String \"1.05\". Bei 100 Cent ist die Number 1, aber der Anzeigetext lautet \"1.00\". Der erwartete Typ ist deshalb String.",
    "preserveInput": true,
    "starter": "function euroText(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function euroText(daten) {\n  return (daten / 100).toFixed(2);\n}\n\nconsole.log(euroText(105));\nconsole.log(euroText(100));"
  },
  {
    "id": "js-array-flat",
    "course": "js",
    "category": "Arrays",
    "name": "flat",
    "title": "Eine Ebene verschachtelter Listen auflösen",
    "description": "flat erstellt ein neues Array und löst verschachtelte Arrays bis zur angegebenen Tiefe auf. Ohne Argument ist die Tiefe 1.",
    "syntax": "listen.flat(1)",
    "parts": [
      [
        "Tiefe 1",
        "Entfernt genau eine zusätzliche Array-Ebene."
      ],
      [
        "Neues Array",
        "Das ursprüngliche Array bleibt bestehen."
      ]
    ],
    "note": "flat(1) löst tiefer liegende Arrays nicht vollständig auf. Die Aufgabe verwendet dichte JSON-Arrays; flat überspringt ansonsten auch manche Array-Lücken.",
    "detail": "daten ist ein dichtes JSON-Array, das Werte und Unterarrays enthalten kann. Gib eine um genau eine Ebene abgeflachte Liste zurück.",
    "functionName": "eineEbene",
    "parameter": "daten",
    "task": "daten ist ein dichtes JSON-Array, das Werte und Unterarrays enthalten kann. Gib eine um genau eine Ebene abgeflachte Liste zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          [
            1,
            2
          ],
          [
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "input": [
          1,
          [
            2,
            [
              3
            ]
          ],
          4
        ],
        "expected": [
          1,
          2,
          [
            3
          ],
          4
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          [],
          [],
          [
            "a"
          ]
        ],
        "expected": [
          "a"
        ]
      },
      {
        "input": [
          [
            null
          ],
          false,
          [
            0
          ]
        ],
        "expected": [
          null,
          false,
          0
        ]
      }
    ],
    "hints": [
      "Verwende eine Tiefe von genau 1.",
      "Keine Änderung am Original ist nötig."
    ],
    "solution": "function eineEbene(daten) {\n  return daten.flat(1);\n}",
    "explanation": "Aus [1,[2,[3]],4] entsteht [1,2,[3],4]. Die [3] liegt eine Ebene zu tief und bleibt ein Array. flat(Infinity) hätte deshalb in dieser Aufgabe ein falsches Ergebnis.",
    "preserveInput": true,
    "starter": "function eineEbene(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function eineEbene(daten) {\n  return daten.flat(1);\n}\n\nconsole.log(eineEbene([[1, 2], [3]]));\nconsole.log(eineEbene([1, [2, [3]], 4]));"
  },
  {
    "id": "js-array-flatmap",
    "course": "js",
    "category": "Arrays",
    "name": "flatMap",
    "title": "Aus einem Datensatz mehrere Einträge machen",
    "description": "flatMap verbindet map mit einer Abflachung um eine Ebene. Ein Callback kann keine, eine oder mehrere Ausgabezeilen zurückgeben.",
    "syntax": "produkte.flatMap(produkt =>\n  produkt.tags.map(tag => ({ produkt: produkt.name, tag }))\n)",
    "parts": [
      [
        "Äußeres flatMap",
        "Führt die pro Produkt erzeugten Listen zusammen."
      ],
      [
        "Inneres map",
        "Erzeugt einen Eintrag pro Tag."
      ],
      [
        "Leere Liste",
        "Ein Produkt ohne Tags erzeugt keine Ausgabezeile."
      ]
    ],
    "note": "flatMap flacht genau eine Ebene ab. map allein würde hier ein Array aus Arrays zurückgeben.",
    "detail": "daten ist eine Liste von {name, tags}; tags ist eine Stringliste. Gib für jedes Tag {produkt: name, tag} zurück, in Produkt- und Tagreihenfolge.",
    "functionName": "tagZeilen",
    "parameter": "daten",
    "task": "daten ist eine Liste von {name, tags}; tags ist eine Stringliste. Gib für jedes Tag {produkt: name, tag} zurück, in Produkt- und Tagreihenfolge. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          {
            "name": "Spiel",
            "tags": [
              "js",
              "web"
            ]
          },
          {
            "name": "Notiz",
            "tags": [
              "tools"
            ]
          }
        ],
        "expected": [
          {
            "produkt": "Spiel",
            "tag": "js"
          },
          {
            "produkt": "Spiel",
            "tag": "web"
          },
          {
            "produkt": "Notiz",
            "tag": "tools"
          }
        ]
      },
      {
        "input": [
          {
            "name": "Leer",
            "tags": []
          }
        ],
        "expected": []
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "name": "",
            "tags": [
              "",
              "x"
            ]
          }
        ],
        "expected": [
          {
            "produkt": "",
            "tag": ""
          },
          {
            "produkt": "",
            "tag": "x"
          }
        ]
      },
      {
        "input": [
          {
            "name": "A",
            "tags": [
              "x",
              "x"
            ]
          }
        ],
        "expected": [
          {
            "produkt": "A",
            "tag": "x"
          },
          {
            "produkt": "A",
            "tag": "x"
          }
        ]
      }
    ],
    "hints": [
      "Gib aus dem Callback immer eine Liste zurück.",
      "Das innere map erstellt die Objekte mit produkt und tag."
    ],
    "solution": "function tagZeilen(daten) {\n  return daten.flatMap(produkt => produkt.tags.map(tag => ({ produkt: produkt.name, tag })));\n}",
    "explanation": "Ein Produkt mit zwei Tags erzeugt zwei Objekte. flatMap hängt beide Objekte direkt in die Ergebnisliste, statt die Zwischenliste beizubehalten. Produkte ohne Tags verschwinden durch die leere Zwischenliste.",
    "preserveInput": true,
    "starter": "function tagZeilen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function tagZeilen(daten) {\n  return daten.flatMap(produkt => produkt.tags.map(tag => ({ produkt: produkt.name, tag })));\n}\n\nconsole.log(tagZeilen([{\"name\": \"Spiel\", \"tags\": [\"js\", \"web\"]}, {\"name\": \"Notiz\", \"tags\": [\"tools\"]}]));\nconsole.log(tagZeilen([{\"name\": \"Leer\", \"tags\": []}]));"
  },
  {
    "id": "js-array-concat",
    "course": "js",
    "category": "Arrays",
    "name": "concat",
    "title": "Listen verbinden, ohne sie zu verändern",
    "description": "concat erzeugt ein neues Array aus dem ursprünglichen Inhalt und den angehängten Argumenten. Übergebene Arrays werden dabei um eine Ebene eingebaut.",
    "syntax": "links.concat(rechts)",
    "parts": [
      [
        "Neues Array",
        "links und rechts bleiben erhalten."
      ],
      [
        "Flache Verbindung",
        "Verschachtelte Unterarrays werden nicht rekursiv aufgelöst."
      ]
    ],
    "note": "concat ist eine flache Kopie. Enthaltene Objekte bleiben geteilt; die Aufgabe verändert solche Werte nicht.",
    "detail": "daten enthält zwei dichte JSON-Arrays links und rechts. Gib ihre Verbindung in dieser Reihenfolge zurück.",
    "functionName": "verbindeListen",
    "parameter": "daten",
    "task": "daten enthält zwei dichte JSON-Arrays links und rechts. Gib ihre Verbindung in dieser Reihenfolge zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "links": [
            1,
            2
          ],
          "rechts": [
            3
          ]
        },
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "input": {
          "links": [],
          "rechts": [
            "x"
          ]
        },
        "expected": [
          "x"
        ]
      },
      {
        "input": {
          "links": [
            0
          ],
          "rechts": []
        },
        "expected": [
          0
        ]
      },
      {
        "input": {
          "links": [
            [
              1
            ]
          ],
          "rechts": [
            [
              2
            ]
          ]
        },
        "expected": [
          [
            1
          ],
          [
            2
          ]
        ]
      },
      {
        "input": {
          "links": [
            null,
            false
          ],
          "rechts": [
            null
          ]
        },
        "expected": [
          null,
          false,
          null
        ]
      }
    ],
    "hints": [
      "Rufe concat auf der linken Liste auf.",
      "Übergebe die rechte Liste als Argument."
    ],
    "solution": "function verbindeListen(daten) {\n  return daten.links.concat(daten.rechts);\n}",
    "explanation": "push würde das Zielarray verändern und außerdem seine neue Länge zurückgeben. concat liefert dagegen die verbundene Liste. Bei Unterarrays entsteht keine tiefe Kopie und keine zusätzliche Abflachung.",
    "preserveInput": true,
    "starter": "function verbindeListen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function verbindeListen(daten) {\n  return daten.links.concat(daten.rechts);\n}\n\nconsole.log(verbindeListen({\"links\": [1, 2], \"rechts\": [3]}));\nconsole.log(verbindeListen({\"links\": [], \"rechts\": [\"x\"]}));"
  },
  {
    "id": "js-array-splice",
    "course": "js",
    "category": "Arrays",
    "name": "splice auf einer Kopie",
    "title": "Listenabschnitte ersetzen und entfernte Werte lesen",
    "description": "splice verändert ein Array direkt und gibt die entfernten Elemente zurück. Für eine unveränderte Eingabe wird zuerst eine Kopie erzeugt.",
    "syntax": "const kopie = [...liste];\nconst entfernt = kopie.splice(start, anzahl, ...neu);",
    "parts": [
      [
        "start",
        "Ein negativer Start zählt vom Ende."
      ],
      [
        "anzahl",
        "Wie viele Elemente entfernt werden."
      ],
      [
        "...neu",
        "Welche neuen Elemente stattdessen eingefügt werden."
      ]
    ],
    "note": "slice liest einen Abschnitt ohne Mutation. splice bearbeitet das Array und hat einen anderen Rückgabewert. Unsere Eingabeliste enthält primitive JSON-Werte.",
    "detail": "daten enthält liste, eine kleine primitive Werteliste, start als ganze Zahl, anzahl als nichtnegative ganze Zahl und neu als Liste neuer primitiver Werte. Gib {liste: bearbeiteteKopie, entfernt} zurück.",
    "functionName": "ersetzeAbschnitt",
    "parameter": "daten",
    "task": "daten enthält liste, eine kleine primitive Werteliste, start als ganze Zahl, anzahl als nichtnegative ganze Zahl und neu als Liste neuer primitiver Werte. Gib {liste: bearbeiteteKopie, entfernt} zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "liste": [
            "a",
            "b",
            "c"
          ],
          "start": 1,
          "anzahl": 1,
          "neu": [
            "x",
            "y"
          ]
        },
        "expected": {
          "liste": [
            "a",
            "x",
            "y",
            "c"
          ],
          "entfernt": [
            "b"
          ]
        }
      },
      {
        "input": {
          "liste": [
            1,
            2,
            3
          ],
          "start": -1,
          "anzahl": 1,
          "neu": []
        },
        "expected": {
          "liste": [
            1,
            2
          ],
          "entfernt": [
            3
          ]
        }
      },
      {
        "input": {
          "liste": [
            1,
            2
          ],
          "start": 1,
          "anzahl": 0,
          "neu": [
            9
          ]
        },
        "expected": {
          "liste": [
            1,
            9,
            2
          ],
          "entfernt": []
        }
      },
      {
        "input": {
          "liste": [],
          "start": 0,
          "anzahl": 3,
          "neu": [
            0
          ]
        },
        "expected": {
          "liste": [
            0
          ],
          "entfernt": []
        }
      },
      {
        "input": {
          "liste": [
            1,
            2
          ],
          "start": 99,
          "anzahl": 1,
          "neu": [
            3
          ]
        },
        "expected": {
          "liste": [
            1,
            2,
            3
          ],
          "entfernt": []
        }
      },
      {
        "input": {
          "liste": [
            1,
            2,
            3
          ],
          "start": -99,
          "anzahl": 99,
          "neu": []
        },
        "expected": {
          "liste": [],
          "entfernt": [
            1,
            2,
            3
          ]
        }
      }
    ],
    "hints": [
      "Kopiere die Eingabeliste mit Spread.",
      "Speichere den splice-Rückgabewert in entfernt."
    ],
    "solution": "function ersetzeAbschnitt(daten) {\n  const liste = [...daten.liste];\n  const entfernt = liste.splice(daten.start, daten.anzahl, ...daten.neu);\n  return { liste, entfernt };\n}",
    "explanation": "Bei start=1, anzahl=1 und neu=[\"x\",\"y\"] wird nur \"b\" entfernt und durch zwei Werte ersetzt. splice liefert [\"b\"]; die bearbeitete Liste musst du zusätzlich zurückgeben. Spread schützt nur die äußere Liste.",
    "preserveInput": true,
    "starter": "function ersetzeAbschnitt(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function ersetzeAbschnitt(daten) {\n  const liste = [...daten.liste];\n  const entfernt = liste.splice(daten.start, daten.anzahl, ...daten.neu);\n  return { liste, entfernt };\n}\n\nconsole.log(ersetzeAbschnitt({\"liste\": [\"a\", \"b\", \"c\"], \"start\": 1, \"anzahl\": 1, \"neu\": [\"x\", \"y\"]}));\nconsole.log(ersetzeAbschnitt({\"liste\": [1, 2, 3], \"start\": -1, \"anzahl\": 1, \"neu\": []}));"
  },
  {
    "id": "js-array-grid",
    "course": "js",
    "category": "Arrays",
    "name": "Array.from / Spielbrett",
    "title": "Unabhängige Zeilen für ein Spielbrett erzeugen",
    "description": "Array.from kann für jeden Platz ein neues Objekt oder Array erzeugen. So teilen sich Spielbrett-Zeilen nicht versehentlich denselben Speicher.",
    "syntax": "Array.from({ length: hoehe }, () =>\n  Array.from({ length: breite }, () => 0)\n)",
    "parts": [
      [
        "Äußerer Callback",
        "Erzeugt für jede Zeile ein eigenes Array."
      ],
      [
        "Innerer Callback",
        "Füllt die einzelnen Felder mit 0."
      ],
      [
        "brett[y][x]",
        "Greift zuerst auf die Zeile, dann auf die Spalte zu."
      ]
    ],
    "note": "Array(hoehe).fill(eineZeile) teilt dieselbe Zeile zwischen allen Plätzen. Das Setzen eines Feldes kann dann mehrere Zeilen verändern.",
    "detail": "daten enthält breite und hoehe als kleine nichtnegative ganze Zahlen, x,y und wert. Erzeuge ein Null-Spielbrett. Wenn beide Dimensionen positiv sind, ist x,y eine gültige Position; setze nur dieses Feld auf wert. Bei leeren Dimensionen erfolgt kein Setzen.",
    "functionName": "spielbrett",
    "parameter": "daten",
    "task": "daten enthält breite und hoehe als kleine nichtnegative ganze Zahlen, x,y und wert. Erzeuge ein Null-Spielbrett. Wenn beide Dimensionen positiv sind, ist x,y eine gültige Position; setze nur dieses Feld auf wert. Bei leeren Dimensionen erfolgt kein Setzen. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "breite": 3,
          "hoehe": 2,
          "x": 1,
          "y": 1,
          "wert": 9
        },
        "expected": [
          [
            0,
            0,
            0
          ],
          [
            0,
            9,
            0
          ]
        ]
      },
      {
        "input": {
          "breite": 1,
          "hoehe": 3,
          "x": 0,
          "y": 0,
          "wert": 2
        },
        "expected": [
          [
            2
          ],
          [
            0
          ],
          [
            0
          ]
        ]
      },
      {
        "input": {
          "breite": 0,
          "hoehe": 2,
          "x": 0,
          "y": 0,
          "wert": 7
        },
        "expected": [
          [],
          []
        ]
      },
      {
        "input": {
          "breite": 2,
          "hoehe": 0,
          "x": 0,
          "y": 0,
          "wert": 7
        },
        "expected": []
      },
      {
        "input": {
          "breite": 2,
          "hoehe": 2,
          "x": 0,
          "y": 1,
          "wert": 0
        },
        "expected": [
          [
            0,
            0
          ],
          [
            0,
            0
          ]
        ]
      }
    ],
    "hints": [
      "Erzeuge die Zeilen mit einem Callback statt mit fill(eineZeile).",
      "Denke bei [y][x] an Zeile vor Spalte."
    ],
    "solution": "function spielbrett(daten) {\n  const brett = Array.from({ length: daten.hoehe }, () => Array.from({ length: daten.breite }, () => 0));\n  if (daten.breite > 0 && daten.hoehe > 0) brett[daten.y][daten.x] = daten.wert;\n  return brett;\n}",
    "explanation": "Der äußere Callback wird einmal pro Zeile ausgeführt. Jeder Aufruf baut ein neues inneres Array. Deshalb verändert brett[1][1]=9 nur die zweite Zeile und nicht zugleich die erste.",
    "preserveInput": true,
    "starter": "function spielbrett(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function spielbrett(daten) {\n  const brett = Array.from({ length: daten.hoehe }, () => Array.from({ length: daten.breite }, () => 0));\n  if (daten.breite > 0 && daten.hoehe > 0) brett[daten.y][daten.x] = daten.wert;\n  return brett;\n}\n\nconsole.log(spielbrett({\"breite\": 3, \"hoehe\": 2, \"x\": 1, \"y\": 1, \"wert\": 9}));\nconsole.log(spielbrett({\"breite\": 1, \"hoehe\": 3, \"x\": 0, \"y\": 0, \"wert\": 2}));"
  },
  {
    "id": "js-obj-from-entries",
    "course": "js",
    "category": "Objekte",
    "name": "Object.fromEntries",
    "title": "Schlüssel-Wert-Paare wieder in ein Objekt verwandeln",
    "description": "Object.fromEntries baut aus einer Liste von Paaren ein neues Objekt. Bei mehrfach vorkommenden Schlüsseln gewinnt der letzte Wert.",
    "syntax": "Object.fromEntries([[\"hp\", 100], [\"level\", 3]])",
    "parts": [
      [
        "Paar",
        "Besteht hier aus Stringschlüssel und JSON-Wert."
      ],
      [
        "Letzter Wert",
        "Überschreibt einen früheren Wert desselben Schlüssels."
      ]
    ],
    "note": "Object.entries geht in die andere Richtung: vom Objekt zur Paarliste. Werte werden von fromEntries nicht tief kopiert.",
    "detail": "daten ist eine Liste von [stringSchluessel, jsonWert]-Paaren. Gib das erzeugte Objekt zurück. Bei mehrfach vorkommenden Schlüsseln gilt der letzte Wert.",
    "functionName": "ausPaaren",
    "parameter": "daten",
    "task": "daten ist eine Liste von [stringSchluessel, jsonWert]-Paaren. Gib das erzeugte Objekt zurück. Bei mehrfach vorkommenden Schlüsseln gilt der letzte Wert. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          [
            "hp",
            100
          ],
          [
            "level",
            3
          ]
        ],
        "expected": {
          "hp": 100,
          "level": 3
        }
      },
      {
        "input": [
          [
            "hp",
            10
          ],
          [
            "hp",
            0
          ]
        ],
        "expected": {
          "hp": 0
        }
      },
      {
        "input": [],
        "expected": {}
      },
      {
        "input": [
          [
            "",
            false
          ],
          [
            "name",
            null
          ]
        ],
        "expected": {
          "": false,
          "name": null
        }
      },
      {
        "input": [
          [
            "toString",
            "eigener Wert"
          ],
          [
            "liste",
            [
              1,
              2
            ]
          ]
        ],
        "expected": {
          "toString": "eigener Wert",
          "liste": [
            1,
            2
          ]
        }
      }
    ],
    "hints": [
      "Du brauchst keine manuelle Schleife.",
      "fromEntries gibt das neue Objekt direkt zurück."
    ],
    "solution": "function ausPaaren(daten) {\n  return Object.fromEntries(daten);\n}",
    "explanation": "Eine Einstellungsdatei kann zunächst als Paarliste vorliegen. fromEntries verwandelt sie in einen direkten Schlüsselzugriff. Ein neuer Eintrag [\"hp\",0] überschreibt dabei einen früheren hp-Wert, obwohl 0 falsy ist.",
    "preserveInput": true,
    "starter": "function ausPaaren(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function ausPaaren(daten) {\n  return Object.fromEntries(daten);\n}\n\nconsole.log(ausPaaren([[\"hp\", 100], [\"level\", 3]]));\nconsole.log(ausPaaren([[\"hp\", 10], [\"hp\", 0]]));"
  },
  {
    "id": "js-obj-assign",
    "course": "js",
    "category": "Objekte",
    "name": "Object.assign",
    "title": "Standardeinstellungen durch eigene Werte ergänzen",
    "description": "Object.assign kopiert eigene aufzählbare Eigenschaften von links nach rechts in ein Zielobjekt. Spätere Quellen überschreiben frühere Werte.",
    "syntax": "Object.assign({}, standard, eigene)",
    "parts": [
      [
        "{}",
        "Ein neues Ziel schützt die Eingabeobjekte vor direkter Mutation."
      ],
      [
        "Quellenreihenfolge",
        "eigene gewinnt gegenüber standard."
      ],
      [
        "Flache Kopie",
        "Verschachtelte Werte bleiben geteilt."
      ]
    ],
    "note": "Object.assign(standard, eigene) würde standard verändern. Auch undefined oder null als Eigenschaftswert kann einen vorherigen Wert überschreiben; wir ersetzen Werte ohne Truthiness-Fallback.",
    "detail": "daten enthält standard und eigene als einfache JSON-Objekte mit normalen Stringschlüsseln. Gib ihre flache Zusammenführung zurück; eigene überschreibt standard auch bei 0,false und null.",
    "functionName": "einstellungen",
    "parameter": "daten",
    "task": "daten enthält standard und eigene als einfache JSON-Objekte mit normalen Stringschlüsseln. Gib ihre flache Zusammenführung zurück; eigene überschreibt standard auch bei 0,false und null. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "standard": {
            "laut": 50,
            "theme": "dark"
          },
          "eigene": {
            "laut": 0
          }
        },
        "expected": {
          "laut": 0,
          "theme": "dark"
        }
      },
      {
        "input": {
          "standard": {
            "ton": true
          },
          "eigene": {
            "ton": false
          }
        },
        "expected": {
          "ton": false
        }
      },
      {
        "input": {
          "standard": {
            "name": "Gast"
          },
          "eigene": {
            "name": null
          }
        },
        "expected": {
          "name": null
        }
      },
      {
        "input": {
          "standard": {},
          "eigene": {
            "level": 3
          }
        },
        "expected": {
          "level": 3
        }
      },
      {
        "input": {
          "standard": {
            "steuerung": {
              "taste": "W"
            }
          },
          "eigene": {
            "steuerung": {
              "taste": "E"
            }
          }
        },
        "expected": {
          "steuerung": {
            "taste": "E"
          }
        }
      }
    ],
    "hints": [
      "Gib {} als erstes Argument an.",
      "Die Nutzereinstellungen stehen als letzte Quelle."
    ],
    "solution": "function einstellungen(daten) {\n  return Object.assign({}, daten.standard, daten.eigene);\n}",
    "explanation": "Das erste Argument ist das Ziel und wird verändert. Ein neues {} ist deshalb entscheidend. Verschachtelte steuerung-Objekte werden vollständig durch den späteren Wert ersetzt; assign führt keinen tiefen Merge aus.",
    "preserveInput": true,
    "starter": "function einstellungen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function einstellungen(daten) {\n  return Object.assign({}, daten.standard, daten.eigene);\n}\n\nconsole.log(einstellungen({\"standard\": {\"laut\": 50, \"theme\": \"dark\"}, \"eigene\": {\"laut\": 0}}));\nconsole.log(einstellungen({\"standard\": {\"ton\": true}, \"eigene\": {\"ton\": false}}));"
  },
  {
    "id": "js-game-collision",
    "course": "js",
    "category": "Praxisaufgaben",
    "name": "Rechteck-Kollision",
    "title": "Prüfen, ob zwei Spielfiguren sich überschneiden",
    "description": "Bei achsenparallelen Rechtecken müssen die Flächen in x- und y-Richtung überlappen. Berührung an einer Kante zählt in dieser Aufgabe nicht als Kollision.",
    "syntax": "a.x < b.x + b.breite &&\na.x + a.breite > b.x",
    "parts": [
      [
        "x / y",
        "Die linke obere Ecke des Rechtecks."
      ],
      [
        "breite / hoehe",
        "Die Ausdehnung nach rechts und unten."
      ],
      [
        "Strikte Vergleiche",
        "Schließen reine Kantenberührung aus."
      ]
    ],
    "note": "Dies ist eine AABB-Flächenprüfung, keine Physiksimulation. Rotation und die Bewegung zwischen zwei Bildern werden nicht berücksichtigt. Ein Rechteck ohne Fläche kollidiert nicht.",
    "detail": "daten enthält Rechtecke a,b mit kleinen endlichen x,y-Koordinaten und nichtnegativen Breiten/Höhen. Gib true bei einer Überschneidung mit positiver Fläche zurück. Kantenberührung oder leere Rechtecke ergeben false.",
    "functionName": "kollision",
    "parameter": "daten",
    "task": "daten enthält Rechtecke a,b mit kleinen endlichen x,y-Koordinaten und nichtnegativen Breiten/Höhen. Gib true bei einer Überschneidung mit positiver Fläche zurück. Kantenberührung oder leere Rechtecke ergeben false. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0,
            "breite": 10,
            "hoehe": 10
          },
          "b": {
            "x": 5,
            "y": 5,
            "breite": 10,
            "hoehe": 10
          }
        },
        "expected": true
      },
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0,
            "breite": 10,
            "hoehe": 10
          },
          "b": {
            "x": 10,
            "y": 0,
            "breite": 3,
            "hoehe": 3
          }
        },
        "expected": false
      },
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0,
            "breite": 10,
            "hoehe": 10
          },
          "b": {
            "x": 1,
            "y": 20,
            "breite": 2,
            "hoehe": 2
          }
        },
        "expected": false
      },
      {
        "input": {
          "a": {
            "x": -5,
            "y": -5,
            "breite": 10,
            "hoehe": 10
          },
          "b": {
            "x": -1,
            "y": -1,
            "breite": 2,
            "hoehe": 2
          }
        },
        "expected": true
      },
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0,
            "breite": 10,
            "hoehe": 10
          },
          "b": {
            "x": 5,
            "y": 5,
            "breite": 0,
            "hoehe": 3
          }
        },
        "expected": false
      },
      {
        "input": {
          "a": {
            "x": 0,
            "y": 0,
            "breite": 10,
            "hoehe": 10
          },
          "b": {
            "x": 0,
            "y": 10,
            "breite": 10,
            "hoehe": 10
          }
        },
        "expected": false
      }
    ],
    "hints": [
      "Prüfe zuerst, ob beide Rechtecke eine positive Fläche besitzen.",
      "Verbinde die zwei x- und die zwei y-Vergleiche mit &&."
    ],
    "solution": "function kollision(daten) {\n  const { a, b } = daten;\n  if (a.breite === 0 || a.hoehe === 0 || b.breite === 0 || b.hoehe === 0) return false;\n  return a.x < b.x + b.breite && a.x + a.breite > b.x &&\n    a.y < b.y + b.hoehe && a.y + a.hoehe > b.y;\n}",
    "explanation": "Vergleiche auf jeder Achse die rechte Kante des einen Rechtecks mit der linken Kante des anderen. Alle vier Vergleiche müssen stimmen. <= und >= würden auch eine bloße Berührung als Kollision zählen.",
    "preserveInput": true,
    "starter": "function kollision(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function kollision(daten) {\n  const { a, b } = daten;\n  if (a.breite === 0 || a.hoehe === 0 || b.breite === 0 || b.hoehe === 0) return false;\n  return a.x < b.x + b.breite && a.x + a.breite > b.x &&\n    a.y < b.y + b.hoehe && a.y + a.hoehe > b.y;\n}\n\nconsole.log(kollision({\"a\": {\"x\": 0, \"y\": 0, \"breite\": 10, \"hoehe\": 10}, \"b\": {\"x\": 5, \"y\": 5, \"breite\": 10, \"hoehe\": 10}}));\nconsole.log(kollision({\"a\": {\"x\": 0, \"y\": 0, \"breite\": 10, \"hoehe\": 10}, \"b\": {\"x\": 10, \"y\": 0, \"breite\": 3, \"hoehe\": 3}}));"
  },
  {
    "id": "js-shop-checkout",
    "course": "js",
    "category": "Praxisaufgaben",
    "name": "Warenkorb / Rabatt / Versand",
    "title": "Einen Warenkorb mit Rabatt und Versand berechnen",
    "description": "Ein Checkout kombiniert reduce, Ganzzahlbeträge und Entscheidungsregeln. Die Versandgrenze wird hier nach dem Rabatt geprüft.",
    "syntax": "const subtotal = artikel.reduce((summe, a) =>\n  summe + a.preisCent * a.menge, 0\n);",
    "parts": [
      [
        "subtotal",
        "Summe aus Preis mal Menge."
      ],
      [
        "Rabatt",
        "Fester Cent-Rabatt, höchstens so hoch wie subtotal."
      ],
      [
        "Versandgrenze",
        "Gilt für den rabattierten Warenwert."
      ]
    ],
    "note": "Ein leerer Warenkorb beziehungsweise Gesamtmenge 0 hat keinen Versand. Ein vorhandener, komplett rabattierter Warenkorb kann dagegen Versand kosten. Alle Zahlen und Zwischenergebnisse bleiben sichere kleine Ganzzahlen.",
    "detail": "daten enthält artikel mit nichtnegativen ganzen preisCent/menge, rabattCent, gratisAbCent und versandCent als nichtnegative ganze Zahlen. Berechne subtotal, rabatt=min(rabattCent,subtotal), warenwert=subtotal-rabatt, versand (0 bei Gesamtmenge 0 oder warenwert >= gratisAbCent, sonst versandCent) und gesamt=warenwert+versand. Gib diese fünf Werte zurück.",
    "functionName": "checkout",
    "parameter": "daten",
    "task": "daten enthält artikel mit nichtnegativen ganzen preisCent/menge, rabattCent, gratisAbCent und versandCent als nichtnegative ganze Zahlen. Berechne subtotal, rabatt=min(rabattCent,subtotal), warenwert=subtotal-rabatt, versand (0 bei Gesamtmenge 0 oder warenwert >= gratisAbCent, sonst versandCent) und gesamt=warenwert+versand. Gib diese fünf Werte zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "artikel": [
            {
              "preisCent": 1500,
              "menge": 2
            }
          ],
          "rabattCent": 0,
          "gratisAbCent": 3000,
          "versandCent": 499
        },
        "expected": {
          "subtotal": 3000,
          "rabatt": 0,
          "warenwert": 3000,
          "versand": 0,
          "gesamt": 3000
        }
      },
      {
        "input": {
          "artikel": [
            {
              "preisCent": 1500,
              "menge": 2
            }
          ],
          "rabattCent": 1,
          "gratisAbCent": 3000,
          "versandCent": 499
        },
        "expected": {
          "subtotal": 3000,
          "rabatt": 1,
          "warenwert": 2999,
          "versand": 499,
          "gesamt": 3498
        }
      },
      {
        "input": {
          "artikel": [],
          "rabattCent": 0,
          "gratisAbCent": 3000,
          "versandCent": 499
        },
        "expected": {
          "subtotal": 0,
          "rabatt": 0,
          "warenwert": 0,
          "versand": 0,
          "gesamt": 0
        }
      },
      {
        "input": {
          "artikel": [
            {
              "preisCent": 100,
              "menge": 1
            }
          ],
          "rabattCent": 500,
          "gratisAbCent": 1000,
          "versandCent": 50
        },
        "expected": {
          "subtotal": 100,
          "rabatt": 100,
          "warenwert": 0,
          "versand": 50,
          "gesamt": 50
        }
      },
      {
        "input": {
          "artikel": [
            {
              "preisCent": 0,
              "menge": 1
            }
          ],
          "rabattCent": 0,
          "gratisAbCent": 0,
          "versandCent": 50
        },
        "expected": {
          "subtotal": 0,
          "rabatt": 0,
          "warenwert": 0,
          "versand": 0,
          "gesamt": 0
        }
      },
      {
        "input": {
          "artikel": [
            {
              "preisCent": 100,
              "menge": 0
            }
          ],
          "rabattCent": 0,
          "gratisAbCent": 1000,
          "versandCent": 50
        },
        "expected": {
          "subtotal": 0,
          "rabatt": 0,
          "warenwert": 0,
          "versand": 0,
          "gesamt": 0
        }
      }
    ],
    "hints": [
      "Nutze reduce mit Startwert 0 für Geldwert und Stückzahl.",
      "Berechne den Versand erst nach Abziehen des begrenzten Rabatts."
    ],
    "solution": "function checkout(daten) {\n  const subtotal = daten.artikel.reduce((summe, artikel) => summe + artikel.preisCent * artikel.menge, 0);\n  const menge = daten.artikel.reduce((summe, artikel) => summe + artikel.menge, 0);\n  const rabatt = Math.min(daten.rabattCent, subtotal);\n  const warenwert = subtotal - rabatt;\n  const versand = menge === 0 || warenwert >= daten.gratisAbCent ? 0 : daten.versandCent;\n  return { subtotal, rabatt, warenwert, versand, gesamt: warenwert + versand };\n}",
    "explanation": "Die Grenze ist inklusiv: genau 3000 Cent sind versandfrei. Mit einem Rabatt von 1 Cent sinkt derselbe Warenkorb auf 2999 und erhält Versandkosten. Der Rabatt wird auf subtotal begrenzt, damit der Warenwert nicht negativ wird.",
    "preserveInput": true,
    "starter": "function checkout(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function checkout(daten) {\n  const subtotal = daten.artikel.reduce((summe, artikel) => summe + artikel.preisCent * artikel.menge, 0);\n  const menge = daten.artikel.reduce((summe, artikel) => summe + artikel.menge, 0);\n  const rabatt = Math.min(daten.rabattCent, subtotal);\n  const warenwert = subtotal - rabatt;\n  const versand = menge === 0 || warenwert >= daten.gratisAbCent ? 0 : daten.versandCent;\n  return { subtotal, rabatt, warenwert, versand, gesamt: warenwert + versand };\n}\n\nconsole.log(checkout({\"artikel\": [{\"preisCent\": 1500, \"menge\": 2}], \"rabattCent\": 0, \"gratisAbCent\": 3000, \"versandCent\": 499}));\nconsole.log(checkout({\"artikel\": [{\"preisCent\": 1500, \"menge\": 2}], \"rabattCent\": 1, \"gratisAbCent\": 3000, \"versandCent\": 499}));"
  }
];
