// Script to inject enhanced study components into every answer
const fs = require('fs');

// ─── UNIT 1: Enhancements for each question ───
const unit1Enhancements = {
  // Q2 (id:2) - Causes of Maternal Mortality
  2: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Direct Causes</div>
  <div class="mnemonic-word"><span>H</span>-<span>O</span>-<span>U</span>-<span>S</span>-<span>E</span></div>
  <div class="mnemonic-explain">
    <strong>H</strong> = Haemorrhage (PPH/APH) — #1 killer<br>
    <strong>O</strong> = Obstructed Labour<br>
    <strong>U</strong> = Unsafe Abortion<br>
    <strong>S</strong> = Sepsis (Puerperal infection)<br>
    <strong>E</strong> = Eclampsia (fits from high BP)
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Direct causes cause 80% of maternal deaths, indirect causes 20%</li>
    <li>Haemorrhage (bleeding) is the #1 direct killer worldwide</li>
    <li>Anaemia is the #1 indirect killer — over 50% Indian pregnant women are anaemic</li>
    <li>India's MMR = 97 | SDG target = below 70 by 2030</li>
    <li>For every 1 death, 20-30 women suffer serious illness (morbidity)</li>
    <li>Most maternal deaths are PREVENTABLE with proper care</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Imagine Sunita, a 25-year-old woman in a village. She delivers at home with a dai. After delivery, she starts bleeding heavily (PPH) but the dai doesn't know what to do. By the time the family arranges transport to the hospital — it's too late. If an ANM had been present, she would have given oxytocin immediately and saved Sunita's life. THIS is why institutional delivery matters.
</div>`
  },

  // Q3 (id:3) - Maternal Morbidity and Mortality
  3: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Maternal Morbidity Conditions</div>
  <div class="mnemonic-word"><span>F</span>-<span>A</span>-<span>P</span>-<span>D</span>-<span>I</span>-<span>I</span></div>
  <div class="mnemonic-explain">
    <strong>F</strong> = Fistula (VVF/RVF) — continuous urine/stool leaking<br>
    <strong>A</strong> = Anaemia — weakness, breathlessness<br>
    <strong>P</strong> = Prolapse — uterus comes down<br>
    <strong>D</strong> = Depression — postnatal, can't bond with baby<br>
    <strong>I</strong> = Infection — chronic pelvic infection<br>
    <strong>I</strong> = Infertility — can't conceive again
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Mortality = Death | Morbidity = Sickness (alive but suffering)</li>
    <li>For every 1 maternal death, 20-30 women are seriously sick</li>
    <li>Near-miss = woman who almost died but survived (very important to study)</li>
    <li>India's MMR = 97 | Global MMR = 223 | SDG target = below 70</li>
    <li>Obstetric fistula is the most devastating morbidity — woman leaks urine/stool 24/7</li>
    <li>Tracking both morbidity AND mortality is essential to improve care</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Radha, 22, had obstructed labour for 3 days before being taken to hospital. The baby died, and Radha developed a vesicovaginal fistula (VVF) — she now leaks urine continuously. Her husband left her, she can't work, and she lives in isolation. She didn't die, but her life is destroyed. This is maternal morbidity — and it's 20-30 times more common than death.
</div>`
  },

  // Q4 (id:4) - Maternal Mortality and Nurse's Role
  4: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Nurse's Role</div>
  <div class="mnemonic-word"><span>A</span>-<span>I</span>-<span>D</span>-<span>E</span>-<span>C</span>-<span>H</span>-<span>D</span></div>
  <div class="mnemonic-explain">
    <strong>A</strong> = ANC (Antenatal Care) — register, check, give IFA/TT<br>
    <strong>I</strong> = Identify high-risk mothers early<br>
    <strong>D</strong> = Delivery care — clean, safe, use partograph<br>
    <strong>E</strong> = Emergency management — PPH, eclampsia<br>
    <strong>C</strong> = Community work — with ASHA, VHND<br>
    <strong>H</strong> = Health education — danger signs, nutrition<br>
    <strong>D</strong> = Documentation — MCP card, registers
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Nurse midwife works at ALL stages: Ante-natal, Intra-natal, Post-natal</li>
    <li>Minimum 4 ANC visits required (WHO recommends 8)</li>
    <li>AMTSL = Oxytocin within 1 min of delivery (prevents PPH)</li>
    <li>MgSO4 = Drug of choice for eclampsia</li>
    <li>High-risk factors: age <18 or >35, prev. C-section, twins, Hb<7, high BP</li>
    <li>Postnatal visits: Day 3, Day 7, Day 42</li>
    <li>Danger signs to teach: heavy bleeding, severe headache, fits, fever, no baby movement</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Priya, an ANM in a village, notices that 32-year-old Meena (4th pregnancy) has a BP of 160/110 during routine ANC. Priya immediately gives her a left lateral position, arranges transport, and refers her to the district hospital. At the hospital, Meena is diagnosed with severe preeclampsia and started on MgSO4. Both mother and baby are saved. Without Priya's early detection, Meena could have developed eclampsia (fits) at home and died.
