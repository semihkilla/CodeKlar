import { useEffect, useState } from 'react';
import { zipSync, strToU8 } from 'fflate';
import guides from '../ideaGuides.json';
import './IdeaToCode.css';

const storageKey = 'codeklar-idea-code-v1';
const stages = ['Ziel eingrenzen', 'Daten darstellen', 'Ablauf zerlegen', 'Code verbinden', 'Ergebnis prüfen', 'Selbst weiterbauen'];
const questions = [
  ['goal', 'Was soll jemand damit tun können?', 'Zum Beispiel: Eine Nachricht schreiben und an eine andere Person senden.'],
  ['small', 'Was ist die kleinste erste Version?', 'Zum Beispiel: Eine Nachricht auf demselben Gerät anzeigen.'],
  ['data', 'Welche Daten brauchst du?', 'Zum Beispiel: id, Text, Absender, Zeitpunkt. Welche Typen und Regeln haben sie?'],
  ['flow', 'Was passiert Schritt für Schritt?', 'Eingabe → prüfen → verarbeiten → Ergebnis anzeigen. Formuliere zuerst in Alltagssprache.'],
  ['location', 'Wo sollen die Daten leben und wohin sollen sie?', 'Arbeitsspeicher, lokale Datei oder Server? Ein anderes Gerät braucht einen erreichbaren Empfangsweg.'],
  ['check', 'Woran erkennst du, dass es funktioniert?', 'Beschreibe eine normale Eingabe, einen Fehlerfall und das jeweils erwartete Ergebnis.'],
];
function readState() {
  const clean = { mode: 'examples', guideId: guides[0].id, step: 0, draft: {}, answers: {}, done: {} };
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey));
    if (!raw || raw.version !== 1) return clean;
    if (raw.mode === 'own') clean.mode = 'own';
    if (guides.some(g => g.id === raw.guideId)) clean.guideId = raw.guideId;
    if (Number.isInteger(raw.step) && raw.step >= 0 && raw.step < stages.length) clean.step = raw.step;
    for (const [key] of questions) if (typeof raw.draft?.[key] === 'string') clean.draft[key] = raw.draft[key].slice(0, 2000);
    for (const guide of guides) {
      if (typeof raw.answers?.[guide.id] === 'string') clean.answers[guide.id] = raw.answers[guide.id].slice(0, 2000);
      if (Array.isArray(raw.done?.[guide.id])) clean.done[guide.id] = stages.map((_, i) => raw.done[guide.id][i] === true);
    }
  } catch { /* A missing, blocked or old store starts a fresh worksheet. */ }
  return clean;
}

