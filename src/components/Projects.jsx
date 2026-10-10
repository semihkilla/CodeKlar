import { useState } from 'react';
import { zipSync, strToU8 } from 'fflate';
import { projects } from '../projects';
import { courses } from '../data';
import { ProjectBuild } from './ProjectBuild';

export default function Projects({ course }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(projects.find(p => p.course === course)?.id || projects[0].id);
  const [file, setFile] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const [buildMode, setBuildMode] = useState(false);
  const visible = projects.filter(p => (filter === 'all' || p.course === filter) && `${p.title} ${p.language} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
  const project = visible.find(p => p.id === selected) || visible[0];
  const filename = project && (Object.hasOwn(project.files, file) ? file : Object.keys(project.files)[0]);
  function download() {
    const readme = `# ${project.title}\n\n${project.description}\n\n## Starten\n${project.steps.map(s => '- ' + s).join('\n')}\n\n## So funktioniert es\n${project.concepts.map(c => `- ${c.name}: ${c.explanation}`).join('\n')}\n\n## Weiterbauen\n${project.ideas.map(s => '- ' + s).join('\n')}\n`;
    const starter = buildMode && project.build;
    const instructions = starter ? `\n## Selbst bauen\nDiese Dateien sind ein Startgerüst. TODOs musst du selbst implementieren.\n\n${project.build.checkpoints.map(step => '- ' + step.title + ': ' + step.check).join('\n')}\n` : '';
    const files = Object.fromEntries(Object.entries({ ...(starter ? project.build.starterFiles : project.files), 'README.md': readme + instructions }).map(([path, content]) => [path, strToU8(content)]));
    const url = URL.createObjectURL(new Blob([zipSync(files)], { type: 'application/zip' }));
    const link = document.createElement('a'); link.href = url; link.download = `codeklar-${project.id}${starter ? '-start' : ''}.zip`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadStatus(starter ? 'Startgerüst heruntergeladen. Implementiere die TODOs und prüfe deine Etappen.' : 'Projekt heruntergeladen. Entpacke das ZIP und folge der Startanleitung.');
  }
  async function copy() {
    try { await navigator.clipboard.writeText(project.files[filename]); setCopyStatus('Code kopiert.'); }
    catch { setCopyStatus('Kopieren nicht möglich. Nutze den ZIP-Download.'); }
  }
  return <section className="projects-page">
    <div className="page-intro"><h1>Aus Funktionen werden Projekte.</h1><p>Spiele, kleine Apps und Werkzeuge: vollständige Beispiele zum Ausprobieren, Verstehen und Weiterbauen.</p></div>
    <div className="project-toolbar">
      <label>Lernbereich<select aria-label="Lernbereich" value={filter} onChange={e => { setFilter(e.target.value); setFile(''); setCopyStatus(''); setDownloadStatus(''); }}><option value="all">Alle Lernbereiche</option>{courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      <label>Projekt suchen<input aria-label="Projekt suchen" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Spiel, Taschenrechner, Python …" /></label>
    </div>
    <div className="project-layout">
      <nav className="project-list" aria-label="Projektbeispiele">{visible.map(p => <button key={p.id} className={project?.id === p.id ? 'selected' : ''} aria-current={project?.id === p.id ? 'true' : undefined} onClick={() => { setSelected(p.id); setFile(''); setCopyStatus(''); setDownloadStatus(''); }}><small>{p.language}</small><strong>{p.title}</strong><span>{p.description}</span></button>)}</nav>
      {project ? <article className="project-detail" key={project.id}>
        <span className="project-tag">{project.language} · {project.build ? "Praxisprojekt" : "Einsteigerprojekt"}</span><h2>{project.title}</h2><p>{project.description}</p>
        {project.build && <ProjectBuild key={project.id} project={project} mode={buildMode} setMode={value => { setBuildMode(value); setDownloadStatus(''); }} />}
        <button className="project-action" onClick={download}>{buildMode && project.build ? 'Startgerüst als ZIP herunterladen' : 'Projekt als ZIP herunterladen'}</button><p role="status">{downloadStatus}</p>
        <h3>So startest du</h3><ol>{project.steps.map(s => <li key={s}>{s}</li>)}</ol>
        {!project.demo && <p className="project-hint">Dieses Projekt läuft in deiner eigenen Entwicklungsumgebung. Hier kannst du alle Dateien lesen und herunterladen.</p>}
        {project.demo && <><h3>Direkt ausprobieren</h3><iframe className={`project-demo${project.build ? " project-demo-expanded" : ""}`} title={`${project.title} ausprobieren`} sandbox="allow-scripts allow-downloads" srcDoc={`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; form-action 'none';">${project.demo}`} /></>}
        {(!buildMode || !project.build) && <><h3>Vollständiger Code</h3><div className="project-files" aria-label="Projektdateien">{Object.keys(project.files).map(path => <button key={path} aria-pressed={filename === path} onClick={() => { setFile(path); setCopyStatus(''); }}>{path}</button>)}</div>
        <div className="project-code-head"><span>{filename}</span><button onClick={copy}>Code kopieren</button></div><pre className="project-code" tabIndex={0} aria-label={`Quellcode ${filename}`}><code>{project.files[filename]}</code></pre><p role="status">{copyStatus}</p></>}
        <h3>Was die Funktionen hier bewirken</h3><dl>{project.concepts.map(c => <div key={c.name}><dt>{c.name}</dt><dd>{c.explanation}</dd></div>)}</dl>
        <h3>Deine nächsten Herausforderungen</h3><ul>{project.ideas.map(s => <li key={s}>{s}</li>)}</ul><p className="project-hint">Baue zunächst das Beispiel nach. Verändere dann eine Sache, erkläre sie in eigenen Worten und prüfe das Ergebnis. Diese Beispiele ergänzen den Lernpfad; sie zählen nicht automatisch als gelöste Übung.</p>
      </article> : <p role="status">Keine Projekte gefunden. Ändere den Suchbegriff oder Lernbereich.</p>}
    </div>
  </section>;
}