</div>`
  },

  // Q5 (id:5) - Role of Nurse in Midwifery
  5: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for 5 Roles</div>
  <div class="mnemonic-word"><span>A</span>-<span>I</span>-<span>P</span>-<span>C</span>-<span>A</span></div>
  <div class="mnemonic-explain">
    <strong>A</strong> = Antenatal Care (before delivery)<br>
    <strong>I</strong> = Intranatal Care (during delivery)<br>
    <strong>P</strong> = Postnatal Care (after delivery)<br>
    <strong>C</strong> = Community Health Role<br>
    <strong>A</strong> = Administrative & Research Role
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>ICM Definition: Nurse midwife = trained person who independently manages normal pregnancy and delivery</li>
    <li>Partograph = labour monitoring chart (most important tool during delivery)</li>
    <li>AMTSL = Active Management of Third Stage of Labour (oxytocin + cord traction + massage)</li>
    <li>RMC = Respectful Maternity Care — NO scolding, maintain privacy</li>
    <li>Immediate newborn care: Dry, Skin-to-skin, Breastfeed within 1 hour</li>
    <li>Government schemes nurse must know: JSY, JSSK, PMSMA</li>
    <li>Documents: MCP card, ANC register, delivery register, immunization register</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> During a home visit on Day 7, nurse Kavita finds that new mother Geeta has foul-smelling vaginal discharge and 102 degree F fever. She suspects puerperal sepsis, starts oral antibiotics, and immediately refers Geeta to the CHC. She also checks the baby — finds the cord is red and swollen (umbilical sepsis). Both mother and baby get timely treatment. This is the lifesaving power of postnatal home visits.
</div>`
  },

  // Q6 (id:6) - National Policy and Legislation
  6: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Key Years</div>
  <div class="mnemonic-word"><span>M</span>-<span>P</span>-<span>R</span>-<span>N</span>-<span>J</span>-<span>J</span></div>
  <div class="mnemonic-explain">
    <strong>M</strong> = MTP Act (1971, amended 2021) — legal abortion<br>
    <strong>P</strong> = PCPNDT Act (1994) — bans sex determination<br>
    <strong>R</strong> = RCH Programme (1997) — reproductive health<br>
    <strong>N</strong> = NRHM (2005) — rural health mission<br>
    <strong>J</strong> = JSY (2005) — cash for hospital delivery<br>
    <strong>J</strong> = JSSK (2011) — everything FREE for delivery
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>MTP Act: Up to 20 weeks = 1 doctor | Up to 24 weeks = 2 doctors (special cases)</li>
    <li>PCPNDT Act: Sex determination = ILLEGAL | Fine Rs. 1 lakh + 5 years jail</li>
    <li>Maternity Benefit Act (2017): 26 weeks paid leave for first 2 children</li>
    <li>JSSK = ZERO payment for mother and baby (delivery, C-section, medicines, transport)</li>
    <li>Surrogacy Act (2021): Only altruistic surrogacy allowed, commercial surrogacy BANNED</li>
    <li>SDG 3.1: Reduce MMR below 70 by 2030</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> A 17-year-old unmarried girl comes to the health centre crying — she is 16 weeks pregnant due to sexual abuse. The nurse knows the MTP Act allows abortion up to 24 weeks for such cases. She counsels the girl, reports the case under POCSO Act, and arranges safe abortion at the district hospital with 2 doctors' opinions. Knowledge of the law directly saved this girl's life and future.
