import { lazy, Suspense, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar, navigation } from "./components/Sidebar";
import { Learning } from "./components/Learning";
import { Exercises, Reference, ProgressView } from "./components/LibraryViews";
import { courses, lessons, lessonById } from "./data";
import { useProgress } from "./useProgress";
import { useWebApp } from "./useWebApp";
import { Appearance } from "./components/Appearance";

const StudySession = lazy(() => import("./components/StudySession"));
const IdeaToCode = lazy(() => import("./components/IdeaToCode"));
const Projects = lazy(() => import("./components/Projects"));

export default function App() {
  const [projectId, setProjectId] = useState(null);
  const [view, setView] = useState("learn");
  const [course, setCourse] = useState("js");
  const [lessonId, setLessonId] = useState("js-map");
  const [initialTab, setInitialTab] = useState("explanation");
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, saved, record, recordSession } = useProgress();
  const webApp = useWebApp();
  const lesson = lessonById[lessonId];
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  function navigate(id) {
    setView(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function openLesson(id, tab = "explanation") {
    setLessonId(id);
    setCourse(lessonById[id].course);
    setInitialTab(tab);
    setView("learn");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className="app-shell">
      <Sidebar
        view={view}
        course={course}
        onNavigate={navigate}
        onCourse={(id) =>
          openLesson(lessons.find((item) => item.course === id).id)
        }
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-menu icon-button"
              aria-label="Navigation öffnen"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={21} />
            </button>
            <span className="mobile-brand">
              code<span>klar</span>
            </span>
            <span className="breadcrumb-label">
              {navigation.find((item) => item.id === view).label}
            </span>
            {view === "learn" && (
              <>
                <span className="breadcrumb-slash">/</span>
                <span>{courses.find((item) => item.id === course).name}</span>
                <span className="breadcrumb-slash">/</span>
                <span className="breadcrumb-current">
                  {lesson.category}
                </span>
              </>
            )}
          </div>
          <div className="topbar-actions">
            <span className={`save-status ${saved ? "" : "not-saved"}`} role="status" aria-label={saved ? (webApp.online ? "Lokal gespeichert" : "Offline · gespeichert") : "Speichern nicht möglich"} title={saved ? (webApp.online ? "Lokal gespeichert" : "Offline · gespeichert") : "Speichern nicht möglich"}>
              <i />
              {saved
                ? webApp.online
                  ? "Lokal gespeichert"
                  : "Offline · gespeichert"
                : "Speichern nicht möglich"}
            </span>
            <select className="header-course-select" aria-label="Lernbereich wählen" value={course} onChange={event => openLesson(lessons.find(item => item.course === event.target.value).id)}>
              {courses.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            <Appearance webApp={webApp} />
          </div>
        </header>
        {webApp.needRefresh && (
          <div className="update-banner" role="status">
            <span>
              Eine neue Version von codeklar ist bereit. Beim Neuladen wird dein
              aktueller Code verworfen.
            </span>
            <button className="text-button" onClick={webApp.update}>
              Neu laden
            </button>
          </div>
        )}
        <main className="main-content" id="main-content">
          {view === "learn" && (
            <Learning
              key={`${course}-${initialTab}`}
              course={course}
              lessonId={lessonId}
              setLessonId={(id) => {
                setLessonId(id);
                setInitialTab("explanation");
              }}
              openProject={id => { setProjectId(id); navigate("projects"); }}
              initialTab={initialTab}
              progress={progress}
              record={record}
            />
          )}
          {view === "exercises" && (
            <Exercises progress={progress} openLesson={openLesson} openProjects={() => { setProjectId(null); navigate("projects"); }} openIdeas={() => navigate("ideas")} openStudy={() => navigate("sessions")} />
          )}
          {view === "projects" && <Suspense fallback={<p role="status">Projektbeispiele werden geladen …</p>}><Projects key={projectId || "all"} course={course} initialProjectId={projectId} openLesson={openLesson} /></Suspense>}
          {view === "ideas" && <Suspense fallback={<p role="status">Baupläne werden geladen …</p>}><IdeaToCode openProject={id => { setProjectId(id); navigate("projects"); }} /></Suspense>}
          {view === "sessions" && <Suspense fallback={<p role="status">Lernrunde wird geladen …</p>}><StudySession course={course} progress={progress} recordSession={recordSession} openLesson={openLesson} /></Suspense>}
          {view === "reference" && <Reference openLesson={openLesson} />}
          {view === "progress" && (
            <ProgressView progress={progress} openLesson={openLesson} />
          )}
        </main>
      </div>
      <nav className="mobile-bottom-nav" aria-label="Schnellnavigation">
        {navigation.filter(item => item.id !== "projects" && item.id !== "ideas" && item.id !== "sessions").map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            aria-current={(view === id || ((view === "projects" || view === "ideas" || view === "sessions") && id === "exercises")) ? "page" : undefined}
            className={(view === id || ((view === "projects" || view === "ideas" || view === "sessions") && id === "exercises")) ? "selected" : ""}
            onClick={() => navigate(id)}
          >
            <Icon size={23} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
