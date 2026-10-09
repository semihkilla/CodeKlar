import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Search,
  Download,
  ArrowRight,
} from "lucide-react";
import { courses, lessons } from "../data";

function SearchField({ value, onChange, placeholder }) {
  return (
    <label className="search-field">
      <Search size={19} />
      <input
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function Exercises({ progress, openLesson, openProjects }) {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("all");
  const [status, setStatus] = useState("all");
  const filtered = lessons.filter(
    (item) =>
      (course === "all" || course === item.course) &&
      (status === "all" ||
        (status === "solved"
          ? progress.solved[item.id]
          : !progress.solved[item.id])) &&
      `${item.title} ${item.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="page-intro">
        <h1>Vom Verstehen zum Anwenden.</h1>
        <p>Kleine Aufgaben. Klare Rückmeldung. Dein nächster Schritt.</p>
      <button className="text-button" onClick={openProjects}>Projektideen für alle Lernbereiche →</button>
      </div>
      <div className="library-toolbar">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Aufgaben suchen …"
        />
        <select
          aria-label="Lernbereich filtern"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        >
          <option value="all">Alle Lernbereiche</option>
          {courses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Status filtern"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="all">Alle Aufgaben</option>
          <option value="open">Noch offen</option>
          <option value="solved">Gelöst</option>
        </select>
      </div>
      <div className="list-caption">
        {filtered.length} Aufgaben · {Object.keys(progress.solved).length}{" "}
        insgesamt gelöst
      </div>
      <div className="exercise-table" role="table" aria-label="Aufgaben">
        <div className="exercise-row table-head" role="row">
          <span role="columnheader">Status</span>
          <span role="columnheader">Aufgabe</span>
          <span role="columnheader">Lernbereich</span>
          <span role="columnheader">Übungsart</span>
          <span />
        </div>
        {filtered.map((item) => (
          <button
            role="row"
            className="exercise-row"
            key={item.id}
            onClick={() => openLesson(item.id, "task")}
          >
            <span
              role="cell"
              aria-label={progress.solved[item.id] ? "Gelöst" : "Offen"}
            >
              {progress.solved[item.id] ? (
                <CheckCircle2 className="status-success" size={20} />
              ) : (
                <Circle className="open-circle" size={20} />
              )}
            </span>
            <span role="cell">
              <strong>{item.title}</strong>
              <small>{item.category}</small>
            </span>
            <span role="cell">
              {courses.find((course) => course.id === item.course).name}
            </span>
            <span role="cell" className="exercise-type">
              {item.course === "js" ? "Codeaufgabe" : "Wissensfrage"}
            </span>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          Keine Aufgaben gefunden. Ändere deine Suche oder den Filter.
        </div>
      )}
    </>
  );
}

export function Reference({ openLesson }) {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("all");
  const filtered = lessons.filter(
    (item) =>
      (course === "all" || item.course === course) &&
      `${item.name} ${item.title} ${item.description} ${courses.find((course) => course.id === item.course).name}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="page-intro">
        <h1>Die Erklärung ist einen Klick entfernt.</h1>
        <p>
          Operatoren und Methoden – mit Bedeutung, Rückgabewert und Beispiel.
        </p>
      </div>
      <div className="library-toolbar">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Zum Beispiel map, === oder Python …"
        />
        <select
          aria-label="Lernbereich filtern"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
        >
          <option value="all">Alle Lernbereiche</option>
          {courses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="reference-list">
        {filtered.map((item) => (
          <article key={item.id} className="reference-entry">
            <div className="reference-label">
              <code>{item.name}</code>
              <span>
                {item.course === "c"
                  ? item.category
                  : courses.find((course) => course.id === item.course).name}
              </span>
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <pre>{item.syntax}</pre>
              <small>{item.note}</small>
            </div>
            <button
              className="icon-button"
              aria-label={`${item.name} lernen`}
              onClick={() => openLesson(item.id, "explanation")}
            >
              <ArrowUpRight size={22} />
            </button>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          Dazu gibt es noch keinen Eintrag. Versuche einen anderen Begriff.
        </div>
      )}
    </>
  );
}

export function ProgressView({ progress, openLesson }) {
  const solved = Object.keys(progress.solved).length;
  const attempted = Object.keys(progress.attempted).length;
  const last = Object.entries(progress.attempted).sort((a, b) =>
    b[1].localeCompare(a[1]),
  )[0];
  function exportProgress() {
    const link = document.createElement("a");
    const url = URL.createObjectURL(
      new Blob([JSON.stringify({ version: 1, ...progress }, null, 2)], {
        type: "application/json",
      }),
    );
    link.href = url;
    link.download = "codeklar-fortschritt.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <div className="page-intro">
        <h1>Jeder gelöste Schritt zählt.</h1>
        <p>
          Hier siehst du, was du bereits geübt und erfolgreich angewendet hast.
        </p>
      </div>
      <div className="progress-overview">
        <div>
          <span>Gelöste Aufgaben</span>
          <strong>
            {solved}
            <small> / {lessons.length}</small>
          </strong>
        </div>
        <div>
          <span>Ausprobierte Aufgaben</span>
          <strong>{attempted}</strong>
        </div>
        <div>
          <span>Gesamtfortschritt</span>
          <strong>
            {Math.round((solved / lessons.length) * 100)}
            <small> %</small>
          </strong>
        </div>
      </div>
      <div className="section-heading">
        <h2>Deine Lernbereiche</h2>
        <button className="button secondary" onClick={exportProgress}>
          <Download size={16} />
          Fortschritt exportieren
        </button>
      </div>
      <div className="course-progress-list">
        {courses.map((course) => {
          const available = lessons.filter((item) => item.course === course.id);
          const completed = available.filter(
            (item) => progress.solved[item.id],
          ).length;
          const next =
            available.find((item) => !progress.solved[item.id]) || available[0];
          return (
            <div className="course-progress-row" key={course.id}>
              <div>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
              </div>
              <progress
                aria-label={`${course.name}-Fortschritt`}
                value={completed}
                max={available.length}
              />
              <span>
                {completed} / {available.length}
              </span>
              <button
                className="text-button"
                onClick={() => openLesson(next.id, "task")}
              >
                {completed === available.length
                  ? "Wiederholen"
                  : "Weiterlernen"}
                <ArrowRight size={17} />
              </button>
            </div>
          );
        })}
      </div>
      {last && (
        <div className="recent-activity">
          <span>
            Zuletzt geübt am {new Date(last[1]).toLocaleDateString("de-DE")}
          </span>
          <button
            className="text-button"
            onClick={() => openLesson(last[0], "task")}
          >
            {lessons.find((item) => item.id === last[0]).title}
            <ArrowRight size={17} />
          </button>
        </div>
      )}
      <div className="storage-note">
        Dein Fortschritt wird in diesem Browser gespeichert. Der Export sichert
        eine Kopie als JSON-Datei. Konten, Synchronisierung und Import ergänzen
        wir später.
      </div>
    </>
  );
}
