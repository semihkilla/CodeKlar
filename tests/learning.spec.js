import { test, expect } from "@playwright/test";
import { computerLessons } from "../src/computerLessons.js";
import { groupTopics } from "../src/topicGroups.js";
import { lessons, courseGroups } from "../src/data.js";
import { jsLessons, javaLessons, pythonLessons } from "../src/data.js";
import { projects } from "../src/projects.js";
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
  await expect(page.getByRole("button", { name: "Nächste Lektion", exact: true })).toBeDisabled();
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

test("mobile topic selection stays visible across category and lesson changes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });await page.goto("/");
  const trigger=page.getByRole('button',{name:'Thema wählen',exact:true}),topics=page.getByRole('dialog',{name:'Thema wählen',exact:true});
  await expect(trigger).toContainText('Arrays');
  await page.getByLabel("Hauptbereich", { exact: true }).selectOption("practice");
  await trigger.click();await topics.getByRole('button',{name:'Projekte',exact:true}).click();
  await expect(page.getByRole("heading", { name: "Miniprojekt: Deinen Budget-Rechner bauen" })).toBeVisible();
  await expect(page.getByLabel("Hauptbereich", { exact: true })).toHaveValue("practice");
  await expect(trigger).toContainText('Projekte');
  await page.getByLabel("Hauptbereich", { exact: true }).selectOption("data");
  await trigger.click();await topics.getByRole('button',{name:'Arrays',exact:true}).click();
  await page.getByRole("button",{name:"Lektion wählen",exact:true}).click();
  await page.getByRole("dialog",{name:"Lektion wählen",exact:true}).getByRole("button",{name:/^\.filter\(\)/}).click();
  await expect(page.getByRole("heading", { name: "Elemente auswählen mit .filter()" })).toBeVisible();
  await expect(trigger).toContainText('Arrays');
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByRole("button",{name:"Lektion wählen",exact:true}).click();
  await page.getByRole("dialog",{name:"Lektion wählen",exact:true}).getByRole("button",{name:/^\.map\(\)/}).click();
  await expect(page.getByRole("tab", { name: "Erklärung", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.reload();await expect(trigger).toContainText('Arrays');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
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
  await expect(page.locator(".course-group")).toHaveCount(courseGroups.length);
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
  for (const selector of [".topic-selector", ".lesson-switcher"]) {
    await expect.poll(() => page.locator(selector).evaluate((row) => {
      const selected = (row.querySelector(".topic-selector-trigger span") || row.querySelector(".lesson-current")).getBoundingClientRect();
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
  await page.getByRole("button", { name: "Übungen", exact: true }).click();
  await page.getByLabel("Lernbereich filtern").selectOption("python");
  await page.getByRole("row").filter({has:page.getByText("Listen erweitern mit .append()",{exact:true})}).click();
  await page.getByRole("tab", { name: "Aufgabe", exact: true }).click();
  await page.getByRole("radio", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByRole("status")).toContainText("Noch nicht ganz.");
  await expect(page.getByText(`0 von ${pythonLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.getByRole("radio", { name: "None", exact: true }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByText(`1 von ${pythonLessons.length} Aufgaben gelöst`)).toBeVisible();
  await page.getByRole("button", { name: "Nachschlagen", exact: true }).click();
  await page.getByRole("textbox").fill("append");
  await expect(page.locator(".reference-entry")).toHaveCount(lessons.filter(item => `${item.name} ${item.title} ${item.description}`.toLowerCase().includes("append")).length);
  await page.getByLabel("Lernbereich filtern").selectOption("python");
  await expect(page.locator(".reference-entry")).toHaveCount(pythonLessons.filter(item => `${item.name} ${item.title} ${item.description}`.toLowerCase().includes("append")).length);
  await expect(page.locator(".reference-entry").filter({has:page.getByRole("heading",{name:"Listen erweitern mit .append()",exact:true})})).toContainText("None");
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
  await expect(page.getByRole('navigation', { name: 'Projektbeispiele' }).getByRole('button')).toHaveCount(projects.length);
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
  test.setTimeout(120000);
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
  await page.getByText('Selbst ausprobieren', { exact: true }).click();
  const lab = page.getByRole('region', { name: 'Computer-Labor', exact: true });
  await page.getByText('Andere Schreibweisen: Hex und negative Zahlen',{exact:true}).click();
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
  await page.getByLabel('Grundlagen-Experiment', { exact: true }).selectOption('text');
  await page.getByText('Warum Zeichen unterschiedlich gezählt werden',{exact:true}).click();
  for (const [text, units, points, hex] of [['Aä😀',4,3,'41 C3 A4 F0 9F 98 80'], ['e\u0301',2,2,'65 CC 81'], ['',0,0,'Keine Bytes (leerer Text)']]) {
    await page.getByLabel('Text für UTF-8', { exact: true }).fill(text);
    await expect(page.getByLabel('UTF-8-Hexbytes')).toHaveText(hex);
    await expect(page.getByLabel('Text-Auswertung')).toContainText(`UTF-16-Codeunits ${units}`);
    await expect(page.getByLabel('Text-Auswertung')).toContainText(`Codepoints ${points}`);
  }
  await page.getByLabel('Grundlagen-Experiment', { exact: true }).selectOption('memory');
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
  await page.getByLabel('Grundlagen-Experiment', { exact: true }).selectOption('text');
  await page.getByLabel('Text für UTF-8', { exact: true }).fill('Aä😀');
  await page.getByLabel('Grundlagen-Experiment', { exact: true }).selectOption('bits');
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
  await page.getByText('Selbst ausprobieren',{exact:true}).click();await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('systems');
  const lab=page.getByRole('region',{name:'System-Labor',exact:true});
  await page.getByLabel('Logikgatter', {exact:true}).selectOption('XOR');
  await expect(lab.getByText('Ausgang 1',{exact:true})).toBeVisible();
  await lab.getByRole('button',{name:'Eingang B: 0',exact:true}).click();await expect(lab.getByText('Ausgang 0',{exact:true})).toBeVisible();
  await page.getByLabel('Logikgatter',{exact:true}).selectOption('NOT');await expect(lab.getByRole('button',{name:'Eingang B: 1',exact:true})).toBeDisabled();await expect(lab.getByRole('table').first().locator('tbody tr')).toHaveCount(2);
  await lab.getByRole('tab',{name:'Addition',exact:true}).click();
  await expect(page.getByRole('region',{name:'Addier-Labor'})).toContainText('10000 (16)');
  await page.getByLabel('Zahl A (0–15)').fill('3');await page.getByLabel('Zahl B (0–15)').fill('2');await expect(page.getByRole('region',{name:'Addier-Labor'})).toContainText('00101 (5)');
  await lab.getByRole('tab',{name:'Lern-CPU',exact:true}).click();
  await page.getByText('Speicherzellen und Maschinenbytes ansehen',{exact:true}).click();
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
  await page.getByText('Selbst ausprobieren',{exact:true}).click();await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('processing');
  const lab=page.getByRole('region',{name:'Cache und Zeitplanung',exact:true});await page.getByRole('button',{name:'Beispielfolge laden',exact:true}).click();await expect(page.getByLabel('Cache-Auswertung')).toContainText('Treffer 2');await expect(page.getByLabel('Cache-Auswertung')).toContainText('Fehlschläge 3');await expect(page.getByLabel('Cache-Auswertung')).toContainText('C → A');
  await page.getByLabel('Cacheplätze').selectOption('1');await page.getByLabel('Zugriffsschlüssel').fill('Z');await page.getByRole('button',{name:'Cache-Zugriff',exact:true}).click();await page.getByRole('button',{name:'Cache-Zugriff',exact:true}).click();await expect(page.getByLabel('Cache-Auswertung')).toContainText('Treffer 1');
  await page.getByLabel('Zugriffsschlüssel').fill('');await page.getByRole('button',{name:'Cache-Zugriff',exact:true}).click();await expect(page.getByRole('region',{name:'Cache-Labor'}).getByRole('status')).toContainText('1 bis 12');
  await page.getByLabel('Verarbeitungs-Experiment',{exact:true}).selectOption('schedule');
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

test('practice pack solutions pass all cases while broken starters fail', async ({page}) => {
  test.setTimeout(90000);
  const {practiceLessons}=await import('../src/practiceLessons.js');
  await page.goto('/');
  for (const lesson of practiceLessons) {
    const run=code=>page.evaluate(async({lesson,code})=>{const {runJavaScript}=await import('/src/runner.js');return runJavaScript({code,functionName:lesson.functionName,tests:lesson.tests,preserveInput:lesson.preserveInput});},{lesson,code});
    const correct=await run(lesson.solution);expect(correct.error,lesson.id).toBeUndefined();expect(correct.results.every(item=>item.passed),lesson.id).toBe(true);
    const broken=await run(lesson.starter);expect(!!broken.error || broken.results.some(item=>!item.passed),lesson.id).toBe(true);
  }
});

test('review schedule handles failures intervals legacy progress and corrupted records',async()=>{
  const {nextReview,reviewQueue,cleanReviews}=await import('../src/review.js');const now=Date.parse('2026-10-11T12:00:00Z'),DAY=86400000;
  let state;for(const days of [1,3,7,14,14]){state=nextReview(state,true,now);expect(Date.parse(state.due)).toBe(now+days*DAY);}
  state=nextReview(state,false,now);expect(state.streak).toBe(0);expect(state.lastResult).toBe(false);expect(Date.parse(state.due)).toBe(now);expect(nextReview(state,true,now).streak).toBe(1);
  const local=[{id:'failed'},{id:'old'},{id:'future'},{id:'fresh'},{id:'untried'}];
  const progress={solved:{old:new Date(now-8*DAY).toISOString(),future:new Date(now).toISOString(),fresh:new Date(now).toISOString()},attempted:{failed:new Date(now).toISOString()},reviews:{fresh:nextReview(undefined,true,now)}};
  expect(reviewQueue(local,progress,now).map(row=>row.lesson.id)).toEqual(['failed','old']);
  progress.reviews.future=nextReview(undefined,false,now);expect(reviewQueue(local,progress,now).filter(row=>row.retry).map(row=>row.lesson.id)).toEqual(['failed','future']);
  const valid=nextReview(undefined,true,now);expect(cleanReviews({a:valid,b:{...valid,streak:-1},missing:valid},{a:{},b:{}})).toEqual({a:valid});expect(cleanReviews([],{})).toEqual({});
});

test('review practice migrates old progress retries failed solved lessons and exports new schedule',async({page})=>{
  const old=new Date(Date.now()-8*86400000).toISOString();
  await page.addInitScript(({old})=>{if(window!==window.top||localStorage.getItem('codeklar-progress-v1'))return;localStorage.setItem('codeklar-progress-v1',JSON.stringify({solved:{'js-map':old},attempted:{'js-practice-zero':new Date().toISOString()},reviews:{'js-map':{streak:'bad'}}}));},{old});
  await page.goto('/');const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.getByRole('button',{name:'Fortschritt',exact:true}).click();const panel=page.getByRole('region',{name:'Gezielt wiederholen'});
  await expect(panel).toContainText('2 Aufgaben bereit');await expect(panel.locator('li').first()).toContainText('Null ist ein gültiger Preis');
  await panel.getByRole('button',{name:'Fehlersuche: Null ist ein gültiger Preis wiederholen'}).click();
  await expect(page.getByLabel('JavaScript-Code')).toHaveValue(/preis \|\| 10/);
  await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('3 / 4 bestanden');
  await page.getByLabel('JavaScript-Code').fill('function repairZero(daten){return daten.preis ?? 10;}');await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('4 / 4 bestanden');
  let stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));expect(stored.solved['js-map']).toBe(old);expect(stored.reviews['js-practice-zero'].streak).toBe(1);expect(stored.reviews['js-practice-zero'].attempts).toBe(2);
  await page.getByLabel('JavaScript-Code').fill('function repairZero(){return 1;}');await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('0 / 4 bestanden');
  await page.getByRole('button',{name:'Fortschritt',exact:true}).click();await expect(panel).toContainText('2 Aufgaben bereit');
  const exporting=page.waitForEvent('download');await page.getByRole('button',{name:'Fortschritt exportieren'}).click();const file=await exporting;const backup=JSON.parse(await readFile(await file.path(),'utf8'));expect(backup.reviews['js-practice-zero'].lastResult).toBe(false);expect(backup.solved['js-practice-zero']).toBeTruthy();
  await page.reload();await page.getByRole('button',{name:'Fortschritt',exact:true}).click();await expect(panel).toContainText('2 Aufgaben bereit');
  await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Status filtern').selectOption('review');await expect(page.getByRole('row')).toHaveCount(3);
  await page.getByLabel('Lernbereich filtern').selectOption('python');await expect(page.getByRole('row')).toHaveCount(1);expect(errors).toEqual([]);
});

test('review empty and ready states fit mobile and desktop without errors',async({page})=>{
  await page.goto('/');const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.getByRole('button',{name:'Fortschritt',exact:true}).click();await expect(page.getByRole('region',{name:'Gezielt wiederholen'})).toContainText('Gerade ist nichts fällig');
  await page.evaluate(()=>localStorage.setItem('codeklar-progress-v1',JSON.stringify({solved:{},attempted:{'js-practice-numeric-sort':new Date().toISOString()}})));await page.reload();
  for(const width of [390,1505]){
    await page.setViewportSize({width,height:844});
    if(width===390)await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Fortschritt',exact:true}).click();
    const panel=page.getByRole('region',{name:'Gezielt wiederholen'});await expect(panel).toContainText('1 Aufgabe bereit');
    await panel.getByLabel('Wiederholungsbereich').selectOption('python');await expect(panel).toContainText('Gerade ist nichts fällig');await panel.getByLabel('Wiederholungsbereich').selectOption('js');await expect(panel).toContainText('Zehn steht vor Zwei');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`/tmp/codeklar-review-${width}.png`,animations:'disabled'});
  }
  await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('capstone demos support quiz grading inventory transactions and a complete maze on touch',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Projektideen für alle Lernbereiche'}).click();
  const choose=async name=>{await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').filter({hasText:name}).click();return page.frameLocator(`iframe[title="${name} ausprobieren"]`);};
  let frame=await choose('Lernkarten-Trainer');await expect(frame.locator('#question')).toContainText('zuerst rein');await frame.getByLabel('Deine Antwort').fill('falsch');await frame.getByRole('button',{name:'Antwort prüfen'}).click();await expect(frame.getByRole('status')).toContainText('Noch nicht richtig');await frame.getByLabel('Deine Antwort').fill(' FIFO ');await frame.getByRole('button',{name:'Antwort prüfen'}).click();await expect(frame.getByRole('status')).toContainText('Richtig');await expect(frame.locator('#plan')).toContainText('fifo: Tag 1');
  frame=await choose('Inventar-Dashboard');await frame.getByLabel('Menge').fill('6');await frame.getByRole('button',{name:'Buchen'}).click();await expect(frame.getByRole('status')).toContainText('Abgelehnt');await frame.getByLabel('Menge').fill('5');await frame.getByRole('button',{name:'Buchen'}).click();await expect(frame.getByRole('status')).toContainText('erfolgreich');await expect(frame.locator('#rows tr').first()).toContainText('0');await expect(frame.locator('#value')).toContainText('45,00');
  frame=await choose('Schlüssel-Labyrinth');for(const name of ['Rechts','Rechts','Unten','Unten','Links','Links'])await frame.getByRole('button',{name,exact:true}).click();await expect(frame.getByRole('status')).toContainText('Gewonnen');await expect(frame.getByRole('status')).toContainText('Züge: 6');await frame.getByRole('button',{name:'Neue Runde'}).click();await expect(frame.getByRole('status')).toContainText('Züge: 0');
  await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();await expect(page.getByLabel('Quellcode domain.js')).toHaveCount(0);await page.getByRole('checkbox').first().check();await expect(page.getByRole('region',{name:'Selbst bauen'})).toContainText('1 von 5');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole('region',{name:'Passende Übungen'}).getByRole('button',{name:/Im Raster gegen Wände prüfen/}).click();await expect(page.getByLabel('Hauptbereich',{exact:true})).toHaveValue('practice');await expect(page.getByRole('heading',{name:'Projektbaustein: Im Raster gegen Wände prüfen',exact:true})).toBeVisible();
});

test('capstone reference ZIPs execute real Node tests and starter ZIPs require implementation',async({page,context})=>{
  test.setTimeout(90000);const {capstoneProjects}=await import('../src/capstoneProjects.js');const {unzipSync,strFromU8}=await import('fflate');const {mkdtemp,writeFile,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');const {spawnSync}=await import('node:child_process');
  await page.goto('/');await page.getByRole('button',{name:'Projekte',exact:true}).click();
  for(const project of capstoneProjects){
    await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').filter({hasText:project.title}).click();
    for(const starter of [false,true]){
      if(starter)await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();else await page.getByRole('button',{name:'Beispiel ansehen',exact:true}).click();
      const downloading=page.waitForEvent('download');await page.getByRole('button',{name:starter?'Startgerüst als ZIP herunterladen':'Projekt als ZIP herunterladen',exact:true}).click();const archive=await downloading;const files=unzipSync(await readFile(await archive.path()));expect(strFromU8(files['domain.js'])).toBe(starter?project.build.starterFiles['domain.js']:project.files['domain.js']);
      if(!starter){
        const prefix=`/capstone-native-${project.id}/`;
        await context.route('http://localhost:5173'+prefix+'**',route=>{const path=new URL(route.request().url()).pathname.replace(prefix,'')||'index.html';const bytes=files[path];return route.fulfill({status:bytes?200:404,body:bytes?Buffer.from(bytes):'Missing',contentType:path.endsWith('.js')?'text/javascript':'text/html'});});
        const native=await context.newPage();await native.goto('http://localhost:5173'+prefix);
        if(project.id.endsWith('cards')){await native.getByLabel('Deine Antwort').fill('fifo');await native.getByRole('button',{name:'Antwort prüfen'}).click();await expect(native.getByRole('status')).toContainText('Richtig');}
        else if(project.id.endsWith('stock')){await native.getByLabel('Menge').fill('5');await native.getByRole('button',{name:'Buchen'}).click();await expect(native.locator('#value')).toContainText('45,00');}
        else {for(const key of ['ArrowRight','ArrowRight','ArrowDown','ArrowDown','ArrowLeft','ArrowLeft'])await native.keyboard.press(key);await expect(native.getByRole('status')).toContainText('Gewonnen');}
        await native.close();
      }
      const dir=await mkdtemp(join(tmpdir(),'codeklar-capstone-'));try{for(const name of ['domain.js','domain.test.js','package.json'])await writeFile(join(dir,name),files[name]);const result=spawnSync(process.execPath,['--test','domain.test.js'],{cwd:dir,encoding:'utf8',timeout:10000});if(starter)expect(result.status).not.toBe(0);else expect(result.status,result.stdout+result.stderr).toBe(0);}finally{await rm(dir,{recursive:true,force:true});}
    }
  }
});

test('reading cards stay readable across every course and topic with unbroken syntax labels',async({page})=>{
  test.setTimeout(180000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
  const samples=[...new Map(lessons.map(lesson=>[`${lesson.course}/${lesson.category}`,lesson])).values()];
  await page.setViewportSize({width:390,height:844});
  for(const lesson of samples){
    await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();
    await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);
    await page.getByLabel('Aufgaben suchen …').fill(lesson.title);
    await page.getByRole('row').filter({hasText:lesson.title}).click();
    await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
    const card=page.locator('.lesson-panel');await expect(card.getByRole('heading',{name:lesson.course==='computer'||lesson.guide?'Ein kleines Beispiel':'Die Bausteine erklärt'})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),lesson.id).toBe(true);
  }
  await page.getByLabel('Schnellnavigation').getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Aufgaben suchen …').fill('Arrays verändern mit .map()');await page.getByRole('row').filter({hasText:'Arrays verändern mit .map()'}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
  for(const width of [320,390,768,1505]){
    await page.setViewportSize({width,height:960});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();
    const term=page.locator('.syntax-parts dt').filter({hasText:'neuerWert'});expect(await term.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-reading-${width}.png`,animations:'disabled'});
  }
  await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});


test('computer reading starts small and experiment switches preserve work on mobile', async ({page}) => {
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
  const card=page.locator('.lesson-panel');
  await expect(card).toContainText('Ein Bit ist wie ein Schalter');
  await expect(card.getByRole('listitem')).toHaveCount(3);
  await expect(page.getByLabel('Grundlagen-Experiment',{exact:true})).toBeHidden();
  await expect(card.getByText('Bits sind keine winzigen geschriebenen Ziffern im Chip.',{exact:false})).toBeHidden();
  await card.getByText('Genauer verstehen: Begriffe und Details',{exact:true}).click();
  await expect(card.getByText('Bits sind keine winzigen geschriebenen Ziffern im Chip.',{exact:false})).toBeVisible();
  await card.getByText('Genauer verstehen: Begriffe und Details',{exact:true}).click();
  for(const width of [320,390,768,1505]) {
    await page.setViewportSize({width,height:960});await card.scrollIntoViewIfNeeded();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-computer-simple-${width}.png`,animations:'disabled'});
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByText('Selbst ausprobieren',{exact:true}).click();
  await expect(page.getByRole('region',{name:'Bit-Labor',exact:true})).toBeVisible();
  await expect(page.getByRole('region',{name:'Text-Labor',exact:true})).toBeHidden();
  await page.getByRole('button',{name:'Bit 1',exact:true}).click();
  await expect(page.getByLabel('Byte-Auswertung')).toContainText('Dezimal 43');
  await page.getByLabel('Grundlagen-Experiment',{exact:true}).selectOption('text');
  await page.getByLabel('Text für UTF-8',{exact:true}).fill('ä');
  await expect(page.getByRole('region',{name:'Bit-Labor',exact:true})).toBeHidden();
  await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('processing');
  await page.getByRole('button',{name:'Beispielfolge laden',exact:true}).click();
  await page.getByLabel('Verarbeitungs-Experiment',{exact:true}).selectOption('schedule');
  await page.getByRole('button',{name:'Scheduler-Schritt',exact:true}).click();
  await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('basics');
  await expect(page.getByLabel('Text für UTF-8',{exact:true})).toHaveValue('ä');
  await page.getByLabel('Grundlagen-Experiment',{exact:true}).selectOption('bits');
  await expect(page.getByLabel('Byte-Auswertung')).toContainText('Dezimal 43');
  await page.getByLabel('Werkstattbereich',{exact:true}).selectOption('processing');
  await expect(page.getByLabel('CPU-Zeitverlauf').locator('strong')).toHaveText(['A']);
  await page.getByLabel('Verarbeitungs-Experiment',{exact:true}).selectOption('cache');
  await expect(page.getByLabel('Cache-Auswertung')).toContainText('Treffer 2');
  await expect(page.getByText(`0 von ${computerLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

// Reference tools: actual array semantics and caught errors, without executing learner code.
test('comparison models preserve input and error examples link to valid repair lessons', async () => {
  const { parseComparisonInput, compareMethods } = await import('../src/methodComparison.js');
  const { errorExamples, runErrorExample, displayValue } = await import('../src/errorExamples.js');
  for (const data of [[], [0], [-2,0,3,5], [1,2,3,4]]) {
    const original = [...data];
    const result = compareMethods(data);
    expect(result.mapped).toEqual(data.map(n => n * 2));
    expect(result.filtered).toEqual(data.filter(n => n % 2 === 0));
    expect(result.returned).toBeUndefined();expect(result.collected).toEqual(result.mapped);
    expect(data).toEqual(original);expect(result.traces.filter).toHaveLength(data.length);
  }
  expect(compareMethods([-2,0,3,5], 'square', 'positive')).toMatchObject({mapped:[4,0,9,25],filtered:[3,5]});
  expect(parseComparisonInput('[]')).toEqual([]);
  for (const text of ['[', '{}', '["2"]', '[null]', '[1e999]', '[10001]', JSON.stringify(Array(21).fill(1)), ' '.repeat(2001)]) expect(() => parseComparisonInput(text)).toThrow();
  const fixes = [[2,4,6], 'Gast', 20, 2, {name:'Ada'}, 0, [2,4,6], [2,4,6], [1,2,10], [0,0]];
  for (const [index, item] of errorExamples.entries()) {
    expect(lessons.find(lesson => lesson.id === item.lesson), item.id).toBeTruthy();
    const broken = runErrorExample(item), fixed = runErrorExample(item,true);
    expect(fixed, item.id).toEqual({ok:true,value:fixes[index]});
    if (item.type !== 'Logikfehler') expect(broken).toMatchObject({ok:false,name:item.type});
    else {expect(broken.ok).toBe(true);expect(broken.value).not.toEqual(fixed.value);}
  }
  expect(displayValue([undefined,undefined])).toBe('[undefined, undefined]');
});

test('method comparison updates shared data traces validation and mobile state without errors', async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});
  await page.goto('/');await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();
  await page.getByRole('button',{name:'Methoden vergleichen',exact:true}).click();
  const tool=page.getByRole('region',{name:'Methodenvergleich',exact:true});
  await expect(tool.getByRole('article',{name:'map-Ergebnis'})).toContainText('[2, 4, 6, 8]');
  await expect(tool.getByRole('article',{name:'filter-Ergebnis'})).toContainText('[2, 4]');
  await expect(tool.getByRole('article',{name:'forEach-Ergebnis'})).toContainText('undefined');
  await tool.getByLabel('Zahlenliste (JSON)',{exact:true}).fill('[-2, 0, 3, 5]');
  await tool.getByText('Rechnung und Filter ändern',{exact:true}).click();
  await tool.getByLabel('Rechnung für map und forEach',{exact:true}).selectOption('square');
  await tool.getByLabel('Bedingung für filter',{exact:true}).selectOption('positive');
  await expect(tool.getByRole('article',{name:'map-Ergebnis'})).toContainText('[4, 0, 9, 25]');
  await expect(tool.getByRole('article',{name:'filter-Ergebnis'})).toContainText('[3, 5]');
  await tool.getByText('Callback Schritt für Schritt verfolgen',{exact:true}).click();
  await tool.getByLabel('Methode verfolgen',{exact:true}).selectOption('filter');
  await tool.getByRole('button',{name:'Nächsten Callback zeigen'}).click();await expect(tool.getByRole('status')).toContainText('Index 0, Wert -2. Bedingung: false');
  await tool.getByRole('button',{name:'Nächsten Callback zeigen'}).click();await expect(tool.getByRole('status')).toContainText('Index 1, Wert 0');
  await tool.getByLabel('Zahlenliste (JSON)',{exact:true}).fill('[<script>]');await expect(tool.getByRole('alert')).toContainText('JSON-Zahlenliste');
  await expect(tool.getByRole('article')).toHaveCount(0);
  await tool.getByRole('button',{name:'Leere Liste',exact:true}).click();await tool.getByText('Callback Schritt für Schritt verfolgen',{exact:true}).click();await expect(tool.getByRole('status')).toHaveText('Leere Liste: kein Callback-Aufruf.');await expect(tool.getByRole('button',{name:'Nächsten Callback zeigen'})).toBeDisabled();
  await tool.getByRole('button',{name:'Startbeispiel',exact:true}).click();
  await page.getByRole('button',{name:'Fehler verstehen',exact:true}).click();await page.getByRole('button',{name:'Methoden vergleichen',exact:true}).click();await expect(tool.getByLabel('Rechnung für map und forEach',{exact:true})).toHaveValue('square');
  for (const width of [320,390,768,1505]) {
    await page.setViewportSize({width,height:960});await tool.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-compare-${width}.png`,animations:'disabled'});
  }
  await tool.getByRole('article',{name:'map-Ergebnis'}).getByRole('button',{name:'Passende Übung öffnen →'}).click();await expect(page.getByRole('heading',{name:'Arrays verändern mit .map()',exact:true})).toBeVisible();
  await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('error guide runs every failure and correction searches and opens a repair exercise', async ({page}) => {
  const {errorExamples, displayValue}=await import('../src/errorExamples.js');
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});
  await page.goto('/');await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByRole('button',{name:'Fehler verstehen',exact:true}).click();
  const tool=page.getByRole('region',{name:'Fehler verstehen',exact:true});
  for (const item of errorExamples) {
    await tool.getByLabel('Fehlerbeispiel',{exact:true}).selectOption(item.id);
    await expect(tool.getByLabel('Fehlerausgabe')).toHaveText('Noch nicht ausgeführt.');
    await tool.getByRole('button',{name:'Fehlerbeispiel ausführen',exact:true}).click();
    await expect(tool.getByLabel('Fehlerausgabe')).toContainText(item.type === 'Logikfehler' ? 'Keine Ausnahme geworfen.' : item.type);
    await tool.getByRole('button',{name:'Korrektur ausprobieren',exact:true}).click();
    await expect(tool.getByLabel('Korrigierte Ausgabe')).toHaveText(`Ergebnis: ${displayValue(item.corrected())}`);
  }
  await tool.getByLabel('Fehler suchen',{exact:true}).fill('keinepassendehilfe');await expect(tool.getByRole('status')).toContainText('Kein Beispiel gefunden');
  await tool.getByLabel('Fehler suchen',{exact:true}).fill('return');await tool.getByLabel('Fehlerbeispiel',{exact:true}).selectOption('return');
  await tool.getByRole('button',{name:'Fehlerbeispiel ausführen',exact:true}).click();await expect(tool.getByLabel('Fehlerausgabe')).toContainText('[undefined, undefined, undefined]');
  await tool.getByRole('button',{name:'Korrektur ausprobieren',exact:true}).click();
  for(const width of [320,390,768,1505]) {await page.setViewportSize({width,height:960});await tool.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-errors-${width}.png`,animations:'disabled'});}
  await tool.getByRole('button',{name:'Dazu selbst eine Aufgabe lösen →'}).click();await expect(page.getByRole('heading',{name:'Fehlersuche: map liefert leere Werte',exact:true})).toBeVisible();await expect(page.getByRole('tab',{name:'Aufgabe',exact:true})).toHaveAttribute('aria-selected','true');
  expect(errors).toEqual([]);expect(await page.locator('vite-error-overlay').count()).toBe(0);
});

test('algorithm challenges grade all references reject wrong answers and preserve inputs', async ({page}) => {
  test.setTimeout(90000);const {challengeLessons}=await import('../src/challengeLessons.js');
  await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Algorithmus-Challenges',exact:true}).click();
  await expect(page.getByRole('region',{name:'Algorithmus-Challenges',exact:true})).toContainText('0 von 12 Challenges gelöst');
  for(const item of challengeLessons) {
    await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Alle Aufgaben',exact:true}).click();await page.getByLabel('Aufgaben suchen …').fill(item.title);await page.getByRole('row').filter({hasText:item.title}).click();
    await page.getByLabel('JavaScript-Code').fill(`function ${item.functionName}(){ return null; }`);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(/\d+ \/ \d+ bestanden/);await expect(page.getByLabel('Code-Ausgabe')).not.toContainText(`${item.tests.length} / ${item.tests.length} bestanden`);
    await page.getByLabel('JavaScript-Code').fill(item.solution);await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText(`${item.tests.length} / ${item.tests.length} bestanden`);
  }
  await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Aufgaben suchen …').fill('Challenge: Summe ohne Umwege');await page.getByRole('row').filter({hasText:'Challenge: Summe ohne Umwege'}).click();await page.getByLabel('JavaScript-Code').fill('function sumChallenge(zahlen){let summe=0;while(zahlen.length)summe+=zahlen.pop();return summe;}');await page.getByRole('button',{name:'Lösung prüfen',exact:true}).click();await expect(page.getByLabel('Code-Ausgabe')).toContainText('1 / 5 bestanden');await expect(page.getByLabel('Code-Ausgabe')).toContainText('Die Eingabe wurde verändert.');
  await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Algorithmus-Challenges',exact:true}).click();await expect(page.getByRole('region',{name:'Algorithmus-Challenges',exact:true})).toContainText('12 von 12 Challenges gelöst');
  await page.getByLabel('Challenge-Status').selectOption('open');await expect(page.getByRole('status')).toContainText('Keine Challenges');
});

test('challenge timer analysis filters and unguided projects work on mobile and desktop', async ({page}) => {
  await page.clock.install();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Algorithmus-Challenges',exact:true}).click();
  const list=page.getByRole('region',{name:'Algorithmus-Challenges',exact:true});await page.getByLabel('Challenge-Schwierigkeit').selectOption('Schwer');await expect(list.getByRole('article')).toHaveCount(4);
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-challenges-${width}.png`,animations:'disabled'});}
  await page.getByLabel('Challenge-Schwierigkeit').selectOption('all');
  await list.getByRole('button',{name:'Nächste offene Challenge starten',exact:true}).click();await expect(page.getByRole('heading',{name:'Challenge: Summe ohne Umwege',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Zeit starten',exact:true}).click();await page.clock.runFor(5000);await expect(page.getByLabel('Verstrichene Lösungszeit')).toHaveText('00:05');
  await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Aufgaben suchen …').fill('Challenge: Summe ohne Umwege');await page.getByRole('row').filter({hasText:'Challenge: Summe ohne Umwege'}).click();
  await expect(page.getByLabel('Verstrichene Lösungszeit')).not.toHaveText('00:00');await page.getByRole('button',{name:'Zeit pausieren',exact:true}).click();const paused=await page.getByLabel('Verstrichene Lösungszeit').textContent();await page.clock.runFor(3000);await expect(page.getByLabel('Verstrichene Lösungszeit')).toHaveText(paused);
  await page.getByText('Effizienzcheck: Laufzeit und Speicher',{exact:true}).click();await page.getByLabel('Laufzeit des beschriebenen Ansatzes').selectOption('O(n²)');await page.getByLabel('Zusätzlicher Speicher des Ansatzes').selectOption('O(n)');await page.getByRole('button',{name:'Komplexität prüfen'}).click();await expect(page.getByRole('status').filter({hasText:'Noch nicht passend.'})).toBeVisible();
  await page.getByLabel('Laufzeit des beschriebenen Ansatzes').selectOption('O(n)');await page.getByLabel('Zusätzlicher Speicher des Ansatzes').selectOption('O(1)');await page.getByRole('button',{name:'Komplexität prüfen'}).click();await expect(page.getByRole('status').filter({hasText:'Passend eingeschätzt.'})).toBeVisible();
  const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));expect(progress.solved['js-challenge-sum']).toBeUndefined();
  await page.getByRole('button',{name:'Zeit zurücksetzen',exact:true}).click();await expect(page.getByLabel('Verstrichene Lösungszeit')).toHaveText('00:00');
  await page.getByRole('button',{name:'Zeit starten',exact:true}).click();await page.clock.fastForward(480000);await expect(page.getByRole('status').filter({hasText:'Zeitziel erreicht.'})).toBeVisible();await page.getByRole('button',{name:'Zeit pausieren',exact:true}).click();
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-challenge-task-${width}.png`,animations:'disabled'});}
  await page.getByRole('button',{name:'Projekte',exact:true}).click();await page.getByLabel('Projekt suchen').fill('Lernkarten-Trainer');await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').click();await page.getByRole('button',{name:'Selbst bauen',exact:true}).click();await page.getByLabel('Projektstufe').selectOption('independent');
  const build=page.getByRole('region',{name:'Selbst bauen',exact:true});await expect(build.getByRole('checkbox')).toHaveCount(5);await expect(build.getByRole('button',{name:/Hinweis:/})).toHaveCount(0);await page.getByLabel('Projektstufe').selectOption('guided');await expect(build.getByRole('button',{name:/Hinweis:/})).toHaveCount(5);
  expect(errors).toEqual([]);expect(await page.locator('vite-error-overlay').count()).toBe(0);
});

test('computer practice calculations agree with native byte and scheduling models', async () => {
  const {computerPracticeLessons}=await import('../src/computerPracticeLessons.js');
  const {initialCache,accessCache,initialSchedule,stepSchedule}=await import('../src/processingModels.js');
  const answer=id=>{const item=computerPracticeLessons.find(item=>item.id==='computer-practice-'+id);return item.options[item.answer];};
  expect(answer('switches')).toBe(String(2**5));expect(answer('flags')).toBe(String(parseInt('1010',2)));
  expect(answer('counter')).toBe(String(Uint8Array.of(256)[0]));expect(answer('pixels')).toBe(String(10*8*3));
  expect(answer('units')).toBe((9*1024).toLocaleString('de-DE'));expect(answer('utf8')).toBe(String(new TextEncoder().encode('Hiä').length));
  expect(answer('signed').replace('−','-')).toBe(String(new Int8Array(Uint8Array.of(254).buffer)[0]));
  expect(answer('endian')).toBe(String(new DataView(Uint8Array.of(1,2).buffer).getUint16(0,true)));
  const a={profil:{punkte:7}},b={...a};b.profil.punkte=13;expect(answer('alias')).toBe(String(a.profil.punkte));
  let cache=initialCache(2);for(const key of ['A','B','A','C'])cache=accessCache(cache,key);expect(answer('cache')).toBe(cache.history.at(-1).evicted);
  let schedule=initialSchedule(1);while(schedule.queue.length)schedule=stepSchedule(schedule);expect(answer('schedule')).toBe(schedule.trace.map(index=>['A','B','C'][index]).join(', '));
  expect(answer('download')).toBe(`${8*8/16} Sekunden`);expect(new Set(computerPracticeLessons.map(item=>item.id)).size).toBe(16);
});

test('computer practice scenarios stay clear on mobile and wrong answers allow a retry',async({page})=>{
  const {computerPracticeLessons}=await import('../src/computerPracticeLessons.js');const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('computer');await page.getByLabel('Aufgaben suchen …').fill('Praxisaufgabe');await expect(page.getByRole('row')).toHaveCount(17);
  const lesson=computerPracticeLessons.find(item=>item.id==='computer-practice-utf8');await page.getByRole('row').filter({hasText:lesson.title}).click();
  await page.getByRole('radio',{name:lesson.options[0],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Noch nicht ganz.',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Einen Hinweis zeigen',exact:true}).click();await expect(page.locator('.hint')).toContainText(lesson.hints[0]);
  await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText(lesson.explanation,{exact:true})).toBeVisible();
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-computer-practice-${width}.png`,animations:'disabled'});}
  expect(errors).toEqual([]);await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);
});

test('new computer teaching lessons present three steps before optional technical detail',async({page})=>{
  test.setTimeout(90000);const {computerTheoryLessons}=await import('../src/computerTheoryLessons.js');const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  for(const lesson of computerTheoryLessons){
    await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('computer');await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();
    await expect(page.getByText(`Lernstoff · ${lesson.difficulty}`,{exact:true})).toBeVisible();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
    const panel=page.locator('.lesson-panel');await expect(panel.getByRole('listitem')).toHaveCount(3);await expect(panel.getByText(lesson.guide[1][1],{exact:true})).toBeVisible();
    await expect(panel.getByText(lesson.detail,{exact:true})).toBeHidden();await panel.getByText('Genauer verstehen: Begriffe und Details',{exact:true}).click();await expect(panel.getByText(lesson.detail,{exact:true})).toBeVisible();
  }
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-computer-theory-${width}.png`,animations:'disabled'});}
  expect(errors).toEqual([]);await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);
});

