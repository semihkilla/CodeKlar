import { useEffect, useState } from 'react';

export function ChallengeClock({ lesson }) {
  const key = `codeklar-challenge-clock-v1-${lesson.id}`;
  const [clock, setClock] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved && Number.isFinite(saved.elapsed) && saved.elapsed >= 0 && saved.elapsed <= 31536000000 && (saved.started === null || (Number.isFinite(saved.started) && saved.started > 0 && saved.started <= Date.now()))) return saved;
    } catch {}
    return { elapsed: 0, started: null };
  });
  const [now, setNow] = useState(Date.now), [status, setStatus] = useState('');
  useEffect(() => {
    if (clock.started === null) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [clock.started]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(clock)); }
    catch { setStatus('Zeitmessung konnte nicht lokal gespeichert werden.'); }
  }, [clock, key]);
  const elapsed = clock.elapsed + (clock.started === null ? 0 : Math.max(0, now - clock.started));
  const seconds = Math.floor(elapsed / 1000);
  function toggle() {
    const timestamp = Date.now(); setNow(timestamp);
    setClock(previous => previous.started === null ? { ...previous, started: timestamp } : { elapsed: previous.elapsed + Math.max(0, timestamp - previous.started), started: null });
  }
  return <section className="challenge-clock" aria-label="Challenge-Zeit">
    <div><strong>Optionale Stoppuhr</strong><output aria-label="Verstrichene Lösungszeit">{String(Math.floor(seconds / 60)).padStart(2,'0')}:{String(seconds % 60).padStart(2,'0')}</output><span>Übungsziel: {lesson.challenge.minutes} Minuten</span></div>
    <div className="computer-actions"><button className="button secondary" onClick={toggle}>{clock.started === null ? 'Zeit starten' : 'Zeit pausieren'}</button><button className="text-button" onClick={() => {setClock({elapsed:0,started:null});setNow(Date.now());}}>Zeit zurücksetzen</button></div>
    <details className="reading-more"><summary>Was misst die Uhr?</summary><p>Deine Zeit zum Nachdenken und Programmieren, nicht die Laufzeit des Codes. Sie läuft nach dem Start auch im Hintergrund und nach Neuladen weiter, bis du pausierst. Das Zeitziel ist eine Orientierung; du kannst danach weiterarbeiten. Es verändert die Bewertung nicht.</p></details>
    <p role="status">{status || (seconds >= lesson.challenge.minutes * 60 ? 'Zeitziel erreicht. Arbeite in Ruhe weiter und prüfe deinen Ansatz.' : '')}</p>
  </section>;
}

const costs = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(k)', 'O(r · c)', 'O(a · k)', 'O(a)', 'O(v + e)'];
export function ComplexityCheck({ lesson }) {
  const [time, setTime] = useState(''), [space, setSpace] = useState(''), [checked, setChecked] = useState(false);
  const correct = time === lesson.challenge.time && space === lesson.challenge.space;
  return <details className="reading-more complexity-check"><summary>Effizienzcheck: Laufzeit und Speicher</summary>
    <p>Schätze diesen Ansatz ein: <strong>{lesson.challenge.strategy}</strong></p>
    <p>Big O beschreibt, wie der Aufwand mit der Eingabe wächst. O(n) wächst ungefähr linear, O(log n) viel langsamer. Gezählt wird zusätzlicher Speicher, einschließlich neu erzeugter Ergebnislisten, ohne die bereits vorhandene Eingabe. Für Map und Set nehmen wir durchschnittlich konstante Zugriffszeit an.</p>
    <div className="tool-controls">{[['Laufzeit des beschriebenen Ansatzes',time,setTime],['Zusätzlicher Speicher des Ansatzes',space,setSpace]].map(([label,value,setValue]) => <label key={label}>{label}<select aria-label={label} value={value} onChange={e=>{setValue(e.target.value);setChecked(false);}}><option value="">Bitte einschätzen</option>{costs.map(cost=><option key={cost}>{cost}</option>)}</select></label>)}</div>
    <button className="button secondary" disabled={!time || !space} onClick={()=>setChecked(true)}>Komplexität prüfen</button>
    {checked && <p role="status">{correct ? 'Passend eingeschätzt.' : 'Noch nicht passend.'} Der beschriebene Ansatz braucht {lesson.challenge.time} Zeit und {lesson.challenge.space} zusätzlichen Speicher.</p>}
    <details className="reading-more"><summary>Meinen eigenen Code beurteilen</summary><ul><li>Wie oft werden die Eingabewerte besucht? Gibt es verschachtelte Schleifen?</li><li>Wie groß können Maps, Sets, Kopien, Queues oder Rekursionsstapel werden?</li><li>Berücksichtige auch Methoden wie sort, slice und shift, statt sie pauschal als einen kostenlosen Schritt zu zählen.</li></ul><p>Bestehende Tests beweisen keine bestimmte Komplexität. Eine langsamere korrekte Lösung kann bestehen. Erkläre deshalb auch deinen eigenen Ansatz und vergleiche ihn nach dem Lösen mit der Referenz.</p></details>
  </details>;
}
