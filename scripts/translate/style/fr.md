# French (fr)

- **Address the reader as `vous`.** Never `tu`.
- **Narrow non-breaking space before `:` `;` `!` `?` `»`** and after `«`. Write it
  as a literal U+202F character. This is already correct elsewhere in the
  codebase (e.g. `"Statut :"`) — match it.
- Use `bijoux` for jewellery generally; `joaillerie` only for fine/precious
  pieces.
- Decimal comma: `1,5 carat`. Currency after the number: `120 €`.
- French runs ~15–20% longer than English; shorten meta copy actively.
- Elide correctly before vowels: `d'oreilles`, `l'or`, `l'argent`.
- Gender agreement must be checked on every adjective — machine translation
  routinely gets `belle`/`beau` and plural agreement wrong.
