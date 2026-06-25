/**
 * Inject correctly-titled flowcharts into units 3-7.
 * Usage: node inject-correct-flowcharts.js [--dry-run]
 */
const fs   = require('fs');
const path = require('path');
const BASE    = path.dirname(__filename);
const DRY_RUN = process.argv.includes('--dry-run');

const BATCH_KEYS = ['f3','f4','f5','f6','f7'];
const ALL_FILES  = ['data-unit3.js','data-unit4.js','data-unit5.js','data-unit6.js','data-unit7.js'];

// Load + normalise
let flowcharts = {};
for (const key of BATCH_KEYS) {
  const p = path.join(BASE, `fc-correct-${key}.json`);
  if (fs.existsSync(p)) {
    const raw = JSON.parse(fs.readFileSync(p,'utf8'));
    for (const [k,v] of Object.entries(raw)) {
      if (v && v.trim()) flowcharts[k.replace(/^Q/i,'')] = v;
    }
    console.log(`fc-correct-${key}.json: ${Object.keys(raw).length} entries`);
  } else console.warn(`MISSING: fc-correct-${key}.json`);
}
console.log(`\nTotal flowcharts: ${Object.keys(flowcharts).length}\n`);

// Build file map
const fileMap = {};
for (const fname of ALL_FILES) {
  const c = fs.readFileSync(path.join(BASE,fname),'utf8');
  for (const [qidStr,html] of Object.entries(flowcharts)) {
    if (c.includes(`id: ${parseInt(qidStr)},`)) {
      if (!fileMap[fname]) fileMap[fname] = {};
      fileMap[fname][qidStr] = html;
    }
  }
}

let grand = 0;
for (const [fname, qmap] of Object.entries(fileMap)) {
  const fp = path.join(BASE,fname);
  let content = fs.readFileSync(fp,'utf8');
  let modified = 0;

  for (const [qidStr,flowchart] of Object.entries(qmap)) {
    const qid = parseInt(qidStr);
    const idIdx = content.indexOf(`id: ${qid},`);
    if (idIdx === -1) continue;
    const at = content.indexOf('answer: `',idIdx);
    if (at === -1) continue;
    const as = at + 'answer: `'.length;
    let ae = as; while(ae<content.length&&content[ae]!=='`')ae++;
    const original = content.slice(as,ae);

    if (original.toLowerCase().includes('flowchart')) continue; // already has one

    // Insert before remember-box or glossary if present, else at end
    let insertPos = original.length;
    const lastRem = original.lastIndexOf('<div class="remember-box');
    const lastGlo = original.lastIndexOf('<div class="glossary"');
    if (lastRem !== -1 && lastGlo !== -1) insertPos = Math.min(lastRem,lastGlo);
    else if (lastRem !== -1) insertPos = lastRem;
    else if (lastGlo !== -1) insertPos = lastGlo;

    const updated = original.slice(0,insertPos).trimEnd() +
      '\n\n' + flowchart.trim() + '\n\n' + original.slice(insertPos);

    content = content.slice(0,as) + updated + content.slice(ae);
    modified++;
    console.log(`  Q${qid}: flowchart injected`);
  }

  if (modified > 0) {
    if (!DRY_RUN) fs.writeFileSync(fp,content,'utf8');
    console.log(`${fname}: ${modified} flowcharts added${DRY_RUN?' (dry-run)':''}`);
  } else {
    console.log(`${fname}: nothing to inject`);
  }
  grand += modified;
}
console.log(`\nDone — ${grand} flowcharts injected.`);
console.log('Run: node enhance-answers.js --audit');
