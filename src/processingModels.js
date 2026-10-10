// Explicit small teaching models, independent of real CPU/cache timing.
export function initialCache(capacity = 2) {
  return { capacity, keys: [], hits: 0, misses: 0, history: [] };
}
export function accessCache(state, key) {
  if (typeof key !== 'string' || !key.trim() || key.length > 12) throw new Error('Nutze einen Schlüssel mit 1 bis 12 Zeichen.');
  const hit = state.keys.includes(key);
  const keys = state.keys.filter(item => item !== key);
  keys.push(key);
  const evicted = keys.length > state.capacity ? keys.shift() : null;
  return { ...state, keys, hits: state.hits + Number(hit), misses: state.misses + Number(!hit), history: [...state.history, { key, hit, evicted, keys: [...keys] }].slice(-12) };
}
export function initialSchedule(quantum = 1) {
  return { quantum, remaining: [3, 1, 2], queue: [0, 1, 2], trace: [], current: null };
}
export function stepSchedule(state) {
  if (!state.queue.length) return state;
  const queue = [...state.queue], remaining = [...state.remaining];
  const current = queue.shift(), used = Math.min(state.quantum, remaining[current]);
  remaining[current] -= used;
  if (remaining[current] > 0) queue.push(current);
  return { ...state, queue, remaining, current, trace: [...state.trace, ...Array(used).fill(current)] };
}
