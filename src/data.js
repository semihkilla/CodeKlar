import { foundations } from "./foundations";
import { typeLessons } from "./types";
import { logicLessons } from "./logic";
import { decisionLessons } from "./decisions";
import { loopLessons } from "./loops";
import { ioLessons } from "./io";
import { structureLessons } from "./structures";
import { linearStructureLessons } from "./linearStructures";
import { linkedStructureLessons } from "./linkedStructures";
import { recursionLessons } from "./recursion";
import { treeLessons } from "./trees";
import { graphLessons } from "./graphs";
import { sortingLessons } from "./sorting";
import { arrayQueryLessons } from "./arrayQueries";
import { advancedLessons } from "./advancedLessons";
import { moreJavaScriptLessons } from "./moreJavaScript";
import { moduleLessons } from "./modules";
import { testingLessons } from "./testing";

export const courseGroups = [
  { name: "Programmiersprachen", ids: ["js", "java", "python", "c"] },
  { name: "Webgestaltung", ids: ["css"] },
  { name: "Frameworks & Bibliotheken", ids: ["react", "angular", "spring"] },
  { name: "Datenbanken", ids: ["sql"] },
  { name: "Werkzeuge", ids: ["docker"] },
];

export const courses = [
  {
    id: "js",
    name: "JavaScript",
    mark: "JS",
    description:
      "Operatoren, Strings und Arrays direkt im Browser ausprobieren.",
  },
  {
    id: "java",
    name: "Java",
    mark: "Ja",
    description: "Typen, Objekte und Methoden verstehen.",
  },
  {
    id: "python",
    name: "Python",
    mark: "Py",
    description: "Lesbarer Code, Listen und ihre Methoden.",
  },
  {
    id: "css",
    name: "HTML & CSS",
    mark: "#",
    description: "Struktur und Gestaltung für das Web.",
  },
  {
    id: "sql",
    name: "SQL",
    mark: "DB",
    description: "Daten abfragen und Ergebnisse verstehen.",
  },
  {
    id: "react",
    name: "React",
    mark: "Re",
    description: "Komponenten und Zustand in Benutzeroberflächen.",
  },
  {
    id: "angular",
    name: "Angular",
    mark: "Ng",
    description: "Templates, Komponenten und Datenbindung.",
  },
  {
    id: "spring",
    name: "Spring Boot",
    mark: "Sp",
    description: "Java-Anwendungen und HTTP-Endpunkte.",
  },
  {
    id: "c",
    name: "C / C++ / C#",
    mark: "C",
    description: "Pointer, Standardbibliotheken und Methoden vergleichen.",
  },
  {
    id: "docker",
    name: "Docker",
    mark: "Dk",
    description: "Images, Container und Dockerfiles verstehen.",
  },
];

