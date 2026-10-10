import { useState } from "react";
import { addFourBits, initialCpuState, parseCpuProgram, stepCpu } from "../computerModels";

const cpuExamples = {
  sum: "SET 7\nADD 5\nSTORE 0\nHALT",
  overflow: "SET 255\nADD 1\nSTORE 0\nHALT",
  loop: "SET 3\nSTORE 0\nADD 255\nJZ 6\nSTORE 0\nJMP 2\nHALT",
};
const bin = value => value.toString(2).padStart(4, "0");
function GateLab() {
  const [a, setA] = useState(1), [b, setB] = useState(0), [gate, setGate] = useState("AND");
  const output = (x, y) => gate === "AND" ? x & y : gate === "OR" ? x | y : gate === "XOR" ? x ^ y : 1 - x;
  return <section className="computer-experiment" aria-label="Gatter-Labor">
    <h3>Schalter → Logikgatter → Ergebnis</h3>
    <label className="computer-field">Logikgatter<select aria-label="Logikgatter" value={gate} onChange={e => setGate(e.target.value)}>{["AND","OR","XOR","NOT"].map(g => <option key={g}>{g}</option>)}</select></label>
    <div className="computer-actions"><button className="button secondary" aria-pressed={a === 1} onClick={() => setA(1-a)}>Eingang A: {a}</button><button className="button secondary" disabled={gate === "NOT"} aria-pressed={b === 1} onClick={() => setB(1-b)}>Eingang B: {b}</button></div>
    <p className="computer-flow" aria-live="polite">{gate === "NOT" ? `A=${a}` : `A=${a}, B=${b}`} → {gate} → <strong>Ausgang {output(a,b)}</strong></p>
    <p>NOT hat nur den Eingang A. Die Tabelle beschreibt logische Zustände; echte Schaltungen haben Laufzeiten.</p>
    <table className="computer-table"><caption>Wahrheitstabelle für {gate}</caption><thead><tr><th>A</th>{gate !== "NOT" && <th>B</th>}<th>Ausgang</th></tr></thead><tbody>{(gate === "NOT" ? [[0,0],[1,0]] : [[0,0],[0,1],[1,0],[1,1]]).map(([x,y]) => <tr key={`${x}${y}`} className={x === a && (gate === "NOT" || y === b) ? "current-model-row" : ""}><td>{x}</td>{gate !== "NOT" && <td>{y}</td>}<td>{output(x,y)}</td></tr>)}</tbody></table>
  </section>;
}
function AdderLab() {
  const [a, setA] = useState(15), [b, setB] = useState(1);
  const result = addFourBits(a,b);
  return <section className="computer-experiment" aria-label="Addier-Labor">
    <h3>Vier Bits addieren – inklusive Übertrag</h3>
    <label className="computer-field">Zahl A (0–15)<input type="range" min="0" max="15" value={a} onChange={e=>setA(Number(e.target.value))} /></label>
    <label className="computer-field">Zahl B (0–15)<input type="range" min="0" max="15" value={b} onChange={e=>setB(Number(e.target.value))} /></label>
    <p className="computer-flow" aria-live="polite">{bin(a)} ({a}) + {bin(b)} ({b}) = <strong>{result.carry}{bin(result.value)} ({a+b})</strong></p>
    <p>In vier Bits bleiben {bin(result.value)} ({result.value}). Der zusätzliche Übertrag ist {result.carry}. Die Tabelle rechnet von der niedrigsten Stelle aufwärts.</p>
    <div className="computer-table-wrap"><table className="computer-table"><caption>Eine Kette aus Volladdierern</caption><thead><tr><th>Stelle</th><th>A</th><th>B</th><th>Carry in</th><th>Summe</th><th>Carry out</th></tr></thead><tbody>{result.rows.map(row=><tr key={row.place}><td>{2**row.place}</td><td>{row.a}</td><td>{row.b}</td><td>{row.incoming}</td><td>{row.sum}</td><td>{row.outgoing}</td></tr>)}</tbody></table></div>
  </section>;
}
function CpuLab() {
  const [text, setText] = useState(cpuExamples.sum), [program, setProgram] = useState(null), [state, setState] = useState(initialCpuState), [error,setError] = useState("");
  function edit(value) { setText(value);setProgram(null);setState(initialCpuState());setError(""); }
  function execute(run) {
    try {
      const parsed = program ?? parseCpuProgram(text);
      let next = program ? state : initialCpuState();
      if (run) { for (let i=0;i<129 && !next.halted && !next.error;i++) next=stepCpu(parsed,next); }
      else next=stepCpu(parsed,next);
      setProgram(parsed);setState(next);setError("");
    } catch(e) { setError(e.message); }
  }
  return <section className="computer-experiment" aria-label="Programmierbare Lern-CPU">
    <h3>Dein eigenes kleines Maschinenprogramm</h3>
    <p>Erfundene 8-Bit-CPU mit einem Register, 16 RAM-Zellen und maximal 128 Schritten. PC zählt Befehlszeilen ab 0. Die angezeigten Zwei-Byte-Befehle sind unser Lernformat, kein ARM oder x86.</p>
    <label className="computer-field">CPU-Beispiel<select aria-label="CPU-Beispiel" defaultValue="sum" onChange={e=>edit(cpuExamples[e.target.value])}><option value="sum">7 + 5 speichern</option><option value="overflow">Überlauf: 255 + 1</option><option value="loop">Schleife: von 3 auf 0</option></select></label>
    <label className="computer-field">CPU-Programm<textarea aria-label="CPU-Programm" value={text} maxLength={4000} rows={8} spellCheck={false} onChange={e=>edit(e.target.value)} /></label>
    <p>SET n setzt das Register; ADD n addiert modulo 256. LOAD/STORE n lesen/schreiben RAM-Adresse 0–15. JZ n springt bei Register 0; JMP n springt immer. HALT beendet. Kommentare beginnen mit #.</p>
    <div className="computer-actions"><button className="button primary" disabled={state.halted || !!state.error} onClick={()=>execute(false)}>CPU-Schritt</button><button className="button secondary" disabled={state.halted || !!state.error} onClick={()=>execute(true)}>CPU bis HALT ausführen</button><button className="button secondary" onClick={()=>{setProgram(null);setState(initialCpuState());setError("");}}>CPU zurücksetzen</button></div>
    <div className="computer-results" aria-label="CPU-Zustand"><span>PC <strong>{state.pc}</strong></span><span>Register <strong>{state.register}</strong></span><span>Schritte <strong>{state.steps}</strong></span><span>Status <strong>{state.halted ? "HALT" : state.error ? "Gestoppt" : "Bereit"}</strong></span></div>
    <p role="status">{error || state.error || `Zuletzt: ${state.last}`}</p>
    {program && <div className="computer-table-wrap"><table className="computer-table"><caption>Befehle und Maschinenbytes (Hex)</caption><thead><tr><th>PC</th><th>Befehl</th><th>Bytes</th></tr></thead><tbody>{program.map((cmd,i)=><tr key={i} className={i===state.pc ? "current-model-row" : ""}><td>{i}</td><td>{cmd.op}{cmd.op === "HALT" ? "" : ` ${cmd.value}`}</td><td>{cmd.bytes.map(b=>b.toString(16).toUpperCase().padStart(2,"0")).join(" ")}</td></tr>)}</tbody></table></div>}
    <div className="ram-grid" aria-label="CPU-RAM">{state.ram.map((value,i)=><span key={i}>Adresse {i}<strong>{value}</strong></span>)}</div>
  </section>;
}
function ReferenceLab() {
  const [mode,setMode]=useState("alias"),[value,setValue]=useState(1);
  // Three concrete heap shapes: alias, shallow outer copy, deep nested copy.
  const original = mode === "deep" ? 1 : value;
  return <section className="computer-experiment" aria-label="Referenz-Labor">
    <h3>Zwei Namen, ein gemeinsames Objekt?</h3>
    <label className="computer-field">Kopierstrategie<select aria-label="Kopierstrategie" value={mode} onChange={e=>{setMode(e.target.value);setValue(1);}}><option value="alias">b = a (gleiche Referenz)</option><option value="shallow">b = &#123;...a&#125; (flache Kopie)</option><option value="deep">b = structuredClone(a) (tiefe Kopie)</option></select></label>
    <pre className="computer-byte-output">{mode === "alias" ? "a ─┐\nb ─┴→ Objekt #1 → profil #2" : mode === "shallow" ? "a → Objekt #1 ─┐\nb → Objekt #3 ─┴→ profil #2" : "a → Objekt #1 → profil #2\nb → Objekt #3 → profil #4"}</pre>
    <p>Ausgang: a = &#123;profil: &#123;punkte: 1&#125;&#125;. Ändere danach b.profil.punkte.</p>
    <button className="button primary" onClick={()=>setValue(n=>n+1)}>b.profil.punkte erhöhen</button>
    <div className="computer-results" aria-label="Referenz-Auswertung" aria-live="polite"><span>a.profil.punkte <strong>{original}</strong></span><span>b.profil.punkte <strong>{value}</strong></span></div>
    <p>{mode === "alias" ? "a und b erreichen dasselbe äußere Objekt und Profil." : mode === "shallow" ? "Die äußeren Objekte sind getrennt, das verschachtelte Profil bleibt geteilt." : "Die tiefe Kopie hat auch ein eigenes Profil; a bleibt unverändert."} Die Nummern sind Modellkennungen, keine echten Speicheradressen.</p>
  </section>;
}
const networkStages = [
  ["Start", "Du öffnest https://example.com/notizen. Wähle, ob die Ressource vorhanden ist."],
  ["DNS", "Der Name wird im Modell einer IP-Adresse zugeordnet. Reale Antworten können aus Caches kommen."],
  ["Verbindung", "Im HTTP/1.1-über-HTTPS-Modell wird eine TCP-Verbindung zum Server aufgebaut."],
  ["TLS", "Der Browser prüft im üblichen Zertifikatsmodell die Serveridentität und vereinbart den geschützten Transport."],
  ["HTTP-Anfrage", "GET /notizen wird über den geschützten Transport übertragen."],
  ["HTTP-Antwort", "Der Server liefert Status und Inhalt. Ein HTTP-Fehler ist trotzdem eine HTTP-Antwort."],
  ["Darstellung", "Der Browser verarbeitet den Inhalt und die Anwendung entscheidet, wie sie den Status anzeigt."],
];
function NetworkLab() {
  const [step,setStep]=useState(0),[missing,setMissing]=useState(false);
  return <section className="computer-experiment" aria-label="Netzwerk-Labor">
    <h3>Vom Domainnamen zur HTTP-Antwort</h3>
    <p>Eine schrittweise Simulation ohne echte Netzwerkanfrage. Wir zeigen eine neue HTTP/1.1-Verbindung über HTTPS; HTTP/2, HTTP/3, Wiederverwendung und Fehlerfälle haben andere Details.</p>
    <label className="computer-field">Serverantwort<select aria-label="Serverantwort" value={missing ? "404" : "200"} onChange={e=>{setMissing(e.target.value==="404");setStep(0);}}><option value="200">Ressource vorhanden (200)</option><option value="404">Ressource fehlt (404)</option></select></label>
    <ol className="network-stages">{networkStages.map(([title],i)=><li key={title} aria-current={step===i ? "step" : undefined} className={i<=step ? "reached-stage" : ""}>{title}</li>)}</ol>
    <p role="status">{networkStages[step][1]}</p>
    {step>=5 && <pre className="computer-byte-output" aria-label="Simulierte HTTP-Antwort">{missing ? "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNicht gefunden" : "HTTP/1.1 200 OK\nContent-Type: text/plain\n\nMeine Notizen"}</pre>}
    <div className="computer-actions"><button className="button primary" disabled={step===6} onClick={()=>setStep(n=>n+1)}>Netzwerk-Schritt</button><button className="button secondary" onClick={()=>setStep(0)}>Anfrage zurücksetzen</button></div>
  </section>;
}
export function ComputerSystemsLab() {
  const [tab,setTab]=useState("gates");
  const tabs=[["gates","Gatter & Addition"],["cpu","Lern-CPU"],["references","Referenzen"],["network","Netzwerk"]];
  return <section className="computer-lab" aria-label="System-Labor"><h2>System-Labor</h2><p>Baue Schaltungen, programmiere eine kleine CPU und verfolge, wie Daten geteilt oder übertragen werden. Experimente sind getrennt vom Quiz-Fortschritt.</p>
    <div className="system-lab-tabs" role="tablist" aria-label="System-Experimente">{tabs.map(([id,label])=><button key={id} role="tab" id={`system-tab-${id}`} aria-controls={`system-panel-${id}`} aria-selected={tab===id} tabIndex={tab===id ? 0 : -1} onKeyDown={event=>{
      if (!["ArrowRight","ArrowLeft","Home","End"].includes(event.key)) return;
      event.preventDefault();
      const current=tabs.findIndex(([key])=>key===tab);
      const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:(current+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
      setTab(tabs[next][0]);event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next].focus();
    }} className={`button ${tab===id ? "primary" : "secondary"}`} onClick={()=>setTab(id)}>{label}</button>)}</div>
    <div id="system-panel-gates" role="tabpanel" aria-labelledby="system-tab-gates" hidden={tab!=="gates"}><GateLab/><AdderLab/></div>
    <div id="system-panel-cpu" role="tabpanel" aria-labelledby="system-tab-cpu" hidden={tab!=="cpu"}><CpuLab/></div>
    <div id="system-panel-references" role="tabpanel" aria-labelledby="system-tab-references" hidden={tab!=="references"}><ReferenceLab/></div>
    <div id="system-panel-network" role="tabpanel" aria-labelledby="system-tab-network" hidden={tab!=="network"}><NetworkLab/></div>
  </section>;
}
