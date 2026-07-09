const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

const batch4Map = [
  { regex: /rollover test/i, image: 'disorder_rollover_test.png', caption: 'Roll-over Test' },
  { regex: /methergin/i, image: 'disorder_methergin.png', caption: 'Methergine Administration' },
  { regex: /tocolytic/i, image: 'disorder_tocolytics.png', caption: 'Tocolytic Medications' }
];

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

const replaceableImages = [
  'high_risk_pregnancy.png', 
  'abnormal_labour.png', 
  'high_risk_newborn.png', 
  'gynaecological_disorders.png',
  'puerperal_complications.png',
  'family_planning.png'
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
    const match = batch4Map.find(d => d.regex.test(q.question) || (q.inShort && d.regex.test(q.inShort)));
    if (!match) return; 
    
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
       console.log(`[Batch 4 - REPLACED ${filename}] id: ${q.id} <- ${match.image}`);
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully replaced ${replacedCount} images for Batch 4 in ${filename}.\n`);
});
