export const advancedLessons = [
  {
    "id": "js-fn-arrow",
    "course": "js",
    "category": "Funktionen",
    "name": "Arrow Functions",
    "title": "Eine Arrow Function mit impliziter Rückgabe verwenden",
    "description": "Eine Arrow Function ist eine kompakte Schreibweise für eine Funktion. Ohne geschweifte Klammern wird der Ausdruck rechts vom Pfeil zurückgegeben.",
    "syntax": "const doppelt = zahl => zahl * 2;\nconst doppeltMitBlock = zahl => { return zahl * 2; };",
    "parts": [
      [
        "zahl => …",
        "Definiert einen Parameter und den Funktionskörper."
      ],
      [
        "Ausdruck",
        "Ohne { } ist das Ergebnis zugleich der Rückgabewert."
      ],
      [
        "Block",
        "Mit { } brauchst du return, um einen Wert zurückzugeben."
      ]
    ],
    "note": "zahl => { zahl * 2; } gibt undefined zurück. Arrow Functions haben außerdem kein eigenes this; dazu folgen später eigene Lektionen.",
    "detail": "Schreibe arrow(daten). Definiere eine Arrow Function, die eine endliche Zahl verdoppelt, und gib ihr Ergebnis für daten zurück.",
    "functionName": "arrow",
    "parameter": "daten",
    "task": "Schreibe arrow(daten). Definiere eine Arrow Function, die eine endliche Zahl verdoppelt, und gib ihr Ergebnis für daten zurück.",
    "tests": [
      {
        "input": 3,
        "expected": 6
      },
      {
        "input": 0,
        "expected": 0
      },
      {
        "input": -2,
        "expected": -4
      },
      {
        "input": 1.5,
        "expected": 3
      }
    ],
    "hints": [
      "Definiert einen Parameter und den Funktionskörper.",
      "doppelt ist ein Funktionswert. doppelt(daten) ruft ihn auf. Der Ausdruck zahl * 2 wird ohne zusätzliches return aus der Arrow Function zurückgegeben."
    ],
    "solution": "function arrow(daten) {\n  const doppelt = zahl => zahl * 2;\n  return doppelt(daten);\n}",
    "explanation": "doppelt ist ein Funktionswert. doppelt(daten) ruft ihn auf. Der Ausdruck zahl * 2 wird ohne zusätzliches return aus der Arrow Function zurückgegeben.",
    "preserveInput": true,
    "starter": "function arrow(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function arrow(daten) {\n  const doppelt = zahl => zahl * 2;\n  return doppelt(daten);\n}\n\nconsole.log(arrow(3));"
  },
  {
    "id": "js-fn-arrow-object",
    "course": "js",
    "category": "Funktionen",
    "name": "Objekt zurückgeben",
    "title": "Ein Objekt aus einer Arrow Function zurückgeben",
    "description": "Bei einer kompakten Arrow Function sehen Objektklammern sonst wie ein Funktionsblock aus. Runde Klammern machen das Objekt zum Ausdruck.",
    "syntax": "const verpacken = wert => ({ wert });",
    "parts": [
      [
        "({ wert })",
        "Klammern kennzeichnen den Objektliteral als Ausdruck."
      ],
      [
        "{ wert }",
        "Kurzform für { wert: wert }."
      ],
      [
        "verpacken(wert)",
        "Ruft die Funktion auf und erhält das erzeugte Objekt."
      ]
    ],
    "note": "wert => { wert } erzeugt hier keinen Objekt-Rückgabewert. Verwende ({ wert }) oder einen Block mit return.",
    "detail": "Schreibe arrowObject(daten). Verwende eine Arrow Function zum Verpacken des primitiven JSON-Werts daten in {wert: daten}.",
    "functionName": "arrowObject",
    "parameter": "daten",
    "task": "Schreibe arrowObject(daten). Verwende eine Arrow Function zum Verpacken des primitiven JSON-Werts daten in {wert: daten}.",
    "tests": [
      {
        "input": 5,
        "expected": {
          "wert": 5
        }
      },
      {
        "input": 0,
        "expected": {
          "wert": 0
        }
      },
      {
        "input": false,
        "expected": {
          "wert": false
        }
      },
      {
        "input": "",
        "expected": {
          "wert": ""
        }
      },
      {
        "input": null,
        "expected": {
          "wert": null
        }
      }
    ],
    "hints": [
      "Klammern kennzeichnen den Objektliteral als Ausdruck.",
      "Die äußeren runden Klammern lassen JavaScript den Inhalt als Objekt-Ausdruck lesen. Die Kurzschreibweise verwendet den Variablennamen als Eigenschaftsnamen."
    ],
    "solution": "function arrowObject(daten) {\n  const verpacken = wert => ({ wert });\n  return verpacken(daten);\n}",
    "explanation": "Die äußeren runden Klammern lassen JavaScript den Inhalt als Objekt-Ausdruck lesen. Die Kurzschreibweise verwendet den Variablennamen als Eigenschaftsnamen.",
    "preserveInput": true,
    "starter": "function arrowObject(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function arrowObject(daten) {\n  const verpacken = wert => ({ wert });\n  return verpacken(daten);\n}\n\nconsole.log(arrowObject(5));"
  },
  {
    "id": "js-fn-callback",
    "course": "js",
    "category": "Funktionen",
    "name": "Callbacks",
    "title": "Eine Funktion als Callback übergeben",
    "description": "Ein Callback ist eine Funktion, die du einer anderen Funktion zur Ausführung übergibst. Du übergibst den Funktionswert und nicht das Ergebnis eines vorzeitigen Aufrufs.",
    "syntax": "function anwenden(wert, callback) { return callback(wert); }\nanwenden(4, zahl => zahl * 3);",
    "parts": [
      [
        "callback",
        "Ein Parameter kann einen Funktionswert enthalten."
      ],
      [
        "callback(wert)",
        "Die empfangende Funktion entscheidet, wann der Callback aufgerufen wird."
      ],
      [
        "zahl => zahl * faktor",
        "Der Callback kann eine Variable aus seinem Umfeld verwenden."
      ]
    ],
    "note": "anwenden(4, callback()) ruft callback sofort auf. anwenden(4, callback) übergibt die Funktion.",
    "detail": "Schreibe callback(daten) für {wert, faktor}. Definiere anwenden(wert, funktion), die funktion(wert) zurückgibt, und multipliziere so wert mit faktor. Beide Werte sind endliche Zahlen.",
    "functionName": "callback",
    "parameter": "daten",
    "task": "Schreibe callback(daten) für {wert, faktor}. Definiere anwenden(wert, funktion), die funktion(wert) zurückgibt, und multipliziere so wert mit faktor. Beide Werte sind endliche Zahlen.",
    "tests": [
      {
        "input": {
          "wert": 4,
          "faktor": 3
        },
        "expected": 12
      },
      {
        "input": {
          "wert": 0,
          "faktor": 5
        },
        "expected": 0
      },
      {
        "input": {
          "wert": -2,
          "faktor": 4
        },
        "expected": -8
      },
      {
        "input": {
          "wert": 3,
          "faktor": 0
        },
        "expected": 0
      }
    ],
    "hints": [
      "Ein Parameter kann einen Funktionswert enthalten.",
      "Der Arrow-Ausdruck wird als Funktion übergeben. Erst anwenden ruft sie mit wert auf. Die Funktion greift dabei auf daten.faktor aus dem äußeren Gültigkeitsbereich zu."
    ],
    "solution": "function callback(daten) {\n  function anwenden(wert, funktion) { return funktion(wert); }\n  return anwenden(daten.wert, zahl => zahl * daten.faktor);\n}",
    "explanation": "Der Arrow-Ausdruck wird als Funktion übergeben. Erst anwenden ruft sie mit wert auf. Die Funktion greift dabei auf daten.faktor aus dem äußeren Gültigkeitsbereich zu.",
    "preserveInput": true,
    "starter": "function callback(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function callback(daten) {\n  function anwenden(wert, funktion) { return funktion(wert); }\n  return anwenden(daten.wert, zahl => zahl * daten.faktor);\n}\n\nconsole.log(callback({\"wert\": 4, \"faktor\": 3}));"
  },
  {
    "id": "js-fn-default",
    "course": "js",
    "category": "Funktionen",
    "name": "Standardparameter",
    "title": "Standardwerte für fehlende Argumente verwenden",
    "description": "Ein Standardparameter greift, wenn ein Argument fehlt oder undefined ist. Null und falsy Werte bleiben erhalten.",
    "syntax": "function begruessen(name = \"Gast\") { return name; }",
    "parts": [
      [
        "name = \"Gast\"",
        "Setzt einen Standardwert in der Parameterliste."
      ],
      [
        "undefined",
        "Fehlende Argumente werden wie undefined behandelt."
      ],
      [
        "null / \"\"",
        "Sind vorhandene Werte und lösen den Standard nicht aus."
      ]
    ],
    "note": "Ein Standardparameter ist kein Ersatz für ||: Ein leerer String wird nicht überschrieben.",
    "detail": "Schreibe default(daten) für ein Objekt mit optionalem name (String oder null). Gib {name} zurück; ohne name verwende \"Gast\".",
    "functionName": "standardName",
    "parameter": "daten",
    "task": "Schreibe standardName(daten) für ein Objekt mit optionalem name (String oder null). Gib {name} zurück; ohne name verwende \"Gast\".",
    "tests": [
      {
        "input": {},
        "expected": {
          "name": "Gast"
        }
      },
      {
        "input": {
          "name": "Mira"
        },
        "expected": {
          "name": "Mira"
        }
      },
      {
        "input": {
          "name": ""
        },
        "expected": {
          "name": ""
        }
      },
      {
        "input": {
          "name": null
        },
        "expected": {
          "name": null
        }
      }
    ],
    "hints": [
      "Setzt einen Standardwert in der Parameterliste.",
      "Bei {} liefert daten.name undefined und der Parameter nutzt Gast. Bei einem leeren String oder null bleibt das übergebene Argument erhalten."
    ],
    "solution": "function standardName(daten) {\n  function verpacken(name = \"Gast\") { return { name }; }\n  return verpacken(daten.name);\n}",
    "explanation": "Bei {} liefert daten.name undefined und der Parameter nutzt Gast. Bei einem leeren String oder null bleibt das übergebene Argument erhalten.",
    "preserveInput": true,
    "starter": "function standardName(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function standardName(daten) {\n  function verpacken(name = \"Gast\") { return { name }; }\n  return verpacken(daten.name);\n}\n\nconsole.log(standardName({}));"
  },
  {
    "id": "js-fn-rest",
    "course": "js",
    "category": "Funktionen",
    "name": "Rest-Parameter",
    "title": "Beliebig viele Argumente in einem Rest-Parameter sammeln",
    "description": "...werte in der Parameterliste sammelt verbleibende Argumente in einem Array. So kannst du eine Funktion für unterschiedlich viele Werte schreiben.",
    "syntax": "function summe(...werte) { return werte.reduce((a, b) => a + b, 0); }",
    "parts": [
      [
        "...werte als Parameter",
        "Sammelt alle übrigen Argumente. Der Rest-Parameter muss zuletzt stehen."
      ],
      [
        "Array",
        "werte ist ein echtes Array mit Methoden wie reduce."
      ],
      [
        "summe(...daten)",
        "Spread zerlegt das Eingabearray beim Aufruf wieder in einzelne Argumente."
      ]
    ],
    "note": "Rest sammelt beim Definieren, Spread verteilt beim Aufrufen. Dieselben drei Punkte haben abhängig von ihrer Position unterschiedliche Aufgaben.",
    "detail": "Schreibe rest(daten). daten ist ein Array endlicher Zahlen. Definiere eine Summenfunktion mit Rest-Parameter und rufe sie mit den verteilten Arraywerten auf. [] ergibt 0.",
    "functionName": "rest",
    "parameter": "daten",
    "task": "Schreibe rest(daten). daten ist ein Array endlicher Zahlen. Definiere eine Summenfunktion mit Rest-Parameter und rufe sie mit den verteilten Arraywerten auf. [] ergibt 0.",
    "tests": [
      {
        "input": [
          1,
          2,
          3
        ],
        "expected": 6
      },
      {
        "input": [],
        "expected": 0
      },
      {
        "input": [
          0
        ],
        "expected": 0
      },
      {
        "input": [
          -2,
          5
        ],
        "expected": 3
      },
      {
        "input": [
          1.5,
          2.5
        ],
        "expected": 4
      }
    ],
    "hints": [
      "Sammelt alle übrigen Argumente. Der Rest-Parameter muss zuletzt stehen.",
      "Beim Aufruf werden die Arraywerte zu Argumenten. Der Rest-Parameter sammelt sie erneut in werte; reduce summiert sie mit dem Startwert 0."
    ],
    "solution": "function rest(daten) {\n  function summe(...werte) { return werte.reduce((a, b) => a + b, 0); }\n  return summe(...daten);\n}",
    "explanation": "Beim Aufruf werden die Arraywerte zu Argumenten. Der Rest-Parameter sammelt sie erneut in werte; reduce summiert sie mit dem Startwert 0.",
    "preserveInput": true,
    "starter": "function rest(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function rest(daten) {\n  function summe(...werte) { return werte.reduce((a, b) => a + b, 0); }\n  return summe(...daten);\n}\n\nconsole.log(rest([1, 2, 3]));"
  },
  {
    "id": "js-fn-spread",
    "course": "js",
    "category": "Funktionen",
    "name": "Spread beim Aufruf",
    "title": "Arraywerte als einzelne Funktionsargumente übergeben",
    "description": "Math.max erwartet einzelne Zahlen, nicht ein Array. Spread macht aus einer Liste einzelne Argumente.",
    "syntax": "Math.max(...[2, 8, 3]); // 8",
    "parts": [
      [
        "...daten",
        "Verteilt jedes Arrayelement als eigenes Argument."
      ],
      [
        "Math.max(a, b, …)",
        "Gibt den größten übergebenen Zahlenwert zurück."
      ],
      [
        "Leere Liste",
        "Math.max() ergibt -Infinity; die Aufgabe verlangt stattdessen null."
      ]
    ],
    "note": "Math.max(daten) übergibt das ganze Array als ein Argument. Spread eignet sich für kleine Listen; sehr große Argumentlisten können Engine-Grenzen überschreiten.",
    "detail": "Schreibe spread(daten). Gib die größte Zahl einer kleinen Liste endlicher Zahlen zurück, bei [] null. Verändere die Liste nicht.",
    "functionName": "spread",
    "parameter": "daten",
    "task": "Schreibe spread(daten). Gib die größte Zahl einer kleinen Liste endlicher Zahlen zurück, bei [] null. Verändere die Liste nicht.",
    "tests": [
      {
        "input": [
          2,
          8,
          3
        ],
        "expected": 8
      },
      {
        "input": [
          -4,
          -2,
          -8
        ],
        "expected": -2
      },
      {
        "input": [
          0,
          -1
        ],
        "expected": 0
      },
      {
        "input": [],
        "expected": null
      },
      {
        "input": [
          5
        ],
        "expected": 5
      }
    ],
    "hints": [
      "Verteilt jedes Arrayelement als eigenes Argument.",
      "Die Längenprüfung verhindert -Infinity bei einer leeren Liste. Spread übergibt die Zahlen einzeln; auch bei ausschließlich negativen Zahlen bleibt das Ergebnis korrekt."
    ],
    "solution": "function spread(daten) {\n  if (daten.length === 0) return null;\n  return Math.max(...daten);\n}",
    "explanation": "Die Längenprüfung verhindert -Infinity bei einer leeren Liste. Spread übergibt die Zahlen einzeln; auch bei ausschließlich negativen Zahlen bleibt das Ergebnis korrekt.",
    "preserveInput": true,
    "starter": "function spread(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function spread(daten) {\n  if (daten.length === 0) return null;\n  return Math.max(...daten);\n}\n\nconsole.log(spread([2, 8, 3]));"
  },
  {
    "id": "js-fn-scope",
    "course": "js",
    "category": "Funktionen",
    "name": "Block-Scope",
    "title": "Gleichnamige Variablen in verschiedenen Blöcken unterscheiden",
    "description": "let und const gelten nur in ihrem Block. Eine innere gleichnamige Variable verdeckt die äußere Bindung vorübergehend.",
    "syntax": "let wert = 10;\n{ const wert = 99; }\nconsole.log(wert); // 10",
    "parts": [
      [
        "{ … }",
        "Erzeugt einen Block mit eigenem Gültigkeitsbereich für let und const."
      ],
      [
        "Shadowing",
        "Eine innere Bindung kann denselben Namen wie eine äußere besitzen."
      ],
      [
        "Zuweisung vs. Deklaration",
        "wert = 99 verändert eine vorhandene Bindung; const wert = 99 erzeugt eine neue."
      ]
    ],
    "note": "Shadowing ist keine Änderung der äußeren Variable. Vermeide unnötig gleiche Namen in echtem Anwendungscode.",
    "detail": "Schreibe scope(daten) für {aussen, innen} mit Zahlen. Lege außen wert = aussen an und in einem inneren Block eine neue Konstante wert = innen. Gib {aussen: äußerer Wert, innen: im Block gelesener Wert} zurück.",
    "functionName": "scope",
    "parameter": "daten",
    "task": "Schreibe scope(daten) für {aussen, innen} mit Zahlen. Lege außen wert = aussen an und in einem inneren Block eine neue Konstante wert = innen. Gib {aussen: äußerer Wert, innen: im Block gelesener Wert} zurück.",
    "tests": [
      {
        "input": {
          "aussen": 10,
          "innen": 99
        },
        "expected": {
          "aussen": 10,
          "innen": 99
        }
      },
      {
        "input": {
          "aussen": 0,
          "innen": 5
        },
        "expected": {
          "aussen": 0,
          "innen": 5
        }
      },
      {
        "input": {
          "aussen": -2,
          "innen": 0
        },
        "expected": {
          "aussen": -2,
          "innen": 0
        }
      }
    ],
    "hints": [
      "Erzeugt einen Block mit eigenem Gültigkeitsbereich für let und const.",
      "Der innere wert gehört nur zum Block. innen speichert dessen Wert für die Ausgabe. Nach dem Block bezeichnet wert wieder die äußere Konstante."
    ],
    "solution": "function scope(daten) {\n  const wert = daten.aussen;\n  let innen;\n  {\n    const wert = daten.innen;\n    innen = wert;\n  }\n  return { aussen: wert, innen };\n}",
    "explanation": "Der innere wert gehört nur zum Block. innen speichert dessen Wert für die Ausgabe. Nach dem Block bezeichnet wert wieder die äußere Konstante.",
    "preserveInput": true,
    "starter": "function scope(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function scope(daten) {\n  const wert = daten.aussen;\n  let innen;\n  {\n    const wert = daten.innen;\n    innen = wert;\n  }\n  return { aussen: wert, innen };\n}\n\nconsole.log(scope({\"aussen\": 10, \"innen\": 99}));"
  },
  {
    "id": "js-fn-closure",
    "course": "js",
    "category": "Funktionen",
    "name": "Closures",
    "title": "Einen Zähler mit gespeichertem Zustand bauen",
    "description": "Eine zurückgegebene Funktion kann auf Variablen ihrer erzeugenden Funktion zugreifen, auch nachdem diese fertig ist. Diese Verbindung heißt Closure.",
    "syntax": "function erzeuge(start) {\n  let stand = start;\n  return () => ++stand;\n}",
    "parts": [
      [
        "let stand",
        "Speichert den Zustand im Umfeld der erzeugenden Funktion."
      ],
      [
        "return () => …",
        "Gibt eine Funktion zurück, ohne sie sofort aufzurufen."
      ],
      [
        "++stand",
        "Erhöht den Zustand zuerst und liefert den neuen Wert."
      ]
    ],
    "note": "Erzeuge den Zähler einmal und rufe dieselbe Funktion mehrfach auf. Ein neuer Aufruf von erzeuge beginnt einen neuen Zustand.",
    "detail": "Schreibe closure(daten) für {start, anzahl}. start ist eine ganze Zahl und anzahl eine nichtnegative kleine ganze Zahl. Erzeuge einen Closure-Zähler, der pro Aufruf um 1 erhöht, und gib die Ergebnisse von anzahl Aufrufen als Array zurück.",
    "functionName": "closure",
    "parameter": "daten",
    "task": "Schreibe closure(daten) für {start, anzahl}. start ist eine ganze Zahl und anzahl eine nichtnegative kleine ganze Zahl. Erzeuge einen Closure-Zähler, der pro Aufruf um 1 erhöht, und gib die Ergebnisse von anzahl Aufrufen als Array zurück.",
    "tests": [
      {
        "input": {
          "start": 5,
          "anzahl": 3
        },
        "expected": [
          6,
          7,
          8
        ]
      },
      {
        "input": {
          "start": 0,
          "anzahl": 2
        },
        "expected": [
          1,
          2
        ]
      },
      {
        "input": {
          "start": -2,
          "anzahl": 3
        },
        "expected": [
          -1,
          0,
          1
        ]
      },
      {
        "input": {
          "start": 10,
          "anzahl": 0
        },
        "expected": []
      }
    ],
    "hints": [
      "Speichert den Zustand im Umfeld der erzeugenden Funktion.",
      "zaehler hält Zugriff auf stand. Jeder Aufruf verändert dieselbe Bindung. Array.from ruft seinen Callback für jede gewünschte Position auf."
    ],
    "solution": "function closure(daten) {\n  function erzeuge(start) {\n    let stand = start;\n    return () => ++stand;\n  }\n  const zaehler = erzeuge(daten.start);\n  return Array.from({ length: daten.anzahl }, () => zaehler());\n}",
    "explanation": "zaehler hält Zugriff auf stand. Jeder Aufruf verändert dieselbe Bindung. Array.from ruft seinen Callback für jede gewünschte Position auf.",
    "preserveInput": true,
    "starter": "function closure(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function closure(daten) {\n  function erzeuge(start) {\n    let stand = start;\n    return () => ++stand;\n  }\n  const zaehler = erzeuge(daten.start);\n  return Array.from({ length: daten.anzahl }, () => zaehler());\n}\n\nconsole.log(closure({\"start\": 5, \"anzahl\": 3}));"
  },
  {
    "id": "js-fn-independent",
    "course": "js",
    "category": "Funktionen",
    "name": "Getrennte Closures",
    "title": "Zwei unabhängige Zähler erzeugen",
    "description": "Jeder Aufruf einer Factory-Funktion erhält einen eigenen lokalen Zustand. Zwei Closures aus verschiedenen Aufrufen sollen sich nicht gegenseitig verändern.",
    "syntax": "const a = erzeuge(0);\nconst b = erzeuge(10);\na(); b(); a(); // 1, 11, 2",
    "parts": [
      [
        "Factory",
        "Eine Funktion erzeugt und liefert eine andere Funktion."
      ],
      [
        "Lokale Bindung",
        "Jeder Factory-Aufruf besitzt seine eigene Variable stand."
      ],
      [
        "Unabhängigkeit",
        "Aufrufe von a ändern nicht den Zustand von b."
      ]
    ],
    "note": "Ein globaler gemeinsamer stand würde die beiden Zähler koppeln. Der Zustand muss innerhalb der Factory liegen.",
    "detail": "Schreibe independent(daten) für {a, b, aufrufe}. Erzeuge zwei Zähler ab a und b. Jeder Eintrag in aufrufe ist \"a\" oder \"b\"; erhöhe den passenden Zähler um 1 und sammle seinen neuen Wert.",
    "functionName": "independent",
    "parameter": "daten",
    "task": "Schreibe independent(daten) für {a, b, aufrufe}. Erzeuge zwei Zähler ab a und b. Jeder Eintrag in aufrufe ist \"a\" oder \"b\"; erhöhe den passenden Zähler um 1 und sammle seinen neuen Wert.",
    "tests": [
      {
        "input": {
          "a": 0,
          "b": 10,
          "aufrufe": [
            "a",
            "b",
            "a",
            "b"
          ]
        },
        "expected": [
          1,
          11,
          2,
          12
        ]
      },
      {
        "input": {
          "a": 5,
          "b": 5,
          "aufrufe": [
            "a",
            "a",
            "b"
          ]
        },
        "expected": [
          6,
          7,
          6
        ]
      },
      {
        "input": {
          "a": 0,
          "b": 0,
          "aufrufe": []
        },
        "expected": []
      },
      {
        "input": {
          "a": -2,
          "b": 0,
          "aufrufe": [
            "b",
            "a"
          ]
        },
        "expected": [
          1,
          -1
        ]
      }
    ],
    "hints": [
      "Eine Funktion erzeugt und liefert eine andere Funktion.",
      "Beide Funktionen haben denselben Code, aber unterschiedliche Umfelder. Auch bei gleichen Startwerten bleiben die gespeicherten Zustände getrennt."
    ],
    "solution": "function independent(daten) {\n  function erzeuge(start) {\n    let stand = start;\n    return () => ++stand;\n  }\n  const a = erzeuge(daten.a);\n  const b = erzeuge(daten.b);\n  return daten.aufrufe.map(name => name === \"a\" ? a() : b());\n}",
    "explanation": "Beide Funktionen haben denselben Code, aber unterschiedliche Umfelder. Auch bei gleichen Startwerten bleiben die gespeicherten Zustände getrennt.",
    "preserveInput": true,
    "starter": "function independent(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function independent(daten) {\n  function erzeuge(start) {\n    let stand = start;\n    return () => ++stand;\n  }\n  const a = erzeuge(daten.a);\n  const b = erzeuge(daten.b);\n  return daten.aufrufe.map(name => name === \"a\" ? a() : b());\n}\n\nconsole.log(independent({\"a\": 0, \"b\": 10, \"aufrufe\": [\"a\", \"b\", \"a\", \"b\"]}));"
  },
  {
    "id": "js-fn-factory",
    "course": "js",
    "category": "Funktionen",
    "name": "Funktions-Factory",
    "title": "Einen konfigurierbaren Multiplikator zurückgeben",
    "description": "Eine Funktion kann eine neue Funktion zurückgeben, die sich eine Einstellung merkt. Das ist praktisch für wiederverwendbare Umrechnungen.",
    "syntax": "const mal = faktor => wert => wert * faktor;\nconst verdoppeln = mal(2);",
    "parts": [
      [
        "faktor => …",
        "Der erste Aufruf nimmt die Konfiguration entgegen."
      ],
      [
        "wert => …",
        "Die zurückgegebene Funktion verarbeitet später einzelne Werte."
      ],
      [
        "map(multiplizieren)",
        "Übergibt die erzeugte Funktion direkt als Callback."
      ]
    ],
    "note": "mal(2) ergibt eine Funktion, noch kein Rechenergebnis. Erst mal(2)(5) ergibt 10.",
    "detail": "Schreibe factory(daten) für {faktor, werte}. Erzeuge eine Funktion, die mit faktor multipliziert, und wende sie auf alle endlichen Zahlen in werte an.",
    "functionName": "factory",
    "parameter": "daten",
    "task": "Schreibe factory(daten) für {faktor, werte}. Erzeuge eine Funktion, die mit faktor multipliziert, und wende sie auf alle endlichen Zahlen in werte an.",
    "tests": [
      {
        "input": {
          "faktor": 2,
          "werte": [
            1,
            3
          ]
        },
        "expected": [
          2,
          6
        ]
      },
      {
        "input": {
          "faktor": 0,
          "werte": [
            2,
            -3
          ]
        },
        "expected": [
          0,
          0
        ]
      },
      {
        "input": {
          "faktor": -1,
          "werte": [
            2,
            0,
            -2
          ]
        },
        "expected": [
          -2,
          0,
          2
        ]
      },
      {
        "input": {
          "faktor": 3,
          "werte": []
        },
        "expected": []
      }
    ],
    "hints": [
      "Der erste Aufruf nimmt die Konfiguration entgegen.",
      "erzeuge merkt sich faktor im Umfeld der zurückgegebenen Funktion. map ruft diese anschließend für jeden Wert auf. Die Eingabeliste bleibt unverändert."
    ],
    "solution": "function factory(daten) {\n  const erzeuge = faktor => wert => wert * faktor;\n  const multiplizieren = erzeuge(daten.faktor);\n  return daten.werte.map(multiplizieren);\n}",
    "explanation": "erzeuge merkt sich faktor im Umfeld der zurückgegebenen Funktion. map ruft diese anschließend für jeden Wert auf. Die Eingabeliste bleibt unverändert.",
    "preserveInput": true,
    "starter": "function factory(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function factory(daten) {\n  const erzeuge = faktor => wert => wert * faktor;\n  const multiplizieren = erzeuge(daten.faktor);\n  return daten.werte.map(multiplizieren);\n}\n\nconsole.log(factory({\"faktor\": 2, \"werte\": [1, 3]}));"
  },
  {
    "id": "js-obj-destructure",
    "course": "js",
    "category": "Objektzugriffe",
    "name": "Destructuring",
    "title": "Eigenschaften mit Destructuring auslesen",
    "description": "Destructuring entnimmt benannte Eigenschaften und kann sie umbenennen oder mit einem Standard versehen.",
    "syntax": "const { name: titel, punkte = 0 } = objekt;",
    "parts": [
      [
        "name: titel",
        "Liest name und bindet den Wert unter dem lokalen Namen titel."
      ],
      [
        "punkte = 0",
        "Verwendet 0 nur bei fehlendem oder undefined-Wert."
      ],
      [
        "Keine Mutation",
        "Das Auslesen ändert das Objekt nicht."
      ]
    ],
    "note": "name: titel benennt die lokale Variable um, nicht die Eigenschaft im Eingabeobjekt.",
    "detail": "Schreibe destructure(daten). daten hat name (String) und optional punkte (Zahl oder null). Gib {titel: name, punkte} mit Standardpunkten 0 zurück.",
    "functionName": "destructure",
    "parameter": "daten",
    "task": "Schreibe destructure(daten). daten hat name (String) und optional punkte (Zahl oder null). Gib {titel: name, punkte} mit Standardpunkten 0 zurück.",
    "tests": [
      {
        "input": {
          "name": "Ada",
          "punkte": 5
        },
        "expected": {
          "titel": "Ada",
          "punkte": 5
        }
      },
      {
        "input": {
          "name": "Ben"
        },
        "expected": {
          "titel": "Ben",
          "punkte": 0
        }
      },
      {
        "input": {
          "name": "",
          "punkte": 0
        },
        "expected": {
          "titel": "",
          "punkte": 0
        }
      },
      {
        "input": {
          "name": "Ada",
          "punkte": null
        },
        "expected": {
          "titel": "Ada",
          "punkte": null
        }
      }
    ],
    "hints": [
      "Liest name und bindet den Wert unter dem lokalen Namen titel.",
      "Die lokale Variable titel enthält den Wert von name. Der Standard für punkte überschreibt weder 0 noch null."
    ],
    "solution": "function destructure(daten) {\n  const { name: titel, punkte = 0 } = daten;\n  return { titel, punkte };\n}",
    "explanation": "Die lokale Variable titel enthält den Wert von name. Der Standard für punkte überschreibt weder 0 noch null.",
    "preserveInput": true,
    "starter": "function destructure(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function destructure(daten) {\n  const { name: titel, punkte = 0 } = daten;\n  return { titel, punkte };\n}\n\nconsole.log(destructure({\"name\": \"Ada\", \"punkte\": 5}));"
  },
  {
    "id": "js-obj-rest",
    "course": "js",
    "category": "Objektzugriffe",
    "name": "Object Rest",
    "title": "Ein Feld aus einer Objektkopie weglassen",
    "description": "Rest in einem Destructuring-Muster sammelt die übrigen eigenen aufzählbaren Eigenschaften in einem neuen Objekt.",
    "syntax": "const { passwort, ...oeffentlich } = benutzer;",
    "parts": [
      [
        "passwort",
        "Wird separat gelesen und nicht in den Rest aufgenommen."
      ],
      [
        "...oeffentlich",
        "Sammelt die verbleibenden Eigenschaften."
      ],
      [
        "Neue äußere Hülle",
        "Das Ergebnisobjekt ist neu, verschachtelte Objekte können weiter geteilt sein."
      ]
    ],
    "note": "Ein Feld aus der Ausgabe zu entfernen ist noch keine vollständige Datenschutz- oder Zugriffskontrolle. Die Aufgabe übt nur das Kopieren ohne dieses Feld.",
    "detail": "Schreibe rest(daten). Gib eine Kopie aller eigenen JSON-Eigenschaften außer passwort zurück. Das Feld kann fehlen; verändere daten nicht.",
    "functionName": "objektRest",
    "parameter": "daten",
    "task": "Schreibe objektRest(daten). Gib eine Kopie aller eigenen JSON-Eigenschaften außer passwort zurück. Das Feld kann fehlen; verändere daten nicht.",
    "tests": [
      {
        "input": {
          "name": "Ada",
          "passwort": "abc"
        },
        "expected": {
          "name": "Ada"
        }
      },
      {
        "input": {
          "name": "Ben"
        },
        "expected": {
          "name": "Ben"
        }
      },
      {
        "input": {
          "passwort": ""
        },
        "expected": {}
      },
      {
        "input": {},
        "expected": {}
      },
      {
        "input": {
          "id": 0,
          "aktiv": false,
          "passwort": "x"
        },
        "expected": {
          "id": 0,
          "aktiv": false
        }
      }
    ],
    "hints": [
      "Wird separat gelesen und nicht in den Rest aufgenommen.",
      "Object Rest sammelt alle nicht zuvor entnommenen Eigenschaften. delete daten.passwort wäre eine Mutation des Originalobjekts und ist hier falsch."
    ],
    "solution": "function objektRest(daten) {\n  const { passwort, ...oeffentlich } = daten;\n  return oeffentlich;\n}",
    "explanation": "Object Rest sammelt alle nicht zuvor entnommenen Eigenschaften. delete daten.passwort wäre eine Mutation des Originalobjekts und ist hier falsch.",
    "preserveInput": true,
    "starter": "function objektRest(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function objektRest(daten) {\n  const { passwort, ...oeffentlich } = daten;\n  return oeffentlich;\n}\n\nconsole.log(objektRest({\"name\": \"Ada\", \"passwort\": \"abc\"}));"
  },
  {
    "id": "js-obj-copy",
    "course": "js",
    "category": "Objektzugriffe",
    "name": "Object Spread",
    "title": "Ein Objekt kopieren und eine Eigenschaft überschreiben",
    "description": "Spread kopiert Eigenschaften in ein neues Objekt. Später geschriebene Eigenschaften überschreiben frühere gleichnamige Einträge.",
    "syntax": "const neu = { ...alt, punkte: alt.punkte + bonus };",
    "parts": [
      [
        "...alt",
        "Kopiert die eigenen aufzählbaren Eigenschaften."
      ],
      [
        "punkte danach",
        "Überschreibt nur den Punktestand in der Kopie."
      ],
      [
        "Reihenfolge",
        "{ punkte: neu, ...alt } würde den neuen Wert wieder überschreiben."
      ]
    ],
    "note": "Object Spread kopiert flach. Ein verschachteltes Objekt erhält dadurch noch keine eigene Kopie.",
    "detail": "Schreibe copy(daten) für {spieler, bonus}. spieler hat name und punkte. Gib eine neue Spielerkopie mit um bonus erhöhten Punkten und allen anderen Feldern zurück. Verändere die Eingabe nicht.",
    "functionName": "copy",
    "parameter": "daten",
    "task": "Schreibe copy(daten) für {spieler, bonus}. spieler hat name und punkte. Gib eine neue Spielerkopie mit um bonus erhöhten Punkten und allen anderen Feldern zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "spieler": {
            "name": "Ada",
            "punkte": 5
          },
          "bonus": 3
        },
        "expected": {
          "name": "Ada",
          "punkte": 8
        }
      },
      {
        "input": {
          "spieler": {
            "name": "B",
            "punkte": 0,
            "aktiv": false
          },
          "bonus": 0
        },
        "expected": {
          "name": "B",
          "punkte": 0,
          "aktiv": false
        }
      },
      {
        "input": {
          "spieler": {
            "name": "C",
            "punkte": 4
          },
          "bonus": -2
        },
        "expected": {
          "name": "C",
          "punkte": 2
        }
      }
    ],
    "hints": [
      "Kopiert die eigenen aufzählbaren Eigenschaften.",
      "Die letzte punkte-Eigenschaft gewinnt. Eine direkte Zuweisung an daten.spieler.punkte würde das Original verändern."
    ],
    "solution": "function copy(daten) {\n  return { ...daten.spieler, punkte: daten.spieler.punkte + daten.bonus };\n}",
    "explanation": "Die letzte punkte-Eigenschaft gewinnt. Eine direkte Zuweisung an daten.spieler.punkte würde das Original verändern.",
    "preserveInput": true,
    "starter": "function copy(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function copy(daten) {\n  return { ...daten.spieler, punkte: daten.spieler.punkte + daten.bonus };\n}\n\nconsole.log(copy({\"spieler\": {\"name\": \"Ada\", \"punkte\": 5}, \"bonus\": 3}));"
  },
  {
    "id": "js-obj-nested",
    "course": "js",
    "category": "Objektzugriffe",
    "name": "Verschachtelte Kopie",
    "title": "Eine verschachtelte Eigenschaft ohne Mutation ändern",
    "description": "Um eine tiefe Eigenschaft zu ändern, kopierst du jede Ebene entlang des geänderten Pfads. Andere unveränderte Teile können geteilt bleiben.",
    "syntax": "const neu = { ...alt, profil: { ...alt.profil, stadt: neueStadt } };",
    "parts": [
      [
        "Äußeres Spread",
        "Erzeugt eine neue äußere Hülle."
      ],
      [
        "Inneres Spread",
        "Erzeugt zusätzlich eine neue Kopie von profil."
      ],
      [
        "stadt danach",
        "Überschreibt nur das gewünschte Feld."
      ]
    ],
    "note": "Nur {...alt} zu kopieren und danach neu.profil.stadt zu ändern, verändert auch alt.profil.stadt.",
    "detail": "Schreibe nested(daten) für {benutzer, stadt}. benutzer hat profil mit stadt und weiteren JSON-Feldern. Gib eine Kopie mit der neuen Stadt zurück und erhalte alle anderen Felder sowie das Original.",
    "functionName": "nested",
    "parameter": "daten",
    "task": "Schreibe nested(daten) für {benutzer, stadt}. benutzer hat profil mit stadt und weiteren JSON-Feldern. Gib eine Kopie mit der neuen Stadt zurück und erhalte alle anderen Felder sowie das Original.",
    "tests": [
      {
        "input": {
          "benutzer": {
            "id": 1,
            "profil": {
              "stadt": "Bonn",
              "name": "Ada"
            }
          },
          "stadt": "Berlin"
        },
        "expected": {
          "id": 1,
          "profil": {
            "stadt": "Berlin",
            "name": "Ada"
          }
        }
      },
      {
        "input": {
          "benutzer": {
            "profil": {
              "stadt": "X",
              "aktiv": false
            }
          },
          "stadt": ""
        },
        "expected": {
          "profil": {
            "stadt": "",
            "aktiv": false
          }
        }
      },
      {
        "input": {
          "benutzer": {
            "profil": {
              "stadt": "X"
            }
          },
          "stadt": "X"
        },
        "expected": {
          "profil": {
            "stadt": "X"
          }
        }
      }
    ],
    "hints": [
      "Erzeugt eine neue äußere Hülle.",
      "Die Lösung kopiert benutzer und profil. Dadurch bleibt die alte Profilreferenz unberührt, während die neue Kopie den geänderten Stadtwert erhält."
    ],
    "solution": "function nested(daten) {\n  return { ...daten.benutzer, profil: { ...daten.benutzer.profil, stadt: daten.stadt } };\n}",
    "explanation": "Die Lösung kopiert benutzer und profil. Dadurch bleibt die alte Profilreferenz unberührt, während die neue Kopie den geänderten Stadtwert erhält.",
    "preserveInput": true,
    "starter": "function nested(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function nested(daten) {\n  return { ...daten.benutzer, profil: { ...daten.benutzer.profil, stadt: daten.stadt } };\n}\n\nconsole.log(nested({\"benutzer\": {\"id\": 1, \"profil\": {\"stadt\": \"Bonn\", \"name\": \"Ada\"}}, \"stadt\": \"Berlin\"}));"
  },
  {
    "id": "js-obj-optional",
    "course": "js",
    "category": "Objektzugriffe",
    "name": "?. und ??",
    "title": "Fehlende verschachtelte Werte sicher lesen",
    "description": "Optional Chaining stoppt einen Zugriff bei null oder undefined. Nullish Coalescing ergänzt einen Ersatzwert, ohne 0, false oder einen leeren String zu verlieren.",
    "syntax": "const stadt = daten.benutzer?.profil?.stadt ?? \"Unbekannt\";",
    "parts": [
      [
        "?.",
        "Liefert undefined statt eines Zugriffsfehlers, wenn der linke Wert fehlt."
      ],
      [
        "??",
        "Ersetzt ausschließlich null oder undefined."
      ],
      [
        "Mehrere Ebenen",
        "Jede möglicherweise fehlende Ebene benötigt ihren passenden optionalen Zugriff."
      ]
    ],
    "note": "Optional Chaining ersetzt keine Typprüfung. Ein vorhandener, aber falsch typisierter Wert kann weiterhin Probleme verursachen.",
    "detail": "Schreibe optional(daten). Gib benutzer.profil.stadt zurück; wenn eine Ebene fehlt oder stadt null ist, gib \"Unbekannt\" zurück. Ein vorhandener leerer String muss erhalten bleiben.",
    "functionName": "optional",
    "parameter": "daten",
    "task": "Schreibe optional(daten). Gib benutzer.profil.stadt zurück; wenn eine Ebene fehlt oder stadt null ist, gib \"Unbekannt\" zurück. Ein vorhandener leerer String muss erhalten bleiben.",
    "tests": [
      {
        "input": {
          "benutzer": {
            "profil": {
              "stadt": "Bonn"
            }
          }
        },
        "expected": "Bonn"
      },
      {
        "input": {},
        "expected": "Unbekannt"
      },
      {
        "input": {
          "benutzer": null
        },
        "expected": "Unbekannt"
      },
      {
        "input": {
          "benutzer": {
            "profil": null
          }
        },
        "expected": "Unbekannt"
      },
      {
        "input": {
          "benutzer": {
            "profil": {
              "stadt": null
            }
          }
        },
        "expected": "Unbekannt"
      },
      {
        "input": {
          "benutzer": {
            "profil": {
              "stadt": ""
            }
          }
        },
        "expected": ""
      }
    ],
    "hints": [
      "Liefert undefined statt eines Zugriffsfehlers, wenn der linke Wert fehlt.",
      "Fehlt benutzer oder profil, liefert die Kette undefined und ?? verwendet Unbekannt. Ein leerer String ist vorhanden und bleibt erhalten."
    ],
    "solution": "function optional(daten) {\n  return daten.benutzer?.profil?.stadt ?? \"Unbekannt\";\n}",
    "explanation": "Fehlt benutzer oder profil, liefert die Kette undefined und ?? verwendet Unbekannt. Ein leerer String ist vorhanden und bleibt erhalten.",
    "preserveInput": true,
    "starter": "function optional(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function optional(daten) {\n  return daten.benutzer?.profil?.stadt ?? \"Unbekannt\";\n}\n\nconsole.log(optional({\"benutzer\": {\"profil\": {\"stadt\": \"Bonn\"}}}));"
  },
  {
    "id": "js-obj-computed",
    "course": "js",
    "category": "Objektzugriffe",
    "name": "Berechnete Schlüssel",
    "title": "Einen dynamischen Eigenschaftsnamen verwenden",
    "description": "In einem Objektliteral kannst du einen Eigenschaftsnamen aus einer Variablen berechnen. Dafür stehen eckige Klammern um den Ausdruck.",
    "syntax": "const objekt = { [schluessel]: wert };",
    "parts": [
      [
        "[schluessel]",
        "Verwendet den Inhalt der Variable als Eigenschaftsnamen."
      ],
      [
        "schluessel ohne Klammern",
        "Würde eine Eigenschaft mit dem festen Namen schluessel erzeugen."
      ],
      [
        "Eigener Eintrag",
        "Die berechnete Schreibweise erzeugt auch für __proto__ einen normalen eigenen Eintrag."
      ]
    ],
    "note": "Für frei wählbare Schlüssel ist eine Map oft ebenfalls sinnvoll. Hier üben wir bewusst ein einzelnes Objektfeld.",
    "detail": "Schreibe computed(daten) für {schluessel, wert}. schluessel ist ein String, wert ein primitiver JSON-Wert. Gib ein Objekt mit genau dieser eigenen Eigenschaft zurück.",
    "functionName": "computed",
    "parameter": "daten",
    "task": "Schreibe computed(daten) für {schluessel, wert}. schluessel ist ein String, wert ein primitiver JSON-Wert. Gib ein Objekt mit genau dieser eigenen Eigenschaft zurück.",
    "tests": [
      {
        "input": {
          "schluessel": "punkte",
          "wert": 5
        },
        "expected": {
          "punkte": 5
        }
      },
      {
        "input": {
          "schluessel": "",
          "wert": 0
        },
        "expected": {
          "": 0
        }
      },
      {
        "input": {
          "schluessel": "constructor",
          "wert": false
        },
        "expected": {
          "constructor": false
        }
      },
      {
        "input": {
          "schluessel": "__proto__",
          "wert": "ok"
        },
        "expected": {
          ["__proto__"]: "ok"
        }
      }
    ],
    "hints": [
      "Verwendet den Inhalt der Variable als Eigenschaftsnamen.",
      "Die Klammern lassen JavaScript den Schlüsselausdruck auswerten. Das Ergebnis besitzt genau einen eigenen Eintrag; ein hart codierter Eigenschaftsname wäre falsch."
    ],
    "solution": "function computed(daten) {\n  return { [daten.schluessel]: daten.wert };\n}",
    "explanation": "Die Klammern lassen JavaScript den Schlüsselausdruck auswerten. Das Ergebnis besitzt genau einen eigenen Eintrag; ein hart codierter Eigenschaftsname wäre falsch.",
    "preserveInput": true,
    "starter": "function computed(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function computed(daten) {\n  return { [daten.schluessel]: daten.wert };\n}\n\nconsole.log(computed({\"schluessel\": \"punkte\", \"wert\": 5}));"
  },
  {
    "id": "js-async-resolve",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "Promise.resolve()",
    "title": "Einen Wert als Promise zurückgeben",
    "description": "Ein Promise repräsentiert ein später verfügbares Ergebnis. Promise.resolve erzeugt ein bereits erfülltes Promise mit einem Wert.",
    "syntax": "const versprechen = Promise.resolve(5);\nconsole.log(await versprechen);",
    "parts": [
      [
        "Promise.resolve(wert)",
        "Erzeugt ein erfülltes Promise."
      ],
      [
        "await",
        "Wartet auf das Ergebnis und liefert den erfüllten Wert."
      ],
      [
        "Promise vs. Wert",
        "Das Promise ist nicht die Zahl selbst."
      ]
    ],
    "note": "Promise.resolve macht eine Berechnung nicht automatisch parallel. Die Aufgaben bleiben lokal und benötigen keine Netzwerkverbindung.",
    "detail": "Schreibe resolve(daten). daten ist eine endliche Zahl. Gib ein Promise zurück, das ihren doppelten Wert liefert.",
    "functionName": "resolve",
    "parameter": "daten",
    "task": "Schreibe resolve(daten). daten ist eine endliche Zahl. Gib ein Promise zurück, das ihren doppelten Wert liefert.",
    "tests": [
      {
        "input": 3,
        "expected": 6
      },
      {
        "input": 0,
        "expected": 0
      },
      {
        "input": -4,
        "expected": -8
      },
      {
        "input": 1.5,
        "expected": 3
      }
    ],
    "hints": [
      "Erzeugt ein erfülltes Promise.",
      "Der Spielplatz wartet auf das Promise. Im Beispiel liest await daraus den Zahlenwert, bevor console.log ihn ausgibt."
    ],
    "solution": "function resolve(daten) {\n  return Promise.resolve(daten * 2);\n}",
    "explanation": "Der Spielplatz wartet auf das Promise. Im Beispiel liest await daraus den Zahlenwert, bevor console.log ihn ausgibt.",
    "preserveInput": true,
    "starter": "function resolve(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function resolve(daten) {\n  return Promise.resolve(daten * 2);\n}\n\nconsole.log(await resolve(3));"
  },
  {
    "id": "js-async-chain",
    "course": "js",
    "category": "Asynchroner Code",
    "name": ".then()",
    "title": "Promise-Schritte zu einer Kette verbinden",
    "description": "then nimmt einen Callback entgegen und liefert ein neues Promise. Dessen Ergebnis hängt vom Rückgabewert des Callbacks ab.",
    "syntax": "Promise.resolve(3).then(wert => wert + 1).then(wert => wert * 2);",
    "parts": [
      [
        ".then(callback)",
        "Verarbeitet den erfüllten Wert."
      ],
      [
        "return im Callback",
        "Liefert das Ergebnis an den nächsten Schritt weiter."
      ],
      [
        "Neues Promise",
        "Jeder then-Aufruf erzeugt ein Promise für den folgenden Zwischenstand."
      ]
    ],
    "note": "Ein Block-Callback ohne return liefert undefined. Gib außerdem die Kette aus der äußeren Funktion zurück.",
    "detail": "Schreibe chain(daten). Erzeuge ein Promise für die Zahl daten, addiere in einem then-Schritt 1 und verdopple das Ergebnis in einem zweiten Schritt.",
    "functionName": "chain",
    "parameter": "daten",
    "task": "Schreibe chain(daten). Erzeuge ein Promise für die Zahl daten, addiere in einem then-Schritt 1 und verdopple das Ergebnis in einem zweiten Schritt.",
    "tests": [
      {
        "input": 3,
        "expected": 8
      },
      {
        "input": 0,
        "expected": 2
      },
      {
        "input": -1,
        "expected": 0
      },
      {
        "input": 2.5,
        "expected": 7
      }
    ],
    "hints": [
      "Verarbeitet den erfüllten Wert.",
      "Der zweite Schritt erhält das Ergebnis des ersten. Bei 3 wird daraus zuerst 4 und dann 8; die komplette Kette wird zurückgegeben."
    ],
    "solution": "function chain(daten) {\n  return Promise.resolve(daten)\n    .then(wert => wert + 1)\n    .then(wert => wert * 2);\n}",
    "explanation": "Der zweite Schritt erhält das Ergebnis des ersten. Bei 3 wird daraus zuerst 4 und dann 8; die komplette Kette wird zurückgegeben.",
    "preserveInput": true,
    "starter": "function chain(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function chain(daten) {\n  return Promise.resolve(daten)\n    .then(wert => wert + 1)\n    .then(wert => wert * 2);\n}\n\nconsole.log(await chain(3));"
  },
  {
    "id": "js-async-await",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "async / await",
    "title": "Promise-Ergebnisse mit async und await verwenden",
    "description": "Eine async-Funktion gibt immer ein Promise zurück. await liest darin ein Promise-Ergebnis, ohne die JavaScript-Ausführung insgesamt anzuhalten.",
    "syntax": "async function rechnen() {\n  const wert = await Promise.resolve(5);\n  return wert + 1;\n}",
    "parts": [
      [
        "async",
        "Erlaubt await im Funktionskörper und verpackt den Rückgabewert in ein Promise."
      ],
      [
        "await",
        "Pausiert diese async-Funktion bis zum Ergebnis."
      ],
      [
        "return wert",
        "Erfüllt das von der Funktion zurückgegebene Promise mit wert."
      ]
    ],
    "note": "Im Spielplatz ist await auch auf oberster Ebene erlaubt. In normalen Script-Dateien braucht es eine async-Funktion oder ein JavaScript-Modul mit Top-Level-Await.",
    "detail": "Schreibe await(daten) für {a, b}. Lies beide endlichen Zahlen über Promise.resolve und await und gib ihre Summe zurück.",
    "functionName": "awaitSumme",
    "parameter": "daten",
    "task": "Schreibe awaitSumme(daten) für {a, b}. Lies beide endlichen Zahlen über Promise.resolve und await und gib ihre Summe zurück.",
    "tests": [
      {
        "input": {
          "a": 3,
          "b": 4
        },
        "expected": 7
      },
      {
        "input": {
          "a": 0,
          "b": 0
        },
        "expected": 0
      },
      {
        "input": {
          "a": -2,
          "b": 5
        },
        "expected": 3
      },
      {
        "input": {
          "a": 1.5,
          "b": 2.5
        },
        "expected": 4
      }
    ],
    "hints": [
      "Erlaubt await im Funktionskörper und verpackt den Rückgabewert in ein Promise.",
      "Die lokalen Variablen enthalten nach await echte Zahlen, keine Promises. Ein return der Summe erfüllt das Promise der async-Funktion."
    ],
    "solution": "async function awaitSumme(daten) {\n  const a = await Promise.resolve(daten.a);\n  const b = await Promise.resolve(daten.b);\n  return a + b;\n}",
    "explanation": "Die lokalen Variablen enthalten nach await echte Zahlen, keine Promises. Ein return der Summe erfüllt das Promise der async-Funktion.",
    "preserveInput": true,
    "starter": "async function awaitSumme(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function awaitSumme(daten) {\n  const a = await Promise.resolve(daten.a);\n  const b = await Promise.resolve(daten.b);\n  return a + b;\n}\n\nconsole.log(await awaitSumme({\"a\": 3, \"b\": 4}));"
  },
  {
    "id": "js-async-catch",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "try / catch mit await",
    "title": "Abgelehnte Promises mit await abfangen",
    "description": "Ein abgelehntes Promise wird an await zu einem geworfenen Fehler. try/catch kann ihn dort behandeln und einen Ersatzwert liefern.",
    "syntax": "try { return await lade(); } catch (fehler) { return null; }",
    "parts": [
      [
        "Promise.reject(error)",
        "Erzeugt ein abgelehntes Promise."
      ],
      [
        "await im try",
        "Lässt eine Ablehnung im try-Block als Fehler ankommen."
      ],
      [
        "catch",
        "Behandelt den Fehler und gibt hier null zurück."
      ]
    ],
    "note": "return promise ohne await verlässt den try-Block, bevor eine spätere Ablehnung behandelt wird. Für dieses lokale catch ist return await entscheidend.",
    "detail": "Schreibe catch(daten) für {ok, wert}. Erzeuge bei ok ein erfülltes Promise mit wert, sonst ein abgelehntes Promise. Gib den Wert zurück oder fange die Ablehnung ab und liefere null. wert ist eine Zahl.",
    "functionName": "promiseFangen",
    "parameter": "daten",
    "task": "Schreibe promiseFangen(daten) für {ok, wert}. Erzeuge bei ok ein erfülltes Promise mit wert, sonst ein abgelehntes Promise. Gib den Wert zurück oder fange die Ablehnung ab und liefere null. wert ist eine Zahl.",
    "tests": [
      {
        "input": {
          "ok": true,
          "wert": 7
        },
        "expected": 7
      },
      {
        "input": {
          "ok": true,
          "wert": 0
        },
        "expected": 0
      },
      {
        "input": {
          "ok": false,
          "wert": 7
        },
        "expected": null
      },
      {
        "input": {
          "ok": false,
          "wert": 0
        },
        "expected": null
      }
    ],
    "hints": [
      "Erzeugt ein abgelehntes Promise.",
      "await ist innerhalb des try. Deshalb springt eine Ablehnung in catch und ergibt null. Eine erfolgreiche Zahl 0 bleibt ein Erfolg."
    ],
    "solution": "async function promiseFangen(daten) {\n  try {\n    const laden = daten.ok ? Promise.resolve(daten.wert) : Promise.reject(new Error(\"Fehler\"));\n    return await laden;\n  } catch (fehler) {\n    return null;\n  }\n}",
    "explanation": "await ist innerhalb des try. Deshalb springt eine Ablehnung in catch und ergibt null. Eine erfolgreiche Zahl 0 bleibt ein Erfolg.",
    "preserveInput": true,
    "starter": "async function promiseFangen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function promiseFangen(daten) {\n  try {\n    const laden = daten.ok ? Promise.resolve(daten.wert) : Promise.reject(new Error(\"Fehler\"));\n    return await laden;\n  } catch (fehler) {\n    return null;\n  }\n}\n\nconsole.log(await promiseFangen({\"ok\": true, \"wert\": 7}));"
  },
  {
    "id": "js-async-all",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "Promise.all()",
    "title": "Mehrere Promise-Ergebnisse in Eingabereihenfolge sammeln",
    "description": "Promise.all wartet auf alle Erfolge und liefert deren Werte in Eingabereihenfolge. Die Reihenfolge der Fertigstellung spielt keine Rolle.",
    "syntax": "const ergebnisse = await Promise.all(promises);",
    "parts": [
      [
        "map",
        "Startet hier für jeden Eintrag einen lokalen Timer-Job."
      ],
      [
        "setTimeout",
        "Erfüllt ein Promise nach einer kleinen Wartezeit; der Zeitwert ist keine garantierte Ausführungszeit."
      ],
      [
        "Promise.all",
        "Sammelt alle Werte oder lehnt ab, sobald eine Aufgabe ablehnt."
      ]
    ],
    "note": "Promise.all startet keine Arbeit selbst: Die Jobs werden hier bereits beim Erzeugen der Promises gestartet. Es sortiert nicht nach Fertigstellung.",
    "detail": "Schreibe all(daten). daten enthält {wert, warte} mit Zahlenwerten und Wartezeiten von 0 bis 20 Millisekunden. Erzeuge pro Eintrag ein Timer-Promise, das wert * 2 liefert, und gib alle Ergebnisse in Eingabereihenfolge zurück.",
    "functionName": "all",
    "parameter": "daten",
    "task": "Schreibe all(daten). daten enthält {wert, warte} mit Zahlenwerten und Wartezeiten von 0 bis 20 Millisekunden. Erzeuge pro Eintrag ein Timer-Promise, das wert * 2 liefert, und gib alle Ergebnisse in Eingabereihenfolge zurück.",
    "tests": [
      {
        "input": [
          {
            "wert": 3,
            "warte": 20
          },
          {
            "wert": 1,
            "warte": 0
          }
        ],
        "expected": [
          6,
          2
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "wert": 0,
            "warte": 1
          }
        ],
        "expected": [
          0
        ]
      },
      {
        "input": [
          {
            "wert": -2,
            "warte": 0
          },
          {
            "wert": 5,
            "warte": 2
          }
        ],
        "expected": [
          -4,
          10
        ]
      }
    ],
    "hints": [
      "Startet hier für jeden Eintrag einen lokalen Timer-Job.",
      "Der zweite Job kann vor dem ersten fertig sein. Trotzdem steht sein Ergebnis an Position 1. Ein leeres Promise.all erfüllt sich mit []."
    ],
    "solution": "function all(daten) {\n  const jobs = daten.map(eintrag => new Promise(resolve => {\n    setTimeout(() => resolve(eintrag.wert * 2), eintrag.warte);\n  }));\n  return Promise.all(jobs);\n}",
    "explanation": "Der zweite Job kann vor dem ersten fertig sein. Trotzdem steht sein Ergebnis an Position 1. Ein leeres Promise.all erfüllt sich mit [].",
    "preserveInput": true,
    "starter": "function all(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function all(daten) {\n  const jobs = daten.map(eintrag => new Promise(resolve => {\n    setTimeout(() => resolve(eintrag.wert * 2), eintrag.warte);\n  }));\n  return Promise.all(jobs);\n}\n\nconsole.log(await all([{\"wert\": 3, \"warte\": 20}, {\"wert\": 1, \"warte\": 0}]));"
  },
  {
    "id": "js-async-settled",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "Promise.allSettled()",
    "title": "Erfolge und Fehler gemeinsam auswerten",
    "description": "allSettled wartet auf jede Aufgabe und liefert für jede einen Status. Eine einzelne Ablehnung verwirft nicht die übrigen Ergebnisse.",
    "syntax": "const liste = await Promise.allSettled(promises);\n// {status: \"fulfilled\", value: …} oder {status: \"rejected\", reason: …}",
    "parts": [
      [
        "status",
        "Zeigt an, ob eine Aufgabe erfüllt oder abgelehnt wurde."
      ],
      [
        "value / reason",
        "Ergebnis bei Erfolg oder Fehlergrund bei Ablehnung."
      ],
      [
        "Eingabereihenfolge",
        "Die Statusliste folgt wie bei all der Reihenfolge der Eingaben."
      ]
    ],
    "note": "allSettled und all haben unterschiedliche Fehlerregeln. Verwende allSettled, wenn du die Ergebnisse aller Jobs brauchst, auch bei einzelnen Fehlern.",
    "detail": "Schreibe settled(daten). Jeder Eintrag hat ok (Boolean) und wert (Zahl). Erzeuge entsprechend erfüllte oder mit Error(\"Fehler\") abgelehnte Promises. Gib pro Ergebnis {ok:true, wert} oder {ok:false, fehler:\"Fehler\"} zurück.",
    "functionName": "settled",
    "parameter": "daten",
    "task": "Schreibe settled(daten). Jeder Eintrag hat ok (Boolean) und wert (Zahl). Erzeuge entsprechend erfüllte oder mit Error(\"Fehler\") abgelehnte Promises. Gib pro Ergebnis {ok:true, wert} oder {ok:false, fehler:\"Fehler\"} zurück.",
    "tests": [
      {
        "input": [
          {
            "ok": true,
            "wert": 5
          },
          {
            "ok": false,
            "wert": 2
          }
        ],
        "expected": [
          {
            "ok": true,
            "wert": 5
          },
          {
            "ok": false,
            "fehler": "Fehler"
          }
        ]
      },
      {
        "input": [],
        "expected": []
      },
      {
        "input": [
          {
            "ok": false,
            "wert": 0
          }
        ],
        "expected": [
          {
            "ok": false,
            "fehler": "Fehler"
          }
        ]
      },
      {
        "input": [
          {
            "ok": true,
            "wert": 0
          }
        ],
        "expected": [
          {
            "ok": true,
            "wert": 0
          }
        ]
      }
    ],
    "hints": [
      "Zeigt an, ob eine Aufgabe erfüllt oder abgelehnt wurde.",
      "await wartet auf sämtliche Statuswerte. map überführt sie in das verlangte Ausgabeformat. Ein erfolgreich gelieferter Wert 0 ist kein Fehler."
    ],
    "solution": "async function settled(daten) {\n  const jobs = daten.map(eintrag => eintrag.ok\n    ? Promise.resolve(eintrag.wert)\n    : Promise.reject(new Error(\"Fehler\")));\n  const ergebnisse = await Promise.allSettled(jobs);\n  return ergebnisse.map(eintrag => eintrag.status === \"fulfilled\"\n    ? { ok: true, wert: eintrag.value }\n    : { ok: false, fehler: eintrag.reason.message });\n}",
    "explanation": "await wartet auf sämtliche Statuswerte. map überführt sie in das verlangte Ausgabeformat. Ein erfolgreich gelieferter Wert 0 ist kein Fehler.",
    "preserveInput": true,
    "starter": "async function settled(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function settled(daten) {\n  const jobs = daten.map(eintrag => eintrag.ok\n    ? Promise.resolve(eintrag.wert)\n    : Promise.reject(new Error(\"Fehler\")));\n  const ergebnisse = await Promise.allSettled(jobs);\n  return ergebnisse.map(eintrag => eintrag.status === \"fulfilled\"\n    ? { ok: true, wert: eintrag.value }\n    : { ok: false, fehler: eintrag.reason.message });\n}\n\nconsole.log(await settled([{\"ok\": true, \"wert\": 5}, {\"ok\": false, \"wert\": 2}]));"
  },
  {
    "id": "js-str-split-join",
    "course": "js",
    "category": "String-Werkzeuge",
    "name": ".split() und .join()",
    "title": "Wörter zerlegen und wieder zusammensetzen",
    "description": "split macht aus einem String ein Array. join setzt Arrayelemente mit einem frei gewählten Trenntext wieder zusammen.",
    "syntax": "text.trim().split(/\\s+/).filter(Boolean).join(\"-\");",
    "parts": [
      [
        "trim()",
        "Entfernt Leerraum am Anfang und Ende."
      ],
      [
        "/\\s+/",
        "Ein regulärer Ausdruck für eine oder mehrere aufeinanderfolgende Leerraumzeichen."
      ],
      [
        "split / join",
        "Zerlegt den Text und verbindet die Teile wieder."
      ]
    ],
    "note": "Bei einem leeren String liefert split hier [\"\"]. filter(Boolean) entfernt leere Wörter, bevor sie zusammengefügt werden.",
    "detail": "Schreibe splitJoin(daten). daten ist Text. Entferne äußeren Leerraum und verbinde durch Leerraum getrennte Wörter mit Bindestrichen. Mehrere Leerzeichen, Tabs und Zeilenumbrüche zählen als Trennung; leere Eingabe ergibt \"\".",
    "functionName": "splitJoin",
    "parameter": "daten",
    "task": "Schreibe splitJoin(daten). daten ist Text. Entferne äußeren Leerraum und verbinde durch Leerraum getrennte Wörter mit Bindestrichen. Mehrere Leerzeichen, Tabs und Zeilenumbrüche zählen als Trennung; leere Eingabe ergibt \"\".",
    "tests": [
      {
        "input": "  Hallo   Welt  ",
        "expected": "Hallo-Welt"
      },
      {
        "input": "A\tB\nC",
        "expected": "A-B-C"
      },
      {
        "input": "",
        "expected": ""
      },
      {
        "input": "  \n ",
        "expected": ""
      }
    ],
    "hints": [
      "Entfernt Leerraum am Anfang und Ende.",
      "trim entfernt die äußeren Zeichen. split gruppiert zusammenhängenden Leerraum als eine Trennung. join fügt zwischen den verbleibenden Wörtern genau einen Bindestrich ein."
    ],
    "solution": "function splitJoin(daten) {\n  return daten.trim().split(/\\s+/).filter(Boolean).join(\"-\");\n}",
    "explanation": "trim entfernt die äußeren Zeichen. split gruppiert zusammenhängenden Leerraum als eine Trennung. join fügt zwischen den verbleibenden Wörtern genau einen Bindestrich ein.",
    "preserveInput": true,
    "starter": "function splitJoin(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function splitJoin(daten) {\n  return daten.trim().split(/\\s+/).filter(Boolean).join(\"-\");\n}\n\nconsole.log(splitJoin(\"  Hallo   Welt  \"));"
  },
  {
    "id": "js-str-replace-all",
    "course": "js",
    "category": "String-Werkzeuge",
    "name": ".replaceAll()",
    "title": "Alle Vorkommen eines festen Textes ersetzen",
    "description": "replaceAll ersetzt sämtliche passenden Stellen. Bei einem String als Suchwert wird dieser wörtlich und nicht als regulärer Ausdruck behandelt.",
    "syntax": "text.replaceAll(suchen, ersetzen);",
    "parts": [
      [
        "Such-String",
        "Wird buchstäblich gesucht, auch wenn er Zeichen wie . oder * enthält."
      ],
      [
        "Alle Vorkommen",
        "Anders als replace mit Stringsuche wird nicht nur der erste Treffer ersetzt."
      ],
      [
        "Neuer String",
        "Strings werden nicht verändert; die Methode liefert einen neuen Text."
      ]
    ],
    "note": "Ersetzungen werden nicht erneut rekursiv ersetzt. Diese Aufgabe beschränkt Such- und Ersatztexte auf nichtleere bzw. beliebige Texte ohne das Sonderzeichen $, damit keine Ersetzungsmuster nötig sind.",
    "detail": "Schreibe replaceAll(daten) für {text, suchen, ersetzen}. suchen ist nichtleer. Ersetze alle wörtlichen Vorkommen und gib den neuen Text zurück. Such- und Ersatztexte enthalten kein $.",
    "functionName": "allesErsetzen",
    "parameter": "daten",
    "task": "Schreibe allesErsetzen(daten) für {text, suchen, ersetzen}. suchen ist nichtleer. Ersetze alle wörtlichen Vorkommen und gib den neuen Text zurück. Such- und Ersatztexte enthalten kein $.",
    "tests": [
      {
        "input": {
          "text": "rot rot blau",
          "suchen": "rot",
          "ersetzen": "grün"
        },
        "expected": "grün grün blau"
      },
      {
        "input": {
          "text": "a.b.c",
          "suchen": ".",
          "ersetzen": "-"
        },
        "expected": "a-b-c"
      },
      {
        "input": {
          "text": "aaaa",
          "suchen": "aa",
          "ersetzen": "b"
        },
        "expected": "bb"
      },
      {
        "input": {
          "text": "abc",
          "suchen": "x",
          "ersetzen": "y"
        },
        "expected": "abc"
      },
      {
        "input": {
          "text": "",
          "suchen": "a",
          "ersetzen": ""
        },
        "expected": ""
      }
    ],
    "hints": [
      "Wird buchstäblich gesucht, auch wenn er Zeichen wie . oder * enthält.",
      "replaceAll durchsucht den ursprünglichen String. Ein Punkt ist hier ein echter Punkt, kein Regex-Platzhalter. Nicht überlappende Treffer werden ersetzt."
    ],
    "solution": "function allesErsetzen(daten) {\n  return daten.text.replaceAll(daten.suchen, daten.ersetzen);\n}",
    "explanation": "replaceAll durchsucht den ursprünglichen String. Ein Punkt ist hier ein echter Punkt, kein Regex-Platzhalter. Nicht überlappende Treffer werden ersetzt.",
    "preserveInput": true,
    "starter": "function allesErsetzen(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function allesErsetzen(daten) {\n  return daten.text.replaceAll(daten.suchen, daten.ersetzen);\n}\n\nconsole.log(allesErsetzen({\"text\": \"rot rot blau\", \"suchen\": \"rot\", \"ersetzen\": \"grün\"}));"
  },
  {
    "id": "js-str-pad",
    "course": "js",
    "category": "String-Werkzeuge",
    "name": ".padStart()",
    "title": "Zahlen als Text mit führenden Nullen anzeigen",
    "description": "padStart füllt einen String links bis zur gewünschten Länge auf. Vorher musst du eine Zahl in einen String umwandeln.",
    "syntax": "String(7).padStart(3, \"0\"); // \"007\"",
    "parts": [
      [
        "String(wert)",
        "Erzeugt den Text für die Anzeige."
      ],
      [
        "padStart(laenge, \"0\")",
        "Füllt fehlende Zeichen links mit Nullen."
      ],
      [
        "Mindestlänge",
        "Ein längerer String bleibt unverändert und wird nicht abgeschnitten."
      ]
    ],
    "note": "Die Ausgabe ist ein String, keine Zahl. Führende Nullen sind ein Darstellungsformat, kein neuer Zahlenwert.",
    "detail": "Schreibe pad(daten) für {zahl, breite}. zahl und breite sind kleine nichtnegative ganze Zahlen. Gib die Zahl als String zurück, links mit Nullen bis mindestens breite Zeichen aufgefüllt.",
    "functionName": "pad",
    "parameter": "daten",
    "task": "Schreibe pad(daten) für {zahl, breite}. zahl und breite sind kleine nichtnegative ganze Zahlen. Gib die Zahl als String zurück, links mit Nullen bis mindestens breite Zeichen aufgefüllt.",
    "tests": [
      {
        "input": {
          "zahl": 7,
          "breite": 3
        },
        "expected": "007"
      },
      {
        "input": {
          "zahl": 0,
          "breite": 2
        },
        "expected": "00"
      },
      {
        "input": {
          "zahl": 1234,
          "breite": 2
        },
        "expected": "1234"
      },
      {
        "input": {
          "zahl": 8,
          "breite": 0
        },
        "expected": "8"
      }
    ],
    "hints": [
      "Erzeugt den Text für die Anzeige.",
      "Die Typumwandlung ermöglicht die Stringmethode. Die Breite ist eine Mindestlänge; 1234 wird bei Breite 2 nicht gekürzt."
    ],
    "solution": "function pad(daten) {\n  return String(daten.zahl).padStart(daten.breite, \"0\");\n}",
    "explanation": "Die Typumwandlung ermöglicht die Stringmethode. Die Breite ist eine Mindestlänge; 1234 wird bei Breite 2 nicht gekürzt.",
    "preserveInput": true,
    "starter": "function pad(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function pad(daten) {\n  return String(daten.zahl).padStart(daten.breite, \"0\");\n}\n\nconsole.log(pad({\"zahl\": 7, \"breite\": 3}));"
  },
  {
    "id": "js-str-at",
    "course": "js",
    "category": "String-Werkzeuge",
    "name": ".at()",
    "title": "Das letzte Zeichen mit einem negativen Index lesen",
    "description": "at kann einen Index vom Ende aus verwenden. -1 bezeichnet die letzte Position, -2 die vorletzte.",
    "syntax": "\"Code\".at(-1); // \"e\"",
    "parts": [
      [
        "Negativer Index",
        "Zählt vom Ende des Strings."
      ],
      [
        "undefined",
        "Entsteht, wenn die Position nicht vorhanden ist."
      ],
      [
        "?? null",
        "Normalisiert hier einen fehlenden Wert zu null."
      ]
    ],
    "note": "String-Indizes beziehen sich auf UTF-16-Codeeinheiten. Für zusammengesetzte Zeichen oder viele Emojis ist at(-1) nicht automatisch das letzte sichtbare Zeichen. Diese Aufgabe verwendet ASCII-Text.",
    "detail": "Schreibe at(daten). Gib die letzte UTF-16-Codeeinheit des ASCII-Strings daten zurück; für \"\" null.",
    "functionName": "at",
    "parameter": "daten",
    "task": "Schreibe at(daten). Gib die letzte UTF-16-Codeeinheit des ASCII-Strings daten zurück; für \"\" null.",
    "tests": [
      {
        "input": "Code",
        "expected": "e"
      },
      {
        "input": "A",
        "expected": "A"
      },
      {
        "input": "",
        "expected": null
      },
      {
        "input": "abc ",
        "expected": " "
      }
    ],
    "hints": [
      "Zählt vom Ende des Strings.",
      "at(-1) liest die letzte Position. Bei einem leeren String liefert es undefined und ?? macht daraus null."
    ],
    "solution": "function at(daten) {\n  return daten.at(-1) ?? null;\n}",
    "explanation": "at(-1) liest die letzte Position. Bei einem leeren String liefert es undefined und ?? macht daraus null.",
    "preserveInput": true,
    "starter": "function at(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function at(daten) {\n  return daten.at(-1) ?? null;\n}\n\nconsole.log(at(\"Code\"));"
  }
];