const methodLessons = [
  {
    id: "js-map",
    course: "js",
    category: "Arrays",
    name: ".map()",
    title: "Arrays verändern mit .map()",
    description:
      ".map() wendet eine Funktion auf jedes Element an und gibt ein neues Array zurück.",
    syntax: "array.map(element => neuerWert)",
    parts: [
      ["array", "Das Array, dessen Elemente du verarbeiten möchtest."],
      ["element", "Das aktuelle Element. Den Namen kannst du frei wählen."],
      ["neuerWert", "Der Rückgabewert wird ein Element im neuen Array."],
    ],
    note: "Das ursprüngliche Array bleibt unverändert.",
    detail:
      "Die Callback-Funktion läuft einmal pro vorhandenem Element. Sie kann zusätzlich den Index erhalten. .map() selbst verändert das ursprüngliche Array nicht; dein Callback könnte allerdings enthaltene Objekte verändern.",
    example:
      "const zahlen = [1, 2, 3];\n\nconst doppelt = zahlen.map(zahl => zahl * 2);\n\nconsole.log(doppelt);",
    task: "Schreibe verdoppeln(zahlen). Die Funktion soll ein neues Array zurückgeben, in dem jede Zahl verdoppelt ist. Das Eingabe-Array soll unverändert bleiben.",
    starter:
      "function verdoppeln(zahlen) {\n  // Wandle jede Zahl in ihren doppelten Wert um.\n  return zahlen;\n}\n\nconsole.log(verdoppeln([1, 2, 3]));",
    functionName: "verdoppeln",
    tests: [
      { input: [1, 2, 3], expected: [2, 4, 6] },
      { input: [-2, 0, 5], expected: [-4, 0, 10] },
      { input: [], expected: [] },
    ],
    preserveInput: true,
    hints: [
      "Du brauchst eine Methode, die ein neues Array erzeugt.",
      "Nutze .map() und multipliziere das aktuelle Element mit 2.",
    ],
    solution:
      "function verdoppeln(zahlen) {\n  return zahlen.map(zahl => zahl * 2);\n}",
    explanation:
      "zahl => zahl * 2 ist eine kurze Funktion. Ihr Ergebnis wird direkt zurückgegeben. .map() sammelt diese Ergebnisse in einem neuen Array.",
  },
  {
    id: "js-filter",
    course: "js",
    category: "Arrays",
    name: ".filter()",
    title: "Elemente auswählen mit .filter()",
    description:
      ".filter() behält die Elemente, für die deine Bedingung wahr ist, und gibt ein neues Array zurück.",
    syntax: "array.filter(element => bedingung)",
    parts: [
      ["array", "Die Daten, aus denen du Elemente auswählen willst."],
      ["element", "Das Element, das gerade geprüft wird."],
      [
        "bedingung",
        "Ein wahrer Wert behält das Element, ein falscher entfernt es aus dem Ergebnis.",
      ],
    ],
    note: "Auch .filter() verändert das ursprüngliche Array nicht.",
    detail:
      "Die Callback-Funktion wird pro vorhandenem Element aufgerufen. Im neuen Array stehen die ausgewählten Elemente in ihrer ursprünglichen Reihenfolge.",
    example:
      "const zahlen = [1, 2, 3, 4];\n\nconst gerade = zahlen.filter(zahl => zahl % 2 === 0);\n\nconsole.log(gerade);",
    task: "Schreibe geradeZahlen(zahlen). Gib ein neues Array zurück, das nur gerade Zahlen enthält. Die Eingabe soll unverändert bleiben.",
    starter:
      "function geradeZahlen(zahlen) {\n  return zahlen;\n}\n\nconsole.log(geradeZahlen([1, 2, 3, 4]));",
    functionName: "geradeZahlen",
    tests: [
      { input: [1, 2, 3, 4], expected: [2, 4] },
      { input: [-4, -3, 0, 7], expected: [-4, 0] },
      { input: [], expected: [] },
    ],
    preserveInput: true,
    hints: [
      "Eine Zahl ist gerade, wenn sie beim Teilen durch 2 keinen Rest hat.",
      "zahl % 2 === 0 ist die Bedingung für .filter().",
    ],
    solution:
      "function geradeZahlen(zahlen) {\n  return zahlen.filter(zahl => zahl % 2 === 0);\n}",
    explanation:
      "% berechnet den Rest einer Division. === prüft, ob dieser Rest genau 0 ist. .filter() behält die Zahlen, für die das stimmt.",
  },
  {
    id: "js-includes",
    course: "js",
    category: "Strings",
    name: ".includes()",
    title: "Text prüfen mit .includes()",
    description:
      ".includes() prüft, ob ein String einen bestimmten Text enthält. Das Ergebnis ist true oder false.",
    syntax: "text.includes(suchtext)",
    parts: [
      ["text", "Der String, in dem gesucht wird."],
      ["suchtext", "Die Zeichenfolge, die du finden möchtest."],
      ["boolean", "Der Rückgabewert: true bei einem Treffer, sonst false."],
    ],
    note: "Groß- und Kleinschreibung werden unterschieden.",
    detail:
      "Ein optionaler zweiter Parameter bestimmt die Startposition. Eine leere Suchzeichenfolge wird gefunden. Zum Ignorieren der Schreibweise kannst du beide Texte mit .toLowerCase() umwandeln.",
    example:
      'const text = "Hallo JavaScript";\n\nconsole.log(text.includes("Java"));\nconsole.log(text.includes("java"));',
    task: 'Schreibe enthaeltJava(text). Prüfe, ob der Text "java" enthält, unabhängig von Groß- und Kleinschreibung.',
    starter:
      'function enthaeltJava(text) {\n  return false;\n}\n\nconsole.log(enthaeltJava("Hallo JavaScript"));',
    functionName: "enthaeltJava",
    tests: [
      { input: "Hallo JavaScript", expected: true },
      { input: "JAVA lernen", expected: true },
      { input: "Python lernen", expected: false },
      { input: "", expected: false },
    ],
    hints: [
      "Bringe den Text zuerst in eine einheitliche Schreibweise.",
      'Verbinde .toLowerCase() mit .includes("java").',
    ],
    solution:
      'function enthaeltJava(text) {\n  return text.toLowerCase().includes("java");\n}',
    explanation:
      '.toLowerCase() gibt einen neuen String in Kleinbuchstaben zurück. .includes("java") prüft diesen neuen String.',
  },
  {
    id: "js-slice",
    course: "js",
    category: "Strings",
    name: ".slice()",
    title: "Text ausschneiden mit .slice()",
    description:
      ".slice() gibt einen Abschnitt eines Strings zurück. Der Start ist enthalten, das Ende nicht.",
    syntax: "text.slice(start, ende)",
    parts: [
      ["start", "Die erste Position im Ergebnis. Die Zählung beginnt bei 0."],
      [
        "ende",
        "Diese Position wird nicht mehr übernommen. Ohne Ende wird bis zum Schluss ausgeschnitten.",
      ],
      ["Rückgabe", "Ein neuer String mit dem ausgewählten Abschnitt."],
    ],
    note: "Negative Positionen zählen vom Ende des Strings.",
    detail:
      'Der ursprüngliche String bleibt unverändert. "Hallo".slice(0, 2) ist "Ha". "Hallo".slice(-2) ist "lo". JavaScript zählt hier UTF-16-Codeeinheiten; manche Emojis belegen zwei davon.',
    example:
      'const text = "Hallo Welt";\n\nconsole.log(text.slice(0, 5));\nconsole.log(text.slice(-4));',
    task: "Schreibe anfang(text). Gib die ersten drei Positionen des Strings zurück. Kürzere Strings sollen vollständig zurückkommen.",
    starter:
      'function anfang(text) {\n  return text;\n}\n\nconsole.log(anfang("Hallo"));',
    functionName: "anfang",
    tests: [
      { input: "Hallo", expected: "Hal" },
      { input: "Hi", expected: "Hi" },
      { input: "", expected: "" },
    ],
    hints: [
      "Die erste Position hat den Index 0.",
      "Das Ende ist exklusiv. Nutze .slice(0, 3).",
    ],
    solution: "function anfang(text) {\n  return text.slice(0, 3);\n}",
    explanation:
      "Die Positionen 0, 1 und 2 werden übernommen. Position 3 ist nicht mehr enthalten. Bei kurzen Strings endet der Abschnitt automatisch am Stringende.",
  },
  {
    id: "js-equality",
    course: "js",
    category: "Operatoren",
    name: "===",
    title: "Werte vergleichen mit ===",
    description:
      "=== prüft, ob zwei Werte ohne Typumwandlung gleich sind. Das Ergebnis ist ein Boolean.",
    syntax: "linkerWert === rechterWert",
    parts: [
      ["=", "Weist einer Variable einen Wert zu."],
      ["==", "Vergleicht mit Regeln für Typumwandlung."],
      ["===", 'Vergleicht ohne Typumwandlung. 3 und "3" sind verschieden.'],
    ],
    note: "Objekte werden nach Identität verglichen, nicht nach ihrem Inhalt.",
    detail:
      "[] === [] ergibt false: Es sind zwei verschiedene Arrays. NaN === NaN ergibt ebenfalls false. Für viele Vergleiche im Alltag ist === der verständlichere Ausgangspunkt.",
    example:
      'console.log(3 === 3);\nconsole.log(3 === "3");\nconsole.log(3 == "3");',
    task: 'Schreibe istDrei(wert). Gib nur dann true zurück, wenn wert die Zahl 3 ist. Der String "3" soll false ergeben.',
    starter:
      "function istDrei(wert) {\n  return false;\n}\n\nconsole.log(istDrei(3));",
    functionName: "istDrei",
    tests: [
      { input: 3, expected: true },
      { input: "3", expected: false },
      { input: 4, expected: false },
      { input: null, expected: false },
    ],
    hints: [
      "Du brauchst einen Vergleich, keine Zuweisung.",
      "=== vergleicht ohne automatische Typumwandlung.",
    ],
    solution: "function istDrei(wert) {\n  return wert === 3;\n}",
    explanation:
      "Der Vergleich liefert bereits true oder false. Deshalb brauchst du keine zusätzliche if-Anweisung.",
  },
  {
    id: "js-logic",
    course: "js",
    category: "Operatoren",
    name: "&&",
    title: "Bedingungen verbinden mit &&",
    description:
      "&& verknüpft Bedingungen. Sind beide Operanden Booleans, ist das Ergebnis nur dann true, wenn beide true sind.",
    syntax: "bedingungA && bedingungB",
    parts: [
      ["&&", "Logisches UND: Beide Bedingungen müssen erfüllt sein."],
      ["||", "Logisches ODER: Mindestens eine Bedingung muss erfüllt sein."],
      ["!", "Negation: Wandelt in einen Boolean um und kehrt ihn um."],
    ],
    note: "&& wertet die rechte Seite nur aus, wenn die linke truthy ist.",
    detail:
      '&& gibt den ersten falsy Operanden oder den letzten Operanden zurück. Es gibt also nicht immer einen Boolean zurück: 0 && "Hallo" ist 0. Vergleiche wie alter >= 18 liefern dagegen Booleans.',
    example:
      "const alter = 20;\nconst hatTicket = true;\n\nconsole.log(alter >= 18 && hatTicket);",
    task: "Schreibe darfRein(person). Eine Person darf rein, wenn sie mindestens 18 Jahre alt ist und hatTicket true ist.",
    starter:
      "function darfRein(person) {\n  return false;\n}\n\nconsole.log(darfRein({ alter: 20, hatTicket: true }));",
    functionName: "darfRein",
    tests: [
      { input: { alter: 18, hatTicket: true }, expected: true },
      { input: { alter: 17, hatTicket: true }, expected: false },
      { input: { alter: 30, hatTicket: false }, expected: false },
    ],
    hints: [
      "Prüfe das Alter und das Ticket getrennt.",
      "Verbinde person.alter >= 18 mit person.hatTicket === true durch &&.",
    ],
    solution:
      "function darfRein(person) {\n  return person.alter >= 18 && person.hatTicket === true;\n}",
    explanation:
      ">= schließt den Grenzwert 18 ein. && verlangt, dass beide Vergleiche true ergeben.",
  },
];

