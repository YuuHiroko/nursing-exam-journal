#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// write-full-answers.js — Writes COMPLETE model answers for stub questions
// These are the ~80 questions that only have structural elements
// but no actual medical content (answer-points, answer-table, etc.)
// ═══════════════════════════════════════════════════════════════

const fs = require('fs');
global.window = {};
require('./data-obg2.js');
const questions = window.QUESTIONS_DATA_OBG2;

// ─── FULL ANSWER CONTENT ──────────────────────────────────────
// Each entry replaces the answer content for a specific question ID
// Only questions that lack real content (no answer-points/answer-table)
const fullAnswers = {

// ═══ ID 141: Pre-eclampsia & Eclampsia — Stages of convulsion ═══
141: `
<div class="in-short"><strong>In Short:</strong> Pre-eclampsia is hypertension (&ge;140/90 mmHg) with proteinuria developing after 20 weeks of pregnancy. <strong>Eclampsia</strong> is pre-eclampsia complicated by generalised tonic-clonic convulsions. Convulsions progress through 4 stages: premonitory, tonic, clonic, and coma. MgSO4 (Pritchard regimen) is the drug of choice, and <strong>delivery is the definitive cure</strong>.</div>

<div class="answer-section">
  <h3 class="answer-section-title">Introduction</h3>
  <p class="answer-text">Eclampsia remains one of the <strong>top 3 causes of maternal death</strong> in India. It can occur antepartum (most common, ~45%), intrapartum (~20%), or postpartum (~35%). Early recognition of warning signs and prompt MgSO4 administration can prevent most eclamptic seizures.</p>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Definitions</h3>
  <div class="definition-box">
    <strong>Pre-eclampsia:</strong> A pregnancy-specific multisystem disorder characterised by new-onset hypertension (BP &ge;140/90 mmHg) and proteinuria (&ge;300 mg/24h or &ge;1+ dipstick) after <strong>20 weeks of gestation</strong>.<br><br>
    <strong>Eclampsia:</strong> The occurrence of <strong>generalised tonic-clonic convulsions</strong> in a woman with pre-eclampsia, not attributable to other causes (epilepsy, meningitis, cerebral malaria).
  </div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Four Stages of Eclamptic Convulsion</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Stage</th><th>Duration</th><th>Features</th><th>Nursing Action</th></tr></thead>
    <tbody>
      <tr><td><strong>1. Premonitory (Warning)</strong></td><td>15&ndash;30 seconds</td><td>Facial twitching, rolling of eyes, fixed stare; patient becomes unresponsive</td><td>Call for help; place in left lateral position; remove dentures; note time</td></tr>
      <tr><td><strong>2. Tonic</strong></td><td>15&ndash;20 seconds</td><td>Entire body becomes <strong>rigid</strong>; teeth clenched (jaw locked); back arched (opisthotonos); breathing stops (apnoea); cyanosis</td><td>Do NOT try to open mouth or insert anything; maintain airway; suction ready</td></tr>
      <tr><td><strong>3. Clonic</strong></td><td>1&ndash;2 minutes</td><td>Violent <strong>rhythmic jerking</strong> of all muscles; frothy saliva (may be blood-stained from tongue bite); urinary/faecal incontinence</td><td>Protect from injury (padded side rails); turn to side to prevent aspiration; suction secretions</td></tr>
      <tr><td><strong>4. Coma / Post-ictal</strong></td><td>Minutes to hours</td><td>Deep unconsciousness; noisy breathing; gradual recovery or may progress to next convulsion (status eclampticus)</td><td>Monitor vitals every 5 min; maintain airway; prepare MgSO4; assess fetal heart rate</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Medical Management</h3>
  <ul class="answer-points">
    <li><strong>Anticonvulsant &mdash; MgSO4 (Pritchard Regimen):</strong>
      <ul class="sub-points">
        <li><strong>Loading dose:</strong> 4g MgSO4 (20% solution) IV slowly over 15&ndash;20 min + 5g IM deep into each buttock (total 14g)</li>
        <li><strong>Maintenance:</strong> 5g IM every 4 hours into alternate buttocks for 24 hours after last convulsion</li>
        <li><strong>Before each dose, check:</strong> Knee jerk present, respiratory rate &ge;16/min, urine output &ge;30 mL/hr</li>
        <li><strong>Antidote:</strong> Calcium gluconate 10 mL of 10% IV slowly (keep at bedside)</li>
      </ul>
    </li>
    <li><strong>Antihypertensive:</strong> Labetalol 20 mg IV (first line) or Nifedipine 10 mg oral; target BP &lt;150/100 mmHg (do NOT drop below 140/90 acutely)</li>
    <li><strong>Delivery:</strong> The <strong>definitive treatment</strong> is delivery of the baby and placenta. Plan delivery within 12&ndash;24 hours of stabilisation. Vaginal delivery is preferred if cervix is favourable; caesarean if not</li>
    <li><strong>Supportive:</strong> IV fluids (Ringer lactate at 60&ndash;80 mL/hr); Foley catheter; strict I/O charting; oxygen 4&ndash;6 L/min; quiet dim room</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Nursing Management</h3>
  <ul class="answer-points">
    <li><strong>Assessment:</strong> BP every 15 min; urine output hourly (must be &ge;30 mL/hr); level of consciousness (GCS); deep tendon reflexes before each MgSO4 dose; respiratory rate; FHR monitoring; signs of impending eclampsia (headache, visual disturbance, epigastric pain)</li>
    <li><strong>During Convulsion:</strong> Maintain airway (left lateral + suction); protect from injury (padded rails, remove sharp objects); note duration; do NOT restrain; administer MgSO4 as ordered</li>
    <li><strong>Post-convulsion:</strong> Monitor for recurrence; maintain quiet environment; continue MgSO4 for 24h; prepare for delivery; emotional support to family</li>
    <li><strong>Danger signs to report immediately:</strong> Absent knee jerk, respiratory rate &lt;16/min, urine output &lt;30 mL/hr, recurrent convulsions, rising BP despite treatment</li>
  </ul>
</div>

<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic: MgSO4 toxicity monitoring &mdash; <strong>"RUK"</strong></div>
  <div class="mnemonic-word"><span class="letter">R</span><span class="letter">U</span><span class="letter">K</span></div>
  <div class="mnemonic-explain">
    <strong>R</strong> = Respiration (&ge;16/min) &nbsp;|&nbsp; <strong>U</strong> = Urine output (&ge;30 mL/hr)<br>
    <strong>K</strong> = Knee jerk (must be present)<br>
    <em>If ANY is absent &rarr; WITHHOLD next MgSO4 dose + give calcium gluconate</em>
  </div>
</div>

<div class="remember-box">
  <div class="remember-title">Quick Revision &mdash; Key Points</div>
  <ul>
    <li>Eclampsia = pre-eclampsia + <strong>convulsions</strong></li>
    <li>4 stages of convulsion: <strong>Premonitory &rarr; Tonic &rarr; Clonic &rarr; Coma</strong></li>
    <li>Drug of choice: <strong>MgSO4</strong> (Pritchard regimen: 4g IV + 10g IM loading)</li>
    <li>Antidote for MgSO4 toxicity: <strong>Calcium gluconate 10%</strong></li>
    <li><strong>Delivery = definitive cure</strong> (within 12&ndash;24 hours of stabilisation)</li>
    <li>Monitor <strong>RUK</strong> before every MgSO4 dose</li>
    <li>Most eclampsia deaths are <strong>preventable</strong> with timely MgSO4 + delivery</li>
  </ul>
</div>

<div class="keyword-box">
  <strong>Keywords:</strong>
  <span class="kw">Eclampsia</span>
  <span class="kw">Pre-eclampsia</span>
  <span class="kw">MgSO4</span>
  <span class="kw">Pritchard regimen</span>
  <span class="kw">Tonic-clonic convulsion</span>
  <span class="kw">Calcium gluconate</span>
  <span class="kw">Delivery = definitive cure</span>
</div>
`,

// ═══ ID 167: Twin Pregnancy ═══
167: `
<div class="in-short"><strong>In Short:</strong> Multiple pregnancy means two or more fetuses in the uterus simultaneously. Twins account for ~1 in 80 pregnancies. Causes include heredity, maternal age, ART, and high parity. Complications include preterm labour, anaemia, PIH, PPH, malpresentation, and TTTS (in monochorionic twins). Management requires intensive ANC with serial growth scans and planned delivery.</div>

<div class="answer-section">
  <h3 class="answer-section-title">Introduction</h3>
  <p class="answer-text">Multiple pregnancy is classified as a <strong>high-risk pregnancy</strong> because both maternal and fetal complications increase significantly. The incidence has risen due to widespread use of ART (assisted reproductive technology) and fertility drugs. The nurse must provide intensive monitoring and prepare for complications during both antenatal and intrapartum periods.</p>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Definition</h3>
  <div class="definition-box">
    <strong>Multiple Pregnancy:</strong> Presence of <strong>two or more fetuses</strong> in the uterus simultaneously. Twins = 2, Triplets = 3, Quadruplets = 4.
  </div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Causes of Multiple Pregnancy</h3>
  <ul class="answer-points">
    <li><strong>Heredity:</strong> Family history of twins (maternal side more important); more common in certain races (highest in Nigeria, lowest in Japan)</li>
    <li><strong>Maternal age:</strong> Incidence increases with age (peak at 35&ndash;39 years) due to higher FSH levels causing multiple ovulation</li>
    <li><strong>High parity:</strong> Grand multiparas have higher chance of twinning</li>
    <li><strong>ART:</strong> IVF (multiple embryo transfer), ovulation induction with clomiphene/gonadotropins</li>
    <li><strong>Previous twins:</strong> History of twins increases recurrence risk by 3&ndash;4 times</li>
    <li><strong>Tall stature &amp; higher BMI:</strong> Slightly increased risk</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Types of Twins</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Feature</th><th>Dizygotic (Fraternal) &mdash; 70%</th><th>Monozygotic (Identical) &mdash; 30%</th></tr></thead>
    <tbody>
      <tr><td>Origin</td><td>Two eggs + Two sperm</td><td>One egg + One sperm (splits)</td></tr>
      <tr><td>Chorionicity</td><td>Always <strong>DCDA</strong> (2 placentas, 2 sacs)</td><td>Can be DCDA, MCDA, or MCMA (depends on when splitting occurs)</td></tr>
      <tr><td>Sex</td><td>Same or different</td><td>Always same sex</td></tr>
      <tr><td>Appearance</td><td>May look different</td><td>Look identical</td></tr>
      <tr><td>Blood group</td><td>May differ</td><td>Always same</td></tr>
      <tr><td>Heredity</td><td>Runs in families</td><td>Random occurrence</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Complications of Multiple Pregnancy</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Maternal Complications</th><th>Fetal Complications</th></tr></thead>
    <tbody>
      <tr><td>Anaemia (increased iron demand &times;2)</td><td>Preterm birth (50% deliver before 37 weeks)</td></tr>
      <tr><td>PIH / Pre-eclampsia (3&times; risk)</td><td>IUGR (especially discordant growth)</td></tr>
      <tr><td>Polyhydramnios</td><td>Twin-to-Twin Transfusion Syndrome (TTTS) in MCDA</td></tr>
      <tr><td>Antepartum haemorrhage</td><td>Congenital anomalies (more common)</td></tr>
      <tr><td>Preterm labour</td><td>Malpresentation (breech, transverse)</td></tr>
      <tr><td>PPH (overdistended uterus = atony)</td><td>Cord entanglement (in MCMA)</td></tr>
      <tr><td>Operative delivery (higher C-section rate)</td><td>Locked twins (rare but dangerous)</td></tr>
      <tr><td>Hyperemesis gravidarum (due to high hCG)</td><td>Intrauterine death of one twin</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Management</h3>
  <ul class="answer-points">
    <li><strong>Antenatal:</strong>
      <ul class="sub-points">
        <li>Confirm chorionicity by USG before 14 weeks (lambda sign = DCDA; T-sign = MCDA)</li>
        <li>Double dose IFA (2 tablets/day); extra calcium and protein in diet</li>
        <li>Fortnightly visits from 24 weeks; weekly from 32 weeks</li>
        <li>Serial growth scans every 2&ndash;4 weeks to detect discordant growth (&gt;20% weight difference)</li>
        <li>MCDA twins: Fortnightly Doppler to screen for TTTS from 16 weeks</li>
        <li>Antenatal corticosteroids if preterm delivery expected</li>
        <li>Plan delivery: DCDA at 37 weeks, MCDA at 36 weeks, MCMA at 32&ndash;34 weeks</li>
      </ul>
    </li>
    <li><strong>Intrapartum:</strong>
      <ul class="sub-points">
        <li>Hospital delivery with OT standby, blood arranged, NICU on alert</li>
        <li>Continuous CTG monitoring of both twins</li>
        <li>If Twin-1 vertex: vaginal delivery possible (experienced team)</li>
        <li>If Twin-1 non-vertex or MCMA: elective caesarean section</li>
        <li>After Twin-1 delivery: clamp cord, assess lie of Twin-2, deliver within 15&ndash;30 min</li>
      </ul>
    </li>
    <li><strong>Postnatal:</strong>
      <ul class="sub-points">
        <li>AMTSL for third stage (very high PPH risk due to overdistended uterus)</li>
        <li>Oxytocin infusion 20 IU in 500 mL NS after delivery</li>
        <li>Support breastfeeding (tandem feeding technique)</li>
        <li>Extra emotional support (postpartum depression risk is higher)</li>
      </ul>
    </li>
  </ul>
</div>

<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic: Maternal complications of twins &mdash; <strong>"PAPH PPH"</strong></div>
  <div class="mnemonic-word"><span class="letter">P</span><span class="letter">A</span><span class="letter">P</span><span class="letter">H</span><span class="letter">P</span><span class="letter">P</span><span class="letter">H</span></div>
  <div class="mnemonic-explain">
    <strong>P</strong> = PIH / Pre-eclampsia &nbsp;|&nbsp; <strong>A</strong> = Anaemia<br>
    <strong>P</strong> = Polyhydramnios &nbsp;|&nbsp; <strong>H</strong> = Hyperemesis<br>
    <strong>P</strong> = Preterm labour &nbsp;|&nbsp; <strong>P</strong> = PPH &nbsp;|&nbsp; <strong>H</strong> = High C-section rate
  </div>
</div>

<div class="remember-box">
  <div class="remember-title">Quick Revision &mdash; Key Points</div>
  <ul>
    <li>Dizygotic (70%) = 2 eggs; Monozygotic (30%) = 1 egg that splits</li>
    <li>DCDA is the <strong>safest type</strong>; MCMA is the <strong>most dangerous</strong></li>
    <li><strong>TTTS</strong> occurs only in monochorionic twins (shared placenta)</li>
    <li>50% of twins deliver <strong>before 37 weeks</strong></li>
    <li>PPH risk is very high &mdash; always do <strong>AMTSL + oxytocin drip</strong></li>
    <li>Delivery timing: DCDA at 37 wks, MCDA at 36 wks, MCMA at 32&ndash;34 wks</li>
  </ul>
</div>

<div class="keyword-box">
  <strong>Keywords:</strong>
  <span class="kw">Multiple pregnancy</span>
  <span class="kw">Dizygotic</span>
  <span class="kw">Monozygotic</span>
  <span class="kw">DCDA / MCDA / MCMA</span>
  <span class="kw">TTTS</span>
  <span class="kw">Discordant growth</span>
  <span class="kw">Preterm labour</span>
  <span class="kw">PPH</span>
</div>
`,

// ═══ ID 168: Types of Twins + Management ═══
168: `
<div class="in-short"><strong>In Short:</strong> Multiple pregnancy involves two or more fetuses. Twins are classified as <strong>dizygotic (fraternal, 70%)</strong> from two eggs or <strong>monozygotic (identical, 30%)</strong> from one egg that splits. Management depends on chorionicity: DCDA (safest), MCDA (risk of TTTS), MCMA (highest risk &mdash; cord entanglement). Intensive ANC with serial USG and planned delivery reduces complications.</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Definition</h3>
  <div class="definition-box">
    <strong>Multiple Pregnancy:</strong> Simultaneous development of two or more fetuses in the uterus. Twinning rate is approximately <strong>1 in 80</strong> pregnancies naturally; much higher with ART.
  </div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Types of Twin Pregnancy by Zygosity</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Feature</th><th>Dizygotic (Fraternal)</th><th>Monozygotic (Identical)</th></tr></thead>
    <tbody>
      <tr><td><strong>Frequency</strong></td><td>70% of all twins</td><td>30% of all twins</td></tr>
      <tr><td><strong>Origin</strong></td><td>2 ova fertilised by 2 sperm</td><td>1 ovum splits after fertilisation</td></tr>
      <tr><td><strong>Placenta</strong></td><td>Always 2 separate (DCDA)</td><td>Depends on timing of split</td></tr>
      <tr><td><strong>Sex</strong></td><td>Same or different</td><td>Always same</td></tr>
      <tr><td><strong>Genetic makeup</strong></td><td>Different (like siblings)</td><td>Identical genes</td></tr>
      <tr><td><strong>Heredity</strong></td><td>Runs in families (maternal)</td><td>Random event, no heredity</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Types by Chorionicity (Most Important for Management)</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Type</th><th>When Splitting Occurs</th><th>Placenta</th><th>Membrane</th><th>Risk Level</th><th>Delivery</th></tr></thead>
    <tbody>
      <tr><td><strong>DCDA</strong></td><td>Day 0&ndash;3 (or all dizygotic)</td><td>2 separate</td><td>Thick dividing membrane (&lambda; sign)</td><td>Lowest risk</td><td>37 weeks</td></tr>
      <tr><td><strong>MCDA</strong></td><td>Day 4&ndash;8</td><td>1 shared</td><td>Thin dividing membrane (T-sign)</td><td>Moderate (TTTS risk)</td><td>36 weeks</td></tr>
      <tr><td><strong>MCMA</strong></td><td>Day 8&ndash;13</td><td>1 shared</td><td>NO membrane</td><td>Highest (cord entanglement)</td><td>32&ndash;34 weeks</td></tr>
      <tr><td><strong>Conjoined</strong></td><td>Day &gt;13</td><td>1 shared</td><td>None (fused bodies)</td><td>Extremely rare &amp; dangerous</td><td>Surgical separation</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Antenatal Management of Twins</h3>
  <ul class="answer-points">
    <li><strong>Early USG (&lt;14 weeks):</strong> Confirm chorionicity (lambda sign = DCDA; T-sign = MCDA); this determines the entire management plan</li>
    <li><strong>Nutrition:</strong> Extra 300 kcal/day; double-dose IFA; calcium 1.5 g/day; protein-rich diet</li>
    <li><strong>Visits:</strong> Fortnightly from 24 weeks; weekly from 32 weeks at FRU/district hospital</li>
    <li><strong>Monitoring:</strong> Serial growth USG every 2&ndash;4 weeks; look for discordant growth (&gt;20% EFW difference)</li>
    <li><strong>MCDA twins:</strong> Fortnightly Doppler from 16 weeks for TTTS screening; refer to MFM specialist</li>
    <li><strong>Complications to watch:</strong> Preterm labour, PIH, anaemia, polyhydramnios, cervical shortening</li>
    <li><strong>Corticosteroids:</strong> Betamethasone 12 mg IM &times;2 doses if delivery expected before 34 weeks</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Intrapartum Management</h3>
  <ul class="answer-points">
    <li><strong>Place:</strong> Hospital with OT, blood bank, and NICU</li>
    <li><strong>Twin-1 vertex + Twin-2 any:</strong> Vaginal delivery possible (experienced team)</li>
    <li><strong>Twin-1 non-vertex:</strong> Elective caesarean section</li>
    <li><strong>MCMA twins:</strong> Always elective caesarean (cord entanglement risk)</li>
    <li><strong>After Twin-1 delivery:</strong> Clamp and cut cord &rarr; assess Twin-2 lie &rarr; deliver within 15&ndash;30 minutes</li>
    <li><strong>Third stage:</strong> AMTSL mandatory; high PPH risk (overdistended uterus); oxytocin infusion post-delivery</li>
  </ul>
</div>

<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic: Chorionicity timing &mdash; <strong>"0-3-8-13"</strong></div>
  <div class="mnemonic-explain">
    Day 0&ndash;3: <strong>DCDA</strong> (safest, 2 placentas, 2 sacs)<br>
    Day 4&ndash;8: <strong>MCDA</strong> (1 placenta, 2 sacs &mdash; TTTS risk)<br>
    Day 8&ndash;13: <strong>MCMA</strong> (1 placenta, NO sac &mdash; cord tangle)<br>
    Day &gt;13: <strong>Conjoined</strong> (incomplete splitting = fused twins)<br>
    <em>Earlier split = safer; Later split = more dangerous!</em>
  </div>
</div>

<div class="remember-box">
  <div class="remember-title">Quick Revision &mdash; Key Points</div>
  <ul>
    <li>&lambda; (lambda) sign on USG = <strong>DCDA</strong> (thick membrane, safest)</li>
    <li>T-sign on USG = <strong>MCDA</strong> (thin membrane, TTTS risk)</li>
    <li>No membrane = <strong>MCMA</strong> (most dangerous, deliver at 32&ndash;34 weeks)</li>
    <li>TTTS only occurs in <strong>monochorionic</strong> twins (shared placenta)</li>
    <li>Twin pregnancy = <strong>double dose IFA</strong> + extra protein + calcium</li>
    <li>Always prepare for <strong>PPH</strong> after twin delivery</li>
  </ul>
</div>

<div class="keyword-box">
  <strong>Keywords:</strong>
  <span class="kw">Dizygotic</span>
  <span class="kw">Monozygotic</span>
  <span class="kw">DCDA</span>
  <span class="kw">MCDA</span>
  <span class="kw">MCMA</span>
  <span class="kw">TTTS</span>
  <span class="kw">Lambda sign</span>
  <span class="kw">Chorionicity</span>
</div>
`,

};

