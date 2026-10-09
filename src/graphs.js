function lesson(data) {
  return {
    course: "js", category: "Graphen", preserveInput: true, ...data,
    starter: `function ${data.functionName}(${data.parameter}) {\n  // Schreibe hier deine Lösung.\n}\n\nconsole.log(${data.functionName}(${JSON.stringify(data.tests[0].input)}));`,
    example: `${data.solution}\n\nconsole.log(${data.functionName}(${JSON.stringify(data.tests[0].input)}));`,
  };
}

export const graphLessons = [
  lesson({
    id: "js-graph-neighbors", name: "Nachbarlisten", title: "Einen Graphen über seine Nachbarlisten lesen",
    description: "Ein Graph verbindet Knoten durch Kanten. Eine Nachbarliste ordnet jedem Knotennamen die direkt erreichbaren Nachbarn zu; anders als bei einem Baum sind Zyklen und mehrere Wege möglich.",
    syntax: "const graph = { A: ['B', 'C'], B: ['A'], C: [] };\n// A → B, A → C, B → A\nif (!Object.hasOwn(graph, name)) return [];\nreturn [...graph[name]];",
    parts: [["Knotenname", "Hier ein String und zugleich ein eigener Objektschlüssel."], ["graph[name]", "Liest die direkten Nachbarn unter einem dynamischen Schlüssel."], ["gerichtete Kante", "A → B erlaubt den Weg von A nach B; der Rückweg ist eine eigene Kante."], ["Object.hasOwn(graph, name)", "Prüft eigene Einträge, ohne geerbte Eigenschaften als Knoten zu behandeln."], ["[...nachbarn]", "Erzeugt eine neue Liste statt das gespeicherte Array zu verändern."]],
    note: "Eine leere Nachbarliste bedeutet: Der Knoten existiert, hat aber keine ausgehenden Kanten. Ein fehlender Knoten ist etwas anderes; diese erste Aufgabe gibt für beide Fälle [] zurück.",
    detail: "Die Eingabe ist ein gerichteter Graph mit Stringnamen. Alle genannten Nachbarn sind als eigene Schlüssel vorhanden. Eine Kante darf mehrfach aufgeführt sein und ein Knoten darf auf sich selbst zeigen. Für einen ungerichteten Graphen würdest du beide Richtungen eintragen. Namen wie constructor sind nur dann Knoten, wenn sie eigene Einträge sind.",
    functionName: "graphNachbarn", parameter: "daten",
    task: "Schreibe graphNachbarn(daten) für {graph, name}. Gib eine neue Liste der direkten Nachbarn in gespeicherter Reihenfolge zurück. Erhalte auch doppelte Kanten. Bei fehlendem eigenen Knoteneintrag gib [] zurück. Verändere graph und seine Nachbarlisten nicht.",
    tests: [{ input: { graph: { A: ["B", "C"], B: [], C: [] }, name: "A" }, expected: ["B", "C"] }, { input: { graph: { A: [] }, name: "A" }, expected: [] }, { input: { graph: { A: [] }, name: "X" }, expected: [] }, { input: { graph: {}, name: "constructor" }, expected: [] }, { input: { graph: { A: ["B", "B", "A"], B: [] }, name: "A" }, expected: ["B", "B", "A"] }, { input: { graph: { ["__proto__"]: ["constructor"], constructor: [] }, name: "__proto__" }, expected: ["constructor"] }],
    hints: ["Prüfe zuerst Object.hasOwn(daten.graph, daten.name).", "Kopiere den eigenen Eintrag mit [...daten.graph[daten.name]]. Sortieren oder Entfernen von Duplikaten ist hier nicht verlangt."],
    solution: "function graphNachbarn(daten) {\n  if (!Object.hasOwn(daten.graph, daten.name)) return [];\n  return [...daten.graph[daten.name]];\n}",
    explanation: "hasOwn unterscheidet tatsächliche Knoten von geerbten Objekteigenschaften. Spread erstellt ein neues Array mit derselben Reihenfolge und allen Kanten. Es werden nur direkte Nachbarn gelesen, nicht sämtliche erreichbaren Knoten.",
  }),
  lesson({
    id: "js-graph-bfs", name: "BFS mit Set", title: "Einen Graphen trotz Zyklen mit Breitensuche durchlaufen",
    description: "Graphen können einen Knoten über mehrere Wege oder Zyklen erreichen. Eine Besuchsmenge verhindert doppelte Besuche und eine Queue erhält die Breitensuch-Reihenfolge.",
    syntax: "const gesehen = new Set([start]);\nfor (const nachbar of graph[name]) {\n  if (!gesehen.has(nachbar)) {\n    gesehen.add(nachbar);\n    queue.push(nachbar);\n  }\n}",
    parts: [["Set", "Speichert bereits entdeckte Knotennamen einmalig."], [".has(nachbar)", "Prüft, ob ein Knoten schon entdeckt wurde."], [".add(nachbar)", "Markiert vor dem Einreihen, damit mehrere Eltern ihn nicht mehrfach einreihen."], ["Queue mit Kopfindex", "Verarbeitet entdeckte Knoten nach FIFO."], ["graph[name]", "Liefert die Nachbarn des aktuellen Knotens in ihrer vorgegebenen Reihenfolge."]],
    note: "Markiere einen Knoten bereits beim Einreihen, nicht erst nach dem Verarbeiten. Auch den Startknoten musst du sofort markieren, sonst kann ein Rückweg ihn erneut einreihen.",
    detail: "Die Aufgabe verwendet gerichtete Nachbarlisten mit Stringnamen, einschließlich leerem String und Namen wie __proto__. Alle Kanten zeigen auf vorhandene eigene Knoten. Selbstschleifen, doppelte Kanten und getrennte Komponenten sind erlaubt. Nur vom Start aus erreichbare Knoten erscheinen; eine getrennte Komponente bleibt unbesucht.",
    functionName: "graphBreitensuche", parameter: "daten",
    task: "Schreibe graphBreitensuche(daten) für {graph, start}. Gib alle vom Start erreichbaren Knotennamen genau einmal in BFS-Reihenfolge zurück. Halte beim Einreihen die Reihenfolge der Nachbarlisten ein. Fehlt start als eigener Schlüssel, gib [] zurück. Verwende zum Üben eine FIFO-Queue und ein Set. Verändere keine Nachbarliste.",
    tests: [
      { input: { graph: { A: ["B", "C"], B: ["D"], C: ["D"], D: [], X: [] }, start: "A" }, expected: ["A", "B", "C", "D"] },
      { input: { graph: { A: ["B"], B: ["C"], C: ["B", "A"] }, start: "A" }, expected: ["A", "B", "C"] },
      { input: { graph: { A: ["A", "B", "B"], B: [] }, start: "A" }, expected: ["A", "B"] },
      { input: { graph: { A: [], X: [] }, start: "A" }, expected: ["A"] },
      { input: { graph: {}, start: "constructor" }, expected: [] },
      { input: { graph: { "": ["0"], "0": [] }, start: "" }, expected: ["", "0"] },
      { input: { graph: { ["__proto__"]: ["constructor"], constructor: [] }, start: "__proto__" }, expected: ["__proto__", "constructor"] },
    ],
    hints: ["Behandle einen fehlenden Start mit Object.hasOwn. Beginne sonst mit queue = [start], gesehen = new Set([start]), kopf = 0 und einer leeren Ausgabe.", "Verarbeite Queueeinträge nacheinander. Sammle den Namen und reihe nur noch nicht gesehene Nachbarn ein. Setze die Markierung vor queue.push."],
    solution: "function graphBreitensuche(daten) {\n  const { graph, start } = daten;\n  if (!Object.hasOwn(graph, start)) return [];\n  const queue = [start];\n  const gesehen = new Set([start]);\n  const reihenfolge = [];\n  let kopf = 0;\n  while (kopf < queue.length) {\n    const name = queue[kopf];\n    kopf += 1;\n    reihenfolge.push(name);\n    for (const nachbar of graph[name]) {\n      if (!gesehen.has(nachbar)) {\n        gesehen.add(nachbar);\n        queue.push(nachbar);\n      }\n    }\n  }\n  return reihenfolge;\n}",
    explanation: "Das Set markiert jeden Namen beim Entdecken genau einmal. Dadurch führen weder Rückkanten noch doppelte Wege zu erneuten Besuchen. Die Queue sorgt für kürzere Wege zuerst; die Reihenfolge innerhalb einer Ebene folgt den Nachbarlisten.",
  }),
  lesson({
    "id": "js-graph-dfs",
    "name": "Tiefensuche",
    "title": "Mit Tiefensuche einen Weg vollständig erkunden",
    "description": "Tiefensuche (DFS) folgt einem Nachbarn zuerst bis zum Ende, bevor sie zum nächsten Zweig zurückkehrt. So kannst du verbundene Spielräume oder Abhängigkeiten erkunden.",
    "syntax": "const gesehen = new Set();\nfunction besuche(name) {\n  if (gesehen.has(name)) return;\n  gesehen.add(name);\n  ausgabe.push(name);\n  for (const nachbar of graph[name]) besuche(nachbar);\n}",
    "parts": [
        [
            "Rekursion",
            "besuche ruft sich für jeden Nachbarn erneut auf; nach der Rückkehr geht die vorherige Schleife weiter."
        ],
        [
            "gesehen.has(name)",
            "Prüft vor dem Besuch, ob dieser Name bereits verarbeitet wurde."
        ],
        [
            "gesehen.add(name)",
            "Markiert den Knoten vor den rekursiven Aufrufen, damit Rückkanten nicht endlos weiterlaufen."
        ],
        [
            "return ohne Wert",
            "Beendet nur den aktuellen Funktionsaufruf. Die äußere Suche läuft weiter."
        ],
        [
            "ausgabe.push(name)",
            "Speichert den Knoten beim ersten Betreten: DFS-Preorder."
        ]
    ],
    "note": "Bei A → B,C und B → D lautet DFS A,B,D,C; BFS würde A,B,C,D ergeben. Die Nachbarreihenfolge entscheidet, welcher Zweig zuerst erkundet wird.",
    "detail": "Die Eingabe enthält gerichtete Nachbarlisten mit eigenen String-Schlüsseln. Jeder Nachbar existiert als eigener Knoten. Zyklen, Selbstschleifen und doppelte Kanten sind erlaubt. Durchlaufe Nachbarn in ihrer gespeicherten Reihenfolge. Diese rekursive Lösung eignet sich für kleine Graphen; bei sehr tiefen Graphen kann der JavaScript-Aufrufstack überlaufen. Eine iterative Suche mit eigenem Stack ist eine spätere Alternative.",
    "functionName": "graphTiefensuche",
    "parameter": "daten",
    "task": "Schreibe graphTiefensuche(daten) für {graph, start}. Gib jeden vom Start erreichbaren Knotennamen genau einmal in rekursiver DFS-Preorder zurück. Folge den Nachbarlisten von links nach rechts. Bei fehlendem eigenen Startknoten gib [] zurück. Verändere die Eingabe nicht.",
    "tests": [
        {
            "input": {
                "graph": {
                    "A": [
                        "B",
                        "C"
                    ],
                    "B": [
                        "D"
                    ],
                    "C": [
                        "D"
                    ],
                    "D": [],
                    "X": []
                },
                "start": "A"
            },
            "expected": [
                "A",
                "B",
                "D",
                "C"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": [
                        "B"
                    ],
                    "B": [
                        "C"
                    ],
                    "C": [
                        "B",
                        "A"
                    ]
                },
                "start": "A"
            },
            "expected": [
                "A",
                "B",
                "C"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": [
                        "A",
                        "B",
                        "B"
                    ],
                    "B": []
                },
                "start": "A"
            },
            "expected": [
                "A",
                "B"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": []
                },
                "start": "A"
            },
            "expected": [
                "A"
            ]
        },
        {
            "input": {
                "graph": {},
                "start": "constructor"
            },
            "expected": []
        },
        {
            "input": {
                "graph": {
                    "": [
                        "0"
                    ],
                    "0": []
                },
                "start": ""
            },
            "expected": [
                "",
                "0"
            ]
        },
        {
            "input": {
                "graph": {
                    ["__proto__"]: [
                        "constructor"
                    ],
                    "constructor": []
                },
                "start": "__proto__"
            },
            "expected": [
                "__proto__",
                "constructor"
            ]
        }
    ],
    "hints": [
        "Prüfe den Start mit Object.hasOwn. Lege danach ein Set und ein Ergebnisarray an.",
        "Schreibe eine innere Funktion besuche(name). Kehre bei bereits gesehenen Namen zurück; sonst markiere den Namen, sammle ihn und besuche seine Nachbarn."
    ],
    "solution": "function graphTiefensuche(daten) {\n  const { graph, start } = daten;\n  if (!Object.hasOwn(graph, start)) return [];\n  const gesehen = new Set();\n  const ausgabe = [];\n  function besuche(name) {\n    if (gesehen.has(name)) return;\n    gesehen.add(name);\n    ausgabe.push(name);\n    for (const nachbar of graph[name]) {\n      besuche(nachbar);\n    }\n  }\n  besuche(start);\n  return ausgabe;\n}",
    "explanation": "besuche(A) sammelt A und ruft besuche(B) auf. B besucht D vollständig. Erst wenn diese Aufrufe zurückkehren, verarbeitet A seinen Nachbarn C. Das Set verhindert, dass D über C erneut erscheint. Jeder erreichbare Knoten und jede seiner Kanten wird einmal verarbeitet: O(V + E). Das Ergebnis ist eine Besuchsreihenfolge, kein durchgehend begehbarer Pfad."
}),
  lesson({
    "id": "js-graph-shortest",
    "name": "Kürzester Weg",
    "title": "Mit BFS den kürzesten Weg zwischen zwei Knoten finden",
    "description": "Eine Breitensuche kann mehr als Knoten sammeln: Merke dir, von welchem Vorgänger du jeden Knoten entdeckt hast, und rekonstruiere daraus einen Weg. Das ist eine Grundlage für Routen in Spielen.",
    "syntax": "const vorgaenger = new Map([[start, null]]);\nif (!vorgaenger.has(nachbar)) {\n  vorgaenger.set(nachbar, name);\n  queue.push(nachbar);\n}\n// Vom Ziel über .get() zurückgehen, dann den Pfad umdrehen.\npfad.reverse();",
    "parts": [
        [
            "new Map([[start, null]])",
            "Legt einen Eintrag an: Der Start ist bereits entdeckt und hat keinen Vorgänger."
        ],
        [
            ".has(nachbar)",
            "Prüft die Anwesenheit eines Schlüssels, unabhängig vom gespeicherten Wert. Die Map ersetzt hier ein separates Besuchs-Set."
        ],
        [
            ".set(nachbar, name)",
            "Merkt sich den ersten Vorgänger. Überschreibe ihn bei einem späteren Besuch nicht."
        ],
        [
            ".get(name)",
            "Liest den Vorgänger, um vom Ziel zurück zum Start zu gehen."
        ],
        [
            ".reverse()",
            "Dreht das selbst angelegte Pfadarray um. reverse verändert dieses Array; die Eingabegraphen bleiben unverändert."
        ]
    ],
    "note": "BFS findet hier den Weg mit den wenigsten Kanten. Das gilt für ungewichtete Graphen: Straßenlängen oder unterschiedliche Bewegungskosten benötigen andere Verfahren, etwa Dijkstra.",
    "detail": "Alle Nachbarn sind vorhandene eigene Knoten, alle Namen Strings. Richtung und Nachbarreihenfolge gelten wie in der BFS-Lektion. Gibt es mehrere gleich kurze Wege, wähle den zuerst durch BFS entdeckten Weg. Ein fehlender Start, ein fehlendes Ziel oder ein unerreichbares Ziel ergibt []. Sind Start und Ziel derselbe vorhandene Knoten, ist der Weg [start]. Der Start hat null als Vorgänger; der leere String ist ein gültiger Name und darf die Rückverfolgung nicht vorzeitig beenden.",
    "functionName": "kuerzesterWeg",
    "parameter": "daten",
    "task": "Schreibe kuerzesterWeg(daten) für {graph, start, ziel}. Gib den kürzesten Weg als Array mit Start und Ziel zurück. Bei gleich kurzen Wegen entscheidet die gespeicherte Nachbarreihenfolge während BFS. Gib [] zurück, wenn ein Endpunkt fehlt oder kein gerichteter Weg existiert. Verändere die Eingabe nicht.",
    "tests": [
        {
            "input": {
                "graph": {
                    "A": [
                        "B",
                        "C"
                    ],
                    "B": [
                        "D"
                    ],
                    "C": [
                        "Z"
                    ],
                    "D": [
                        "Z"
                    ],
                    "Z": []
                },
                "start": "A",
                "ziel": "Z"
            },
            "expected": [
                "A",
                "C",
                "Z"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": [
                        "B",
                        "C"
                    ],
                    "B": [
                        "Z"
                    ],
                    "C": [
                        "Z"
                    ],
                    "Z": []
                },
                "start": "A",
                "ziel": "Z"
            },
            "expected": [
                "A",
                "B",
                "Z"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": [
                        "B"
                    ],
                    "B": [
                        "C"
                    ],
                    "C": [
                        "A",
                        "Z"
                    ],
                    "Z": []
                },
                "start": "A",
                "ziel": "Z"
            },
            "expected": [
                "A",
                "B",
                "C",
                "Z"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": [
                        "A",
                        "B",
                        "B"
                    ],
                    "B": []
                },
                "start": "A",
                "ziel": "B"
            },
            "expected": [
                "A",
                "B"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": []
                },
                "start": "A",
                "ziel": "A"
            },
            "expected": [
                "A"
            ]
        },
        {
            "input": {
                "graph": {
                    "A": [],
                    "Z": []
                },
                "start": "A",
                "ziel": "Z"
            },
            "expected": []
        },
        {
            "input": {
                "graph": {},
                "start": "constructor",
                "ziel": "constructor"
            },
            "expected": []
        },
        {
            "input": {
                "graph": {
                    "A": []
                },
                "start": "A",
                "ziel": "X"
            },
            "expected": []
        },
        {
            "input": {
                "graph": {
                    "A": []
                },
                "start": "X",
                "ziel": "A"
            },
            "expected": []
        },
        {
            "input": {
                "graph": {
                    "": [
                        "0"
                    ],
                    "0": [
                        "Z"
                    ],
                    "Z": []
                },
                "start": "",
                "ziel": "Z"
            },
            "expected": [
                "",
                "0",
                "Z"
            ]
        },
        {
            "input": {
                "graph": {
                    ["__proto__"]: [
                        "constructor"
                    ],
                    "constructor": []
                },
                "start": "__proto__",
                "ziel": "constructor"
            },
            "expected": [
                "__proto__",
                "constructor"
            ]
        }
    ],
    "hints": [
        "Prüfe beide Endpunkte mit Object.hasOwn. Starte eine Queue mit start und eine Map mit dem Eintrag [start, null]. Markiere Nachbarn schon beim Einreihen.",
        "Wenn ziel gefunden ist, gehe mit vorgaenger.get vom Ziel rückwärts. Sammle Namen, bis name === null ist, und drehe danach das neue Array um."
    ],
    "solution": "function kuerzesterWeg(daten) {\n  const { graph, start, ziel } = daten;\n  if (!Object.hasOwn(graph, start) || !Object.hasOwn(graph, ziel)) return [];\n  const queue = [start];\n  const vorgaenger = new Map([[start, null]]);\n  let kopf = 0;\n  while (kopf < queue.length) {\n    const name = queue[kopf];\n    kopf += 1;\n    if (name === ziel) {\n      const pfad = [];\n      let schritt = ziel;\n      while (schritt !== null) {\n        pfad.push(schritt);\n        schritt = vorgaenger.get(schritt);\n      }\n      return pfad.reverse();\n    }\n    for (const nachbar of graph[name]) {\n      if (!vorgaenger.has(nachbar)) {\n        vorgaenger.set(nachbar, name);\n        queue.push(nachbar);\n      }\n    }\n  }\n  return [];\n}",
    "explanation": "Im ersten Beispiel entdeckt BFS B und C, dann D über B und Z über C. Z bekommt C als Vorgänger, weil dieser Weg nur zwei Kanten hat; der längere Weg über D überschreibt ihn nicht. Die Rückverfolgung sammelt Z,C,A und reverse macht daraus A,C,Z. null markiert ausschließlich das Ende der Vorgängerkette, nicht ein falsy-Test. Queue und Map benötigen O(V) zusätzlichen Speicher; die Suche benötigt höchstens O(V + E) Zeit."
}),
];
