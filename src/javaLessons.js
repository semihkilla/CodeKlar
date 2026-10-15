import desktopCurriculum from './javaDesktopCurriculum.json' with { type: 'json' };
import swingCurriculum from './javaSwingCurriculum.json' with { type: 'json' };
import practicePack from './javaPracticePack.json' with { type: 'json' };
import conceptCurriculum from './javaConceptCurriculum.json' with { type: 'json' };
import curriculum from './javaCurriculum.json' with { type: 'json' };
import furtherCurriculum from './javaFurtherCurriculum.json' with { type: 'json' };
import dataCurriculum from './javaDataCurriculum.json' with { type: 'json' };
import nextCurriculum from './javaNextCurriculum.json' with { type: 'json' };
import { javaMethodProfiles } from './javaMethodProfiles.js';

const vocabulary = [
  [/\bRegex|\bregulär/i, 'Regulärer Ausdruck', 'Ein Suchmuster mit besonderen Zeichen und Regeln. Das Muster und der gefundene Text sind verschiedene Dinge.'],
  [/\bPredicate/, 'Predicate', 'Eine Funktion, die für einen Eingabewert true oder false liefert, etwa zum Behalten oder Löschen eines Elements.'],
  [/\bCollection/, 'Collection', 'Ein Java-Vertrag für Gruppen von Elementen, zum Beispiel Listen oder Sets. Maps sind ein eigener Vertrag für Schlüssel-Wert-Zuordnungen.'],
  [/\bMap\b/, 'Map', 'Ordnet jedem enthaltenen Schlüssel einen Wert zu. Verschiedene Map-Typen besitzen verschiedene Ordnungs- und null-Regeln.'],
  [/\bOptional/, 'Optional', 'Ein Behälter, der einen vorhandenen Wert oder dessen Abwesenheit ausdrücklich beschreibt.'],
  [/\bSupplier/, 'Supplier', 'Eine Funktion ohne Eingabeargument, die beim Aufruf einen Wert erzeugt.'],
  [/\bSicht|\bsubList/, 'Sicht', 'Ein Zugang zu einer vorhandenen Datenstruktur. Er ist keine unabhängige Kopie und kann Änderungen der zugrunde liegenden Struktur zeigen.'],
  [/\bMomentaufnahme/, 'Momentaufnahme', 'Übernimmt einen aktuellen Datenstand. Eine Strukturkopie macht referenzierte veränderbare Elemente nicht automatisch unabhängig.'],
  [/\bUnicode/, 'Unicode', 'Ein Zeichensystem für viele Sprachen. Ein Codepoint, eine Codeeinheit und ein sichtbares Zeichen sind nicht immer dasselbe.'],
  [/\bIterator/, 'Iterator', 'Ein Objekt, das eine Folge schrittweise durchläuft und dabei seine aktuelle Position verwaltet.'],
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

export function buildJavaSource(code, declarations = '', imports = '') {
  return `${imports ? imports + '\n\n' : ''}public class Main {\n${declarations ? declarations.split('\n').map(line => '    ' + line).join('\n') + '\n\n' : ''}    public static void main(String[] args) throws Exception {\n${code.split('\n').map(line => '        ' + line).join('\n')}\n    }\n}`;
}

export const javaLessonPack = [...curriculum, ...furtherCurriculum, ...nextCurriculum, ...dataCurriculum, ...conceptCurriculum, ...swingCurriculum, ...desktopCurriculum].map((definition, index) => {
  const row = { ...javaMethodProfiles[definition.id], ...definition, practice: definition.practice ?? (Object.hasOwn(practicePack, definition.id) ? practicePack[definition.id] : undefined) };
  const answer = index % row.choices.length;
  const options = row.choices.slice(1);
  options.splice(answer, 0, row.choices[0]);
  const source = buildJavaSource(row.code, row.declarations, row.imports);
  const text = [row.name, row.introduction, ...row.steps, row.explanation, row.pitfall || ''].join(' ');
  const terms = vocabulary.filter(([pattern]) => pattern.test(text)).slice(0, 4).map(([, name, meaning]) => [name, meaning]);
  return {
    id: `java-${row.id}`, course: 'java', category: row.category, name: row.name, title: row.name,
    kind: 'theory', difficulty: row.difficulty || (['Algorithmen & Komplexität', 'Nebenläufigkeit', 'HTTP & Daten'].includes(row.category) ? 'Vertiefung' : 'Grundlage'),
    description: row.introduction, guide: [row.introduction, row.steps],
    syntax: row.code, example: source, parts: terms.length ? terms : [['Merke', row.steps[0]]],
    detail: row.explanation, note: row.note, terms,
    question: 'Welche Ausgabe erzeugt das Beispiel beim Start mit java Main.java?',
    task: 'Lies das Beispiel, verfolge die Werte und wähle die passende Ausgabe. Probiere anschließend eine eigene Änderung lokal mit Java aus.',
    options, answer, explanation: row.explanation, hints: [row.steps[0], row.steps[1]],
    solution: row.explanation, expectedOutput: row.output,
    projectId: row.projectId, projectTitle: row.projectTitle, projectDescription: row.projectDescription, methodProfile: row.methodProfile, useCase: row.useCase, pitfall: row.pitfall,
    practice: row.practice ? { ...row.practice, example: buildJavaSource(row.practice.code, row.practice.declarations ?? row.declarations, row.practice.imports ?? row.imports) } : undefined,
  };
});