test('new terminal and science courses grade every quiz and keep progress across reload',async({page})=>{
  test.setTimeout(240000);const {terminalLessons}=await import('../src/terminalLessons.js');const {scienceLessons}=await import('../src/scienceLessons.js');
  await page.goto('/');
  for(const lesson of [...terminalLessons,...scienceLessons]){
    await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();
    await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
  }
  await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of [...terminalLessons,...scienceLessons])expect(saved.solved[lesson.id]).toBeTruthy();
});

test('new course navigation explanations and science labs fit mobile and desktop',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});await page.goto('/');
  for(const name of ['Linux-Befehle','macOS-Befehle','Windows-Befehle','Physik-Grundlagen','Elektrotechnik']){
    await page.getByRole('button',{name,exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.getByRole('heading',{name:'Ein kleines Beispiel',exact:true})).toBeVisible();await expect(page.getByLabel('JavaScript-Code')).toHaveCount(0);
  }
  await page.getByText('Ohm-Labor: Spannung, Widerstand und Strom',{exact:true}).click();await expect(page.getByLabel('Modellergebnis')).toContainText('0,005 A = 5 mA');await page.getByLabel('Spannung in Volt').fill('12');await expect(page.getByLabel('Modellergebnis')).toContainText('12 mA');await expect(page.getByLabel('Modellergebnis')).toContainText('0,144 W');
  await page.getByLabel('Widerstand in Ohm').fill('0');await expect(page.getByRole('alert')).toContainText('1–1.000.000');await expect(page.getByLabel('Modellergebnis')).toHaveCount(0);await page.getByLabel('Widerstand in Ohm').fill('1000');
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-electrical-${width}.png`,animations:'disabled'});}
  await page.getByRole('button',{name:'Physik-Grundlagen',exact:true}).click();await page.getByText('Bewegungs-Labor: Strecke und Zeit',{exact:true}).click();await expect(page.getByLabel('Modellergebnis')).toContainText('5 m/s');await expect(page.getByLabel('Modellergebnis')).toContainText('18 km/h');await page.getByLabel('Zeit in Sekunden').fill('0');await expect(page.getByRole('alert')).toContainText('Zeit muss positiv sein');
  await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Windows-Befehle',exact:true}).click();await expect(page.getByRole('heading',{name:'PowerShell und cmd unterscheiden.',exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);
});

test('science exercise answers agree with the stated arithmetic and units',async()=>{
  const {scienceLessons}=await import('../src/scienceLessons.js');
  const answer=id=>{const item=scienceLessons.find(item=>item.id===id);return item.options[item.answer];};
  expect(answer('physics-prefix')).toBe(`${(2.5*1000).toLocaleString('de-DE')} m`);
  expect(answer('physics-speed')).toBe(`${60/12} m/s`);expect(answer('physics-acceleration')).toBe(`${12/3} m/s²`);
  expect(answer('physics-force')).toBe(`${4*2} N`);expect(answer('physics-work')).toBe(`${5*3} J`);expect(answer('physics-power')).toBe(`${60/3} W`);
  expect(answer('physics-frequency')).toBe(`${1/0.1} Hz`);expect(answer('physics-temperature')).toBe(`${(20+273.15).toLocaleString('de-DE')} K`);
  expect(answer('electrical-ohm')).toBe(`${5/1000*1000} mA`);expect(answer('electrical-power')).toBe(`${(5*0.02).toLocaleString('de-DE')} W`);
  expect(answer('electrical-series')).toBe(`${100+200} Ω`);expect(answer('electrical-parallel')).toBe(`${1/(1/100+1/100)} Ω`);
  expect(answer('electrical-nodes')).toBe(`${10-4} mA`);expect(answer('electrical-loop')).toBe(`${5-2} V`);
});

test('science formulas use mathematical notation in lessons reference and interactive labs',async({page})=>{
  test.setTimeout(150000);const {scienceLessons}=await import('../src/scienceLessons.js');const {scienceMath}=await import('../src/scienceMath.js');const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});await page.goto('/');
  for(const lesson of scienceLessons){
    await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
    const panel=page.locator('.lesson-panel');await expect(panel.locator('pre')).toHaveCount(0);await expect(panel.locator('.science-example').first()).toBeVisible();
    if(scienceMath[lesson.id]){await expect(panel.locator('.science-example').first().locator('math')).toHaveCount(2);await expect(panel.locator('math').first()).toBeVisible();}
  }
  await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('electrical');await page.getByLabel('Zum Beispiel map, === oder Python …').fill('Ohmschen');await expect(page.locator('.reference-entry math')).toBeVisible();await expect(page.locator('.reference-entry pre')).toHaveCount(0);
  await page.getByRole('button',{name:'Elektrotechnik',exact:true}).click();await page.getByText('Ohm-Labor: Spannung, Widerstand und Strom',{exact:true}).click();const lab=page.getByRole('region',{name:'Ohm-Labor',exact:true});await expect(lab.locator('mfrac')).toHaveCount(2);await page.getByLabel('Spannung in Volt').fill('12');await expect(lab.locator('math').last()).toContainText('12');await expect(page.getByLabel('Modellergebnis')).toContainText('12 mA');
  await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Aufgaben suchen …').fill('Mit dem Ohmschen Gesetz rechnen');await page.getByRole('row').filter({hasText:'Mit dem Ohmschen Gesetz rechnen'}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if([390,1505].includes(width))await page.screenshot({path:`/tmp/codeklar-math-${width}.png`,animations:'disabled'});}
  await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('expanded basics provide contextual vocabulary and checked numeric answers',async({page})=>{
  const {terminalExtraLessons}=await import('../src/terminalExtraLessons.js');const {scienceExtraLessons}=await import('../src/scienceExtraLessons.js');
  const all=[...terminalExtraLessons,...scienceExtraLessons];expect(all).toHaveLength(75);expect(new Set(all.map(x=>x.id)).size).toBe(75);
  for(const lesson of all){expect(lesson.guide[1]).toHaveLength(3);expect(lesson.terms.length).toBeGreaterThan(0);expect(new Set(lesson.options).size).toBe(3);}
  const answer=id=>{const item=all.find(x=>x.id===id);return item.options[item.answer];};
  expect(answer('physics-uniform-motion')).toBe(`${3*4} m`);expect(answer('physics-friction')).toBe(`${0.2*10} N`);expect(answer('physics-momentum')).toBe(`${2*3} kg·m/s`);
  expect(answer('physics-specific-heat')).toBe(`${(4180*2).toLocaleString('de-DE')} J`);expect(answer('physics-waves')).toBe(`${2*3} m/s`);
  expect(answer('electrical-divider')).toBe(`${6*1000/2000} V`);expect(answer('electrical-internal-resistance')).toBe(`${(6-0.1*2).toLocaleString('de-DE')} V`);
  expect(answer('electrical-energy')).toBe(`${2*3} Wh`);expect(answer('electrical-resistor-power')).toBe(`${(5**2/100).toLocaleString('de-DE')} W`);
  expect(answer('electrical-rc')).toBe(`${(1000*0.0001).toLocaleString('de-DE')} s`);
  await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('electrical');await page.getByLabel('Aufgaben suchen …').fill('Effektivwert und Spitzenwert');await page.getByRole('row').filter({hasText:'Effektivwert und Spitzenwert'}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('msqrt').first()).toBeVisible();await expect(page.locator('math').first()).toHaveAttribute('aria-label',/Quadratwurzel aus 2/);
  await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd').first()).toBeVisible();
  await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('linux');await page.getByLabel('Aufgaben suchen …').fill('Absolute und relative Pfade erkennen');await page.getByRole('row').filter({hasText:'Absolute und relative Pfade erkennen'}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.getByText('Im Alltag',{exact:true})).toBeVisible();await page.getByText('Begriffe einfach erklärt',{exact:true}).click();
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===390){await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-basics-390.png',animations:'disabled'});}}
});

for(const course of ['linux','macos','windows','physics','electrical']){
  test(`next-stage ${course} lessons explain examples grade answers and preserve progress`,async({page})=>{
    test.setTimeout(90000);
    const {terminalNextLessons}=await import('../src/terminalNextLessons.js');const {scienceNextLessons}=await import('../src/scienceNextLessons.js');
    const items=[...terminalNextLessons,...scienceNextLessons].filter(x=>x.course===course);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.setViewportSize({width:390,height:960});
    for(const [i,lesson] of items.entries()){
      await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
      await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd')).toHaveCount(lesson.terms.length);await expect(page.locator('.learning-vocabulary dd').first()).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      if(i===0){await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[(lesson.answer+1)%3],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toHaveCount(0);}
      await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
    }
    await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of items)expect(saved.solved[lesson.id]).toBeTruthy();expect(errors).toEqual([]);
  });
}

test('next-stage physical examples agree with independent calculations and model limits',async()=>{
  const {scienceNextLessons}=await import('../src/scienceNextLessons.js');const {terminalLessons}=await import('../src/terminalLessons.js');const {scienceLessons}=await import('../src/scienceLessons.js');const {scienceMath}=await import('../src/scienceMath.js');
  const all=[...terminalLessons,...scienceLessons];expect(new Set(all.map(x=>x.id)).size).toBe(all.length);
  const answer=id=>{const lesson=scienceNextLessons.find(x=>x.id===id);return lesson.options[lesson.answer];};const de=value=>value.toLocaleString('de-DE',{maximumFractionDigits:6});
  expect(answer('physics-accelerated-distance')).toBe(`${0.5*2*3**2} m`);expect(answer('physics-spring')).toBe(`${100*0.02} N`);expect(answer('physics-torque')).toBe(`${10*0.2} N·m`);expect(answer('physics-lever-balance')).toBe(`${20*0.1/0.2} N`);
  expect(answer('physics-buoyancy')).toBe(`${1000*0.001} kg`);expect(answer('physics-ideal-gas')).toBe(`${100*600/300} kPa`);expect(answer('physics-thermal-expansion')).toBe(`${de(0.00001*1*20*1000)} mm`);expect(answer('physics-latent-heat')).toBe(`${de(0.1*334000)} J`);
  expect(answer('electrical-mixed-resistors')).toBe(`${100+1/(1/200+1/200)} Ω`);expect(answer('electrical-capacitors-parallel')).toBe(`${100+200} µF`);expect(answer('electrical-capacitors-series')).toBe(`${1/(1/100+1/100)} µF`);
  expect(answer('electrical-rc-discharge')).toBe(`${de(Math.round(5*Math.exp(-1)*100)/100)} V`);expect(answer('electrical-inductor-energy')).toBe(`${de(0.5*0.1*2**2)} J`);expect(answer('electrical-pullup')).toBe(`${de(3.3/10000*1000)} mA`);
  expect(Math.round(1/(2*Math.PI*50*100e-6)*100)/100).toBe(31.83);expect(scienceMath['electrical-capacitive-reactance'].example.flat(Infinity)).toContain('31,83');
  expect(scienceNextLessons.find(x=>x.id==='electrical-pwm').example).toContain(`${de(0.25*5)} V`);expect(answer('electrical-pwm')).toContain('eingeschaltete Spannung bleibt 5 V');
  expect(scienceNextLessons.find(x=>x.id==='physics-ideal-gas').guide[1].join(' ')).toContain('Kelvin');expect(scienceNextLessons.find(x=>x.id==='electrical-rc-discharge').detail).toContain('kein Nachweis');
});

test('next-stage exponential formulas stay readable at phone and desktop widths',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('electrical');await page.getByLabel('Aufgaben suchen …').fill('RC-Entladung: der Rest wird immer kleiner');await page.getByRole('row').filter({hasText:'RC-Entladung: der Rest wird immer kleiner'}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
  const example=page.locator('.lesson-panel .science-example').first();await expect(example.locator('msup').first()).toBeVisible();await expect(example.locator('mfrac').first()).toBeVisible();await expect(example.locator('math').first()).toHaveAttribute('aria-label',/hoch minus t geteilt durch τ/);
  for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await example.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===390)await page.screenshot({path:'/tmp/codeklar-next-390.png',animations:'disabled'});}
});

test('formula models solve every direction and reject undefined divisions',async()=>{
 const {formulaModels,solveFormula,answerMatches,parseQuantity}=await import('../src/formulaModels.js');
 expect(formulaModels).toHaveLength(22);
 for(const model of formulaModels){for(let target=0;target<3;target++){
  const raw=model.quantities.map(q=>String(q.value));raw[target]='';const solution=solveFormula(model,target,raw);
  expect(solution.error,`${model.id} direction ${target}`).toBeUndefined();expect(solution.result).toBeCloseTo(model.quantities[target].value,8);
 }}
 const speed=formulaModels.find(x=>x.id==='physics-speed'),ohm=formulaModels.find(x=>x.id==='electrical-ohm'),energy=formulaModels.find(x=>x.id==='physics-kinetic');
 expect(solveFormula(speed,0,['','12','0']).error).toContain('null');expect(solveFormula(speed,2,['0','0','']).error).toContain('nicht eindeutig');expect(solveFormula(speed,2,['4','0','']).error).toContain('positiven Nenner');
 expect(solveFormula(ohm,1,['0,01','','500']).result).toBe(5);expect(solveFormula(energy,2,['16','2','']).result).toBe(4);
 expect(solveFormula(energy,2,['-1','2','']).error).toBeTruthy();expect(solveFormula(energy,2,['16','0','']).error).toBeTruthy();expect(solveFormula(speed,0,['','1e13','2']).error).toBeTruthy();
 for(const bad of ['',' ','Infinity','NaN','0x10','1,2,3','1.000,5'])expect(Number.isFinite(parseQuantity(bad))).toBe(false);
 expect(parseQuantity('0,0001')).toBe(0.0001);expect(parseQuantity('1e-4')).toBe(0.0001);expect(answerMatches(31.83,31.8309886)).toBe(true);expect(answerMatches(30,31.8309886)).toBe(false);
});

test('formula workshop changes numerator denominator and square targets without stale answers',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Physik-Grundlagen',exact:true}).click();await page.getByText('Formeln umstellen & üben',{exact:true}).click();const workshop=page.getByRole('region',{name:'Formelwerkstatt',exact:true});
 await workshop.getByLabel('Gesuchte Größe').selectOption('1');await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toContainText('s = 100 m');await expect(workshop.locator('.formula-steps li')).toHaveCount(3);
 await workshop.getByLabel('Gegeben: Geschwindigkeit v (m/s)').fill('4');await workshop.getByLabel('Gegeben: Zeit t (s)').fill('3');await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toContainText('s = 12 m');
 await workshop.getByRole('button',{name:'Selbst lösen',exact:true}).click();await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toHaveCount(0);await workshop.getByLabel('Dein Ergebnis in m',{exact:true}).fill('11');await workshop.getByRole('button',{name:'Umform-Ergebnis prüfen',exact:true}).click();await expect(workshop.getByRole('status')).toContainText('passt noch nicht');
 await workshop.getByLabel('Dein Ergebnis in m',{exact:true}).fill('12');await workshop.getByRole('button',{name:'Umform-Ergebnis prüfen',exact:true}).click();await expect(workshop.getByRole('status')).toContainText('Richtig');
 await workshop.getByLabel('Gegeben: Zeit t (s)').fill('4');await expect(workshop.getByRole('status')).toBeEmpty();await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toHaveCount(0);
 await workshop.getByLabel('Gesuchte Größe').selectOption('2');await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toContainText('t = 20 s');await workshop.getByLabel('Gegeben: Geschwindigkeit v (m/s)').fill('0');await expect(workshop.getByRole('alert')).toContainText('null');await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toHaveCount(0);
 await workshop.getByLabel('Formel wählen').selectOption('physics-kinetic');await workshop.getByLabel('Gesuchte Größe').selectOption('2');await expect(workshop.locator('msqrt').first()).toBeVisible();await workshop.getByLabel('Gegeben: Bewegungsenergie E (J)').fill('16');await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toContainText('v = 4 m/s');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await workshop.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===390)await page.screenshot({path:'/tmp/codeklar-umformen-390.png',animations:'disabled'});}
});

test('algebra lessons grade all exercises and open the matching lesson workshop',async({page})=>{
 test.setTimeout(90000);const {algebraLessons}=await import('../src/algebraLessons.js');await page.goto('/');
 for(const lesson of algebraLessons){await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(lesson.course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();}
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('electrical');await page.getByLabel('Aufgaben suchen …').fill('Ohmsches Gesetz nach Spannung umstellen');await page.getByRole('row').filter({hasText:'Ohmsches Gesetz nach Spannung umstellen'}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.getByText('Diese Formel umstellen & üben',{exact:true}).click();const workshop=page.locator('.lesson-panel').getByRole('region',{name:'Formelwerkstatt',exact:true});await expect(workshop.getByLabel('Gesuchte Größe')).toHaveValue('1');await workshop.getByLabel('Gegeben: Stromstärke I (A)').fill('0,01');await workshop.getByLabel('Gegeben: Widerstand R (Ω)').fill('500');await expect(workshop.getByLabel('Umform-Ergebnis',{exact:true})).toContainText('U = 5 V');
 await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of algebraLessons)expect(saved.solved[lesson.id]).toBeTruthy();
});

for(const [course,module,exportName] of [['networking','networkingLessons','networkingLessons'],['cloud','cloudLessons','cloudLessons'],['cybersecurity','cybersecurityLessons','cybersecurityLessons'],['reverse','reverseEngineeringLessons','reverseEngineeringLessons']]){
 test(`technology course ${course} explains every topic and persists all quiz answers`,async({page})=>{
  test.setTimeout(120000);const items=(await import(`../src/${module}.js`))[exportName];const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
  for(const lesson of items){await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd')).toHaveCount(lesson.terms.length);await expect(page.getByLabel('JavaScript-Code')).toHaveCount(0);await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();}
  await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of items)expect(saved.solved[lesson.id]).toBeTruthy();expect(errors).toEqual([]);
 });
}

test('technology byte and prefix models handle ordering boundary addresses and invalid values',async()=>{
 const {decodeBytes,comparePrefix}=await import('../src/technologyModels.js');
 expect(decodeBytes('01 02')).toMatchObject({big:258,little:513});expect(decodeBytes('41 42 43').ascii).toBe('ABC');expect(decodeBytes('FF FF FF FF')).toMatchObject({big:4294967295,little:4294967295});expect(decodeBytes('00').big).toBe(0);expect(decodeBytes('80').ascii).toBe('·');
 for(const value of ['','0','GG','01 02 03 04 05','0x41','41<script>'])expect(decodeBytes(value).error).toBeTruthy();
 expect(comparePrefix('192.0.2.10','192.0.2.80','24')).toEqual({start:'192.0.2.0',end:'192.0.2.255',count:256,same:true});expect(comparePrefix('192.0.2.10','192.0.3.10','24').same).toBe(false);
 expect(comparePrefix('255.255.255.255','0.0.0.0',0)).toEqual({start:'0.0.0.0',end:'255.255.255.255',count:4294967296,same:true});expect(comparePrefix('255.255.255.255','255.255.255.254',32)).toEqual({start:'255.255.255.255',end:'255.255.255.255',count:1,same:false});expect(comparePrefix('192.0.2.10','192.0.2.11',31).count).toBe(2);
 for(const address of ['256.0.0.1','01.2.3.4','1.2.3','1.2.3.4.5','-1.2.3.4'])expect(comparePrefix(address,'192.0.2.1',24).error).toBeTruthy();for(const prefix of ['',-1,33,2.5])expect(comparePrefix('192.0.2.10','192.0.2.80',prefix).error).toBeTruthy();
});

test('technology course navigation local labs and references fit mobile and desktop',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});await page.goto('/');
 for(const name of ['Networking','Cloud','Cybersecurity','Reverse Engineering']){await page.getByRole('button',{name,exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.getByLabel('JavaScript-Code')).toHaveCount(0);}
 await page.getByText('Byte-Labor: Reihenfolge und Text vergleichen',{exact:true}).click();const bytes=page.getByRole('region',{name:'Byte-Labor',exact:true});await expect(bytes.getByLabel('Byte-Ergebnis')).toContainText('258');await expect(bytes.getByLabel('Byte-Ergebnis')).toContainText('513');await bytes.getByLabel('Bytes in Hex').fill('41 42 43');await expect(bytes.getByLabel('Byte-Ergebnis')).toContainText('ABC');await bytes.getByLabel('Bytes in Hex').fill('GG');await expect(bytes.getByRole('alert')).toBeVisible();await expect(bytes.getByLabel('Byte-Ergebnis')).toHaveCount(0);await bytes.getByLabel('Bytes in Hex').fill('01 02');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await bytes.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===390)await page.screenshot({path:'/tmp/codeklar-reverse-390.png',animations:'disabled'});}
 await page.setViewportSize({width:1505,height:1045});await page.getByRole('button',{name:'Networking',exact:true}).click();await page.getByText('Netzwerk-Labor: IPv4-Präfixe vergleichen',{exact:true}).click();const network=page.getByRole('region',{name:'Netzwerk-Labor',exact:true});await expect(network.getByLabel('Präfix-Ergebnis')).toContainText('Gleiches Präfix');await network.getByLabel('Zieladresse').fill('192.0.3.10');await expect(network.getByLabel('Präfix-Ergebnis')).toContainText('Anderes Präfix');await network.getByLabel('Präfixlänge').fill('32');await expect(network.getByLabel('Präfix-Ergebnis')).toContainText('192.0.2.10 bis 192.0.2.10');await network.getByLabel('Ausgangsadresse').fill('999.0.0.1');await expect(network.getByRole('alert')).toBeVisible();await expect(network.getByLabel('Präfix-Ergebnis')).toHaveCount(0);
 await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('cybersecurity');await page.getByLabel('Zum Beispiel map, === oder Python …').fill('Daten und SQL');await expect(page.locator('.reference-entry')).toHaveCount(1);
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Cloud',exact:true}).click();await expect(page.getByRole('heading',{name:'Cloud-Dienste und ihren Betrieb verstehen.',exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});

test('expanded technology examples agree with their arithmetic and permission rules',async()=>{
 const {networkingExtraLessons}=await import('../src/networkingExtraLessons.js');const {cloudExtraLessons}=await import('../src/cloudExtraLessons.js');const {cybersecurityExtraLessons}=await import('../src/cybersecurityExtraLessons.js');const {reverseEngineeringExtraLessons}=await import('../src/reverseEngineeringExtraLessons.js');
 const all=[...networkingExtraLessons,...cloudExtraLessons,...cybersecurityExtraLessons,...reverseEngineeringExtraLessons];expect(all).toHaveLength(60);expect(new Set(all.map(x=>x.id)).size).toBe(60);
 const answer=id=>{const lesson=all.find(x=>x.id===id);return lesson.options[lesson.answer];};
 expect(answer('networking-mtu')).toBe(`${(1500-20-20).toLocaleString('de-DE')} Bytes`);expect(answer('networking-bandwidth')).toBe(`${10*8/20} s`);expect(answer('networking-subnet-26')).toBe(`${2**(32-26)}`);
 expect(answer('cloud-connection-pool')).toBe(`${4*10}`);expect(answer('cloud-slo')).toBe(`${100000*0.001}`);expect(answer('reverse-signed')).toBe(String(0xff-256).replace('-','−'));expect(answer('reverse-length-check')).toContain(`${10-(12-4)} Bytes`);
 const {estimateCloud,checkPermission,decodeBytes}=await import('../src/technologyModels.js');expect(estimateCloud(4,10,0.2,10)).toEqual({cost:8,pool:40});expect(estimateCloud(1,0,0,0)).toEqual({cost:0,pool:0});
 for(const inputs of [[0,10,0.2,10],[1.5,10,0.2,10],[4,-1,0.2,10],[4,745,0.2,10],[4,10,-0.2,10],[4,10,0.2,1.5],['',10,0.2,10],[4,Infinity,0.2,10]])expect(estimateCloud(...inputs).error).toBeTruthy();
 for(const identity of ['guest','owner','other','admin'])for(const action of ['read','change'])for(const visibility of ['private','public'])expect(checkPermission(identity,action,visibility).allowed).toBe(identity==='owner'||identity==='admin'||(action==='read'&&visibility==='public'));
 expect(checkPermission('unknown','read','private').error).toBeTruthy();expect(checkPermission('owner','delete','private').error).toBeTruthy();
 expect(decodeBytes('FF')).toMatchObject({width:8,signedBig:-1,signedLittle:-1});expect(decodeBytes('80 00')).toMatchObject({signedBig:-32768,signedLittle:128});expect(decodeBytes('FF FF FF FF')).toMatchObject({signedBig:-1,signedLittle:-1});expect(decodeBytes('7F')).toMatchObject({signedBig:127});
});

test('expanded technology labs keep permissions costs and signed bytes readable and current',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.getByRole('button',{name:'Cloud',exact:true}).click();await page.getByText('Cloud-Labor: Instanzen, Kosten und Verbindungen',{exact:true}).click();const cloud=page.getByRole('region',{name:'Cloud-Labor',exact:true});await expect(cloud.getByLabel('Cloud-Ergebnis')).toContainText('8,00');await expect(cloud.getByLabel('Cloud-Ergebnis')).toContainText('40');await cloud.getByLabel('Instanzen',{exact:true}).fill('8');await expect(cloud.getByLabel('Cloud-Ergebnis')).toContainText('16,00');await expect(cloud.getByLabel('Cloud-Ergebnis')).toContainText('80');await cloud.getByLabel('Stunden je Instanz').fill('');await expect(cloud.getByRole('alert')).toBeVisible();await expect(cloud.getByLabel('Cloud-Ergebnis')).toHaveCount(0);await cloud.getByLabel('Stunden je Instanz').fill('10');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:960});await cloud.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(width===390)await page.screenshot({path:'/tmp/codeklar-cloud-expanded-390.png',animations:'disabled'});}
 await page.setViewportSize({width:1505,height:1045});await page.getByRole('button',{name:'Cybersecurity',exact:true}).click();await page.getByText('Rechte-Labor: Anmeldung ist nicht Berechtigung',{exact:true}).click();const rights=page.getByRole('region',{name:'Rechte-Labor',exact:true});await expect(rights.getByLabel('Rechte-Ergebnis')).toContainText('Verweigert');await rights.getByLabel('Dokument im Modell').selectOption('public');await expect(rights.getByLabel('Rechte-Ergebnis')).toContainText('Erlaubt');await rights.getByLabel('Aktion im Modell').selectOption('change');await expect(rights.getByLabel('Rechte-Ergebnis')).toContainText('Verweigert');await rights.getByLabel('Rolle im Modell').selectOption('owner');await expect(rights.getByLabel('Rechte-Ergebnis')).toContainText('Erlaubt');
 await page.setViewportSize({width:320,height:960});await rights.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize({width:1505,height:1045});await page.getByRole('button',{name:'Reverse Engineering',exact:true}).click();await page.getByText('Byte-Labor: Reihenfolge und Text vergleichen',{exact:true}).click();await page.getByLabel('Bytes in Hex').fill('FF');await page.getByText('Dieselben Bytes mit Vorzeichen deuten',{exact:true}).click();await expect(page.getByLabel('Vorzeichen-Ergebnis')).toContainText('-1');await page.getByLabel('Bytes in Hex').fill('80 00');await expect(page.getByLabel('Vorzeichen-Ergebnis')).toContainText('-32.768');await expect(page.getByLabel('Vorzeichen-Ergebnis')).toContainText('128');expect(errors).toEqual([]);
});

test('technology reading typography stays consistent across courses widths and references',async({page})=>{
 test.setTimeout(90000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});await page.goto('/');
 for(const [name,id] of [['Networking','networking'],['Cloud','cloud'],['Cybersecurity','cybersecurity'],['Reverse Engineering','reverse']]){
  await page.setViewportSize({width:1505,height:1045});await page.getByRole('button',{name,exact:true}).click();await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await page.getByText('Genauer verstehen: Begriffe und Details',{exact:true}).click();
  for(const width of [320,390,768,1505]){
   await page.setViewportSize({width,height:960});const styles=await page.locator('.lesson-panel').evaluate(el=>['.lesson-description','.computer-reading-steps li','.reading-label','.knowledge-example p','.learning-vocabulary dd','.detail-text','.lesson-note'].map(selector=>{const css=getComputedStyle(el.querySelector(selector));return {selector,size:css.fontSize,line:css.lineHeight};}));
   for(const style of styles){expect(style.size,`${id} ${width} ${style.selector}`).toBe('16px');expect(style.line).toBe('28px');}
   expect(await page.locator('.lesson-panel .lesson-description').count()).toBe(1);await expect(page.locator('.lesson-panel .syntax-parts')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.getByText('Genauer verstehen: Begriffe und Details',{exact:true}).click();await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await page.setViewportSize({width:390,height:960});await page.locator('.lesson-panel').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-80));await page.screenshot({path:`/tmp/codeklar-reading-${id}-390.png`,animations:'disabled'});
 }
 await page.setViewportSize({width:1505,height:1045});await page.getByRole('button',{name:'Cloud',exact:true}).click();await page.getByText('Cloud-Labor: Instanzen, Kosten und Verbindungen',{exact:true}).click();const lab=page.getByRole('region',{name:'Cloud-Labor',exact:true});await expect(lab.getByLabel('Cloud-Ergebnis')).toContainText('8,00');const labFont=await lab.getByLabel('Instanzen',{exact:true}).evaluate(el=>getComputedStyle(el).fontSize);expect(labFont).toBe('16px');await page.locator('.lesson-panel').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-80));await page.screenshot({path:'/tmp/codeklar-reading-cloud-1505.png',animations:'disabled'});
 await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('networking');await page.getByLabel('Zum Beispiel map, === oder Python …').fill('Netzwerke übertragen');await expect(page.locator('.technology-reference .knowledge-example')).toBeVisible();expect(await page.locator('.technology-reference .knowledge-example p').evaluate(el=>getComputedStyle(el).fontSize)).toBe('16px');
 await page.getByLabel('Lernbereich filtern').selectOption('cybersecurity');await page.getByLabel('Zum Beispiel map, === oder Python …').fill('Daten und SQL');await expect(page.locator('.technology-reference pre')).toBeVisible();expect(await page.locator('.technology-reference pre').evaluate(el=>getComputedStyle(el).fontFamily)).toContain('Mono');
 await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('further technology examples keep arithmetic and lesson identities correct',async()=>{
 const data=await import('../src/technologyFurtherLessons.js');const all=[...data.networkingFurtherLessons,...data.cloudFurtherLessons,...data.cybersecurityFurtherLessons,...data.reverseEngineeringFurtherLessons];expect(all).toHaveLength(40);expect(new Set(all.map(x=>x.id)).size).toBe(40);
 const answer=id=>{const lesson=all.find(x=>x.id===id);return lesson.options[lesson.answer];};expect(answer('reverse-varint')).toBe(String((0xac&0x7f)+2*128));expect(answer('reverse-array-stride')).toBe(String(16+3*8));expect(answer('reverse-trace-table')).toBe(String((2+3)*2));expect(answer('reverse-integer-overflow')).toBe(String((255+1)%256));
 expect(answer('networking-private-addresses')).toContain('172.31.255.255');expect(answer('networking-route-metric')).toBe('/24');expect(answer('cybersecurity-model-vs-enforcement')).toBe('Nein');
});

for(const [course,key] of [['networking','networkingCaseLessons'],['cloud','cloudCaseLessons'],['cybersecurity','cybersecurityCaseLessons'],['reverse','reverseEngineeringCaseLessons']]){
 test(`technology case studies ${course} keep reading layout and save every answer`,async({page})=>{
  test.setTimeout(90000);const items=(await import('../src/technologyCaseLessons.js'))[key];const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.setViewportSize({width:390,height:960});
  for(const [index,lesson] of items.entries()){
   await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption(course);await page.getByLabel('Aufgaben suchen …').fill(lesson.title);await page.getByRole('row').filter({hasText:lesson.title}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.locator('.knowledge-example')).toContainText(lesson.example);expect(await page.locator('.knowledge-example p').first().evaluate(el=>getComputedStyle(el).fontSize)).toBe('16px');await page.getByText('Begriffe einfach erklärt',{exact:true}).click();await expect(page.locator('.learning-vocabulary dd')).toHaveCount(lesson.terms.length);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await expect(page.locator('.quiz .tool-badge')).toContainText('Vertiefung');
   if(index===0){await page.getByRole('radio',{name:lesson.options[(lesson.answer+1)%3],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toHaveCount(0);}
   await page.getByRole('radio',{name:lesson.options[lesson.answer],exact:true}).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.getByText('Richtig! Gut verstanden.',{exact:true})).toBeVisible();
  }
  await page.reload();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')));for(const lesson of items)expect(saved.solved[lesson.id]).toBeTruthy();expect(errors).toEqual([]);
 });
}

test('technology case arithmetic and existing lesson identities stay valid',async()=>{
 const data=await import('../src/technologyCaseLessons.js');const all=[...data.networkingCaseLessons,...data.cloudCaseLessons,...data.cybersecurityCaseLessons,...data.reverseEngineeringCaseLessons];expect(all).toHaveLength(40);expect(new Set(all.map(x=>x.id)).size).toBe(40);
 const answer=id=>{const lesson=all.find(x=>x.id===id);return lesson.options[lesson.answer];};expect(answer('networking-round-trip')).toBe(`${4*50} ms`);expect(answer('networking-subnet-23')).toBe(String(2**(32-23)));expect(answer('reverse-count-buffer')).toBe(String(5*4-(20-4)));expect(answer('reverse-header-offset')).toBe(String(0x03+0x00*256));expect(answer('reverse-rva-mapping')).toBe(`0x${(0x400+0x1020-0x1000).toString(16)}`);expect(answer('reverse-flags-value')).toBe(String(0xa3>>4));
 const {comparePrefix}=await import('../src/technologyModels.js');expect(comparePrefix('198.51.100.70','198.51.101.255',23)).toMatchObject({start:'198.51.100.0',end:'198.51.101.255',count:512,same:true});
 const baseModules=[['networkingLessons','networkingLessons'],['cloudLessons','cloudLessons'],['cybersecurityLessons','cybersecurityLessons'],['reverseEngineeringLessons','reverseEngineeringLessons']];for(const [file,key] of baseModules){const items=(await import(`../src/${file}.js`))[key];expect(items).toHaveLength(47);expect(new Set(items.map(x=>x.id)).size).toBe(47);for(const lesson of all.filter(x=>x.course===items[0].course))expect(items.find(x=>x.id===lesson.id)).toBeTruthy();}
});

test('mobile lesson switcher combines arrows with an accessible modal lesson list',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});
 await page.addInitScript(()=>localStorage.setItem('codeklar-accent-v1','green'));await page.setViewportSize({width:390,height:844});await page.goto('/');
 const switcher=page.getByLabel('Lektionswechsel',{exact:true}),trigger=page.getByRole('button',{name:'Lektion wählen',exact:true});await expect(switcher).toContainText('.map()');await expect(switcher).toContainText(`2 von ${lessons.filter(x=>x.course==='js'&&x.category==='Arrays').length}`);await expect(page.locator('.desktop-lesson-picker')).not.toBeVisible();
 await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await switcher.getByRole('button',{name:'Nächste Lektion im Thema',exact:true}).click();await expect(page.getByRole('heading',{name:'Elemente auswählen mit .filter()',exact:true})).toBeVisible();await expect(page.getByRole('tab',{name:'Erklärung',exact:true})).toHaveAttribute('aria-selected','true');await expect(switcher.getByRole('button',{name:'Nächste Lektion im Thema',exact:true})).toBeEnabled();
 await switcher.getByRole('button',{name:'Vorherige Lektion im Thema',exact:true}).click();await expect(switcher).toContainText('.map()');await trigger.scrollIntoViewIfNeeded();const position=await page.evaluate(()=>scrollY);
 await trigger.click();const dialog=page.getByRole('dialog',{name:'Lektion wählen',exact:true});await expect(dialog).toBeVisible();await expect(dialog.locator('.lesson-sheet-row[aria-current="step"]')).toContainText('.map()');await expect(dialog.locator('.lesson-sheet-row')).toHaveCount(lessons.filter(x=>x.course==='js'&&x.category==='Arrays').length);await expect(dialog.locator('[aria-current="step"]')).toBeFocused();expect(await page.evaluate(()=>document.body.style.overflow)).toBe('hidden');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();expect(Math.abs(await page.evaluate(()=>scrollY)-position)).toBeLessThanOrEqual(2);expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
 await trigger.click();await dialog.getByRole('button',{name:/^\.push\(\)/}).click();await expect(dialog).not.toBeVisible();await expect(switcher).toContainText(`1 von ${lessons.filter(x=>x.course==='js'&&x.category==='Arrays').length}`);await expect(switcher.getByRole('button',{name:'Vorherige Lektion im Thema',exact:true})).toBeDisabled();
 await trigger.click();await dialog.getByRole('button',{name:'Lektionsliste schließen',exact:true}).click();await expect(trigger).toBeFocused();await trigger.click();await page.mouse.click(8,8);await expect(dialog).not.toBeVisible();await trigger.click();const grip=await dialog.locator('.lesson-sheet-grip').boundingBox();await page.mouse.move(grip.x+grip.width/2,grip.y+grip.height/2);await page.mouse.down();await page.mouse.move(grip.x+grip.width/2,grip.y+grip.height/2+80);await page.mouse.up();await expect(dialog).not.toBeVisible();
 await page.reload();await expect(switcher).toContainText('.map()');expect(await page.locator('html').getAttribute('data-accent')).toBe('green');
 await page.setViewportSize({width:1505,height:1045});await expect(switcher).not.toBeVisible();await expect(page.locator('.desktop-lesson-picker')).toBeVisible();await page.locator('.desktop-lesson-picker').getByRole('button',{name:'.map()',exact:true}).click();await expect(page.getByRole('heading',{name:'Arrays verändern mit .map()',exact:true})).toBeVisible();
 await page.setViewportSize({width:390,height:844});await trigger.click();await page.setViewportSize({width:1505,height:1045});await expect(dialog).not.toBeVisible();expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('mobile lesson list wraps long names and scrolls within all course themes',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Reverse Engineering',exact:true}).click();await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();const dialog=page.getByRole('dialog',{name:'Lektion wählen',exact:true});const active=dialog.locator('[aria-current="step"]');await expect(active).toContainText('Reverse Engineering: Verhalten aus vorhandenen Artefakten verstehen');
 for(const width of [320,390,768]){await page.setViewportSize({width,height:844});if(width===768){await expect(dialog).not.toBeVisible();continue;}expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(await active.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();const list=dialog.locator('.lesson-sheet-list');expect(await list.evaluate(el=>el.scrollHeight>el.clientHeight)).toBe(true);const last=dialog.locator('.lesson-sheet-row').last();const lastName=await last.locator('.lesson-sheet-name').innerText();await last.scrollIntoViewIfNeeded();await expect(dialog.getByRole('heading',{name:'Lektion wählen',exact:true})).toBeInViewport();await last.click();await expect(dialog).not.toBeVisible();await expect(page.locator('.lesson-current-name')).toContainText(lastName);await expect(page.getByRole('button',{name:'Nächste Lektion im Thema',exact:true})).toBeDisabled();await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();await expect(dialog.locator('[aria-current="step"]')).toBeInViewport();await page.keyboard.press('Escape');
});

test('selected lesson switcher design renders in open and closed mobile states',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('codeklar-accent-v1','green'));await page.setViewportSize({width:390,height:844});await page.goto('/');await page.locator('.lesson-navigator').evaluate(el=>window.scrollTo(0,el.getBoundingClientRect().top+scrollY-140));await page.screenshot({path:'/tmp/codeklar-lesson-switcher-closed-390.png',animations:'disabled'});await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();await page.screenshot({path:'/tmp/codeklar-lesson-switcher-open-390.png',animations:'disabled'});await expect(page.getByRole('dialog',{name:'Lektion wählen',exact:true})).toBeVisible();await page.keyboard.press('Escape');await page.setViewportSize({width:320,height:844});await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'/tmp/codeklar-lesson-switcher-open-320.png',animations:'disabled'});
});

test('computer lesson sheet reserves visible list space on mobile and short screens',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('codeklar-accent-v1','green'));
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
 const trigger=page.getByRole('button',{name:'Lektion wählen',exact:true}),dialog=page.getByRole('dialog',{name:'Lektion wählen',exact:true});
 for(const viewport of [{width:390,height:844},{width:320,height:568},{width:667,height:375}]){
  await page.setViewportSize(viewport);await trigger.click();
  const list=dialog.locator('.lesson-sheet-list');
  expect(await list.evaluate(el=>el.clientHeight)).toBeGreaterThan(110);
  await expect(dialog.getByRole('heading',{name:'Lektion wählen',exact:true})).toBeInViewport();
  await expect(dialog.locator('.lesson-sheet-row').first()).toBeInViewport({ratio:1});
  expect(await dialog.evaluate(el=>el.scrollTop)).toBe(0);
  const last=dialog.locator('.lesson-sheet-row').last();await list.evaluate(el=>{el.scrollTop=el.scrollHeight;});await last.click();
  await trigger.click();await expect(dialog.locator('[aria-current="step"]')).toBeInViewport({ratio:1});
  expect(await dialog.evaluate(el=>el.scrollTop)).toBe(0);
  await expect(dialog.getByRole('heading',{name:'Lektion wählen',exact:true})).toBeInViewport();
  if(viewport.width===390)await page.screenshot({path:'/tmp/codeklar-computer-list-fixed.png',animations:'disabled'});
  await list.evaluate(el=>{el.scrollTop=0;});await dialog.locator('.lesson-sheet-row').first().click();
 }
});


test('mobile topic field opens the selected bottom-sheet design and keeps lessons separate',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))errors.push(m.text());});
 await page.addInitScript(()=>localStorage.setItem('codeklar-accent-v1','green'));
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Computer verstehen',exact:true}).click();
 const trigger=page.getByRole('button',{name:'Thema wählen',exact:true}),dialog=page.getByRole('dialog',{name:'Thema wählen',exact:true});
 await expect(page.locator('.topic-tabs')).not.toBeVisible();await expect(trigger).toContainText('Bits & Bytes');
 await trigger.focus();await page.keyboard.press('Enter');await expect(dialog).toBeVisible();await expect(dialog.getByRole('button',{name:'Bits & Bytes',exact:true})).toBeFocused();await expect(dialog.getByRole('button',{name:'Bits & Bytes',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect(dialog.locator('.topic-selector-row')).toHaveCount(5);await page.keyboard.press('Escape');await expect(trigger).toBeFocused();expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
 await page.locator('.topic-group-select').evaluate(el=>scrollTo(0,el.getBoundingClientRect().top+scrollY-170));await page.screenshot({path:'/tmp/codeklar-topic-field-closed-390.png',animations:'disabled'});
 await trigger.click();await page.screenshot({path:'/tmp/codeklar-topic-sheet-open-390.png',animations:'disabled'});await dialog.getByRole('button',{name:'Zahlensysteme',exact:true}).click();await expect(dialog).not.toBeVisible();await expect(trigger).toContainText('Zahlensysteme');
 await page.getByRole('button',{name:'Nächste Lektion im Thema',exact:true}).click();await expect(trigger).toContainText('Zahlensysteme');await page.getByRole('button',{name:'Lektion wählen',exact:true}).click();await expect(page.getByRole('dialog',{name:'Lektion wählen',exact:true})).toBeVisible();await page.keyboard.press('Escape');
 for(const viewport of [{width:320,height:568},{width:390,height:844},{width:667,height:375}]){
  await page.setViewportSize(viewport);await trigger.click();const list=dialog.locator('.topic-selector-list');expect(await list.evaluate(el=>el.clientHeight)).toBeGreaterThan(110);expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await list.evaluate(el=>{el.scrollTop=el.scrollHeight;});await dialog.locator('.topic-selector-row').last().click();await trigger.click();await expect(dialog.locator('[aria-pressed="true"]')).toBeInViewport({ratio:1});await expect(dialog.getByRole('heading',{name:'Thema wählen',exact:true})).toBeInViewport();expect(await dialog.evaluate(el=>el.scrollTop)).toBe(0);await dialog.getByRole('button',{name:'Themenliste schließen',exact:true}).click();
 }
 await page.setViewportSize({width:390,height:844});await trigger.click();await page.mouse.click(8,8);await expect(dialog).not.toBeVisible();
 await trigger.click();await page.setViewportSize({width:1505,height:1045});await expect(dialog).not.toBeVisible();await expect(trigger).not.toBeVisible();await expect(page.locator('.topic-tabs')).toBeVisible();expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');await page.locator('.topic-tabs').getByRole('button',{name:'Text & Dateien',exact:true}).click();
 await page.setViewportSize({width:390,height:844});await expect(trigger).toContainText('Text & Dateien');await page.getByLabel('Hauptbereich',{exact:true}).selectOption('execution');await trigger.click();await expect(dialog.locator('.topic-selector-row')).toHaveCount(2);await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Reverse Engineering',exact:true}).click();await trigger.click();await dialog.locator('.topic-selector-row').last().click();await trigger.click();await expect(dialog.locator('[aria-pressed="true"]')).toHaveCount(1);await page.keyboard.press('Escape');
 await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');expect(await page.locator('vite-error-overlay').count()).toBe(0);expect(errors).toEqual([]);
});

test('Java curriculum preserves old progress IDs and puts every lesson in a chapter',async()=>{
 const {javaLessonPack}=await import('../src/javaLessons.js');const {javaProjects}=await import('../src/javaProjects.js');
 expect(javaLessonPack).toHaveLength(348);expect(javaLessons).toHaveLength(349);expect(lessons.filter(x=>x.id==='java-equals')).toHaveLength(1);expect(javaLessons[0].id).toBe('java-hello');
 expect(new Set(lessons.map(x=>x.id)).size).toBe(lessons.length);
 const groups=groupTopics('java',javaLessons);expect(groups).toHaveLength(6);expect(groups.some(x=>x.id==='more')).toBe(false);expect(groups.flatMap(x=>x.lessons.map(l=>l.id)).sort()).toEqual(javaLessons.map(x=>x.id).sort());
 for(const lesson of javaLessonPack){expect(lesson.guide[1]).toHaveLength(3);expect(lesson.example).toContain('public static void main');expect(lesson.options[lesson.answer]).toBe(lesson.expectedOutput);expect(new Set(lesson.options).size).toBe(3);expect(lesson.explanation.length).toBeGreaterThan(50);}
 expect(javaProjects).toHaveLength(14);for(const p of javaProjects){for(const id of p.lessonIds)expect(javaLessons.find(x=>x.id===id)).toBeTruthy();expect(p.files[Object.keys(p.files)[0]]).toContain('static void tests()');}
});

test('all Java lessons render and grade real output questions with persistent progress',async({page})=>{
 test.setTimeout(300000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await page.goto('/');await page.getByRole('button',{name:'Java',exact:true}).click();let category;
 for(const [index,lesson] of javaLessons.entries()){
  if(category!==lesson.category){const group=groupTopics('java',javaLessons).find(g=>g.categories.includes(lesson.category));await page.getByLabel('Hauptbereich',{exact:true}).selectOption(group.id);await page.locator('.topic-tabs').getByRole('button',{name:lesson.category,exact:true}).click();category=lesson.category;}
  await page.locator('.desktop-lesson-picker').getByRole('button',{name:lesson.name,exact:true}).click();await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();
  await expect(page.locator('.learning-page')).toHaveAttribute('data-course','java');await expect(page.getByRole('heading',{name:lesson.title,exact:true})).toBeVisible();
  if(index===0){await page.getByRole('radio').nth((lesson.answer+1)%3).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Noch nicht ganz');}
  await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');
  if(lesson.guide){await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.locator('.syntax-strip').first()).toContainText('public class Main');}
 }
 await expect(page.getByText(`${javaLessons.length} von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();await page.reload();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByText(`${javaLessons.length} von ${javaLessons.length} Aufgaben gelöst`,{exact:true})).toBeVisible();expect(errors).toEqual([]);
});

