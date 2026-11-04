import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Check, X, FlaskConical } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { downloadBrowserProject } from "../browserDownload";
import { BrowserPreview } from "./BrowserPreview";
import { runJavaScript } from "../runner";

/** Runs editable lesson examples and shows their output and test results. */
export function Playground({ lesson, tab, record }) {
  const taskMode = tab === "task";
  const initial = taskMode
    ? lesson.starter
    : tab === "solution"
      ? lesson.solution
      : lesson.example;
  const [code, setCode] = useState(initial);
  const initialFiles = taskMode ? lesson.starterFiles : tab === "solution" ? lesson.solutionFiles : lesson.exampleFiles;
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState("main.js");
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [resetDraft, setResetDraft] = useState(null);
  const outputRef = useRef(null);
  const revealOutput = useRef(false);
  const [html, setHtml] = useState(lesson.browser?.html || "");
  const [browserTab, setBrowserTab] = useState("js");
  const history = useRef([]);
  const seed = useRef({});
  const busy = useRef(false);
  const pendingActions = useRef([]);
  const storageKey = `codeklar-browser-sandbox-${lesson.id}`;
  function readBrowserStorage() {
    try { return JSON.parse(localStorage.getItem(storageKey) || "null") || lesson.browser?.storage || {}; }
    catch { return lesson.browser?.storage || {}; }
  }
  function persistBrowserStorage(output) {
    if (!output.storage) return;
    try { localStorage.setItem(storageKey, JSON.stringify(output.storage)); }
    catch { output.logs = [...(output.logs || []), "Spielstand konnte nicht dauerhaft gespeichert werden."]; }
  }
  async function interact(actions) {
    pendingActions.current.push(...actions);
    if(busy.current) return;
    busy.current=true;setRunning(true);
    try {
      while(pendingActions.current.length) {
        const nextActions=pendingActions.current.splice(0);
        if(history.current.length+nextActions.length>200){setResult({logs:[],error:"Starte den Code erneut, um weitere Aktionen auszuprobieren."});pendingActions.current=[];break;}
        history.current=[...history.current,...nextActions];
        const output=await runJavaScript({code,functionName:lesson.functionName,initializeBrowser:taskMode || tab === "solution",browserInput:lesson.tests?.[0]?.input,...(files?{files,functionName:lesson.functionName}:{}),browser:{...lesson.browser,html,storage:seed.current},browserActions:history.current});
        persistBrowserStorage(output);setResult(output);
      }
    } finally {
      setRunning(false);busy.current=false;
    }
  }
  useEffect(() => {
    setCode(initial);
    setFiles(initialFiles);
    setActiveFile("main.js");
    setResetDraft(null);
    setResult(null);
  }, [initial, initialFiles]);
  useEffect(() => {
    if (!result || !revealOutput.current) return;
    revealOutput.current = false;
    const output = outputRef.current;
    if (!output) return;
    // Scroll just enough to reveal the result while keeping keyboard focus in place.
    output.querySelector(".console-output")?.scrollIntoView({ block: "nearest" });
  }, [result]);
  async function run(test = false) {
    if (busy.current) return;
    busy.current=true;
    history.current=[];
    pendingActions.current=[];
    seed.current=readBrowserStorage();
    setRunning(true);
    setResult(null);
    const output = await runJavaScript({
      code,
      ...(lesson.browser ? { functionName:lesson.functionName, browserInput:lesson.tests?.[0]?.input, initializeBrowser:taskMode || tab === "solution", browser: { ...lesson.browser, html, storage: test ? lesson.browser.storage || {} : seed.current } } : {}),
      ...(files ? { files, functionName: lesson.functionName } : {}),
      ...(lesson.testWorkshop ? { workshop: lesson.testWorkshop, functionName: lesson.functionName } : {}),
      ...(test
        ? {
            tests: lesson.tests,
            functionName: lesson.functionName,
            preserveInput: lesson.preserveInput,
          }
        : {}),
    });
    if (!test && lesson.browser) persistBrowserStorage(output);
    revealOutput.current = true;
    setResult(output);
    setRunning(false);
    busy.current=false;
    if (test)
      record(
        lesson.id,
        !!output.results?.length &&
          output.results.every((item) => item.passed) &&
          !output.error,
      );
  }
  function resetCode() {
    const changed = code !== initial || html !== (lesson.browser?.html || "") || files !== initialFiles;
    if (changed) setResetDraft({ code, html, files, activeFile });
    setCode(initial);
    setHtml(lesson.browser?.html || "");
    history.current = [];
    setFiles(initialFiles);
    setActiveFile("main.js");
    setResult(null);
  }
  function undoReset() {
    if (!resetDraft) return;
    setCode(resetDraft.code);
    setHtml(resetDraft.html);
    setFiles(resetDraft.files);
    setActiveFile(resetDraft.activeFile);
    setResetDraft(null);
    setResult(null);
  }
  function editCode(value) {
    setResetDraft(null);
    if (lesson.browser && browserTab === "html") setHtml(value);
    else if (files) setFiles((previous) => ({ ...previous, [activeFile]: value }));
    else setCode(value);
  }
  const editingHtml = Boolean(lesson.browser && browserTab === "html");
  const passed = result?.results?.every((item) => item.passed);
  return (
    <div className="playground-column">
      <section className="editor-panel" aria-label="Code-Spielplatz">
        <div className="panel-header">
          <strong>Spielplatz</strong>
          <span>JavaScript</span>
        </div>
        {files && <div className="module-file-tabs" role="tablist" aria-label="Projektdateien">
          {Object.keys(files).map((name) => <button key={name} role="tab" aria-selected={activeFile === name} className={activeFile === name ? "selected" : ""} onClick={() => setActiveFile(name)}>{name}</button>)}
        </div>}
        {lesson.browser && <><p className="browser-caption">Probiere HTML und Events in der Vorschau aus. API-Antworten sind Beispieldaten; der Speicher gehört nur zu dieser Übung.</p><div className="module-file-tabs" role="tablist" aria-label="Browserdateien"><button role="tab" aria-selected={browserTab === "js"} onClick={() => setBrowserTab("js")}>JavaScript</button><button role="tab" aria-selected={browserTab === "html"} onClick={() => setBrowserTab("html")}>HTML</button></div></>}
        <CodeEditor
          code={editingHtml ? html : files ? files[activeFile] : code}
          language={editingHtml ? "HTML" : "JavaScript"}
          setCode={editCode}
          onRun={() => run(false)}
        />
        {files && <p className="module-caption">{lesson.testWorkshop ? "Schreibe Tests in main.js. Code ausführen testet deine aktuelle funktion.js. Lösung prüfen ersetzt den Funktionsparameter durch korrekten Code und fehlerhafte Varianten; funktion.js dient dann als Referenz." : "Alle Dateien werden gemeinsam ausgeführt. Änderungen bleiben beim Wechsel der Datei-Reiter erhalten. Geprüft wird der Export aus main.js."}</p>}
        <div className="editor-actions">
          <button
            className="button primary"
            disabled={running}
            aria-keyshortcuts="Control+Enter Meta+Enter"
            onClick={() => run(false)}
          >
            <Play size={17} fill="currentColor" />
            {running ? "Läuft …" : "Code ausführen"}
          </button>
          <button
            className="button secondary"
            disabled={running}
            onClick={resetDraft ? undoReset : resetCode}
          >
            <RotateCcw size={18} />
            {resetDraft ? "Rückgängig" : "Zurücksetzen"}
          </button>
          {!taskMode && !lesson.browser && !files && (
            <span className="editor-shortcut" aria-hidden="true"><kbd>Strg/⌘</kbd> <kbd>Enter</kbd></span>
          )}
          {lesson.category === "Browser-Projekte" && <button className="button secondary" onClick={() => downloadBrowserProject(lesson)}>Referenzprojekt als ZIP</button>}
          {lesson.browser && <button className="button secondary" disabled={running} onClick={() => {localStorage.removeItem(storageKey);history.current=[];setResult(null);}}>Übungsspeicher leeren</button>}
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
      {lesson.browser?.clock && result?.html && <section className="output-panel" aria-label="Übungsuhr"><strong>Übungsuhr: {result.clock || 0} ms</strong><p>Die Zeit läuft hier durch deine Eingaben. Im heruntergeladenen Projekt läuft sie automatisch.</p><div className="editor-actions">{[16,100,1000].map(ms=><button className="button secondary" key={ms} disabled={running} onClick={()=>interact([{type:"advance",ms}])}>Zeit +{ms} ms</button>)}</div></section>}
      {lesson.browser && result?.html && <BrowserPreview html={result.html} onActions={interact} busy={running} />}
      <section
        className="output-panel"
        ref={outputRef}
        aria-label="Code-Ausgabe"
        aria-live="polite"
        aria-busy={running}
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
              {running ? "Code läuft …" : "Hier erscheint das Ergebnis nach dem Ausführen."}
            </span>
          )}
          {result?.error && (
            <>
              <p>{result.error}</p>
              {result.error.endsWith(" is not defined") && (
                <p className="console-hint">Prüfe die Schreibweise und ob der Name vor seiner Verwendung definiert ist</p>
              )}
            </>
          )}
          {result?.logs?.map((log, i) => (
            <pre key={i}>{log}</pre>
          ))}
          {result &&
            !result.error &&
            !result.results &&
            !result.ownTests &&
            !result.logs?.length && (
              <span className="console-empty">
                Code ausgeführt. Nutze console.log(), um Werte auszugeben.
              </span>
            )}
          {result?.ownTests && <div className="own-test-results" aria-label="Eigene Testergebnisse">
            <h3>Deine Assertions</h3>
            {result.workshopMessage && <p>{result.workshopMessage}</p>}
            {result.ownTests.map((item, i) => <div key={i} className={`test-result ${item.passed ? "passed" : "failed"}`}>
              {item.passed ? <Check size={16} /> : <X size={16} />}
              <div><strong>{item.name}</strong><span>Erwartet: {item.expected}</span><span>Erhalten: {item.actual}</span></div>
            </div>)}
          </div>}
          {result?.results && lesson.testWorkshop && <h3>Erkennen deine Tests die Fehler?</h3>}
          {result?.results?.map((item, i) => (
            <div
              key={i}
              className={`test-result ${item.passed ? "passed" : "failed"}`}
            >
              {item.passed ? <Check size={16} /> : <X size={16} />}
              <div>
                <strong>{lesson.testWorkshop ? item.input : `Test ${i + 1}`}</strong>
                {!lesson.testWorkshop && <span>Eingabe: {JSON.stringify(item.input)}</span>}
                <span>
                  {lesson.testWorkshop ? item.actual : `Erwartet: ${JSON.stringify(item.expected)} · Erhalten: ${item.actual}`}
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
