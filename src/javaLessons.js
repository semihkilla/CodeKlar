import curriculum from './javaCurriculum.json' with { type: 'json' };

const vocabulary = [
  [/\bParameter|\bArgument/, 'Parameter und Argument', 'Ein Parameter ist eine Variable in der Methodendefinition. Ein Argument ist der konkrete Wert beim Aufruf.'],
  [/\bReferenz/, 'Referenz', 'Ein Wert, über den ein Objekt erreicht wird. Eine Referenzkopie ist keine Kopie des Objekts.'],
  [/\bInstanz|\bKonstruktor/, 'Instanz', 'Ein konkretes Objekt einer Klasse. Ein Konstruktor setzt seinen Anfangszustand.'],
  [/\bstatic/, 'static', 'Gehört zur Klasse statt zum unabhängigen Zustand einer einzelnen Instanz.'],
  [/\bfinal/, 'final', 'Verhindert eine neue Zuweisung an die Variable; macht enthaltene Objekte nicht automatisch unveränderlich.'],
  [/\bIndex|\bIndizes/, 'Index', 'Eine Position in einer Folge. Arrays, Listen und String-Codeeinheiten beginnen in Java bei Index 0.'],
  [/\bStream|\bPipeline/, 'Stream', 'Eine einmal verwendbare Verarbeitungspipeline. Zwischenoperationen werden durch eine Endoperation angestoßen.'],
  [/\bLambda/, 'Lambda', 'Eine kompakte Implementierung eines funktionalen Interfaces. Dessen abstrakte Methode legt die Signatur fest.'],
  [/\bAusnahme|Exception/, 'Ausnahme', 'Ein Fehler- oder Sonderzustand, der den normalen Ablauf unterbricht und gezielt behandelt werden kann.'],
  [/\bKodierung|UTF-8/, 'Kodierung', 'Regeln, die Textzeichen als Bytes darstellen und beim Lesen wieder zurückwandeln.'],
  [/\bThread/, 'Thread', 'Ein Ausführungsstrang innerhalb eines Prozesses. Gemeinsame veränderbare Daten benötigen passende Koordination.'],
  [/\bO\(/, 'Komplexität', 'Beschreibt, wie Zeit- oder Speicheraufwand mit der Eingabegröße wächst, nicht eine feste Ausführungsdauer.'],
];

export const javaLessonPack = curriculum.map((row, index) => {
  const answer = index % row.choices.length;
  const options = row.choices.slice(1);
  options.splice(answer, 0, row.choices[0]);
  const source = `${row.imports ? row.imports + '\n\n' : ''}public class Main {\n${row.declarations ? row.declarations.split('\n').map(line => '    ' + line).join('\n') + '\n\n' : ''}    public static void main(String[] args) throws Exception {\n${row.code.split('\n').map(line => '        ' + line).join('\n')}\n    }\n}`;
  const text = [row.introduction, ...row.steps, row.explanation].join(' ');
  const terms = vocabulary.filter(([pattern]) => pattern.test(text)).slice(0, 4).map(([, name, meaning]) => [name, meaning]);
  return {
    id: `java-${row.id}`, course: 'java', category: row.category, name: row.name, title: row.name,
    kind: 'theory', difficulty: ['Algorithmen & Komplexität', 'Nebenläufigkeit', 'HTTP & Daten'].includes(row.category) ? 'Vertiefung' : 'Grundlage',
    description: row.introduction, guide: [row.introduction, row.steps],
    syntax: row.code, example: source, parts: terms.length ? terms : [['Merke', row.steps[0]]],
    detail: row.explanation, note: row.note, terms,
    question: 'Welche Ausgabe erzeugt das Beispiel beim Start mit java Main.java?',
    task: 'Lies das Beispiel, verfolge die Werte und wähle die passende Ausgabe. Probiere anschließend eine eigene Änderung lokal mit Java aus.',
    options, answer, explanation: row.explanation, hints: [row.steps[0], row.steps[1]],
    solution: row.explanation, expectedOutput: row.output,
  };
});
