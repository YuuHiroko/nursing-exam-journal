#!/usr/bin/env node
// Batch 4: Remaining Unit 9 (IDs 190-218) + Unit 10 + Unit 11
const fs = require('fs');
global.window = {};
require('./data-obg2.js');
const questions = window.QUESTIONS_DATA_OBG2;

const fullAnswers = {

// ═══ ID 190 (5m): Fetal Distress ═══
190: `
<div class="in-short"><strong>In Short:</strong> Fetal distress is a condition indicating <strong>fetal hypoxia</strong> (oxygen deprivation) during labour or pregnancy. Diagnosed by: abnormal FHR (bradycardia &lt;110 or tachycardia &gt;160), meconium-stained liquor, and abnormal CTG patterns. Management: left lateral position, oxygen, IV fluids, stop oxytocin, and emergency delivery if not improving.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Etiology</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Maternal</th><th>Fetal</th><th>Placental/Cord</th></tr></thead>
    <tbody>
      <tr><td>Hypotension (supine, epidural)</td><td>Prematurity</td><td>Placental insufficiency</td></tr>
      <tr><td>Pre-eclampsia / eclampsia</td><td>IUGR</td><td>Abruptio placentae</td></tr>
      <tr><td>Anaemia / hypovolaemia</td><td>Post-maturity</td><td>Cord compression / prolapse</td></tr>
      <tr><td>Uterine hyperstimulation</td><td>Congenital anomalies</td><td>True knot in cord</td></tr>
      <tr><td>Prolonged labour</td><td>Infection (chorioamnionitis)</td><td>Nuchal cord (tight)</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Diagnosis</h3>
  <ul class="answer-points">
    <li><strong>FHR abnormalities:</strong> Bradycardia (&lt;110 bpm sustained); tachycardia (&gt;160 bpm); late decelerations; variable decelerations; loss of beat-to-beat variability</li>
    <li><strong>Meconium-stained liquor:</strong> Thick green/dark meconium (in vertex presentation) indicates fetal distress</li>
    <li><strong>CTG patterns:</strong> Non-reassuring (reduced variability) or abnormal (late decelerations, prolonged bradycardia)</li>
    <li><strong>Fetal scalp blood sampling:</strong> pH &lt;7.20 = acidosis = urgent delivery</li>
  </ul>
</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Management</h3>
  <ul class="answer-points">
    <li><strong>Intrauterine resuscitation:</strong> Left lateral position; oxygen 8&ndash;10 L/min; IV fluids (RL 1L fast); STOP oxytocin</li>
    <li>If cervix fully dilated: assisted vaginal delivery (vacuum/forceps)</li>
    <li>If not fully dilated and distress persists: <strong>emergency caesarean section</strong></li>
    <li><strong>Neonatal team on standby</strong> for resuscitation at delivery</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Normal FHR: <strong>120&ndash;160 bpm</strong> (some texts: 110&ndash;160)</li>
  <li>Late decelerations = <strong>placental insufficiency</strong> (most ominous)</li>
  <li>Variable decelerations = <strong>cord compression</strong></li>
  <li>First actions: <strong>left lateral + O2 + stop oxytocin + IV fluids</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Fetal distress</span><span class="kw">FHR</span><span class="kw">CTG</span><span class="kw">Meconium</span><span class="kw">Late deceleration</span><span class="kw">Intrauterine resuscitation</span></div>`,

// ═══ ID 191 (5m): Birth Canal Injuries ═══
191: `
<div class="in-short"><strong>In Short:</strong> Injuries to the birth canal during delivery include <strong>cervical tears, vaginal tears, perineal tears</strong> (1st to 4th degree), and vulval/labial lacerations. Common causes: precipitate labour, instrumental delivery, large baby, rigid perineum. Management: systematic inspection, repair under anaesthesia, and monitoring for PPH.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Types of Birth Canal Injuries</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Injury</th><th>Description</th><th>Management</th></tr></thead>
    <tbody>
      <tr><td><strong>Cervical tears</strong></td><td>Tear in cervix, usually lateral; heavy bleeding</td><td>Visualise with sponge forceps; suture under anaesthesia</td></tr>
      <tr><td><strong>Vaginal tears</strong></td><td>Tear in vaginal wall; may extend into fornices</td><td>Suture; inspect for haematoma formation</td></tr>
      <tr><td><strong>Perineal tears (1st degree)</strong></td><td>Skin and fourchette only</td><td>May not need suturing; keep clean</td></tr>
      <tr><td><strong>Perineal tears (2nd degree)</strong></td><td>Skin + perineal muscles (but NOT anal sphincter)</td><td>Suture in layers under local anaesthesia</td></tr>
      <tr><td><strong>Perineal tears (3rd degree)</strong></td><td>Extends to involve anal sphincter</td><td>Repair by experienced surgeon in OT under regional anaesthesia</td></tr>
      <tr><td><strong>Perineal tears (4th degree)</strong></td><td>Involves anal sphincter + rectal mucosa</td><td>Specialist repair; risk of faecal incontinence</td></tr>
      <tr><td><strong>Vulval/labial tears</strong></td><td>Small tears; may cause haematoma</td><td>Pressure; suture if bleeding; watch for haematoma</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Nursing Management</h3>
  <ul class="answer-points">
    <li>Systematic inspection of birth canal after every delivery (cervix, vagina, perineum)</li>
    <li>Apply pressure to bleeding areas; prepare for repair</li>
    <li>Administer analgesia; assist with suturing</li>
    <li>Monitor for PPH (traumatic cause &mdash; one of the &ldquo;4 T's&rdquo;)</li>
    <li>Post-repair: perineal care, sitz baths, stool softeners (for 3rd/4th degree tears)</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Always inspect cervix, vagina, and perineum <strong>after every delivery</strong></li>
  <li>3rd degree = <strong>anal sphincter involved</strong>; 4th = <strong>rectal mucosa involved</strong></li>
  <li>Birth canal trauma is one of the <strong>4 T's of PPH</strong> (Trauma)</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Birth canal injury</span><span class="kw">Perineal tear</span><span class="kw">Cervical tear</span><span class="kw">4 T's</span><span class="kw">Trauma</span></div>`,

// ═══ ID 192 (5m): Perineal Tear ═══
192: `
<div class="in-short"><strong>In Short:</strong> Perineal tears are lacerations of the perineum during delivery, classified into <strong>4 degrees</strong>. 1st = skin only; 2nd = skin + muscle; 3rd = includes anal sphincter; 4th = includes rectal mucosa. Prevention: controlled delivery of head, perineal support, selective episiotomy. Repair: layered suturing under anaesthesia.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Degrees of Perineal Tear</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Degree</th><th>Structures Involved</th><th>Management</th></tr></thead>
    <tbody>
      <tr><td><strong>1st</strong></td><td>Perineal skin and vaginal mucosa only</td><td>May heal spontaneously; suture if bleeding</td></tr>
      <tr><td><strong>2nd</strong></td><td>Skin + perineal muscles (NOT sphincter)</td><td>Suture in layers: mucosa &rarr; muscle &rarr; skin</td></tr>
      <tr><td><strong>3rd</strong></td><td>Extends to <strong>anal sphincter</strong> (3a: &lt;50% EAS; 3b: &gt;50% EAS; 3c: IAS involved)</td><td>Repair by experienced obstetrician in OT</td></tr>
      <tr><td><strong>4th</strong></td><td>Anal sphincter + <strong>rectal/anal mucosa</strong></td><td>Specialist repair in OT; risk of long-term incontinence</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Causes &amp; Prevention</h3>
  <ul class="answer-points">
    <li><strong>Causes:</strong> Precipitate delivery, macrosomia, rigid perineum (elderly primi), instrumental delivery, malposition (OP), shoulder dystocia</li>
    <li><strong>Prevention:</strong> Controlled delivery of head; perineal support (guarding); selective episiotomy (not routine); warm perineal compress; antenatal perineal massage</li>
    <li><strong>Post-repair care:</strong> Perineal hygiene (front to back); sitz baths; ice packs; analgesics; stool softeners (3rd/4th degree); pelvic floor exercises from day 1</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>1st = skin; 2nd = muscle; 3rd = <strong>sphincter</strong>; 4th = <strong>rectum</strong></li>
  <li>3rd and 4th degree require <strong>OT repair by specialist</strong></li>
  <li><strong>EAS</strong> = External Anal Sphincter; <strong>IAS</strong> = Internal Anal Sphincter</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Perineal tear</span><span class="kw">1st-4th degree</span><span class="kw">Anal sphincter</span><span class="kw">Perineal support</span><span class="kw">Episiotomy</span></div>`,

// ═══ ID 193 (5m): Episiotomy ═══
193: `
<div class="in-short"><strong>In Short:</strong> Episiotomy is a <strong>planned surgical incision</strong> of the perineum during delivery to enlarge the vaginal outlet. Types: mediolateral (most common, safer) and median (midline). Indications: rigid perineum, instrumental delivery, macrosomia, breech delivery. It is NOT done routinely &mdash; only when indicated.</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Definition</h3>
  <div class="definition-box"><strong>Episiotomy:</strong> A deliberate <strong>surgical incision of the perineum and vaginal wall</strong> made during the second stage of labour to widen the vaginal outlet and facilitate delivery of the baby.</div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Types</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Type</th><th>Direction</th><th>Advantages</th><th>Disadvantages</th></tr></thead>
    <tbody>
      <tr><td><strong>Mediolateral</strong></td><td>45&deg; from midline toward ischial tuberosity</td><td>Less risk of 3rd/4th degree extension; most widely used</td><td>More painful; may damage Bartholin gland duct</td></tr>
      <tr><td><strong>Median (Midline)</strong></td><td>Straight from fourchette toward anus</td><td>Easy to repair; heals better; less pain</td><td>Higher risk of extension to 3rd/4th degree tear</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Indications &amp; Care</h3>
  <ul class="answer-points">
    <li><strong>Indications:</strong> Rigid perineum (elderly primi); instrumental delivery (forceps/vacuum); macrosomia; breech delivery; fetal distress (to expedite delivery); previous 3rd/4th degree tear</li>
    <li><strong>Timing:</strong> Given at crowning, during a contraction; inject local anaesthetic (1% lignocaine) first</li>
    <li><strong>Repair:</strong> After delivery of placenta; suture in 3 layers (vaginal mucosa &rarr; perineal muscles &rarr; skin) using absorbable sutures (Vicryl)</li>
    <li><strong>Post-episiotomy care:</strong> Ice packs (first 24h); sitz baths (after 24h); perineal hygiene (front to back); analgesics; watch for infection, haematoma; pelvic floor exercises</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Mediolateral = <strong>most common and safest</strong> (less extension risk)</li>
  <li>Median = heals better but <strong>higher risk of extension to rectum</strong></li>
  <li>Episiotomy is <strong>NOT routine</strong> &mdash; only when indicated</li>
  <li>Use <strong>absorbable sutures</strong> (no need for removal)</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Episiotomy</span><span class="kw">Mediolateral</span><span class="kw">Median</span><span class="kw">Perineal care</span><span class="kw">Absorbable sutures</span></div>`,

// ═══ ID 194 (5m): Induction of Labour ═══
194: `
<div class="in-short"><strong>In Short:</strong> Induction of labour means <strong>artificially initiating labour</strong> before spontaneous onset. Indications: post-dates (&gt;41 weeks), PPROM, PIH, GDM, IUGR, oligohydramnios. Methods: prostaglandin gel/tablet (cervical ripening), ARM (amniotomy), oxytocin drip (augmentation). Bishop Score &ge;6 indicates favourable cervix for induction.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Indications</h3>
  <ul class="answer-points">
    <li><strong>Maternal:</strong> PIH/pre-eclampsia, gestational diabetes, cholestasis, chronic hypertension</li>
    <li><strong>Fetal:</strong> Post-dates (&gt;41 weeks), IUGR, Rh isoimmunisation, oligohydramnios, IUD</li>
    <li><strong>Other:</strong> PPROM (&gt;34 weeks), chorioamnionitis, logistic reasons (distance from hospital)</li>
  </ul>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Methods</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Method</th><th>How It Works</th><th>When Used</th></tr></thead>
    <tbody>
      <tr><td><strong>Prostaglandin E2 (dinoprostone)</strong></td><td>Cervical ripening + uterine contractions</td><td>Unfavourable cervix (Bishop &lt;6)</td></tr>
      <tr><td><strong>Misoprostol (PGE1)</strong></td><td>Oral/vaginal; cervical ripening + contractions</td><td>Unfavourable cervix; cheaper alternative</td></tr>
      <tr><td><strong>ARM (Amniotomy)</strong></td><td>Releases prostaglandins + oxytocin; applies head to cervix</td><td>Favourable cervix (Bishop &ge;6)</td></tr>
      <tr><td><strong>Oxytocin drip</strong></td><td>Stimulates uterine contractions directly</td><td>After ARM; for augmentation; Bishop &ge;6</td></tr>
      <tr><td><strong>Foley catheter (mechanical)</strong></td><td>Balloon dilates cervix mechanically</td><td>Previous caesarean (safer than prostaglandins)</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Nursing Role</h3>
  <ul class="answer-points">
    <li>Assess Bishop Score before induction; ensure informed consent</li>
    <li>Continuous CTG monitoring during oxytocin; watch for hyperstimulation</li>
    <li>Monitor contractions: frequency, duration, resting tone</li>
    <li>Prepare for possible emergency C-section (failed induction occurs in ~20%)</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Bishop Score <strong>&ge;6 = favourable</strong> (good chance of successful induction)</li>
  <li>Prostaglandins for <strong>cervical ripening</strong>; oxytocin for <strong>contractions</strong></li>
  <li>Misoprostol is <strong>contraindicated in previous C-section</strong> (uterine rupture risk)</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Induction</span><span class="kw">Bishop Score</span><span class="kw">Prostaglandin</span><span class="kw">Oxytocin</span><span class="kw">ARM</span><span class="kw">Cervical ripening</span></div>`,

// ═══ ID 195 (5m): Ventouse Delivery ═══
195: `
<div class="in-short"><strong>In Short:</strong> Ventouse (vacuum extraction) uses a <strong>suction cup applied to the fetal scalp</strong> to assist delivery during the second stage. Indications: prolonged 2nd stage, maternal exhaustion, non-reassuring FHR. Advantages over forceps: less maternal trauma, easier to apply. Complication: cephalhaematoma, subgaleal haemorrhage (rare but dangerous).</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Indications &amp; Contraindications</h3>
  <ul class="answer-points">
    <li><strong>Indications:</strong> Prolonged 2nd stage; maternal exhaustion; mild fetal distress; maternal cardiac disease; poor maternal effort</li>
    <li><strong>Prerequisites:</strong> Full cervical dilation; membranes ruptured; head engaged; vertex presentation; empty bladder; adequate analgesia</li>
    <li><strong>Contraindications:</strong> &lt;34 weeks gestation (risk of IVH); face/brow presentation; unengaged head; CPD; bleeding disorder</li>
  </ul>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Procedure &amp; Complications</h3>
  <ul class="answer-points">
    <li><strong>Procedure:</strong> Cup placed on flexion point (3 cm anterior to posterior fontanelle); vacuum built up to 0.6&ndash;0.8 kg/cm&sup2;; traction applied during contractions</li>
    <li><strong>Abandon if:</strong> Cup detaches 3 times; no descent after 3 pulls; &gt;20 minutes</li>
    <li><strong>Fetal complications:</strong> Cephalhaematoma (most common, benign); chignon (swelling at cup site, resolves); subgaleal haemorrhage (rare but life-threatening); retinal haemorrhage; jaundice</li>
    <li><strong>Maternal complications:</strong> Vaginal/cervical lacerations (less than forceps); perineal tear</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Vacuum applied at <strong>flexion point</strong> (not over fontanelle)</li>
  <li>Most common complication: <strong>cephalhaematoma</strong> (benign)</li>
  <li>Most dangerous: <strong>subgaleal haemorrhage</strong> (baby can bleed to death)</li>
  <li>Advantage over forceps: <strong>less maternal trauma</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Ventouse</span><span class="kw">Vacuum extraction</span><span class="kw">Cephalhaematoma</span><span class="kw">Flexion point</span><span class="kw">Subgaleal haemorrhage</span></div>`,

// ═══ ID 196 (5m): Forceps Delivery ═══
196: `
<div class="in-short"><strong>In Short:</strong> Forceps delivery uses specially designed <strong>metal instruments (forceps)</strong> applied to the fetal head to assist delivery. Types: outlet (Wrigley's), low (Simpson's), mid-cavity (Kielland's). Indications: prolonged 2nd stage, fetal distress, maternal exhaustion. Prerequisites: full dilation, engaged head, empty bladder, adequate analgesia.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Types of Forceps</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Type</th><th>Station</th><th>Example</th><th>Use</th></tr></thead>
    <tbody>
      <tr><td><strong>Outlet</strong></td><td>Head visible at perineum</td><td>Wrigley's forceps</td><td>LSCS &mdash; to lift head from pelvis; easy vaginal delivery</td></tr>
      <tr><td><strong>Low</strong></td><td>Head at +2 station or below</td><td>Simpson's / Neville-Barnes</td><td>Most common; prolonged 2nd stage</td></tr>
      <tr><td><strong>Mid-cavity</strong></td><td>Head at 0 to +2 station</td><td>Kielland's forceps</td><td>For rotation (OP to OA) + delivery; high skill needed</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Indications &amp; Complications</h3>
  <ul class="answer-points">
    <li><strong>Indications:</strong> Prolonged 2nd stage; fetal distress; poor maternal effort; cardiac disease; eclampsia (to shorten 2nd stage)</li>
    <li><strong>Prerequisites (same as vacuum):</strong> Full dilation; membranes ruptured; head engaged and &ge;+2 station; presentation identified; empty bladder; consent; anaesthesia</li>
    <li><strong>Maternal complications:</strong> Cervical/vaginal tears; 3rd/4th degree perineal tears; bladder injury; PPH</li>
    <li><strong>Fetal complications:</strong> Facial nerve palsy (7th nerve); facial marks/bruising; cephalhaematoma; skull fracture (rare)</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Forceps prerequisites = <strong>FORCEPS mnemonic</strong>: Full dilation, OA position, Ruptured membranes, Cephalic, Engaged, Pain relief, Sphincter (bladder) empty</li>
  <li>Most common fetal injury: <strong>facial nerve palsy</strong> (usually temporary)</li>
  <li>Kielland's = for <strong>rotation</strong> (OP to OA)</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Forceps</span><span class="kw">Wrigley's</span><span class="kw">Simpson's</span><span class="kw">Kielland's</span><span class="kw">Facial nerve palsy</span><span class="kw">Outlet forceps</span></div>`,

// ═══ ID 197 (15m): Caesarean Section ═══
197: `
<div class="in-short"><strong>In Short:</strong> Caesarean section (C-section) is delivery of the baby through a <strong>surgical incision in the abdomen and uterus</strong>. Most common type: LSCS (Lower Segment Caesarean Section) with a transverse incision. Indications: CPD, fetal distress, placenta praevia, cord prolapse, failed induction, malpresentation, previous 2+ C-sections. Requires comprehensive pre- and post-operative nursing care.</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Definition &amp; Types</h3>
  <div class="definition-box"><strong>Caesarean Section:</strong> A surgical procedure in which the baby is delivered through an <strong>incision in the mother's abdominal wall and uterus</strong>, bypassing the vaginal route.</div>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Type</th><th>Incision</th><th>Advantages</th><th>Indication</th></tr></thead>
    <tbody>
      <tr><td><strong>LSCS (Lower Segment)</strong></td><td>Transverse on lower uterine segment</td><td>Less bleeding; stronger scar; VBAC possible; less adhesions</td><td>Most indications (95% of all C-sections)</td></tr>
      <tr><td><strong>Classical</strong></td><td>Vertical on upper uterine segment</td><td>Faster access; more room</td><td>Transverse lie back-down; extreme prematurity; anterior placenta praevia; cervical cancer</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Indications</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Maternal</th><th>Fetal</th><th>Combined</th></tr></thead>
    <tbody>
      <tr><td>CPD / contracted pelvis</td><td>Fetal distress</td><td>Failed induction</td></tr>
      <tr><td>Previous 2+ C-sections</td><td>Malpresentation (breech, transverse)</td><td>Obstructed labour</td></tr>
      <tr><td>Placenta praevia (major)</td><td>Cord prolapse</td><td>Failed trial of labour</td></tr>
      <tr><td>Pre-eclampsia / eclampsia</td><td>Macrosomia</td><td>Prolonged labour not responding</td></tr>
      <tr><td>Cervical cancer</td><td>Multiple pregnancy (non-vertex Twin-1)</td><td>Maternal request (elective)</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Pre-operative Nursing Care</h3>
  <ul class="answer-points">
    <li><strong>Informed consent</strong> (explain procedure, risks, anaesthesia options)</li>
    <li><strong>NPO:</strong> Nil by mouth for 6&ndash;8 hours (for general) or 2 hours clear fluids (for spinal)</li>
    <li><strong>Investigations:</strong> CBC, blood group, crossmatch (2 units), coagulation profile, RBS</li>
    <li><strong>Preparation:</strong> IV access (18G); shave and prep; Foley catheter; TED stockings; hospital gown</li>
    <li><strong>Prophylactic antibiotic:</strong> Cefazolin 2g IV 30 minutes before skin incision</li>
    <li><strong>Anaesthesia:</strong> Spinal anaesthesia (preferred) or general anaesthesia</li>
    <li><strong>Emotional support:</strong> Explain what to expect; allow birth partner if possible</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Post-operative Nursing Care</h3>
  <ul class="answer-points">
    <li><strong>Immediate (0&ndash;2 hours):</strong> Vitals every 15 min; check fundal height and firmness; lochia assessment; IV fluids; pain management; check Foley drainage</li>
    <li><strong>Early (2&ndash;24 hours):</strong> Start oral fluids (sips after 4&ndash;6 hours); deep breathing exercises; leg exercises (DVT prevention); monitor wound site; begin breastfeeding</li>
    <li><strong>Day 1&ndash;2:</strong> Early ambulation (within 12&ndash;24 hours); full diet; remove Foley catheter (12&ndash;24 hours); adequate analgesia (paracetamol + diclofenac)</li>
    <li><strong>Day 3&ndash;7:</strong> Wound inspection; suture/staple removal (day 7&ndash;10 if non-absorbable); discharge planning; family planning counselling; next pregnancy advice (wait 18&ndash;24 months)</li>
    <li><strong>Breastfeeding:</strong> Initiate within 1 hour; side-lying or football hold (avoids incision pressure)</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Complications</h3>
  <ul class="answer-points">
    <li><strong>Immediate:</strong> Haemorrhage, anaesthesia complications, injury to bladder/bowel/ureter</li>
    <li><strong>Early:</strong> Wound infection, UTI, endometritis, DVT/PE, paralytic ileus</li>
    <li><strong>Late:</strong> Adhesions, scar ectopic pregnancy, uterine rupture in subsequent pregnancies, placenta accreta in future pregnancies</li>
  </ul>
</div>

<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic: C-section pre-op checklist &mdash; <strong>"CAN I CUT"</strong></div>
  <div class="mnemonic-word"><span class="letter">C</span><span class="letter">A</span><span class="letter">N</span><span class="letter">I</span><span class="letter">C</span><span class="letter">U</span><span class="letter">T</span></div>
  <div class="mnemonic-explain">
    <strong>C</strong> = Consent &nbsp;|&nbsp; <strong>A</strong> = Antibiotic prophylaxis<br>
    <strong>N</strong> = NPO status &nbsp;|&nbsp; <strong>I</strong> = IV access + Investigations<br>
    <strong>C</strong> = Crossmatch blood &nbsp;|&nbsp; <strong>U</strong> = Urinary catheter<br>
    <strong>T</strong> = TED stockings + Theatre preparation
  </div>
</div>

<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>LSCS = <strong>95% of all C-sections</strong> (transverse lower segment incision)</li>
  <li>Classical C-section = <strong>higher rupture risk</strong> in future pregnancies (no VBAC)</li>
  <li>Prophylactic antibiotic: <strong>cefazolin 2g IV 30 min before incision</strong></li>
  <li>Early ambulation: <strong>within 12&ndash;24 hours</strong> (prevents DVT)</li>
  <li>Breastfeed: <strong>within 1 hour</strong> of delivery (side-lying position)</li>
  <li>Next pregnancy: wait <strong>18&ndash;24 months</strong> after C-section</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Caesarean section</span><span class="kw">LSCS</span><span class="kw">Classical</span><span class="kw">Pre-operative care</span><span class="kw">Post-operative care</span><span class="kw">VBAC</span><span class="kw">Spinal anaesthesia</span></div>`,

// ═══ ID 198 (15m): C-section Types + Pre/Post-op Care ═══
198: `
<div class="in-short"><strong>In Short:</strong> Caesarean section types: LSCS (transverse lower segment, 95% of cases, safer) and Classical (vertical upper segment, higher rupture risk). Pre-op: consent, NPO, IV access, crossmatch, Foley, antibiotics. Post-op: vitals q15min, early ambulation, breastfeeding within 1 hour, wound care. Please see detailed answer for Q197 as this question overlaps significantly.</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Types of Caesarean Section</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Feature</th><th>LSCS (Lower Segment)</th><th>Classical</th></tr></thead>
    <tbody>
      <tr><td><strong>Incision</strong></td><td>Transverse on lower segment</td><td>Vertical on upper segment</td></tr>
      <tr><td><strong>Frequency</strong></td><td>95% of all C-sections</td><td>Rare (5%)</td></tr>
      <tr><td><strong>Blood loss</strong></td><td>Less</td><td>More</td></tr>
      <tr><td><strong>Scar strength</strong></td><td>Stronger (less muscle)</td><td>Weaker (through muscle)</td></tr>
      <tr><td><strong>VBAC possible?</strong></td><td>Yes (trial of labour possible)</td><td>No (rupture risk too high)</td></tr>
      <tr><td><strong>Adhesions</strong></td><td>Less</td><td>More</td></tr>
      <tr><td><strong>When used</strong></td><td>Most indications</td><td>Transverse lie back-down; extreme prematurity; anterior placenta praevia</td></tr>
    </tbody>
  </table></div>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Pre-operative Care</h3>
  <ul class="answer-points">
    <li>Informed consent; explanation of procedure, risks, and anaesthesia</li>
    <li>NPO 6&ndash;8 hours (general) or 2 hours clear fluids (spinal)</li>
    <li>CBC, crossmatch 2 units, coagulation profile, RBS</li>
    <li>IV access (18G); shave and prep; Foley catheter; hospital gown</li>
    <li>Cefazolin 2g IV 30 min before incision; TED stockings; position on OT table</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Post-operative Care</h3>
  <ul class="answer-points">
    <li><strong>0&ndash;2 hours:</strong> Vitals q15min; fundal height + firmness; lochia; IV fluids; O2 saturation; pain management</li>
    <li><strong>2&ndash;24 hours:</strong> Start oral sips; deep breathing + leg exercises; early breastfeeding (side-lying/football hold); monitor urine output</li>
    <li><strong>Day 1&ndash;2:</strong> Early ambulation (12&ndash;24h); full diet; remove Foley (12&ndash;24h); wound assessment; adequate analgesia</li>
    <li><strong>Discharge (Day 5&ndash;7):</strong> Suture removal plan; danger signs to watch; wound care teaching; contraception; next pregnancy advice (wait 18&ndash;24 months)</li>
  </ul>
</div>

<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>LSCS = safer, VBAC possible; Classical = higher rupture risk, no VBAC</li>
  <li>Pre-op checklist: <strong>CAN I CUT</strong></li>
  <li>Breastfeed within <strong>1 hour</strong>; early ambulation within <strong>12&ndash;24 hours</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">LSCS</span><span class="kw">Classical caesarean</span><span class="kw">Pre-operative</span><span class="kw">Post-operative</span><span class="kw">VBAC</span></div>`,

// ═══ ID 199 (15m): Rising C-section rate + Mother preparation ═══
199: `
<div class="in-short"><strong>In Short:</strong> The C-section rate is rising globally (ideal: 10&ndash;15% per WHO). Factors: defensive medicine, maternal request, increased monitoring (CTG), repeat C-sections, older mothers, higher BMI, ART pregnancies. Preparation includes physical (investigations, NPO, prep), psychological (counselling, consent, birth companion), and logistical (OT readiness, blood, neonatal team).</div>

<div class="answer-section">
  <h3 class="answer-section-title accent-title">Factors Responsible for Rising C-section Rate</h3>
  <ul class="answer-points">
    <li><strong>Medical:</strong> Increased use of electronic FHR monitoring (CTG) leading to more interventions; repeat C-sections (once a C-section, more likely again); reduced training in vaginal breech delivery and forceps</li>
    <li><strong>Maternal:</strong> Older age at first pregnancy; higher BMI; request for elective C-section (tocophobia); ART pregnancies (precious baby)</li>
    <li><strong>Legal:</strong> Defensive medicine (fear of litigation); lower threshold for intervention</li>
    <li><strong>Social:</strong> Choosing date/time of delivery; private healthcare incentives; perception of C-section as safer</li>
    <li><strong>Obstetric:</strong> More inductions (failed inductions end in C-section); reduced operative vaginal deliveries; more multiple pregnancies (from ART)</li>
  </ul>
</div>

<div class="answer-section">
  <h3 class="answer-section-title teal-title">Preparation of Mother for C-section</h3>
  <ul class="answer-points">
    <li><strong>Physical preparation:</strong>
      <ul class="sub-points">
        <li>Investigations: CBC, blood group, crossmatch, coagulation, RBS, urine R/E</li>
        <li>NPO 6&ndash;8 hours; antacid prophylaxis (ranitidine 150 mg oral night before)</li>
        <li>IV access (18G); Foley catheter; abdominal shave and prep</li>
        <li>TED stockings; remove jewellery, dentures, nail polish</li>
        <li>Pre-medication and prophylactic antibiotic as ordered</li>
      </ul>
    </li>
    <li><strong>Psychological preparation:</strong>
      <ul class="sub-points">
        <li>Explain procedure in simple language; address fears and concerns</li>
        <li>Informed consent (explain risks: bleeding, infection, injury, anaesthesia)</li>
        <li>Allow birth companion in OT if possible (reduces anxiety)</li>
        <li>Reassure about breastfeeding and bonding after C-section</li>
        <li>Address any guilt about not having vaginal delivery</li>
      </ul>
    </li>
    <li><strong>Logistical:</strong> Arrange blood; neonatal team on standby; OT readiness check; anaesthesia review</li>
  </ul>
</div>

<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>WHO recommended C-section rate: <strong>10&ndash;15%</strong></li>
  <li>India's C-section rate: <strong>&gt;20%</strong> (much higher in private hospitals)</li>
  <li>Main factor for rising rate: <strong>repeat C-sections + defensive medicine</strong></li>
  <li>Solution: promote VBAC, train in operative vaginal delivery, use partograph</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Rising C-section rate</span><span class="kw">WHO recommendation</span><span class="kw">Defensive medicine</span><span class="kw">VBAC</span><span class="kw">Pre-operative preparation</span></div>`,

// ═══ ID 200 (5m): Indications of C-section ═══
200: `
<div class="in-short"><strong>In Short:</strong> Caesarean section is indicated when vaginal delivery is unsafe for mother or baby. Common indications: CPD, fetal distress, malpresentation, cord prolapse, placenta praevia, obstructed labour, failed induction, eclampsia, previous 2+ C-sections.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Indications for Caesarean Section</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Category</th><th>Indications</th></tr></thead>
    <tbody>
      <tr><td><strong>Absolute (Always C-section)</strong></td><td>Major placenta praevia (Type III, IV); cord prolapse (undelivered baby); transverse lie in labour; CPD (severe); uterine rupture; central cervical cancer</td></tr>
      <tr><td><strong>Relative (May need C-section)</strong></td><td>Fetal distress; malpresentation (breech); failed induction; prolonged/obstructed labour; PIH/eclampsia; previous C-section; macrosomia (&gt;4.5 kg); IUGR with abnormal Doppler; GDM on insulin</td></tr>
      <tr><td><strong>Elective</strong></td><td>Previous classical C-section; previous 2+ LSCS; maternal request; HIV positive (high viral load); breech at term (failed ECV)</td></tr>
    </tbody>
  </table></div>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li><strong>Absolute</strong> = vaginal delivery is impossible or dangerous</li>
  <li>Most common indication worldwide: <strong>previous caesarean section</strong></li>
  <li>Most common emergency indication: <strong>fetal distress</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">C-section indications</span><span class="kw">Absolute</span><span class="kw">Relative</span><span class="kw">Elective</span><span class="kw">Emergency</span></div>`,

// ═══ ID 201 (5m): Per Vaginal Examination ═══
201: `
<div class="in-short"><strong>In Short:</strong> Per vaginal (PV) examination in obstetrics assesses cervical dilation, effacement, station, position of presenting part, membrane status, and pelvic adequacy. Done during labour to monitor progress. Should be done aseptically, with consent, and recorded on the partograph. Contraindicated in placenta praevia.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Findings Assessed on PV Examination</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Parameter</th><th>What is Assessed</th></tr></thead>
    <tbody>
      <tr><td><strong>Cervical dilation</strong></td><td>0&ndash;10 cm; full dilation = 10 cm</td></tr>
      <tr><td><strong>Cervical effacement</strong></td><td>Thinning of cervix; 0&ndash;100%</td></tr>
      <tr><td><strong>Station</strong></td><td>Level of presenting part relative to ischial spines (-3 to +3)</td></tr>
      <tr><td><strong>Position</strong></td><td>Relation of denominator to maternal pelvis (LOA, ROA, etc.)</td></tr>
      <tr><td><strong>Presentation</strong></td><td>Vertex, breech, face, etc.</td></tr>
      <tr><td><strong>Membranes</strong></td><td>Intact or ruptured; colour of liquor (clear/meconium)</td></tr>
      <tr><td><strong>Moulding</strong></td><td>0 to +3; degree of skull bone overlap</td></tr>
      <tr><td><strong>Pelvis</strong></td><td>Adequacy of bony pelvis; sacral curve; ischial spines</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Nursing Considerations</h3>
  <ul class="answer-points">
    <li>Always obtain <strong>consent</strong>; explain the procedure; ensure privacy</li>
    <li>Strict <strong>aseptic technique</strong> (sterile gloves, antiseptic)</li>
    <li>Record findings on <strong>partograph</strong></li>
    <li>Frequency: every <strong>4 hours</strong> in active labour (not more unless indicated)</li>
    <li><strong>Contraindication:</strong> Known placenta praevia (may cause massive haemorrhage)</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>PV exam every <strong>4 hours</strong> in active labour</li>
  <li>Station 0 = at <strong>ischial spines</strong> (engaged)</li>
  <li><strong>Never do PV exam in placenta praevia</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">PV examination</span><span class="kw">Cervical dilation</span><span class="kw">Station</span><span class="kw">Effacement</span><span class="kw">Partograph</span></div>`,

// ═══ ID 202 (5m): Bishop Score ═══
202: `
<div class="in-short"><strong>In Short:</strong> Bishop Score assesses <strong>cervical readiness for induction</strong>. It evaluates 5 parameters: dilation, effacement, station, consistency, and position. Score <strong>&ge;6 = favourable</strong> (good chance of successful induction). Score &lt;6 = unfavourable (needs cervical ripening first with prostaglandins or Foley balloon).</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Bishop Score Parameters</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Parameter</th><th>Score 0</th><th>Score 1</th><th>Score 2</th><th>Score 3</th></tr></thead>
    <tbody>
      <tr><td><strong>Dilation (cm)</strong></td><td>Closed</td><td>1&ndash;2</td><td>3&ndash;4</td><td>&ge;5</td></tr>
      <tr><td><strong>Effacement (%)</strong></td><td>0&ndash;30</td><td>40&ndash;50</td><td>60&ndash;70</td><td>&ge;80</td></tr>
      <tr><td><strong>Station</strong></td><td>-3</td><td>-2</td><td>-1 / 0</td><td>+1 / +2</td></tr>
      <tr><td><strong>Consistency</strong></td><td>Firm</td><td>Medium</td><td>Soft</td><td>&mdash;</td></tr>
      <tr><td><strong>Position</strong></td><td>Posterior</td><td>Mid / Central</td><td>Anterior</td><td>&mdash;</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Interpretation &amp; Clinical Use</h3>
  <ul class="answer-points">
    <li>Maximum score = <strong>13</strong></li>
    <li><strong>&ge;6 = favourable cervix</strong> &rarr; can induce with ARM + oxytocin (high success rate)</li>
    <li><strong>&lt;6 = unfavourable cervix</strong> &rarr; needs cervical ripening first (prostaglandin gel/tablet, Foley balloon, or laminaria)</li>
    <li><strong>Score &ge;9:</strong> Success rate of induction approaches that of spontaneous labour</li>
  </ul>
</div>
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic: Bishop Score parameters &mdash; <strong>"DECPS"</strong></div>
  <div class="mnemonic-explain">
    <strong>D</strong> = Dilation &nbsp;|&nbsp; <strong>E</strong> = Effacement &nbsp;|&nbsp; <strong>C</strong> = Consistency<br>
    <strong>P</strong> = Position &nbsp;|&nbsp; <strong>S</strong> = Station<br>
    <em>&ge;6 = GO (favourable); &lt;6 = RIPEN FIRST</em>
  </div>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Bishop Score assesses <strong>cervical readiness</strong> for induction</li>
  <li><strong>&ge;6 = favourable</strong> (proceed with induction)</li>
  <li>5 parameters: <strong>Dilation, Effacement, Consistency, Position, Station</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Bishop Score</span><span class="kw">Cervical ripening</span><span class="kw">Induction</span><span class="kw">Favourable cervix</span><span class="kw">DECPS</span></div>`,

// ═══ ID 203 (5m): MgSO4 ═══
203: `
<div class="in-short"><strong>In Short:</strong> Magnesium Sulphate (MgSO4) is the <strong>drug of choice for prevention and treatment of eclamptic convulsions</strong>. Pritchard regimen: loading 4g IV + 5g IM each buttock; maintenance 5g IM every 4 hours for 24 hours. Before each dose, check: knee jerk present, RR &ge;16/min, urine output &ge;30 mL/hr. Antidote: Calcium gluconate 10% (10 mL IV).</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Pritchard Regimen</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Phase</th><th>Dose</th><th>Route</th></tr></thead>
    <tbody>
      <tr><td><strong>Loading</strong></td><td>4g MgSO4 (20% solution) over 15&ndash;20 min</td><td>IV slow</td></tr>
      <tr><td><strong>Loading</strong></td><td>5g MgSO4 (50% solution) into each buttock (total 10g)</td><td>Deep IM</td></tr>
      <tr><td><strong>Maintenance</strong></td><td>5g MgSO4 into alternate buttock every 4 hours</td><td>Deep IM</td></tr>
      <tr><td><strong>Duration</strong></td><td>Continue for 24 hours after last convulsion</td><td>&mdash;</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Monitoring Before Each Dose (RUK)</h3>
  <ul class="answer-points">
    <li><strong>R</strong> = Respiratory rate &ge;16/min</li>
    <li><strong>U</strong> = Urine output &ge;30 mL/hr (or &ge;100 mL in 4 hours)</li>
    <li><strong>K</strong> = Knee jerk (patellar reflex) must be present</li>
    <li><strong>If ANY is absent:</strong> WITHHOLD next dose and give antidote</li>
    <li><strong>Antidote:</strong> Calcium gluconate 10%, 10 mL (1g) IV slowly over 10 minutes</li>
    <li><strong>Therapeutic level:</strong> 4&ndash;7 mEq/L; Toxic: &gt;7 mEq/L; Respiratory arrest: &gt;12 mEq/L</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Loading dose: <strong>4g IV + 10g IM</strong> (total 14g)</li>
  <li>Monitor <strong>RUK</strong> before every maintenance dose</li>
  <li>Antidote: <strong>Calcium gluconate 10%</strong> (keep at bedside)</li>
  <li>Continue for <strong>24 hours after last convulsion</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">MgSO4</span><span class="kw">Pritchard</span><span class="kw">RUK monitoring</span><span class="kw">Calcium gluconate</span><span class="kw">Eclampsia</span></div>`,

// ═══ ID 204 (5m): Injection Methergin ═══
204: `
<div class="in-short"><strong>In Short:</strong> Methylergometrine (Methergin) is an <strong>ergot alkaloid</strong> that causes sustained uterine contraction. Used in PPH (atonic uterus) and active management of third stage. Dose: 0.2 mg IM or IV. <strong>Contraindicated in hypertension, pre-eclampsia, and heart disease</strong> (causes vasoconstriction).</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Key Features</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Feature</th><th>Detail</th></tr></thead>
    <tbody>
      <tr><td><strong>Drug name</strong></td><td>Methylergometrine maleate (Methergin&trade;)</td></tr>
      <tr><td><strong>Class</strong></td><td>Ergot alkaloid (oxytocic)</td></tr>
      <tr><td><strong>Mechanism</strong></td><td>Causes sustained (tonic) uterine contraction by acting on uterine smooth muscle</td></tr>
      <tr><td><strong>Dose</strong></td><td>0.2 mg (1 ampoule) IM or slow IV</td></tr>
      <tr><td><strong>Onset</strong></td><td>IM: 2&ndash;5 min; IV: immediate</td></tr>
      <tr><td><strong>Indication</strong></td><td>PPH (atonic); active management of 3rd stage (after delivery of anterior shoulder)</td></tr>
      <tr><td><strong>Contraindication</strong></td><td><strong>Hypertension, pre-eclampsia, heart disease</strong> (causes vasoconstriction &rarr; can cause stroke/MI); never before delivery of baby</td></tr>
      <tr><td><strong>Side effects</strong></td><td>Nausea, vomiting, headache, hypertension, chest pain, peripheral vasospasm</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Nursing Responsibilities</h3>
  <ul class="answer-points">
    <li><strong>Check BP before giving</strong> &mdash; contraindicated if BP &ge;140/90</li>
    <li>Give <strong>after delivery of baby</strong> (never before)</li>
    <li>Monitor BP and uterine contraction after administration</li>
    <li>Store in refrigerator (2&ndash;8&deg;C); protect from light</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Methergin = <strong>sustained contraction</strong> (unlike oxytocin which gives rhythmic contractions)</li>
  <li><strong>NEVER give to hypertensive patients</strong></li>
  <li>Dose: <strong>0.2 mg IM/IV</strong></li>
  <li>Store in <strong>refrigerator</strong></li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Methylergometrine</span><span class="kw">Methergin</span><span class="kw">Ergot alkaloid</span><span class="kw">PPH</span><span class="kw">Contraindicated in hypertension</span></div>`,

// ═══ ID 205 (5m): Tocolytic Agents ═══
205: `
<div class="in-short"><strong>In Short:</strong> Tocolytic agents are drugs used to <strong>suppress premature uterine contractions</strong> to delay preterm delivery. Goal: delay delivery by 48 hours to allow corticosteroids to work (fetal lung maturity). Common tocolytics: nifedipine (1st line), ritodrine, isoxsuprine, MgSO4, indomethacin. Nursing role: monitor maternal vitals, FHR, and side effects.</div>
<div class="answer-section">
  <h3 class="answer-section-title accent-title">Common Tocolytic Agents</h3>
  <div class="answer-table-wrap"><table class="answer-table">
    <thead><tr><th>Drug</th><th>Class</th><th>Route/Dose</th><th>Side Effects</th></tr></thead>
    <tbody>
      <tr><td><strong>Nifedipine</strong></td><td>Calcium channel blocker</td><td>20 mg oral, then 10&ndash;20 mg q6h</td><td>Hypotension, headache, flushing, tachycardia</td></tr>
      <tr><td><strong>Isoxsuprine</strong></td><td>Beta-2 agonist</td><td>10 mg IM/IV</td><td>Tachycardia, hypotension, tremor, palpitations</td></tr>
      <tr><td><strong>Ritodrine</strong></td><td>Beta-2 agonist</td><td>IV infusion</td><td>Tachycardia, chest pain, pulmonary oedema</td></tr>
      <tr><td><strong>MgSO4</strong></td><td>Smooth muscle relaxant</td><td>4&ndash;6g IV loading</td><td>Flushing, respiratory depression, hypotension</td></tr>
      <tr><td><strong>Indomethacin</strong></td><td>NSAID (PG inhibitor)</td><td>25&ndash;50 mg oral/rectal</td><td>Oligohydramnios, premature closure of ductus (avoid &gt;32 wks)</td></tr>
    </tbody>
  </table></div>
</div>
<div class="answer-section">
  <h3 class="answer-section-title teal-title">Nursing Responsibilities</h3>
  <ul class="answer-points">
    <li>Monitor maternal pulse, BP, respiratory rate frequently (especially with beta-agonists)</li>
    <li>Continuous FHR monitoring during tocolysis</li>
    <li>Watch for signs of pulmonary oedema: dyspnoea, tachypnoea, crackles</li>
    <li>Ensure corticosteroids are given simultaneously (betamethasone 12 mg IM &times;2, 24h apart)</li>
    <li>Maintain fluid balance; restrict IV fluids (risk of fluid overload with beta-agonists)</li>
    <li>Report if contractions not suppressed after adequate dosing</li>
  </ul>
</div>
<div class="remember-box"><div class="remember-title">Quick Revision</div><ul>
  <li>Goal of tocolysis: delay delivery by <strong>48 hours</strong> for steroids to work</li>
  <li><strong>Nifedipine</strong> = current 1st line (oral, fewer side effects)</li>
  <li>Tocolytics are <strong>contraindicated</strong> in: infection, IUFD, severe PIH, abruption</li>
</ul></div>
<div class="keyword-box"><strong>Keywords:</strong> <span class="kw">Tocolytic</span><span class="kw">Nifedipine</span><span class="kw">Isoxsuprine</span><span class="kw">Preterm labour</span><span class="kw">Corticosteroids</span></div>`,

};

