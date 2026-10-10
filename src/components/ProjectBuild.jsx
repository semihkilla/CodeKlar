import { useState } from 'react';

export function ProjectBuild({ project, mode, setMode }) {
  const key = `codeklar-build-v1-${project.id}`;
  const [completed, setCompleted] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || '{}');
      return Object.fromEntries(project.build.checkpoints.map(step => [step.id, stored?.[step.id] === true]));
    } catch { return {}; }
  });
  const [hints, setHints] = useState({});
  const [status, setStatus] = useState('');
  const count = project.build.checkpoints.filter(step => completed[step.id]).length;
  function toggle(id, value) {
    const next = { ...completed, [id]: value };
    setCompleted(next);
    try { localStorage.setItem(key, JSON.stringify(next)); setStatus('Etappen lokal gespeichert.'); }
    catch { setStatus('Etappen konnten nicht dauerhaft gespeichert werden.'); }
  }
  return <section className="project-build" aria-label="Selbst bauen">
    <div className="project-build-switch" role="group" aria-label="Projektmodus">
      <button className="button secondary" aria-pressed={!mode} onClick={() => setMode(false)}>Beispiel ansehen</button>
      <button className="button secondary" aria-pressed={mode} onClick={() => setMode(true)}>Selbst bauen</button>
    </div>
    {mode && <>
      <h3>Dein Bauauftrag</h3><p>{project.build.goal}</p>
      <p>Lade das Startgerüst herunter und programmiere in deinem Editor. Prüfe jede Etappe anhand des beschriebenen Ergebnisses. Die Häkchen sind deine eigene Bestätigung und zählen separat von automatisch geprüften Aufgaben.</p>
      <strong>{count} von {project.build.checkpoints.length} Etappen selbst geprüft</strong>
      <progress aria-label="Projektetappen" value={count} max={project.build.checkpoints.length} />
      <ol className="project-checkpoints">{project.build.checkpoints.map(step => <li key={step.id}>
        <label><input type="checkbox" checked={!!completed[step.id]} onChange={event => toggle(step.id, event.target.checked)} /><strong>{step.title}</strong></label>
        <p>{step.check}</p>
        <button className="text-button" aria-expanded={!!hints[step.id]} onClick={() => setHints(previous => ({ ...previous, [step.id]: !previous[step.id] }))}>{hints[step.id] ? 'Hinweis ausblenden' : `Hinweis: ${step.title}`}</button>
        {hints[step.id] && <p className="project-hint">{step.hint}</p>}
      </li>)}</ol>
      <p role="status">{status}</p>
      <button className="button secondary" onClick={() => setMode(false)}>Referenz ansehen</button>
    </>}
  </section>;
}
