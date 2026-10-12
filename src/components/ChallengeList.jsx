import { useState } from 'react';
import { challengeLessons } from '../challengeLessons';

export function ChallengeList({ progress, openLesson }) {
  const [level, setLevel] = useState('all'), [status, setStatus] = useState('all');
  const filtered = challengeLessons.filter(item => (level === 'all' || item.challenge.level === level) && (status === 'all' || (status === 'solved' ? progress.solved[item.id] : !progress.solved[item.id])));
  const next = filtered.find(item => !progress.solved[item.id]);
  return <section className="challenge-list" aria-label="Algorithmus-Challenges">
    <h2>Vom ersten Durchlauf zum eigenen Algorithmus.</h2>
    <p>Zwölf JavaScript-Aufgaben: erst einzelne Durchläufe, dann Suche und Fenster, danach Graphen und dynamische Programmierung. Jede Aufgabe hat klare Eingaben, Randfälle und automatische Tests. Die Zeitzielwerte sind Übungsvorschläge.</p>
    <p><strong>{challengeLessons.filter(item=>progress.solved[item.id]).length} von {challengeLessons.length} Challenges gelöst</strong></p>
    {next && <button className="button primary" onClick={()=>openLesson(next.id,'task')}>Nächste offene Challenge starten</button>}
    <details className="reading-more"><summary>So übst du sinnvoll</summary><ol><li>Erkläre die Aufgabe in eigenen Worten und schreibe zwei Beispiele auf.</li><li>Baue erst eine korrekte Lösung. Die Stoppuhr ist optional.</li><li>Prüfe leere Eingaben, Duplikate und Grenzen.</li><li>Schätze Laufzeit und Speicherbedarf und verbessere deinen Ansatz.</li><li>Vergleiche erst danach mit der Referenz und löse die Aufgabe später erneut.</li></ol></details>
    <div className="tool-controls"><label>Schwierigkeit<select aria-label="Challenge-Schwierigkeit" value={level} onChange={e=>setLevel(e.target.value)}><option value="all">Alle Stufen</option>{['Leicht','Mittel','Schwer'].map(value=><option key={value}>{value}</option>)}</select></label><label>Challenge-Status<select aria-label="Challenge-Status" value={status} onChange={e=>setStatus(e.target.value)}><option value="all">Alle Challenges</option><option value="open">Noch offen</option><option value="solved">Gelöst</option></select></label></div>
    <div className="challenge-cards">{filtered.map(item=><article className="method-card" key={item.id}><span className="tool-badge">{item.challenge.level} · Zeitziel {item.challenge.minutes} Min.</span><h3>{item.name}</h3><p>{item.task}</p><button className="button secondary" onClick={()=>openLesson(item.id,'task')}>{progress.solved[item.id] ? 'Erneut lösen' : 'Challenge öffnen'}</button></article>)}</div>
    {!filtered.length && <p role="status">Keine Challenges für diesen Filter.</p>}
  </section>;
}
