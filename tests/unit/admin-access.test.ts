import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canTransition, isEditorRole } from "../../src/lib/admin/access";

describe("admin access helpers", () => {
  it("recognizes editor and admin roles", () => {
    assert.equal(isEditorRole("editor"), true);
    assert.equal(isEditorRole("admin"), true);
    assert.equal(isEditorRole("user"), false);
    assert.equal(isEditorRole(null), false);
  });

  it("allows expected style status transitions", () => {
    assert.equal(canTransition("draft", "in_review"), true);
    assert.equal(canTransition("draft", "published"), true);
    assert.equal(canTransition("in_review", "published"), true);
    assert.equal(canTransition("published", "archived"), true);
    assert.equal(canTransition("archived", "draft"), true);
    assert.equal(canTransition("published", "draft"), false);
    assert.equal(canTransition("archived", "published"), false);
  });
});
