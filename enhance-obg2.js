#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// enhance-obg2.js — Gold-Standard Answer Upgrader
// Adds missing structural elements to ALL 131 OBG-II answers.
// Run: node enhance-obg2.js
// Output: data-obg2-enhanced.js (verify, then rename to data-obg2.js)
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
global.window = {};
require('./data-obg2.js');
const questions = window.QUESTIONS_DATA_OBG2;

// ─── ANALYSIS ──────────────────────────────────────────────────
function has(answer, cls) { return answer.includes(cls); }

// ─── EXAM STRATEGY GENERATOR ──────────────────────────────────
function examStrategy(q) {
  if (q.marks < 13) return '';
  // Parse question to determine structure
  const qLow = q.question.toLowerCase();
  const hasDefine = /define|what is|what do you mean/.test(qLow);
  const hasList = /enlist|enumerate|list|classify|types/.test(qLow);
  const hasExplain = /explain|describe|discuss/.test(qLow);
  const hasNursing = /nurs|midwi|management|care/.test(qLow);
  const hasCaseStudy = /mrs\.|mr\.|case|scenario|admitted/.test(qLow);

  let parts = [];
  if (hasCaseStudy) {
    parts = [
      'Read the case carefully and identify the condition &mdash; <strong>1 mark</strong> (~2 min)',
      'Define the condition + relevant pathophysiology &mdash; <strong>3 marks</strong> (~5 min)',
      'Clinical features matching the case &mdash; <strong>3 marks</strong> (~5 min)',
      'Medical management (drugs, doses, procedures) &mdash; <strong>4 marks</strong> (~7 min)',
      'Nursing management using ADPIE framework &mdash; <strong>3 marks</strong> (~5 min)',
      'Conclusion + 1 diagram/table &mdash; <strong>1 mark</strong> (~1 min)'
    ];
  } else {
    if (hasDefine) parts.push('Definition (with WHO/standard definition) &mdash; <strong>2 marks</strong> (~3 min)');
    if (hasList) parts.push('Classification / Enumeration (use a table) &mdash; <strong>3 marks</strong> (~5 min)');
    if (hasExplain) parts.push('Detailed explanation with pathophysiology &mdash; <strong>4 marks</strong> (~7 min)');
    if (hasNursing) parts.push('Nursing / Medical management (use ADPIE) &mdash; <strong>4 marks</strong> (~7 min)');
    if (parts.length === 0) {
      parts = [
        'Introduction + Definition &mdash; <strong>2 marks</strong> (~3 min)',
        'Main content (causes/types/features) &mdash; <strong>5 marks</strong> (~8 min)',
        'Management + Nursing role &mdash; <strong>5 marks</strong> (~8 min)',
        'Conclusion &mdash; <strong>3 marks</strong> (~4 min)'
      ];
    }
    parts.push('Draw at least 1 diagram/flowchart + use a table &mdash; <strong>bonus impact</strong>');
  }

  return '\n<div class="exam-strategy">\n' +
    '  <strong>How to Write This in Exam (' + q.marks + ' marks):</strong><br>\n' +
    parts.map(p => '  &bull; ' + p).join('<br>\n') + '<br>\n' +
    '  <em>Total time: ~25 minutes. Always start with a definition and end with a conclusion for full marks!</em>\n' +
    '</div>\n';
}

// ─── CONCLUSION GENERATOR ──────────────────────────────────────
function conclusion(q) {
  // Extract topic from question
  const topic = extractTopic(q);
  const qLow = q.question.toLowerCase();
  const hasNursing = /nurs|midwi/.test(qLow);

  let text = topic + ' is an important topic in obstetric nursing. ';
  if (hasNursing) {
    text += 'The nurse plays a crucial role in early identification, timely intervention, and compassionate care. ';
  }
  text += 'A thorough understanding of the clinical features, management, and complications helps the nurse provide evidence-based care and improve maternal and neonatal outcomes.';

  return '\n<div class="answer-section">\n' +
    '  <h3 class="answer-section-title teal-title">Conclusion</h3>\n' +
    '  <div class="conclusion-box">\n' +
    '    ' + text + '\n' +
    '  </div>\n' +
    '</div>\n';
}

// ─── TOPIC EXTRACTOR ───────────────────────────────────────────
function extractTopic(q) {
  const qText = q.question;
  // Try to extract the main topic from common patterns
  let m;
  if ((m = qText.match(/(?:Define|Explain|Describe|Discuss)\s+(?:the\s+)?(?:term\s+)?(.+?)(?:\.|,|\/|\band\b|\bor\b|\bwith\b|\bin\b)/i))) {
    return m[1].trim().replace(/^(?:about|on)\s+/i, '');
  }
  if ((m = qText.match(/(?:What is|What do you mean by|What do you understand by)\s+(.+?)(?:\?|\.|\band\b)/i))) {
    return m[1].trim();
  }
  // Fallback: first phrase
  return qText.split(/[.,\/]/)[0].replace(/^(Define|Explain|Describe|Discuss|Write|List|Enumerate)\s+/i, '').trim().substring(0, 60);
}

