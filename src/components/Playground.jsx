import { useEffect, useState } from "react";
import { Play, RotateCcw, Check, X, FlaskConical } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { runJavaScript } from "../runner";

export function Playground({ lesson, tab, record }) {
  const taskMode = tab === "task";
  const initial = taskMode
    ? lesson.starter
    : tab === "solution"
      ? lesson.solution
      : lesson.example;
  const [code, setCode] = useState(initial);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    setCode(initial);
    setResult(null);
  }, [initial]);
  async function run(test = false) {
    if (running) return;
    setRunning(true);
    setResult(null);
    const output = await runJavaScript({
      code,
      ...(test
        ? {
            tests: lesson.tests,
            functionName: lesson.functionName,
            preserveInput: lesson.preserveInput,
          }
        : {}),
    });
    setResult(output);
    setRunning(false);
    if (test)
      record(
        lesson.id,
        !!output.results?.length &&
          output.results.every((item) => item.passed) &&
          !output.error,
      );
  }
  const passed = result?.results?.every((item) => item.passed);
  return (
    <div className="playground-column">
      <section className="editor-panel" aria-label="Code-Spielplatz">
        <div className="panel-header">
          <strong>Spielplatz</strong>
          <span>JavaScript</span>
        </div>
        <CodeEditor code={code} setCode={setCode} onRun={() => run(false)} />
        <div className="editor-actions">
          <button
            className="button primary"
            disabled={running}
            onClick={() => run(false)}
          >
            <Play size={17} fill="currentColor" />
            {running ? "Läuft …" : "Code ausführen"}
          </button>
          <button
            className="button secondary"
            disabled={running}
            onClick={() => {
              setCode(initial);
              setResult(null);
            }}
          >
            <RotateCcw size={18} />
            Zurücksetzen
          </button>
          {taskMode && (
            <button
              className="button test-button"
              disabled={running}
              onClick={() => run(true)}
            >
              <FlaskConical size={17} />
              Lösung prüfen
            </button>
          )}
        </div>
      </section>
      <section
        className="output-panel"
        aria-label="Code-Ausgabe"
        aria-live="polite"
      >
        <div className="output-heading">
          <strong>{result?.results ? "Testergebnis" : "Ausgabe"}</strong>
          {result?.results && (
            <span className={passed ? "status-success" : "status-error"}>
              {result.results.filter((item) => item.passed).length} /{" "}
              {result.results.length} bestanden
            </span>
          )}
        </div>
        <div
          className={`console-output ${result?.error ? "error-output" : ""}`}
        >
          {!result && (
            <span className="console-empty">
              Führe deinen Code aus, um das Ergebnis zu sehen.
            </span>
          )}
          {result?.error && <p>{result.error}</p>}
          {result?.logs?.map((log, i) => (
            <pre key={i}>{log}</pre>
          ))}
          {result &&
            !result.error &&
            !result.results &&
            !result.logs?.length && (
              <span className="console-empty">
                Code ausgeführt. Nutze console.log(), um Werte auszugeben.
              </span>
            )}
          {result?.results?.map((item, i) => (
            <div
              key={i}
              className={`test-result ${item.passed ? "passed" : "failed"}`}
            >
              {item.passed ? <Check size={16} /> : <X size={16} />}
              <div>
                <strong>Test {i + 1}</strong>
                <span>Eingabe: {JSON.stringify(item.input)}</span>
                <span>
                  Erwartet: {JSON.stringify(item.expected)} · Erhalten:{" "}
                  {item.actual}
                </span>
                {item.changed && <span>Die Eingabe wurde verändert.</span>}
              </div>
            </div>
          ))}
          {passed && (
            <p className="success-message">
              Geschafft! Dein Fortschritt wurde aktualisiert.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
