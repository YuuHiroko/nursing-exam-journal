/**
 * Merge generated section batches and inject them all in one pass.
 * Usage: node merge-and-inject.js [--dry-run]
 */

const fs   = require('fs');
const path = require('path');
const BASE    = path.dirname(__filename);
const DRY_RUN = process.argv.includes('--dry-run');

// ── merge batch files ─────────────────────────────────────────────────────────
const BATCH_KEYS = ['u1','u2','u3','u4','u5','u6','u7','oa','ob','oc','od'];
let sections = {};
let found = 0;

for (const key of BATCH_KEYS) {
  const p = path.join(BASE, `gs-batch-${key}.json`);
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    // Normalise keys — some batches use 'Q62', others '62'
    for (const [k, v] of Object.entries(data)) {
      sections[k.replace(/^Q/i, '')] = v;
    }
    found++;
    console.log(`gs-batch-${key}.json: ${Object.keys(data).length} entries`);
  } else {
    console.warn(`MISSING: gs-batch-${key}.json`);
  }
}

// Also load generated-sections.json if it already exists (from earlier attempts)
const prevPath = path.join(BASE, 'generated-sections.json');
if (fs.existsSync(prevPath)) {
  const prev = JSON.parse(fs.readFileSync(prevPath, 'utf8'));
  for (const [k, v] of Object.entries(prev)) sections[k.replace(/^Q/i, '')] = v;
  console.log(`generated-sections.json: ${Object.keys(prev).length} entries (merged)`);
}

const total = Object.keys(sections).length;
console.log(`\nTotal merged: ${total} sections from ${found} batch files\n`);

if (total === 0) {
  console.error('No sections found — batch files may not have been written yet.');
  process.exit(1);
}

// Save merged file
if (!DRY_RUN) {
  fs.writeFileSync(path.join(BASE, 'generated-sections.json'), JSON.stringify(sections, null, 2));
  console.log('Saved generated-sections.json\n');
}

// ── inject ────────────────────────────────────────────────────────────────────
const ALL_FILES = [
  'data.js', 'data-unit2.js', 'data-unit3.js', 'data-unit4.js',
  'data-unit5.js', 'data-unit6.js', 'data-unit7.js', 'data-obg2.js',
];

function findDivClose(s, openIdx) {
  let depth = 0, i = openIdx;
  while (i < s.length) {
    if (s.startsWith('<div', i))       { depth++; i += 4; }
    else if (s.startsWith('</div>', i)) { depth--; i += 6; if (depth === 0) return i; }
    else i++;
  }
  return -1;
}

function afterInShort(ans) {
  const idx = ans.indexOf('class="in-short"');
  if (idx === -1) return 0;
  let start = idx;
  while (start > 0 && ans[start] !== '<') start--;
  const end = findDivClose(ans, start);
  return end !== -1 ? end : 0;
}

function afterIntroSection(ans) {
  const marker = 'answer-section-title">Introduction';
  const idx = ans.indexOf(marker);
  if (idx === -1) return -1;
  let start = idx;
  while (start > 0 && ans[start] !== '<') start--;
  let outerStart = start - 1;
  while (outerStart > 0 && ans[outerStart] !== '<') outerStart--;
  if (ans.startsWith('<div', outerStart)) start = outerStart;
  const end = findDivClose(ans, start);
  return end !== -1 ? end : -1;
}

function inject(ans, secs) {
  let out = ans;

  if (secs.intro && secs.intro.trim() && !out.includes('>Introduction<')) {
    const pos = afterInShort(out);
    out = out.slice(0, pos) + '\n\n' + secs.intro.trim() + '\n' + out.slice(pos);
  }

  if (secs.def && secs.def.trim() && !out.includes('definition-box')) {
    let pos = afterIntroSection(out);
    if (pos === -1) pos = afterInShort(out);
    out = out.slice(0, pos) + '\n\n' + secs.def.trim() + '\n' + out.slice(pos);
  }

  if (secs.conclusion && secs.conclusion.trim() && !out.toLowerCase().includes('conclusion')) {
    out = out.trimEnd() + '\n\n' + secs.conclusion.trim() + '\n';
  }

  return out;
}

// Build file → questions map
const fileMap = {};
for (const fname of ALL_FILES) {
  const c = fs.readFileSync(path.join(BASE, fname), 'utf8');
  for (const [qidStr, secs] of Object.entries(sections)) {
    if (c.includes(`id: ${parseInt(qidStr)},`)) {
      if (!fileMap[fname]) fileMap[fname] = {};
      fileMap[fname][qidStr] = secs;
    }
  }
}

let grandTotal = 0;
for (const [fname, qmap] of Object.entries(fileMap)) {
  const filepath = path.join(BASE, fname);
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = 0;

  for (const [qidStr, secs] of Object.entries(qmap)) {
    const qid = parseInt(qidStr);
    const idIdx = content.indexOf(`id: ${qid},`);
    if (idIdx === -1) continue;
    const ansTag = 'answer: `';
    const ansTagIdx = content.indexOf(ansTag, idIdx);
    if (ansTagIdx === -1) continue;
    const ansStart = ansTagIdx + ansTag.length;
    let ansEnd = ansStart;
    while (ansEnd < content.length && content[ansEnd] !== '`') ansEnd++;
    const original = content.slice(ansStart, ansEnd);
    const updated  = inject(original, secs);
    if (updated !== original) {
      content = content.slice(0, ansStart) + updated + content.slice(ansEnd);
      modified++;
      const added = [];
      if (secs.intro      && !original.includes('>Introduction<'))             added.push('intro');
      if (secs.def        && !original.includes('definition-box'))              added.push('def');
      if (secs.conclusion && !original.toLowerCase().includes('conclusion'))    added.push('conc');
      console.log(`  Q${qid}: +[${added.join(',')}]`);
    }
  }

  if (modified > 0) {
    if (!DRY_RUN) fs.writeFileSync(filepath, content, 'utf8');
    console.log(`${fname}: ${modified} questions updated${DRY_RUN ? ' (dry-run)' : ''}`);
  } else {
    console.log(`${fname}: nothing to inject`);
  }
  grandTotal += modified;
}

console.log(`\nDone — ${grandTotal} questions enhanced.`);
console.log('Run: node enhance-answers.js --audit');