// ─── APPLY AND WRITE ──────────────────────────────────────────
console.log('Writing batch 4 answers...');
let count = 0;
for (const q of questions) {
  if (fullAnswers[q.id]) {
    const existing = q.answer;
    let newAns = fullAnswers[q.id];
    const extractions = [
      [/\n<div class="flowchart">[\s\S]*?<\/div>\n<\/div>\n/, 'flowchart'],
      [/\n<div class="exam-strategy">[\s\S]*?<\/div>\n/, 'exam-strategy'],
      [/\n<div class="editorial-example">[\s\S]*?<\/div>\n/, 'editorial-example'],
      [/\n<div class="dont-confuse">[\s\S]*?<\/div>\n/, 'dont-confuse'],
      [/\n<div class="answer-section">\n\s*<h3[^>]*>Conclusion[\s\S]*?<\/div>\n<\/div>\n/, 'conclusion-box'],
      [/\n<div class="glossary">[\s\S]*?<\/div>\n/, 'glossary'],
      [/\n<div class="self-test">[\s\S]*?<\/div>\n/, 'self-test'],
    ];
    let extras = '';
    for (const [regex, cls] of extractions) {
      if (existing.includes(cls) && !newAns.includes(cls)) {
        const match = existing.match(regex);
        if (match) extras += match[0];
      }
    }
    if (extras.length > 0) {
      if (newAns.includes('keyword-box')) {
        const kwIdx = newAns.lastIndexOf('<div class="keyword-box">');
        newAns = newAns.substring(0, kwIdx) + extras + '\n' + newAns.substring(kwIdx);
      } else { newAns += extras; }
    }
    q.answer = newAns;
    count++;
    console.log('  ID ' + q.id + ' (' + q.marks + 'm): ' + q.answer.length + ' chars');
  }
}
console.log('\nWrote ' + count + ' answers.');