const knowledge = (
  id,
  course,
  category,
  name,
  title,
  description,
  syntax,
  parts,
  note,
  example,
  question,
  options,
  answer,
  explanation,
  detail,
) => ({
  id,
  course,
  category,
  name,
  title,
  description,
  syntax,
  parts,
  note,
  example,
  question,
  options,
  answer,
  explanation,
  detail: detail || explanation,
  task: question,
  hints: [note],
  solution: explanation,
});

export const otherLessons = [
  knowledge(
    "java-equals",
    "java",
    "Strings",
    ".equals()",
    "Strings vergleichen mit .equals()",
    "In Java vergleicht .equals() bei Strings den Inhalt. == vergleicht bei Referenzen, ob sie auf dasselbe Objekt zeigen.",
    "text.equals(andererText)",
    [
      ["text", "Der String, dessen Inhalt du vergleichen möchtest."],
      ["andererText", "Der Vergleichswert."],
      ["boolean", "true, wenn der Stringinhalt gleich ist."],
    ],
    "Rufe keine Methode auf null auf. Objects.equals(a, b) kann auch null vergleichen.",
    'String a = new String("Hallo");\nString b = new String("Hallo");\n\nSystem.out.println(a == b);\nSystem.out.println(a.equals(b));',
    "Welche Ausgabe erzeugt dieses Beispiel?",
    ["true, true", "false, true", "false, false"],
    1,
    "new erzeugt zwei verschiedene Objekte: == ist false. Der Inhalt ist gleich: .equals() ist true.",
  ),
  knowledge(
    "python-append",
    "python",
    "Listen",
    ".append()",
    "Listen erweitern mit .append()",
    ".append() hängt ein Element an eine bestehende Liste an und gibt None zurück.",
    "liste.append(element)",
    [
      ["liste", "Die Liste, die verändert wird."],
      ["element", "Der neue Eintrag am Ende der Liste."],
      ["None", "Die Methode liefert keine neue Liste zurück."],
    ],
    "Die ursprüngliche Liste wird verändert.",
    "zahlen = [1, 2]\nergebnis = zahlen.append(3)\n\nprint(zahlen)\nprint(ergebnis)",
    "Was ist nach .append(3) in ergebnis gespeichert?",
    ["[1, 2, 3]", "3", "None"],
    2,
    ".append() verändert zahlen zu [1, 2, 3]. Ihr Rückgabewert ist None, deshalb enthält ergebnis keine Liste.",
  ),
  knowledge(
    "css-selector",
    "css",
    "Selektoren",
    ".",
    "CSS-Klassen gezielt auswählen",
    "Ein Punkt vor einem Namen wählt alle HTML-Elemente mit dieser Klasse aus.",
    ".hinweis { color: orange; }",
    [
      [".", "Kennzeichnet einen Klassenselektor."],
      ["color", "Bestimmt die Textfarbe."],
      ["orange", "Ein benannter CSS-Farbwert."],
    ],
    "#hinweis wählt eine ID aus; .hinweis eine Klasse.",
    '<p class="hinweis">Hallo</p>\n\n<style>\n  .hinweis { color: orange; }\n</style>',
    'Welcher Selektor passt zu class="hinweis"?',
    ["#hinweis", ".hinweis", "hinweis"],
    1,
    ".hinweis wählt die Klasse aus. #hinweis wäre eine ID; hinweis würde ein Element mit dem Tag-Namen hinweis auswählen.",
  ),
  knowledge(
    "sql-where",
    "sql",
    "Abfragen",
    "WHERE",
    "Zeilen filtern mit WHERE",
    "WHERE legt fest, welche Zeilen eine SQL-Abfrage berücksichtigt.",
    "SELECT name FROM personen WHERE alter >= 18;",
    [
      ["SELECT", "Welche Spalten sollen im Ergebnis stehen?"],
      ["FROM", "Aus welcher Tabelle stammen die Daten?"],
      ["WHERE", "Welche Bedingung müssen die Zeilen erfüllen?"],
    ],
    ">= schließt den Grenzwert ein.",
    "-- personen: Ada (17), Linus (18), Grace (30)\nSELECT name\nFROM personen\nWHERE alter >= 18\nORDER BY name;",
    "Welche Namen liefert die Abfrage in dieser Reihenfolge?",
    ["Ada, Linus, Grace", "Grace, Linus", "Nur Grace"],
    1,
    "Linus und Grace erfüllen alter >= 18. ORDER BY name sortiert aufsteigend, deshalb kommt Grace vor Linus.",
  ),
  knowledge(
    "react-state",
    "react",
    "Hooks",
    "useState()",
    "Zustand verwalten mit useState()",
    "useState() stellt einen Zustandswert und eine Funktion bereit, die ein Update für einen neuen Render anfordert.",
    "const [wert, setWert] = useState(0);",
    [
      ["wert", "Der Zustandswert für den aktuellen Render."],
      ["setWert", "Fordert eine Änderung des Zustands an."],
      ["0", "Der Anfangswert."],
    ],
    "Für Updates auf Basis des bisherigen Werts nutze die funktionale Form.",
    "const [zahl, setZahl] = useState(0);\n\nfunction erhoehen() {\n  setZahl(vorher => vorher + 1);\n  setZahl(vorher => vorher + 1);\n}",
    "Welcher Wert wird nach einem Aufruf von erhoehen() ausgehend von 0 angezeigt?",
    ["0", "1", "2"],
    2,
    "React verarbeitet beide Update-Funktionen nacheinander. Die erste macht aus 0 eine 1, die zweite aus 1 eine 2.",
  ),
  knowledge(
    "angular-binding",
    "angular",
    "Templates",
    "[property]",
    "Eigenschaften binden in Angular",
    "Eckige Klammern binden eine DOM-Eigenschaft an einen Ausdruck der Komponente.",
    '<button [disabled]="istGespeichert">Speichern</button>',
    [
      ["[disabled]", "Bindet die disabled-Eigenschaft des Buttons."],
      ["istGespeichert", "Ein Boolean in der Komponente."],
      [
        "(click)",
        "Runde Klammern binden ein Ereignis, zum Beispiel einen Klick.",
      ],
    ],
    "Property-Binding übergibt den Wert des Ausdrucks.",
    '<button [disabled]="istGespeichert">\n  Speichern\n</button>\n\n// In der Komponente:\nistGespeichert = false;',
    "Ist der Button bei istGespeichert = false deaktiviert?",
    ["Ja", "Nein"],
    1,
    "[disabled] bekommt false. Damit ist der Button nicht deaktiviert. Bei true wäre er deaktiviert.",
  ),
  knowledge(
    "spring-get",
    "spring",
    "Web",
    "@GetMapping",
    "HTTP-Anfragen mit @GetMapping zuordnen",
    "@GetMapping ordnet eine HTTP-GET-Anfrage einer Methode im Spring-Controller zu.",
    '@GetMapping("/hallo")',
    [
      [
        "@RestController",
        "Kennzeichnet einen Controller, der Werte als Antwortinhalt ausgibt.",
      ],
      ["@GetMapping", "Definiert den Pfad für GET-Anfragen."],
      ["return", "Liefert hier den Inhalt der HTTP-Antwort."],
    ],
    "GET wird üblicherweise zum Abrufen von Daten verwendet.",
    '@RestController\nclass HalloController {\n  @GetMapping("/hallo")\n  String hallo() {\n    return "Hallo!";\n  }\n}',
    "Welche Anfrage ruft hier hallo() auf?",
    ["POST /hallo", "GET /hallo", "GET /hallo()"],
    1,
    'Die Annotation @GetMapping("/hallo") verknüpft die Methode mit GET-Anfragen an /hallo.',
  ),
  knowledge(
    "c-pointer",
    "c",
    "C",
    "*",
    "Pointer dereferenzieren in C",
    "Ein Pointer speichert eine Adresse. Mit * kannst du den Wert an dieser Adresse lesen oder verändern.",
    "int *zeiger = &zahl;",
    [
      ["&zahl", "Die Adresse der Variable zahl."],
      ["int *zeiger", "Deklariert einen Pointer auf einen int."],
      ["*zeiger", "Greift auf den int zu, auf den der Pointer zeigt."],
    ],
    "Dereferenziere nur gültige Pointer auf lebende Objekte.",
    'int zahl = 7;\nint *zeiger = &zahl;\n*zeiger = 9;\n\nprintf("%d", zahl);',
    "Welchen Wert gibt printf aus?",
    ["7", "9", "Eine Adresse"],
    1,
    "*zeiger greift auf zahl zu. Die Zuweisung verändert deshalb zahl von 7 auf 9.",
  ),
  knowledge(
    "cpp-push",
    "c",
    "C++",
    ".push_back()",
    "Vektoren erweitern in C++",
    "std::vector::push_back() hängt ein Element am Ende des Vektors an. Die Methode gibt void zurück.",
    "zahlen.push_back(3);",
    [
      ["std::vector<int>", "Ein dynamischer Container für int-Werte."],
      ["push_back", "Fügt ein Element am Ende hinzu."],
      ["size()", "Gibt die Anzahl der Elemente zurück."],
    ],
    "Das Wachstum kann gespeicherte Iteratoren und Referenzen ungültig machen.",
    "std::vector<int> zahlen = {1, 2};\nzahlen.push_back(3);\n\nstd::cout << zahlen.size();",
    "Was gibt zahlen.size() nach push_back(3) zurück?",
    ["2", "3", "void"],
    1,
    "Der Vektor enthält jetzt drei Elemente: 1, 2 und 3. size() liefert die Anzahl, also 3.",
  ),
  knowledge(
    "csharp-where",
    "c",
    "C#",
    ".Where()",
    "Mit LINQ filtern in C#",
    "Enumerable.Where() wählt Elemente aus, für die ein Prädikat true ergibt. Die Auswertung erfolgt bei der Enumeration.",
    "zahlen.Where(zahl => zahl > 2)",
    [
      ["Where", "Eine LINQ-Erweiterungsmethode aus System.Linq."],
      ["zahl => zahl > 2", "Ein Prädikat, das jedes Element prüft."],
      ["ToArray()", "Wertet die Folge aus und sammelt sie in einem Array."],
    ],
    "Where() verändert die ursprüngliche Folge nicht.",
    'int[] zahlen = {1, 2, 3, 4};\nvar ergebnis = zahlen.Where(zahl => zahl > 2).ToArray();\n\nConsole.WriteLine(string.Join(", ", ergebnis));',
    "Welche Ausgabe entsteht?",
    ["1, 2", "2, 3, 4", "3, 4"],
    2,
    "Die Bedingung > 2 ist für 3 und 4 wahr. 2 selbst ist nicht enthalten; dafür wäre >= nötig.",
  ),
  knowledge(
    "docker-from",
    "docker",
    "Dockerfile",
    "FROM",
    "Ein Basis-Image mit FROM wählen",
    "FROM beginnt eine Build-Stufe und legt deren Basis-Image fest. RUN führt Befehle beim Image-Build aus.",
    "FROM python:3.12-slim",
    [
      ["FROM", "Legt das Basis-Image für die Build-Stufe fest."],
      ["RUN", "Führt einen Befehl während des Builds aus."],
      ["CMD", "Definiert den Standardbefehl für gestartete Container."],
    ],
    "Ein Image ist eine Vorlage; ein Container ist eine gestartete Instanz davon.",
    'FROM python:3.12-slim\nWORKDIR /app\nCOPY app.py .\nCMD ["python", "app.py"]',
    "Wann wird hier python app.py normalerweise ausgeführt?",
    [
      "Beim Image-Build",
      "Beim Start des Containers",
      "Beim Kopieren der Datei",
    ],
    1,
    "CMD legt den Standardbefehl für den Containerstart fest. Beim Build würde ein RUN-Befehl ausgeführt.",
  ),
];