test('Java mobile chapters, multiline answers and reference search remain readable',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('codeklar-accent-v1','green'));await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Navigation öffnen',exact:true}).click();await page.getByRole('button',{name:'Java',exact:true}).click();await expect(page.getByRole('heading',{name:'Java verstehen und eigene Programme bauen.',exact:true})).toBeVisible();await expect(page.getByLabel('Hauptbereich').locator('option')).toHaveCount(6);
 await page.getByRole('button',{name:'Nächste Lektion im Thema',exact:true}).click();await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await expect(page.locator('.java-quiz-output').first()).toHaveCSS('white-space','pre-wrap');
 await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-java-mobile.png',animations:'disabled'});
 for(const viewport of [{width:320,height:568},{width:390,height:844},{width:1505,height:1045}]){await page.setViewportSize(viewport);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.getByLabel('Hauptbereich',{exact:true}).selectOption('io');await page.getByRole('button',{name:'Thema wählen',exact:true}).click();await page.getByRole('dialog',{name:'Thema wählen',exact:true}).getByRole('button',{name:'Dateien & Pfade',exact:true}).click();await expect(page.locator('.lesson-current-name')).toContainText('Path.resolve()');
 await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('textbox').fill('Stream.filter');await expect(page.locator('.reference-entry')).toHaveCount(1);await expect(page.locator('.reference-entry')).toContainText('filter');
});

