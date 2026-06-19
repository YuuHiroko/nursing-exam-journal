const fs = require('fs');

const imageMap = [
  // Unit 1
  { id: 5,  file: 'data.js',       var: 'QUESTIONS_DATA',       image: 'nurse_role.png',         caption: 'Fig: Nurse Midwife Roles' },
  { id: 8,  file: 'data.js',       var: 'QUESTIONS_DATA',       image: 'safe_motherhood.png',    caption: 'Fig: Safe Motherhood and RCH' },

  // Unit 2
  { id: 18, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'placenta_anatomy.png',   caption: 'Fig: Placental Anatomy and Separation' },

  // Unit 3 (Fixing the ID mismatches and adding more)
  { id: 28, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'safe_motherhood.png',    caption: 'Fig: Comprehensive Antenatal Care' },
  { id: 31, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'safe_motherhood.png',    caption: 'Fig: Safe Motherhood and High Risk Identification' },
  { id: 36, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'female_pelvis.png',      caption: 'Fig: Types of Female Pelvis' },
  { id: 37, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'fetal_skull.png',        caption: 'Fig: Fetal Skull &mdash; Bones, Sutures, Fontanelles and Diameters' },
  { id: 38, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'fetal_skull.png',        caption: 'Fig: Fetal Presentation and Skull Diameters' },
];

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

const byFile = {};
imageMap.forEach(entry => {
  if (!byFile[entry.file]) byFile[entry.file] = [];
  byFile[entry.file].push(entry);
});

let totalInjected = 0;

for (const [filename, entries] of Object.entries(byFile)) {
  let content = fs.readFileSync(filename, 'utf8');
  let injected = 0;

  for (const entry of entries) {
    const figHtml = makeFigureHtml(entry.image, entry.caption);
    
    const idPattern = `id: ${entry.id},`;
    const idIdx = content.indexOf(idPattern);
    if (idIdx === -1) {
      console.log(`  [SKIP] id: ${entry.id} not found in ${filename}`);
      continue;
    }

    const afterId = content.substring(idIdx);
    const inShortStart = afterId.indexOf('<div class="in-short">');
    if (inShortStart === -1) {
      console.log(`  [SKIP] id: ${entry.id} — no in-short div found`);
      continue;
    }
    
    const inShortEnd = afterId.indexOf('</div>', inShortStart);
    if (inShortEnd === -1) {
      console.log(`  [SKIP] id: ${entry.id} — could not find in-short closing tag`);
      continue;
    }

    const nextChunk = afterId.substring(inShortEnd, inShortEnd + 300);
    if (nextChunk.includes(entry.image)) {
      console.log(`  [SKIP] id: ${entry.id} — image already present`);
      continue;
    }

    const globalInsertPos = idIdx + inShortEnd + 6;
    content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos);
    injected++;
    totalInjected++;
    console.log(`  [OK]   id: ${entry.id} ← ${entry.image}`);
  }

  if (injected > 0) {
    fs.writeFileSync(filename, content, 'utf8');
    console.log(`  ✓ ${filename}: ${injected} image(s) injected\n`);
  }
}

console.log(`\nDone! Total images injected: ${totalInjected}`);
