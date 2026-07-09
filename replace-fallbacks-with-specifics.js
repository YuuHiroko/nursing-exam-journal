const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

// Regex mapping for the final 6 highly specific disorder images
const finalDisorderMap = [
  { regex: /breech/i, image: 'disorder_breech_presentation.png', caption: 'Breech Presentation' },
  { regex: /contracted pelvis/i, image: 'disorder_contracted_pelvis.png', caption: 'Contracted Pelvis' },
  { regex: /preterm|premature/i, image: 'disorder_preterm_baby.png', caption: 'Preterm Baby' },
  { regex: /asphyxia/i, image: 'disorder_asphyxia_neonatorum.png', caption: 'Asphyxia Neonatorum' },
  { regex: /jaundice/i, image: 'disorder_neonatal_jaundice.png', caption: 'Neonatal Jaundice' },
  { regex: /prolapse/i, image: 'disorder_uterine_prolapse.png', caption: 'Uterine Prolapse' } // Note: "cord prolapse" already handled, so order matters if both were present, but cord prolapse already injected its specific image. If it has cord prolapse image, we shouldn't overwrite unless we know it's a fallback.
];

function makeFigureHtml(imageName, caption) {
  return `\n<div class="figure-block"><img src="assets/images/${imageName}" alt="${caption}" loading="lazy"><div class="figure-caption">${caption}</div></div>\n`;
}

// Fallback images that are safe to replace
const fallbackImages = ['high_risk_pregnancy.png', 'abnormal_labour.png', 'high_risk_newborn.png', 'gynaecological_disorders.png'];

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

  let replacedCount = 0;
  
  questions.forEach(q => {
    // Find the matching disorder
    const match = finalDisorderMap.find(d => d.regex.test(q.question));
    if (!match) return; // No disorder matched

    const idPattern = `id: ${q.id},`;
    let searchIdx = 0;
    let idIdx = content.indexOf(idPattern, searchIdx);
    
    if (idIdx === -1) return;
    
    const afterId = content.substring(idIdx);
    const inShortStart = afterId.indexOf('<div class="in-short">');
    if (inShortStart === -1) return;
    
    const inShortEnd = afterId.indexOf('</div>', inShortStart);
    if (inShortEnd === -1) return;
    
    const nextChunk = afterId.substring(inShortEnd, inShortEnd + 300);
    const figStart = nextChunk.indexOf('<div class="figure-block">');
    
    if (figStart !== -1) {
       // Extract what image is there
       const figEnd = nextChunk.indexOf('</div></div>', figStart) + 12;
       const existingFigHtml = nextChunk.substring(figStart, figEnd);
       
       // Ensure it's a fallback image we're replacing, OR it's already the target image (don't recount)
       if (existingFigHtml.includes(match.image)) {
           return; // Already replaced
       }
       
       const isFallback = fallbackImages.some(fb => existingFigHtml.includes(fb));
       if (isFallback) {
           // Replace it
           const globalInsertPos = idIdx + inShortEnd + figStart;
           const figHtml = makeFigureHtml(match.image, match.caption).trim(); // trim to avoid extra newlines if replacing exactly
           content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos + existingFigHtml.length);
           replacedCount++;
           console.log(`[REPLACED ${filename}] id: ${q.id} <- ${match.image}`);
       } else {
           // It has a specific image (like cord prolapse), don't overwrite it with a generic "prolapse"
           // console.log(`Skipping ${q.id} - has specific image already:`, existingFigHtml);
       }
    }
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully replaced ${replacedCount} fallback images with specific disorder images in ${filename}.\n`);
});
