import { test, expect } from "@playwright/test";
import { jsLessons } from "../src/data.js";
import { readFile } from "node:fs/promises";
import { parseCsv, writeCsv, MAX_FILE_BYTES } from "../src/fileFormats.js";
import { prepareModules } from "../src/moduleFiles.js";

test("examples execute; syntax errors and infinite loops stay inside the playground", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Code ausführen", exact: true })
    .click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("[2,4,6]");
  await page.getByLabel("JavaScript-Code").fill("const = ;");
  await page
    .getByRole("button", { name: "Code ausführen", exact: true })
    .click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("Unexpected");
  await page.getByLabel("JavaScript-Code").fill("while (true) {}");
  await page
    .getByRole("button", { name: "Code ausführen", exact: true })
    .click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText(
    "Zeitlimit erreicht",
    { timeout: 5000 },
  );
  await page.getByRole("button", { name: "Zurücksetzen", exact: true }).click();
  await expect(page.getByLabel("JavaScript-Code")).toHaveValue(
    jsLessons[0].example,
  );
});

test("wrong answers are not solved; valid solutions persist after reload", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText(
    "1 / 3 bestanden",
  );
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.getByLabel("JavaScript-Code").fill(jsLessons[0].solution);
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByText(`1 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.reload();
  await expect(page.getByText(`1 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("all JavaScript challenges accept correct solutions and reject constants", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("/");
  for (const lesson of jsLessons) {
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    await page
      .getByLabel("JavaScript-Code")
      .fill(`${lesson.solutionFiles ? "export " : ""}function ${lesson.functionName}(input) { return { __falscheAntwort: true }; }`);
    await page.getByRole("button", { name: "Lösung prüfen" }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(
      `0 / ${lesson.tests.length} bestanden`,
    );
    if (lesson.solutionFiles) {
      for (const [name, code] of Object.entries(lesson.solutionFiles)) {
        await page.getByRole("tab", { name, exact: true }).click();
        await page.getByLabel("JavaScript-Code").fill(code);
      }
    } else await page.getByLabel("JavaScript-Code").fill(lesson.solution);
    await page.getByRole("button", { name: "Lösung prüfen" }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(
      `${lesson.tests.length} / ${lesson.tests.length} bestanden`,
    );
  }
  await expect(page.getByText(`${jsLessons.length} von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("ordered learning path resumes after a solved foundation and remains usable on mobile", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Lernpfad beginnen", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Werte speichern mit let und const" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Vorherige Lektion" })).toBeDisabled();
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill("function neuerStand(start) { return start + 5; }");
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("3 / 3 bestanden");
  await page.reload();
  await page.getByRole("button", { name: "Lernpfad fortsetzen", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Datentypen erkennen mit typeof" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  await expect(page.locator(".path-steps button")).toHaveCount(jsLessons.length);
  await expect(page.locator(".path-steps li").first()).toContainText("Gelöst");
  await page.locator(".path-steps button").last().click();
  await expect(page.getByRole("heading", { name: "Miniprojekt: Deinen Budget-Rechner bauen" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Nächste Lektion" })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-learning-path-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
});

test("object answers accept any property order and reject missing fields or wrong types", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Miniprojekt: Deinen Budget-Rechner bauen" }).click();
  await page.getByLabel("JavaScript-Code").fill("function budgetBericht(daten) { let gesamt = 0; for (const wert of daten.ausgaben) gesamt += wert; return { imBudget: gesamt <= daten.budget, rest: daten.budget - gesamt, gesamt }; }");
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("4 / 4 bestanden");
  await page.getByLabel("JavaScript-Code").fill("function budgetBericht(daten) { return {}; }");
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("0 / 4 bestanden");
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Elemente auswählen mit .filter()" }).click();
  await page.getByLabel("JavaScript-Code").fill("function geradeZahlen(zahlen) { return {}; }");
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("0 / 3 bestanden");
});

test("mobile topic scroll remains at the selected area across category and lesson changes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const row = page.locator(".topic-tabs");
  const isSelectedVisible = () => row.evaluate((element) => {
    const active = element.querySelector('[aria-pressed="true"]').getBoundingClientRect();
    const bounds = element.getBoundingClientRect();
    return active.left >= bounds.left - 1 && active.right <= bounds.right + 1;
  });
  expect(await isSelectedVisible()).toBe(true);
  await row.evaluate((element) => { element.scrollLeft = element.scrollWidth; });
  const position = await row.evaluate((element) => element.scrollLeft);
  expect(position).toBeGreaterThan(0);
  await row.getByRole("button", { name: "Projekte", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Miniprojekt: Deinen Budget-Rechner bauen" })).toBeVisible();
  expect(Math.abs(await row.evaluate((element) => element.scrollLeft) - position)).toBeLessThanOrEqual(2);
  expect(await isSelectedVisible()).toBe(true);
  await row.getByRole("button", { name: "Arrays", exact: true }).click();
  const arraysPosition = await row.evaluate((element) => element.scrollLeft);
  await page.locator(".lesson-picker").getByRole("button", { name: ".filter()", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Elemente auswählen mit .filter()" })).toBeVisible();
  expect(Math.abs(await row.evaluate((element) => element.scrollLeft) - arraysPosition)).toBeLessThanOrEqual(2);
  expect(await isSelectedVisible()).toBe(true);
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.locator(".lesson-picker").getByRole("button", { name: ".map()", exact: true }).click();
  await expect(page.getByRole("tab", { name: "Erklärung", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.reload();
  expect(await isSelectedVisible()).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-mobile-topic-scroll.png", fullPage: false });
});

test("logic tasks expose precedence, operand values and unsafe property access", async ({ page }) => {
  await page.goto("/");
  async function check(title, code, result) {
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: title }).click();
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen" }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(result);
  }
  await check("Auswertungsreihenfolge mit Klammern klären", "function zugriffErlaubt(daten) { return daten.admin || daten.inhaber && !daten.gesperrt; }", "5 / 6 bestanden");
  await expect(page.locator(".difficulty")).not.toContainText("Gelöst");
  await check("Auswertungsreihenfolge mit Klammern klären", "function zugriffErlaubt(daten) { if (daten.gesperrt) return false; return daten.admin || daten.inhaber; }", "6 / 6 bestanden");
  await check("Was || tatsächlich zurückgibt", "function mitStandard(wert) { return wert ?? 'Standard'; }", "4 / 7 bestanden");
  await check("Unsichere Zugriffe durch Kurzschluss vermeiden", "function kontoAktiv(daten) { return daten.konto.aktiv; }", "2 / 5 bestanden");
  await check("Unsichere Zugriffe durch Kurzschluss vermeiden", "function kontoAktiv(daten) { if (!daten.konto) return false; return daten.konto.aktiv === true; }", "5 / 5 bestanden");
  for (const width of [390, 1505]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("course groups and per-language topic progress remain navigable on mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".course-group")).toHaveCount(5);
  await expect(page.getByRole("region", { name: "Programmiersprachen", exact: true }).getByRole("button", { name: "JavaScript", exact: true })).toBeVisible();
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  const controls = page.getByRole("region", { name: "Kontrollfluss-Lektionen", exact: true });
  await expect(controls.locator(".path-steps button")).toHaveCount(4);
  await controls.getByRole("button", { name: /Mehrere Fälle mit else if/ }).click();
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill("function rang(punkte) { if (punkte >= 50) return 'Silber'; if (punkte >= 80) return 'Gold'; return 'Bronze'; }");
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("4 / 6 bestanden");
  await page.getByLabel("JavaScript-Code").fill("function rang(punkte) { if (punkte < 50) return 'Bronze'; if (punkte < 80) return 'Silber'; return 'Gold'; }");
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("6 / 6 bestanden");
  await expect(controls.getByRole("heading")).toContainText("1 / 4 gelöst");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Navigation öffnen" }).click();
  await page.getByRole("button", { name: "Java", exact: true }).click();
  await expect(page.locator(".path-heading")).toContainText("Java · Schritt 1 von 1");
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  await expect(page.locator(".path-category")).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Navigation öffnen" }).click();
  await page.screenshot({ path: "/tmp/codeklar-grouped-navigation-mobile.png", fullPage: false, animations: "disabled" });
});

test("loop tasks distinguish break from continue and include the while boundary", async ({ page }) => {
  await page.goto("/");
  async function check(title, code, result) {
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: title }).click();
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen" }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(result);
  }
  await check("Wiederholen, solange eine Bedingung gilt", "function summeBis(n) { let summe = 0; let i = 1; while (i < n) { summe += i; i++; } return summe; }", "1 / 4 bestanden");
  await check("Eine Schleife mit break beenden", "function summeBisStop(zahlen) { let summe = 0; for (const zahl of zahlen) { if (zahl < 0) continue; summe += zahl; } return summe; }", "2 / 5 bestanden");
  await check("Einzelne Durchläufe mit continue überspringen", "function positiveSumme(zahlen) { let summe = 0; for (const zahl of zahlen) { if (zahl <= 0) break; summe += zahl; } return summe; }", "3 / 5 bestanden");
  await check("Einzelne Durchläufe mit continue überspringen", "function positiveSumme(zahlen) { return zahlen.filter(zahl => zahl > 0).reduce((summe, zahl) => summe + zahl, 0); }", "5 / 5 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "Erklärung", exact: true }).click();
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  const loops = page.getByRole("region", { name: "Schleifen-Lektionen", exact: true });
  await expect(loops.locator(".path-steps button")).toHaveCount(5);
  await expect(loops.getByRole("heading")).toContainText("1 / 5 gelöst");
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const selector of [".topic-tabs", ".lesson-picker"]) {
    await expect.poll(() => page.locator(selector).evaluate((row) => {
      const selected = row.querySelector('[aria-pressed="true"]').getBoundingClientRect();
      const bounds = row.getBoundingClientRect();
      return selected.left >= bounds.left - 1 && selected.right <= bounds.right + 1;
    })).toBe(true);
  }
  await page.screenshot({ path: "/tmp/codeklar-loops-mobile.png", fullPage: false, animations: "disabled" });
});

test("CSV quoting preserves commas, escaped quotes and embedded newlines", () => {
  const rows = [["name", "notiz"], ["Mira", "Hallo, Welt"], ["Ali", 'Er sagt "Ja"'], ["Lea", "Zeile 1\nZeile 2"], ["", ""]];
  expect(parseCsv(writeCsv(rows))).toEqual(rows);
  expect(parseCsv('a,b\r\n1,2\r\n')).toEqual([["a", "b"], ["1", "2"]]);
  expect(parseCsv('""')).toEqual([[""]]);
  expect(parseCsv(writeCsv([[""]]))).toEqual([[""]]);
  expect(parseCsv('')).toEqual([]);
  expect(() => parseCsv('"offen')).toThrow(/schließendes/);
  expect(() => parseCsv('"a"x,b')).toThrow(/Nach einem/);
  expect(() => parseCsv('a"b,c')).toThrow(/Anfang/);
});

test("Map presence and Set value types are checked independently from truthiness", async ({ page }) => {
  await page.goto("/");
  async function check(title, code, result) {
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: title }).click();
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen" }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(result);
  }
  await check("Vorhandene Map-Schlüssel gezielt prüfen", "function zuordnungLesen(daten) { const wert = new Map(daten.paare).get(daten.schluessel); return { gefunden: Boolean(wert), wert: wert || 'Fehlt' }; }", "3 / 6 bestanden");
  await check("Vorhandene Map-Schlüssel gezielt prüfen", "function zuordnungLesen(daten) { const map = new Map(daten.paare); return map.has(daten.schluessel) ? { wert: map.get(daten.schluessel), gefunden: true } : { wert: 'Fehlt', gefunden: false }; }", "6 / 6 bestanden");
  await check("Doppelte Werte mit Set entfernen", "function eindeutigeWerte(werte) { return [...new Set(werte.map(String))]; }", "1 / 4 bestanden");
  await check("Doppelte Werte mit Set entfernen", "function eindeutigeWerte(werte) { return werte.filter((wert, index) => werte.indexOf(wert) === index); }", "4 / 4 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("tab", { name: "Erklärung", exact: true }).click();
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  const structure = page.getByRole("region", { name: "Datenstrukturen-Lektionen", exact: true });
  await expect(structure.locator(".path-steps button")).toHaveCount(3);
  await expect(structure.getByRole("heading")).toContainText("2 / 3 gelöst");
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-structures-mobile.png", fullPage: false, animations: "disabled" });
});

test("module projects validate real imports and project-local paths", () => {
  const valid = prepareModules({ "main.js": "import {x} from './lib/werte.js'; export {x};", "lib/werte.js": "export const x = 3;" });
  expect(valid.modules["main.js"].imports[0].path).toBe("lib/werte.js");
  expect(() => prepareModules({ "main.js": "import x from './fehlt.js';" })).toThrow(/Datei nicht gefunden/);
  expect(() => prepareModules({ "main.js": "import x from 'https:\/\/example.com/x.js';" })).toThrow(/lokale Dateipfade/);
  expect(() => prepareModules({ "main.js": "import x from '../draussen.js';" })).toThrow(/verlässt/);
  expect(() => prepareModules({ "main.js": "import('paket');" })).toThrow(/Dynamische Imports/);
  expect(() => prepareModules({ "main.js": "export const = 3;" })).toThrow(/main.js/);
});

test("file tabs preserve module edits; missing exports, cycles and loops are reported", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Benannte Exports zwischen Dateien verwenden" }).click();
  await page.getByRole("tab", { name: "mathe.js", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill("export function doppelt(zahl) { return zahl * 2; }");
  await page.getByRole("tab", { name: "main.js", exact: true }).click();
  await page.getByRole("tab", { name: "mathe.js", exact: true }).click();
  await expect(page.getByLabel("JavaScript-Code")).toHaveValue("export function doppelt(zahl) { return zahl * 2; }");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("3 / 3 bestanden");
  await page.getByLabel("JavaScript-Code").fill("export default function doppelt(zahl) { return zahl * 2; }");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("doppelt");
  await expect(page.getByLabel("Code-Ausgabe")).not.toContainText("3 / 3 bestanden");
  await page.getByLabel("JavaScript-Code").fill("import './main.js'; export const doppelt = x => x * 2;");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("Zyklische Imports");
  await page.getByLabel("JavaScript-Code").fill("export function doppelt(x) { while (true) {} }");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("Zeitlimit erreicht", { timeout: 5000 });
  await page.getByRole("button", { name: "Zurücksetzen", exact: true }).click();
  await expect(page.getByRole("tab", { name: "main.js", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: "mathe.js", exact: true }).click();
  await expect(page.getByLabel("JavaScript-Code")).toHaveValue("export function doppelt(zahl) {\n  return zahl;\n}");
});

test("file lab imports, edits, validates, downloads and preserves a JSON note", async ({ page }) => {
  await page.goto("/");
  async function openLab() {
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: "JSON einlesen und Lesefehler behandeln" }).click();
  }
  await openLab();
  const lab = page.getByRole("region", { name: "Notizen und Datei-Labor", exact: true });
  await lab.getByLabel("Datei öffnen", { exact: true }).setInputFiles({ name: "notizen.json", mimeType: "application/json", buffer: Buffer.from('{"titel":"Üben","inhalt":"Dateien lernen"}') });
  await expect(lab.getByLabel("Ausgabeformat")).toHaveValue("json");
  await expect(lab.getByLabel("Dateiinhalt")).toHaveValue('{"titel":"Üben","inhalt":"Dateien lernen"}');
  await lab.getByLabel("Dateiinhalt").fill('{"titel":"Üben","inhalt":"Selbst geändert"}');
  await lab.getByLabel("Dateiname ohne Endung").fill("mira/notiz");
  const downloadPromise = page.waitForEvent("download");
  await lab.getByRole("button", { name: "Datei herunterladen", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("mira_notiz.json");
  const output = await readFile(await download.path(), "utf8");
  expect(output).toBe(JSON.stringify({ titel: "Üben", inhalt: "Selbst geändert" }, null, 2));
  await page.reload();
  await openLab();
  await expect(lab.getByLabel("Dateiinhalt")).toHaveValue('{"titel":"Üben","inhalt":"Selbst geändert"}');
  await lab.getByLabel("Dateiinhalt").fill("{broken");
  let downloads = 0;
  page.on("download", () => downloads++);
  await lab.getByRole("button", { name: "Datei herunterladen", exact: true }).click();
  await expect(lab.getByRole("status")).toContainText("Inhalt nicht verarbeitet");
  expect(downloads).toBe(0);
  await lab.getByLabel("Datei öffnen", { exact: true }).setInputFiles({ name: "gross.txt", mimeType: "text/plain", buffer: Buffer.alloc(MAX_FILE_BYTES + 1, "a") });
  await expect(lab.getByRole("status")).toContainText("Die Datei ist zu groß");
  await expect(lab.getByLabel("Dateiinhalt")).toHaveValue("{broken");
});

test("mobile file lab handles quoted CSV and reports blocked draft storage", async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error("Blocked"); }; });
  await page.goto("/");
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Einfache CSV-Daten einlesen" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  const lab = page.getByRole("region", { name: "Notizen und Datei-Labor", exact: true });
  await expect(lab).toContainText("Entwurf kann gerade nicht gespeichert werden");
  const text = 'name,notiz\r\nMira,"Hallo, Welt"\r\nAli,"Er sagt ""Ja"""\r\nLea,"Zeile 1\nZeile 2"';
  await lab.getByLabel("Datei öffnen", { exact: true }).setInputFiles({ name: "tabelle.csv", mimeType: "text/csv", buffer: Buffer.from(text) });
  await expect(lab.getByLabel("Dateiinhalt")).toHaveValue(text.replaceAll("\r\n", "\n"));
  await lab.getByRole("button", { name: "Inhalt prüfen", exact: true }).click();
  await expect(lab.getByRole("status")).toContainText("4 CSV-Zeilen");
  expect(JSON.parse(await lab.getByLabel("Datei-Ausgabe").textContent())).toEqual(parseCsv(text));
  const downloadPromise = page.waitForEvent("download");
  await lab.getByRole("button", { name: "Datei herunterladen", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("tabelle.csv");
  expect(parseCsv(await readFile(await download.path(), "utf8"))).toEqual(parseCsv(text));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await lab.scrollIntoViewIfNeeded();
  await page.screenshot({ path: "/tmp/codeklar-file-lab-mobile.png", fullPage: false, animations: "disabled" });
});

test("mutating the input cannot pass the map task", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page
    .getByLabel("JavaScript-Code")
    .fill(
      "function verdoppeln(zahlen) { for(let i = 0; i < zahlen.length; i++) zahlen[i] *= 2; return zahlen; }",
    );
  await page.getByRole("button", { name: "Lösung prüfen" }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText(
    "Die Eingabe wurde verändert.",
  );
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("quiz answers, reference search and exercise filters update their views", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Python", exact: true }).click();
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByRole("radio", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByRole("status")).toContainText("Noch nicht ganz.");
  await expect(page.getByText("0 von 1 Aufgaben gelöst")).toBeVisible();
  await page.getByRole("radio", { name: "None", exact: true }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByText("1 von 1 Aufgaben gelöst")).toBeVisible();
  await page.getByRole("button", { name: "Nachschlagen", exact: true }).click();
  await page.getByRole("textbox").fill("append");
  await expect(page.locator(".reference-entry")).toHaveCount(1);
  await expect(page.locator(".reference-entry")).toContainText("None");
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByLabel("Status filtern").selectOption("solved");
  await expect(page.getByRole("row")).toHaveCount(2);
  await expect(page.getByRole("table")).toContainText("Listen erweitern");
});

test("corrupted storage recovers and a unavailable store is reported", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("codeklar-progress-v1", "{broken"),
  );
  await page.goto("/");
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Blocked");
    };
  });
  await page.reload();
  await expect(page.getByText("Speichern nicht möglich")).toBeVisible();
});

test("desktop and mobile remain readable; mobile navigation works", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle("codeklar – Verstehe deinen Code");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "/tmp/codeklar-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "/tmp/codeklar-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Navigation öffnen" }).click();
  await page.getByRole("button", { name: "SQL", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Zeilen filtern mit WHERE" }),
  ).toBeVisible();
  await page
    .getByLabel("Schnellnavigation")
    .getByRole("button", { name: "Fortschritt", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Jeder gelöste Schritt zählt." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("learner-written assertions reject empty, tautological and broken suites and detect missing boundaries", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/codeklar/i);
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Mit Assertions Ergebnisse prüfen" }).click();
  const output = page.getByLabel("Code-Ausgabe");
  for (const body of ["", "gleich(addieren(2, 3), addieren(2, 3), 'Selbstvergleich');", "throw new Error('Abbruch');", "gleich(addieren(2, 3), 6, 'falsche Erwartung');", "gleich(addieren(2, 3), '5', 'falscher Typ');"]) {
    await page.getByLabel("JavaScript-Code").fill(`export function pruefe(addieren, {gleich}) { ${body} }`);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
    await expect(output).toContainText(`${body.includes("Selbstvergleich") ? 1 : 0} / 3 bestanden`);
    await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
    if (body.includes('falscher Typ')) {
      await expect(output.getByLabel("Eigene Testergebnisse")).toContainText('Erwartet: "5"');
      await expect(output.getByLabel("Eigene Testergebnisse")).toContainText('Erhalten: 5');
    }
  }
  await page.getByLabel("JavaScript-Code").fill("export function pruefe(addieren, {gleich}) { gleich(addieren(2, 3), 5, 'nur normaler Fall'); }");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(output).toContainText("2 / 3 bestanden");
  await expect(output).toContainText("Fehler bleibt unentdeckt");
  const lesson = jsLessons.find(item => item.id === "js-test-equal");
  await page.getByLabel("JavaScript-Code").fill(lesson.solution);
  await page.getByRole("button", { name: "Code ausführen", exact: true }).click();
  await expect(output.getByLabel("Eigene Testergebnisse")).toContainText("Alle eigenen Tests bestanden");
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.getByRole("tab", { name: "funktion.js", exact: true }).click();
  await page.getByLabel("JavaScript-Code").fill("export function addieren(a, b) { return a - b; }");
  await page.getByRole("button", { name: "Code ausführen", exact: true }).click();
  await expect(output).toContainText("Mindestens eine eigene Assertion ist fehlgeschlagen");
  await expect(output.getByLabel("Eigene Testergebnisse").locator(".failed")).toHaveCount(1);
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(output).toContainText("3 / 3 bestanden");
  await page.reload();
  await expect(page.getByText(`1 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
  expect(errors).toEqual([]);
});

test("throw assertions report misuse and own test results remain readable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByLabel("Schnellnavigation").getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByRole("row").filter({ hasText: "Erwartete Fehler mit Tests absichern" }).click();
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  const lesson = jsLessons.find(item => item.id === "js-test-throws");
  await page.getByLabel("JavaScript-Code").fill("export function pruefe(liesJSON, {wirft}) { wirft(null, 'kein Aufruf'); }");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("wirft erwartet eine Funktion");
  await page.getByLabel("JavaScript-Code").fill(lesson.solution);
  await page.getByRole("button", { name: "Code ausführen", exact: true }).click();
  await expect(page.getByLabel("Eigene Testergebnisse")).toContainText("Fehler geworfen");
  await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  await expect(page.getByLabel("Code-Ausgabe")).toContainText("3 / 3 bestanden");
  await page.getByLabel("Code-Ausgabe").scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-own-tests-mobile.png", fullPage: false });
  await page.getByRole("button", { name: "Zurücksetzen", exact: true }).click();
  await expect(page.getByLabel("JavaScript-Code")).toHaveValue(lesson.starter);
});

test("stack and queue exercises distinguish order, preserve input and handle empty dequeues", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/codeklar/i);
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const stack = await open("js-stack");
  await check("function stapelLeeren(werte) { return [...werte]; }");
  await expect(output).toContainText("2 / 5 bestanden");
  await check("function stapelLeeren(werte) { return werte.reverse(); }");
  await expect(output).toContainText("Die Eingabe wurde verändert");
  await check(stack.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const undo = await open("js-stack-undo");
  await check(undo.solution.replace("verlauf.push(text);\n      text = aktion.text;", "text = aktion.text;\n      verlauf.push(text);"));
  await expect(output).toContainText("1 / 5 bestanden");
  await check(undo.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const queue = await open("js-queue");
  await check(queue.solution.replace("warteschlange.shift()", "warteschlange.pop()"));
  await expect(output).toContainText("2 / 5 bestanden");
  await check(queue.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const head = await open("js-queue-head");
  await check(head.solution.replace("entnommen.push(null);", "entnommen.push(null); kopf += 1;"));
  await expect(output).toContainText("4 / 5 bestanden");
  await check(head.solution.replace("kopf < werte.length", "werte[kopf]"));
  await expect(output).toContainText("4 / 5 bestanden");
  await check(head.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-stack-queue-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`4 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("bracket nesting and linked-list exercises catch reversed links, skipped values and mutation", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const brackets = await open("js-stack-brackets");
  await check("function klammernGueltig(text) { let anzahl = 0; for (const zeichen of text) { if ('([{'.includes(zeichen)) anzahl += 1; if (')]}'.includes(zeichen)) anzahl -= 1; } return anzahl === 0; }");
  await expect(output).toContainText("6 / 9 bestanden");
  await check(brackets.solution);
  await expect(output).toContainText("9 / 9 bestanden");
  const build = await open("js-linked-build");
  await check(build.solution.replace("let i = werte.length - 1; i >= 0; i -= 1", "let i = 0; i < werte.length; i += 1"));
  await expect(output).toContainText("2 / 5 bestanden");
  await check(build.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const read = await open("js-linked-read");
  await check(read.solution.replace("knoten !== null", "knoten !== null && knoten.wert"));
  await expect(output).toContainText("3 / 5 bestanden");
  await check(read.solution.replace("knoten !== null", "knoten?.next"));
  await expect(output).toContainText("1 / 5 bestanden");
  await check(read.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const prepend = await open("js-linked-prepend");
  await check("function vorneEinfuegen(daten) { const ergebnis = {wert: daten.wert, next: structuredClone(daten.kopf)}; if (daten.kopf) daten.kopf.next = null; return ergebnis; }");
  await expect(output).toContainText("3 / 4 bestanden");
  await expect(output).toContainText("Die Eingabe wurde verändert");
  await check(prepend.solution);
  await expect(output).toContainText("4 / 4 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-linked-list-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`4 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("list operations distinguish strict matches, first deletion and nonmutating reversal", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const search = await open("js-linked-search");
  await check(search.solution.replace("knoten.wert === daten.gesucht", "knoten.wert == daten.gesucht"));
  await expect(output).toContainText("6 / 9 bestanden");
  await check(search.solution);
  await expect(output).toContainText("9 / 9 bestanden");
  const deletion = await open("js-linked-delete");
  await check(deletion.solution.replace("!entfernt && knoten.wert === daten.gesucht", "knoten.wert === daten.gesucht"));
  await expect(output).toContainText("7 / 9 bestanden");
  await check(deletion.solution);
  await expect(output).toContainText("9 / 9 bestanden");
  const reverse = await open("js-linked-reverse");
  await check("function listeUmkehren(kopf) { let vorher = null; let knoten = kopf; while (knoten !== null) { const danach = knoten.next; knoten.next = vorher; vorher = knoten; knoten = danach; } return vorher; }");
  await expect(output).toContainText("2 / 6 bestanden");
  await expect(output).toContainText("Die Eingabe wurde verändert");
  await check(reverse.solution);
  await expect(output).toContainText("6 / 6 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-list-operations-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`3 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("recursive exercises catch missing bases and returns while preserving nested arrays", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const countdown = await open("js-recursion-countdown");
  await check(countdown.solution.replace("return [0]", "return []"));
  await expect(output).toContainText("0 / 4 bestanden");
  await check(countdown.solution);
  await expect(output).toContainText("4 / 4 bestanden");
  const factorial = await open("js-recursion-factorial");
  await check("function fakultaet(n) { return n * fakultaet(n - 1); }");
  await expect(output).toContainText("0 / 5 bestanden");
  await check(factorial.solution.replace("return 1", "return 0"));
  await expect(output).toContainText("0 / 5 bestanden");
  await check(factorial.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const length = await open("js-recursion-list-length");
  await check(length.solution.replace("kopf === null", "!kopf?.wert"));
  await expect(output).toContainText("3 / 4 bestanden");
  await check(length.solution);
  await expect(output).toContainText("4 / 4 bestanden");
  const nested = await open("js-recursion-nested-sum");
  await check(nested.solution.replace("summe += verschachteltSummieren(teil)", "verschachteltSummieren(teil)"));
  await expect(output).toContainText("4 / 7 bestanden");
  await check("function verschachteltSummieren(daten) { if (!Array.isArray(daten)) return daten; let summe = 0; while (daten.length) summe += verschachteltSummieren(daten.shift()); return summe; }");
  await expect(output).toContainText("3 / 7 bestanden");
  await expect(output).toContainText("Die Eingabe wurde verändert");
  await check(nested.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-recursion-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`4 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("tree exercises distinguish height, both subtrees and traversal order", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const count = await open("js-tree-count");
  await check(count.solution.replace(" + baumKnoten(baum.rechts)", ""));
  await expect(output).toContainText("2 / 7 bestanden");
  await check(count.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  const height = await open("js-tree-height");
  await check(height.solution.replace("Math.max(baumHoehe(baum.links), baumHoehe(baum.rechts))", "baumHoehe(baum.links) + baumHoehe(baum.rechts)"));
  await expect(output).toContainText("3 / 7 bestanden");
  await check(height.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  const preorder = await open("js-tree-preorder");
  await check(preorder.solution.replace("...preorder(baum.links), ...preorder(baum.rechts)", "...preorder(baum.rechts), ...preorder(baum.links)"));
  await expect(output).toContainText("3 / 7 bestanden");
  await check(preorder.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  const inorder = await open("js-tree-inorder");
  await check(inorder.solution.replace("...inorder(baum.links), baum.wert, ...inorder(baum.rechts)", "baum.wert, ...inorder(baum.links), ...inorder(baum.rechts)"));
  await expect(output).toContainText("4 / 7 bestanden");
  await check(inorder.solution.replace("...inorder(baum.rechts)];", "...inorder(baum.rechts)].sort();"));
  await expect(output).toContainText("4 / 7 bestanden");
  await check(inorder.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-trees-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`4 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("advanced tree exercises distinguish queue order, search direction and immutable insertion", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const post = await open("js-tree-postorder");
  await check(post.solution.replace("...postorder(baum.links), ...postorder(baum.rechts)", "...postorder(baum.rechts), ...postorder(baum.links)"));
  await expect(output).toContainText("3 / 7 bestanden");
  await check(post.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  const bfs = await open("js-tree-bfs");
  await check(bfs.solution.replace("const knoten = queue[kopf];\n    kopf += 1;", "const knoten = queue.pop();"));
  await expect(output).toContainText("3 / 7 bestanden");
  await check(bfs.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  const search = await open("js-bst-search");
  await check(search.solution.replace("? knoten.links : knoten.rechts", "? knoten.rechts : knoten.links"));
  await expect(output).toContainText("4 / 8 bestanden");
  await check(search.solution);
  await expect(output).toContainText("8 / 8 bestanden");
  const insert = await open("js-bst-insert");
  await check(insert.solution.replace("if (daten.wert === baum.wert) return baum;", ""));
  await expect(output).toContainText("5 / 7 bestanden");
  await check("function suchbaumEinfuegen(daten) { function einfuegen(baum) { if (baum === null) return {wert: daten.wert, links: null, rechts: null}; if (daten.wert === baum.wert) return baum; if (daten.wert < baum.wert) baum.links = einfuegen(baum.links); else baum.rechts = einfuegen(baum.rechts); return baum; } return einfuegen(daten.baum); }");
  await expect(output).toContainText("3 / 7 bestanden");
  await expect(output).toContainText("Die Eingabe wurde verändert");
  await check(insert.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-search-trees-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`4 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test("BST validation carries ancestor bounds and graph BFS handles cycles and own keys", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const output = page.getByLabel("Code-Ausgabe");
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole("button", { name: "Übungen", exact: true }).click();
    await page.getByRole("row").filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel("JavaScript-Code").fill(code);
    await page.getByRole("button", { name: "Lösung prüfen", exact: true }).click();
  }
  const minimum = await open("js-bst-min");
  await check(minimum.solution.replace("knoten.links !== null", "knoten.links?.wert"));
  await expect(output).toContainText("4 / 5 bestanden");
  await check(minimum.solution);
  await expect(output).toContainText("5 / 5 bestanden");
  const valid = await open("js-bst-valid");
  await check("function suchbaumGueltig(baum) { if (baum === null) return true; if (baum.links !== null && baum.links.wert >= baum.wert) return false; if (baum.rechts !== null && baum.rechts.wert <= baum.wert) return false; return suchbaumGueltig(baum.links) && suchbaumGueltig(baum.rechts); }");
  await expect(output).toContainText("6 / 8 bestanden");
  await check(valid.solution);
  await expect(output).toContainText("8 / 8 bestanden");
  const neighbors = await open("js-graph-neighbors");
  await check("function graphNachbarn(daten) { if (!daten.graph[daten.name]) return []; return [...daten.graph[daten.name]]; }");
  await expect(output).toContainText("5 / 6 bestanden");
  await check(neighbors.solution);
  await expect(output).toContainText("6 / 6 bestanden");
  const bfs = await open("js-graph-bfs");
  await check(bfs.solution.replace("gesehen.add(nachbar);", ""));
  await expect(output).toContainText("Zeitlimit erreicht", { timeout: 5000 });
  await check(bfs.solution);
  await expect(output).toContainText("7 / 7 bestanden");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Code bearbeiten", exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/codeklar-graphs-mobile.png", fullPage: false });
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByText(`4 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test('project library covers every course, runs its game and downloads complete files on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Schnellnavigation' }).getByRole('button', { name: 'Übungen' }).click();
  await page.getByRole('button', { name: 'Projektideen für alle Lernbereiche' }).click();
  await expect(page.getByRole('heading', { name: 'Aus Funktionen werden Projekte.' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Projektbeispiele' }).getByRole('button')).toHaveCount(12);
  const game = page.frameLocator('iframe[title="Klick-Challenge ausprobieren"]');
  await game.getByRole('button', { name: 'Neue Runde' }).click();
  await game.getByRole('button', { name: 'Klick!', exact: true }).click();
  await expect(game.locator('#score')).toContainText('Punkte: 1');
  await page.getByLabel('Lernbereich', { exact: true }).selectOption('spring');
  await expect(page.getByRole('heading', { name: 'Taschenrechner-API', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'src/main/java/de/codeklar/Calculator.java', exact: true }).click();
  await expect(page.getByLabel('Quellcode src/main/java/de/codeklar/Calculator.java')).toContainText('@GetMapping');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Projekt als ZIP herunterladen' }).click();
  const archive = await downloaded;
  const { unzipSync, strFromU8 } = await import('fflate');
  const files = unzipSync(await readFile(await archive.path()));
  expect(strFromU8(files['pom.xml'])).toContain('spring-boot-starter-web');
  expect(strFromU8(files['README.md'])).toContain('mvn spring-boot:run');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByLabel('Projekt suchen').fill('nicht-vorhanden');
  await expect(page.getByText('Keine Projekte gefunden.')).toBeVisible();
  await page.getByLabel('Projekt suchen').fill('');
  await page.setViewportSize({ width: 1505, height: 1045 });
  await expect(page.getByRole('heading', { name: 'Taschenrechner-API', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/codeklar-projects-desktop.png', fullPage: true });
});
