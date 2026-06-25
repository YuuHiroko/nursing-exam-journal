#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// apply-all-content.js — Applies ALL complete answers in one pass
// Fixes: proper JS serialization with template literal escaping
// ═══════════════════════════════════════════════════════════════
const fs = require('fs');
global.window = {};
require('./data-obg2.js');
const questions = window.QUESTIONS_DATA_OBG2;

// ─── Load all answer content from separate files ───────────────
// We store answers in a JSON file to avoid escaping issues
const allAnswers = {};

// Helper to store answers
function addAnswer(id, html) {
  allAnswers[id] = html;
}

// ═══ ALL ANSWERS: Use external JSON to avoid escaping issues ═══
// Load pre-built answers from JSON file
const answersFile = './answers-content.json';
let contentData = {};
if (fs.existsSync(answersFile)) {
  contentData = JSON.parse(fs.readFileSync(answersFile, 'utf8'));
  console.log('Loaded ' + Object.keys(contentData).length + ' answers from JSON.');
}
// Merge into allAnswers
for (const [id, html] of Object.entries(contentData)) {
  allAnswers[parseInt(id)] = html;
}

// ═══ WRITE OUTPUT WITH CORRECT SERIALIZATION ═══════════════════
console.log('Applying ' + Object.keys(allAnswers).length + ' full answers...');
let applied = 0;

for (const q of questions) {
  if (allAnswers[q.id]) {
    // Preserve structural elements from enhance-obg2.js
    const existing = q.answer;
    let newAns = allAnswers[q.id];

    // Extract structural elements from existing answer to merge
    const extractions = [
      { regex: /\n<div class="flowchart">[\s\S]*?<\/div>\n<\/div>\n/, key: 'flowchart' },
      { regex: /\n<div class="exam-strategy">[\s\S]*?<\/div>\n/, key: 'exam-strategy' },
      { regex: /\n<div class="editorial-example">[\s\S]*?<\/div>\n/, key: 'editorial-example' },
      { regex: /\n<div class="dont-confuse">[\s\S]*?<\/div>\n/, key: 'dont-confuse' },
      { regex: /\n<div class="answer-section">\n\s*<h3[^>]*>Conclusion[\s\S]*?<\/div>\n<\/div>\n/, key: 'conclusion-box' },
      { regex: /\n<div class="glossary">[\s\S]*?<\/div>\n/, key: 'glossary' },
      { regex: /\n<div class="self-test">[\s\S]*?<\/div>\n/, key: 'self-test' },
    ];

    let extras = '';
    for (const { regex, key } of extractions) {
      if (existing.includes(key) && !newAns.includes(key)) {
        const match = existing.match(regex);
        if (match) extras += match[0];
      }
    }

    if (extras.length > 0 && newAns.includes('keyword-box')) {
      const kwIdx = newAns.lastIndexOf('<div class="keyword-box">');
      newAns = newAns.substring(0, kwIdx) + extras + '\n' + newAns.substring(kwIdx);
    } else if (extras.length > 0) {
      newAns += extras;
    }

    q.answer = newAns;
    applied++;
    console.log('  ID ' + q.id + ': ' + q.answer.length + ' chars');
  }
}

console.log('\nApplied ' + applied + ' answers.');

// ─── PROPER FILE SERIALIZATION ─────────────────────────────────
// Write using proper template literal format
let lines = [];
lines.push('// OBG-II (High-Risk / Abnormal Midwifery & Gynaecology) \u2014 previous-year questions.');
lines.push('// Enhanced with flowcharts, exam strategies, glossaries, self-tests, and editorial examples.');
lines.push('// Units: 8 = High-Risk Pregnancy | 9 = Abnormal Labour & Postnatal Problems | 10 = High-Risk Newborn | 11 = Gynaecological Disorders');
lines.push('window.QUESTIONS_DATA_OBG2 = [');

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  // Escape backticks and ${} in answer content for template literals
  const safeAnswer = (q.answer || '')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  lines.push('  {');
  lines.push('    id: ' + q.id + ',');
  lines.push('    question: ' + JSON.stringify(q.question) + ',');
  lines.push('    marks: ' + q.marks + ',');
  lines.push('    repeated: ' + q.repeated + ',');
  lines.push('    unit: ' + q.unit + ',');
  lines.push('    years: ' + JSON.stringify(q.years) + ',');
  lines.push('    answer: `');
  lines.push(safeAnswer);
  lines.push('`');
  lines.push('  }' + (i < questions.length - 1 ? ',' : ''));
}

lines.push('];');

const output = lines.join('\n') + '\n';
fs.writeFileSync('./data-obg2.js', output, 'utf8');

console.log('\nWritten to data-obg2.js (' + (output.length / 1024).toFixed(1) + ' KB)');

// Verify
delete require.cache[require.resolve('./data-obg2.js')];
global.window = {};
try {
  require('./data-obg2.js');
  console.log('VERIFICATION: Valid! ' + window.QUESTIONS_DATA_OBG2.length + ' questions loaded.');
} catch (e) {
  console.error('VERIFICATION FAILED:', e.message);
}
