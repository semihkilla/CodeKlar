import { useState } from "react";

const weights = [128, 64, 32, 16, 8, 4, 2, 1];
const stages = [
  { instruction: "Start: Lade eine Zahl aus dem RAM ins CPU-Register.", register: null, ram: 7, disk: null },
  { instruction: "LOAD: Der Wert 7 wurde aus dem RAM ins Register geladen.", register: 7, ram: 7, disk: null },
  { instruction: "ADD: Die CPU addiert 5. Im Register steht jetzt 12; im RAM noch 7.", register: 12, ram: 7, disk: null },
  { instruction: "STORE: Das Ergebnis 12 wurde ins RAM geschrieben. Auf der SSD ist es noch nicht gespeichert.", register: 12, ram: 12, disk: null },
  { instruction: "SAVE: Das Programm hat 12 dauerhaft auf der SSD gespeichert.", register: 12, ram: 12, disk: 12 },
  { instruction: "Strom aus: Register und RAM verlieren ihre Werte. Die SSD behält 12.", register: null, ram: null, disk: 12 },
];
const commands = ["LOAD aus RAM", "ADD 5", "STORE ins RAM", "SAVE auf SSD", "Strom ausschalten"];

export function ComputerLab() {
  const [experiment, setExperiment] = useState("bits");
  const [byte, setByte] = useState(42);
  const [text, setText] = useState("Aä😀");
  const [step, setStep] = useState(0);
  const bytes = new TextEncoder().encode(text);
  const stage = stages[step];
  return (
    <section className="computer-lab" aria-label="Computer-Labor">
      <h2>Computer-Labor</h2>
      <p>Beginne mit den Bits. Danach kannst du Text umwandeln oder eine Rechnung bis zum Speichern verfolgen.</p>
      <label className="computer-field">Grundlagen-Experiment<select aria-label="Grundlagen-Experiment" value={experiment} onChange={e => setExperiment(e.target.value)}><option value="bits">1. Bits: Schalter ergeben eine Zahl</option><option value="text">2. Text: Buchstaben werden Bytes</option><option value="memory">3. Speichern: RAM und SSD</option></select></label>
      <section className="computer-experiment" aria-label="Bit-Labor" hidden={experiment !== "bits"}>
        <h3>Ein Byte zum Anfassen</h3>
        <p>Probiere zuerst den Schalter mit dem Wert 1. Eine 1 zählt ihren Wert zur Zahl dazu; eine 0 lässt ihn weg. Die Werte über den Schaltern werden also addiert.</p>
        <div className="bit-grid">
          {weights.map(weight => {
            const on = (byte & weight) !== 0;
            return <button key={weight} className={`bit-toggle ${on ? "is-set" : ""}`} aria-label={`Bit ${weight}`} aria-pressed={on} onClick={() => setByte(value => value ^ weight)}><small>{weight}</small><strong>{on ? 1 : 0}</strong></button>;
          })}
        </div>
        <label className="computer-field">Vorzeichenloser Wert (0–255)
          <input type="range" min="0" max="255" value={byte} onChange={event => setByte(Number(event.target.value))} />
        </label>
        <div className="computer-results" aria-live="polite" aria-label="Byte-Auswertung">
          <span>Binär <strong>{byte.toString(2).padStart(8, "0")}</strong></span>
          <span>Dezimal <strong>{byte}</strong></span>
          <details className="reading-more"><summary>Andere Schreibweisen: Hex und negative Zahlen</summary><span>Hex <strong>0x{byte.toString(16).toUpperCase().padStart(2, "0")}</strong></span>
          <span>Signed 8 Bit <strong>{byte >= 128 ? byte - 256 : byte}</strong></span><p>Hex schreibt dieselben Bits kompakt. Als 8-Bit-Zahl mit Vorzeichen im Zweierkomplement reichen die Werte von −128 bis 127. Deshalb kann dasselbe Muster hier eine andere Zahl bedeuten.</p></details>
        </div>
        <p>Dezimal ist unsere gewöhnliche Zahlenschreibweise. Binär schreibt dieselbe Zahl mit Nullen und Einsen. Hier lesen wir das Byte ohne Vorzeichen: 0 bis 255.</p>
      </section>
      <section className="computer-experiment" aria-label="Text-Labor" hidden={experiment !== "text"}>
        <h3>Text wird zu Bytes</h3>
        <label className="computer-field">Text für UTF-8
          <input value={text} maxLength={120} onChange={event => setText(event.target.value)} />
        </label>
        <p>Gib zuerst A ein: ein Byte. Probiere danach ä: zwei Bytes. Ein 😀 braucht vier Bytes in UTF-8. Nicht jeder Buchstabe braucht also gleich viel Platz.</p>
        <div className="computer-results" aria-live="polite" aria-label="Text-Auswertung">
          <span>UTF-8-Bytes <strong>{bytes.length}</strong></span>
          <details className="reading-more"><summary>Warum Zeichen unterschiedlich gezählt werden</summary><span>UTF-16-Codeunits <strong>{text.length}</strong></span><span>Codepoints <strong>{Array.from(text).length}</strong></span><p>Ein sichtbares Zeichen kann aus mehreren Unicode-Bestandteilen (Codepoints) bestehen. JavaScript zählt mit .length UTF-16-Speichereinheiten (Codeunits). Beides zählt nicht zuverlässig sichtbare Zeichen.</p></details>
        </div>
        <pre className="computer-byte-output" aria-label="UTF-8-Hexbytes">{bytes.length ? Array.from(bytes, b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ") : "Keine Bytes (leerer Text)"}</pre>
        <p>Oben siehst du die gespeicherten Bytes in Hex-Schreibweise. Zwei Hex-Ziffern stehen für ein Byte.</p>
      </section>
      <section className="computer-experiment" aria-label="CPU-Labor" hidden={experiment !== "memory"}>
        <h3>Von der Rechnung zur gespeicherten Datei</h3>
        <p>Wir rechnen 7 + 5 und speichern das Ergebnis. Das Register ist ein kleiner Speicher direkt in der CPU. RAM ist die Arbeitsfläche, die SSD die dauerhafte Ablage. Klicke immer auf den nächsten Befehl.</p>
        <div className="computer-results computer-memory" aria-label="Speichermodell">
          <span>CPU-Register <strong>{stage.register ?? "leer"}</strong></span>
          <span>RAM <strong>{stage.ram ?? "leer"}</strong></span>
          <span>SSD <strong>{stage.disk ?? "leer"}</strong></span>
        </div>
        <p role="status">Schritt {step} von 5: {stage.instruction}</p>
        <div className="computer-actions">
          <button className="button primary" disabled={step === 5} onClick={() => setStep(value => Math.min(5, value + 1))}>{commands[step] ?? "Simulation beendet"}</button>
          <button className="button secondary" onClick={() => setStep(0)}>Modell zurücksetzen</button>
        </div>
        <p>Dies ist ein vereinfachtes Modell. SAVE steht für erfolgreiches dauerhaftes Speichern, nicht für einen echten CPU-Befehl. Dein Gerät und deine Dateien werden nicht verändert.</p>
      </section>
    </section>
  );
}