test('Java projects download complete source and link back to their own lessons',async({page})=>{
 const {javaProjects}=await import('../src/javaProjects.js');const {unzipSync,strFromU8}=await import('fflate');await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:/Projektideen für alle Lernbereiche/}).click();await page.getByLabel('Lernbereich',{exact:true}).selectOption('java');await expect(page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button')).toHaveCount(15);
 for(const project of javaProjects){await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').filter({hasText:project.title}).click();const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Projekt als ZIP herunterladen',exact:true}).click();const download=await pending;const files=unzipSync(await readFile(await download.path()));for(const [name,code] of Object.entries(project.files))expect(strFromU8(files[name])).toBe(code);expect(strFromU8(files['README.md'])).toContain('JDK ab Version 17');}
 await page.getByRole('region',{name:'Passende Übungen'}).getByRole('button').first().click();await expect(page.locator('.learning-page')).toHaveAttribute('data-course','java');await expect(page.getByRole('tab',{name:'Aufgabe',exact:true})).toHaveAttribute('aria-selected','true');
});

test('Java method contracts and independent exercises stay collapsed and readable on mobile',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('codeklar-accent-v1','green'));await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText('removeIf(): gezielt löschen',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
 const api=page.locator('.java-api-help'),practice=page.locator('.java-self-practice');await expect(api).not.toHaveAttribute('open','');await expect(practice).not.toHaveAttribute('open','');await expect(page.getByText('Wofür brauche ich das?',{exact:true})).toBeVisible();
 await api.locator('summary').click();await expect(api).toContainText('true bedeutet entfernen');await expect(api).toContainText('boolean: ob Elemente entfernt wurden.');await expect(api).toContainText('Verändert die Collection.');
 await practice.locator('summary').first().click();await expect(practice).toContainText('Entferne negative Werte');await practice.getByText('Hinweis zur Übung',{exact:true}).click();await expect(practice).toContainText('kleiner als null');await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').first()).toContainText('public class Main');await expect(practice.locator('.syntax-strip').last()).toHaveText('[0, 4]');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await api.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-java-method-help.png',animations:'disabled'});
 await page.getByRole('button',{name:'Nächste Lektion im Thema',exact:true}).click();await expect(page.locator('.java-api-help')).not.toHaveAttribute('open','');
 await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('textbox').fill('Pattern.quote');await expect(page.locator('.reference-entry')).toHaveCount(1);const ref=page.locator('.reference-entry');await ref.locator('.java-api-help summary').click();await expect(ref).toContainText('Text, der im Regex wörtlich gesucht werden soll.');await expect(ref.locator('.java-self-practice')).toHaveCount(0);await ref.getByRole('button',{name:'Pattern.quote(): Benutzertext wörtlich lernen',exact:true}).click();await expect(page.getByRole('heading',{name:'Pattern.quote(): Benutzertext wörtlich',exact:true})).toBeVisible();
});