export default function IdeaToCode({ openProject }) {
  const [state, setState] = useState(readState);
  const [saved, setSaved] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...state })); setSaved(true); }
    catch { setSaved(false); }
  }, [state]);
  const guide = guides.find(g => g.id === state.guideId);
  const done = state.done[guide.id] || [];
  const completed = done.filter(Boolean).length;
  function download() {
    const readme = `# ${guide.title}\n\n${guide.goal}\n\n${guide.run}\n\n${guide.note}\n\n## Erwartete Ausgabe\n${guide.output}\n\n## Prüfen\n${guide.checks.map(s => '- ' + s).join('\n')}\n\n## Selbst weiterbauen\n${guide.task}\n`;
    const files = Object.fromEntries(Object.entries({ 'Main.java': guide.source, ...guide.files, 'README.md': readme }).map(([name, text]) => [name, strToU8(text)]));
    const url = URL.createObjectURL(new Blob([zipSync(files)], { type: 'application/zip' }));
    const link = document.createElement('a'); link.href = url; link.download = `codeklar-idee-${guide.id}.zip`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadStatus('Beispiel heruntergeladen. Die Startanleitung steht in README.md.');
  }
  return <section className="idea-page">
    <div className="page-intro"><h1>Von der Idee zum Code.</h1><p>Du weißt, was du bauen willst. Hier lernst du, daraus Daten, Abläufe und ein erstes Programm zu machen.</p></div>
    <div className="idea-modes" aria-label="Arbeitsweise">
      <button aria-pressed={state.mode === 'examples'} onClick={() => setState(s => ({ ...s, mode: 'examples' }))}>An einem Beispiel lernen</button>
      <button aria-pressed={state.mode === 'own'} onClick={() => setState(s => ({ ...s, mode: 'own' }))}>Meine eigene Idee zerlegen</button>
    </div>
    <p className="idea-save" role="status">{saved ? 'Deine Notizen und Etappen sind auf diesem Gerät gespeichert.' : 'Speichern ist hier nicht möglich. Lade deinen Plan herunter, um ihn zu behalten.'}</p>
    {state.mode === 'own' ? <section className="idea-sheet" aria-label="Mein Bauplan">
      <h2>Erst ein kleiner Bauplan.</h2><p>Beantworte eine Frage nach der anderen. Du musst noch keine Methodennamen kennen. Der Plan ist deine eigene Skizze; er erzeugt keinen Code automatisch.</p>
      {questions.map(([key, title, hint]) => <label key={key}><span id={`idea-question-${key}`}>{title}</span><small id={`idea-hint-${key}`}>{hint}</small><textarea aria-labelledby={`idea-question-${key}`} aria-describedby={`idea-hint-${key}`} maxLength={2000} rows={3} value={state.draft[key] || ''} onChange={e => setState(s => ({ ...s, draft: { ...s.draft, [key]: e.target.value } }))} /></label>)}
      <button className="project-action" onClick={() => {
        const text = '# Mein Bauplan\n\n' + questions.map(([key, title]) => `## ${title}\n${state.draft[key] || '(noch offen)'}\n`).join('\n');
        const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
        const link = document.createElement('a'); link.href = url; link.download = 'mein-bauplan.md'; link.click();setTimeout(() => URL.revokeObjectURL(url), 1000);
      }}>Bauplan herunterladen</button>
    </section> : <>
      <label className="idea-selector">Was möchtest du bauen?<select aria-label="Was möchtest du bauen?" value={guide.id} onChange={e => { setState(s => ({ ...s, guideId: e.target.value, step: 0 })); setDownloadStatus(''); }}>
        {guides.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
      </select></label>
      <div className="idea-step-picker"><label>Etappe<select aria-label="Etappe" value={state.step} onChange={e => setState(s => ({ ...s, step: Number(e.target.value) }))}>{stages.map((name, i) => <option key={name} value={i}>{i + 1}. {name}{done[i] ? ' ✓' : ''}</option>)}</select></label><span>{completed} von 6 Etappen markiert</span></div>
      <article className="idea-stage" key={`${guide.id}-${state.step}`}>
        <p className="idea-eyebrow">{guide.title} · Etappe {state.step + 1} von 6</p><h2>{stages[state.step]}</h2>
        {state.step === 0 && <><blockquote>„{guide.goal}“</blockquote><h3>Deine erste kleine Version</h3><p>{guide.small}</p><p className="idea-callout">Die Zerlegung funktioniert auch in anderen Sprachen. Diese ersten sechs Beispiele setzen sie mit Java um. Die Anzeige enthält zusätzlich eine Browserfassung mit HTML und JavaScript.</p></>}
        {state.step === 1 && <><p>Beschreibe zuerst, was dein Programm wissen muss. Wähle danach die Darstellung im Code.</p><dl className="idea-fields">{guide.fields.map(([name, type, why]) => <div key={name}><dt>{name}<small>{type}</small></dt><dd>{why}</dd></div>)}</dl><p className="idea-callout">Eine Darstellung ist eine Entscheidung: eine Zahl für einen Stand, ein Datensatz für zusammengehörige Eigenschaften, eine Liste für mehrere Datensätze.</p></>}
        {state.step === 2 && <><ol className="idea-flow">{guide.logic.map(([action, why]) => <li key={action}><strong>{action}</strong><p>{why}</p></li>)}</ol><h3>Zuerst in Alltagssprache</h3><pre className="idea-code" aria-label="Pseudocode">{guide.pseudocode}</pre><p>Pseudocode beschreibt den Ablauf. Du kannst ihn danach Zeile für Zeile in deine Programmiersprache übersetzen.</p></>}
        {state.step === 3 && <><p>{guide.run}</p><details className="idea-connections"><summary>Welcher Code setzt welchen Schritt um?</summary><dl>{guide.connections.map(([goal, code, why]) => <div key={goal}><dt>{goal}</dt><dd><pre className="idea-code">{code}</pre><p>{why}</p></dd></div>)}</dl></details><pre className="idea-code" tabIndex={0} aria-label="Vollständiges Java-Beispiel"><code>{guide.source}</code></pre><h3>Erwartete Ausgabe</h3><pre className="idea-code" aria-label="Erwartete Ausgabe">{guide.output}</pre><p className="idea-callout">{guide.note}</p>
          {Object.entries(guide.files).map(([name, code]) => <details key={name}><summary>Browseransicht als nächster Schritt</summary><p>Als {name} speichern und im Browser öffnen. Die Anzeige wird aus den Daten erzeugt.</p><pre className="idea-code" tabIndex={0} aria-label={`Quellcode ${name}`}><code>{code}</code></pre></details>)}
          <button className="project-action" onClick={download}>Beispiel als ZIP herunterladen</button><p role="status">{downloadStatus}</p>
          {guide.projectId && <button className="text-button" onClick={() => openProject(guide.projectId)}>Passendes vollständiges Projekt öffnen →</button>}
        </>}
        {state.step === 4 && <><p>Prüfe Verhalten, statt nur zu schauen, ob der Code startet. Lege Eingabe und erwartetes Ergebnis vorher fest.</p><ul>{guide.checks.map(check => <li key={check}>{check}</li>)}</ul><p className="idea-callout">Ein funktionierender Normalfall ist der Anfang. Teste auch leere Eingaben, Grenzen und fehlende Daten, soweit sie zur Aufgabe gehören.</p></>}
        {state.step === 5 && <><h3>Jetzt veränderst du eine Sache.</h3><p>{guide.task}</p><label className="idea-answer">Dein Ansatz<textarea aria-label="Dein Ansatz" rows={4} maxLength={2000} value={state.answers[guide.id] || ''} onChange={e => setState(s => ({ ...s, answers: { ...s.answers, [guide.id]: e.target.value } }))} placeholder="Welche Daten oder Schritte würdest du ändern?" /></label><details><summary>Ein Hinweis</summary><p>{guide.hint}</p></details><details><summary>Ansatz zum Vergleichen</summary><p>{guide.solution}</p></details><p>Dein Ansatz wird gespeichert. Führe deine Änderung aus und vergleiche das Ergebnis; hier erfolgt keine automatische Bewertung.</p></>}
        <div className="idea-stage-actions"><button aria-pressed={!!done[state.step]} onClick={() => setState(s => { const next = stages.map((_, i) => !!s.done[guide.id]?.[i]); next[s.step] = !next[s.step];return { ...s, done: { ...s.done, [guide.id]: next } }; })}>{done[state.step] ? 'Etappe ist verstanden ✓' : 'Etappe verstanden'}</button><span>Deine Selbsteinschätzung zählt unabhängig von den gelösten Wissensaufgaben.</span></div>
      </article>
      <nav className="idea-next" aria-label="Etappen wechseln"><button disabled={state.step === 0} onClick={() => setState(s => ({ ...s, step: s.step - 1 }))}>Zurück</button><button disabled={state.step === stages.length - 1} onClick={() => setState(s => ({ ...s, step: s.step + 1 }))}>Weiter</button></nav>
    </>}
  </section>;
}
