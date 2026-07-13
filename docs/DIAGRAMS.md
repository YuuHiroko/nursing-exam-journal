# Interactive Diagrams — Reference

Animated SVG diagrams for the Nursing Exam Journal. All live in `diagrams.js`
under the global `window.DIAGRAMS` registry and render into answer HTML via
`<div data-diagram="KEY"></div>` placeholder slots.

## How it works

1. **Author** — add a function `KEY: function () { ... return htmlString; }` to
   `window.DIAGRAMS` in `diagrams.js`. It returns a string of HTML wrapping an
   inline `<svg>`.
2. **Place** — drop `<div data-diagram="KEY"></div>` anywhere inside an answer's
   backtick template string in a `data-*.js` file.
3. **Activate** — `window.activateDiagrams()` (called by `app.js` when a modal
   opens) finds every `[data-diagram]` slot, swaps in `DIAGRAMS[KEY]()`, tags
   each `<svg>` with `role="img"` + `aria-label` from `.diagram-title`, and
   removes the attribute so it renders once.

### Conventions (match existing code)

- Return `'<div class="interactive-diagram nrs-diagram"> … </div>'`. The two
  classes give shared styling, dark-mode, and tab-pause behaviour for free.
- First child: `<div class="diagram-title">…</div>` (used as the a11y label).
- Last child: `<div class="diagram-key">…</div>` — plain-language takeaway.
- SVG: `viewBox` + `width="100%"` + inline `max-width` so it scales on mobile.
- Animate with SMIL (`<animate>`, `<animateMotion>`, `<animateTransform>`).
- **No `Math.random()` in layout maths** (breaks determinism) — use index-based
  spirals/angles. `Math.random()` is only used for unique element IDs, matching
  the file's existing convention.
- Reduced-motion, tab-hidden pause, and `.diagram-paused` are handled globally
  by the activation IIFE + `index.css` — new diagrams inherit them.

## Registry

### Research / stats (NRS)

| Key | Concept | Visual |
|-----|---------|--------|
| `researchProcess` | 9 steps of the research process | glowing 3×3 flow grid |
| `ebpTriad` | Evidence-Based Practice triad | pulsing Venn |
| `scientificMethod` | Scientific method cycle | rotating ring cycle |
| `researchDesignTree` | Classification of research designs | classification tree |
| `variableFlow` | Independent → Dependent variable | causal arrow + particle |
| `hypothesisTree` | Classification of hypothesis | classification tree |
| `samplingTree` | Probability vs Non-Probability sampling + subtypes | two-family tree |
| `samplingProcess` | 6-step sampling procedure | sequential ladder |
| `populationSample` | Population → Sample | dot-cloud + highlighted subset |
| `dataCollectionMethods` | 6 methods of data collection | hub-and-spokes |
| `reliabilityValidity` | Reliable vs Valid | 3-dartboard analogy |
| `pilotStudy` | Pilot → Main study | flask → feedback loop → flask |

### Community health (CHN)

| Key | Concept | Visual |
|-----|---------|--------|
| `levelsOfPrevention` | Primary / Secondary / Tertiary prevention | 3-tier ladder |

### Midwifery / OBG (pre-existing)

`fetalCirculation`, `fertilizationProcess`, `cervicalDilation`, `lochiaTimeline`,
`uterineInvolution`, `menstrualCycle`, `fetalSkull`, `mechanismOfLabour`,
`essentialNewbornCare`, `placentaFunctions`, `apgarScore`, `stagesOfLabour`,
`nstTrace`.

## Slot placements (this change)

**NRS Unit-V — Sampling & Data Collection** (`data-nrs-unit5.js`)

| Question | Diagram |
|----------|---------|
| "Discuss the advantages of conducting pilot study." | `pilotStudy` |
| "Enumerate various methods of data collection in research." | `dataCollectionMethods` |
| "Describe sampling process." | `samplingProcess` |
| "Difference between population and sample." | `populationSample` |
| "List the types of sampling technique." | `samplingTree` |
| "Discuss different types of validity." | `reliabilityValidity` |

**CHN-II Unit-I** (`data-chn2-unit1.js`)

| Question | Diagram |
|----------|---------|
| "Interventions for diabetes at primary level of prevention." | `levelsOfPrevention` |

## Cache busting

Editing `diagrams.js` or any `data-*.js` requires bumping the `?v=` query in
`index.html` (and `sw.js` if the file is precached) so browsers fetch fresh copy.
This change bumped: `diagrams.js v7→v8`, `data-nrs-unit5.js v1→v2`,
`data-chn2-unit1.js v1→v2`.

## Verify

```bash
node -c diagrams.js && node -c data-nrs-unit5.js && node -c data-chn2-unit1.js
```

Or open a wired question in the app (e.g. NRS "Describe sampling process") and
confirm the animated diagram renders below the relevant table.
