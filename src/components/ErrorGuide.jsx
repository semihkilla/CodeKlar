import { useState } from 'react';
import { displayValue, errorExamples, runErrorExample } from '../errorExamples';

export function ErrorGuide({ openLesson }) {
  const [id, setId] = useState(errorExamples[0].id), [query, setQuery] = useState('');
  const [broken, setBroken] = useState(null), [corrected, setCorrected] = useState(null);
  const matches = errorExamples.filter(item => `${item.title} ${item.type} ${item.cause}`.toLowerCase().includes(query.toLowerCase()));
  const example = errorExamples.find(item => item.id === id);
  function select(next) { setId(next); setBroken(null); setCorrected(null); }
  return <section className="reference-tool" aria-label="Fehler verstehen">
    <h2>Fehlermeldung lesen, Ursache finden, verbessern.</h2>
    <p>Wähle einen typischen JavaScript-Fehler und führe das Beispiel aus. Die Beispiele zeigen echte Laufzeitfehler oder falsche Ergebnisse. Der Wortlaut einer Fehlermeldung kann je nach Browser abweichen.</p>
    <div className="tool-controls">
      <label>Fehler suchen<input aria-label="Fehler suchen" placeholder="Zum Beispiel TypeError, JSON oder return" value={query} maxLength={160} onChange={e => setQuery(e.target.value)} /></label>
      <label>Fehlerbeispiel<select aria-label="Fehlerbeispiel" value={matches.some(item => item.id === id) ? id : ''} onChange={e => select(e.target.value)}><option value="" disabled>Beispiel wählen</option>{matches.map(item => <option key={item.id} value={item.id}>{item.type}: {item.title}</option>)}</select></label>
    </div>
    {matches.length === 0 ? <p role="status">Kein Beispiel gefunden. Suche nach einem anderen Begriff.</p> : !matches.some(item => item.id === id) ? <p role="status">Wähle eines der gefundenen Beispiele.</p> : <>
      <h3>{example.title}</h3>
      <div className="error-explanation-grid">
        <article className="error-explanation"><h4>1. Fehlermeldung oder falsches Ergebnis</h4><span className="tool-badge">{example.type}</span>
          <pre className="tool-code">{example.brokenCode}</pre>
          {example.simulated && <p>Nachgebildete Fehlermeldung für das gezeigte const-Beispiel.</p>}
          <button className="button secondary" onClick={() => setBroken(runErrorExample(example))}>Fehlerbeispiel ausführen</button>
          <div className="tool-output tool-output-error" role="status" aria-label="Fehlerausgabe">{broken ? broken.ok ? `Keine Ausnahme geworfen. Ergebnis: ${displayValue(broken.value)}` : `${broken.name}: ${broken.message}` : 'Noch nicht ausgeführt.'}</div>
        </article>
        <article className="error-explanation"><h4>2. Warum passiert das?</h4><p>{example.cause}</p><details className="reading-more"><summary>So erkennst du es beim nächsten Mal</summary><p>{example.prevent}</p></details></article>
        <article className="error-explanation"><h4>3. So verbesserst du den Code</h4><p>{example.fix}</p><pre className="tool-code">{example.fixedCode}</pre>
          <button className="button primary" onClick={() => setCorrected(runErrorExample(example, true))}>Korrektur ausprobieren</button>
          <div className="tool-output" role="status" aria-label="Korrigierte Ausgabe">{corrected ? corrected.ok ? `Ergebnis: ${displayValue(corrected.value)}` : `${corrected.name}: ${corrected.message}` : 'Noch nicht ausgeführt.'}</div>
        </article>
      </div>
      <button className="text-button" onClick={() => openLesson(example.lesson, 'task')}>Dazu selbst eine Aufgabe lösen →</button>
      <p className="tool-footnote">Hier führst du feste Beispiele aus. Du kannst deinen eigenen Code anschließend im Spielplatz bearbeiten und prüfen. Das Ansehen der Beispiele verändert deinen Lernfortschritt nicht.</p>
    </>}
  </section>;
}
