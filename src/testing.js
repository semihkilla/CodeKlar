function workshop({ id, name, title, description, syntax, parts, note, detail, target, correct, mutations, starter, solution, task, hints, explanation }) {
  const solutionFiles = { "main.js": solution, "funktion.js": correct };
  const cases = [{ input: "Korrekter Code", expected: true }, ...mutations.map(({ name }) => ({ input: name, expected: true }))];
  return {
    id, name, title, description, syntax, parts, note, detail, task, hints, explanation,
    course: "js", category: "Eigene Tests", functionName: "pruefe", tests: cases,
    starterFiles: { ...solutionFiles, "main.js": starter }, solutionFiles, exampleFiles: solutionFiles,
    starter, solution, example: solution,
    testWorkshop: { target, correct, mutations },
  };
}
const importLine = (name) => `import { ${name} } from './funktion.js';\nexport { ${name} };\n\n`;
const suite = (name, lines) => importLine(name) + `export function pruefe(${name}, { gleich, wirft }) {\n${lines}\n}`;

export const testingLessons = [
  workshop({
    id: "js-test-equal", name: "gleich()", title: "Mit Assertions Ergebnisse prüfen",
    description: "Eine Assertion vergleicht ein tatsächliches Ergebnis mit deiner Erwartung. Damit überprüfst du das Verhalten einer Funktion automatisch.",
    syntax: "gleich(addieren(2, 3), 5, 'positive Zahlen');",
    parts: [["gleich(ist, soll, name)", "Vergleicht tatsächlichen und erwarteten Wert; name beschreibt den Test."], ["addieren(2, 3)", "Ruft die zu prüfende Funktion mit konkreten Eingaben auf."], ["5", "Die von dir unabhängig berechnete Erwartung."], ["pruefe(addieren, { gleich })", "Erhält die Prüffunktion und die Testhilfe vom Spielplatz."]],
    note: "gleich ist eine Testhilfe dieser App, keine eingebaute JavaScript-Funktion. console.assert schreibt nur eine Meldung und ist hier kein Ersatz für einen prüfbaren Test.",
    detail: "Code ausführen zeigt deine Assertions für die korrekte Funktion. Lösung prüfen führt dieselben Tests zusätzlich gegen fehlerhafte Varianten aus. Korrekter Code muss alle Assertions bestehen; jede fehlerhafte Variante muss an mindestens einer Assertion scheitern. Ein leerer Test oder ein eigener Programmfehler zählt nicht als Nachweis.",
    target: "addieren", correct: "export function addieren(a, b) { return a + b; }",
    mutations: [{ name: "Subtraktion statt Addition", code: "function addieren(a, b) { return a - b; }" }, { name: "Fester Rückgabewert 5", code: "function addieren(a, b) { return 5; }" }],
    starter: suite("addieren", "  // Schreibe mindestens zwei aussagekräftige Assertions."),
    solution: suite("addieren", "  gleich(addieren(2, 3), 5, 'positive Zahlen');\n  gleich(addieren(-2, 0), -2, 'negative Zahl und Null');"),
    task: "Schreibe in main.js Tests für addieren(a, b). Prüfe unterschiedliche Eingaben, sodass sowohl Subtraktion als auch ein fester Rückgabewert 5 entdeckt werden. funktion.js zeigt die korrekte Funktion. Beim Prüfen wird die übergebene Funktion durch verschiedene Varianten ersetzt; teste deshalb den Parameter addieren.",
    hints: ["Ein Test mit 2 und 3 findet die Subtraktion, aber keinen festen Rückgabewert 5.", "Ergänze z. B. gleich(addieren(-2, 0), -2, 'negative Zahl und Null')."],
    explanation: "Die erste Assertion prüft einen gewöhnlichen Fall. Die zweite verwendet einen anderen erwarteten Wert. Beide bestehen beim korrekten Code und entlarven zusammen die zwei fehlerhaften Varianten.",
  }),
  workshop({
    id: "js-test-boundaries", name: "Randfälle", title: "Leere Arrays und Null gezielt testen",
    description: "Randfälle prüfen Grenzen, an denen typische Fehler auftreten. Ein leeres Array und der Zahlenwert 0 sind andere Fälle als eine gewöhnliche Liste.",
    syntax: "gleich(summe([]), 0, 'leeres Array');\ngleich(summe([2, 0, 3]), 5, 'Null in der Mitte');",
    parts: [["[]", "Keine Elemente: Die Summe soll trotzdem 0 sein."], ["[2, 0, 3]", "Null ist ein gültiger Wert und darf die Schleife nicht abbrechen."], ["Testname", "Erklärt, welches Verhalten geprüft wird."]],
    note: "Berechne Erwartungen unabhängig vom zu prüfenden Code. gleich(summe(liste), summe(liste)) würde denselben Fehler auf beiden Seiten übernehmen.",
    detail: "Die fehlerhaften Varianten behandeln leere Arrays falsch oder beenden die Schleife bei 0. Teste normale Listen, leere Listen und eine Null mit weiteren Werten dahinter.",
    target: "summe", correct: "export function summe(werte) { return werte.reduce((gesamt, wert) => gesamt + wert, 0); }",
    mutations: [{ name: "Leeres Array ergibt undefined", code: "function summe(werte) { if (!werte.length) return undefined; return werte.reduce((a, b) => a + b, 0); }" }, { name: "Schleife bricht bei Null ab", code: "function summe(werte) { let gesamt = 0; for (const wert of werte) { if (!wert) break; gesamt += wert; } return gesamt; }" }],
    starter: suite("summe", "  gleich(summe([2, 3]), 5, 'normale Liste');\n  // Ergänze die Randfälle."),
    solution: suite("summe", "  gleich(summe([2, 3]), 5, 'normale Liste');\n  gleich(summe([]), 0, 'leere Liste');\n  gleich(summe([2, 0, 3]), 5, 'Null in der Mitte');"),
    task: "Ergänze Tests für summe. Entdecke die fehlerhafte Rückgabe bei einer leeren Liste und den vorzeitigen Abbruch bei Null. Eine Liste, die nur 0 enthält, reicht für den zweiten Fehler nicht aus.",
    hints: ["Die Summe einer leeren Liste ist in dieser Aufgabe 0.", "Bei [2, 0, 3] muss auch die 3 nach der Null addiert werden."],
    explanation: "Der gewöhnliche Fall allein besteht auch bei beiden fehlerhaften Varianten. Die leere Liste findet den falschen Anfangswert; Null in der Mitte findet den vorzeitigen Abbruch.",
  }),
  workshop({
    id: "js-test-structures", name: "Objekte testen", title: "Objekte und Arrays inhaltlich vergleichen",
    description: "Zwei neu erzeugte Objekte sind mit === nicht gleich. Für Tests brauchst du oft einen Vergleich ihrer Felder und enthaltenen Werte.",
    syntax: "gleich(bericht([3, 4]), { anzahl: 2, werte: [3, 4] }, 'Bericht');",
    parts: [["===", "Vergleicht bei Objekten die Identität, nicht ihren Inhalt."], ["gleich", "Vergleicht hier Objekte und Arrays rekursiv nach Inhalt."], ["Objektfelder", "Alle erwarteten Felder müssen vorhanden sein; ihre Reihenfolge ist egal."], ["Array-Reihenfolge", "Die Position der Werte gehört zum erwarteten Ergebnis."]],
    note: "Diese Testhilfe unterstützt einfache Daten aus Zahlen, Strings, Booleans, null, Arrays und gewöhnlichen Objekten. Vergleiche Map, Set und Klassen später mit passenden spezialisierten Assertions.",
    detail: "Ein Bericht soll die Anzahl und die Werte in ursprünglicher Reihenfolge enthalten. Die fehlerhaften Varianten zählen ein Element zu viel oder drehen die Werte um.",
    target: "bericht", correct: "export function bericht(werte) { return { anzahl: werte.length, werte: [...werte] }; }",
    mutations: [{ name: "Anzahl um eins zu groß", code: "function bericht(werte) { return { anzahl: werte.length + 1, werte: [...werte] }; }" }, { name: "Werte in falscher Reihenfolge", code: "function bericht(werte) { return { anzahl: werte.length, werte: [...werte].reverse() }; }" }],
    starter: suite("bericht", "  // Prüfe das gesamte Objekt einschließlich des Arrays."),
    solution: suite("bericht", "  gleich(bericht([3, 4]), { anzahl: 2, werte: [3, 4] }, 'zwei Werte');\n  gleich(bericht([]), { anzahl: 0, werte: [] }, 'leerer Bericht');"),
    task: "Schreibe Assertions für das gesamte Ergebnis von bericht(werte). Prüfe mindestens eine Liste mit unterschiedlichen Werten, damit eine umgekehrte Reihenfolge auffällt.",
    hints: ["Die Erwartung ist ein Objekt mit den Feldern anzahl und werte.", "[3, 4] ist sinnvoller als [3, 3], weil Umkehren dann sichtbar wird."],
    explanation: "Der Vergleich prüft Anzahl, Felder und die Werte des verschachtelten Arrays. Unterschiedliche Werte entdecken eine falsche Reihenfolge, gleiche Werte würden sie verdecken.",
  }),
  workshop({
    id: "js-test-throws", name: "wirft()", title: "Erwartete Fehler mit Tests absichern",
    description: "Manche Eingaben sollen einen Fehler auslösen. Eine Fehler-Assertion prüft, dass dies tatsächlich passiert, und markiert den erwarteten Fehler als bestanden.",
    syntax: "wirft(() => liesJSON('{kaputt'), 'ungültiges JSON');",
    parts: [["() => liesJSON(…)", "Übergibt eine Funktion, damit die Testhilfe den Aufruf und Fehler selbst beobachten kann."], ["wirft(aufruf, name)", "Besteht, wenn der synchrone Aufruf einen Fehler wirft."], ["gleich", "Prüft zusätzlich den normalen Rückgabewert gültiger Eingaben."]],
    note: "wirft(liesJSON('{kaputt')) ist falsch: Der Fehler entsteht schon vor dem Aufruf der Testhilfe. Diese erste wirft-Hilfe prüft synchrone Fehler; abgelehnte Promises folgen später.",
    detail: "Teste gültige und ungültige Eingaben zusammen. Sonst könnte eine Funktion, die immer einen Fehler wirft oder immer null zurückgibt, unbemerkt bleiben. Hier wird nur geprüft, ob ein Fehler geworfen wird, nicht dessen genauer Typ oder Meldung.",
    target: "liesJSON", correct: "export function liesJSON(text) { return JSON.parse(text); }",
    mutations: [{ name: "Ungültiges JSON wird verschluckt", code: "function liesJSON(text) { try { return JSON.parse(text); } catch { return null; } }" }, { name: "Immer null statt JSON-Inhalt", code: "function liesJSON(text) { return null; }" }],
    starter: suite("liesJSON", "  gleich(liesJSON('{\"aktiv\":true}'), { aktiv: true }, 'gültiges JSON');\n  // Ergänze einen Test für einen erwarteten Fehler."),
    solution: suite("liesJSON", "  gleich(liesJSON('{\"aktiv\":true}'), { aktiv: true }, 'gültiges JSON');\n  wirft(() => liesJSON('{kaputt'), 'ungültiges JSON');"),
    task: "Ergänze eine Assertion, die bei ungültigem JSON einen geworfenen Fehler verlangt. Der vorhandene Test prüft den normalen Rückgabewert. Nutze für wirft eine Funktion ohne Argumente.",
    hints: ["Die Testhilfe muss den fehlerhaften Aufruf selbst starten können.", "Schreibe wirft(() => liesJSON('{kaputt'), 'ungültiges JSON')."],
    explanation: "Der gültige Fall verhindert einen festen Ersatzwert. Der ungültige Fall besteht nur, wenn ein Fehler geworfen wird. Die Funktion ohne Argumente verschiebt den Aufruf bis in die Testhilfe.",
  }),
];
