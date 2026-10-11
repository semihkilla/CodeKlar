import { useEffect, useState } from 'react';
import { courses, lessons } from '../data';
import { reviewQueue } from '../review';

export function ReviewPractice({ progress, openLesson }) {
  const [course, setCourse] = useState('all');
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = setInterval(update, 60000);
    window.addEventListener('focus', update);
    return () => { clearInterval(timer); window.removeEventListener('focus', update); };
  }, []);
  const queue = reviewQueue(lessons, progress, now).filter(item => course === 'all' || item.lesson.course === course);
  const retries = queue.filter(item => item.retry).length;
  return <section className="review-practice" aria-label="Gezielt wiederholen">
    <div className="review-heading"><div><h2>Gezielt wiederholen</h2><p>Erst Fehler klären, danach Gelerntes auffrischen.</p></div>
      <label>Lernbereich<select aria-label="Wiederholungsbereich" value={course} onChange={event => setCourse(event.target.value)}><option value="all">Alle Lernbereiche</option>{courses.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
    </div>
    <p>{queue.length} {queue.length === 1 ? 'Aufgabe' : 'Aufgaben'} bereit · {retries} zuletzt ohne erfolgreiche Prüfung</p>
    {queue.length ? <ol className="review-list">{queue.slice(0, 5).map(({ lesson, retry }) => <li key={lesson.id}>
      <div><strong>{lesson.title}</strong><small>{courses.find(item => item.id === lesson.course).name} · {retry ? 'Noch einmal versuchen' : 'Zum Auffrischen fällig'}</small></div>
      <button className="button secondary" onClick={() => openLesson(lesson.id, 'task')} aria-label={`${lesson.title} wiederholen`}>Üben</button>
    </li>)}</ol> : <p className="review-empty">Gerade ist nichts fällig. Neue Prüfungen helfen dir, passende Wiederholungen zu sammeln.</p>}
    {queue.length > 5 && <p>Hier stehen die nächsten fünf Aufgaben. In den Übungen findest du alle unter „Zur Wiederholung“.</p>}
    <details><summary>Wie entstehen die Vorschläge?</summary><p>Eine fehlgeschlagene Prüfung bleibt sofort fällig. Erfolgreiche Prüfungen verschieben die nächste Wiederholung um 1, 3, 7 und dann 14 Tage. Ein Fehler setzt diese Serie zurück. Frühere gelöste Aufgaben ohne Wiederholungsverlauf werden nach sieben Tagen vorgeschlagen. Das ist eine Lernhilfe und keine Bewertung deiner Sprachkenntnisse.</p><p>Eine erneut fehlgeschlagene Prüfung löscht den bisherigen Abschluss nicht. Die Wiederholungen werden zusammen mit deinem Fortschritt lokal gespeichert und exportiert.</p></details>
  </section>;
}
