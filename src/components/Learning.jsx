import { useState } from "react";
import { ArrowRight, Info, Check, Lightbulb } from "lucide-react";
import { courses, lessons } from "../data";
import { Playground } from "./Playground";
import { CodeEditor } from "./CodeEditor";

export function ProgressStrip({ solved, total }) {
  return (
    <div className="progress-strip">
      <strong>Dein Lernfortschritt</strong>
      <progress aria-label="Gelöste Aufgaben" value={solved} max={total} />
      <span>
        {solved} von {total} Aufgaben gelöst
      </span>
      <span className="progress-motto">Ein kleiner Schritt zählt.</span>
    </div>
  );
}

function Quiz({ lesson, record }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === lesson.answer;
  return (
    <div className="quiz">
      <p>{lesson.question}</p>
      <div
        className="quiz-options"
        role="radiogroup"
        aria-label="Antwort auswählen"
      >
        {lesson.options.map((option, i) => (
          <button
            role="radio"
            aria-checked={selected === i}
            key={option}
            className={`quiz-option ${selected === i ? "selected" : ""}`}
            onClick={() => {
              setSelected(i);
              setChecked(false);
            }}
          >
            <span className="radio-mark" />
            {option}
          </button>
        ))}
      </div>
      <button
        className="button primary"
        disabled={selected === null}
        onClick={() => {
          setChecked(true);
          record(lesson.id, correct);
        }}
      >
        Antwort prüfen
      </button>
      {checked && (
        <div
          className={`quiz-feedback ${correct ? "correct" : "incorrect"}`}
          role="status"
        >
          <strong>
            {correct ? "Richtig! Gut verstanden." : "Noch nicht ganz."}
          </strong>
          <p>
            {correct
              ? lesson.explanation
              : "Lies das Beispiel noch einmal und nutze den Hinweis. Du kannst es erneut versuchen."}
          </p>
        </div>
      )}
    </div>
  );
}

