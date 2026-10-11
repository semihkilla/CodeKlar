export const practiceLessons = [
  {
    "id": "js-practice-zero",
    "course": "js",
    "category": "Fehlersuche",
    "name": "?? statt ||",
    "title": "Fehlersuche: Null ist ein gültiger Preis",
    "description": "|| ersetzt alle falschen Werte; ?? ersetzt nur null und undefined.",
    "syntax": "?? statt ||",
    "parts": [
      [
        "?? statt ||",
        "|| ersetzt alle falschen Werte; ?? ersetzt nur null und undefined."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Gib daten.preis zurück; nur ein fehlender oder null gesetzter Preis bekommt den Standard 10. Die Zahl 0 muss erhalten bleiben.",
    "task": "Gib daten.preis zurück; nur ein fehlender oder null gesetzter Preis bekommt den Standard 10. Die Zahl 0 muss erhalten bleiben.",
    "functionName": "repairZero",
    "parameter": "daten",
    "starter": "function repairZero(daten) {\n  return daten.preis || 10;\n}",
    "solution": "function repairZero(daten) {\n  return daten.preis ?? 10;\n}",
    "example": "function repairZero(daten) {\n  return daten.preis ?? 10;\n}\n\nconsole.log(repairZero({\"preis\": 0}));",
    "tests": [
      {
        "input": {
          "preis": 0
        },
        "expected": 0
      },
      {
        "input": {
          "preis": 5
        },
        "expected": 5
      },
      {
        "input": {
          "preis": null
        },
        "expected": 10
      },
      {
        "input": {},
        "expected": 10
      }
    ],
    "preserveInput": true,
    "hints": [
      "Welche Werte sind falsy?",
      "Teste den Preis 0 ausdrücklich.",
      "?? erhält 0 und ersetzt null sowie undefined."
    ],
    "explanation": "|| ersetzt alle falschen Werte; ?? ersetzt nur null und undefined. ?? erhält 0 und ersetzt null sowie undefined.",
    "debugging": {
      "symptom": "Gib daten.preis zurück; nur ein fehlender oder null gesetzter Preis bekommt den Standard 10. Die Zahl 0 muss erhalten bleiben.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-index",
    "course": "js",
    "category": "Fehlersuche",
    "name": "indexOf() >= 0",
    "title": "Fehlersuche: Der erste Treffer wird übersehen",
    "description": "Ein Index von 0 ist gefunden; -1 bedeutet nicht gefunden.",
    "syntax": "indexOf() >= 0",
    "parts": [
      [
        "indexOf() >= 0",
        "Ein Index von 0 ist gefunden; -1 bedeutet nicht gefunden."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Gib zurück, ob daten.werte den gesuchten Wert daten.suche enthält.",
    "task": "Gib zurück, ob daten.werte den gesuchten Wert daten.suche enthält.",
    "functionName": "repairIndex",
    "parameter": "daten",
    "starter": "function repairIndex(daten) {\n  return Boolean(daten.werte.indexOf(daten.suche));\n}",
    "solution": "function repairIndex(daten) {\n  return daten.werte.indexOf(daten.suche) >= 0;\n}",
    "example": "function repairIndex(daten) {\n  return daten.werte.indexOf(daten.suche) >= 0;\n}\n\nconsole.log(repairIndex({\"werte\": [0, 2], \"suche\": 0}));",
    "tests": [
      {
        "input": {
          "werte": [
            0,
            2
          ],
          "suche": 0
        },
        "expected": true
      },
      {
        "input": {
          "werte": [
            1,
            2
          ],
          "suche": 2
        },
        "expected": true
      },
      {
        "input": {
          "werte": [
            1
          ],
          "suche": 3
        },
        "expected": false
      },
      {
        "input": {
          "werte": [],
          "suche": 0
        },
        "expected": false
      }
    ],
    "preserveInput": true,
    "hints": [
      "Index 0 ist falsy.",
      "-1 ist truthy.",
      "Vergleiche den Index mit 0, statt ihn in Boolean umzuwandeln."
    ],
    "explanation": "Ein Index von 0 ist gefunden; -1 bedeutet nicht gefunden. Vergleiche den Index mit 0, statt ihn in Boolean umzuwandeln.",
    "debugging": {
      "symptom": "Gib zurück, ob daten.werte den gesuchten Wert daten.suche enthält.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-sum",
    "course": "js",
    "category": "Fehlersuche",
    "name": "i < length",
    "title": "Fehlersuche: Ein Arrayelement fehlt in der Summe",
    "description": "Die Schleife muss das letzte Element einschließen.",
    "syntax": "i < length",
    "parts": [
      [
        "i < length",
        "Die Schleife muss das letzte Element einschließen."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Summiere alle Zahlen im Array daten, auch das letzte Element; leer ergibt 0.",
    "task": "Summiere alle Zahlen im Array daten, auch das letzte Element; leer ergibt 0.",
    "functionName": "repairSum",
    "parameter": "daten",
    "starter": "function repairSum(daten) {\n  let summe=0; for(let i=0;i<daten.length-1;i++) summe+=daten[i]; return summe;\n}",
    "solution": "function repairSum(daten) {\n  let summe=0; for(let i=0;i<daten.length;i++) summe+=daten[i]; return summe;\n}",
    "example": "function repairSum(daten) {\n  let summe=0; for(let i=0;i<daten.length;i++) summe+=daten[i]; return summe;\n}\n\nconsole.log(repairSum([]));",
    "tests": [
      {
        "input": [],
        "expected": 0
      },
      {
        "input": [
          5
        ],
        "expected": 5
      },
      {
        "input": [
          1,
          2,
          3
        ],
        "expected": 6
      },
      {
        "input": [
          -2,
          0,
          7
        ],
        "expected": 5
      }
    ],
    "preserveInput": true,
    "hints": [
      "Prüfe ein Array mit genau einem Element.",
      "Der letzte Index ist length - 1.",
      "i < length besucht alle gültigen Indizes."
    ],
    "explanation": "Die Schleife muss das letzte Element einschließen. i < length besucht alle gültigen Indizes.",
    "debugging": {
      "symptom": "Summiere alle Zahlen im Array daten, auch das letzte Element; leer ergibt 0.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-numeric-sort",
    "course": "js",
    "category": "Fehlersuche",
    "name": "sort((a,b) => a-b)",
    "title": "Fehlersuche: Zehn steht vor Zwei",
    "description": "Ohne Vergleichsfunktion sortiert sort lexikografisch und verändert das Array.",
    "syntax": "sort((a,b) => a-b)",
    "parts": [
      [
        "sort((a,b) => a-b)",
        "Ohne Vergleichsfunktion sortiert sort lexikografisch und verändert das Array."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Gib eine neue, numerisch aufsteigend sortierte Kopie von daten zurück.",
    "task": "Gib eine neue, numerisch aufsteigend sortierte Kopie von daten zurück.",
    "functionName": "repairNumericSort",
    "parameter": "daten",
    "starter": "function repairNumericSort(daten) {\n  return daten.sort();\n}",
    "solution": "function repairNumericSort(daten) {\n  return [...daten].sort((a,b)=>a-b);\n}",
    "example": "function repairNumericSort(daten) {\n  return [...daten].sort((a,b)=>a-b);\n}\n\nconsole.log(repairNumericSort([10, 2, 1]));",
    "tests": [
      {
        "input": [
          10,
          2,
          1
        ],
        "expected": [
          1,
          2,
          10
        ]
      },
      {
        "input": [
          0,
          -2,
          3
        ],
        "expected": [
          -2,
          0,
          3
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          2,
          2,
          1
        ],
        "expected": [
          1,
          2,
          2
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Prüfe 2 und 10 gemeinsam.",
      "sort verändert die Eingabe.",
      "Kopiere das Array und verwende den numerischen Vergleich."
    ],
    "explanation": "Ohne Vergleichsfunktion sortiert sort lexikografisch und verändert das Array. Kopiere das Array und verwende den numerischen Vergleich.",
    "debugging": {
      "symptom": "Gib eine neue, numerisch aufsteigend sortierte Kopie von daten zurück.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-callback",
    "course": "js",
    "category": "Fehlersuche",
    "name": "map() und return",
    "title": "Fehlersuche: map liefert leere Werte",
    "description": "Ein Callback mit Block braucht return.",
    "syntax": "map() und return",
    "parts": [
      [
        "map() und return",
        "Ein Callback mit Block braucht return."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Verdopple jeden Zahlenwert in daten und gib das neue Array zurück.",
    "task": "Verdopple jeden Zahlenwert in daten und gib das neue Array zurück.",
    "functionName": "repairCallback",
    "parameter": "daten",
    "starter": "function repairCallback(daten) {\n  return daten.map(wert => { wert*2; });\n}",
    "solution": "function repairCallback(daten) {\n  return daten.map(wert => { return wert*2; });\n}",
    "example": "function repairCallback(daten) {\n  return daten.map(wert => { return wert*2; });\n}\n\nconsole.log(repairCallback([1, 2]));",
    "tests": [
      {
        "input": [
          1,
          2
        ],
        "expected": [
          2,
          4
        ]
      },
      {
        "input": [
          0,
          -3
        ],
        "expected": [
          0,
          -6
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          1.5
        ],
        "expected": [
          3
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Was gibt ein Funktionsblock ohne return zurück?",
      "Ein Ausdruck und ein Block sind verschieden.",
      "return übergibt das berechnete Ergebnis an map."
    ],
    "explanation": "Ein Callback mit Block braucht return. return übergibt das berechnete Ergebnis an map.",
    "debugging": {
      "symptom": "Verdopple jeden Zahlenwert in daten und gib das neue Array zurück.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-shared-rows",
    "course": "js",
    "category": "Fehlersuche",
    "name": "Array.from() pro Zeile",
    "title": "Fehlersuche: Spielbrett-Zeilen teilen Speicher",
    "description": "fill mit einem Objekt verteilt dieselbe Referenz.",
    "syntax": "Array.from() pro Zeile",
    "parts": [
      [
        "Array.from() pro Zeile",
        "fill mit einem Objekt verteilt dieselbe Referenz."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {zeilen,spalten}. Erzeuge ein Nullbrett; falls beide Größen positiv sind, setze nur [0][0] auf 1.",
    "task": "daten ist {zeilen,spalten}. Erzeuge ein Nullbrett; falls beide Größen positiv sind, setze nur [0][0] auf 1.",
    "functionName": "repairSharedRows",
    "parameter": "daten",
    "starter": "function repairSharedRows(daten) {\n  const brett=Array(daten.zeilen).fill(Array(daten.spalten).fill(0)); if(daten.zeilen&&daten.spalten)brett[0][0]=1; return brett;\n}",
    "solution": "function repairSharedRows(daten) {\n  const brett=Array.from({length:daten.zeilen},()=>Array(daten.spalten).fill(0)); if(daten.zeilen&&daten.spalten)brett[0][0]=1; return brett;\n}",
    "example": "function repairSharedRows(daten) {\n  const brett=Array.from({length:daten.zeilen},()=>Array(daten.spalten).fill(0)); if(daten.zeilen&&daten.spalten)brett[0][0]=1; return brett;\n}\n\nconsole.log(repairSharedRows({\"zeilen\": 2, \"spalten\": 2}));",
    "tests": [
      {
        "input": {
          "zeilen": 2,
          "spalten": 2
        },
        "expected": [
          [
            1,
            0
          ],
          [
            0,
            0
          ]
        ]
      },
      {
        "input": {
          "zeilen": 3,
          "spalten": 1
        },
        "expected": [
          [
            1
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
          "zeilen": 0,
          "spalten": 2
        },
        "expected": []
      },
      {
        "input": {
          "zeilen": 2,
          "spalten": 0
        },
        "expected": [
          [],
          []
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Zeigen alle Zeilen auf dasselbe Array?",
      "Erzeuge jede innere Zeile neu.",
      "Array.from mit Callback erzeugt unabhängige Zeilen."
    ],
    "explanation": "fill mit einem Objekt verteilt dieselbe Referenz. Array.from mit Callback erzeugt unabhängige Zeilen.",
    "debugging": {
      "symptom": "daten ist {zeilen,spalten}. Erzeuge ein Nullbrett; falls beide Größen positiv sind, setze nur [0][0] auf 1.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-nested-copy",
    "course": "js",
    "category": "Fehlersuche",
    "name": "verschachtelte Kopie",
    "title": "Fehlersuche: Eine Kopie verändert das Original",
    "description": "Spread kopiert nur die erste Ebene.",
    "syntax": "verschachtelte Kopie",
    "parts": [
      [
        "verschachtelte Kopie",
        "Spread kopiert nur die erste Ebene."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {profil:{punkte},name}. Gib eine Kopie mit einem zusätzlichen Punkt zurück, ohne daten.profil zu verändern.",
    "task": "daten ist {profil:{punkte},name}. Gib eine Kopie mit einem zusätzlichen Punkt zurück, ohne daten.profil zu verändern.",
    "functionName": "repairNestedCopy",
    "parameter": "daten",
    "starter": "function repairNestedCopy(daten) {\n  const kopie={...daten}; kopie.profil.punkte++; return kopie;\n}",
    "solution": "function repairNestedCopy(daten) {\n  return {...daten,profil:{...daten.profil,punkte:daten.profil.punkte+1}};\n}",
    "example": "function repairNestedCopy(daten) {\n  return {...daten,profil:{...daten.profil,punkte:daten.profil.punkte+1}};\n}\n\nconsole.log(repairNestedCopy({\"profil\": {\"punkte\": 0}, \"name\": \"Ada\"}));",
    "tests": [
      {
        "input": {
          "profil": {
            "punkte": 0
          },
          "name": "Ada"
        },
        "expected": {
          "profil": {
            "punkte": 1
          },
          "name": "Ada"
        }
      },
      {
        "input": {
          "profil": {
            "punkte": 10
          },
          "name": "Lin"
        },
        "expected": {
          "profil": {
            "punkte": 11
          },
          "name": "Lin"
        }
      },
      {
        "input": {
          "profil": {
            "punkte": -1
          },
          "name": ""
        },
        "expected": {
          "profil": {
            "punkte": 0
          },
          "name": ""
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Welche Referenz steckt in kopie.profil?",
      "Auch das Profil muss neu erstellt werden.",
      "Kopiere genau die veränderten Ebenen, statt die gemeinsame Referenz zu bearbeiten."
    ],
    "explanation": "Spread kopiert nur die erste Ebene. Kopiere genau die veränderten Ebenen, statt die gemeinsame Referenz zu bearbeiten.",
    "debugging": {
      "symptom": "daten ist {profil:{punkte},name}. Gib eine Kopie mit einem zusätzlichen Punkt zurück, ohne daten.profil zu verändern.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-membership",
    "course": "js",
    "category": "Fehlersuche",
    "name": "Map.has()",
    "title": "Fehlersuche: Ein falscher Map-Wert gilt als fehlend",
    "description": "has prüft den Schlüssel, get liest den Wert.",
    "syntax": "Map.has()",
    "parts": [
      [
        "Map.has()",
        "has prüft den Schlüssel, get liest den Wert."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {paare,schluessel}. Gib {gefunden,wert} zurück; fehlend liefert wert:null. false, 0 und leerer Text sind vorhandene Werte.",
    "task": "daten ist {paare,schluessel}. Gib {gefunden,wert} zurück; fehlend liefert wert:null. false, 0 und leerer Text sind vorhandene Werte.",
    "functionName": "repairMembership",
    "parameter": "daten",
    "starter": "function repairMembership(daten) {\n  const m=new Map(daten.paare); const wert=m.get(daten.schluessel); return {gefunden:!!wert,wert:wert||null};\n}",
    "solution": "function repairMembership(daten) {\n  const m=new Map(daten.paare); return {gefunden:m.has(daten.schluessel),wert:m.has(daten.schluessel)?m.get(daten.schluessel):null};\n}",
    "example": "function repairMembership(daten) {\n  const m=new Map(daten.paare); return {gefunden:m.has(daten.schluessel),wert:m.has(daten.schluessel)?m.get(daten.schluessel):null};\n}\n\nconsole.log(repairMembership({\"paare\": [[\"a\", 0]], \"schluessel\": \"a\"}));",
    "tests": [
      {
        "input": {
          "paare": [
            [
              "a",
              0
            ]
          ],
          "schluessel": "a"
        },
        "expected": {
          "gefunden": true,
          "wert": 0
        }
      },
      {
        "input": {
          "paare": [
            [
              "a",
              false
            ]
          ],
          "schluessel": "a"
        },
        "expected": {
          "gefunden": true,
          "wert": false
        }
      },
      {
        "input": {
          "paare": [
            [
              "a",
              ""
            ]
          ],
          "schluessel": "a"
        },
        "expected": {
          "gefunden": true,
          "wert": ""
        }
      },
      {
        "input": {
          "paare": [],
          "schluessel": "a"
        },
        "expected": {
          "gefunden": false,
          "wert": null
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Vorhandensein ist unabhängig vom Inhalt.",
      "Teste false und 0.",
      "Nutze has für die Existenzprüfung und get nur für den Inhalt."
    ],
    "explanation": "has prüft den Schlüssel, get liest den Wert. Nutze has für die Existenzprüfung und get nur für den Inhalt.",
    "debugging": {
      "symptom": "daten ist {paare,schluessel}. Gib {gefunden,wert} zurück; fehlend liefert wert:null. false, 0 und leerer Text sind vorhandene Werte.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-parse",
    "course": "js",
    "category": "Fehlersuche",
    "name": "Number() + isFinite()",
    "title": "Fehlersuche: 12abc gilt als gültige Zahl",
    "description": "parseInt liest einen Präfix; Number prüft die gesamte Zeichenfolge.",
    "syntax": "Number() + isFinite()",
    "parts": [
      [
        "Number() + isFinite()",
        "parseInt liest einen Präfix; Number prüft die gesamte Zeichenfolge."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist Text. Leerer oder nur aus Leerzeichen bestehender Text sowie ungültige oder unendliche Zahlen ergeben null. Sonst liefere den gesamten Zahlenwert.",
    "task": "daten ist Text. Leerer oder nur aus Leerzeichen bestehender Text sowie ungültige oder unendliche Zahlen ergeben null. Sonst liefere den gesamten Zahlenwert.",
    "functionName": "repairParse",
    "parameter": "daten",
    "starter": "function repairParse(daten) {\n  return parseInt(daten,10)||null;\n}",
    "solution": "function repairParse(daten) {\n  if(!daten.trim())return null; const n=Number(daten); return Number.isFinite(n)?n:null;\n}",
    "example": "function repairParse(daten) {\n  if(!daten.trim())return null; const n=Number(daten); return Number.isFinite(n)?n:null;\n}\n\nconsole.log(repairParse(\"0\"));",
    "tests": [
      {
        "input": "0",
        "expected": 0
      },
      {
        "input": "12abc",
        "expected": null
      },
      {
        "input": " 2.5 ",
        "expected": 2.5
      },
      {
        "input": "",
        "expected": null
      },
      {
        "input": "Infinity",
        "expected": null
      },
      {
        "input": "-3",
        "expected": -3
      }
    ],
    "preserveInput": true,
    "hints": [
      "0 ist ein erlaubtes Ergebnis.",
      "parseInt bricht am ersten ungültigen Zeichen ab.",
      "Prüfe den nichtleeren Text und konvertiere vollständig mit Number."
    ],
    "explanation": "parseInt liest einen Präfix; Number prüft die gesamte Zeichenfolge. Prüfe den nichtleeren Text und konvertiere vollständig mit Number.",
    "debugging": {
      "symptom": "daten ist Text. Leerer oder nur aus Leerzeichen bestehender Text sowie ungültige oder unendliche Zahlen ergeben null. Sonst liefere den gesamten Zahlenwert.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-branch",
    "course": "js",
    "category": "Fehlersuche",
    "name": "Bedingungen ordnen",
    "title": "Fehlersuche: Gold wird zu Silber",
    "description": "Die erste passende Bedingung beendet den Ablauf.",
    "syntax": "Bedingungen ordnen",
    "parts": [
      [
        "Bedingungen ordnen",
        "Die erste passende Bedingung beendet den Ablauf."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Gib Gold ab 80 Punkten, Silber ab 50, sonst Bronze zurück.",
    "task": "Gib Gold ab 80 Punkten, Silber ab 50, sonst Bronze zurück.",
    "functionName": "repairBranch",
    "parameter": "daten",
    "starter": "function repairBranch(daten) {\n  if(daten>=50)return \"Silber\"; if(daten>=80)return \"Gold\"; return \"Bronze\";\n}",
    "solution": "function repairBranch(daten) {\n  if(daten>=80)return \"Gold\"; if(daten>=50)return \"Silber\"; return \"Bronze\";\n}",
    "example": "function repairBranch(daten) {\n  if(daten>=80)return \"Gold\"; if(daten>=50)return \"Silber\"; return \"Bronze\";\n}\n\nconsole.log(repairBranch(80));",
    "tests": [
      {
        "input": 80,
        "expected": "Gold"
      },
      {
        "input": 100,
        "expected": "Gold"
      },
      {
        "input": 50,
        "expected": "Silber"
      },
      {
        "input": 49,
        "expected": "Bronze"
      },
      {
        "input": 0,
        "expected": "Bronze"
      }
    ],
    "preserveInput": true,
    "hints": [
      "80 erfüllt auch >= 50.",
      "Teste die exakten Grenzen.",
      "Prüfe die engere höchste Grenze zuerst."
    ],
    "explanation": "Die erste passende Bedingung beendet den Ablauf. Prüfe die engere höchste Grenze zuerst.",
    "debugging": {
      "symptom": "Gib Gold ab 80 Punkten, Silber ab 50, sonst Bronze zurück.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-delete",
    "course": "js",
    "category": "Fehlersuche",
    "name": "filter() statt splice()",
    "title": "Fehlersuche: Löschen überspringt Nachbarn",
    "description": "splice verschiebt beim Löschen die nachfolgenden Indizes.",
    "syntax": "filter() statt splice()",
    "parts": [
      [
        "filter() statt splice()",
        "splice verschiebt beim Löschen die nachfolgenden Indizes."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Entferne alle Zahlen 0 aus daten; erhalte Reihenfolge und andere Werte.",
    "task": "Entferne alle Zahlen 0 aus daten; erhalte Reihenfolge und andere Werte.",
    "functionName": "repairDelete",
    "parameter": "daten",
    "starter": "function repairDelete(daten) {\n  const kopie=[...daten]; for(let i=0;i<kopie.length;i++)if(kopie[i]===0)kopie.splice(i,1); return kopie;\n}",
    "solution": "function repairDelete(daten) {\n  return daten.filter(wert=>wert!==0);\n}",
    "example": "function repairDelete(daten) {\n  return daten.filter(wert=>wert!==0);\n}\n\nconsole.log(repairDelete([0, 0, 1]));",
    "tests": [
      {
        "input": [
          0,
          0,
          1
        ],
        "expected": [
          1
        ]
      },
      {
        "input": [
          1,
          0,
          0,
          2
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          0,
          0
        ],
        "expected": []
      },
      {
        "input": [
          -1,
          2
        ],
        "expected": [
          -1,
          2
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Was passiert nach zwei benachbarten Nullen?",
      "Die Indexverschiebung überspringt ein Element.",
      "filter baut eine neue Auswahl ohne Indexverschiebung."
    ],
    "explanation": "splice verschiebt beim Löschen die nachfolgenden Indizes. filter baut eine neue Auswahl ohne Indexverschiebung.",
    "debugging": {
      "symptom": "Entferne alle Zahlen 0 aus daten; erhalte Reihenfolge und andere Werte.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-regex",
    "course": "js",
    "category": "Fehlersuche",
    "name": "RegExp.lastIndex",
    "title": "Fehlersuche: Derselbe Regex liefert wechselnde Antworten",
    "description": "Ein globaler Regex merkt sich lastIndex.",
    "syntax": "RegExp.lastIndex",
    "parts": [
      [
        "RegExp.lastIndex",
        "Ein globaler Regex merkt sich lastIndex."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Gib für jeden Text in daten zurück, ob er mindestens eine Ziffer enthält.",
    "task": "Gib für jeden Text in daten zurück, ob er mindestens eine Ziffer enthält.",
    "functionName": "repairRegex",
    "parameter": "daten",
    "starter": "function repairRegex(daten) {\n  const re=/\\d/g; return daten.map(text=>re.test(text));\n}",
    "solution": "function repairRegex(daten) {\n  const re=/\\d/; return daten.map(text=>re.test(text));\n}",
    "example": "function repairRegex(daten) {\n  const re=/\\d/; return daten.map(text=>re.test(text));\n}\n\nconsole.log(repairRegex([\"1\", \"2\", \"3\"]));",
    "tests": [
      {
        "input": [
          "1",
          "2",
          "3"
        ],
        "expected": [
          true,
          true,
          true
        ]
      },
      {
        "input": [
          "abc",
          "a1",
          "x"
        ],
        "expected": [
          false,
          true,
          false
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          "12",
          "12"
        ],
        "expected": [
          true,
          true
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Teste mehrere kurze Treffer hintereinander.",
      "g verwaltet einen Suchindex.",
      "Für eine reine Existenzprüfung brauchst du keinen globalen Regex."
    ],
    "explanation": "Ein globaler Regex merkt sich lastIndex. Für eine reine Existenzprüfung brauchst du keinen globalen Regex.",
    "debugging": {
      "symptom": "Gib für jeden Text in daten zurück, ob er mindestens eine Ziffer enthält.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-finally",
    "course": "js",
    "category": "Fehlersuche",
    "name": "finally ohne return",
    "title": "Fehlersuche: finally überschreibt die Rückgabe",
    "description": "Ein return in finally ersetzt sogar einen erfolgreichen return aus try.",
    "syntax": "finally ohne return",
    "parts": [
      [
        "finally ohne return",
        "Ein return in finally ersetzt sogar einen erfolgreichen return aus try."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Parse JSON-Text daten; gib {ok:true,wert} bei gültigem JSON und {ok:false,wert:null} sonst zurück.",
    "task": "Parse JSON-Text daten; gib {ok:true,wert} bei gültigem JSON und {ok:false,wert:null} sonst zurück.",
    "functionName": "repairFinally",
    "parameter": "daten",
    "starter": "function repairFinally(daten) {\n  try{return {ok:true,wert:JSON.parse(daten)}}catch{return {ok:false,wert:null}}finally{return {ok:false,wert:null}}\n}",
    "solution": "function repairFinally(daten) {\n  try{return {ok:true,wert:JSON.parse(daten)}}catch{return {ok:false,wert:null}}\n}",
    "example": "function repairFinally(daten) {\n  try{return {ok:true,wert:JSON.parse(daten)}}catch{return {ok:false,wert:null}}\n}\n\nconsole.log(repairFinally(\"0\"));",
    "tests": [
      {
        "input": "0",
        "expected": {
          "ok": true,
          "wert": 0
        }
      },
      {
        "input": "false",
        "expected": {
          "ok": true,
          "wert": false
        }
      },
      {
        "input": "null",
        "expected": {
          "ok": true,
          "wert": null
        }
      },
      {
        "input": "{bad",
        "expected": {
          "ok": false,
          "wert": null
        }
      },
      {
        "input": "[1]",
        "expected": {
          "ok": true,
          "wert": [
            1
          ]
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Welcher Block läuft immer zuletzt?",
      "finally dient dem Aufräumen.",
      "Eine Rückgabe im finally verdrängt die Rückgabe aus try und catch."
    ],
    "explanation": "Ein return in finally ersetzt sogar einen erfolgreichen return aus try. Eine Rückgabe im finally verdrängt die Rückgabe aus try und catch.",
    "debugging": {
      "symptom": "Parse JSON-Text daten; gib {ok:true,wert} bei gültigem JSON und {ok:false,wert:null} sonst zurück.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-queue",
    "course": "js",
    "category": "Fehlersuche",
    "name": "FIFO mit shift()",
    "title": "Fehlersuche: Eine Warteschlange arbeitet rückwärts",
    "description": "pop entnimmt das letzte Element; shift das erste.",
    "syntax": "FIFO mit shift()",
    "parts": [
      [
        "FIFO mit shift()",
        "pop entnimmt das letzte Element; shift das erste."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {wartend,anzahl}. Entnimm bis zu anzahl Elemente in FIFO-Reihenfolge und gib {bearbeitet,rest} zurück.",
    "task": "daten ist {wartend,anzahl}. Entnimm bis zu anzahl Elemente in FIFO-Reihenfolge und gib {bearbeitet,rest} zurück.",
    "functionName": "repairQueue",
    "parameter": "daten",
    "starter": "function repairQueue(daten) {\n  const rest=[...daten.wartend],bearbeitet=[]; for(let i=0;i<daten.anzahl&&rest.length;i++)bearbeitet.push(rest.pop());return {bearbeitet,rest};\n}",
    "solution": "function repairQueue(daten) {\n  const rest=[...daten.wartend],bearbeitet=[]; for(let i=0;i<daten.anzahl&&rest.length;i++)bearbeitet.push(rest.shift());return {bearbeitet,rest};\n}",
    "example": "function repairQueue(daten) {\n  const rest=[...daten.wartend],bearbeitet=[]; for(let i=0;i<daten.anzahl&&rest.length;i++)bearbeitet.push(rest.shift());return {bearbeitet,rest};\n}\n\nconsole.log(repairQueue({\"wartend\": [\"A\", \"B\", \"C\"], \"anzahl\": 2}));",
    "tests": [
      {
        "input": {
          "wartend": [
            "A",
            "B",
            "C"
          ],
          "anzahl": 2
        },
        "expected": {
          "bearbeitet": [
            "A",
            "B"
          ],
          "rest": [
            "C"
          ]
        }
      },
      {
        "input": {
          "wartend": [],
          "anzahl": 2
        },
        "expected": {
          "bearbeitet": [],
          "rest": []
        }
      },
      {
        "input": {
          "wartend": [
            0,
            false
          ],
          "anzahl": 5
        },
        "expected": {
          "bearbeitet": [
            0,
            false
          ],
          "rest": []
        }
      },
      {
        "input": {
          "wartend": [
            1
          ],
          "anzahl": 0
        },
        "expected": {
          "bearbeitet": [],
          "rest": [
            1
          ]
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Unterscheide Stack und Queue.",
      "Teste A, B und C gemeinsam.",
      "FIFO arbeitet zuerst eingetroffene Elemente zuerst ab."
    ],
    "explanation": "pop entnimmt das letzte Element; shift das erste. FIFO arbeitet zuerst eingetroffene Elemente zuerst ab.",
    "debugging": {
      "symptom": "daten ist {wartend,anzahl}. Entnimm bis zu anzahl Elemente in FIFO-Reihenfolge und gib {bearbeitet,rest} zurück.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-money",
    "course": "js",
    "category": "Fehlersuche",
    "name": "Math.round(euro * 100)",
    "title": "Fehlersuche: Geldbeträge addieren ungenau",
    "description": "Für die hier erlaubten Centbeträge werden Werte einzeln in ganze Cents umgerechnet.",
    "syntax": "Math.round(euro * 100)",
    "parts": [
      [
        "Math.round(euro * 100)",
        "Für die hier erlaubten Centbeträge werden Werte einzeln in ganze Cents umgerechnet."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten enthält nichtnegative Europreise mit höchstens zwei Nachkommastellen. Gib ihre Summe in ganzen Cents zurück.",
    "task": "daten enthält nichtnegative Europreise mit höchstens zwei Nachkommastellen. Gib ihre Summe in ganzen Cents zurück.",
    "functionName": "repairMoney",
    "parameter": "daten",
    "starter": "function repairMoney(daten) {\n  return daten.reduce((a,b)=>a+b,0)*100;\n}",
    "solution": "function repairMoney(daten) {\n  return daten.reduce((cents,preis)=>cents+Math.round(preis*100),0);\n}",
    "example": "function repairMoney(daten) {\n  return daten.reduce((cents,preis)=>cents+Math.round(preis*100),0);\n}\n\nconsole.log(repairMoney([0.1, 0.2]));",
    "tests": [
      {
        "input": [
          0.1,
          0.2
        ],
        "expected": 30
      },
      {
        "input": [
          1.01,
          2.02
        ],
        "expected": 303
      },
      {
        "input": [],
        "expected": 0
      },
      {
        "input": [
          0.29
        ],
        "expected": 29
      },
      {
        "input": [
          2,
          0
        ],
        "expected": 200
      }
    ],
    "preserveInput": true,
    "hints": [
      "0.1 + 0.2 ist binär nicht exakt.",
      "Rechne pro Preis in Cents um.",
      "Ganzzahlige Centbeträge vermeiden die Addition ungenauer Eurobrüche."
    ],
    "explanation": "Für die hier erlaubten Centbeträge werden Werte einzeln in ganze Cents umgerechnet. Ganzzahlige Centbeträge vermeiden die Addition ungenauer Eurobrüche.",
    "debugging": {
      "symptom": "daten enthält nichtnegative Europreise mit höchstens zwei Nachkommastellen. Gib ihre Summe in ganzen Cents zurück.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-truth-filter",
    "course": "js",
    "category": "Fehlersuche",
    "name": "wert != null",
    "title": "Fehlersuche: Ein Filter entfernt gültige Nullwerte",
    "description": "filter(Boolean) entfernt alle falschen Werte.",
    "syntax": "wert != null",
    "parts": [
      [
        "wert != null",
        "filter(Boolean) entfernt alle falschen Werte."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "Entferne aus daten nur null; erhalte 0, false und leere Strings.",
    "task": "Entferne aus daten nur null; erhalte 0, false und leere Strings.",
    "functionName": "repairTruthFilter",
    "parameter": "daten",
    "starter": "function repairTruthFilter(daten) {\n  return daten.filter(Boolean);\n}",
    "solution": "function repairTruthFilter(daten) {\n  return daten.filter(wert=>wert!==null);\n}",
    "example": "function repairTruthFilter(daten) {\n  return daten.filter(wert=>wert!==null);\n}\n\nconsole.log(repairTruthFilter([0, false, \"\", null]));",
    "tests": [
      {
        "input": [
          0,
          false,
          "",
          null
        ],
        "expected": [
          0,
          false,
          ""
        ]
      },
      {
        "input": [
          null,
          null
        ],
        "expected": []
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          1,
          "a"
        ],
        "expected": [
          1,
          "a"
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Teste null und 0 gemeinsam.",
      "Boolean prüft nicht den Typ.",
      "Vergleiche ausdrücklich mit dem Wert, den du entfernen willst."
    ],
    "explanation": "filter(Boolean) entfernt alle falschen Werte. Vergleiche ausdrücklich mit dem Wert, den du entfernen willst.",
    "debugging": {
      "symptom": "Entferne aus daten nur null; erhalte 0, false und leere Strings.",
      "strategy": "Führe den fehlerhaften Startcode zuerst aus. Suche einen scheiternden Test, erkläre die Ursache und repariere die kleinste passende Stelle."
    }
  },
  {
    "id": "js-practice-flashcards",
    "course": "js",
    "category": "Projektbausteine",
    "name": "filter + sort + ??",
    "title": "Projektbaustein: Die nächste Lernkarte auswählen",
    "description": "Filtern, sortieren und ein stabiler Gleichstand entscheiden über die nächste Karte.",
    "syntax": "filter + sort + ??",
    "parts": [
      [
        "filter + sort + ??",
        "Filtern, sortieren und ein stabiler Gleichstand entscheiden über die nächste Karte."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {karten:[{id,faellig}],jetzt}. Wähle die fällige Karte mit dem kleinsten faellig; bei Gleichstand die lexikografisch kleinste id. Keine fällige Karte ergibt null.",
    "task": "daten ist {karten:[{id,faellig}],jetzt}. Wähle die fällige Karte mit dem kleinsten faellig; bei Gleichstand die lexikografisch kleinste id. Keine fällige Karte ergibt null.",
    "functionName": "repairFlashcards",
    "parameter": "daten",
    "starter": "function repairFlashcards(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairFlashcards(daten) {\n  return daten.karten.filter(k=>k.faellig<=daten.jetzt).sort((a,b)=>a.faellig-b.faellig || (a.id<b.id?-1:a.id>b.id?1:0))[0]?.id ?? null;\n}",
    "example": "function repairFlashcards(daten) {\n  return daten.karten.filter(k=>k.faellig<=daten.jetzt).sort((a,b)=>a.faellig-b.faellig || (a.id<b.id?-1:a.id>b.id?1:0))[0]?.id ?? null;\n}\n\nconsole.log(repairFlashcards({\"karten\": [], \"jetzt\": 0}));",
    "tests": [
      {
        "input": {
          "karten": [],
          "jetzt": 0
        },
        "expected": null
      },
      {
        "input": {
          "karten": [
            {
              "id": "a",
              "faellig": 2
            }
          ],
          "jetzt": 1
        },
        "expected": null
      },
      {
        "input": {
          "karten": [
            {
              "id": "b",
              "faellig": 1
            },
            {
              "id": "a",
              "faellig": 1
            }
          ],
          "jetzt": 1
        },
        "expected": "a"
      },
      {
        "input": {
          "karten": [
            {
              "id": "a",
              "faellig": 2
            },
            {
              "id": "b",
              "faellig": 0
            }
          ],
          "jetzt": 2
        },
        "expected": "b"
      }
    ],
    "preserveInput": true,
    "hints": [
      "Fälligkeit ist inklusiv.",
      "Sortiere nur die gefilterte Kopie.",
      "Definiere den Gleichstand ausdrücklich, damit die Auswahl reproduzierbar ist."
    ],
    "explanation": "Filtern, sortieren und ein stabiler Gleichstand entscheiden über die nächste Karte. Definiere den Gleichstand ausdrücklich, damit die Auswahl reproduzierbar ist."
  },
  {
    "id": "js-practice-review-plan",
    "course": "js",
    "category": "Projektbausteine",
    "name": "Array als Intervalltabelle",
    "title": "Projektbaustein: Wiederholung nach einer Antwort planen",
    "description": "Erfolg verlängert den Abstand, ein Fehler setzt die Erfolgsserie zurück.",
    "syntax": "Array als Intervalltabelle",
    "parts": [
      [
        "Array als Intervalltabelle",
        "Erfolg verlängert den Abstand, ein Fehler setzt die Erfolgsserie zurück."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {serie,richtig,tag}. Bei richtig erhöhe serie und plane nach 1, 3, 7 oder 14 Tagen (ab vier Erfolgen immer 14). Bei falsch wird serie 0 und faellig bleibt tag. Gib {serie,faellig} zurück.",
    "task": "daten ist {serie,richtig,tag}. Bei richtig erhöhe serie und plane nach 1, 3, 7 oder 14 Tagen (ab vier Erfolgen immer 14). Bei falsch wird serie 0 und faellig bleibt tag. Gib {serie,faellig} zurück.",
    "functionName": "repairReviewPlan",
    "parameter": "daten",
    "starter": "function repairReviewPlan(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairReviewPlan(daten) {\n  const serie=daten.richtig?daten.serie+1:0;const tage=daten.richtig?[1,3,7,14][Math.min(serie-1,3)]:0;return {serie,faellig:daten.tag+tage};\n}",
    "example": "function repairReviewPlan(daten) {\n  const serie=daten.richtig?daten.serie+1:0;const tage=daten.richtig?[1,3,7,14][Math.min(serie-1,3)]:0;return {serie,faellig:daten.tag+tage};\n}\n\nconsole.log(repairReviewPlan({\"serie\": 0, \"richtig\": true, \"tag\": 0}));",
    "tests": [
      {
        "input": {
          "serie": 0,
          "richtig": true,
          "tag": 0
        },
        "expected": {
          "serie": 1,
          "faellig": 1
        }
      },
      {
        "input": {
          "serie": 1,
          "richtig": true,
          "tag": 4
        },
        "expected": {
          "serie": 2,
          "faellig": 7
        }
      },
      {
        "input": {
          "serie": 3,
          "richtig": false,
          "tag": 5
        },
        "expected": {
          "serie": 0,
          "faellig": 5
        }
      },
      {
        "input": {
          "serie": 8,
          "richtig": true,
          "tag": 1
        },
        "expected": {
          "serie": 9,
          "faellig": 15
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Die Tabelle startet beim ersten Erfolg mit Index 0.",
      "Begrenze nur den Tabellenindex.",
      "Ein Fehler setzt die Serie zurück; die Aufgabe bleibt sofort fällig."
    ],
    "explanation": "Erfolg verlängert den Abstand, ein Fehler setzt die Erfolgsserie zurück. Ein Fehler setzt die Serie zurück; die Aufgabe bleibt sofort fällig."
  },
  {
    "id": "js-practice-inventory",
    "course": "js",
    "category": "Projektbausteine",
    "name": "some + map",
    "title": "Projektbaustein: Einen Lagerverkauf buchen",
    "description": "Validierung und unveränderliche Zustandsänderung bilden eine Transaktion.",
    "syntax": "some + map",
    "parts": [
      [
        "some + map",
        "Validierung und unveränderliche Zustandsänderung bilden eine Transaktion."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {artikel:[{id,bestand}],id,menge}. Menge muss eine positive ganze Zahl sein und der Artikel genug Bestand haben. Sonst gib {ok:false,artikel:urspruenglicheArtikel} zurück. Bei Erfolg ziehe die Menge nur vom passenden Artikel ab.",
    "task": "daten ist {artikel:[{id,bestand}],id,menge}. Menge muss eine positive ganze Zahl sein und der Artikel genug Bestand haben. Sonst gib {ok:false,artikel:urspruenglicheArtikel} zurück. Bei Erfolg ziehe die Menge nur vom passenden Artikel ab.",
    "functionName": "repairInventory",
    "parameter": "daten",
    "starter": "function repairInventory(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairInventory(daten) {\n  const a=daten.artikel.find(a=>a.id===daten.id);const ok=Number.isInteger(daten.menge)&&daten.menge>0&&!!a&&a.bestand>=daten.menge;return {ok,artikel:ok?daten.artikel.map(a=>a.id===daten.id?{...a,bestand:a.bestand-daten.menge}:a):daten.artikel};\n}",
    "example": "function repairInventory(daten) {\n  const a=daten.artikel.find(a=>a.id===daten.id);const ok=Number.isInteger(daten.menge)&&daten.menge>0&&!!a&&a.bestand>=daten.menge;return {ok,artikel:ok?daten.artikel.map(a=>a.id===daten.id?{...a,bestand:a.bestand-daten.menge}:a):daten.artikel};\n}\n\nconsole.log(repairInventory({\"artikel\": [{\"id\": \"a\", \"bestand\": 2}], \"id\": \"a\", \"menge\": 2}));",
    "tests": [
      {
        "input": {
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ],
          "id": "a",
          "menge": 2
        },
        "expected": {
          "ok": true,
          "artikel": [
            {
              "id": "a",
              "bestand": 0
            }
          ]
        }
      },
      {
        "input": {
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ],
          "id": "a",
          "menge": 3
        },
        "expected": {
          "ok": false,
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ]
        }
      },
      {
        "input": {
          "artikel": [],
          "id": "a",
          "menge": 1
        },
        "expected": {
          "ok": false,
          "artikel": []
        }
      },
      {
        "input": {
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ],
          "id": "a",
          "menge": -1
        },
        "expected": {
          "ok": false,
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ]
        }
      },
      {
        "input": {
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ],
          "id": "a",
          "menge": 0.5
        },
        "expected": {
          "ok": false,
          "artikel": [
            {
              "id": "a",
              "bestand": 2
            }
          ]
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Validiere vor jeder Änderung.",
      "Exakt der gesamte Bestand darf verkauft werden.",
      "Eine abgelehnte Buchung darf keine Teiländerung hinterlassen."
    ],
    "explanation": "Validierung und unveränderliche Zustandsänderung bilden eine Transaktion. Eine abgelehnte Buchung darf keine Teiländerung hinterlassen."
  },
  {
    "id": "js-practice-stock-value",
    "course": "js",
    "category": "Projektbausteine",
    "name": "reduce() für Gesamtwert",
    "title": "Projektbaustein: Den Lagerwert in Cents berechnen",
    "description": "reduce kombiniert Menge und Stückpreis ohne zusätzliche Rundung.",
    "syntax": "reduce() für Gesamtwert",
    "parts": [
      [
        "reduce() für Gesamtwert",
        "reduce kombiniert Menge und Stückpreis ohne zusätzliche Rundung."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist eine Liste {bestand,preisCents} mit nichtnegativen ganzen Zahlen. Gib den gesamten Wert in Cents zurück.",
    "task": "daten ist eine Liste {bestand,preisCents} mit nichtnegativen ganzen Zahlen. Gib den gesamten Wert in Cents zurück.",
    "functionName": "repairStockValue",
    "parameter": "daten",
    "starter": "function repairStockValue(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairStockValue(daten) {\n  return daten.reduce((summe,a)=>summe+a.bestand*a.preisCents,0);\n}",
    "example": "function repairStockValue(daten) {\n  return daten.reduce((summe,a)=>summe+a.bestand*a.preisCents,0);\n}\n\nconsole.log(repairStockValue([]));",
    "tests": [
      {
        "input": [],
        "expected": 0
      },
      {
        "input": [
          {
            "bestand": 2,
            "preisCents": 150
          },
          {
            "bestand": 3,
            "preisCents": 20
          }
        ],
        "expected": 360
      },
      {
        "input": [
          {
            "bestand": 0,
            "preisCents": 100
          }
        ],
        "expected": 0
      },
      {
        "input": [
          {
            "bestand": 5,
            "preisCents": 0
          }
        ],
        "expected": 0
      }
    ],
    "preserveInput": true,
    "hints": [
      "Multipliziere Bestand und Preis pro Zeile.",
      "Der Startwert ist 0.",
      "Die Summe verwendet ganze Cents statt Eurobrüche."
    ],
    "explanation": "reduce kombiniert Menge und Stückpreis ohne zusätzliche Rundung. Die Summe verwendet ganze Cents statt Eurobrüche."
  },
  {
    "id": "js-practice-maze-move",
    "course": "js",
    "category": "Projektbausteine",
    "name": "Raster[y][x]",
    "title": "Projektbaustein: Im Raster gegen Wände prüfen",
    "description": "Ein Spielzug ist erst nach Grenzen- und Kollisionsprüfung gültig.",
    "syntax": "Raster[y][x]",
    "parts": [
      [
        "Raster[y][x]",
        "Ein Spielzug ist erst nach Grenzen- und Kollisionsprüfung gültig."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {raster,position:{x,y},richtung}; das rechteckige Raster enthält . und #. Richtungen sind links/rechts/oben/unten. Unbekannte Richtung, Wand oder Außenrand lassen die Position unverändert.",
    "task": "daten ist {raster,position:{x,y},richtung}; das rechteckige Raster enthält . und #. Richtungen sind links/rechts/oben/unten. Unbekannte Richtung, Wand oder Außenrand lassen die Position unverändert.",
    "functionName": "repairMazeMove",
    "parameter": "daten",
    "starter": "function repairMazeMove(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairMazeMove(daten) {\n  const delta={links:[-1,0],rechts:[1,0],oben:[0,-1],unten:[0,1]};if(!Object.hasOwn(delta,daten.richtung))return {...daten.position};const [dx,dy]=delta[daten.richtung];const x=daten.position.x+dx,y=daten.position.y+dy;if(y<0||y>=daten.raster.length||x<0||x>=daten.raster[y].length||daten.raster[y][x]===\"#\")return {...daten.position};return {x,y};\n}",
    "example": "function repairMazeMove(daten) {\n  const delta={links:[-1,0],rechts:[1,0],oben:[0,-1],unten:[0,1]};if(!Object.hasOwn(delta,daten.richtung))return {...daten.position};const [dx,dy]=delta[daten.richtung];const x=daten.position.x+dx,y=daten.position.y+dy;if(y<0||y>=daten.raster.length||x<0||x>=daten.raster[y].length||daten.raster[y][x]===\"#\")return {...daten.position};return {x,y};\n}\n\nconsole.log(repairMazeMove({\"raster\": [\"..\", \".#\"], \"position\": {\"x\": 0, \"y\": 0}, \"richtung\": \"rechts\"}));",
    "tests": [
      {
        "input": {
          "raster": [
            "..",
            ".#"
          ],
          "position": {
            "x": 0,
            "y": 0
          },
          "richtung": "rechts"
        },
        "expected": {
          "x": 1,
          "y": 0
        }
      },
      {
        "input": {
          "raster": [
            "..",
            ".#"
          ],
          "position": {
            "x": 1,
            "y": 0
          },
          "richtung": "unten"
        },
        "expected": {
          "x": 1,
          "y": 0
        }
      },
      {
        "input": {
          "raster": [
            "."
          ],
          "position": {
            "x": 0,
            "y": 0
          },
          "richtung": "oben"
        },
        "expected": {
          "x": 0,
          "y": 0
        }
      },
      {
        "input": {
          "raster": [
            "."
          ],
          "position": {
            "x": 0,
            "y": 0
          },
          "richtung": "toString"
        },
        "expected": {
          "x": 0,
          "y": 0
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Prüfe zuerst die gültige Richtung.",
      "Zeile y kommt vor Spalte x.",
      "Nur ein freies Feld innerhalb des Rasters erlaubt die Änderung."
    ],
    "explanation": "Ein Spielzug ist erst nach Grenzen- und Kollisionsprüfung gültig. Nur ein freies Feld innerhalb des Rasters erlaubt die Änderung."
  },
  {
    "id": "js-practice-maze-key",
    "course": "js",
    "category": "Projektbausteine",
    "name": "immutable Spielzustand",
    "title": "Projektbaustein: Schlüssel und Ausgang verbinden",
    "description": "Der nächste Zustand hängt vom bisherigen Inventar und dem betretenen Feld ab.",
    "syntax": "immutable Spielzustand",
    "parts": [
      [
        "immutable Spielzustand",
        "Der nächste Zustand hängt vom bisherigen Inventar und dem betretenen Feld ab."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {schluessel,gewonnen,feld}. Ein bereits gewonnenes Spiel bleibt unverändert. K gibt einen Schlüssel; E gewinnt nur mit vorhandenem Schlüssel; andere Felder ändern nichts. Gib nur {schluessel,gewonnen} zurück.",
    "task": "daten ist {schluessel,gewonnen,feld}. Ein bereits gewonnenes Spiel bleibt unverändert. K gibt einen Schlüssel; E gewinnt nur mit vorhandenem Schlüssel; andere Felder ändern nichts. Gib nur {schluessel,gewonnen} zurück.",
    "functionName": "repairMazeKey",
    "parameter": "daten",
    "starter": "function repairMazeKey(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairMazeKey(daten) {\n  if(daten.gewonnen)return {schluessel:daten.schluessel,gewonnen:true};const schluessel=daten.schluessel||daten.feld===\"K\";return {schluessel,gewonnen:schluessel&&daten.feld===\"E\"};\n}",
    "example": "function repairMazeKey(daten) {\n  if(daten.gewonnen)return {schluessel:daten.schluessel,gewonnen:true};const schluessel=daten.schluessel||daten.feld===\"K\";return {schluessel,gewonnen:schluessel&&daten.feld===\"E\"};\n}\n\nconsole.log(repairMazeKey({\"schluessel\": false, \"gewonnen\": false, \"feld\": \"K\"}));",
    "tests": [
      {
        "input": {
          "schluessel": false,
          "gewonnen": false,
          "feld": "K"
        },
        "expected": {
          "schluessel": true,
          "gewonnen": false
        }
      },
      {
        "input": {
          "schluessel": false,
          "gewonnen": false,
          "feld": "E"
        },
        "expected": {
          "schluessel": false,
          "gewonnen": false
        }
      },
      {
        "input": {
          "schluessel": true,
          "gewonnen": false,
          "feld": "E"
        },
        "expected": {
          "schluessel": true,
          "gewonnen": true
        }
      },
      {
        "input": {
          "schluessel": true,
          "gewonnen": true,
          "feld": "."
        },
        "expected": {
          "schluessel": true,
          "gewonnen": true
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Ein Ausgang ohne Schlüssel ist kein Sieg.",
      "Bewahre den Schlüssel über mehrere Züge.",
      "Trenne Feldwirkung und Bewegung, damit beide einzeln testbar sind."
    ],
    "explanation": "Der nächste Zustand hängt vom bisherigen Inventar und dem betretenen Feld ab. Trenne Feldwirkung und Bewegung, damit beide einzeln testbar sind."
  },
  {
    "id": "js-practice-save-version",
    "course": "js",
    "category": "Projektbausteine",
    "name": "try/catch + Schema",
    "title": "Projektbaustein: Einen Speicherstand sicher laden",
    "description": "JSON.parse prüft Syntax, danach muss das Schema geprüft werden.",
    "syntax": "try/catch + Schema",
    "parts": [
      [
        "try/catch + Schema",
        "JSON.parse prüft Syntax, danach muss das Schema geprüft werden."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist JSON-Text. Akzeptiere genau version:1, einen ganzzahligen nichtnegativen punkte-Wert und einen String name. Gib {version:1,punkte,name} zurück; Zusatzfelder werden ignoriert. Sonst null.",
    "task": "daten ist JSON-Text. Akzeptiere genau version:1, einen ganzzahligen nichtnegativen punkte-Wert und einen String name. Gib {version:1,punkte,name} zurück; Zusatzfelder werden ignoriert. Sonst null.",
    "functionName": "repairSaveVersion",
    "parameter": "daten",
    "starter": "function repairSaveVersion(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairSaveVersion(daten) {\n  try{const s=JSON.parse(daten);if(!s||s.version!==1||!Number.isSafeInteger(s.punkte)||s.punkte<0||typeof s.name!==\"string\")return null;return {version:1,punkte:s.punkte,name:s.name};}catch{return null;}\n}",
    "example": "function repairSaveVersion(daten) {\n  try{const s=JSON.parse(daten);if(!s||s.version!==1||!Number.isSafeInteger(s.punkte)||s.punkte<0||typeof s.name!==\"string\")return null;return {version:1,punkte:s.punkte,name:s.name};}catch{return null;}\n}\n\nconsole.log(repairSaveVersion(\"bad\"));",
    "tests": [
      {
        "input": "bad",
        "expected": null
      },
      {
        "input": "null",
        "expected": null
      },
      {
        "input": "{\"version\":1,\"punkte\":0,\"name\":\"\"}",
        "expected": {
          "version": 1,
          "punkte": 0,
          "name": ""
        }
      },
      {
        "input": "{\"version\":2,\"punkte\":1,\"name\":\"Ada\"}",
        "expected": null
      },
      {
        "input": "{\"version\":1,\"punkte\":-1,\"name\":\"A\"}",
        "expected": null
      },
      {
        "input": "{\"version\":1,\"punkte\":2,\"name\":\"A\",\"extra\":true}",
        "expected": {
          "version": 1,
          "punkte": 2,
          "name": "A"
        }
      }
    ],
    "preserveInput": true,
    "hints": [
      "Gültiges JSON ist nicht automatisch ein gültiger Speicherstand.",
      "Prüfe alle benötigten Typen und Grenzen.",
      "Gib ein neues Objekt mit genau den erlaubten Feldern zurück."
    ],
    "explanation": "JSON.parse prüft Syntax, danach muss das Schema geprüft werden. Gib ein neues Objekt mit genau den erlaubten Feldern zurück."
  },
  {
    "id": "js-practice-leaderboard",
    "course": "js",
    "category": "Projektbausteine",
    "name": "sort + slice",
    "title": "Projektbaustein: Eine Rangliste stabil sortieren",
    "description": "Eine Rangliste braucht eine Regel für Gleichstände und einen klaren Grenzwert.",
    "syntax": "sort + slice",
    "parts": [
      [
        "sort + slice",
        "Eine Rangliste braucht eine Regel für Gleichstände und einen klaren Grenzwert."
      ],
      [
        "Randfälle",
        "Leere Eingaben, Null und falsche Werte gehören zum Vertrag."
      ]
    ],
    "note": "Die Aufgabe verwendet lokale Daten. Prüfe die Gegenbeispiele und verändere die Eingabe nicht.",
    "detail": "daten ist {spieler:[{name,punkte}],limit}, limit ist eine nichtnegative ganze Zahl. Sortiere nach Punkten absteigend, dann Name lexikografisch aufsteigend und gib höchstens limit Einträge zurück.",
    "task": "daten ist {spieler:[{name,punkte}],limit}, limit ist eine nichtnegative ganze Zahl. Sortiere nach Punkten absteigend, dann Name lexikografisch aufsteigend und gib höchstens limit Einträge zurück.",
    "functionName": "repairLeaderboard",
    "parameter": "daten",
    "starter": "function repairLeaderboard(daten) {\n  // TODO: Baue den beschriebenen Projektbaustein.\n  return null;\n}",
    "solution": "function repairLeaderboard(daten) {\n  return [...daten.spieler].sort((a,b)=>b.punkte-a.punkte||(a.name<b.name?-1:a.name>b.name?1:0)).slice(0,daten.limit);\n}",
    "example": "function repairLeaderboard(daten) {\n  return [...daten.spieler].sort((a,b)=>b.punkte-a.punkte||(a.name<b.name?-1:a.name>b.name?1:0)).slice(0,daten.limit);\n}\n\nconsole.log(repairLeaderboard({\"spieler\": [], \"limit\": 3}));",
    "tests": [
      {
        "input": {
          "spieler": [],
          "limit": 3
        },
        "expected": []
      },
      {
        "input": {
          "spieler": [
            {
              "name": "B",
              "punkte": 2
            },
            {
              "name": "A",
              "punkte": 2
            },
            {
              "name": "C",
              "punkte": 0
            }
          ],
          "limit": 2
        },
        "expected": [
          {
            "name": "A",
            "punkte": 2
          },
          {
            "name": "B",
            "punkte": 2
          }
        ]
      },
      {
        "input": {
          "spieler": [
            {
              "name": "A",
              "punkte": 1
            }
          ],
          "limit": 0
        },
        "expected": []
      },
      {
        "input": {
          "spieler": [
            {
              "name": "A",
              "punkte": 0
            },
            {
              "name": "B",
              "punkte": 9
            }
          ],
          "limit": 5
        },
        "expected": [
          {
            "name": "B",
            "punkte": 9
          },
          {
            "name": "A",
            "punkte": 0
          }
        ]
      }
    ],
    "preserveInput": true,
    "hints": [
      "Sortieren darf die Eingabe nicht verändern.",
      "Vergleiche Namen nur bei gleichen Punkten.",
      "Kopiere, sortiere und begrenze erst danach die Ergebnisliste."
    ],
    "explanation": "Eine Rangliste braucht eine Regel für Gleichstände und einen klaren Grenzwert. Kopiere, sortiere und begrenze erst danach die Ergebnisliste."
  }
];