// ─── EDITORIAL EXAMPLE GENERATOR ───────────────────────────────
// Topic-specific Indian clinical scenarios
const examples = {
  108: 'Mrs. Jaya, 35 years, G4P3L2, Hb 7.5 g/dL, previous caesarean section, presents at 12 weeks for ANC registration. The nurse identifies <strong>4 risk factors</strong>: elderly multigravida (&gt;35 years), severe anaemia, bad obstetric history (previous loss), and previous uterine surgery. Using the ABCDE framework, she classifies Mrs. Jaya as <strong>high-risk</strong>, stamps her maternity card red, and refers her to the district hospital for fortnightly monitoring and IV iron therapy.',
  110: 'Mrs. Nisha, 28 years, primigravida with no risk factors, is registered at 8 weeks. She follows the WHO 8-contact schedule: first visit confirms dating USG, blood group, Hb 11 g/dL. By contrast, Mrs. Rekha, 30 years, G3P2 with GDM, visits the same PHC. She is started on <strong>fortnightly visits from 28 weeks</strong> with fasting/postprandial glucose monitoring, serial growth USG, and NST from 32 weeks. The nurse prepares a birth plan for institutional delivery at a facility with blood bank and NICU.',
  111: 'Mrs. Anita, 10 weeks pregnant, presents with mild vaginal spotting and no pain. Her os is closed and USG shows a live fetus &mdash; this is <strong>threatened abortion</strong>. She is admitted for bed rest and started on vaginal progesterone. Two weeks later, the fetus is healthy. Had her os been open with heavy bleeding, the diagnosis would shift to <strong>inevitable abortion</strong>, requiring suction evacuation.',
  113: 'Mrs. Rekha, 36 years, with 2 previous first-trimester losses and 1 ectopic pregnancy, now 6 weeks pregnant with spotting. The nurse takes a detailed history to identify the <strong>ectopic risk</strong>: previous ectopic, PID history, and current unilateral pain. An urgent transvaginal USG and serial beta-hCG are ordered. The beta-hCG rises only 30% in 48 hours (normally doubles), confirming ectopic pregnancy. She is referred for laparoscopic salpingectomy.',
  114: 'Mrs. Deepa, 28 weeks pregnant, is brought to the emergency room with sudden painless bright red vaginal bleeding. The nurse immediately suspects <strong>placenta praevia</strong> because the bleeding is painless. She does NOT perform vaginal examination (dangerous in PP!), establishes two large-bore IV lines, sends blood for crossmatch, and monitors FHR continuously. USG confirms Type III (major) placenta praevia. The patient is admitted for expectant management until 37 weeks when an elective caesarean is planned.',
  115: 'Mrs. Sudha, 34 weeks pregnant, presents with severe continuous abdominal pain, a tense tender uterus, and dark vaginal bleeding. Unlike the painless bleeding of placenta praevia, this presentation with <strong>pain + board-like rigidity</strong> suggests <strong>abruptio placentae</strong>. The nurse notes absent FHR on Doppler, establishes IV access, crossmatches 4 units of blood, and prepares for emergency caesarean section.',
  116: 'Mrs. Fatima, 32 weeks primigravida, presents to ANC with BP 160/110 mmHg, +3 proteinuria, headache, and visual disturbances. The nurse recognises this as <strong>severe pre-eclampsia</strong>. She immediately starts MgSO4 (Pritchard regimen: 4g IV loading + 5g IM each buttock), inserts a Foley catheter to monitor urine output (&gt;30 mL/hr target), and calls the obstetrician. The decision is made to deliver within 24 hours after stabilisation.',
  120: 'Mrs. Priya, 8 weeks pregnant, presents with continuous vomiting for 3 weeks. She cannot keep any food or water down, has lost 4 kg, and urine shows +3 ketones. This is <strong>hyperemesis gravidarum</strong>, not simple morning sickness. The nurse admits her, starts IV Ringer lactate with thiamine 100 mg, keeps her NPO initially, and begins ondansetron 4 mg IV. Oral fluids are reintroduced gradually after 24 hours of no vomiting.',
  137: 'Mrs. Lata, 30 weeks, primigravida with BP 150/100 mmHg and +2 proteinuria at her ANC visit. At her previous visit 2 weeks ago, her BP was 120/80. The nurse recognises this as <strong>pre-eclampsia</strong> (new-onset hypertension after 20 weeks + proteinuria). She advises immediate hospital admission, left lateral position, starts monitoring for danger signs (headache, epigastric pain, visual changes), and prepares to administer MgSO4 if symptoms worsen.',
  144: 'Mrs. Meena, 28 years, G2P1, is diagnosed with GDM at 26 weeks after a 75g OGTT shows fasting glucose 102 mg/dL and 2-hour value 162 mg/dL. The nurse counsels her on medical nutrition therapy (small frequent meals, complex carbs, avoid refined sugar), prescribes daily walking for 30 minutes, and teaches self-monitoring of blood glucose 4 times daily. After 2 weeks, if targets are not met (fasting &lt;95, 2h postprandial &lt;120 mg/dL), insulin therapy will be initiated.',
  153: 'Mrs. Kavitha, Rh-negative mother married to an Rh-positive husband, is in her second pregnancy. Her first baby had mild jaundice. The nurse checks her <strong>indirect Coombs test</strong> at booking &mdash; it is positive (titre 1:16), confirming sensitisation. Serial USG and Doppler of middle cerebral artery are ordered every 2 weeks to detect fetal anaemia. Anti-D injection was NOT given after her first delivery (the missed dose caused sensitisation).',
  159: 'Mrs. Geeta, 30 weeks, USG shows AFI of 32 cm (normal 8&ndash;18 cm) with a single fetus. The nurse suspects <strong>polyhydramnios</strong>. Common causes to investigate: GDM (OGTT ordered), fetal anomalies (anomaly scan), Rh incompatibility (Coombs test). Meanwhile, Mrs. Geeta complains of breathlessness and leg oedema. The nurse positions her in semi-Fowler position, monitors respiratory rate, and prepares for therapeutic amniocentesis if symptoms are severe.',
  162: 'Mrs. Sunita, 34 weeks, USG shows AFI of 4 cm (normal 8&ndash;18 cm). This is <strong>oligohydramnios</strong>. The nurse immediately arranges NST and umbilical artery Doppler to assess fetal well-being. A detailed anomaly scan reveals bilateral renal agenesis (Potter sequence) &mdash; the most severe cause. In another case, Mrs. Asha at 38 weeks has AFI of 5 cm due to post-datism; she is induced with cervical ripening followed by oxytocin augmentation.',
  167: 'Mrs. Lata, 32 years, is found to have twins at her 20-week anomaly scan. The nurse determines they are <strong>dichorionic diamniotic</strong> (DCDA) twins with a thick dividing membrane &mdash; the safest type. She is started on double-dose IFA (two tablets daily), fortnightly visits with serial growth scans, and counselled about preterm delivery risk. A birth plan is made for hospital delivery at 37 weeks with blood arranged and NICU on standby.',
  171: 'Mrs. Savita, 30 weeks, has a fundal height of only 24 cm (should be ~30 cm). USG shows estimated fetal weight at the 3rd centile with reduced amniotic fluid and abnormal umbilical artery Doppler (absent end-diastolic flow). This is <strong>severe IUGR</strong>. The nurse arranges daily NST, twice-weekly BPP, and antenatal corticosteroids (betamethasone 12 mg IM &times;2). Delivery is planned within 48 hours at a facility with NICU.',
  174: 'Mrs. Rani, primigravida, has been in active labour for 14 hours with cervix stuck at 7 cm. She develops <strong>Bandl\'s ring</strong> (visible retraction ring on abdomen), maternal tachycardia, and moulding +3. The nurse recognises these as signs of <strong>obstructed labour</strong>. She immediately stops oxytocin, starts IV fluids, catheterises the bladder, and prepares for emergency caesarean section. Vaginal delivery is contraindicated when obstruction is confirmed.',
  178: 'Mrs. Padma, 37 weeks, has a baby in <strong>frank breech</strong> presentation (legs extended along the body). The obstetrician attempts External Cephalic Version (ECV) at 37 weeks under tocolysis &mdash; it succeeds, and the baby turns to vertex. Had ECV failed, an elective caesarean at 39 weeks would be planned. The nurse monitors FHR for 30 minutes after ECV and watches for complications (abruption, cord entanglement).',
  186: 'Mrs. Jyoti is in active labour when the midwife notices the <strong>umbilical cord prolapsing</strong> through the dilated cervix after spontaneous rupture of membranes. The nurse immediately places her hand inside the vagina to <strong>push the presenting part up</strong> (to relieve cord compression), positions Mrs. Jyoti in <strong>knee-chest position</strong>, fills the bladder with 500 mL saline via Foley catheter, and calls for emergency caesarean section. She does NOT attempt to push the cord back.',
  197: 'Mrs. Kamala, G2P1 with previous caesarean (classical incision), is planned for <strong>elective repeat caesarean</strong> at 38 weeks. The nurse completes pre-operative preparation: informed consent, NPO 6 hours, IV access, shave and prep, Foley catheter, blood crossmatched (2 units), prophylactic antibiotic (cefazolin 2g IV 30 min before incision). Post-operatively, she monitors vitals every 15 min for 2 hours, assesses fundal height, lochia, and wound site, initiates early ambulation at 12 hours, and promotes early breastfeeding.',
  206: 'Mrs. Lakshmi, 5 days postpartum after normal delivery, presents with fever 39&deg;C, foul-smelling lochia, and uterine tenderness. The nurse suspects <strong>puerperal sepsis</strong>. She collects high vaginal swab and blood culture before starting empirical IV antibiotics (ampicillin + gentamicin + metronidazole). She removes any retained products if present, ensures adequate hydration, and monitors for signs of septic shock (tachycardia, hypotension).',
  211: 'Mrs. Sushma delivered normally 1 hour ago. She suddenly complains of feeling dizzy. The nurse finds the uterus is <strong>boggy and above the umbilicus</strong>, with heavy vaginal bleeding. This is <strong>atonic PPH</strong> (the most common cause). She immediately rubs up the uterus (fundal massage), gives oxytocin 10 IU IM + 20 IU in 500 mL NS fast drip, empties the bladder, and calls for help. If bleeding continues, she starts bimanual uterine compression while waiting for the doctor.',
  220: 'Baby Arjun is born at 32 weeks weighing 1.5 kg. He has poor sucking, thin skin, and respiratory distress. The nurse immediately initiates <strong>essential preterm care</strong>: wraps in warm towels + plastic bag, starts KMC (Kangaroo Mother Care) skin-to-skin, administers vitamin K 0.5 mg IM, and arranges NICU admission. Feeding is started with expressed breast milk via OG tube (10 mL/kg/day initially). The mother is counselled on KMC technique and the importance of exclusive breastfeeding.',
  232: 'Mr. and Mrs. Sharma have been married for 5 years without conception despite regular unprotected intercourse. The nurse counsels them that <strong>both partners</strong> need evaluation. The husband\'s semen analysis shows oligospermia (10 million/mL, normal &gt;15 million). The wife\'s HSG shows bilateral tubal block. They are referred for <strong>IVF-ICSI</strong> as the best option when both male factor and tubal factor coexist.',
  237: 'Mrs. Sarita, 55 years, postmenopausal, presents with a mass coming out of the vagina while straining. On examination, the cervix is visible at the introitus with the uterus descending below &mdash; this is <strong>second-degree uterine prolapse</strong>. The nurse prepares her for vaginal hysterectomy with pelvic floor repair. Pre-operatively: bowel preparation, vaginal douche, TED stockings, consent. Post-operatively: monitor for urinary retention, wound infection, and DVT. Pelvic floor exercises are taught before discharge.',
};

