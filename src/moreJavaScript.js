export const moreJavaScriptLessons = [
  {
    "id": "js-class-constructor",
    "course": "js",
    "category": "Klassen & this",
    "name": "class / new",
    "title": "Mit einer Klasse eigene Objekte erzeugen",
    "description": "Eine Klasse beschreibt, wie neue Instanzen aufgebaut werden. Der Konstruktor initialisiert jede Instanz mit ihren eigenen Werten.",
    "syntax": "class Spieler { constructor(name) { this.name = name; } }\nconst spieler = new Spieler(\"Ada\");",
    "parts": [
      [
        "constructor",
        "Wird beim Erzeugen einer Instanz mit new ausgeführt."
      ],
      [
        "this.name",
        "Speichert eine Eigenschaft auf der aktuellen Instanz."
      ],
      [
        "new Spieler(name)",
        "Erzeugt ein neues Objekt und ruft den Konstruktor auf."
      ]
    ],
    "note": "Eine Klasse ist eine Vorlage, keine einzelne Instanz. Zwei new-Aufrufe erzeugen unterschiedliche Objekte.",
    "detail": "Erzeuge in der Funktion eine Klasse Spieler mit name und punkte. daten ist eine Liste von {name, punkte}; gib für jede neue Instanz wieder {name, punkte} als normales Ausgabeobjekt zurück.",
    "functionName": "lerneClassConstructor",
    "parameter": "daten",
    "task": "Erzeuge in der Funktion eine Klasse Spieler mit name und punkte. daten ist eine Liste von {name, punkte}; gib für jede neue Instanz wieder {name, punkte} als normales Ausgabeobjekt zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          {
            "name": "Ada",
            "punkte": 5
          },
          {
            "name": "Ben",
            "punkte": 0
          }
        ],
        "expected": [
          {
            "name": "Ada",
            "punkte": 5
          },
          {
            "name": "Ben",
            "punkte": 0
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
            "name": "",
            "punkte": -2
          }
        ],
        "expected": [
          {
            "name": "",
            "punkte": -2
          }
        ]
      }
    ],
    "hints": [
      "Wird beim Erzeugen einer Instanz mit new ausgeführt.",
      "Jede Instanz besitzt ihre eigenen Eigenschaften. Die Ausgabe wird ausdrücklich als normales JSON-Objekt aufgebaut, damit du Zustand und Klassenvorlage unterscheiden kannst."
    ],
    "solution": "function lerneClassConstructor(daten) {\n  class Spieler {\n    constructor(name, punkte) { this.name = name; this.punkte = punkte; }\n  }\n  return daten.map(eintrag => {\n    const spieler = new Spieler(eintrag.name, eintrag.punkte);\n    return { name: spieler.name, punkte: spieler.punkte };\n  });\n}",
    "explanation": "Jede Instanz besitzt ihre eigenen Eigenschaften. Die Ausgabe wird ausdrücklich als normales JSON-Objekt aufgebaut, damit du Zustand und Klassenvorlage unterscheiden kannst.",
    "preserveInput": true,
    "starter": "function lerneClassConstructor(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneClassConstructor(daten) {\n  class Spieler {\n    constructor(name, punkte) { this.name = name; this.punkte = punkte; }\n  }\n  return daten.map(eintrag => {\n    const spieler = new Spieler(eintrag.name, eintrag.punkte);\n    return { name: spieler.name, punkte: spieler.punkte };\n  });\n}\n\nconsole.log(lerneClassConstructor([{\"name\": \"Ada\", \"punkte\": 5}, {\"name\": \"Ben\", \"punkte\": 0}]));"
  },
  {
    "id": "js-class-method",
    "course": "js",
    "category": "Klassen & this",
    "name": "Methoden / this",
    "title": "Den eigenen Zustand mit einer Klassenmethode ändern",
    "description": "Eine Instanzmethode kann über this auf den Zustand des Objekts zugreifen. Derselbe Methodencode arbeitet dadurch mit verschiedenen Instanzen.",
    "syntax": "class Zaehler { erhoehen(wert) { this.stand += wert; return this.stand; } }",
    "parts": [
      [
        "this.stand",
        "Liest oder verändert den Zustand dieser Instanz."
      ],
      [
        "objekt.erhoehen(wert)",
        "Der Methodenaufruf bindet this an objekt."
      ],
      [
        "return this.stand",
        "Liefert den neuen Zustand für die Ausgabe."
      ]
    ],
    "note": "Ein globaler stand wäre gemeinsamer Zustand und würde die Instanzen koppeln. Verwende eine Eigenschaft der Instanz.",
    "detail": "daten ist {start, schritte} mit kleinen Zahlen. Baue eine Zaehler-Klasse, erhöhe ihren stand nacheinander um jeden Schritt und gib die Zwischenstände zurück.",
    "functionName": "lerneClassMethod",
    "parameter": "daten",
    "task": "daten ist {start, schritte} mit kleinen Zahlen. Baue eine Zaehler-Klasse, erhöhe ihren stand nacheinander um jeden Schritt und gib die Zwischenstände zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "start": 5,
          "schritte": [
            2,
            -1,
            0
          ]
        },
        "expected": [
          7,
          6,
          6
        ]
      },
      {
        "input": {
          "start": 0,
          "schritte": [
            1,
            1
          ]
        },
        "expected": [
          1,
          2
        ]
      },
      {
        "input": {
          "start": 3,
          "schritte": []
        },
        "expected": []
      },
      {
        "input": {
          "start": -2,
          "schritte": [
            2
          ]
        },
        "expected": [
          0
        ]
      }
    ],
    "hints": [
      "Liest oder verändert den Zustand dieser Instanz.",
      "zaehler.erhoehen bindet this an den Zähler. Jeder Schritt baut auf dem vorherigen Zustand auf; ein Schritt 0 ist ebenfalls ein gültiger Aufruf."
    ],
    "solution": "function lerneClassMethod(daten) {\n  class Zaehler {\n    constructor(start) { this.stand = start; }\n    erhoehen(wert) { this.stand += wert; return this.stand; }\n  }\n  const zaehler = new Zaehler(daten.start);\n  return daten.schritte.map(wert => zaehler.erhoehen(wert));\n}",
    "explanation": "zaehler.erhoehen bindet this an den Zähler. Jeder Schritt baut auf dem vorherigen Zustand auf; ein Schritt 0 ist ebenfalls ein gültiger Aufruf.",
    "preserveInput": true,
    "starter": "function lerneClassMethod(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneClassMethod(daten) {\n  class Zaehler {\n    constructor(start) { this.stand = start; }\n    erhoehen(wert) { this.stand += wert; return this.stand; }\n  }\n  const zaehler = new Zaehler(daten.start);\n  return daten.schritte.map(wert => zaehler.erhoehen(wert));\n}\n\nconsole.log(lerneClassMethod({\"start\": 5, \"schritte\": [2, -1, 0]}));"
  },
  {
    "id": "js-class-getter",
    "course": "js",
    "category": "Klassen & this",
    "name": "get / Getter",
    "title": "Einen berechneten Wert über einen Getter lesen",
    "description": "Ein Getter sieht beim Zugriff wie eine Eigenschaft aus, berechnet seinen Wert aber durch eine Funktion.",
    "syntax": "get flaeche() { return this.breite * this.hoehe; }\nrechteck.flaeche;",
    "parts": [
      [
        "get flaeche()",
        "Definiert einen berechneten Eigenschaftszugriff."
      ],
      [
        "Ohne Aufrufklammern",
        "Lies rechteck.flaeche, nicht rechteck.flaeche()."
      ],
      [
        "Berechnung beim Lesen",
        "Eine spätere Änderung der Maße beeinflusst den nächsten Zugriff."
      ]
    ],
    "note": "Ein Getter speichert sein Ergebnis nicht automatisch. Vermeide überraschende Nebenwirkungen in Gettern.",
    "detail": "daten hat breite, hoehe und neuBreite (nichtnegative Zahlen). Erzeuge ein Rechteck mit Getter flaeche, lies die Fläche, ändere seine Breite und gib [erste Fläche, neue Fläche] zurück.",
    "functionName": "lerneClassGetter",
    "parameter": "daten",
    "task": "daten hat breite, hoehe und neuBreite (nichtnegative Zahlen). Erzeuge ein Rechteck mit Getter flaeche, lies die Fläche, ändere seine Breite und gib [erste Fläche, neue Fläche] zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "breite": 3,
          "hoehe": 4,
          "neuBreite": 5
        },
        "expected": [
          12,
          20
        ]
      },
      {
        "input": {
          "breite": 0,
          "hoehe": 2,
          "neuBreite": 3
        },
        "expected": [
          0,
          6
        ]
      },
      {
        "input": {
          "breite": 2.5,
          "hoehe": 2,
          "neuBreite": 1
        },
        "expected": [
          5,
          2
        ]
      }
    ],
    "hints": [
      "Definiert einen berechneten Eigenschaftszugriff.",
      "Der erste Zugriff berechnet die ursprüngliche Fläche. Nach dem Ändern von breite berechnet der zweite Zugriff mit den aktuellen Maßen statt mit einem alten gespeicherten Ergebnis."
    ],
    "solution": "function lerneClassGetter(daten) {\n  class Rechteck {\n    constructor(breite, hoehe) { this.breite = breite; this.hoehe = hoehe; }\n    get flaeche() { return this.breite * this.hoehe; }\n  }\n  const rechteck = new Rechteck(daten.breite, daten.hoehe);\n  const vorher = rechteck.flaeche;\n  rechteck.breite = daten.neuBreite;\n  return [vorher, rechteck.flaeche];\n}",
    "explanation": "Der erste Zugriff berechnet die ursprüngliche Fläche. Nach dem Ändern von breite berechnet der zweite Zugriff mit den aktuellen Maßen statt mit einem alten gespeicherten Ergebnis.",
    "preserveInput": true,
    "starter": "function lerneClassGetter(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneClassGetter(daten) {\n  class Rechteck {\n    constructor(breite, hoehe) { this.breite = breite; this.hoehe = hoehe; }\n    get flaeche() { return this.breite * this.hoehe; }\n  }\n  const rechteck = new Rechteck(daten.breite, daten.hoehe);\n  const vorher = rechteck.flaeche;\n  rechteck.breite = daten.neuBreite;\n  return [vorher, rechteck.flaeche];\n}\n\nconsole.log(lerneClassGetter({\"breite\": 3, \"hoehe\": 4, \"neuBreite\": 5}));"
  },
  {
    "id": "js-class-bind",
    "course": "js",
    "category": "Klassen & this",
    "name": ".bind(this)",
    "title": "Eine Methode als Callback mit dem richtigen this übergeben",
    "description": "Beim Weitergeben einer Methode geht ihr ursprünglicher Aufrufkontext verloren. bind erzeugt eine Funktion mit fest gebundenem this.",
    "syntax": "const callback = rechner.multiplizieren.bind(rechner);\nwerte.map(callback);",
    "parts": [
      [
        "Methodenreferenz",
        "objekt.methode ist ein Funktionswert, kein Methodenaufruf."
      ],
      [
        "bind(objekt)",
        "Erzeugt eine neue Funktion mit festem this."
      ],
      [
        "map(callback)",
        "Darf den Callback aufrufen, ohne den ursprünglichen Methodenempfänger zu kennen."
      ]
    ],
    "note": "Klassenmethoden laufen im Strict Mode. Eine ungebundene Methode, die this braucht, scheitert beim gewöhnlichen Callback-Aufruf.",
    "detail": "daten ist {faktor, werte} mit Zahlen. Definiere eine Klasse Multiplikator mit Methode multiplizieren. Übergib diese Methode mit bind als map-Callback und gib die Produkte zurück.",
    "functionName": "lerneClassBind",
    "parameter": "daten",
    "task": "daten ist {faktor, werte} mit Zahlen. Definiere eine Klasse Multiplikator mit Methode multiplizieren. Übergib diese Methode mit bind als map-Callback und gib die Produkte zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "faktor": 3,
          "werte": [
            1,
            2
          ]
        },
        "expected": [
          3,
          6
        ]
      },
      {
        "input": {
          "faktor": 0,
          "werte": [
            2,
            4
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
            -3
          ]
        },
        "expected": [
          -2,
          3
        ]
      },
      {
        "input": {
          "faktor": 2,
          "werte": []
        },
        "expected": []
      }
    ],
    "hints": [
      "objekt.methode ist ein Funktionswert, kein Methodenaufruf.",
      "bind bewahrt den Empfänger rechner. map übergibt zusätzliche Argumente wie den Index; die Methode verwendet hier nur den ersten Parameter wert."
    ],
    "solution": "function lerneClassBind(daten) {\n  class Multiplikator {\n    constructor(faktor) { this.faktor = faktor; }\n    multiplizieren(wert) { return wert * this.faktor; }\n  }\n  const rechner = new Multiplikator(daten.faktor);\n  return daten.werte.map(rechner.multiplizieren.bind(rechner));\n}",
    "explanation": "bind bewahrt den Empfänger rechner. map übergibt zusätzliche Argumente wie den Index; die Methode verwendet hier nur den ersten Parameter wert.",
    "preserveInput": true,
    "starter": "function lerneClassBind(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneClassBind(daten) {\n  class Multiplikator {\n    constructor(faktor) { this.faktor = faktor; }\n    multiplizieren(wert) { return wert * this.faktor; }\n  }\n  const rechner = new Multiplikator(daten.faktor);\n  return daten.werte.map(rechner.multiplizieren.bind(rechner));\n}\n\nconsole.log(lerneClassBind({\"faktor\": 3, \"werte\": [1, 2]}));"
  },
  {
    "id": "js-class-private",
    "course": "js",
    "category": "Klassen & this",
    "name": "Private Felder #",
    "title": "Zustand mit einem privaten Klassenfeld kapseln",
    "description": "Ein Feld mit # kann nur innerhalb der Klasse angesprochen werden. Methoden kontrollieren, welche Zustandsänderungen möglich sind.",
    "syntax": "class Konto { #stand; constructor(start) { this.#stand = start; } }",
    "parts": [
      [
        "#stand",
        "Ein echtes privates Feld und keine gewöhnliche Eigenschaft namens stand."
      ],
      [
        "Methode einzahlen",
        "Bietet einen kontrollierten Zugang zum privaten Zustand."
      ],
      [
        "Getter stand",
        "Gibt einen lesbaren Wert nach außen, ohne das private Feld direkt offenzulegen."
      ]
    ],
    "note": "Ein führender Unterstrich ist nur eine Konvention. # ist eine von JavaScript durchgesetzte Zugriffsregel.",
    "detail": "daten hat start und einzahlungen: nichtnegative ganze Cent-Beträge. Baue ein Konto mit privatem #stand, einzahlen(betrag) und Getter stand. Gib alle Zwischenstände nach den Einzahlungen zurück.",
    "functionName": "lerneClassPrivate",
    "parameter": "daten",
    "task": "daten hat start und einzahlungen: nichtnegative ganze Cent-Beträge. Baue ein Konto mit privatem #stand, einzahlen(betrag) und Getter stand. Gib alle Zwischenstände nach den Einzahlungen zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "start": 100,
          "einzahlungen": [
            20,
            0,
            30
          ]
        },
        "expected": [
          120,
          120,
          150
        ]
      },
      {
        "input": {
          "start": 0,
          "einzahlungen": [
            1
          ]
        },
        "expected": [
          1
        ]
      },
      {
        "input": {
          "start": 50,
          "einzahlungen": []
        },
        "expected": []
      }
    ],
    "hints": [
      "Ein echtes privates Feld und keine gewöhnliche Eigenschaft namens stand.",
      "Die öffentliche Methode verändert ausschließlich das private Feld. Der Getter ermöglicht das Lesen. Diese Übung behandelt noch keine vollständige Kontovalidierung oder echte Finanzsoftware."
    ],
    "solution": "function lerneClassPrivate(daten) {\n  class Konto {\n    #stand;\n    constructor(start) { this.#stand = start; }\n    einzahlen(betrag) { this.#stand += betrag; }\n    get stand() { return this.#stand; }\n  }\n  const konto = new Konto(daten.start);\n  return daten.einzahlungen.map(betrag => { konto.einzahlen(betrag); return konto.stand; });\n}",
    "explanation": "Die öffentliche Methode verändert ausschließlich das private Feld. Der Getter ermöglicht das Lesen. Diese Übung behandelt noch keine vollständige Kontovalidierung oder echte Finanzsoftware.",
    "preserveInput": true,
    "starter": "function lerneClassPrivate(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneClassPrivate(daten) {\n  class Konto {\n    #stand;\n    constructor(start) { this.#stand = start; }\n    einzahlen(betrag) { this.#stand += betrag; }\n    get stand() { return this.#stand; }\n  }\n  const konto = new Konto(daten.start);\n  return daten.einzahlungen.map(betrag => { konto.einzahlen(betrag); return konto.stand; });\n}\n\nconsole.log(lerneClassPrivate({\"start\": 100, \"einzahlungen\": [20, 0, 30]}));"
  },
  {
    "id": "js-class-inherit",
    "course": "js",
    "category": "Klassen & this",
    "name": "extends / super",
    "title": "Eine Klasse erweitern und den Basiskonstruktor aufrufen",
    "description": "extends verbindet eine Unterklasse mit einer Basisklasse. super ruft im Konstruktor die Initialisierung der Basisklasse auf.",
    "syntax": "class Premium extends Spieler { constructor(name, bonus) { super(name); this.bonus = bonus; } }",
    "parts": [
      [
        "extends Spieler",
        "Erweitert die Basisklasse und übernimmt ihre Methoden."
      ],
      [
        "super(...)",
        "Initialisiert die Basis vor einem Zugriff auf this im Unterklassenkonstruktor."
      ],
      [
        "Eigene Methode",
        "Kann den Zustand aus Basis und Unterklasse gemeinsam verwenden."
      ]
    ],
    "note": "In einem abgeleiteten Konstruktor musst du super aufrufen, bevor du this verwendest. Nutze Vererbung für passende Beziehungen; oft genügt auch das Zusammensetzen von Objekten.",
    "detail": "daten hat name, punkte und bonus. Baue Spieler als Basisklasse und PremiumSpieler als Unterklasse. Gib {name, gesamt: punkte + bonus} zurück.",
    "functionName": "lerneClassInherit",
    "parameter": "daten",
    "task": "daten hat name, punkte und bonus. Baue Spieler als Basisklasse und PremiumSpieler als Unterklasse. Gib {name, gesamt: punkte + bonus} zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "name": "Ada",
          "punkte": 10,
          "bonus": 5
        },
        "expected": {
          "name": "Ada",
          "gesamt": 15
        }
      },
      {
        "input": {
          "name": "Ben",
          "punkte": 0,
          "bonus": 0
        },
        "expected": {
          "name": "Ben",
          "gesamt": 0
        }
      },
      {
        "input": {
          "name": "",
          "punkte": 5,
          "bonus": -2
        },
        "expected": {
          "name": "",
          "gesamt": 3
        }
      }
    ],
    "hints": [
      "Erweitert die Basisklasse und übernimmt ihre Methoden.",
      "super setzt name und punkte. Erst danach speichert die Unterklasse bonus. Ihre Methode greift auf alle drei Instanzeigenschaften zu."
    ],
    "solution": "function lerneClassInherit(daten) {\n  class Spieler {\n    constructor(name, punkte) { this.name = name; this.punkte = punkte; }\n  }\n  class PremiumSpieler extends Spieler {\n    constructor(name, punkte, bonus) { super(name, punkte); this.bonus = bonus; }\n    gesamt() { return this.punkte + this.bonus; }\n  }\n  const spieler = new PremiumSpieler(daten.name, daten.punkte, daten.bonus);\n  return { name: spieler.name, gesamt: spieler.gesamt() };\n}",
    "explanation": "super setzt name und punkte. Erst danach speichert die Unterklasse bonus. Ihre Methode greift auf alle drei Instanzeigenschaften zu.",
    "preserveInput": true,
    "starter": "function lerneClassInherit(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneClassInherit(daten) {\n  class Spieler {\n    constructor(name, punkte) { this.name = name; this.punkte = punkte; }\n  }\n  class PremiumSpieler extends Spieler {\n    constructor(name, punkte, bonus) { super(name, punkte); this.bonus = bonus; }\n    gesamt() { return this.punkte + this.bonus; }\n  }\n  const spieler = new PremiumSpieler(daten.name, daten.punkte, daten.bonus);\n  return { name: spieler.name, gesamt: spieler.gesamt() };\n}\n\nconsole.log(lerneClassInherit({\"name\": \"Ada\", \"punkte\": 10, \"bonus\": 5}));"
  },
  {
    "id": "js-error-throw",
    "course": "js",
    "category": "Fehlerbehandlung",
    "name": "throw / Error",
    "title": "Ungültige Eingaben mit einem Error melden",
    "description": "throw unterbricht den normalen Ablauf. Ein Error-Objekt trägt einen Namen und eine Nachricht, die ein catch-Block auslesen kann.",
    "syntax": "if (zahl < 0) throw new Error(\"Negativ\");",
    "parts": [
      [
        "throw new Error(...)",
        "Erzeugt einen Fehler und wirft ihn."
      ],
      [
        "try / catch",
        "Fängt den Fehler in einem umgebenden Block ab."
      ],
      [
        "fehler.message",
        "Liest die erklärende Nachricht."
      ]
    ],
    "note": "Ein Fehler soll nicht still verschwinden. Gib hier bewusst ein strukturiertes Ergebnis für Erfolg oder Fehler zurück.",
    "detail": "daten ist eine endliche Zahl. Prüfe in einer Hilfsfunktion, ob sie nichtnegativ ist; andernfalls wirf Error(\"Negativ\"). Gib {ok:true, wert: daten} oder nach dem Abfangen {ok:false, fehler:\"Negativ\"} zurück.",
    "functionName": "lerneErrorThrow",
    "parameter": "daten",
    "task": "daten ist eine endliche Zahl. Prüfe in einer Hilfsfunktion, ob sie nichtnegativ ist; andernfalls wirf Error(\"Negativ\"). Gib {ok:true, wert: daten} oder nach dem Abfangen {ok:false, fehler:\"Negativ\"} zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": 3,
        "expected": {
          "ok": true,
          "wert": 3
        }
      },
      {
        "input": 0,
        "expected": {
          "ok": true,
          "wert": 0
        }
      },
      {
        "input": -2,
        "expected": {
          "ok": false,
          "fehler": "Negativ"
        }
      },
      {
        "input": -0.5,
        "expected": {
          "ok": false,
          "fehler": "Negativ"
        }
      }
    ],
    "hints": [
      "Erzeugt einen Fehler und wirft ihn.",
      "Die Hilfsfunktion beendet bei einem Fehler ihren normalen Ablauf. catch erzeugt das Fehlerformat. Null ist eine erlaubte Zahl und kein Fehler."
    ],
    "solution": "function lerneErrorThrow(daten) {\n  function pruefen(zahl) { if (zahl < 0) throw new Error(\"Negativ\"); return zahl; }\n  try { return { ok: true, wert: pruefen(daten) }; }\n  catch (fehler) { return { ok: false, fehler: fehler.message }; }\n}",
    "explanation": "Die Hilfsfunktion beendet bei einem Fehler ihren normalen Ablauf. catch erzeugt das Fehlerformat. Null ist eine erlaubte Zahl und kein Fehler.",
    "preserveInput": true,
    "starter": "function lerneErrorThrow(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneErrorThrow(daten) {\n  function pruefen(zahl) { if (zahl < 0) throw new Error(\"Negativ\"); return zahl; }\n  try { return { ok: true, wert: pruefen(daten) }; }\n  catch (fehler) { return { ok: false, fehler: fehler.message }; }\n}\n\nconsole.log(lerneErrorThrow(3));"
  },
  {
    "id": "js-error-json",
    "course": "js",
    "category": "Fehlerbehandlung",
    "name": "SyntaxError / JSON",
    "title": "Fehlerhaftes JSON gezielt behandeln",
    "description": "JSON.parse wirft bei ungültigem JSON einen SyntaxError. Du kannst diesen Fehler erkennen und echte JSON-Werte von einem Parsefehler unterscheiden.",
    "syntax": "try { return JSON.parse(text); } catch (fehler) { if (fehler instanceof SyntaxError) … }",
    "parts": [
      [
        "JSON.parse",
        "Wandelt gültigen JSON-Text in einen JavaScript-Wert um."
      ],
      [
        "instanceof SyntaxError",
        "Erkennt die konkrete Fehlerklasse."
      ],
      [
        "throw fehler",
        "Gibt unerwartete Fehler weiter, statt sie zu verschlucken."
      ]
    ],
    "note": "Gültiges JSON \"null\" ergibt null und ist trotzdem ein Erfolg. Verwende einen eigenen ok-Status statt einer Wahrheitstests des Ergebnisses.",
    "detail": "daten ist ein String. Gib nach JSON.parse {ok:true, wert} zurück. Bei SyntaxError gib {ok:false, fehler:\"Ungueltiges JSON\"} zurück; unerwartete andere Fehler sollen weitergeworfen werden.",
    "functionName": "lerneErrorJson",
    "parameter": "daten",
    "task": "daten ist ein String. Gib nach JSON.parse {ok:true, wert} zurück. Bei SyntaxError gib {ok:false, fehler:\"Ungueltiges JSON\"} zurück; unerwartete andere Fehler sollen weitergeworfen werden. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "null",
        "expected": {
          "ok": true,
          "wert": null
        }
      },
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
        "input": "{\"a\":1}",
        "expected": {
          "ok": true,
          "wert": {
            "a": 1
          }
        }
      },
      {
        "input": "{kaputt",
        "expected": {
          "ok": false,
          "fehler": "Ungueltiges JSON"
        }
      },
      {
        "input": "",
        "expected": {
          "ok": false,
          "fehler": "Ungueltiges JSON"
        }
      }
    ],
    "hints": [
      "Wandelt gültigen JSON-Text in einen JavaScript-Wert um.",
      "Die Ausgabe trennt Erfolg von Nutzwert. Dadurch sind null, false und 0 gültige erfolgreiche Ergebnisse. Nur der erwartete SyntaxError wird in die Fehlermeldung umgewandelt."
    ],
    "solution": "function lerneErrorJson(daten) {\n  try { return { ok: true, wert: JSON.parse(daten) }; }\n  catch (fehler) {\n    if (fehler instanceof SyntaxError) return { ok: false, fehler: \"Ungueltiges JSON\" };\n    throw fehler;\n  }\n}",
    "explanation": "Die Ausgabe trennt Erfolg von Nutzwert. Dadurch sind null, false und 0 gültige erfolgreiche Ergebnisse. Nur der erwartete SyntaxError wird in die Fehlermeldung umgewandelt.",
    "preserveInput": true,
    "starter": "function lerneErrorJson(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneErrorJson(daten) {\n  try { return { ok: true, wert: JSON.parse(daten) }; }\n  catch (fehler) {\n    if (fehler instanceof SyntaxError) return { ok: false, fehler: \"Ungueltiges JSON\" };\n    throw fehler;\n  }\n}\n\nconsole.log(lerneErrorJson(\"null\"));"
  },
  {
    "id": "js-error-custom",
    "course": "js",
    "category": "Fehlerbehandlung",
    "name": "Eigene Fehlerklasse",
    "title": "Eine eigene Fehlerklasse mit Fehlercode bauen",
    "description": "Eine eigene Error-Unterklasse kann zusätzlich zur Nachricht einen stabilen Fehlercode tragen. So kann eine Anwendung Fehler unabhängig vom Anzeigetext unterscheiden.",
    "syntax": "class BereichsFehler extends Error { constructor() { super(\"Ausserhalb\"); this.code = \"BEREICH\"; } }",
    "parts": [
      [
        "extends Error",
        "Bewahrt das übliche Verhalten von Fehlerobjekten."
      ],
      [
        "super(nachricht)",
        "Initialisiert die Fehlermeldung."
      ],
      [
        "code",
        "Eine eigene Eigenschaft für maschinenlesbare Unterscheidung."
      ]
    ],
    "note": "Ein Fehlercode ersetzt keine Eingabeprüfung. Verwende eigene Klassen, wenn du den Fehlertyp tatsächlich unterscheiden musst.",
    "detail": "daten ist {wert, min, max} mit endlichen Zahlen und min <= max. Bei einem Wert innerhalb der inklusiven Grenzen gib {ok:true, wert} zurück. Sonst wirf und fange eine eigene BereichsFehler-Klasse ab und gib {ok:false, code:\"BEREICH\"} zurück.",
    "functionName": "lerneErrorCustom",
    "parameter": "daten",
    "task": "daten ist {wert, min, max} mit endlichen Zahlen und min <= max. Bei einem Wert innerhalb der inklusiven Grenzen gib {ok:true, wert} zurück. Sonst wirf und fange eine eigene BereichsFehler-Klasse ab und gib {ok:false, code:\"BEREICH\"} zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "wert": 5,
          "min": 0,
          "max": 10
        },
        "expected": {
          "ok": true,
          "wert": 5
        }
      },
      {
        "input": {
          "wert": 0,
          "min": 0,
          "max": 10
        },
        "expected": {
          "ok": true,
          "wert": 0
        }
      },
      {
        "input": {
          "wert": 10,
          "min": 0,
          "max": 10
        },
        "expected": {
          "ok": true,
          "wert": 10
        }
      },
      {
        "input": {
          "wert": 11,
          "min": 0,
          "max": 10
        },
        "expected": {
          "ok": false,
          "code": "BEREICH"
        }
      },
      {
        "input": {
          "wert": -1,
          "min": 0,
          "max": 10
        },
        "expected": {
          "ok": false,
          "code": "BEREICH"
        }
      }
    ],
    "hints": [
      "Bewahrt das übliche Verhalten von Fehlerobjekten.",
      "Die Grenzen sind erlaubt. Nur ein Wert darunter oder darüber löst den eigenen Fehler aus. instanceof prüft die Fehlerklasse und nicht bloß den Nachrichtentext."
    ],
    "solution": "function lerneErrorCustom(daten) {\n  class BereichsFehler extends Error {\n    constructor() { super(\"Ausserhalb\"); this.code = \"BEREICH\"; }\n  }\n  try {\n    if (daten.wert < daten.min || daten.wert > daten.max) throw new BereichsFehler();\n    return { ok: true, wert: daten.wert };\n  } catch (fehler) {\n    if (fehler instanceof BereichsFehler) return { ok: false, code: fehler.code };\n    throw fehler;\n  }\n}",
    "explanation": "Die Grenzen sind erlaubt. Nur ein Wert darunter oder darüber löst den eigenen Fehler aus. instanceof prüft die Fehlerklasse und nicht bloß den Nachrichtentext.",
    "preserveInput": true,
    "starter": "function lerneErrorCustom(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneErrorCustom(daten) {\n  class BereichsFehler extends Error {\n    constructor() { super(\"Ausserhalb\"); this.code = \"BEREICH\"; }\n  }\n  try {\n    if (daten.wert < daten.min || daten.wert > daten.max) throw new BereichsFehler();\n    return { ok: true, wert: daten.wert };\n  } catch (fehler) {\n    if (fehler instanceof BereichsFehler) return { ok: false, code: fehler.code };\n    throw fehler;\n  }\n}\n\nconsole.log(lerneErrorCustom({\"wert\": 5, \"min\": 0, \"max\": 10}));"
  },
  {
    "id": "js-error-finally",
    "course": "js",
    "category": "Fehlerbehandlung",
    "name": "finally",
    "title": "Aufräumen bei Erfolg und Fehler ausführen",
    "description": "Ein finally-Block läuft nach try und catch. Er ist für Aufräumarbeiten gedacht, die unabhängig vom Ergebnis stattfinden müssen.",
    "syntax": "try { … } catch (fehler) { … } finally { protokoll.push(\"fertig\"); }",
    "parts": [
      [
        "try",
        "Führt den normalen Ablauf aus."
      ],
      [
        "catch",
        "Behandelt hier einen absichtlich erzeugten Fehler."
      ],
      [
        "finally",
        "Wird in diesem synchronen Ablauf in beiden Fällen ausgeführt."
      ]
    ],
    "note": "Ein return oder throw in finally kann das vorherige Ergebnis überschreiben. Vermeide solche Rückgaben beim Aufräumen.",
    "detail": "daten ist {ok, wert}. Sammle ein Protokoll: zunächst \"start\", dann bei ok \"erfolg\", sonst \"fehler\", zuletzt immer \"fertig\". Gib {wert: daten.wert oder null bei Fehler, protokoll} zurück.",
    "functionName": "lerneErrorFinally",
    "parameter": "daten",
    "task": "daten ist {ok, wert}. Sammle ein Protokoll: zunächst \"start\", dann bei ok \"erfolg\", sonst \"fehler\", zuletzt immer \"fertig\". Gib {wert: daten.wert oder null bei Fehler, protokoll} zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "ok": true,
          "wert": 5
        },
        "expected": {
          "wert": 5,
          "protokoll": [
            "start",
            "erfolg",
            "fertig"
          ]
        }
      },
      {
        "input": {
          "ok": false,
          "wert": 5
        },
        "expected": {
          "wert": null,
          "protokoll": [
            "start",
            "fehler",
            "fertig"
          ]
        }
      },
      {
        "input": {
          "ok": true,
          "wert": 0
        },
        "expected": {
          "wert": 0,
          "protokoll": [
            "start",
            "erfolg",
            "fertig"
          ]
        }
      }
    ],
    "hints": [
      "Führt den normalen Ablauf aus.",
      "Die Rückgabe steht bewusst hinter dem finally-Block. So enthält das Protokoll die Aufräumaktion unabhängig davon, ob try erfolgreich war."
    ],
    "solution": "function lerneErrorFinally(daten) {\n  const protokoll = [\"start\"];\n  let wert = null;\n  try {\n    if (!daten.ok) throw new Error(\"Fehler\");\n    wert = daten.wert; protokoll.push(\"erfolg\");\n  } catch { protokoll.push(\"fehler\"); }\n  finally { protokoll.push(\"fertig\"); }\n  return { wert, protokoll };\n}",
    "explanation": "Die Rückgabe steht bewusst hinter dem finally-Block. So enthält das Protokoll die Aufräumaktion unabhängig davon, ob try erfolgreich war.",
    "preserveInput": true,
    "starter": "function lerneErrorFinally(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneErrorFinally(daten) {\n  const protokoll = [\"start\"];\n  let wert = null;\n  try {\n    if (!daten.ok) throw new Error(\"Fehler\");\n    wert = daten.wert; protokoll.push(\"erfolg\");\n  } catch { protokoll.push(\"fehler\"); }\n  finally { protokoll.push(\"fertig\"); }\n  return { wert, protokoll };\n}\n\nconsole.log(lerneErrorFinally({\"ok\": true, \"wert\": 5}));"
  },
  {
    "id": "js-regex-test",
    "course": "js",
    "category": "Reguläre Ausdrücke",
    "name": ".test() und Anker",
    "title": "Einen vollständigen Text mit einem Muster prüfen",
    "description": "test liefert einen Boolean. Anker sorgen dafür, dass nicht nur irgendeine passende Stelle, sondern der gesamte Text die Regel erfüllen muss.",
    "syntax": "/^[0-9]+$/.test(text);",
    "parts": [
      [
        "^",
        "Verankert den Anfang. In [^0-9] negiert ^ stattdessen die Zeichenklasse: ein Zeichen, das keine Ziffer ist."
      ],
      [
        "[0-9]+",
        "Verlangt mindestens eine ASCII-Ziffer."
      ],
      [
        "$",
        "Verankert ohne m-Flag das Ende des gesamten Strings. Mit m kann es auch vor einem Zeilenumbruch passen."
      ]
    ],
    "note": "Verwende hier kein m-Flag: Mit m prüfen ^ und $ Zeilengrenzen, nicht ausschließlich die Grenzen des gesamten Strings.",
    "detail": "daten ist ein String. Gib true zurück, wenn er nichtleer ist und ausschließlich ASCII-Ziffern 0 bis 9 enthält. Leerraum, Vorzeichen und abschließende Zeilenumbrüche sind nicht erlaubt.",
    "functionName": "lerneRegexTest",
    "parameter": "daten",
    "task": "daten ist ein String. Gib true zurück, wenn er nichtleer ist und ausschließlich ASCII-Ziffern 0 bis 9 enthält. Leerraum, Vorzeichen und abschließende Zeilenumbrüche sind nicht erlaubt. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "123",
        "expected": true
      },
      {
        "input": "0",
        "expected": true
      },
      {
        "input": "",
        "expected": false
      },
      {
        "input": "a12",
        "expected": false
      },
      {
        "input": "12\n",
        "expected": false
      },
      {
        "input": "-2",
        "expected": false
      },
      {
        "input": " 12",
        "expected": false
      }
    ],
    "hints": [
      "Verankert den Anfang.",
      "Die Anker verlangen ohne m-Flag einen Treffer über den gesamten String. + verlangt mindestens eine Ziffer, sodass ein leerer String nicht passt. Ein abschließender Zeilenumbruch ist ebenfalls ungültig."
    ],
    "solution": "function lerneRegexTest(daten) {\n  return /^[0-9]+$/.test(daten);\n}",
    "explanation": "Die Anker verlangen ohne m-Flag einen Treffer über den gesamten String. + verlangt mindestens eine Ziffer, sodass ein leerer String nicht passt. Ein abschließender Zeilenumbruch ist ebenfalls ungültig.",
    "preserveInput": true,
    "starter": "function lerneRegexTest(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneRegexTest(daten) {\n  return /^[0-9]+$/.test(daten);\n}\n\nconsole.log(lerneRegexTest(\"123\"));"
  },
  {
    "id": "js-regex-flags",
    "course": "js",
    "category": "Reguläre Ausdrücke",
    "name": "i-Flag",
    "title": "Ein Textmuster unabhängig von Großschreibung prüfen",
    "description": "Flags ändern das Verhalten eines regulären Ausdrucks. i erlaubt hier den Vergleich ohne Beachtung der Groß- und Kleinschreibung.",
    "syntax": "/^ja$/i.test(text);",
    "parts": [
      [
        "i",
        "Ignoriert hier die Großschreibung beim Mustervergleich."
      ],
      [
        "^ja$",
        "Prüft den ganzen Text auf ja, nicht einen Teil eines längeren Worts."
      ],
      [
        "Kein m-Flag",
        "Die Anker prüfen den gesamten Text statt einzelner Zeilen."
      ]
    ],
    "note": "Diese Aufgabe trimmt die Eingabe ausdrücklich nicht. \" ja \" ist etwas anderes als \"ja\".",
    "detail": "daten ist ein String. Gib true zurück, wenn er genau \"ja\" in beliebiger ASCII-Großschreibung enthält, sonst false.",
    "functionName": "lerneRegexFlags",
    "parameter": "daten",
    "task": "daten ist ein String. Gib true zurück, wenn er genau \"ja\" in beliebiger ASCII-Großschreibung enthält, sonst false. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "ja",
        "expected": true
      },
      {
        "input": "JA",
        "expected": true
      },
      {
        "input": "Ja",
        "expected": true
      },
      {
        "input": "jaja",
        "expected": false
      },
      {
        "input": " ja ",
        "expected": false
      },
      {
        "input": "ja\n",
        "expected": false
      }
    ],
    "hints": [
      "Ignoriert hier die Großschreibung beim Mustervergleich.",
      "Das i-Flag akzeptiert JA und Ja. Die Anker ohne m-Flag verhindern zusätzliche Zeichen, auch einen abschließenden Zeilenumbruch."
    ],
    "solution": "function lerneRegexFlags(daten) {\n  return /^ja$/i.test(daten);\n}",
    "explanation": "Das i-Flag akzeptiert JA und Ja. Die Anker ohne m-Flag verhindern zusätzliche Zeichen, auch einen abschließenden Zeilenumbruch.",
    "preserveInput": true,
    "starter": "function lerneRegexFlags(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneRegexFlags(daten) {\n  return /^ja$/i.test(daten);\n}\n\nconsole.log(lerneRegexFlags(\"ja\"));"
  },
  {
    "id": "js-regex-match",
    "course": "js",
    "category": "Reguläre Ausdrücke",
    "name": ".match() mit g",
    "title": "Alle Zifferngruppen aus einem Text sammeln",
    "description": "match mit dem g-Flag sammelt alle vollständigen Treffer. Wenn nichts passt, liefert es null statt eines leeren Arrays.",
    "syntax": "text.match(/[0-9]+/g) ?? [];",
    "parts": [
      [
        "[0-9]+",
        "Eine zusammenhängende Gruppe aus mindestens einer Ziffer."
      ],
      [
        "g",
        "Sucht alle Treffer statt nur des ersten."
      ],
      [
        "?? []",
        "Wandelt fehlende Treffer in eine leere Liste um."
      ]
    ],
    "note": "Die Treffer bleiben Strings: \"007\" soll seine führenden Nullen behalten. Das Muster liest keine vollständigen Dezimal- oder negativen Zahlen.",
    "detail": "daten ist Text. Gib alle nicht überlappenden ASCII-Zifferngruppen als Strings in Textreihenfolge zurück. Keine Treffer ergeben [].",
    "functionName": "lerneRegexMatch",
    "parameter": "daten",
    "task": "daten ist Text. Gib alle nicht überlappenden ASCII-Zifferngruppen als Strings in Textreihenfolge zurück. Keine Treffer ergeben []. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "Level 007, Punkte 12",
        "expected": [
          "007",
          "12"
        ]
      },
      {
        "input": "Keine Zahlen",
        "expected": []
      },
      {
        "input": "",
        "expected": []
      },
      {
        "input": "0 0",
        "expected": [
          "0",
          "0"
        ]
      },
      {
        "input": "-12.5",
        "expected": [
          "12",
          "5"
        ]
      }
    ],
    "hints": [
      "Eine zusammenhängende Gruppe aus mindestens einer Ziffer.",
      "g sammelt jede Zifferngruppe. Das Minus und der Punkt sind keine Ziffern und trennen deshalb die Gruppen. Der Zweck ist Textextraktion, kein vollständiger Zahlenparser."
    ],
    "solution": "function lerneRegexMatch(daten) {\n  return daten.match(/[0-9]+/g) ?? [];\n}",
    "explanation": "g sammelt jede Zifferngruppe. Das Minus und der Punkt sind keine Ziffern und trennen deshalb die Gruppen. Der Zweck ist Textextraktion, kein vollständiger Zahlenparser.",
    "preserveInput": true,
    "starter": "function lerneRegexMatch(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneRegexMatch(daten) {\n  return daten.match(/[0-9]+/g) ?? [];\n}\n\nconsole.log(lerneRegexMatch(\"Level 007, Punkte 12\"));"
  },
  {
    "id": "js-regex-groups",
    "course": "js",
    "category": "Reguläre Ausdrücke",
    "name": "Capture Groups",
    "title": "Teile eines festen Textformats mit Gruppen auslesen",
    "description": "Runde Klammern im Muster merken sich Teiltreffer. exec liefert den gesamten Treffer an Position 0 und die Gruppen danach.",
    "syntax": "/^([A-Z]+):([0-9]+)$/.exec(text);",
    "parts": [
      [
        "([A-Z]+)",
        "Erste Gruppe: mindestens ein ASCII-Großbuchstabe."
      ],
      [
        "([0-9]+)",
        "Zweite Gruppe: Ziffern als Text."
      ],
      [
        "treffer[1] / [2]",
        "Liest die beiden Gruppen; [0] ist der gesamte Treffer."
      ]
    ],
    "note": "Ein passendes Textformat ist noch keine vollständige Datenvalidierung. Hier bleiben die Ziffern ein String, damit führende Nullen erhalten bleiben.",
    "detail": "daten ist ein String. Für genau CODE:ZIFFERN mit ASCII-Großbuchstaben und mindestens einer Ziffer gib {code, nummer} zurück, sonst null. Zusätzliche Zeichen einschließlich Zeilenumbruch sind ungültig.",
    "functionName": "lerneRegexGroups",
    "parameter": "daten",
    "task": "daten ist ein String. Für genau CODE:ZIFFERN mit ASCII-Großbuchstaben und mindestens einer Ziffer gib {code, nummer} zurück, sonst null. Zusätzliche Zeichen einschließlich Zeilenumbruch sind ungültig. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "ABC:007",
        "expected": {
          "code": "ABC",
          "nummer": "007"
        }
      },
      {
        "input": "A:0",
        "expected": {
          "code": "A",
          "nummer": "0"
        }
      },
      {
        "input": "abc:12",
        "expected": null
      },
      {
        "input": "A:",
        "expected": null
      },
      {
        "input": "A:1\n",
        "expected": null
      },
      {
        "input": "",
        "expected": null
      }
    ],
    "hints": [
      "Erste Gruppe: mindestens ein ASCII-Großbuchstabe.",
      "exec liefert null ohne Treffer. ^ und $ ohne m-Flag verlangen einen Treffer über den vollständigen Text. Die Gruppen enthalten nur die gewünschten Teile."
    ],
    "solution": "function lerneRegexGroups(daten) {\n  const treffer = /^([A-Z]+):([0-9]+)$/.exec(daten);\n  if (!treffer) return null;\n  return { code: treffer[1], nummer: treffer[2] };\n}",
    "explanation": "exec liefert null ohne Treffer. ^ und $ ohne m-Flag verlangen einen Treffer über den vollständigen Text. Die Gruppen enthalten nur die gewünschten Teile.",
    "preserveInput": true,
    "starter": "function lerneRegexGroups(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneRegexGroups(daten) {\n  const treffer = /^([A-Z]+):([0-9]+)$/.exec(daten);\n  if (!treffer) return null;\n  return { code: treffer[1], nummer: treffer[2] };\n}\n\nconsole.log(lerneRegexGroups(\"ABC:007\"));"
  },
  {
    "id": "js-regex-state",
    "course": "js",
    "category": "Reguläre Ausdrücke",
    "name": "lastIndex bei g",
    "title": "Ein globales RegExp für unabhängige Prüfungen zurücksetzen",
    "description": "Ein RegExp mit g merkt sich nach test eine Suchposition in lastIndex. Wiederholte unabhängige Prüfungen benötigen daher eine bewusste Rücksetzung oder ein Muster ohne g.",
    "syntax": "muster.lastIndex = 0;\nconst passt = muster.test(text);",
    "parts": [
      [
        "lastIndex",
        "Speichert bei globaler Suche die Position für den nächsten Suchlauf."
      ],
      [
        "Rücksetzen auf 0",
        "Beginnt jede unabhängige Prüfung am Anfang."
      ],
      [
        "/a/g",
        "Das gleiche Musterobjekt wird mehrfach verwendet."
      ]
    ],
    "note": "Ohne Rücksetzung kann derselbe Text abwechselnd true und false ergeben. Für eine einfache Existenzfrage ist /a/ ohne g meist besser.",
    "detail": "daten ist eine Liste von Strings. Verwende dasselbe RegExp /a/g, setze lastIndex vor jeder unabhängigen Prüfung auf 0 und gib für jeden Text an, ob er ein kleines a enthält.",
    "functionName": "lerneRegexState",
    "parameter": "daten",
    "task": "daten ist eine Liste von Strings. Verwende dasselbe RegExp /a/g, setze lastIndex vor jeder unabhängigen Prüfung auf 0 und gib für jeden Text an, ob er ein kleines a enthält. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          "a",
          "a",
          "a"
        ],
        "expected": [
          true,
          true,
          true
        ]
      },
      {
        "input": [
          "x",
          "a",
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
          "ba",
          "ab",
          ""
        ],
        "expected": [
          true,
          true,
          false
        ]
      }
    ],
    "hints": [
      "Speichert bei globaler Suche die Position für den nächsten Suchlauf.",
      "Alle Aufrufe teilen dasselbe Musterobjekt. Die Rücksetzung verhindert, dass ein vorheriger Treffer die nächste unabhängige Suche beeinflusst."
    ],
    "solution": "function lerneRegexState(daten) {\n  const muster = /a/g;\n  return daten.map(text => {\n    muster.lastIndex = 0;\n    return muster.test(text);\n  });\n}",
    "explanation": "Alle Aufrufe teilen dasselbe Musterobjekt. Die Rücksetzung verhindert, dass ein vorheriger Treffer die nächste unabhängige Suche beeinflusst.",
    "preserveInput": true,
    "starter": "function lerneRegexState(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneRegexState(daten) {\n  const muster = /a/g;\n  return daten.map(text => {\n    muster.lastIndex = 0;\n    return muster.test(text);\n  });\n}\n\nconsole.log(lerneRegexState([\"a\", \"a\", \"a\"]));"
  },
  {
    "id": "js-date-iso",
    "course": "js",
    "category": "Datum & Uhrzeit",
    "name": "Date / toISOString",
    "title": "Einen Zeitpunkt in ein eindeutiges UTC-Format umwandeln",
    "description": "Date beschreibt einen Zeitpunkt. toISOString liefert UTC mit Z und vermeidet eine von der Systemsprache abhängige Anzeige.",
    "syntax": "new Date(text).toISOString();",
    "parts": [
      [
        "ISO mit Zeitzone",
        "Die Eingabe nennt UTC mit Z oder einen ausdrücklichen Offset."
      ],
      [
        "getTime()",
        "Liefert Millisekunden seit dem Unix-Epoch oder NaN bei ungültigem Datum."
      ],
      [
        "toISOString()",
        "Formatiert den Zeitpunkt in UTC."
      ]
    ],
    "note": "toISOString wirft bei einem ungültigen Date einen RangeError. Prüfe den Zeitwert zuerst; diese Aufgabe verwendet gültige ISO-Zeitpunkte oder klar ungültigen Text.",
    "detail": "daten ist ein ISO-Zeitpunkt mit Zeitzone oder klar ungültiger Text. Gib seine UTC-ISO-Darstellung zurück; bei ungültigem Zeitwert null.",
    "functionName": "lerneDateIso",
    "parameter": "daten",
    "task": "daten ist ein ISO-Zeitpunkt mit Zeitzone oder klar ungültiger Text. Gib seine UTC-ISO-Darstellung zurück; bei ungültigem Zeitwert null. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "2025-01-01T12:00:00+02:00",
        "expected": "2025-01-01T10:00:00.000Z"
      },
      {
        "input": "1970-01-01T00:00:00Z",
        "expected": "1970-01-01T00:00:00.000Z"
      },
      {
        "input": "kein datum",
        "expected": null
      },
      {
        "input": "2024-02-29T23:30:00Z",
        "expected": "2024-02-29T23:30:00.000Z"
      }
    ],
    "hints": [
      "Die Eingabe nennt UTC mit Z oder einen ausdrücklichen Offset.",
      "Der Offset +02:00 bedeutet zwei Stunden vor UTC. Die UTC-Ausgabe zieht diese zwei Stunden ab. Ungültige Zeitwerte werden vor der Formatierung abgefangen."
    ],
    "solution": "function lerneDateIso(daten) {\n  const datum = new Date(daten);\n  if (Number.isNaN(datum.getTime())) return null;\n  return datum.toISOString();\n}",
    "explanation": "Der Offset +02:00 bedeutet zwei Stunden vor UTC. Die UTC-Ausgabe zieht diese zwei Stunden ab. Ungültige Zeitwerte werden vor der Formatierung abgefangen.",
    "preserveInput": true,
    "starter": "function lerneDateIso(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneDateIso(daten) {\n  const datum = new Date(daten);\n  if (Number.isNaN(datum.getTime())) return null;\n  return datum.toISOString();\n}\n\nconsole.log(lerneDateIso(\"2025-01-01T12:00:00+02:00\"));"
  },
  {
    "id": "js-date-parts",
    "course": "js",
    "category": "Datum & Uhrzeit",
    "name": "UTC-Getter",
    "title": "Datumsteile unabhängig von der lokalen Zeitzone lesen",
    "description": "UTC-Getter lesen die Teile eines Zeitpunkts in UTC. Monate sind bei Date nullbasiert und benötigen für die übliche Monatsnummer ein +1.",
    "syntax": "datum.getUTCFullYear();\ndatum.getUTCMonth() + 1;\ndatum.getUTCDate();",
    "parts": [
      [
        "getUTCFullYear",
        "Liest das vierstellige UTC-Jahr."
      ],
      [
        "getUTCMonth",
        "Liefert 0 bis 11, nicht 1 bis 12."
      ],
      [
        "getUTCDate",
        "Liest den Tag des Monats; getUTCDay liest dagegen den Wochentag."
      ]
    ],
    "note": "Lokale Getter wie getMonth können ein anderes Datum liefern. Alle Aufgaben dieses Bereichs nennen ausdrücklich UTC.",
    "detail": "daten ist ein gültiger ISO-Zeitpunkt mit Zeitzone. Gib {jahr, monat, tag} für UTC zurück, mit monat von 1 bis 12.",
    "functionName": "lerneDateParts",
    "parameter": "daten",
    "task": "daten ist ein gültiger ISO-Zeitpunkt mit Zeitzone. Gib {jahr, monat, tag} für UTC zurück, mit monat von 1 bis 12. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": "2025-01-01T00:30:00+02:00",
        "expected": {
          "jahr": 2024,
          "monat": 12,
          "tag": 31
        }
      },
      {
        "input": "2024-02-29T12:00:00Z",
        "expected": {
          "jahr": 2024,
          "monat": 2,
          "tag": 29
        }
      },
      {
        "input": "2025-07-06T00:00:00Z",
        "expected": {
          "jahr": 2025,
          "monat": 7,
          "tag": 6
        }
      }
    ],
    "hints": [
      "Liest das vierstellige UTC-Jahr.",
      "Ein Zeitpunkt kurz nach Mitternacht in +02:00 liegt in UTC noch am Vortag. +1 wandelt den nullbasierten Monat in eine gewöhnliche Monatsnummer um."
    ],
    "solution": "function lerneDateParts(daten) {\n  const datum = new Date(daten);\n  return { jahr: datum.getUTCFullYear(), monat: datum.getUTCMonth() + 1, tag: datum.getUTCDate() };\n}",
    "explanation": "Ein Zeitpunkt kurz nach Mitternacht in +02:00 liegt in UTC noch am Vortag. +1 wandelt den nullbasierten Monat in eine gewöhnliche Monatsnummer um.",
    "preserveInput": true,
    "starter": "function lerneDateParts(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneDateParts(daten) {\n  const datum = new Date(daten);\n  return { jahr: datum.getUTCFullYear(), monat: datum.getUTCMonth() + 1, tag: datum.getUTCDate() };\n}\n\nconsole.log(lerneDateParts(\"2025-01-01T00:30:00+02:00\"));"
  },
  {
    "id": "js-date-add",
    "course": "js",
    "category": "Datum & Uhrzeit",
    "name": "setUTCDate",
    "title": "UTC-Kalendertage über Monatsgrenzen hinweg addieren",
    "description": "setUTCDate kann Tage über den aktuellen Monat hinaus setzen. Date normalisiert diese Werte und berücksichtigt dabei Monatslängen und Schaltjahre.",
    "syntax": "datum.setUTCDate(datum.getUTCDate() + tage);",
    "parts": [
      [
        "setUTCDate",
        "Verändert das eigene Date-Objekt."
      ],
      [
        "Normalisierung",
        "Ein Tag außerhalb des Monats rollt in den nächsten oder vorherigen Monat."
      ],
      [
        "UTC-Kalendertage",
        "Die Aufgabe verwendet UTC und bleibt so unabhängig von lokaler Sommerzeit."
      ]
    ],
    "note": "Setter verändern ihr Date-Objekt. Hier erzeugst du es neu aus dem Eingabestring. Lokale Kalendertage und feste 24-Stunden-Zeiträume sind wegen Sommerzeit nicht immer gleich.",
    "detail": "daten ist {zeit, tage} mit gültigem ISO-Zeitpunkt und kleiner ganzer Tageszahl. Addiere UTC-Kalendertage, erhalte die Uhrzeit und gib UTC-ISO-Text zurück.",
    "functionName": "lerneDateAdd",
    "parameter": "daten",
    "task": "daten ist {zeit, tage} mit gültigem ISO-Zeitpunkt und kleiner ganzer Tageszahl. Addiere UTC-Kalendertage, erhalte die Uhrzeit und gib UTC-ISO-Text zurück. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "zeit": "2024-02-28T12:00:00Z",
          "tage": 1
        },
        "expected": "2024-02-29T12:00:00.000Z"
      },
      {
        "input": {
          "zeit": "2025-12-31T09:00:00Z",
          "tage": 1
        },
        "expected": "2026-01-01T09:00:00.000Z"
      },
      {
        "input": {
          "zeit": "2025-03-01T00:00:00Z",
          "tage": -1
        },
        "expected": "2025-02-28T00:00:00.000Z"
      },
      {
        "input": {
          "zeit": "2025-01-01T08:00:00Z",
          "tage": 0
        },
        "expected": "2025-01-01T08:00:00.000Z"
      }
    ],
    "hints": [
      "Verändert das eigene Date-Objekt.",
      "Das neue Date-Objekt darf verändert werden, weil es kein Objekt aus der Eingabe ist. Date übernimmt den Wechsel über Monats- und Jahresgrenzen."
    ],
    "solution": "function lerneDateAdd(daten) {\n  const datum = new Date(daten.zeit);\n  datum.setUTCDate(datum.getUTCDate() + daten.tage);\n  return datum.toISOString();\n}",
    "explanation": "Das neue Date-Objekt darf verändert werden, weil es kein Objekt aus der Eingabe ist. Date übernimmt den Wechsel über Monats- und Jahresgrenzen.",
    "preserveInput": true,
    "starter": "function lerneDateAdd(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneDateAdd(daten) {\n  const datum = new Date(daten.zeit);\n  datum.setUTCDate(datum.getUTCDate() + daten.tage);\n  return datum.toISOString();\n}\n\nconsole.log(lerneDateAdd({\"zeit\": \"2024-02-28T12:00:00Z\", \"tage\": 1}));"
  },
  {
    "id": "js-date-difference",
    "course": "js",
    "category": "Datum & Uhrzeit",
    "name": "Zeitdifferenzen",
    "title": "Eine Zeitspanne in Minuten berechnen",
    "description": "Date-Zeitwerte sind Millisekunden. Eine Differenz lässt sich durch passende Division in Sekunden, Minuten oder Stunden umrechnen.",
    "syntax": "const minuten = (ende.getTime() - start.getTime()) / 60000;",
    "parts": [
      [
        "getTime",
        "Liest den absoluten Zeitwert in Millisekunden."
      ],
      [
        "60000",
        "Eine Minute hat 60 * 1000 Millisekunden."
      ],
      [
        "Vorzeichen",
        "Eine frühere Endzeit ergibt eine negative Differenz."
      ]
    ],
    "note": "Die Aufgabe rundet nicht. Gleiche Zeitpunkte mit unterschiedlichen Offsets müssen dieselbe Differenz ergeben.",
    "detail": "daten ist {start, ende} mit gültigen ISO-Zeitpunkten mit Zeitzone. Gib ende minus start in Minuten zurück, ohne Rundung.",
    "functionName": "lerneDateDifference",
    "parameter": "daten",
    "task": "daten ist {start, ende} mit gültigen ISO-Zeitpunkten mit Zeitzone. Gib ende minus start in Minuten zurück, ohne Rundung. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "start": "2025-01-01T10:00:00Z",
          "ende": "2025-01-01T11:30:00Z"
        },
        "expected": 90
      },
      {
        "input": {
          "start": "2025-01-01T12:00:00+02:00",
          "ende": "2025-01-01T10:00:00Z"
        },
        "expected": 0
      },
      {
        "input": {
          "start": "2025-01-01T10:00:00Z",
          "ende": "2025-01-01T09:00:00Z"
        },
        "expected": -60
      },
      {
        "input": {
          "start": "2025-01-01T10:00:00Z",
          "ende": "2025-01-01T10:00:30Z"
        },
        "expected": 0.5
      }
    ],
    "hints": [
      "Liest den absoluten Zeitwert in Millisekunden.",
      "Die Rechnung verwendet absolute Zeitpunkte, keine Stundenfelder. So funktionieren Offsetunterschiede, Tageswechsel und halbe Minuten korrekt."
    ],
    "solution": "function lerneDateDifference(daten) {\n  return (new Date(daten.ende).getTime() - new Date(daten.start).getTime()) / 60000;\n}",
    "explanation": "Die Rechnung verwendet absolute Zeitpunkte, keine Stundenfelder. So funktionieren Offsetunterschiede, Tageswechsel und halbe Minuten korrekt.",
    "preserveInput": true,
    "starter": "function lerneDateDifference(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "function lerneDateDifference(daten) {\n  return (new Date(daten.ende).getTime() - new Date(daten.start).getTime()) / 60000;\n}\n\nconsole.log(lerneDateDifference({\"start\": \"2025-01-01T10:00:00Z\", \"ende\": \"2025-01-01T11:30:00Z\"}));"
  },
  {
    "id": "js-async-race",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "Promise.race()",
    "title": "Das zuerst abgeschlossene Promise-Ergebnis übernehmen",
    "description": "race übernimmt die erste Erfüllung oder Ablehnung. Anders als all wartet es nicht auf sämtliche Aufgaben.",
    "syntax": "await Promise.race(jobs);",
    "parts": [
      [
        "Erster Abschluss",
        "Kann Erfolg oder Fehler sein, nicht unbedingt der erste Eintrag."
      ],
      [
        "Andere Jobs",
        "Werden durch race nicht automatisch abgebrochen."
      ],
      [
        "Leere Liste",
        "Promise.race([]) bleibt offen; die Aufgabe behandelt [] ausdrücklich mit null."
      ]
    ],
    "note": "Die Eingaben dieser Aufgabe enthalten erfolgreiche Timer-Jobs mit unterschiedlichen kleinen Wartezeiten. Timerwerte sind keine Echtzeitgarantie.",
    "detail": "daten ist eine Liste {wert, warte}. Alle Jobs erfüllen sich erfolgreich, warte sind verschiedene ganze Werte zwischen 0 und 30 ms mit mindestens 15 ms Abstand. Gib den Wert des zuerst fertigen Jobs zurück, bei [] null.",
    "functionName": "lerneAsyncRace",
    "parameter": "daten",
    "task": "daten ist eine Liste {wert, warte}. Alle Jobs erfüllen sich erfolgreich, warte sind verschiedene ganze Werte zwischen 0 und 30 ms mit mindestens 15 ms Abstand. Gib den Wert des zuerst fertigen Jobs zurück, bei [] null. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          {
            "wert": "langsam",
            "warte": 30
          },
          {
            "wert": "schnell",
            "warte": 0
          }
        ],
        "expected": "schnell"
      },
      {
        "input": [
          {
            "wert": 0,
            "warte": 0
          },
          {
            "wert": 9,
            "warte": 20
          }
        ],
        "expected": 0
      },
      {
        "input": [],
        "expected": null
      },
      {
        "input": [
          {
            "wert": 5,
            "warte": 0
          }
        ],
        "expected": 5
      }
    ],
    "hints": [
      "Kann Erfolg oder Fehler sein, nicht unbedingt der erste Eintrag.",
      "Die erste Eingabeposition muss nicht gewinnen. Ein Ergebnis 0 ist ein gültiger Erfolg. [] wird vor race behandelt, damit die Funktion nicht unbegrenzt wartet."
    ],
    "solution": "async function lerneAsyncRace(daten) {\n  if (daten.length === 0) return null;\n  const jobs = daten.map(job => new Promise(resolve => setTimeout(() => resolve(job.wert), job.warte)));\n  return await Promise.race(jobs);\n}",
    "explanation": "Die erste Eingabeposition muss nicht gewinnen. Ein Ergebnis 0 ist ein gültiger Erfolg. [] wird vor race behandelt, damit die Funktion nicht unbegrenzt wartet.",
    "preserveInput": true,
    "starter": "async function lerneAsyncRace(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function lerneAsyncRace(daten) {\n  if (daten.length === 0) return null;\n  const jobs = daten.map(job => new Promise(resolve => setTimeout(() => resolve(job.wert), job.warte)));\n  return await Promise.race(jobs);\n}\n\nconsole.log(await lerneAsyncRace([{\"wert\": \"langsam\", \"warte\": 30}, {\"wert\": \"schnell\", \"warte\": 0}]));"
  },
  {
    "id": "js-async-any",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "Promise.any()",
    "title": "Den ersten erfolgreichen Job trotz einzelner Fehler verwenden",
    "description": "any wartet auf den ersten Erfolg und ignoriert frühere Ablehnungen. Erst wenn alle Jobs ablehnen, lehnt es mit AggregateError ab.",
    "syntax": "try { return await Promise.any(jobs); } catch { return null; }",
    "parts": [
      [
        "Erste Erfüllung",
        "Frühere Ablehnungen sind noch kein endgültiger Fehler."
      ],
      [
        "AggregateError",
        "Enthält die Fehler, falls sämtliche Promises ablehnen."
      ],
      [
        "Leere Liste",
        "Auch Promise.any([]) lehnt ab und wird hier abgefangen."
      ]
    ],
    "note": "race und any sind nicht austauschbar: race reagiert auf die erste Ablehnung, any wartet weiter auf einen möglichen Erfolg.",
    "detail": "daten ist eine Liste {ok, wert, warte}. Bei ok erfüllen sich Timer-Jobs mit wert, sonst lehnen sie ab. Wartezeiten sind verschiedene ganze Werte von 0 bis 30 ms mit mindestens 15 ms Abstand. Gib den ersten erfolgreichen Wert zurück oder null, wenn keiner erfolgreich ist.",
    "functionName": "lerneAsyncAny",
    "parameter": "daten",
    "task": "daten ist eine Liste {ok, wert, warte}. Bei ok erfüllen sich Timer-Jobs mit wert, sonst lehnen sie ab. Wartezeiten sind verschiedene ganze Werte von 0 bis 30 ms mit mindestens 15 ms Abstand. Gib den ersten erfolgreichen Wert zurück oder null, wenn keiner erfolgreich ist. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": [
          {
            "ok": false,
            "wert": 9,
            "warte": 0
          },
          {
            "ok": true,
            "wert": 5,
            "warte": 20
          }
        ],
        "expected": 5
      },
      {
        "input": [
          {
            "ok": true,
            "wert": 0,
            "warte": 0
          },
          {
            "ok": false,
            "wert": 9,
            "warte": 20
          }
        ],
        "expected": 0
      },
      {
        "input": [
          {
            "ok": false,
            "wert": 1,
            "warte": 0
          }
        ],
        "expected": null
      },
      {
        "input": [],
        "expected": null
      }
    ],
    "hints": [
      "Frühere Ablehnungen sind noch kein endgültiger Fehler.",
      "Der erste Job kann ablehnen, ohne die ganze Suche zu beenden. await innerhalb des try ermöglicht die Behandlung eines endgültigen AggregateError."
    ],
    "solution": "async function lerneAsyncAny(daten) {\n  const jobs = daten.map(job => new Promise((resolve, reject) => {\n    setTimeout(() => job.ok ? resolve(job.wert) : reject(new Error(\"Fehler\")), job.warte);\n  }));\n  try { return await Promise.any(jobs); }\n  catch { return null; }\n}",
    "explanation": "Der erste Job kann ablehnen, ohne die ganze Suche zu beenden. await innerhalb des try ermöglicht die Behandlung eines endgültigen AggregateError.",
    "preserveInput": true,
    "starter": "async function lerneAsyncAny(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function lerneAsyncAny(daten) {\n  const jobs = daten.map(job => new Promise((resolve, reject) => {\n    setTimeout(() => job.ok ? resolve(job.wert) : reject(new Error(\"Fehler\")), job.warte);\n  }));\n  try { return await Promise.any(jobs); }\n  catch { return null; }\n}\n\nconsole.log(await lerneAsyncAny([{\"ok\": false, \"wert\": 9, \"warte\": 0}, {\"ok\": true, \"wert\": 5, \"warte\": 20}]));"
  },
  {
    "id": "js-async-finally",
    "course": "js",
    "category": "Asynchroner Code",
    "name": "Promise.finally()",
    "title": "Nach einem Promise aufräumen, ohne seinen Wert zu ersetzen",
    "description": "finally führt eine Aktion nach Erfolg oder Ablehnung aus. Ein gewöhnlicher Rückgabewert daraus ersetzt das ursprüngliche Promise-Ergebnis nicht.",
    "syntax": "const wert = await promise.finally(() => protokoll.push(\"fertig\"));",
    "parts": [
      [
        "finally(callback)",
        "Läuft bei Erfüllung und Ablehnung."
      ],
      [
        "Keine Ergebnisparameter",
        "Der Callback erhält weder den Erfolgswert noch den Fehler."
      ],
      [
        "Ergebnis bleibt",
        "Ein normaler Rückgabewert aus finally wird nicht zum neuen Erfolgswert."
      ]
    ],
    "note": "Wenn der finally-Callback wirft oder ein abgelehntes Promise zurückgibt, kann er das Ergebnis überschreiben. Halte Aufräumaktionen daher zuverlässig.",
    "detail": "daten hat ok und wert. Erzeuge ein passendes erfülltes oder abgelehntes Promise. Füge in finally \"fertig\" ins Protokoll ein. Gib bei Erfolg {ok:true, wert, protokoll} zurück, sonst {ok:false, protokoll}.",
    "functionName": "lerneAsyncFinally",
    "parameter": "daten",
    "task": "daten hat ok und wert. Erzeuge ein passendes erfülltes oder abgelehntes Promise. Füge in finally \"fertig\" ins Protokoll ein. Gib bei Erfolg {ok:true, wert, protokoll} zurück, sonst {ok:false, protokoll}. Verändere die Eingabe nicht.",
    "tests": [
      {
        "input": {
          "ok": true,
          "wert": 7
        },
        "expected": {
          "ok": true,
          "wert": 7,
          "protokoll": [
            "fertig"
          ]
        }
      },
      {
        "input": {
          "ok": true,
          "wert": 0
        },
        "expected": {
          "ok": true,
          "wert": 0,
          "protokoll": [
            "fertig"
          ]
        }
      },
      {
        "input": {
          "ok": false,
          "wert": 7
        },
        "expected": {
          "ok": false,
          "protokoll": [
            "fertig"
          ]
        }
      }
    ],
    "hints": [
      "Läuft bei Erfüllung und Ablehnung.",
      "push liefert die neue Arraylänge 1 zurück. finally bewahrt trotzdem den ursprünglichen Erfolgswert, etwa 7 oder 0, und führt die Aktion ebenso bei Ablehnung aus."
    ],
    "solution": "async function lerneAsyncFinally(daten) {\n  const protokoll = [];\n  const job = daten.ok ? Promise.resolve(daten.wert) : Promise.reject(new Error(\"Fehler\"));\n  try {\n    const wert = await job.finally(() => protokoll.push(\"fertig\"));\n    return { ok: true, wert, protokoll };\n  } catch { return { ok: false, protokoll }; }\n}",
    "explanation": "push liefert die neue Arraylänge 1 zurück. finally bewahrt trotzdem den ursprünglichen Erfolgswert, etwa 7 oder 0, und führt die Aktion ebenso bei Ablehnung aus.",
    "preserveInput": true,
    "starter": "async function lerneAsyncFinally(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function lerneAsyncFinally(daten) {\n  const protokoll = [];\n  const job = daten.ok ? Promise.resolve(daten.wert) : Promise.reject(new Error(\"Fehler\"));\n  try {\n    const wert = await job.finally(() => protokoll.push(\"fertig\"));\n    return { ok: true, wert, protokoll };\n  } catch { return { ok: false, protokoll }; }\n}\n\nconsole.log(await lerneAsyncFinally({\"ok\": true, \"wert\": 7}));"
  }
];
