#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// generate-answers-json.js — Creates answers-content.json
// Each answer is keyed by question ID
// ═══════════════════════════════════════════════════════════════
const fs = require('fs');

// Helper to create a standard 5-mark answer
function mk5(title, defn, tableOrPoints, nursing, mnOrNote, keywords) {
  let h = '<div class="in-short"><strong>In Short:</strong> ' + defn + '</div>\n';
  h += '<div class="answer-section"><h3 class="answer-section-title teal-title">Definition</h3><div class="definition-box">' + (typeof defn === 'string' ? defn : defn) + '</div></div>\n';
  h += tableOrPoints + '\n';
  if (nursing) h += '<div class="answer-section"><h3 class="answer-section-title accent-title">Nursing Management</h3><ul class="answer-points">' + nursing + '</ul></div>\n';
  if (mnOrNote) h += mnOrNote + '\n';
  h += '<div class="keyword-box"><strong>Keywords:</strong> ' + keywords.map(k => '<span class="kw">' + k + '</span>').join('') + '</div>';
  return h;
}

// Helper for table rows
function tr(cells) {
  return '<tr>' + cells.map(c => '<td>' + c + '</td>').join('') + '</tr>';
}
function th(cells) {
  return '<thead><tr>' + cells.map(c => '<th>' + c + '</th>').join('') + '</tr></thead>';
}

const answers = {};

// ═══════════════════════════════════════════════════════════════
// UNIT 8: HIGH-RISK PREGNANCY (remaining IDs 167-173)
// ═══════════════════════════════════════════════════════════════

answers[141] = `<div class="in-short"><strong>In Short:</strong> Pre-eclampsia is hypertension (&ge;140/90 mmHg) with proteinuria after 20 weeks. <strong>Eclampsia</strong> = pre-eclampsia + convulsions. 4 stages: premonitory, tonic, clonic, coma. MgSO4 (Pritchard regimen) is drug of choice. <strong>Delivery = definitive cure</strong>.</div>

<div class="answer-section"><h3 class="answer-section-title teal-title">Definitions</h3><div class="definition-box"><strong>Pre-eclampsia:</strong> New-onset hypertension (BP &ge;140/90) + proteinuria (&ge;300mg/24h) after <strong>20 weeks</strong>.<br><br><strong>Eclampsia:</strong> Pre-eclampsia + <strong>generalised tonic-clonic convulsions</strong> not attributable to other causes.</div></div>

<div class="answer-section"><h3 class="answer-section-title accent-title">Four Stages of Eclamptic Convulsion</h3><div class="answer-table-wrap"><table class="answer-table">${th(['Stage','Duration','Features','Nursing Action'])}<tbody>${tr(['<strong>1. Premonitory</strong>','15&ndash;30 sec','Facial twitching, rolling eyes, fixed stare','Call help; left lateral; remove dentures'])}${tr(['<strong>2. Tonic</strong>','15&ndash;20 sec','Body rigid; teeth clenched; opisthotonos; apnoea','Do NOT insert anything in mouth; maintain airway'])}${tr(['<strong>3. Clonic</strong>','1&ndash;2 min','Violent rhythmic jerking; frothy saliva; incontinence','Protect from injury; turn to side; suction'])}${tr(['<strong>4. Coma</strong>','Min to hours','Deep unconsciousness; may progress to next seizure','Monitor vitals q5min; prepare MgSO4; assess FHR'])}</tbody></table></div></div>

<div class="answer-section"><h3 class="answer-section-title teal-title">Medical Management</h3><ul class="answer-points"><li><strong>MgSO4 (Pritchard):</strong><ul class="sub-points"><li><strong>Loading:</strong> 4g IV over 15&ndash;20 min + 5g IM each buttock (total 14g)</li><li><strong>Maintenance:</strong> 5g IM q4h alternate buttock for 24h after last convulsion</li><li><strong>Monitor RUK:</strong> Respiration &ge;16, Urine &ge;30mL/hr, Knee jerk present</li><li><strong>Antidote:</strong> Calcium gluconate 10% &mdash; 10 mL IV slowly</li></ul></li><li><strong>Antihypertensive:</strong> Labetalol 20mg IV or Nifedipine 10mg oral</li><li><strong>Delivery</strong> = definitive cure. Plan within 12&ndash;24h of stabilisation</li><li><strong>Supportive:</strong> IV RL 60&ndash;80 mL/hr; Foley catheter; O2 4&ndash;6 L/min</li></ul></div>

<div class="answer-section"><h3 class="answer-section-title accent-title">Nursing Management</h3><ul class="answer-points"><li>BP every 15 min; urine output hourly; LOC; DTR; FHR monitoring</li><li><strong>During convulsion:</strong> Left lateral + suction; protect from injury; do NOT restrain</li><li><strong>Post-convulsion:</strong> Quiet environment; continue MgSO4; prepare for delivery</li><li><strong>Danger signs:</strong> Absent knee jerk, RR &lt;16, urine &lt;30 mL/hr, recurrent convulsions</li></ul></div>

<div class="mnemonic-box"><div class="mnemonic-label">Mnemonic: MgSO4 monitoring &mdash; <strong>"RUK"</strong></div><div class="mnemonic-word"><span class="letter">R</span><span class="letter">U</span><span class="letter">K</span></div><div class="mnemonic-explain"><strong>R</strong> = Respiration (&ge;16/min) | <strong>U</strong> = Urine (&ge;30 mL/hr) | <strong>K</strong> = Knee jerk (present)<br><em>Any absent &rarr; WITHHOLD MgSO4 + give calcium gluconate</em></div></div>

<div class="remember-box"><div class="remember-title">Quick Revision</div><ul><li>4 stages: <strong>Premonitory &rarr; Tonic &rarr; Clonic &rarr; Coma</strong></li><li>Drug of choice: <strong>MgSO4</strong> (Pritchard: 4g IV + 10g IM)</li><li>Antidote: <strong>Calcium gluconate 10%</strong></li><li><strong>Delivery = definitive cure</strong></li></ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Eclampsia</span><span class="kw">MgSO4</span><span class="kw">Pritchard</span><span class="kw">RUK</span><span class="kw">Calcium gluconate</span><span class="kw">Convulsion stages</span></div>`;

// I'll write each answer using a compact but complete format
// Due to the massive number of answers, I'll write them as compact HTML

const COMPACT_ANSWERS = {

167: { // Twin pregnancy (15m)
  summary: 'Multiple pregnancy = two or more fetuses. Twins: dizygotic (70%, 2 eggs) or monozygotic (30%, 1 egg splits). Complications: preterm, PIH, anaemia, PPH, TTTS. Management: intensive ANC, serial USG, planned delivery at 36&ndash;37 weeks.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>Multiple Pregnancy:</strong> Presence of <strong>two or more fetuses</strong> in the uterus simultaneously.</div>' },
    { t: 'Types of Twins', table: { h: ['Feature','Dizygotic (70%)','Monozygotic (30%)'], rows: [['Origin','2 ova + 2 sperm','1 ovum splits'],['Placenta','Always DCDA (2 placentas)','DCDA, MCDA, or MCMA'],['Sex','Same or different','Always same'],['Genetics','Different (like siblings)','Identical'],['Heredity','Runs in families','Random']] }},
    { t: 'Maternal Complications', pts: ['Anaemia (doubled iron demand)', 'PIH/pre-eclampsia (3&times; risk)', 'Polyhydramnios', 'Preterm labour (50% before 37 wks)', 'PPH (overdistended uterus &rarr; atony)', 'Higher caesarean rate', 'Hyperemesis (high hCG)'] },
    { t: 'Fetal Complications', pts: ['Prematurity (most common)', 'IUGR/discordant growth', 'TTTS (in monochorionic)', 'Malpresentation', 'Cord entanglement (MCMA)', 'Congenital anomalies (&times;2 risk)'] },
    { t: 'Management', pts: ['<strong>Confirm chorionicity</strong> by USG &lt;14 weeks (&lambda;-sign = DCDA; T-sign = MCDA)', 'Double IFA; extra protein and calcium', 'Fortnightly visits from 24 wks; weekly from 32 wks', 'Serial growth USG q2&ndash;4 weeks', 'MCDA: fortnightly Doppler from 16 wks for TTTS', 'Delivery: DCDA at 37 wks, MCDA at 36 wks, MCMA at 32&ndash;34 wks', 'Hospital delivery with OT, blood bank, NICU', 'AMTSL mandatory (high PPH risk)'] },
  ],
  mnemonic: { label: 'Complications &mdash; "PAPH"', explain: 'P=PIH | A=Anaemia | P=Polyhydramnios/Preterm | H=Hyperemesis/Higher C-section' },
  keywords: ['Multiple pregnancy','Dizygotic','Monozygotic','DCDA','MCDA','TTTS','Preterm','PPH']
},

168: { // Types of twins (15m) 
  summary: 'Twins classified by zygosity (mono/dizygotic) and chorionicity (DCDA/MCDA/MCMA). Chorionicity determines management and risk. DCDA safest; MCMA most dangerous. USG before 14 weeks is essential.',
  sections: [
    { t: 'Chorionicity Types', table: { h: ['Type','When Split','Placenta','Membrane','Risk','Delivery'], rows: [['DCDA','Day 0&ndash;3','2 separate','Thick (&lambda; sign)','Lowest','37 wks'],['MCDA','Day 4&ndash;8','1 shared','Thin (T-sign)','Moderate (TTTS)','36 wks'],['MCMA','Day 8&ndash;13','1 shared','NONE','Highest (cord tangle)','32&ndash;34 wks'],['Conjoined','Day &gt;13','1 shared','None (fused)','Extremely rare','Surgical']] }},
    { t: 'Management', pts: ['Early USG &lt;14 weeks to determine chorionicity', 'Double-dose IFA; extra calories and protein', 'MCDA: screen for TTTS every 2 weeks from 16 wks', 'Serial growth USG to detect discordant growth (&gt;20% weight difference)', 'Corticosteroids if preterm delivery expected before 34 wks', 'OT and NICU on standby for delivery'] },
  ],
  mnemonic: { label: 'Split timing &mdash; "0-3-8-13"', explain: '0&ndash;3 = DCDA (safest) | 4&ndash;8 = MCDA (TTTS risk) | 8&ndash;13 = MCMA (cord entangle) | &gt;13 = Conjoined' },
  keywords: ['DCDA','MCDA','MCMA','Lambda sign','T-sign','Chorionicity','TTTS']
},

169: { // Complications of multiple pregnancy (3m)
  summary: 'Maternal: anaemia, PIH, polyhydramnios, preterm, PPH, higher C-section. Fetal: prematurity, IUGR, TTTS, malpresentation, cord entanglement.',
  sections: [
    { t: 'Complications', table: { h: ['Maternal','Fetal'], rows: [['Anaemia','Preterm birth (50%)'],['PIH (3&times; risk)','IUGR/Discordant growth'],['Polyhydramnios','TTTS (monochorionic)'],['Preterm labour','Malpresentation'],['PPH (uterine atony)','Cord entanglement (MCMA)'],['Higher C-section rate','Congenital anomalies']] }},
  ],
  keywords: ['Multiple pregnancy','Preterm','PIH','PPH','TTTS']
},

170: { // Umbilical cord abnormalities (5m)
  summary: 'Normal cord: 50 cm, 2 arteries, 1 vein, Wharton&rsquo;s jelly. Abnormalities: short/long cord, single umbilical artery, true knots, nuchal cord, cord prolapse, velamentous insertion, vasa praevia.',
  sections: [
    { t: 'Cord Abnormalities', table: { h: ['Abnormality','Significance'], rows: [['Short cord (&lt;30 cm)','Abruption, uterine inversion'],['Long cord (&gt;75 cm)','Prolapse, true knots, nuchal cord'],['Single umbilical artery','20% have fetal anomalies (renal, cardiac)'],['True knot','Cord occlusion &rarr; fetal death if tightened'],['Nuchal cord','Common (25%); usually harmless; tight loops cause distress'],['Cord prolapse','Emergency &mdash; cord compression &rarr; fetal death'],['Velamentous insertion','Vessels unprotected; rupture risk during ARM'],['Vasa praevia','Vessels cross internal os &rarr; fetal haemorrhage at ROM']] }},
    { t: 'Nursing Points', pts: ['After delivery: examine cord for <strong>2 arteries + 1 vein</strong>', 'Single artery &rarr; neonatal investigation for anomalies', 'Variable decelerations on CTG suggest cord compression', 'Cord prolapse: knee-chest position + push presenting part UP'] },
  ],
  mnemonic: { label: 'Cord contents &mdash; "AVA"', explain: 'A=Artery (deoxy) | V=Vein (oxy) | A=Artery. 2 arteries + 1 vein = normal.' },
  keywords: ['Umbilical cord','Wharton&rsquo;s jelly','Cord prolapse','Velamentous insertion','Nuchal cord','Single artery']
},

