export const browserLessons = [
  {
    "id": "js-dom-text",
    "course": "js",
    "category": "DOM",
    "name": "querySelector / textContent",
    "title": "Ein Element finden und seinen Text ändern",
    "description": "querySelector liefert den ersten passenden Knoten oder null. textContent setzt Text, ohne ihn als HTML zu interpretieren.",
    "syntax": "const element = document.querySelector(\"#ausgabe\");\nelement.textContent = daten.text;",
    "parts": [
      [
        "#ausgabe",
        "Ein ID-Selektor findet das Element mit dieser ID."
      ],
      [
        "null",
        "Ein fehlendes Element muss geprüft werden."
      ],
      [
        "textContent",
        "Zeichen wie < und > bleiben Text."
      ]
    ],
    "note": "Verwende textContent für fremde Texte. innerHTML würde sie als Markup interpretieren.",
    "detail": "Setze #ausgabe auf daten.text und gib seinen Text zurück. Fehlt #ausgabe, gib null zurück.",
    "functionName": "browserText",
    "parameter": "daten",
    "task": "Setze #ausgabe auf daten.text und gib seinen Text zurück. Fehlt #ausgabe, gib null zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "text": "Hallo"
        },
        "expected": "Hallo",
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "text": "<b>Text</b>"
        },
        "expected": "<b>Text</b>",
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "text": ""
        },
        "expected": "",
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "text": "X"
        },
        "expected": null,
        "actions": [],
        "browser": {
          "html": "<p>Ohne ID</p>"
        }
      }
    ],
    "hints": [
      "Ein ID-Selektor findet das Element mit dieser ID.",
      "Arbeite mit den vorhandenen IDs im HTML. Verwende textContent für fremde Texte. innerHTML würde sie als Markup interpretieren."
    ],
    "solution": "async function browserText(daten) {\n  const element = document.querySelector(\"#ausgabe\");\n  if (!element) return null;\n  element.textContent = daten.text;\n  return element.textContent;\n}",
    "explanation": "querySelector liefert den ersten passenden Knoten oder null. textContent setzt Text, ohne ihn als HTML zu interpretieren. Verwende textContent für fremde Texte. innerHTML würde sie als Markup interpretieren.",
    "preserveInput": true,
    "browser": {
      "html": "<p id=\"ausgabe\">Start</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserText(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserText(daten) {\n  const element = document.querySelector(\"#ausgabe\");\n  if (!element) return null;\n  element.textContent = daten.text;\n  return element.textContent;\n}\n\nconst lesen = await browserText({\"text\": \"Hallo\"});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-dom-all",
    "course": "js",
    "category": "DOM",
    "name": "querySelectorAll",
    "title": "Mehrere Elemente als Liste lesen",
    "description": "querySelectorAll liefert eine statische NodeList. Array.from wandelt sie in ein Array um, auf dem map verfügbar ist.",
    "syntax": "Array.from(document.querySelectorAll(\".eintrag\"), node => node.textContent);",
    "parts": [
      [
        ".eintrag",
        "Ein Klassenselektor kann mehrere Elemente treffen."
      ],
      [
        "NodeList",
        "Ist keine gewöhnliche Arrayliste."
      ],
      [
        "Array.from",
        "Erzeugt eine neue Liste mit den gelesenen Texten."
      ]
    ],
    "note": "querySelectorAll liefert hier eine Momentaufnahme, keine automatisch mitwachsende Liste.",
    "detail": "Gib die Texte aller .eintrag-Elemente in DOM-Reihenfolge zurück.",
    "functionName": "browserAll",
    "parameter": "daten",
    "task": "Gib die Texte aller .eintrag-Elemente in DOM-Reihenfolge zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": [
          "Ada",
          "Ben"
        ],
        "actions": [],
        "browser": {}
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "html": "<p>Leer</p>"
        }
      },
      {
        "input": {},
        "expected": [
          "0",
          ""
        ],
        "actions": [],
        "browser": {
          "html": "<p class=\"eintrag\">0</p><p class=\"eintrag\"></p>"
        }
      }
    ],
    "hints": [
      "Ein Klassenselektor kann mehrere Elemente treffen.",
      "Arbeite mit den vorhandenen IDs im HTML. querySelectorAll liefert hier eine Momentaufnahme, keine automatisch mitwachsende Liste."
    ],
    "solution": "async function browserAll(daten) {\n  return Array.from(document.querySelectorAll(\".eintrag\"), node => node.textContent);\n}",
    "explanation": "querySelectorAll liefert eine statische NodeList. Array.from wandelt sie in ein Array um, auf dem map verfügbar ist. querySelectorAll liefert hier eine Momentaufnahme, keine automatisch mitwachsende Liste.",
    "preserveInput": true,
    "browser": {
      "html": "<ul><li class=\"eintrag\">Ada</li><li class=\"eintrag\">Ben</li></ul>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserAll(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserAll(daten) {\n  return Array.from(document.querySelectorAll(\".eintrag\"), node => node.textContent);\n}\n\nconst lesen = await browserAll({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-dom-create",
    "course": "js",
    "category": "DOM",
    "name": "createElement / append",
    "title": "Neue Listenelemente aus Daten erstellen",
    "description": "createElement erzeugt einen Knoten. Erst append fügt ihn in die sichtbare Struktur ein.",
    "syntax": "const li = document.createElement(\"li\");\nli.textContent = text;\nliste.append(li);",
    "parts": [
      [
        "createElement",
        "Erzeugt ein Element ohne es automatisch anzuhängen."
      ],
      [
        "append",
        "Hängt den Knoten am Ende an."
      ],
      [
        "textContent",
        "Setzt den Inhalt als Text."
      ]
    ],
    "note": "Leere die Liste vor dem Neubauen, damit wiederholtes Rendern keine Duplikate erzeugt.",
    "detail": "Baue #liste aus den Strings in daten neu auf und gib alle li-Texte zurück.",
    "functionName": "browserCreate",
    "parameter": "daten",
    "task": "Baue #liste aus den Strings in daten neu auf und gib alle li-Texte zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": [
          "A",
          "B"
        ],
        "expected": [
          "A",
          "B"
        ],
        "actions": [],
        "browser": {}
      },
      {
        "input": [],
        "expected": [],
        "actions": [],
        "browser": {}
      },
      {
        "input": [
          "<img>",
          "0"
        ],
        "expected": [
          "<img>",
          "0"
        ],
        "actions": [],
        "browser": {}
      }
    ],
    "hints": [
      "Erzeugt ein Element ohne es automatisch anzuhängen.",
      "Arbeite mit den vorhandenen IDs im HTML. Leere die Liste vor dem Neubauen, damit wiederholtes Rendern keine Duplikate erzeugt."
    ],
    "solution": "async function browserCreate(daten) {\n  const liste = document.querySelector(\"#liste\");\n  liste.replaceChildren();\n  for (const text of daten) {\n    const li = document.createElement(\"li\"); li.textContent = text; liste.append(li);\n  }\n  return Array.from(liste.children, node => node.textContent);\n}",
    "explanation": "createElement erzeugt einen Knoten. Erst append fügt ihn in die sichtbare Struktur ein. Leere die Liste vor dem Neubauen, damit wiederholtes Rendern keine Duplikate erzeugt.",
    "preserveInput": true,
    "browser": {
      "html": "<ul id=\"liste\"><li>Alt</li></ul>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserCreate(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserCreate(daten) {\n  const liste = document.querySelector(\"#liste\");\n  liste.replaceChildren();\n  for (const text of daten) {\n    const li = document.createElement(\"li\"); li.textContent = text; liste.append(li);\n  }\n  return Array.from(liste.children, node => node.textContent);\n}\n\nconst lesen = await browserCreate([\"A\", \"B\"]);\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-dom-class",
    "course": "js",
    "category": "DOM",
    "name": "classList.toggle",
    "title": "Eine CSS-Klasse gezielt ein- oder ausschalten",
    "description": "classList arbeitet mit einzelnen Klassennamen. toggle mit einem zweiten Boolean-Argument setzt den gewünschten Zustand ausdrücklich.",
    "syntax": "element.classList.toggle(\"active\", daten.aktiv);",
    "parts": [
      [
        "classList",
        "Verändert einzelne Klassen statt den kompletten class-String."
      ],
      [
        "toggle(name, zustand)",
        "Setzt oder entfernt die Klasse entsprechend dem Boolean."
      ],
      [
        "contains",
        "Prüft, ob die Klasse vorhanden ist."
      ]
    ],
    "note": "Ohne zweiten Parameter kehrt toggle den aktuellen Zustand um. Das ist bei erneutem Rendern nicht dasselbe wie einen Zustand zu setzen.",
    "detail": "Setze die Klasse active von #karte auf daten.aktiv. Gib {aktiv, basis} mit den Ergebnissen von contains(\"active\") und contains(\"basis\") zurück.",
    "functionName": "browserClass",
    "parameter": "daten",
    "task": "Setze die Klasse active von #karte auf daten.aktiv. Gib {aktiv, basis} mit den Ergebnissen von contains(\"active\") und contains(\"basis\") zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "aktiv": true
        },
        "expected": {
          "aktiv": true,
          "basis": true
        },
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "aktiv": false
        },
        "expected": {
          "aktiv": false,
          "basis": true
        },
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "aktiv": true
        },
        "expected": {
          "aktiv": true,
          "basis": true
        },
        "actions": [],
        "browser": {
          "html": "<p id=\"karte\" class=\"basis\">Karte</p>"
        }
      }
    ],
    "hints": [
      "Verändert einzelne Klassen statt den kompletten class-String.",
      "Arbeite mit den vorhandenen IDs im HTML. Ohne zweiten Parameter kehrt toggle den aktuellen Zustand um. Das ist bei erneutem Rendern nicht dasselbe wie einen Zustand zu setzen."
    ],
    "solution": "async function browserClass(daten) {\n  const karte = document.querySelector(\"#karte\");\n  karte.classList.toggle(\"active\", daten.aktiv);\n  return { aktiv: karte.classList.contains(\"active\"), basis: karte.classList.contains(\"basis\") };\n}",
    "explanation": "classList arbeitet mit einzelnen Klassennamen. toggle mit einem zweiten Boolean-Argument setzt den gewünschten Zustand ausdrücklich. Ohne zweiten Parameter kehrt toggle den aktuellen Zustand um. Das ist bei erneutem Rendern nicht dasselbe wie einen Zustand zu setzen.",
    "preserveInput": true,
    "browser": {
      "html": "<p id=\"karte\" class=\"basis active\">Karte</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserClass(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserClass(daten) {\n  const karte = document.querySelector(\"#karte\");\n  karte.classList.toggle(\"active\", daten.aktiv);\n  return { aktiv: karte.classList.contains(\"active\"), basis: karte.classList.contains(\"basis\") };\n}\n\nconst lesen = await browserClass({\"aktiv\": true});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-dom-attribute",
    "course": "js",
    "category": "DOM",
    "name": "dataset / setAttribute",
    "title": "Datenattribute und zugängliche Zustände setzen",
    "description": "dataset liest data-Attribute als Strings. setAttribute setzt einen ausdrücklich benannten HTML-Attributwert.",
    "syntax": "button.dataset.id = String(daten.id);\nbutton.setAttribute(\"aria-pressed\", String(daten.aktiv));",
    "parts": [
      [
        "dataset.id",
        "Gehört zum HTML-Attribut data-id."
      ],
      [
        "Stringwerte",
        "Auch eine Zahlen-ID wird im Attribut als Text gespeichert."
      ],
      [
        "aria-pressed",
        "Beschreibt einen Toggle-Zustand für assistive Technologien."
      ]
    ],
    "note": "Attribute und JavaScript-Eigenschaften sind nicht für jedes Element identisch. Lies die hier gesetzten Attribute ausdrücklich zurück.",
    "detail": "Setze data-id und aria-pressed auf #knopf aus daten.id und daten.aktiv. Gib {id, gedrueckt} als Strings zurück.",
    "functionName": "browserAttribute",
    "parameter": "daten",
    "task": "Setze data-id und aria-pressed auf #knopf aus daten.id und daten.aktiv. Gib {id, gedrueckt} als Strings zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "id": 7,
          "aktiv": true
        },
        "expected": {
          "id": "7",
          "gedrueckt": "true"
        },
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "id": 0,
          "aktiv": false
        },
        "expected": {
          "id": "0",
          "gedrueckt": "false"
        },
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "id": "abc",
          "aktiv": true
        },
        "expected": {
          "id": "abc",
          "gedrueckt": "true"
        },
        "actions": [],
        "browser": {}
      }
    ],
    "hints": [
      "Gehört zum HTML-Attribut data-id.",
      "Arbeite mit den vorhandenen IDs im HTML. Attribute und JavaScript-Eigenschaften sind nicht für jedes Element identisch. Lies die hier gesetzten Attribute ausdrücklich zurück."
    ],
    "solution": "async function browserAttribute(daten) {\n  const knopf = document.querySelector(\"#knopf\");\n  knopf.dataset.id = String(daten.id);\n  knopf.setAttribute(\"aria-pressed\", String(daten.aktiv));\n  return { id: knopf.dataset.id, gedrueckt: knopf.getAttribute(\"aria-pressed\") };\n}",
    "explanation": "dataset liest data-Attribute als Strings. setAttribute setzt einen ausdrücklich benannten HTML-Attributwert. Attribute und JavaScript-Eigenschaften sind nicht für jedes Element identisch. Lies die hier gesetzten Attribute ausdrücklich zurück.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"knopf\">Auswählen</button>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserAttribute(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserAttribute(daten) {\n  const knopf = document.querySelector(\"#knopf\");\n  knopf.dataset.id = String(daten.id);\n  knopf.setAttribute(\"aria-pressed\", String(daten.aktiv));\n  return { id: knopf.dataset.id, gedrueckt: knopf.getAttribute(\"aria-pressed\") };\n}\n\nconst lesen = await browserAttribute({\"id\": 7, \"aktiv\": true});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-dom-remove",
    "course": "js",
    "category": "DOM",
    "name": "remove / closest",
    "title": "Markierte Elemente aus einer Liste entfernen",
    "description": "remove löst einen Knoten aus seinem Elternknoten. closest sucht vom aktuellen Element aus den nächsten passenden Vorfahren einschließlich des Elements selbst.",
    "syntax": "button.closest(\"li\").remove();",
    "parts": [
      [
        "remove",
        "Entfernt einen Knoten aus der Struktur."
      ],
      [
        "closest",
        "Findet einen passenden Knoten entlang der Elternkette."
      ],
      [
        "Statische Auswahl",
        "Eine vorher erzeugte NodeList kann sicher durchlaufen werden, während Knoten entfernt werden."
      ]
    ],
    "note": "Prüfe closest auf null, wenn der gesuchte Vorfahr nicht garantiert vorhanden ist.",
    "detail": "Entferne alle li mit der Klasse done aus #liste und gib die Texte der übrigen li zurück.",
    "functionName": "browserRemove",
    "parameter": "daten",
    "task": "Entferne alle li mit der Klasse done aus #liste und gib die Texte der übrigen li zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": [
          "A",
          "C"
        ],
        "actions": [],
        "browser": {}
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "html": "<ul id=\"liste\"><li class=\"done\">A</li></ul>"
        }
      },
      {
        "input": {},
        "expected": [
          "A"
        ],
        "actions": [],
        "browser": {
          "html": "<ul id=\"liste\"><li>A</li></ul>"
        }
      }
    ],
    "hints": [
      "Entfernt einen Knoten aus der Struktur.",
      "Arbeite mit den vorhandenen IDs im HTML. Prüfe closest auf null, wenn der gesuchte Vorfahr nicht garantiert vorhanden ist."
    ],
    "solution": "async function browserRemove(daten) {\n  for (const node of document.querySelectorAll(\"#liste li.done\")) node.remove();\n  return Array.from(document.querySelectorAll(\"#liste li\"), node => node.textContent);\n}",
    "explanation": "remove löst einen Knoten aus seinem Elternknoten. closest sucht vom aktuellen Element aus den nächsten passenden Vorfahren einschließlich des Elements selbst. Prüfe closest auf null, wenn der gesuchte Vorfahr nicht garantiert vorhanden ist.",
    "preserveInput": true,
    "browser": {
      "html": "<ul id=\"liste\"><li>A</li><li class=\"done\">B</li><li>C</li></ul>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserRemove(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserRemove(daten) {\n  for (const node of document.querySelectorAll(\"#liste li.done\")) node.remove();\n  return Array.from(document.querySelectorAll(\"#liste li\"), node => node.textContent);\n}\n\nconst lesen = await browserRemove({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-event-click",
    "course": "js",
    "category": "Events & Formulare",
    "name": "addEventListener",
    "title": "Einen Zähler über Klicks steuern",
    "description": "addEventListener verbindet einen Ereignistyp mit einem Callback. Der Callback wird erst bei einem passenden Ereignis aufgerufen.",
    "syntax": "knopf.addEventListener(\"click\", () => { stand += 1; });",
    "parts": [
      [
        "click",
        "Der Ereignistyp für eine Aktivierung."
      ],
      [
        "Callback",
        "Wird als Funktion übergeben, nicht sofort aufgerufen."
      ],
      [
        "Closure",
        "Der Callback behält Zugriff auf stand."
      ]
    ],
    "note": "Gib eine Lesefunktion zurück, die nach den Klicks den aktuellen Anzeigetext liefert. Die Vorschau spielt die Aktionen mit demselben Code nach.",
    "detail": "Starte bei daten.start, zeige den Stand in #stand und erhöhe ihn pro Klick auf #plus. Gib () => Text von #stand zurück.",
    "functionName": "browserClick",
    "parameter": "daten",
    "task": "Starte bei daten.start, zeige den Stand in #stand und erhöhe ihn pro Klick auf #plus. Gib () => Text von #stand zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "start": 0
        },
        "expected": "2",
        "actions": [
          {
            "selector": "#plus",
            "type": "click"
          },
          {
            "selector": "#plus",
            "type": "click"
          }
        ],
        "browser": {}
      },
      {
        "input": {
          "start": 5
        },
        "expected": "5",
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "start": -1
        },
        "expected": "0",
        "actions": [
          {
            "selector": "#plus",
            "type": "click"
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Der Ereignistyp für eine Aktivierung.",
      "Arbeite mit den vorhandenen IDs im HTML. Gib eine Lesefunktion zurück, die nach den Klicks den aktuellen Anzeigetext liefert. Die Vorschau spielt die Aktionen mit demselben Code nach."
    ],
    "solution": "async function browserClick(daten) {\n  let stand = daten.start;\n  const ausgabe = document.querySelector(\"#stand\");\n  const render = () => { ausgabe.textContent = String(stand); };\n  document.querySelector(\"#plus\").addEventListener(\"click\", () => { stand += 1; render(); });\n  render();\n  return () => ausgabe.textContent;\n}",
    "explanation": "addEventListener verbindet einen Ereignistyp mit einem Callback. Der Callback wird erst bei einem passenden Ereignis aufgerufen. Gib eine Lesefunktion zurück, die nach den Klicks den aktuellen Anzeigetext liefert. Die Vorschau spielt die Aktionen mit demselben Code nach.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"plus\">+1</button><p id=\"stand\"></p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserClick(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserClick(daten) {\n  let stand = daten.start;\n  const ausgabe = document.querySelector(\"#stand\");\n  const render = () => { ausgabe.textContent = String(stand); };\n  document.querySelector(\"#plus\").addEventListener(\"click\", () => { stand += 1; render(); });\n  render();\n  return () => ausgabe.textContent;\n}\n\nconst lesen = await browserClick({\"start\": 0});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-event-input",
    "course": "js",
    "category": "Events & Formulare",
    "name": "input / value",
    "title": "Auf Änderungen eines Eingabefelds reagieren",
    "description": "value enthält den aktuellen Eingabetext. Das input-Ereignis reagiert auf Änderungen während der Eingabe.",
    "syntax": "feld.addEventListener(\"input\", event => { ausgabe.textContent = event.target.value; });",
    "parts": [
      [
        "input",
        "Ein Ereignis bei Änderungen des Feldwerts."
      ],
      [
        "event.target",
        "Das Element, auf dem das Ereignis entstanden ist."
      ],
      [
        "value",
        "Ist bei diesem Textfeld ein String."
      ]
    ],
    "note": "Lies den Feldwert bei jedem Ereignis neu. Ein einmal vorher gelesener Wert würde veralten.",
    "detail": "Spiegele Eingaben aus #name in #ausgabe. Bei leerem oder nur aus Leerraum bestehendem Text zeige \"Gast\", sonst den getrimmten Text. Gib eine Lesefunktion für #ausgabe zurück.",
    "functionName": "browserInput",
    "parameter": "daten",
    "task": "Spiegele Eingaben aus #name in #ausgabe. Bei leerem oder nur aus Leerraum bestehendem Text zeige \"Gast\", sonst den getrimmten Text. Gib eine Lesefunktion für #ausgabe zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": "Ada",
        "actions": [
          {
            "selector": "#name",
            "type": "input",
            "value": " Ada "
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Gast",
        "actions": [
          {
            "selector": "#name",
            "type": "input",
            "value": "  "
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "0",
        "actions": [
          {
            "selector": "#name",
            "type": "input",
            "value": "0"
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Ein Ereignis bei Änderungen des Feldwerts.",
      "Arbeite mit den vorhandenen IDs im HTML. Lies den Feldwert bei jedem Ereignis neu. Ein einmal vorher gelesener Wert würde veralten."
    ],
    "solution": "async function browserInput(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#name\").addEventListener(\"input\", event => {\n    ausgabe.textContent = event.target.value.trim() || \"Gast\";\n  });\n  return () => ausgabe.textContent;\n}",
    "explanation": "value enthält den aktuellen Eingabetext. Das input-Ereignis reagiert auf Änderungen während der Eingabe. Lies den Feldwert bei jedem Ereignis neu. Ein einmal vorher gelesener Wert würde veralten.",
    "preserveInput": true,
    "browser": {
      "html": "<input id=\"name\" aria-label=\"Name\"><p id=\"ausgabe\">Gast</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserInput(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserInput(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#name\").addEventListener(\"input\", event => {\n    ausgabe.textContent = event.target.value.trim() || \"Gast\";\n  });\n  return () => ausgabe.textContent;\n}\n\nconst lesen = await browserInput({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-event-key",
    "course": "js",
    "category": "Events & Formulare",
    "name": "keydown / event.key",
    "title": "Nur auf die gewünschte Taste reagieren",
    "description": "keydown gibt über event.key an, welche Taste betätigt wurde. Du kannst gezielt Enter behandeln und andere Tasten ignorieren.",
    "syntax": "if (event.key === \"Enter\") { … }",
    "parts": [
      [
        "keydown",
        "Reagiert auf das Drücken einer Taste."
      ],
      [
        "event.key",
        "Liefert einen Tastennamen oder ein Zeichen."
      ],
      [
        "preventDefault",
        "Verhindert eine Standardaktion wie eine unbeabsichtigte Formularabgabe."
      ]
    ],
    "note": "Vermeide veraltete numerische keyCode-Prüfungen. Die Aufgabe interessiert sich ausdrücklich nur für Enter.",
    "detail": "Übernimm den getrimmten Wert von #text nach #ausgabe nur bei Enter. Ausgangstext ist \"Bereit\". Gib eine Lesefunktion zurück.",
    "functionName": "browserKey",
    "parameter": "daten",
    "task": "Übernimm den getrimmten Wert von #text nach #ausgabe nur bei Enter. Ausgangstext ist \"Bereit\". Gib eine Lesefunktion zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": "Hallo",
        "actions": [
          {
            "selector": "#text",
            "type": "keydown",
            "key": "Enter",
            "value": " Hallo "
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Bereit",
        "actions": [
          {
            "selector": "#text",
            "type": "keydown",
            "key": "Escape",
            "value": "X"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "",
        "actions": [
          {
            "selector": "#text",
            "type": "keydown",
            "key": "Enter",
            "value": ""
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Reagiert auf das Drücken einer Taste.",
      "Arbeite mit den vorhandenen IDs im HTML. Vermeide veraltete numerische keyCode-Prüfungen. Die Aufgabe interessiert sich ausdrücklich nur für Enter."
    ],
    "solution": "async function browserKey(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#text\").addEventListener(\"keydown\", event => {\n    if (event.key !== \"Enter\") return;\n    event.preventDefault(); ausgabe.textContent = event.target.value.trim();\n  });\n  return () => ausgabe.textContent;\n}",
    "explanation": "keydown gibt über event.key an, welche Taste betätigt wurde. Du kannst gezielt Enter behandeln und andere Tasten ignorieren. Vermeide veraltete numerische keyCode-Prüfungen. Die Aufgabe interessiert sich ausdrücklich nur für Enter.",
    "preserveInput": true,
    "browser": {
      "html": "<input id=\"text\" aria-label=\"Text\"><p id=\"ausgabe\">Bereit</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserKey(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserKey(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#text\").addEventListener(\"keydown\", event => {\n    if (event.key !== \"Enter\") return;\n    event.preventDefault(); ausgabe.textContent = event.target.value.trim();\n  });\n  return () => ausgabe.textContent;\n}\n\nconst lesen = await browserKey({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-event-submit",
    "course": "js",
    "category": "Events & Formulare",
    "name": "submit / preventDefault",
    "title": "Ein Formular prüfen und die Standardabgabe verhindern",
    "description": "submit gehört zum Formular. preventDefault hält die Verarbeitung in deiner Anwendung, damit du Eingaben prüfen und ein Ergebnis anzeigen kannst.",
    "syntax": "form.addEventListener(\"submit\", event => { event.preventDefault(); … });",
    "parts": [
      [
        "submit",
        "Reagiert auf die Abgabe des Formulars."
      ],
      [
        "preventDefault",
        "Verhindert die übliche Navigation der Formularabgabe."
      ],
      [
        "trim und Number",
        "Prüft leere Eingaben separat und wandelt vorhandenen Text in eine Zahl um."
      ]
    ],
    "note": "Number(\"\") ist 0. Prüfe leeren Text vorher, wenn ein Wert verpflichtend ist. In der DOM-Lernumgebung erfolgt die Validierung ausdrücklich im Code.",
    "detail": "Prüfe bei submit von #formular den Text in #alter. Erlaubt sind ganze Zahlen von 0 bis 120. Zeige \"OK\" oder \"Ungültig\" in #ausgabe und gib eine Lesefunktion zurück.",
    "functionName": "browserSubmit",
    "parameter": "daten",
    "task": "Prüfe bei submit von #formular den Text in #alter. Erlaubt sind ganze Zahlen von 0 bis 120. Zeige \"OK\" oder \"Ungültig\" in #ausgabe und gib eine Lesefunktion zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": "OK",
        "actions": [
          {
            "selector": "#alter",
            "type": "input",
            "value": "0"
          },
          {
            "selector": "#formular",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#alter",
            "type": "input",
            "value": ""
          },
          {
            "selector": "#formular",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#alter",
            "type": "input",
            "value": "2.5"
          },
          {
            "selector": "#formular",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#alter",
            "type": "input",
            "value": "121"
          },
          {
            "selector": "#formular",
            "type": "submit"
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Reagiert auf die Abgabe des Formulars.",
      "Arbeite mit den vorhandenen IDs im HTML. Number(\"\") ist 0. Prüfe leeren Text vorher, wenn ein Wert verpflichtend ist. In der DOM-Lernumgebung erfolgt die Validierung ausdrücklich im Code."
    ],
    "solution": "async function browserSubmit(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#formular\").addEventListener(\"submit\", event => {\n    event.preventDefault();\n    const text = document.querySelector(\"#alter\").value.trim();\n    const alter = Number(text);\n    ausgabe.textContent = text !== \"\" && Number.isInteger(alter) && alter >= 0 && alter <= 120 ? \"OK\" : \"Ungültig\";\n  });\n  return () => ausgabe.textContent;\n}",
    "explanation": "submit gehört zum Formular. preventDefault hält die Verarbeitung in deiner Anwendung, damit du Eingaben prüfen und ein Ergebnis anzeigen kannst. Number(\"\") ist 0. Prüfe leeren Text vorher, wenn ein Wert verpflichtend ist. In der DOM-Lernumgebung erfolgt die Validierung ausdrücklich im Code.",
    "preserveInput": true,
    "browser": {
      "html": "<form id=\"formular\"><input id=\"alter\" aria-label=\"Alter\"><button>Prüfen</button></form><p id=\"ausgabe\">Bereit</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserSubmit(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserSubmit(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#formular\").addEventListener(\"submit\", event => {\n    event.preventDefault();\n    const text = document.querySelector(\"#alter\").value.trim();\n    const alter = Number(text);\n    ausgabe.textContent = text !== \"\" && Number.isInteger(alter) && alter >= 0 && alter <= 120 ? \"OK\" : \"Ungültig\";\n  });\n  return () => ausgabe.textContent;\n}\n\nconst lesen = await browserSubmit({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-event-delegate",
    "course": "js",
    "category": "Events & Formulare",
    "name": "Event Delegation",
    "title": "Klicks für mehrere Listeneinträge gemeinsam behandeln",
    "description": "Ein Ereignis kann zur Elternstruktur weiterlaufen. Ein Listener an der Liste kann dadurch auch spätere Kindknoten behandeln.",
    "syntax": "liste.addEventListener(\"click\", event => { const button = event.target.closest(\"button\"); … });",
    "parts": [
      [
        "Bubbling",
        "Das Ereignis läuft vom Ziel in die Elternkette."
      ],
      [
        "closest(\"button\")",
        "Findet den Knopf auch bei einem Klick auf seinen inneren span."
      ],
      [
        "contains",
        "Prüft, ob der gefundene Knopf zur eigenen Liste gehört."
      ]
    ],
    "note": "Ein Listener pro Kind ist oft unnötig. Die Aufgabe hängt den gemeinsamen Listener an die Liste.",
    "detail": "Entferne bei Klick auf einen Knopf in #liste sein umgebendes li. Gib eine Funktion zurück, die die Namen der verbliebenen li aus ihren data-name-Attributen liest.",
    "functionName": "browserDelegate",
    "parameter": "daten",
    "task": "Entferne bei Klick auf einen Knopf in #liste sein umgebendes li. Gib eine Funktion zurück, die die Namen der verbliebenen li aus ihren data-name-Attributen liest. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": [
          "B"
        ],
        "actions": [
          {
            "selector": "#entfernen",
            "type": "click"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": [
          "A",
          "B"
        ],
        "actions": [],
        "browser": {}
      },
      {
        "input": {},
        "expected": [],
        "actions": [
          {
            "selector": "#entfernen",
            "type": "click"
          },
          {
            "selector": "#liste button",
            "type": "click"
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Das Ereignis läuft vom Ziel in die Elternkette.",
      "Arbeite mit den vorhandenen IDs im HTML. Ein Listener pro Kind ist oft unnötig. Die Aufgabe hängt den gemeinsamen Listener an die Liste."
    ],
    "solution": "async function browserDelegate(daten) {\n  const liste = document.querySelector(\"#liste\");\n  liste.addEventListener(\"click\", event => {\n    const button = event.target.closest(\"button\");\n    if (button && liste.contains(button)) button.closest(\"li\")?.remove();\n  });\n  return () => Array.from(liste.children, li => li.dataset.name);\n}",
    "explanation": "Ein Ereignis kann zur Elternstruktur weiterlaufen. Ein Listener an der Liste kann dadurch auch spätere Kindknoten behandeln. Ein Listener pro Kind ist oft unnötig. Die Aufgabe hängt den gemeinsamen Listener an die Liste.",
    "preserveInput": true,
    "browser": {
      "html": "<ul id=\"liste\"><li data-name=\"A\"><button><span id=\"entfernen\">A entfernen</span></button></li><li data-name=\"B\"><button>B entfernen</button></li></ul>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserDelegate(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserDelegate(daten) {\n  const liste = document.querySelector(\"#liste\");\n  liste.addEventListener(\"click\", event => {\n    const button = event.target.closest(\"button\");\n    if (button && liste.contains(button)) button.closest(\"li\")?.remove();\n  });\n  return () => Array.from(liste.children, li => li.dataset.name);\n}\n\nconst lesen = await browserDelegate({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-storage-text",
    "course": "js",
    "category": "Browser-Speicherung",
    "name": "getItem / setItem",
    "title": "Einen String speichern und wieder lesen",
    "description": "localStorage speichert Strings. getItem liefert null, wenn ein Schlüssel fehlt.",
    "syntax": "localStorage.setItem(\"name\", daten.name);\nlocalStorage.getItem(\"name\");",
    "parts": [
      [
        "setItem",
        "Speichert einen String unter einem Schlüssel."
      ],
      [
        "getItem",
        "Liest den String oder liefert null."
      ],
      [
        "Isolierter Speicher",
        "Im Spielplatz gehören die Schlüssel nur zu dieser Übung."
      ]
    ],
    "note": "Die Übung überschreibt den Wert des eigenen Schlüssels; App-Einstellungen und Lernfortschritt sind davon getrennt.",
    "detail": "Speichere daten.name (String) unter \"name\" und gib den gelesenen Wert zurück.",
    "functionName": "browserText",
    "parameter": "daten",
    "task": "Speichere daten.name (String) unter \"name\" und gib den gelesenen Wert zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "name": "Ada"
        },
        "expected": "Ada",
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "name": ""
        },
        "expected": "",
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "name": "0"
        },
        "expected": "0",
        "actions": [],
        "browser": {}
      }
    ],
    "hints": [
      "Speichert einen String unter einem Schlüssel.",
      "Arbeite mit den vorhandenen IDs im HTML. Die Übung überschreibt den Wert des eigenen Schlüssels; App-Einstellungen und Lernfortschritt sind davon getrennt."
    ],
    "solution": "async function browserText(daten) {\n  localStorage.setItem(\"name\", daten.name);\n  return localStorage.getItem(\"name\");\n}",
    "explanation": "localStorage speichert Strings. getItem liefert null, wenn ein Schlüssel fehlt. Die Übung überschreibt den Wert des eigenen Schlüssels; App-Einstellungen und Lernfortschritt sind davon getrennt.",
    "preserveInput": true,
    "browser": {
      "html": "<p>Speicherübung</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserText(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserText(daten) {\n  localStorage.setItem(\"name\", daten.name);\n  return localStorage.getItem(\"name\");\n}\n\nconst lesen = await browserText({\"name\": \"Ada\"});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-storage-json",
    "course": "js",
    "category": "Browser-Speicherung",
    "name": "JSON in localStorage",
    "title": "Eine Liste als JSON speichern",
    "description": "Arrays und Objekte benötigen eine Textdarstellung. stringify erzeugt diese Darstellung; parse stellt den Wert wieder her.",
    "syntax": "localStorage.setItem(\"liste\", JSON.stringify(daten));\nJSON.parse(localStorage.getItem(\"liste\"));",
    "parts": [
      [
        "JSON.stringify",
        "Serialisiert eine Liste zu Text."
      ],
      [
        "JSON.parse",
        "Liest den Text wieder als Datenstruktur."
      ],
      [
        "Kein direkter Objektspeicher",
        "Ein direktes Objekt würde als String umgewandelt, nicht als Datenstruktur gespeichert."
      ]
    ],
    "note": "Speichere nur geeignete Daten, keine Funktionen. Diese Aufgabe verwendet Listen aus Strings.",
    "detail": "Speichere daten (Stringliste) unter \"liste\" als JSON und gib die wieder gelesene Liste zurück.",
    "functionName": "browserJson",
    "parameter": "daten",
    "task": "Speichere daten (Stringliste) unter \"liste\" als JSON und gib die wieder gelesene Liste zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": [
          "A",
          "B"
        ],
        "expected": [
          "A",
          "B"
        ],
        "actions": [],
        "browser": {}
      },
      {
        "input": [],
        "expected": [],
        "actions": [],
        "browser": {}
      },
      {
        "input": [
          "",
          "<b>"
        ],
        "expected": [
          "",
          "<b>"
        ],
        "actions": [],
        "browser": {}
      }
    ],
    "hints": [
      "Serialisiert eine Liste zu Text.",
      "Arbeite mit den vorhandenen IDs im HTML. Speichere nur geeignete Daten, keine Funktionen. Diese Aufgabe verwendet Listen aus Strings."
    ],
    "solution": "async function browserJson(daten) {\n  localStorage.setItem(\"liste\", JSON.stringify(daten));\n  return JSON.parse(localStorage.getItem(\"liste\"));\n}",
    "explanation": "Arrays und Objekte benötigen eine Textdarstellung. stringify erzeugt diese Darstellung; parse stellt den Wert wieder her. Speichere nur geeignete Daten, keine Funktionen. Diese Aufgabe verwendet Listen aus Strings.",
    "preserveInput": true,
    "browser": {
      "html": "<p>JSON-Speicher</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserJson(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserJson(daten) {\n  localStorage.setItem(\"liste\", JSON.stringify(daten));\n  return JSON.parse(localStorage.getItem(\"liste\"));\n}\n\nconst lesen = await browserJson([\"A\", \"B\"]);\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-storage-load",
    "course": "js",
    "category": "Browser-Speicherung",
    "name": "Defensive Speicherung",
    "title": "Gespeicherte Daten prüfen statt blind vertrauen",
    "description": "Ein gespeicherter Text kann beschädigt sein oder einen unerwarteten Typ enthalten. Fange Parsefehler ab und prüfe die Struktur.",
    "syntax": "try { const wert = JSON.parse(text); if (Array.isArray(wert)) … } catch { … }",
    "parts": [
      [
        "null",
        "Ein fehlender Schlüssel ist von ungültigem JSON zu unterscheiden."
      ],
      [
        "Array.isArray",
        "Prüft den erwarteten Behältertyp."
      ],
      [
        "every",
        "Prüft hier zusätzlich den Typ aller Einträge."
      ]
    ],
    "note": "Gültiges JSON ist nicht automatisch gültig für deine Anwendung. Prüfe den erwarteten Typ.",
    "detail": "Lies \"liste\" aus dem Speicher. Gib nur eine Liste zurück, deren Einträge alle Strings sind; bei fehlenden, kaputten oder falschen Daten [].",
    "functionName": "browserLoad",
    "parameter": "daten",
    "task": "Lies \"liste\" aus dem Speicher. Gib nur eine Liste zurück, deren Einträge alle Strings sind; bei fehlenden, kaputten oder falschen Daten []. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": [
          "A"
        ],
        "actions": [],
        "browser": {
          "storage": {
            "liste": "[\"A\"]"
          }
        }
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "storage": {}
        }
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "storage": {
            "liste": "{kaputt"
          }
        }
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "storage": {
            "liste": "[1]"
          }
        }
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "storage": {
            "liste": "null"
          }
        }
      }
    ],
    "hints": [
      "Ein fehlender Schlüssel ist von ungültigem JSON zu unterscheiden.",
      "Arbeite mit den vorhandenen IDs im HTML. Gültiges JSON ist nicht automatisch gültig für deine Anwendung. Prüfe den erwarteten Typ."
    ],
    "solution": "async function browserLoad(daten) {\n  try {\n    const wert = JSON.parse(localStorage.getItem(\"liste\"));\n    return Array.isArray(wert) && wert.every(text => typeof text === \"string\") ? wert : [];\n  } catch { return []; }\n}",
    "explanation": "Ein gespeicherter Text kann beschädigt sein oder einen unerwarteten Typ enthalten. Fange Parsefehler ab und prüfe die Struktur. Gültiges JSON ist nicht automatisch gültig für deine Anwendung. Prüfe den erwarteten Typ.",
    "preserveInput": true,
    "browser": {
      "html": "<p>Robustes Laden</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserLoad(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserLoad(daten) {\n  try {\n    const wert = JSON.parse(localStorage.getItem(\"liste\"));\n    return Array.isArray(wert) && wert.every(text => typeof text === \"string\") ? wert : [];\n  } catch { return []; }\n}\n\nconst lesen = await browserLoad({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-storage-remove",
    "course": "js",
    "category": "Browser-Speicherung",
    "name": "removeItem",
    "title": "Einen Schlüssel löschen und andere Werte erhalten",
    "description": "removeItem entfernt genau einen Schlüssel. clear würde dagegen alle Schlüssel dieses Speichers löschen.",
    "syntax": "localStorage.removeItem(\"entwurf\");",
    "parts": [
      [
        "removeItem",
        "Entfernt den angegebenen Schlüssel."
      ],
      [
        "getItem danach",
        "Liefert für den entfernten Schlüssel null."
      ],
      [
        "Andere Schlüssel",
        "Bleiben erhalten."
      ]
    ],
    "note": "Verwende clear nur, wenn du wirklich den gesamten eigenen Speicher leeren willst.",
    "detail": "Entferne \"entwurf\" und gib {entwurf, name} mit den danach gelesenen Werten zurück.",
    "functionName": "browserRemove",
    "parameter": "daten",
    "task": "Entferne \"entwurf\" und gib {entwurf, name} mit den danach gelesenen Werten zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": {
          "entwurf": null,
          "name": "Ada"
        },
        "actions": [],
        "browser": {
          "storage": {
            "entwurf": "X",
            "name": "Ada"
          }
        }
      },
      {
        "input": {},
        "expected": {
          "entwurf": null,
          "name": null
        },
        "actions": [],
        "browser": {
          "storage": {}
        }
      },
      {
        "input": {},
        "expected": {
          "entwurf": null,
          "name": ""
        },
        "actions": [],
        "browser": {
          "storage": {
            "name": ""
          }
        }
      }
    ],
    "hints": [
      "Entfernt den angegebenen Schlüssel.",
      "Arbeite mit den vorhandenen IDs im HTML. Verwende clear nur, wenn du wirklich den gesamten eigenen Speicher leeren willst."
    ],
    "solution": "async function browserRemove(daten) {\n  localStorage.removeItem(\"entwurf\");\n  return { entwurf: localStorage.getItem(\"entwurf\"), name: localStorage.getItem(\"name\") };\n}",
    "explanation": "removeItem entfernt genau einen Schlüssel. clear würde dagegen alle Schlüssel dieses Speichers löschen. Verwende clear nur, wenn du wirklich den gesamten eigenen Speicher leeren willst.",
    "preserveInput": true,
    "browser": {
      "html": "<p>Gezielt löschen</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserRemove(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserRemove(daten) {\n  localStorage.removeItem(\"entwurf\");\n  return { entwurf: localStorage.getItem(\"entwurf\"), name: localStorage.getItem(\"name\") };\n}\n\nconst lesen = await browserRemove({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-fetch-get",
    "course": "js",
    "category": "HTTP & fetch",
    "name": "fetch / response.json",
    "title": "Eine JSON-Antwort über fetch lesen",
    "description": "fetch liefert ein Promise für eine Response. json liefert anschließend ein weiteres Promise für den gelesenen JSON-Wert.",
    "syntax": "const response = await fetch(\"/api/profil\");\nconst profil = await response.json();",
    "parts": [
      [
        "fetch",
        "Liefert hier eine lokale Übungsantwort für dieselbe URL."
      ],
      [
        "Response",
        "Enthält Status und Körper; sie ist noch nicht das JSON-Objekt."
      ],
      [
        "await response.json()",
        "Liest den Körper als JSON."
      ]
    ],
    "note": "Im normalen Browser würde fetch eine HTTP-Anfrage auslösen. Im Spielplatz sind Antworten simuliert, damit du offline üben kannst.",
    "detail": "Lade /api/profil und gib das Feld name aus der JSON-Antwort zurück.",
    "functionName": "browserGet",
    "parameter": "daten",
    "task": "Lade /api/profil und gib das Feld name aus der JSON-Antwort zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": "Ada",
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/profil": {
              "body": {
                "name": "Ada"
              }
            }
          }
        }
      },
      {
        "input": {},
        "expected": "",
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/profil": {
              "body": {
                "name": ""
              }
            }
          }
        }
      },
      {
        "input": {},
        "expected": "Ben",
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/profil": {
              "body": {
                "name": "Ben"
              }
            }
          }
        }
      }
    ],
    "hints": [
      "Liefert hier eine lokale Übungsantwort für dieselbe URL.",
      "Arbeite mit den vorhandenen IDs im HTML. Im normalen Browser würde fetch eine HTTP-Anfrage auslösen. Im Spielplatz sind Antworten simuliert, damit du offline üben kannst."
    ],
    "solution": "async function browserGet(daten) {\n  const response = await fetch(\"/api/profil\");\n  const profil = await response.json();\n  return profil.name;\n}",
    "explanation": "fetch liefert ein Promise für eine Response. json liefert anschließend ein weiteres Promise für den gelesenen JSON-Wert. Im normalen Browser würde fetch eine HTTP-Anfrage auslösen. Im Spielplatz sind Antworten simuliert, damit du offline üben kannst.",
    "preserveInput": true,
    "browser": {
      "html": "<p>API-Profil</p>",
      "fixtures": {
        "/api/profil": {
          "body": {
            "name": "Ada"
          }
        }
      },
      "storage": {}
    },
    "starter": "async function browserGet(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserGet(daten) {\n  const response = await fetch(\"/api/profil\");\n  const profil = await response.json();\n  return profil.name;\n}\n\nconst lesen = await browserGet({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-fetch-status",
    "course": "js",
    "category": "HTTP & fetch",
    "name": "response.ok / status",
    "title": "HTTP-Fehler ausdrücklich prüfen",
    "description": "fetch lehnt bei HTTP 404 oder 500 normalerweise nicht ab. Prüfe response.ok selbst, bevor du die Antwort als Erfolg verwendest.",
    "syntax": "if (!response.ok) throw new Error(`HTTP ${response.status}`);",
    "parts": [
      [
        "response.ok",
        "Ist true für Statuswerte 200 bis 299."
      ],
      [
        "response.status",
        "Enthält den HTTP-Status."
      ],
      [
        "catch",
        "Behandelt sowohl ausdrücklich geworfene HTTP-Fehler als auch Netzwerkfehler."
      ]
    ],
    "note": "HTTP-Fehler und Netzwerkfehler sind unterschiedliche Fälle. Die lokalen Testantworten stellen beide bereit.",
    "detail": "Lade /api/wert. Bei erfolgreichem Status gib body.wert zurück; bei HTTP- oder Netzwerkfehler null.",
    "functionName": "browserStatus",
    "parameter": "daten",
    "task": "Lade /api/wert. Bei erfolgreichem Status gib body.wert zurück; bei HTTP- oder Netzwerkfehler null. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": 0,
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/wert": {
              "body": {
                "wert": 0
              }
            }
          }
        }
      },
      {
        "input": {},
        "expected": null,
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/wert": {
              "status": 404,
              "body": {
                "wert": 5
              }
            }
          }
        }
      },
      {
        "input": {},
        "expected": null,
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/wert": {
              "networkError": true
            }
          }
        }
      },
      {
        "input": {},
        "expected": 7,
        "actions": [],
        "browser": {
          "fixtures": {
            "/api/wert": {
              "status": 201,
              "body": {
                "wert": 7
              }
            }
          }
        }
      }
    ],
    "hints": [
      "Ist true für Statuswerte 200 bis 299.",
      "Arbeite mit den vorhandenen IDs im HTML. HTTP-Fehler und Netzwerkfehler sind unterschiedliche Fälle. Die lokalen Testantworten stellen beide bereit."
    ],
    "solution": "async function browserStatus(daten) {\n  try {\n    const response = await fetch(\"/api/wert\");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return (await response.json()).wert;\n  } catch { return null; }\n}",
    "explanation": "fetch lehnt bei HTTP 404 oder 500 normalerweise nicht ab. Prüfe response.ok selbst, bevor du die Antwort als Erfolg verwendest. HTTP-Fehler und Netzwerkfehler sind unterschiedliche Fälle. Die lokalen Testantworten stellen beide bereit.",
    "preserveInput": true,
    "browser": {
      "html": "<p>Statusprüfung</p>",
      "fixtures": {
        "/api/wert": {
          "body": {
            "wert": 7
          }
        }
      },
      "storage": {}
    },
    "starter": "async function browserStatus(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserStatus(daten) {\n  try {\n    const response = await fetch(\"/api/wert\");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return (await response.json()).wert;\n  } catch { return null; }\n}\n\nconst lesen = await browserStatus({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-fetch-post",
    "course": "js",
    "category": "HTTP & fetch",
    "name": "POST / JSON-Body",
    "title": "Daten als JSON an einen Endpunkt schicken",
    "description": "Ein POST benötigt Methode, Header und einen serialisierten Body. Das Antwort-JSON muss unabhängig davon gelesen werden.",
    "syntax": "fetch(\"/api/notizen\", { method: \"POST\", headers: {\"Content-Type\":\"application/json\"}, body: JSON.stringify(daten) });",
    "parts": [
      [
        "method",
        "Wählt die HTTP-Methode."
      ],
      [
        "Content-Type",
        "Beschreibt das Format des gesendeten Körpers."
      ],
      [
        "JSON.stringify",
        "Wandelt die Daten in den zu sendenden Text um."
      ]
    ],
    "note": "Die lokale Übungs-API spiegelt die übermittelten JSON-Daten zurück. Es werden keine echten Daten an einen Server geschickt.",
    "detail": "Sende daten mit POST und JSON-Header an /api/notizen. Gib den JSON-Wert der Antwort zurück.",
    "functionName": "browserPost",
    "parameter": "daten",
    "task": "Sende daten mit POST und JSON-Header an /api/notizen. Gib den JSON-Wert der Antwort zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {
          "text": "Hallo"
        },
        "expected": {
          "text": "Hallo"
        },
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "text": ""
        },
        "expected": {
          "text": ""
        },
        "actions": [],
        "browser": {}
      },
      {
        "input": {
          "text": "<b>"
        },
        "expected": {
          "text": "<b>"
        },
        "actions": [],
        "browser": {}
      }
    ],
    "hints": [
      "Wählt die HTTP-Methode.",
      "Arbeite mit den vorhandenen IDs im HTML. Die lokale Übungs-API spiegelt die übermittelten JSON-Daten zurück. Es werden keine echten Daten an einen Server geschickt."
    ],
    "solution": "async function browserPost(daten) {\n  const response = await fetch(\"/api/notizen\", {\n    method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(daten)\n  });\n  if (!response.ok) throw new Error(\"HTTP-Fehler\");\n  return await response.json();\n}",
    "explanation": "Ein POST benötigt Methode, Header und einen serialisierten Body. Das Antwort-JSON muss unabhängig davon gelesen werden. Die lokale Übungs-API spiegelt die übermittelten JSON-Daten zurück. Es werden keine echten Daten an einen Server geschickt.",
    "preserveInput": true,
    "browser": {
      "html": "<p>POST-Übung</p>",
      "fixtures": {
        "/api/notizen": {
          "echoJson": true
        }
      },
      "storage": {}
    },
    "starter": "async function browserPost(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserPost(daten) {\n  const response = await fetch(\"/api/notizen\", {\n    method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(daten)\n  });\n  if (!response.ok) throw new Error(\"HTTP-Fehler\");\n  return await response.json();\n}\n\nconst lesen = await browserPost({\"text\": \"Hallo\"});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-fetch-ui",
    "course": "js",
    "category": "HTTP & fetch",
    "name": "Ladezustand",
    "title": "Eine API-Antwort mit Lade- und Fehlerzustand anzeigen",
    "description": "Eine Oberfläche sollte Laden, Erfolg und Fehler sichtbar unterscheiden. Ein Listener kann dabei eine async-Funktion sein.",
    "syntax": "button.addEventListener(\"click\", async () => { ausgabe.textContent = \"Lädt …\"; … });",
    "parts": [
      [
        "async-Listener",
        "Kann await für fetch und JSON verwenden."
      ],
      [
        "Ladezustand",
        "Wird vor dem Warten angezeigt."
      ],
      [
        "Fehlerzustand",
        "Wird im catch gesetzt."
      ]
    ],
    "note": "Fange Fehler im async-Listener selbst ab. Ein äußerer synchroner try-Block fängt spätere Ablehnungen nicht ab.",
    "detail": "Bei Klick auf #laden lade /api/profil. Zeige zunächst \"Lädt …\", danach den Namen oder bei einem Fehler \"Fehler\" in #ausgabe. Gib eine Lesefunktion zurück.",
    "functionName": "browserUi",
    "parameter": "daten",
    "task": "Bei Klick auf #laden lade /api/profil. Zeige zunächst \"Lädt …\", danach den Namen oder bei einem Fehler \"Fehler\" in #ausgabe. Gib eine Lesefunktion zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": "Ada",
        "actions": [
          {
            "selector": "#laden",
            "type": "click"
          }
        ],
        "browser": {
          "fixtures": {
            "/api/profil": {
              "body": {
                "name": "Ada"
              }
            }
          }
        }
      },
      {
        "input": {},
        "expected": "Fehler",
        "actions": [
          {
            "selector": "#laden",
            "type": "click"
          }
        ],
        "browser": {
          "fixtures": {
            "/api/profil": {
              "status": 500,
              "body": {}
            }
          }
        }
      },
      {
        "input": {},
        "expected": "Fehler",
        "actions": [
          {
            "selector": "#laden",
            "type": "click"
          }
        ],
        "browser": {
          "fixtures": {
            "/api/profil": {
              "networkError": true
            }
          }
        }
      }
    ],
    "hints": [
      "Kann await für fetch und JSON verwenden.",
      "Arbeite mit den vorhandenen IDs im HTML. Fange Fehler im async-Listener selbst ab. Ein äußerer synchroner try-Block fängt spätere Ablehnungen nicht ab."
    ],
    "solution": "async function browserUi(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#laden\").addEventListener(\"click\", async () => {\n    ausgabe.textContent = \"Lädt …\";\n    try {\n      const response = await fetch(\"/api/profil\");\n      if (!response.ok) throw new Error(\"HTTP-Fehler\");\n      ausgabe.textContent = (await response.json()).name;\n    } catch { ausgabe.textContent = \"Fehler\"; }\n  });\n  return () => ausgabe.textContent;\n}",
    "explanation": "Eine Oberfläche sollte Laden, Erfolg und Fehler sichtbar unterscheiden. Ein Listener kann dabei eine async-Funktion sein. Fange Fehler im async-Listener selbst ab. Ein äußerer synchroner try-Block fängt spätere Ablehnungen nicht ab.",
    "preserveInput": true,
    "browser": {
      "html": "<button id=\"laden\">Profil laden</button><p id=\"ausgabe\">Bereit</p>",
      "fixtures": {
        "/api/profil": {
          "body": {
            "name": "Ada"
          }
        }
      },
      "storage": {}
    },
    "starter": "async function browserUi(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserUi(daten) {\n  const ausgabe = document.querySelector(\"#ausgabe\");\n  document.querySelector(\"#laden\").addEventListener(\"click\", async () => {\n    ausgabe.textContent = \"Lädt …\";\n    try {\n      const response = await fetch(\"/api/profil\");\n      if (!response.ok) throw new Error(\"HTTP-Fehler\");\n      ausgabe.textContent = (await response.json()).name;\n    } catch { ausgabe.textContent = \"Fehler\"; }\n  });\n  return () => ausgabe.textContent;\n}\n\nconst lesen = await browserUi({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-browser-calculator",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Taschenrechner",
    "title": "Einen Taschenrechner mit geprüften Eingaben bauen",
    "description": "Hier verbindest du Formular-Ereignisse, Zahlumwandlung, switch und Fehleranzeigen zu einer kleinen Anwendung.",
    "syntax": "const a = Number(feld.value);\nif (!Number.isFinite(a)) …",
    "parts": [
      [
        "Pflichtfelder",
        "Prüfe leeren Text vor Number."
      ],
      [
        "switch",
        "Wählt die Operation ausdrücklich."
      ],
      [
        "Division durch 0",
        "Braucht eine eigene Fehlermeldung."
      ]
    ],
    "note": "Die Aufgabe akzeptiert endliche Zahlen. Ein übergroßes nichtendliches Ergebnis ist ebenfalls ungültig.",
    "detail": "Verdrahte das Formular #rechner. Berechne a op b für +,-,*,/. Zeige \"Ungültig\" bei leeren oder nichtendlichen Eingaben/Ergebnissen, \"Division durch 0\" bei Division durch 0, sonst String des Ergebnisses. Gib eine Lesefunktion für #ergebnis zurück.",
    "functionName": "browserCalculator",
    "parameter": "daten",
    "task": "Verdrahte das Formular #rechner. Berechne a op b für +,-,*,/. Zeige \"Ungültig\" bei leeren oder nichtendlichen Eingaben/Ergebnissen, \"Division durch 0\" bei Division durch 0, sonst String des Ergebnisses. Gib eine Lesefunktion für #ergebnis zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": "5",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "3"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": ""
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "3"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "0",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "0"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "*"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Division durch 0",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "7"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "0"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "/"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "5",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "9"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "4"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "-"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "12",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "3"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "4"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "*"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "-1",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "-3"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "+"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "Infinity"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "+"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "3.5",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "7"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "/"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "1e308"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "1e308"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "*"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Prüfe leeren Text vor Number.",
      "Arbeite mit den vorhandenen IDs im HTML. Die Aufgabe akzeptiert endliche Zahlen. Ein übergroßes nichtendliches Ergebnis ist ebenfalls ungültig."
    ],
    "solution": "async function browserCalculator(daten) {\n  const ergebnis = document.querySelector(\"#ergebnis\");\n  document.querySelector(\"#rechner\").addEventListener(\"submit\", event => {\n    event.preventDefault();\n    const textA = document.querySelector(\"#a\").value.trim();\n    const textB = document.querySelector(\"#b\").value.trim();\n    const a = Number(textA), b = Number(textB), op = document.querySelector(\"#op\").value;\n    if (!textA || !textB || !Number.isFinite(a) || !Number.isFinite(b)) { ergebnis.textContent = \"Ungültig\"; return; }\n    if (op === \"/\" && b === 0) { ergebnis.textContent = \"Division durch 0\"; return; }\n    let wert;\n    switch (op) { case \"+\": wert = a + b; break; case \"-\": wert = a - b; break; case \"*\": wert = a * b; break; case \"/\": wert = a / b; break; default: wert = NaN; }\n    ergebnis.textContent = Number.isFinite(wert) ? String(wert) : \"Ungültig\";\n  });\n  return () => ergebnis.textContent;\n}",
    "explanation": "Hier verbindest du Formular-Ereignisse, Zahlumwandlung, switch und Fehleranzeigen zu einer kleinen Anwendung. Die Aufgabe akzeptiert endliche Zahlen. Ein übergroßes nichtendliches Ergebnis ist ebenfalls ungültig.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Taschenrechner</h2><form id=\"rechner\"><input id=\"a\" aria-label=\"Erste Zahl\" placeholder=\"Erste Zahl\"><input id=\"b\" aria-label=\"Zweite Zahl\" placeholder=\"Zweite Zahl\"><select id=\"op\" aria-label=\"Operation\"><option value=\"+\">+</option><option value=\"-\">−</option><option value=\"*\">×</option><option value=\"/\">÷</option></select><button>Berechnen</button></form><p id=\"ergebnis\" aria-live=\"polite\">Bereit</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserCalculator(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserCalculator(daten) {\n  const ergebnis = document.querySelector(\"#ergebnis\");\n  document.querySelector(\"#rechner\").addEventListener(\"submit\", event => {\n    event.preventDefault();\n    const textA = document.querySelector(\"#a\").value.trim();\n    const textB = document.querySelector(\"#b\").value.trim();\n    const a = Number(textA), b = Number(textB), op = document.querySelector(\"#op\").value;\n    if (!textA || !textB || !Number.isFinite(a) || !Number.isFinite(b)) { ergebnis.textContent = \"Ungültig\"; return; }\n    if (op === \"/\" && b === 0) { ergebnis.textContent = \"Division durch 0\"; return; }\n    let wert;\n    switch (op) { case \"+\": wert = a + b; break; case \"-\": wert = a - b; break; case \"*\": wert = a * b; break; case \"/\": wert = a / b; break; default: wert = NaN; }\n    ergebnis.textContent = Number.isFinite(wert) ? String(wert) : \"Ungültig\";\n  });\n  return () => ergebnis.textContent;\n}\n\nconst lesen = await browserCalculator({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-browser-todo",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Aufgabenliste",
    "title": "Eine Aufgabenliste mit Speicherung und Löschen bauen",
    "description": "Diese Anwendung verbindet defensive JSON-Ladung, sichere Textausgabe, Event Delegation und Speicherung nach jeder Änderung.",
    "syntax": "localStorage.setItem(\"aufgaben\", JSON.stringify(aufgaben));",
    "parts": [
      [
        "Zustand",
        "Eine Arrayliste hält die Aufgaben unabhängig von ihren DOM-Knoten."
      ],
      [
        "render",
        "Baut die sichtbare Liste aus dem Zustand neu auf."
      ],
      [
        "Speichern",
        "Erfolgt nach Hinzufügen und Löschen."
      ]
    ],
    "note": "Lade nur eine Liste aus Strings und verwende [] bei kaputten Daten. Neue Aufgaben müssen nach trim nichtleer sein.",
    "detail": "Baue eine Aufgabenliste: Lade \"aufgaben\" defensiv, füge über #formular getrimmten Text hinzu, lösche per Knopf an jedem li. Speichere jede Änderung als JSON. Gib eine Lesefunktion zurück, die die Aufgabenliste als Array liefert.",
    "functionName": "browserTodo",
    "parameter": "daten",
    "task": "Baue eine Aufgabenliste: Lade \"aufgaben\" defensiv, füge über #formular getrimmten Text hinzu, lösche per Knopf an jedem li. Speichere jede Änderung als JSON. Gib eine Lesefunktion zurück, die die Aufgabenliste als Array liefert. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": [
          "Lernen"
        ],
        "actions": [
          {
            "selector": "#neu",
            "type": "input",
            "value": " Lernen "
          },
          {
            "selector": "#formular",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": [],
        "actions": [
          {
            "selector": "#neu",
            "type": "input",
            "value": " "
          },
          {
            "selector": "#formular",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": [
          "B"
        ],
        "actions": [
          {
            "selector": "#liste button",
            "type": "click"
          }
        ],
        "browser": {
          "storage": {
            "aufgaben": "[\"A\",\"B\"]"
          }
        }
      },
      {
        "input": {},
        "expected": [],
        "actions": [],
        "browser": {
          "storage": {
            "aufgaben": "{kaputt"
          }
        }
      }
    ],
    "hints": [
      "Eine Arrayliste hält die Aufgaben unabhängig von ihren DOM-Knoten.",
      "Arbeite mit den vorhandenen IDs im HTML. Lade nur eine Liste aus Strings und verwende [] bei kaputten Daten. Neue Aufgaben müssen nach trim nichtleer sein."
    ],
    "solution": "async function browserTodo(daten) {\n  let aufgaben = [];\n  try { const wert = JSON.parse(localStorage.getItem(\"aufgaben\")); if (Array.isArray(wert) && wert.every(text => typeof text === \"string\")) aufgaben = wert; } catch {}\n  const liste = document.querySelector(\"#liste\");\n  function render() {\n    liste.replaceChildren();\n    aufgaben.forEach((text, index) => {\n      const li = document.createElement(\"li\");\n      const span = document.createElement(\"span\"); span.textContent = text;\n      const button = document.createElement(\"button\"); button.textContent = \"Löschen\"; button.dataset.index = String(index);\n      li.append(span, button); liste.append(li);\n    });\n  }\n  function speichern() { localStorage.setItem(\"aufgaben\", JSON.stringify(aufgaben)); render(); }\n  document.querySelector(\"#formular\").addEventListener(\"submit\", event => {\n    event.preventDefault(); const feld = document.querySelector(\"#neu\"); const text = feld.value.trim();\n    if (!text) { document.querySelector(\"#meldung\").textContent = \"Bitte eine Aufgabe eingeben\"; return; }\n    aufgaben.push(text); feld.value = \"\"; document.querySelector(\"#meldung\").textContent = \"\"; speichern();\n  });\n  liste.addEventListener(\"click\", event => {\n    const button = event.target.closest(\"button\");\n    if (!button || !liste.contains(button)) return;\n    aufgaben.splice(Number(button.dataset.index), 1); speichern();\n  });\n  render();\n  return () => [...aufgaben];\n}",
    "explanation": "Diese Anwendung verbindet defensive JSON-Ladung, sichere Textausgabe, Event Delegation und Speicherung nach jeder Änderung. Lade nur eine Liste aus Strings und verwende [] bei kaputten Daten. Neue Aufgaben müssen nach trim nichtleer sein.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Meine Aufgaben</h2><form id=\"formular\"><input id=\"neu\" aria-label=\"Neue Aufgabe\" placeholder=\"Neue Aufgabe\"><button>Hinzufügen</button></form><p id=\"meldung\" aria-live=\"polite\"></p><ul id=\"liste\"></ul>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserTodo(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserTodo(daten) {\n  let aufgaben = [];\n  try { const wert = JSON.parse(localStorage.getItem(\"aufgaben\")); if (Array.isArray(wert) && wert.every(text => typeof text === \"string\")) aufgaben = wert; } catch {}\n  const liste = document.querySelector(\"#liste\");\n  function render() {\n    liste.replaceChildren();\n    aufgaben.forEach((text, index) => {\n      const li = document.createElement(\"li\");\n      const span = document.createElement(\"span\"); span.textContent = text;\n      const button = document.createElement(\"button\"); button.textContent = \"Löschen\"; button.dataset.index = String(index);\n      li.append(span, button); liste.append(li);\n    });\n  }\n  function speichern() { localStorage.setItem(\"aufgaben\", JSON.stringify(aufgaben)); render(); }\n  document.querySelector(\"#formular\").addEventListener(\"submit\", event => {\n    event.preventDefault(); const feld = document.querySelector(\"#neu\"); const text = feld.value.trim();\n    if (!text) { document.querySelector(\"#meldung\").textContent = \"Bitte eine Aufgabe eingeben\"; return; }\n    aufgaben.push(text); feld.value = \"\"; document.querySelector(\"#meldung\").textContent = \"\"; speichern();\n  });\n  liste.addEventListener(\"click\", event => {\n    const button = event.target.closest(\"button\");\n    if (!button || !liste.contains(button)) return;\n    aufgaben.splice(Number(button.dataset.index), 1); speichern();\n  });\n  render();\n  return () => [...aufgaben];\n}\n\nconst lesen = await browserTodo({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-browser-highscore",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Highscore-Spiel",
    "title": "Ein Spiel mit dauerhaftem Highscore bauen",
    "description": "Ein Spielstand gehört zur aktuellen Runde, der Highscore überlebt einen Neustart. Speichere nur geprüfte, nichtnegative ganze Werte.",
    "syntax": "const high = Math.max(high, punkte);\nlocalStorage.setItem(\"highscore\", String(high));",
    "parts": [
      [
        "Rundenpunkte",
        "Werden beim Neustart auf 0 gesetzt."
      ],
      [
        "Highscore",
        "Bleibt beim Neustart erhalten und wächst nur bei einem Rekord."
      ],
      [
        "Speicherprüfung",
        "Kaputte, leere oder negative Werte werden zu 0."
      ]
    ],
    "note": "In der Vorschau überlebt der isolierte Highscore auch das Neuladen der App. Der Lernfortschritt zählt das Projekt erst nach bestandenen Prüfungen.",
    "detail": "Pro Klick auf #treffer erhöhe Punkte um 1 und speichere einen neuen Highscore. #neustart setzt nur Punkte zurück. #stand zeigt \"Punkte: X · Highscore: Y\". Gib eine Lesefunktion mit {punkte, highscore} zurück.",
    "functionName": "browserHighscore",
    "parameter": "daten",
    "task": "Pro Klick auf #treffer erhöhe Punkte um 1 und speichere einen neuen Highscore. #neustart setzt nur Punkte zurück. #stand zeigt \"Punkte: X · Highscore: Y\". Gib eine Lesefunktion mit {punkte, highscore} zurück. Verändere daten nicht.",
    "tests": [
      {
        "input": {},
        "expected": {
          "punkte": 2,
          "highscore": 2
        },
        "actions": [
          {
            "selector": "#treffer",
            "type": "click"
          },
          {
            "selector": "#treffer",
            "type": "click"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": {
          "punkte": 0,
          "highscore": 5
        },
        "actions": [
          {
            "selector": "#treffer",
            "type": "click"
          },
          {
            "selector": "#neustart",
            "type": "click"
          }
        ],
        "browser": {
          "storage": {
            "highscore": "5"
          }
        }
      },
      {
        "input": {},
        "expected": {
          "punkte": 1,
          "highscore": 1
        },
        "actions": [
          {
            "selector": "#treffer",
            "type": "click"
          }
        ],
        "browser": {
          "storage": {
            "highscore": "kaputt"
          }
        }
      },
      {
        "input": {},
        "expected": {
          "punkte": 0,
          "highscore": 0
        },
        "actions": [],
        "browser": {
          "storage": {
            "highscore": "-2"
          }
        }
      }
    ],
    "hints": [
      "Werden beim Neustart auf 0 gesetzt.",
      "Arbeite mit den vorhandenen IDs im HTML. In der Vorschau überlebt der isolierte Highscore auch das Neuladen der App. Der Lernfortschritt zählt das Projekt erst nach bestandenen Prüfungen."
    ],
    "solution": "async function browserHighscore(daten) {\n  let punkte = 0;\n  const text = localStorage.getItem(\"highscore\"); const gelesen = Number(text);\n  let highscore = text !== null && text.trim() !== \"\" && Number.isInteger(gelesen) && gelesen >= 0 ? gelesen : 0;\n  const stand = document.querySelector(\"#stand\");\n  const render = () => { stand.textContent = `Punkte: ${punkte} · Highscore: ${highscore}`; };\n  document.querySelector(\"#treffer\").addEventListener(\"click\", () => {\n    punkte += 1; if (punkte > highscore) { highscore = punkte; localStorage.setItem(\"highscore\", String(highscore)); } render();\n  });\n  document.querySelector(\"#neustart\").addEventListener(\"click\", () => { punkte = 0; render(); });\n  render();\n  return () => ({ punkte, highscore });\n}",
    "explanation": "Ein Spielstand gehört zur aktuellen Runde, der Highscore überlebt einen Neustart. Speichere nur geprüfte, nichtnegative ganze Werte. In der Vorschau überlebt der isolierte Highscore auch das Neuladen der App. Der Lernfortschritt zählt das Projekt erst nach bestandenen Prüfungen.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Klick-Spiel</h2><p id=\"stand\" aria-live=\"polite\"></p><button id=\"treffer\">Treffer +1</button><button id=\"neustart\">Neue Runde</button>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "async function browserHighscore(daten) {\n  // Schreibe hier deine Lösung.\n}",
    "example": "async function browserHighscore(daten) {\n  let punkte = 0;\n  const text = localStorage.getItem(\"highscore\"); const gelesen = Number(text);\n  let highscore = text !== null && text.trim() !== \"\" && Number.isInteger(gelesen) && gelesen >= 0 ? gelesen : 0;\n  const stand = document.querySelector(\"#stand\");\n  const render = () => { stand.textContent = `Punkte: ${punkte} · Highscore: ${highscore}`; };\n  document.querySelector(\"#treffer\").addEventListener(\"click\", () => {\n    punkte += 1; if (punkte > highscore) { highscore = punkte; localStorage.setItem(\"highscore\", String(highscore)); } render();\n  });\n  document.querySelector(\"#neustart\").addEventListener(\"click\", () => { punkte = 0; render(); });\n  render();\n  return () => ({ punkte, highscore });\n}\n\nconst lesen = await browserHighscore({});\nconsole.log(typeof lesen === \"function\" ? lesen() : lesen);"
  },
  {
    "id": "js-browser-modules",
    "course": "js",
    "category": "Browser-Projekte",
    "name": "Projekt in Module aufteilen",
    "title": "Taschenrechner: Logik und Oberfläche trennen",
    "description": "Ein reines Rechenmodul kennt kein DOM. main.js verbindet Formulare und Ergebnisse durch einen lokalen Import.",
    "syntax": "import { berechne } from './rechner.js';",
    "parts": [
      [
        "rechner.js",
        "Prüft Eingaben und berechnet Ergebnisse ohne Zugriff auf die Oberfläche."
      ],
      [
        "main.js",
        "Verdrahtet das Formular und zeigt das Ergebnis."
      ],
      [
        "export / import",
        "Machen die Funktion zwischen den beiden Dateien verfügbar."
      ]
    ],
    "note": "Im Download startet start.js die Anwendung. Im Spielplatz startet der Runner den Export browserModules.",
    "detail": "Implementiere berechne in rechner.js und verbinde in main.js das Formular mit dem Rechenmodul.",
    "functionName": "browserModules",
    "parameter": "daten",
    "task": "Implementiere berechne(aText, bText, operation) in rechner.js. Leere oder nicht endliche Zahlen ergeben Ungültig, Division durch 0 ergibt Division durch 0. Verdrahte browserModules in main.js mit dem submit-Event. Gib einen Leser für #ergebnis.textContent zurück. Nichtendliche Rechenergebnisse ergeben ebenfalls Ungültig.",
    "tests": [
      {
        "input": {},
        "expected": "5",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "3"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": ""
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "3"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "0",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "0"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "*"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Division durch 0",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "7"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "0"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "/"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "5",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "9"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "4"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "-"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "12",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "3"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "4"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "*"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "-1",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "-3"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "+"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "Infinity"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "+"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "3.5",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "7"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "2"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "/"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      },
      {
        "input": {},
        "expected": "Ungültig",
        "actions": [
          {
            "selector": "#a",
            "type": "input",
            "value": "1e308"
          },
          {
            "selector": "#b",
            "type": "input",
            "value": "1e308"
          },
          {
            "selector": "#op",
            "type": "input",
            "value": "*"
          },
          {
            "selector": "#rechner",
            "type": "submit"
          }
        ],
        "browser": {}
      }
    ],
    "hints": [
      "Die reine Funktion kann später unabhängig vom DOM getestet werden.",
      "main.js fängt submit ab und schreibt den Rückgabewert von berechne in textContent."
    ],
    "solution": "import { berechne } from './rechner.js';\nexport async function browserModules(daten) {\n  const ausgabe = document.querySelector('#ergebnis');\n  document.querySelector('#rechner').addEventListener('submit', event => {\n    event.preventDefault();\n    ausgabe.textContent = berechne(document.querySelector('#a').value, document.querySelector('#b').value, document.querySelector('#op').value);\n  });\n  return () => ausgabe.textContent;\n}",
    "explanation": "Trenne Berechnung und Oberfläche. So kann dieselbe Rechenfunktion später in einer anderen UI oder in eigenen Tests verwendet werden.",
    "preserveInput": true,
    "browser": {
      "html": "<h2>Taschenrechner</h2><form id=\"rechner\"><input id=\"a\" aria-label=\"Erste Zahl\" placeholder=\"Erste Zahl\"><input id=\"b\" aria-label=\"Zweite Zahl\" placeholder=\"Zweite Zahl\"><select id=\"op\" aria-label=\"Operation\"><option value=\"+\">+</option><option value=\"-\">−</option><option value=\"*\">×</option><option value=\"/\">÷</option></select><button>Berechnen</button></form><p id=\"ergebnis\" aria-live=\"polite\">Bereit</p>",
      "fixtures": {},
      "storage": {}
    },
    "starter": "export async function browserModules(daten) {\n  // Verbinde das Formular mit berechne.\n}",
    "example": "import { berechne } from './rechner.js';\nexport async function browserModules(daten) {\n  const ausgabe = document.querySelector('#ergebnis');\n  document.querySelector('#rechner').addEventListener('submit', event => {\n    event.preventDefault();\n    ausgabe.textContent = berechne(document.querySelector('#a').value, document.querySelector('#b').value, document.querySelector('#op').value);\n  });\n  return () => ausgabe.textContent;\n}",
    "solutionFiles": {
      "main.js": "import { berechne } from './rechner.js';\nexport async function browserModules(daten) {\n  const ausgabe = document.querySelector('#ergebnis');\n  document.querySelector('#rechner').addEventListener('submit', event => {\n    event.preventDefault();\n    ausgabe.textContent = berechne(document.querySelector('#a').value, document.querySelector('#b').value, document.querySelector('#op').value);\n  });\n  return () => ausgabe.textContent;\n}",
      "rechner.js": "export function berechne(aText, bText, operation) {\n  if (aText.trim() === '' || bText.trim() === '') return 'Ungültig';\n  const a = Number(aText), b = Number(bText);\n  if (!Number.isFinite(a) || !Number.isFinite(b)) return 'Ungültig';\n  if (operation === '/' && b === 0) return 'Division durch 0';\n  const wert = operation === '+' ? a + b : operation === '-' ? a - b : operation === '*' ? a * b : a / b;\n  return Number.isFinite(wert) ? String(wert) : 'Ungültig';\n}"
    },
    "exampleFiles": {
      "main.js": "import { berechne } from './rechner.js';\nexport async function browserModules(daten) {\n  const ausgabe = document.querySelector('#ergebnis');\n  document.querySelector('#rechner').addEventListener('submit', event => {\n    event.preventDefault();\n    ausgabe.textContent = berechne(document.querySelector('#a').value, document.querySelector('#b').value, document.querySelector('#op').value);\n  });\n  return () => ausgabe.textContent;\n}",
      "rechner.js": "export function berechne(aText, bText, operation) {\n  if (aText.trim() === '' || bText.trim() === '') return 'Ungültig';\n  const a = Number(aText), b = Number(bText);\n  if (!Number.isFinite(a) || !Number.isFinite(b)) return 'Ungültig';\n  if (operation === '/' && b === 0) return 'Division durch 0';\n  const wert = operation === '+' ? a + b : operation === '-' ? a - b : operation === '*' ? a * b : a / b;\n  return Number.isFinite(wert) ? String(wert) : 'Ungültig';\n}"
    },
    "starterFiles": {
      "main.js": "import { berechne } from './rechner.js';\nexport async function browserModules(daten) {\n  // Verdrahte das Formular.\n}",
      "rechner.js": "export function berechne(aText, bText, operation) {\n  // Prüfe die Zahlen und berechne das Ergebnis.\n}"
    }
  }
];
