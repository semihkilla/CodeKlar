import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar, navigation } from "./components/Sidebar";
import { Learning } from "./components/Learning";
import { Exercises, Reference, ProgressView } from "./components/LibraryViews";
import { courses, lessons, lessonById } from "./data";
import { useProgress } from "./useProgress";
import { useWebApp } from "./useWebApp";
import { Appearance } from "./components/Appearance";

export default function App() {
  const [view, setView] = useState("learn");
  const [course, setCourse] = useState("js");
  const [lessonId, setLessonId] = useState("js-map");
  const [initialTab, setInitialTab] = useState("explanation");
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, saved, record } = useProgress();
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
            <span className={`save-status ${saved ? "" : "not-saved"}`}>
              <i />
              {saved
                ? webApp.online
                  ? "Lokal gespeichert"
                  : "Offline · gespeichert"
                : "Speichern nicht möglich"}
            </span>
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
              initialTab={initialTab}
              progress={progress}
              record={record}
            />
          )}
          {view === "exercises" && (
            <Exercises progress={progress} openLesson={openLesson} />
          )}
          {view === "reference" && <Reference openLesson={openLesson} />}
          {view === "progress" && (
            <ProgressView progress={progress} openLesson={openLesson} />
          )}
        </main>
      </div>
      <nav className="mobile-bottom-nav" aria-label="Schnellnavigation">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            aria-current={view === id ? "page" : undefined}
            className={view === id ? "selected" : ""}
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