// ─── APPLY FULL ANSWERS ────────────────────────────────────────
console.log('Writing full answers for stub questions...');
let count = 0;

for (const q of questions) {
  if (fullAnswers[q.id]) {
    // Preserve any structural elements already added by enhance-obg2.js
    // but replace with the full answer that already has them
    const newAnswer = fullAnswers[q.id];
    
    // Check if the existing answer has flowchart/exam-strategy from enhance script
    const existingHas = {
      flowchart: q.answer.includes('flowchart'),
      examStrategy: q.answer.includes('exam-strategy'),
      conclusion: q.answer.includes('conclusion-box'),
      glossary: q.answer.includes('glossary'),
      selfTest: q.answer.includes('self-test'),
      example: q.answer.includes('editorial-example'),
      dontConfuse: q.answer.includes('dont-confuse'),
    };

    // Get the structural elements from existing answer to append
    let extras = '';
    const existingParts = q.answer;
    
    // Extract flowchart if present
    if (existingHas.flowchart && !newAnswer.includes('flowchart')) {
      const fcMatch = existingParts.match(/<div class="flowchart">[\s\S]*?<\/div>\n<\/div>\n/);
      if (fcMatch) extras += fcMatch[0];
    }
    
    // Extract exam-strategy if present
    if (existingHas.examStrategy && !newAnswer.includes('exam-strategy')) {
      const esMatch = existingParts.match(/<div class="exam-strategy">[\s\S]*?<\/div>\n/);
      if (esMatch) extras += esMatch[0];
    }
    
    // Extract editorial example if present
    if (existingHas.example && !newAnswer.includes('editorial-example')) {
      const exMatch = existingParts.match(/<div class="editorial-example">[\s\S]*?<\/div>\n/);
      if (exMatch) extras += exMatch[0];
    }
    
    // Extract dont-confuse if present
    if (existingHas.dontConfuse && !newAnswer.includes('dont-confuse')) {
      const dcMatch = existingParts.match(/<div class="dont-confuse">[\s\S]*?<\/div>\n/);
      if (dcMatch) extras += dcMatch[0];
    }
    
    // Extract conclusion if present
    if (existingHas.conclusion && !newAnswer.includes('conclusion-box')) {
      const conMatch = existingParts.match(/<div class="answer-section">\n\s*<h3[^>]*>Conclusion<\/h3>[\s\S]*?<\/div>\n<\/div>\n/);
      if (conMatch) extras += conMatch[0];
    }
    
    // Extract glossary if present
    if (existingHas.glossary && !newAnswer.includes('glossary')) {
      const glMatch = existingParts.match(/<div class="glossary">[\s\S]*?<\/div>\n/);
      if (glMatch) extras += glMatch[0];
    }
    
    // Extract self-test if present
    if (existingHas.selfTest && !newAnswer.includes('self-test')) {
      const stMatch = existingParts.match(/<div class="self-test">[\s\S]*?<\/div>\n/);
      if (stMatch) extras += stMatch[0];
    }

    // Insert extras before keyword-box in the new answer, or at the end
    if (extras.length > 0) {
      if (newAnswer.includes('keyword-box')) {
        const kwIdx = newAnswer.lastIndexOf('<div class="keyword-box">');
        q.answer = newAnswer.substring(0, kwIdx) + extras + '\n' + newAnswer.substring(kwIdx);
      } else {
        q.answer = newAnswer + extras;
      }
    } else {
      q.answer = newAnswer;
    }
    
    count++;
    console.log('  ID ' + q.id + ': wrote full answer (' + q.answer.length + ' chars)');
  }
}

console.log('\nWrote ' + count + ' full answers.');

// ─── WRITE OUTPUT ──────────────────────────────────────────────
let output = '// OBG-II (High-Risk / Abnormal Midwifery & Gynaecology) \u2014 previous-year questions.\n';
output += '// Enhanced with flowcharts, exam strategies, glossaries, self-tests, and editorial examples.\n';
output += '// Units: 8 = High-Risk Pregnancy | 9 = Abnormal Labour & Postnatal Problems | 10 = High-Risk Newborn | 11 = Gynaecological Disorders\n';
output += 'window.QUESTIONS_DATA_OBG2 = [\n';

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
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

fs.writeFileSync('./data-obg2.js', output, 'utf8');
console.log('\nWritten directly to data-obg2.js');
console.log('File size: ' + (output.length / 1024).toFixed(1) + ' KB');
