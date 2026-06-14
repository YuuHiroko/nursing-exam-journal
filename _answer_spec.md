# MODEL ANSWER SPEC — MUHS B.Sc Nursing · Midwifery & Obstetrics

You are writing **model exam answers** for Indian B.Sc Nursing students (MUHS).
Goal: the student must **UNDERSTAND in very easy, simple English** AND **score full marks**.
Write like you are kindly explaining to a friend — short sentences, plain words, bold key terms,
and a plain-English meaning in brackets after every technical term, e.g. "atonic uterus (uterus
does not contract after delivery)".

Medical accuracy is essential. Use current **Indian context** (NHM, JSY, JSSK, IFA tablets, ASHA,
Anganwadi, RCH, ICDS) and standard values where they are well established.

---

## FILE FORMAT (critical — must be valid JavaScript)

The file assigns a global array. Example for unit 3:

```
window.QUESTIONS_DATA_UNIT3 = [
  {
    id: 22,
    question: "Signs and symptoms of pregnancy.",
    marks: 5,
    repeated: 1,
    unit: 3,
    years: "Winter 2021",
    answer: `
<div class="in-short"><strong>In Short:</strong> ...</div>
... more HTML ...
`
  },
  { ... next question ... }
];
```

`answer` is a **JS template literal** (backticks). RULES inside the answer HTML:
- **NEVER** type a backtick `` ` `` or the sequence `${` anywhere inside an answer (it breaks the literal).
- Use HTML entities for symbols: `&amp;` `&rarr;` `&larr;` `&darr;` `&uarr;` `&mdash;` `&ndash;`
  `&hellip;` `&check;` `&times;` `&divide;` `&deg;` `&asymp;` `&plusmn;` `&le;` `&ge;`.
- Straight apostrophes `'` are fine inside backticks. Plain double quotes `"` are fine in HTML attributes.
- **Do NOT use `<img>` or `class="figure-block"`** — no image files exist (they would show broken images).
  Create visuals with **flowcharts, tables, icon-cards (emoji), timelines, and mnemonic boxes** instead.

---

## REQUIRED STRUCTURE FOR EVERY ANSWER

1. **Open with** an In Short box (plain-English summary, 1–3 sentences):
   `<div class="in-short"><strong>In Short:</strong> ...</div>`

2. Wrap each part in `<div class="answer-section"> <h3 class="answer-section-title">Title</h3> ... </div>`.
   For variety you may use `answer-section-title teal-title` (green) or `answer-section-title accent-title` (red).

3. **Definition** (when the question says "define"): `<div class="definition-box"><strong>Term</strong> means ...</div>`

4. **Numbered points:** `<ol class="answer-points"><li>...</li></ol>`   Sub-bullets: `<ul class="sub-points"><li>...</li></ul>`

5. **Comparison / classification table:**
```
<div class="answer-table-wrap"><table class="answer-table">
<thead><tr><th>Col</th><th>What it means (simple)</th></tr></thead>
<tbody><tr><td><strong>X</strong></td><td>...</td></tr></tbody>
</table></div>
```

6. **Process / classification flowchart:**
```
<div class="flowchart"><div class="flowchart-title">Flowchart: ...</div>
<div class="flowchart-container">
<div class="flow-box highlight">Start</div><div class="flow-arrow">&darr;</div>
<div class="flow-branch">
<div class="flow-branch-item"><div class="flow-branch-line"></div><div class="flow-box">A</div></div>
<div class="flow-branch-item"><div class="flow-branch-line"></div><div class="flow-box">B</div></div>
</div></div></div>
```

7. **Mnemonic** (add where a memory aid helps):
```
<div class="mnemonic-box"><div class="mnemonic-label">Mnemonic for ...</div>
<div class="mnemonic-word"><span>A</span>-<span>B</span>-<span>C</span></div>
<div class="mnemonic-explain"><strong>A</strong> = ...<br><strong>B</strong> = ...</div></div>
```

8. **Relatable example:** `<div class="editorial-example"><strong>Relatable Example:</strong> a short Indian real-life scenario.</div>`

9. **Analogy** (where useful): `<div class="analogy-box"><strong>Think of it like&hellip;</strong> a simple everyday analogy.</div>`

10. **Exam keywords:** `<div class="keyword-box"><strong>Keywords examiner wants:</strong> <span class="kw">term1</span><span class="kw">term2</span></div>`

11. **Don't Confuse** (where students mix up terms):
   `<div class="dont-confuse"><strong>Don't Confuse:</strong> <br><strong>X vs Y:</strong> ...</div>`

12. **Exam strategy** — REQUIRED for 13- and 15-mark questions:
   `<div class="exam-strategy"><strong>How to Write This in Exam (15 marks):</strong> <br>&bull; Part — <strong>N marks</strong> (~min) <br>...</div>`

13. **Quick revision** (add in 5/13/15-mark answers):
   `<div class="remember-box"><div class="remember-title">Quick Revision — Things to Remember</div><ul><li>...</li></ul></div>`

14. **End EVERY answer with these two blocks (in this order):**
```
<div class="glossary"><div class="glossary-title">Full Forms &amp; Easy Meanings</div>
<ul>
<li><span class="term">ABBR</span> Full Expansion &mdash; easy meaning</li>
</ul></div>

<div class="self-test"><div class="self-test-title">Test Yourself (cover the answers first!)</div>
<details><summary>A question?</summary><p>The answer.</p></details>
<details><summary>Another question?</summary><p>The answer.</p></details>
</div>
```
(3–5 `<details>` items for 5/15-mark, 2–3 for short answers.)

---

## DEPTH BY MARKS

- **15 / 13 marks:** comprehensive. Definition → classification/causes → detailed management (with tables &
  a flowchart) → nurse's/midwife's role → conclusion (`<div class="conclusion-box">...</div>`).
  6–9 answer-sections. MUST include exam-strategy.
- **5 marks:** focused but complete. Intro/definition → main content (points + one table or flowchart) →
  one mnemonic OR example → glossary + self-test. 3–5 sections.
- **3 / 2 marks:** short. Definition + key points + one helpful box + glossary + short self-test. 2–3 sections.

---

## VERIFY BEFORE FINISHING

Run this and make sure it prints the correct count with NO error (fix any syntax error, usually a stray
backtick or `${` inside an answer):
```
node -e "global.window={}; require('./<YOUR_FILE>.js'); console.log(window.<YOUR_VAR>.length)"
```

Your final reply should be a 2–3 line summary only (the work is the file you wrote).
