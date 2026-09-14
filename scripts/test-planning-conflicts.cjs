const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

// Run the real TypeScript helpers with their existing @/ imports, without a new test dependency.
function loadHelper(relativePath) {
  const filename = path.resolve(__dirname, "../src", relativePath);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require: (id) => id.startsWith("@/") ? loadHelper(`${id.slice(2)}.ts`) : require(id)
  }, { filename });
  return exports;
}

const { findPlanningConflicts } = loadHelper("lib/planning/conflicts.ts");
const resources = ["machine-a", "machine-b"].map((id) => ({
  id, number: id, name: id, category: "machine", type: "test", isDefective: false
}));
const item = (id, employeeId, overrides = {}) => ({
  id, employeeId, date: "2026-09-14", taskName: id,
  resourceId: "machine-a", status: "bevestigd", ...overrides
});

test("same employee may reuse machines across tasks and options on one day", () => {
  const items = [
    item("morning", "employee-a", { resourceIds: ["machine-a", "machine-b"] }),
    item("afternoon", "employee-a", { resourceIds: ["machine-a", "machine-b"] }),
    item("option", "employee-a", { status: "voorlopig" })
  ];
  assert.equal(findPlanningConflicts(items, resources).length, 0);
});

test("different employees conflict and all affected tasks remain linked", () => {
  const conflicts = findPlanningConflicts([
    item("morning", "employee-a"), item("afternoon", "employee-a"),
    item("other", "employee-b")
  ], resources);
  assert.equal(conflicts.length, 1);
  assert.deepEqual(Array.from(conflicts[0].planningItemIds), ["morning", "afternoon", "other"]);
  assert.equal(conflicts[0].resourceId, "machine-a");
  assert.match(conflicts[0].message, /bij meerdere werknemers/);
});

test("different dates, different resources and resource-free tasks do not conflict", () => {
  assert.equal(findPlanningConflicts([
    item("first", "employee-a"),
    item("tomorrow", "employee-b", { date: "2026-09-15" }),
    item("other-machine", "employee-b", { resourceId: "machine-b" }),
    item("no-machine", "employee-b", { resourceId: undefined })
  ], resources).length, 0);
});

test("multi-resource compatibility reports only the shared machine once", () => {
  const conflicts = findPlanningConflicts([
    item("multi", "employee-a", { resourceIds: ["machine-a", "machine-b", "machine-b"] }),
    item("legacy", "employee-b", { resourceId: "machine-b" })
  ], resources);
  assert.equal(conflicts.length, 1);
  assert.equal(conflicts[0].resourceId, "machine-b");
  assert.equal(conflicts[0].planningItemIds.length, 2);
});

test("moving a task to another employee creates a conflict; moving day or removing it clears it", () => {
  const first = item("first", "employee-a");
  const second = item("second", "employee-a");
  assert.equal(findPlanningConflicts([first, second], resources).length, 0);
  const moved = { ...second, employeeId: "employee-b" };
  assert.equal(findPlanningConflicts([first, moved], resources).length, 1);
  assert.equal(findPlanningConflicts([first, { ...moved, date: "2026-09-15" }], resources).length, 0);
  assert.equal(findPlanningConflicts([first], resources).length, 0);
});

test("options on different employees still participate in conflict checks", () => {
  assert.equal(findPlanningConflicts([
    item("confirmed", "employee-a"), item("option", "employee-b", { status: "voorlopig" })
  ], resources).length, 1);
});
