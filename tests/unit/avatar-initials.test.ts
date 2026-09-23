import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getAvatarInitials,
  identityFromAuthUser,
} from "../../src/lib/auth/avatar-initials";

describe("getAvatarInitials", () => {
  it("uses the first letters of a two-word name", () => {
    assert.equal(getAvatarInitials("Alice Parker"), "AP");
  });

  it("uses the first two letters of a single-word name", () => {
    assert.equal(getAvatarInitials("Saad"), "SA");
  });

  it("falls back to the email local-part when name is missing", () => {
    assert.equal(getAvatarInitials(null, "jane.doe@example.com"), "JD");
    assert.equal(getAvatarInitials("", "saad@example.com"), "SA");
  });

  it("returns ? when neither name nor email is available", () => {
    assert.equal(getAvatarInitials(null, null), "?");
  });
});

describe("identityFromAuthUser", () => {
  it("prefers full_name then email", () => {
    assert.deepEqual(
      identityFromAuthUser({
        email: "saad@example.com",
        user_metadata: { full_name: "Saad Qureshi" },
      }),
      { name: "Saad Qureshi", email: "saad@example.com" },
    );
  });
});
