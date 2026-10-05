import { test, expect } from "@playwright/test";
import { jsLessons } from "../src/data.js";

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
      .fill(`function ${lesson.functionName}(input) { return null; }`);
    await page.getByRole("button", { name: "Lösung prüfen" }).click();
    await expect(page.getByLabel("Code-Ausgabe")).toContainText(
      `0 / ${lesson.tests.length} bestanden`,
    );
    await page.getByLabel("JavaScript-Code").fill(lesson.solution);
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
  await expect(page.getByRole("heading", { name: "Funktionen aufrufen und Ergebnisse zurückgeben" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByText("Alle Schritte im Lernpfad", { exact: true }).click();
  await expect(page.locator(".path-steps button")).toHaveCount(18);
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
