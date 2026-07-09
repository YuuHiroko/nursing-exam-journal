const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

// Batch 1 Disorders Mapping
const batch1DisorderMap = [
  // Upgrades (these replace the old specific images or fallbacks)
  { regex: /breech/i, image: 'disorder_breech_types.png', caption: 'Breech Presentation Types' },
  { regex: /contracted pelvis/i, image: 'disorder_pelvis_types.png', caption: 'Types of Maternal Pelvis' },
  
  // New specific images
  { regex: /ectopic pregnancy/i, image: 'disorder_ectopic_pregnancy.png', caption: 'Ectopic Pregnancy' },
  { regex: /abortion|miscarriage|MTP|termination of pregnancy/i, image: 'disorder_abortion_types.png', caption: 'Abortion / Miscarriage' },
  { regex: /caesarean section|cesarean section|c-section/i, image: 'disorder_caesarean_section.png', caption: 'Caesarean Section' },
  { regex: /oligohydramnios/i, image: 'disorder_oligohydramnios.png', caption: 'Oligohydramnios' },
  { regex: /IUGR|intrauterine growth/i, image: 'disorder_iugr.png', caption: 'Intrauterine Growth Restriction' }
];

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

// Images we are allowed to replace
const replaceableImages = [
  'high_risk_pregnancy.png', 
  'abnormal_labour.png', 
  'high_risk_newborn.png', 
  'gynaecological_disorders.png',
  'disorder_breech_presentation.png', // Overwriting previous simpler image
  'disorder_contracted_pelvis.png'    // Overwriting previous simpler image
];

filenames.forEach(filename => {
  if (!fs.existsSync(filename)) return;
  
  let content = fs.readFileSync(filename, 'utf8');
  
  // Clear require cache
  delete require.cache[require.resolve('./' + filename)];
  global.window = {};
  require('./' + filename);
  const questions = window.QUESTIONS_DATA_OBG2;
  
  if (!questions) return;

  let replacedCount = 0;
  
  questions.forEach(q => {
    // Find matching disorder
    const match = batch1DisorderMap.find(d => d.regex.test(q.question));
    if (!match) return; 
    
    // Find where the figure block is for this question
    const idPattern = `id: ${q.id},`;
    let idIdx = content.indexOf(idPattern);
    if (idIdx === -1) return;
    
    const afterId = content.substring(idIdx);
    // Find the next figure block
    const figStart = afterId.indexOf('<div class="figure-block">');
    // Ensure this figure block is part of THIS question (before next id: or end)
    const nextIdIdx = afterId.indexOf('id: ', 10);
    if (figStart === -1 || (nextIdIdx !== -1 && figStart > nextIdIdx)) return;
    
    const figEnd = afterId.indexOf('</div></div>', figStart) + 12;
    const existingFigHtml = afterId.substring(figStart, figEnd);
    
    // Check if it's already updated
    if (existingFigHtml.includes(match.image)) return;
    
    // Only replace if it's a fallback or one of the upgraded simple ones
    const isReplaceable = replaceableImages.some(img => existingFigHtml.includes(img));
    
    if (isReplaceable) {
       const globalInsertPos = idIdx + figStart;
       const figHtml = makeFigureHtml(match.image, match.caption).trim(); 
       content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos + existingFigHtml.length);
       replacedCount++;
       console.log(`[Batch 1 - REPLACED ${filename}] id: ${q.id} <- ${match.image}`);
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully replaced ${replacedCount} images for Batch 1 in ${filename}.\n`);
});
