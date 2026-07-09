const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

// Mapping units to the general fallback images generated from the implementation plan
const unitImageMap = {
  8: { image: 'high_risk_pregnancy.png', caption: 'High-Risk Pregnancy' },
  9: { image: 'abnormal_labour.png', caption: 'Abnormal Labour' },
  10: { image: 'high_risk_newborn.png', caption: 'High-Risk Newborn' },
  11: { image: 'gynaecological_disorders.png', caption: 'Gynaecological Disorders' }
};

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

filenames.forEach(filename => {
  if (!fs.existsSync(filename)) return;
  
  let content = fs.readFileSync(filename, 'utf8');
  
  // Clear require cache just in case
  delete require.cache[require.resolve('./' + filename)];
  global.window = {};
  require('./' + filename);
  const questions = window.QUESTIONS_DATA_OBG2;
  
  if (!questions) {
     console.log(`Could not load questions from ${filename}`);
     return;
  }

  let injectedCount = 0;
  
  questions.forEach(q => {
    // Only apply to unit 8, 9, 10, 11
    if (!unitImageMap[q.unit]) return;

    const idPattern = `id: ${q.id},`;
    let searchIdx = 0;
    let idIdx = content.indexOf(idPattern, searchIdx);
    
    if (idIdx === -1) return;
    
    const afterId = content.substring(idIdx);
    const inShortStart = afterId.indexOf('<div class="in-short">');
    if (inShortStart === -1) return;
    
    const inShortEnd = afterId.indexOf('</div>', inShortStart);
    if (inShortEnd === -1) return;
    
    // Check if a specific disorder image (or any figure-block) was already injected
    const nextChunk = afterId.substring(inShortEnd, inShortEnd + 300);
    if (nextChunk.includes('class="figure-block"')) {
        return; // Already has an image, skip
    }
    
    const globalInsertPos = idIdx + inShortEnd + 6; 
    const fallback = unitImageMap[q.unit];
    const figHtml = makeFigureHtml(fallback.image, fallback.caption);
    
    content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos);
    
    injectedCount++;
    // console.log(`[INJECTED FALLBACK ${filename}] id: ${q.id} <- ${fallback.image}`);
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Successfully injected ${injectedCount} unit-fallback images into ${filename}.`);
});
