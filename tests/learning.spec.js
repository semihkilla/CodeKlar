import { test, expect } from "@playwright/test";
import { computerLessons } from "../src/computerLessons.js";
import { groupTopics } from "../src/topicGroups.js";
import { lessons } from "../src/data.js";
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
  test.setTimeout(480000);
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
  await page.locator(".path-chapter > summary").filter({ hasText: "Projekte & Werkzeuge" }).click();
  await page.getByRole("region", { name: "Projekte-Lektionen", exact: true }).getByRole("button", { name: /Miniprojekt: Deinen Budget-Rechner bauen/ }).click();
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
  await page.getByLabel("Hauptbereich", { exact: true }).selectOption("practice");
  await row.getByRole("button", { name: "Projekte", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Miniprojekt: Deinen Budget-Rechner bauen" })).toBeVisible();
  await expect(page.getByLabel("Hauptbereich", { exact: true })).toHaveValue("practice");
  expect(await isSelectedVisible()).toBe(true);
  await page.getByLabel("Hauptbereich", { exact: true }).selectOption("data");
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
  await expect(page.locator(".course-group")).toHaveCount(6);
  await expect(page.getByRole("region", { name: "Programmiersprachen", exact: true }).getByRole("button", { name: "JavaScript", exact: true })).toBeVisible();
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  await page.locator(".path-chapter > summary").filter({ hasText: "Einstieg" }).click();
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
  await expect(page.locator(".reference-entry")).toHaveCount(2);
  await page.getByLabel("Lernbereich filtern").selectOption("python");
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
  await expect(page.getByRole('navigation', { name: 'Projektbeispiele' }).getByRole('button')).toHaveCount(22);
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

test('DFS follows branch order and shortest paths reject longer routes and falsy-name truncation', async ({ page }) => {
  await page.goto('/');
  const output = page.getByLabel('Code-Ausgabe');
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel('JavaScript-Code').fill(code);
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
  }
  const dfs = await open('js-graph-dfs');
  await check(jsLessons.find(item => item.id === 'js-graph-bfs').solution.replaceAll('graphBreitensuche', 'graphTiefensuche'));
  await expect(output).toContainText('6 / 7 bestanden');
  await check(dfs.solution);
  await expect(output).toContainText('7 / 7 bestanden');
  const shortest = await open('js-graph-shortest');
  await check(`function kuerzesterWeg({ graph, start, ziel }) {
    if (!Object.hasOwn(graph, start) || !Object.hasOwn(graph, ziel)) return [];
    const gesehen = new Set();
    function suche(name, pfad) {
      if (gesehen.has(name)) return [];
      gesehen.add(name);
      const weg = [...pfad, name];
      if (name === ziel) return weg;
      for (const nachbar of graph[name]) {
        const gefunden = suche(nachbar, weg);
        if (gefunden.length) return gefunden;
      }
      return [];
    }
    return suche(start, []);
  }`);
  await expect(output).toContainText('10 / 11 bestanden');
  await check(shortest.solution.replace('while (schritt !== null)', 'while (schritt)'));
  await expect(output).toContainText('10 / 11 bestanden');
  await check(shortest.solution.replace('return pfad.reverse();', 'return pfad;'));
  await expect(output).toContainText('5 / 11 bestanden');
  await check(shortest.solution);
  await expect(output).toContainText('11 / 11 bestanden');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
  await output.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/codeklar-shortest-path-mobile.png' });
});

test('sorting checks numeric order and mutation; search checks zero, boundaries and duplicate first matches', async ({ page }) => {
  await page.goto('/');
  const output = page.getByLabel('Code-Ausgabe');
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel('JavaScript-Code').fill(code);
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
  }
  const numeric = await open('js-sort-numbers');
  await check(numeric.solution.replace('.sort((a, b) => a - b)', '.sort()'));
  await expect(output).toContainText('4 / 6 bestanden');
  await check(numeric.solution.replace('[...zahlen]', 'zahlen'));
  await expect(output).toContainText('2 / 6 bestanden');
  await check(numeric.solution);
  await expect(output).toContainText('6 / 6 bestanden');
  const ranking = await open('js-sort-ranking');
  await check(ranking.solution.replace('if (a.name < b.name) return -1;', '').replace('if (a.name > b.name) return 1;', ''));
  await expect(output).toContainText('4 / 5 bestanden');
  await check(ranking.solution);
  await expect(output).toContainText('5 / 5 bestanden');
  const linear = await open('js-find-index');
  await check(linear.solution.replace('daten.gesucht);', 'daten.gesucht) || -1;'));
  await expect(output).toContainText('4 / 6 bestanden');
  await check(linear.solution);
  await expect(output).toContainText('6 / 6 bestanden');
  const binary = await open('js-binary-search');
  await check(binary.solution.replace('if (zahlen[mitte] === gesucht) treffer = mitte;', 'if (zahlen[mitte] === gesucht) return mitte;'));
  await expect(output).toContainText('8 / 10 bestanden');
  await check(binary.solution.replace('links <= rechts', 'links < rechts'));
  await expect(output).toContainText('4 / 10 bestanden');
  await check(binary.solution);
  await expect(output).toContainText('10 / 10 bestanden');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('array queries preserve zero, distinguish some from every and reduce quantities with an initial value', async ({ page }) => {
  await page.goto('/');
  const output = page.getByLabel('Code-Ausgabe');
  async function open(id) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    return lesson;
  }
  async function check(code) {
    await page.getByLabel('JavaScript-Code').fill(code);
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
  }
  const find = await open('js-array-find');
  await check(find.solution.replace('?? null', '|| null'));
  await expect(output).toContainText('5 / 6 bestanden');
  await check(find.solution.replace('.find(', '.findIndex('));
  await expect(output).toContainText('0 / 6 bestanden');
  await check(find.solution);
  await expect(output).toContainText('6 / 6 bestanden');
  const some = await open('js-array-some');
  await check(some.solution.replace('.some(', '.every('));
  await expect(output).toContainText('3 / 6 bestanden');
  await check(some.solution);
  await expect(output).toContainText('6 / 6 bestanden');
  const every = await open('js-array-every');
  await check(every.solution.replace('.every(', '.some('));
  await expect(output).toContainText('4 / 6 bestanden');
  await check(every.solution);
  await expect(output).toContainText('6 / 6 bestanden');
  const reduce = await open('js-array-reduce');
  await check(reduce.solution.replace(' * artikel.menge', ''));
  await expect(output).toContainText('2 / 6 bestanden');
  await check(reduce.solution.replace(',\n    0', ''));
  await expect(output).toContainText('0 / 6 bestanden');
  await check(reduce.solution);
  await expect(output).toContainText('6 / 6 bestanden');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('functions and object lessons catch missing returns, shared state, defaults and shallow-copy mutation', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/');
  const output = page.getByLabel('Code-Ausgabe');
  const variants = [
    ['js-fn-arrow-object', code => code.replace('({ wert })', '{ wert }'), '0 / 5'],
    ['js-fn-independent', code => code.replace('const b = erzeuge(daten.b);', 'const b = a;'), '1 / 4'],
    ['js-obj-optional', code => code.replace('?? "Unbekannt"', '|| "Unbekannt"'), '5 / 6'],
    ['js-obj-nested', () => 'function nested(daten) { const neu = { ...daten.benutzer }; neu.profil.stadt = daten.stadt; return neu; }', '1 / 3'],
    ['js-str-replace-all', code => code.replace('.replaceAll(', '.replace('), '2 / 5'],
    ['js-async-catch', code => code.replace('return await laden;', 'return laden;'), '2 / 4'],
  ];
  for (const [id, mutate, expected] of variants) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    await page.getByLabel('JavaScript-Code').fill(mutate(lesson.solution));
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
    await expect(output).toContainText(`${expected} bestanden`);
    await page.getByLabel('JavaScript-Code').fill(lesson.solution);
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
    await expect(output).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);
  }
});

test('async playground waits for timer promises, handles rejected awaits and still stops infinite waits', async ({ page }) => {
  await page.goto('/');
  const code = page.getByLabel('JavaScript-Code');
  const output = page.getByLabel('Code-Ausgabe');
  await code.fill('const wert = await new Promise(resolve => setTimeout(() => resolve(7), 30)); console.log(wert);');
  await page.getByRole('button', { name: 'Code ausführen', exact: true }).click();
  await expect(output).toContainText('7');
  await code.fill('await Promise.reject(new Error("Laden fehlgeschlagen"));');
  await page.getByRole('button', { name: 'Code ausführen', exact: true }).click();
  await expect(output).toContainText('Laden fehlgeschlagen');
  await code.fill('await new Promise(() => {});');
  await page.getByRole('button', { name: 'Code ausführen', exact: true }).click();
  await expect(output).toContainText('Zeitlimit erreicht', { timeout: 5000 });
  await code.fill('console.log(await Promise.resolve("Wieder bereit"));');
  await page.getByRole('button', { name: 'Code ausführen', exact: true }).click();
  await expect(output).toContainText('Wieder bereit');
  await page.getByRole('button', { name: 'Übungen', exact: true }).click();
  const lesson = jsLessons.find(item => item.id === 'js-async-all');
  await page.getByRole('row').filter({ hasText: lesson.title }).click();
  await code.fill(lesson.example);
  await page.getByRole('button', { name: 'Code ausführen', exact: true }).click();
  await expect(output).toContainText('[6,2]');
  await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
  await expect(output).toContainText('4 / 4 bestanden');
});

