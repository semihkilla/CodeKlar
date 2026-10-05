import { test, expect } from "@playwright/test";
import { jsLessons } from "../src/data.js";

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
  await expect(page.getByText("1 von 6 Aufgaben gelöst")).toBeVisible();
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
  await expect(page.getByText("1 von 6 Aufgaben gelöst")).toBeVisible();
  await page.reload();
  await expect(page.getByText("1 von 6 Aufgaben gelöst")).toBeVisible();
  await page
    .getByLabel("Schnellnavigation")
    .getByRole("button", { name: "Nachschlagen", exact: true })
    .click();
  await page.getByRole("textbox").fill("append");
  await expect(page.locator(".reference-entry")).toHaveCount(1);
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
