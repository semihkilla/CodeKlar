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
];
