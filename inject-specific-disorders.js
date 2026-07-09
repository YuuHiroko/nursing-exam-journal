const fs = require('fs');

const filenames = ['data-obg2-enhanced.js', 'data-obg2.js'];

// Regex mapping to images
// Order matters: more specific/severe disorders first if multiple apply (e.g. eclampsia > preeclampsia)
const disorderMap = [
  { regex: /eclampsia(?!.*pre)/i, image: 'disorder_eclampsia.png', caption: 'Eclampsia' },
  { regex: /pre-?eclampsia|pih|pregnancy induced hypertension/i, image: 'disorder_preeclampsia.png', caption: 'Pre-eclampsia / PIH' },
  { regex: /placenta pr[a]evia|placenta previa/i, image: 'disorder_placenta_previa.png', caption: 'Placenta Previa' },
  { regex: /abruptio placenta|abruption placenta/i, image: 'disorder_abruptio_placentae.png', caption: 'Abruptio Placentae' },
  { regex: /anemia/i, image: 'disorder_anemia_pregnancy.png', caption: 'Anemia in Pregnancy' },
  { regex: /diabetes/i, image: 'disorder_gestational_diabetes.png', caption: 'Gestational Diabetes' },
  { regex: /polyhydramnios|polyhydramnous/i, image: 'disorder_polyhydramnios.png', caption: 'Polyhydramnios' },
  { regex: /multiple pregnancy|twins/i, image: 'disorder_multiple_pregnancy.png', caption: 'Multiple Pregnancy (Twins)' },
  { regex: /obstructed labou?r/i, image: 'disorder_obstructed_labour.png', caption: 'Obstructed Labour' },
  { regex: /cord prolapse|cord presentation/i, image: 'disorder_cord_prolapse.png', caption: 'Umbilical Cord Prolapse' },
  { regex: /inversion of.*uterus|acute inversion/i, image: 'disorder_uterine_inversion.png', caption: 'Uterine Inversion' },
  { regex: /sepsis/i, image: 'disorder_puerperal_sepsis.png', caption: 'Puerperal Sepsis' },
  { regex: /post-?partum h[a]emorrhage|pph/i, image: 'disorder_pph.png', caption: 'Postpartum Hemorrhage' }
];

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
    // Find the matching disorder
    const match = disorderMap.find(d => d.regex.test(q.question));
    if (!match) return; // No disorder matched, don't inject anything

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
    if (nextChunk.includes('class="figure-block"')) {
      if (nextChunk.includes(match.image)) {
          return; // already injected
      }
    }
    
    const globalInsertPos = idIdx + inShortEnd + 6; 
    const figHtml = makeFigureHtml(match.image, match.caption);
    content = content.substring(0, globalInsertPos) + figHtml + content.substring(globalInsertPos);
    
    injectedCount++;
    console.log(`[INJECTED ${filename}] id: ${q.id} <- ${match.image}`);
  });
  
  fs.writeFileSync(filename, content, 'utf8');
  console.log(`\nSuccessfully injected ${injectedCount} specific disorder images into ${filename}.\n`);
});
