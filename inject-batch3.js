const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

const batch3Map = [
  { regex: /battledore placenta|velamentous insertion|cord abnormalities/i, image: 'disorder_cord_abnormalities.png', caption: 'Umbilical Cord Abnormalities' },
  { regex: /bishop score/i, image: 'disorder_bishop_score.png', caption: 'Bishop Score Criteria' },
  { regex: /kangaroo mother care/i, image: 'disorder_kangaroo_care.png', caption: 'Kangaroo Mother Care (KMC)' },
  { regex: /infertility/i, image: 'disorder_infertility.png', caption: 'Understanding Infertility' },
  { regex: /IVF|ART|assisted reproductive technology/i, image: 'disorder_art_ivf.png', caption: 'ART / IVF Process' },
  { regex: /mtp act|medical termination of pregnancy/i, image: 'disorder_mtp_act.png', caption: 'Medical Termination of Pregnancy (MTP) Act' },
  { regex: /phototherapy/i, image: 'disorder_phototherapy.png', caption: 'Neonatal Phototherapy' },
  { regex: /HIV in pregnancy/i, image: 'disorder_hiv_pregnancy.png', caption: 'HIV in Pregnancy (PMTCT)' }
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
    // Find matching disorder
    const match = batch3Map.find(d => d.regex.test(q.question) || (q.inShort && d.regex.test(q.inShort)));
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
       console.log(`[Batch 3 - REPLACED ${filename}] id: ${q.id} <- ${match.image}`);
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully replaced ${replacedCount} images for Batch 3 in ${filename}.\n`);
});
