const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

const batch2RestMap = [
  { regex: /rh incompatibility/i, image: 'disorder_rh_incompatibility.png', caption: 'Rh Incompatibility' },
  { regex: /hyperemesis gravidarum/i, image: 'disorder_hyperemesis_gravidarum.png', caption: 'Hyperemesis Gravidarum' },
  { regex: /heart disease/i, image: 'disorder_heart_disease_pregnancy.png', caption: 'Heart Disease in Pregnancy' },
  { regex: /hellp syndrome/i, image: 'disorder_hellp_syndrome.png', caption: 'HELLP Syndrome' },
  { regex: /perineal tear/i, image: 'disorder_perineal_tear.png', caption: 'Perineal Tears' }
];

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

// Fallbacks we can replace
const replaceableImages = [
  'high_risk_pregnancy.png', 
  'abnormal_labour.png', 
  'high_risk_newborn.png', 
  'gynaecological_disorders.png',
  'puerperal_complications.png'
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
    const match = batch2RestMap.find(d => d.regex.test(q.question));
    if (!match) return; 
    
    // Find where the figure block is for this question
    const idPattern = `id: ${q.id},`;
    let idIdx = content.indexOf(idPattern);
    if (idIdx === -1) return;
    
    const afterId = content.substring(idIdx);
    const figStart = afterId.indexOf('<div class="figure-block">');
    const nextIdIdx = afterId.indexOf('id: ', 10);
    if (figStart === -1 || (nextIdIdx !== -1 && figStart > nextIdIdx)) return;
    
    const figEnd = afterId.indexOf('</div></div>', figStart) + 12;
    const existingFigHtml = afterId.substring(figStart, figEnd);
    
    if (existingFigHtml.includes(match.image)) return;
    
    const isReplaceable = replaceableImages.some(img => existingFigHtml.includes(img));
    
    if (isReplaceable) {
       const globalInsertPos = idIdx + figStart;
       const figHtml = makeFigureHtml(match.image, match.caption).trim(); 
       content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos + existingFigHtml.length);
       replacedCount++;
       console.log(`[Batch 2 Rest - REPLACED ${filename}] id: ${q.id} <- ${match.image}`);
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully replaced ${replacedCount} images for Batch 2 Rest in ${filename}.\n`);
});