// ─── DONT-CONFUSE GENERATOR ───────────────────────────────────
const dontConfuse = {
  108: '<strong>High-Risk Pregnancy vs Complicated Pregnancy:</strong> High-risk means the woman HAS risk factors that INCREASE the chance of problems. Complicated pregnancy means problems have ALREADY occurred. All complicated pregnancies are high-risk, but not all high-risk pregnancies develop complications.',
  111: '<strong>Threatened vs Inevitable Abortion:</strong> In threatened, the os is CLOSED and the pregnancy may continue (give progesterone). In inevitable, the os is OPEN and the pregnancy cannot be saved (prepare for evacuation). The cervical os is the KEY distinguishing sign.',
  113: '<strong>Ectopic vs Threatened Abortion:</strong> Both cause PV bleeding in early pregnancy. But ectopic has UNILATERAL pain, positive pregnancy test with EMPTY uterus on USG, and is a surgical emergency. Threatened abortion has bleeding with a LIVE fetus INSIDE the uterus.',
  114: '<strong>Placenta Praevia vs Abruptio Placentae:</strong> PP = painless bright red bleeding, soft non-tender uterus, malpresentation common, FHR usually normal. AP = painful dark bleeding, tender rigid uterus (\"board-like\"), FHR often absent. PP = vaginal exam contraindicated; AP = emergency delivery.',
  137: '<strong>Pre-eclampsia vs Eclampsia:</strong> Pre-eclampsia = hypertension + proteinuria WITHOUT convulsions. Eclampsia = pre-eclampsia WITH convulsions (or coma). Eclampsia can occur antepartum (most common), intrapartum, or postpartum (up to 6 weeks).',
  143: '<strong>HELLP vs Severe Pre-eclampsia:</strong> HELLP syndrome (Haemolysis, Elevated Liver enzymes, Low Platelets) is a VARIANT of severe pre-eclampsia, NOT a separate disease. A woman can have HELLP without severe hypertension or heavy proteinuria &mdash; do NOT miss it!',
  144: '<strong>GDM vs Pre-existing Diabetes:</strong> GDM = diabetes diagnosed FOR THE FIRST TIME during pregnancy (usually after 24 weeks). Pre-existing = woman already had diabetes before pregnancy. GDM usually resolves after delivery but increases future T2DM risk by 50%.',
  153: '<strong>Rh Incompatibility vs ABO Incompatibility:</strong> Rh = severe, worsens with each pregnancy, causes hydrops fetalis. ABO = mild, can occur in FIRST pregnancy, causes mild jaundice only. Anti-D prevents Rh sensitisation; there is NO prevention for ABO incompatibility.',
  159: '<strong>Polyhydramnios vs Oligohydramnios:</strong> Poly (AFI &gt;25 / SDP &gt;8 cm) = too much fluid, think GDM, fetal anomalies (TEF, anencephaly), multiple pregnancy. Oligo (AFI &lt;5 / SDP &lt;2 cm) = too little, think IUGR, renal agenesis, PPROM, post-dates.',
  174: '<strong>Prolonged Labour vs Obstructed Labour:</strong> Prolonged = labour lasting &gt;expected duration but still progressing slowly. Obstructed = labour where delivery is IMPOSSIBLE despite good contractions (mechanical barrier). Obstructed is always an emergency requiring C-section.',
  178: '<strong>Frank Breech vs Complete Breech vs Footling Breech:</strong> Frank = legs extended along body (most common, safest for vaginal delivery). Complete = baby sitting cross-legged. Footling = one or both feet presenting first (most dangerous, always C-section).',
  186: '<strong>Cord Presentation vs Cord Prolapse:</strong> Presentation = cord is felt through intact membranes, ahead of the presenting part. Prolapse = cord descends into/through the cervix AFTER membranes rupture. Prolapse is the emergency; presentation can progress to prolapse.',
  193: '<strong>Episiotomy vs Perineal Tear:</strong> Episiotomy is a PLANNED surgical cut to enlarge the vaginal opening during delivery. Perineal tear is UNPLANNED tissue damage that occurs spontaneously. Episiotomy is no longer done routinely &mdash; only when indicated.',
  197: '<strong>LSCS vs Classical Caesarean:</strong> LSCS (Lower Segment) = transverse incision on the lower uterine segment (most common, safer, less blood loss, can attempt VBAC). Classical = vertical incision on the upper segment (higher rupture risk, used only for specific situations like transverse lie with back-down).',
  211: '<strong>Primary PPH vs Secondary PPH:</strong> Primary = bleeding within 24 hours of delivery (most common cause: uterine atony). Secondary = bleeding 24 hours to 6 weeks after delivery (most common cause: retained products + infection). Management differs significantly.',
  220: '<strong>Preterm vs Low Birth Weight vs Small for Gestational Age:</strong> Preterm = born before 37 weeks (regardless of weight). LBW = weight &lt;2500g (regardless of gestational age). SGA = weight below 10th percentile for gestational age. A term baby can be LBW, and a preterm baby can be appropriate weight for age.',
  232: '<strong>Primary vs Secondary Infertility:</strong> Primary = couple has NEVER conceived despite 1 year of unprotected intercourse. Secondary = couple has conceived before (even if it ended in abortion/ectopic) but cannot conceive again. Investigation is the same for both.',
};