171: { // IUGR (15m)
  summary: 'IUGR = estimated fetal weight &lt;10th percentile. Two types: symmetric (20%, early, all organs small) and asymmetric (80%, late, brain-sparing, head &gt; abdomen). Doppler worsening: high RI &rarr; AEDF &rarr; REDF &rarr; DV abnormal. Management: treat cause, serial monitoring, corticosteroids, timely delivery.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>IUGR:</strong> Fetus fails to achieve genetic growth potential &mdash; EFW or AC <strong>&lt;10th percentile</strong> for gestational age.</div>' },
    { t: 'Etiology', table: { h: ['Category','Causes'], rows: [['Maternal','PIH, anaemia, malnutrition, smoking, chronic renal disease, SLE'],['Fetal','Chromosomal (trisomy 13,18,21), TORCH infections, congenital anomalies'],['Placental','Placental insufficiency, placenta praevia, abruption, circumvallate placenta'],['Environmental','High altitude, radiation, teratogenic drugs']] }},
    { t: 'Types', table: { h: ['Feature','Symmetric (20%)','Asymmetric (80%)'], rows: [['Onset','Early (1st trimester)','Late (3rd trimester)'],['Cause','Genetic, TORCH','Placental insufficiency, PIH'],['Proportions','All parts equally small','Head spared, abdomen small'],['HC/AC ratio','Normal','Increased (&gt;1)'],['Mechanism','Fewer cells (hypoplasia)','Smaller cells; brain-sparing'],['Prognosis','Poorer','Better (catch-up possible)']] }},
    { t: 'Diagnosis', pts: ['SFH &lt;expected for GA', 'USG: EFW &lt;10th percentile; AC &lt;10th percentile', 'Doppler: UA &rarr; AEDF &rarr; REDF = very ominous', 'MCA: increased diastolic flow (brain-sparing)', 'CPR (MCA PI/UA PI): &lt;1 = abnormal', 'DV: absent/reversed a-wave = cardiac compromise', 'BPP score &le;4 = urgent delivery'] },
    { t: 'Management', pts: ['Treat cause (control PIH, treat anaemia, nutrition)', 'Serial USG q2 weeks; UA Doppler weekly', 'NST/CTG twice weekly from 32 wks', 'Betamethasone 12mg IM &times;2 if delivery before 34 wks', 'Normal Doppler: deliver at <strong>37&ndash;38 wks</strong>', 'AEDF: deliver at <strong>32&ndash;34 wks</strong>', 'REDF or abnormal DV: <strong>urgent delivery</strong>', 'Left lateral position 2h/day (improves blood flow)'] },
  ],
  mnemonic: { label: 'Doppler progression &mdash; "HARD"', explain: 'H=High resistance | A=Absent end-diastolic flow | R=Reversed flow | D=Ductus venosus abnormal &rarr; URGENT delivery' },
  keywords: ['IUGR','FGR','Symmetric','Asymmetric','Doppler','AEDF','REDF','Brain-sparing','CPR']
},

172: { // IUGR types (5m)
  summary: 'Symmetric (20%): early onset, all organs small equally, caused by genetic/TORCH. Asymmetric (80%): late onset, brain-sparing effect (head &gt; abdomen), caused by placental insufficiency. HC &gt; AC = asymmetric.',
  sections: [
    { t: 'Types Comparison', table: { h: ['Feature','Symmetric (Type I)','Asymmetric (Type II)'], rows: [['Frequency','20%','<strong>80%</strong> (more common)'],['Onset','Early (1st trimester)','Late (3rd trimester)'],['Cause','Chromosomal, TORCH, drugs','Placental insufficiency, PIH'],['Proportions','Equally small (head = body)','Head normal, body small'],['HC/AC ratio','Normal','Increased (&gt;1)'],['Prognosis','Poor (less catch-up)','Better (catch-up possible)']] }},
  ],
  keywords: ['IUGR','Symmetric','Asymmetric','Brain-sparing','HC/AC ratio']
},

173: { // Intrauterine death (5m)
  summary: 'IUFD = fetal death after 28 weeks before delivery. Common causes: PIH, abruption, IUGR, cord accidents. Diagnosis: absent FM + no FHR + USG confirmation. Management: misoprostol induction; watch for DIC. Emotional support is the key nursing role.',
  sections: [
    { t: 'Causes', pts: ['<strong>Maternal:</strong> PIH/eclampsia, severe anaemia, diabetes, infections (malaria, syphilis)', '<strong>Fetal:</strong> Congenital anomalies, Rh isoimmunisation, chromosomal', '<strong>Placental:</strong> Abruptio placentae, placental insufficiency, cord accidents', '<strong>Unexplained:</strong> 25&ndash;50% have no identifiable cause'] },
    { t: 'Diagnosis', pts: ['Mother reports absent fetal movements &gt;12 hours', 'No FHR on Doppler', 'USG: absent cardiac activity (definitive); Spalding sign (overlapping skull bones)', 'Investigations: CBC, coagulation profile (rule out DIC)'] },
    { t: 'Management', pts: ['Induction: vaginal misoprostol 25&ndash;50 mcg q4&ndash;6h', 'If retained &gt;4 weeks: risk of <strong>DIC</strong>', 'Correct coagulopathy with FFP, cryoprecipitate if DIC', 'Send placenta and fetus for post-mortem', 'Suppress lactation: cabergoline 1mg single dose', '<strong>Emotional support:</strong> Allow grieving; privacy; counselling; allow mother to see baby'] },
  ],
  keywords: ['IUFD','Spalding sign','DIC','Misoprostol','Bereavement care']
},

// ═══════════════════════════════════════════════════════════════
// UNIT 9: ABNORMAL LABOUR (IDs 174-218)
// ═══════════════════════════════════════════════════════════════

174: { summary: 'Obstructed labour = presenting part cannot descend despite adequate contractions due to mechanical barrier. Signs: Bandl&rsquo;s ring, moulding +3, maternal exhaustion. Management: stop oxytocin, IV fluids, catheterise, emergency C-section.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>Obstructed Labour:</strong> Labour where, despite adequate contractions, the fetus <strong>cannot be delivered vaginally</strong> due to mechanical barrier from passenger, passage, or both.</div>' },
    { t: 'Causes', table: { h: ['Passage (Maternal)','Passenger (Fetal)'], rows: [['Contracted pelvis (most common)','Hydrocephalus'],['Pelvic tumour (fibroid)','Macrosomia (&gt;4 kg)'],['Cervical stenosis','Malpresentation (brow, face MP)'],['Vaginal septum','Malposition (deep transverse arrest)'],['Previous pelvic fracture','Shoulder dystocia']] }},
    { t: 'Clinical Features', pts: ['<strong>Bandl&rsquo;s ring:</strong> Visible retraction ring &mdash; impending uterine rupture', 'Moulding +3 (irreducible skull bone overlap)', 'Maternal distress: tachycardia, dehydration, fever', 'Fetal distress or absent FHR', 'Oedematous vulva and cervix', 'Blood-stained urine (bladder compression)'] },
    { t: 'Complications', table: { h: ['Maternal','Fetal'], rows: [['<strong>Uterine rupture</strong> (most dangerous)','Fetal death (asphyxia)'],['VVF (vesicovaginal fistula)','Birth injuries'],['PPH (uterine atony)','Meconium aspiration'],['Puerperal sepsis','Cerebral damage'],['Maternal death','Neonatal death']] }},
    { t: 'Management', pts: ['<strong>STOP oxytocin</strong> immediately', '2 large-bore IV lines; IV fluids (NS/RL)', 'Catheterise bladder', 'IV antibiotics (ampicillin + gentamicin + metronidazole)', 'Crossmatch 2 units blood', 'If cervix not fully dilated: <strong>emergency C-section</strong>', 'If dead fetus + fully dilated: craniotomy (specialist)', 'If uterine rupture: emergency laparotomy', '<strong>Prevention:</strong> Partograph use + timely referral'] },
  ],
  mnemonic: { label: 'Signs &mdash; "BOMB"', explain: 'B=Bandl&rsquo;s ring | O=Oedema of cervix | M=Moulding +3 | B=Blood in urine' },
  keywords: ['Obstructed labour','Bandl&rsquo;s ring','CPD','Uterine rupture','VVF','Partograph']
},

175: { summary: 'Prolonged labour = active phase &gt;12h (primi) or &gt;8h (multi). Cervix dilates &lt;1 cm/hr. Causes: 3 P&rsquo;s (Power, Passage, Passenger). Diagnosis: partograph. Management: hydration, oxytocin for power; C-section for passage.',
  sections: [
    { t: 'Causes &mdash; 3 P&rsquo;s', table: { h: ['P','Causes'], rows: [['<strong>Power</strong>','Hypotonic contractions; incoordinate contractions; maternal exhaustion/dehydration'],['<strong>Passage</strong>','Contracted pelvis; pelvic tumour; cervical rigidity'],['<strong>Passenger</strong>','Malposition (OP); malpresentation (brow); macrosomia; hydrocephalus']] }},
    { t: 'Management', pts: ['General: IV fluids, empty bladder, emotional support', '<strong>Power problem:</strong> ARM + oxytocin augmentation (5 IU in 500mL NS)', '<strong>Passage problem:</strong> C-section (NEVER give oxytocin if obstruction suspected)', '<strong>Passenger:</strong> Correct malposition; C-section if needed', 'Partograph monitoring; early referral when alert line crossed'] },
  ],
  keywords: ['Prolonged labour','3 P&rsquo;s','Partograph','Alert line','Action line','Oxytocin']
},

176: { summary: 'Causes of prolonged labour: 3 P&rsquo;s &mdash; Power (inadequate contractions), Passage (contracted pelvis, tumour), Passenger (malpresentation, macrosomia). Also: anxiety, dehydration, full bladder, cervical rigidity.',
  sections: [{ t: 'Causes', table: { h: ['Category','Specific Causes'], rows: [['Power','Hypotonic/hypertonic contractions; maternal exhaustion; dehydration; fear'],['Passage','Contracted pelvis; pelvic tumour; cervical stenosis; full bladder'],['Passenger','Malposition (OP); malpresentation (brow); macrosomia; hydrocephalus']] }}],
  keywords: ['3 P&rsquo;s','Power','Passage','Passenger','CPD','Partograph']
},

177: { summary: 'Prolonged labour = active phase &gt;12h (primi) or &gt;8h (multi), cervical dilation &lt;1 cm/hr. Caused by 3 P&rsquo;s. Diagnosed by partograph. Management: correct the cause.',
  sections: [{ t: 'Key Points', pts: ['Definition: active phase &gt;12h (primi) or &gt;8h (multi)', 'Cervical dilation &lt;1 cm/hour in active phase', 'Causes: 3 P&rsquo;s (Power, Passage, Passenger)', 'Diagnosis: partograph &mdash; alert line crossed', 'Power problem: ARM + oxytocin', 'Passage problem: caesarean section', 'NEVER give oxytocin if obstruction suspected', 'If prolonged &rarr; not managed &rarr; <strong>obstructed labour</strong>'] }],
  keywords: ['Prolonged labour','Partograph','3 P&rsquo;s','Alert line']
},

178: { summary: 'Malpresentation = any presentation other than vertex. Breech (most common, 3&ndash;4%): frank (65%), complete (25%), footling (10%). Management: ECV at 37 wks; C-section for footling. Complications: head entrapment, cord prolapse.',
  sections: [
    { t: 'Types of Breech', table: { h: ['Type','Position','Frequency','Vaginal Delivery?'], rows: [['<strong>Frank</strong>','Hips flexed, knees extended','65%','Safest for vaginal delivery'],['<strong>Complete</strong>','Hips and knees flexed','25%','Moderate risk'],['<strong>Footling</strong>','One/both feet present first','10%','<strong>NEVER</strong> &mdash; always C-section']] }},
    { t: 'Etiology', pts: ['Prematurity (most common cause)', 'Multiparity (lax uterus)', 'Uterine anomalies', 'Multiple pregnancy', 'Placenta praevia', 'Polyhydramnios/oligohydramnios'] },
    { t: 'Management', pts: ['Before 36 wks: watch (may convert spontaneously)', 'At 37 wks: <strong>ECV</strong> (External Cephalic Version); success ~50%', 'C-section if: footling, primigravida, EFW &gt;3.8 kg, hyperextended head', 'Vaginal if: frank breech, EFW 2.5&ndash;3.5 kg, experienced team', 'Manoeuvres: Lovset (arms), Burns-Marshall/MSV (head), Piper forceps', 'Key rule: &ldquo;Hands off the breech&rdquo; &mdash; let buttocks deliver spontaneously'] },
    { t: 'Complications', pts: ['<strong>Head entrapment</strong> (most feared)', 'Cord prolapse (especially footling)', 'Birth asphyxia', 'Erb&rsquo;s palsy', 'Fractures'] },
  ],
  mnemonic: { label: 'Complications &mdash; "CATCH"', explain: 'C=Cord prolapse | A=Asphyxia | T=Trauma | C=Cervical tears | H=Head entrapment' },
  keywords: ['Breech','Frank','Footling','ECV','Lovset','Burns-Marshall','Head entrapment','Piper forceps']
},

179: { summary: 'Breech = buttocks/feet presenting (3&ndash;4% at term). Etiology: prematurity, multiparity, uterine anomalies, placenta praevia. Diagnosis: hard head in fundus, FHR above umbilicus, USG. Management: ECV at 37 wks; C-section if failed.',
  sections: [
    { t: 'Etiology', table: { h: ['Category','Causes'], rows: [['Maternal','Multiparity, uterine anomalies, fibroids, placenta praevia'],['Fetal','Prematurity (most common), multiple pregnancy, hydrocephalus'],['Amniotic fluid','Polyhydramnios, oligohydramnios']] }},
    { t: 'Diagnosis', pts: ['Abdominal: hard round head in <strong>fundus</strong>; soft breech at pelvis; FHR <strong>above umbilicus</strong>', 'Vaginal: soft mass; sacrum; ischial tuberosities; may feel feet', 'USG: confirms type, EFW, head attitude, cord'] },
    { t: 'Management', pts: ['ECV at 37 wks (success ~50%)', 'Elective C-section if: footling, primi, large baby, hyperextended head', 'Vaginal if: frank, experienced team, adequate pelvis, 2.5&ndash;3.5 kg', 'Nursing: continuous CTG; OT on standby; paediatrician at delivery'] },
  ],
  keywords: ['Breech','ECV','Frank','Footling','Aftercoming head']
},

