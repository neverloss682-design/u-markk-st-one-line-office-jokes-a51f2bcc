// One-Line Office Jokes — entry generator (make.fun, program/v1).
// Node stdlib only. Deterministic: writes one fixed line to entry.txt.
// Gate (from RULES.txt): UTF-8 text, 1..199 characters, single line,
// not only whitespace. The entry must land its laugh in the last words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I muted myself to sneeze and unmuted three meetings later, mid-sentence, agreeing to a deadline in Q3.";

function main(): void {
  // Gate: length 1..199 chars, exactly one line, non-blank.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 199) {
    throw new Error(`entry length ${chars} outside 1..199`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
