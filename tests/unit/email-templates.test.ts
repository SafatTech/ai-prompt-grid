import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const templateDir = path.join(process.cwd(), "supabase", "templates");

function readTemplate(name: string): string {
  return readFileSync(path.join(templateDir, name), "utf8");
}

const authTemplates = ["confirmation.html", "magic_link.html", "recovery.html"] as const;

describe("transactional email templates", () => {
  it("keeps Supabase confirmation links and the site logo variable", () => {
    for (const name of authTemplates) {
      const html = readTemplate(name);
      assert.match(html, /\{\{ \.ConfirmationURL \}\}/);
      assert.match(html, /\{\{ \.SiteURL \}\}\/brand\/email-mark\.png/);
      assert.doesNotMatch(html, /\{\{ \.Token \}\}/);
      assert.doesNotMatch(html, /\{\{ \.TokenHash \}\}/);
    }
  });

  it("uses email-safe layout and the shared brand system", () => {
    for (const name of [...authTemplates, "welcome.html"] as const) {
      const html = readTemplate(name);
      assert.match(html, /max-width:600px/);
      assert.match(html, /#111018/);
      assert.match(html, /#8B5CF6/);
      assert.match(html, /#F5F3FF/);
      assert.match(html, /Find a look\. Keep your story\./);
      assert.match(html, /AI Prompt Grid/);
      assert.match(html, /aipromptgrid\.com/);
      assert.match(
        html,
        /You received this email because of an activity related to your AI Prompt Grid account\./,
      );
      assert.doesNotMatch(
        html,
        /display:\s*flex|display:\s*grid|<script|fonts\.googleapis|@import/i,
      );
    }
  });

  it("uses the requested copy for each variant", () => {
    const confirmation = readTemplate("confirmation.html");
    assert.match(confirmation, /ACCOUNT SETUP/);
    assert.match(confirmation, /Confirm your email address/);
    assert.match(confirmation, /Confirm email/);
    assert.match(confirmation, /this link expires in 1 hour/);

    const magicLink = readTemplate("magic_link.html");
    assert.match(magicLink, /SIGN-IN REQUEST/);
    assert.match(magicLink, /Sign in securely/);
    assert.match(magicLink, /No password needed/);
    assert.match(magicLink, /This sign-in link expires in 1 hour/);
    assert.match(
      magicLink,
      /If you did not request this sign-in link, you can safely ignore this email\./,
    );

    const recovery = readTemplate("recovery.html");
    assert.match(recovery, /ACCOUNT SECURITY/);
    assert.match(recovery, /Reset password/);
    assert.match(
      recovery,
      /If you did not request a password reset, no action is needed\./,
    );
    assert.doesNotMatch(recovery, /expires in/);

    const welcome = readTemplate("welcome.html");
    assert.match(welcome, /WELCOME/);
    assert.match(welcome, /Your next look starts here/);
    assert.match(welcome, /Explore styles/);
    assert.match(welcome, /https:\/\/aipromptgrid\.com\/explore/);
    assert.match(welcome, /Browse curated transformations/);
    assert.match(welcome, /Customize prompts around your photo/);
    assert.match(welcome, /Save your favorite styles/);
    assert.doesNotMatch(welcome, /\{\{ \.ConfirmationURL \}\}/);
    assert.doesNotMatch(
      welcome,
      /If you did not request this, you can safely ignore this email\./,
    );
  });

  it("registers only the auth templates in local config", () => {
    const config = readFileSync(
      path.join(process.cwd(), "supabase", "config.toml"),
      "utf8",
    );
    assert.match(config, /content_path = "\.\/supabase\/templates\/confirmation\.html"/);
    assert.match(config, /content_path = "\.\/supabase\/templates\/magic_link\.html"/);
    assert.match(config, /content_path = "\.\/supabase\/templates\/recovery\.html"/);
    assert.doesNotMatch(config, /templates\/welcome\.html/);
  });
});
