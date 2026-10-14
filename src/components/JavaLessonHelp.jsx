export function JavaLessonHelp({ lesson, includePractice = true }) {
  const profile = lesson.methodProfile;
  const practice = includePractice ? lesson.practice : undefined;
  return <>
    {profile && <details className="reading-more java-api-help">
      <summary>Syntax, Parameter &amp; Rückgabewert</summary>
      <pre className="syntax-strip">{profile.signature}</pre>
      <h3 className="reading-label">Parameter</h3>
      {profile.parameters.length ? <dl className="java-api-parameters">{profile.parameters.map(([name, text]) => <div key={name}><dt><code>{name}</code></dt><dd>{text}</dd></div>)}</dl> : <p>Dieser Aufruf benötigt keine zusätzlichen Argumente.</p>}
      <h3 className="reading-label">Rückgabewert</h3><p>{profile.returns}</p>
      <h3 className="reading-label">Was wird verändert?</h3><p>{profile.effect}</p>
    </details>}
    {practice && <details className="reading-more java-self-practice">
      <summary>Selbst programmieren</summary>
      <p>{practice.task}</p>
      <p className="java-practice-note">Bearbeite diese Zusatzübung lokal mit Java. Das Quiz bewertet deine Wissensantwort; diese Übung dient zum eigenen Ausprobieren.</p>
      <details className="reading-more"><summary>Hinweis zur Übung</summary><p>{practice.hint}</p></details>
      <details className="reading-more"><summary>Musterlösung mit erwarteter Ausgabe</summary>
        <pre className="syntax-strip">{practice.example}</pre>
        <h3 className="reading-label">Erwartete Ausgabe</h3><pre className="syntax-strip">{practice.output}</pre>
      </details>
    </details>}
  </>;
}
