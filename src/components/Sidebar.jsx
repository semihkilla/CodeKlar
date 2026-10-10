import {
  Cpu,
  BookOpen,
  Rocket,
  ClipboardList,
  Search,
  ChartNoAxesColumnIncreasing,
  CodeXml,
  Database,
  X,
} from "lucide-react";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiAngular,
  SiSpring,
  SiDocker,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { courses, courseGroups } from "../data";

export const navigation = [
  { id: "learn", label: "Lernen", icon: BookOpen },
  { id: "exercises", label: "Übungen", icon: ClipboardList },
  { id: "projects", label: "Projekte", icon: Rocket },
  { id: "reference", label: "Nachschlagen", icon: Search },
  { id: "progress", label: "Fortschritt", icon: ChartNoAxesColumnIncreasing },
];
const courseIcons = {
  computer: Cpu,
  js: SiJavascript,
  java: FaJava,
  python: SiPython,
  css: CodeXml,
  sql: Database,
  react: SiReact,
  angular: SiAngular,
  spring: SiSpring,
  c: CodeXml,
  docker: SiDocker,
};

export function Sidebar({ view, course, onNavigate, onCourse, open, onClose }) {
  return (
    <>
      {open && (
        <button
          className="sidebar-backdrop"
          aria-label="Navigation schließen"
          onClick={onClose}
        />
      )}
      <aside
        className={`sidebar ${open ? "is-open" : ""}`}
        aria-label="Hauptnavigation"
      >
        <div className="brand">
          code<span>klar</span>
          <button
            className="mobile-close icon-button"
            onClick={onClose}
            aria-label="Navigation schließen"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="primary-nav" aria-label="Bereiche">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={view === id ? "nav-link active" : "nav-link"}
              aria-current={view === id ? "page" : undefined}
              onClick={() => onNavigate(id)}
            >
              <Icon size={22} strokeWidth={1.7} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <div className="sidebar-label">Lernbereiche</div>
        <nav className="course-nav" aria-label="Lernbereiche">
          {courseGroups.map((group) => (
            <section className="course-group" key={group.name} aria-label={group.name}>
              <h2>{group.name}</h2>
              {group.ids.map((id) => {
            const item = courses.find((entry) => entry.id === id);
            const Icon = courseIcons[item.id];
            return (
              <button
                key={item.id}
                className={`course-link ${course === item.id ? "active" : ""} course-${item.id}`}
                aria-current={course === item.id ? "true" : undefined}
                onClick={() => onCourse(item.id)}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </button>
            );
              })}
            </section>
          ))}
        </nav>
        <div className="sidebar-footer">Dein Tempo. Dein Weg.</div>
      </aside>
    </>
  );
}
