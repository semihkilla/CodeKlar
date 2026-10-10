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
  const [byte, setByte] = useState(42);
  const [text, setText] = useState("Aä😀");
  const [step, setStep] = useState(0);
  const bytes = new TextEncoder().encode(text);
  const stage = stages[step];
  return (
    <section className="computer-lab" aria-label="Computer-Labor">
      <h2>Computer-Labor</h2>
      <p>Verändere die Daten und beobachte, was passiert. Das Ausprobieren zählt nicht als gelöste Wissensfrage.</p>
      <section className="computer-experiment" aria-label="Bit-Labor">
        <h3>Ein Byte zum Anfassen</h3>
        <p>Schalte eine Stelle um. Nur gesetzte Bits tragen ihren Stellenwert zur Zahl bei.</p>
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
          <span>Hex <strong>0x{byte.toString(16).toUpperCase().padStart(2, "0")}</strong></span>
          <span>Signed 8 Bit <strong>{byte >= 128 ? byte - 256 : byte}</strong></span>
        </div>
        <p>Unsigned: 0 bis 255. Signed als 8-Bit-Zweierkomplement: −128 bis 127. Gleiche Bits, andere Interpretation.</p>
      </section>
      <section className="computer-experiment" aria-label="Text-Labor">
        <h3>Text wird zu Bytes</h3>
        <label className="computer-field">Text für UTF-8
          <input value={text} maxLength={120} onChange={event => setText(event.target.value)} />
        </label>
        <p>Probiere „A“, „ä“, „😀“ oder „é“ (e mit kombiniertem Akzent). Maximal 120 UTF-16-Codeunits.</p>
        <div className="computer-results" aria-live="polite" aria-label="Text-Auswertung">
          <span>UTF-16-Codeunits <strong>{text.length}</strong></span>
          <span>Codepoints <strong>{Array.from(text).length}</strong></span>
          <span>UTF-8-Bytes <strong>{bytes.length}</strong></span>
        </div>
        <pre className="computer-byte-output" aria-label="UTF-8-Hexbytes">{bytes.length ? Array.from(bytes, b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ") : "Keine Bytes (leerer Text)"}</pre>
        <p>Diese Zählungen sind keine Zählung sichtbarer Zeichen. Ein Graphem kann mehrere Codepoints enthalten. TextEncoder ersetzt unpaarige UTF-16-Surrogate durch das Ersatzzeichen.</p>
      </section>
      <section className="computer-experiment" aria-label="CPU-Labor">
        <h3>Von der Rechnung zur gespeicherten Datei</h3>
        <p>Vereinfachtes Modell für 7 + 5. SAVE steht hier für erfolgreiches dauerhaftes Speichern; echte Geräte brauchen Betriebssystem und Ein-/Ausgabe.</p>
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
        <p>Dieses Modell ändert keine echten Dateien und schaltet dein Gerät nicht aus.</p>
      </section>
    </section>
  );
}
