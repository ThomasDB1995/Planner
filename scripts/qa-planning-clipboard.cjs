// Run against a local dev server. Every external request is mocked; no production writes.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const os = require("node:os");

(async () => {
  const env = readFileSync(path.resolve(__dirname, "../.env.local"), "utf8");
  const projectUrl = env.match(/^NEXT_PUBLIC_SUPABASE_URL=(.*)$/m)[1].trim().replace(/^['"]|['"]$/g, "");
  const ref = new URL(projectUrl).hostname.split(".")[0];
  const user = { id: "00000000-0000-0000-0000-000000000001", email: "qa@example.invalid", aud: "authenticated", role: "authenticated", app_metadata: {}, user_metadata: {} };
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const token = [ { alg: "HS256", typ: "JWT" }, { sub: user.id, exp, role: "authenticated" } ].map(x => Buffer.from(JSON.stringify(x)).toString("base64url")).join(".") + ".qa";
  const session = { access_token: token, refresh_token: "qa", expires_at: exp, expires_in: 3600, token_type: "bearer", user };
  const browser = await chromium.launch({ headless: true, channel: "msedge" });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(({ key, session }) => localStorage.setItem(key, JSON.stringify(session)), { key: `sb-${ref}-auth-token`, session });
    await context.routeWebSocket("**/*", ws => ws.close());
    const records = new Map();
    const writes = [];
    let sourceDate;
    let failNext = false;
    let loseCopyResponse = false;
    let delayNextWrite = false;
    await context.route("**/*", async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.hostname === "127.0.0.1") return route.continue();
      if (!url.hostname.endsWith("supabase.co")) return route.abort();
      const reply = (body, status = 200) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
      if (url.pathname.includes("/auth/")) return reply(user);
      const table = url.pathname.split("/").pop();
      if (table === "employees") return reply(["a", "b"].map((id, i) => ({ id: `qa-${id}`, first_name: `Test${id}`, last_name: "Werknemer", name: `Test${id} Werknemer`, category: "Werknemer", sort_order: i, is_default_visible: true, is_hidden: false })));
      if (table === "resources") return reply(["a", "b"].map(id => ({ id: `machine-${id}`, number: `QA-${id}`, name: `Machine ${id}`, category: "machine", type: "test" })));
      if (table !== "planning_items") return reply([]);
      if (request.method() === "GET") {
        const id = url.searchParams.get("id")?.slice(3);
        if (id) return records.has(id) ? reply(records.get(id)) : reply({ code: "PGRST116" }, 406);
        const filters = url.searchParams.getAll("date");
        const start = filters.find(x => x.startsWith("gte."))?.slice(4);
        const end = filters.find(x => x.startsWith("lte."))?.slice(4);
        if (!sourceDate) {
          sourceDate = start;
          records.set("qa-source", { id: "qa-source", date: sourceDate, employee_id: "qa-a", task_name: "QA Maaiwerk", resource_id: "machine-a", resource_ids: ["machine-a", "machine-b"], status: "voorlopig", created_by_email: "original@example.invalid", created_at: "2026-01-01T00:00:00Z" });
        }
        return reply([...records.values()].filter(x => x.date >= start && x.date <= end));
      }
      const body = request.postDataJSON();
      writes.push({ method: request.method(), body });
      if (delayNextWrite) { delayNextWrite = false; await new Promise(resolve => setTimeout(resolve, 350)); }
      if (failNext) { failNext = false; return reply({ code: "42501", message: "QA forced failure" }, 403); }
      if (request.method() === "POST") {
        if (records.has(body.id)) return reply({ code: "23505" }, 409);
        records.set(body.id, { ...body, created_at: new Date().toISOString() });
        if (loseCopyResponse) { loseCopyResponse = false; return route.abort("failed"); }
        return reply(records.get(body.id), 201);
      }
      const id = url.searchParams.get("id").slice(3);
      if (!records.has(id)) return reply({ code: "PGRST116" }, 406);
      if (request.method() === "PATCH") {
        records.set(id, { ...records.get(id), ...body });
        return reply(records.get(id));
      }
      return reply({});
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:3010/");
    await page.getByRole("button", { name: "Bewerken", exact: true }).click();
    const card = () => page.locator("article").filter({ hasText: "QA Maaiwerk" }).first();
    const cell = (employee, date) => page.locator(`[data-employee-id="${employee}"][data-date="${date}"]`);
    const paste = () => page.keyboard.press("Control+v");
    assert.equal(await page.getByRole("button", { name: /^(Knippen|Kopiëren|Hier plakken)$/ }).count(), 0);
    await card().click();
    await page.getByPlaceholder("Bijvoorbeeld: werf voorbereiden").fill("QA Maaiwerk bijgewerkt");
    await card().focus();
    await page.keyboard.press("Control+c");
    await page.getByRole("status").filter({ hasText: "Taak gekopieerd." }).waitFor();
    await page.getByRole("button", { name: "Volgende week", exact: true }).click();
    const targetDate = await page.locator('[data-employee-id="qa-b"][data-date]').first().getAttribute("data-date");
    await cell("qa-b", targetDate).click();
    await paste();
    await page.getByRole("status").filter({ hasText: "Taak gekopieerd." }).waitFor();
    assert.equal(records.size, 2);
    const copy = [...records.values()].find(x => x.id !== "qa-source");
    assert.equal(copy.employee_id, "qa-b");
    assert.equal(copy.date, targetDate);
    assert.equal(copy.created_by_email, user.email);
    assert.equal(copy.status, "voorlopig");
    assert.equal(copy.task_name, "QA Maaiwerk bijgewerkt");
    assert.deepEqual(copy.resource_ids, ["machine-a", "machine-b"]);
    delayNextWrite = true;
    await cell("qa-b", targetDate).focus();
    await page.keyboard.press("Control+v");
    await page.keyboard.press("Control+v");
    await page.waitForFunction(() => document.querySelectorAll("article").length === 2);
    assert.equal(records.size, 3);
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Vorige week", exact: true }).click();
    await card().click();
    await page.keyboard.press("Control+x");
    await page.locator('article[data-cut="true"]').waitFor();
    assert.equal(records.get("qa-source").date, sourceDate);
    await page.getByRole("button", { name: "Volgende week", exact: true }).click();
    await cell("qa-a", targetDate).click();
    records.get("qa-source").task_name = "QA Remote wijziging";
    failNext = true;
    await paste();
    await page.getByRole("alert").filter({ hasText: "Plakken niet bevestigd" }).waitFor();
    assert.equal(records.get("qa-source").date, sourceDate);
    await paste();
    await page.getByRole("status").filter({ hasText: "Taak verplaatst." }).waitFor();
    assert.equal(records.get("qa-source").date, targetDate);
    assert.equal(records.get("qa-source").task_name, "QA Remote wijziging");
    assert.equal(records.size, 3);
    assert.deepEqual(Object.keys(writes.filter(x => x.method === "PATCH").at(-1).body).sort(), ["date", "employee_id", "updated_by", "updated_by_email"]);
    // A lost insert response must reuse its id when retried.
    await page.locator("article").filter({ hasText: "QA Remote wijziging" }).click();
    await page.keyboard.press("Control+c");
    await page.getByRole("status").filter({ hasText: "Taak gekopieerd." }).waitFor();
    await cell("qa-a", targetDate).click({ position: { x: 5, y: 65 } });
    loseCopyResponse = true;
    await paste();
    await page.getByRole("alert").filter({ hasText: "Plakken niet bevestigd" }).waitFor();
    assert.equal(records.size, 4);
    await paste();
    await page.getByRole("status").filter({ hasText: "Taak gekopieerd." }).waitFor();
    assert.equal(records.size, 4);
    // Clipboard shortcuts inside a task text field keep normal text behavior.
    await page.keyboard.press("Escape");
    const task = page.getByPlaceholder("Bijvoorbeeld: werf voorbereiden");
    await task.fill("QA Tekst");
    await task.press("Control+x");
    assert.equal(await page.locator('article[data-cut="true"]').count(), 0);
    await card().click();
    await page.keyboard.press("Control+x");
    await page.locator('article[data-cut="true"]').waitFor();
    await page.screenshot({ path: path.join(os.tmpdir(), "perceel-clipboard-desktop.png"), fullPage: true });
    await page.keyboard.press("Escape");
    assert.equal(await page.locator('article[data-cut="true"]').count(), 0);
    await page.setViewportSize({ width: 390, height: 844 });
    await card().click();
    await page.keyboard.press("Meta+c");
    await page.getByRole("status").filter({ hasText: "Taak gekopieerd." }).waitFor();
    await page.waitForFunction(() => document.querySelectorAll('article[data-cut="true"]').length === 0);
    await page.screenshot({ path: path.join(os.tmpdir(), "perceel-clipboard-mobile.png"), fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.getByRole("button", { name: "Bekijken", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "Knippen", exact: true }).count(), 0);
    await page.getByRole("button", { name: "Bewerken", exact: true }).click();
    assert.equal(await page.getByRole("button", { name: "Hier plakken", exact: true }).count(), 0);
    // A deleted source is never recreated by cutting and pasting.
    await card().click();
    await page.keyboard.press("Control+x");
    await page.locator('article[data-cut="true"]').waitFor();
    const deletedId = copy.id;
    records.delete(deletedId);
    await cell("qa-a", targetDate).click({ position: { x: 5, y: 65 } });
    await paste();
    await page.getByRole("alert").filter({ hasText: "Plakken niet bevestigd" }).waitFor();
    assert.equal(records.has(deletedId), false);
    assert.deepEqual(errors, []);
    console.log("PASS: cross-week copy/cut, repeated copies, audit/resources/status, failed move, remote edit preservation, lost response retry, keyboard/text input, cancel, mobile layout and view-mode reset. No production writes.");
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
