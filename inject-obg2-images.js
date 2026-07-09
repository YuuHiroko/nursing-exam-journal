const fs = require('fs');

const filename = 'data-obg2-enhanced.js';
let content = fs.readFileSync(filename, 'utf8');

global.window = {};
require('./' + filename);
const questions = window.QUESTIONS_DATA_OBG2;

const unitImageMap = {
  8: { image: 'high_risk_pregnancy.png', caption: 'High-Risk Pregnancy' },
  9: { image: 'abnormal_labour.png', caption: 'Abnormal Labour & Complications' },
  10: { image: 'high_risk_newborn.png', caption: 'High-Risk Newborn & NICU Care' },
  11: { image: 'gynaecological_disorders.png', caption: 'Gynaecological Disorders' }
};

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

let injectedCount = 0;

questions.forEach(q => {
  const unitInfo = unitImageMap[q.unit];
  if (!unitInfo) return;
  
  const idPattern = `id: ${q.id},`;
  let searchIdx = 0;
  let idIdx = content.indexOf(idPattern, searchIdx);
  
  if (idIdx === -1) {
    console.log(`[SKIP] id: ${q.id} not found as "${idPattern}"`);
    return;
  }
  
  const afterId = content.substring(idIdx);
  const inShortStart = afterId.indexOf('<div class="in-short">');
  if (inShortStart === -1) {
    console.log(`[SKIP] id: ${q.id} — no in-short div found`);
    return;
  }
  
  const inShortEnd = afterId.indexOf('</div>', inShortStart);
  if (inShortEnd === -1) {
    console.log(`[SKIP] id: ${q.id} — could not find in-short closing tag`);
    return;
  }
  
  const nextChunk = afterId.substring(inShortEnd, inShortEnd + 300);
  if (nextChunk.includes('class="figure-block"')) {
    if (nextChunk.includes(unitInfo.image)) {
        console.log(`[SKIP] id: ${q.id} — image already present`);
        return;
    }
  }
  
  const globalInsertPos = idIdx + inShortEnd + 6; 
  const figHtml = makeFigureHtml(unitInfo.image, unitInfo.caption);
  content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos);
  
  injectedCount++;
  console.log(`[INJECTED] id: ${q.id} (Unit ${q.unit}) <- ${unitInfo.image}`);
});

fs.writeFileSync(filename, content, 'utf8');
console.log(`\nSuccessfully injected ${injectedCount} images into ${filename}.`);
