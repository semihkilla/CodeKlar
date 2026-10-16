export function PythonLessonHelp({ lesson, includePractice = true, openProject }) {
  const profile = lesson.methodProfile;
  const practice = includePractice ? lesson.practice : undefined;
  return <>
    {lesson.setup && <details className="reading-more python-package-setup">
      <summary>Lokaler Start &amp; benötigte Pakete</summary>
      <p>{lesson.setup.description}</p>
      <h3 className="reading-label">Linux &amp; macOS</h3><pre className="syntax-strip">{lesson.setup.commands}</pre>
      <h3 className="reading-label">Windows</h3><pre className="syntax-strip">{lesson.setup.windowsCommands}</pre>
    </details>}
    {includePractice && lesson.projectId && openProject && <details className="reading-more python-project-help">
      <summary>Von der Idee zum eigenen Programm</summary>
      <p>Das vollständige Projekt verbindet Eingaben, Daten, Verarbeitung und Ausgabe. Im ZIP findest du Quellcode, Startanleitung und Tests. Starte es mit Python auf deinem Computer.</p>
      <button className="project-action" onClick={() => openProject(lesson.projectId)}>{lesson.projectTitle} als Projekt öffnen →</button>
    </details>}
    {profile && <details className="reading-more python-api-help">
      <summary>Syntax, Parameter &amp; Rückgabewert</summary>
      <pre className="syntax-strip">{profile.signature}</pre>
      <h3 className="reading-label">Parameter</h3>
      {profile.parameters.length ? <dl className="python-api-parameters">{profile.parameters.map(([name, text]) => <div key={name}><dt><code>{name}</code></dt><dd>{text}</dd></div>)}</dl> : <p>Hier sind keine zusätzlichen Parameter nötig.</p>}
      <h3 className="reading-label">Rückgabewert</h3><p>{profile.returns}</p>
      <h3 className="reading-label">Was wird verändert?</h3><p>{profile.effect}</p>
    </details>}
    {practice && <details className="reading-more python-self-practice">
      <summary>Selbst programmieren</summary><p>{practice.task}</p>
      <p className="python-practice-note">Bearbeite diese Zusatzübung lokal mit Python. Das Quiz bewertet deine Wissensantwort; deine eigene Implementierung wird hier nicht automatisch ausgeführt.</p>
      <details className="reading-more"><summary>Hinweis zur Übung</summary><p>{practice.hint}</p></details>
      <details className="reading-more"><summary>Musterlösung mit erwarteter Ausgabe</summary>
        <pre className="syntax-strip">{practice.example}</pre>
        <h3 className="reading-label">Erwartete Ausgabe</h3><pre className="syntax-strip">{practice.output}</pre>
      </details>
    </details>}
  </>;
}
