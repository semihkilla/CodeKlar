function lesson(data) {
  return {
    course: "js", category: "Bäume", preserveInput: true, ...data,
    starter: `function ${data.functionName}(${data.parameter}) {\n  // Schreibe hier deine Lösung.\n}\n\nconsole.log(${data.functionName}(${JSON.stringify(data.tests[0].input)}));`,
    example: `${data.solution}\n\nconsole.log(${data.functionName}(${JSON.stringify(data.tests[0].input)}));`,
  };
}
const node = (wert, links = null, rechts = null) => ({ wert, links, rechts });
const inputs = () => [
  node("A", node("B"), node("C")),
  null,
  node(0),
  node(1, null, node(2, null, node(3))),
  node(0, node(false), node(null)),
  node(5, node(8, node(3)), node(1, null, node(2))),
  node("A", node("A"), node("B")),
];
const cases = (expected) => inputs().map((input, i) => ({ input, expected: expected[i] }));

export const treeLessons = [
  lesson({
    id: "js-tree-count", name: "Knoten zählen", title: "Binärbäume verstehen und ihre Knoten zählen",
    description: "Ein Binärbaum besteht aus Knoten mit höchstens zwei Kindern. Jeder Teilbaum hat dieselbe Struktur wie der gesamte Baum und kann rekursiv verarbeitet werden.",
    syntax: "const baum = {\n  wert: 'A',\n  links: { wert: 'B', links: null, rechts: null },\n  rechts: { wert: 'C', links: null, rechts: null }\n};\n// A\n// ├─ links: B\n// └─ rechts: C",
    parts: [["Wurzel", "Der oberste Knoten, von dem aus du den Baum erreichst."], ["links und rechts", "Referenzen auf die beiden Teilbäume; null bedeutet, dass ein Kind fehlt."], ["Blatt", "Ein Knoten ohne Kinder: links und rechts sind null."], ["1 + links + rechts", "Zählt die Wurzel und die Knoten beider Teilbäume."], ["baum === null", "Der leere Baum ist der Basisfall und enthält 0 Knoten."]],
    note: "links und rechts sind gewählte Objekteigenschaften, keine eingebauten JavaScript-Methoden. Ein Binärbaum ist nicht automatisch ein binärer Suchbaum; die Werte sind hier nicht nach Größe geordnet.",
    detail: "Ein Knoten darf kein, ein oder zwei Kinder besitzen. Ein Baum hat in dieser Aufgabe weder Zyklen noch gemeinsam genutzte Kindknoten: Jeder vorhandene Knoten wird genau einmal erreicht. wert kann auch 0, false oder null sein. Nur die Baumreferenz null bedeutet, dass kein Knoten vorhanden ist.",
    functionName: "baumKnoten", parameter: "baum",
    task: "Schreibe baumKnoten(baum). Zähle alle Knoten des Binärbaums {wert, links, rechts}. Ein leerer Baum ist null und ergibt 0. Jeder vorhandene Knoten zählt 1, unabhängig von seinem Wert. Addiere die Anzahlen des linken und rechten Teilbaums. Verändere keinen Knoten.",
    tests: cases([3, 0, 1, 3, 3, 5, 3]),
    hints: ["Prüfe zuerst baum === null und gib dann 0 zurück.", "Ein vorhandener Knoten ergibt 1 + baumKnoten(baum.links) + baumKnoten(baum.rechts)."],
    solution: "function baumKnoten(baum) {\n  if (baum === null) return 0;\n  return 1 + baumKnoten(baum.links) + baumKnoten(baum.rechts);\n}",
    explanation: "Der leere Teilbaum liefert 0. Jeder vorhandene Knoten ergänzt 1 und lässt beide Teilbäume nach derselben Regel zählen. Dadurch werden auch einseitige Bäume und Knoten mit falsy-Werten vollständig erfasst.",
  }),
  lesson({
    id: "js-tree-height", name: "Höhe bestimmen", title: "Die Höhe eines Baums mit Math.max berechnen",
    description: "Die Höhe beschreibt hier die Anzahl der Knoten auf dem längsten Weg von der Wurzel bis zu einem Blatt. Entscheidend ist der höhere Teilbaum, nicht die Summe beider Seiten.",
    syntax: "if (baum === null) return 0;\nreturn 1 + Math.max(baumHoehe(baum.links), baumHoehe(baum.rechts));",
    parts: [["Leerer Baum: 0", "Ohne Knoten gibt es keinen Weg mit einem Knoten."], ["Blatt: 1", "Ein einzelner Knoten ist eine Ebene hoch."], ["Math.max(a, b)", "Liefert die größere der beiden berechneten Höhen."], ["1 + …", "Ergänzt die Ebene des aktuellen Knotens."]],
    note: "Manche Bücher messen Höhe in Kanten statt Knoten. Diese Aufgabe zählt ausdrücklich Knoten: null hat Höhe 0, ein Blatt Höhe 1. Die Knotenzahl eines Baums ist etwas anderes als seine Höhe.",
    detail: "Ein Baum mit Wurzel und zwei Blättern enthält 3 Knoten, ist aber nur 2 Ebenen hoch. Eine Kette aus 3 Knoten ist 3 Ebenen hoch. Rekursion berechnet beide Teilhöhen; Math.max wählt den längeren Weg. Kurze, gültige Bäume ohne Zyklen werden verwendet.",
    functionName: "baumHoehe", parameter: "baum",
    task: "Schreibe baumHoehe(baum). Gib die Höhe als Anzahl der Knoten auf dem längsten Wurzel-Blatt-Weg zurück. null ergibt 0, ein Blatt 1. Verwende zum Üben 1 + Math.max(linkeHoehe, rechteHoehe). Verändere den Baum nicht.",
    tests: cases([2, 0, 1, 3, 2, 3, 2]),
    hints: ["Der Basisfall ist baum === null mit Rückgabe 0.", "Berechne die Höhe beider Teilbäume rekursiv, wähle Math.max und ergänze 1."],
    solution: "function baumHoehe(baum) {\n  if (baum === null) return 0;\n  return 1 + Math.max(baumHoehe(baum.links), baumHoehe(baum.rechts));\n}",
    explanation: "Jeder Aufruf ermittelt die längste Strecke innerhalb seines Teilbaums. Die größere Teilhöhe plus die aktuelle Ebene ergibt die Gesamthöhe. Addieren beider Teilhöhen würde Seitenzweige mitzählen, die nicht auf einem einzigen Weg liegen.",
  }),
  lesson({
    id: "js-tree-preorder", name: "Preorder", title: "Einen Baum in Preorder durchlaufen",
    description: "Preorder liest zuerst die Wurzel, danach den linken und schließlich den rechten Teilbaum. Dieselbe Regel gilt an jedem Knoten.",
    syntax: "if (baum === null) return [];\nreturn [baum.wert, ...preorder(baum.links), ...preorder(baum.rechts)];",
    parts: [["Preorder", "Reihenfolge: Wurzel → links → rechts."], ["baum.wert", "Der Wert des aktuellen Knotens steht zuerst in seiner Teilbaum-Ausgabe."], ["...preorder(baum.links)", "Übernimmt alle Werte des linken Teilbaums."], ["...preorder(baum.rechts)", "Übernimmt danach alle Werte des rechten Teilbaums."], ["[]", "Der leere Teilbaum trägt keine Werte zur Ausgabe bei."]],
    note: "Spread ... übernimmt Arrayelemente, statt ein Unterarray einzufügen. [baum.wert, preorder(baum.links)] wäre daher ein verschachteltes Ergebnis. Auch null als Knotenwert gehört in die Ausgabe.",
    detail: "Bei einer Wurzel A mit linkem Blatt B und rechtem Blatt C ergibt sich [A, B, C]. Preorder ist eine Variante der Tiefensuche und verarbeitet Eltern vor ihren Kindern. Die Ausgabe bewahrt die Baumstruktur als Besuchsreihenfolge, nicht als vollständige Serialisierung: Ohne weitere Strukturinformationen lässt sich daraus nicht jeder Baum eindeutig rekonstruieren.",
    functionName: "preorder", parameter: "baum",
    task: "Schreibe preorder(baum). Gib ein flaches Array aller Knotenwerte in der Reihenfolge Wurzel, linker Teilbaum, rechter Teilbaum zurück. Wiederhole diese Regel rekursiv. Bei null gib [] zurück. Erhalte Werttypen, Duplikate und den unveränderten Baum.",
    tests: cases([["A", "B", "C"], [], [0], [1, 2, 3], [0, false, null], [5, 8, 3, 1, 2], ["A", "A", "B"]]),
    hints: ["Der Basisfall null liefert ein leeres Array.", "Stelle baum.wert vor ...preorder(baum.links) und ...preorder(baum.rechts)."],
    solution: "function preorder(baum) {\n  if (baum === null) return [];\n  return [baum.wert, ...preorder(baum.links), ...preorder(baum.rechts)];\n}",
    explanation: "Jeder Teilbaum liefert ein eigenes Array in Preorder. Das Ergebnis beginnt mit dem aktuellen Wert und übernimmt anschließend die beiden Teilbaum-Ausgaben. Fehlende Kinder tragen leere Arrays bei.",
  }),
  lesson({
    id: "js-tree-inorder", name: "Inorder", title: "Einen Baum in Inorder durchlaufen",
    description: "Inorder besucht zuerst den linken Teilbaum, dann die Wurzel und zuletzt den rechten Teilbaum. Schon diese kleine Änderung erzeugt eine andere Reihenfolge als Preorder.",
    syntax: "if (baum === null) return [];\nreturn [...inorder(baum.links), baum.wert, ...inorder(baum.rechts)];",
    parts: [["Inorder", "Reihenfolge: links → Wurzel → rechts."], ["linker Teilbaum", "Wird vollständig gelesen, bevor der aktuelle Knotenwert ausgegeben wird."], ["baum.wert", "Steht zwischen den Ausgaben beider Teilbäume."], ["rechter Teilbaum", "Wird nach dem aktuellen Knotenwert gelesen."]],
    note: "Inorder liefert nur bei einem passend geordneten binären Suchbaum eine sortierte Folge. Diese Aufgabe verwendet allgemeine Binärbäume; sortiere die Ausgabe deshalb nicht.",
    detail: "Die Wurzel A mit linkem Blatt B und rechtem Blatt C ergibt [B, A, C]. An jedem Kind wird dieselbe Inorder-Regel wiederholt. Preorder, Inorder und später Postorder unterscheiden sich darin, wann der aktuelle Knoten im Verhältnis zu seinen Teilbäumen verarbeitet wird.",
    functionName: "inorder", parameter: "baum",
    task: "Schreibe inorder(baum). Gib ein flaches Array aller Werte in der Reihenfolge linker Teilbaum, Wurzel, rechter Teilbaum zurück. Ein leerer Baum ergibt []. Sortiere die Werte nicht und verändere keinen Knoten. Bewahre alle Werttypen.",
    tests: cases([["B", "A", "C"], [], [0], [1, 2, 3], [false, 0, null], [3, 8, 5, 1, 2], ["A", "A", "B"]]),
    hints: ["Behandle zuerst den leeren Baum mit return [].", "Setze die Ausgabe zusammen als [...inorder(baum.links), baum.wert, ...inorder(baum.rechts)]."],
    solution: "function inorder(baum) {\n  if (baum === null) return [];\n  return [...inorder(baum.links), baum.wert, ...inorder(baum.rechts)];\n}",
    explanation: "Der linke Teilbaum liefert seine Werte vor dem aktuellen Knoten. Der rechte Teilbaum folgt danach. Die Reihenfolge ergibt sich aus den Verweisen im Baum, nicht aus einer numerischen oder lexikografischen Sortierung.",
  }),
];
