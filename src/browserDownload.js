// Export a complete reference implementation; the editor remains a separate experiment.
export async function downloadBrowserProject(lesson) {
  const { zipSync, strToU8 } = await import('fflate');
  const files = { ...(lesson.solutionFiles || { 'main.js': lesson.solution }) };
  files['start.js'] = lesson.solutionFiles
    ? `import { ${lesson.functionName} } from './main.js';\nawait ${lesson.functionName}({});\n`
    : `import './main.js';\n`;
  if (!lesson.solutionFiles) files['main.js'] += `\n\nawait ${lesson.functionName}({});\n`;
  files['index.html'] = `<!doctype html>\n<html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CodeKlar – ${lesson.title}</title><link rel="stylesheet" href="style.css"></head><body>\n${lesson.browser.html}\n<script type="module" src="start.js"></script>\n</body></html>\n`;
  files['style.css'] = 'body{font:18px system-ui;background:#101725;color:#eef2ff;max-width:700px;margin:40px auto;padding:20px}button,input,select{font:inherit;padding:12px;border-radius:8px;margin:6px;max-width:100%;box-sizing:border-box}button{background:#a18aff;border:0;cursor:pointer}li{padding:8px}form{display:flex;flex-wrap:wrap}';
  files['README.md'] = `# ${lesson.title}\n\nVollständige Referenzlösung aus CodeKlar. Änderungen aus dem Spielplatz sind nicht enthalten.\n\n## Starten\n\n1. ZIP entpacken.\n2. In diesem Ordner ein Terminal öffnen.\n3. Mit installiertem Python: python3 -m http.server 8080\n4. http://localhost:8080 im Browser öffnen.\n\nAlternativ einen lokalen Webserver deiner Entwicklungsumgebung verwenden. ES-Module benötigen einen Webserver; index.html nicht per Doppelklick öffnen.\n\nDiese Dateien verwenden den echten Browser-DOM und dessen localStorage. Der Speicher gehört hier zur lokalen Website. main.js enthält die Logik, index.html die Oberfläche.\n\nIdeen: eigene Farben, weitere Eingabeprüfungen, zusätzliche Features und Tests ergänzen.\n`;
  const archive = zipSync(Object.fromEntries(Object.entries(files).map(([path,content]) => [path,strToU8(content)])));
  const url = URL.createObjectURL(new Blob([archive], {type:'application/zip'}));
  const link = document.createElement('a'); link.href = url; link.download = `${lesson.id}.zip`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
