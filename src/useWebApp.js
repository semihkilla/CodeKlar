import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export function useWebApp() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(
    () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true,
  );
  const [online, setOnline] = useState(navigator.onLine);
  const [installing, setInstalling] = useState(false);
  const [installError, setInstallError] = useState("");
  const [cacheError, setCacheError] = useState(false);
  const [cachedReady, setCachedReady] = useState(false);
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError: () => setCacheError(true),
    onRegisteredSW: (_, registration) => {
      if (registration?.active) setCachedReady(true);
    },
  });
  useEffect(() => {
    const beforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const afterInstall = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    const updateOnline = () => setOnline(navigator.onLine);
    const standalone = window.matchMedia("(display-mode: standalone)");
    const updateStandalone = () =>
      setInstalled(standalone.matches || window.navigator.standalone === true);
    window.addEventListener("beforeinstallprompt", beforeInstall);
    window.addEventListener("appinstalled", afterInstall);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    standalone.addEventListener("change", updateStandalone);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstall);
      window.removeEventListener("appinstalled", afterInstall);
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
      standalone.removeEventListener("change", updateStandalone);
    };
  }, []);
  async function install() {
    if (!installPrompt || installing) return;
    setInstalling(true);
    setInstallError("");
    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    } catch {
      setInstallError(
        "Öffne das Browser-Menü und wähle dort die Installation.",
      );
    } finally {
      setInstalling(false);
    }
  }
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return {
    canInstall: !!installPrompt,
    installed,
    install,
    installing,
    installError,
    online,
    offlineReady: offlineReady || cachedReady,
    cacheError,
    needRefresh,
    update: () => updateServiceWorker(true),
    isIOS,
  };
}