180: { summary: 'Malpresentation = any presentation other than vertex. Types: breech (most common), face, brow, shoulder/transverse, compound. Brow = worst (mentovertical diameter 13.5 cm = always C-section).',
  sections: [
    { t: 'Types', table: { h: ['Type','Presenting Part','Denominator','Vaginal Delivery?'], rows: [['<strong>Breech</strong>','Buttocks/feet','Sacrum','Possible (frank, experienced team)'],['<strong>Face</strong>','Face (extended head)','Mentum','Only if mentoanterior (MA)'],['<strong>Brow</strong>','Brow (partially extended)','Nasion','<strong>NEVER</strong> (13.5 cm diameter)'],['<strong>Transverse</strong>','Shoulder/arm','Acromion','<strong>NEVER</strong> at term (always C-section)'],['<strong>Compound</strong>','Extremity + head','&mdash;','Sometimes (may correct spontaneously)']] }},
    { t: 'Key Points', pts: ['Brow presents <strong>mentovertical diameter (13.5 cm)</strong> &mdash; largest possible &rarr; always C-section', 'Face mentoanterior can deliver vaginally; mentoposterior &rarr; C-section', 'Transverse lie at term: attempt ECV; if in labour &rarr; C-section', 'Causes: prematurity, polyhydramnios, uterine anomalies, placenta praevia'] },
  ],
  keywords: ['Malpresentation','Breech','Face','Brow','Transverse lie','Mentovertical diameter']
},

181: { summary: 'Occipitoposterior (OP) = fetal occiput facing mother&rsquo;s sacrum (back-to-back). Causes severe backache labour. 65% rotate to OA spontaneously. If persistent: manual rotation, Kielland&rsquo;s forceps, or C-section.',
  sections: [
    { t: 'Outcomes', table: { h: ['Outcome','Frequency','Description'], rows: [['Long anterior rotation','65%','Occiput rotates 135&deg; to OA &rarr; normal delivery'],['Short posterior rotation','10%','45&deg; to direct OP &rarr; face-to-pubis delivery'],['Deep transverse arrest','15%','Stuck at transverse &rarr; instrumental/C-section'],['Persistent OP','10%','No rotation &rarr; operative delivery']] }},
    { t: 'Clinical Features', pts: ['Flattened abdomen; fetal limbs felt anteriorly; FHR in flank', '<strong>Severe backache</strong> during labour (hallmark)', 'Delayed engagement; prolonged 1st and 2nd stages', 'Early urge to push before full dilation'] },
    { t: 'Management', pts: ['Left lateral or all-fours position (encourages rotation)', 'Counter-pressure on sacrum for pain relief', 'If persistent: manual rotation, Kielland&rsquo;s forceps, vacuum, or C-section'] },
  ],
  keywords: ['Occipitoposterior','OP','Backache labour','Long anterior rotation','Deep transverse arrest']
},

182: { summary: 'Contracted pelvis = pelvic diameters smaller than normal. Normal AP inlet = 11 cm; &lt;10 = contracted; &lt;8 = always C-section. Types: flat, generally contracted, funnel. Management: trial of labour if mild; C-section if severe.',
  sections: [
    { t: 'Types', table: { h: ['Type','Contracted Diameter','Cause'], rows: [['Flat pelvis','AP diameter reduced','Rickets, osteomalacia'],['Generally contracted','All diameters reduced','Small stature, malnutrition'],['Funnel pelvis','Outlet contracted','Android pelvis'],['Irregular','Asymmetric','Polio, fracture, spinal deformity']] }},
    { t: 'Management', pts: ['Mild: trial of labour with OT standby', 'Moderate: trial if head engages; else C-section', 'Severe (&lt;8 cm AP): <strong>elective C-section</strong> (vaginal delivery impossible)', 'Normal AP diameter of inlet: <strong>11 cm</strong>'] },
  ],
  keywords: ['Contracted pelvis','CPD','AP diameter','Trial of labour','Android pelvis']
},

183: { summary: 'Obstetric emergencies: eclampsia, cord prolapse, PPH, shoulder dystocia, uterine rupture, AFE, uterine inversion. Footling breech is the most dangerous breech type (foot slips through undilated cervix &rarr; head trapped).',
  sections: [
    { t: 'Obstetric Emergencies', table: { h: ['Emergency','Key Feature','Immediate Action'], rows: [['Eclampsia','Convulsions','MgSO4 + left lateral'],['Cord prolapse','Cord below presenting part','Push head UP + knee-chest + C-section'],['PPH','Bleeding &gt;500 mL','Rub uterus + oxytocin + IV fluids'],['Shoulder dystocia','Shoulders stuck','McRoberts + suprapubic pressure'],['Uterine rupture','Sudden pain + shock','Emergency laparotomy'],['AFE','Collapse + respiratory failure + DIC','CPR + intubation + ICU'],['Uterine inversion','Uterus inside out','Johnson&rsquo;s manoeuvre + IV fluids']] }},
    { t: 'Footling Breech', pts: ['Foot slips through <strong>incompletely dilated cervix</strong>', 'Body delivers but <strong>aftercoming head trapped</strong> by cervix', 'Cord compressed between head and cervix &rarr; asphyxia within minutes', 'Management: <strong>always elective C-section</strong> for footling breech', 'If head trapped: D&uuml;hrssen&rsquo;s incisions (cervical cuts) by specialist'] },
  ],
  keywords: ['Obstetric emergencies','Footling breech','Head entrapment','PPH','Eclampsia','Cord prolapse']
},

184: { summary: 'Obstetric emergencies = sudden life-threatening conditions. Key ones: eclampsia (MgSO4), cord prolapse (push head UP), PPH (rub uterus), shoulder dystocia (McRoberts), uterine rupture (laparotomy), AFE (CPR+ICU).',
  sections: [
    { t: 'First Actions', table: { h: ['Emergency','First Nursing Action'], rows: [['Eclampsia','Left lateral + MgSO4 4g IV'],['Cord prolapse','Push presenting part UP + knee-chest + emergency C-section'],['PPH','Rub up uterus + oxytocin 10 IU IM + IV fluids'],['Shoulder dystocia','McRoberts + suprapubic pressure'],['Uterine rupture','IV fluids + crossmatch + emergency laparotomy'],['AFE','CPR + intubation + ICU'],['Uterine inversion','Johnson&rsquo;s repositioning + IV fluids']] }},
    { t: 'Nurse&rsquo;s Role', pts: ['Recognise emergency early; call for help', 'Initiate first-line management simultaneously', 'Maintain IV access, vitals, safe positioning', 'Keep emergency drugs available: oxytocin, MgSO4, calcium gluconate, adrenaline', 'Document all actions and timings'] },
  ],
  keywords: ['Obstetric emergencies','PPH','Eclampsia','Cord prolapse','Shoulder dystocia','Uterine rupture']
},

185: { summary: 'Obstetric emergencies demand instant action. Cord prolapse: push presenting part UP, knee-chest, fill bladder 500mL saline, emergency C-section. PPH: rub uterus. Eclampsia: MgSO4.',
  sections: [
    { t: 'Emergency Management Table', table: { h: ['Emergency','Presentation','Immediate Management'], rows: [['Eclampsia','Convulsions + hypertension','MgSO4 (Pritchard); left lateral; deliver in 12&ndash;24h'],['PPH','Bleeding &gt;500mL','Fundal massage; oxytocin; IV fluids; bimanual compression'],['Cord prolapse','Cord felt/seen after ROM','Push head UP; knee-chest; fill bladder 500mL; emergency C-section'],['Shoulder dystocia','Head delivered, shoulders stuck','HELPERR: McRoberts + suprapubic pressure + episiotomy']] }},
    { t: 'Cord Prolapse Detail (PUSH)', pts: ['<strong>P</strong>ush presenting part UP with gloved hand in vagina', '<strong>U</strong>rgently position in knee-chest or Trendelenburg', '<strong>S</strong>aline to fill bladder (500&ndash;700mL via Foley)', 'Keep cord warm and moist; do NOT push cord back', '<strong>H</strong>urry to OT for emergency C-section', 'If fully dilated + head low: forceps/vacuum may be faster', 'Prevention: never ARM with unengaged head'] },
  ],
  keywords: ['Cord prolapse','PUSH mnemonic','PPH','HELPERR','Emergency C-section']
},

186: { summary: 'Cord prolapse = cord descends below presenting part after ROM. Obstetric emergency &mdash; fetal death in minutes. Management: push head UP, knee-chest, fill bladder 500mL, keep cord warm, emergency C-section.',
  sections: [
    { t: 'Definitions', c: '<div class="definition-box"><strong>Cord Presentation:</strong> Cord felt through <strong>intact</strong> membranes ahead of presenting part.<br><br><strong>Cord Prolapse:</strong> Cord descends past presenting part <strong>after ROM</strong>. OBSTETRIC EMERGENCY.<br><br><strong>Occult Prolapse:</strong> Cord alongside presenting part &mdash; detected by variable decelerations on CTG.</div>' },
    { t: 'Risk Factors', pts: ['Malpresentation (breech, transverse)', 'Unengaged head at ROM', 'Polyhydramnios; preterm baby', 'ARM with high station', 'Long cord (&gt;75cm)', 'After delivery of first twin'] },
    { t: 'Emergency Management (PUSH)', pts: ['<strong>CALL FOR HELP</strong> &mdash; activate emergency team', '<strong>Push presenting part UP</strong> with hand in vagina (maintain continuously)', '<strong>Knee-chest position</strong> or exaggerated Trendelenburg', '<strong>Fill bladder</strong> with 500&ndash;700mL warm saline via Foley', 'Keep cord <strong>warm and moist</strong> (saline-soaked gauze)', 'Tocolytic (terbutaline 0.25mg SC) if available', '<strong>Emergency C-section</strong> within minutes', 'If fully dilated + head low: forceps/vacuum', 'Do NOT push cord back (causes vasospasm)'] },
  ],
  mnemonic: { label: 'Management &mdash; "PUSH"', explain: 'P=Push UP | U=Urgently position | S=Saline to bladder | H=Hurry to OT' },
  keywords: ['Cord prolapse','Cord presentation','Knee-chest','Bladder filling','Emergency caesarean','PUSH']
},

187: { summary: 'Cord prolapse management: (1) Push presenting part UP, (2) Knee-chest position, (3) Fill bladder 500mL saline, (4) Keep cord warm/moist, (5) Emergency C-section. Never push cord back.',
  sections: [
    { t: 'PUSH Mnemonic', pts: ['<strong>P</strong> = Push presenting part UP with hand in vagina', '<strong>U</strong> = Urgently position in knee-chest', '<strong>S</strong> = Saline to fill bladder (500&ndash;700mL Foley)', '<strong>H</strong> = Hurry to OT for emergency C-section', 'Keep cord warm/moist; do NOT push cord back', 'Tocolytic if available; continuous FHR monitoring', 'Prevention: <strong>never ARM with unengaged head</strong>'] },
  ],
  keywords: ['Cord prolapse','PUSH','Knee-chest','Bladder filling','Emergency C-section']
},

188: { summary: 'AFE = amniotic fluid enters maternal circulation &rarr; anaphylactoid reaction &rarr; cardiorespiratory collapse + DIC. Mortality 60&ndash;80%. Triad: respiratory distress + cardiovascular collapse + DIC. Treatment: CPR + intubation + blood products + ICU.',
  sections: [
    { t: 'Clinical Triad', pts: ['<strong>1. Respiratory distress:</strong> Acute dyspnoea, cyanosis, pulmonary oedema', '<strong>2. Cardiovascular collapse:</strong> Sudden hypotension, tachycardia, cardiac arrest', '<strong>3. DIC:</strong> Profuse uncontrollable bleeding from all sites'] },
    { t: 'Management', pts: ['CPR if cardiac arrest; intubate; 100% oxygen', '2 large-bore IV lines; crystalloids; vasopressors', 'DIC: FFP, cryoprecipitate, platelets, packed RBCs', 'Transfer to ICU; mechanical ventilation', 'Emergency C-section if baby undelivered'] },
  ],
  keywords: ['Amniotic fluid embolism','DIC','Cardiopulmonary collapse','CPR','Anaphylactoid']
},

189: { summary: 'Uterine inversion = uterus turns inside out after delivery. Cause: pulling cord before placental separation. Treatment: Johnson&rsquo;s manoeuvre (push fundus back up), stop oxytocin, IV fluids. Do NOT remove placenta first.',
  sections: [
    { t: 'Key Points', pts: ['<strong>Cause:</strong> Pulling cord before placental separation (mismanaged CCT)', '<strong>Signs:</strong> Severe pain; haemorrhage; neurogenic shock; fundus not palpable; mass at vagina', '<strong>Do NOT remove placenta</strong> (acts as tamponade)', '<strong>Johnson&rsquo;s manoeuvre:</strong> Push fundus back through cervix upward', '<strong>Stop oxytocin</strong> (need uterus relaxed for repositioning)', 'Once repositioned: start oxytocin to keep contracted', 'If fails: surgical correction (Haultain&rsquo;s operation)'] },
  ],
  keywords: ['Uterine inversion','Johnson&rsquo;s manoeuvre','Neurogenic shock','CCT']
},

190: { summary: 'Fetal distress = fetal hypoxia. Signs: abnormal FHR (&lt;110 or &gt;160), meconium-stained liquor, abnormal CTG. Management: left lateral + O2 + stop oxytocin + IV fluids. If not improving: emergency delivery.',
  sections: [
    { t: 'Causes', table: { h: ['Maternal','Fetal','Placental/Cord'], rows: [['Hypotension, PIH, anaemia','Prematurity, IUGR','Placental insufficiency'],['Uterine hyperstimulation','Post-maturity','Abruptio placentae'],['Prolonged labour','Infection','Cord compression/prolapse']] }},
    { t: 'Diagnosis & Management', pts: ['<strong>FHR:</strong> Bradycardia &lt;110, tachycardia &gt;160, late decelerations, absent variability', '<strong>Meconium-stained liquor</strong> (thick green = significant)', '<strong>Intrauterine resuscitation:</strong> Left lateral + O2 8&ndash;10 L/min + IV fluids + STOP oxytocin', 'If fully dilated: forceps/vacuum delivery', 'If not fully dilated + persistent: <strong>emergency C-section</strong>'] },
  ],
  keywords: ['Fetal distress','FHR','CTG','Meconium','Late deceleration','Intrauterine resuscitation']
},