test('new Java teaching material includes complete contracts, applications and twelve local solutions',async()=>{
 const {default:rows}=await import('../src/javaFurtherCurriculum.json',{with:{type:'json'}});expect(rows).toHaveLength(60);expect(rows.filter(x=>x.practice)).toHaveLength(12);
 for(const row of rows){expect(row.steps).toHaveLength(3);expect(row.methodProfile.signature.length).toBeGreaterThan(5);expect(row.methodProfile.returns.length).toBeGreaterThan(10);expect(row.methodProfile.effect.length).toBeGreaterThan(10);expect(row.useCase.length).toBeGreaterThan(20);expect(row.pitfall.length).toBeGreaterThan(30);expect(row.choices[0]).toBe(row.output);expect(new Set(row.choices).size).toBe(3);}
 const {javaLessonPack}=await import('../src/javaLessons.js');expect(javaLessonPack.filter(x=>x.methodProfile)).toHaveLength(234);for(const lesson of javaLessonPack.filter(x=>x.practice)){expect(lesson.practice.example).toContain('public static void main');expect(lesson.practice.hint.length).toBeGreaterThan(20);}
});

test('next Java lessons preserve prior answers and supply twelve tested advanced exercises',async()=>{
 const {default:rows}=await import('../src/javaNextCurriculum.json',{with:{type:'json'}});const {default:old}=await import('../src/javaCurriculum.json',{with:{type:'json'}});const {javaLessonPack}=await import('../src/javaLessons.js');
 expect(rows).toHaveLength(40);expect(rows.filter(x=>x.practice)).toHaveLength(12);for(const row of rows){const lesson=javaLessonPack.find(x=>x.id==='java-'+row.id);expect(lesson.difficulty).toBe('Vertiefung');expect(lesson.methodProfile.signature).toBe(row.methodProfile.signature);expect(row.steps).toHaveLength(3);expect(new Set(row.choices).size).toBe(3);expect(row.pitfall.length).toBeGreaterThan(30);}
 for(const [index,row] of old.entries()){const lesson=javaLessonPack.find(x=>x.id==='java-'+row.id);expect(lesson.answer).toBe(index%3);expect(lesson.expectedOutput).toBe(row.output);}
 expect(javaLessonPack.filter(x=>x.practice)).toHaveLength(94);
});

