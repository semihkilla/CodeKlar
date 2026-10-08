// Untrusted learning code runs in a worker inside an opaque-origin iframe.
// The iframe's CSP blocks networking. The parent enforces a hard time limit.
const workerProgram = `
const equal = (a, b) => {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && a.length !== b.length) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(key => Object.prototype.hasOwnProperty.call(b, key) && equal(a[key], b[key]));
};
const stringify = value => {
  if (typeof value === 'string') return value;
  if (value === undefined) return 'undefined';
  if (typeof value === 'bigint') return String(value) + 'n';
  try { return JSON.stringify(value); } catch { return String(value); }
};
self.onmessage = async ({data}) => {
  const logs = [];
  const console = Object.fromEntries(['log','info','warn','error'].map(kind => [kind, (...args) => {
    if (logs.length < 50) logs.push(args.map(stringify).join(' ').slice(0, 4000));
  }]));
  try {
    let namespace;
    if (data.modules) {
      self.console = console;
      const urls = new Map();
      const building = new Set();
      const build = path => {
        if (urls.has(path)) return urls.get(path);
        if (building.has(path)) throw new Error('Zyklische Imports werden in dieser ersten Modulstufe noch nicht unterstützt: ' + path);
        building.add(path);
        const module = data.modules[path];
        let source = module.source;
        const replacements = module.imports.map(item => ({...item, url: build(item.path)}));
        for (const item of replacements.sort((a, b) => b.start - a.start)) {
          source = source.slice(0, item.start) + JSON.stringify(item.url) + source.slice(item.end);
        }
        const url = URL.createObjectURL(new Blob([source], {type: 'text/javascript'}));
        urls.set(path, url);
        building.delete(path);
        return url;
      };
      try { namespace = await import(build(data.entry)); }
      finally { for (const url of urls.values()) URL.revokeObjectURL(url); }
    }
    if (!data.tests) {
      if (!data.modules) new Function('console', data.code)(console);
      self.postMessage({logs});
      return;
    }
    const fn = data.modules ? namespace[data.functionName] : new Function('console', data.code + '\\nreturn typeof ' + data.functionName + ' === "function" ? ' + data.functionName + ' : null;')(console);
    if (typeof fn !== 'function') throw new Error('Die Funktion ' + data.functionName + ' fehlt.' + (data.modules ? ' Exportiere sie aus ' + data.entry + '.' : ''));
    const results = [];
    for (const test of data.tests) {
      const input = structuredClone(test.input);
      const before = JSON.stringify(input);
      try {
        const actual = await fn(input);
        results.push({input: test.input, expected: test.expected, actual: stringify(actual), passed: equal(actual, test.expected) && (!data.preserveInput || JSON.stringify(input) === before), changed: data.preserveInput && JSON.stringify(input) !== before});
      } catch (error) {
        results.push({input: test.input, expected: test.expected, actual: error.message, passed: false});
      }
    }
    self.postMessage({logs, results});
  } catch (error) { self.postMessage({logs, error: error.message}); }
};`;

const sandboxDocument = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; base-uri 'none'; form-action 'none'"><script>
const worker = new Worker(URL.createObjectURL(new Blob([${JSON.stringify(workerProgram)}], {type:'text/javascript'})));
worker.onmessage = event => parent.postMessage({kind:'result', value:event.data}, '*');
worker.onerror = () => parent.postMessage({kind:'result', value:{error:'Der Code konnte nicht ausgeführt werden.'}}, '*');
addEventListener('message', event => { if(event.source === parent && event.data.kind === 'run') worker.postMessage(event.data.value); });
parent.postMessage({kind:'ready'}, '*');
</script>`;

export async function runJavaScript(value) {
  if (value.files) {
    try {
      const { prepareModules } = await import("./moduleFiles");
      value = { ...value, ...prepareModules(value.files) };
    }
    catch (error) { return Promise.resolve({ logs: [], error: error.message }); }
  }
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.setAttribute("aria-hidden", "true");
    iframe.hidden = true;
    let finished = false;
    const finish = (result) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      window.removeEventListener("message", listener);
      iframe.remove();
      resolve(result);
    };
    const listener = (event) => {
      if (event.source !== iframe.contentWindow) return;
      if (event.data?.kind === "ready")
        iframe.contentWindow.postMessage({ kind: "run", value }, "*");
      if (event.data?.kind === "result") finish(event.data.value);
    };
    const timer = setTimeout(
      () =>
        finish({
          error:
            "Zeitlimit erreicht. Prüfe deinen Code auf eine Endlosschleife.",
          logs: [],
        }),
      2000,
    );
    window.addEventListener("message", listener);
    iframe.srcdoc = sandboxDocument;
    document.body.append(iframe);
  });
}