191: { summary: 'Birth canal injuries: cervical tears, vaginal tears, perineal tears (1st&ndash;4th degree), vulval lacerations. Caused by: precipitate labour, instrumental delivery, macrosomia. Systematic inspection after every delivery.',
  sections: [
    { t: 'Types', table: { h: ['Injury','Description','Management'], rows: [['Cervical tears','Lateral tear; heavy bleeding','Suture under anaesthesia'],['1st degree perineal','Skin and fourchette only','May not need suturing'],['2nd degree','Skin + perineal muscles','Suture in layers'],['3rd degree','Anal sphincter involved','OT repair by specialist'],['4th degree','Sphincter + rectal mucosa','Specialist repair; risk of incontinence']] }},
    { t: 'Nursing Points', pts: ['Inspect cervix, vagina, perineum <strong>after every delivery</strong>', 'Birth canal trauma is one of the <strong>4 T&rsquo;s of PPH</strong> (Trauma)', 'Post-repair: perineal hygiene, sitz baths, stool softeners (3rd/4th)'] },
  ],
  keywords: ['Birth canal injury','Perineal tear','Cervical tear','4 T&rsquo;s','Trauma']
},

192: { summary: 'Perineal tear degrees: 1st = skin; 2nd = skin + muscle; 3rd = anal sphincter; 4th = rectal mucosa. Prevention: controlled delivery, perineal support, selective episiotomy. 3rd/4th require OT repair.',
  sections: [
    { t: 'Degrees', table: { h: ['Degree','Structures','Management'], rows: [['1st','Skin + vaginal mucosa','May heal spontaneously'],['2nd','Skin + perineal muscles (NOT sphincter)','Suture in layers under local anaesthesia'],['3rd','<strong>Anal sphincter</strong> (3a: &lt;50%, 3b: &gt;50%, 3c: IAS)','Repair in OT by experienced surgeon'],['4th','Sphincter + <strong>rectal mucosa</strong>','Specialist repair; faecal incontinence risk']] }},
    { t: 'Prevention & Care', pts: ['Controlled delivery of head; perineal support', 'Selective episiotomy (not routine)', 'Post-repair: perineal hygiene (front to back); sitz baths; stool softeners; pelvic floor exercises'] },
  ],
  keywords: ['Perineal tear','1st-4th degree','Anal sphincter','Episiotomy','Perineal support']
},

193: { summary: 'Episiotomy = planned surgical incision of perineum during delivery. Types: mediolateral (most common, safer) and median. NOT routine &mdash; only when indicated. Repair with absorbable sutures.',
  sections: [
    { t: 'Types', table: { h: ['Type','Direction','Advantage','Disadvantage'], rows: [['<strong>Mediolateral</strong>','45&deg; from midline','Less extension risk; most used','More painful'],['<strong>Median</strong>','Straight to anus','Less pain; heals better','Higher extension to 3rd/4th degree']] }},
    { t: 'Indications & Care', pts: ['Rigid perineum; instrumental delivery; macrosomia; breech; fetal distress', 'Given at crowning; local anaesthetic first (1% lignocaine)', 'Repair: 3 layers (mucosa &rarr; muscle &rarr; skin) with <strong>absorbable sutures</strong>', 'Post-care: ice packs, sitz baths, perineal hygiene, analgesics, pelvic floor exercises'] },
  ],
  keywords: ['Episiotomy','Mediolateral','Median','Perineal care','Absorbable sutures']
},

194: { summary: 'Induction = artificially starting labour. Indications: post-dates, PPROM, PIH, GDM, IUGR. Methods: prostaglandins (cervical ripening), ARM, oxytocin. Bishop Score &ge;6 = favourable cervix.',
  sections: [
    { t: 'Methods', table: { h: ['Method','How It Works','When Used'], rows: [['PGE2 (dinoprostone)','Cervical ripening + contractions','Bishop &lt;6'],['Misoprostol','Oral/vaginal; ripening + contractions','Cheaper alternative; AVOID in previous C-section'],['ARM (Amniotomy)','Releases prostaglandins; head on cervix','Bishop &ge;6'],['Oxytocin drip','Stimulates contractions directly','After ARM; Bishop &ge;6'],['Foley catheter','Mechanical cervical dilation','Previous C-section (safer)']] }},
    { t: 'Nursing Role', pts: ['Assess Bishop Score before induction; informed consent', 'Continuous CTG during oxytocin; watch for hyperstimulation', 'Prepare for possible emergency C-section (failed induction ~20%)'] },
  ],
  keywords: ['Induction','Bishop Score','Prostaglandin','Oxytocin','ARM','Cervical ripening']
},

195: { summary: 'Ventouse = vacuum cup on fetal scalp to assist delivery. Prerequisites: full dilation, vertex, engaged, ruptured membranes. Advantages over forceps: less maternal trauma. Risk: cephalhaematoma, subgaleal haemorrhage.',
  sections: [
    { t: 'Key Points', pts: ['Cup placed on <strong>flexion point</strong> (3cm anterior to posterior fontanelle)', 'Vacuum: 0.6&ndash;0.8 kg/cm&sup2;; traction during contractions', 'Abandon if: cup detaches 3 times; no descent after 3 pulls; &gt;20 min', 'Most common complication: <strong>cephalhaematoma</strong> (benign)', 'Most dangerous: <strong>subgaleal haemorrhage</strong> (can be fatal)', 'Contraindicated &lt;34 weeks (IVH risk); face/brow presentation'] },
  ],
  keywords: ['Ventouse','Vacuum extraction','Cephalhaematoma','Flexion point','Subgaleal haemorrhage']
},

196: { summary: 'Forceps = metal instruments on fetal head to assist delivery. Types: outlet (Wrigley&rsquo;s), low (Simpson&rsquo;s), mid-cavity (Kielland&rsquo;s for rotation). Risk: facial nerve palsy, perineal tears.',
  sections: [
    { t: 'Types & Indications', table: { h: ['Type','Station','Example','Use'], rows: [['Outlet','Head visible','Wrigley&rsquo;s','Lift head in LSCS; easy delivery'],['Low','At +2 or below','Simpson&rsquo;s','Most common; prolonged 2nd stage'],['Mid-cavity','0 to +2','Kielland&rsquo;s','Rotation (OP to OA) + delivery']] }},
    { t: 'Prerequisites & Complications', pts: ['FORCEPS: Full dilation, OA position, Ruptured membranes, Cephalic, Engaged, Pain relief, Sphincter (bladder) empty', 'Maternal: cervical/vaginal tears, 3rd/4th degree tears', 'Fetal: facial nerve palsy (most common, usually temporary), cephalhaematoma, skull fracture (rare)'] },
  ],
  keywords: ['Forceps','Wrigley&rsquo;s','Simpson&rsquo;s','Kielland&rsquo;s','Facial nerve palsy']
},

197: { summary: 'Caesarean section = delivery through abdominal + uterine incision. LSCS (95%, transverse lower segment, safer) vs Classical (5%, vertical upper segment). Pre-op: consent, NPO, IV, crossmatch, Foley, antibiotics. Post-op: vitals q15min, early ambulation, breastfeed within 1 hour.',
  sections: [
    { t: 'Types', table: { h: ['Feature','LSCS (95%)','Classical (5%)'], rows: [['Incision','Transverse, lower segment','Vertical, upper segment'],['Blood loss','Less','More'],['Scar strength','Stronger','Weaker'],['VBAC possible?','Yes','No (rupture risk)'],['Indication','Most indications','Transverse lie; extreme prematurity']] }},
    { t: 'Indications', table: { h: ['Maternal','Fetal','Combined'], rows: [['CPD/contracted pelvis','Fetal distress','Failed induction'],['Previous 2+ C-sections','Malpresentation','Obstructed labour'],['Placenta praevia (major)','Cord prolapse','Prolonged labour'],['Pre-eclampsia/eclampsia','Macrosomia','Failed trial of labour']] }},
    { t: 'Pre-operative Care', pts: ['Informed consent; explain procedure and risks', 'NPO 6&ndash;8h; IV access (18G); Foley catheter', 'CBC, crossmatch 2 units, coagulation, RBS', 'Prophylactic antibiotic: cefazolin 2g IV 30 min before incision', 'TED stockings; shave and prep; remove jewellery'] },
    { t: 'Post-operative Care', pts: ['0&ndash;2h: vitals q15min; check fundal height; lochia; IV fluids', '2&ndash;24h: start oral sips; deep breathing + leg exercises; begin breastfeeding', 'Day 1&ndash;2: early ambulation (12&ndash;24h); remove Foley; full diet; adequate analgesia', 'Day 5&ndash;7: wound check; suture removal; family planning; next pregnancy after 18&ndash;24 months'] },
  ],
  mnemonic: { label: 'Pre-op &mdash; "CAN I CUT"', explain: 'C=Consent | A=Antibiotic | N=NPO | I=IV+Investigations | C=Crossmatch | U=Urinary catheter | T=TED+Theatre' },
  keywords: ['Caesarean section','LSCS','Classical','Pre-operative','Post-operative','VBAC']
},

198: { summary: 'C-section types: LSCS (95%, safer, VBAC possible) vs Classical (5%, higher rupture risk). Pre-op: CAN I CUT mnemonic. Post-op: vitals q15min, early ambulation 12&ndash;24h, breastfeed within 1 hour.',
  sections: [
    { t: 'Types Comparison', table: { h: ['Feature','LSCS','Classical'], rows: [['Incision','Transverse lower segment','Vertical upper segment'],['Frequency','95%','5%'],['VBAC','Yes','No (rupture risk)'],['Blood loss','Less','More'],['Indication','Most cases','Transverse lie; extreme prematurity']] }},
    { t: 'Pre-op & Post-op', pts: ['Pre-op: CAN I CUT (Consent, Antibiotic, NPO, IV, Crossmatch, Urinary catheter, TED/Theatre)', 'Post-op: vitals q15min; breastfeed within 1 hour (side-lying/football hold)', 'Early ambulation 12&ndash;24h; remove Foley 12&ndash;24h; full diet by day 1', 'Discharge day 5&ndash;7; suture removal day 7&ndash;10; next pregnancy after 18&ndash;24 months'] },
  ],
  keywords: ['LSCS','Classical','Pre-operative','Post-operative','VBAC','CAN I CUT']
},

199: { summary: 'C-section rate rising (WHO ideal: 10&ndash;15%). Factors: defensive medicine, repeat C-sections, CTG overuse, maternal request, ART pregnancies, reduced training in vaginal breech/forceps. Mother preparation: physical (NPO, IV, prep) + psychological (counselling, consent).',
  sections: [
    { t: 'Factors for Rising Rate', pts: ['Increased CTG use &rarr; more interventions', 'Repeat C-sections (once C-section, likely again)', 'Reduced training in vaginal breech and forceps delivery', 'Older mothers; higher BMI; ART (precious baby)', 'Defensive medicine (fear of litigation)', 'Maternal request (tocophobia)', 'More inductions (failed inductions end in C-section)'] },
    { t: 'Preparation of Mother', pts: ['<strong>Physical:</strong> CBC, crossmatch, NPO, IV access, Foley, shave, TED stockings, antibiotics', '<strong>Psychological:</strong> Explain procedure in simple language; address fears; informed consent; birth companion if possible; reassure about breastfeeding and bonding', '<strong>Logistical:</strong> Blood arranged; neonatal team standby; OT readiness'] },
  ],
  keywords: ['Rising C-section rate','WHO recommendation','Defensive medicine','VBAC','Pre-operative']
},

200: { summary: 'C-section indications: Absolute (always C-section): major placenta praevia, cord prolapse, transverse lie, severe CPD. Relative: fetal distress, malpresentation, failed induction, prolonged labour.',
  sections: [
    { t: 'Indications', table: { h: ['Category','Indications'], rows: [['<strong>Absolute</strong>','Major placenta praevia (III,IV); cord prolapse; transverse lie in labour; severe CPD; uterine rupture'],['<strong>Relative</strong>','Fetal distress; breech; failed induction; prolonged/obstructed labour; PIH; macrosomia; IUGR'],['<strong>Elective</strong>','Previous classical C-section; previous 2+ LSCS; maternal request; HIV (high viral load); breech at term']] }},
  ],
  keywords: ['C-section indications','Absolute','Relative','Elective','Emergency']
},

201: { summary: 'PV exam assesses cervical dilation, effacement, station, position, presentation, membranes, moulding, pelvis. Done every 4 hours in active labour. Aseptic technique; informed consent. Contraindicated in placenta praevia.',
  sections: [
    { t: 'Parameters', table: { h: ['Parameter','What is Assessed'], rows: [['Cervical dilation','0&ndash;10 cm (full = 10 cm)'],['Effacement','Thinning of cervix (0&ndash;100%)'],['Station','Level relative to ischial spines (-3 to +3)'],['Position','LOA, ROA, LOP, etc.'],['Membranes','Intact or ruptured; colour of liquor'],['Moulding','0 to +3 (skull bone overlap)'],['Pelvis','Adequacy of bony pelvis']] }},
    { t: 'Nursing Points', pts: ['Always obtain <strong>consent</strong>; explain procedure; ensure privacy', 'Strict aseptic technique', 'Record findings on partograph', 'Every <strong>4 hours</strong> in active labour', '<strong>Contraindication:</strong> Known placenta praevia'] },
  ],
  keywords: ['PV examination','Cervical dilation','Station','Effacement','Partograph']
},