</div>`
  },

  // Q7 (id:7) - NRHM
  7: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for NRHM Components</div>
  <div class="mnemonic-word"><span>A</span>-<span>J</span>-<span>J</span>-<span>V</span>-<span>A</span>-<span>I</span></div>
  <div class="mnemonic-explain">
    <strong>A</strong> = ASHA workers — 1 per 1000 village population<br>
    <strong>J</strong> = JSY — cash incentive for hospital delivery<br>
    <strong>J</strong> = JSSK — free delivery and treatment<br>
    <strong>V</strong> = VHSNC — Village Health Committee<br>
    <strong>A</strong> = Ambulance (108/102) — free emergency transport<br>
    <strong>I</strong> = IPHS — Indian Public Health Standards for facilities
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>NRHM launched: 12th April 2005 | Focus: 18 high-priority states</li>
    <li>2013: NRHM merged into NHM (National Health Mission) = NRHM + NUHM</li>
    <li>ASHA = Accredited Social Health Activist (village-level link worker)</li>
    <li>ASHA gets Rs. 600 per institutional delivery she facilitates</li>
    <li>Before NRHM: Hospital deliveries = 40.7% | After: 88.6%</li>
    <li>Before NRHM: MMR = 254 | Now: 97 (massive improvement!)</li>
    <li>Rogi Kalyan Samiti = hospital management committee (makes hospitals accountable)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Fatima, an ASHA worker in rural Bihar, identifies Reshma as pregnant during a household survey. She registers Reshma for ANC, accompanies her to all 4 checkups, arranges the 108 ambulance for delivery, and stays with her at the hospital. After safe delivery, Reshma gets Rs. 1400 under JSY, and Fatima gets Rs. 600 as incentive. Before NRHM, Reshma would have delivered at home with a dai — risking her life.
</div>`
  },

  // Q8 (id:8) - RCH Programme
  8: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for 5 RCH Components</div>
  <div class="mnemonic-word"><span>S</span>-<span>C</span>-<span>F</span>-<span>A</span>-<span>R</span></div>
  <div class="mnemonic-explain">
    <strong>S</strong> = Safe Motherhood (ANC, delivery, PNC)<br>
    <strong>C</strong> = Child Health (immunization, IMNCI)<br>
    <strong>F</strong> = Family Planning (spacing, contraception)<br>
    <strong>A</strong> = Adolescent Health (RKSK, nutrition)<br>
    <strong>R</strong> = RTI/STI Management (testing, treatment)
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>RCH = Reproductive and Child Health Programme</li>
    <li>RCH-I launched in 1997 | RCH-II in 2005 (under NRHM)</li>
    <li>Key shift: Target-based approach changed to Client-centered approach</li>
    <li>5 components: Safe Motherhood, Child Health, Family Planning, Adolescent Health, RTI/STI</li>
    <li>RCH-II integrated under NRHM/NHM framework</li>
    <li>RKSK = Rashtriya Kishor Swasthya Karyakram (adolescent health programme)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Under RCH, 16-year-old Anjali visits a youth-friendly clinic for menstrual problems. The nurse provides counseling on menstrual hygiene, nutrition (IFA tablets), and educates her about the risks of early marriage. Previously, Anjali's family planned to marry her off at 17 — but after counseling, they agreed to wait until she finishes college. This is the adolescent health component of RCH in action.
</div>`
  },

  // Q9 (id:9) - Safe Motherhood
  9: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for 4 Pillars of Safe Motherhood</div>
  <div class="mnemonic-word"><span>F</span>-<span>A</span>-<span>C</span>-<span>E</span></div>
  <div class="mnemonic-explain">
    <strong>F</strong> = Family Planning — prevent unwanted pregnancies<br>
    <strong>A</strong> = Antenatal Care — detect problems early<br>
    <strong>C</strong> = Clean/Safe Delivery — skilled birth attendant<br>
    <strong>E</strong> = Emergency Obstetric Care — handle complications
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Safe Motherhood Initiative: Launched 1987 in Nairobi, Kenya</li>
    <li>4 Pillars = FACE: Family Planning, ANC, Clean Delivery, EmOC</li>
    <li>Key Indian schemes: JSY, JSSK, PMSMA, LaQshya, SBA training, MDR</li>
    <li>PMSMA = Pradhan Mantri Surakshit Matritva Abhiyan (free specialist checkup on 9th of every month)</li>
    <li>LaQshya = Labour Room Quality Improvement Initiative</li>
    <li>SBA = Skilled Birth Attendant (every delivery must have one)</li>
    <li>MDR = Maternal Death Review (review every maternal death to prevent future ones)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> On the 9th of every month, PMSMA camps are held at district hospitals. Pregnant women get FREE specialist checkup — ultrasound, blood tests, doctor consultation — all at no cost. Kamla, a poor farm labourer, gets her first proper checkup here. The doctor finds she has placenta previa (placenta blocking the birth canal). She is planned for elective C-section at 37 weeks. Without PMSMA, Kamla would have bled severely during home delivery.
</div>`
  },

  // Q10 (id:10) - Legal and Ethical Issues
  10: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Legal Acts in Maternal Health</div>
  <div class="mnemonic-word"><span>M</span>-<span>P</span>-<span>M</span>-<span>P</span>-<span>S</span></div>
  <div class="mnemonic-explain">
    <strong>M</strong> = MTP Act (1971/2021) — safe legal abortion<br>
    <strong>P</strong> = PCPNDT Act (1994) — bans sex determination<br>
    <strong>M</strong> = Maternity Benefit Act (1961/2017) — paid leave<br>
    <strong>P</strong> = POCSO Act (2012) — protects children<br>
    <strong>S</strong> = Surrogacy Act (2021) — bans commercial surrogacy
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>LEGAL = What the LAW says you must/must not do (punishment if violated)</li>
    <li>ETHICAL = What is morally RIGHT to do (professional standards)</li>
    <li>4 ethical principles: Autonomy, Beneficence, Non-maleficence, Justice</li>
    <li>Informed consent = patient MUST understand and agree before any procedure</li>
    <li>Confidentiality = never share patient's information without permission</li>
    <li>Patient autonomy = patient's choice matters, even if you disagree</li>
    <li>Mandatory reporting: sexual abuse of minors (POCSO), sex determination attempts</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> A family demands an ultrasound technician to reveal whether the baby is a boy or girl. The technician knows this is ILLEGAL under PCPNDT Act (fine of Rs. 1 lakh + 5 years jail). She firmly refuses and explains the law. The next day, a man offers her Rs. 5000 to secretly tell the sex. She reports this attempt to the authorities. This is both a legal AND ethical situation — the nurse follows the law AND protects the girl child.
