// inject-images.js
// Injects <img> figure-blocks into answers that benefit from visual illustrations.
// Run once: node inject-images.js

const fs = require('fs');

// Map: questionId -> { file, image, caption }
const imageMap = [
  // Unit 1
  { id: 2,  file: 'data.js',       var: 'QUESTIONS_DATA',       image: 'maternal_mortality.png', caption: 'Fig: Causes of Maternal Mortality' },
  { id: 4,  file: 'data.js',       var: 'QUESTIONS_DATA',       image: 'nurse_role.png',         caption: 'Fig: Role of Nurse Midwife in Maternal Care' },
  { id: 9,  file: 'data.js',       var: 'QUESTIONS_DATA',       image: 'safe_motherhood.png',    caption: 'Fig: Four Pillars of Safe Motherhood' },

  // Unit 2
  { id: 12, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'female_pelvis.png',      caption: 'Fig: Female Pelvis &mdash; Anterior View' },
  { id: 13, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'female_pelvis.png',      caption: 'Fig: Female Pelvis &mdash; Bones, Joints and Diameters' },
  { id: 14, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'menstrual_cycle.png',    caption: 'Fig: Menstrual Cycle &mdash; Phases and Hormone Levels' },
  { id: 15, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'fertilization.png',      caption: 'Fig: Process of Fertilization' },
  { id: 16, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'fetal_circulation.png',   caption: 'Fig: Fetal Circulation with Shunts' },
  { id: 17, file: 'data-unit2.js',  var: 'QUESTIONS_DATA_UNIT2', image: 'placenta_anatomy.png',   caption: 'Fig: Placenta &mdash; Cross-Section Anatomy' },

  // Unit 3
  { id: 36, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'fetal_skull.png',        caption: 'Fig: Fetal Skull &mdash; Bones, Sutures, Fontanelles and Diameters' },
  { id: 35, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'female_pelvis.png',      caption: 'Fig: Types of Female Pelvis' },
  { id: 39, file: 'data-unit3.js',  var: 'QUESTIONS_DATA_UNIT3', image: 'leopolds_maneuvers.png', caption: "Fig: Leopold's Four Manoeuvres" },

  // Unit 4
  { id: 44, file: 'data-unit4.js',  var: 'QUESTIONS_DATA_UNIT4', image: 'mechanism_of_labour.png', caption: 'Fig: Cardinal Movements (Mechanism) of Labour' },
  { id: 47, file: 'data-unit4.js',  var: 'QUESTIONS_DATA_UNIT4', image: 'mechanism_of_labour.png', caption: 'Fig: Mechanism of Normal Labour in Vertex Presentation' },
  { id: 48, file: 'data-unit4.js',  var: 'QUESTIONS_DATA_UNIT4', image: 'partograph.png',         caption: 'Fig: WHO Modified Partograph' },
  { id: 49, file: 'data-unit4.js',  var: 'QUESTIONS_DATA_UNIT4', image: 'episiotomy_types.png',   caption: 'Fig: Types of Episiotomy' },
  { id: 60, file: 'data-unit4.js',  var: 'QUESTIONS_DATA_UNIT4', image: 'mechanism_of_labour.png', caption: 'Fig: Cardinal Movements of Labour' },

  // Unit 5
  { id: 62, file: 'data-unit5.js',  var: 'QUESTIONS_DATA_UNIT5', image: 'uterine_involution.png', caption: 'Fig: Uterine Involution &mdash; Day-by-Day Descent' },
  { id: 65, file: 'data-unit5.js',  var: 'QUESTIONS_DATA_UNIT5', image: 'breastfeeding_latch.png', caption: 'Fig: Correct Breastfeeding Position and Attachment' },
  { id: 67, file: 'data-unit5.js',  var: 'QUESTIONS_DATA_UNIT5', image: 'breastfeeding_latch.png', caption: 'Fig: Breastfeeding &mdash; Positioning and Common Problems' },

  // Unit 6
  { id: 72, file: 'data-unit6.js',  var: 'QUESTIONS_DATA_UNIT6', image: 'newborn_assessment.png', caption: 'Fig: Head-to-Toe Neonatal Assessment' },

  // Unit 7
  { id: 79, file: 'data-unit7.js',  var: 'QUESTIONS_DATA_UNIT7', image: 'copper_t_iucd.png',     caption: 'Fig: Copper-T 380A IUCD &mdash; Structure and Placement' },
  { id: 81, file: 'data-unit7.js',  var: 'QUESTIONS_DATA_UNIT7', image: 'copper_t_iucd.png',     caption: 'Fig: Intrauterine Contraceptive Device (IUCD)' },
  { id: 82, file: 'data-unit7.js',  var: 'QUESTIONS_DATA_UNIT7', image: 'copper_t_iucd.png',     caption: 'Fig: IUCD &mdash; Types and Placement' },
  { id: 83, file: 'data-unit7.js',  var: 'QUESTIONS_DATA_UNIT7', image: 'copper_t_iucd.png',     caption: 'Fig: Copper-T 380A' },
];

// Build the figure-block HTML for an image
function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

// Group by file
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
    
    // Strategy: insert the image right after the first <div class="in-short">...</div> block
    // for the matching question id.
    //
    // We find `id: XX,` then find the first `</div>` that closes the in-short div after it,
    // and inject the figure-block right after.
    
    const idPattern = `id: ${entry.id},`;
    const idIdx = content.indexOf(idPattern);
    if (idIdx === -1) {
      console.log(`  [SKIP] id: ${entry.id} not found in ${filename}`);
      continue;
    }

    // Find the in-short closing tag after this id
    const afterId = content.substring(idIdx);
    const inShortStart = afterId.indexOf('<div class="in-short">');
    if (inShortStart === -1) {
      console.log(`  [SKIP] id: ${entry.id} — no in-short div found`);
      continue;
    }
    
    // Find the closing </div> for the in-short
    const inShortEnd = afterId.indexOf('</div>', inShortStart);
    if (inShortEnd === -1) {
      console.log(`  [SKIP] id: ${entry.id} — could not find in-short closing tag`);
      continue;
    }

    // Check if an image for this exact file is already injected
    const nextChunk = afterId.substring(inShortEnd, inShortEnd + 300);
    if (nextChunk.includes(entry.image)) {
      console.log(`  [SKIP] id: ${entry.id} — image already present`);
      continue;
    }

    // Insert right after the </div> of in-short
    const globalInsertPos = idIdx + inShortEnd + 6; // +6 for '</div>'
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

// Quick verify — load each file and count questions
for (const filename of Object.keys(byFile)) {
  try {
    global.window = {};
    delete require.cache[require.resolve('./' + filename)];
    require('./' + filename);
    const varName = imageMap.find(e => e.file === filename).var;
    const count = (window[varName] || []).length;
    console.log(`  ✓ ${filename} loads OK — ${count} questions`);
  } catch (err) {
    console.error(`  ✗ ${filename} BROKEN: ${err.message}`);
  }
}
