/**
 * MUHS Nursing Exam Answer Enhancer
 *
 * Run with: node enhance-answers.js
 *
 * This script audits all data files and reports which answers are missing:
 * - Introduction section
 * - Definition box
 * - Conclusion section
 * - Flowchart
 * - Animation classes
 *
 * It also applies automatic structural fixes where possible.
 *
 * MUHS Format Standard (Sakshi Sis-star✨):
 *   1. Introduction (2-3 lines)
 *   2. Definition (inside .definition-box)
 *   3. Main Content (headings, tables)
 *   4. Flowchart (when applicable)
 *   5. Mnemonic box
 *   6. Remember box
 *   7. Conclusion (2-3 exam lines)
 */

const fs = require('fs');
const path = require('path');

const BASE = path.dirname(__filename);

const FILES = [
  { file: 'data.js',        name: 'OBG-1 Unit 1' },
  { file: 'data-unit2.js',  name: 'OBG-1 Unit 2' },
  { file: 'data-unit3.js',  name: 'OBG-1 Unit 3' },
  { file: 'data-unit4.js',  name: 'OBG-1 Unit 4' },
  { file: 'data-unit5.js',  name: 'OBG-1 Unit 5' },
  { file: 'data-unit6.js',  name: 'OBG-1 Unit 6' },
  { file: 'data-unit7.js',  name: 'OBG-1 Unit 7' },
  { file: 'data-obg2.js',   name: 'OBG-2 (Units 8-11)' },
];

/**
 * Analyze a file and report issues.
 */
function auditFile(filepath, name) {
  const content = fs.readFileSync(filepath, 'utf8');
  const idMatches = [...content.matchAll(/id:\s*(\d+)/g)];
  const answerMatches = [...content.matchAll(/answer:\s*`/g)];

  const issues = [];
  let totalOk = 0;

  for (let i = 0; i < answerMatches.length; i++) {
    const start = answerMatches[i].index + answerMatches[i][0].length;
    let end = start;
    while (end < content.length && content[end] !== '`') end++;
    const ans = content.slice(start, end);

    let qid = '?';
    for (let j = idMatches.length - 1; j >= 0; j--) {
      if (idMatches[j].index < answerMatches[i].index) { qid = idMatches[j][1]; break; }
    }

    const problems = [];
    if (ans.trim().length < 300) problems.push('STUB/EMPTY');
    if (!ans.includes('Introduction')) problems.push('no-intro');
    if (!ans.includes('definition-box')) problems.push('no-def-box');
    if (!ans.toLowerCase().includes('conclusion')) problems.push('no-conclusion');
    if (!ans.toLowerCase().includes('flowchart')) problems.push('no-flowchart');
    if (!ans.includes('animate-')) problems.push('no-animations');

    if (problems.length) {
      issues.push({ qid, len: ans.trim().length, problems });
    } else {
      totalOk++;
    }
  }

  return { name, total: answerMatches.length, ok: totalOk, issues };
}

/**
 * Print a full audit report.
 */
function runAudit() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  MUHS NURSING EXAM ANSWER AUDIT REPORT');
  console.log('═══════════════════════════════════════════════════\n');

  let grandTotal = 0, grandOk = 0, grandIssues = 0;

  FILES.forEach(({ file, name }) => {
    const filepath = path.join(BASE, file);
    if (!fs.existsSync(filepath)) {
      console.log(`[SKIP] ${name}: file not found`);
      return;
    }
    const result = auditFile(filepath, name);
    grandTotal += result.total;
    grandOk += result.ok;
    grandIssues += result.issues.length;

    const pct = result.total ? Math.round((result.ok / result.total) * 100) : 0;
    const status = pct === 100 ? '✓ PERFECT' : (pct >= 80 ? '~ MOSTLY OK' : '✗ NEEDS WORK');
    console.log(`\n${name} [${pct}% ${status}] — ${result.ok}/${result.total} complete`);

    if (result.issues.length > 0) {
      result.issues.forEach(({ qid, len, problems }) => {
        console.log(`  Q${qid} (len=${len}): [${problems.join(', ')}]`);
      });
    }
  });

  console.log('\n═══════════════════════════════════════════════════');
  console.log(`OVERALL: ${grandOk}/${grandTotal} complete (${Math.round(grandOk/grandTotal*100)}%)`);
  console.log(`Issues remaining: ${grandIssues} questions need enhancement`);
  console.log('═══════════════════════════════════════════════════\n');
}

/**
 * Add animate-slide-up class to existing answer-section divs that lack animations.
 * This is a safe, non-destructive structural fix.
 */
function addMissingAnimations(content) {
  // Add animate-slide-up to answer-section divs that don't have animation classes
  return content.replace(
    /<div class="answer-section">/g,
    '<div class="answer-section animate-slide-up">'
  ).replace(
    /<div class="flowchart">/g,
    '<div class="flowchart animate-fade-in">'
  ).replace(
    /<div class="mnemonic-box">/g,
    '<div class="mnemonic-box animate-scale-in">'
  ).replace(
    /<div class="definition-box">/g,
    '<div class="definition-box animate-scale-in">'
  );
}

/**
 * Apply animation fixes to all files.
 */
function fixAnimations() {
  console.log('\nAdding missing animation classes to all files...\n');
  FILES.forEach(({ file, name }) => {
    const filepath = path.join(BASE, file);
    if (!fs.existsSync(filepath)) return;

    const original = fs.readFileSync(filepath, 'utf8');
    const enhanced = addMissingAnimations(original);

    if (enhanced !== original) {
      fs.writeFileSync(filepath, enhanced, 'utf8');
      const count = (original.match(/<div class="answer-section">/g) || []).length;
      console.log(`  ${name}: added animations to ${count} sections`);
    } else {
      console.log(`  ${name}: animations already present`);
    }
  });
  console.log('\nDone! Run audit again to check remaining issues.\n');
}

// ─── CLI ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes('--fix-animations')) {
  fixAnimations();
  runAudit();
} else if (args.includes('--audit')) {
  runAudit();
} else {
  console.log('Usage:');
  console.log('  node enhance-answers.js --audit            (report what is missing)');
  console.log('  node enhance-answers.js --fix-animations   (add missing CSS animation classes)');
  console.log('');
  console.log('Running audit by default...');
  runAudit();
}