// ─── GLOSSARY GENERATOR ────────────────────────────────────────
function generateGlossary(q) {
  const a = q.answer;
  const topic = extractTopic(q);
  const entries = [];

  // Common medical terms found in OBG answers
  const termBank = {
    'PIH': 'Pregnancy-Induced Hypertension &mdash; raised BP developing after 20 weeks of pregnancy',
    'GDM': 'Gestational Diabetes Mellitus &mdash; diabetes first diagnosed during pregnancy',
    'IUGR': 'Intrauterine Growth Restriction &mdash; baby is smaller than expected for gestational age',
    'APH': 'Antepartum Haemorrhage &mdash; bleeding from the genital tract after 28 weeks and before delivery',
    'PPH': 'Postpartum Haemorrhage &mdash; blood loss &ge;500 mL after vaginal delivery or &ge;1000 mL after caesarean',
    'LSCS': 'Lower Segment Caesarean Section &mdash; surgical delivery through a transverse incision on the lower uterine segment',
    'MgSO4': 'Magnesium Sulphate &mdash; anticonvulsant drug of choice for eclampsia prevention and treatment',
    'FHR': 'Fetal Heart Rate &mdash; normal range 120&ndash;160 beats per minute',
    'NST': 'Non-Stress Test &mdash; records fetal heart rate response to fetal movements; reactive = healthy baby',
    'CTG': 'Cardiotocography &mdash; electronic monitoring of FHR and uterine contractions',
    'BPP': 'Biophysical Profile &mdash; ultrasound assessment of fetal well-being; max score 10',
    'AFI': 'Amniotic Fluid Index &mdash; USG measurement of amniotic fluid; normal 8&ndash;18 cm',
    'PPROM': 'Preterm Premature Rupture of Membranes &mdash; membrane rupture before 37 weeks and before onset of labour',
    'PROM': 'Premature Rupture of Membranes &mdash; rupture of membranes before onset of labour at any gestational age',
    'ECV': 'External Cephalic Version &mdash; manually turning a breech baby to vertex from outside the abdomen',
    'MVA': 'Manual Vacuum Aspiration &mdash; hand-held syringe to evacuate the uterus; safer than D&amp;C',
    'MTP': 'Medical Termination of Pregnancy &mdash; legal abortion under MTP Act 2021 (India)',
    'AMTSL': 'Active Management of Third Stage of Labour &mdash; oxytocin, cord clamping, controlled cord traction',
    'KMC': 'Kangaroo Mother Care &mdash; continuous skin-to-skin contact between mother and preterm baby',
    'NRP': 'Neonatal Resuscitation Program &mdash; systematic algorithm for resuscitating newborns at birth',
    'NICU': 'Neonatal Intensive Care Unit &mdash; specialised ward for sick and preterm newborns',
    'SNCU': 'Special Newborn Care Unit &mdash; facility for stabilisation of sick newborns at district hospitals',
    'NBSU': 'Newborn Stabilisation Unit &mdash; first-level care at PHC/CHC for newborn emergencies',
    'RDS': 'Respiratory Distress Syndrome &mdash; breathing difficulty in preterm babies due to surfactant deficiency',
    'DIC': 'Disseminated Intravascular Coagulation &mdash; widespread clotting + bleeding disorder; medical emergency',
    'BOH': 'Bad Obstetric History &mdash; previous adverse pregnancy outcomes (stillbirth, NND, recurrent abortions)',
    'FRU': 'First Referral Unit &mdash; 24/7 facility with C-section, blood transfusion, and newborn care capability',
    'ASHA': 'Accredited Social Health Activist &mdash; community health worker who links families to health services',
    'JSY': 'Janani Suraksha Yojana &mdash; GOI scheme providing cash incentives for institutional delivery',
    'JSSK': 'Janani Shishu Suraksha Karyakram &mdash; free delivery and newborn care in government hospitals',
    'IFA': 'Iron Folic Acid &mdash; supplement tablets given during pregnancy to prevent anaemia',
    'POC': 'Products of Conception &mdash; all tissues from pregnancy (fetus, placenta, membranes)',
    'HELLP': 'Haemolysis, Elevated Liver enzymes, Low Platelets &mdash; a severe variant of pre-eclampsia',
    'ANC': 'Antenatal Care &mdash; systematic healthcare of pregnant woman from conception to onset of labour',
    'PNC': 'Postnatal Care &mdash; care of mother and newborn from delivery to 6 weeks postpartum',
    'CPD': 'Cephalopelvic Disproportion &mdash; baby\'s head is too large for the mother\'s pelvis',
    'VBAC': 'Vaginal Birth After Caesarean &mdash; attempting vaginal delivery in a woman with previous C-section',
    'ARM': 'Artificial Rupture of Membranes &mdash; deliberate breaking of the bag of waters to induce/augment labour',
    'OPP': 'Occipitoposterior Position &mdash; baby faces mother\'s front (instead of back); causes prolonged labour',
    'IVF': 'In Vitro Fertilisation &mdash; fertilisation of egg with sperm outside the body in a laboratory',
    'ICSI': 'Intracytoplasmic Sperm Injection &mdash; single sperm injected directly into the egg; used for male factor infertility',
    'IUI': 'Intrauterine Insemination &mdash; washed sperm placed directly into the uterus during ovulation',
    'HSG': 'Hysterosalpingography &mdash; X-ray of uterus and tubes after contrast dye injection to check tubal patency',
    'Anti-D': 'Anti-D Immunoglobulin &mdash; injection given to Rh-negative mothers to prevent Rh sensitisation',
    'GnRH': 'Gonadotropin-Releasing Hormone &mdash; hypothalamic hormone that controls FSH and LH release',
    'hCG': 'Human Chorionic Gonadotropin &mdash; hormone produced by trophoblast; basis of pregnancy tests',
    'BMI': 'Body Mass Index &mdash; weight(kg) / height(m)&sup2;; normal 18.5&ndash;24.9',
    'SGA': 'Small for Gestational Age &mdash; birth weight below 10th percentile for gestational age',
    'LGA': 'Large for Gestational Age &mdash; birth weight above 90th percentile; common in GDM',
    'ART': 'Assisted Reproductive Technology &mdash; medical procedures to achieve pregnancy (IVF, ICSI, IUI)',
    'OGTT': 'Oral Glucose Tolerance Test &mdash; diagnostic test for GDM using 75g glucose load',
    'DVT': 'Deep Vein Thrombosis &mdash; blood clot in a deep vein, usually in the leg; risk increases in pregnancy',
  };

  // Find which terms appear in the answer
  for (const [abbr, meaning] of Object.entries(termBank)) {
    if (a.includes(abbr) && entries.length < 8) {
      entries.push('<li><span class="term">' + abbr + '</span> ' + meaning + '</li>');
    }
  }

  // Always add at least 3 entries
  if (entries.length < 3) {
    // Add general entries based on unit
    if (q.unit === 8) {
      if (!entries.some(e => e.includes('ANC'))) entries.push('<li><span class="term">ANC</span> Antenatal Care &mdash; systematic healthcare of pregnant woman from conception to onset of labour</li>');
      if (!entries.some(e => e.includes('FRU'))) entries.push('<li><span class="term">FRU</span> First Referral Unit &mdash; 24/7 facility with C-section, blood transfusion, and newborn care</li>');
    }
    if (q.unit === 9) {
      if (!entries.some(e => e.includes('AMTSL'))) entries.push('<li><span class="term">AMTSL</span> Active Management of Third Stage of Labour &mdash; prevents PPH with oxytocin + CCT</li>');
    }
    if (q.unit === 10) {
      if (!entries.some(e => e.includes('KMC'))) entries.push('<li><span class="term">KMC</span> Kangaroo Mother Care &mdash; continuous skin-to-skin contact for preterm babies</li>');
      if (!entries.some(e => e.includes('NICU'))) entries.push('<li><span class="term">NICU</span> Neonatal Intensive Care Unit &mdash; specialised ward for sick and preterm newborns</li>');
    }
  }

  if (entries.length === 0) return '';

  return '\n<div class="glossary">\n' +
    '  <div class="glossary-title">Full Forms &amp; Easy Meanings</div>\n' +
    '  <ul>\n' +
    entries.map(e => '    ' + e).join('\n') + '\n' +
    '  </ul>\n' +
    '</div>\n';
}

