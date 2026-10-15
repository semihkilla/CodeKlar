import { test, expect } from "@playwright/test";
import { computerLessons } from "../src/computerLessons.js";
import { jsLessons } from "../src/data.js";
import { readFile } from "node:fs/promises";

test("mobile playground, dark theme, accent persistence and touch navigation", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByLabel("JavaScript-Code")).not.toBeVisible();
  await page
    .getByLabel("Arbeitsbereich")
    .getByRole("button", { name: "Spielplatz", exact: true })
    .click();
  await expect(page.getByLabel("JavaScript-Code")).toBeVisible();
  await page
    .getByRole("button", { name: "Code ausführen", exact: true })
    .click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("[2,4,6]");
  await page
    .getByLabel("Arbeitsbereich")
    .getByRole("button", { name: "Lektion", exact: true })
    .click();
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByRole("button", { name: "Code bearbeiten" }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons[0].solution);
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByText(`1 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.getByRole("button", { name: "Design und Webapp" }).click();
  await page.getByRole("radio", { name: "Grün", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "green");
  await page.getByRole("button", { name: "Einstellungen schließen" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "green");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).colorScheme,
    ),
  ).toBe("dark");
  await page.getByRole("button", { name: "Design und Webapp" }).click();
  await page.getByRole("radio", { name: "Blau", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "blue");
  await page.getByRole("button", { name: "Einstellungen schließen" }).click();
  await page
    .getByLabel("Schnellnavigation")
    .getByRole("button", { name: "Fortschritt", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Jeder gelöste Schritt zählt." }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("installed service worker keeps app, fonts, code execution and progress available offline", async ({
  page,
  context,
  request,
}) => {
  test.setTimeout(120000);
  await page.goto("/");
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.display).toBe("standalone");
  expect(manifest.start_url).toBe("/");
  expect(manifest.icons.some((icon) => icon.purpose === "maskable")).toBe(true);
  for (const icon of manifest.icons) {
    const response = await request.get(icon.src);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
    const bytes = await response.body();
    const expectedSize = Number(icon.sizes.split("x")[0]);
    expect(bytes.readUInt32BE(16)).toBe(expectedSize);
    expect(bytes.readUInt32BE(20)).toBe(expectedSize);
  }
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Verstehe, was dein Code tut." }),
  ).toBeVisible();
  expect(
    await page.evaluate(async () => {
      try {
        await fetch("/offline-probe-" + Date.now());
        return false;
      } catch {
        return true;
      }
    }),
  ).toBe(true);
  await page.getByRole("button", { name: "Design und Webapp" }).click();
  await expect(page.getByRole("dialog")).toContainText("Offline bereit");
  await page.getByRole("button", { name: "Einstellungen schließen" }).click();
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByRole("button", { name: "Code bearbeiten" }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons[0].solution);
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByText(`1 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.reload();
  await expect(page.getByText(`1 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page
    .getByLabel("Schnellnavigation")
    .getByRole("button", { name: "Nachschlagen", exact: true })
    .click();
  await page.getByRole("textbox").fill("append");
  await expect(page.locator(".reference-entry")).toHaveCount(2);
  await page.getByLabel("Lernbereich filtern").selectOption("python");
  await expect(page.locator(".reference-entry")).toHaveCount(1);
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Textdateien in Zeilen zerlegen" }).click();
  const lab = page.getByRole("region", { name: "Notizen und Datei-Labor", exact: true });
  await lab.getByLabel("Datei öffnen", { exact: true }).setInputFiles({ name: "unterwegs.txt", mimeType: "text/plain", buffer: Buffer.from("Offline-Notiz\n") });
  await expect(lab.getByLabel("Dateiinhalt")).toHaveValue("Offline-Notiz\n");
  const downloadPromise = page.waitForEvent("download");
  await lab.getByRole("button", { name: "Datei herunterladen", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("unterwegs.txt");
  expect(await readFile(await download.path(), "utf8")).toBe("Offline-Notiz\n");
  await page.reload();
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Textdateien in Zeilen zerlegen" }).click();
  await expect(lab.getByLabel("Dateiinhalt")).toHaveValue("Offline-Notiz\n");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Einen benannten Import lokal umbenennen" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill("import { berechnen as plusFuenf } from './rechnung.js'; export function mitAlias(wert) { return plusFuenf(wert); }");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("3 / 3 bestanden");
  await page.getByRole("tab", { name: "rechnung.js", exact: true }).click();
  await expect(page.getByLabel("JavaScript-Code")).toHaveValue("export function berechnen(wert) {\n  return wert + 5;\n}");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-modules-mobile.png", fullPage: false, animations: "disabled" });
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Leere Arrays und Null gezielt testen" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-test-boundaries").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("3 / 3 bestanden");
  await expect(page.getByLabel("Eigene Testergebnisse")).toContainText("Null in der Mitte");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Eine Queue ohne wiederholtes shift verwalten" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-queue-head").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("5 / 5 bestanden");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Eine verkettete Liste aus Knoten aufbauen" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-linked-build").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("5 / 5 bestanden");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Eine verkettete Liste ohne Eingabemutation umkehren" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-linked-reverse").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("6 / 6 bestanden");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Zahlen in verschachtelten Arrays rekursiv summieren" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-recursion-nested-sum").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("7 / 7 bestanden");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Einen Baum in Inorder durchlaufen" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-tree-inorder").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("7 / 7 bestanden");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Einen Suchbaum ohne Eingabemutation erweitern" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-bst-insert").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("7 / 7 bestanden");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Einen Graphen trotz Zyklen mit Breitensuche durchlaufen" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill(jsLessons.find(item => item.id === "js-graph-bfs").solution);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("7 / 7 bestanden");

  for (const id of ["js-graph-dfs", "js-graph-shortest", "js-sort-numbers", "js-sort-ranking", "js-find-index", "js-binary-search", "js-array-find", "js-array-some", "js-array-every", "js-array-reduce", "js-fn-closure", "js-fn-independent", "js-obj-nested", "js-obj-optional", "js-async-catch", "js-async-all", "js-async-settled", "js-str-pad", "js-class-bind", "js-class-private", "js-error-json", "js-regex-state", "js-date-add", "js-async-any", "js-async-finally", "js-dom-create", "js-event-delegate", "js-storage-load", "js-fetch-ui", "js-browser-todo", "js-browser-highscore", "js-math-round", "js-math-dice", "js-array-splice", "js-array-grid", "js-obj-from-entries", "js-game-collision", "js-shop-checkout", "js-time-timeout", "js-time-debounce", "js-time-frame-loop", "js-time-stopwatch", "js-time-reaction", "js-time-move", "js-build-blob-text", "js-build-canvas-point", "js-build-cli-options", "js-build-sql-params", "js-build-test-api", "js-build-test-sql", "js-web-query-read", "js-web-intl-date", "js-web-generator-range", "js-web-abort-signal", "js-web-retry", "js-web-memo-cache"]) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
    await page.getByLabel("JavaScript-Code").fill(lesson.solution);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);
  }
});

test("install button invokes the available browser prompt and respects dismissal", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    const event = new Event("beforeinstallprompt");
    event.prompt = async () => {
      window.installRequested = true;
    };
    event.userChoice = Promise.resolve({ outcome: "dismissed" });
    window.dispatchEvent(event);
  });
  await page.getByRole("button", { name: "Design und Webapp" }).click();
  await page
    .getByRole("button", { name: "App installieren", exact: true })
    .click();
  expect(await page.evaluate(() => window.installRequested)).toBe(true);
  await expect(
    page.getByRole("button", { name: "App installieren", exact: true }),
  ).not.toBeVisible();
  await expect(page.getByRole("dialog")).not.toContainText("bereits als App");
  await page.evaluate(() => window.dispatchEvent(new Event("appinstalled")));
  await expect(page.getByRole("dialog")).toContainText("bereits als App");
});

test("mobile and desktop views fit the viewport with readable touch targets", async ({
  page,
}) => {
  await page.goto("/");
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 1505, height: 1045 },
  ]) {
    await page.setViewportSize(viewport);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (viewport.width <= 720) {
      const bounds = await page
        .getByLabel("Schnellnavigation")
        .getByRole("button", { name: "Übungen", exact: true })
        .boundingBox();
      expect(bounds.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "/tmp/codeklar-dark-mobile.png",
    animations: "disabled",
  });
  await page
    .getByLabel("Arbeitsbereich")
    .getByRole("button", { name: "Spielplatz", exact: true })
    .click();
  await page.screenshot({
    path: "/tmp/codeklar-dark-playground.png",
    animations: "disabled",
  });
  await page.setViewportSize({ width: 1505, height: 1045 });
  await page.screenshot({
    path: "/tmp/codeklar-dark-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
});

test.describe("iPhone installation instructions", () => {
  test.use({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1",
    hasTouch: true,
    isMobile: true,
  });
  test("Safari users get Home Screen steps", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Design und Webapp" }).click();
    await expect(page.getByRole("dialog")).toContainText(
      "Öffne codeklar in Safari.",
    );
    await expect(page.getByRole("dialog")).toContainText("Zum Home-Bildschirm");
  });
});

test('project examples and interactive demo load offline before their first visit', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button', { name: 'Übungen', exact: true }).click();
  await page.getByRole('button', { name: 'Projektideen für alle Lernbereiche' }).click();
  await expect(page.getByRole('heading', { name: 'Klick-Challenge', exact: true })).toBeVisible();
  const demo = page.frameLocator('iframe[title="Klick-Challenge ausprobieren"]');
  await demo.getByRole('button', { name: 'Neue Runde' }).click();
  await demo.getByRole('button', { name: 'Klick!', exact: true }).click();
  await expect(demo.locator('#score')).toContainText('Punkte: 1');
  await page.getByLabel('Lernbereich', { exact: true }).selectOption('c');
  await expect(page.getByLabel('Projektbeispiele').getByRole('button')).toHaveCount(3);
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Projekt als ZIP herunterladen' }).click();
  expect((await downloading).suggestedFilename()).toBe('codeklar-c-calculator.zip');
  await page.screenshot({ path: '/tmp/codeklar-projects-mobile.png', fullPage: true });
});

test('browser module preview and reference download work offline on first use',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  const lesson=jsLessons.find(item=>item.id==='js-browser-modules');
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();
  for(const [name,code] of Object.entries(lesson.solutionFiles)){await page.getByRole('tab',{name,exact:true}).click();await page.getByLabel('JavaScript-Code').fill(code);}
  await page.getByRole('button',{name:'Code ausführen',exact:true}).click();const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');await preview.locator('#a').fill('2');await preview.locator('#b').fill('3');await preview.getByRole('button').click();await expect(preview.locator('#ergebnis')).toHaveText('5');
  const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Referenzprojekt als ZIP'}).click();expect((await downloading).suggestedFilename()).toBe('js-browser-modules.zip');
  await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('10 / 10 bestanden');
});

test('new file canvas and self build projects work on their first offline visit',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Projektideen für alle Lernbereiche'}).click();await page.getByLabel('Projekt suchen').fill('Datei-Explorer');await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();
  const demo=page.frameLocator('iframe[title="Datei-Explorer ausprobieren"]');await demo.locator('#datei').setInputFiles({name:'offline.txt',mimeType:'text/plain',buffer:Buffer.from('Offline 🎮')});await expect(demo.locator('#inhalt')).toHaveText('Offline 🎮');
  await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();await page.getByRole('checkbox',{name:'Text lesen',exact:true}).check();const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Startgerüst als ZIP herunterladen'}).click();expect((await downloading).suggestedFilename()).toBe('codeklar-js-file-explorer-start.zip');
  await page.getByLabel('Projekt suchen').fill('Canvas-Malstudio');await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();await expect(page.frameLocator('iframe[title="Canvas-Malstudio ausprobieren"]').locator('#canvas')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('URL catalog and request lab demos and starters load on their first offline visit',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Projektideen für alle Lernbereiche'}).click();await page.getByLabel('Projekt suchen').fill('URL-Katalog');await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();const catalog=page.frameLocator('iframe[title="URL-Katalog ausprobieren"]');await catalog.locator('#suche').fill('Kurs');await expect(catalog.locator('#status')).toHaveText('3 Treffer · Seite 1 von 1');await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Startgerüst als ZIP herunterladen'}).click();expect((await downloading).suggestedFilename()).toBe('codeklar-js-url-catalog-start.zip');
  await page.getByLabel('Projekt suchen').fill('Anfrage-Labor');await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();const lab=page.frameLocator('iframe[title="Anfrage-Labor ausprobieren"]');await lab.locator('#delay').selectOption('1500');await lab.getByRole('button',{name:'Anfrage starten'}).click();await expect(lab.locator('#status')).toHaveText('Lädt …');await lab.getByRole('button',{name:'Abbrechen',exact:true}).click();await expect(lab.locator('#status')).toHaveText('Abgebrochen');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('computer course and interactive labs work on their first offline visit', async ({ page, context }) => {
  await page.goto('/');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Navigation öffnen', exact: true }).click();
  await page.getByRole('button', { name: 'Computer verstehen', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Ein Bit: zwei unterscheidbare Zustände' })).toBeVisible();
  await page.getByRole('tab', { name: 'Aufgabe', exact: true }).click();
  await page.getByRole('radio', { name: '8', exact: true }).click();
  await page.getByRole('button', { name: 'Antwort prüfen' }).click();
  await expect(page.getByText(`1 von ${computerLessons.length} Aufgaben gelöst`, { exact: true })).toBeVisible();
  await page.getByText('Selbst ausprobieren',{exact:true}).click();
  await page.getByLabel('Grundlagen-Experiment',{exact:true}).selectOption('text');
  await page.getByLabel('Text für UTF-8', { exact: true }).fill('ä😀');
  await expect(page.getByLabel('UTF-8-Hexbytes')).toHaveText('C3 A4 F0 9F 98 80');
  await page.getByLabel('Grundlagen-Experiment',{exact:true}).selectOption('bits');
  await page.getByRole('button', { name: 'Bit 128', exact: true }).click();
  await expect(page.getByLabel('Byte-Auswertung')).toContainText('-86');
  await page.getByLabel('Grundlagen-Experiment',{exact:true}).selectOption('memory');
  for (const name of ['LOAD aus RAM','ADD 5','STORE ins RAM','SAVE auf SSD','Strom ausschalten']) await page.getByRole('button', { name, exact: true }).click();
  await expect(page.getByLabel('Speichermodell')).toContainText('SSD 12');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await page.getByRole('button', { name: 'Navigation öffnen', exact: true }).click();
  await page.getByRole('button', { name: 'Computer verstehen', exact: true }).click();
  await expect(page.getByText(`1 von ${computerLessons.length} Aufgaben gelöst`, { exact: true })).toBeVisible();
});

test('system CPU and JavaScript memory binary and microtask lessons work offline on first use',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
  await page.getByText('Selbst ausprobieren',{exact:true}).click();await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('systems');
  const lab=page.getByRole('region',{name:'System-Labor',exact:true});await lab.getByRole('tab',{name:'Lern-CPU',exact:true}).click();
  await page.getByLabel('CPU-Programm',{exact:true}).fill('SET 255\nADD 1\nSTORE 0\nHALT');await page.getByRole('button',{name:'CPU bis HALT ausführen'}).click();await expect(page.getByLabel('CPU-Zustand')).toContainText('Register 0');await expect(page.getByLabel('CPU-Zustand')).toContainText('HALT');
  await lab.getByRole('tab',{name:'Referenzen',exact:true}).click();await page.getByLabel('Kopierstrategie').selectOption('deep');await page.getByRole('button',{name:'b.profil.punkte erhöhen'}).click();await expect(page.getByLabel('Referenz-Auswertung')).toContainText('a.profil.punkte 1');
  await lab.getByRole('tab',{name:'Netzwerk',exact:true}).click();for(let i=0;i<5;i++)await page.getByRole('button',{name:'Netzwerk-Schritt',exact:true}).click();await expect(page.getByLabel('Simulierte HTTP-Antwort')).toContainText('200 OK');
  for(const id of ['binary','endian-read','decode-fatal','bigint','deep-copy','microtasks','cpu-step']){
    const lesson=jsLessons.find(l=>l.id==='js-system-'+id);await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('processing labs byte workshop and stream exercises work offline before first visit',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();await page.getByText('Selbst ausprobieren',{exact:true}).click();await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('processing');await page.getByRole('button',{name:'Beispielfolge laden',exact:true}).click();await expect(page.getByLabel('Cache-Auswertung')).toContainText('Treffer 2');await page.getByLabel('Verarbeitungs-Experiment',{exact:true}).selectOption('schedule');for(let i=0;i<6;i++)await page.getByRole('button',{name:'Scheduler-Schritt',exact:true}).click();await expect(page.getByLabel('CPU-Zeitverlauf').locator('strong')).toHaveText(['A','B','C','A','C','A']);
  for(const id of ['readable','decoder-stream','decoder-flush','transfer','batches','frames']){const lesson=jsLessons.find(l=>l.id==='js-flow-'+id);await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);}
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Projektideen für alle Lernbereiche'}).click();await page.getByLabel('Projekt suchen').fill('Byte-Werkstatt');await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();const demo=page.frameLocator('iframe[title="Byte-Werkstatt ausprobieren"]');await demo.locator('#file').setInputFiles({name:'offline.txt',mimeType:'text/plain',buffer:Buffer.from('Offline ä😀')});await expect(demo.locator('#text')).toHaveText('Offline ä😀');await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Startgerüst als ZIP herunterladen'}).click();expect((await downloading).suggestedFilename()).toBe('codeklar-js-byte-workshop-start.zip');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('review practice and all capstone demos work on their first offline visit',async({page,context})=>{
  test.setTimeout(60000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('row').filter({hasText:'Fehlersuche: Null ist ein gültiger Preis'}).click();await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('3 / 4 bestanden');
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Fortschritt',exact:true}).click();const panel=page.getByRole('region',{name:'Gezielt wiederholen'});await expect(panel).toContainText('1 Aufgabe bereit');await panel.getByRole('button',{name:'Fehlersuche: Null ist ein gültiger Preis wiederholen'}).click();await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();await page.getByLabel('JavaScript-Code').fill('function repairZero(daten){return daten.preis ?? 10;}');await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('3 / 3 bestanden');
  await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));expect(saved.reviews['js-practice-zero'].streak).toBe(1);expect(saved.solved['js-practice-zero']).toBeTruthy();
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Projektideen für alle Lernbereiche'}).click();
  const choose=async title=>{await page.getByLabel('Projekt suchen').fill(title);await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();return page.frameLocator(`iframe[title="${title} ausprobieren"]`);};
  let frame=await choose('Lernkarten-Trainer');await frame.getByLabel('Deine Antwort').fill('fifo');await frame.getByRole('button',{name:'Antwort prüfen'}).click();await expect(frame.getByRole('status')).toContainText('Richtig');
  frame=await choose('Inventar-Dashboard');await frame.getByLabel('Menge').fill('5');await frame.getByRole('button',{name:'Buchen'}).click();await expect(frame.locator('#value')).toContainText('45,00');
  frame=await choose('Schlüssel-Labyrinth');for(const name of ['Rechts','Rechts','Unten','Unten','Links','Links'])await frame.getByRole('button',{name,exact:true}).click();await expect(frame.getByRole('status')).toContainText('Gewonnen');await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Startgerüst als ZIP herunterladen'}).click();expect((await downloading).suggestedFilename()).toBe('codeklar-js-capstone-maze-start.zip');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);await page.screenshot({path:'/tmp/codeklar-capstone-offline.png',animations:'disabled'});
});

test('method comparison and error guide work on their first offline visit', async ({page,context}) => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Nachschlagen',exact:true}).click();
  await page.getByRole('button',{name:'Methoden vergleichen',exact:true}).click();
  const compare=page.getByRole('region',{name:'Methodenvergleich',exact:true});
  await compare.getByLabel('Zahlenliste (JSON)',{exact:true}).fill('[0, 3, 4]');
  await expect(compare.getByRole('article',{name:'map-Ergebnis'})).toContainText('[0, 6, 8]');await expect(compare.getByRole('article',{name:'filter-Ergebnis'})).toContainText('[0, 4]');
  await page.getByRole('button',{name:'Fehler verstehen',exact:true}).click();
  const guide=page.getByRole('region',{name:'Fehler verstehen',exact:true});
  await guide.getByLabel('Fehlerbeispiel',{exact:true}).selectOption('json');await guide.getByRole('button',{name:'Fehlerbeispiel ausführen',exact:true}).click();await expect(guide.getByLabel('Fehlerausgabe')).toContainText('SyntaxError');
  await guide.getByRole('button',{name:'Korrektur ausprobieren',exact:true}).click();await expect(guide.getByLabel('Korrigierte Ausgabe')).toContainText('{"name":"Ada"}');
  await guide.getByRole('button',{name:'Dazu selbst eine Aufgabe lösen →'}).click();await expect(page.getByRole('heading',{name:jsLessons.find(lesson=>lesson.id==='js-error-json').title,exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});

test('algorithm challenges grade offline with complexity guidance and optional timing',async({page,context})=>{
  const {challengeLessons}=await import('../src/challengeLessons.js');await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Algorithmus-Challenges',exact:true}).click();await page.getByRole('button',{name:'Nächste offene Challenge starten',exact:true}).click();
  await page.getByRole('button',{name:'Zeit starten',exact:true}).click();await page.getByRole('button',{name:'Zeit pausieren',exact:true}).click();
  await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();await page.getByLabel('JavaScript-Code').fill(challengeLessons[0].solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${challengeLessons[0].tests.length} / ${challengeLessons[0].tests.length} bestanden`);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Algorithmus-Challenges',exact:true}).click();await expect(page.getByRole('region',{name:'Algorithmus-Challenges',exact:true})).toContainText('1 von 12 Challenges gelöst');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('computer practice scenarios work on their first offline visit',async({page,context})=>{
  const {computerPracticeLessons}=await import('../src/computerPracticeLessons.js');const lesson=computerPracticeLessons.find(item=>item.id==='computer-practice-cache');
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('computer');await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();
  await expect(page.getByText('Praxis · Mittel',{exact:true})).toBeVisible();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText(lesson.explanation,{exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('expanded computer teaching opens step explanations and quizzes on its first offline visit',async({page,context})=>{
  const {computerTheoryLessons}=await import('../src/computerTheoryLessons.js');const lesson=computerTheoryLessons.find(item=>item.id==='computer-theory-container');
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('computer');await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();
  await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.getByText(lesson.guide[1][2],{exact:true})).toBeVisible();
  await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText(lesson.explanation,{exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('all five new courses and both science labs work on their first offline visit',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  for(const name of ['Linux-Befehle','macOS-Befehle','Windows-Befehle','Physik-Grundlagen','Elektrotechnik']){
    await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name,exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);
    await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio').first().click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
    if(name==='Physik-Grundlagen'){await page.getByText('Bewegungs-Labor: Strecke und Zeit',{exact:true}).click();await expect(page.getByLabel('Modellergebnis')).toContainText('18 km/h');}
    if(name==='Elektrotechnik'){await page.getByText('Ohm-Labor: Spannung, Widerstand und Strom',{exact:true}).click();await expect(page.getByLabel('Modellergebnis')).toContainText('5 mA');}
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('native math formulas and substituted lab values render on first offline visit',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Physik-Grundlagen',exact:true}).click();await expect(page.locator('.lesson-panel .science-example').first().locator('math')).toHaveCount(2);await expect(page.locator('.lesson-panel pre')).toHaveCount(0);
  await page.getByText('Bewegungs-Labor: Strecke und Zeit',{exact:true}).click();await expect(page.getByRole('region',{name:'Bewegungs-Labor',exact:true}).locator('mfrac')).toHaveCount(2);
  await page.getByLabel('Zeit in Sekunden').fill('10');await expect(page.getByLabel('Modellergebnis')).toContainText('10 m/s');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('expanded lessons vocabulary and square roots are available offline',async({page,context})=>{
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  for(const [course,title] of [['linux','Variablen und Anführungszeichen'],['macos','Dateien mit Spotlight im Terminal finden'],['windows','Objekte mit Get-Member kennenlernen'],['physics','Wärme und Temperatur unterscheiden'],['electrical','Effektivwert und Spitzenwert sind verschieden']]){
    await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(course);await page.getByLabel('Aufgaben suchen …').fill(title);await page.getByRole('row').filter({hasText:title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd').first()).toBeVisible();
  }
  await expect(page.locator('msqrt').first()).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('next-stage examples quizzes and exponentials work on first offline visit',async({page,context})=>{
  const {terminalNextLessons}=await import('../src/terminalNextLessons.js');const {scienceNextLessons}=await import('../src/scienceNextLessons.js');
  await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
  for(const id of ['linux-awk-sum','macos-plutil','windows-format-last','physics-free-fall','electrical-rc-discharge']){
    const lesson=[...terminalNextLessons,...scienceNextLessons].find(x=>x.id===id);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd').first()).toBeVisible();
    if(id==='electrical-rc-discharge')await expect(page.locator('.science-example msup').first()).toBeVisible();
    await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
  }
  await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));expect(saved.solved['electrical-rc-discharge']).toBeTruthy();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('formula rearrangement and self-check work offline on their first visit',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Elektrotechnik',exact:true}).click();await page.getByText('Formeln umstellen & üben',{exact:true}).click();const workshop=page.getByRole('region',{name:'Formelwerkstatt',exact:true});
 await workshop.getByLabel('Gesuchte Größe').selectOption('1');await workshop.getByLabel('Gegeben: Stromstärke I (A)').fill('0,01');await workshop.getByLabel('Gegeben: Widerstand R (Ω)').fill('500');await workshop.getByRole('button',{name:'Selbst lösen',exact:true}).click();await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toHaveCount(0);await workshop.getByLabel('Dein Ergebnis in V',{exact:true}).fill('5');await workshop.getByRole('button',{name:'Umform-Ergebnis prüfen',exact:true}).click();await expect(workshop.getByRole('status')).toContainText('Richtig');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('four technology courses and local byte and network experiments work offline',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 for(const name of ['Networking','Cloud','Cybersecurity','Reverse Engineering']){await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name,exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio').first().click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
  if(name==='Networking'){await page.getByText('Netzwerk-Labor: IPv4-Präfixe vergleichen',{exact:true}).click();await page.getByLabel('Zieladresse').fill('192.0.3.10');await expect(page.getByLabel('Präfix-Ergebnis')).toContainText('Anderes Präfix');}
  if(name==='Reverse Engineering'){await page.getByText('Byte-Labor: Reihenfolge und Text vergleichen',{exact:true}).click();await page.getByLabel('Bytes in Hex').fill('41 42 43');await expect(page.getByLabel('Byte-Ergebnis')).toContainText('ABC');}
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('expanded technology lessons and all new lab views work on first offline visit',async({page,context})=>{
 const {networkingExtraLessons}=await import('../src/networkingExtraLessons.js');const {cloudExtraLessons}=await import('../src/cloudExtraLessons.js');const {cybersecurityExtraLessons}=await import('../src/cybersecurityExtraLessons.js');const {reverseEngineeringExtraLessons}=await import('../src/reverseEngineeringExtraLessons.js');
 const examples=[networkingExtraLessons.find(x=>x.id==='networking-mtu'),cloudExtraLessons.find(x=>x.id==='cloud-queues'),cybersecurityExtraLessons.find(x=>x.id==='cybersecurity-cors'),reverseEngineeringExtraLessons.find(x=>x.id==='reverse-signed')];
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 for(const lesson of examples){await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
  if(lesson.course==='cloud'){await page.getByText('Cloud-Labor: Instanzen, Kosten und Verbindungen',{exact:true}).click();await expect(page.getByLabel('Cloud-Ergebnis')).toContainText('8,00');}
  if(lesson.course==='cybersecurity'){await page.getByText('Rechte-Labor: Anmeldung ist nicht Berechtigung',{exact:true}).click();await page.getByLabel('Rolle im Modell').selectOption('owner');await expect(page.getByLabel('Rechte-Ergebnis')).toContainText('Erlaubt');}
  if(lesson.course==='reverse'){await page.getByText('Byte-Labor: Reihenfolge und Text vergleichen',{exact:true}).click();await page.getByLabel('Bytes in Hex').fill('FF');await page.getByText('Dieselben Bytes mit Vorzeichen deuten',{exact:true}).click();await expect(page.getByLabel('Vorzeichen-Ergebnis')).toContainText('-1');}
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('further technology lessons keep the uniform reading layout offline',async({page,context})=>{
 const data=await import('../src/technologyFurtherLessons.js');const examples=[data.networkingFurtherLessons[0],data.cloudFurtherLessons[0],data.cybersecurityFurtherLessons[0],data.reverseEngineeringFurtherLessons[0]];
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 for(const lesson of examples){await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.knowledge-example')).toBeVisible();expect(await page.locator('.knowledge-example p').first().evaluate(el=>getComputedStyle(el).fontSize)).toBe('16px');await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('technology case studies load explain and grade on their first offline visit',async({page,context})=>{
 const data=await import('../src/technologyCaseLessons.js');const items=[data.networkingCaseLessons[0],data.cloudCaseLessons[0],data.cybersecurityCaseLessons[0],data.reverseEngineeringCaseLessons[0]];
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 for(const lesson of items){await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.knowledge-example')).toContainText(lesson.example);await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd').first()).toBeVisible();await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();}
 await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of items)expect(saved.solved[lesson.id]).toBeTruthy();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('mobile lesson arrows and modal list work offline and preserve solved progress',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Lektion wählen',exact:true});await dialog.getByRole('button',{name:/^\.filter\(\)/}).click();await expect(page.getByRole('heading',{name:'Elemente auswählen mit .filter()',exact:true})).toBeVisible();await page.getByRole('button',{name:'Vorherige Lektion im Thema',exact:true}).click();await expect(page.locator('.lesson-current-name')).toContainText('.map()');await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();await page.getByLabel('JavaScript-Code').fill(jsLessons.find(x=>x.id==='js-map').solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('3 / 3 bestanden');await page.getByLabel('Arbeitsbereich').getByRole('button',{name:'Lektion',exact:true}).click();await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();await expect(dialog.locator('[aria-current="step"]')).toContainText('Gelöst');await page.keyboard.press('Escape');await page.reload();await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();await expect(page.getByRole('dialog',{name:'Lektion wählen',exact:true}).locator('[aria-current="step"]')).toContainText('Gelöst');
});

test('mobile topic sheet works in the installed offline app',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
 const trigger=page.getByRole('button',{name:'Thema wählen',exact:true}),topics=page.getByRole('dialog',{name:'Thema wählen',exact:true});
 await trigger.click();await topics.getByRole('button',{name:'Zahlensysteme',exact:true}).click();await expect(topics).not.toBeVisible();await expect(trigger).toContainText('Zahlensysteme');
 await page.getByRole('button',{name:'Nächste Lektion im Thema',exact:true}).click();await expect(trigger).toContainText('Zahlensysteme');
 await page.reload();await expect(page.getByRole('button',{name:'Navigation öffnen',exact:true})).toBeVisible();
});

test('expanded Java course is available offline and keeps quiz progress after reload',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByLabel('Hauptbereich').locator('option')).toHaveCount(6);await expect(page.getByRole('heading',{name:'main() und println()',exact:true})).toBeVisible();
 await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio').nth(javaLessons[0].answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');
 await page.getByLabel('Hauptbereich',{exact:true}).selectOption('advanced');await page.getByRole('button',{name:'Thema wählen',exact:true}).click();await page.getByRole('dialog',{name:'Thema wählen',exact:true}).getByRole('button',{name:'Nebenläufigkeit',exact:true}).click();await expect(page.getByRole('heading',{name:'Thread.start() und join()',exact:true})).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByText(`1 von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:/Projektideen für alle Lernbereiche/}).click();await page.getByLabel('Lernbereich',{exact:true}).selectOption('java');await expect(page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button')).toHaveCount(13);
});

test('new Java regex tutorial, API help and local exercise solutions open offline',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');const lesson=javaLessons.find(x=>x.id==='java-regex-matches');await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await page.getByLabel('Hauptbereich',{exact:true}).selectOption('data');await page.getByRole('button',{name:'Thema wählen',exact:true}).click();await page.getByRole('dialog',{name:'Thema wählen',exact:true}).getByRole('button',{name:'Reguläre Ausdrücke',exact:true}).click();
 await page.locator('.learning-vocabulary summary').click();await expect(page.locator('.learning-vocabulary')).toContainText('Ein Suchmuster mit besonderen Zeichen und Regeln.');const api=page.locator('.java-api-help');await api.locator('summary').click();await expect(api).toContainText('Regulärer Ausdruck für die vollständige Eingabe.');
 const practice=page.locator('.java-self-practice');await practice.locator('summary').first().click();await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').first()).toContainText('public class Main');await expect(practice.locator('.syntax-strip').last()).toHaveText('true');
 await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');
 await page.reload();await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByText(`1 von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();
});

test('new Java advanced algorithms and their local solutions are cached offline',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');const lesson=javaLessons.find(x=>x.id==='java-topological-order');await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');
 await page.getByRole('tab',{name:'Erklärung',exact:true}).click();const practice=page.locator('.java-self-practice');await practice.locator('summary').first().click();await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').last()).toHaveText('Zyklus');
 await page.reload();await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByText(`1 von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:/Projektideen für alle Lernbereiche/}).click();await page.getByLabel('Lernbereich',{exact:true}).selectOption('java');await expect(page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button')).toHaveCount(13);await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').filter({hasText:'Java: Kleine HTTP-API'}).click();await expect(page.getByLabel('Quellcode Api.java')).toContainText('HttpServer');
});

test('Java data formats and CSV/config projects are available offline',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');const lesson=javaLessons.find(x=>x.id==='java-bounded-config-int');
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');
 await page.getByRole('tab',{name:'Erklärung',exact:true}).click();const practice=page.locator('.java-self-practice');await practice.locator('summary').first().click();await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').last()).toHaveText('1\n100');
 await page.reload();await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByText(`1 von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:/Projektideen für alle Lernbereiche/}).click();await page.getByLabel('Lernbereich',{exact:true}).selectOption('java');
 for(const [title,file,text] of [['Java: CSV importieren und auswerten','CsvReport.java','13 CSV-Tests bestanden'],['Java: Konfiguration prüfen','ConfigCheck.java','12 Konfigurationstests bestanden']]){await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').filter({hasText:title}).click();await expect(page.getByLabel('Quellcode '+file)).toContainText(text);}
});

test('idea to code guides, plans and linked projects work offline before first visit',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Von der Idee zum Code →',exact:true}).click();await expect(page.getByRole('heading',{name:'Von der Idee zum Code.',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Meine eigene Idee zerlegen',exact:true}).click();await page.getByLabel('Was soll jemand damit tun können?',{exact:true}).fill('Nachrichten übertragen.');await page.getByRole('button',{name:'An einem Beispiel lernen',exact:true}).click();await page.getByLabel('Was möchtest du bauen?').selectOption('transfer');await page.getByLabel('Etappe',{exact:true}).selectOption('3');await expect(page.getByLabel('Vollständiges Java-Beispiel')).toContainText('client.send');
 await page.getByRole('button',{name:'Passendes vollständiges Projekt öffnen →',exact:true}).click();await expect(page.getByRole('heading',{name:'Java: Kleine HTTP-API',exact:true})).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Von der Idee zum Code →',exact:true}).click();await expect(page.getByLabel('Was möchtest du bauen?')).toHaveValue('transfer');await expect(page.getByLabel('Etappe',{exact:true})).toHaveValue('3');await page.getByRole('button',{name:'Meine eigene Idee zerlegen',exact:true}).click();await expect(page.getByLabel('Was soll jemand damit tun können?',{exact:true})).toHaveValue('Nachrichten übertragen.');
});

test('Java concepts and expanded idea guides are usable offline with their practice solutions',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');const lesson=javaLessons.find(l=>l.id==='java-function-compose');await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');await page.getByRole('tab',{name:'Erklärung',exact:true}).click();const practice=page.locator('.java-self-practice');await practice.locator('summary').first().click();await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').last()).toHaveText('20\n11');
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Von der Idee zum Code →',exact:true}).click();await expect(page.getByLabel('Was möchtest du bauen?').locator('option')).toHaveCount(12);await page.getByLabel('Was möchtest du bauen?').selectOption('cache');await page.getByLabel('Etappe',{exact:true}).selectOption('3');await expect(page.getByLabel('Vollständiges Java-Beispiel')).toContainText('removeEldestEntry');await page.getByRole('button',{name:'Passendes vollständiges Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode Lru.java')).toContainText('10 Cache-Tests bestanden');
});

test('study sessions start offline and persist Java answers and results through reload',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await page.getByLabel('Lernbereich der Runde').selectOption('java');await page.getByLabel('Kapitel der Runde').selectOption('start');await page.getByLabel('Fragenzahl').selectOption('5');await page.getByRole('button',{name:'Runde starten',exact:true}).click();
 const original=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();expect((await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session)).id).toBe(original.id);
 for(let i=0;i<5;i++){const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session),item=s.items[s.index],lesson=javaLessons.find(l=>l.id===item.id);await page.getByRole('radio').nth(item.order.indexOf(lesson.answer)).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await page.getByRole('button',{name:i===4?'Runde abschließen':'Nächste Frage',exact:true}).click();}
 await expect(page.getByText('5 von 5 auf Anhieb richtig (100 %)',{exact:true})).toBeVisible();await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await expect(page.getByRole('heading',{name:'Runde abgeschlossen',exact:true})).toBeVisible();await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')).sessionReceipts.length)).toBe(1);
});

test('study chapter feedback and targeted error rounds work offline',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');const {createSession,finishSession}=await import('../src/studySession.js');const lesson=javaLessons.find(l=>l.id==='java-record');let round=createSession([lesson],'exam',5,Date.now()-60000,()=>0.4);round.items[0].answer=(round.items[0].order.indexOf(lesson.answer)+1)%3;round=finishSession(round,{[lesson.id]:lesson},Date.now()-1000);
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.evaluate(session=>localStorage.setItem('codeklar-study-session-v1',JSON.stringify({version:1,session,history:[]})),round);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await expect(page.getByRole('region',{name:'Kapitel-Auswertung'})).toContainText('Objektorientierung');await page.getByRole('button',{name:'Fehler aus diesem Kapitel üben',exact:true}).click();await expect(page.getByRole('heading',{name:lesson.title,exact:true})).toBeVisible();await expect(page.getByLabel('Beispiel zur Frage')).toContainText('public class Main');const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);expect(s.items.map(x=>x.id)).toEqual(['java-record']);
});

test('Swing package lessons, progress and the packaged desktop project work offline',async({page,context})=>{
 const {javaLessons}=await import('../src/data.js');const lesson=javaLessons.find(l=>l.id==='java-swing-button');
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');
 await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.java-self-practice > summary').click();await page.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(page.locator('.java-self-practice .syntax-strip').last()).toHaveText('An');await page.locator('.java-project-help > summary').click();await page.getByRole('button',{name:'Fenster-Zähler als Projekt öffnen →',exact:true}).click();
 await expect(page.getByLabel('Quellcode src/de/codeklar/desktop/App.java')).toContainText('package de.codeklar.desktop;');await page.getByRole('button',{name:'src/de/codeklar/desktop/CounterPanelTests.java',exact:true}).click();await expect(page.getByLabel('Quellcode src/de/codeklar/desktop/CounterPanelTests.java')).toContainText('invokeAndWait');
 await page.reload();await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByText(`1 von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();
 await page.getByLabel('Hauptbereich',{exact:true}).selectOption('tools');await page.getByRole('button',{name:'Thema wählen',exact:true}).click();await page.getByRole('dialog',{name:'Thema wählen',exact:true}).getByRole('button',{name:'Packages & Bibliotheken',exact:true}).click();await expect(page.locator('.lesson-panel')).toContainText('Ein Package ist ein Namensraum');
});
