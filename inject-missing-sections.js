/**
 * MUHS Answer Enhancer — Targeted Section Injector
 *
 * Reads generated-sections.json, injects missing intro/def/conclusion
 * into the exact right position in each answer. Safe: only adds, never removes.
 *
 * Usage:  node inject-missing-sections.js [--dry-run]
 */

const fs   = require('fs');
const path = require('path');

const BASE    = path.dirname(__filename);
const DRY_RUN = process.argv.includes('--dry-run');

const ALL_FILES = [
  'data.js', 'data-unit2.js', 'data-unit3.js', 'data-unit4.js',
  'data-unit5.js', 'data-unit6.js', 'data-unit7.js', 'data-obg2.js',
];

// ── helpers ──────────────────────────────────────────────────────────────────

/** Find the character index just after the outermost </div> for the tag
 *  that starts at `openIdx` in `s`. Handles nested divs. */
function findDivClose(s, openIdx) {
  let depth = 0, i = openIdx;
  while (i < s.length) {
    if (s.startsWith('<div', i))       { depth++; i += 4; }
    else if (s.startsWith('</div>', i)) { depth--; i += 6; if (depth === 0) return i; }
    else i++;
  }
  return -1; // unmatched
}

/** Return the index right after the `<div class="in-short">` block, or 0. */
function afterInShort(ans) {
  const idx = ans.indexOf('class="in-short"');
  if (idx === -1) return 0;
  // walk back to the opening < of this div
  let start = idx;
  while (start > 0 && ans[start] !== '<') start--;
  const end = findDivClose(ans, start);
  return end !== -1 ? end : 0;
}

/** Return index right after the Introduction answer-section block, or -1. */
function afterIntroSection(ans) {
  const marker = 'answer-section-title">Introduction';
  const idx = ans.indexOf(marker);
  if (idx === -1) return -1;
  let start = idx;
  while (start > 0 && ans[start] !== '<') start--;
  // the intro section div starts a bit before the h3; walk back one more div
  let outerStart = start - 1;
  while (outerStart > 0 && ans[outerStart] !== '<') outerStart--;
  if (ans.startsWith('<div', outerStart)) start = outerStart;
  const end = findDivClose(ans, start);
  return end !== -1 ? end : -1;
}

// ── core ─────────────────────────────────────────────────────────────────────

function injectIntoAnswer(ans, secs) {
  let out = ans;

  // 1. Introduction — insert right after in-short (or at position 0)
  if (secs.intro && secs.intro.trim() && !out.includes('>Introduction<')) {
    const pos = afterInShort(out);
    out = out.slice(0, pos) + '\n\n' + secs.intro.trim() + '\n' + out.slice(pos);
  }

  // 2. Definition — insert right after introduction section (or after in-short)
  if (secs.def && secs.def.trim() && !out.includes('definition-box')) {
    let pos = afterIntroSection(out);
    if (pos === -1) pos = afterInShort(out);
    out = out.slice(0, pos) + '\n\n' + secs.def.trim() + '\n' + out.slice(pos);
  }

  // 3. Conclusion — append at end
  if (secs.conclusion && secs.conclusion.trim() && !out.toLowerCase().includes('conclusion')) {
    out = out.trimEnd() + '\n\n' + secs.conclusion.trim() + '\n';
  }

  return out;
}

function processFile(filepath, qmap) {
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = 0;

  for (const [qidStr, secs] of Object.entries(qmap)) {
    const qid = parseInt(qidStr);
    const idMarker = `id: ${qid},`;
    const idIdx = content.indexOf(idMarker);
    if (idIdx === -1) continue;

    const ansTag   = 'answer: `';
    const ansTagIdx = content.indexOf(ansTag, idIdx);
    if (ansTagIdx === -1) continue;
    const ansStart = ansTagIdx + ansTag.length;

    // Find closing backtick (not escaped)
    let ansEnd = ansStart;
    while (ansEnd < content.length && content[ansEnd] !== '`') ansEnd++;

    const original = content.slice(ansStart, ansEnd);
    const updated  = injectIntoAnswer(original, secs);

    if (updated !== original) {
      content = content.slice(0, ansStart) + updated + content.slice(ansEnd);
      modified++;
      const added = [];
      if (secs.intro      && !original.includes('>Introduction<'))      added.push('intro');
      if (secs.def        && !original.includes('definition-box'))       added.push('def');
      if (secs.conclusion && !original.toLowerCase().includes('conclusion')) added.push('conc');
      console.log(`  Q${qid}: +[${added.join(',')}]`);
    }
  }

  if (modified > 0) {
    if (!DRY_RUN) fs.writeFileSync(filepath, content, 'utf8');
    console.log(`${path.basename(filepath)}: ${modified} questions updated${DRY_RUN ? ' (dry-run)' : ''}`);
  } else {
    console.log(`${path.basename(filepath)}: nothing to inject`);
  }

  return modified;
}

// ── main ─────────────────────────────────────────────────────────────────────

const jsonPath = path.join(BASE, 'generated-sections.json');
if (!fs.existsSync(jsonPath)) {
  console.error('generated-sections.json not found.');
  process.exit(1);
}

const sections = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Loaded ${Object.keys(sections).length} question entries from generated-sections.json\n`);

// Build a map: filename → { qid → secs }
const fileMap = {};
for (const fname of ALL_FILES) {
  const c = fs.readFileSync(path.join(BASE, fname), 'utf8');
  for (const [qidStr, secs] of Object.entries(sections)) {
    const qid = parseInt(qidStr);
    if (c.includes(`id: ${qid},`)) {
      if (!fileMap[fname]) fileMap[fname] = {};
      fileMap[fname][qidStr] = secs;
    }
  }
}

let totalModified = 0;
for (const [fname, qmap] of Object.entries(fileMap)) {
  const filepath = path.join(BASE, fname);
  totalModified += processFile(filepath, qmap);
}

console.log(`\nTotal: ${totalModified} questions enhanced${DRY_RUN ? ' (dry-run — files not written)' : ''}.`);
console.log('Run: node enhance-answers.js --audit  to check remaining issues.');