202: { summary: 'Bishop Score assesses cervical readiness for induction: 5 parameters (Dilation, Effacement, Station, Consistency, Position). &ge;6 = favourable (proceed with induction). &lt;6 = needs cervical ripening first.',
  sections: [
    { t: 'Bishop Score', table: { h: ['Parameter','Score 0','Score 1','Score 2','Score 3'], rows: [['Dilation (cm)','Closed','1&ndash;2','3&ndash;4','&ge;5'],['Effacement (%)','0&ndash;30','40&ndash;50','60&ndash;70','&ge;80'],['Station','-3','-2','-1/0','+1/+2'],['Consistency','Firm','Medium','Soft','&mdash;'],['Position','Posterior','Mid','Anterior','&mdash;']] }},
    { t: 'Interpretation', pts: ['Maximum score = <strong>13</strong>', '&ge;6 = favourable &rarr; ARM + oxytocin', '&lt;6 = unfavourable &rarr; ripen first (prostaglandins/Foley)', '&ge;9 = success rate approaches spontaneous labour'] },
  ],
  mnemonic: { label: 'Parameters &mdash; "DECPS"', explain: 'D=Dilation | E=Effacement | C=Consistency | P=Position | S=Station' },
  keywords: ['Bishop Score','Cervical ripening','Induction','Favourable cervix','DECPS']
},

203: { summary: 'MgSO4 = drug of choice for eclamptic convulsions. Pritchard regimen: 4g IV + 5g IM each buttock (loading); 5g IM q4h (maintenance). Monitor RUK before each dose. Antidote: calcium gluconate 10%.',
  sections: [
    { t: 'Pritchard Regimen', table: { h: ['Phase','Dose','Route'], rows: [['Loading','4g (20% solution) over 15&ndash;20 min','IV slow'],['Loading','5g (50% solution) each buttock (total 10g)','Deep IM'],['Maintenance','5g alternate buttock every 4 hours','Deep IM'],['Duration','Continue 24 hours after last convulsion','&mdash;']] }},
    { t: 'Monitoring (RUK)', pts: ['<strong>R</strong> = Respiratory rate &ge;16/min', '<strong>U</strong> = Urine output &ge;30 mL/hr', '<strong>K</strong> = Knee jerk present', 'If ANY absent: <strong>WITHHOLD</strong> dose + give calcium gluconate', 'Antidote: Calcium gluconate 10% &mdash; 10 mL IV slowly', 'Therapeutic level: 4&ndash;7 mEq/L; Toxic &gt;7; Respiratory arrest &gt;12'] },
  ],
  keywords: ['MgSO4','Pritchard','RUK','Calcium gluconate','Eclampsia']
},

204: { summary: 'Methylergometrine (Methergin) = ergot alkaloid causing sustained uterine contraction. Dose: 0.2 mg IM/IV. Used in PPH. Contraindicated in hypertension, PIH, heart disease. Check BP before giving. Store in refrigerator.',
  sections: [
    { t: 'Key Points', table: { h: ['Feature','Detail'], rows: [['Drug','Methylergometrine maleate (Methergin)'],['Class','Ergot alkaloid (oxytocic)'],['Action','Sustained (tonic) uterine contraction'],['Dose','0.2 mg IM or slow IV'],['Onset','IM: 2&ndash;5 min; IV: immediate'],['Indication','PPH (atonic); AMTSL'],['Contraindication','<strong>Hypertension, PIH, heart disease</strong>'],['Side effects','Nausea, vomiting, headache, hypertension'],['Storage','Refrigerator (2&ndash;8&deg;C)']] }},
    { t: 'Nursing Points', pts: ['<strong>Check BP before giving</strong> &mdash; contraindicated if &ge;140/90', 'Give <strong>after delivery of baby</strong> (never before)', 'Monitor BP and uterine contraction after administration'] },
  ],
  keywords: ['Methylergometrine','Methergin','Ergot alkaloid','PPH','Hypertension']
},

205: { summary: 'Tocolytics suppress premature contractions to delay preterm delivery by 48 hours (for corticosteroids). Nifedipine (1st line), isoxsuprine, MgSO4, indomethacin. Monitor vitals, FHR, pulmonary oedema risk.',
  sections: [
    { t: 'Common Tocolytics', table: { h: ['Drug','Class','Route','Side Effects'], rows: [['<strong>Nifedipine</strong>','Calcium channel blocker','20mg oral','Hypotension, headache, flushing'],['Isoxsuprine','Beta-2 agonist','10mg IM/IV','Tachycardia, hypotension, tremor'],['MgSO4','Smooth muscle relaxant','4&ndash;6g IV','Flushing, respiratory depression'],['Indomethacin','PG inhibitor','25&ndash;50mg oral/rectal','Oligohydramnios (avoid &gt;32 wks)']] }},
    { t: 'Nursing Responsibilities', pts: ['Monitor pulse, BP, RR frequently', 'Continuous FHR monitoring', 'Watch for pulmonary oedema (dyspnoea, crackles)', 'Ensure corticosteroids given simultaneously (betamethasone 12mg IM &times;2)', 'Restrict IV fluids (fluid overload risk with beta-agonists)', 'Goal: delay delivery by <strong>48 hours</strong> for steroids to work'] },
  ],
  keywords: ['Tocolytic','Nifedipine','Isoxsuprine','Preterm labour','Corticosteroids']
},

206: { summary: 'Puerperal sepsis = infection of the genital tract after delivery. Caused by: poor asepsis, prolonged labour, PROM, retained products. Signs: fever &ge;38&deg;C, foul lochia, uterine tenderness. Management: IV antibiotics, remove source.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>Puerperal Sepsis:</strong> Infection of the genital tract occurring within <strong>42 days of delivery</strong>, manifested by fever &ge;38&deg;C on any 2 of the first 10 days postpartum (excluding first 24 hours).</div>' },
    { t: 'Causes', pts: ['Poor asepsis during delivery or examinations', 'Prolonged labour; prolonged rupture of membranes (&gt;18h)', 'Retained products of conception', 'Operative delivery (C-section, forceps)', 'Multiple vaginal examinations', 'Anaemia; malnutrition; HIV'] },
    { t: 'Clinical Features', pts: ['Fever &ge;38&deg;C (may be persistent or spiking)', 'Offensive (foul-smelling) lochia', 'Uterine tenderness and subinvolution', 'Lower abdominal pain; tachycardia; malaise', 'May progress to peritonitis, pelvic abscess, septicaemia, septic shock'] },
    { t: 'Management', pts: ['<strong>IV antibiotics:</strong> Ampicillin + Gentamicin + Metronidazole (triple regimen)', 'IV fluids; antipyretics', 'Remove retained products (evacuation)', 'Wound care (if post-C-section wound infection)', 'Blood culture; high vaginal swab', 'Monitor vitals, urine output, lochia'] },
    { t: 'Nursing Management', pts: ['Monitor temperature q4h; vital signs; lochia (amount, colour, odour)', 'Maintain IV access; administer antibiotics as ordered', 'Perineal hygiene; frequent pad changes', 'Encourage oral fluids and nutrition', 'Isolate if necessary; hand hygiene', 'Emotional support; promote breastfeeding (usually safe to continue)', '<strong>Prevention:</strong> Hand hygiene, aseptic technique, limit vaginal exams, timely delivery, prophylactic antibiotics for C-section'] },
  ],
  keywords: ['Puerperal sepsis','Postpartum infection','Triple antibiotics','Retained products','Prevention']
},

207: { summary: 'Puerperium complications: PPH, puerperal sepsis, DVT/PE, breast complications, UTI, subinvolution, psychiatric disorders (baby blues, PPD, puerperal psychosis). Management depends on specific complication.',
  sections: [
    { t: 'Complications & Management', table: { h: ['Complication','Key Feature','Management'], rows: [['PPH','Bleeding &gt;500mL','Rub uterus + oxytocin + IV fluids'],['Puerperal sepsis','Fever + foul lochia','IV antibiotics (triple regimen)'],['DVT/PE','Calf pain, swelling, dyspnoea','Anticoagulation (heparin/enoxaparin)'],['Breast engorgement','Painful, swollen breasts','Frequent breastfeeding; warm compress; analgesics'],['Mastitis','Red, tender, febrile','Antibiotics + continue breastfeeding'],['UTI','Dysuria, frequency','Antibiotics; adequate fluids'],['Baby blues','Mood swings, tearfulness (day 3&ndash;5)','Reassurance; self-limiting (resolves in 2 weeks)'],['Postpartum depression','Persistent low mood, anxiety','Counselling; SSRIs; psychiatry referral'],['Puerperal psychosis','Delusions, hallucinations','Emergency psychiatry; hospitalise; protect baby']] }},
    { t: 'Nursing Role', pts: ['Monitor vitals, lochia, involution, bladder function daily', 'Promote breastfeeding; teach breast care', 'Screen for mood disorders; provide emotional support', 'Early ambulation; DVT prevention; adequate nutrition'] },
  ],
  keywords: ['Puerperium','PPH','Puerperal sepsis','DVT','Postpartum depression','Breast complications']
},

208: { summary: 'Puerperal pyrexia = fever &ge;38&deg;C on any 2 of first 10 days postpartum (excluding first 24h). Causes: uterine infection, UTI, wound infection, mastitis, DVT. Management: identify source + appropriate antibiotics.',
  sections: [
    { t: 'Causes & Management', pts: ['<strong>Uterine infection:</strong> Most common; foul lochia, tender uterus &rarr; triple antibiotics', '<strong>UTI:</strong> Dysuria, frequency &rarr; urine C/S; antibiotics', '<strong>Wound infection:</strong> Erythema, discharge at C-section/episiotomy site &rarr; dressing + antibiotics', '<strong>Mastitis:</strong> Red, tender breast + fever &rarr; antibiotics + continue breastfeeding', '<strong>DVT:</strong> Calf pain/swelling &rarr; anticoagulation', 'Investigations: CBC, blood culture, urine C/S, HVS, wound swab'] },
  ],
  keywords: ['Puerperal pyrexia','Postpartum fever','UTI','Mastitis','Wound infection']
},

209: { summary: 'Prevention of puerperal sepsis: hand hygiene, aseptic delivery technique, limit vaginal examinations, timely delivery, prophylactic antibiotics for C-section, proper perineal care, adequate nutrition.',
  sections: [
    { t: 'Prevention Measures', pts: ['Strict <strong>hand hygiene</strong> before and after every examination', '<strong>Aseptic technique</strong> during delivery and any procedure', '<strong>Limit vaginal examinations</strong> (every 4 hours only in active labour)', 'Timely delivery (avoid prolonged labour and PROM)', '<strong>Prophylactic antibiotics</strong> for C-section (cefazolin 2g IV)', 'Proper <strong>perineal care</strong>: clean front to back; change pads frequently', 'Adequate nutrition and hydration during postpartum', 'Early ambulation; ensure complete placental delivery'] },
  ],
  keywords: ['Prevention','Puerperal sepsis','Hand hygiene','Aseptic technique','Prophylactic antibiotics']
},

210: { summary: 'Normal puerperium = first 6 weeks after delivery. Minor complications: afterpains, constipation, urinary retention, breast engorgement, haemorrhoids, fatigue. Management is mostly supportive with education and reassurance.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>Puerperium:</strong> Period from <strong>delivery of placenta to 6 weeks (42 days) postpartum</strong>, during which the reproductive organs return to their pre-pregnant state (involution).</div>' },
    { t: 'Minor Complications', table: { h: ['Complication','Management'], rows: [['Afterpains (more in multips)','Analgesics; reassurance (normal)'],['Constipation','High-fibre diet; fluids; stool softeners'],['Urinary retention','Encourage voiding; warm water; catheterise if needed'],['Breast engorgement','Frequent breastfeeding; warm compress; proper latching'],['Perineal pain','Ice packs; sitz baths; analgesics'],['Haemorrhoids','Stool softeners; sitz baths; topical creams'],['Fatigue/insomnia','Rest when baby sleeps; family support'],['Baby blues','Reassurance; resolves in 2 weeks; watch for PPD']] }},
    { t: 'Nursing Assessment', pts: ['Daily: vitals, fundal height (should descend 1 fingerbreadth/day), lochia, episiotomy/wound, breasts, legs (DVT), bladder, bowels, bonding, mood'] },
  ],
  keywords: ['Puerperium','Involution','Afterpains','Breast engorgement','Lochia','Minor complications']
},

