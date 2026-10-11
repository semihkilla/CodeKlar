export const transforms = {
  double: { label: 'Verdoppeln', code: 'n * 2', apply: n => n * 2 },
  square: { label: 'Quadrieren', code: 'n * n', apply: n => n * n },
  increment: { label: 'Eins addieren', code: 'n + 1', apply: n => n + 1 },
};
export const predicates = {
  even: { label: 'Nur gerade Zahlen', code: 'n % 2 === 0', apply: n => n % 2 === 0 },
  positive: { label: 'Nur positive Zahlen', code: 'n > 0', apply: n => n > 0 },
  large: { label: 'Nur Zahlen ab 3', code: 'n >= 3', apply: n => n >= 3 },
};
export function parseComparisonInput(text) {
  if (text.length > 2000) throw new Error('Bitte höchstens 2.000 Zeichen eingeben.');
  let input;
  try { input = JSON.parse(text); }
  catch { throw new Error('Schreibe eine JSON-Zahlenliste, zum Beispiel [1, 2, 3, 4].'); }
  if (!Array.isArray(input) || input.length > 20 || input.some(n => typeof n !== 'number' || !Number.isFinite(n) || Math.abs(n) > 10000)) {
    throw new Error('Erlaubt sind bis zu 20 Zahlen zwischen −10.000 und 10.000. Auch [] ist gültig.');
  }
  return input;
}
export function compareMethods(input, transform = 'double', predicate = 'even') {
  const change = transforms[transform], keep = predicates[predicate];
  if (!change || !keep) throw new Error('Unbekannte Vergleichsregel.');
  const traces = { map: [], filter: [], forEach: [] }, collected = [];
  const mapped = input.map((value, index) => {
    const result = change.apply(value);
    traces.map.push({ index, value, result });
    return result;
  });
  const filtered = input.filter((value, index) => {
    const result = keep.apply(value);
    traces.filter.push({ index, value, result });
    return result;
  });
  const returned = input.forEach((value, index) => {
    const result = change.apply(value);
    collected.push(result);
    traces.forEach.push({ index, value, result });
  });
  return { mapped, filtered, returned, collected, traces };
}
