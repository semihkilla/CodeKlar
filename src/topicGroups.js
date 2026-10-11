// Navigation groups only: lesson IDs, grading and the learning sequence stay stable.
const groups = {
  js: [
    ["start", "Einstieg", ["Grundlagen", "Datentypen", "Operatoren", "Kontrollfluss", "Schleifen", "Funktionen"]],
    ["data", "Daten bearbeiten", ["Arrays", "Strings", "String-Werkzeuge", "Objekte", "Objektzugriffe", "Zahlen & Math", "Reguläre Ausdrücke", "Datum & Uhrzeit", "Intl & Anzeige"]],
    ["algorithms", "Datenstrukturen & Algorithmen", ["Datenstrukturen", "Stack & Queue", "Verkettete Listen", "Rekursion", "Bäume", "Binäre Suchbäume", "Graphen", "Sortieren & Suchen"]],
    ["web", "Browser & Web", ["DOM", "Events & Formulare", "Browser-Speicherung", "HTTP & fetch", "URL & Web-Daten", "Timer & Animation", "Dateien & Bilder", "Canvas & Spiele"]],
    ["async", "Asynchroner Code", ["Asynchroner Code", "Asynchrone Abläufe", "Iteratoren & Generatoren", "Streams & Pipelines", "Parallele Arbeit", "Worker & Nachrichten"]],
    ["practice", "Projekte & Werkzeuge", ["Ein-/Ausgabe & Dateien", "Imports & Module", "Eigene Tests", "Fehlerbehandlung", "Node.js & Terminal", "APIs & SQL", "Projektarchitektur", "Projekte & Tests", "Browser-Projekte", "Praxisaufgaben", "Projekte"]],
    ["internals", "Sprache & Speicher", ["Klassen & this", "Objekte & Prototypen", "Speicher & Referenzen", "Ausführungsmodell", "Bits & Binärdaten", "Text & Kodierung", "Zahlen & Genauigkeit", "Daten & Protokolle", "Dateiformate praktisch"]],
  ],
  computer: [
    ["representation", "Bits, Zahlen & Dateien", ["Bits & Bytes", "Zahlensysteme", "Zahlen im Speicher", "Text & Dateien", "Dateien & Formate"]],
    ["cpu", "CPU & Schaltungen", ["Logik & Schaltungen", "CPU & Programme", "Maschinencode & Assembly"]],
    ["memory", "Speicher & Betriebssystem", ["Speicher & Betriebssystem", "Betriebssystem praktisch", "Sprachen & Speicher", "Caches & Zugriffe"]],
    ["execution", "Programme & Datenfluss", ["Zeitplanung & Nebenläufigkeit", "Streams & Datenfluss"]],
    ["hardware", "Netzwerke & Hardware", ["Netzwerke verstehen", "Hardware & Leistung"]],
  ],
};

export function groupTopics(course, lessons) {
  const categories = [...new Set(lessons.map((lesson) => lesson.category))];
  const definitions = groups[course] || [["course", "Lernthemen", categories]];
  const result = definitions.map(([id, name, topics]) => ({
    id, name, categories: topics.filter((topic) => categories.includes(topic)),
    lessons: lessons.filter((lesson) => topics.includes(lesson.category)),
  })).filter((group) => group.lessons.length);
  const covered = new Set(result.flatMap((group) => group.categories));
  const remaining = categories.filter((topic) => !covered.has(topic));
  // New content stays reachable even before its navigation group is assigned.
  if (remaining.length) result.push({ id: "more", name: "Weitere Themen", categories: remaining, lessons: lessons.filter((lesson) => remaining.includes(lesson.category)) });
  return result;
}