211: { summary: 'PPH = blood loss &ge;500mL after vaginal delivery or &ge;1000mL after C-section. Causes: 4 T&rsquo;s (Tone 70%, Trauma 20%, Tissue 10%, Thrombin &lt;1%). Primary PPH within 24h; Secondary PPH 24h&ndash;6 weeks. Management: rub uterus + oxytocin + IV fluids.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>PPH:</strong> Blood loss <strong>&ge;500 mL after vaginal delivery</strong> or <strong>&ge;1000 mL after C-section</strong> within 24 hours (primary PPH) or between 24 hours and 6 weeks (secondary PPH).</div>' },
    { t: 'Causes &mdash; 4 T&rsquo;s', table: { h: ['Cause','Frequency','Examples'], rows: [['<strong>Tone</strong> (Atony)','70%','Overdistended uterus (twins, polyhydramnios, macrosomia), prolonged labour, oxytocin use, grand multipara'],['<strong>Trauma</strong>','20%','Cervical/vaginal/perineal tears, uterine rupture, episiotomy extension'],['<strong>Tissue</strong>','10%','Retained placenta, retained membranes/clots, placenta accreta'],['<strong>Thrombin</strong>','&lt;1%','DIC, coagulopathy, anticoagulant use']] }},
    { t: 'Management', pts: ['<strong>First action: Rub up the uterus</strong> (fundal massage)', 'Empty bladder (catheterise)', '<strong>Oxytocin 10 IU IM</strong> + 20 IU in 500mL NS drip', 'Methergin 0.2mg IM (if not hypertensive)', 'Misoprostol 800mcg sublingual/rectal', 'IV fluids: NS/RL 2L fast; crossmatch; transfuse if needed', '<strong>Bimanual compression:</strong> If uterus still atonic', '<strong>Aortic compression:</strong> Press fist above umbilicus (buys time)', 'If retained placenta: manual removal under anaesthesia', 'Surgical options: B-Lynch suture, uterine artery ligation, hysterectomy (last resort)', '<strong>AMTSL:</strong> Best prevention (oxytocin after delivery of anterior shoulder + CCT + uterine massage)'] },
    { t: 'Nursing Management', pts: ['Monitor vitals every 15 min; urine output; consciousness', 'Maintain 2 large-bore IV lines', 'Keep patient warm (prevent hypothermia)', 'Blood samples: CBC, crossmatch, coagulation', 'Documentation: blood loss estimation, interventions, timing', 'Emotional support to patient and family'] },
  ],
  mnemonic: { label: 'Causes &mdash; "4 T&rsquo;s"', explain: 'T=Tone (70%, most common) | T=Trauma (20%) | T=Tissue (10%) | T=Thrombin (&lt;1%)' },
  keywords: ['PPH','4 T&rsquo;s','Atony','Oxytocin','Bimanual compression','AMTSL','B-Lynch']
},

212: { summary: 'PPH causes: 4 T&rsquo;s. Types: Primary (&lt;24h) mostly atonic; Secondary (24h&ndash;6wks) mostly retained products/infection. Management: rub uterus, oxytocin, bimanual compression. Prevention: AMTSL.',
  sections: [
    { t: 'Types of PPH', table: { h: ['Feature','Primary PPH','Secondary PPH'], rows: [['Timing','Within 24 hours','24h to 6 weeks'],['Most common cause','Uterine atony (70%)','Retained products; endometritis'],['Management','Rub uterus + oxytocin + fluids','Evacuation + IV antibiotics + oxytocin']] }},
    { t: 'Step-wise Management', pts: ['Step 1: Rub up uterus (fundal massage)', 'Step 2: Oxytocin 10 IU IM + drip; catheterise', 'Step 3: Methergin 0.2mg IM (if not hypertensive)', 'Step 4: Misoprostol 800mcg sublingual/rectal', 'Step 5: Bimanual compression', 'Step 6: Surgical intervention if needed', '<strong>Prevention: AMTSL</strong> (oxytocin with delivery of anterior shoulder + CCT + uterine massage)'] },
  ],
  keywords: ['PPH','Primary','Secondary','4 T&rsquo;s','AMTSL','Bimanual compression']
},

213: { summary: 'PPH = bleeding &ge;500mL after delivery. Causes: 4 T&rsquo;s. Prevention: AMTSL (oxytocin + CCT + uterine massage). Management: rub uterus, oxytocin, IV fluids, crossmatch blood, bimanual compression.',
  sections: [
    { t: 'Causes & Prevention', pts: ['4 T&rsquo;s: Tone (70%), Trauma (20%), Tissue (10%), Thrombin (&lt;1%)', '<strong>AMTSL (Active Management of Third Stage of Labour):</strong>', '&nbsp;&nbsp;1. Oxytocin 10 IU IM with delivery of anterior shoulder', '&nbsp;&nbsp;2. Controlled cord traction (CCT) with counter-traction on uterus', '&nbsp;&nbsp;3. Uterine massage after placental delivery', 'Risk factors: grand multipara, multiple pregnancy, prolonged labour, polyhydramnios, previous PPH'] },
    { t: 'Management of Atonic PPH', pts: ['Rub up uterus + empty bladder', 'Oxytocin 10 IU IM + 20 IU drip; methergin 0.2mg IM (if not hypertensive)', 'Misoprostol 800mcg sublingual/rectal', 'IV fluids 2L fast; crossmatch + transfuse', 'Bimanual compression; aortic compression', 'Surgical: B-Lynch suture; uterine artery ligation; hysterectomy'] },
  ],
  keywords: ['PPH','AMTSL','Prevention','4 T&rsquo;s','Bimanual compression','Oxytocin']
},

214: { summary: 'PPH signs: excessive vaginal bleeding, rising pulse, falling BP, pallor, cold clammy skin, air hunger. Management: rub uterus + oxytocin + IV fluids + crossmatch. Nursing: monitor vitals q15min, maintain 2 IV lines.',
  sections: [
    { t: 'Signs & Symptoms', pts: ['Excessive vaginal bleeding (may be concealed in uterus)', 'Rising pulse rate (tachycardia, early sign)', 'Falling BP (hypotension, late sign)', 'Pallor; cold, clammy skin; diaphoresis', 'Air hunger; restlessness; altered consciousness', 'Soft, boggy uterus (if atonic)', 'Estimated blood loss: soaked pad = ~100mL; clots = significant'] },
    { t: 'Step-wise Management', pts: ['<strong>SHOUT for help</strong>; do not leave the patient', 'Rub up uterus; empty bladder', 'Oxytocin 10 IU IM + drip; methergin; misoprostol', '2 large-bore IV lines; NS/RL 2L fast', 'Crossmatch 4 units; transfuse if Hb &lt;7 or clinically shocked', 'Bimanual compression if atonic', 'Surgical options if medical management fails'] },
    { t: 'Nursing Management', pts: ['Monitor vitals every 15 minutes', 'Maintain 2 IV accesses; strict I/O charting', 'Estimate blood loss (weigh pads, count soaked pads)', 'Keep patient warm; oxygen if SpO2 &lt;95%', 'Send blood: CBC, crossmatch, coagulation profile', 'Emotional support; explain situation to family'] },
  ],
  keywords: ['PPH','Signs and symptoms','Tachycardia','Atonic uterus','Bimanual compression']
},

215: { summary: 'Case-based: Mrs. S, 2500g baby at 10:30 PM, complains of bleeding. Likely primary PPH. Assess: fundal height, uterine tone, vital signs, perineal tears. Management: rub uterus, oxytocin, IV fluids, identify cause (4 T&rsquo;s).',
  sections: [
    { t: 'Case Assessment', pts: ['<strong>History:</strong> Delivered 2500g male baby; complains of bleeding post-delivery', '<strong>Immediate assessment:</strong> Check uterine tone (is it boggy?); vital signs; estimated blood loss; perineal inspection for tears', '<strong>Most likely cause:</strong> Uterine atony (most common cause of primary PPH)'] },
    { t: 'Management', pts: ['Rub up the uterus (fundal massage)', 'Empty bladder (catheterise)', 'Oxytocin 10 IU IM + 20 IU in NS drip', 'If not hypertensive: methergin 0.2mg IM', 'IV fluids: 2L NS/RL fast', 'If perineal tear: identify degree and repair', 'If retained products: manual removal under anaesthesia', 'Crossmatch blood; transfuse if needed'] },
    { t: 'Nursing Care Plan', pts: ['Monitor vitals every 15 min until stable', 'Strict I/O chart; aim for urine output &ge;30 mL/hr', 'Continue fundal massage for 2 hours post-delivery', 'Check fundal height every 15 min (should be at or below umbilicus)', 'Emotional support; reassurance', 'Encourage early breastfeeding (stimulates oxytocin release)'] },
  ],
  keywords: ['PPH','Case study','Atonic uterus','Fundal massage','Oxytocin','4 T&rsquo;s']
},

216: { summary: 'Puerperium = delivery to 6 weeks postpartum. PPH complications include hypovolaemic shock, anaemia, Sheehan&rsquo;s syndrome (pituitary necrosis), renal failure, DIC. Nursing: monitor vitals, fundal height, lochia, breastfeeding.',
  sections: [
    { t: 'Complications of PPH', table: { h: ['Complication','Features'], rows: [['Hypovolaemic shock','Tachycardia, hypotension, pallor, cold skin'],['Anaemia','Fatigue, pallor, tachycardia; needs iron/transfusion'],['Sheehan&rsquo;s syndrome','Pituitary necrosis &rarr; lactation failure, amenorrhoea, hypothyroidism'],['Renal failure','Oliguria &rarr; anuria due to renal ischaemia'],['DIC','Uncontrollable bleeding from all sites']] }},
    { t: 'Nursing Management of Puerperium', pts: ['Daily assessment: vitals, fundal height (descends 1 finger/day), lochia, breasts, wound, legs', 'Monitor for danger signs: fever, foul lochia, excessive bleeding, calf tenderness', 'Promote breastfeeding on demand; proper latching technique', 'Nutrition: extra 500 kcal/day; IFA; calcium', 'Family planning counselling', 'Screen for postpartum depression'] },
  ],
  keywords: ['Puerperium','PPH complications','Sheehan&rsquo;s syndrome','Involution','Lochia']
},

217: { summary: 'Breast problems in puerperium: engorgement (day 3&ndash;4, frequent feeding), cracked/sore nipples (correct latching), mastitis (antibiotics + continue BF), breast abscess (I&D + antibiotics). Prevention: proper latching, demand feeding.',
  sections: [
    { t: 'Breast Problems', table: { h: ['Problem','Features','Management'], rows: [['Engorgement','Day 3&ndash;4; hard, painful, warm breasts','Frequent breastfeeding; warm compress; hand expression; analgesics'],['Cracked/sore nipples','Pain during feeds; fissures on nipple','Correct latching technique; nipple cream; air-dry after feeds'],['Mastitis','Red, tender, wedge-shaped area + fever','Antibiotics (flucloxacillin); <strong>continue breastfeeding</strong>; analgesics'],['Breast abscess','Fluctuant swelling + high fever + pus','Incision &amp; drainage + antibiotics; stop BF from affected side temporarily']] }},
    { t: 'Prevention', pts: ['Proper latching technique from first feed', 'Demand feeding (not scheduled)', 'Complete emptying of one breast before switching', 'Good breast hygiene; comfortable bra', 'Do NOT apply soap to nipples (causes dryness/cracking)'] },
  ],
  keywords: ['Breast engorgement','Mastitis','Cracked nipples','Breast abscess','Breastfeeding']
},

218: { summary: 'Breast engorgement occurs day 3&ndash;4 postpartum due to milk stasis. Signs: hard, painful, warm, tense breasts. Management: frequent breastfeeding (best treatment), warm compress before feed, cold compress after, analgesics, hand expression.',
  sections: [
    { t: 'Key Points', pts: ['Occurs <strong>day 3&ndash;4 postpartum</strong> when milk "comes in"', 'Both breasts affected; hard, painful, tense, warm, shiny', 'Cause: milk stasis due to infrequent/inadequate breastfeeding', '<strong>Best treatment:</strong> Frequent breastfeeding on demand (every 2&ndash;3 hours)', 'Warm compress before feed (helps let-down)', 'Cold compress after feed (reduces swelling)', 'Hand expression to relieve pressure', 'Supportive bra; analgesics (paracetamol)', '<strong>Prevention:</strong> Early initiation of BF (within 1 hour); demand feeding; proper latching'] },
  ],
  keywords: ['Breast engorgement','Milk stasis','Breastfeeding','Warm compress','Day 3&ndash;4']
},

// ═══════════════════════════════════════════════════════════════
// UNIT 10: HIGH-RISK NEWBORN (IDs 219-231)
// ═══════════════════════════════════════════════════════════════

219: { summary: 'Levels of neonatal care: Level I (well-baby nursery), Level II (special care, SNCU), Level III (NICU, ventilators). Every facility should provide Essential Newborn Care (ENC): warmth, clean cord care, breastfeeding, resuscitation.',
  sections: [
    { t: 'Levels', table: { h: ['Level','Facility','Services'], rows: [['Level I (Basic)','PHC, well-baby nursery','Essential newborn care; stable term babies; resuscitation'],['Level II (Special Care/SNCU)','District hospital','IV fluids, antibiotics, phototherapy, CPAP; babies &ge;32 wks or &ge;1500g'],['Level III (NICU)','Tertiary hospital','Ventilators, surfactant, surgery; babies &lt;32 wks or &lt;1500g']] }},
    { t: 'Essential Newborn Care', pts: ['Warmth: dry, wrap, skin-to-skin', 'Clean cord care: clean cut, no application', 'Early breastfeeding within 1 hour', 'Eye care: clean with sterile water', 'Immunisation: BCG, OPV-0, Hep B birth dose', 'Newborn screening for congenital conditions'] },
  ],
  keywords: ['Neonatal care levels','SNCU','NICU','Essential newborn care','Resuscitation']
},

220: { summary: 'Premature baby = born before 37 weeks or weight &lt;2500g. Causes: PIH, infections, multiple pregnancy, APH, cervical incompetence. Problems: RDS, hypothermia, hypoglycaemia, jaundice, NEC, IVH. Care: KMC, incubator, gavage feeds.',
  sections: [
    { t: 'Causes', pts: ['PIH/pre-eclampsia; infection; multiple pregnancy; APH; cervical incompetence; PPROM; polyhydramnios; young/old mother; smoking; ART'] },
    { t: 'Problems', table: { h: ['System','Problem'], rows: [['Respiratory','RDS (surfactant deficiency); apnoea of prematurity'],['Temperature','Hypothermia (thin skin, less fat, large surface area)'],['Metabolic','Hypoglycaemia; hypocalcaemia; jaundice (immature liver)'],['GI','Poor suck/swallow; NEC (necrotising enterocolitis)'],['CNS','IVH (intraventricular haemorrhage); PVL'],['Immunity','Sepsis (immature immune system)'],['Eyes','ROP (retinopathy of prematurity) from excess O2']] }},
    { t: 'Care of Premature Baby', pts: ['<strong>Thermoregulation:</strong> KMC (best), incubator, warm room, cap + socks', '<strong>Feeding:</strong> Breast milk is best; gavage feeds (OG/NG) if cannot suck; start with 60 mL/kg/day', '<strong>Respiratory:</strong> Surfactant if RDS; CPAP; oxygen monitoring (SpO2 90&ndash;95% to prevent ROP)', '<strong>Prevention of infection:</strong> Hand hygiene; minimal handling; exclusive breast milk', '<strong>Monitoring:</strong> Temperature q3h; weight daily; blood glucose; bilirubin', '<strong>KMC:</strong> Skin-to-skin contact with mother; baby in frog position between breasts; 24/7 if possible'] },
  ],
  mnemonic: { label: 'Problems &mdash; "THIS JAR"', explain: 'T=Temperature (hypothermia) | H=Hypoglycaemia | I=Infections | S=Surfactant deficiency (RDS) | J=Jaundice | A=Apnoea | R=ROP' },
  keywords: ['Premature baby','Preterm','RDS','KMC','Hypothermia','Hypoglycaemia','NEC','ROP']
},

