// inject-diagrams.js
// Injects <div data-diagram="..."></div> placeholders into answers.
// These are activated by diagrams.js + app.js at runtime.

const fs = require('fs');

// Map: questionId -> { file, diagram name, insertAfter }
const diagramMap = [
  // Unit 2
  { id: 14, file: 'data-unit2.js', diagram: 'menstrualCycle' },
  { id: 16, file: 'data-unit2.js', diagram: 'fetalCirculation' },
  { id: 17, file: 'data-unit2.js', diagram: 'placentaFunctions' },

  // Unit 3
  { id: 36, file: 'data-unit3.js', diagram: 'fetalSkull' },
  { id: 37, file: 'data-unit3.js', diagram: 'fetalSkull' },

  // Unit 4
  { id: 42, file: 'data-unit4.js', diagram: 'mechanismOfLabour' },
  { id: 44, file: 'data-unit4.js', diagram: 'mechanismOfLabour' },
  { id: 47, file: 'data-unit4.js', diagram: 'mechanismOfLabour' },
  { id: 56, file: 'data-unit4.js', diagram: 'apgarScore' },
  { id: 60, file: 'data-unit4.js', diagram: 'mechanismOfLabour' },

  // Unit 6
  { id: 70, file: 'data-unit6.js', diagram: 'essentialNewbornCare' },
  { id: 71, file: 'data-unit6.js', diagram: 'essentialNewbornCare' },
  { id: 73, file: 'data-unit6.js', diagram: 'apgarScore' },
];

const placeholder = (name) => `\n<div data-diagram="${name}"></div>\n`;

// Group by file
const byFile = {};
diagramMap.forEach(e => {
  if (!byFile[e.file]) byFile[e.file] = [];
  byFile[e.file].push(e);
});

let total = 0;

for (const [filename, entries] of Object.entries(byFile)) {
  let content = fs.readFileSync(filename, 'utf8');
  let injected = 0;

  for (const entry of entries) {
    const tag = placeholder(entry.diagram);

    // Find the question by id
    const idPattern = `id: ${entry.id},`;
    const idIdx = content.indexOf(idPattern);
    if (idIdx === -1) {
      console.log(`  [SKIP] id: ${entry.id} not found in ${filename}`);
      continue;
    }

    // Check if already injected
    const nextBlock = content.substring(idIdx, idIdx + 2000);
    if (nextBlock.includes(`data-diagram="${entry.diagram}"`)) {
      console.log(`  [SKIP] id: ${entry.id} — diagram already present`);
      continue;
    }

    // Find the conclusion section to insert before it
    const afterId = content.substring(idIdx);
    
    // Strategy: insert before the keyword-box or conclusion-box (near end of answer)
    const keywordIdx = afterId.indexOf('<div class="keyword-box">');
    const conclusionIdx = afterId.indexOf('<div class="conclusion-box">');
    
    // Find the remember-box before conclusion
    const rememberIdx = afterId.indexOf('<div class="remember-box">');
    
    // Pick the best insertion point — before the remember-box is ideal
    let insertionPoint = -1;
    
    if (rememberIdx !== -1) {
      insertionPoint = rememberIdx;
    } else if (keywordIdx !== -1) {
      insertionPoint = keywordIdx;
    } else if (conclusionIdx !== -1) {
      insertionPoint = conclusionIdx;
    }

    if (insertionPoint === -1) {
      console.log(`  [SKIP] id: ${entry.id} — no insertion point found`);
      continue;
    }

    // Find the answer-section div before the insertion point
    const beforeInsert = afterId.substring(0, insertionPoint);
    const lastSectionClose = beforeInsert.lastIndexOf('</div>');
    
    if (lastSectionClose === -1) {
      console.log(`  [SKIP] id: ${entry.id} — no </div> before insertion point`);
      continue;
    }

    const globalInsertPos = idIdx + lastSectionClose + 6;
    content = content.substring(0, globalInsertPos) + tag + content.substring(globalInsertPos);
    injected++;
    total++;
    console.log(`  [OK]   id: ${entry.id} ← ${entry.diagram}`);
  }

  if (injected > 0) {
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`  ✓ ${filename}: ${injected} diagram(s) injected\n`);
  }
}

console.log(`\nDone! Total diagrams injected: ${total}`);

// Verify all files load OK
for (const filename of Object.keys(byFile)) {
  try {
    global.window = global.window || {};
    delete require.cache[require.resolve('./' + filename)];
    require('./' + filename);
    console.log(`  ✓ ${filename} loads OK`);
  } catch (err) {
    console.error(`  ✗ ${filename} BROKEN: ${err.message}`);
  }
}