</div>`
  },

  // Q11 (id:11) - Problems of Unmarried Mother
  11: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Problems</div>
  <div class="mnemonic-word"><span>S</span>-<span>E</span>-<span>H</span>-<span>F</span>-<span>L</span></div>
  <div class="mnemonic-explain">
    <strong>S</strong> = Social stigma — isolation, family rejection<br>
    <strong>E</strong> = Emotional problems — depression, anxiety, guilt<br>
    <strong>H</strong> = Health risks — no ANC, unsafe abortion, malnutrition<br>
    <strong>F</strong> = Financial crisis — no income, no support<br>
    <strong>L</strong> = Legal issues — child legitimacy, custody
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Unmarried mothers face problems in ALL domains: Social, Emotional, Health, Financial, Legal</li>
    <li>They are at HIGHER risk because they hide pregnancy and avoid ANC</li>
    <li>More likely to attempt unsafe abortion (leading cause of death)</li>
    <li>Support available: Women helpline (181), Swadhar Greh (shelter homes), adoption services</li>
    <li>Nurse's role: Non-judgmental care, confidentiality, connect with support services</li>
    <li>Legal right: MTP Act allows unmarried women to get safe abortion</li>
    <li>Ethical duty: Treat with dignity — never shame or judge</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Pooja, an 18-year-old college student, comes to the PHC alone and scared — she is 14 weeks pregnant, the father has abandoned her, and her family doesn't know. She is thinking of going to a quack for abortion. The nurse: (1) reassures her without judgment, (2) confirms pregnancy and checks for any complications, (3) explains her legal right to safe MTP, (4) arranges counseling for decision-making (keep the baby, adoption, or MTP), (5) connects her with Women Helpline 181 for shelter support. This compassionate, confidential approach can save Pooja's life.
</div>`
  }
};

