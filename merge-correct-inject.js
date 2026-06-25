/**
 * Merge correctly-titled section batch files and inject into data files.
 * Usage: node merge-correct-inject.js [--dry-run]
 */
const fs   = require('fs');
const path = require('path');
const BASE    = path.dirname(__filename);
const DRY_RUN = process.argv.includes('--dry-run');

const BATCH_KEYS = ['c3','c4','c5','c6','c7'];

// Load + normalise all batch files
let sections = {};
for (const key of BATCH_KEYS) {
  const p = path.join(BASE, `gs-correct-${key}.json`);
  if (fs.existsSync(p)) {
    const raw = JSON.parse(fs.readFileSync(p,'utf8'));
    for (const [k,v] of Object.entries(raw)) sections[k.replace(/^Q/i,'')] = v;
    console.log(`gs-correct-${key}.json: ${Object.keys(raw).length} entries`);
  } else console.warn(`MISSING: gs-correct-${key}.json`);
}
console.log(`\nTotal: ${Object.keys(sections).length} sections\n`);
if (!Object.keys(sections).length) { console.error('No sections loaded.'); process.exit(1); }

// ── injection helpers ────────────────────────────────────────────────────────
function findDivClose(s, openIdx) {
  let depth=0, i=openIdx;
  while(i<s.length){
    if(s.startsWith('<div',i)){depth++;i+=4;}
    else if(s.startsWith('</div>',i)){depth--;i+=6;if(depth===0)return i;}
    else i++;
  }
  return -1;
}
function afterInShort(ans){
  const idx=ans.indexOf('class="in-short"');
  if(idx===-1)return 0;
  let start=idx; while(start>0&&ans[start]!=='<')start--;
  const end=findDivClose(ans,start);
  return end!==-1?end:0;
}
function afterIntroSection(ans){
  const marker='answer-section-title">Introduction';
  const idx=ans.indexOf(marker);
  if(idx===-1)return -1;
  let start=idx; while(start>0&&ans[start]!=='<')start--;
  let outer=start-1; while(outer>0&&ans[outer]!=='<')outer--;
  if(ans.startsWith('<div',outer))start=outer;
  const end=findDivClose(ans,start);
  return end!==-1?end:-1;
}
function inject(ans, secs){
  let out=ans;
  if(secs.intro&&secs.intro.trim()&&!out.includes('>Introduction<')){
    const pos=afterInShort(out);
    out=out.slice(0,pos)+'\n\n'+secs.intro.trim()+'\n'+out.slice(pos);
  }
  if(secs.def&&secs.def.trim()&&!out.includes('definition-box')){
    let pos=afterIntroSection(out);
    if(pos===-1)pos=afterInShort(out);
    out=out.slice(0,pos)+'\n\n'+secs.def.trim()+'\n'+out.slice(pos);
  }
  if(secs.conclusion&&secs.conclusion.trim()&&!out.toLowerCase().includes('conclusion')){
    out=out.trimEnd()+'\n\n'+secs.conclusion.trim()+'\n';
  }
  return out;
}

// ── per-file injection ───────────────────────────────────────────────────────
const ALL_FILES=['data.js','data-unit2.js','data-unit3.js','data-unit4.js',
  'data-unit5.js','data-unit6.js','data-unit7.js','data-obg2.js'];

const fileMap={};
for(const fname of ALL_FILES){
  const c=fs.readFileSync(path.join(BASE,fname),'utf8');
  for(const [qidStr,secs] of Object.entries(sections)){
    if(c.includes(`id: ${parseInt(qidStr)},`)){
      if(!fileMap[fname])fileMap[fname]={};
      fileMap[fname][qidStr]=secs;
    }
  }
}

let grand=0;
for(const [fname,qmap] of Object.entries(fileMap)){
  const fp=path.join(BASE,fname);
  let content=fs.readFileSync(fp,'utf8');
  let modified=0;
  for(const [qidStr,secs] of Object.entries(qmap)){
    const qid=parseInt(qidStr);
    const idIdx=content.indexOf(`id: ${qid},`);
    if(idIdx===-1)continue;
    const at=content.indexOf('answer: `',idIdx);
    if(at===-1)continue;
    const as=at+'answer: `'.length;
    let ae=as; while(ae<content.length&&content[ae]!=='`')ae++;
    const orig=content.slice(as,ae);
    const upd=inject(orig,secs);
    if(upd!==orig){
      content=content.slice(0,as)+upd+content.slice(ae);
      modified++;
      const added=[];
      if(secs.intro&&!orig.includes('>Introduction<'))added.push('intro');
      if(secs.def&&!orig.includes('definition-box'))added.push('def');
      if(secs.conclusion&&!orig.toLowerCase().includes('conclusion'))added.push('conc');
      console.log(`  Q${qid}: +[${added.join(',')}]`);
    }
  }
  if(modified>0){
    if(!DRY_RUN)fs.writeFileSync(fp,content,'utf8');
    console.log(`${fname}: ${modified} updated${DRY_RUN?' (dry-run)':''}`);
  } else {
    console.log(`${fname}: nothing to inject`);
  }
  grand+=modified;
}
console.log(`\nDone — ${grand} questions enhanced.`);
console.log('Run: node enhance-answers.js --audit');
