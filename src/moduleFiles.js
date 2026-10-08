import { parse } from "acorn";

export function prepareModules(files, entry = "main.js") {
  const paths = Object.keys(files);
  if (!paths.length || paths.length > 8 || !Object.hasOwn(files, entry)) throw new Error("Das Modulprojekt benötigt eine main.js und höchstens acht Dateien.");
  let bytes = 0;
  const modules = Object.create(null);
  for (const path of paths) {
    if (!/^[\w-]+(?:\/[\w-]+)*\.js$/.test(path) || typeof files[path] !== "string") throw new Error("Ungültiger virtueller Dateiname: " + path);
    bytes += files[path].length;
    if (bytes > 128 * 1024) throw new Error("Das Modulprojekt ist zu groß (maximal 128 Ki Zeichen).");
    let ast;
    try { ast = parse(files[path], { ecmaVersion: "latest", sourceType: "module" }); }
    catch (error) { throw new Error(path + ": " + error.message); }
    const imports = [];
    const queue = [ast];
    while (queue.length) {
      const node = queue.pop();
      if (node.type === "ImportExpression") throw new Error(path + ": Dynamische Imports kommen später. Verwende hier statische import-Anweisungen.");
      if (["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(node.type) && node.source) {
        const source = node.source.value;
        if (!source.startsWith("./") && !source.startsWith("../")) throw new Error(path + ": Hier sind nur lokale Dateipfade erlaubt. npm-Pakete und externe URLs sind im Lernspielplatz nicht eingebunden.");
        const parts = path.split("/").slice(0, -1);
        for (const part of source.split("/")) {
          if (part === "." || !part) continue;
          if (part === "..") {
            if (!parts.length) throw new Error(path + ": Der Import verlässt das virtuelle Projekt.");
            parts.pop();
          } else parts.push(part);
        }
        const target = parts.join("/");
        if (!Object.hasOwn(files, target)) throw new Error(path + ": Datei nicht gefunden: " + source);
        imports.push({ start: node.source.start, end: node.source.end, path: target });
      }
      for (const value of Object.values(node)) {
        if (Array.isArray(value)) { for (const child of value) if (child?.type) queue.push(child); }
        else if (value?.type) queue.push(value);
      }
    }
    modules[path] = { source: files[path], imports };
  }
  return { modules, entry };
}