// ─── UNIT 2: Enhancements for each question ───
const unit2Enhancements = {
  // Q12 (id:12) - Male vs Female Pelvis
  12: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Female Pelvis Features</div>
  <div class="mnemonic-word"><span>W</span>ide <span>S</span>hallow <span>L</span>ight</div>
  <div class="mnemonic-explain">
    Female pelvis = <strong>W</strong>ide (wider outlet), <strong>S</strong>hallow (short cavity), <strong>L</strong>ight (lighter bones)<br>
    Male pelvis = Opposite: Narrow, Deep, Heavy<br><br>
    Subpubic angle: Female = 80-85 degrees (wide) | Male = 50-60 degrees (narrow)<br>
    <em>Think: Wide angle = baby can pass through!</em>
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Female pelvis: Wide, Shallow, Light, Round inlet, Wide subpubic angle (80-85 degrees)</li>
    <li>Male pelvis: Narrow, Deep, Heavy, Heart-shaped inlet, Narrow subpubic angle (50-60 degrees)</li>
    <li>Female sacrum: Short, wide, more curved | Male sacrum: Long, narrow, less curved</li>
    <li>Female coccyx is MORE movable (bends back during delivery)</li>
    <li>Ischial spines: Less prominent in female (more space for baby)</li>
    <li>Gynaecoid pelvis = most common female type = BEST for normal delivery</li>
    <li>Write at least 8 differences in a TABLE format for full 5 marks</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Think of the male pelvis as a narrow bucket (baby can't fit through) and the female pelvis as a wide basin (baby can slide out). That's why men's hips look narrow and women's hips look wider. The female coccyx (tailbone) can even bend backwards during delivery to make more room — like a door that opens wider when you push it!
</div>`
  },

  // Q13 (id:13) - Female Pelvis Diagram
  13: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for 4 Types of Pelvis</div>
  <div class="mnemonic-word"><span>G</span>-<span>A</span>-<span>A</span>-<span>P</span></div>
  <div class="mnemonic-explain">
    <strong>G</strong> = Gynaecoid (Round inlet) — 50%, BEST for delivery<br>
    <strong>A</strong> = Android (Heart-shaped) — 20%, like male, difficult<br>
    <strong>A</strong> = Anthropoid (Long oval) — 25%, usually okay<br>
    <strong>P</strong> = Platypelloid (Flat oval) — 5%, RAREST, very difficult
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>4 bones: 2 Hip bones (innominate) + 1 Sacrum + 1 Coccyx</li>
    <li>True pelvis = the birth canal (baby passes through here)</li>
    <li>False pelvis = above the brim (just supports abdominal organs)</li>
    <li>At INLET: Transverse diameter is widest (13 cm) — baby enters sideways</li>
    <li>At OUTLET: AP diameter is widest (13 cm) — baby exits facing back</li>
    <li>That's why baby ROTATES during delivery (enters transverse, exits AP)</li>
    <li>Diagonal conjugate (12.5 cm) = ONLY diameter that can be measured clinically</li>
    <li>If diagonal conjugate is less than 10 cm = normal delivery may not be possible</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Imagine a baby's head is like a cricket ball. At the pelvic inlet (top), the widest opening is side-to-side (transverse), so the ball enters sideways. At the outlet (bottom), the widest opening is front-to-back (AP), so the ball must turn 90 degrees to come out. This is EXACTLY why babies rotate during delivery — they are fitting through the widest diameter at each level. It's nature's perfect engineering!
</div>`
  },

  // Q14 (id:14) - Menstrual Cycle
  14: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for 4 Phases</div>
  <div class="mnemonic-word">"<span>M</span>y <span>P</span>eriod <span>O</span>ccurs <span>S</span>oon"</div>
  <div class="mnemonic-explain">
    <strong>M</strong> = Menstrual Phase (Day 1-5) — bleeding<br>
    <strong>P</strong> = Proliferative/Follicular Phase (Day 6-14) — lining rebuilds<br>
    <strong>O</strong> = Ovulation (Day 14) — egg released (LH surge!)<br>
    <strong>S</strong> = Secretory/Luteal Phase (Day 15-28) — lining maintained by progesterone
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Average cycle = 28 days (normal range: 21-35 days)</li>
    <li>FSH = grows the follicle | LH = triggers ovulation (Day 14 surge)</li>
    <li>Estrogen = rebuilds lining (proliferative phase) | Progesterone = maintains lining (secretory phase)</li>
    <li>Ovulation = Day 14 = most fertile day (egg survives only 24 hours)</li>
    <li>Sperm survives 48-72 hours inside female body</li>
    <li>Fertile window = Day 12-16 (5 days around ovulation)</li>
    <li>No pregnancy = corpus luteum dies = progesterone drops = lining sheds = period</li>
    <li>If pregnant = corpus luteum continues = no period (first sign of pregnancy!)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Asha wants to avoid pregnancy naturally (Natural Family Planning). The nurse explains: "Your egg is released on Day 14 and lives only 24 hours. Sperm can survive 3 days. So avoid intercourse from Day 11-17 of your cycle." This is the Calendar/Rhythm method — understanding the menstrual cycle makes it possible. However, the nurse also explains it's only 76% effective, so barrier methods are more reliable.
</div>`
  },

  // Q15 (id:15) - Fertilization
  15: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Steps of Fertilization</div>
  <div class="mnemonic-word"><span>C</span>-<span>A</span>-<span>P</span>-<span>C</span>-<span>F</span>-<span>S</span></div>
  <div class="mnemonic-explain">
    <strong>C</strong> = Capacitation (sperm gets activated, 7 hours)<br>
    <strong>A</strong> = Acrosome Reaction (enzymes dissolve egg coating)<br>
    <strong>P</strong> = Penetration (1 sperm enters zona pellucida)<br>
    <strong>C</strong> = Cortical Reaction (blocks other sperm)<br>
    <strong>F</strong> = Fusion of nuclei (23+23 = 46 chromosomes)<br>
    <strong>S</strong> = Sex determined (XX=girl, XY=boy)
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Site of fertilization = Ampulla of Fallopian tube (outer 1/3rd)</li>
    <li>Timing = Within 24 hours of ovulation</li>
    <li>Capacitation takes 7 hours (sperm must undergo this to penetrate egg)</li>
    <li>Hyaluronidase = enzyme released from acrosome (dissolves corona radiata)</li>
    <li>Only 1 sperm out of 300+ million can fertilize the egg</li>
    <li>Cortical reaction = blocks polyspermy (prevents multiple sperm entering)</li>
    <li>Zygote = fertilized egg = 46 chromosomes (23 from each parent)</li>
    <li>Sex is determined by SPERM: X sperm = girl (XX), Y sperm = boy (XY)</li>
    <li>Conditions needed: ovulation, motile sperm, open tubes, proper timing</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Think of fertilization like a race with 300 million runners (sperm) trying to reach 1 finish line (egg). First, all runners must "warm up" for 7 hours (capacitation). Then they must break through 2 barriers (corona radiata and zona pellucida) using special tools (enzymes). The FIRST runner to reach the egg wins, and immediately the gate closes behind him (cortical reaction) — no other runner can enter. The winner merges with the egg, and a new life begins!
</div>`
  },

  // Q16 (id:16) - Fetal Circulation
  16: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for 3 Fetal Shunts</div>
  <div class="mnemonic-word"><span>D</span>-<span>F</span>-<span>D</span></div>
  <div class="mnemonic-explain">
    <strong>D</strong> = Ductus Venosus (bypasses liver) — becomes Ligamentum Venosum<br>
    <strong>F</strong> = Foramen Ovale (in heart, RA to LA) — becomes Fossa Ovalis<br>
    <strong>D</strong> = Ductus Arteriosus (PA to Aorta) — becomes Ligamentum Arteriosum<br><br>
    <em>All 3 exist to BYPASS the non-working fetal lungs!</em>
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Fetal lungs DO NOT work — placenta acts as the lung</li>
    <li>3 shunts bypass the lungs: Ductus Venosus, Foramen Ovale, Ductus Arteriosus</li>
    <li>Umbilical VEIN carries oxygenated blood TO fetus (only vein with O2 blood!)</li>
    <li>2 Umbilical ARTERIES carry deoxygenated blood FROM fetus to placenta</li>
    <li>After birth: baby's first cry expands lungs, shunts start closing</li>
    <li>PDA (Patent Ductus Arteriosus) = common congenital defect if ductus doesn't close</li>
    <li>PDA sound = continuous "machinery murmur"</li>
    <li>Indomethacin = drug to close PDA in premature babies</li>
    <li>Prostaglandin E2 keeps ductus open in fetal life</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Think of fetal circulation like a highway with 3 shortcuts. Normally, blood must go through the lungs (like a long detour). But since the baby's lungs are like a closed shop (not working yet), the blood takes 3 shortcuts to avoid them: Shortcut 1 (Ductus Venosus) skips the liver. Shortcut 2 (Foramen Ovale) crosses directly from right to left side of heart. Shortcut 3 (Ductus Arteriosus) jumps from lung-pipe to body-pipe. After birth, when the baby takes its first breath, the "shop opens" (lungs start working), and all 3 shortcuts close permanently!
