# Translation pipeline

Translates English locale and content JSON into `nl`, `de`, `fr`, `it`, `es`
using an LLM with a binding glossary, per-locale style guides, and a structural
validator.

Replaces `scripts/translate-*.cjs` (MyMemory/Google Translate), which produced
literal renderings — "stud" as *stallion*, "huggie" as *hug* — and required
`fix-corrupted-translations.cjs` to clean up after itself.

## Commands

```bash
# Project cost, no API calls, spends nothing
node scripts/translate/estimate.mjs
node scripts/translate/estimate.mjs blogs --batch --locales=de,fr

# Inspect the exact prompt and payload without calling the API
node scripts/translate/translate.mjs blogs --limit=1 --locales=de --dry-run

# Translate (requires `npm i -D openai`)
node --env-file=.env.translate scripts/translate/translate.mjs locales --max-spend=2
node --env-file=.env.translate scripts/translate/translate.mjs blogs --limit=3 --max-spend=1

# One specific file — by path, or by substring of the path
node --env-file=.env.translate scripts/translate/translate.mjs src/content/blogs/en/some-post.json
node --env-file=.env.translate scripts/translate/translate.mjs blogs --filter=huggies

# Gate the output, no API calls
node scripts/translate/validate.mjs blogs
node scripts/translate/validate.mjs locales --verbose
```

`estimate.mjs` and `validate.mjs` have **no dependencies** — only the actual
translation run needs the `openai` package.

## API key

Keep the key out of `.env` — that file is loaded into the Next.js dev and build
process, and only this CLI needs the key. Use a dedicated file instead:

```bash
echo 'OPENAI_API_KEY=sk-proj-...' > .env.translate
```

`node --env-file=.env.translate` loads it natively (Node >= 20.6, no `dotenv`).
`.env*` is gitignored with an exception for `.env.example`, so the file cannot
be committed by accident. An exported `OPENAI_API_KEY` in the shell works too
and leaves nothing on disk.

`--filter` is a plain substring match against the file path: `--filter=huggie`
matches 7 blog posts, `--filter=huggies` matches 1. Check the file count printed
in the run header before letting it spend.

## Layout

| Path | Role |
|---|---|
| `glossary.json` | Binding term list. The asset that determines quality. |
| `style/_shared.md` | Rules common to every locale (SEO limits, placeholders, voice). |
| `style/<locale>.md` | Register, typography, and pitfalls for one locale. |
| `lib/walk.mjs` | Flatten/rebuild JSON; plural-safe merge. |
| `lib/corpus.mjs` | Scope → file list resolution. |
| `lib/pricing.mjs` | Cost model and per-request actual spend. |
| `estimate.mjs` | Project cost before spending. |
| `translate.mjs` | The runner. |
| `validate.mjs` | The gate. |
| `.cache.json` | Per-string translation cache (gitignored, regenerable). |

## How it works

Each source file is flattened into an ordered map of translatable leaves keyed
by **integer index**, not by dotted path. Paths average ~7 tokens and the model
echoes every key back; across ~51k strings × 5 locales that choice saves
millions of output tokens, which is the expensive side of the bill.

Non-translatable keys (`href`, `image`, `coverImage`, `type`, `imagePosition`,
and the `*Href` variants) are excluded from the payload entirely and asserted
byte-identical afterwards.

The system prompt is `_shared.md` + `style/<locale>.md` + the glossary. It is
byte-identical across every file for a given locale, so it hits the provider's
automatic prompt cache after the first request.

### SEO length budgets

Because the payload is keyed by integer index, the model cannot see that key
`1` is a meta description — the path, and therefore the 155-char rule, is
invisible to it. A rule in the system prompt alone is unenforceable.

So each request carries a `maxChars` object listing the budget for exactly the
keys that have one, emitted **before** `text` so the constraint is read first:

```json
{ "maxChars": { "0": 60, "1": 155 },
  "text": { "0": "What Are Lab-Grown Diamonds?…", "1": "Learn what lab-grown…" } }
```

Budgets come from `lib/seo.mjs` — the single definition shared with
`validate.mjs`, so the runner and the gate can never disagree. A leaf is
budgeted only when English is *already within* the limit; where the English
overruns, no budget is sent, because asking the model to fit an impossible
target just produces truncation.

`pageMeta.json` gets 96 of 96 leaves budgeted (all of it is SEO copy, including
the `og*` and `twitter*` variants). `blogs-meta.json` gets 0 — those are display
titles, not meta titles.

**Repair pass.** After translation, any budgeted string still over its limit is
sent back with an explicit shorten-this instruction, its current translation,
its budget, and the English original — up to two attempts. Only the offending
strings are re-sent, so the cost is negligible. Anything still over after that
is left as-is and reported by `validate.mjs` rather than silently truncated.

