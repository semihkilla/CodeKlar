import { useState } from 'react';
import { compareMethods, parseComparisonInput, predicates, transforms } from '../methodComparison';
import { displayValue } from '../errorExamples';

const methods = [
  { id: 'map', title: 'map', purpose: 'Jeden Wert umwandeln', returnText: 'Neue Liste: ein Ergebnis pro vorhandenem Element.', lesson: 'js-map' },
  { id: 'filter', title: 'filter', purpose: 'Passende Werte auswählen', returnText: 'Neue Liste: nur die ursprünglichen Werte, für die die Bedingung true ist.', lesson: 'js-filter' },
  { id: 'forEach', title: 'forEach', purpose: 'Etwas für jedes Element tun', returnText: 'Immer undefined. Eine zusätzliche Liste entsteht hier nur, weil unser Callback sie ausdrücklich befüllt.', lesson: 'js-fn-callback' },
];
export function MethodComparison({ openLesson }) {
  const [text, setText] = useState('[1, 2, 3, 4]');
  const [transform, setTransform] = useState('double'), [predicate, setPredicate] = useState('even');
  const [method, setMethod] = useState('map'), [step, setStep] = useState(0);
  let input, result, error;
  try { input = parseComparisonInput(text); result = compareMethods(input, transform, predicate); }
  catch (e) { error = e.message; }
  function reset(change) { change(); setStep(0); }
  const transformation = transforms[transform].code, condition = predicates[predicate].code;
  const trace = result?.traces[method] ?? [];
  const codes = {
    map: `const ergebnis = werte.map(n => ${transformation});`,
    filter: `const ergebnis = werte.filter(n => ${condition});`,
    forEach: `const gesammelt = [];\nconst ergebnis = werte.forEach(n => {\n  gesammelt.push(${transformation});\n});`,
  };
  return <section className="reference-tool" aria-label="Methodenvergleich">
    <h2>Gleiche Daten, verschiedene Methoden.</h2>
    <p>Alle drei Methoden bekommen dieselbe Zahlenliste. map und forEach verwenden dieselbe Rechnung; filter prüft eine Bedingung. Ändere die Daten und vergleiche die Rückgaben.</p>
    <div className="tool-controls">
      <label>Zahlenliste (JSON)<textarea aria-label="Zahlenliste (JSON)" value={text} maxLength={2000} rows={2} spellCheck={false} onChange={e => reset(() => setText(e.target.value))} /></label>
      <details className="reading-more comparison-rules"><summary>Rechnung und Filter ändern</summary><div className="tool-controls">
      <label>Rechnung für map und forEach<select aria-label="Rechnung für map und forEach" value={transform} onChange={e => reset(() => setTransform(e.target.value))}>{Object.entries(transforms).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select></label>
      <label>Bedingung für filter<select aria-label="Bedingung für filter" value={predicate} onChange={e => reset(() => setPredicate(e.target.value))}>{Object.entries(predicates).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select></label>
      </div></details>
    </div>
    <div className="tool-presets" aria-label="Beispiellisten">{[['Startbeispiel', '[1, 2, 3, 4]'], ['Mit Null und Minus', '[-2, 0, 3, 5]'], ['Leere Liste', '[]']].map(([label, value]) => <button className="button secondary" key={label} onClick={() => reset(() => setText(value))}>{label}</button>)}</div>
    {error ? <p className="tool-error" role="alert">{error}</p> : <>
      <p className="tool-source">Gemeinsame Eingabe: <code>{displayValue(input)}</code></p>
      <div className="method-cards" aria-live="polite">{methods.map(item => <article className="method-card" key={item.id} aria-label={`${item.title}-Ergebnis`}>
        <h3><code>.{item.title}()</code></h3><p>{item.purpose}</p>
        <pre className="tool-code">{codes[item.id]}</pre>
        <dl><dt>Rückgabe der Methode</dt><dd><code>{displayValue(item.id === 'map' ? result.mapped : item.id === 'filter' ? result.filtered : result.returned)}</code></dd></dl>
        {item.id === 'forEach' && <dl><dt>Zusätzlich befüllte Liste gesammelt</dt><dd><code>{displayValue(result.collected)}</code></dd></dl>}
        <p>{item.returnText}</p>
        <button className="text-button" onClick={() => openLesson(item.lesson)}>Passende Übung öffnen →</button>
      </article>)}</div>
      <p>Die ursprüngliche Liste bleibt in diesen Beispielen unverändert. Die Methoden selbst überschreiben sie nicht; ein anders geschriebener Callback könnte sie oder enthaltene Objekte verändern. forEach wartet auch nicht auf Promises eines async-Callbacks.</p>
      <details className="reading-more tool-trace"><summary>Callback Schritt für Schritt verfolgen</summary>
        <label className="computer-field">Methode verfolgen<select aria-label="Methode verfolgen" value={method} onChange={e => reset(() => setMethod(e.target.value))}>{methods.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
        <p>Ein Callback ist die Funktion, die die Methode für ein Element aufruft. Der Index beginnt bei 0.</p>
        <div className="computer-actions"><button className="button primary" disabled={step >= trace.length} onClick={() => setStep(s => s + 1)}>Nächsten Callback zeigen</button><button className="button secondary" onClick={() => setStep(0)}>Ablauf zurücksetzen</button></div>
        <div role="status">{trace.length === 0 ? 'Leere Liste: kein Callback-Aufruf.' : step === 0 ? 'Bereit: Zeige den ersten Callback.' : `Aufruf ${step} von ${trace.length}: Index ${trace[step - 1].index}, Wert ${trace[step - 1].value}. ${method === 'filter' ? `Bedingung: ${trace[step - 1].result}. Der Wert wird ${trace[step - 1].result ? 'behalten' : 'weggelassen'}.` : `Rechnung ergibt ${trace[step - 1].result}. ${method === 'map' ? 'Dieser Wert kommt in die Rückgabeliste.' : 'Dieser Wert wird in gesammelt geschrieben; forEach liefert trotzdem undefined.'}`}`}</div>
      </details>
    </>}
  </section>;
}