</div>`
  },

  // Q17 (id:17) - Functions of Placenta
  17: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Placental Functions</div>
  <div class="mnemonic-word"><span>R</span>-<span>N</span>-<span>E</span>-<span>P</span>-<span>E</span>-<span>S</span>-<span>I</span></div>
  <div class="mnemonic-explain">
    <strong>R</strong> = Respiratory (like lungs — O2 in, CO2 out)<br>
    <strong>N</strong> = Nutritive (like gut — glucose, amino acids)<br>
    <strong>E</strong> = Excretory (like kidneys — removes waste)<br>
    <strong>P</strong> = Protective (barrier — blocks most bacteria)<br>
    <strong>E</strong> = Endocrine (hormone factory — hCG, hPL, estrogen, progesterone)<br>
    <strong>S</strong> = Storage (stores glycogen, iron, fat)<br>
    <strong>I</strong> = Immunological (transfers IgG antibodies to baby)
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Placenta = baby's life support system (lungs + gut + kidneys + hormone factory all in one)</li>
    <li>hCG = detected by pregnancy test kit (produced by placenta)</li>
    <li>hCG maintains corpus luteum in early pregnancy (first 12 weeks)</li>
    <li>Progesterone from placenta prevents uterine contractions (maintains pregnancy)</li>
    <li>Placental barrier is NOT perfect — Rubella, HIV, drugs, alcohol CAN cross it</li>
    <li>IgG antibodies cross placenta = passive immunity for baby (lasts 3-6 months after birth)</li>
    <li>Weight of placenta at term = ~500 gm | Diameter = ~20 cm</li>
    <li>Placental insufficiency causes IUGR (baby doesn't grow properly)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Think of the placenta as a "hotel room service" for the baby. Room service brings food (nutritive), fresh air (respiratory), takes away garbage (excretory), has a security guard at the door (protective barrier), sends messages to the hotel management (endocrine), keeps a mini-fridge stocked (storage), and gives the baby a temporary security badge (immunological/IgG transfer). But the security guard isn't perfect — some bad guys (viruses like Rubella, HIV) can sneak past!
</div>`
  },

  // Q18 (id:18) - Types of Placental Separation
  18: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Placental Separation</div>
  <div class="mnemonic-word"><span>S</span>chultze = <span>S</span>hiny | <span>D</span>uncan = <span>D</span>irty</div>
  <div class="mnemonic-explain">
    <strong>S</strong>chultze = <strong>S</strong>hiny (fetal) side appears first = Centre separation = 80% = Safer<br>
    <strong>D</strong>uncan = <strong>D</strong>irty (maternal/raw) side appears first = Edge separation = 20% = More bleeding
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Schultze (80%) = Centre first = Shiny/fetal side = Less bleeding = Safer = Complete</li>
    <li>Duncan (20%) = Edge first = Dirty/maternal side = More bleeding = Risk of retained bits</li>
    <li>Signs of separation: GUSH = Globular uterus, Uterus rises, Sudden blood, Hanging cord lengthens</li>
    <li>AMTSL = Oxytocin within 1 min + Controlled Cord Traction + Uterine massage</li>
    <li>AMTSL reduces PPH risk by 60%</li>
    <li>Cord clamp test: push uterus up — if cord retracts, placenta NOT separated; if stays, it IS separated</li>
    <li>3rd stage of labour = from baby's birth to placenta delivery (should be <30 minutes)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Imagine peeling a sticker off a surface. If you peel from the CENTRE (like lifting an umbrella), it comes off cleanly in one piece — that's Schultze (shiny side up, clean, complete). But if you peel from the EDGE (sliding it off sideways), it often tears and leaves bits behind — that's Duncan (messy side up, bits may remain, more bleeding). That's why Schultze is safer!
