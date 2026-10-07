function lesson(data) {
  return {
    course: "js", category: "Kontrollfluss", preserveInput: true, ...data,
    starter: `function ${data.functionName}(${data.parameter}) {\n  // Schreibe hier deine Lösung.\n}\n\nconsole.log(${data.functionName}(${JSON.stringify(data.tests[0].input)}));`,
    example: `${data.solution}\n\nconsole.log(${data.functionName}(${JSON.stringify(data.tests[0].input)}));`,
  };
}

export const decisionLessons = [
  lesson({
    id: "js-else-if", name: "else if", title: "Mehrere Fälle mit else if unterscheiden",
    description: "Eine if/else-if-Kette prüft Bedingungen der Reihe nach. Nur der erste passende Zweig wird ausgeführt.",
    syntax: "if (punkte >= 80) {\n  return 'Gold';\n} else if (punkte >= 50) {\n  return 'Silber';\n} else {\n  return 'Bronze';\n}",
    parts: [["if", "Prüft zuerst die höchste Punkteschwelle."], ["else if", "Prüft die nächste Bedingung nur, wenn vorher keine zutraf."], ["else", "Deckt alle übrigen Fälle ab."], [">=", "Schließt die jeweilige Grenze ein."]],
    note: "Die Reihenfolge zählt: >= 50 vor >= 80 würde bei 90 Punkten schon den Silber-Zweig wählen.",
    detail: "Mehrere getrennte if-Anweisungen können mehrere Blöcke ausführen. Eine zusammenhängende if/else-if-Kette wählt höchstens einen. Nach einem return endet der Funktionsaufruf ohnehin sofort.",
    functionName: "rang", parameter: "punkte",
    task: "Schreibe rang(punkte). Ab 80 Punkten gib 'Gold' zurück, ab 50 bis unter 80 'Silber', sonst 'Bronze'. Die Eingabe ist eine Zahl von 0 bis 100. Teste auch die Grenzen 50 und 80.",
    tests: [{input:100,expected:"Gold"},{input:80,expected:"Gold"},{input:79,expected:"Silber"},{input:50,expected:"Silber"},{input:49,expected:"Bronze"},{input:0,expected:"Bronze"}],
    hints: ["Beginne mit der höchsten Grenze, weil sie auch die niedrigere erfüllt.", "Prüfe >= 80, dann >= 50; else deckt den Rest ab."],
    solution: "function rang(punkte) {\n  if (punkte >= 80) {\n    return 'Gold';\n  } else if (punkte >= 50) {\n    return 'Silber';\n  } else {\n    return 'Bronze';\n  }\n}",
    explanation: "80 und 100 erfüllen schon die erste Bedingung. 50 und 79 erreichen die zweite. 0 und 49 passen in keinen Vergleich und landen bei Bronze. Die Reihenfolge verhindert, dass hohe Punktzahlen zu früh Silber bekommen.",
  }),
  lesson({
    id: "js-ternary", name: "? :", title: "Zwischen zwei Werten mit ? : wählen",
    description: "Der ternäre Operator wählt abhängig von einer Bedingung einen von zwei Ausdrücken. Er liefert einen Wert und lässt sich direkt in return verwenden.",
    syntax: "bedingung ? wertBeiTrue : wertBeiFalse",
    parts: [["bedingung", "Wird nach den truthy/falsy-Regeln geprüft."], ["?", "Danach steht der Ausdruck für eine wahre Bedingung."], [":", "Danach steht der Ausdruck für eine falsche Bedingung."]],
    note: "Nur der gewählte Ausdruck wird ausgewertet. Für mehrere Arbeitsschritte oder viele Fälle ist if/else meist lesbarer als verschachtelte ternäre Ausdrücke.",
    detail: "alter >= 18 ? 'Erwachsen' : 'Minderjährig' erzeugt einen String. Die Bedingung wird vor der Auswahl geprüft. Der Operator kann auch Zahlen oder andere Werte liefern; er ist keine reine Boolean-Prüfung.",
    functionName: "eintrittspreis", parameter: "alter",
    task: "Schreibe eintrittspreis(alter). Unter 18 Jahren kostet der Eintritt 500 Cent, ab 18 Jahren 1000 Cent. Gib den Centbetrag als Zahl zurück. Versuche die Auswahl mit ? : auszudrücken; die Tests prüfen das Ergebnis.",
    tests: [{input:0,expected:500},{input:17,expected:500},{input:18,expected:1000},{input:60,expected:1000}],
    hints: ["Die Bedingung kann alter < 18 sein.", "return alter < 18 ? 500 : 1000;"],
    solution: "function eintrittspreis(alter) {\n  return alter < 18 ? 500 : 1000;\n}",
    explanation: "< 18 ist bei 0 und 17 wahr, daher wird 500 gewählt. Bei 18 und 60 ist die Bedingung falsch, daher 1000. return liefert den ausgewählten Zahlenwert.",
  }),
  lesson({
    id: "js-switch", name: "switch / case", title: "Feste Auswahlwerte mit switch behandeln",
    description: "switch vergleicht einen Wert mit mehreren case-Werten. default behandelt Eingaben ohne passenden case.",
    syntax: "switch (status) {\n  case 'offen': return 'Noch zu erledigen';\n  case 'fertig': return 'Erledigt';\n  default: return 'Unbekannt';\n}",
    parts: [["switch (status)", "Wertet den Auswahlwert einmal aus."], ["case", "Vergleicht mit strikter Gleichheit, ohne Typumwandlung."], ["default", "Wird verwendet, wenn kein case passt."], ["return / break", "return beendet die Funktion; break beendet nur den switch-Block."]],
    note: "Ohne return oder break kann die Ausführung nach einem passenden case in die folgenden Zweige durchfallen. Das heißt Fall-through.",
    detail: "switch eignet sich für feste Werte wie Statusnamen. Für Zahlenbereiche ist if/else-if oft passender. 'offen' und 'Offen' sind verschiedene Strings. Ein default-Zweig sorgt hier für ein definiertes Ergebnis auch bei unbekannten Eingaben.",
    functionName: "statusText", parameter: "status",
    task: "Schreibe statusText(status). 'offen' soll 'Noch zu erledigen' ergeben, 'aktiv' → 'In Arbeit', 'fertig' → 'Erledigt'. Bei allen anderen Eingaben gib 'Unbekannt' zurück. Groß-/Kleinschreibung zählt.",
    tests: [{input:"offen",expected:"Noch zu erledigen"},{input:"aktiv",expected:"In Arbeit"},{input:"fertig",expected:"Erledigt"},{input:"Offen",expected:"Unbekannt"},{input:"",expected:"Unbekannt"},{input:0,expected:"Unbekannt"}],
    hints: ["Jeder der drei festen Strings bekommt einen case.", "Gib in jedem case sofort den Text zurück und verwende default für die übrigen Werte."],
    solution: "function statusText(status) {\n  switch (status) {\n    case 'offen': return 'Noch zu erledigen';\n    case 'aktiv': return 'In Arbeit';\n    case 'fertig': return 'Erledigt';\n    default: return 'Unbekannt';\n  }\n}",
    explanation: "switch vergleicht den Eingabewert mit jedem case. return beendet den Aufruf im passenden Zweig und verhindert Fall-through. Unbekannte Werte einschließlich anderer Schreibweisen landen bei default.",
  }),
];
