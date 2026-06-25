/**
 * Reads all gsb-*.json batch files, merges them, and injects
 * missing intro/def/conclusion into the data files.
 * Usage: node assemble-and-inject.js [--dry-run]
 */
const fs   = require('fs');
const path = require('path');
const BASE    = path.dirname(__filename);
const DRY_RUN = process.argv.includes('--dry-run');

// ── load batches ─────────────────────────────────────────────────────────────
const BATCH_KEYS = ['u3a','u3b','u3c','u3d','u3e','u4a','u4b','u4c','u5a','u5b','u6a','u6b'];
let sections = {};

for (const key of BATCH_KEYS) {
  const p = path.join(BASE, `gsb-${key}.json`);
  if (!fs.existsSync(p)) { console.warn(`MISSING: gsb-${key}.json`); continue; }

  let raw;
  try { raw = JSON.parse(fs.readFileSync(p,'utf8')); }
  catch(e) { console.warn(`PARSE ERROR gsb-${key}.json: ${e.message}`); continue; }

  // Normalise keys — strip any 'Q' prefix
  for (const [k,v] of Object.entries(raw)) {
    const normKey = k.replace(/^Q/i,'');
    // Validate structure: must have intro/def/conclusion string fields
    if (v && typeof v === 'object' && 'intro' in v) {
      sections[normKey] = v;
    }
  }
  console.log(`gsb-${key}.json: ${Object.keys(raw).length} raw → ${Object.keys(raw).filter(k=>raw[k]&&'intro' in raw[k]).length} valid`);
}

const total = Object.keys(sections).length;
console.log(`\nLoaded ${total} valid sections\n`);
if (!total) { console.error('No sections loaded.'); process.exit(1); }

// ── injection helpers ────────────────────────────────────────────────────────
function findDivClose(s, i) {
  let d=0;
  while(i<s.length){
    if(s.startsWith('<div',i)){d++;i+=4;}
    else if(s.startsWith('</div>',i)){d--;i+=6;if(d===0)return i;}
    else i++;
  }
  return -1;
}
function afterInShort(ans){
  const idx=ans.indexOf('class="in-short"');
  if(idx===-1)return 0;
  let st=idx; while(st>0&&ans[st]!=='<')st--;
  const en=findDivClose(ans,st);
  return en!==-1?en:0;
}
function afterIntroSection(ans){
  const marker='answer-section-title">Introduction';
  const idx=ans.indexOf(marker);
  if(idx===-1)return -1;
  let st=idx; while(st>0&&ans[st]!=='<')st--;
  let outer=st-1; while(outer>0&&ans[outer]!=='<')outer--;
  if(ans.startsWith('<div',outer))st=outer;
  const en=findDivClose(ans,st);
  return en!==-1?en:-1;
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

// ── build file→question map ──────────────────────────────────────────────────
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

// ── inject ───────────────────────────────────────────────────────────────────
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