test('Java route and dependency tutorials retain readable help and challenge solutions',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText('Topologische Ordnung für Abhängigkeiten',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.locator('.difficulty')).toContainText('Vertiefung');
 const practice=page.locator('.java-self-practice');await practice.locator('summary').first().click();await expect(practice).toContainText('Erkenne einen Zyklus');await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').last()).toHaveText('Zyklus');
 for(const width of [320,390,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await practice.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-java-dependencies-mobile.png',animations:'disabled'});
});

test('Java data formats provide thirty lessons and ten local solutions without changing prior answers',async()=>{
 const {default:rows}=await import('../src/javaDataCurriculum.json',{with:{type:'json'}});
 const {javaLessonPack}=await import('../src/javaLessons.js');
 expect(rows).toHaveLength(30);expect(rows.filter(x=>x.practice)).toHaveLength(10);
 for(const row of rows){const lesson=javaLessonPack.find(x=>x.id==='java-'+row.id);expect(lesson.example).toContain('public class Main');expect(row.steps).toHaveLength(3);expect(row.methodProfile.returns.length).toBeGreaterThan(10);expect(row.pitfall.length).toBeGreaterThan(30);expect(lesson.options[lesson.answer]).toBe(row.output);}
 const groups=groupTopics('java',javaLessons);expect(groups).toHaveLength(6);expect(groups.find(x=>x.id==='io').lessons.some(x=>x.id==='java-utf8-strict')).toBe(true);
});

test('Java data format tutorials remain readable on mobile and expose local exercises on demand',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');
 const lesson=javaLessons.find(x=>x.id==='java-base64-roundtrip');
 await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
 await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);const practice=page.locator('.java-self-practice');await expect(practice).not.toHaveAttribute('open','');
 await practice.locator('summary').first().click();await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').first()).toContainText('import java.util.Base64');await expect(practice.locator('.syntax-strip').last()).toHaveText('T0s=\nOK');
 const api=page.locator('.java-api-help');await api.locator('summary').click();await expect(api).toContainText(lesson.methodProfile.returns);
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await practice.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-java-data-mobile.png',fullPage:true});
});

test('idea to code walks through data, logic and programs, persists self-assessment and opens the right project',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Von der Idee zum Code →',exact:true}).click();await expect(page.getByRole('heading',{name:'Von der Idee zum Code.',exact:true})).toBeVisible();await expect(page.getByRole('navigation',{name:'Schnellnavigation'}).getByRole('button',{name:'Übungen',exact:true})).toHaveAttribute('aria-current','page');
 await expect(page.getByLabel('Was möchtest du bauen?').locator('option')).toHaveCount(12);await expect(page.locator('vite-error-overlay')).toHaveCount(0);await page.screenshot({path:'/tmp/codeklar-ideas-mobile.png'});
 await page.getByRole('button',{name:'Etappe verstanden',exact:true}).click();await page.getByRole('button',{name:'Weiter',exact:true}).click();await expect(page.getByRole('heading',{name:'Daten darstellen',exact:true})).toBeVisible();await expect(page.locator('.idea-fields')).toContainText('punkte');await expect(page.locator('.idea-fields')).toContainText('int');await page.screenshot({path:'/tmp/codeklar-ideas-data-mobile.png'});
 await page.getByRole('button',{name:'Weiter',exact:true}).click();await expect(page.getByLabel('Pseudocode')).toContainText('punkte = punkte + trefferWert');
 await page.getByLabel('Etappe',{exact:true}).selectOption('3');await page.getByText('Welcher Code setzt welchen Schritt um?',{exact:true}).click();await expect(page.locator('.idea-connections')).toContainText('Die Zuweisung speichert sie als aktuellen Stand');await page.getByLabel('Etappe',{exact:true}).selectOption('5');await page.getByLabel('Dein Ansatz',{exact:true}).fill('Ich addiere 25 zum bisherigen Stand.');await expect(page.getByText('Nach dem ersten Treffer sind es 10 Punkte.',{exact:false})).not.toBeVisible();await page.getByText('Ansatz zum Vergleichen',{exact:true}).click();await expect(page.getByText(/Math.addExact\(punkte, 25\) ergibt 35/)).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Von der Idee zum Code →',exact:true}).click();await expect(page.getByLabel('Dein Ansatz',{exact:true})).toHaveValue('Ich addiere 25 zum bisherigen Stand.');await expect(page.getByText('1 von 6 Etappen markiert',{exact:true})).toBeVisible();
 await page.getByLabel('Was möchtest du bauen?').selectOption('transfer');await page.getByLabel('Etappe',{exact:true}).selectOption('3');await expect(page.getByLabel('Vollständiges Java-Beispiel')).toContainText('client.send');await expect(page.getByText(/127.0.0.1 meint deinen eigenen Rechner/)).toBeVisible();
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.getByRole('button',{name:'Passendes vollständiges Projekt öffnen →',exact:true}).click();await expect(page.getByRole('heading',{name:'Java: Kleine HTTP-API',exact:true})).toBeVisible();await expect(page.getByLabel('Quellcode Api.java')).toContainText('HttpServer');expect(errors).toEqual([]);
});

test('idea to code worksheets keep drafts, export exact text and handle unavailable storage',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Idee → Code',exact:true}).click();await page.getByRole('button',{name:'Meine eigene Idee zerlegen',exact:true}).click();await page.getByLabel('Was soll jemand damit tun können?',{exact:true}).fill('Ich baue einen Chat.');await page.getByLabel('Welche Daten brauchst du?',{exact:true}).fill('Text, Absender und Zeitpunkt.');
 await page.screenshot({path:'/tmp/codeklar-ideas-plan-desktop.png'});const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Bauplan herunterladen',exact:true}).click();const download=await downloadPromise;const text=await readFile(await download.path(),'utf8');expect(text).toContain('Ich baue einen Chat.');expect(text).toContain('Text, Absender und Zeitpunkt.');expect(text).toContain('(noch offen)');
 await page.reload();await page.getByRole('button',{name:'Idee → Code',exact:true}).click();await expect(page.getByLabel('Was soll jemand damit tun können?',{exact:true})).toHaveValue('Ich baue einen Chat.');await expect(page.getByLabel('Welche Daten brauchst du?',{exact:true})).toHaveValue('Text, Absender und Zeitpunkt.');
 await page.getByRole('button',{name:'An einem Beispiel lernen',exact:true}).click();await page.getByLabel('Etappe',{exact:true}).selectOption('3');const zipPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Beispiel als ZIP herunterladen',exact:true}).click();const zip=await zipPromise;const {unzipSync,strFromU8}=await import('fflate');const files=unzipSync(await readFile(await zip.path()));expect(strFromU8(files['Main.java'])).toContain('Math.addExact');expect(strFromU8(files['README.md'])).toContain('Punkte: 10');
 await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('blocked');};});await page.reload();await page.getByRole('button',{name:'Idee → Code',exact:true}).click();await expect(page.getByText(/Speichern ist hier nicht möglich/)).toBeVisible();await page.getByRole('button',{name:'Meine eigene Idee zerlegen',exact:true}).click();await page.getByLabel('Was ist die kleinste erste Version?',{exact:true}).fill('Eine Nachricht anzeigen.');await expect(page.getByLabel('Was ist die kleinste erste Version?',{exact:true})).toHaveValue('Eine Nachricht anzeigen.');
});

test('idea to code browser view creates text from data and corrupted saved plans recover',async({page})=>{
 const {default:guides}=await import('../src/ideaGuides.json',{with:{type:'json'}});expect(guides).toHaveLength(12);for(const guide of guides){expect(guide.fields.length).toBeGreaterThan(1);expect(guide.logic).toHaveLength(3);if(guide.projectId)expect(projects.some(p=>p.id===guide.projectId)).toBe(true);}
 await page.addInitScript(()=>localStorage.setItem('codeklar-idea-code-v1','{broken'));await page.goto('/');await page.getByRole('button',{name:'Idee → Code',exact:true}).click();await expect(page.getByRole('heading',{name:'Ziel eingrenzen',exact:true})).toBeVisible();
 await page.getByLabel('Was möchtest du bauen?').selectOption('display');await page.getByLabel('Etappe',{exact:true}).selectOption('3');await page.getByText('Browseransicht als nächster Schritt',{exact:true}).click();await expect(page.getByLabel('Quellcode anzeige.html')).toContainText('zeile.textContent');
 const file=guides.find(g=>g.id==='display').files['anzeige.html'];await page.setContent(file);await expect(page.getByRole('heading',{name:'Meine Aufgaben'})).toBeVisible();await expect(page.getByRole('listitem')).toHaveText('[x] Java üben');
});

test('Java concept expansion adds forty complete tutorials and fifteen independent exercises',async()=>{
 const {default:rows}=await import('../src/javaConceptCurriculum.json',{with:{type:'json'}});const {javaLessonPack}=await import('../src/javaLessons.js');expect(rows).toHaveLength(40);expect(rows.filter(r=>r.practice)).toHaveLength(15);
 for(const row of rows){const lesson=javaLessonPack.find(l=>l.id==='java-'+row.id);expect(lesson.difficulty).toBe('Vertiefung');expect(row.steps).toHaveLength(3);expect(lesson.example).toContain('public static void main');expect(row.methodProfile.signature.length).toBeGreaterThan(5);expect(row.methodProfile.returns).toBeTruthy();expect(row.useCase.length).toBeGreaterThan(20);expect(row.pitfall.length).toBeGreaterThan(30);expect(lesson.options[lesson.answer]).toBe(row.output);expect(new Set(row.choices).size).toBe(3);}
});

test('Java generic tutorial and new idea examples expose the connection between rules and code on mobile',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');const lesson=javaLessons.find(l=>l.id==='java-wildcard-super');await page.getByRole('row').filter({has:page.getByText(lesson.title,{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.java-api-help summary').click();await expect(page.locator('.java-api-help')).toContainText('List<? super Integer>');const practice=page.locator('.java-self-practice');await practice.locator('summary').first().click();await practice.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(practice.locator('.syntax-strip').last()).toHaveText('[1]');await page.screenshot({path:'/tmp/codeklar-java-generics-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Von der Idee zum Code →',exact:true}).click();
 for(const id of ['calculator','basket','chat','undo','cache','statistics']){await page.getByLabel('Was möchtest du bauen?').selectOption(id);await page.getByLabel('Etappe',{exact:true}).selectOption('2');await expect(page.getByLabel('Pseudocode')).not.toBeEmpty();await page.getByLabel('Etappe',{exact:true}).selectOption('3');await page.getByText('Welcher Code setzt welchen Schritt um?',{exact:true}).click();await expect(page.locator('.idea-connections dt')).toHaveCount(3);await expect(page.getByLabel('Vollständiges Java-Beispiel')).toContainText('public class Main');}
 await page.getByLabel('Was möchtest du bauen?').selectOption('chat');await page.getByLabel('Etappe',{exact:true}).selectOption('3');await expect(page.getByText(/Main.java zeigt Datenmodell und Kodierung/)).toBeVisible();await page.getByRole('button',{name:'Passendes vollständiges Projekt öffnen →',exact:true}).click();await expect(page.getByRole('heading',{name:'Java: Lokalen Mini-Chat bauen',exact:true})).toBeVisible();await page.getByRole('button',{name:'index.html',exact:true}).click();await expect(page.getByLabel('Quellcode index.html')).toContainText("method: 'POST'");
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});

test('Java mini chat project really sends between browser tabs and displays message text literally',async({page,context})=>{
 test.setTimeout(60000);const {javaConceptProjects}=await import('../src/javaConceptProjects.js');const project=javaConceptProjects.find(p=>p.id==='java-mini-chat');const {mkdtemp,writeFile,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');const {spawn}=await import('node:child_process');const {once}=await import('node:events');const dir=await mkdtemp(join(tmpdir(),'codeklar-chat-ui-'));let server;
 try {
  for(const [name,source] of Object.entries(project.files))await writeFile(join(dir,name),source);
  server=spawn('java',['Chat.java','0'],{cwd:dir,stdio:['ignore','pipe','pipe']});
  const base=await new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('Chat startup timeout')),20000);server.once('error',e=>{clearTimeout(timer);reject(e);});server.once('exit',code=>{clearTimeout(timer);reject(new Error('Chat exited '+code));});server.stdout.on('data',chunk=>{output+=chunk;const match=output.match(/http:\/\/127\.0\.0\.1:\d+/);if(match){clearTimeout(timer);resolve(match[0]);}});});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await expect(page).toHaveTitle('Mini-Chat zum Lernen');await expect(page.getByRole('heading',{name:'Mini-Chat',exact:true})).toBeVisible();const receiver=await context.newPage();receiver.on('pageerror',e=>errors.push(e.message));await receiver.goto(base);
  await page.getByLabel('Name',{exact:true}).fill('Ada');await page.getByLabel('Nachricht',{exact:true}).fill('<b>Hallo</b> & Grüße');await page.getByRole('button',{name:'Senden',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Nachricht gesendet.');await expect(receiver.getByRole('list',{name:'Nachrichten'}).getByRole('listitem')).toHaveText('Ada: <b>Hallo</b> & Grüße');await expect(receiver.locator('#messages b')).toHaveCount(0);await receiver.reload();await expect(receiver.getByRole('list',{name:'Nachrichten'}).getByRole('listitem')).toHaveText('Ada: <b>Hallo</b> & Grüße');await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/codeklar-mini-chat-mobile.png'});expect(errors).toEqual([]);await receiver.close();
 } finally {if(server && server.exitCode===null && server.signalCode===null){const stopped=once(server,'exit');server.kill('SIGTERM');await stopped;}await rm(dir,{recursive:true,force:true});}
});

test('study session scheduling, retries, deadline and progress are consistent',async()=>{
 const {selectSessionLessons,createSession,chooseAnswer,checkAnswer,finishSession,cleanSession,sessionSummary,applySessionResults}=await import('../src/studySession.js');
 const pool=javaLessons.slice(0,10),known=Object.fromEntries(pool.map(l=>[l.id,l])),now=2000000000000;
 const progress={solved:{[pool[1].id]:new Date(now-86400000*10).toISOString()},attempted:{[pool[0].id]:new Date(now-1000).toISOString()},reviews:{[pool[0].id]:{lastResult:false,streak:0,attempts:1,due:new Date(now-1000).toISOString()}}};
 expect(selectSessionLessons(pool,progress,'review',5,[],now).map(l=>l.id)).toEqual([pool[0].id,pool[1].id]);expect(selectSessionLessons(pool,progress,'learn',5,[],now).map(l=>l.id)).toEqual([pool[0].id,pool[1].id,pool[2].id,pool[3].id,pool[4].id]);
 const balanced=selectSessionLessons(pool,progress,'exam',5,[{lessons:pool.slice(0,5)},{lessons:pool.slice(5)}],now,()=>0.4);expect(new Set(balanced.map(l=>l.id)).size).toBe(5);expect(balanced.some(l=>pool.slice(5).includes(l))).toBe(true);
 let s=createSession([pool[0]],'learn',5,now,()=>0.4);const right=s.items[0].order.indexOf(pool[0].answer);s=chooseAnswer(s,(right+1)%s.items[0].order.length,known,now);s=checkAnswer(s,known);expect(s.items).toHaveLength(2);expect(checkAnswer(s,known)).toBe(s);s={...s,index:1};s=chooseAnswer(s,right,known,now);s=checkAnswer(s,known);expect(s.items).toHaveLength(2);s=finishSession(s,known,now+1000);expect(sessionSummary(s)).toMatchObject({total:1,correct:0,mastered:1,retries:1});
 const previous={...progress,reviews:{[pool[0].id]:{lastResult:true,streak:4,attempts:7,due:new Date(now).toISOString()}}};const applied=applySessionResults(previous,s,known);expect(applied.reviews[pool[0].id].streak).toBe(1);expect(applied.reviews[pool[0].id].attempts).toBe(8);expect(Date.parse(applied.reviews[pool[0].id].due)).toBe(now+1000+86400000);expect(applySessionResults(applied,s,known)).toBe(applied);
 let exam=createSession(pool.slice(0,3),'exam',5,now,()=>0.5);exam=chooseAnswer(exam,exam.items[0].order.indexOf(pool[0].answer),known,now+1);const expired=chooseAnswer({...exam,index:1},0,known,now+300000);expect(expired.status).toBe('finished');expect(expired.items[1].answer).toBeNull();expect(sessionSummary(expired).correct).toBe(1);expect(cleanSession(expired,known)).toEqual(expired);expect(cleanSession({...expired,items:[{...expired.items[0],order:[0,0,0]}]},known)).toBeNull();
 const {sessionLessons}=await import('../src/sessionBank.js');const js=sessionLessons.find(l=>l.course==='js'&&Array.isArray(l.options));let jsRound=createSession([js],'exam',5,now,()=>0.4);jsRound=chooseAnswer(jsRound,jsRound.items[0].order.indexOf(js.answer),{[js.id]:js},now);jsRound=finishSession(jsRound,{[js.id]:js},now+1000);const jsProgress=applySessionResults({solved:{},attempted:{},reviews:{}},jsRound,{[js.id]:js});expect(jsProgress.solved[js.id]).toBeUndefined();expect(jsProgress.reviews[js.id].lastResult).toBe(true);
});