221: { summary: 'Preterm baby care: thermoregulation (KMC, incubator), feeding (breast milk, gavage if needed), infection prevention (hand hygiene, minimal handling), respiratory support, monitoring (temp, weight, glucose, bilirubin).',
  sections: [
    { t: 'Care Components', pts: ['<strong>Thermoregulation:</strong> KMC (skin-to-skin) is best; incubator if not possible; cap, socks, warm blankets; target temp 36.5&ndash;37.5&deg;C', '<strong>Feeding:</strong> Mother&rsquo;s breast milk (preferably); gavage (OG/NG tube) if poor suck; start 60 mL/kg/day, increase by 20 mL/kg/day', '<strong>Infection prevention:</strong> Strict hand hygiene; minimal handling; exclusive breast milk (contains IgA)', '<strong>Respiratory:</strong> CPAP/surfactant if RDS; SpO2 target 90&ndash;95% (avoid high O2 &rarr; ROP)', '<strong>Monitoring:</strong> Temperature q3h; weight daily; blood glucose q6&ndash;8h; bilirubin daily', '<strong>Developmental care:</strong> Dim lights; reduce noise; nesting; non-nutritive sucking; parental involvement'] },
  ],
  keywords: ['Preterm care','KMC','Gavage feeding','Thermoregulation','CPAP','Developmental care']
},

222: { summary: 'KMC (Kangaroo Mother Care) = skin-to-skin contact between mother and baby. Baby placed between breasts in frog position, covered with wrapper. Benefits: thermoregulation, breastfeeding, bonding, reduces infection and mortality. Criteria: stable baby, mother willing.',
  sections: [
    { t: 'KMC Components', pts: ['<strong>Position:</strong> Baby in upright position between mother&rsquo;s breasts, skin-to-skin, in frog position', '<strong>Clothing:</strong> Baby wears only cap, socks, diaper; mother&rsquo;s clothes/wrapper over both', '<strong>Duration:</strong> 24/7 if possible; minimum 1 hour at a time', '<strong>Feeding:</strong> Exclusive breastfeeding; baby can feed in KMC position'] },
    { t: 'Benefits', pts: ['Thermoregulation (maintains temperature)', 'Promotes breastfeeding and weight gain', 'Reduces infections and hospital stay', 'Improves bonding and maternal confidence', 'Stabilises heart rate and breathing', 'Reduces neonatal mortality by up to 40%'] },
    { t: 'Criteria', pts: ['Stable baby (no critical illness, no ventilator)', 'Baby weighing &lt;2500g (especially &lt;1800g)', 'Mother willing and trained; family support', 'Can be done by father or any family member'] },
  ],
  keywords: ['KMC','Kangaroo Mother Care','Skin-to-skin','Thermoregulation','Low birth weight']
},

223: { summary: 'Postmaturity = pregnancy beyond 42 weeks (294 days). Signs: dry peeling skin, absent vernix, meconium staining, long nails, alert look. Risks: meconium aspiration, cord compression, macrosomia, stillbirth. Manage: induce at 41 weeks.',
  sections: [
    { t: 'Signs of Postmaturity', pts: ['Dry, wrinkled, peeling skin', 'Absent vernix caseosa and lanugo', 'Meconium staining of skin, nails, cord', 'Long fingernails and toenails', 'Alert, wide-eyed expression', 'Reduced subcutaneous fat (wasted appearance)'] },
    { t: 'Risks & Management', pts: ['Fetal: meconium aspiration, oligohydramnios, cord compression, macrosomia, stillbirth', 'Management: induce labour at <strong>41 weeks</strong> (post-dates)', 'If not induced: daily CTG + biweekly AFI + daily kick count', 'Paediatrician at delivery; suction meconium if needed'] },
  ],
  keywords: ['Postmaturity','Post-dates','Meconium staining','Oligohydramnios','Induction at 41 weeks']
},

224: { summary: 'Postmaturity effects: fetal &mdash; meconium aspiration, cord compression, macrosomia, hypoglycaemia, polycythaemia, stillbirth. Maternal &mdash; prolonged pregnancy anxiety, higher C-section rate, birth trauma from macrosomia.',
  sections: [
    { t: 'Effects', table: { h: ['Fetal Effects','Maternal Effects'], rows: [['Meconium aspiration syndrome','Anxiety and psychological distress'],['Oligohydramnios &rarr; cord compression','Higher C-section rate'],['Macrosomia (&gt;4 kg)','Birth injuries (perineal tears)'],['Hypoglycaemia after birth','Shoulder dystocia risk'],['Polycythaemia &rarr; jaundice','Failed induction risk'],['Stillbirth','Longer hospital stay']] }},
    { t: 'Prevention', pts: ['Accurate dating by first-trimester USG', 'Sweep membranes at 40&ndash;41 weeks', 'Induce at <strong>41 completed weeks</strong>', 'If not induced: fetal surveillance (CTG + AFI)'] },
  ],
  keywords: ['Postmaturity','Meconium aspiration','Macrosomia','Hypoglycaemia','Induction']
},

225: { summary: 'Asphyxia neonatorum = failure to initiate and sustain breathing at birth. Causes: maternal (APH, PIH), fetal (prematurity, cord prolapse), labour (prolonged, obstructed). Management: NRP (Neonatal Resuscitation Protocol) &mdash; stimulate, suction, bag-mask, intubate.',
  sections: [
    { t: 'Key Points', pts: ['<strong>Definition:</strong> Failure to initiate and sustain breathing at birth; Apgar &lt;7 at 1 min', '<strong>Causes:</strong> Maternal (PIH, APH, anaemia), Fetal (prematurity, cord prolapse, meconium aspiration), Labour (prolonged, obstructed)', '<strong>NRP Steps:</strong> Dry + warm + stimulate &rarr; suction if needed &rarr; bag-mask ventilation (room air) &rarr; chest compressions (3:1 ratio) &rarr; intubation + adrenaline', '<strong>Assessment:</strong> Apgar score at 1 and 5 minutes', 'Mild (6&ndash;7): stimulation + O2; Moderate (4&ndash;5): bag-mask ventilation; Severe (&le;3): intubation + drugs', '<strong>Prevention:</strong> Proper ANC, skilled birth attendance, partograph use, prompt management of fetal distress'] },
  ],
  keywords: ['Asphyxia neonatorum','NRP','Apgar','Bag-mask ventilation','Resuscitation']
},

226: { summary: 'Phototherapy = treatment for neonatal jaundice using blue light (wavelength 420&ndash;470nm) to convert unconjugated bilirubin into water-soluble form for excretion. Nursing: expose maximum skin, eye shields, monitor temperature, adequate feeding.',
  sections: [
    { t: 'Nursing Care During Phototherapy', pts: ['Baby undressed (maximum skin exposure); only diaper', '<strong>Eye shields</strong> to protect retinae (remove during feeds)', 'Monitor temperature q3h (risk of hypothermia/hyperthermia)', 'Adequate feeding: breastfeed every 2&ndash;3 hours (prevent dehydration)', 'Monitor intake/output; check for signs of dehydration', 'Turn baby every 2 hours (expose all surfaces)', 'Monitor serum bilirubin q12&ndash;24h', 'Check for bronze baby syndrome (if conjugated bilirubin elevated)', 'Maintain skin-to-skin contact during feed breaks'] },
  ],
  keywords: ['Phototherapy','Neonatal jaundice','Bilirubin','Eye shields','Blue light']
},

227: { summary: 'Haemolytic jaundice in newborn is caused by Rh incompatibility (most common severe) or ABO incompatibility. Results in excessive RBC destruction &rarr; high unconjugated bilirubin &rarr; risk of kernicterus. Management: phototherapy, exchange transfusion.',
  sections: [
    { t: 'Key Points', table: { h: ['Feature','Rh Incompatibility','ABO Incompatibility'], rows: [['Mother/Baby','Rh-negative mother / Rh-positive baby','Mother O / Baby A or B'],['Severity','Severe (hydrops, kernicterus)','Usually mild'],['Onset','Within 24 hours','24&ndash;72 hours'],['DCT (Direct Coombs)','Strongly positive','Weakly positive or negative'],['Treatment','Exchange transfusion + phototherapy','Phototherapy (exchange transfusion rarely needed)'],['Prevention','Anti-D immunoglobulin to mother','Not preventable']] }},
    { t: 'Management', pts: ['Phototherapy (first line)', 'Exchange transfusion if bilirubin crosses critical levels or rising rapidly', '<strong>Kernicterus</strong> (bilirubin encephalopathy): unconjugated bilirubin &gt;20 mg/dL deposits in basal ganglia &rarr; permanent brain damage', 'Prevention of Rh disease: Anti-D 300mcg IM to Rh-negative mother at 28 weeks and within 72 hours of delivery'] },
  ],
  keywords: ['Haemolytic jaundice','Rh incompatibility','ABO','Kernicterus','Exchange transfusion','Anti-D']
},

228: { summary: 'Prevention of HIV in newborn: PPTCT (Prevention of Parent-to-Child Transmission). ART to mother during pregnancy + during labour + to newborn (nevirapine syrup). Avoid breastfeeding if replacement feeding feasible; else exclusive BF for 6 months.',
  sections: [
    { t: 'PPTCT Strategy', pts: ['<strong>Antenatal:</strong> ART to mother from diagnosis onwards (lifelong)', '<strong>Intrapartum:</strong> Continue ART; avoid prolonged ROM and invasive procedures', '<strong>Postnatal (baby):</strong> Nevirapine syrup from birth for 6&ndash;12 weeks', '<strong>Feeding:</strong> If safe replacement feeding available: formula feed; If not available: <strong>exclusive breastfeeding for 6 months</strong> (mixed feeding increases risk)', '<strong>Elective C-section:</strong> If viral load &gt;1000 copies/mL (reduces transmission)', '<strong>Testing:</strong> DNA PCR test for baby at 6 weeks and 6 months'] },
  ],
  keywords: ['HIV prevention','PPTCT','Nevirapine','ART','Breastfeeding','PMTCT']
},

229: { summary: 'Breastfeeding in HIV: If safe replacement feeding available and affordable &rarr; formula feed. If not &rarr; exclusive breastfeeding for 6 months (mixed feeding increases transmission). Mother should be on ART throughout breastfeeding.',
  sections: [
    { t: 'Guidelines', pts: ['<strong>WHO recommendation:</strong> Exclusive breastfeeding for 6 months with maternal ART throughout', '<strong>Mixed feeding (breast + formula) INCREASES transmission risk</strong> &mdash; avoid', 'If replacement feeding is AFASS (Affordable, Feasible, Acceptable, Sustainable, Safe) &rarr; formula feed', 'If not AFASS &rarr; exclusive breastfeeding for 6 months with mother on ART', 'Avoid breastfeeding if: nipple fissures/bleeding, breast abscess, infant oral thrush', 'Heat-treated expressed breast milk is an option in special situations'] },
  ],
  keywords: ['HIV breastfeeding','Exclusive breastfeeding','AFASS','ART','Mixed feeding']
},

230: { summary: 'Counselling HIV-positive mother: discuss PPTCT, ART compliance, delivery plan, infant feeding options (AFASS criteria), follow-up testing, contraception, partner testing, emotional support, confidentiality.',
  sections: [
    { t: 'Counselling Points', pts: ['Explain HIV transmission: pregnancy, delivery, breastfeeding', 'Importance of <strong>ART compliance</strong> (reduces transmission to &lt;2%)', 'Discuss delivery plan (C-section if high viral load)', 'Infant feeding options: explain AFASS criteria; support mother&rsquo;s decision', 'Baby will need nevirapine syrup from birth; testing at 6 weeks (DNA PCR)', 'Contraception counselling; dual protection (condom + another method)', 'Partner testing and disclosure; couple counselling', '<strong>Emotional support:</strong> Address fear, guilt, stigma; ensure confidentiality', 'Follow-up: regular ANC; CD4 count; viral load monitoring'] },
  ],
  keywords: ['HIV counselling','PPTCT','ART compliance','AFASS','Confidentiality']
},

231: { summary: 'Prenatal counselling for HIV: HIV testing at first ANC visit (opt-out); explain PPTCT (ART during pregnancy, delivery, to baby); discuss feeding options; partner testing; address fears and stigma; confidentiality.',
  sections: [
    { t: 'Counselling Components', pts: ['<strong>Pre-test counselling:</strong> Explain why HIV testing is recommended; obtain consent (opt-out strategy)', '<strong>If positive:</strong> Post-test counselling; explain PPTCT; start ART immediately (lifelong)', '<strong>PPTCT plan:</strong> ART throughout pregnancy + labour + breastfeeding; baby receives nevirapine', '<strong>Delivery:</strong> Vaginal if viral load suppressed; C-section if &gt;1000 copies/mL', '<strong>Infant feeding:</strong> Discuss options based on AFASS criteria; support decision', '<strong>Partner involvement:</strong> Encourage partner testing; disclosure support', '<strong>Emotional support:</strong> Address guilt, fear, stigma; maintain strict confidentiality', '<strong>Follow-up:</strong> Regular ANC visits; CD4 and viral load monitoring; adherence support'] },
  ],
  keywords: ['Prenatal HIV counselling','Opt-out testing','PPTCT','ART','Partner testing']
},

