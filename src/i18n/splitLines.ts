/** Split a translated display heading on its literal newline so each line can be
 *  rendered as its own block-level element.
 *
 *  Some banner headings are designed to break at a specific point, so the break
 *  lives in the translation (each locale decides where its own line should end).
 *  A locale that omits the newline simply renders as one line — it must never
 *  fall back to a hardcoded English second line, which is what the previous
 *  `t(key).split('\n')[1] || "English text"` pattern did.
 */
export function splitLines(value: string): string[] {
  return value.split("\n").filter((line) => line.trim().length > 0);
}
