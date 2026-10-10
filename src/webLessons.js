export const webLessons = [
  {
    "id": "js-web-url-parts",
    "course": "js",
    "category": "URL & Web-Daten",
    "name": "URL / pathname",
    "title": "Eine URL in ihre Bestandteile zerlegen",
    "description": "URL liefert Protokoll, Host, Pfad, Query und Fragment als getrennte Felder.",
    "syntax": "const url = new URL(\"https://example.com/spiele?q=pong#start\");",
    "parts": [
      [
        "pathname",
        "Pfad ohne Query und Fragment."
      ],
      [
        "search / hash",
        "Behalten das führende ? beziehungsweise #."
      ]
    ],
    "note": "URL normalisiert unter anderem die Hostschreibweise. Die Aufgabe erhält gültige absolute HTTP(S)-URLs.",
    "detail": "Gib für den URL-String daten {origin,pfad,query,fragment} zurück.",
    "task": "Gib für den URL-String daten {origin,pfad,query,fragment} zurück. Verändere die Eingabe nicht.",
    "functionName": "webUrlParts",
    "parameter": "daten",
    "tests": [
      {
        "input": "https://example.com/spiele?q=pong#start",
        "expected": {
          "origin": "https://example.com",
          "pfad": "/spiele",
          "query": "?q=pong",
          "fragment": "#start"
        }
      },
      {
        "input": "http://localhost:3000",
        "expected": {
          "origin": "http://localhost:3000",
          "pfad": "/",
          "query": "",
          "fragment": ""
        }
      },
      {
        "input": "https://EXAMPLE.com/a%20b",
        "expected": {
          "origin": "https://example.com",
          "pfad": "/a%20b",
          "query": "",
          "fragment": ""
        }
      }
    ],
    "starter": "function webUrlParts(daten) {\n  // Deine Lösung\n}",
    "solution": "function webUrlParts(daten) {\n  const url=new URL(daten);\n  return {origin:url.origin,pfad:url.pathname,query:url.search,fragment:url.hash};\n}",
    "example": "function webUrlParts(daten) {\n  const url=new URL(daten);\n  return {origin:url.origin,pfad:url.pathname,query:url.search,fragment:url.hash};\n}\nconsole.log(webUrlParts(\"https://example.com/spiele?q=pong#start\"));",
    "preserveInput": true,
    "hints": [
      "Erzeuge ein URL-Objekt.",
      "Lies origin, pathname, search und hash aus."
    ],
    "explanation": "Lies origin, pathname, search und hash aus."
  },
  {
    "id": "js-web-url-relative",
    "course": "js",
    "category": "URL & Web-Daten",
    "name": "new URL(pfad, basis)",
    "title": "Relative Pfade richtig auflösen",
    "description": "Ein relativer Pfad wird am Verzeichnis der Basis aufgelöst. Ein führender Slash beginnt an der Hostwurzel.",
    "syntax": "new URL(\"../bilder/a.png\", \"https://example.com/kurs/js/\").href;",
    "parts": [
      [
        "../",
        "Geht ein Verzeichnis höher."
      ],
      [
        "/",
        "Startet an der Wurzel statt im aktuellen Verzeichnis."
      ]
    ],
    "note": "Eine Basis ohne abschließenden Slash wird als Dateipfad behandelt.",
    "detail": "daten enthält pfad und basis. Gib die aufgelöste URL als href zurück.",
    "task": "daten enthält pfad und basis. Gib die aufgelöste URL als href zurück. Verändere die Eingabe nicht.",
    "functionName": "webUrlRelative",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "pfad": "../bilder/a.png",
          "basis": "https://example.com/kurs/js/"
        },
        "expected": "https://example.com/kurs/bilder/a.png"
      },
      {
        "input": {
          "pfad": "lektion",
          "basis": "https://example.com/kurs/js"
        },
        "expected": "https://example.com/kurs/lektion"
      },
      {
        "input": {
          "pfad": "/hilfe",
          "basis": "https://example.com/kurs/js/"
        },
        "expected": "https://example.com/hilfe"
      },
      {
        "input": {
          "pfad": "https://other.example/x",
          "basis": "https://example.com/"
        },
        "expected": "https://other.example/x"
      }
    ],
    "starter": "function webUrlRelative(daten) {\n  // Deine Lösung\n}",
    "solution": "function webUrlRelative(daten) {\n  return new URL(daten.pfad,daten.basis).href;\n}",
    "example": "function webUrlRelative(daten) {\n  return new URL(daten.pfad,daten.basis).href;\n}\nconsole.log(webUrlRelative({\"pfad\": \"../bilder/a.png\", \"basis\": \"https://example.com/kurs/js/\"}));",
    "preserveInput": true,
    "hints": [
      "Die Basis ist das zweite Argument.",
      "href liefert den vollständig aufgelösten String."
    ],
    "explanation": "href liefert den vollständig aufgelösten String."
  },
  {
    "id": "js-web-query-read",
    "course": "js",
    "category": "URL & Web-Daten",
    "name": "URLSearchParams.get / getAll",
    "title": "Mehrfach vorkommende Suchparameter lesen",
    "description": "Query-Schlüssel können mehrfach vorkommen. get liest den ersten Wert, getAll alle Werte.",
    "syntax": "const params = new URLSearchParams(\"tag=js&tag=spiel&q=Pong\");",
    "parts": [
      [
        "get",
        "Liefert den ersten String oder null."
      ],
      [
        "getAll",
        "Liefert ein Array, bei fehlendem Schlüssel leer."
      ]
    ],
    "note": "URLSearchParams dekodiert Prozentzeichenfolgen und interpretiert + als Leerzeichen.",
    "detail": "daten ist ein Query-String. Gib {q,tags} mit q aus get(\"q\") und tags aus getAll(\"tag\") zurück.",
    "task": "daten ist ein Query-String. Gib {q,tags} mit q aus get(\"q\") und tags aus getAll(\"tag\") zurück. Verändere die Eingabe nicht.",
    "functionName": "webQueryRead",
    "parameter": "daten",
    "tests": [
      {
        "input": "tag=js&tag=spiel&q=Pong",
        "expected": {
          "q": "Pong",
          "tags": [
            "js",
            "spiel"
          ]
        }
      },
      {
        "input": "",
        "expected": {
          "q": null,
          "tags": []
        }
      },
      {
        "input": "q=&tag=a%2Bb&tag=hello+world",
        "expected": {
          "q": "",
          "tags": [
            "a+b",
            "hello world"
          ]
        }
      },
      {
        "input": "q=erst&q=zweit",
        "expected": {
          "q": "erst",
          "tags": []
        }
      }
    ],
    "starter": "function webQueryRead(daten) {\n  // Deine Lösung\n}",
    "solution": "function webQueryRead(daten) {\n  const p=new URLSearchParams(daten);\n  return {q:p.get(\"q\"),tags:p.getAll(\"tag\")};\n}",
    "example": "function webQueryRead(daten) {\n  const p=new URLSearchParams(daten);\n  return {q:p.get(\"q\"),tags:p.getAll(\"tag\")};\n}\nconsole.log(webQueryRead(\"tag=js&tag=spiel&q=Pong\"));",
    "preserveInput": true,
    "hints": [
      "Unterscheide fehlenden und leeren Wert.",
      "Nutze getAll für wiederholte Tags."
    ],
    "explanation": "Nutze getAll für wiederholte Tags."
  },
  {
    "id": "js-web-query-write",
    "course": "js",
    "category": "URL & Web-Daten",
    "name": "set / delete / toString",
    "title": "Suchzustand ohne Stringverkettung speichern",
    "description": "URLSearchParams kodiert Werte passend für Query-Strings und ersetzt mit set alte Werte eines Schlüssels.",
    "syntax": "params.set(\"q\", \"C++ & Spiele\");",
    "parts": [
      [
        "set",
        "Ersetzt alle bisherigen Werte dieses Schlüssels."
      ],
      [
        "delete",
        "Entfernt einen Schlüssel mit allen Werten."
      ]
    ],
    "note": "Die Reihenfolge vorhandener Schlüssel bleibt erhalten. Leerzeichen werden als + ausgegeben.",
    "detail": "daten enthält query und q. Ersetze q durch den neuen nichtleeren String. Bei q===\"\" entferne den Schlüssel. Gib den Query-String ohne ? zurück.",
    "task": "daten enthält query und q. Ersetze q durch den neuen nichtleeren String. Bei q===\"\" entferne den Schlüssel. Gib den Query-String ohne ? zurück. Verändere die Eingabe nicht.",
    "functionName": "webQueryWrite",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "query": "page=2&q=alt&q=zweiter",
          "q": "C++ & Spiele"
        },
        "expected": "page=2&q=C%2B%2B+%26+Spiele"
      },
      {
        "input": {
          "query": "q=alt&tag=js",
          "q": ""
        },
        "expected": "tag=js"
      },
      {
        "input": {
          "query": "",
          "q": "ä"
        },
        "expected": "q=%C3%A4"
      }
    ],
    "starter": "function webQueryWrite(daten) {\n  // Deine Lösung\n}",
    "solution": "function webQueryWrite(daten) {\n  const p=new URLSearchParams(daten.query);\n  if(daten.q===\"\")p.delete(\"q\");else p.set(\"q\",daten.q);\n  return p.toString();\n}",
    "example": "function webQueryWrite(daten) {\n  const p=new URLSearchParams(daten.query);\n  if(daten.q===\"\")p.delete(\"q\");else p.set(\"q\",daten.q);\n  return p.toString();\n}\nconsole.log(webQueryWrite({\"query\": \"page=2&q=alt&q=zweiter\", \"q\": \"C++ & Spiele\"}));",
    "preserveInput": true,
    "hints": [
      "Bearbeite das Objekt statt den String.",
      "toString kodiert Sonderzeichen automatisch."
    ],
    "explanation": "toString kodiert Sonderzeichen automatisch."
  },
  {
    "id": "js-web-url-encode",
    "course": "js",
    "category": "URL & Web-Daten",
    "name": "encodeURIComponent",
    "title": "Text als einzelnes Pfadsegment kodieren",
    "description": "Unbehandelter Text kann Slash, Fragezeichen oder # enthalten und dadurch die URL-Struktur verändern.",
    "syntax": "\"/dateien/\" + encodeURIComponent(name);",
    "parts": [
      [
        "encodeURIComponent",
        "Kodiert auch /, ? und # innerhalb eines Wertes."
      ],
      [
        "encodeURI",
        "Erhält Strukturzeichen und ist für diesen Zweck ungeeignet."
      ]
    ],
    "note": "Kodierung ersetzt keine serverseitige Pfadprüfung. Die Aufgabe baut nur ein einzelnes Segment.",
    "detail": "daten ist ein Dateiname. Gib \"/dateien/\" plus encodeURIComponent(daten) zurück.",
    "task": "daten ist ein Dateiname. Gib \"/dateien/\" plus encodeURIComponent(daten) zurück. Verändere die Eingabe nicht.",
    "functionName": "webUrlEncode",
    "parameter": "daten",
    "tests": [
      {
        "input": "a b.txt",
        "expected": "/dateien/a%20b.txt"
      },
      {
        "input": "a/b?x#y",
        "expected": "/dateien/a%2Fb%3Fx%23y"
      },
      {
        "input": "Grüße",
        "expected": "/dateien/Gr%C3%BC%C3%9Fe"
      }
    ],
    "starter": "function webUrlEncode(daten) {\n  // Deine Lösung\n}",
    "solution": "function webUrlEncode(daten) {\n  return \"/dateien/\"+encodeURIComponent(daten);\n}",
    "example": "function webUrlEncode(daten) {\n  return \"/dateien/\"+encodeURIComponent(daten);\n}\nconsole.log(webUrlEncode(\"a b.txt\"));",
    "preserveInput": true,
    "hints": [
      "Verwende encodeURIComponent statt encodeURI.",
      "Kodiere nur den Wert, nicht die gesamte URL."
    ],
    "explanation": "Kodiere nur den Wert, nicht die gesamte URL."
  },
  {
    "id": "js-web-url-page",
    "course": "js",
    "category": "URL & Web-Daten",
    "name": "Query validieren",
    "title": "Eine Seitennummer aus einer URL prüfen",
    "description": "URL-Werte sind Strings und können fehlen oder ungültig sein.",
    "syntax": "const raw = new URLSearchParams(query).get(\"page\");",
    "parts": [
      [
        "get(\"page\")",
        "Liefert String oder null."
      ],
      [
        "Ganzzahlgrenzen",
        "Schützen vor ungültigen oder unhandlich großen Seiten."
      ]
    ],
    "note": "Diese Aufgabe erlaubt die Seiten 1 bis 1000, ohne führende Nullen.",
    "detail": "daten ist ein Query-String. Eine gültige page aus Ziffern von 1 bis 1000 liefert die Zahl; sonst 1.",
    "task": "daten ist ein Query-String. Eine gültige page aus Ziffern von 1 bis 1000 liefert die Zahl; sonst 1. Verändere die Eingabe nicht.",
    "functionName": "webUrlPage",
    "parameter": "daten",
    "tests": [
      {
        "input": "page=3",
        "expected": 3
      },
      {
        "input": "page=0",
        "expected": 1
      },
      {
        "input": "page=01",
        "expected": 1
      },
      {
        "input": "page=1e2",
        "expected": 1
      },
      {
        "input": "page=1000",
        "expected": 1000
      },
      {
        "input": "page=1001",
        "expected": 1
      },
      {
        "input": "",
        "expected": 1
      }
    ],
    "starter": "function webUrlPage(daten) {\n  // Deine Lösung\n}",
    "solution": "function webUrlPage(daten) {\n  const raw=new URLSearchParams(daten).get(\"page\");\n  if(!raw || !/^[1-9]\\d*$/.test(raw))return 1;\n  const page=Number(raw);return page<=1000?page:1;\n}",
    "example": "function webUrlPage(daten) {\n  const raw=new URLSearchParams(daten).get(\"page\");\n  if(!raw || !/^[1-9]\\d*$/.test(raw))return 1;\n  const page=Number(raw);return page<=1000?page:1;\n}\nconsole.log(webUrlPage(\"page=3\"));",
    "preserveInput": true,
    "hints": [
      "Prüfe den gesamten String.",
      "Begrenze die Zahl nach der Umwandlung."
    ],
    "explanation": "Begrenze die Zahl nach der Umwandlung."
  },
  {
    "id": "js-web-intl-money",
    "course": "js",
    "category": "Intl & Anzeige",
    "name": "Intl.NumberFormat",
    "title": "Centbeträge als deutsche Währung anzeigen",
    "description": "Intl.NumberFormat übernimmt Dezimaltrennzeichen, Gruppierung und Währung für eine feste Sprache.",
    "syntax": "new Intl.NumberFormat(\"de-DE\", {style:\"currency\",currency:\"EUR\"});",
    "parts": [
      [
        "formatToParts",
        "Teilt das Ergebnis in semantische Abschnitte."
      ],
      [
        "currency / fraction",
        "Währungszeichen und Nachkommastellen sind getrennte Teile."
      ]
    ],
    "note": "Zwischen Zahl und Währung können geschützte Leerzeichen stehen. Die Aufgabe prüft deshalb Teile statt unsichtbarer Zeichen.",
    "detail": "daten ist ein nichtnegativer ganzzahliger Centbetrag unter 100000. Formatiere ihn als EUR mit de-DE. Gib {ganz,bruch,waehrung} aus den integer-, fraction- und currency-Teilen zurück.",
    "task": "daten ist ein nichtnegativer ganzzahliger Centbetrag unter 100000. Formatiere ihn als EUR mit de-DE. Gib {ganz,bruch,waehrung} aus den integer-, fraction- und currency-Teilen zurück. Verändere die Eingabe nicht.",
    "functionName": "webIntlMoney",
    "parameter": "daten",
    "tests": [
      {
        "input": 1250,
        "expected": {
          "ganz": "12",
          "bruch": "50",
          "waehrung": "€"
        }
      },
      {
        "input": 0,
        "expected": {
          "ganz": "0",
          "bruch": "00",
          "waehrung": "€"
        }
      },
      {
        "input": 99999,
        "expected": {
          "ganz": "999",
          "bruch": "99",
          "waehrung": "€"
        }
      }
    ],
    "starter": "function webIntlMoney(daten) {\n  // Deine Lösung\n}",
    "solution": "function webIntlMoney(daten) {\n  const parts=new Intl.NumberFormat(\"de-DE\",{style:\"currency\",currency:\"EUR\"}).formatToParts(daten/100);\n  const read=type=>parts.filter(p=>p.type===type).map(p=>p.value).join(\"\");\n  return {ganz:read(\"integer\"),bruch:read(\"fraction\"),waehrung:read(\"currency\")};\n}",
    "example": "function webIntlMoney(daten) {\n  const parts=new Intl.NumberFormat(\"de-DE\",{style:\"currency\",currency:\"EUR\"}).formatToParts(daten/100);\n  const read=type=>parts.filter(p=>p.type===type).map(p=>p.value).join(\"\");\n  return {ganz:read(\"integer\"),bruch:read(\"fraction\"),waehrung:read(\"currency\")};\n}\nconsole.log(webIntlMoney(1250));",
    "preserveInput": true,
    "hints": [
      "Teile Cent durch 100 erst für die Anzeige.",
      "Lies formatToParts nach den drei gefragten Typen."
    ],
    "explanation": "Lies formatToParts nach den drei gefragten Typen."
  },
  {
    "id": "js-web-intl-percent",
    "course": "js",
    "category": "Intl & Anzeige",
    "name": "style: percent",
    "title": "Anteile als Prozente formatieren",
    "description": "Beim Prozentformat ist 0.25 ein Anteil von 25 Prozent.",
    "syntax": "new Intl.NumberFormat(\"de-DE\", {style:\"percent\",maximumFractionDigits:0}).format(0.25);",
    "parts": [
      [
        "percent",
        "Multipliziert für die Ausgabe mit 100."
      ],
      [
        "maximumFractionDigits",
        "Bestimmt die sichtbaren Nachkommastellen."
      ]
    ],
    "note": "Die Ausgabe rundet nur zur Darstellung und ändert den gespeicherten Wert nicht.",
    "detail": "daten ist ein Anteil von 0 bis 1. Gib den integer-Teil einer de-DE-Prozentausgabe ohne Nachkommastellen zurück.",
    "task": "daten ist ein Anteil von 0 bis 1. Gib den integer-Teil einer de-DE-Prozentausgabe ohne Nachkommastellen zurück. Verändere die Eingabe nicht.",
    "functionName": "webIntlPercent",
    "parameter": "daten",
    "tests": [
      {
        "input": 0.25,
        "expected": "25"
      },
      {
        "input": 0,
        "expected": "0"
      },
      {
        "input": 1,
        "expected": "100"
      },
      {
        "input": 0.126,
        "expected": "13"
      }
    ],
    "starter": "function webIntlPercent(daten) {\n  // Deine Lösung\n}",
    "solution": "function webIntlPercent(daten) {\n  return new Intl.NumberFormat(\"de-DE\",{style:\"percent\",maximumFractionDigits:0}).formatToParts(daten).filter(p=>p.type===\"integer\").map(p=>p.value).join(\"\");\n}",
    "example": "function webIntlPercent(daten) {\n  return new Intl.NumberFormat(\"de-DE\",{style:\"percent\",maximumFractionDigits:0}).formatToParts(daten).filter(p=>p.type===\"integer\").map(p=>p.value).join(\"\");\n}\nconsole.log(webIntlPercent(0.25));",
    "preserveInput": true,
    "hints": [
      "Übergebe den Anteil unverändert.",
      "Lies den integer-Teil aus der formatierten Ausgabe."
    ],
    "explanation": "Lies den integer-Teil aus der formatierten Ausgabe."
  },
  {
    "id": "js-web-intl-plural",
    "course": "js",
    "category": "Intl & Anzeige",
    "name": "Intl.PluralRules",
    "title": "Einzahl und Mehrzahl auswählen",
    "description": "PluralRules liefert eine Sprachkategorie, aus der du den passenden Text auswählst.",
    "syntax": "new Intl.PluralRules(\"de-DE\").select(1); // one",
    "parts": [
      [
        "one",
        "Bei deutschen ganzen Zahlen nur die 1."
      ],
      [
        "other",
        "Wählt die übrige Form; andere Sprachen haben mehr Kategorien."
      ]
    ],
    "note": "PluralRules übersetzt keine Wörter. Die Texte stellst du selbst bereit.",
    "detail": "daten ist eine nichtnegative ganze Zahl. Gib \"1 Aufgabe\" für Kategorie one und sonst \"N Aufgaben\" zurück.",
    "task": "daten ist eine nichtnegative ganze Zahl. Gib \"1 Aufgabe\" für Kategorie one und sonst \"N Aufgaben\" zurück. Verändere die Eingabe nicht.",
    "functionName": "webIntlPlural",
    "parameter": "daten",
    "tests": [
      {
        "input": 0,
        "expected": "0 Aufgaben"
      },
      {
        "input": 1,
        "expected": "1 Aufgabe"
      },
      {
        "input": 2,
        "expected": "2 Aufgaben"
      },
      {
        "input": 21,
        "expected": "21 Aufgaben"
      }
    ],
    "starter": "function webIntlPlural(daten) {\n  // Deine Lösung\n}",
    "solution": "function webIntlPlural(daten) {\n  const k=new Intl.PluralRules(\"de-DE\").select(daten);\n  return `${daten} ${k===\"one\"?\"Aufgabe\":\"Aufgaben\"}`;\n}",
    "example": "function webIntlPlural(daten) {\n  const k=new Intl.PluralRules(\"de-DE\").select(daten);\n  return `${daten} ${k===\"one\"?\"Aufgabe\":\"Aufgaben\"}`;\n}\nconsole.log(webIntlPlural(0));",
    "preserveInput": true,
    "hints": [
      "Ermittle zuerst die Pluralkategorie.",
      "Verbinde Zahl und passende Wortform."
    ],
    "explanation": "Verbinde Zahl und passende Wortform."
  },
  {
    "id": "js-web-intl-date",
    "course": "js",
    "category": "Intl & Anzeige",
    "name": "DateTimeFormat / timeZone",
    "title": "Ein Datum unabhängig vom Gerät anzeigen",
    "description": "Eine feste Zeitzone verhindert, dass derselbe Zeitpunkt auf verschiedenen Geräten als anderer Kalendertag angezeigt wird.",
    "syntax": "new Intl.DateTimeFormat(\"de-DE\", {timeZone:\"UTC\",year:\"numeric\",month:\"2-digit\",day:\"2-digit\"});",
    "parts": [
      [
        "timeZone: UTC",
        "Legt die Auswertung unabhängig von der Gerätezeitzone fest."
      ],
      [
        "format",
        "Liefert die sprachabhängige Datumsdarstellung."
      ]
    ],
    "note": "daten enthält einen gültigen ISO-Zeitpunkt mit Zeitzonenangabe.",
    "detail": "Formatiere den Zeitpunkt daten als de-DE-Datum mit zweistelligem Tag/Monat, vierstelligem Jahr und UTC-Zeitzone.",
    "task": "Formatiere den Zeitpunkt daten als de-DE-Datum mit zweistelligem Tag/Monat, vierstelligem Jahr und UTC-Zeitzone. Verändere die Eingabe nicht.",
    "functionName": "webIntlDate",
    "parameter": "daten",
    "tests": [
      {
        "input": "2024-02-29T12:00:00Z",
        "expected": "29.02.2024"
      },
      {
        "input": "2025-01-01T00:30:00+02:00",
        "expected": "31.12.2024"
      },
      {
        "input": "2026-10-10T00:00:00Z",
        "expected": "10.10.2026"
      }
    ],
    "starter": "function webIntlDate(daten) {\n  // Deine Lösung\n}",
    "solution": "function webIntlDate(daten) {\n  return new Intl.DateTimeFormat(\"de-DE\",{timeZone:\"UTC\",year:\"numeric\",month:\"2-digit\",day:\"2-digit\"}).format(new Date(daten));\n}",
    "example": "function webIntlDate(daten) {\n  return new Intl.DateTimeFormat(\"de-DE\",{timeZone:\"UTC\",year:\"numeric\",month:\"2-digit\",day:\"2-digit\"}).format(new Date(daten));\n}\nconsole.log(webIntlDate(\"2024-02-29T12:00:00Z\"));",
    "preserveInput": true,
    "hints": [
      "Erzeuge ein Date-Objekt aus dem ISO-String.",
      "Setze timeZone explizit auf UTC."
    ],
    "explanation": "Setze timeZone explizit auf UTC."
  },
  {
    "id": "js-web-iterator-next",
    "course": "js",
    "category": "Iteratoren & Generatoren",
    "name": "Symbol.iterator / next",
    "title": "Einen Iterator schrittweise lesen",
    "description": "Ein Iterator liefert bei next ein Objekt mit value und done. Das Ende ist kein gewöhnlicher weiterer Wert.",
    "syntax": "const iterator = liste[Symbol.iterator]();\niterator.next();",
    "parts": [
      [
        "Symbol.iterator",
        "Erzeugt den Iterator für ein Array."
      ],
      [
        "done",
        "Ist true, wenn kein weiterer Wert vorhanden ist."
      ]
    ],
    "note": "Die Aufgabe normalisiert den Endwert zu null, damit Ergebnisse als JSON vergleichbar bleiben.",
    "detail": "daten ist ein Array. Lies genau daten.length+1 mal next(). Gib pro Schritt {wert,fertig} zurück; nach Ende ist wert null und fertig true.",
    "task": "daten ist ein Array. Lies genau daten.length+1 mal next(). Gib pro Schritt {wert,fertig} zurück; nach Ende ist wert null und fertig true. Verändere die Eingabe nicht.",
    "functionName": "webIteratorNext",
    "parameter": "daten",
    "tests": [
      {
        "input": [],
        "expected": [
          {
            "wert": null,
            "fertig": true
          }
        ]
      },
      {
        "input": [
          0,
          false
        ],
        "expected": [
          {
            "wert": 0,
            "fertig": false
          },
          {
            "wert": false,
            "fertig": false
          },
          {
            "wert": null,
            "fertig": true
          }
        ]
      },
      {
        "input": [
          "a"
        ],
        "expected": [
          {
            "wert": "a",
            "fertig": false
          },
          {
            "wert": null,
            "fertig": true
          }
        ]
      }
    ],
    "starter": "function webIteratorNext(daten) {\n  // Deine Lösung\n}",
    "solution": "function webIteratorNext(daten) {\n  const it=daten[Symbol.iterator](),out=[];\n  for(let i=0;i<=daten.length;i++){const step=it.next();out.push({wert:step.done?null:step.value,fertig:step.done});}\n  return out;\n}",
    "example": "function webIteratorNext(daten) {\n  const it=daten[Symbol.iterator](),out=[];\n  for(let i=0;i<=daten.length;i++){const step=it.next();out.push({wert:step.done?null:step.value,fertig:step.done});}\n  return out;\n}\nconsole.log(webIteratorNext([]));",
    "preserveInput": true,
    "hints": [
      "Das Ende erkennst du an done, nicht an der Truthiness des Werts.",
      "Lies einmal mehr, um das Endsignal zu erhalten."
    ],
    "explanation": "Lies einmal mehr, um das Endsignal zu erhalten."
  },
  {
    "id": "js-web-generator-range",
    "course": "js",
    "category": "Iteratoren & Generatoren",
    "name": "function* / yield",
    "title": "Werte mit einem Generator erzeugen",
    "description": "yield gibt einen Wert ab und pausiert die Generatorfunktion bis zur nächsten Anfrage.",
    "syntax": "function* zahlen() { yield 1; yield 2; }",
    "parts": [
      [
        "function*",
        "Erzeugt beim Aufruf einen Generator statt sofort alle Ergebnisse."
      ],
      [
        "yield",
        "Gibt den nächsten Wert ab."
      ]
    ],
    "note": "Ein Generator spart nicht automatisch Speicher, wenn du ihn anschließend vollständig in ein Array sammelst.",
    "detail": "daten enthält start und ende als ganze Zahlen. Definiere einen Generator für alle Zahlen von start bis einschließlich ende und gib seine Werte als Array zurück. Bei start>ende ist das Array leer.",
    "task": "daten enthält start und ende als ganze Zahlen. Definiere einen Generator für alle Zahlen von start bis einschließlich ende und gib seine Werte als Array zurück. Bei start>ende ist das Array leer. Verändere die Eingabe nicht.",
    "functionName": "webGeneratorRange",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "start": 2,
          "ende": 4
        },
        "expected": [
          2,
          3,
          4
        ]
      },
      {
        "input": {
          "start": 0,
          "ende": 0
        },
        "expected": [
          0
        ]
      },
      {
        "input": {
          "start": 3,
          "ende": 1
        },
        "expected": []
      },
      {
        "input": {
          "start": -2,
          "ende": 0
        },
        "expected": [
          -2,
          -1,
          0
        ]
      }
    ],
    "starter": "function webGeneratorRange(daten) {\n  // Deine Lösung\n}",
    "solution": "function webGeneratorRange(daten) {\n  function* bereich(){for(let n=daten.start;n<=daten.ende;n++)yield n;}\n  return [...bereich()];\n}",
    "example": "function webGeneratorRange(daten) {\n  function* bereich(){for(let n=daten.start;n<=daten.ende;n++)yield n;}\n  return [...bereich()];\n}\nconsole.log(webGeneratorRange({\"start\": 2, \"ende\": 4}));",
    "preserveInput": true,
    "hints": [
      "Der Generator enthält eine gewöhnliche Schleife.",
      "Spread konsumiert die erzeugten Werte."
    ],
    "explanation": "Spread konsumiert die erzeugten Werte."
  },
  {
    "id": "js-web-generator-delegate",
    "course": "js",
    "category": "Iteratoren & Generatoren",
    "name": "yield*",
    "title": "Mehrere Iterables zusammenführen",
    "description": "yield* gibt alle Werte eines anderen Iterables nacheinander weiter.",
    "syntax": "function* alle() { yield* gruppeA; yield* gruppeB; }",
    "parts": [
      [
        "yield* array",
        "Delegiert das Lesen an den Iterator des Arrays."
      ],
      [
        "Reihenfolge",
        "Bleibt innerhalb und zwischen Gruppen erhalten."
      ]
    ],
    "note": "Die Aufgabe flacht genau eine Gruppenebene ab, keine beliebig tief verschachtelten Arrays.",
    "detail": "daten ist eine Liste von Arrays. Gib mit einem Generator und yield* alle Gruppenwerte als ein Array zurück.",
    "task": "daten ist eine Liste von Arrays. Gib mit einem Generator und yield* alle Gruppenwerte als ein Array zurück. Verändere die Eingabe nicht.",
    "functionName": "webGeneratorDelegate",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          [
            1,
            2
          ],
          [],
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
        "input": [],
        "expected": []
      },
      {
        "input": [
          [
            0,
            false
          ],
          [
            "x"
          ]
        ],
        "expected": [
          0,
          false,
          "x"
        ]
      },
      {
        "input": [
          [
            [
              1
            ]
          ],
          [
            2
          ]
        ],
        "expected": [
          [
            1
          ],
          2
        ]
      }
    ],
    "starter": "function webGeneratorDelegate(daten) {\n  // Deine Lösung\n}",
    "solution": "function webGeneratorDelegate(daten) {\n  function* alle(){for(const gruppe of daten)yield* gruppe;}\n  return [...alle()];\n}",
    "example": "function webGeneratorDelegate(daten) {\n  function* alle(){for(const gruppe of daten)yield* gruppe;}\n  return [...alle()];\n}\nconsole.log(webGeneratorDelegate([[1, 2], [], [3]]));",
    "preserveInput": true,
    "hints": [
      "Gehe die Gruppen in ihrer ursprünglichen Reihenfolge durch.",
      "yield* gibt ihre Elemente weiter."
    ],
    "explanation": "yield* gibt ihre Elemente weiter."
  },
  {
    "id": "js-web-iterable-custom",
    "course": "js",
    "category": "Iteratoren & Generatoren",
    "name": "[Symbol.iterator]",
    "title": "Ein eigenes Iterable bauen",
    "description": "Ein Objekt wird mit for-of lesbar, wenn es eine Methode unter Symbol.iterator bereitstellt.",
    "syntax": "const obj = { *[Symbol.iterator]() { yield \"a\"; } };",
    "parts": [
      [
        "Iterable",
        "Kann einen Iterator erzeugen."
      ],
      [
        "Iterator",
        "Verwaltet die aktuelle Position."
      ]
    ],
    "note": "Ein erneuter Aufruf von Symbol.iterator soll einen neuen, unabhängigen Durchlauf beginnen.",
    "detail": "daten ist ein Array. Erzeuge ein eigenes Iterable, das daten rückwärts liest. Konsumiere es zweimal und gib beide Arrays als [erster,zweiter] zurück.",
    "task": "daten ist ein Array. Erzeuge ein eigenes Iterable, das daten rückwärts liest. Konsumiere es zweimal und gib beide Arrays als [erster,zweiter] zurück. Verändere die Eingabe nicht.",
    "functionName": "webIterableCustom",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          1,
          2,
          3
        ],
        "expected": [
          [
            3,
            2,
            1
          ],
          [
            3,
            2,
            1
          ]
        ]
      },
      {
        "input": [],
        "expected": [
          [],
          []
        ]
      },
      {
        "input": [
          0
        ],
        "expected": [
          [
            0
          ],
          [
            0
          ]
        ]
      }
    ],
    "starter": "function webIterableCustom(daten) {\n  // Deine Lösung\n}",
    "solution": "function webIterableCustom(daten) {\n  const obj={*[Symbol.iterator](){for(let i=daten.length-1;i>=0;i--)yield daten[i];}};\n  return [[...obj],[...obj]];\n}",
    "example": "function webIterableCustom(daten) {\n  const obj={*[Symbol.iterator](){for(let i=daten.length-1;i>=0;i--)yield daten[i];}};\n  return [[...obj],[...obj]];\n}\nconsole.log(webIterableCustom([1, 2, 3]));",
    "preserveInput": true,
    "hints": [
      "Definiere eine Generator-Methode unter Symbol.iterator.",
      "Lege den Schleifenzähler in der Methode an, nicht außen."
    ],
    "explanation": "Lege den Schleifenzähler in der Methode an, nicht außen."
  },
  {
    "id": "js-web-abort-signal",
    "course": "js",
    "category": "Asynchrone Abläufe",
    "name": "AbortController / signal",
    "title": "Eine Abbruchmeldung beobachten",
    "description": "AbortController erzeugt ein Signal, das unterstützte Operationen beobachten können.",
    "syntax": "const controller = new AbortController();\ncontroller.abort();",
    "parts": [
      [
        "signal.aborted",
        "Zeigt den aktuellen Abbruchzustand."
      ],
      [
        "abort-Event",
        "Wird beim ersten Abbruch ausgelöst."
      ]
    ],
    "note": "abort beendet keine beliebige laufende Funktion. Eine API muss das Signal beachten.",
    "detail": "daten ist die Zahl der abort-Aufrufe von 0 bis 3. Registriere einen abort-Listener, rufe abort entsprechend oft und gib {abgebrochen,events} zurück.",
    "task": "daten ist die Zahl der abort-Aufrufe von 0 bis 3. Registriere einen abort-Listener, rufe abort entsprechend oft und gib {abgebrochen,events} zurück. Verändere die Eingabe nicht.",
    "functionName": "webAbortSignal",
    "parameter": "daten",
    "tests": [
      {
        "input": 0,
        "expected": {
          "abgebrochen": false,
          "events": 0
        }
      },
      {
        "input": 1,
        "expected": {
          "abgebrochen": true,
          "events": 1
        }
      },
      {
        "input": 3,
        "expected": {
          "abgebrochen": true,
          "events": 1
        }
      }
    ],
    "starter": "function webAbortSignal(daten) {\n  // Deine Lösung\n}",
    "solution": "function webAbortSignal(daten) {\n  const controller=new AbortController();let events=0;\n  controller.signal.addEventListener(\"abort\",()=>events++);\n  for(let i=0;i<daten;i++)controller.abort();\n  return {abgebrochen:controller.signal.aborted,events};\n}",
    "example": "function webAbortSignal(daten) {\n  const controller=new AbortController();let events=0;\n  controller.signal.addEventListener(\"abort\",()=>events++);\n  for(let i=0;i<daten;i++)controller.abort();\n  return {abgebrochen:controller.signal.aborted,events};\n}\nconsole.log(webAbortSignal(0));",
    "preserveInput": true,
    "hints": [
      "Ein Signal kann nur einmal vom laufenden in den abgebrochenen Zustand wechseln.",
      "Zähle die Events im Listener."
    ],
    "explanation": "Zähle die Events im Listener."
  },
  {
    "id": "js-web-abort-reason",
    "course": "js",
    "category": "Asynchrone Abläufe",
    "name": "reason / throwIfAborted",
    "title": "Einen Abbruchgrund weitergeben",
    "description": "throwIfAborted wirft den gespeicherten Grund, wenn das Signal bereits abgebrochen wurde.",
    "syntax": "controller.abort(\"Neustart\");\ncontroller.signal.throwIfAborted();",
    "parts": [
      [
        "reason",
        "Speichert den übergebenen Grund."
      ],
      [
        "throwIfAborted",
        "Prüft den Zustand direkt vor einer Arbeit."
      ]
    ],
    "note": "Ein Abbruchgrund kann ein Error-Objekt oder ein anderer Wert sein. Hier verwenden wir Strings.",
    "detail": "daten enthält abbrechen als Boolean und grund als String. Erzeuge ein Signal; brich bei true mit grund ab. Prüfe throwIfAborted. Gib \"weiter\" oder den gefangenen Grund zurück.",
    "task": "daten enthält abbrechen als Boolean und grund als String. Erzeuge ein Signal; brich bei true mit grund ab. Prüfe throwIfAborted. Gib \"weiter\" oder den gefangenen Grund zurück. Verändere die Eingabe nicht.",
    "functionName": "webAbortReason",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "abbrechen": false,
          "grund": "Stop"
        },
        "expected": "weiter"
      },
      {
        "input": {
          "abbrechen": true,
          "grund": "Neue Suche"
        },
        "expected": "Neue Suche"
      },
      {
        "input": {
          "abbrechen": true,
          "grund": ""
        },
        "expected": ""
      }
    ],
    "starter": "function webAbortReason(daten) {\n  // Deine Lösung\n}",
    "solution": "function webAbortReason(daten) {\n  const c=new AbortController();if(daten.abbrechen)c.abort(daten.grund);\n  try{c.signal.throwIfAborted();return \"weiter\";}catch(grund){return grund;}\n}",
    "example": "function webAbortReason(daten) {\n  const c=new AbortController();if(daten.abbrechen)c.abort(daten.grund);\n  try{c.signal.throwIfAborted();return \"weiter\";}catch(grund){return grund;}\n}\nconsole.log(webAbortReason({\"abbrechen\": false, \"grund\": \"Stop\"}));",
    "preserveInput": true,
    "hints": [
      "Prüfe über die API statt nur einen eigenen Boolean.",
      "Gib auch einen leeren String als gültigen Grund zurück."
    ],
    "explanation": "Gib auch einen leeren String als gültigen Grund zurück."
  },
  {
    "id": "js-web-retry",
    "course": "js",
    "category": "Asynchrone Abläufe",
    "name": "try / catch / Retry",
    "title": "Fehler nur begrenzt wiederholen",
    "description": "Ein Retry begrenzt die Anzahl weiterer Versuche und gibt den letzten Fehler sichtbar zurück.",
    "syntax": "for (let versuch = 0; versuch < limit; versuch++) { try { return await laden(); } catch {} }",
    "parts": [
      [
        "Limit",
        "Bezeichnet hier die Gesamtzahl aller Versuche."
      ],
      [
        "Fehler sammeln",
        "Macht sichtbar, ob ein späterer Versuch Erfolg hatte."
      ]
    ],
    "note": "Die Anfrage wird aus vorgegebenen Antworten simuliert. Echte Wartezeiten, Netzwerk und Backoff sind nicht Bestandteil dieser Aufgabe.",
    "detail": "daten enthält limit von 1 bis 5 und antworten mit {ok,wert}. Gehe bis zum ersten ok===true oder bis limit/Listenende. Gib {versuche,wert} zurück, bei keinem Erfolg wert null. Jeder Aufruf soll ein aufgelöstes oder abgelehntes Promise verwenden.",
    "task": "daten enthält limit von 1 bis 5 und antworten mit {ok,wert}. Gehe bis zum ersten ok===true oder bis limit/Listenende. Gib {versuche,wert} zurück, bei keinem Erfolg wert null. Jeder Aufruf soll ein aufgelöstes oder abgelehntes Promise verwenden. Verändere die Eingabe nicht.",
    "functionName": "webRetry",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "limit": 3,
          "antworten": [
            {
              "ok": false
            },
            {
              "ok": true,
              "wert": 0
            }
          ]
        },
        "expected": {
          "versuche": 2,
          "wert": 0
        }
      },
      {
        "input": {
          "limit": 1,
          "antworten": [
            {
              "ok": false
            },
            {
              "ok": true,
              "wert": 5
            }
          ]
        },
        "expected": {
          "versuche": 1,
          "wert": null
        }
      },
      {
        "input": {
          "limit": 3,
          "antworten": []
        },
        "expected": {
          "versuche": 0,
          "wert": null
        }
      },
      {
        "input": {
          "limit": 2,
          "antworten": [
            {
              "ok": true,
              "wert": false
            }
          ]
        },
        "expected": {
          "versuche": 1,
          "wert": false
        }
      }
    ],
    "starter": "function webRetry(daten) {\n  // Deine Lösung\n}",
    "solution": "async function webRetry(daten) {\n  let versuche=0;\n  for(const antwort of daten.antworten.slice(0,daten.limit)){versuche++;try{const wert=await (antwort.ok?Promise.resolve(antwort.wert):Promise.reject(new Error(\"Fehler\")));return {versuche,wert};}catch{}}\n  return {versuche,wert:null};\n}",
    "example": "async function webRetry(daten) {\n  let versuche=0;\n  for(const antwort of daten.antworten.slice(0,daten.limit)){versuche++;try{const wert=await (antwort.ok?Promise.resolve(antwort.wert):Promise.reject(new Error(\"Fehler\")));return {versuche,wert};}catch{}}\n  return {versuche,wert:null};\n}\nconsole.log(await webRetry({\"limit\": 3, \"antworten\": [{\"ok\": false}, {\"ok\": true, \"wert\": 0}]}));",
    "preserveInput": true,
    "hints": [
      "Erhöhe den Zähler vor jedem Versuch.",
      "Ein Ergebnis 0 oder false ist ebenfalls Erfolg."
    ],
    "explanation": "Ein Ergebnis 0 oder false ist ebenfalls Erfolg."
  },
  {
    "id": "js-web-retry-status",
    "course": "js",
    "category": "Asynchrone Abläufe",
    "name": "Retry-Entscheidung",
    "title": "Abbruch und HTTP-Fehler unterscheiden",
    "description": "Nicht jeder Fehler sollte erneut versucht werden. Ein Benutzerabbruch ist ein anderes Signal als ein vorübergehender Serverfehler.",
    "syntax": "if (error.name === \"AbortError\") return false;",
    "parts": [
      [
        "AbortError",
        "Beendet die Arbeit auf Wunsch statt sie neu zu starten."
      ],
      [
        "429 / 5xx",
        "Können bei passenden idempotenten Anfragen einen Retry erlauben."
      ]
    ],
    "note": "POST-Anfragen können bei Wiederholung doppelte Änderungen auslösen. Dieses Lernmodell entscheidet nur für GET; reale Systeme beachten Retry-After und Backoff.",
    "detail": "daten enthält methode, name und status. Gib true nur für GET, name!==AbortError und status 429 oder 500 bis 599 zurück.",
    "task": "daten enthält methode, name und status. Gib true nur für GET, name!==AbortError und status 429 oder 500 bis 599 zurück. Verändere die Eingabe nicht.",
    "functionName": "webRetryStatus",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "methode": "GET",
          "name": "Error",
          "status": 503
        },
        "expected": true
      },
      {
        "input": {
          "methode": "GET",
          "name": "AbortError",
          "status": 503
        },
        "expected": false
      },
      {
        "input": {
          "methode": "POST",
          "name": "Error",
          "status": 503
        },
        "expected": false
      },
      {
        "input": {
          "methode": "GET",
          "name": "Error",
          "status": 404
        },
        "expected": false
      },
      {
        "input": {
          "methode": "GET",
          "name": "Error",
          "status": 429
        },
        "expected": true
      }
    ],
    "starter": "function webRetryStatus(daten) {\n  // Deine Lösung\n}",
    "solution": "function webRetryStatus(daten) {\n  return daten.methode===\"GET\" && daten.name!==\"AbortError\" && (daten.status===429 || (daten.status>=500 && daten.status<=599));\n}",
    "example": "function webRetryStatus(daten) {\n  return daten.methode===\"GET\" && daten.name!==\"AbortError\" && (daten.status===429 || (daten.status>=500 && daten.status<=599));\n}\nconsole.log(webRetryStatus({\"methode\": \"GET\", \"name\": \"Error\", \"status\": 503}));",
    "preserveInput": true,
    "hints": [
      "Prüfe die Methode und den Abbruch zuerst.",
      "Begrenze den Serverfehlerbereich auf 500 bis 599."
    ],
    "explanation": "Begrenze den Serverfehlerbereich auf 500 bis 599."
  },
  {
    "id": "js-web-stale-result",
    "course": "js",
    "category": "Projektarchitektur",
    "name": "Anfragekennung",
    "title": "Veraltete Suchergebnisse erkennen",
    "description": "Anfragen können in anderer Reihenfolge fertig werden als sie gestartet wurden. Eine Kennung verhindert, dass ein altes Ergebnis die neue Ansicht überschreibt.",
    "syntax": "if (antwort.id !== aktuelleId) return;",
    "parts": [
      [
        "Aktuelle Kennung",
        "Gehört zur zuletzt gestarteten Anfrage."
      ],
      [
        "Ergebnisreihenfolge",
        "Bestimmt nicht, welche Anfrage aktuell ist."
      ]
    ],
    "note": "Abbrechen allein verhindert nicht jedes verspätete Ergebnis. Die Kennungsprüfung ergänzt es.",
    "detail": "daten enthält aktuelleId und antworten (id,wert) in Ankunftsreihenfolge. Gib den letzten Wert mit id===aktuelleId zurück, sonst null.",
    "task": "daten enthält aktuelleId und antworten (id,wert) in Ankunftsreihenfolge. Gib den letzten Wert mit id===aktuelleId zurück, sonst null. Verändere die Eingabe nicht.",
    "functionName": "webStaleResult",
    "parameter": "daten",
    "tests": [
      {
        "input": {
          "aktuelleId": 2,
          "antworten": [
            {
              "id": 2,
              "wert": "neu"
            },
            {
              "id": 1,
              "wert": "alt"
            }
          ]
        },
        "expected": "neu"
      },
      {
        "input": {
          "aktuelleId": 1,
          "antworten": []
        },
        "expected": null
      },
      {
        "input": {
          "aktuelleId": 0,
          "antworten": [
            {
              "id": 0,
              "wert": false
            }
          ]
        },
        "expected": false
      }
    ],
    "starter": "function webStaleResult(daten) {\n  // Deine Lösung\n}",
    "solution": "function webStaleResult(daten) {\n  let wert=null;for(const antwort of daten.antworten)if(antwort.id===daten.aktuelleId)wert=antwort.wert;\n  return wert;\n}",
    "example": "function webStaleResult(daten) {\n  let wert=null;for(const antwort of daten.antworten)if(antwort.id===daten.aktuelleId)wert=antwort.wert;\n  return wert;\n}\nconsole.log(webStaleResult({\"aktuelleId\": 2, \"antworten\": [{\"id\": 2, \"wert\": \"neu\"}, {\"id\": 1, \"wert\": \"alt\"}]}));",
    "preserveInput": true,
    "hints": [
      "Vergleiche IDs exakt.",
      "Nutze keinen Truthiness-Fallback für den Wert."
    ],
    "explanation": "Nutze keinen Truthiness-Fallback für den Wert."
  },
  {
    "id": "js-web-memo-cache",
    "course": "js",
    "category": "Projektarchitektur",
    "name": "Map.has / Cache",
    "title": "Ergebnisse aus einem Cache wiederverwenden",
    "description": "Ein Cache speichert bereits berechnete Werte unter einem Schlüssel. has unterscheidet fehlende Werte von gespeicherten 0 oder false.",
    "syntax": "if (cache.has(key)) return cache.get(key);",
    "parts": [
      [
        "Map.has",
        "Prüft das Vorhandensein unabhängig vom Wert."
      ],
      [
        "Cache-Lebensdauer",
        "Muss zur Gültigkeit der Daten passen."
      ]
    ],
    "note": "Die Aufgabe verwendet einen frischen Cache pro Aufruf und verdoppelt Zahlen. Netzwerk-Caches brauchen eigene Ablauf- und Invalidierungsregeln.",
    "detail": "daten ist ein Array kleiner Zahlen. Verdopple jede Zahl, berechne jede unterschiedliche Zahl nur einmal. Gib {werte,berechnungen} zurück.",
    "task": "daten ist ein Array kleiner Zahlen. Verdopple jede Zahl, berechne jede unterschiedliche Zahl nur einmal. Gib {werte,berechnungen} zurück. Verändere die Eingabe nicht.",
    "functionName": "webMemoCache",
    "parameter": "daten",
    "tests": [
      {
        "input": [
          0,
          0,
          2,
          2
        ],
        "expected": {
          "werte": [
            0,
            0,
            4,
            4
          ],
          "berechnungen": 2
        }
      },
      {
        "input": [],
        "expected": {
          "werte": [],
          "berechnungen": 0
        }
      },
      {
        "input": [
          -1,
          1,
          -1
        ],
        "expected": {
          "werte": [
            -2,
            2,
            -2
          ],
          "berechnungen": 2
        }
      }
    ],
    "starter": "function webMemoCache(daten) {\n  // Deine Lösung\n}",
    "solution": "function webMemoCache(daten) {\n  const cache=new Map();let berechnungen=0;\n  const werte=daten.map(n=>{if(!cache.has(n)){cache.set(n,n*2);berechnungen++;}return cache.get(n);});\n  return {werte,berechnungen};\n}",
    "example": "function webMemoCache(daten) {\n  const cache=new Map();let berechnungen=0;\n  const werte=daten.map(n=>{if(!cache.has(n)){cache.set(n,n*2);berechnungen++;}return cache.get(n);});\n  return {werte,berechnungen};\n}\nconsole.log(webMemoCache([0, 0, 2, 2]));",
    "preserveInput": true,
    "hints": [
      "Zähle nur beim Setzen eines neuen Cache-Eintrags.",
      "has erkennt auch den gespeicherten Wert 0."
    ],
    "explanation": "has erkennt auch den gespeicherten Wert 0."
  }
];
