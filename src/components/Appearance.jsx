import { useEffect, useRef, useState } from "react";
import { Palette, X, Download, Check, WifiOff } from "lucide-react";

const accents = [
  { id: "purple", label: "Lila", color: "#9b87ff" },
  { id: "blue", label: "Blau", color: "#77b7ff" },
  { id: "green", label: "Grün", color: "#66d4a2" },
];
function readAccent() {
  try {
    const value = localStorage.getItem("codeklar-accent-v1");
    return accents.some((item) => item.id === value) ? value : "purple";
  } catch {
    return "purple";
  }
}

export function Appearance({ webApp }) {
  const [accent, setAccent] = useState(readAccent);
  const [saveError, setSaveError] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    try {
      localStorage.setItem("codeklar-accent-v1", accent);
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [accent]);
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
          Dunkles Design. Deine Lieblingsfarbe.
        </p>
        <div
          className="accent-options"
          role="radiogroup"
          aria-label="Akzentfarbe"
        >
          {accents.map((item) => (
            <button
              key={item.id}
              className={`accent-option ${accent === item.id ? "selected" : ""}`}
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
            Deine Farbe gilt für diese Sitzung; der Browser erlaubt kein
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
