import { useEffect, useRef, useState } from "react";
import { Palette, X, Download, Check, WifiOff, Sun, Moon, Monitor } from "lucide-react";

const accents = [
  { id: "purple", label: "Lila", color: "#9b87ff" },
  { id: "blue", label: "Blau", color: "#77b7ff" },
  { id: "green", label: "Mint", color: "#78dca8" },
  { id: "amber", label: "Amber", color: "#efbf70" },
  { id: "rose", label: "Rosé", color: "#efa0bb" },
];
function readAccent() {
  try {
    const value = localStorage.getItem("codeklar-accent-v1");
    return accents.some((item) => item.id === value) ? value : "green";
  } catch {
    return "green";
  }
}

const modes = [
  { id: "light", label: "Hell", icon: Sun },
  { id: "dark", label: "Dunkel", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];
function readMode() {
  try {
    const value = localStorage.getItem("codeklar-theme-v1");
    return modes.some(item => item.id === value) ? value : "dark";
  } catch { return "dark"; }
}
function moveRadio(event) {
  const buttons = [...event.currentTarget.querySelectorAll('[role="radio"]')];
  const index = buttons.indexOf(document.activeElement);
  if (index < 0) return;
  let next;
  if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % buttons.length;
  else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index + buttons.length - 1) % buttons.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = buttons.length - 1;
  else return;
  event.preventDefault(); buttons[next].focus(); buttons[next].click();
}

export function Appearance({ webApp }) {
  const [accent, setAccent] = useState(readAccent);
  const [mode, setMode] = useState(readMode);
  const [saveError, setSaveError] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function applyTheme() {
      const resolved = mode === "system" ? (media.matches ? "dark" : "light") : mode;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.accent = accent;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", resolved === "light" ? "#f5f8f6" : "#0e1514");
    }
    applyTheme();
    media.addEventListener("change", applyTheme);
    try {
      localStorage.setItem("codeklar-accent-v1", accent);
      localStorage.setItem("codeklar-theme-v1", mode);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
    return () => media.removeEventListener("change", applyTheme);
  }, [accent, mode]);
  return (
    <>
      <button
        className="appearance-button icon-button"
        aria-label="Design und Webapp"
        onClick={() => dialog.current.showModal()}
      >
        <Palette size={22} />
      </button>
      <dialog
        className="appearance-dialog"
        ref={dialog}
        aria-labelledby="appearance-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="dialog-heading">
          <h2 id="appearance-title">Dein Design</h2>
          <button
            className="icon-button"
            aria-label="Einstellungen schließen"
            onClick={() => dialog.current.close()}
          >
            <X size={22} />
          </button>
        </div>
        <p className="dialog-description">
          Dein Licht. Deine Farbe. Deine Lernumgebung.
        </p>
        <h3 className="appearance-label">Darstellung</h3>
        <div className="mode-options" role="radiogroup" aria-label="Darstellung" onKeyDown={moveRadio}>
          {modes.map(({id, label, icon: Icon}) => <button key={id} type="button" role="radio" aria-checked={mode === id}
            tabIndex={mode === id ? 0 : -1} className={`mode-option ${mode === id ? "selected" : ""}`} onClick={() => setMode(id)}>
            <Icon size={20} aria-hidden="true" />{label}
          </button>)}
        </div>
        <h3 className="appearance-label">Akzentfarbe</h3>
        <div
          onKeyDown={moveRadio}
          className="accent-options"
          role="radiogroup"
          aria-label="Akzentfarbe"
        >
          {accents.map((item) => (
            <button
              key={item.id}
              className={`accent-option ${accent === item.id ? "selected" : ""}`}
              type="button"
              tabIndex={accent === item.id ? 0 : -1}
              role="radio"
              aria-checked={accent === item.id}
              onClick={() => setAccent(item.id)}
            >
              <span style={{ background: item.color }}>
                {accent === item.id && <Check size={18} />}
              </span>
              {item.label}
            </button>
          ))}
        </div>
        {saveError && (
          <p className="settings-note" role="status">
            Dein Design gilt für diese Sitzung; der Browser erlaubt kein
            Speichern.
          </p>
        )}
        <section className="install-section">
          <div className="install-heading">
            <img src="/icons/icon-192.png" alt="" width="44" height="44" />
            <div>
              <h3>codeklar für unterwegs</h3>
              <p>Direkt von deinem Startbildschirm.</p>
            </div>
          </div>
          {webApp.installed ? (
            <p className="install-success">
              <Check size={18} />
              Du nutzt codeklar bereits als App.
            </p>
          ) : (
            <>
              {webApp.canInstall ? (
                <button
                  className="button primary install-button"
                  onClick={webApp.install}
                  disabled={webApp.installing}
                >
                  <Download size={18} />
                  {webApp.installing
                    ? "Installation öffnen …"
                    : "App installieren"}
                </button>
              ) : (
                <ol className="install-instructions">
                  {webApp.isIOS ? (
                    <>
                      <li>Öffne codeklar in Safari.</li>
                      <li>
                        Tippe auf <strong>Teilen</strong>.
                      </li>
                      <li>
                        Wähle <strong>Zum Home-Bildschirm</strong> und dann{" "}
                        <strong>Hinzufügen</strong>.
                      </li>
                    </>
                  ) : (
                    <>
                      <li>Öffne das Menü deines Browsers.</li>
                      <li>
                        Wähle <strong>App installieren</strong> oder{" "}
                        <strong>Zum Startbildschirm hinzufügen</strong>.
                      </li>
                      <li>Bestätige das Hinzufügen.</li>
                    </>
                  )}
                </ol>
              )}
              {webApp.installError && (
                <p role="status" className="settings-note">
                  {webApp.installError}
                </p>
              )}
            </>
          )}
          <div className="offline-note">
            <WifiOff size={18} />
            <span>
              {webApp.cacheError
                ? "Offline-Speicherung konnte nicht eingerichtet werden. Du kannst die App online weiter nutzen."
                : webApp.offlineReady
                  ? "Offline bereit: Lektionen, Übungen und JavaScript funktionieren auch ohne Netz."
                : "Lade die App einmal vollständig mit Internetverbindung. Danach kannst du auch ohne Netz weiterlernen."}
            </span>
          </div>
        </section>
      </dialog>
    </>
  );
}