// ─── SELF-TEST GENERATOR ──────────────────────────────────────
// Topic-specific self-test questions for each question
const selfTests = {
  108: [
    ['Name 5 categories of risk factors in high-risk pregnancy using the ABCDE framework.', 'A = Age &amp; Anthropometry, B = Bad Obstetric History, C = Current pregnancy complications, D = Disease (medical disorders), E = Environmental &amp; social factors.'],
    ['What Hobel score classifies a pregnancy as high-risk?', 'A score of <strong>&ge;10</strong> classifies the pregnancy as high-risk, requiring referral to a higher facility and intensified monitoring.'],
    ['A 40-year-old G5P4, Hb 7 g/dL, with previous stillbirth presents at 12 weeks. List her risk factors.', 'Elderly multigravida (&gt;35 years), grand multiparity (&ge;5), severe anaemia (Hb &lt;8), bad obstetric history (previous stillbirth). She is HIGH RISK &mdash; refer to district hospital.'],
  ],
  110: [
    ['How many ANC contacts does the WHO 2016 model recommend?', '<strong>8 contacts</strong> minimum, starting before 12 weeks.'],
    ['At what gestation are HRP visits increased to weekly?', 'From <strong>34 weeks</strong> onwards for severe conditions (PIH, GDM on insulin, IUGR, multiple pregnancy).'],
  ],
  111: [
    ['What is the key sign distinguishing threatened from inevitable abortion?', 'The state of the <strong>cervical os</strong>: CLOSED in threatened (pregnancy may continue), OPEN in inevitable (pregnancy cannot be saved).'],
    ['Name the drug regimen for medical MTP up to 10 weeks.', '<strong>Mifepristone 200 mg orally</strong> followed 24&ndash;48 hours later by <strong>misoprostol 800 mcg vaginally</strong>. Success rate: 95&ndash;98%.'],
    ['Under MTP Act 2021, who can approve termination between 20-24 weeks?', '<strong>Two registered medical practitioners</strong>, and only for special categories: rape survivors, minors, differently abled women, marital status change.'],
  ],
};

// Generate generic self-test if not in the map
function generateSelfTest(q) {
  if (selfTests[q.id]) {
    const items = selfTests[q.id];
    return '\n<div class="self-test">\n' +
      '  <div class="self-test-title">Test Yourself (cover the answers first!)</div>\n' +
      items.map(([qn, ans]) => '  <details><summary>' + qn + '</summary><p>' + ans + '</p></details>').join('\n') + '\n' +
      '</div>\n';
  }

  // Auto-generate from answer content
  const topic = extractTopic(q);
  const items = [];

  // Generate basic questions based on common patterns
  if (q.answer.includes('definition-box') || q.answer.includes('Definition')) {
    items.push(['Define ' + topic + ' in one sentence.', 'Refer to the definition box above for the standard textbook definition.']);
  }
  if (q.marks >= 15 && q.answer.includes('Nursing')) {
    items.push(['List 3 nursing interventions for a patient with ' + topic + '.', 'Refer to the nursing management section above &mdash; key interventions include assessment, monitoring, and patient education.']);
  }
  if (q.answer.includes('complication') || q.answer.includes('Complication')) {
    items.push(['Name 3 complications of ' + topic + '.', 'Review the complications section &mdash; maternal and fetal complications should both be mentioned.']);
  }

  if (items.length === 0) {
    items.push(
      ['What are the key clinical features of ' + topic + '?', 'Refer to the clinical features section above.'],
      ['What is the most important nursing intervention for ' + topic + '?', 'Early detection, monitoring, and timely referral are the cornerstones of nursing management.']
    );
  }

  return '\n<div class="self-test">\n' +
    '  <div class="self-test-title">Test Yourself (cover the answers first!)</div>\n' +
    items.map(([qn, ans]) => '  <details><summary>' + qn + '</summary><p>' + ans + '</p></details>').join('\n') + '\n' +
    '</div>\n';
}

