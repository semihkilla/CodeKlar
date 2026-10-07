export const MAX_FILE_BYTES = 256 * 1024;

export function parseCsv(text) {
  if (!text.length) return [];
  const rows = [];
  let row = [], field = "", quoted = false, closed = false, pending = false;
  const endField = () => { row.push(field); field = ""; closed = false; };
  const endRow = () => { endField(); rows.push(row); row = []; pending = false; };
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { quoted = false; closed = true; }
      } else field += char;
      continue;
    }
    if (char === ",") { endField(); pending = true; }
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      endRow();
    } else if (closed) throw new Error("Nach einem schließenden CSV-Anführungszeichen muss ein Komma oder Zeilenumbruch folgen.");
    else if (char === '"') {
      if (field.length) throw new Error("CSV-Anführungszeichen müssen am Anfang eines Felds stehen.");
      quoted = true; pending = true;
    } else { field += char; pending = true; }
  }
  if (quoted) throw new Error("Ein CSV-Feld hat kein schließendes Anführungszeichen.");
  if (pending) endRow();
  return rows;
}

export function writeCsv(rows) {
  return rows.map((row) => row.map((field) => {
    const text = String(field);
    return text === "" || /[",\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  }).join(",")).join("\n");
}

export function prepareFile(text, format) {
  if (format === "json") {
    const data = JSON.parse(text.replace(/^\uFEFF/, ""));
    return { content: JSON.stringify(data, null, 2), preview: JSON.stringify(data, null, 2), mime: "application/json;charset=utf-8" };
  }
  if (format === "csv") {
    const rows = parseCsv(text.replace(/^\uFEFF/, ""));
    return { content: writeCsv(rows), preview: JSON.stringify(rows.slice(0, 10), null, 2), mime: "text/csv;charset=utf-8", count: rows.length };
  }
  return { content: text, preview: text, mime: "text/plain;charset=utf-8" };
}
