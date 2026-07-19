/* ============================================================================
   MEMORY KITS — PART 5a : ★ Foundations (1-star)
   ============================================================================ */
(function () {
    var K = window.MEMORY_KITS;

    /* ---- Maternal mortality & morbidity (IDs 1,2,3,4) ---- */
    var kitMM = {
        lines: [
            "<b>Maternal mortality</b> = death of a woman from pregnancy-related causes during pregnancy or within <b>42 days</b> of delivery.",
            "The <b>#1 killer is haemorrhage (bleeding)</b>.",
            "Other causes: <b>hypertension (PIH/eclampsia), sepsis, obstructed labour, unsafe abortion</b>.",
            "Most deaths are <b>preventable</b> with timely care.",
            "The nurse's role: early ANC, risk detection, clean delivery, referral and emergency care."
        ],
        story: "Maternal mortality is a <b>list of villains</b> that stalk a pregnant woman. The <b>boss villain is Bleeding (haemorrhage)</b> — it kills the most mothers. Its gang members are <b>High BP (eclampsia)</b>, <b>Infection (sepsis)</b>, <b>a stuck baby (obstructed labour)</b> and <b>unsafe abortion</b>. The tragic secret: <b>almost all of these can be stopped</b> if a skilled nurse catches them early. The nurse is the <b>bodyguard</b> — registering the mother early, spotting danger signs, ensuring a clean delivery, and rushing her to help before a villain strikes.",
        mnemonic: {
            word: "H-E-S-O-A",
            parts: ["H = Haemorrhage (top cause)", "E = Eclampsia/HTN", "S = Sepsis", "O = Obstructed labour", "A = Abortion (unsafe)"],
            local: "“Sabse bada kaatil = Bleeding. 42 din ke andar ki maut = maternal mortality.”"
        },
        palace: "A **wanted poster of 5 villains**: a **blood drop (haemorrhage)** in the centre, a **BP cuff (eclampsia)**, **germs (sepsis)**, a **stuck baby (obstructed)**, a **broken syringe (abortion)**. A **nurse as a bodyguard** shielding a mother.",
        terms: [
            ["Maternal mortality", "Death within 42 days of delivery"],
            ["Haemorrhage", "The #1 killer"],
            ["Sepsis", "Infection after delivery/abortion"],
            ["42 days", "The counting window"]
        ],
        diagram:
"   MATERNAL MORTALITY (<42 days)\n" +
"   1 HAEMORRHAGE (top)\n" +
"   2 Eclampsia/HTN\n" +
"   3 Sepsis\n" +
"   4 Obstructed labour\n" +
"   5 Unsafe abortion\n" +
"   MOST are PREVENTABLE",
        dcap: "Bleeding is #1 · most preventable",
        why: [
            "Haemorrhage kills fastest and is commonest, which is why AMTSL and early referral save the most lives.",
            "The 'three delays' — deciding to seek care, reaching care, receiving care — explain most preventable deaths.",
            "Skilled birth attendance and emergency obstetric care address the exact moments where mothers die."
        ],
        recall: "Maternal mortality = death within 42 days. <b>Causes H-E-S-O-A: Haemorrhage (top), Eclampsia, Sepsis, Obstructed labour, Abortion.</b> Most preventable; nurse = early detection & referral.",
        viva: [
            "Define maternal mortality and its time window.",
            "What is the leading cause of maternal death?",
            "List three other causes of maternal mortality.",
            "Why are most maternal deaths preventable?",
            "What is the nurse's role in reducing maternal mortality?"
        ],
        mcq: [
            { q: "Maternal mortality is counted up to how many days after delivery?", opts: ["7 days", "28 days", "42 days", "365 days"], a: 2 },
            { q: "The leading cause of maternal mortality is:", opts: ["Sepsis", "Haemorrhage", "Eclampsia", "Obstructed labour"], a: 1 },
            { q: "Which is NOT a direct cause of maternal death?", opts: ["Haemorrhage", "Sepsis", "Anaemia (indirect)", "Eclampsia"], a: 2 },
            { q: "Most maternal deaths are:", opts: ["Unavoidable", "Preventable", "Due to cancer", "Accidental"], a: 1 },
            { q: "The 'three delays' model explains:", opts: ["Labour stages", "Preventable maternal deaths", "Fetal growth", "Breastfeeding"], a: 1 }
        ],
        drill: ["Maternal mortality", "42 days", "Haemorrhage #1", "Eclampsia", "Sepsis", "Obstructed labour", "Preventable"]
    };
    K[1] = kitMM;
    K[2] = kitMM;
    K[3] = kitMM;
    K[4] = kitMM;

    /* ---- Role of nurse in midwifery (ID 5) ---- */
    K[5] = {
        lines: [
            "A nurse-midwife <b>independently manages normal pregnancies and deliveries</b>.",
            "She <b>refers complications</b> to doctors.",
            "She works across <b>3 stages: antenatal, intranatal, postnatal</b>.",
            "She is a <b>caregiver, educator, counsellor, and advocate</b>.",
            "Her goal: a <b>safe mother and a healthy baby</b>."
        ],
        story: "A nurse-midwife is the <b>captain of the normal-delivery ship</b>. For straightforward pregnancies she steers the whole voyage herself — <b>checking the mother before birth (antenatal)</b>, <b>guiding her through labour (intranatal)</b>, and <b>caring for both after (postnatal)</b>. But the moment <b>storm clouds (complications)</b> appear, she wisely <b>radioes for the coastguard (doctor)</b>. She wears many hats — <b>carer, teacher, counsellor and the mother's voice</b> — all for one treasure: a <b>safe mother and a healthy baby</b>.",
        mnemonic: {
            word: "A-I-P",
            parts: ["A = Antenatal care", "I = Intranatal (labour) care", "P = Postnatal care"],
            local: "Roles — “Care karwao, Educate karo, Counsel karo, Advocate bano.”"
        },
        palace: "A **ship captain (nurse)** steering through **3 ports**: **Antenatal**, **Intranatal**, **Postnatal**. She **radioes the doctor** when a storm appears. She wears **4 hats**: caregiver, educator, counsellor, advocate.",
        terms: [
            ["Nurse-midwife", "Independent normal-care provider"],
            ["Antenatal", "Before birth"],
            ["Intranatal", "During labour"],
            ["Postnatal", "After birth"],
            ["Referral", "Calling the doctor for complications"]
        ],
        diagram:
"   NURSE-MIDWIFE role\n" +
"   ANTENATAL  check & educate\n" +
"   INTRANATAL conduct delivery\n" +
"   POSTNATAL  mother+baby care\n" +
"   = caregiver,educator,counsellor\n" +
"   normal=independent | abnormal=refer",
        dcap: "A-I-P care · refer complications",
        why: [
            "Most pregnancies are normal, so a trained midwife managing them frees doctors for complications and improves access.",
            "Continuity across antenatal-intranatal-postnatal stages means danger signs are caught by someone who knows the mother's baseline.",
            "Education and counselling address the behavioural factors (diet, hygiene, danger-sign recognition) that determine outcomes."
        ],
        recall: "Nurse-midwife = independently manages normal pregnancy/delivery, refers complications. <b>Stages A-I-P. Roles: caregiver, educator, counsellor, advocate.</b>",
        viva: [
            "What is the role of a nurse in midwifery?",
            "Across which three stages does a midwife work?",
            "When does a midwife refer to a doctor?",
            "Name the different roles of a nurse-midwife.",
            "What is the ultimate goal of midwifery care?"
        ],
        mcq: [
            { q: "A nurse-midwife independently manages:", opts: ["All pregnancies", "Normal pregnancies", "Only C-sections", "Only emergencies"], a: 1 },
            { q: "The three stages of midwifery care are antenatal, intranatal and:", opts: ["Prenatal", "Postnatal", "Perinatal", "Neonatal"], a: 1 },
            { q: "A complication should be:", opts: ["Managed by the midwife alone", "Referred to a doctor", "Ignored", "Treated at home"], a: 1 },
            { q: "Which is a role of the nurse-midwife?", opts: ["Surgeon", "Educator and counsellor", "Anaesthetist", "Radiologist"], a: 1 },
            { q: "The goal of midwifery care is:", opts: ["Only baby's health", "Safe mother and healthy baby", "Only mother's health", "Hospital profit"], a: 1 }
        ],
        drill: ["Nurse-midwife", "Antenatal", "Intranatal", "Postnatal", "Refer", "Educator", "Safe mother & baby"]
    };

    /* ---- Menstrual cycle (ID 14) ---- */
    K[14] = {
        lines: [
            "The <b>menstrual cycle</b> is a ~<b>28-day</b> hormonal loop preparing the uterus for pregnancy.",
            "4 phases: <b>Menstrual (1–5), Proliferative (6–14), Ovulation (~14), Secretory (15–28)</b>.",
            "<b>FSH</b> grows the follicle; <b>oestrogen</b> builds the lining; <b>LH surge</b> triggers ovulation; <b>progesterone</b> maintains the lining.",
            "If no pregnancy, hormones fall and the lining sheds (period).",
            "Ovulation (~day 14) is the fertile window."
        ],
        story: "The menstrual cycle is a <b>monthly garden cycle</b>. First the old garden is <b>cleared (menstrual, days 1–5)</b> — the lining sheds as a period. Then the gardener <b>FSH plants a seed (follicle)</b> and <b>oestrogen fertilises the soil</b> (proliferative phase, lining thickens). On <b>day 14 the LH alarm rings</b> and the <b>ripe fruit (egg) drops — ovulation</b>. After that, <b>progesterone keeps the soil rich and ready</b> (secretory phase) in case a seed (embryo) lands. If nothing lands, the garden is cleared again and the cycle restarts.",
        mnemonic: {
            word: "M-P-O-S",
            parts: ["M = Menstrual (1–5)", "P = Proliferative (6–14)", "O = Ovulation (~14)", "S = Secretory (15–28)"],
            local: "Hormones — “FSH beej boye, Oestrogen mitti, LH andaa giraaye, Progesterone sambhale.”"
        },
        palace: "A **garden**. A **broom clearing leaves (menstrual)**, a **seed planted by FSH** with **oestrogen watering**, an **LH bell ringing and a fruit dropping (ovulation, day 14)**, then **progesterone guarding the soil** till it dries and the cycle repeats.",
        terms: [
            ["Ovulation", "Egg release (~day 14)"],
            ["FSH", "Grows the follicle"],
            ["LH surge", "Triggers ovulation"],
            ["Progesterone", "Maintains the lining (secretory)"],
            ["Proliferative", "Lining-building phase"]
        ],
        diagram:
"   MENSTRUAL CYCLE (28 days)\n" +
"   1-5   MENSTRUAL (period)\n" +
"   6-14  PROLIFERATIVE (oestrogen)\n" +
"   ~14   OVULATION (LH surge)\n" +
"   15-28 SECRETORY (progesterone)\n" +
"   no pregnancy -> period again",
        dcap: "M-P-O-S · ovulation ~day 14",
        why: [
            "FSH stimulates follicular growth; the follicle secretes oestrogen which proliferates the endometrium.",
            "Rising oestrogen triggers the LH surge, which ruptures the mature follicle — ovulation.",
            "The corpus luteum secretes progesterone to make the lining secretory and receptive; without implantation it regresses, hormones fall, and menstruation follows."
        ],
        recall: "Menstrual cycle 28 days. <b>Phases M-P-O-S: Menstrual, Proliferative, Ovulation (~14), Secretory.</b> FSH→follicle, Oestrogen→lining, LH→ovulation, Progesterone→maintains.",
        viva: [
            "What is the normal length of the menstrual cycle?",
            "Name the four phases of the cycle.",
            "Which hormone triggers ovulation?",
            "What does progesterone do in the secretory phase?",
            "On which day does ovulation usually occur?"
        ],
        mcq: [
            { q: "Ovulation usually occurs around day:", opts: ["5", "10", "14", "28"], a: 2 },
            { q: "The hormone triggering ovulation is:", opts: ["FSH", "LH", "Oestrogen", "Progesterone"], a: 1 },
            { q: "The proliferative phase is driven by:", opts: ["Progesterone", "Oestrogen", "LH", "hCG"], a: 1 },
            { q: "The secretory phase is maintained by:", opts: ["Oestrogen", "FSH", "Progesterone", "Prolactin"], a: 2 },
            { q: "The menstrual phase lasts about days:", opts: ["1–5", "6–14", "15–28", "14–20"], a: 0 }
        ],
        drill: ["28 days", "Menstrual", "Proliferative", "Ovulation day 14", "Secretory", "FSH", "LH surge", "Progesterone"]
    };

    /* ---- Physiological changes in pregnancy (IDs 23,24,25,26,35) ---- */
    var kitPhysio = {
        lines: [
            "Pregnancy changes every system to support the baby.",
            "<b>Reproductive:</b> uterus grows hugely, breasts enlarge, cervix softens.",
            "<b>Cardiovascular:</b> blood volume rises <b>40–50%</b>, cardiac output rises <b>30–50%</b>, heart rate +10–15 bpm.",
            "<b>Skin:</b> pigmentation — <b>linea nigra, chloasma (mask), striae (stretch marks)</b>.",
            "<b>First trimester:</b> rising hCG causes <b>nausea/vomiting</b>, tender breasts, frequent urination, fatigue."
        ],
        story: "Pregnancy turns the mother's body into a <b>construction site working overtime</b>. The <b>uterus balloons</b> from a fist to a watermelon. The <b>heart pumps like a factory adding a second shift</b> — nearly <b>half again as much blood</b> and output to feed the growing baby. The <b>skin becomes a notice-board</b> painted with a <b>dark line down the belly (linea nigra)</b>, a <b>tan mask on the face (chloasma)</b> and <b>stretch-mark ribbons (striae)</b>. In the <b>first trimester</b>, the new hormone <b>hCG acts like a strong perfume</b> that makes the mother <b>queasy, exhausted and constantly running to the toilet</b>.",
        mnemonic: {
            word: "40-50-15",
            parts: ["40–50% = blood volume rise", "30–50% = cardiac output rise", "10–15 bpm = heart rate rise"],
            local: "Skin — “Linea nigra (pet pe line), Chloasma (chehra mask), Striae (stretch marks).”"
        },
        palace: "A **ballooning uterus**, a **heart with a second gear**, a **belly painted with a dark line**, a **face wearing a tan mask**, and a **queasy mother** near a toilet with an **hCG perfume bottle**.",
        terms: [
            ["Linea nigra", "Dark line down the belly"],
            ["Chloasma", "The pregnancy 'mask' on the face"],
            ["Striae", "Stretch marks"],
            ["hCG nausea", "First-trimester morning sickness"]
        ],
        diagram:
"   PHYSIOLOGICAL CHANGES\n" +
"   uterus grows, breasts enlarge\n" +
"   CVS: vol +40-50%, CO +30-50%, HR +15\n" +
"   SKIN: linea nigra,chloasma,striae\n" +
"   1st trimester: hCG -> nausea,fatigue",
        dcap: "Volume +40-50% · skin pigmentation",
        why: [
            "Blood volume expands to perfuse the placenta and prepare for delivery blood loss.",
            "Cardiac output and heart rate rise to meet the increased metabolic demand of mother and fetus.",
            "Melanocyte-stimulating hormones cause the characteristic pigmentation (linea nigra, chloasma).",
            "Rising hCG in the first trimester stimulates the vomiting centre → nausea of early pregnancy."
        ],
        recall: "Pregnancy changes: <b>uterus/breasts grow; CVS volume +40–50%, CO +30–50%, HR +10–15; skin = linea nigra, chloasma, striae; 1st trimester hCG nausea.</b>",
        viva: [
            "By how much does blood volume rise in pregnancy?",
            "Name two skin changes in pregnancy.",
            "What causes nausea in the first trimester?",
            "What is chloasma?",
            "How much does cardiac output rise in pregnancy?"
        ],
        mcq: [
            { q: "Blood volume in pregnancy rises by about:", opts: ["10%", "25%", "40–50%", "100%"], a: 2 },
            { q: "The dark line on the pregnant abdomen is:", opts: ["Chloasma", "Linea nigra", "Striae", "Melasma"], a: 1 },
            { q: "The pregnancy 'mask' on the face is called:", opts: ["Linea nigra", "Chloasma", "Striae gravidarum", "Acne"], a: 1 },
            { q: "First-trimester nausea is mainly due to:", opts: ["Progesterone", "hCG", "Oxytocin", "Prolactin"], a: 1 },
            { q: "Heart rate in pregnancy rises by about:", opts: ["2 bpm", "10–15 bpm", "40 bpm", "60 bpm"], a: 1 }
        ],
        drill: ["Volume +40-50%", "Cardiac output +30-50%", "Linea nigra", "Chloasma", "Striae", "hCG nausea"]
    };
    K[23] = kitPhysio;
    K[24] = kitPhysio;
    K[25] = kitPhysio;
    K[26] = kitPhysio;
    K[35] = kitPhysio;

    /* ---- Diet in pregnancy (IDs 33, 93) ---- */
    var kitDiet = {
        lines: [
            "A pregnant woman needs a <b>balanced diet plus extra nutrients</b> for the baby.",
            "She needs about <b>+350 kcal/day</b> in the 2nd & 3rd trimesters.",
            "Key nutrients: <b>protein, iron, calcium, folic acid, vitamins</b>.",
            "<b>Folic acid</b> prevents neural tube defects; <b>iron</b> prevents anaemia.",
            "Advise small, frequent, iron-rich meals + iron-folic acid supplements."
        ],
        story: "Eating for pregnancy is NOT <b>“eating for two adults”</b> — it's <b>“eating for one adult plus a tiny construction site”</b>. The baby needs just <b>one extra roti's worth (~350 kcal)</b> a day, not double portions. What matters is <b>quality building material</b>: <b>protein = bricks</b> for the baby's body, <b>iron = steel rods</b> for blood, <b>calcium = cement</b> for bones, and <b>folic acid = the architect's plan</b> that prevents spinal defects. The mother is told to eat <b>small frequent meals</b> and take her <b>iron-folic acid tablets</b> like a daily duty.",
        mnemonic: {
            word: "P-I-C-F",
            parts: ["P = Protein (body bricks)", "I = Iron (blood, prevent anaemia)", "C = Calcium (bones)", "F = Folic acid (prevent neural defects)"],
            local: "“Sirf 350 kcal extra — do guna NAHI. IFA golī roz.”"
        },
        palace: "A **plate with one extra roti (+350 kcal)**. Four labelled sacks: **protein bricks**, **iron rods**, **calcium cement**, **folic acid blueprint**. A daily **IFA tablet jar**.",
        terms: [
            ["+350 kcal", "The small extra energy needed"],
            ["Folic acid", "Prevents neural tube defects"],
            ["Iron", "Prevents anaemia"],
            ["IFA", "Iron-folic acid supplement"]
        ],
        diagram:
"   DIET IN PREGNANCY\n" +
"   +350 kcal/day (2nd,3rd trimester)\n" +
"   Protein | Iron | Calcium | Folic acid\n" +
"   folic acid -> no neural defects\n" +
"   iron -> no anaemia | IFA daily",
        dcap: "+350 kcal · P-I-C-F nutrients",
        why: [
            "Energy needs rise modestly (~350 kcal) because the fetus is small; overeating causes obesity, not a healthier baby.",
            "Folic acid in early pregnancy closes the neural tube, preventing spina bifida.",
            "Iron demand rises for expanded maternal blood volume and fetal stores, so supplementation prevents anaemia."
        ],
        recall: "Pregnancy diet = <b>+350 kcal/day, balanced.</b> Nutrients <b>P-I-C-F: Protein, Iron, Calcium, Folic acid.</b> Folic acid prevents neural defects; iron prevents anaemia; daily IFA.",
        viva: [
            "How many extra calories does a pregnant woman need?",
            "Which vitamin prevents neural tube defects?",
            "Why is iron important in pregnancy?",
            "Name the key nutrients needed in pregnancy.",
            "What does IFA stand for?"
        ],
        mcq: [
            { q: "Extra energy needed in pregnancy is about:", opts: ["100 kcal", "350 kcal", "800 kcal", "1500 kcal"], a: 1 },
            { q: "Folic acid prevents:", opts: ["Anaemia", "Neural tube defects", "Diabetes", "PIH"], a: 1 },
            { q: "Iron in pregnancy prevents:", opts: ["Neural defects", "Anaemia", "Rickets", "Jaundice"], a: 1 },
            { q: "Calcium in pregnancy is needed for:", opts: ["Blood", "Baby's bones", "Skin", "Hair"], a: 1 },
            { q: "IFA supplementation contains:", opts: ["Iron and vitamin C", "Iron and folic acid", "Iodine and folate", "Calcium and iron"], a: 1 }
        ],
        drill: ["+350 kcal", "Protein", "Iron", "Calcium", "Folic acid", "IFA", "Small frequent meals"]
    };
    K[33] = kitDiet;
    K[93] = kitDiet;

    /* ---- Fetal skull + fontanels (IDs 37, 75) ---- */
    var kitSkull = {
        lines: [
            "The fetal skull is the <b>largest, least compressible part</b> of the baby — key in delivery.",
            "Made of <b>soft bones joined by sutures</b>, with <b>fontanelles (soft spots)</b> at the junctions.",
            "<b>Anterior fontanelle</b> (diamond, closes ~18 months); <b>posterior</b> (triangle, closes ~2 months).",
            "Sutures & fontanelles allow <b>moulding</b> — the head reshapes to pass through the pelvis.",
            "Fontanelles help <b>identify position</b> during labour and allow brain growth."
        ],
        story: "The fetal skull is cleverly designed like a <b>crash helmet made of separate plates</b>, not one solid shell. The plates (bones) are joined by <b>flexible seams (sutures)</b>, and where seams meet there are <b>soft spots (fontanelles)</b> — a big <b>diamond on the front</b> and a small <b>triangle at the back</b>. This lets the helmet <b>squash and overlap (moulding)</b> so the big head can squeeze through the narrow pelvis without breaking. After birth the soft spots stay open so the <b>brain can grow</b> — and the nurse uses them to <b>tell which way the baby is lying</b> and to <b>check hydration</b> (a sunken fontanelle = dehydration).",
        mnemonic: {
            word: "D-T",
            parts: ["D = Diamond Anterior fontanelle (closes ~18 months)", "T = Triangle Posterior fontanelle (closes ~2 months)"],
            local: "“Fontanelle se moulding hoti hai, position pata chalti hai, dimaag badhta hai.”"
        },
        palace: "A **crash helmet of separate plates**. A **big diamond on top-front** and a **small triangle at the back**. The helmet **squashes through a narrow ring (pelvis)**. A **calendar showing 18 months (front) and 2 months (back)**.",
        terms: [
            ["Fontanelle", "Soft spot where sutures meet"],
            ["Anterior fontanelle", "Big diamond — closes ~18 months"],
            ["Posterior fontanelle", "Small triangle — closes ~2 months"],
            ["Moulding", "Head reshaping to fit the pelvis"],
            ["Sutures", "Flexible seams between skull bones"]
        ],
        diagram:
"   FETAL SKULL\n" +
"      (diamond) ANTERIOR fontanelle\n" +
"   sutures: sagittal|coronal|lambdoid\n" +
"      (triangle) POSTERIOR font.\n" +
"   allow MOULDING + brain growth\n" +
"   anterior closes 18m, posterior 2m",
        dcap: "Diamond front 18m · triangle back 2m",
        why: [
            "Unossified bones and open sutures let the skull bones overlap (moulding), reducing head diameter to fit the birth canal.",
            "The anterior fontanelle (occiput/vertex landmark) helps the examiner determine fetal position by vaginal examination.",
            "Open fontanelles accommodate rapid brain growth in the first 18 months of life."
        ],
        recall: "Fetal skull = soft bones + sutures + fontanelles. <b>Anterior = diamond (closes 18 m), Posterior = triangle (closes 2 m).</b> Allow moulding, identify position, permit brain growth.",
        viva: [
            "What are fontanelles and why are they important?",
            "When does the anterior fontanelle close?",
            "When does the posterior fontanelle close?",
            "What is moulding?",
            "How do fontanelles help during labour?"
        ],
        mcq: [
            { q: "The anterior fontanelle is shaped like a:", opts: ["Triangle", "Diamond", "Circle", "Square"], a: 1 },
            { q: "The anterior fontanelle closes by about:", opts: ["2 months", "6 months", "18 months", "3 years"], a: 2 },
            { q: "The posterior fontanelle closes by about:", opts: ["2 months", "18 months", "2 years", "5 years"], a: 0 },
            { q: "Moulding refers to:", opts: ["Skull fracture", "Reshaping of the fetal head during delivery", "Brain growth", "Hair growth"], a: 1 },
            { q: "A sunken fontanelle in a newborn suggests:", opts: ["Overfeeding", "Dehydration", "Fever", "Jaundice"], a: 1 }
        ],
        drill: ["Anterior diamond 18m", "Posterior triangle 2m", "Sutures", "Moulding", "Soft spots", "Position check"]
    };
    K[37] = kitSkull;
    K[75] = kitSkull;

    /* ---- PNC care & exercises & lochia & involution (IDs 62,63,64,68) ---- */
    var kitPNC = {
        lines: [
            "<b>Postnatal care</b> = care of mother and baby from delivery up to <b>6 weeks</b>.",
            "Objectives: help the mother <b>recover, prevent/detect complications, support breastfeeding, give health education</b>.",
            "<b>Involution</b> = uterus shrinking from ~<b>1000 g to ~60 g</b> over 6 weeks, assessed by falling fundal height.",
            "<b>Lochia</b> = post-delivery discharge changing <b>rubra (red) → serosa (pink) → alba (white)</b>.",
            "<b>Postnatal exercises</b> (abdominal & pelvic floor) restore muscle tone and prevent prolapse/backache."
        ],
        story: "The 6 weeks after delivery is the mother's <b>“service & repair” period</b>. The nurse tracks three meters. The <b>uterus is a shrinking balloon</b> — from a big 1 kg watermelon back to a 60 g fist (involution), and the nurse feels it <b>sink lower each day</b>. The <b>lochia is a traffic-light discharge</b> — starts <b>red (rubra)</b>, turns <b>pink (serosa)</b>, then <b>white (alba)</b> as the wound heals; if it stays red or smells foul, something's wrong. And <b>postnatal exercises</b> are like <b>tightening the loose belt and trampoline</b> — gentle tummy and pelvic-floor squeezes that stop the belly sagging and prevent the womb from dropping later (prolapse).",
        mnemonic: {
            word: "R-S-A",
            parts: ["R = Rubra (red, days 1–4)", "S = Serosa (pink, days 5–10)", "A = Alba (white, up to 3–6 weeks)"],
            local: "Involution — “Uterus 1000 g se 60 g, roz neeche. Exercises se pet aur pelvic floor majboot.”"
        },
        palace: "A **shrinking balloon (uterus) sinking daily**. A **traffic light of discharge: red → pink → white**. A **mother doing gentle tummy squeezes and Kegels** on a mat.",
        terms: [
            ["Involution", "Uterus shrinking 1000 g → 60 g"],
            ["Lochia rubra", "Red discharge (early)"],
            ["Lochia serosa", "Pink discharge (mid)"],
            ["Lochia alba", "White discharge (late)"],
            ["Pelvic floor exercise", "Kegels to prevent prolapse"]
        ],
        diagram:
"   POSTNATAL recovery\n" +
"   involution: 1000g -> 60g (6 wk)\n" +
"   lochia: RUBRA red -> SEROSA pink\n" +
"           -> ALBA white\n" +
"   exercises: abs + pelvic floor (Kegel)",
        dcap: "Involution · lochia R-S-A · exercises",
        why: [
            "Involution occurs by autolysis and ischaemia of the myometrium; the fundus descends ~1 cm/day and is a key sign of recovery.",
            "The colour change of lochia reflects the healing of the placental site — persistent red or foul lochia signals retained tissue or infection.",
            "Pregnancy and delivery stretch the abdominal and pelvic floor muscles; exercises restore tone and prevent prolapse and back pain."
        ],
        recall: "PNC = care to 6 weeks. <b>Involution 1000 g→60 g. Lochia: rubra(red)→serosa(pink)→alba(white). Exercises = abs + pelvic floor.</b> Objectives: recover, detect complications, support BF, educate.",
        viva: [
            "Define postnatal care and its duration.",
            "What is involution and how is it assessed?",
            "Name the three types of lochia in order.",
            "Why are postnatal exercises important?",
            "What does foul-smelling lochia suggest?"
        ],
        mcq: [
            { q: "The uterus returns to about what weight by 6 weeks?", opts: ["1000 g", "500 g", "60 g", "250 g"], a: 2 },
            { q: "The correct order of lochia is:", opts: ["Alba, serosa, rubra", "Rubra, serosa, alba", "Serosa, alba, rubra", "Rubra, alba, serosa"], a: 1 },
            { q: "Lochia alba is:", opts: ["Red", "Pink", "White", "Green"], a: 2 },
            { q: "Postnatal exercises mainly strengthen:", opts: ["Arms", "Abdominal and pelvic floor muscles", "Legs", "Neck"], a: 1 },
            { q: "Foul-smelling lochia indicates:", opts: ["Normal healing", "Infection", "Good involution", "Lactation"], a: 1 }
        ],
        drill: ["PNC 6 wk", "Involution 1000-60 g", "Rubra", "Serosa", "Alba", "Pelvic floor", "Kegels"]
    };
    K[62] = kitPNC;
    K[63] = kitPNC;
    K[64] = kitPNC;
    K[68] = kitPNC;

})();