</div>`
  },

  // Q19 (id:19) - Amniotic Fluid
  19: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for Functions of Amniotic Fluid</div>
  <div class="mnemonic-word"><span>P</span>-<span>T</span>-<span>M</span>-<span>A</span>-<span>L</span>-<span>S</span>-<span>U</span>-<span>C</span></div>
  <div class="mnemonic-explain">
    <strong>P</strong> = Protection (shock absorber)<br>
    <strong>T</strong> = Temperature regulation<br>
    <strong>M</strong> = Movement allowed (muscle development)<br>
    <strong>A</strong> = Adhesion prevention<br>
    <strong>L</strong> = Lung development (baby "breathes" fluid)<br>
    <strong>S</strong> = Swallowing practice (GI development)<br>
    <strong>U</strong> = Umbilical cord protection<br>
    <strong>C</strong> = Cervix dilation during labour (fluid wedge)
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Colour: Clear, pale straw | pH: 7.0-7.25 (slightly alkaline)</li>
    <li>Volume peaks at 36-38 weeks = 800-1000 ml, then decreases</li>
    <li>Normal AFI = 8-24 cm</li>
    <li>Polyhydramnios (too much) >2000 ml: causes = diabetes, twins, anencephaly, esophageal atresia</li>
    <li>Oligohydramnios (too little) <300 ml: causes = renal agenesis, IUGR, post-term, PROM</li>
    <li>Baby swallows ~500 ml/day and urinates ~600 ml/day of amniotic fluid</li>
    <li>Green fluid = meconium = fetal distress (EMERGENCY!)</li>
    <li>Golden fluid = Rh incompatibility (bilirubin)</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Think of amniotic fluid as the baby's personal swimming pool inside the womb. The pool water (1) acts as a cushion if mom falls (protection), (2) keeps the pool at a constant warm temperature, (3) lets the baby swim and exercise (muscle development), (4) prevents the baby's fingers and toes from sticking together (no adhesions). The baby even drinks the pool water (practice swallowing) and "breathes" it in and out (lung exercise). Too much water (polyhydramnios) or too little (oligohydramnios) signals something is wrong with the baby.
</div>`
  },

  // Q20 (id:20) - Functions of AF for Fetus
  20: {
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Amniotic fluid = essential for FETAL survival, growth, and organ development</li>
    <li>Lung development: baby "breathes" fluid in and out (fetal breathing movements)</li>
    <li>Without fluid = pulmonary hypoplasia (underdeveloped lungs) — baby can die</li>
    <li>GI development: fetus swallows fluid from 12 weeks (practices for feeding after birth)</li>
    <li>Musculoskeletal: free movement in fluid is essential for bone and muscle development</li>
    <li>Potter syndrome = renal agenesis = no urine = no amniotic fluid = compressed limbs + flat face</li>
    <li>Fetal breathing movements = part of Biophysical Profile (BPP) — indicates fetal well-being</li>
    <li>Cord protection: fluid keeps cord floating, prevents compression</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> Imagine keeping a goldfish in a bowl WITH water vs WITHOUT water. With water, the fish can swim freely, its fins develop properly, it stays warm, and nothing sticks to it. Without water — the fish gets crushed, can't move, can't breathe, and dies. Amniotic fluid does the same thing for the baby! A baby with very low amniotic fluid (oligohydramnios) can develop "Potter facies" — a flat, squished face with compressed limbs — just like a fish without water.
</div>`
  },

  // Q21 (id:21) - Clinical Significance of AF Assessment
  21: {
    mnemonic: `
<div class="mnemonic-box">
  <div class="mnemonic-label">Mnemonic for AF Colour Meaning</div>
  <div class="mnemonic-word"><span>C</span>-<span>G</span>-<span>G</span>-<span>B</span>-<span>D</span></div>
  <div class="mnemonic-explain">
    <strong>C</strong> = Clear = Normal (no worries)<br>
    <strong>G</strong> = Green = Meconium = Fetal distress (EMERGENCY)<br>
    <strong>G</strong> = Golden = Rh incompatibility (bilirubin)<br>
    <strong>B</strong> = Blood-stained = Abruption/trauma<br>
    <strong>D</strong> = Dark brown = Fetal death (old blood)
  </div>
</div>`,
    remember: `
<div class="remember-box">
  <div class="remember-title">Quick Revision — Things to Remember</div>
  <ul>
    <li>Normal AFI = 8-24 cm | Oligo = <5 cm | Poly = >25 cm</li>
    <li>SDP (Single Deepest Pocket): Normal = 2-8 cm</li>
    <li>L/S ratio ≥ 2:1 = lungs mature (important before preterm delivery)</li>
    <li>Amniocentesis tests: chromosomes (Down syndrome), AFP (neural tube defects), bilirubin (Rh), L/S ratio</li>
    <li>Green AF = meconium = prepare for neonatal resuscitation IMMEDIATELY</li>
    <li>Foul-smelling AF = chorioamnionitis (infection) = IV antibiotics + urgent delivery</li>
    <li>AFP high in AF = neural tube defects (spina bifida, anencephaly)</li>
    <li>Fetal fibronectin in vaginal fluid after 22 weeks = risk of preterm labour</li>
  </ul>
</div>`,
    example: `
<div class="editorial-example">
  <strong>Relatable Example:</strong> During labour, the nurse ruptures the membranes and notices the fluid is GREEN. She immediately knows this means the baby has passed meconium (stool) — a sign of fetal distress, like the baby saying "I'm in trouble!" She calls the doctor, starts continuous fetal heart monitoring, prepares the suction machine and oxygen for when the baby is born (in case baby inhales the meconium), and keeps the neonatal resuscitation team on standby. The COLOR of amniotic fluid can literally tell you whether the baby is okay or in danger.
</div>`
  }
};

// ─── Inject enhancements into data.js ───
let unit1Content = fs.readFileSync('data.js', 'utf8');

for (const [id, enhancement] of Object.entries(unit1Enhancements)) {
  // Find the conclusion box for this question and inject before it
  const conclusionPattern = new RegExp(
    `(<!-- Q${id} ENHANCED -->)`,
    'g'
  );
  
  // Instead, inject before the conclusion section of each answer
  // We'll inject right before the closing backtick of each answer
  // Find pattern: </div>\n\` for each question's end
}

// More reliable approach: inject before each answer's conclusion-box
// We'll use the question IDs to find boundaries
function injectBeforeConclusion(content, questionId, enhancement) {
  // Find the question object boundary
  const idPattern = `id: ${questionId},`;
  const idIndex = content.indexOf(idPattern);
  if (idIndex === -1) return content;
  
  // Find the conclusion section after this ID
  const afterId = content.substring(idIndex);
  
  // Find the FIRST conclusion-box after this ID
  const conclusionIndex = afterId.indexOf('<h3 class="answer-section-title teal-title">Conclusion</h3>');
  if (conclusionIndex === -1) return content;
  
  // Find the answer-section div opening before conclusion
  const beforeConclusion = afterId.substring(0, conclusionIndex);
  const lastSectionOpen = beforeConclusion.lastIndexOf('<div class="answer-section">');
  if (lastSectionOpen === -1) return content;
  
  // The injection point is right before the conclusion's answer-section div
  const globalInsertIndex = idIndex + lastSectionOpen;
  
  // Build injection string
  let injection = '';
  if (enhancement.mnemonic) injection += enhancement.mnemonic + '\n';
  if (enhancement.example) injection += enhancement.example + '\n';
  if (enhancement.remember) injection += enhancement.remember + '\n';
  
  return content.substring(0, globalInsertIndex) + injection + '\n' + content.substring(globalInsertIndex);
}

// Process Unit 1
for (const [id, enhancement] of Object.entries(unit1Enhancements)) {
  unit1Content = injectBeforeConclusion(unit1Content, parseInt(id), enhancement);
}
fs.writeFileSync('data.js', unit1Content);
console.log('Unit 1 enhanced!');

// ─── Inject enhancements into data-unit2.js ───
let unit2Content = fs.readFileSync('data-unit2.js', 'utf8');

for (const [id, enhancement] of Object.entries(unit2Enhancements)) {
  unit2Content = injectBeforeConclusion(unit2Content, parseInt(id), enhancement);
}
fs.writeFileSync('data-unit2.js', unit2Content);
console.log('Unit 2 enhanced!');