let output = '// OBG-II (High-Risk / Abnormal Midwifery & Gynaecology) \u2014 previous-year questions.\n';
output += '// Enhanced with flowcharts, exam strategies, glossaries, self-tests, and editorial examples.\n';
output += '// Units: 8 = High-Risk Pregnancy | 9 = Abnormal Labour & Postnatal Problems | 10 = High-Risk Newborn | 11 = Gynaecological Disorders\n';
output += 'window.QUESTIONS_DATA_OBG2 = [\n';
for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const safeAnswer = (q.answer || '').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  output += '  {\n    id: ' + q.id + ',\n    question: ' + JSON.stringify(q.question) + ',\n    marks: ' + q.marks + ',\n    repeated: ' + q.repeated + ',\n    unit: ' + q.unit + ',\n    years: ' + JSON.stringify(q.years) + ',\n    answer: `\n' + safeAnswer + '\n`\n  }' + (i < questions.length - 1 ? ',' : '') + '\n';
}
output += '];\n';
fs.writeFileSync('./data-obg2.js', output, 'utf8');
console.log('Written to data-obg2.js (' + (output.length/1024).toFixed(1) + ' KB)');
const remaining = questions.filter(q => !q.answer.includes('answer-points') && !q.answer.includes('answer-table'));
console.log('Remaining stubs: ' + remaining.length);