function LessonPanel({
  lesson,
  tab,
  setTab,
  record,
  solved,
  index,
  openPlayground,
}) {
  const [hintCount, setHintCount] = useState(0);
  return (
    <section className="lesson-panel">
      <div className="lesson-title">
        <span className="lesson-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2>{lesson.title}</h2>
        <span className="difficulty">
          {solved ? (
            <>
              <Check size={14} />
              Gelöst
            </>
          ) : (
            "Einfach"
          )}
        </span>
      </div>
      <div className="lesson-tabs" role="tablist" aria-label="Lektionsansicht">
        {[
          ["explanation", "Erklärung"],
          ["task", "Aufgabe"],
          ["solution", "Lösung"],
        ].map(([id, text]) => (
          <button
            id={`tab-${id}`}
            aria-controls="lesson-content"
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={tab === id ? "selected" : ""}
            onClick={() => setTab(id)}
          >
            {text}
          </button>
        ))}
      </div>
      <div
        id="lesson-content"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="lesson-content"
      >
        {tab === "explanation" && (
          <>
            <p className="lesson-description">{lesson.description}</p>
            <pre className="syntax-strip">{lesson.syntax}</pre>
            <dl className="syntax-parts">
              {lesson.parts.map(([name, text]) => (
                <div key={name}>
                  <dt>
                    <code>{name}</code>
                  </dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
            <p className="detail-text">{lesson.detail}</p>
            <div className="lesson-note">
              <Info size={20} />
              <span>{lesson.note}</span>
            </div>
            <button
              className="text-button go-task"
              onClick={() => setTab("task")}
            >
              Zur Aufgabe
              <ArrowRight size={18} />
            </button>
          </>
        )}
        {tab === "task" && (
          <>
            {lesson.course === "js" ? (
              <>
                <h3>Jetzt bist du dran.</h3>
                <p>{lesson.task}</p>
                <div className="task-instruction">
                  Schreibe deine Lösung im Spielplatz und klicke auf{" "}
                  <strong>Lösung prüfen</strong>. Alle Testfälle müssen
                  bestehen.
                </div>
                <button
                  className="button primary mobile-edit-button"
                  onClick={openPlayground}
                >
                  Code bearbeiten
                  <ArrowRight size={18} />
                </button>
                <div className="task-example">
                  <span>Beispieleingabe</span>
                  <code>{JSON.stringify(lesson.tests[0].input)}</code>
                  <span>Erwartete Rückgabe</span>
                  <code>{JSON.stringify(lesson.tests[0].expected)}</code>
                </div>
              </>
            ) : (
              <Quiz lesson={lesson} record={record} />
            )}
            <div className="hints">
              {lesson.hints.slice(0, hintCount).map((hint, i) => (
                <div className="hint" key={i}>
                  <Lightbulb size={17} />
                  <span>{hint}</span>
                </div>
              ))}
              {hintCount < lesson.hints.length && (
                <button
                  className="text-button"
                  onClick={() => setHintCount(hintCount + 1)}
                >
                  <Lightbulb size={17} />
                  {hintCount ? "Weiterer Hinweis" : "Einen Hinweis zeigen"}
                </button>
              )}
            </div>
          </>
        )}
        {tab === "solution" && (
          <>
            <h3>Der Lösungsweg</h3>
            {lesson.course === "js" && (
              <pre className="solution-code">{lesson.solution}</pre>
            )}
            <p>{lesson.explanation}</p>
            <div className="lesson-note">
              <Info size={20} />
              <span>
                Eine Lösung anzusehen zählt nicht als gelöste Aufgabe. Probiere
                sie anschließend selbst aus.
              </span>
            </div>
            <button
              className="text-button go-task"
              onClick={() => setTab("task")}
            >
              Selbst ausprobieren
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export function Learning({
  course,
  lessonId,
  setLessonId,
  initialTab,
  progress,
  record,
}) {
  const available = lessons.filter((lesson) => lesson.course === course);
  const lesson = available.find((item) => item.id === lessonId) || available[0];
  const [tab, setTab] = useState(initialTab || "explanation");
  const [mobilePane, setMobilePane] = useState("lesson");
  const categories = [...new Set(available.map((item) => item.category))];
  const lessonIndex = available.indexOf(lesson);
  const nextOpen = available.find((item) => !progress.solved[item.id]);
  function goTo(id) {
    setLessonId(id);
    setTab("explanation");
    setMobilePane("lesson");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  const siblings = available.filter(
    (item) => item.category === lesson.category,
  );
  const courseName = courses.find((item) => item.id === course).name;
  return (
    <div className="learning-page" data-mobile-pane={mobilePane}>
      <div className="page-intro">
        <h1>Verstehe, was dein Code tut.</h1>
        <p>Lerne Methoden, probiere sie aus und wende sie direkt an.</p>
      </div>
      {course === "js" && (
        <div className="learning-path">
          <div className="path-heading">
            <span>JavaScript · Schritt {lessonIndex + 1} von {available.length}</span>
            <button className="text-button" onClick={() => goTo((nextOpen || available[0]).id)}>
              {Object.keys(progress.solved).some((id) => available.some((item) => item.id === id)) ? "Lernpfad fortsetzen" : "Lernpfad beginnen"}
              <ArrowRight size={17} />
            </button>
          </div>
          <details>
            <summary>Alle Schritte im Lernpfad</summary>
            <ol className="path-steps">
              {available.map((item, i) => (
                <li key={item.id}>
                  <button aria-current={item.id === lesson.id ? "step" : undefined} onClick={() => goTo(item.id)}>
                    <span>{i + 1}. {item.title}</span>
                    {progress.solved[item.id] && <span className="path-solved"><Check size={15} /> Gelöst</span>}
                  </button>
                </li>
              ))}
            </ol>
          </details>
        </div>
      )}
      <div className="topic-navigation">
        <div className="topic-tabs" aria-label="Themen">
          {categories.map((category) => (
            <button
              key={category}
              className={lesson.category === category ? "selected" : ""}
              aria-pressed={lesson.category === category}
              onClick={() => {
                setLessonId(
                  available.find((item) => item.category === category).id,
                );
                setTab("explanation");
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="lesson-picker" aria-label="Lektionen">
          {siblings.map((item) => (
            <button
              key={item.id}
              aria-pressed={lesson.id === item.id}
              className={lesson.id === item.id ? "selected" : ""}
              onClick={() => {
                setLessonId(item.id);
                setTab("explanation");
              }}
            >
              {item.name}
              {progress.solved[item.id] && <Check size={13} />}
            </button>
          ))}
        </div>
      </div>
      {course === "js" && (
        <div className="mobile-workspace-switch" aria-label="Arbeitsbereich">
          <button
            aria-pressed={mobilePane === "lesson"}
            className={mobilePane === "lesson" ? "selected" : ""}
            onClick={() => setMobilePane("lesson")}
          >
            Lektion
          </button>
          <button
            aria-pressed={mobilePane === "playground"}
            className={mobilePane === "playground" ? "selected" : ""}
            onClick={() => setMobilePane("playground")}
          >
            Spielplatz
          </button>
        </div>
      )}
      <div
        className={`learning-workspace ${course === "js" ? `mobile-pane-${mobilePane}` : ""}`}
      >
        <LessonPanel
          key={`lesson-${lesson.id}`}
          lesson={lesson}
          tab={tab}
          setTab={setTab}
          record={record}
          solved={!!progress.solved[lesson.id]}
          index={available.indexOf(lesson)}
          openPlayground={() => setMobilePane("playground")}
        />
        {course === "js" ? (
          <Playground
            key={`playground-${lesson.id}`}
            lesson={lesson}
            tab={tab}
            record={record}
          />
        ) : (
          <div className="playground-column">
            <section className="editor-panel">
              <div className="panel-header">
                <strong>Codebeispiel</strong>
                <span>{course === "c" ? lesson.category : courseName}</span>
              </div>
              <CodeEditor readonly code={lesson.example} />
              <div className="example-caption">
                Lies das Beispiel und teste dein Verständnis unter „Aufgabe“.
              </div>
            </section>
            <section className="output-panel">
              <div className="output-heading">
                <strong>Genauer erklärt</strong>
              </div>
              <p className="detail-text">{lesson.detail}</p>
              <div className="static-note">
                Dieser Lernbereich enthält Wissensfragen. Eine Laufzeitumgebung
                für {courseName} ist noch nicht integriert.
              </div>
            </section>
          </div>
        )}
      </div>
      <nav className="lesson-pagination" aria-label="Lernpfad-Navigation">
        <button className="button secondary" disabled={lessonIndex === 0} onClick={() => goTo(available[lessonIndex - 1].id)}>Vorherige Lektion</button>
        <button className="button primary" disabled={lessonIndex === available.length - 1} onClick={() => goTo(available[lessonIndex + 1].id)}>Nächste Lektion <ArrowRight size={17} /></button>
      </nav>
      <ProgressStrip
        solved={available.filter((item) => progress.solved[item.id]).length}
        total={available.length}
      />
    </div>
  );
}
