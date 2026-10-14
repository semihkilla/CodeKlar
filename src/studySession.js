import { reviewQueue, nextReview } from './review.js';

export const SESSION_MODES = ['learn', 'review', 'exam'];
export function eligibleLessons(lessons, course, ids) {
  return lessons.filter(l => l.course === course && (!ids || ids.has(l.id)) && typeof l.question === 'string' && Array.isArray(l.options) && l.options.every(x=>typeof x==='string') && l.options.length >= 2 && Number.isInteger(l.answer) && l.answer >= 0 && l.answer < l.options.length);
}
function shuffle(values, random) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
export function selectSessionLessons(pool, progress, mode, count, groups = [], now = Date.now(), random = Math.random) {
  const due = reviewQueue(pool, progress, now).map(x => x.lesson);
  if (mode === 'review') return due.slice(0, count);
  if (mode === 'learn') {
    const seen = new Set(due.map(l => l.id));
    const rest = pool.filter(l => !seen.has(l.id));
    const fresh = rest.filter(l => !progress.attempted[l.id] && !progress.solved[l.id]);
    const known = rest.filter(l => progress.attempted[l.id] || progress.solved[l.id]);
    return [...due, ...fresh, ...known].slice(0, count);
  }
  // Draw across the selected chapters instead of taking only the first chapter.
  const available = new Set(pool.map(l => l.id));
  const covered = new Set();
  const buckets = groups.map(group => group.lessons.filter(l => available.has(l.id) && !covered.has(l.id)).map(l => { covered.add(l.id); return l; })).filter(b => b.length);
  const extra = pool.filter(l => !covered.has(l.id)); if (extra.length) buckets.push(extra);
  if (!buckets.length) buckets.push([...pool]);
  const ordered = shuffle(buckets, random).map(b => shuffle(b, random));
  const result = [];
  while (result.length < Math.min(count, pool.length)) {
    for (const bucket of ordered) { if (bucket.length && result.length < count) result.push(bucket.pop()); }
  }
  return result;
}
export function createSession(selected, mode, minutes = 10, now = Date.now(), random = Math.random) {
  if (!selected.length) return null;
  return { id: `round-${now}-${Math.floor(random() * 1e9)}`, course: selected[0].course, mode, status: 'active', startedAt: now, deadline: mode === 'exam' ? now + minutes * 60000 : null, index: 0, initialCount: selected.length,
    items: selected.map(l => ({ id: l.id, order: shuffle(l.options.map((_, i) => i), random), answer: null, checked: false, passed: null })), finishedAt: null };
}
export function finishSession(session, known, now = Date.now()) {
  if (!session || session.status === 'finished') return session;
  return { ...session, status: 'finished', finishedAt: now, items: session.items.map(item => ({ ...item, checked: true, passed: item.answer !== null && item.order[item.answer] === known[item.id].answer })) };
}
export function chooseAnswer(session, answer, known, now = Date.now()) {
  if (session.status !== 'active') return session;
  if (session.mode === 'exam' && now >= session.deadline) return finishSession(session, known, now);
  const item = session.items[session.index];
  if (item.checked || !Number.isInteger(answer) || answer < 0 || answer >= item.order.length) return session;
  return { ...session, items: session.items.map((x, i) => i === session.index ? { ...x, answer } : x) };
}
export function checkAnswer(session, known) {
  const item = session.items[session.index];
  if (session.status !== 'active' || session.mode === 'exam' || item.checked || item.answer === null) return session;
  const passed = item.order[item.answer] === known[item.id].answer;
  const items = session.items.map((x, i) => i === session.index ? { ...x, checked: true, passed } : x);
  // Retry at most once per lesson, after the other planned questions.
  if (!passed && items.filter(x => x.id === item.id).length === 1) items.push({ id: item.id, order: [...item.order], answer: null, checked: false, passed: null });
  return { ...session, items };
}
export function sessionSummary(session) {
  const first = new Map(), last = new Map();
  for (const item of session.items) { if (!first.has(item.id)) first.set(item.id, item); last.set(item.id, item); }
  return { total: first.size, correct: [...first.values()].filter(x => x.passed).length, mastered: [...last.values()].filter(x => x.passed).length, retries: session.items.length - first.size, results: [...last.values()].map(x => ({ id: x.id, passed: x.passed === true, hadError: session.items.some(y=>y.id===x.id && y.checked && !y.passed) })) };
}
export function cleanSession(raw, known) {
  if (!raw || typeof raw.id !== 'string' || !/^round-\d+-\d+$/.test(raw.id) || !SESSION_MODES.includes(raw.mode) || !['active','finished'].includes(raw.status) || !Number.isFinite(raw.startedAt) || !Number.isInteger(raw.initialCount) || raw.initialCount < 1 || raw.initialCount > 20 || !Array.isArray(raw.items) || raw.items.length < raw.initialCount || raw.items.length > raw.initialCount * 2 || !Number.isInteger(raw.index) || raw.index < 0 || raw.index >= raw.items.length) return null;
  if (raw.mode === 'exam' && (!Number.isFinite(raw.deadline) || raw.deadline <= raw.startedAt || raw.deadline > raw.startedAt + 3600000 || raw.items.length !== raw.initialCount)) return null;
  if (raw.status === 'finished' && (!Number.isFinite(raw.finishedAt) || raw.finishedAt < raw.startedAt)) return null;
  const counts = new Map();
  const items = [];
  for (const item of raw.items) {
    const lesson = known[item?.id];
    if (!lesson || lesson.course !== raw.course || !Array.isArray(lesson.options) || !Array.isArray(item.order) || item.order.length !== lesson.options.length || [...item.order].sort((a,b)=>a-b).some((v,i)=>v!==i) || (item.answer !== null && (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.order.length)) || typeof item.checked !== 'boolean' || (item.checked && item.answer === null && raw.mode !== 'exam')) return null;
    counts.set(item.id, (counts.get(item.id) || 0) + 1); if (counts.get(item.id) > (raw.mode === 'exam' ? 1 : 2)) return null;
    items.push({ id: item.id, order: [...item.order], answer: item.answer, checked: raw.status === 'finished' || (raw.mode !== 'exam' && item.checked), passed: raw.status === 'finished' || (raw.mode !== 'exam' && item.checked) ? item.answer !== null && item.order[item.answer] === lesson.answer : null });
  }
  if (counts.size !== raw.initialCount) return null;
  return { id: raw.id, course: raw.course, mode: raw.mode, status: raw.status, startedAt: raw.startedAt, deadline: raw.mode === 'exam' ? raw.deadline : null, index: raw.index, initialCount: raw.initialCount, items, finishedAt: raw.status === 'finished' ? raw.finishedAt : null };
}
export function applySessionResults(previous, session, known) {
  if (session.status !== 'finished' || previous.sessionReceipts?.includes(session.id)) return previous;
  const next = { ...previous, attempted: { ...previous.attempted }, solved: { ...previous.solved }, reviews: { ...previous.reviews }, sessionReceipts: [...(previous.sessionReceipts || []), session.id].slice(-200) };
  for (const { id, passed, hadError } of sessionSummary(session).results) {
    if (!known[id]) continue;
    next.attempted[id] = new Date(session.finishedAt).toISOString();
    next.reviews[id] = nextReview(hadError ? { ...previous.reviews?.[id], streak: 0 } : previous.reviews?.[id], passed, session.finishedAt);
    // JavaScript lessons require actual code tests; recognising an answer cannot solve them.
    if (passed && known[id].course !== 'js') next.solved[id] ||= next.attempted[id];
  }
  return next;
}
