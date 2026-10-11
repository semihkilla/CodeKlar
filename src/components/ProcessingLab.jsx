import { useState } from 'react';
import { initialCache, accessCache, initialSchedule, stepSchedule } from '../processingModels';

export function ProcessingLab() {
  const [experiment, setExperiment] = useState('cache');
  const [cache, setCache] = useState(initialCache);
  const [key, setKey] = useState('A'), [message, setMessage] = useState('');
  const [schedule, setSchedule] = useState(initialSchedule);
  const names = ['A', 'B', 'C'];
  function access() {
    try { setCache(accessCache(cache, key.trim())); setMessage(''); }
    catch (error) { setMessage(error.message); }
  }
  return <section className="computer-lab" aria-label="Cache und Zeitplanung">
    <h2>Cache und Zeitplanung</h2>
    <p>Ein Cache hält Daten zum schnellen Wiederverwenden bereit. Zeitverteilung bestimmt, welche Aufgabe als Nächstes rechnen darf. Wähle eines der beiden Modelle.</p>
    <label className="computer-field">Verarbeitungs-Experiment<select aria-label="Verarbeitungs-Experiment" value={experiment} onChange={e => setExperiment(e.target.value)}><option value="cache">Cache: Daten wiederverwenden</option><option value="schedule">Zeitverteilung: Aufgaben wechseln sich ab</option></select></label>
    <section className="computer-experiment" aria-label="Cache-Labor" hidden={experiment !== "cache"}>
      <h3>Welche Daten bleiben im Cache?</h3>
      <label className="computer-field">Cacheplätze<select aria-label="Cacheplätze" value={cache.capacity} onChange={e => {setCache(initialCache(Number(e.target.value)));setMessage('Kapazität geändert: Das Modell beginnt neu.');}}>{[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}</select></label>
      <label className="computer-field">Zugriffsschlüssel<input value={key} maxLength={12} onChange={e => setKey(e.target.value)} onKeyDown={e => {if(e.key==='Enter')access();}} /></label>
      <div className="computer-actions"><button className="button primary" onClick={access}>Cache-Zugriff</button><button className="button secondary" onClick={() => {let next=initialCache(cache.capacity);for(const item of ['A','B','A','C','A'])next=accessCache(next,item);setCache(next);setMessage('Beispielfolge A, B, A, C, A ausgeführt.');}}>Beispielfolge laden</button><button className="button secondary" onClick={() => {setCache(initialCache(cache.capacity));setMessage('');}}>Cache zurücksetzen</button></div>
      <div className="computer-results" aria-label="Cache-Auswertung" aria-live="polite"><span>Treffer <strong>{cache.hits}</strong></span><span>Fehlschläge <strong>{cache.misses}</strong></span><span>Ältester → neuester <strong>{cache.keys.join(' → ') || 'leer'}</strong></span></div>
      <p>LRU verdrängt den am längsten ungenutzten Schlüssel. Das Modell behandelt symbolische Einträge; echte CPU-Caches arbeiten mit Speicherzeilen und eigenen Regeln.</p>
      <p role="status">{message}</p>
      <details className="reading-more"><summary>Bisherige Zugriffe ansehen</summary><div className="computer-table-wrap"><table className="computer-table"><caption>Die letzten zwölf Zugriffe</caption><thead><tr><th>Schlüssel</th><th>Ergebnis</th><th>Verdrängt</th></tr></thead><tbody>{cache.history.map((row,i)=><tr key={i}><td>{row.key}</td><td>{row.hit?'Hit':'Miss'}</td><td>{row.evicted??'–'}</td></tr>)}</tbody></table></div></details>
    </section>
    <section className="computer-experiment" aria-label="Zeitplanungs-Labor" hidden={experiment !== "schedule"}>
      <h3>Ein Kern, drei Aufgaben</h3>
      <p>Drei Aufgaben warten auf einen CPU-Kern. A braucht 3, B braucht 1 und C braucht 2 Zeiteinheiten. Mit einer Zeitscheibe von 1 darf jede Aufgabe kurz rechnen und stellt sich dann wieder hinten an, wenn sie noch nicht fertig ist. So kommen alle an die Reihe.</p>
      <label className="computer-field">Zeitscheibe<select aria-label="Zeitscheibe" value={schedule.quantum} onChange={e=>setSchedule(initialSchedule(Number(e.target.value)))}>{[1,2,3].map(n=><option key={n} value={n}>{n} Zeiteinheit{n===1?'':'en'}</option>)}</select></label>
      <div className="computer-actions"><button className="button primary" disabled={!schedule.queue.length} onClick={()=>setSchedule(stepSchedule(schedule))}>Scheduler-Schritt</button><button className="button secondary" onClick={()=>setSchedule(initialSchedule(schedule.quantum))}>Zeitplan zurücksetzen</button></div>
      <div className="computer-results" aria-label="Scheduler-Auswertung" aria-live="polite">{schedule.remaining.map((remaining,i)=><span key={i}>Aufgabe {names[i]} Rest <strong>{remaining}</strong></span>)}<span>Queue <strong>{schedule.queue.map(i=>names[i]).join(' → ')||'leer'}</strong></span></div>
      <ol className="scheduler-trace" aria-label="CPU-Zeitverlauf">{schedule.trace.map((task,i)=><li key={i}><small>t={i}</small><strong>{names[task]}</strong></li>)}</ol>
      <p role="status">{schedule.queue.length ? `Nächste Aufgabe: ${names[schedule.queue[0]]}` : 'Alle Aufgaben fertig.'}</p>
      <p>Das Modell zählt keine realen Umschaltkosten und keine I/O-Wartezeiten. Es zeigt Nebenläufigkeit durch Zeitwechsel; es führt keine echten Threads aus.</p>
    </section>
  </section>;
}