test('study learning round repeats errors, records once and fits mobile and desktop',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await expect(page.getByRole('heading',{name:'Lernen mit einem klaren Ablauf.',exact:true})).toBeVisible();await expect(page.locator('vite-error-overlay')).toHaveCount(0);await page.getByLabel('Lernbereich der Runde').selectOption('java');await page.getByLabel('Kapitel der Runde').selectOption('start');await page.getByLabel('Fragenzahl').selectOption('5');await page.screenshot({path:'/tmp/codeklar-study-setup-mobile.png'});await page.getByRole('button',{name:'Runde starten',exact:true}).click();
 for(let i=0;i<6;i++){
  const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);const item=s.items[s.index],lesson=javaLessons.find(l=>l.id===item.id);await expect(page.getByRole('heading',{name:lesson.title,exact:true})).toBeVisible();const right=item.order.indexOf(lesson.answer);await page.getByRole('radio').nth(i===0?(right+1)%item.order.length:right).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.study-feedback')).toContainText(i===0?'Noch nicht richtig.':'Richtig.');if(i===0){await expect(page.getByText(/Frage 1 von 6/)).toBeVisible();await page.screenshot({path:'/tmp/codeklar-study-feedback-mobile.png'});}await page.getByRole('button',{name:i===5?'Runde abschließen':'Nächste Frage',exact:true}).click();
 }
 await expect(page.getByRole('heading',{name:'Runde abgeschlossen',exact:true})).toBeVisible();await expect(page.getByText('4 von 5 auf Anhieb richtig (80 %)',{exact:true})).toBeVisible();await expect(page.getByText('5 am Ende richtig · 1 zusätzliche Wiederholungsversuche.',{exact:true})).toBeVisible();await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')).sessionReceipts.length)).toBe(1);const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')).reviews);await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await expect(page.getByRole('heading',{name:'Runde abgeschlossen',exact:true})).toBeVisible();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')).reviews)).toEqual(before);
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.screenshot({path:'/tmp/codeklar-study-result-desktop.png'});expect(errors).toEqual([]);
});

test('study exam hides solutions, resumes its deadline and scores unanswered questions at expiry',async({page})=>{
 await page.clock.install({time:new Date('2026-10-14T12:00:00Z')});await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await page.getByLabel('Lernbereich der Runde').selectOption('java');await page.getByLabel('Kapitel der Runde').selectOption('start');await page.getByLabel('Modus der Runde').selectOption('exam');await page.getByLabel('Fragenzahl').selectOption('5');await page.getByLabel('Zeitlimit').selectOption('5');await page.getByRole('button',{name:'Runde starten',exact:true}).click();
 const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session),lesson=javaLessons.find(l=>l.id===s.items[0].id);const right=s.items[0].order.indexOf(lesson.answer);await page.getByRole('radio').nth(right).click();await expect(page.getByRole('button',{name:'Antwort prüfen',exact:true})).toHaveCount(0);await expect(page.locator('.study-feedback')).toHaveCount(0);await expect(page.getByText('Richtige Antwort:',{exact:false})).toHaveCount(0);await page.clock.fastForward(60000);await page.reload();await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();expect((await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session)).deadline).toBe(s.deadline);await expect(page.getByRole('timer')).toHaveText(/^(3:[0-5][0-9]|4:00)$/);await expect(page.getByRole('radio').nth(right)).toHaveAttribute('aria-checked','true');await page.screenshot({path:'/tmp/codeklar-study-exam-mobile.png'});await page.clock.fastForward(241000);await expect(page.getByRole('heading',{name:'Prüfung ausgewertet',exact:true})).toBeVisible();await expect(page.getByText('1 von 5 auf Anhieb richtig (20 %)',{exact:true})).toBeVisible();await page.locator('.study-card details summary').first().click();await expect(page.getByText('Richtige Antwort:',{exact:false}).first()).toBeVisible();await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')).sessionReceipts.length)).toBe(1);
});

test('study review keeps language boundaries, handles empty queues and corrupted storage',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('codeklar-study-session-v1','{"version":1,"session":{"mode":"exam","items":[]},"history":[]}');localStorage.setItem('codeklar-progress-v1',JSON.stringify({solved:{},attempted:{'java-hello':new Date().toISOString(),'js-map':new Date().toISOString()},reviews:{}}));});await page.goto('/');await page.getByRole('button',{name:'Lernrunden',exact:true}).click();await page.getByLabel('Lernbereich der Runde').selectOption('java');await page.getByLabel('Modus der Runde').selectOption('review');await page.getByRole('button',{name:'Runde starten',exact:true}).click();await expect(page.getByRole('heading',{name:'main() und println()',exact:true})).toBeVisible();const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);expect(s.items.map(x=>x.id)).toEqual(['java-hello']);
 await page.getByRole('radio').nth(s.items[0].order.indexOf(javaLessons[0].answer)).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await page.getByRole('button',{name:'Runde abschließen',exact:true}).click();await page.getByRole('button',{name:'Neue Runde planen',exact:true}).click();await expect(page.getByRole('button',{name:'Runde starten',exact:true})).toBeDisabled();await expect(page.getByText(/Gerade ist nichts fällig/)).toBeVisible();await page.getByLabel('Lernbereich der Runde').selectOption('js');await expect(page.getByRole('button',{name:'Runde starten',exact:true})).toBeEnabled();
});

test('twenty additional Java practices preserve examples and support complete local solutions',async()=>{
 const {default:pack}=await import('../src/javaPracticePack.json',{with:{type:'json'}});const {javaLessonPack}=await import('../src/javaLessons.js');expect(Object.keys(pack)).toHaveLength(35);expect(javaLessonPack.filter(l=>l.practice)).toHaveLength(94);for(const id of Object.keys(pack)){const lesson=javaLessonPack.find(l=>l.id==='java-'+id);expect(lesson.practice.example).toContain('public class Main');expect(lesson.practice.output).toBe(pack[id].output);expect(lesson.practice.task.length).toBeGreaterThan(50);}
 expect(javaLessonPack.find(l=>l.id==='java-constructor').practice).toBeUndefined();expect(javaLessonPack.find(l=>l.id==='java-method').practice.example).toContain('static int sumThree');
});

test('study JavaScript questions execute as described and retain links to code exercises',async()=>{
 const {default:bank}=await import('../src/sessionQuestionBank.json',{with:{type:'json'}});const {sessionLessons}=await import('../src/sessionBank.js');const {runInNewContext}=await import('node:vm');expect(Object.keys(bank)).toHaveLength(16);
 for(const [id,question] of Object.entries(bank)){expect(lessons.some(l=>l.id===id&&l.course==='js')).toBe(true);const output=[];runInNewContext(question.example,{console:{log:(...values)=>output.push(values.map(String).join(' '))}},{timeout:1000});expect(output.join('\n')).toBe(question.options[question.answer]);expect(new Set(question.options).size).toBe(3);expect(sessionLessons.find(l=>l.id===id).answer).toBe(question.answer);}
});

test('study chapter diagnostics count each task once and preserve early review dates',async()=>{
 const {createSession,chooseAnswer,checkAnswer,finishSession,chapterResults,applySessionResults}=await import('../src/studySession.js');const known=Object.fromEntries(javaLessons.map(l=>[l.id,l]));const lesson=javaLessons[0],now=2100000000000;let s=createSession([lesson],'learn',5,now,()=>0.4);const right=s.items[0].order.indexOf(lesson.answer);s=chooseAnswer(s,(right+1)%3,known,now);s=checkAnswer(s,known);s={...s,index:1};s=chooseAnswer(s,right,known,now);s=checkAnswer(s,known);s=finishSession(s,known,now+1000);const rows=chapterResults(s,groupTopics('java',javaLessons));expect(rows).toHaveLength(1);expect(rows[0]).toMatchObject({total:1,correct:0,finalCorrect:1,failedIds:[]});
 let early=createSession([lesson],'learn',5,now,()=>0.5);early=chooseAnswer(early,early.items[0].order.indexOf(lesson.answer),known,now);early=checkAnswer(early,known);early=finishSession(early,known,now+1000);const due=new Date(now+3*86400000).toISOString();const prior={solved:{[lesson.id]:new Date(now-10000).toISOString()},attempted:{},reviews:{[lesson.id]:{lastResult:true,streak:2,attempts:4,due}}};const next=applySessionResults(prior,early,known);expect(next.reviews[lesson.id]).toEqual({lastResult:true,streak:2,attempts:5,due});expect(prior.reviews[lesson.id].attempts).toBe(4);const fixed=applySessionResults(prior,s,known);expect(fixed.reviews[lesson.id].streak).toBe(1);expect(Date.parse(fixed.reviews[lesson.id].due)).toBe(now+1000+86400000);
});

test('study result exports chapter feedback and starts only unresolved errors',async({page})=>{
 const {createSession,finishSession}=await import('../src/studySession.js');const choices=[javaLessons[0],javaLessons.find(l=>l.id==='java-stream-filter')];const known=Object.fromEntries(choices.map(l=>[l.id,l]));let round=createSession(choices,'exam',5,Date.now()-60000,()=>0.3);round.items[0].answer=round.items[0].order.indexOf(choices[0].answer);round.items[1].answer=(round.items[1].order.indexOf(choices[1].answer)+1)%3;round=finishSession(round,known,Date.now()-1000);await page.addInitScript(session=>{if(!localStorage.getItem('codeklar-study-session-v1'))localStorage.setItem('codeklar-study-session-v1',JSON.stringify({version:1,session,history:[]}));},round);
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();const diagnostic=page.getByRole('region',{name:'Kapitel-Auswertung'});await expect(diagnostic.locator('article')).toHaveCount(2);await expect(diagnostic).toContainText('1/1 auf Anhieb richtig');await expect(diagnostic).toContainText('0/1 auf Anhieb richtig');const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Auswertung herunterladen',exact:true}).click();const download=await downloadPromise;const text=await readFile(await download.path(),'utf8');expect(text).toContain('Auf Anhieb: 1/2');expect(text).toContain('Strings, Arrays & Collections');expect(text).toContain(choices[1].explanation);await page.setViewportSize({width:320,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize({width:390,height:844});await diagnostic.scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-study-chapters-mobile.png'});
 await page.getByRole('button',{name:'Alle offenen Fehler gezielt üben',exact:true}).click();await expect(page.getByRole('heading',{name:choices[1].title,exact:true})).toBeVisible();const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);expect(s.mode).toBe('review');expect(s.items.map(x=>x.id)).toEqual(['java-stream-filter']);await page.getByRole('radio').nth(s.items[0].order.indexOf(choices[1].answer)).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await page.getByRole('button',{name:'Runde abschließen',exact:true}).click();await expect(page.getByText('1 von 1 auf Anhieb richtig (100 %)',{exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Alle offenen Fehler gezielt üben',exact:true})).toHaveCount(0);await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-progress-v1')).sessionReceipts.length)).toBe(2);
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}await page.getByRole('button',{name:'Weiteres aus diesem Kapitel lernen',exact:true}).click();const next=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);expect(next.items.every(x=>javaLessons.find(l=>l.id===x.id).category && groupTopics('java',javaLessons).find(g=>g.id==='data').lessons.some(l=>l.id===x.id))).toBe(true);
});

test('combined Java practices extend local tasks while keeping prior examples',async()=>{
 const {default:pack}=await import('../src/javaPracticePack.json',{with:{type:'json'}});const {javaLessonPack}=await import('../src/javaLessons.js');expect(Object.keys(pack)).toHaveLength(35);expect(javaLessonPack.filter(l=>l.practice)).toHaveLength(94);for(const id of ['array-sort','brackets','two-sum','file-lines','file-write','record','enum','generic','comparator','grouping','bfs']){const lesson=javaLessonPack.find(l=>l.id==='java-'+id);expect(lesson.practice.example).toContain('public class Main');expect(lesson.practice.output).toBe(pack[id].output);}
});

test('Swing lessons explain packages and open the complete multi-file desktop project',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText('JButton: auf einen Klick reagieren',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
 await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);await expect(page.locator('.syntax-strip').first()).toContainText('import javax.swing.JButton;');await expect(page.locator('.java-project-help')).not.toHaveAttribute('open','');
 await page.locator('.java-api-help summary').click();await expect(page.locator('.java-api-help')).toContainText('addActionListener');await page.locator('.java-self-practice > summary').click();await page.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(page.locator('.java-self-practice .syntax-strip').last()).toHaveText('An');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.locator('.java-project-help > summary').click();await page.locator('.java-project-help').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-swing-mobile.png',animations:'disabled'});await page.getByRole('button',{name:'Fenster-Zähler als Projekt öffnen →',exact:true}).click();
 await expect(page.getByLabel('Quellcode src/de/codeklar/desktop/App.java')).toContainText('package de.codeklar.desktop;');await expect(page.getByLabel('Quellcode src/de/codeklar/desktop/App.java')).toContainText('setContentPane');await page.getByRole('button',{name:'src/de/codeklar/desktop/CounterPanel.java',exact:true}).click();await expect(page.getByLabel('Quellcode src/de/codeklar/desktop/CounterPanel.java')).toContainText('addActionListener');
 const {unzipSync,strFromU8}=await import('fflate');const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Projekt als ZIP herunterladen',exact:true}).click();const zip=unzipSync(await readFile(await (await pending).path()));expect(Object.keys(zip).filter(n=>n.endsWith('.java'))).toHaveLength(4);expect(strFromU8(zip['README.md'])).toContain('java -cp out de.codeklar.desktop.App');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText('.java, .class und der Classpath',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.lesson-panel')).toContainText('Wurzel oberhalb von de');expect(errors).toEqual([]);
});