// ─── FLOWCHART GENERATOR ──────────────────────────────────────
// Topic-specific flowcharts
function generateFlowchart(q) {
  const qLow = q.question.toLowerCase();
  const id = q.id;

  // Map question IDs to flowchart content
  const flowcharts = {
    // Unit 8 flowcharts
    108: { title: 'Screening for High-Risk Pregnancy', steps: [
      ['highlight', 'First ANC Contact (&lt;12 weeks)'],
      ['', 'Structured Risk Checklist (ABCDE)'],
      ['branch', ['Score &lt;10: Low Risk &rarr; Routine ANC at PHC', 'Score &ge;10: HIGH RISK &rarr; Red stamp on card']],
      ['', 'Refer to FRU / District Hospital'],
      ['', 'Fortnightly visits + Serial USG + NST'],
      ['highlight', 'Plan Institutional Delivery'],
    ]},
    111: { title: 'Management Based on Type of Abortion', steps: [
      ['highlight', 'PV Bleeding in Early Pregnancy (&lt;28 weeks)'],
      ['', 'History + Examination + USG'],
      ['branch', ['Os CLOSED + FH present &rarr; Threatened: Bed rest + Progesterone', 'Os OPEN &rarr; Inevitable / Incomplete: Suction Evacuation']],
      ['', 'If Complete: Confirm by USG + Supportive care'],
      ['', 'If Septic: IV Antibiotics FIRST, then Evacuate'],
      ['highlight', 'Follow-up: Anti-D + Haematinics + Contraception'],
    ]},
    112: { title: 'Nursing Management of Incomplete Abortion', steps: [
      ['highlight', 'Patient presents with PV Bleeding + Passed tissue'],
      ['', 'Assessment: Vitals + Pad count + Os status'],
      ['', 'Establish IV access (2 large-bore cannulae)'],
      ['branch', ['Stable: Prepare for MVA / D&amp;C', 'Shock: IV fluids + Blood + Resuscitate']],
      ['', 'Uterine Evacuation (MVA preferred)'],
      ['', 'Post-procedure: Monitor bleeding + Antibiotics'],
      ['highlight', 'Discharge: Haematinics + Contraception + Follow-up'],
    ]},
    113: { title: 'Diagnosis and Management of Ectopic Pregnancy', steps: [
      ['highlight', 'Amenorrhoea + PV Bleeding + Unilateral Pain'],
      ['', 'Positive Pregnancy Test + Empty Uterus on USG'],
      ['', 'Serial beta-hCG: Fails to double in 48h'],
      ['branch', ['Unruptured + &lt;3.5 cm: Medical (Methotrexate)', 'Ruptured + Shock: Emergency Laparotomy']],
      ['', 'Post-treatment: Serial beta-hCG till zero'],
      ['highlight', 'Contraception for 3-6 months before next pregnancy'],
    ]},
    114: { title: 'Management of Placenta Praevia', steps: [
      ['highlight', 'Painless Bright Red PV Bleeding (&gt;28 weeks)'],
      ['', 'NO Vaginal Examination! Confirm by USG'],
      ['branch', ['Minor PP + Preterm: Expectant management + Bed rest', 'Major PP / Heavy bleeding: Emergency Caesarean']],
      ['', 'Type I-II (Minor): May attempt vaginal delivery'],
      ['', 'Type III-IV (Major): Always Caesarean'],
      ['highlight', 'Prepare: 4 units blood + Consent for hysterectomy if needed'],
    ]},
    115: { title: 'Management of Abruptio Placentae', steps: [
      ['highlight', 'Painful PV Bleeding + Tense Tender Uterus'],
      ['', 'Assess: Grade I (mild) vs Grade II-III (severe)'],
      ['', 'IV access + Crossmatch + Coagulation profile'],
      ['branch', ['Mild + Term: Amniotomy + Oxytocin induction', 'Severe / Fetal distress: Emergency Caesarean']],
      ['', 'Watch for: DIC + Renal failure + Couvelaire uterus'],
      ['highlight', 'Post-delivery: Monitor for PPH + DIC management'],
    ]},
    137: { title: 'Step-wise Management of Pre-eclampsia', steps: [
      ['highlight', 'BP &ge;140/90 + Proteinuria after 20 weeks'],
      ['', 'Classify: Mild vs Severe Pre-eclampsia'],
      ['branch', ['Mild + Preterm: Expectant (monitor closely)', 'Severe + &ge;34 weeks: Plan Delivery within 24-48h']],
      ['', 'Antihypertensives: Labetalol / Nifedipine / Methyldopa'],
      ['', 'MgSO4 for seizure prophylaxis (Pritchard regimen)'],
      ['highlight', 'Definitive treatment = DELIVERY of baby + placenta'],
    ]},
    141: { title: 'Emergency Management of Eclampsia', steps: [
      ['highlight', 'Convulsion in Pregnant Woman / Postpartum'],
      ['', 'CALL FOR HELP + Left lateral position'],
      ['', 'MgSO4 Loading: 4g IV slow + 5g IM each buttock'],
      ['', 'Protect airway + Oxygen + Suction'],
      ['', 'Antihypertensive if BP &ge;160/110'],
      ['', 'Plan delivery within 12 hours (vaginal or C-section)'],
      ['highlight', 'Continue MgSO4 for 24h after last convulsion'],
    ]},
    144: { title: 'Stepwise Management of GDM', steps: [
      ['highlight', 'Screen all women at 24-28 weeks (75g OGTT)'],
      ['', 'Diagnose: Fasting &ge;92 or 1h &ge;180 or 2h &ge;153 mg/dL'],
      ['', 'Step 1: Medical Nutrition Therapy + Exercise (2 weeks)'],
      ['branch', ['Targets met: Continue MNT + Monitor', 'Targets NOT met: Start Insulin therapy']],
      ['', 'Serial growth USG + NST from 32 weeks'],
      ['', 'Plan delivery by 38-39 weeks (avoid post-dates)'],
      ['highlight', 'Postpartum: Recheck OGTT at 6 weeks + Lifelong screening'],
    ]},
    153: { title: 'Rh Isoimmunisation Pathway', steps: [
      ['highlight', 'Rh-negative Mother + Rh-positive Father'],
      ['', 'First pregnancy: Usually no problem (baby fine)'],
      ['', 'At delivery: Fetal Rh+ blood enters mother\'s circulation'],
      ['', 'Mother produces anti-D antibodies (SENSITISED)'],
      ['', 'Next pregnancy: Antibodies cross placenta &rarr; Attack fetal RBCs'],
      ['highlight', 'Prevention: Anti-D 300 mcg IM at 28 weeks + within 72h of delivery'],
    ]},
    159: { title: 'Management of Polyhydramnios', steps: [
      ['highlight', 'AFI &gt;25 cm or Single Deepest Pocket &gt;8 cm'],
      ['', 'Investigate cause: OGTT + Anomaly scan + Coombs test'],
      ['branch', ['Mild + Cause treated: Conservative (rest, monitor)', 'Severe + Respiratory distress: Therapeutic Amniocentesis']],
      ['', 'Serial USG for fetal growth + AFI monitoring'],
      ['', 'Watch for: Preterm labour, cord prolapse, malpresentation'],
      ['highlight', 'Delivery: Watch for PPH (overdistended uterus)'],
    ]},
    162: { title: 'Management of Oligohydramnios', steps: [
      ['highlight', 'AFI &lt;5 cm or Single Deepest Pocket &lt;2 cm'],
      ['', 'Investigate: Fetal anomaly scan + Doppler + NST'],
      ['branch', ['Renal agenesis / Lethal anomaly: Counsel parents', 'IUGR / Post-dates: Plan delivery based on maturity']],
      ['', 'Maternal hydration (oral 2L/day) may improve AFI'],
      ['', 'Amnioinfusion during labour if cord compression'],
      ['highlight', 'Preterm: Corticosteroids + Monitored expectant management'],
    ]},
    167: { title: 'Management of Twin Pregnancy', steps: [
      ['highlight', 'Confirm by USG: Chorionicity + Amnionicity'],
      ['', 'DCDA (safest) vs MCDA vs MCMA (highest risk)'],
      ['', 'Intensive ANC: Fortnightly visits + Serial growth scans'],
      ['', 'Watch for: Preterm labour, TTTS (in MCDA), discordant growth'],
      ['branch', ['DCDA + Both vertex: Vaginal delivery possible', 'Non-vertex Twin-1 or MCMA: Elective Caesarean']],
      ['highlight', 'Deliver: DCDA at 37 wks, MCDA at 36 wks, MCMA at 32-34 wks'],
    ]},
    171: { title: 'Diagnosis and Management of IUGR', steps: [
      ['highlight', 'SFH &lt; gestational age / EFW &lt;10th percentile'],
      ['', 'Confirm by USG: Measure AC, HC, FL, EFW'],
      ['', 'Classify: Symmetric (early, worse) vs Asymmetric (late)'],
      ['', 'Doppler: UA &rarr; MCA &rarr; Cerebroplacental ratio'],
      ['branch', ['Normal Doppler: Monitor 2-weekly', 'Absent/Reversed EDF: Urgent delivery']],
      ['highlight', 'Corticosteroids if &lt;34 weeks + Plan delivery at tertiary centre'],
    ]},
    174: { title: 'Management of Obstructed Labour', steps: [
      ['highlight', 'Recognise Signs: Bandl\'s ring + Moulding +3 + Maternal distress'],
      ['', 'STOP Oxytocin immediately'],
      ['', 'IV fluids + Catheterise bladder + Antibiotics'],
      ['', 'Assess: Is vaginal delivery possible?'],
      ['branch', ['Head high: Emergency Caesarean', 'Head deeply impacted: Destructive operation (if dead fetus)']],
      ['highlight', 'Post-delivery: Watch for PPH, VVF, uterine rupture'],
    ]},
    178: { title: 'Management of Breech Presentation', steps: [
      ['highlight', 'Confirm Breech by USG at 36-37 weeks'],
      ['', 'Classify: Frank / Complete / Footling'],
      ['', 'Offer ECV at 37 weeks (if no contraindication)'],
      ['branch', ['ECV successful: Monitor + Vaginal delivery', 'ECV failed / Footling: Elective Caesarean at 39 weeks']],
      ['', 'If vaginal breech: Experienced operator + Standby OT'],
      ['highlight', 'Burns-Marshall or Lovset manoeuvre for aftercoming head'],
    ]},
    186: { title: 'Emergency Management of Cord Prolapse', steps: [
      ['highlight', 'Cord felt / seen in vagina after ROM'],
      ['', 'DO NOT push cord back! Keep it warm + moist'],
      ['', 'Push presenting part UP with gloved hand (maintain)'],
      ['', 'Knee-chest position OR Trendelenburg position'],
      ['', 'Fill bladder with 500 mL saline via Foley'],
      ['highlight', 'EMERGENCY CAESAREAN within minutes'],
    ]},
    197: { title: 'Caesarean Section: Pre-op to Post-op', steps: [
      ['highlight', 'Decision for Caesarean Section'],
      ['', 'Pre-op: Consent + NPO + IV access + Blood ready + Catheter'],
      ['', 'Prophylactic antibiotic: Cefazolin 2g IV 30 min before'],
      ['', 'Anaesthesia: Spinal (preferred) or General'],
      ['', 'Surgery: Skin &rarr; Fascia &rarr; Peritoneum &rarr; Uterus &rarr; Baby'],
      ['', 'Post-op: Vitals q15min &times;2h + Early ambulation 12h'],
      ['highlight', 'Breastfeeding within 1 hour + Wound care + Discharge Day 5-7'],
    ]},
    206: { title: 'Management of Puerperal Sepsis', steps: [
      ['highlight', 'Fever &ge;38&deg;C + Foul lochia + Uterine tenderness (24h-6wks postpartum)'],
      ['', 'Collect: HVS + Blood culture + CBC + CRP'],
      ['', 'Start empirical IV antibiotics: Ampicillin + Gentamicin + Metronidazole'],
      ['', 'Remove retained products (if present)'],
      ['branch', ['Improving in 48-72h: Continue antibiotics, step down to oral', 'Not improving: Re-evaluate + Change antibiotics + Rule out abscess']],
      ['highlight', 'Watch for: Septic shock, peritonitis, DVT'],
    ]},
    211: { title: 'Stepwise Management of PPH', steps: [
      ['highlight', 'Bleeding &gt;500 mL after vaginal delivery'],
      ['', 'CALL FOR HELP + Rub up the uterus (fundal massage)'],
      ['', 'Oxytocin 10 IU IM + 20 IU in 500 mL NS IV fast'],
      ['', 'Empty bladder + IV fluids + Crossmatch blood'],
      ['branch', ['Uterus contracts: Monitor closely', 'Still atonic: Ergometrine + Misoprostol + Bimanual compression']],
      ['', 'If still bleeding: Balloon tamponade &rarr; Surgical options'],
      ['highlight', 'Last resort: B-Lynch suture / Uterine artery ligation / Hysterectomy'],
    ]},
    220: { title: 'Care of Preterm Baby', steps: [
      ['highlight', 'Baby born &lt;37 weeks / Weight &lt;2500g'],
      ['', 'Immediate: Warmth (plastic wrap + radiant warmer)'],
      ['', 'Assess: Breathing + APGAR + Gestational age scoring'],
      ['branch', ['Stable + &gt;1.8 kg: KMC + Cup/spoon feeding', '&lt;1.5 kg or sick: NICU admission']],
      ['', 'Feeding: EBM via OG tube &rarr; Cup &rarr; Breastfeed'],
      ['', 'Watch for: RDS, Apnoea, Jaundice, Sepsis, NEC, IVH'],
      ['highlight', 'Discharge when: Weight &gt;1.8 kg + Feeding well + Growing + No apnoea'],
    ]},
    232: { title: 'Investigation of Infertile Couple', steps: [
      ['highlight', 'Couple unable to conceive after 1 year of unprotected sex'],
      ['', 'BOTH partners need evaluation simultaneously'],
      ['', 'Male: Semen analysis (count, motility, morphology)'],
      ['', 'Female: Hormonal profile + USG + HSG + Ovulation tracking'],
      ['branch', ['Ovulatory disorder: Clomiphene / Gonadotropins', 'Tubal factor: Tubal surgery or IVF']],
      ['', 'Male factor: IUI or IVF-ICSI'],
      ['highlight', 'Unexplained: Empirical IUI &times;3-6 cycles &rarr; IVF'],
    ]},
    237: { title: 'Management of Uterine Prolapse', steps: [
      ['highlight', 'Mass descending through vagina + Dragging sensation'],
      ['', 'Classify: 1st / 2nd / 3rd degree / Procidentia'],
      ['branch', ['Mild (1st-2nd) + Young: Pelvic floor exercises + Ring pessary', 'Severe (3rd) or Procidentia: Surgical repair']],
      ['', 'Surgery: Vaginal hysterectomy + Pelvic floor repair (most common)'],
      ['', 'Manchester operation: For younger women wanting to preserve uterus'],
      ['highlight', 'Post-op: Avoid straining, heavy lifting; Pelvic exercises lifelong'],
    ]},
  };

  // Generic flowcharts for questions not in the map
  if (!flowcharts[id]) {
    const topic = extractTopic(q);
    return '\n<div class="flowchart">\n' +
      '  <div class="flowchart-title">Clinical Pathway: ' + topic + '</div>\n' +
      '  <div class="flowchart-container">\n' +
      '    <div class="flow-box highlight">Identification / Assessment</div>\n' +
      '    <div class="flow-arrow">&darr;</div>\n' +
      '    <div class="flow-box">History + Examination + Investigations</div>\n' +
      '    <div class="flow-arrow">&darr;</div>\n' +
      '    <div class="flow-box">Diagnosis Confirmed</div>\n' +
      '    <div class="flow-arrow">&darr;</div>\n' +
      '    <div class="flow-box">Medical Management + Nursing Care</div>\n' +
      '    <div class="flow-arrow">&darr;</div>\n' +
      '    <div class="flow-box">Monitoring + Follow-up</div>\n' +
      '    <div class="flow-arrow">&darr;</div>\n' +
      '    <div class="flow-box highlight">Evaluation of Outcomes</div>\n' +
      '  </div>\n' +
      '</div>\n';
  }

  const fc = flowcharts[id];
  let html = '\n<div class="flowchart">\n' +
    '  <div class="flowchart-title">Flowchart: ' + fc.title + '</div>\n' +
    '  <div class="flowchart-container">\n';

  for (let i = 0; i < fc.steps.length; i++) {
    const [type, content] = fc.steps[i];
    if (type === 'branch') {
      html += '    <div class="flow-branch">\n';
      for (const item of content) {
        html += '      <div class="flow-branch-item"><div class="flow-branch-line"></div><div class="flow-box">' + item + '</div></div>\n';
      }
      html += '    </div>\n';
    } else {
      const cls = type === 'highlight' ? ' highlight' : '';
      html += '    <div class="flow-box' + cls + '">' + content + '</div>\n';
    }
    if (i < fc.steps.length - 1 && fc.steps[i + 1][0] !== 'branch' && type !== 'branch') {
      html += '    <div class="flow-arrow">&darr;</div>\n';
    } else if (type === 'branch' && i < fc.steps.length - 1) {
      html += '    <div class="flow-arrow">&darr;</div>\n';
    }
  }

  html += '  </div>\n</div>\n';
  return html;
}

