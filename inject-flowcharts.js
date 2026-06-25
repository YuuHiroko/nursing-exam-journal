/**
 * MUHS Flowchart Injector
 *
 * Reads generated-flowcharts.json and appends missing flowchart divs
 * to each answer that doesn't already have one.
 *
 * Usage:  node inject-flowcharts.js [--dry-run]
 */

const fs   = require('fs');
const path = require('path');

const BASE    = path.dirname(__filename);
const DRY_RUN = process.argv.includes('--dry-run');

const ALL_FILES = [
  'data.js', 'data-unit2.js', 'data-unit3.js', 'data-unit4.js',
  'data-unit5.js', 'data-unit6.js', 'data-unit7.js', 'data-obg2.js',
];

function processFile(filepath, qmap) {
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = 0;

  for (const [qidStr, flowchart] of Object.entries(qmap)) {
    if (!flowchart || !flowchart.trim()) continue;

    const qid      = parseInt(qidStr);
    const idMarker = `id: ${qid},`;
    const idIdx    = content.indexOf(idMarker);
    if (idIdx === -1) continue;

    const ansTag    = 'answer: `';
    const ansTagIdx = content.indexOf(ansTag, idIdx);
    if (ansTagIdx === -1) continue;
    const ansStart  = ansTagIdx + ansTag.length;

    let ansEnd = ansStart;
    while (ansEnd < content.length && content[ansEnd] !== '`') ansEnd++;
    const original = content.slice(ansStart, ansEnd);

    // Skip if already has a flowchart
    if (original.toLowerCase().includes('flowchart')) continue;

    // Insert flowchart before the closing remember-box or at end
    let insertPos = original.length;
    // Try to insert before the last remember-box or glossary
    const lastRemember = original.lastIndexOf('<div class="remember-box');
    const lastGlossary = original.lastIndexOf('<div class="glossary"');
    if (lastRemember !== -1 && lastGlossary !== -1) insertPos = Math.min(lastRemember, lastGlossary);
    else if (lastRemember !== -1) insertPos = lastRemember;
    else if (lastGlossary !== -1) insertPos = lastGlossary;

    const updated = original.slice(0, insertPos).trimEnd() +
      '\n\n' + flowchart.trim() + '\n\n' +
      original.slice(insertPos);

    content = content.slice(0, ansStart) + updated + content.slice(ansEnd);
    modified++;
    console.log(`  Q${qid}: flowchart injected`);
  }

  if (modified > 0) {
    if (!DRY_RUN) fs.writeFileSync(filepath, content, 'utf8');
    console.log(`${path.basename(filepath)}: ${modified} flowcharts added${DRY_RUN ? ' (dry-run)' : ''}`);
  } else {
    console.log(`${path.basename(filepath)}: nothing to inject`);
  }
  return modified;
}

// ── main ─────────────────────────────────────────────────────────────────────

const jsonPath = path.join(BASE, 'generated-flowcharts.json');
if (!fs.existsSync(jsonPath)) {
  console.error('generated-flowcharts.json not found. Run the flowchart generation workflow first.');
  process.exit(1);
}

const flowcharts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Loaded ${Object.keys(flowcharts).length} flowcharts from generated-flowcharts.json\n`);

// Build file → { qid → flowchart } map
const fileMap = {};
for (const fname of ALL_FILES) {
  const c = fs.readFileSync(path.join(BASE, fname), 'utf8');
  for (const [qidStr, html] of Object.entries(flowcharts)) {
    if (c.includes(`id: ${parseInt(qidStr)},`)) {
      if (!fileMap[fname]) fileMap[fname] = {};
      fileMap[fname][qidStr] = html;
    }
  }
}

let total = 0;
for (const [fname, qmap] of Object.entries(fileMap)) {
  total += processFile(path.join(BASE, fname), qmap);
}

console.log(`\nTotal: ${total} flowcharts injected${DRY_RUN ? ' (dry-run)' : ''}.`);
console.log('Run: node enhance-answers.js --audit  to check remaining issues.');