// ═══════════════════════════════════════════════════════════════
// UNIT 11: GYNAECOLOGICAL DISORDERS (IDs 232-238)
// ═══════════════════════════════════════════════════════════════

232: { summary: 'Fertilisation = fusion of sperm and ovum in ampulla of fallopian tube. Implantation = embedding of blastocyst in endometrium on day 6&ndash;7. Spermatogenesis produces sperm in testes (74 days). Oogenesis produces ova in ovaries (from fetal life).',
  sections: [
    { t: 'Definitions', c: '<div class="definition-box"><strong>Fertilisation:</strong> Union of sperm and ovum in the <strong>ampulla of the fallopian tube</strong>, forming a zygote.<br><br><strong>Implantation:</strong> Embedding of the blastocyst into the <strong>endometrium</strong> on <strong>day 6&ndash;7</strong> after fertilisation.</div>' },
    { t: 'Spermatogenesis vs Oogenesis', table: { h: ['Feature','Spermatogenesis','Oogenesis'], rows: [['Site','Seminiferous tubules of testes','Ovary'],['Duration','74 days per cycle','Starts in fetal life; completes at ovulation'],['Output','200&ndash;300 million/day','1 ovum per cycle'],['Cell type','Spermatogonium &rarr; spermatocyte &rarr; spermatid &rarr; sperm','Oogonium &rarr; primary oocyte &rarr; secondary oocyte &rarr; ovum'],['Hormones','FSH + testosterone','FSH + LH + oestrogen'],['Begins','Puberty','Fetal life (arrested until puberty)'],['Ends','Lifelong (decreases with age)','Menopause']] }},
    { t: 'Steps of Fertilisation', pts: ['Sperm capacitation in female genital tract (6&ndash;7 hours)', 'Sperm penetrates corona radiata and zona pellucida', 'Acrosome reaction releases enzymes to enter ovum', 'Cortical reaction prevents polyspermy (zona block)', 'Fusion of male and female pronuclei &rarr; zygote (46 chromosomes)', 'Zygote undergoes mitotic division &rarr; morula &rarr; blastocyst &rarr; implants in endometrium'] },
  ],
  keywords: ['Fertilisation','Implantation','Spermatogenesis','Oogenesis','Blastocyst','Zygote']
},

233: { summary: 'Case: Mrs. S, 27 years, married 6 years, regular unprotected intercourse, no conception = primary infertility. Investigation: both partners. Female: history, HSG, hormonal assays. Male: semen analysis. Treatment depends on cause.',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>Primary Infertility:</strong> Failure to conceive after <strong>1 year of regular, unprotected intercourse</strong> without any previous conception.<br><strong>Secondary Infertility:</strong> Failure to conceive after a previous pregnancy (whether live birth or not).</div>' },
    { t: 'Investigations', table: { h: ['Partner','Investigations'], rows: [['<strong>Female</strong>','History + examination; Day 2 FSH/LH/E2; Day 21 progesterone (ovulation confirmation); USG (follicular tracking); HSG (tubal patency); thyroid function; prolactin'],['<strong>Male</strong>','Semen analysis (count, motility, morphology, volume); Normal: &ge;15 million/mL, &ge;40% motility; hormonal assay if abnormal']] }},
    { t: 'Causes & Treatment', pts: ['<strong>Ovulatory dysfunction (25%):</strong> Clomiphene citrate; gonadotropins; lifestyle modification', '<strong>Tubal factor (25%):</strong> Tubal surgery; IVF if blocked', '<strong>Male factor (30%):</strong> Treat infection; IUI; ICSI if severe', '<strong>Unexplained (15%):</strong> IUI; IVF', '<strong>Endometriosis:</strong> Laparoscopic surgery; GnRH agonists; IVF'] },
    { t: 'Nursing Role', pts: ['Detailed history of both partners', 'Emotional support (infertility causes significant distress)', 'Education about fertile period and timing of intercourse', 'Support through treatment procedures; manage expectations', 'Counselling about ART options and success rates'] },
  ],
  keywords: ['Primary infertility','Secondary infertility','Semen analysis','HSG','Clomiphene','IVF']
},

234: { summary: 'Infertility = failure to conceive after 1 year of regular unprotected intercourse. Primary (no previous pregnancy) vs Secondary (previous pregnancy but unable to conceive again). Investigation of both partners essential. Treatment: medical, surgical, ART.',
  sections: [
    { t: 'Primary vs Secondary', table: { h: ['Feature','Primary','Secondary'], rows: [['Definition','Never conceived','Previous pregnancy but unable to conceive again'],['Most common cause (female)','Ovulatory dysfunction (PCOS)','Tubal damage/PID'],['Most common cause (male)','Abnormal semen','Infection/obstruction']] }},
    { t: 'Investigation & Treatment', pts: ['<strong>Female:</strong> Hormonal assay, USG, HSG, laparoscopy', '<strong>Male:</strong> Semen analysis (first investigation to be done)', 'Treatment: depends on cause &mdash; ovulation induction (clomiphene), tubal surgery, IUI, IVF, ICSI', '<strong>ART options:</strong> IUI, IVF, ICSI, donor gametes, surrogacy'] },
  ],
  keywords: ['Infertility','Primary','Secondary','Investigation','IVF','IUI','ART']
},

235: { summary: 'ART (Assisted Reproductive Techniques): IUI (intrauterine insemination), IVF (in vitro fertilisation), ICSI (intracytoplasmic sperm injection), GIFT, ZIFT, surrogacy, donor gametes. IVF is the most common ART procedure.',
  sections: [
    { t: 'ART Types', table: { h: ['Technique','Description','Indication'], rows: [['<strong>IUI</strong>','Washed sperm placed directly in uterus','Mild male factor; unexplained; cervical factor'],['<strong>IVF</strong>','Egg + sperm fertilised in lab; embryo transferred to uterus','Tubal factor; endometriosis; failed IUI; unexplained'],['<strong>ICSI</strong>','Single sperm injected directly into egg','Severe male factor; failed IVF'],['<strong>GIFT</strong>','Gametes placed in fallopian tube','At least one patent tube'],['<strong>Surrogacy</strong>','Another woman carries the pregnancy','Absent/abnormal uterus; medical contraindication'],['<strong>Donor gametes</strong>','Donor egg or sperm used','Absent gametes; genetic disease']] }},
  ],
  keywords: ['ART','IVF','ICSI','IUI','GIFT','Surrogacy','Donor gametes']
},

236: { summary: 'Surrogacy Bill (India, 2021): Only altruistic surrogacy allowed (no commercial). Surrogate must be close relative, married, have own child. Intended parents must be Indian married couple (25&ndash;50 wife, 26&ndash;55 husband). Bans single parents, live-in couples, foreigners.',
  sections: [
    { t: 'Key Provisions', pts: ['Only <strong>altruistic surrogacy</strong> allowed (no payment beyond medical expenses)', 'Commercial surrogacy is <strong>banned</strong>', 'Surrogate must be: close relative, married, have her own child, age 25&ndash;35', 'Intended parents: Indian married couple married for 5 years; wife 25&ndash;50, husband 26&ndash;55', 'Must have medical indication for surrogacy (certificate from district medical board)', 'Single parents, live-in couples, and foreigners <strong>cannot</strong> opt for surrogacy', 'National and State Surrogacy Boards constituted for regulation'] },
  ],
  keywords: ['Surrogacy Bill','Altruistic surrogacy','Commercial surrogacy banned','India 2021']
},

237: { summary: 'Uterine prolapse = descent of uterus into or beyond the vaginal canal. Degrees: 1st (descent within vagina), 2nd (cervix at introitus), 3rd (complete prolapse outside). Causes: multiparity, weak pelvic floor. Treatment: pessary or surgery (hysterectomy, repair).',
  sections: [
    { t: 'Definition', c: '<div class="definition-box"><strong>Uterine Prolapse:</strong> Descent of the uterus from its normal anatomical position downward into the vaginal canal, due to <strong>weakness of pelvic floor muscles and ligaments</strong>.</div>' },
    { t: 'Degrees', table: { h: ['Degree','Description'], rows: [['1st degree','Cervix descends into upper vagina (above introitus)'],['2nd degree','Cervix reaches the introitus (vaginal opening)'],['3rd degree (Procidentia)','Entire uterus protrudes outside the vagina']] }},
    { t: 'Causes', pts: ['Multiparity (most common cause)', 'Prolonged labour; precipitate labour', 'Weak pelvic floor (menopause, oestrogen deficiency)', 'Chronic cough; constipation; heavy lifting (increase abdominal pressure)', 'Congenital weakness of pelvic ligaments'] },
    { t: 'Management', pts: ['<strong>Conservative:</strong> Pelvic floor exercises (Kegel); Ring pessary (elderly/unfit for surgery)', '<strong>Pre-operative care:</strong> Vaginal hygiene; treat ulceration; estrogen cream; treat UTI; optimise health', '<strong>Surgery:</strong> Anterior colporrhaphy (for cystocele); posterior colpoperineorrhaphy (for rectocele); Manchester repair (amputation of cervix + repair); Vaginal hysterectomy (definitive treatment)', '<strong>Post-operative care:</strong> Monitor vitals; catheter care; wound care; avoid straining; pelvic floor exercises; avoid heavy lifting for 3 months'] },
  ],
  keywords: ['Uterine prolapse','Degrees','Procidentia','Pessary','Vaginal hysterectomy','Pelvic floor']
},

238: { summary: 'Dysmenorrhoea = painful menstruation. Primary (no organic cause, prostaglandins) vs Secondary (due to pathology like endometriosis, fibroids, PID). Treatment: NSAIDs, hormonal contraceptives, treat underlying cause.',
  sections: [
    { t: 'Types', table: { h: ['Feature','Primary','Secondary'], rows: [['Cause','Excess prostaglandins (no pathology)','Organic pathology (endometriosis, fibroids, PID)'],['Onset','Soon after menarche','Usually after 25 years'],['Pain','Spasmodic, lower abdominal, day 1&ndash;2 of menses','Dull, continuous, may be throughout cycle'],['Examination','Normal','Abnormal findings (tenderness, masses)'],['Treatment','NSAIDs (ibuprofen, mefenamic acid); OCPs; exercise','Treat underlying cause + pain management']] }},
    { t: 'Nursing Management', pts: ['Assess pain: severity, duration, impact on daily activities', 'Administer analgesics: NSAIDs 30 min before expected onset', 'Non-pharmacological: heat pad on lower abdomen; exercise; relaxation', 'Hormonal contraceptives if NSAIDs insufficient', 'Secondary: refer for investigation (USG, laparoscopy)'] },
  ],
  keywords: ['Dysmenorrhoea','Primary','Secondary','Prostaglandins','NSAIDs','Endometriosis']
},

};

// ═══ BUILD FULL HTML FROM COMPACT FORMAT ═══════════════════════
for (const [id, data] of Object.entries(COMPACT_ANSWERS)) {
  let html = '<div class="in-short"><strong>In Short:</strong> ' + data.summary + '</div>\n';

  for (const sec of data.sections) {
    html += '<div class="answer-section">\n';
    html += '  <h3 class="answer-section-title' + (sec.t.includes('Definition') ? ' teal-title' : ' accent-title') + '">' + sec.t + '</h3>\n';

    if (sec.c) {
      html += '  ' + sec.c + '\n';
    }

    if (sec.table) {
      html += '  <div class="answer-table-wrap"><table class="answer-table">\n';
      html += '    <thead><tr>' + sec.table.h.map(h => '<th>' + h + '</th>').join('') + '</tr></thead>\n';
      html += '    <tbody>\n';
      for (const row of sec.table.rows) {
        html += '      <tr>' + row.map(c => '<td>' + c + '</td>').join('') + '</tr>\n';
      }
      html += '    </tbody>\n';
      html += '  </table></div>\n';
    }

    if (sec.pts) {
      html += '  <ul class="answer-points">\n';
      for (const pt of sec.pts) {
        html += '    <li>' + pt + '</li>\n';
      }
      html += '  </ul>\n';
    }

    html += '</div>\n';
  }

  if (data.mnemonic) {
    html += '<div class="mnemonic-box">\n';
    html += '  <div class="mnemonic-label">Mnemonic: ' + data.mnemonic.label + '</div>\n';
    html += '  <div class="mnemonic-explain">' + data.mnemonic.explain + '</div>\n';
    html += '</div>\n';
  }

  html += '<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>\n';
  // Auto-generate remember box from summary keywords
  const summaryParts = data.summary.split('. ').slice(0, 4);
  for (const part of summaryParts) {
    if (part.length > 10) html += '  <li>' + part + '</li>\n';
  }
  html += '</ul></div>\n';

  if (data.keywords) {
    html += '<div class="keyword-box"><strong>Keywords:</strong> ' + data.keywords.map(k => '<span class="kw">' + k + '</span>').join('') + '</div>';
  }

  answers[parseInt(id)] = html;
}

// ═══ WRITE JSON ═══════════════════════════════════════════════
fs.writeFileSync('./answers-content.json', JSON.stringify(answers, null, 2), 'utf8');
console.log('Generated answers-content.json with ' + Object.keys(answers).length + ' answers.');
console.log('File size: ' + (fs.statSync('./answers-content.json').size / 1024).toFixed(1) + ' KB');