test('classes regex and promise variants expose lost this, stale regex positions and wrong completion rules', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('/');
  const output = page.getByLabel('Code-Ausgabe');
  const variants = [
    ['js-class-bind', code => code.replace('.bind(rechner)', ''), '1 / 4'],
    ['js-regex-test', code => code.replace('/^[0-9]+$/', '/^[0-9]+$/m'), '6 / 7'],
    ['js-regex-state', code => code.replace('muster.lastIndex = 0;', ''), '2 / 4'],
    ['js-error-custom', code => code.replace('daten.wert < daten.min || daten.wert > daten.max', 'daten.wert <= daten.min || daten.wert >= daten.max'), '3 / 5'],
    ['js-async-any', code => code.replace('Promise.any(jobs)', 'Promise.race(jobs)').replace('  const jobs =', '  if (daten.length === 0) return null;\n  const jobs ='), '3 / 4'],
    ['js-async-finally', code => code.replace('job.finally(', 'job.then('), '0 / 3'],
  ];
  for (const [id, mutate, expected] of variants) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    await page.getByLabel('JavaScript-Code').fill(mutate(lesson.solution));
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
    await expect(output).toContainText(`${expected} bestanden`);
    await page.getByLabel('JavaScript-Code').fill(lesson.solution);
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
    await expect(output).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);
  }
});

