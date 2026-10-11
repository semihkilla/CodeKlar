// Fixed, bounded examples execute actual JavaScript operations, never learner-supplied code.
export const errorExamples = [
  {
    id: 'not-function', title: 'map ist keine Funktion', type: 'TypeError', lesson: 'js-map',
    cause: 'werte ist ein Text. Array.map gehört zu Arrays, nicht zu Strings.',
    fix: 'Prüfe zuerst den Datentyp. Wenn dein Text eine JSON-Liste enthält, kannst du ihn mit JSON.parse in ein Array umwandeln.',
    prevent: 'Mit Array.isArray(werte) kannst du prüfen, ob du wirklich ein Array erhalten hast. Nicht jeder Text lässt sich als JSON lesen.',
    brokenCode: 'const werte = "[1,2,3]";\nwerte.map(n => n * 2);',
    fixedCode: 'const werte = JSON.parse("[1,2,3]");\nwerte.map(n => n * 2);',
    broken: () => { const werte = '[1,2,3]'; return werte.map(n => n * 2); },
    corrected: () => JSON.parse('[1,2,3]').map(n => n * 2),
  },
  {
    id: 'undefined', title: 'Eigenschaft von undefined lesen', type: 'TypeError', lesson: 'js-obj-optional',
    cause: 'nutzer wurde nicht mit einem Objekt belegt. Darum kannst du nutzer.name nicht lesen.',
    fix: 'Wenn fehlende Nutzer erlaubt sind, verwende optional chaining und einen Ersatzwert. Wenn sie nicht erlaubt sind, prüfe die Eingabe und melde den Fehler.',
    prevent: '?. bricht den Zugriff bei null oder undefined ab. ?? verwendet den Ersatzwert nur bei null oder undefined, nicht bei 0 oder einem leeren Text.',
    brokenCode: 'const nutzer = undefined;\nnutzer.name;',
    fixedCode: 'const nutzer = undefined;\nnutzer?.name ?? "Gast";',
    broken: () => { const nutzer = undefined; return nutzer.name; },
    corrected: () => { const nutzer = undefined; return nutzer?.name ?? 'Gast'; },
  },
  {
    id: 'name', title: 'Variablenname nicht gefunden', type: 'ReferenceError', lesson: 'js-variables',
    cause: 'Die Variable heißt preis, aber die nächste Zeile verwendet preiss. Dieser Name ist nicht definiert.',
    fix: 'Verwende überall denselben Variablennamen. Achte auch auf Groß- und Kleinschreibung sowie den Gültigkeitsbereich.',
    prevent: 'Lies zuerst den Namen in der Fehlermeldung und suche anschließend dessen Deklaration.',
    brokenCode: 'const preis = 10;\npreiss * 2;',
    fixedCode: 'const preis = 10;\npreis * 2;',
    broken: () => { const preis = 10; return preiss * 2; },
    corrected: () => { const preis = 10; return preis * 2; },
  },
  {
    id: 'const', simulated: true, title: 'const neu zuweisen', type: 'TypeError', lesson: 'js-variables',
    cause: 'const verhindert, dass derselbe Variablenname einen neuen Wert zugewiesen bekommt.',
    fix: 'Wenn sich dieser Zahlenwert ändern soll, deklariere ihn mit let.',
    prevent: 'const macht ein Objekt nicht automatisch unveränderlich. Seine Eigenschaften können weiterhin geändert werden.',
    brokenCode: 'const punkte = 1;\npunkte = 2;',
    fixedCode: 'let punkte = 1;\npunkte = 2;\npunkte;',
    // Bundlers reject assignments to const at build time, so only this message is reproduced.
    broken: () => { throw new TypeError('Assignment to constant variable.'); },
    corrected: () => { let punkte = 1; punkte = 2; return punkte; },
  },
  {
    id: 'json', title: 'Ungültiges JSON lesen', type: 'SyntaxError', lesson: 'js-error-json',
    cause: 'In JSON müssen Eigenschaftsnamen in doppelten Anführungszeichen stehen. {name: ...} kann in JavaScript ein Objekt sein, ist aber kein gültiges JSON.',
    fix: 'Schreibe den Text als gültiges JSON und fange beim Lesen fremder Daten mögliche Parserfehler ab.',
    prevent: 'JSON.parse liest Daten, keinen beliebigen JavaScript-Code. Auch Kommentare und überflüssige Kommas sind in JSON nicht erlaubt.',
    brokenCode: `JSON.parse('{name: "Ada"}');`,
    fixedCode: `JSON.parse('{"name": "Ada"}');`,
    broken: () => JSON.parse('{name: "Ada"}'),
    corrected: () => JSON.parse('{"name": "Ada"}'),
  },
  {
    id: 'reduce', title: 'Leeres Array mit reduce', type: 'TypeError', lesson: 'js-array-reduce',
    cause: 'Die Liste ist leer. Ohne Startwert gibt es keinen ersten Wert, mit dem reduce die Rechnung beginnen kann.',
    fix: 'Gib für diese Summe den Startwert 0 an. Dann ergibt eine leere Liste die Summe 0.',
    prevent: 'Wähle den Startwert passend zur Operation: für eine Summe meist 0, für ein Produkt meist 1.',
    brokenCode: '[].reduce((summe, n) => summe + n);',
    fixedCode: '[].reduce((summe, n) => summe + n, 0);',
    broken: () => [].reduce((summe, n) => summe + n),
    corrected: () => [].reduce((summe, n) => summe + n, 0),
  },
  {
    id: 'return', title: 'map: return vergessen', type: 'Logikfehler', lesson: 'js-practice-callback',
    cause: 'Der Callback rechnet zwar n * 2, gibt das Ergebnis im Block mit { } aber nicht zurück. map bekommt deshalb für jedes Element undefined.',
    fix: 'Verwende return im Block oder einen kurzen Pfeilfunktionsausdruck ohne Block.',
    prevent: 'Keine Fehlermeldung bedeutet nicht, dass das Ergebnis stimmt. Teste auch die zurückgegebenen Werte.',
    brokenCode: '[1, 2, 3].map(n => { n * 2; });',
    fixedCode: '[1, 2, 3].map(n => n * 2);',
    broken: () => [1, 2, 3].map(n => { n * 2; }),
    corrected: () => [1, 2, 3].map(n => n * 2),
  },
  {
    id: 'foreach', title: 'forEach liefert kein Array zurück', type: 'Logikfehler', lesson: 'js-map',
    cause: 'return beendet hier nur den Callback. forEach ignoriert dessen Rückgabewert und liefert selbst immer undefined.',
    fix: 'Wenn du eine neue Liste mit Ergebnissen brauchst, verwende map. forEach passt, wenn du etwas für jedes Element ausführen möchtest.',
    prevent: 'Unterscheide die Rückgabe des Callbacks von der Rückgabe der Methode, die ihn aufruft.',
    brokenCode: '[1, 2, 3].forEach(n => n * 2);',
    fixedCode: '[1, 2, 3].map(n => n * 2);',
    broken: () => [1, 2, 3].forEach(n => n * 2),
    corrected: () => [1, 2, 3].map(n => n * 2),
  },
  {
    id: 'sort', title: 'Zahlen werden als Text sortiert', type: 'Logikfehler', lesson: 'js-sort-numbers',
    cause: 'sort ohne Vergleichsfunktion vergleicht normalerweise die Textdarstellungen. Deshalb kommt 10 vor 2.',
    fix: 'Verwende für Zahlen die Vergleichsfunktion (a, b) => a - b.',
    prevent: 'sort verändert außerdem das Array. Kopiere es zuerst mit [...werte], wenn du die ursprüngliche Reihenfolge behalten möchtest.',
    brokenCode: '[2, 10, 1].sort();',
    fixedCode: '[2, 10, 1].sort((a, b) => a - b);',
    broken: () => [2, 10, 1].sort(),
    corrected: () => [2, 10, 1].sort((a, b) => a - b),
  },
  {
    id: 'range', title: 'Ungültige Array-Länge', type: 'RangeError', lesson: 'js-array-grid',
    cause: 'Eine Array-Länge darf nicht negativ sein. new Array(-1) liegt außerhalb des erlaubten Bereichs.',
    fix: 'Prüfe die Länge vor dem Erstellen. In diesem Beispiel erzeugen wir stattdessen zwei Einträge.',
    prevent: 'Prüfe bei berechneten Größen auch, ob der Wert ganzzahlig und für dein Programm sinnvoll begrenzt ist.',
    brokenCode: 'new Array(-1);',
    fixedCode: 'Array.from({ length: 2 }, () => 0);',
    broken: () => new Array(-1),
    corrected: () => Array.from({ length: 2 }, () => 0),
  },
];
export function runErrorExample(example, corrected = false) {
  try { return { ok: true, value: (corrected ? example.corrected : example.broken)() }; }
  catch (error) { return { ok: false, name: error.name, message: error.message }; }
}
export function displayValue(value) {
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return `[${value.map(displayValue).join(', ')}]`;
  return JSON.stringify(value);
}
