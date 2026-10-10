export const timeLessons = [
  {
    "id": "js-time-timeout",
    "course": "js",
    "category": "Timer & Animation",
    "name": "setTimeout",
    "title": "Eine Aktion verzögert einmal ausführen",
    "description": "setTimeout plant einen Callback für später. Die folgende Zeile läuft zuerst; der Callback gehört zu einer späteren Aufgabe.",
    "syntax": "setTimeout(() => { fertig = true; }, 200);",
    "parts": [
      [
        "Callback",
        "Wird erst nach Ablauf der Verzögerung aufgerufen."
      ],
      [
        "Millisekunden",
        "200 ms sind 0,2 Sekunden."
      ]
    ],
    "note": "Timerzeiten sind Mindestwartezeiten, keine Echtzeitgarantie. Die Übungsuhr verwendet feste Zeiten; ein Timeout mit 0 läuft hier frühestens nach 1 ms.",
    "detail": "daten enthält delay als positive ganze Millisekundenzahl. Initialisiere fertig=false und setze es nach delay auf true.",
    "functionName": "zeitTimeout",
    "parameter": "daten",
    "task": "daten enthält delay als positive ganze Millisekundenzahl. Initialisiere fertig=false und setze es nach delay auf true. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "delay": 200
        },
        "actions": [
          {
            "type": "advance",
            "ms": 199
          }
        ],
        "expected": false
      },
      {
        "input": {
          "delay": 200
        },
        "actions": [
          {
            "type": "advance",
            "ms": 200
          }
        ],
        "expected": true
      },
      {
        "input": {
          "delay": 50
        },
        "actions": [
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": true
      },
      {
        "input": {
          "delay": 10
        },
        "actions": [],
        "expected": false
      }
    ],
    "hints": [
      "Wird erst nach Ablauf der Verzögerung aufgerufen.",
      "Timerzeiten sind Mindestwartezeiten, keine Echtzeitgarantie. Die Übungsuhr verwendet feste Zeiten; ein Timeout mit 0 läuft hier frühestens nach 1 ms."
    ],
    "solution": "function zeitTimeout(daten) {\n  let fertig = false;\n  setTimeout(() => { fertig = true; document.querySelector(\"#stand\").textContent = \"Fertig\"; }, daten.delay);\n  return () => fertig;\n}",
    "explanation": "setTimeout plant einen Callback für später. Die folgende Zeile läuft zuerst; der Callback gehört zu einer späteren Aufgabe. Timerzeiten sind Mindestwartezeiten, keine Echtzeitgarantie. Die Übungsuhr verwendet feste Zeiten; ein Timeout mit 0 läuft hier frühestens nach 1 ms.",
    "preserveInput": true,
    "browser": {
      "html": "<p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitTimeout(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitTimeout(daten) {\n  let fertig = false;\n  setTimeout(() => { fertig = true; document.querySelector(\"#stand\").textContent = \"Fertig\"; }, daten.delay);\n  return () => fertig;\n}\n\nconst lesen = zeitTimeout({\"delay\": 200});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-cancel",
    "course": "js",
    "category": "Timer & Animation",
    "name": "clearTimeout",
    "title": "Einen geplanten Timeout abbrechen",
    "description": "setTimeout liefert eine Kennung. clearTimeout verwendet diese Kennung, um den noch nicht ausgeführten Callback zu entfernen.",
    "syntax": "const id = setTimeout(callback, 200);\nclearTimeout(id);",
    "parts": [
      [
        "Kennung",
        "Bewahre den Rückgabewert des Timers auf."
      ],
      [
        "Abbrechen",
        "Verhindert nur einen noch ausstehenden Callback."
      ]
    ],
    "note": "Ein bereits ausgeführter Callback wird durch clearTimeout nicht rückgängig gemacht.",
    "detail": "Plane nach 200 ms fertig=true. Der Button #abbrechen ruft clearTimeout auf. Der Leser gibt fertig zurück.",
    "functionName": "zeitCancel",
    "parameter": "daten",
    "task": "Plane nach 200 ms fertig=true. Der Button #abbrechen ruft clearTimeout auf. Der Leser gibt fertig zurück. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#abbrechen"
          },
          {
            "type": "advance",
            "ms": 500
          }
        ],
        "expected": false
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 200
          }
        ],
        "expected": true
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "click",
            "selector": "#abbrechen"
          },
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": false
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 200
          },
          {
            "type": "click",
            "selector": "#abbrechen"
          }
        ],
        "expected": true
      }
    ],
    "hints": [
      "Bewahre den Rückgabewert des Timers auf.",
      "Ein bereits ausgeführter Callback wird durch clearTimeout nicht rückgängig gemacht."
    ],
    "solution": "function zeitCancel(daten) {\n  let fertig = false;\n  const stand = document.querySelector(\"#stand\");\n  stand.textContent = \"Geplant\";\n  const id = setTimeout(() => { fertig = true; stand.textContent = \"Fertig\"; }, 200);\n  document.querySelector(\"#abbrechen\").addEventListener(\"click\", () => { clearTimeout(id); if (!fertig) stand.textContent = \"Abgebrochen\"; });\n  return () => fertig;\n}",
    "explanation": "setTimeout liefert eine Kennung. clearTimeout verwendet diese Kennung, um den noch nicht ausgeführten Callback zu entfernen. Ein bereits ausgeführter Callback wird durch clearTimeout nicht rückgängig gemacht.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"abbrechen\">Abbrechen</button><p id=\"stand\">Timeout</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitCancel(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitCancel(daten) {\n  let fertig = false;\n  const stand = document.querySelector(\"#stand\");\n  stand.textContent = \"Geplant\";\n  const id = setTimeout(() => { fertig = true; stand.textContent = \"Fertig\"; }, 200);\n  document.querySelector(\"#abbrechen\").addEventListener(\"click\", () => { clearTimeout(id); if (!fertig) stand.textContent = \"Abgebrochen\"; });\n  return () => fertig;\n}\n\nconst lesen = zeitCancel({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-interval",
    "course": "js",
    "category": "Timer & Animation",
    "name": "setInterval / clearInterval",
    "title": "Einen wiederholten Timer anhalten",
    "description": "setInterval plant wiederholte Aufrufe. clearInterval beendet weitere Aufrufe, ohne bisherige Ergebnisse zu löschen.",
    "syntax": "const id = setInterval(() => zaehler++, 100);",
    "parts": [
      [
        "100 ms",
        "Abstand zwischen den geplanten Aufrufen."
      ],
      [
        "clearInterval(id)",
        "Beendet weitere Ticks."
      ]
    ],
    "note": "Intervalle laufen im echten Browser nicht garantiert pünktlich. Für genaue Zeitmessung liest du Zeitstempel statt Ticks zu zählen.",
    "detail": "Zähle alle 100 ms einen Tick. #stop beendet das Intervall. Zeige den Zähler in #stand und gib einen Leser für die Zahl zurück.",
    "functionName": "zeitInterval",
    "parameter": "daten",
    "task": "Zähle alle 100 ms einen Tick. #stop beendet das Intervall. Zeige den Zähler in #stand und gib einen Leser für die Zahl zurück. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 99
          }
        ],
        "expected": 0
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 300
          }
        ],
        "expected": 3
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 200
          },
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 500
          }
        ],
        "expected": 2
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 1000
          }
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Abstand zwischen den geplanten Aufrufen.",
      "Intervalle laufen im echten Browser nicht garantiert pünktlich. Für genaue Zeitmessung liest du Zeitstempel statt Ticks zu zählen."
    ],
    "solution": "function zeitInterval(daten) {\n  let ticks = 0;\n  const id = setInterval(() => { ticks++; document.querySelector(\"#stand\").textContent = String(ticks); }, 100);\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => clearInterval(id));\n  return () => ticks;\n}",
    "explanation": "setInterval plant wiederholte Aufrufe. clearInterval beendet weitere Aufrufe, ohne bisherige Ergebnisse zu löschen. Intervalle laufen im echten Browser nicht garantiert pünktlich. Für genaue Zeitmessung liest du Zeitstempel statt Ticks zu zählen.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"stop\">Stoppen</button><p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitInterval(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitInterval(daten) {\n  let ticks = 0;\n  const id = setInterval(() => { ticks++; document.querySelector(\"#stand\").textContent = String(ticks); }, 100);\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => clearInterval(id));\n  return () => ticks;\n}\n\nconst lesen = zeitInterval({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-order",
    "course": "js",
    "category": "Timer & Animation",
    "name": "Reihenfolge von Timern",
    "title": "Timer nach Fälligkeit statt Quelltext ordnen",
    "description": "Ein zuerst angelegter Timer muss nicht zuerst ausgeführt werden. Entscheidend ist, wann sein Callback fällig wird.",
    "syntax": "setTimeout(() => reihenfolge.push(\"lang\"), 200);\nsetTimeout(() => reihenfolge.push(\"kurz\"), 100);",
    "parts": [
      [
        "Synchroner Code",
        "Läuft vor späteren Timer-Aufgaben."
      ],
      [
        "Fälligkeit",
        "Der kürzere Timer kann zuerst laufen."
      ]
    ],
    "note": "Die Aufgaben erwarten nur die Reihenfolge unterschiedlicher Verzögerungen. Allgemeine Event-Loop-Regeln zu Microtasks werden damit nicht vollständig simuliert.",
    "detail": "Erzeuge eine Liste. Plane zuerst lang nach 200 ms, dann kurz nach 100 ms; füge synchron sofort hinzu. Der Leser liefert eine Kopie der Liste.",
    "functionName": "zeitOrder",
    "parameter": "daten",
    "task": "Erzeuge eine Liste. Plane zuerst lang nach 200 ms, dann kurz nach 100 ms; füge synchron sofort hinzu. Der Leser liefert eine Kopie der Liste. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [],
        "expected": [
          "sofort"
        ]
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": [
          "sofort",
          "kurz"
        ]
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 200
          }
        ],
        "expected": [
          "sofort",
          "kurz",
          "lang"
        ]
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 99
          }
        ],
        "expected": [
          "sofort"
        ]
      }
    ],
    "hints": [
      "Läuft vor späteren Timer-Aufgaben.",
      "Die Aufgaben erwarten nur die Reihenfolge unterschiedlicher Verzögerungen. Allgemeine Event-Loop-Regeln zu Microtasks werden damit nicht vollständig simuliert."
    ],
    "solution": "function zeitOrder(daten) {\n  const reihenfolge = [];\n  const anzeigen = () => { document.querySelector(\"#stand\").textContent = reihenfolge.join(\" → \"); };\n  setTimeout(() => { reihenfolge.push(\"lang\"); anzeigen(); }, 200);\n  setTimeout(() => { reihenfolge.push(\"kurz\"); anzeigen(); }, 100);\n  reihenfolge.push(\"sofort\");\n  anzeigen();\n  return () => [...reihenfolge];\n}",
    "explanation": "Ein zuerst angelegter Timer muss nicht zuerst ausgeführt werden. Entscheidend ist, wann sein Callback fällig wird. Die Aufgaben erwarten nur die Reihenfolge unterschiedlicher Verzögerungen. Allgemeine Event-Loop-Regeln zu Microtasks werden damit nicht vollständig simuliert.",
    "preserveInput": true,
    "browser": {
      "html": "<p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitOrder(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitOrder(daten) {\n  const reihenfolge = [];\n  const anzeigen = () => { document.querySelector(\"#stand\").textContent = reihenfolge.join(\" → \"); };\n  setTimeout(() => { reihenfolge.push(\"lang\"); anzeigen(); }, 200);\n  setTimeout(() => { reihenfolge.push(\"kurz\"); anzeigen(); }, 100);\n  reihenfolge.push(\"sofort\");\n  anzeigen();\n  return () => [...reihenfolge];\n}\n\nconst lesen = zeitOrder({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-debounce",
    "course": "js",
    "category": "Timer & Animation",
    "name": "Debounce",
    "title": "Eine Suche erst nach einer Eingabepause starten",
    "description": "Debounce verschiebt Arbeit, solange neue Eingaben ankommen. Jeder neue input-Event ersetzt den ausstehenden Timeout.",
    "syntax": "clearTimeout(timer);\ntimer = setTimeout(suche, 200);",
    "parts": [
      [
        "clearTimeout",
        "Entfernt die Suche zur vorherigen Eingabe."
      ],
      [
        "200 ms Pause",
        "Erst danach wird der letzte Text übernommen."
      ]
    ],
    "note": "Debounce ist praktisch für Suchfelder. Es unterscheidet sich von Throttle: Während fortlaufender Eingaben kann der Aufruf immer weiter verschoben werden.",
    "detail": "Nach input bei #suche übernimm nach 200 ms Pause den getrimmten Text in #stand. Initialisiere die Ausgabe als leeren String. Neue Eingaben ersetzen den geplanten Aufruf.",
    "functionName": "zeitDebounce",
    "parameter": "daten",
    "task": "Nach input bei #suche übernimm nach 200 ms Pause den getrimmten Text in #stand. Initialisiere die Ausgabe als leeren String. Neue Eingaben ersetzen den geplanten Aufruf. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "input",
            "selector": "#suche",
            "value": " A "
          },
          {
            "type": "advance",
            "ms": 199
          }
        ],
        "expected": ""
      },
      {
        "input": {},
        "actions": [
          {
            "type": "input",
            "selector": "#suche",
            "value": " A "
          },
          {
            "type": "advance",
            "ms": 200
          }
        ],
        "expected": "A"
      },
      {
        "input": {},
        "actions": [
          {
            "type": "input",
            "selector": "#suche",
            "value": "A"
          },
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "input",
            "selector": "#suche",
            "value": "B"
          },
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": ""
      },
      {
        "input": {},
        "actions": [
          {
            "type": "input",
            "selector": "#suche",
            "value": "A"
          },
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "input",
            "selector": "#suche",
            "value": "B"
          },
          {
            "type": "advance",
            "ms": 200
          }
        ],
        "expected": "B"
      }
    ],
    "hints": [
      "Entfernt die Suche zur vorherigen Eingabe.",
      "Debounce ist praktisch für Suchfelder. Es unterscheidet sich von Throttle: Während fortlaufender Eingaben kann der Aufruf immer weiter verschoben werden."
    ],
    "solution": "function zeitDebounce(daten) {\n  let timer; const input = document.querySelector(\"#suche\"), stand = document.querySelector(\"#stand\");\n  stand.textContent = \"\";\n  input.addEventListener(\"input\", () => {\n    clearTimeout(timer);\n    timer = setTimeout(() => { stand.textContent = input.value.trim(); }, 200);\n  });\n  return () => stand.textContent;\n}",
    "explanation": "Debounce verschiebt Arbeit, solange neue Eingaben ankommen. Jeder neue input-Event ersetzt den ausstehenden Timeout. Debounce ist praktisch für Suchfelder. Es unterscheidet sich von Throttle: Während fortlaufender Eingaben kann der Aufruf immer weiter verschoben werden.",
    "preserveInput": true,
    "browser": {
      "html": "<input id=\"suche\" aria-label=\"Suche\"><p id=\"stand\"></p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitDebounce(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitDebounce(daten) {\n  let timer; const input = document.querySelector(\"#suche\"), stand = document.querySelector(\"#stand\");\n  stand.textContent = \"\";\n  input.addEventListener(\"input\", () => {\n    clearTimeout(timer);\n    timer = setTimeout(() => { stand.textContent = input.value.trim(); }, 200);\n  });\n  return () => stand.textContent;\n}\n\nconst lesen = zeitDebounce({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-throttle",
    "course": "js",
    "category": "Timer & Animation",
    "name": "Throttle",
    "title": "Mehrfachklicks für eine kurze Zeit begrenzen",
    "description": "Ein führender Throttle führt den ersten Aufruf sofort aus und ignoriert weitere Aufrufe bis zum Ende eines Zeitfensters.",
    "syntax": "if (gesperrt) return;\ngesperrt = true;\nsetTimeout(() => { gesperrt = false; }, 300);",
    "parts": [
      [
        "Sperre",
        "Ignoriert weitere Klicks während des Fensters."
      ],
      [
        "Führender Aufruf",
        "Der erste Klick zählt sofort."
      ]
    ],
    "note": "Diese Variante plant keinen nachträglichen Aufruf für ignorierte Klicks. Andere Throttle-Varianten können das anders handhaben.",
    "detail": "Zähle Klicks auf #klick. Nach einem gezählten Klick ignoriere für 300 ms weitere Klicks. Aktualisiere #stand und gib einen Leser für die Zahl zurück.",
    "functionName": "zeitThrottle",
    "parameter": "daten",
    "task": "Zähle Klicks auf #klick. Nach einem gezählten Klick ignoriere für 300 ms weitere Klicks. Aktualisiere #stand und gib einen Leser für die Zahl zurück. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#klick"
          },
          {
            "type": "click",
            "selector": "#klick"
          }
        ],
        "expected": 1
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#klick"
          },
          {
            "type": "advance",
            "ms": 299
          },
          {
            "type": "click",
            "selector": "#klick"
          }
        ],
        "expected": 1
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#klick"
          },
          {
            "type": "advance",
            "ms": 300
          },
          {
            "type": "click",
            "selector": "#klick"
          }
        ],
        "expected": 2
      },
      {
        "input": {},
        "actions": [],
        "expected": 0
      }
    ],
    "hints": [
      "Ignoriert weitere Klicks während des Fensters.",
      "Diese Variante plant keinen nachträglichen Aufruf für ignorierte Klicks. Andere Throttle-Varianten können das anders handhaben."
    ],
    "solution": "function zeitThrottle(daten) {\n  let anzahl = 0, gesperrt = false;\n  document.querySelector(\"#klick\").addEventListener(\"click\", () => {\n    if (gesperrt) return;\n    anzahl++; gesperrt = true; document.querySelector(\"#stand\").textContent = String(anzahl);\n    setTimeout(() => { gesperrt = false; }, 300);\n  });\n  return () => anzahl;\n}",
    "explanation": "Ein führender Throttle führt den ersten Aufruf sofort aus und ignoriert weitere Aufrufe bis zum Ende eines Zeitfensters. Diese Variante plant keinen nachträglichen Aufruf für ignorierte Klicks. Andere Throttle-Varianten können das anders handhaben.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"klick\">Aktion</button><p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitThrottle(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitThrottle(daten) {\n  let anzahl = 0, gesperrt = false;\n  document.querySelector(\"#klick\").addEventListener(\"click\", () => {\n    if (gesperrt) return;\n    anzahl++; gesperrt = true; document.querySelector(\"#stand\").textContent = String(anzahl);\n    setTimeout(() => { gesperrt = false; }, 300);\n  });\n  return () => anzahl;\n}\n\nconst lesen = zeitThrottle({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-frame",
    "course": "js",
    "category": "Timer & Animation",
    "name": "requestAnimationFrame",
    "title": "Einen einzelnen Animationsschritt planen",
    "description": "requestAnimationFrame plant einen Callback vor einer späteren Darstellung. Er erhält einen Zeitstempel; er wiederholt sich nicht automatisch.",
    "syntax": "requestAnimationFrame(zeit => { letzteZeit = zeit; });",
    "parts": [
      [
        "Zeitstempel",
        "Zeit in Millisekunden, vergleichbar mit performance.now."
      ],
      [
        "Einmaliger Aufruf",
        "Eine Schleife muss erneut einen Frame anfordern."
      ]
    ],
    "note": "In der Übungsuhr ist ein Frame nach 16 ms fällig. Im echten Browser hängt die Taktung von Anzeige und Browser ab; in Hintergrundtabs kann sie pausieren.",
    "detail": "Plane einen Frame. Der Leser liefert null davor und den Callback-Zeitstempel danach.",
    "functionName": "zeitFrame",
    "parameter": "daten",
    "task": "Plane einen Frame. Der Leser liefert null davor und den Callback-Zeitstempel danach. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [],
        "expected": null
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 15
          }
        ],
        "expected": null
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 16
          }
        ],
        "expected": 16
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": 16
      }
    ],
    "hints": [
      "Zeit in Millisekunden, vergleichbar mit performance.now.",
      "In der Übungsuhr ist ein Frame nach 16 ms fällig. Im echten Browser hängt die Taktung von Anzeige und Browser ab; in Hintergrundtabs kann sie pausieren."
    ],
    "solution": "function zeitFrame(daten) {\n  let letzteZeit = null;\n  requestAnimationFrame(zeit => { letzteZeit = zeit; document.querySelector(\"#stand\").textContent = String(zeit); });\n  return () => letzteZeit;\n}",
    "explanation": "requestAnimationFrame plant einen Callback vor einer späteren Darstellung. Er erhält einen Zeitstempel; er wiederholt sich nicht automatisch. In der Übungsuhr ist ein Frame nach 16 ms fällig. Im echten Browser hängt die Taktung von Anzeige und Browser ab; in Hintergrundtabs kann sie pausieren.",
    "preserveInput": true,
    "browser": {
      "html": "<p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitFrame(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitFrame(daten) {\n  let letzteZeit = null;\n  requestAnimationFrame(zeit => { letzteZeit = zeit; document.querySelector(\"#stand\").textContent = String(zeit); });\n  return () => letzteZeit;\n}\n\nconst lesen = zeitFrame({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-frame-cancel",
    "course": "js",
    "category": "Timer & Animation",
    "name": "cancelAnimationFrame",
    "title": "Einen ausstehenden Animationsschritt entfernen",
    "description": "cancelAnimationFrame verwendet die Kennung eines geplanten Frames. Der Callback läuft danach nicht mehr, sofern er noch aussteht.",
    "syntax": "const id = requestAnimationFrame(schritt);\ncancelAnimationFrame(id);",
    "parts": [
      [
        "Frame-Kennung",
        "Wird von requestAnimationFrame zurückgegeben."
      ],
      [
        "Abbruch",
        "Entfernt nur einen ausstehenden Aufruf."
      ]
    ],
    "note": "Ein Animationsloop muss seine jeweils neueste Kennung speichern. Der Abbruch einer alten Kennung stoppt nicht automatisch später geplante Frames.",
    "detail": "Plane einen Frame, der fertig=true setzt. #stop bricht den geplanten Frame ab. Der Leser liefert fertig.",
    "functionName": "zeitFrameCancel",
    "parameter": "daten",
    "task": "Plane einen Frame, der fertig=true setzt. #stop bricht den geplanten Frame ab. Der Leser liefert fertig. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": false
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 16
          }
        ],
        "expected": true
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 16
          },
          {
            "type": "click",
            "selector": "#stop"
          }
        ],
        "expected": true
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 15
          },
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": false
      }
    ],
    "hints": [
      "Wird von requestAnimationFrame zurückgegeben.",
      "Ein Animationsloop muss seine jeweils neueste Kennung speichern. Der Abbruch einer alten Kennung stoppt nicht automatisch später geplante Frames."
    ],
    "solution": "function zeitFrameCancel(daten) {\n  let fertig = false;\n  const stand = document.querySelector(\"#stand\");\n  stand.textContent = \"Geplant\";\n  const id = requestAnimationFrame(() => { fertig = true; stand.textContent = \"Fertig\"; });\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => { cancelAnimationFrame(id); if (!fertig) stand.textContent = \"Abgebrochen\"; });\n  return () => fertig;\n}",
    "explanation": "cancelAnimationFrame verwendet die Kennung eines geplanten Frames. Der Callback läuft danach nicht mehr, sofern er noch aussteht. Ein Animationsloop muss seine jeweils neueste Kennung speichern. Der Abbruch einer alten Kennung stoppt nicht automatisch später geplante Frames.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"stop\">Frame abbrechen</button><p id=\"stand\">Frame</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitFrameCancel(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitFrameCancel(daten) {\n  let fertig = false;\n  const stand = document.querySelector(\"#stand\");\n  stand.textContent = \"Geplant\";\n  const id = requestAnimationFrame(() => { fertig = true; stand.textContent = \"Fertig\"; });\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => { cancelAnimationFrame(id); if (!fertig) stand.textContent = \"Abgebrochen\"; });\n  return () => fertig;\n}\n\nconst lesen = zeitFrameCancel({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-delta",
    "course": "js",
    "category": "Timer & Animation",
    "name": "Delta-Zeit",
    "title": "Bewegung aus verstrichener Zeit berechnen",
    "description": "Bewegung mit fester Geschwindigkeit verwendet Strecke = Geschwindigkeit mal Zeit. Millisekunden werden dafür in Sekunden umgewandelt.",
    "syntax": "position += tempo * (jetzt - vorher) / 1000;",
    "parts": [
      [
        "performance.now",
        "Misst eine monotone Zeit, unabhängig von Änderungen der Systemuhr."
      ],
      [
        "/ 1000",
        "Wandelt Millisekunden in Sekunden um."
      ]
    ],
    "note": "Der Button simuliert hier einen Animationsschritt. Die Berechnung verwendet Zeitdifferenzen statt einer festen Strecke pro Klick. Die Aufgabe nutzt kleine ganze Ergebnisse.",
    "detail": "daten enthält tempo in Pixeln pro Sekunde. Initialisiere Position 0 und vorher=performance.now(). Bei #schritt addiere die seit vorher zurückgelegte Strecke und aktualisiere vorher. Der Leser liefert die Position.",
    "functionName": "zeitDelta",
    "parameter": "daten",
    "task": "daten enthält tempo in Pixeln pro Sekunde. Initialisiere Position 0 und vorher=performance.now(). Bei #schritt addiere die seit vorher zurückgelegte Strecke und aktualisiere vorher. Der Leser liefert die Position. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "tempo": 100
        },
        "actions": [
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "click",
            "selector": "#schritt"
          }
        ],
        "expected": 10
      },
      {
        "input": {
          "tempo": 100
        },
        "actions": [
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "click",
            "selector": "#schritt"
          },
          {
            "type": "advance",
            "ms": 200
          },
          {
            "type": "click",
            "selector": "#schritt"
          }
        ],
        "expected": 30
      },
      {
        "input": {
          "tempo": 100
        },
        "actions": [
          {
            "type": "click",
            "selector": "#schritt"
          }
        ],
        "expected": 0
      },
      {
        "input": {
          "tempo": 0
        },
        "actions": [
          {
            "type": "advance",
            "ms": 1000
          },
          {
            "type": "click",
            "selector": "#schritt"
          }
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Misst eine monotone Zeit, unabhängig von Änderungen der Systemuhr.",
      "Der Button simuliert hier einen Animationsschritt. Die Berechnung verwendet Zeitdifferenzen statt einer festen Strecke pro Klick. Die Aufgabe nutzt kleine ganze Ergebnisse."
    ],
    "solution": "function zeitDelta(daten) {\n  let position = 0, vorher = performance.now();\n  document.querySelector(\"#schritt\").addEventListener(\"click\", () => { const jetzt = performance.now(); position += daten.tempo * (jetzt - vorher) / 1000; vorher = jetzt; document.querySelector(\"#stand\").textContent = String(position); });\n  return () => position;\n}",
    "explanation": "Bewegung mit fester Geschwindigkeit verwendet Strecke = Geschwindigkeit mal Zeit. Millisekunden werden dafür in Sekunden umgewandelt. Der Button simuliert hier einen Animationsschritt. Die Berechnung verwendet Zeitdifferenzen statt einer festen Strecke pro Klick. Die Aufgabe nutzt kleine ganze Ergebnisse.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"schritt\">Animationsschritt</button><p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitDelta(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitDelta(daten) {\n  let position = 0, vorher = performance.now();\n  document.querySelector(\"#schritt\").addEventListener(\"click\", () => { const jetzt = performance.now(); position += daten.tempo * (jetzt - vorher) / 1000; vorher = jetzt; document.querySelector(\"#stand\").textContent = String(position); });\n  return () => position;\n}\n\nconst lesen = zeitDelta({\"tempo\": 100});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-stopwatch",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Stoppuhr",
    "title": "Eine Stoppuhr mit Pause und Fortsetzen bauen",
    "description": "Eine Stoppuhr merkt abgeschlossene Laufabschnitte und den Startzeitpunkt des aktuellen Abschnitts. Ein Intervall aktualisiert nur die Anzeige.",
    "syntax": "const dauer = gesammelt + (laeuft ? performance.now() - start : 0);",
    "parts": [
      [
        "Gesammelte Zeit",
        "Bleibt beim Pausieren erhalten."
      ],
      [
        "Zeitstempel",
        "Verhindert, dass unpünktliche Ticks die Messung verfälschen."
      ]
    ],
    "note": "Mehrmaliges Starten darf keine zusätzlichen Intervalle erzeugen. Reset setzt die Uhr zurück und hält sie an. Der Download verwendet echte Zeit, die Vorschau deine Übungsuhr.",
    "detail": "#start startet oder setzt fort, #pause hält an, #reset setzt anhaltend auf 0. Zeige ganze Millisekunden in #stand mindestens alle 100 ms während des Laufens. Der Leser liefert die aktuelle gemessene Millisekundenzahl.",
    "functionName": "zeitStopwatch",
    "parameter": "daten",
    "task": "#start startet oder setzt fort, #pause hält an, #reset setzt anhaltend auf 0. Zeige ganze Millisekunden in #stand mindestens alle 100 ms während des Laufens. Der Leser liefert die aktuelle gemessene Millisekundenzahl. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 1000
          }
        ],
        "expected": 1000
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 300
          },
          {
            "type": "click",
            "selector": "#pause"
          },
          {
            "type": "advance",
            "ms": 500
          }
        ],
        "expected": 300
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 300
          },
          {
            "type": "click",
            "selector": "#pause"
          },
          {
            "type": "advance",
            "ms": 500
          },
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 200
          }
        ],
        "expected": 500
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": 200
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 500
          },
          {
            "type": "click",
            "selector": "#reset"
          },
          {
            "type": "advance",
            "ms": 500
          }
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Bleibt beim Pausieren erhalten.",
      "Mehrmaliges Starten darf keine zusätzlichen Intervalle erzeugen. Reset setzt die Uhr zurück und hält sie an. Der Download verwendet echte Zeit, die Vorschau deine Übungsuhr."
    ],
    "solution": "function zeitStopwatch(daten) {\n  let gesammelt = 0, start = 0, laeuft = false, timer;\n  const dauer = () => Math.floor(gesammelt + (laeuft ? performance.now() - start : 0));\n  const render = () => { document.querySelector(\"#stand\").textContent = String(dauer()); };\n  document.querySelector(\"#start\").addEventListener(\"click\", () => { if (laeuft) return; start = performance.now(); laeuft = true; timer = setInterval(render, 100); render(); });\n  document.querySelector(\"#pause\").addEventListener(\"click\", () => { if (!laeuft) return; gesammelt = dauer(); laeuft = false; clearInterval(timer); render(); });\n  document.querySelector(\"#reset\").addEventListener(\"click\", () => { clearInterval(timer); gesammelt = 0; laeuft = false; render(); });\n  render(); return dauer;\n}",
    "explanation": "Eine Stoppuhr merkt abgeschlossene Laufabschnitte und den Startzeitpunkt des aktuellen Abschnitts. Ein Intervall aktualisiert nur die Anzeige. Mehrmaliges Starten darf keine zusätzlichen Intervalle erzeugen. Reset setzt die Uhr zurück und hält sie an. Der Download verwendet echte Zeit, die Vorschau deine Übungsuhr.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Stoppuhr</h2><p id=\"stand\" aria-live=\"polite\">0</p><button id=\"start\">Start</button><button id=\"pause\">Pause</button><button id=\"reset\">Reset</button>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitStopwatch(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitStopwatch(daten) {\n  let gesammelt = 0, start = 0, laeuft = false, timer;\n  const dauer = () => Math.floor(gesammelt + (laeuft ? performance.now() - start : 0));\n  const render = () => { document.querySelector(\"#stand\").textContent = String(dauer()); };\n  document.querySelector(\"#start\").addEventListener(\"click\", () => { if (laeuft) return; start = performance.now(); laeuft = true; timer = setInterval(render, 100); render(); });\n  document.querySelector(\"#pause\").addEventListener(\"click\", () => { if (!laeuft) return; gesammelt = dauer(); laeuft = false; clearInterval(timer); render(); });\n  document.querySelector(\"#reset\").addEventListener(\"click\", () => { clearInterval(timer); gesammelt = 0; laeuft = false; render(); });\n  render(); return dauer;\n}\n\nconst lesen = zeitStopwatch({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-reaction",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Reaktionstest",
    "title": "Einen Reaktionstest mit Fehlstart-Erkennung bauen",
    "description": "Ein Reaktionstest wechselt von Warten zu Bereit. Erst danach wird die Zeit bis zum Klick gemessen. Zu frühe Klicks brechen die Runde ab.",
    "syntax": "bereitSeit = performance.now();\nreaktion = performance.now() - bereitSeit;",
    "parts": [
      [
        "Zustand",
        "Unterscheidet idle, warten, bereit und das Ergebnis."
      ],
      [
        "Timeout",
        "Wird bei Neustart oder Fehlstart entfernt."
      ]
    ],
    "note": "Die Bereitschaft folgt hier nach festen 500 ms. Für ein eigenes Spiel kannst du später eine zufällige Verzögerung einsetzen. Die Messung schließt Browser-, Geräte- und Eingabeverzögerungen ein.",
    "detail": "#start beginnt eine neue Runde mit Text Warten. Nach 500 ms zeigt #stand Bereit. #treffer während Warten zeigt Fehlstart und bricht den Timeout ab; während Bereit zeigt es die ganze Reaktionszeit als String. Weitere Treffer ändern ein fertiges Ergebnis nicht. Der Leser liefert den Text.",
    "functionName": "zeitReaction",
    "parameter": "daten",
    "task": "#start beginnt eine neue Runde mit Text Warten. Nach 500 ms zeigt #stand Bereit. #treffer während Warten zeigt Fehlstart und bricht den Timeout ab; während Bereit zeigt es die ganze Reaktionszeit als String. Weitere Treffer ändern ein fertiges Ergebnis nicht. Der Leser liefert den Text. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 600
          },
          {
            "type": "click",
            "selector": "#treffer"
          }
        ],
        "expected": "100"
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 100
          },
          {
            "type": "click",
            "selector": "#treffer"
          },
          {
            "type": "advance",
            "ms": 1000
          }
        ],
        "expected": "Fehlstart"
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 300
          },
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 300
          }
        ],
        "expected": "Warten"
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#treffer"
          }
        ],
        "expected": "Start drücken"
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#start"
          },
          {
            "type": "advance",
            "ms": 500
          },
          {
            "type": "click",
            "selector": "#treffer"
          },
          {
            "type": "advance",
            "ms": 200
          },
          {
            "type": "click",
            "selector": "#treffer"
          }
        ],
        "expected": "0"
      }
    ],
    "hints": [
      "Unterscheidet idle, warten, bereit und das Ergebnis.",
      "Die Bereitschaft folgt hier nach festen 500 ms. Für ein eigenes Spiel kannst du später eine zufällige Verzögerung einsetzen. Die Messung schließt Browser-, Geräte- und Eingabeverzögerungen ein."
    ],
    "solution": "function zeitReaction(daten) {\n  let zustand = \"idle\", bereitSeit = 0, timer; const stand = document.querySelector(\"#stand\");\n  stand.textContent = \"Start drücken\";\n  document.querySelector(\"#start\").addEventListener(\"click\", () => { clearTimeout(timer); zustand = \"warten\"; stand.textContent = \"Warten\"; timer = setTimeout(() => { zustand = \"bereit\"; bereitSeit = performance.now(); stand.textContent = \"Bereit\"; }, 500); });\n  document.querySelector(\"#treffer\").addEventListener(\"click\", () => { if (zustand === \"warten\") { clearTimeout(timer); zustand = \"fertig\"; stand.textContent = \"Fehlstart\"; } else if (zustand === \"bereit\") { zustand = \"fertig\"; stand.textContent = String(Math.floor(performance.now() - bereitSeit)); } });\n  return () => stand.textContent;\n}",
    "explanation": "Ein Reaktionstest wechselt von Warten zu Bereit. Erst danach wird die Zeit bis zum Klick gemessen. Zu frühe Klicks brechen die Runde ab. Die Bereitschaft folgt hier nach festen 500 ms. Für ein eigenes Spiel kannst du später eine zufällige Verzögerung einsetzen. Die Messung schließt Browser-, Geräte- und Eingabeverzögerungen ein.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Reaktionstest</h2><p id=\"stand\" aria-live=\"polite\"></p><button id=\"start\">Neue Runde</button><button id=\"treffer\">Jetzt!</button>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitReaction(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitReaction(daten) {\n  let zustand = \"idle\", bereitSeit = 0, timer; const stand = document.querySelector(\"#stand\");\n  stand.textContent = \"Start drücken\";\n  document.querySelector(\"#start\").addEventListener(\"click\", () => { clearTimeout(timer); zustand = \"warten\"; stand.textContent = \"Warten\"; timer = setTimeout(() => { zustand = \"bereit\"; bereitSeit = performance.now(); stand.textContent = \"Bereit\"; }, 500); });\n  document.querySelector(\"#treffer\").addEventListener(\"click\", () => { if (zustand === \"warten\") { clearTimeout(timer); zustand = \"fertig\"; stand.textContent = \"Fehlstart\"; } else if (zustand === \"bereit\") { zustand = \"fertig\"; stand.textContent = String(Math.floor(performance.now() - bereitSeit)); } });\n  return () => stand.textContent;\n}\n\nconst lesen = zeitReaction({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-move",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Bewegungsspiel",
    "title": "Eine Spielfigur bewegen und am Rand stoppen",
    "description": "Richtung, Zeit und Grenzen ergeben eine einfache Bewegung. Buttons oder Pfeiltasten steuern die Figur; ein Timer verändert ihre Position.",
    "syntax": "x = Math.min(200, Math.max(0, x + richtung * 10));",
    "parts": [
      [
        "Richtung",
        "-1 bedeutet links, 0 Pause, 1 rechts."
      ],
      [
        "Grenzen",
        "Die linke Kante bleibt zwischen 0 und 200."
      ]
    ],
    "note": "Das Spiel nutzt einen festen Schritt von 10 Pixeln pro 100 ms. Für gleichmäßige Bewegung bei wechselnder Bildrate verwendest du später requestAnimationFrame und Delta-Zeit.",
    "detail": "Starte x=0 und richtung=0. #links/#rechts setzen -1/1, #stop setzt 0. ArrowLeft/ArrowRight auf dem Dokument setzen ebenfalls die Richtung. Alle 100 ms bewege x um richtung*10 und begrenze auf [0,200]. Setze #figur.style.transform auf translateX(xpx) und #stand auf String(x). Der Leser liefert x.",
    "functionName": "zeitMove",
    "parameter": "daten",
    "task": "Starte x=0 und richtung=0. #links/#rechts setzen -1/1, #stop setzt 0. ArrowLeft/ArrowRight auf dem Dokument setzen ebenfalls die Richtung. Alle 100 ms bewege x um richtung*10 und begrenze auf [0,200]. Setze #figur.style.transform auf translateX(xpx) und #stand auf String(x). Der Leser liefert x. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#rechts"
          },
          {
            "type": "advance",
            "ms": 300
          }
        ],
        "expected": 30
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#links"
          },
          {
            "type": "advance",
            "ms": 500
          }
        ],
        "expected": 0
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#rechts"
          },
          {
            "type": "advance",
            "ms": 3000
          }
        ],
        "expected": 200
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#rechts"
          },
          {
            "type": "advance",
            "ms": 200
          },
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 500
          }
        ],
        "expected": 20
      },
      {
        "input": {},
        "actions": [
          {
            "type": "keydown",
            "selector": "#rechts",
            "key": "ArrowRight"
          },
          {
            "type": "advance",
            "ms": 100
          }
        ],
        "expected": 10
      }
    ],
    "hints": [
      "-1 bedeutet links, 0 Pause, 1 rechts.",
      "Das Spiel nutzt einen festen Schritt von 10 Pixeln pro 100 ms. Für gleichmäßige Bewegung bei wechselnder Bildrate verwendest du später requestAnimationFrame und Delta-Zeit."
    ],
    "solution": "function zeitMove(daten) {\n  let x = 0, richtung = 0;\n  const render = () => { document.querySelector(\"#figur\").style.transform = `translateX(${x}px)`; document.querySelector(\"#stand\").textContent = String(x); };\n  document.querySelector(\"#links\").addEventListener(\"click\", () => { richtung = -1; });\n  document.querySelector(\"#rechts\").addEventListener(\"click\", () => { richtung = 1; });\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => { richtung = 0; });\n  document.addEventListener(\"keydown\", event => { if (event.key === \"ArrowLeft\") richtung = -1; if (event.key === \"ArrowRight\") richtung = 1; });\n  setInterval(() => { x = Math.min(200, Math.max(0, x + richtung * 10)); render(); }, 100);\n  render(); return () => x;\n}",
    "explanation": "Richtung, Zeit und Grenzen ergeben eine einfache Bewegung. Buttons oder Pfeiltasten steuern die Figur; ein Timer verändert ihre Position. Das Spiel nutzt einen festen Schritt von 10 Pixeln pro 100 ms. Für gleichmäßige Bewegung bei wechselnder Bildrate verwendest du später requestAnimationFrame und Delta-Zeit.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Bewegungsspiel</h2><div style=\"width:230px;max-width:100%;height:45px;background:#27354a;overflow:hidden\"><div id=\"figur\" style=\"width:25px;height:25px;background:#a18aff;margin-top:10px\"></div></div><p id=\"stand\">0</p><button id=\"links\">Links</button><button id=\"stop\">Anhalten</button><button id=\"rechts\">Rechts</button>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitMove(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitMove(daten) {\n  let x = 0, richtung = 0;\n  const render = () => { document.querySelector(\"#figur\").style.transform = `translateX(${x}px)`; document.querySelector(\"#stand\").textContent = String(x); };\n  document.querySelector(\"#links\").addEventListener(\"click\", () => { richtung = -1; });\n  document.querySelector(\"#rechts\").addEventListener(\"click\", () => { richtung = 1; });\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => { richtung = 0; });\n  document.addEventListener(\"keydown\", event => { if (event.key === \"ArrowLeft\") richtung = -1; if (event.key === \"ArrowRight\") richtung = 1; });\n  setInterval(() => { x = Math.min(200, Math.max(0, x + richtung * 10)); render(); }, 100);\n  render(); return () => x;\n}\n\nconst lesen = zeitMove({});\nconsole.log(lesen());"
  },
  {
    "id": "js-time-frame-loop",
    "course": "js",
    "category": "Timer & Animation",
    "name": "Animierter Loop",
    "title": "Eine Animationsschleife korrekt wieder planen",
    "description": "Ein requestAnimationFrame-Callback plant für eine Schleife jeweils den nächsten Frame. Zum Stoppen brauchst du die neueste Kennung.",
    "syntax": "function schritt() { id = requestAnimationFrame(schritt); }",
    "parts": [
      [
        "Nächster Frame",
        "Wird innerhalb des aktuellen Callbacks geplant."
      ],
      [
        "Aktuelle Kennung",
        "Ermöglicht den Abbruch des nächsten Aufrufs."
      ]
    ],
    "note": "Die Übungsuhr verwendet 16-ms-Schritte. Im echten Browser ist die Framezahl keine verlässliche Zeitmessung; für Bewegung eignet sich die Delta-Zeit.",
    "detail": "Zähle ab dem ersten Frame die Aufrufe und zeige die Zahl in #stand. Plane nach jedem Callback den nächsten Frame. #stop beendet die Schleife. Der Leser liefert die Anzahl.",
    "functionName": "zeitFrameLoop",
    "parameter": "daten",
    "task": "Zähle ab dem ersten Frame die Aufrufe und zeige die Zahl in #stand. Plane nach jedem Callback den nächsten Frame. #stop beendet die Schleife. Der Leser liefert die Anzahl. Gib eine Lesefunktion zurück, die nach den simulierten Aktionen den aktuellen Zustand liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 16
          }
        ],
        "expected": 1
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 32
          }
        ],
        "expected": 2
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 160
          }
        ],
        "expected": 10
      },
      {
        "input": {},
        "actions": [
          {
            "type": "advance",
            "ms": 32
          },
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 160
          }
        ],
        "expected": 2
      },
      {
        "input": {},
        "actions": [
          {
            "type": "click",
            "selector": "#stop"
          },
          {
            "type": "advance",
            "ms": 1000
          }
        ],
        "expected": 0
      }
    ],
    "hints": [
      "Wird innerhalb des aktuellen Callbacks geplant.",
      "Die Übungsuhr verwendet 16-ms-Schritte. Im echten Browser ist die Framezahl keine verlässliche Zeitmessung; für Bewegung eignet sich die Delta-Zeit."
    ],
    "solution": "function zeitFrameLoop(daten) {\n  let frames = 0, id;\n  const schritt = () => { frames++; document.querySelector(\"#stand\").textContent = String(frames); id = requestAnimationFrame(schritt); };\n  id = requestAnimationFrame(schritt);\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => cancelAnimationFrame(id));\n  return () => frames;\n}",
    "explanation": "Ein requestAnimationFrame-Callback plant für eine Schleife jeweils den nächsten Frame. Zum Stoppen brauchst du die neueste Kennung. Die Übungsuhr verwendet 16-ms-Schritte. Im echten Browser ist die Framezahl keine verlässliche Zeitmessung; für Bewegung eignet sich die Delta-Zeit.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"stop\">Animation stoppen</button><p id=\"stand\">0</p>",
      "fixtures": {},
      "storage": {},
      "clock": true
    },
    "starter": "function zeitFrameLoop(daten) {\n  // Initialisiere Timer und Ereignisse; gib einen Leser zurück.\n}",
    "example": "function zeitFrameLoop(daten) {\n  let frames = 0, id;\n  const schritt = () => { frames++; document.querySelector(\"#stand\").textContent = String(frames); id = requestAnimationFrame(schritt); };\n  id = requestAnimationFrame(schritt);\n  document.querySelector(\"#stop\").addEventListener(\"click\", () => cancelAnimationFrame(id));\n  return () => frames;\n}\n\nconst lesen = zeitFrameLoop({});\nconsole.log(lesen());"
  }
];
