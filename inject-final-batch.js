const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

const finalMap = [
  { regex: /amniotic fluid embolism/i, image: 'disorder_amniotic_fluid_embolism.png', caption: 'Amniotic Fluid Embolism (AFE)' },
  { regex: /D\s*&\s*C|D\s*and\s*C|dilation and curettage|dilatation and curettage/i, image: 'disorder_d_and_c.png', caption: 'Dilation & Curettage (D&C)' },
  { regex: /magnesium sulfate|magnesium sulphate|MgSO4/i, image: 'disorder_magnesium_sulfate.png', caption: 'Magnesium Sulfate Toxicity Monitoring' }
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
  
  delete require.cache[require.resolve('./' + filename)];
  global.window = {};
  require('./' + filename);
  const questions = window.QUESTIONS_DATA_OBG2;
  
  if (!questions) return;

  let replacedCount = 0;
  
  questions.forEach(q => {
    const match = finalMap.find(d => d.regex.test(q.question) || (q.inShort && d.regex.test(q.inShort)));
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
       console.log(`[FINAL - REPLACED ${filename}] id: ${q.id} <- ${match.image}`);
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully replaced ${replacedCount} images for final batch in ${filename}.\n`);
});
