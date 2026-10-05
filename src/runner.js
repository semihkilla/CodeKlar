// Untrusted learning code runs in a worker inside an opaque-origin iframe.
// The iframe's CSP blocks networking. The parent enforces a hard time limit.
const workerProgram = `
const stringify = value => {
  if (typeof value === 'string') return value;
  if (value === undefined) return 'undefined';
  if (typeof value === 'bigint') return String(value) + 'n';
  try { return JSON.stringify(value); } catch { return String(value); }
};
self.onmessage = ({data}) => {
  const logs = [];
  const console = Object.fromEntries(['log','info','warn','error'].map(kind => [kind, (...args) => {
    if (logs.length < 50) logs.push(args.map(stringify).join(' ').slice(0, 4000));
  }]));
  try {
    if (!data.tests) {
      new Function('console', data.code)(console);
      self.postMessage({logs});
      return;
    }
    const fn = new Function('console', data.code + '\\nreturn typeof ' + data.functionName + ' === "function" ? ' + data.functionName + ' : null;')(console);
    if (!fn) throw new Error('Die Funktion ' + data.functionName + ' fehlt.');
    const results = data.tests.map(test => {
      const input = structuredClone(test.input);
      const before = JSON.stringify(input);
      try {
        const actual = fn(input);
        return {input: test.input, expected: test.expected, actual: stringify(actual), passed: JSON.stringify(actual) === JSON.stringify(test.expected) && (!data.preserveInput || JSON.stringify(input) === before), changed: data.preserveInput && JSON.stringify(input) !== before};
      } catch (error) {
        return {input: test.input, expected: test.expected, actual: error.message, passed: false};
      }
    });
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

export function runJavaScript(value) {
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
