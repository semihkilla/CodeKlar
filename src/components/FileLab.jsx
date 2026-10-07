import { useEffect, useRef, useState } from "react";
import { MAX_FILE_BYTES, prepareFile } from "../fileFormats";

const STORAGE_KEY = "codeklar-file-draft-v1";
const examples = {
  txt: "Meine erste Notiz\nHeute übe ich Dateien und Ein-/Ausgabe.\n",
  json: '{\n  "titel": "Lernnotiz",\n  "inhalt": "Heute übe ich JSON.",\n  "erledigt": false\n}',
  csv: 'name,notiz\nMira,"Text mit Komma, und mehr"\nAli,"Er sagt ""Hallo"""',
};
function initialDraft() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (value?.version === 1 && typeof value.text === "string" && value.text.length <= MAX_FILE_BYTES && ["txt", "json", "csv"].includes(value.format) && typeof value.filename === "string") return value;
  } catch { /* A blocked or corrupt store does not prevent editing. */ }
  return { version: 1, text: examples.txt, format: "txt", filename: "lernnotiz" };
}

export function FileLab() {
  const [draft, setDraft] = useState(initialDraft);
  const [saved, setSaved] = useState(false);
  const [reading, setReading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const readVersion = useRef(0);
  useEffect(() => () => { readVersion.current++; }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); setSaved(true); }
    catch { setSaved(false); }
  }, [draft]);
  function edit(change) {
    setDraft((previous) => ({ ...previous, ...change }));
    setPreview(null);
    setMessage("");
  }
  async function openFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const version = ++readVersion.current;
    if (file.size > MAX_FILE_BYTES) { setMessage("Die Datei ist zu groß. Wähle eine Textdatei mit höchstens 256 KiB."); return; }
    setReading(true);
    setMessage("");
    try {
      const text = await file.text();
      if (version !== readVersion.current) return;
      if (text.includes("\u0000")) throw new Error("Diese Datei scheint keine normale Textdatei zu sein.");
      const extension = file.name.split(".").pop().toLowerCase();
      const format = ["json", "csv"].includes(extension) ? extension : "txt";
      edit({ text, format, filename: file.name.replace(/\.[^.]+$/, "") });
      setMessage(`${file.name} gelesen (${file.size} Bytes). Die Originaldatei bleibt unverändert.`);
    } catch (error) {
      if (version === readVersion.current) setMessage(`Lesen fehlgeschlagen: ${error.message}`);
    } finally { if (version === readVersion.current) setReading(false); }
  }
  function process(download = false) {
    try {
      if (new Blob([draft.text]).size > MAX_FILE_BYTES) throw new Error("Der Inhalt darf höchstens 256 KiB groß sein.");
      const result = prepareFile(draft.text, draft.format);
      setPreview(result.preview);
      if (!download) {
        setMessage(draft.format === "csv" ? `${result.count} CSV-Zeilen gelesen. Die Vorschau zeigt höchstens 10 Zeilen.` : "Inhalt erfolgreich geprüft. Die Vorschau zeigt die Ausgabe.");
        return;
      }
      const link = document.createElement("a");
      const url = URL.createObjectURL(new Blob([result.content], { type: result.mime }));
      link.href = url;
      link.download = `${draft.filename.trim().replace(/[\\/:*?"<>|]/g, "_") || "lernnotiz"}.${draft.format}`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("Download angefordert. Dein Browser bietet die Datei zum Speichern oder Teilen an.");
    } catch (error) { setPreview(null); setMessage(`Inhalt nicht verarbeitet: ${error.message}`); }
  }
  return (
    <section id="file-lab" className="file-lab" aria-label="Notizen und Datei-Labor">
      <h2>Notizen & Datei-Labor</h2>
      <p>Öffne eine Text-, JSON- oder CSV-Datei, bearbeite eine Kopie und lade das Ergebnis herunter. Deine Dateien werden hier im Browser verarbeitet.</p>
      <div className="file-controls">
        <label>Datei öffnen (bis 256 KiB)<input aria-label="Datei öffnen" type="file" accept=".txt,.json,.csv,text/plain,application/json,text/csv" disabled={reading} onChange={openFile} /></label>
        <label>Ausgabeformat<select value={draft.format} disabled={reading} onChange={(event) => edit({ format: event.target.value })}><option value="txt">Text (.txt)</option><option value="json">JSON (.json)</option><option value="csv">CSV (.csv)</option></select></label>
        <label>Dateiname ohne Endung<input value={draft.filename} maxLength={100} disabled={reading} onChange={(event) => edit({ filename: event.target.value })} /></label>
      </div>
      <label className="file-text-label">Dateiinhalt<textarea value={draft.text} maxLength={MAX_FILE_BYTES} disabled={reading} spellCheck={false} onChange={(event) => edit({ text: event.target.value })} /></label>
      <div className="file-actions">
        <button className="button secondary" disabled={reading} onClick={() => edit({ text: examples[draft.format] })}>Beispiel laden</button>
        <button className="button secondary" disabled={reading} onClick={() => process()}>Inhalt prüfen</button>
        <button className="button primary" disabled={reading} onClick={() => process(true)}>Datei herunterladen</button>
      </div>
      <p className="file-draft-status">{saved ? "Notizentwurf lokal gespeichert. Er bleibt beim Neuladen erhalten." : "Entwurf kann gerade nicht gespeichert werden. Sichere deinen Inhalt als Download."}</p>
      {reading && <p role="status">Datei wird gelesen …</p>}
      {message && <p role="status">{message}</p>}
      {preview !== null && <div className="file-preview"><h3>Ausgabevorschau</h3><pre aria-label="Datei-Ausgabe">{preview}</pre></div>}
      <details><summary>Welche Funktionen stecken dahinter?</summary>
        <p><code>input.files[0]</code> liefert die ausgewählte Datei. <code>await datei.text()</code> liest ihren Text. <code>JSON.parse()</code> liest JSON; <code>JSON.stringify()</code> erzeugt JSON. CSV wird unter Berücksichtigung zitierter Felder eingelesen.</p>
        <p><code>new Blob([text])</code> erzeugt den Downloadinhalt. <code>URL.createObjectURL(blob)</code> erstellt eine temporäre Adresse; ein Link mit <code>download</code> fordert den Download an. <code>URL.revokeObjectURL()</code> gibt die Adresse später frei.</p>
        <p>Der Browser öffnet nur eine von dir ausgewählte Datei und überschreibt sie nicht. In Node.js gibt es dagegen etwa <code>readFile</code>, <code>writeFile</code> und <code>mkdir</code> aus <code>node:fs/promises</code>. Diese Serverfunktionen laufen hier nicht im Browser-Spielplatz.</p>
        <pre className="file-api-example">{'// Beispiel für eine lokale Node.js-Datei, nicht den Browser\nimport { mkdir, writeFile, readFile } from "node:fs/promises";\n\nawait mkdir("notizen", { recursive: true });\nawait writeFile("notizen/lernen.txt", "Meine Notiz\\n", "utf8");\nconst text = await readFile("notizen/lernen.txt", "utf8");\nconsole.log(text);'}</pre>
        <p><code>mkdir</code> erstellt einen Ordner, <code>writeFile</code> schreibt oder ersetzt eine Datei und <code>readFile</code> liest sie. <code>"utf8"</code> legt die Textkodierung fest. Für Node.js-Terminaleingaben gibt es <code>node:readline/promises</code>; <code>process.stdout.write()</code> schreibt in die Standardausgabe. Im Browser nutzt du stattdessen Eingabefelder und sichtbare Oberflächenelemente.</p>
        <p>CSV verwendet in diesem Labor Kommas als Trennzeichen. JSON- und CSV-Downloads können ihre Formatierung ändern; die enthaltenen Daten bleiben erhalten.</p>
      </details>
      <p className="file-draft-status">Dieses Labor zählt keine Lektion automatisch als gelöst. Prüfe deine Codeaufgaben separat. Lokale Entwürfe werden durch das Löschen der Websitedaten entfernt.</p>
    </section>
  );
}
