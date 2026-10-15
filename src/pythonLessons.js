import curriculum from './pythonCurriculum.json' with { type: 'json' };

export const pythonLessonPack = curriculum.map((row, index) => {
  const answer = index % row.choices.length;
  const options = row.choices.slice(1);
  options.splice(answer, 0, row.choices[0]);
  return {
    id: `python-${row.id}`, course: 'python', category: row.category,
    name: row.name, title: row.name, kind: 'theory', difficulty: 'Grundlage',
    description: row.introduction, guide: [row.introduction, row.steps],
    syntax: row.code, example: row.code,
    parts: row.methodProfile.parameters.length ? row.methodProfile.parameters : [['Merke', row.steps[0]]],
    detail: row.explanation,
    note: `Python 3.10+: Als main.py speichern und lokal mit python3 main.py starten (unter Windows je nach Installation py oder python). ${row.stdin ? 'Für dieses Beispiel 7 eingeben und Enter drücken. ' : ''}CodeKlar prüft die Wissensantwort; Python-Code und eigene Übungen führst du auf deinem Computer aus.`,
    question: row.stdin ? 'Welche Ausgabe entsteht mit der vorbereiteten Eingabe 7?' : 'Welche Ausgabe erzeugt dieses Python-Programm?',
    task: 'Verfolge die Werte und wähle die passende Ausgabe. Ändere danach das Beispiel lokal und erkläre das Ergebnis.',
    options, answer, explanation: row.explanation, hints: row.steps.slice(0, 2),
    solution: row.explanation, expectedOutput: row.output, stdin: row.stdin,
    methodProfile: row.methodProfile, useCase: row.useCase, pitfall: row.pitfall,
    practice: row.practice ? { ...row.practice, example: row.practice.code } : undefined,
    projectId: row.projectId, projectTitle: row.projectTitle,
  };
});

// Preserve the existing append question, ID and answer while adding the reading layout.
export const pythonAppendHelp = {
  guide: ['append fügt genau einen Wert an das Ende einer Liste an. Die Methode verändert diese Liste und gibt None zurück.', ['Die Liste beginnt mit 1 und 2.', 'append(3) hängt die 3 an dieselbe Liste an.', 'ergebnis enthält die Methodenrückgabe None, nicht die veränderte Liste.']],
  methodProfile: { signature: 'liste.append(element)', parameters: [['element', 'Ein einzelner neuer Eintrag, auch eine Liste kann ein Eintrag sein.']], returns: 'None.', effect: 'Verändert die vorhandene Liste.' },
  useCase: 'Eine neue Aufgabe oder einen Punktestand an eine vorhandene Liste anhängen.',
  pitfall: 'liste = liste.append(wert) bindet liste an None; verwende die Methode ohne diese Zuweisung.',
};