The cache is budget-aware: a cached translation that busts its limit is treated
as a miss and retranslated, so tightening a limit does not leave stale
over-length copy behind.

### Plural forms — why writes merge

`fr`, `it`, and `es` carry 31 `_many` plural keys that `en`, `nl`, and `de` have
no equivalent for. This is correct CLDR behaviour, not a bug. Rebuilding a
target purely from the English shape would delete those keys and silently break
pluralisation, so `translate.mjs` merges its output over the existing target
file (`preserveExtras`) rather than overwriting it. New translations win; keys
only the target has survive.

**Consequence:** a `_many` form for genuinely new content is not generated
automatically. Add it by hand, or extend the prompt if this becomes common.

## Model tiers

| Tier | Default | Used for | Why |
|---|---|---|---|
| `high` | `gpt-5.6-terra` | `src/locales/*` | 2,656 strings of UI chrome and checkout copy that render on every page. Small volume, largest blast radius. |
| `bulk` | `gpt-5.6-luna` | blogs, resources | ~97% of all tokens. Long-form prose, most forgiving content. |

Override per run with `--model=`. Prices in `lib/pricing.mjs` were verified
2026-08-18; **re-check them before a large run.**

`reasoning_effort` is set to `low` — this is a spec-following task, not a
reasoning one, and reasoning tokens bill as output. If the API rejects the
parameter, the runner drops it and continues.

## Cost control

Three independent layers:

1. `estimate.mjs` projects cost before you spend anything. Estimates are biased
   **high** and exclude retries.
2. `--max-spend=N` is a hard ceiling enforced against real API usage. The run
   stops cleanly when it is reached.
3. `.cache.json` means re-runs only pay for strings that actually changed.
   A resumed run after a ceiling abort is nearly free for work already done.

## The validator is the point

A cheap model is only defensible behind a strict gate. `validate.mjs` fails on:

1. missing target file or unparseable JSON
2. any English path absent from the target (extra paths allowed only as CLDR
   plural variants)
3. `{{placeholder}}` sets that differ per string
4. non-translatable keys that changed
5. SEO title >60 or description >155 chars — **only** for genuine meta fields,
   and **only** where English was already within the limit. 57 of 223 English
   `.title` values already exceed 60 chars; a blog's display title is not a meta
   title, and neither is this pipeline's problem to report.
6. **Glossary assertions** — if the English contains `stud earring`, the German
   output must contain `ohrstecker`. Deterministic, free, and catches exactly
   the failure class that motivated this rewrite.
7. >50% of substantial strings identical to English (likely untranslated)

Run it after every translation run. It exits non-zero, so it drops straight
into CI.

## Glossary provenance — read this before trusting it

The glossary was assembled two different ways, and only one half is grounded:

| Part | Source | Trust |
|---|---|---|
| Which terms are listed, and their order | Frequency scan of `src/content/en` | Data |
| `doNotTranslate` | Copied from `BRAND_TERMS` in `scripts/translate-locales.cjs` | Existing code |
| **Every target translation and `assert` stem** | **Written from model knowledge, unverified** | **Guess** |

Checking the top term (`stud earrings`) against what your existing files
actually use showed the guesses are right in one locale out of five:

| Locale | Glossary | Hits in existing content | Dominant existing term |
|---|---|---|---|
| de | `Ohrstecker` | 4,133 | `Ohrstecker` — agrees |
| fr | `puces d'oreilles` | 275 | `clou` (4,044) |
| it | `orecchini a lobo` | 0 | `a bottone` (1,341) |
| es | `pendientes de botón` | 60 | `arete` (9,835) |
| nl | `oorstekers` | 48 | `oorknop` (819) |

**Neither source is authoritative.** The existing content is MyMemory output, so
frequency there proves nothing — the same scan found `tachuela` (es, 1,534),
`Bolzen`/`Stollen` (de, 941) and `perno` (it, 167), all of which are the literal
mistranslations this pipeline exists to eliminate. Only a native speaker or the
SEO owner can settle a term.

Because of this, every term carries `"reviewed": false` and **unreviewed terms
only produce warnings**. Confirm a term, set `"reviewed": true`, and it becomes
a hard failure in `validate.mjs`. Review the high-frequency terms first — the
top four account for most of the corpus.

`style/es.md` additionally carries an unresolved market decision: Castilian vs
Latin American Spanish. That is an SEO targeting call, not a language one.

## Known limits
- **Token estimates are `chars / 4`**, good to roughly ±15%. Trust
  `--max-spend` over `estimate.mjs`.
- **The validator checks form, not meaning.** It cannot tell you the German
  reads awkwardly. Spot-check a sample per locale.
- Chunking splits files over 8,000 source characters, so a very long article is
  translated in several requests and loses some cross-chunk context.