test('UTC date lessons retain leap days, offsets and calendar boundaries in a different timezone', async ({ browser }) => {
  const context = await browser.newContext({ timezoneId: 'Pacific/Honolulu', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  for (const id of ['js-date-iso', 'js-date-parts', 'js-date-add', 'js-date-difference']) {
    const lesson = jsLessons.find(item => item.id === id);
    await page.getByLabel('Schnellnavigation').getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
    await page.getByLabel('JavaScript-Code').fill(lesson.solution);
    await page.getByRole('button', { name: 'Lösung prüfen', exact: true }).click();
    await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

async function openBrowserLesson(page, id, example = false, mobile = false) {
  const lesson = jsLessons.find(item => item.id === id);
  await page.getByRole('button', { name: 'Übungen', exact: true }).click();
  await page.getByRole('row').filter({ hasText: lesson.title }).click();
  if (example) await page.getByRole('tab', { name: 'Erklärung', exact: true }).click();
  if (mobile) await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
  return lesson;
}

test('browser calculator preview supports mobile form input, keyboard submit and all operations', async ({ page }) => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  const lesson=await openBrowserLesson(page,'js-browser-calculator');
  await expect(page.getByLabel('Bedienung im Beispieltest')).toContainText('Eingabe bei #a: \"2\"');
  await page.getByRole('button',{name:'Code bearbeiten',exact:true}).click();
  await page.getByLabel('JavaScript-Code').fill(lesson.solution);
  await page.getByRole('tab',{name:'HTML',exact:true}).click();
  await page.getByLabel('HTML-Code').fill(lesson.browser.html.replace('Taschenrechner','Mein Rechner')+'<script>throw new Error("Untrusted script")</script>');
  await page.getByRole('tab',{name:'JavaScript',exact:true}).click();
  await page.getByRole('button',{name:'Code ausführen',exact:true}).click();
  const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');
  await expect(preview.getByRole('heading',{name:'Mein Rechner'})).toBeVisible();
  await expect(preview.locator('#a')).toBeVisible();
  await preview.locator('#a').fill('7');await preview.locator('#b').fill('3');
  await preview.getByRole('button').click();await expect(preview.locator('#ergebnis')).toHaveText('10');
  await preview.locator('#op').selectOption('/');await preview.locator('#b').fill('0');
  await preview.locator('#b').press('Enter');await expect(preview.locator('#ergebnis')).toHaveText('Division durch 0');
  await preview.locator('#op').selectOption('*');await preview.locator('#a').fill('0');await preview.locator('#b').fill('2');
  await preview.getByRole('button').click();await expect(preview.locator('#ergebnis')).toHaveText('0');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:'/tmp/codeklar-browser-mobile.png',fullPage:true});
  await page.setViewportSize({width:1505,height:1045});
  await page.screenshot({path:'/tmp/codeklar-browser-desktop.png',fullPage:true});
  await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();
  await expect(page.getByLabel('Code-Ausgabe')).toContainText('10 / 10 bestanden');expect(errors).toEqual([]);
});

test('browser todo safely displays user text, delegates deletion and restores isolated saved tasks',async({page})=>{
  await page.goto('/');const lesson=await openBrowserLesson(page,'js-browser-todo');
  await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();
  const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');
  await preview.locator('#neu').fill('<img src=x onerror=alert(1)>');await preview.getByRole('button',{name:'Hinzufügen'}).click();
  await expect(preview.locator('#liste li')).toHaveCount(1);await expect(preview.locator('#liste')).toContainText('<img src=x onerror=alert(1)>');await expect(preview.locator('img')).toHaveCount(0);
  await preview.locator('#neu').fill('JavaScript lernen');await preview.locator('#neu').press('Enter');await expect(preview.locator('#liste li')).toHaveCount(2);
  await page.reload();await openBrowserLesson(page,'js-browser-todo');await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();await expect(preview.locator('#liste li')).toHaveCount(2);
  await preview.locator('#liste li').first().getByRole('button').click();await expect(preview.locator('#liste li')).toHaveCount(1);await expect(preview.locator('#liste')).toContainText('JavaScript lernen');
  await page.getByRole('button',{name:'Übungsspeicher leeren'}).click();await page.getByRole('button',{name:'Code ausführen',exact:true}).click();await expect(preview.locator('#liste li')).toHaveCount(0);
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test('browser highscore survives a new round and app reload without counting preview actions as solved',async({page})=>{
  await page.goto('/');const lesson=await openBrowserLesson(page,'js-browser-highscore');await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();
  const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');
  await preview.getByRole('button',{name:'Treffer +1'}).click();await expect(preview.locator('#stand')).toHaveText('Punkte: 1 · Highscore: 1');
  await preview.getByRole('button',{name:'Treffer +1'}).click();await expect(preview.locator('#stand')).toHaveText('Punkte: 2 · Highscore: 2');
  await preview.getByRole('button',{name:'Neue Runde'}).click();await expect(preview.locator('#stand')).toHaveText('Punkte: 0 · Highscore: 2');
  await page.reload();await openBrowserLesson(page,'js-browser-highscore');await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('Punkte: 0 · Highscore: 2');
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();
});

test('module browser project edits affect preview and its ZIP runs with a native browser DOM',async({page,context})=>{
  test.setTimeout(60000);
  await page.goto('/');const lesson=await openBrowserLesson(page,'js-browser-modules');
  for(const [name,code] of Object.entries(lesson.solutionFiles)){await page.getByRole('tab',{name,exact:true}).click();await page.getByLabel('JavaScript-Code').fill(code);}
  await page.getByRole('button',{name:'Code ausführen',exact:true}).click();const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');
  await preview.locator('#a').fill('9');await preview.locator('#b').fill('4');await preview.locator('#op').selectOption('-');await preview.getByRole('button').click();await expect(preview.locator('#ergebnis')).toHaveText('5');
  await page.getByRole('tab',{name:'rechner.js',exact:true}).click();await page.getByLabel('JavaScript-Code').fill(lesson.solutionFiles['rechner.js'].replace('a - b','a + b'));
  await page.getByRole('button',{name:'Code ausführen',exact:true}).click();await preview.locator('#a').fill('9');await preview.locator('#b').fill('4');await preview.locator('#op').selectOption('-');await preview.getByRole('button').click();await expect(preview.locator('#ergebnis')).toHaveText('13');
  const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Referenzprojekt als ZIP'}).click();const download=await downloading;expect(download.suggestedFilename()).toBe('js-browser-modules.zip');
  const {unzipSync,strFromU8}=await import('fflate');const files=unzipSync(await readFile(await download.path()));expect(Object.keys(files).sort()).toEqual(['README.md','index.html','main.js','rechner.js','start.js','style.css']);expect(strFromU8(files['README.md'])).toContain('Referenzlösung');
  await context.route('http://localhost:5173/export-test/**',route=>{const path=new URL(route.request().url()).pathname.replace('/export-test/','')||'index.html';const bytes=files[path];return route.fulfill({status:bytes?200:404,body:bytes?Buffer.from(bytes):'Missing',contentType:path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':'text/html'});});
  const native=await context.newPage();await native.goto('http://localhost:5173/export-test/');await native.locator('#a').fill('9');await native.locator('#b').fill('4');await native.locator('#op').selectOption('-');await native.getByRole('button').click();await expect(native.locator('#ergebnis')).toHaveText('5');await native.close();
});

test('browser runner isolates storage, blocks real fetch and stops both setup and event loops',async({page})=>{
  await page.goto('/');
  async function run(code,options={}){return page.evaluate(async({code,options})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code,browser:{html:'<button id="loop">Loop</button><p id="output"></p>',storage:{},fixtures:{}},...options});},{code,options});}
  await page.evaluate(()=>localStorage.setItem('app-private-test','secret'));
  expect((await run('console.log(localStorage.getItem("app-private-test"))')).logs).toEqual(['null']);
  expect((await run('console.log(localStorage.setItem("x", 1),localStorage.removeItem("x"))')).logs).toEqual(['undefined undefined']);
  expect((await run('await fetch("constructor")')).error).toContain('Keine lokale API-Antwort');
  expect((await run('await fetch("https://example.com")')).error).toContain('Keine lokale API-Antwort');
  expect((await run('while(true){}')).error).toContain('Zeitlimit');
  expect((await run('document.querySelector("#loop").addEventListener("click",()=>{while(true){}});',{browserActions:[{selector:'#loop',type:'click'}]})).error).toContain('Zeitlimit');
  expect((await run('document.querySelector("#output").textContent="wieder bereit";')).html).toContain('wieder bereit');
  await page.getByRole('button',{name:'Übungen',exact:true}).click();await expect(page.getByRole('heading',{name:'Vom Verstehen zum Anwenden.'})).toBeVisible();
});

test('browser reference solutions agree with native DOM, events and response objects',async({page})=>{
  await page.goto('/');
  const lessons=jsLessons.filter(lesson=>lesson.browser&&!lesson.browser.clock&&!lesson.solutionFiles);
  const failures=await page.evaluate(async lessons=>{
    const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor,failures=[];
    for(const lesson of lessons)for(const [index,check] of lesson.tests.entries()){
      const environment={...lesson.browser,...check.browser};
      // A fresh document avoids touching React's DOM or sharing event listeners between cases.
      const document=new DOMParser().parseFromString(environment.html,'text/html');
      const store=new Map(Object.entries(environment.storage||{}));
      const storage={getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,String(value)),removeItem:key=>store.delete(key),clear:()=>store.clear()};
      const fetch=async(url,options={})=>{
        const fixture=environment.fixtures[url];if(!fixture||fixture.networkError)throw new TypeError('Netzwerkfehler');
        let body=fixture.body,status=fixture.status??200;
        if(fixture.echoJson){if(options.method!=='POST')status=405;else if(!new Headers(options.headers).get('content-type')?.includes('application/json'))status=400;else body=JSON.parse(options.body);}
        return new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
      };
      try{
        const fn=await new AsyncFunction('document','localStorage','fetch',lesson.solution+'\nreturn '+lesson.functionName)(document,storage,fetch);
        let actual=await fn(structuredClone(check.input));
        for(const action of check.actions){const target=document.querySelector(action.selector);if(action.value!==undefined)target.value=action.value;if(action.checked!==undefined)target.checked=action.checked;const event=action.key?new KeyboardEvent(action.type,{key:action.key,bubbles:true,cancelable:true}):new Event(action.type,{bubbles:true,cancelable:true});target.dispatchEvent(event);await new Promise(resolve=>setTimeout(resolve,10));}
        if(typeof actual==='function')actual=actual();
        if(JSON.stringify(actual)!==JSON.stringify(check.expected))failures.push({id:lesson.id,index,actual,expected:check.expected});
      }catch(error){failures.push({id:lesson.id,index,error:error.message});}
    }
    return failures;
  },lessons);
  expect(failures).toEqual([]);
});

test('practical number array and game tasks expose wrong rounding, shared rows, mutation and boundary errors',async({page})=>{
  test.setTimeout(90000);await page.goto('/');
  const variants=[
    ['js-math-round',code=>code.replace('Math.floor(daten)','Math.trunc(daten)'),'3 / 5'],
    ['js-math-dice',code=>code.replace('Math.floor','Math.round'),'2 / 5'],
    ['js-array-flat',code=>code.replace('.flat(1)','.flat(Infinity)'),'4 / 5'],
    ['js-array-splice',code=>code.replace('[...daten.liste]','daten.liste'),'0 / 6'],
    ['js-array-grid',code=>code.replace('Array.from({ length: daten.hoehe }, () => Array.from({ length: daten.breite }, () => 0))','Array(daten.hoehe).fill(Array.from({ length: daten.breite }, () => 0))'),'3 / 5'],
    ['js-game-collision',code=>code.replaceAll(' < ',' <= ').replaceAll(' > ',' >= '),'4 / 6'],
    ['js-shop-checkout',code=>code.replace('warenwert >= daten.gratisAbCent','warenwert > daten.gratisAbCent'),'4 / 6'],
  ];
  for(const [id,mutate,expected] of variants){
    const lesson=jsLessons.find(item=>item.id===id);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByLabel('JavaScript-Code').fill(mutate(lesson.solution));await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${expected} bestanden`);
    await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${lesson.tests.length} / ${lesson.tests.length} bestanden`);
  }
  await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'/tmp/codeklar-checkout-mobile.png',fullPage:true});
});

test('controlled clock supports mobile stopwatch pause resume and cancellation without changing course progress',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');const lesson=await openBrowserLesson(page,'js-time-stopwatch',false,true);await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');
  await preview.getByRole('button',{name:'Start',exact:true}).click();await page.getByRole('button',{name:'Zeit +1000 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('1000');
  await preview.getByRole('button',{name:'Pause',exact:true}).click();await page.getByRole('button',{name:'Zeit +1000 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('1000');
  await preview.getByRole('button',{name:'Start',exact:true}).click();await page.getByRole('button',{name:'Zeit +100 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('1100');await preview.getByRole('button',{name:'Reset',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('0');
  await expect(page.getByText(`0 von ${jsLessons.length} Aufgaben gelöst`)).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'/tmp/codeklar-clock-mobile.png',fullPage:true});
});

test('reaction game rejects early clicks and movement game responds to buttons and arrows',async({page})=>{
  await page.goto('/');let lesson=await openBrowserLesson(page,'js-time-reaction');await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');
  await preview.locator('#stand').waitFor();await preview.locator('#start').evaluate(node=>{node.click();node.ownerDocument.querySelector('#treffer').click();});await expect(preview.locator('#stand')).toHaveText('Fehlstart');await page.getByRole('button',{name:'Zeit +1000 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('Fehlstart');
  await preview.getByRole('button',{name:'Neue Runde',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('Warten');await page.getByRole('button',{name:'Zeit +1000 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('Bereit');await preview.getByRole('button',{name:'Jetzt!',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('500');
  lesson=await openBrowserLesson(page,'js-time-move');await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Code ausführen',exact:true}).click();await preview.getByRole('button',{name:'Rechts',exact:true}).click();await page.getByRole('button',{name:'Zeit +100 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('10');await expect(preview.locator('#figur')).toHaveCSS('transform','matrix(1, 0, 0, 1, 10, 0)');
  await preview.getByRole('button',{name:'Links',exact:true}).press('ArrowLeft');await page.getByRole('button',{name:'Zeit +100 ms',exact:true}).click();await expect(preview.locator('#stand')).toHaveText('0');
});

test('clock bounds callback storms and preserves the existing real timer runner',async({page})=>{
  await page.goto('/');const run=async(code,browser,actions=[])=>page.evaluate(async({code,browser,actions})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code,browser,browserActions:actions});},{code,browser,actions});
  const clock={html:'<p>Uhr</p>',clock:true};expect((await run('setInterval(()=>{},1);',clock,[{type:'advance',ms:2000}])).error).toContain('Zu viele Timer');expect((await run('setTimeout(()=>{while(true){}},10);',clock,[{type:'advance',ms:10}])).error).toContain('Zeitlimit');
  expect((await run('await new Promise(resolve=>setTimeout(resolve,10));console.log("echte Zeit");',{html:'<p>Normal</p>'})).logs).toEqual(['echte Zeit']);
  const result=await run('const order=[];queueMicrotask(()=>order.push("micro"));setTimeout(()=>order.push("timer"),1);console.log("bereit");',clock,[{type:'advance',ms:1}]);expect(result.error).toBeUndefined();expect(result.clock).toBe(1);
});

test('downloaded stopwatch project uses real browser time and pauses its display',async({page,context})=>{
  await page.goto('/');await openBrowserLesson(page,'js-time-stopwatch');const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Referenzprojekt als ZIP'}).click();const download=await downloading;expect(download.suggestedFilename()).toBe('js-time-stopwatch.zip');
  const {unzipSync}=await import('fflate');const files=unzipSync(await readFile(await download.path()));await context.route('http://localhost:5173/time-export/**',route=>{const path=new URL(route.request().url()).pathname.replace('/time-export/','')||'index.html';return route.fulfill({status:files[path]?200:404,body:files[path]?Buffer.from(files[path]):'Missing',contentType:path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':'text/html'});});
  const native=await context.newPage();await native.goto('http://localhost:5173/time-export/');await native.getByRole('button',{name:'Start',exact:true}).click();await expect.poll(async()=>Number(await native.locator('#stand').textContent())).toBeGreaterThan(0);await native.getByRole('button',{name:'Pause',exact:true}).click();const paused=await native.locator('#stand').textContent();await native.evaluate(()=>new Promise(resolve=>setTimeout(resolve,200)));await expect(native.locator('#stand')).toHaveText(paused);await native.getByRole('button',{name:'Reset',exact:true}).click();await expect(native.locator('#stand')).toHaveText('0');await native.close();
});

async function openBuildProject(page, id) {
  const {projects}=await import('../src/projects.js');const project=projects.find(p=>p.id===id);
  await page.getByRole('button',{name:'Übungen',exact:true}).first().click();await page.getByRole('button',{name:'Projektideen für alle Lernbereiche'}).click();
  await page.getByLabel('Projekt suchen').fill(project.title);await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();return project;
}

test('self build hides reference code, downloads a starter and persists honestly labelled checkpoints',async({page})=>{
  await page.setViewportSize({width:390,height:844});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');const project=await openBuildProject(page,'js-file-explorer');
  await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();await expect(page.getByRole('heading',{name:'Vollständiger Code'})).toHaveCount(0);await expect(page.getByText('0 von 5 Etappen selbst geprüft')).toBeVisible();
  await page.getByRole('button',{name:'Hinweis: Text lesen',exact:true}).click();await expect(page.getByText('await file.text() wartet auf den Inhalt.')).toBeVisible();await page.getByRole('checkbox',{name:'Text lesen',exact:true}).check();await expect(page.getByText('1 von 5 Etappen selbst geprüft')).toBeVisible();
  const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Startgerüst als ZIP herunterladen'}).click();const archive=await downloading;expect(archive.suggestedFilename()).toBe('codeklar-js-file-explorer-start.zip');const {unzipSync,strFromU8}=await import('fflate');const files=unzipSync(await readFile(await archive.path()));expect(strFromU8(files['index.html'])).toContain('TODO');expect(strFromU8(files['README.md'])).toContain('Selbst bauen');expect(strFromU8(files['index.html'])).not.toBe(project.files['index.html']);
  await page.reload();await openBuildProject(page,'js-file-explorer');await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();await expect(page.getByRole('checkbox',{name:'Text lesen',exact:true})).toBeChecked();await expect(page.getByText('1 von 5 Etappen selbst geprüft')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'/tmp/codeklar-self-build-mobile.png',fullPage:true});await page.getByRole('button',{name:'Referenz ansehen',exact:true}).click();await expect(page.getByLabel('Quellcode index.html')).toContainText('await file.text()');expect(errors).toEqual([]);
});

test('file explorer reads UTF-8 safely, rejects oversized files and downloads actual JSON',async({page})=>{
  await page.goto('/');await openBuildProject(page,'js-file-explorer');const demo=page.frameLocator('iframe[title="Datei-Explorer ausprobieren"]');const text='Grüße 🎮\n<img src=x onerror=alert(1)>';
  await demo.locator('#datei').setInputFiles({name:'notizen.txt',mimeType:'text/plain',buffer:Buffer.from(text)});await expect(demo.locator('#inhalt')).toHaveText(text);await expect(demo.locator('#inhalt img')).toHaveCount(0);
  const downloading=page.waitForEvent('download');await demo.getByRole('button',{name:'Als JSON herunterladen'}).click();const archive=await downloading;expect(JSON.parse(await readFile(await archive.path(),'utf8'))).toEqual({text});
  await demo.locator('#datei').setInputFiles({name:'gross.txt',mimeType:'text/plain',buffer:Buffer.alloc(1_000_001)});await expect(demo.locator('#status')).toContainText('Datei zu groß');await expect(demo.locator('#export')).toBeDisabled();
});

test('image studio decodes scales filters and exports real PNG pixels',async({page})=>{
  await page.goto('/');await openBuildProject(page,'js-image-studio');const demo=page.frameLocator('iframe[title="Bildwerkstatt ausprobieren"]');const data=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=800;c.height=400;const ctx=c.getContext('2d');ctx.fillStyle='#ff0000';ctx.fillRect(0,0,800,400);return c.toDataURL().split(',')[1];});
  await demo.locator('#bild').setInputFiles({name:'rot.png',mimeType:'image/png',buffer:Buffer.from(data,'base64')});await expect(demo.locator('#status')).toHaveText('320 × 160 Pixel');await expect(demo.locator('#canvas')).toHaveAttribute('width','320');await expect(demo.locator('#canvas')).toHaveAttribute('height','160');
  await demo.getByRole('button',{name:'Graustufen umschalten'}).click();const pixel=await demo.locator('#canvas').evaluate(c=>[...c.getContext('2d').getImageData(10,10,1,1).data]);expect(pixel[0]).toBe(pixel[1]);expect(pixel[1]).toBe(pixel[2]);expect(pixel[3]).toBe(255);
  const downloading=page.waitForEvent('download');await demo.getByRole('button',{name:'PNG herunterladen'}).click();const archive=await downloading;const png=await readFile(await archive.path());expect(png.readUInt32BE(16)).toBe(320);expect(png.readUInt32BE(20)).toBe(160);
  await demo.locator('#bild').setInputFiles({name:'kaputt.png',mimeType:'image/png',buffer:Buffer.from('kein Bild')});await expect(demo.locator('#status')).toContainText('Bild konnte nicht geöffnet werden');await expect(demo.locator('#speichern')).toBeDisabled();
});

test('canvas paint maps pointer coordinates on mobile and clears exported pixels',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');await openBuildProject(page,'js-canvas-paint');const demo=page.frameLocator('iframe[title="Canvas-Malstudio ausprobieren"]'),canvas=demo.locator('#canvas');
  await page.locator('iframe[title="Canvas-Malstudio ausprobieren"]').scrollIntoViewIfNeeded();await canvas.evaluate(c=>c.scrollIntoView({behavior:'instant',block:'center'}));const rect=await canvas.boundingBox();await page.mouse.move(rect.x+rect.width*.2,rect.y+rect.height*.5);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.8,rect.y+rect.height*.5,{steps:8});await page.mouse.up();await expect(demo.locator('#status')).toHaveText('Strich gezeichnet.');const colored=await canvas.evaluate(c=>[...c.getContext('2d').getImageData(240,120,1,1).data]);expect(colored.slice(0,3)).not.toEqual([16,22,37]);
  await demo.getByRole('button',{name:'Leeren',exact:true}).click();expect(await canvas.evaluate(c=>[...c.getContext('2d').getImageData(240,120,1,1).data])).toEqual([16,22,37,255]);const downloading=page.waitForEvent('download');await demo.getByRole('button',{name:'PNG herunterladen'}).click();const archive=await downloading;expect((await readFile(await archive.path())).readUInt32BE(16)).toBe(480);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('pong supports keyboard and touch button input and pauses a real frame loop',async({page})=>{
  await page.goto('/');await openBuildProject(page,'js-canvas-pong');const demo=page.frameLocator('iframe[title="Pong mit Touchsteuerung ausprobieren"]');await demo.getByRole('button',{name:'Start / Neustart'}).click();await expect(demo.locator('#status')).toContainText('laeuft');await demo.locator('#rechts').focus();await demo.locator('#rechts').press('ArrowRight');
  await demo.getByRole('button',{name:'Pause / Weiter'}).click();await expect(demo.locator('#status')).toContainText('pausiert');const before=await demo.locator('#canvas').evaluate(c=>c.toDataURL());await page.evaluate(()=>new Promise(r=>setTimeout(r,120)));expect(await demo.locator('#canvas').evaluate(c=>c.toDataURL())).toBe(before);
  await demo.getByRole('button',{name:'Start / Neustart'}).click();await expect(demo.locator('#status')).toContainText('laeuft · Punkte: 0');const button=demo.locator('#links');await button.scrollIntoViewIfNeeded();const rect=await button.boundingBox();await page.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2);await page.mouse.down();await page.evaluate(()=>new Promise(r=>setTimeout(r,120)));await page.mouse.up();await demo.getByRole('button',{name:'Pause / Weiter'}).click();await expect(demo.locator('#status')).toContainText('pausiert');
});

test('downloaded projects execute their real Node integration tests',async({page})=>{
  test.setTimeout(60000);const {mkdtemp,writeFile,rm}=await import('node:fs/promises'),{tmpdir}=await import('node:os'),{join}=await import('node:path'),{execFile}=await import('node:child_process'),{promisify}=await import('node:util'),{unzipSync,strFromU8}=await import('fflate');const run=promisify(execFile);
  await page.goto('/');for(const [id,filename] of [['js-node-notes','cli.test.mjs'],['js-node-sqlite','api.test.mjs'],['js-tested-budget','budget.test.js'],['js-url-catalog','katalog.test.js'],['js-request-lab','server.test.mjs'],['js-byte-workshop','bytes.test.js']]){const project=await openBuildProject(page,id);const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Projekt als ZIP herunterladen'}).click();const archive=await downloading,files=unzipSync(await readFile(await archive.path())),dir=await mkdtemp(join(tmpdir(),'codeklar-download-'));
    try{for(const [name,bytes] of Object.entries(files)){await writeFile(join(dir,name),bytes);}for(const [name,content] of Object.entries(project.files))expect(strFromU8(files[name])).toBe(content);const result=await run(process.execPath,['--test',filename],{cwd:dir,timeout:15000});expect(result.stdout).toMatch(/pass [1-9]/);expect(result.stdout).toContain('fail 0');}finally{await rm(dir,{recursive:true,force:true});}
  }
});

test('SQLite reference frontend creates toggles and deletes records through a real local server',async({page})=>{
  const {buildProjects}=await import('../src/buildProjects.js'),project=buildProjects.find(p=>p.id==='js-node-sqlite');const {mkdtemp,writeFile,rm}=await import('node:fs/promises'),{tmpdir}=await import('node:os'),{join}=await import('node:path'),{pathToFileURL}=await import('node:url'),{once}=await import('node:events');const dir=await mkdtemp(join(tmpdir(),'codeklar-api-ui-'));let app;
  try{for(const [name,content] of Object.entries(project.files))await writeFile(join(dir,name),content);const {createApp}=await import(pathToFileURL(join(dir,'api.mjs')).href);app=createApp(':memory:');app.server.listen(0,'127.0.0.1');await once(app.server,'listening');await page.goto(`http://127.0.0.1:${app.server.address().port}`);await expect(page).toHaveTitle('Aufgaben mit SQLite');await page.locator('#titel').fill('<b>SQL lernen</b>');await page.getByRole('button',{name:'Speichern',exact:true}).click();await expect(page.locator('#liste')).toContainText('<b>SQL lernen</b>');await expect(page.locator('#liste b')).toHaveCount(0);await page.getByRole('button',{name:'Erledigen',exact:true}).click();await expect(page.locator('#liste')).toContainText('✓');await page.getByRole('checkbox',{name:'Nur offene Aufgaben'}).check();await expect(page.locator('#liste li')).toHaveCount(0);await page.getByRole('checkbox',{name:'Nur offene Aufgaben'}).uncheck();await expect(page.locator('#liste li')).toHaveCount(1);await page.getByRole('button',{name:'Löschen',exact:true}).click();await expect(page.locator('#liste li')).toHaveCount(0);}finally{if(app){await new Promise(resolve=>app.server.close(resolve));app.db.close();}await rm(dir,{recursive:true,force:true});}
});

test('modular budget frontend parses cents persists entries and reports invalid amounts',async({page,context})=>{
  const {buildProjects}=await import('../src/buildProjects.js'),project=buildProjects.find(p=>p.id==='js-tested-budget');await context.route('http://localhost:5173/budget-export/**',route=>{const path=new URL(route.request().url()).pathname.replace('/budget-export/','')||'index.html',content=project.files[path];return route.fulfill({status:content?200:404,body:content||'Missing',contentType:path.endsWith('.js')?'text/javascript':'text/html'});});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/budget-export/');await expect(page).toHaveTitle('Haushaltsbuch mit Tests');await page.locator('#titel').fill('Einnahme');await page.locator('#betrag').fill('12,50');await page.getByRole('button',{name:'Eintrag speichern'}).click();await expect(page.locator('#saldo')).toHaveText('12.50 €');await page.locator('#titel').fill('Ausgabe');await page.locator('#betrag').fill('-2.05');await page.getByRole('button',{name:'Eintrag speichern'}).click();await expect(page.locator('#saldo')).toHaveText('10.45 €');await page.reload();await expect(page.locator('#liste li')).toHaveCount(2);await expect(page.locator('#saldo')).toHaveText('10.45 €');await page.locator('#titel').fill('Ungültig');await page.locator('#betrag').fill('12abc');await page.getByRole('button',{name:'Eintrag speichern'}).click();await expect(page.locator('#status')).toContainText('höchstens zwei Nachkommastellen');await expect(page.locator('#liste li')).toHaveCount(2);await page.getByRole('button',{name:'Löschen',exact:true}).first().click();await expect(page.locator('#saldo')).toHaveText('-2.05 €');expect(errors).toEqual([]);
});

test('web API tasks expose query loss zero cache values generator exhaustion and unsafe retries',async({page})=>{
  await page.goto('/');const {webLessons}=await import('../src/webLessons.js');const mutations=[['js-web-query-read',code=>code.replace('p.getAll("tag")','[p.get("tag")]')],['js-web-memo-cache',code=>code.replace('!cache.has(n)','!cache.get(n)')],['js-web-generator-range',code=>code.replace('n<=daten.ende','n<daten.ende')],['js-web-retry-status',code=>code.replace('daten.name!=="AbortError" && ','')]];
  for(const [id,mutate] of mutations){const lesson=webLessons.find(l=>l.id===id);const result=await page.evaluate(async({lesson,code})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code,functionName:lesson.functionName,tests:lesson.tests,preserveInput:true});},{lesson,code:mutate(lesson.solution)});expect(result.error).toBeUndefined();expect(result.results.some(r=>!r.passed)).toBe(true);}
});

test('catalog demo supports mobile search sorting pagination and encoded query state',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');await openBuildProject(page,'js-url-catalog');const demo=page.frameLocator('iframe[title="URL-Katalog ausprobieren"]');await expect(demo.locator('#status')).toHaveText('6 Treffer · Seite 1 von 2');await demo.locator('#sort').selectOption('preis');await expect(demo.locator('#liste li').first()).toContainText('JavaScript-Kurs');await demo.getByRole('button',{name:'Weiter',exact:true}).click();await expect(demo.locator('#status')).toHaveText('6 Treffer · Seite 2 von 2');await demo.locator('#suche').fill('Kurs');await expect(demo.locator('#status')).toHaveText('3 Treffer · Seite 1 von 1');await demo.locator('#suche').fill('C++ & Spiele');await expect(demo.locator('#status')).toHaveText('0 Treffer · Seite 1 von 1');await expect(demo.locator('#link')).toContainText('q=C%2B%2B+%26+Spiele');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('catalog ZIP runs real modules and restores search state from the browser URL',async({page,context})=>{
  await page.goto('/');await openBuildProject(page,'js-url-catalog');const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Projekt als ZIP herunterladen'}).click();const archive=await downloading;const {unzipSync}=await import('fflate'),files=unzipSync(await readFile(await archive.path()));await context.route('http://localhost:5173/url-export/**',route=>{const path=new URL(route.request().url()).pathname.replace('/url-export/','')||'index.html';return route.fulfill({status:files[path]?200:404,body:files[path]?Buffer.from(files[path]):'Missing',contentType:path.endsWith('.js')?'text/javascript':'text/html'});});const native=await context.newPage(),errors=[];native.on('pageerror',error=>errors.push(error.message));await native.goto('http://localhost:5173/url-export/?q=Kurs&sort=preis&page=2');await expect(native.locator('#suche')).toHaveValue('Kurs');await expect(native.locator('#sort')).toHaveValue('preis');await expect(native.locator('#status')).toHaveText('3 Treffer · Seite 1 von 1');expect(new URL(native.url()).searchParams.has('page')).toBe(false);await native.locator('#suche').fill('C++ & Spiele');await expect(native.locator('#status')).toHaveText('0 Treffer · Seite 1 von 1');expect(new URL(native.url()).searchParams.get('q')).toBe('C++ & Spiele');await native.reload();await expect(native.locator('#suche')).toHaveValue('C++ & Spiele');await expect(native.locator('#status')).toHaveText('0 Treffer · Seite 1 von 1');expect(errors).toEqual([]);await native.close();
});

test('request demo aborts slow work handles HTTP errors and ignores stale requests',async({page})=>{
  await page.goto('/');await openBuildProject(page,'js-request-lab');const demo=page.frameLocator('iframe[title="Anfrage-Labor ausprobieren"]');await demo.locator('#delay').selectOption('1500');await demo.getByRole('button',{name:'Anfrage starten'}).click();await expect(demo.locator('#status')).toHaveText('Lädt …');await demo.getByRole('button',{name:'Abbrechen',exact:true}).click();await expect(demo.locator('#status')).toHaveText('Abgebrochen');await expect(demo.locator('#abbrechen')).toBeDisabled();await demo.getByRole('button',{name:'Anfrage starten'}).click();await demo.locator('#delay').selectOption('100');await demo.getByRole('button',{name:'Anfrage starten'}).click();await expect(demo.locator('#status')).toHaveText('Erfolg');await page.evaluate(()=>new Promise(resolve=>setTimeout(resolve,1600)));await expect(demo.locator('#status')).toHaveText('Erfolg');await demo.locator('#typ').selectOption('fehler');await demo.getByRole('button',{name:'Anfrage starten'}).click();await expect(demo.locator('#status')).toHaveText('HTTP 503');
});

test('request reference frontend cancels a real local HTTP request',async({page})=>{
  const {webProjects}=await import('../src/webProjects.js'),project=webProjects.find(p=>p.id==='js-request-lab'),{mkdtemp,writeFile,rm}=await import('node:fs/promises'),{tmpdir}=await import('node:os'),{join}=await import('node:path'),{pathToFileURL}=await import('node:url'),{once}=await import('node:events');const dir=await mkdtemp(join(tmpdir(),'codeklar-request-ui-'));let server;
  try{for(const [name,content] of Object.entries(project.files))await writeFile(join(dir,name),content);const {createApp}=await import(pathToFileURL(join(dir,'server.mjs')).href);server=createApp();server.listen(0,'127.0.0.1');await once(server,'listening');await page.goto(`http://127.0.0.1:${server.address().port}`);await page.locator('#delay').selectOption('1500');await page.getByRole('button',{name:'Anfrage starten'}).click();await expect(page.locator('#status')).toHaveText('Lädt …');await page.getByRole('button',{name:'Abbrechen',exact:true}).click();await expect(page.locator('#status')).toHaveText('Abgebrochen');await page.locator('#delay').selectOption('100');await page.getByRole('button',{name:'Anfrage starten'}).click();await expect(page.locator('#status')).toHaveText('Erfolg');await expect(page.locator('#ergebnis')).toContainText('Echte lokale API-Antwort');await page.locator('#typ').selectOption('fehler');await page.getByRole('button',{name:'Anfrage starten'}).click();await expect(page.locator('#status')).toHaveText('HTTP 503');}finally{if(server){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}await rm(dir,{recursive:true,force:true});}
});

test('browser preview waits for its own bridge readiness and ignores stale readiness tokens',async({page})=>{
  await page.addInitScript(()=>{window.addEventListener('message',event=>{if(event.data?.kind==='codeklar-preview-ready'&&!window.allowPreviewReady){window.previewReady=event.data;window.previewSource=event.source;event.stopImmediatePropagation();}},true);});await page.goto('/');const lesson=await openBrowserLesson(page,'js-browser-modules');for(const [name,code] of Object.entries(lesson.solutionFiles)){await page.getByRole('tab',{name,exact:true}).click();await page.getByLabel('JavaScript-Code').fill(code);}await page.getByRole('button',{name:'Code ausführen',exact:true}).click();const iframe=page.locator('iframe[title="Interaktive Browser-Vorschau"]');await page.waitForFunction(()=>!!window.previewReady);await expect(iframe).toHaveCSS('pointer-events','none');await expect(page.getByText('Vorschau wird geladen …',{exact:true})).toBeVisible();await page.evaluate(()=>{window.allowPreviewReady=true;window.dispatchEvent(new MessageEvent('message',{source:window.previewSource,data:{kind:'codeklar-preview-ready',token:'alte-vorschau'}}));});await expect(iframe).toHaveCSS('pointer-events','none');await page.evaluate(()=>window.dispatchEvent(new MessageEvent('message',{source:window.previewSource,data:window.previewReady})));await expect(iframe).toHaveCSS('pointer-events','auto');const preview=page.frameLocator('iframe[title="Interaktive Browser-Vorschau"]');await preview.locator('#a').fill('2');await preview.locator('#b').fill('3');await preview.getByRole('button').click();await expect(preview.locator('#ergebnis')).toHaveText('5');
});

test('computer fundamentals quizzes reject wrong answers and preserve completed progress', async ({ page }) => {
  test.setTimeout(90000);
  await page.goto('/');
  await page.getByRole('button', { name: 'Computer verstehen', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Verstehe, wie dein Computer arbeitet.' })).toBeVisible();
  await page.getByRole('tab', { name: 'Aufgabe', exact: true }).click();
  await page.getByRole('radio', { name: computerLessons[0].options[0], exact: true }).click();
  await page.getByRole('button', { name: 'Antwort prüfen' }).click();
  await expect(page.getByText('Noch nicht ganz.', { exact: true })).toBeVisible();
  await expect(page.getByText(`0 von ${computerLessons.length} Aufgaben gelöst`, { exact: true })).toBeVisible();
  for (const lesson of computerLessons) {
    await page.getByRole('button', { name: 'Übungen', exact: true }).click();
    await page.getByLabel('Lernbereich filtern').selectOption('computer');
    await page.getByRole('row').filter({ hasText: lesson.title }).click();
    await expect(page.getByRole('heading', { name: lesson.title, exact: true })).toBeVisible();
    await page.getByRole('radio', { name: lesson.options[lesson.answer], exact: true }).click();
    await page.getByRole('button', { name: 'Antwort prüfen' }).click();
    await expect(page.getByText('Richtig! Gut verstanden.', { exact: true })).toBeVisible();
  }
  await expect(page.getByText(`${computerLessons.length} von ${computerLessons.length} Aufgaben gelöst`, { exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Computer verstehen', exact: true }).click();
  await expect(page.getByText(`${computerLessons.length} von ${computerLessons.length} Aufgaben gelöst`, { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Nachschlagen', exact: true }).click();
  await page.getByLabel('Zum Beispiel map, === oder Python …').fill('Little Endian');
  await expect(page.getByRole('heading', { name: 'Little Endian und Big Endian', exact: true })).toBeVisible();
});

test('computer lab demonstrates byte interpretation UTF-8 and persistent memory on desktop and mobile', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => { if (['error','warning'].includes(msg.type())) errors.push(msg.text()); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Computer verstehen', exact: true }).click();
  const lab = page.getByRole('region', { name: 'Computer-Labor', exact: true });
  const byte = page.getByLabel('Byte-Auswertung');
  await expect(byte).toContainText('00101010');
  await page.getByRole('button', { name: 'Bit 128', exact: true }).click();
  await expect(byte).toContainText('10101010');
  await expect(byte).toContainText('0xAA');
  await expect(byte).toContainText('-86');
  await page.getByLabel('Vorzeichenloser Wert (0–255)').fill('255');
  await expect(byte).toContainText('11111111');
  await expect(byte).toContainText('0xFF');
  await expect(byte).toContainText('-1');
  await page.getByLabel('Vorzeichenloser Wert (0–255)').fill('0');
  await expect(byte).toContainText('00000000');
  for (const [text, units, points, hex] of [['Aä😀',4,3,'41 C3 A4 F0 9F 98 80'], ['e\u0301',2,2,'65 CC 81'], ['',0,0,'Keine Bytes (leerer Text)']]) {
    await page.getByLabel('Text für UTF-8', { exact: true }).fill(text);
    await expect(page.getByLabel('UTF-8-Hexbytes')).toHaveText(hex);
    await expect(page.getByLabel('Text-Auswertung')).toContainText(`UTF-16-Codeunits ${units}`);
    await expect(page.getByLabel('Text-Auswertung')).toContainText(`Codepoints ${points}`);
  }
  const memory = page.getByLabel('Speichermodell');
  for (const command of ['LOAD aus RAM','ADD 5','STORE ins RAM','SAVE auf SSD','Strom ausschalten']) {
    await page.getByRole('button', { name: command, exact: true }).click();
    if (command === 'ADD 5') { await expect(memory).toContainText('CPU-Register 12'); await expect(memory).toContainText('RAM 7'); }
  }
  await expect(memory).toContainText('CPU-Register leer');
  await expect(memory).toContainText('RAM leer');
  await expect(memory).toContainText('SSD 12');
  await expect(page.getByRole('button', { name: 'Simulation beendet' })).toBeDisabled();
  await page.getByRole('button', { name: 'Modell zurücksetzen' }).click();
  await expect(memory).toContainText('RAM 7');
  await expect(memory).toContainText('SSD leer');
  await page.getByLabel('Text für UTF-8', { exact: true }).fill('Aä😀');
  await lab.scrollIntoViewIfNeeded();
  await page.screenshot({ path: '/tmp/codeklar-computer-desktop.png', animations: 'disabled' });
  await page.setViewportSize({ width: 390, height: 844 });
  await lab.scrollIntoViewIfNeeded();
  for (const button of await page.locator('.bit-toggle').all()) { const box = await button.boundingBox(); expect(box.width).toBeGreaterThanOrEqual(44); expect(box.height).toBeGreaterThanOrEqual(44); }
  await page.getByRole('button', { name: 'Bit 1', exact: true }).click();
  await expect(byte).toContainText('00000001');
  await page.screenshot({ path: '/tmp/codeklar-computer-mobile.png', animations: 'disabled' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');
  expect(await page.locator('vite-error-overlay').count()).toBe(0);
  expect(errors).toEqual([]);
});

test('new system JavaScript references pass every case and reject constants in the isolated worker', async ({page})=>{
  test.setTimeout(90000);
  const {systemLessons}=await import('../src/systemLessons.js');
  await page.goto('/');
  for(const lesson of systemLessons){
    for(const correct of [false,true]){
      const result=await page.evaluate(async({lesson,correct})=>{
        const {runJavaScript}=await import('/src/runner.js');
        return runJavaScript({code:correct?lesson.solution:`function ${lesson.functionName}(){return {incorrect:true};}`,functionName:lesson.functionName,tests:lesson.tests,preserveInput:true});
      },{lesson,correct});
      expect(result.error,lesson.id).toBeUndefined();
      expect(result.results.every(r=>r.passed===correct),lesson.id).toBe(true);
    }
  }
  // Also prove the new tasks remain reachable and grade correctly through the UI.
  const lesson=systemLessons.find(l=>l.id==='js-system-views');
  await page.getByRole('button',{name:'Übungen',exact:true}).click();
  await page.getByRole('row').filter({hasText:lesson.title}).click();
  await page.getByLabel('JavaScript-Code').fill(lesson.solution);
  await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();
  await expect(page.getByLabel('Code-Ausgabe')).toContainText('3 / 3 bestanden');
});

test('system challenges detect shared copies lost precision partial masks and changed microtask order',async({page})=>{
  const {systemLessons}=await import('../src/systemLessons.js'); await page.goto('/');
  const mutants=[
    ['mask-has',code=>code.replace('(daten.flags & daten.maske) === daten.maske','Boolean(daten.flags & daten.maske)')],
    ['views',code=>code.replace('bytes.slice(1)','bytes.subarray(1)')],
    ['bigint',code=>code.replace('(BigInt(daten[0])+BigInt(daten[1])).toString()','String(Number(daten[0])+Number(daten[1]))')],
    ['deep-copy',code=>code.replace('structuredClone(daten)','({...daten})')],
    ['microtasks',code=>code.replace('queueMicrotask(()=>logs.push(daten))','logs.push(daten)')],
    ['bounded-cache',code=>code.replace('cache.delete(key);','')],
    ['cpu-step',code=>code.replace('register===0','register!==0')],
  ];
  for(const [id,mutate] of mutants){const lesson=systemLessons.find(l=>l.id==='js-system-'+id);const code=mutate(lesson.solution);expect(code).not.toBe(lesson.solution);
    const result=await page.evaluate(async({lesson,code})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code,functionName:lesson.functionName,tests:lesson.tests,preserveInput:true});},{lesson,code});
    expect(result.error,lesson.id).toBeUndefined();expect(result.results.some(r=>!r.passed),lesson.id).toBe(true);
  }
});

test('learning CPU validates instructions handles jumps and bounds infinite loops without mutating state',async()=>{
  const {parseCpuProgram,initialCpuState,stepCpu,addFourBits}=await import('../src/computerModels.js');
  for(let a=0;a<16;a++)for(let b=0;b<16;b++){const result=addFourBits(a,b);expect(result.value).toBe((a+b)%16);expect(result.carry).toBe(a+b>=16?1:0);}
  const run=text=>{const program=parseCpuProgram(text);let state=initialCpuState();for(let i=0;i<129&&!state.halted&&!state.error;i++){const before=structuredClone(state);const next=stepCpu(program,state);expect(state).toEqual(before);state=next;}return state;};
  expect(run('SET 7\nADD 5\nSTORE 0\nLOAD 0\nHALT')).toMatchObject({register:12,halted:true,steps:5});
  expect(run('SET 255\nADD 1\nHALT')).toMatchObject({register:0,halted:true});
  const loop=run('SET 3\nADD 255\nJZ 4\nJMP 1\nHALT');expect(loop).toMatchObject({register:0,halted:true,steps:10});
  expect(run('JMP 0').error).toContain('Schrittlimit');
  expect(run('SET 7').error).toContain('Kein Befehl');
  for(const source of ['','STORE 16','SET 256','HALT 7','JMP 4','ADD -1','toString 0','constructor 0','SET 1 2','SET 2.5',Array(65).fill('HALT').join('\n')])expect(()=>parseCpuProgram(source),source).toThrow();
  expect(parseCpuProgram('# Hallo\nset 7 # Kommentar\nhalt')[0]).toMatchObject({op:'SET',bytes:[1,7]});
});

test('system labs show truth tables carry chains editable CPU references and HTTP states on mobile',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});
  await page.goto('/');await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Verstehe, wie dein Computer arbeitet.'})).toBeVisible();
  const lab=page.getByRole('region',{name:'System-Labor',exact:true});
  await page.getByLabel('Logikgatter', {exact:true}).selectOption('XOR');
  await expect(lab.getByText('Ausgang 1',{exact:true})).toBeVisible();
  await lab.getByRole('button',{name:'Eingang B: 0',exact:true}).click();await expect(lab.getByText('Ausgang 0',{exact:true})).toBeVisible();
  await page.getByLabel('Logikgatter',{exact:true}).selectOption('NOT');await expect(lab.getByRole('button',{name:'Eingang B: 1',exact:true})).toBeDisabled();await expect(lab.getByRole('table').first().locator('tbody tr')).toHaveCount(2);
  await expect(page.getByRole('region',{name:'Addier-Labor'})).toContainText('10000 (16)');
  await page.getByLabel('Zahl A (0–15)').fill('3');await page.getByLabel('Zahl B (0–15)').fill('2');await expect(page.getByRole('region',{name:'Addier-Labor'})).toContainText('00101 (5)');
  await lab.getByRole('tab',{name:'Lern-CPU',exact:true}).click();
  await page.getByRole('button',{name:'CPU-Schritt',exact:true}).click();await expect(page.getByLabel('CPU-Zustand')).toContainText('Register 7');
  await page.getByRole('button',{name:'CPU bis HALT ausführen'}).click();await expect(page.getByLabel('CPU-Zustand')).toContainText('HALT');await expect(page.getByLabel('CPU-RAM').locator('span').first()).toContainText('12');
  await page.getByLabel('CPU-Beispiel').selectOption('loop');await page.getByRole('button',{name:'CPU bis HALT ausführen'}).click();await expect(page.getByLabel('CPU-Zustand')).toContainText('Register 0');await expect(page.getByLabel('CPU-Zustand')).toContainText('HALT');
  await page.getByLabel('CPU-Programm',{exact:true}).fill('JMP 0');await page.getByRole('button',{name:'CPU bis HALT ausführen'}).click();await expect(lab.getByRole('status')).toContainText('Schrittlimit');
  await page.getByLabel('CPU-Programm',{exact:true}).fill('STORE 16');await page.getByRole('button',{name:'CPU-Schritt',exact:true}).click();await expect(lab.getByRole('status')).toContainText('0 bis 15');
  await page.getByLabel('CPU-Programm',{exact:true}).fill('SET 20\nADD 22\nSTORE 5\nHALT');await page.getByRole('button',{name:'CPU bis HALT ausführen'}).click();await expect(page.getByLabel('CPU-RAM').locator('span').nth(5)).toContainText('42');
  await lab.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-systems-desktop.png',animations:'disabled'});
  await page.setViewportSize({width:390,height:844});await lab.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-systems-mobile.png',animations:'disabled'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await lab.getByRole('tab',{name:'Referenzen',exact:true}).click();
  for(const mode of ['alias','shallow','deep']){await page.getByLabel('Kopierstrategie').selectOption(mode);await page.getByRole('button',{name:'b.profil.punkte erhöhen'}).click();await expect(page.getByLabel('Referenz-Auswertung')).toContainText(`a.profil.punkte ${mode==='deep'?1:2}`);await expect(page.getByLabel('Referenz-Auswertung')).toContainText('b.profil.punkte 2');}
  await lab.getByRole('tab',{name:'Referenzen',exact:true}).press('ArrowLeft');await expect(lab.getByRole('tab',{name:'Lern-CPU',exact:true})).toBeFocused();await expect(page.getByLabel('CPU-RAM').locator('span').nth(5)).toContainText('42');
  await lab.getByRole('tab',{name:'Lern-CPU',exact:true}).press('End');await expect(lab.getByRole('tab',{name:'Netzwerk',exact:true})).toBeFocused();await page.getByLabel('Serverantwort').selectOption('404');for(let i=0;i<6;i++)await page.getByRole('button',{name:'Netzwerk-Schritt',exact:true}).click();await expect(page.getByLabel('Simulierte HTTP-Antwort')).toContainText('404 Not Found');await expect(page.getByRole('button',{name:'Netzwerk-Schritt',exact:true})).toBeDisabled();
  await page.getByLabel('Serverantwort').selectOption('200');for(let i=0;i<5;i++)await page.getByRole('button',{name:'Netzwerk-Schritt',exact:true}).click();await expect(page.getByLabel('Simulierte HTTP-Antwort')).toContainText('200 OK');
  await expect(page.getByText(`0 von ${computerLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();expect(errors).toEqual([]);await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);
});

test('flow references pass all native stream transfer and parser cases and reject wrong answers',async({page})=>{
  test.setTimeout(90000);const {flowLessons}=await import('../src/flowLessons.js');await page.goto('/');
  for(const lesson of flowLessons)for(const correct of [false,true]){
    const result=await page.evaluate(async({lesson,correct})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code:correct?lesson.solution:`function ${lesson.functionName}(){return {incorrect:true};}`,functionName:lesson.functionName,tests:lesson.tests,preserveInput:true});},{lesson,correct});
    expect(result.error,lesson.id).toBeUndefined();expect(result.results.every(r=>r.passed===correct),lesson.id).toBe(true);
  }
  const mutations=[['readable',s=>s.replace('if(done)break','if(!value)break')],['decoder-flush',s=>s.replace('text+=decoder.decode();','')],['message',s=>s.replace('m.id===daten.aktiv&&','')],['decode-runs',s=>s.replace('if(total>64)return null;','')]];
  for(const [id,mutate] of mutations){const lesson=flowLessons.find(l=>l.id==='js-flow-'+id),code=mutate(lesson.solution);expect(code).not.toBe(lesson.solution);const result=await page.evaluate(async({lesson,code})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code,functionName:lesson.functionName,tests:lesson.tests,preserveInput:true});},{lesson,code});expect(result.error,lesson.id).toBeUndefined();expect(result.results.some(r=>!r.passed),lesson.id).toBe(true);}
  const lesson=flowLessons.find(l=>l.id==='js-flow-decoder-stream');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByLabel('JavaScript-Code').fill(lesson.solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('4 / 4 bestanden');
});

test('cache and scheduling models preserve state enforce capacity and finish all work',async()=>{
  const {initialCache,accessCache,initialSchedule,stepSchedule}=await import('../src/processingModels.js');
  let cache=initialCache(2);for(const key of ['A','B','A','C','A']){const before=structuredClone(cache);const next=accessCache(cache,key);expect(cache).toEqual(before);expect(next.keys.length).toBeLessThanOrEqual(2);cache=next;}
  expect(cache).toMatchObject({keys:['C','A'],hits:2,misses:3});expect(cache.history[3].evicted).toBe('B');
  expect(()=>accessCache(cache,'')).toThrow();expect(()=>accessCache(cache,'x'.repeat(13))).toThrow();
  for(let i=0;i<20;i++)cache=accessCache(cache,'A');expect(cache.history).toHaveLength(12);
  for(const quantum of [1,2,3]){let state=initialSchedule(quantum);for(let i=0;i<6&&state.queue.length;i++){const before=structuredClone(state);const next=stepSchedule(state);expect(state).toEqual(before);state=next;}expect(state.remaining).toEqual([0,0,0]);expect(state.queue).toEqual([]);expect(state.trace).toHaveLength(6);for(const [task,count] of [[0,3],[1,1],[2,2]])expect(state.trace.filter(t=>t===task)).toHaveLength(count);if(quantum===1)expect(state.trace).toEqual([0,1,2,0,2,0]);if(quantum===3)expect(state.trace).toEqual([0,0,0,1,2,2]);}
});

test('cache and scheduler labs remain readable and interactive on mobile and desktop',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});await page.goto('/');await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
  const lab=page.getByRole('region',{name:'Cache und Zeitplanung',exact:true});await page.getByRole('button',{name:'Beispielfolge laden',exact:true}).click();await expect(page.getByLabel('Cache-Auswertung')).toContainText('Treffer 2');await expect(page.getByLabel('Cache-Auswertung')).toContainText('Fehlschläge 3');await expect(page.getByLabel('Cache-Auswertung')).toContainText('C → A');
  await page.getByLabel('Cacheplätze').selectOption('1');await page.getByLabel('Zugriffsschlüssel').fill('Z');await page.getByRole('button',{name:'Cache-Zugriff',exact:true}).click();await page.getByRole('button',{name:'Cache-Zugriff',exact:true}).click();await expect(page.getByLabel('Cache-Auswertung')).toContainText('Treffer 1');
  await page.getByLabel('Zugriffsschlüssel').fill('');await page.getByRole('button',{name:'Cache-Zugriff',exact:true}).click();await expect(page.getByRole('region',{name:'Cache-Labor'}).getByRole('status')).toContainText('1 bis 12');
  for(let i=0;i<6;i++)await page.getByRole('button',{name:'Scheduler-Schritt',exact:true}).click();await expect(page.getByLabel('CPU-Zeitverlauf').locator('strong')).toHaveText(['A','B','C','A','C','A']);await expect(page.getByRole('button',{name:'Scheduler-Schritt',exact:true})).toBeDisabled();
  await page.getByLabel('Zeitscheibe').selectOption('3');for(let i=0;i<3;i++)await page.getByRole('button',{name:'Scheduler-Schritt',exact:true}).click();await expect(page.getByLabel('CPU-Zeitverlauf').locator('strong')).toHaveText(['A','A','A','B','C','C']);
  await lab.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-processing-desktop.png',animations:'disabled'});await page.setViewportSize({width:390,height:844});await lab.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-processing-mobile.png',animations:'disabled'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('byte workshop demo and downloaded modules inspect files safely export reports and reject large inputs',async({page,context})=>{
  await page.goto('/');await openBuildProject(page,'js-byte-workshop');const demo=page.frameLocator('iframe[title="Byte-Werkstatt ausprobieren"]');await expect(demo.locator('#summary')).toContainText('7 Bytes · 56 Bits');await expect(demo.locator('#hex')).toHaveText('41 C3 A4 F0 9F 98 80');
  await demo.locator('#file').setInputFiles({name:'paar.bin',mimeType:'application/octet-stream',buffer:Buffer.from([1,0])});await expect(demo.locator('#number')).toContainText('256');await demo.locator('#endian').selectOption('little');await expect(demo.locator('#number')).toContainText('= 1');
  const payload='<img src=x onerror="throw new Error(1)">';await demo.locator('#file').setInputFiles({name:'text.txt',mimeType:'text/plain',buffer:Buffer.from(payload)});await expect(demo.locator('#text')).toHaveText(payload);expect(await demo.locator('img').count()).toBe(0);
  const reportDownload=page.waitForEvent('download');await demo.getByRole('button',{name:'Bericht als JSON herunterladen'}).click();const report=JSON.parse(await readFile(await (await reportDownload).path(),'utf8'));expect(report.textPreview).toBe(payload);expect(report.bytes).toBe(Buffer.byteLength(payload));
  await demo.locator('#file').setInputFiles({name:'large.bin',mimeType:'application/octet-stream',buffer:Buffer.alloc(65537)});await expect(demo.locator('#status')).toContainText('maximal 64 KiB');await demo.locator('#example').selectOption('png');await expect(demo.locator('#summary')).toContainText('PNG-Hinweis');await expect(demo.locator('#text')).toContainText('Keine gültige');
  const downloading=page.waitForEvent('download');await page.getByRole('button',{name:'Projekt als ZIP herunterladen'}).click();const {unzipSync}=await import('fflate'),files=unzipSync(await readFile(await (await downloading).path()));await context.route('http://localhost:5173/byte-export/**',route=>{const path=new URL(route.request().url()).pathname.replace('/byte-export/','')||'index.html';return route.fulfill({status:files[path]?200:404,body:files[path]?Buffer.from(files[path]):'Missing',contentType:path.endsWith('.js')?'text/javascript':'text/html'});});const native=await context.newPage(),errors=[];native.on('pageerror',e=>errors.push(e.message));await native.goto('http://localhost:5173/byte-export/');await expect(native.locator('#hex')).toHaveText('41 C3 A4 F0 9F 98 80');await native.locator('#file').setInputFiles({name:'invalid.bin',mimeType:'application/octet-stream',buffer:Buffer.from([195])});await expect(native.locator('#text')).toContainText('Keine gültige');await native.locator('#file').setInputFiles({name:'empty',mimeType:'application/octet-stream',buffer:Buffer.alloc(0)});await expect(native.locator('#summary')).toContainText('0 Bytes · 0 Bits');expect(errors).toEqual([]);await native.close();
  await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();const starterDownload=page.waitForEvent('download');await page.getByRole('button',{name:'Startgerüst als ZIP herunterladen'}).click();expect((await starterDownload).suggestedFilename()).toBe('codeklar-js-byte-workshop-start.zip');
});


test("chapter grouping covers every lesson once and keeps new topics reachable", () => {
  for (const course of new Set(lessons.map((item) => item.course))) {
    const available = lessons.filter((item) => item.course === course);
    const groups = groupTopics(course, available);
    expect(groups.some((item) => item.id === "more")).toBe(false);
    const ids = groups.flatMap((item) => item.lessons.map((lesson) => lesson.id));
    expect(ids.sort()).toEqual(available.map((item) => item.id).sort());
    expect(new Set(ids).size).toBe(ids.length);
    expect(groups.length).toBeLessThanOrEqual(7);
  }
  const future = { id: "future", category: "Neues Thema" };
  expect(groupTopics("js", [future])[0].lessons).toEqual([future]);
});

test("chapters follow exercise links and collapse the full mobile learning path", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const selector = page.getByLabel("Hauptbereich", { exact: true });
  await expect(selector).toHaveValue("data");
  await expect(selector.locator("option")).toHaveCount(7);
  await expect(page.locator(".topic-tabs button")).toHaveCount(9);
  await selector.selectOption("start");
  await expect(page.locator(".topic-tabs button")).toHaveCount(6);
  await expect(page.locator(".topic-tabs").getByRole("button", { name: "DOM", exact: true })).toHaveCount(0);
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  await expect(page.locator(".path-chapter[open]")).toHaveCount(1);
  await page.locator(".path-chapter > summary").filter({ hasText: "Browser & Web" }).click();
  const dom = page.getByRole("region", { name: "DOM-Lektionen", exact: true });
  await dom.locator("button").first().click();
  await expect(selector).toHaveValue("web");
  await expect(page.locator(".topic-tabs button[aria-pressed=true]")).toHaveText("DOM");
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  const target = jsLessons.find((item) => item.category === "Worker & Nachrichten");
  await page.getByRole("row").filter({ hasText: target.title }).click();
  await expect(selector).toHaveValue("async");
  await expect(page.locator(".topic-tabs button[aria-pressed=true]")).toHaveText("Worker & Nachrichten");
  for (const width of [390, 1505]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `/tmp/codeklar-chapters-${width}.png`, animations: "disabled" });
  }
  await page.getByRole("button", { name: "Computer verstehen", exact: true }).click();
  await expect(selector.locator("option")).toHaveCount(5);
  await selector.selectOption("execution");
  await expect(page.locator(".topic-tabs button")).toHaveCount(2);
  await expect(selector).toHaveValue("execution");
});