// ─── MAIN ENHANCEMENT LOGIC ──────────────────────────────────
function enhance(q) {
  let a = q.answer;
  if (!a || a.trim().length === 0) return a;

  const missing = {
    flowchart: !has(a, 'flowchart'),
    examStrategy: !has(a, 'exam-strategy') && q.marks >= 13,
    conclusion: !has(a, 'conclusion-box'),
    glossary: !has(a, 'glossary'),
    selfTest: !has(a, 'self-test'),
    example: !has(a, 'editorial-example'),
    dontConfuse: !has(a, 'dont-confuse'),
  };

  // Build additions (inserted before the keyword-box or at the end)
  let additions = '';

  // 1. Flowchart (insert after the main content sections, before mnemonic/remember)
  if (missing.flowchart) {
    additions += generateFlowchart(q);
  }

  // 2. Editorial Example
  if (missing.example && examples[q.id]) {
    additions += '\n<div class="editorial-example">\n' +
      '  <div class="editorial-title">Relatable Example</div>\n' +
      '  <p>' + examples[q.id] + '</p>\n' +
      '</div>\n';
  }

  // 3. Don't Confuse
  if (missing.dontConfuse && dontConfuse[q.id]) {
    additions += '\n<div class="dont-confuse">\n' +
      '  <strong>Don\'t Confuse:</strong><br>\n' +
      '  ' + dontConfuse[q.id] + '\n' +
      '</div>\n';
  }

  // 4. Exam Strategy (for 15-mark questions)
  if (missing.examStrategy) {
    additions += examStrategy(q);
  }

  // 5. Conclusion (for 15-mark questions or if answer is substantial)
  if (missing.conclusion && q.marks >= 5) {
    additions += conclusion(q);
  }

  // 6. Glossary
  if (missing.glossary) {
    const gloss = generateGlossary(q);
    if (gloss) additions += gloss;
  }

  // 7. Self-Test
  if (missing.selfTest) {
    additions += generateSelfTest(q);
  }

  // Now insert additions into the answer
  if (additions.length === 0) return a;

  // Try to insert before keyword-box (if present)
  if (has(a, 'keyword-box')) {
    const kwIdx = a.lastIndexOf('<div class="keyword-box">');
    a = a.substring(0, kwIdx) + additions + '\n' + a.substring(kwIdx);
  } else if (has(a, 'remember-box')) {
    // Insert after remember-box
    const remEnd = a.lastIndexOf('</div>\n') + 7;
    a = a + additions;
  } else {
    // Append at end
    a = a + additions;
  }

  return a;
}

