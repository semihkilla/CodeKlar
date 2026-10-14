import { useEffect, useRef, useState } from 'react';
import { courses } from '../data';
import { sessionLessons as lessons, sessionById as lessonById } from '../sessionBank';
import { groupTopics } from '../topicGroups';
import { reviewQueue } from '../review';
import { eligibleLessons, selectSessionLessons, createSession, chooseAnswer, checkAnswer, finishSession, cleanSession, sessionSummary, chapterResults } from '../studySession';
import './StudySession.css';
const key = 'codeklar-study-session-v1';
const names = { learn: 'Lernrunde', review: 'Wiederholung', exam: 'Übungsprüfung' };
function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(key));
    if (raw?.version !== 1) return { session: null, history: [] };
    const session = cleanSession(raw.session, lessonById);
    const history = Array.isArray(raw.history) ? raw.history.filter(h => h && typeof h.id === 'string' && courses.some(c=>c.id===h.course) && Object.hasOwn(names,h.mode) && Number.isInteger(h.total) && h.total > 0 && Number.isInteger(h.correct) && h.correct >= 0 && h.correct <= h.total && Number.isFinite(h.finishedAt)).slice(-20) : [];
    return { session, history };
  } catch { return { session: null, history: [] }; }
}
export default function StudySession({ course: initialCourse, progress, recordSession, openLesson }) {
  const [store, setStore] = useState(read);
  const [course, setCourse] = useState(store.session?.course || initialCourse);
  const [chapter, setChapter] = useState('all');
  const [mode, setMode] = useState('learn');
  const [count, setCount] = useState(10), [minutes, setMinutes] = useState(10);
  const [now, setNow] = useState(Date.now), [saved, setSaved] = useState(false);
  const session = store.session;
  const questionHeading = useRef(null), roundHeader = useRef(null);
  useEffect(() => {
    if (!session) return;
    questionHeading.current?.focus({ preventScroll: true });
    (session.status === "active" ? roundHeader.current : questionHeading.current)?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [session?.id, session?.index, session?.status]);
  const groups = groupTopics(course, lessons.filter(l => l.course === course));
  const selectedGroup = groups.find(g => g.id === chapter);
  const pool = eligibleLessons(lessons, course, selectedGroup ? new Set(selectedGroup.lessons.map(l=>l.id)) : undefined);
  const due = reviewQueue(pool, progress, now);
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify({ version: 1, ...store })); setSaved(true); } catch { setSaved(false); } }, [store]);
  useEffect(() => {
    const update = () => setNow(Date.now());const timer = setInterval(update,session?.mode==='exam' && session.status==='active'?1000:60000);
    window.addEventListener('focus',update);document.addEventListener('visibilitychange',update);
    return () => { clearInterval(timer);window.removeEventListener('focus',update);document.removeEventListener('visibilitychange',update); };
  }, [session?.mode,session?.status]);
  useEffect(() => {
    if (session?.status === 'active' && session.mode === 'exam' && now >= session.deadline) setStore(s => ({ ...s, session: finishSession(s.session, lessonById, now) }));
  }, [session, now]);
  useEffect(() => {
    if (session?.status !== 'finished') return;
    recordSession(session);
    setStore(s => s.history.some(h=>h.id===session.id) ? s : { ...s, history: [...s.history, { id: session.id, course: session.course, mode: session.mode, ...(({total,correct})=>({total,correct}))(sessionSummary(session)), finishedAt: session.finishedAt }].slice(-20) });
  }, [session, recordSession]);
  function changeSession(update) { setStore(s => ({ ...s, session: update(s.session) })); }
  const item = session?.items[session.index], lesson = item && lessonById[item.id];
  const remaining = session?.mode === 'exam' ? Math.max(0, Math.ceil((session.deadline-now)/1000)) : null;
  const resultGroups = session?.status === "finished" ? groupTopics(session.course, lessons.filter(l=>l.course===session.course)) : [];
  const diagnostics = session?.status === "finished" ? chapterResults(session,resultGroups) : [];
  const summary = session?.status === 'finished' ? sessionSummary(session) : null;
  return <section className="study-page">
    <div className="page-intro"><h1>Lernen mit einem klaren Ablauf.</h1><p>Eine Sprache, eine kurze Runde. Wiederhole fälligen Stoff, kläre Fehler und prüfe deinen Stand.</p></div>
    <p className="study-note" role="status">{saved ? 'Runde und Ergebnisse sind auf diesem Gerät gespeichert.' : 'Speichern nicht möglich: Beim Schließen könnten Runde und Ergebnisse verloren gehen.'}</p>
    {!session && <>
      <div className="study-setup">
        <label>Lernbereich<select aria-label="Lernbereich der Runde" value={course} onChange={e=>{setCourse(e.target.value);setChapter('all');}}>{courses.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label>Kapitel<select aria-label="Kapitel der Runde" value={chapter} onChange={e=>setChapter(e.target.value)}><option value="all">Alle Kapitel</option>{groups.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></label>
        <label>Modus<select aria-label="Modus der Runde" value={mode} onChange={e=>setMode(e.target.value)}><option value="learn">Lernrunde</option><option value="review">Nur fällige Wiederholungen</option><option value="exam">Prüfungsmodus</option></select></label>
        <label>Rundenlänge<select aria-label="Fragenzahl" value={count} onChange={e=>setCount(Number(e.target.value))}>{[5,10,20].map(n=><option key={n} value={n}>{n} Fragen</option>)}</select></label>
        {mode==='exam' && <label>Zeitlimit<select aria-label="Zeitlimit" value={minutes} onChange={e=>setMinutes(Number(e.target.value))}>{[5,10,20].map(n=><option key={n} value={n}>{n} Minuten</option>)}</select></label>}
      </div>
      <div className="study-card"><h2>{names[mode]}</h2><p>{due.length} Aufgaben fällig · {pool.length} Wissensfragen im gewählten Bereich.</p><p>{mode==='exam' ? 'Zufällige Fragen aus den ausgewählten Kapiteln. Lösungen bleiben bis zur Abgabe verborgen. Unbeantwortete Fragen zählen als falsch. Die Uhr läuft bei Navigation oder Neuladen weiter.' : mode==='review' ? 'Nur fällige Fragen: Fehler zuerst, danach Wiederholungen. Eine falsche Antwort kommt am Rundenende einmal erneut.' : 'Zuerst fällige Fragen, dann neuer Stoff in Lernpfadreihenfolge. Direktes Feedback nach jeder Antwort; Fehler kommen am Ende einmal erneut.'}</p>
        {mode==='review' && !due.length && <p>Gerade ist nichts fällig. Starte eine Lernrunde oder komm am nächsten Wiederholungstermin zurück.</p>}
        <button className="button primary" disabled={!pool.length || (mode==='review' && !due.length)} onClick={()=>setStore(s=>({...s,session:createSession(selectSessionLessons(pool,progress,mode,count,selectedGroup?[selectedGroup]:groups),mode,minutes)}))}>Runde starten</button>
        <p className="study-note">Es werden höchstens so viele Fragen verwendet, wie verfügbar sind. Das sind Wissenschecks; praktische Codeaufgaben und lokale Java-Übungen bearbeitest du zusätzlich. JavaScript-Codeaufgaben werden dadurch nicht als gelöst markiert.</p>
      </div>
      <details className="study-card"><summary>Wie hilft die Wiederholung?</summary><p>Fehler bleiben sofort fällig. Eine erfolgreiche Runde plant die nächste Wiederholung nach 1, 3, 7 und dann 14 Tagen. Wiederholungsversuche innerhalb einer Runde zählen pro Aufgabe als ein Endergebnis. Dein bisheriger Abschluss bleibt bei einem Fehler erhalten.</p></details>
      {!!store.history.filter(h=>h.course===course).length && <section className="study-card"><h2>Deine letzten Runden</h2><ul>{store.history.filter(h=>h.course===course).slice(-5).reverse().map(h=><li key={h.id}>{names[h.mode]} · {h.correct}/{h.total} auf Anhieb richtig · {new Date(h.finishedAt).toLocaleDateString('de-DE')}</li>)}</ul></section>}
    </>}
    {session?.status==='active' && <>
      <div className="study-round-heading" ref={roundHeader}><span>{courses.find(c=>c.id===session.course).name} · {names[session.mode]} · Frage {session.index+1} von {session.items.length}</span>{remaining!==null && <span role="timer" aria-label="Verbleibende Prüfungszeit">{Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</span>}</div>
      {session.mode==='exam' && <label className="study-jump">Frage wechseln<select aria-label="Prüfungsfrage" value={session.index} onChange={e=>changeSession(s=>({...s,index:Number(e.target.value)}))}>{session.items.map((x,i)=><option key={i} value={i}>{i+1}. {x.answer!==null?'Beantwortet':'Offen'}</option>)}</select></label>}
      <article className="study-card" key={session.index}><small>{lesson.category}{session.index>=session.initialCount?' · Wiederholungsversuch':''}</small><h2 ref={questionHeading} tabIndex={-1}>{lesson.title}</h2>
        {session.mode!=='exam' && <p>{lesson.description}</p>}
        {typeof lesson.example==='string' && <pre className="study-source" tabIndex={0} aria-label="Beispiel zur Frage"><code>{lesson.example}</code></pre>}<p>{lesson.question}</p>
        <div role="radiogroup" aria-label="Antwort der Runde" className="study-options">{item.order.map((original,i)=><button key={i} role="radio" aria-checked={item.answer===i} disabled={item.checked} onClick={()=>changeSession(s=>chooseAnswer(s,i,lessonById))}><span>{String.fromCharCode(65+i)}</span><span>{lesson.options[original]}</span></button>)}</div>
        {session.mode!=='exam' && !item.checked && <button className="button primary" disabled={item.answer===null} onClick={()=>changeSession(s=>checkAnswer(s,lessonById))}>Antwort prüfen</button>}
        {item.checked && <div className="study-feedback" role="status"><strong>{item.passed?'Richtig.':'Noch nicht richtig.'}</strong><p>{lesson.explanation}</p>{!item.passed && <p>Richtige Antwort: <span className="study-answer">{lesson.options[lesson.answer]}</span></p>}</div>}
      </article>
      <div className="study-actions">
        {session.mode==='exam' && <button className="button secondary" disabled={session.index===0} onClick={()=>changeSession(s=>({...s,index:s.index-1}))}>Vorherige Frage</button>}
        <button className="button primary" disabled={session.mode!=='exam' && !item.checked} onClick={()=>changeSession(s=>s.index+1<s.items.length?{...s,index:s.index+1}:finishSession(s,lessonById))}>{session.index+1<session.items.length?'Nächste Frage':session.mode==='exam'?'Prüfung abgeben':'Runde abschließen'}</button>
        {session.mode==='exam' && session.index+1<session.items.length && <button className="button secondary" onClick={()=>changeSession(s=>finishSession(s,lessonById))}>Prüfung jetzt abgeben</button>}
      </div>
      {session.mode==='exam' && <p className="study-note">{session.items.filter(x=>x.answer===null).length} Fragen noch unbeantwortet. Bei Abgabe oder Zeitablauf zählen sie als falsch.</p>}
      <p className="study-note">Du kannst die Ansicht verlassen und hier weitermachen. Für eine neue Runde schließe diese zuerst ab.</p>
    </>}
    {summary && <section className="study-card">
      <h2 ref={questionHeading} tabIndex={-1}>{session.mode==='exam'?'Prüfung ausgewertet':'Runde abgeschlossen'}</h2><p className="study-score">{summary.correct} von {summary.total} auf Anhieb richtig ({Math.round(summary.correct/summary.total*100)} %)</p>
      {session.mode!=='exam' && <p>{summary.mastered} am Ende richtig · {summary.retries} zusätzliche Wiederholungsversuche.</p>}
      <p>Die Ergebnisse aktualisieren deine Wiederholungen. Das ist ein Übungsstand und kein Nachweis, dass du die Sprache vollständig beherrschst.</p>
      <section aria-label="Kapitel-Auswertung"><h3>Dein Stand in dieser Runde</h3><p className="study-note">Die Zahlen beziehen sich nur auf die Fragen dieser Runde. Nicht geprüfte Kapitel werden nicht bewertet.</p><div className="study-chapters">{diagnostics.map(row=><article key={row.id}><h4>{row.name}</h4><p>{row.correct}/{row.total} auf Anhieb richtig · {row.finalCorrect}/{row.total} am Ende richtig</p><button className="button secondary" onClick={()=>{
        const group = resultGroups.find(g=>g.id===row.id);
        const chosen = row.failedIds.length ? row.failedIds.map(id=>lessonById[id]) : selectSessionLessons(eligibleLessons(lessons,session.course,new Set(group.lessons.map(l=>l.id))),progress,'learn',count,[group]);
        setCourse(session.course);setStore(s=>({...s,session:createSession(chosen,row.failedIds.length?'review':'learn')}));
      }}>{row.failedIds.length?'Fehler aus diesem Kapitel üben':'Weiteres aus diesem Kapitel lernen'}</button></article>)}</div></section>
      {summary.results.some(x=>!x.passed) && <button className="button primary" onClick={()=>setStore(s=>({...s,session:createSession(summary.results.filter(x=>!x.passed).map(x=>lessonById[x.id]),'review')}))}>Alle offenen Fehler gezielt üben</button>}
      <button className="button secondary" onClick={()=>{
        const text = `# Meine ${names[session.mode]}\n\nLernbereich: ${courses.find(c=>c.id===session.course).name}\nDatum: ${new Date(session.finishedAt).toISOString()}\n\nAuf Anhieb: ${summary.correct}/${summary.total}\nAm Ende: ${summary.mastered}/${summary.total}\n\n## Kapitel\n${diagnostics.map(r=>`- ${r.name}: ${r.correct}/${r.total} auf Anhieb, ${r.finalCorrect}/${r.total} am Ende`).join('\n')}\n\n## Antworten\n${session.items.filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i).map(x=>{const l=lessonById[x.id];return `### ${l.title}\nDeine Antwort: ${x.answer===null?'Nicht beantwortet':l.options[x.order[x.answer]]}\nRichtig: ${l.options[l.answer]}\n${l.explanation}\n`;}).join('\n')}`;
        const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='codeklar-rundenauswertung.md';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      }}>Auswertung herunterladen</button>
      <h3>Antworten verstehen</h3>{session.items.filter((x,i,items)=>items.findIndex(y=>y.id===x.id)===i).map((x,i)=>{const l=lessonById[x.id];return <details key={x.id}><summary>{i+1}. {l.title} · {x.passed?'Richtig':'Wiederholen'}</summary><p>Deine Antwort: <span className="study-answer">{x.answer===null?'Nicht beantwortet':l.options[x.order[x.answer]]}</span></p><p>Richtige Antwort: <span className="study-answer">{l.options[l.answer]}</span></p><p>{l.explanation}</p><button className="text-button" onClick={()=>openLesson(l.id,'explanation')}>Lektion und eigene Übung öffnen →</button></details>;})}
      <button className="button primary" onClick={()=>{setCourse(session.course);setStore(s=>({...s,session:null}));}}>Neue Runde planen</button>
    </section>}
  </section>;
}