test('Java desktop expansion covers all six areas and connects complete task and game projects',async({page})=>{
 const {default:rows}=await import('../src/javaDesktopCurriculum.json',{with:{type:'json'}});const {javaDesktopProjects}=await import('../src/javaDesktopProjects.js');expect(rows).toHaveLength(30);expect(new Set(rows.map(r=>r.category)).size).toBe(6);expect(rows.filter(r=>r.practice)).toHaveLength(4);for(const row of rows){expect(row.steps).toHaveLength(3);expect(javaDesktopProjects.some(p=>p.id===row.projectId)).toBe(true);}
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await expect(page.locator('vite-error-overlay')).toHaveCount(0);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText('Maven und pom.xml: Abhängigkeiten beschreiben',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();
 await page.locator('.java-project-help > summary').click();await expect(page.locator('.java-project-help')).toContainText('Quellcode, Startanleitung');await page.getByRole('button',{name:'Aufgabenverwaltung als Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode src/main/java/de/codeklar/tasks/App.java')).toContainText('getResourceAsStream');await page.getByRole('button',{name:'pom.xml',exact:true}).click();await expect(page.getByLabel('Quellcode pom.xml')).toContainText('maven-shade-plugin');await page.getByRole('button',{name:'build.gradle',exact:true}).click();await expect(page.getByLabel('Quellcode build.gradle')).toContainText('verifyLearning');await page.getByRole('button',{name:'ANLEITUNG.md',exact:true}).click();await expect(page.getByLabel('Quellcode ANLEITUNG.md')).toContainText('jpackage --type app-image');await expect(page.getByLabel('Quellcode ANLEITUNG.md')).toContainText('Step Into');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('java');await page.getByRole('row').filter({has:page.getByText('paintComponent: selbst zeichnen',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.setViewportSize({width:390,height:844});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-desktop-paint-mobile.png'});await page.locator('.java-project-help > summary').click();await page.getByRole('button',{name:'Pong-Labor als Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode src/de/codeklar/pong/PongApp.java')).toContainText('windowLostFocus');await page.getByRole('button',{name:'src/de/codeklar/pong/PongPanel.java',exact:true}).click();await expect(page.getByLabel('Quellcode src/de/codeklar/pong/PongPanel.java')).toContainText('paintComponent');await expect(page.getByLabel('Quellcode src/de/codeklar/pong/PongPanel.java')).toContainText('new Timer(16');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}expect(errors).toEqual([]);
});

test('Python curriculum preserves append progress and offers six structured chapters',async()=>{
 const {pythonLessonPack}=await import('../src/pythonLessons.js');const {pythonProjects}=await import('../src/pythonProjects.js');expect(pythonLessonPack).toHaveLength(144);expect(pythonLessons).toHaveLength(145);expect(pythonLessonPack.filter(l=>l.practice)).toHaveLength(44);expect(new Set(lessons.map(l=>l.id)).size).toBe(lessons.length);const old=pythonLessons.find(l=>l.id==='python-append');expect(old.answer).toBe(2);expect(old.options).toEqual(['[1, 2, 3]','3','None']);
 const groups=groupTopics('python',pythonLessons);expect(groups).toHaveLength(6);expect(groups.some(g=>g.id==='more')).toBe(false);expect(groups.flatMap(g=>g.lessons).map(l=>l.id).sort()).toEqual(pythonLessons.map(l=>l.id).sort());
 for(const l of pythonLessonPack){expect(l.guide[1]).toHaveLength(3);expect(l.options[l.answer]).toBe(l.expectedOutput);expect(new Set(l.options).size).toBe(3);expect(l.explanation.length).toBeGreaterThan(50);expect(l.methodProfile.returns).toBeTruthy();expect(pythonProjects.some(p=>p.id===l.projectId)).toBe(true);}for(const p of pythonProjects)for(const id of p.lessonIds)expect(pythonLessons.some(l=>l.id===id)).toBe(true);
});

test('all Python lessons grade, persist and retain readable multiline outputs',async({page})=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await page.getByRole('button',{name:'Python',exact:true}).click();let category;
 for(const lesson of pythonLessons){if(category!==lesson.category){const group=groupTopics('python',pythonLessons).find(g=>g.categories.includes(lesson.category));await page.getByLabel('Hauptbereich',{exact:true}).selectOption(group.id);await page.locator('.topic-tabs').getByRole('button',{name:lesson.category,exact:true}).click();category=lesson.category;}
 await page.locator('.desktop-lesson-picker').getByRole('button',{name:lesson.name,exact:true}).click();await page.getByRole('tab',{name:'Aufgabe',exact:true}).click();await page.getByRole('radio').nth(lesson.answer).click();await page.getByRole('button',{name:'Antwort prüfen',exact:true}).click();await expect(page.locator('.quiz-feedback')).toContainText('Richtig!');await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.computer-reading-steps li')).toHaveCount(3);}
 await expect(page.getByText(`145 von 145 Aufgaben gelöst`,{exact:true})).toBeVisible();await page.reload();await page.getByRole('button',{name:'Python',exact:true}).click();await expect(page.getByText(`145 von 145 Aufgaben gelöst`,{exact:true})).toBeVisible();expect(errors).toEqual([]);
});

test('Python mobile practice, reference contracts and complete project downloads work',async({page})=>{
 const {pythonProjects}=await import('../src/pythonProjects.js');const {unzipSync,strFromU8}=await import('fflate');const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('python');await page.getByRole('row').filter({has:page.getByText('json.dumps() und loads(): Daten austauschen',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.python-api-help')).not.toHaveAttribute('open','');await expect(page.locator('.python-self-practice')).not.toHaveAttribute('open','');await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-python-mobile.png'});
 await page.locator('.python-api-help > summary').click();await expect(page.locator('.python-api-help')).toContainText('loads liefert');await page.locator('.python-self-practice > summary').click();await page.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(page.locator('.python-self-practice .syntax-strip').last()).toHaveText('5');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.locator('.python-project-help > summary').click();await page.getByRole('button',{name:'Aufgabenverwaltung als Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode codeklar_tasks/__init__.py')).toContainText('Modell');await page.getByLabel('Lernbereich',{exact:true}).selectOption('python');await expect(page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button')).toHaveCount(7);
 for(const p of pythonProjects){await page.getByRole('navigation',{name:'Projektbeispiele'}).getByRole('button').filter({hasText:p.title}).click();const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Projekt als ZIP herunterladen',exact:true}).click();const zip=unzipSync(await readFile(await (await pending).path()));for(const[name,source]of Object.entries(p.files))expect(strFromU8(zip[name])).toBe(source);expect(strFromU8(zip['README.md'])).toContain('Python 3.10');}
 await page.getByRole('button',{name:'Nachschlagen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('python');await page.getByRole('textbox').fill('dict.get');await expect(page.locator('.reference-entry')).toHaveCount(1);await page.locator('.python-api-help > summary').click();await expect(page.locator('.python-api-help')).toContainText('Keine Änderung am Dictionary');await expect(page.locator('.python-self-practice')).toHaveCount(0);expect(errors).toEqual([]);
});

test('Python sessions support structured learning exams and language-specific review',async({page})=>{
 const {sessionLessons}=await import('../src/sessionBank.js');expect(sessionLessons.filter(l=>l.course==='python')).toHaveLength(145);await page.setViewportSize({width:390,height:844});await page.goto('/');await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByRole('button',{name:'Lern- & Prüfungsmodus →',exact:true}).click();await page.getByLabel('Lernbereich der Runde').selectOption('python');await expect(page.getByLabel('Kapitel der Runde').locator('option')).toHaveCount(7);await page.getByLabel('Kapitel der Runde').selectOption('data');await page.getByLabel('Fragenzahl').selectOption('5');await page.getByRole('button',{name:'Runde starten',exact:true}).click();const session=await page.evaluate(()=>JSON.parse(localStorage.getItem('codeklar-study-session-v1')).session);const allowed=groupTopics('python',pythonLessons).find(g=>g.id==='data').lessons.map(l=>l.id);expect(session.items.every(i=>allowed.includes(i.id))).toBe(true);await expect(page.locator('vite-error-overlay')).toHaveCount(0);
});

test('Python advanced material preserves old answers and exposes the maze source on mobile',async({page})=>{
 const {default:base}=await import('../src/pythonCurriculum.json',{with:{type:'json'}});const {default:further}=await import('../src/pythonFurtherCurriculum.json',{with:{type:'json'}});const {pythonLessonPack}=await import('../src/pythonLessons.js');expect(further).toHaveLength(30);expect(further.filter(r=>r.practice)).toHaveLength(11);for(const [i,row]of base.entries()){const lesson=pythonLessonPack[i];expect(lesson.id).toBe(`python-${row.id}`);expect(lesson.answer).toBe(i%3);}for(const row of further){expect(pythonLessonPack.find(l=>l.id===`python-${row.id}`).difficulty).toBe('Vertiefung');}
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('python');await page.getByRole('row').filter({has:page.getByText('sqlite3: Daten mit SQL speichern und abfragen',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await expect(page.locator('.difficulty')).toContainText('Vertiefung');await page.locator('.python-self-practice > summary').click();await page.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(page.locator('.python-self-practice .syntax-strip').last()).toHaveText('12');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('python');await page.getByRole('row').filter({has:page.getByText('Breitensuche: kürzeste Wege bei gleichen Schrittkosten',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.setViewportSize({width:390,height:844});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-python-bfs-mobile.png'});await page.locator('.python-project-help > summary').click();await page.getByRole('button',{name:'Labyrinth mit Breitensuche als Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode maze.py')).toContainText('shortest_path');await page.getByRole('button',{name:'maps/einfach.txt',exact:true}).click();await expect(page.getByLabel('Quellcode maps/einfach.txt')).toContainText('#S#..G#');await page.getByRole('button',{name:'BAUPLAN.md',exact:true}).click();await expect(page.getByLabel('Quellcode BAUPLAN.md')).toContainText('O(V+E)');await expect(page.locator('vite-error-overlay')).toHaveCount(0);expect(errors).toEqual([]);
});

test('Python time regex testing and process lessons connect to the complete log project',async({page})=>{
 const {default:next}=await import('../src/pythonNextCurriculum.json',{with:{type:'json'}});const {default:base}=await import('../src/pythonCurriculum.json',{with:{type:'json'}});const {default:further}=await import('../src/pythonFurtherCurriculum.json',{with:{type:'json'}});const {pythonLessonPack}=await import('../src/pythonLessons.js');expect(next).toHaveLength(24);expect(next.filter(r=>r.practice)).toHaveLength(7);for(const[i,row]of [...base,...further].entries()){expect(pythonLessonPack[i].id).toBe(`python-${row.id}`);expect(pythonLessonPack[i].answer).toBe(i%3);expect(pythonLessonPack[i].example).toBe(row.code);}
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('python');await page.getByRole('row').filter({has:page.getByText('Regex: search() oder fullmatch()?',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.python-self-practice > summary').click();await page.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(page.locator('.python-self-practice .syntax-strip').last()).toHaveText('True\nFalse');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-python-regex-mobile.png'});await page.locator('.python-project-help > summary').click();await page.getByRole('button',{name:'Logdateien auswerten als Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode log_report.py')).toContainText('astimezone(timezone.utc)');await page.getByRole('button',{name:'beispiel.log',exact:true}).click();await expect(page.getByLabel('Quellcode beispiel.log')).toContainText('+02:00 | INFO');await page.getByRole('button',{name:'BAUPLAN.md',exact:true}).click();await expect(page.getByLabel('Quellcode BAUPLAN.md')).toContainText('--skip-invalid');await expect(page.locator('vite-error-overlay')).toHaveCount(0);expect(errors).toEqual([]);
});

test('Python HTTP SQLite and concurrency lessons open the complete local API project',async({page})=>{
 const {default:web}=await import('../src/pythonWebCurriculum.json',{with:{type:'json'}});const {default:base}=await import('../src/pythonCurriculum.json',{with:{type:'json'}});const {default:further}=await import('../src/pythonFurtherCurriculum.json',{with:{type:'json'}});const {default:next}=await import('../src/pythonNextCurriculum.json',{with:{type:'json'}});const {pythonLessonPack}=await import('../src/pythonLessons.js');expect(web).toHaveLength(24);expect(web.filter(r=>r.practice)).toHaveLength(5);for(const[i,row]of [...base,...further,...next].entries()){expect(pythonLessonPack[i].id).toBe(`python-${row.id}`);expect(pythonLessonPack[i].answer).toBe(i%3);expect(pythonLessonPack[i].example).toBe(row.code);}
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page).toHaveTitle(/codeklar/i);await page.getByRole('button',{name:'Übungen',exact:true}).click();await page.getByLabel('Lernbereich filtern').selectOption('python');await page.getByRole('row').filter({has:page.getByText('JSON als Request-Body: Text muss zu Bytes werden',{exact:true})}).click();await page.getByRole('tab',{name:'Erklärung',exact:true}).click();await page.locator('.lesson-panel').scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/codeklar-python-http-mobile.png'});await page.locator('.python-self-practice > summary').click();await page.getByText('Musterlösung mit erwarteter Ausgabe',{exact:true}).click();await expect(page.locator('.python-self-practice .syntax-strip').last()).toHaveText('Grüße');
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.locator('.python-project-help > summary').click();await page.getByRole('button',{name:'Lokale Aufgaben-API als Projekt öffnen →',exact:true}).click();await expect(page.getByLabel('Quellcode server.py')).toContainText('ThreadingHTTPServer');await page.getByRole('button',{name:'store.py',exact:true}).click();await expect(page.getByLabel('Quellcode store.py')).toContainText('BEGIN IMMEDIATE');await page.getByRole('button',{name:'client.py',exact:true}).click();await expect(page.getByLabel('Quellcode client.py')).toContainText('HTTPConnection');await page.getByRole('button',{name:'BAUPLAN.md',exact:true}).click();await expect(page.getByLabel('Quellcode BAUPLAN.md')).toContainText('Terminal 1');await expect(page.getByLabel('Quellcode BAUPLAN.md')).toContainText('Terminal 2');await expect(page.locator('vite-error-overlay')).toHaveCount(0);
 for(const width of [320,390,768,1505]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}expect(errors).toEqual([]);
});

test('Mint Focus appearance offers readable light dark palettes and keyboard persistence', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page).toHaveTitle('codeklar – Verstehe deinen Code');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'green');
  await expect(page.getByLabel('Schnellnavigation').getByRole('button', { name: 'Lernen', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.getByRole('button', { name: 'Design und Webapp' }).click();
  for (const [mode, label] of [['light', 'Hell'], ['dark', 'Dunkel']]) {
    await page.getByRole('radio', { name: label, exact: true }).click();
    for (const [accent, name] of [['green', 'Mint'], ['blue', 'Blau'], ['purple', 'Lila'], ['amber', 'Amber'], ['rose', 'Rosé']]) {
      await page.getByRole('radio', { name, exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('data-accent', accent);
      await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
      const contrasts = await page.evaluate(() => {
        const css = getComputedStyle(document.documentElement);
        const rgb = token => {
          const el = document.createElement('span'); el.style.color = `var(${token})`; document.body.append(el);
          const values = getComputedStyle(el).color.match(/[\d.]+/g).slice(0, 3).map(Number); el.remove(); return values;
        };
        const luminance = values => values.map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
        const ratio = (a, b) => { const x = luminance(rgb(a)), y = luminance(rgb(b)); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
        return { body: ratio('--text', '--background'), muted: ratio('--muted', '--background'), accent: ratio('--accent', '--surface'), button: ratio('--on-accent', '--accent'), scheme: css.colorScheme };
      });
      expect(contrasts.scheme).toBe(mode);
      for (const key of ['body', 'muted', 'accent', 'button']) expect(contrasts[key], `${mode}/${accent}/${key}`).toBeGreaterThanOrEqual(4.5);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
  await page.getByRole('radio', { name: 'Hell', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('radio', { name: 'System', exact: true })).toBeChecked();
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('radio', { name: 'Hell', exact: true }).click();
  await page.getByRole('radio', { name: 'Blau', exact: true }).click();
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'blue');
  await page.getByRole('button', { name: 'Design und Webapp' }).click();
  await expect(page.getByRole('radio', { name: 'Hell', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'Blau', exact: true })).toBeChecked();
  await page.keyboard.press('Escape');
  await expect(page.locator('vite-error-overlay')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('Mint Focus compact lesson navigation and every main view fit light and dark screens', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel('Lernbereich wählen', { exact: true }).selectOption('python');
  await page.getByLabel('Hauptbereich', { exact: true }).selectOption('io');
  await page.getByRole('button', { name: 'Thema wählen', exact: true }).click();
  await page.getByRole('dialog', { name: 'Thema wählen', exact: true }).getByRole('button', { name: 'HTTP & APIs', exact: true }).click();
  await page.getByRole('button', { name: 'Lektion wählen', exact: true }).click();
  await page.getByRole('dialog', { name: 'Lektion wählen', exact: true }).getByRole('button', { name: /^JSON als Request-Body/ }).click();
  for (const [mode, label] of [['dark', 'Dunkel'], ['light', 'Hell']]) {
    await page.getByRole('button', { name: 'Design und Webapp' }).click();
    await page.getByRole('radio', { name: label, exact: true }).click();
    await page.getByRole('radio', { name: 'Mint', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    await page.keyboard.press('Escape');
    for (const width of [320, 390, 768, 1505]) {
      await page.setViewportSize({ width, height: 844 });
      await expect(page.locator('.lesson-panel h2')).toContainText('JSON als Request-Body');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('tab', { name: 'Aufgabe', exact: true }).click();
    await expect(page.getByRole('radiogroup', { name: 'Antwort auswählen' })).toBeVisible();
    await page.getByRole('tab', { name: 'Erklärung', exact: true }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `/tmp/codeklar-mint-focus-${mode}-390.png`, animations: 'disabled' });
    await page.locator('.computer-reading-steps').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/codeklar-mint-focus-${mode}-reading.png`, animations: 'disabled' });
    await page.setViewportSize({ width: 1505, height: 1045 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `/tmp/codeklar-mint-focus-${mode}-desktop.png`, animations: 'disabled' });
    await page.setViewportSize({ width: 390, height: 844 });
  }
  for (const name of ['Übungen', 'Nachschlagen', 'Fortschritt', 'Lernen']) {
    const button = page.getByLabel('Schnellnavigation').getByRole('button', { name, exact: true });
    await button.click(); await expect(button).toHaveAttribute('aria-current', 'page');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('appearance keeps legacy colors and works when design storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('codeklar-accent-v1', 'purple');
    Object.defineProperty(Storage.prototype, 'setItem', { value() { throw new Error('blocked'); } });
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'purple');
  await page.getByRole('button', { name: 'Design und Webapp' }).click();
  await page.getByRole('radio', { name: 'Hell', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByText('Dein Design gilt für diese Sitzung', { exact: false })).toBeVisible();
});

test('Python packages explain real dependencies and open a complete installable project', async ({ page }) => {
  const { default: additions } = await import('../src/pythonPackageCurriculum.json', { with: { type: 'json' } });
  const { pythonLessonPack } = await import('../src/pythonLessons.js');
  const { pythonPackageProjects } = await import('../src/pythonPackageProjects.js');
  expect(additions).toHaveLength(24);
  expect(additions.filter(row => row.practice)).toHaveLength(7);
  const previous = (await Promise.all(['pythonCurriculum', 'pythonFurtherCurriculum', 'pythonNextCurriculum', 'pythonWebCurriculum'].map(name => import(`../src/${name}.json`, { with: { type: 'json' } })))).flatMap(module => module.default);
  for (const [index, row] of previous.entries()) {
    expect(pythonLessonPack[index].id).toBe(`python-${row.id}`);
    expect(pythonLessonPack[index].answer).toBe(index % 3);
    expect(pythonLessonPack[index].example).toBe(row.code);
  }
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  await page.getByLabel('Lernbereich wählen', { exact: true }).selectOption('python');
  await page.getByLabel('Hauptbereich', { exact: true }).selectOption('tools');
  await page.getByRole('button', { name: 'Thema wählen', exact: true }).click();
  await page.getByRole('dialog', { name: 'Thema wählen', exact: true }).getByRole('button', { name: 'Externe Bibliotheken', exact: true }).click();
  await expect(page.locator('.lesson-panel h2')).toContainText('Jinja2');
  await page.locator('.python-package-setup > summary').click();
  await expect(page.locator('.python-package-setup')).toContainText('Jinja2==3.1.6');
  await expect(page.locator('.python-package-setup')).toContainText('.venv\\Scripts\\python.exe');
  await page.locator('.python-self-practice > summary').click();
  await page.getByText('Musterlösung mit erwarteter Ausgabe', { exact: true }).click();
  await expect(page.locator('.python-self-practice .syntax-strip').last()).toHaveText('Punkte: 7');
  for (const width of [320, 390, 768, 1505]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.lesson-panel').scrollIntoViewIfNeeded();
  await page.screenshot({ path: '/tmp/codeklar-python-packages-mobile.png', animations: 'disabled' });
  await page.locator('.python-project-help > summary').click();
  await page.getByRole('button', { name: 'Lernkarten-Package mit HTML-Export als Projekt öffnen →', exact: true }).click();
  await page.getByRole('button', { name: 'pyproject.toml', exact: true }).click();
  await expect(page.getByLabel('Quellcode pyproject.toml')).toContainText('[project.scripts]');
  await page.getByRole('button', { name: 'src/lernkarten/templates/site.html', exact: true }).click();
  await expect(page.getByLabel('Quellcode src/lernkarten/templates/site.html')).toContainText('{% for card in cards %}');
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Projekt als ZIP herunterladen', exact: true }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe('codeklar-python-package-cards.zip');
  const { unzipSync, strFromU8 } = await import('fflate');
  const zip = unzipSync(await readFile(await download.path()));
  for (const [name, code] of Object.entries(pythonPackageProjects[0].files)) expect(strFromU8(zip[name])).toBe(code);
  expect(strFromU8(zip['BAUPLAN.md'])).toContain('Windows');
  await page.getByRole('button', { name: 'Nachschlagen', exact: true }).click();
  await page.getByLabel('Lernbereich filtern').selectOption('python');
  await page.getByRole('textbox').fill('StrictUndefined');
  await expect(page.locator('.reference-entry').filter({ hasText: 'StrictUndefined:' })).toBeVisible();
  await expect(page.locator('vite-error-overlay')).toHaveCount(0);
  expect(errors).toEqual([]);
});