// ─── PROCESS ALL QUESTIONS ────────────────────────────────────
console.log('Enhancing ' + questions.length + ' OBG-II answers...');

let enhanced = 0;
for (const q of questions) {
  const origLen = q.answer ? q.answer.length : 0;
  q.answer = enhance(q);
  const newLen = q.answer ? q.answer.length : 0;
  if (newLen > origLen) {
    enhanced++;
    console.log('  ID ' + q.id + ' (' + q.marks + 'm): ' + origLen + ' -> ' + newLen + ' chars (+' + (newLen - origLen) + ')');
  }
}

console.log('\nEnhanced ' + enhanced + ' / ' + questions.length + ' answers.');

// ─── WRITE OUTPUT FILE ────────────────────────────────────────
let output = '// OBG-II (High-Risk / Abnormal Midwifery & Gynaecology) \u2014 previous-year questions.\n';
output += '// Enhanced with flowcharts, exam strategies, glossaries, self-tests, and editorial examples.\n';
output += '// Units: 8 = High-Risk Pregnancy | 9 = Abnormal Labour & Postnatal Problems | 10 = High-Risk Newborn | 11 = Gynaecological Disorders\n';
output += 'window.QUESTIONS_DATA_OBG2 = [\n';

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  // Escape any backticks in the answer (critical for JS template literals)
  const safeAnswer = (q.answer || '').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  output += '  {\n';
  output += '    id: ' + q.id + ',\n';
  output += '    question: ' + JSON.stringify(q.question) + ',\n';
  output += '    marks: ' + q.marks + ',\n';
  output += '    repeated: ' + q.repeated + ',\n';
  output += '    unit: ' + q.unit + ',\n';
  output += '    years: ' + JSON.stringify(q.years) + ',\n';
  output += '    answer: `\n' + safeAnswer + '\n`\n';
  output += '  }' + (i < questions.length - 1 ? ',' : '') + '\n';
}

output += '];\n';

fs.writeFileSync('./data-obg2-enhanced.js', output, 'utf8');
console.log('\nWritten to data-obg2-enhanced.js');
console.log('File size: ' + (output.length / 1024).toFixed(1) + ' KB');
console.log('\nNext steps:');
console.log('  1. Verify: node -e "global.window={}; require(\'./data-obg2-enhanced.js\'); console.log(window.QUESTIONS_DATA_OBG2.length)"');
console.log('  2. If OK: copy data-obg2-enhanced.js data-obg2.js');