export const jsLessons = [...methodLessons, ...foundations, ...typeLessons, ...logicLessons, ...decisionLessons, ...loopLessons, ...ioLessons, ...structureLessons, ...linearStructureLessons, ...linkedStructureLessons, ...recursionLessons, ...treeLessons, ...graphLessons, ...sortingLessons, ...arrayQueryLessons, ...advancedLessons, ...moreJavaScriptLessons, ...moduleLessons, ...testingLessons];
const learningOrder = ["js-variables", "js-typeof", "js-missing", "js-number", "js-string", "js-boolean", "js-return", "js-fn-arrow", "js-fn-arrow-object", "js-fn-callback", "js-fn-default", "js-fn-rest", "js-fn-spread", "js-fn-scope", "js-fn-closure", "js-fn-independent", "js-fn-factory", "js-arithmetic", "js-remainder", "js-equality", "js-comparisons", "js-logic", "js-or", "js-not", "js-or-fallback", "js-short-circuit", "js-logic-order", "js-nullish", "js-if", "js-else-if", "js-ternary", "js-switch", "js-for", "js-while", "js-for-of", "js-break", "js-continue", "js-objects", "js-object-keys", "js-object-entries", "js-obj-destructure", "js-obj-rest", "js-obj-copy", "js-obj-nested", "js-obj-optional", "js-obj-computed", "js-class-constructor", "js-class-method", "js-class-getter", "js-class-bind", "js-class-private", "js-class-inherit", "js-map-count", "js-map-has", "js-set-unique", "js-stack", "js-stack-undo", "js-stack-brackets", "js-queue", "js-queue-head", "js-linked-build", "js-linked-read", "js-linked-prepend", "js-linked-search", "js-linked-delete", "js-linked-reverse", "js-recursion-countdown", "js-recursion-factorial", "js-recursion-list-length", "js-recursion-nested-sum", "js-tree-count", "js-tree-height", "js-tree-preorder", "js-tree-inorder", "js-tree-postorder", "js-tree-bfs", "js-bst-search", "js-bst-insert", "js-bst-min", "js-bst-valid", "js-graph-neighbors", "js-graph-bfs", "js-graph-dfs", "js-graph-shortest", "js-template", "js-includes", "js-slice", "js-str-split-join", "js-str-replace-all", "js-str-pad", "js-str-at", "js-regex-test", "js-regex-flags", "js-regex-match", "js-regex-groups", "js-regex-state", "js-push", "js-map", "js-filter", "js-array-find", "js-array-some", "js-array-every", "js-array-reduce", "js-sort-numbers", "js-sort-ranking", "js-find-index", "js-binary-search", "js-async-resolve", "js-async-chain", "js-async-await", "js-async-catch", "js-async-all", "js-async-settled", "js-async-race", "js-async-any", "js-async-finally", "js-error-throw", "js-error-json", "js-error-custom", "js-error-finally", "js-date-iso", "js-date-parts", "js-date-add", "js-date-difference", "js-input-trim", "js-text-lines", "js-json-parse", "js-json-stringify", "js-csv-read", "js-csv-write", "js-module-named", "js-module-default", "js-module-alias", "js-module-reexport", "js-test-equal", "js-test-boundaries", "js-test-structures", "js-test-throws", "js-budget"];
export const lessons = [
  ...[...jsLessons].sort((a, b) => learningOrder.indexOf(a.id) - learningOrder.indexOf(b.id)),
  ...otherLessons,
];
export const lessonById = Object.fromEntries(
  lessons.map((lesson) => [lesson.id, lesson]),
);
