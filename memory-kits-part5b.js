/* ============================================================================
   MEMORY KITS — PART 5b : ★ Investigations, High-risk & Gynae (1-star)
   ============================================================================ */
(function () {
    var K = window.MEMORY_KITS;

    /* ---- Antenatal investigations + visits (IDs 94,95,96,97,110) ---- */
    var kitANCtest = {
        lines: [
            "ANC screening uses <b>blood & urine tests</b> plus <b>fetal well-being tests</b>.",
            "<b>Biochemical tests</b>: Hb, blood group, sugar, urine, HIV/VDRL, HBsAg.",
            "<b>NST</b> = non-stress test — watches fetal heart rate rise with movement (a 'reactive' result is reassuring).",
            "<b>BPP</b> = biophysical profile — ultrasound + NST scoring <b>5 parameters, 0–2 each, max 10</b>.",
            "<b>Amniocentesis</b> = drawing amniotic fluid to test for genetic/chromosomal problems."
        ],
        story: "Checking on the baby is like a <b>multi-level security check</b>. The <b>blood & urine tests</b> are the mother's <b>ID and health papers</b> (Hb, sugar, infections). The <b>NST is a fitness tracker</b> on the baby — every time the baby kicks, its heart rate should <b>jump up happily</b>; if it does, the baby is fine. The <b>BPP is a full report card out of 10</b> — ultrasound watches the baby <b>breathe, move, flex, and checks the fluid</b>, plus the NST. And <b>amniocentesis</b> is the <b>detective's needle</b> that dips into the pool of fluid to read the baby's <b>genetic code</b> for problems like Down syndrome.",
        mnemonic: {
            word: "N-S-T-B-P-P",
            parts: ["NST = heart-rate fitness tracker", "BPP = 5-parameter report card /10", "Amniocentesis = genetic fluid test"],
            local: "BPP ke 5 — breathing, movement, tone, fluid, NST. Har ek 0 ya 2."
        },
        palace: "A **security checkpoint**. A **file of blood/urine reports**, a **fitness band beeping with each kick (NST)**, a **report card marked /10 (BPP)** with 5 columns, and a **needle drawing fluid** into a **DNA helix**.",
        terms: [
            ["NST", "Heart-rate reactivity test"],
            ["Reactive NST", "HR rises with movement — reassuring"],
            ["BPP", "5-parameter ultrasound + NST score /10"],
            ["Amniocentesis", "Needle sampling of amniotic fluid"]
        ],
        diagram:
"   FETAL WELL-BEING TESTS\n" +
"   NST: HR rises with kick = reactive\n" +
"   BPP: 5 params (breath,move,tone,\n" +
"        fluid,NST) 0-2 each, max 10\n" +
"   AMNIOCENTESIS: fluid for genetics",
        dcap: "NST reactive · BPP /10 · amnio genetics",
        why: [
            "A healthy fetus has an intact nervous system, so its heart accelerates with movement — the basis of a 'reactive' NST.",
            "BPP combines acute (NST, movement, breathing, tone) and chronic (fluid volume) markers, so a low score reliably predicts compromise.",
            "Amniotic fluid contains fetal cells, so amniocentesis allows chromosomal and genetic diagnosis."
        ],
        recall: "ANC tests: <b>blood/urine (Hb, sugar, infections); NST = HR rises with movement (reactive good); BPP = 5 parameters /10; amniocentesis = genetic fluid test.</b>",
        viva: [
            "What is a Non-Stress Test and what does 'reactive' mean?",
            "Name the five parameters of the biophysical profile.",
            "What is the maximum BPP score?",
            "What is amniocentesis used for?",
            "List two routine blood tests done in pregnancy."
        ],
        mcq: [
            { q: "A 'reactive' NST means:", opts: ["No fetal movement", "Fetal heart rate rises with movement", "High BP", "Low fluid"], a: 1 },
            { q: "The maximum BPP score is:", opts: ["5", "8", "10", "12"], a: 2 },
            { q: "Amniocentesis tests the fetus for:", opts: ["Anaemia", "Genetic/chromosomal problems", "Diabetes", "BP"], a: 1 },
            { q: "BPP combines ultrasound with:", opts: ["CT scan", "NST", "X-ray", "MRI"], a: 1 },
            { q: "A routine antenatal blood test is:", opts: ["Hb and blood group", "Liver biopsy", "Bone marrow", "ECG"], a: 0 }
        ],
        drill: ["NST reactive", "BPP /10", "5 parameters", "Amniocentesis", "Hb", "Blood group", "Sugar"]
    };
    K[94] = kitANCtest;
    K[95] = kitANCtest;
    K[96] = kitANCtest;
    K[97] = kitANCtest;
    K[110] = kitANCtest;

    /* ---- Bishop score (IDs 58, 202) ---- */
    var kitBishop = {
        lines: [
            "The <b>Bishop score</b> checks how <b>'ripe' (ready) the cervix is</b> for induction.",
            "It scores <b>5 features</b> of the cervix and baby.",
            "<b>5 P's: Position (station), Effacement, Dilatation, Consistency, cervical Position</b>.",
            "Score <b>≥6 = favourable</b> — go ahead with induction.",
            "Score <b><6 = unfavourable</b> — ripen the cervix first (prostaglandin)."
        ],
        story: "Before evicting the baby (induction), the doctor checks if the <b>door (cervix) is unlocked</b> using a <b>5-lock checklist — the Bishop score</b>. Is the baby's head <b>low (station)</b>? Is the door <b>thin (effacement)</b>? Is it <b>open (dilatation)</b>? Is it <b>soft (consistency)</b>? Is it pointing <b>forward (position)</b>? Each gets points. If the score totals <b>6 or more, the door is unlocked — induction will likely work</b>. Below 6, the door is still bolted, so the doctor first <b>softens it with prostaglandin gel</b>.",
        mnemonic: {
            word: "S-E-D-C-P",
            parts: ["S = Station of head", "E = Effacement", "D = Dilatation", "C = Consistency", "P = Position of cervix"],
            local: "“6 ya zyada = taiyaar. 6 se kam = pehle ripen karo.”"
        },
        palace: "A **door with 5 locks**. A **ruler measuring head station**, a **thinning door (effacement)**, an **opening gap (dilatation)**, a **softness test**, a **forward-pointing arrow (position)**. A **scoreboard showing 6 = green light**.",
        terms: [
            ["Bishop score", "Cervical-readiness checklist"],
            ["Effacement", "Thinning of the cervix"],
            ["Station", "How low the head is"],
            ["Favourable", "Score ≥6 — induce away"]
        ],
        diagram:
"   BISHOP SCORE (5 params)\n" +
"   Station | Effacement | Dilatation\n" +
"   Consistency | Position\n" +
"   >=6 = favourable -> induce\n" +
"   <6  = ripen first (PGE2)",
        dcap: "5 checks · ≥6 = induce",
        why: [
            "A soft, thin, dilated, anterior cervix with a low head is already part-way into labour, so induction succeeds.",
            "An unfavourable cervix resists oxytocin; ripening with prostaglandin first improves the score and the success rate."
        ],
        recall: "Bishop score = cervical readiness for induction. <b>5 params: Station, Effacement, Dilatation, Consistency, Position. ≥6 = favourable; <6 = ripen first.</b>",
        viva: [
            "What is the Bishop score used for?",
            "Name the five parameters of the Bishop score.",
            "What score is considered favourable?",
            "What is done if the score is unfavourable?",
            "Define effacement."
        ],
        mcq: [
            { q: "The Bishop score assesses:", opts: ["Fetal well-being", "Cervical readiness for induction", "Blood loss", "BP"], a: 1 },
            { q: "A favourable Bishop score is:", opts: ["≥2", "≥4", "≥6", "≥10"], a: 2 },
            { q: "Which is NOT a Bishop parameter?", opts: ["Effacement", "Dilatation", "Fetal heart rate", "Station"], a: 2 },
            { q: "An unfavourable cervix is first treated with:", opts: ["Oxytocin", "Prostaglandin gel", "C-section", "Antibiotics"], a: 1 },
            { q: "Effacement refers to cervical:", opts: ["Opening", "Thinning", "Softening", "Position"], a: 1 }
        ],
        drill: ["Bishop score", "Station", "Effacement", "Dilatation", "Consistency", "Position", "≥6 favourable"]
    };
    K[58] = kitBishop;
    K[202] = kitBishop;

    /* ---- Roll-over test (ID 142) ---- */
    K[142] = {
        lines: [
            "The <b>roll-over test</b> = a simple screening test for <b>pre-eclampsia risk</b>.",
            "BP is measured in the <b>left lateral position</b>, then after <b>rolling onto the back (supine)</b>.",
            "A rise in diastolic BP of <b>≥20 mmHg</b> is a <b>positive test</b>.",
            "Positive = higher risk of developing pre-eclampsia.",
            "It's a quick, cheap, clinic-based screening tool."
        ],
        story: "The roll-over test is a <b>“stress test” for a pregnant woman's blood pressure</b>. She lies on her <b>left side</b> (the relaxed position) and her BP is noted. Then she <b>rolls onto her back</b>, which makes the heavy uterus <b>squash the big blood vessels</b>. In a woman destined for pre-eclampsia, her <b>over-reactive vessels clamp down</b> and the <b>diastolic pressure jumps by 20 or more</b> — a warning flag that she's at risk. It's like <b>poking a sleeping snake</b> to see if it strikes.",
        mnemonic: {
            word: "20",
            parts: ["Roll from left-lateral to supine", "Diastolic rise ≥20 mmHg = positive (pre-eclampsia risk)"],
            local: "“Left side se peeth ke bal — BP 20 badha to khatra.”"
        },
        palace: "A woman **lying on her left side**, then **rolling onto her back**. A **BP cuff with the diastolic number jumping +20**, lighting up a **red warning flag**.",
        terms: [
            ["Roll-over test", "Pre-eclampsia screening test"],
            ["Left lateral", "The relaxed starting position"],
            ["Supine", "Lying on the back"],
            ["≥20 mmHg rise", "A positive (at-risk) result"]
        ],
        diagram:
"   ROLL-OVER TEST (pre-eclampsia)\n" +
"   BP in LEFT LATERAL -> then SUPINE\n" +
"   diastolic rises >=20 mmHg = POSITIVE\n" +
"   positive = at risk of pre-eclampsia",
        dcap: "Roll to back · +20 diastolic = risk",
        why: [
            "Turning supine compresses the vena cava and aorta; women with hyper-reactive vasculature (future pre-eclamptics) respond with an exaggerated diastolic rise.",
            "It is a cheap, non-invasive screening test usable in low-resource antenatal clinics."
        ],
        recall: "Roll-over test = pre-eclampsia screen. <b>BP left-lateral → supine; diastolic rise ≥20 mmHg = positive (at risk).</b>",
        viva: [
            "What is the roll-over test?",
            "How is the roll-over test performed?",
            "What is a positive roll-over test?",
            "Which condition does the roll-over test screen for?",
            "Why does rolling onto the back raise BP in at-risk women?"
        ],
        mcq: [
            { q: "The roll-over test screens for:", opts: ["Diabetes", "Pre-eclampsia", "Anaemia", "Twins"], a: 1 },
            { q: "The test starts with the woman in which position?", opts: ["Supine", "Left lateral", "Sitting", "Standing"], a: 1 },
            { q: "A positive roll-over test is a diastolic rise of:", opts: ["≥5 mmHg", "≥10 mmHg", "≥20 mmHg", "≥40 mmHg"], a: 2 },
            { q: "After the left lateral position, the woman rolls onto her:", opts: ["Right side", "Back (supine)", "Stomach", "Knees"], a: 1 },
            { q: "A positive test indicates increased risk of:", opts: ["Anaemia", "Pre-eclampsia", "Postmaturity", "IUGR"], a: 1 }
        ],
        drill: ["Roll-over test", "Left lateral", "Supine", "Diastolic +20", "Pre-eclampsia risk"]
    };

    /* ---- Psychological puerperium (ID 105) ---- */
    K[105] = {
        lines: [
            "After delivery, hormone shifts + stress can cause <b>psychological problems</b>.",
            "Three levels: <b>baby blues → postpartum depression → postpartum psychosis</b>.",
            "<b>Baby blues</b> = mild, common, tearful, resolves in days.",
            "<b>Postpartum depression</b> = deeper, lasts weeks, needs treatment.",
            "<b>Postpartum psychosis</b> = rare, severe, emergency (delusions, risk to baby)."
        ],
        story: "After the baby arrives, the mother's brain chemistry goes on a <b>rollercoaster</b> as pregnancy hormones crash. For most it's a brief dip — the <b>“baby blues”</b>, a few tearful, overwhelmed days that <b>pass on their own</b> like a short rain shower. For some it deepens into <b>postpartum depression</b> — a grey fog lasting weeks, with sadness, guilt and exhaustion that <b>needs real treatment</b>. Rarely, the rollercoaster flies off the rails into <b>postpartum psychosis</b> — the mother <b>loses touch with reality</b> and may harm herself or the baby — a <b>psychiatric emergency</b>. The nurse watches for which of the three storms is brewing.",
        mnemonic: {
            word: "B-D-P",
            parts: ["B = Blues (mild, days)", "D = Depression (weeks, treat)", "P = Psychosis (severe, emergency)"],
            local: "“Blues to normal hai, Depression ko ilaaj, Psychosis ko emergency.”"
        },
        palace: "A **rollercoaster**. Three cars: a **brief rainy cloud (blues)**, a **long grey fog (depression)**, and a **car flying off the track (psychosis)**. A **nurse with an umbrella and an emergency phone**.",
        terms: [
            ["Baby blues", "Mild, self-limiting tearfulness"],
            ["Postpartum depression", "Weeks of low mood — treat it"],
            ["Postpartum psychosis", "Rare emergency — loss of reality"]
        ],
        diagram:
"   POSTPARTUM MENTAL HEALTH\n" +
"   BLUES      mild, few days, self-limit\n" +
"   DEPRESSION weeks, needs treatment\n" +
"   PSYCHOSIS  severe, EMERGENCY\n" +
"   (hormone crash + stress)",
        dcap: "Blues→Depression→Psychosis",
        why: [
            "The abrupt fall in oestrogen/progesterone after delivery, plus sleep deprivation and role change, triggers mood symptoms.",
            "Blues is self-limiting; depression persists and impairs function, needing counselling ± medication.",
            "Psychosis involves delusions and risk of infanticide/suicide, so it is treated as a psychiatric emergency."
        ],
        recall: "Postpartum mental health: <b>Baby blues (mild, days) → Depression (weeks, treat) → Psychosis (severe, emergency).</b> Caused by hormone crash + stress.",
        viva: [
            "Name the three postpartum psychological conditions.",
            "How does baby blues differ from postpartum depression?",
            "Why is postpartum psychosis an emergency?",
            "What causes postpartum mood changes?",
            "What is the nurse's role in postpartum mental health?"
        ],
        mcq: [
            { q: "The mildest postpartum mood disturbance is:", opts: ["Psychosis", "Baby blues", "Depression", "Schizophrenia"], a: 1 },
            { q: "Postpartum psychosis is:", opts: ["Common and mild", "A psychiatric emergency", "Self-limiting", "Normal"], a: 1 },
            { q: "Baby blues typically:", opts: ["Lasts months", "Resolves in a few days", "Needs antipsychotics", "Causes delusions"], a: 1 },
            { q: "Postpartum mood changes are largely due to:", opts: ["Hormonal crash and stress", "Infection", "Anaemia", "Pain only"], a: 0 },
            { q: "Postpartum depression usually needs:", opts: ["No treatment", "Counselling and possibly medication", "Surgery", "Isolation"], a: 1 }
        ],
        drill: ["Baby blues", "Depression", "Psychosis", "Hormone crash", "Emergency", "Support"]
    };

    /* ---- IUGR (IDs 171, 172) ---- */
    var kitIUGR = {
        lines: [
            "<b>IUGR</b> = estimated fetal weight below the <b>10th percentile</b> for gestation.",
            "Two types: <b>symmetric (20%)</b> and <b>asymmetric (80%)</b>.",
            "<b>Symmetric</b> = early insult — <b>all organs small</b>, evenly affected.",
            "<b>Asymmetric</b> = late placental failure — <b>head spared, abdomen small (brain-sparing)</b>.",
            "Diagnose by serial fundal height + ultrasound; <b>Doppler</b> tracks severity; deliver if compromised."
        ],
        story: "IUGR is a baby <b>not getting enough rations in the womb</b>, so it stays small. There are two hunger stories. In <b>symmetric IUGR</b>, something hit <b>early (infection, chromosome problem)</b> and stunted the <b>whole body evenly</b> — head, belly and limbs are all small together. In <b>asymmetric IUGR</b>, the <b>placenta fails late</b> (like in PIH), and the clever baby <b>rations its supplies — feeding the brain first</b> and starving the belly, so the <b>head looks normal but the tummy is thin (brain-sparing)</b>. Doctors track the growth with <b>ultrasound and Doppler blood-flow</b>, and if the womb becomes too dangerous, they <b>deliver the baby early</b>.",
        mnemonic: {
            word: "10-S-A",
            parts: ["10 = weight <10th percentile", "S = Symmetric (early, all small, 20%)", "A = Asymmetric (late, brain-sparing, 80%)"],
            local: "“Symmetric = sab chhota. Asymmetric = dimaag bacha, pet sukda.”"
        },
        palace: "Two **small babies**. One **evenly tiny (symmetric)**; the other with a **big head and thin belly (asymmetric/brain-sparing)**. A **ruler showing 10th percentile**, an **ultrasound screen**, and a **Doppler wave**.",
        terms: [
            ["IUGR", "Fetal weight below 10th percentile"],
            ["Symmetric", "Early, all organs small"],
            ["Asymmetric", "Late, brain-sparing, small abdomen"],
            ["Doppler", "Blood-flow monitoring of severity"]
        ],
        diagram:
"   IUGR (<10th percentile)\n" +
"   SYMMETRIC  early, ALL small (20%)\n" +
"   ASYMMETRIC late, head spared,\n" +
"              small abdomen (80%)\n" +
"   Dx: serial USG + Doppler\n" +
"   deliver if compromised",
        dcap: "Symmetric all-small · Asymmetric brain-sparing",
        why: [
            "Early insults limit cell number, so symmetric IUGR affects all organs equally.",
            "Late placental insufficiency triggers redistribution of blood to the brain/heart at the expense of the liver/abdomen — the asymmetric, brain-sparing pattern.",
            "Doppler of the umbilical artery reflects placental resistance and worsening compromise, guiding timing of delivery."
        ],
        recall: "IUGR = weight <10th percentile. <b>Symmetric (early, all small, 20%) vs Asymmetric (late, brain-sparing, small abdomen, 80%).</b> Diagnose USG + Doppler; deliver if compromised.",
        viva: [
            "Define IUGR.",
            "Differentiate symmetric from asymmetric IUGR.",
            "Which type is commoner?",
            "What is brain-sparing?",
            "How is IUGR diagnosed and monitored?"
        ],
        mcq: [
            { q: "IUGR is fetal weight below which percentile?", opts: ["50th", "25th", "10th", "90th"], a: 2 },
            { q: "The commoner type of IUGR is:", opts: ["Symmetric", "Asymmetric", "Equal", "Neither"], a: 1 },
            { q: "Asymmetric IUGR is characterised by:", opts: ["All organs small", "Head spared, small abdomen", "Large body", "Macrosomia"], a: 1 },
            { q: "Symmetric IUGR usually results from:", opts: ["Late placental failure", "Early insult (infection/chromosomal)", "Diabetes", "Postmaturity"], a: 1 },
            { q: "IUGR severity is monitored using:", opts: ["X-ray", "Doppler ultrasound", "NST only", "Blood tests"], a: 1 }
        ],
        drill: ["IUGR <10th", "Symmetric early", "Asymmetric late", "Brain-sparing", "Small abdomen", "Doppler"]
    };
    K[171] = kitIUGR;
    K[172] = kitIUGR;

    /* ---- Malpresentation / breech (IDs 178,179,180) ---- */
    var kitBreech = {
        lines: [
            "<b>Malpresentation</b> = any presentation other than vertex (head).",
            "<b>Breech</b> (buttocks/feet first) is the commonest, <b>3–4%</b> at term.",
            "Types: <b>frank (65%), complete (25%), footling (10%)</b>.",
            "Diagnosed by <b>Leopold's grips + ultrasound</b>.",
            "Manage: <b>ECV (external turning) at 37 weeks</b>; <b>C-section</b> for footling/large baby/failed ECV."
        ],
        story: "A breech baby is sitting <b>bottom-down like it's about to slide down a slide backwards</b>, instead of head-first. It comes in three poses: <b>frank</b> — bottom down, legs folded straight up by the face (the commonest); <b>complete</b> — sitting cross-legged; and <b>footling</b> — a foot dangling out first (the most dangerous). At <b>37 weeks</b> the doctor may try a <b>“belly massage somersault” (ECV)</b> — pushing the baby through the tummy to flip it head-down. If that fails, or a foot is dangling, the safest exit is a <b>C-section</b>, because a bottom-first head can get stuck.",
        mnemonic: {
            word: "F-C-F",
            parts: ["F = Frank (65%, bottom down, legs up)", "C = Complete (25%, cross-legged)", "F = Footling (10%, foot first — worst)"],
            local: "“37 hafte pe ECV se ghumao. Footling ya fail ho to C-section.”"
        },
        palace: "A **baby sliding bottom-first**. Three poses: **legs up by ears (frank)**, **cross-legged (complete)**, **one foot dangling (footling)**. A **pair of hands flipping the baby through the belly (ECV)** and a **C-section trapdoor**.",
        terms: [
            ["Breech", "Buttocks/feet first"],
            ["Frank breech", "Bottom down, legs up (65%)"],
            ["Footling", "Foot first — most dangerous"],
            ["ECV", "External cephalic version — turning the baby"]
        ],
        diagram:
"   BREECH (bottom first, 3-4%)\n" +
"   FRANK 65%  legs up by face\n" +
"   COMPLETE 25% cross-legged\n" +
"   FOOTLING 10% foot first (worst)\n" +
"   Rx: ECV at 37 wk | C/S if fail",
        dcap: "Frank-Complete-Footling · ECV at 37 wk",
        why: [
            "In breech the largest part (head) delivers last and has no time to mould, risking head entrapment — the main danger.",
            "ECV before labour (at 37 weeks, enough fluid + room) can convert to vertex and allow vaginal delivery.",
            "Footling has the highest cord-prolapse risk, so it is an indication for C-section."
        ],
        recall: "Malpresentation = not vertex. <b>Breech 3–4%: Frank (65%), Complete (25%), Footling (10%, worst).</b> Manage: ECV at 37 wk; C-section if footling/failed.",
        viva: [
            "Define malpresentation.",
            "Name the types of breech presentation.",
            "Which breech type is most dangerous and why?",
            "What is ECV and when is it done?",
            "When is C-section indicated in breech?"
        ],
        mcq: [
            { q: "The commonest malpresentation is:", opts: ["Face", "Breech", "Shoulder", "Brow"], a: 1 },
            { q: "The commonest type of breech is:", opts: ["Complete", "Frank", "Footling", "Kneeling"], a: 1 },
            { q: "The most dangerous breech type is:", opts: ["Frank", "Complete", "Footling", "Extended"], a: 2 },
            { q: "ECV is usually performed at:", opts: ["28 weeks", "32 weeks", "37 weeks", "41 weeks"], a: 2 },
            { q: "ECV stands for:", opts: ["External cephalic version", "Emergency caesarean version", "Early cord validation", "External cervical vacuum"], a: 0 }
        ],
        drill: ["Malpresentation", "Breech 3-4%", "Frank 65%", "Complete 25%", "Footling 10%", "ECV 37 wk", "C-section"]
    };
    K[178] = kitBreech;
    K[179] = kitBreech;
    K[180] = kitBreech;

    /* ---- Puerperal sepsis / pyrexia (IDs 206,207,208) ---- */
    var kitSepsis = {
        lines: [
            "<b>Puerperal sepsis</b> = infection of the genital tract after delivery.",
            "<b>Puerperal pyrexia</b> = fever ≥ <b>38°C</b> within the puerperium.",
            "Causes: <b>poor asepsis, prolonged labour, PROM, retained products, repeated PV exams</b>.",
            "Signs: <b>fever, foul-smelling lochia, uterine tenderness, subinvolution</b>.",
            "Manage: <b>IV antibiotics, remove retained tissue, fluids, monitor</b>; prevent with clean delivery."
        ],
        story: "Puerperal sepsis is a <b>germ invasion of the raw wound</b> left inside the uterus after the placenta detaches. Germs sneak in when <b>hands/instruments aren't clean</b>, when <b>labour drags on</b>, when the <b>water bag broke long ago (PROM)</b>, or when <b>bits of placenta are left behind</b> as germ food. The mother's body fights back with <b>fever (pyrexia)</b>, her <b>discharge turns foul and stinks</b>, her <b>uterus is tender and refuses to shrink</b>. The counter-attack: <b>strong IV antibiotics</b>, <b>clear out any retained tissue</b>, plenty of fluids — and the best defence is a <b>clean, 'five-cleans' delivery</b> that keeps germs out in the first place.",
        mnemonic: {
            word: "F-L-T-S",
            parts: ["F = Fever ≥38°C", "L = Lochia foul-smelling", "T = Tender uterus", "S = Subinvolution"],
            local: "Prevention — “Clean delivery (5 cleans). Zyada PV exam mat karo.”"
        },
        palace: "A **wound invaded by germs**. A **thermometer at 38°C**, a **stinking discharge bottle**, a **tender swollen uterus**, an **antibiotic drip**, and a **'five cleans' poster** on the wall.",
        terms: [
            ["Puerperal sepsis", "Genital-tract infection after delivery"],
            ["Pyrexia", "Fever ≥38°C"],
            ["Foul lochia", "Stinking discharge — infection sign"],
            ["Subinvolution", "Uterus not shrinking (infection)"]
        ],
        diagram:
"   PUERPERAL SEPSIS\n" +
"   causes: poor asepsis, PROM,\n" +
"           prolonged labour, retained POC\n" +
"   signs: fever>=38, foul lochia,\n" +
"          tender uterus, subinvolution\n" +
"   Rx: IV antibiotics, evacuate, fluids",
        dcap: "Fever + foul lochia + tender uterus",
        why: [
            "The placental site is a large raw wound, so ascending vaginal organisms (helped by PROM and repeated PV exams) cause infection.",
            "Retained products act as a culture medium, perpetuating infection until evacuated.",
            "Fever, foul lochia and subinvolution are the classic triad signalling endometritis.",
            "Aseptic 'clean delivery' practices are the most effective prevention."
        ],
        recall: "Puerperal sepsis = genital-tract infection after delivery. <b>Signs: fever ≥38°C, foul lochia, tender uterus, subinvolution.</b> Causes: poor asepsis/PROM/retained POC. Treat: IV antibiotics + evacuate.",
        viva: [
            "Define puerperal sepsis and puerperal pyrexia.",
            "List three causes of puerperal sepsis.",
            "What are the classic signs of puerperal sepsis?",
            "How is puerperal sepsis managed?",
            "How can puerperal sepsis be prevented?"
        ],
        mcq: [
            { q: "Puerperal pyrexia is a fever of:", opts: ["≥37°C", "≥38°C", "≥39°C", "≥40°C"], a: 1 },
            { q: "A classic sign of puerperal sepsis is:", opts: ["Sweet-smelling lochia", "Foul-smelling lochia", "No fever", "Rapid involution"], a: 1 },
            { q: "A cause of puerperal sepsis is:", opts: ["Short labour", "Prolonged rupture of membranes", "Early feeding", "Clean delivery"], a: 1 },
            { q: "Subinvolution in sepsis means the uterus:", opts: ["Shrinks fast", "Fails to shrink", "Is removed", "Is normal"], a: 1 },
            { q: "Main treatment of puerperal sepsis is:", opts: ["Bed rest only", "IV antibiotics ± evacuation", "Iron tablets", "Massage"], a: 1 }
        ],
        drill: ["Puerperal sepsis", "Fever ≥38", "Foul lochia", "Tender uterus", "Subinvolution", "IV antibiotics", "Clean delivery"]
    };
    K[206] = kitSepsis;
    K[207] = kitSepsis;
    K[208] = kitSepsis;

    /* ---- Kangaroo mother care (ID 222) ---- */
    K[222] = {
        lines: [
            "<b>KMC (Kangaroo Mother Care)</b> = continuous <b>skin-to-skin contact</b> between mother and baby.",
            "Baby is placed <b>upright between the mother's breasts in a 'frog' position</b>, covered with a wrapper.",
            "Benefits: <b>warmth (thermoregulation), better breastfeeding, bonding, weight gain</b>.",
            "Especially powerful for <b>preterm and low-birth-weight babies</b>.",
            "Cheap, safe, and can be done by mother, father or family."
        ],
        story: "KMC copies the <b>kangaroo's pouch</b>. A tiny baby — especially a preterm one — is placed <b>naked (except a nappy) upright on the mother's bare chest</b>, legs tucked like a little frog, and both are <b>wrapped together</b> so the mother's body becomes the baby's <b>living incubator</b>. Her chest <b>warms the baby, her heartbeat calms it, and her breasts are right there for feeding</b>. Babies held this way <b>gain weight faster, breathe steadier and bond deeply</b> — all for <b>zero cost</b>, no machine needed.",
        mnemonic: {
            word: "W-B-B-G",
            parts: ["W = Warmth (thermoregulation)", "B = Breastfeeding success", "B = Bonding", "G = Growth/weight gain"],
            local: "“Maa ki chaati = living incubator. Muft aur behtareen.”"
        },
        palace: "A **kangaroo with a joey in its pouch**. A **baby in frog position on the mother's chest**, wrapped up. Icons around: a **thermometer (warmth)**, a **breast (feeding)**, a **heart (bonding)**, a **weighing scale (gain)**.",
        terms: [
            ["KMC", "Skin-to-skin kangaroo care"],
            ["Frog position", "Upright, legs tucked, on the chest"],
            ["Thermoregulation", "Mother's chest keeping baby warm"],
            ["Living incubator", "The mother's body as warmer"]
        ],
        diagram:
"   KANGAROO MOTHER CARE\n" +
"   baby skin-to-skin on chest\n" +
"   frog position + wrapper\n" +
"   benefits: warm, BF, bond, gain\n" +
"   best for preterm/LBW babies",
        dcap: "Skin-to-skin · living incubator",
        why: [
            "The mother's chest temperature auto-regulates to warm the baby, preventing hypothermia without an incubator.",
            "Proximity to the breast increases feeding frequency and milk production.",
            "Skin-to-skin stabilises the baby's heart rate, breathing and sleep, promoting weight gain and bonding."
        ],
        recall: "KMC = skin-to-skin, frog position, wrapped. <b>Benefits: warmth, breastfeeding, bonding, weight gain.</b> Best for preterm/LBW; cheap and safe.",
        viva: [
            "What is Kangaroo Mother Care?",
            "How is the baby positioned in KMC?",
            "List three benefits of KMC.",
            "For which babies is KMC especially useful?",
            "Who can provide KMC?"
        ],
        mcq: [
            { q: "KMC involves:", opts: ["Incubator only", "Skin-to-skin contact", "Bottle feeding", "Isolation"], a: 1 },
            { q: "In KMC the baby is placed:", opts: ["Prone on a bed", "Upright between the mother's breasts", "In a cot", "On the back"], a: 1 },
            { q: "A benefit of KMC is:", opts: ["Hypothermia", "Thermoregulation", "Infection", "Weight loss"], a: 1 },
            { q: "KMC is especially useful for:", opts: ["Term healthy babies only", "Preterm/LBW babies", "Adults", "Post-term babies"], a: 1 },
            { q: "KMC can be provided by:", opts: ["Only the mother", "Mother, father or family", "Only nurses", "Only doctors"], a: 1 }
        ],
        drill: ["KMC", "Skin-to-skin", "Frog position", "Warmth", "Breastfeeding", "Bonding", "Preterm/LBW"]
    };

    /* ---- HIV in pregnancy & newborn (IDs 228,229,230,231) ---- */
    var kitHIV = {
        lines: [
            "HIV can pass from mother to baby during <b>pregnancy, labour and breastfeeding</b>.",
            "Prevention = <b>PPTCT</b> (Prevention of Parent-to-Child Transmission).",
            "<b>ART to the mother</b> during pregnancy and labour + <b>nevirapine syrup to the newborn</b>.",
            "<b>Avoid breastfeeding if safe formula is available</b>; otherwise exclusive breastfeeding with ART.",
            "Counsel the mother on <b>testing, drugs, safe delivery and infant feeding</b>."
        ],
        story: "HIV is a tiny stowaway that can hop from mother to baby through <b>3 doors</b>: across the placenta during <b>pregnancy</b>, through blood and fluids during <b>labour</b>, and through <b>breast milk</b>. The <b>PPTCT programme</b> slams all three doors. It gives the mother <b>anti-HIV medicines (ART)</b> throughout pregnancy and labour to crush the virus to near-zero, gives the <b>newborn a protective syrup (nevirapine)</b>, plans a <b>safe delivery</b>, and advises on <b>feeding</b> — <b>formula if it can be prepared safely, otherwise exclusive breastfeeding with ART</b> (mixed feeding is the worst, because it damages the gut and lets the virus in).",
        mnemonic: {
            word: "3-Doors",
            parts: ["Pregnancy (placenta)", "Labour (blood/fluids)", "Breastfeeding (milk)"],
            local: "PPTCT — “Maa ko ART, baby ko nevirapine. Mixed feeding kabhi nahi.”"
        },
        palace: "Three **doors** between mother and baby labelled **pregnancy, labour, breastfeeding**. The **PPTCT guard** closing each with **ART tablets** and a **nevirapine syrup bottle**. A **crossed-out 'mixed feeding' sign**.",
        terms: [
            ["PPTCT", "Preventing parent-to-child transmission"],
            ["ART", "Anti-HIV medicines for the mother"],
            ["Nevirapine", "Protective syrup for the newborn"],
            ["Mixed feeding", "Breast + other food — worst for HIV risk"]
        ],
        diagram:
"   HIV mother->baby (3 doors)\n" +
"   pregnancy | labour | breastfeeding\n" +
"   PPTCT: ART to mother (preg+labour)\n" +
"          nevirapine syrup to baby\n" +
"   feed: formula OR exclusive BF+ART\n" +
"   NO mixed feeding",
        dcap: "3 doors · ART + nevirapine · no mixed feeding",
        why: [
            "ART suppresses maternal viral load, and transmission risk rises with viral load — so effective ART can cut transmission to <2%.",
            "Prophylactic nevirapine covers the newborn during the high-risk peripartum period.",
            "Exclusive breastfeeding with ART is safer than mixed feeding, which damages gut mucosa and increases transmission."
        ],
        recall: "HIV transmits via <b>pregnancy, labour, breastfeeding.</b> PPTCT: <b>ART to mother + nevirapine to newborn + safe delivery.</b> Feed: formula if safe, else exclusive BF + ART — never mixed.",
        viva: [
            "How can HIV be transmitted from mother to child?",
            "What does PPTCT stand for?",
            "What prophylaxis is given to the newborn?",
            "What infant-feeding advice is given to an HIV-positive mother?",
            "Why is mixed feeding discouraged?"
        ],
        mcq: [
            { q: "HIV can be transmitted to the baby through all EXCEPT:", opts: ["Pregnancy", "Labour", "Breastfeeding", "Hugging"], a: 3 },
            { q: "PPTCT aims to prevent:", opts: ["Postpartum haemorrhage", "Parent-to-child HIV transmission", "Preterm labour", "Anaemia"], a: 1 },
            { q: "The syrup given to the newborn of an HIV-positive mother is:", opts: ["Iron", "Nevirapine", "Vitamin K", "Glucose"], a: 1 },
            { q: "If safe formula is unavailable, an HIV-positive mother should:", opts: ["Mixed feed", "Exclusively breastfeed with ART", "Not feed", "Dilute the milk"], a: 1 },
            { q: "ART in pregnancy works by:", opts: ["Curing HIV", "Lowering viral load to reduce transmission", "Killing the baby", "Blocking the placenta"], a: 1 }
        ],
        drill: ["3 doors", "PPTCT", "ART to mother", "Nevirapine to baby", "Exclusive BF", "No mixed feeding"]
    };
    K[228] = kitHIV;
    K[229] = kitHIV;
    K[230] = kitHIV;
    K[231] = kitHIV;

    /* ---- Infertility (IDs 232,233,234) ---- */
    var kitInfertile = {
        lines: [
            "<b>Infertility</b> = failure to conceive after <b>1 year</b> of regular unprotected intercourse.",
            "<b>Primary</b> = never conceived; <b>Secondary</b> = conceived before but can't now.",
            "<b>Male factors</b>: low/poor sperm (spermatogenesis problems).",
            "<b>Female factors</b>: ovulation, tubal blockage, uterine or cervical problems.",
            "Investigate <b>both partners</b> — semen analysis, ovulation tests, tubal patency (HSG)."
        ],
        story: "Conception needs <b>4 things to work</b>: a healthy <b>seed (sperm)</b>, a healthy <b>egg</b>, an open <b>road (tube)</b> for them to meet, and a welcoming <b>soil (uterus)</b> to plant in. Infertility means one of these is broken. <b>Primary</b> infertility = the garden has <b>never</b> grown anything; <b>secondary</b> = it grew once but won't now. The detective (doctor) checks <b>both gardeners</b> — the man's <b>semen under a microscope</b>, the woman's <b>ovulation calendar</b>, and an <b>X-ray dye test (HSG)</b> to see if the road (tube) is blocked. Only after finding the broken link can it be fixed.",
        mnemonic: {
            word: "S-E-R-U",
            parts: ["S = Sperm (male factor)", "E = Egg/ovulation", "R = Road/tube patency", "U = Uterus (implantation)"],
            local: "“1 saal try ke baad na ho = infertility. Dono partners ko check karo.”"
        },
        palace: "A **garden with 4 requirements**: a **seed (sperm)**, an **egg**, an **open road (tube)**, and **soil (uterus)**. A **calendar showing 1 year**. A **microscope (semen)** and an **X-ray dye (HSG)**.",
        terms: [
            ["Primary infertility", "Never conceived"],
            ["Secondary infertility", "Conceived before, not now"],
            ["Semen analysis", "Checking the sperm"],
            ["HSG", "Dye test for tubal patency"]
        ],
        diagram:
"   INFERTILITY (1 year)\n" +
"   PRIMARY never | SECONDARY before\n" +
"   causes: Sperm, Egg/ovulation,\n" +
"           Road(tube), Uterus\n" +
"   Ix: semen analysis, ovulation, HSG",
        dcap: "S-E-R-U causes · check both partners",
        why: [
            "About one-third of infertility is male, one-third female, one-third combined/unexplained — so both partners must be evaluated.",
            "Semen analysis is cheap and non-invasive, so it is done first; tubal and ovulatory factors follow.",
            "Defining 1 year avoids over-investigating couples who would conceive naturally with more time."
        ],
        recall: "Infertility = no conception after 1 year. <b>Primary vs Secondary. Causes S-E-R-U: Sperm, Egg/ovulation, Road/tube, Uterus.</b> Investigate both: semen analysis, ovulation, HSG.",
        viva: [
            "Define infertility.",
            "Distinguish primary from secondary infertility.",
            "List two male and two female factors.",
            "What is the first investigation for the male partner?",
            "What test checks tubal patency?"
        ],
        mcq: [
            { q: "Infertility is defined as failure to conceive after:", opts: ["3 months", "6 months", "1 year", "5 years"], a: 2 },
            { q: "Primary infertility means:", opts: ["Conceived before", "Never conceived", "One child", "Twins"], a: 1 },
            { q: "The first investigation for male infertility is:", opts: ["HSG", "Semen analysis", "Laparoscopy", "Biopsy"], a: 1 },
            { q: "Tubal patency is tested by:", opts: ["Semen analysis", "HSG (hysterosalpingography)", "Blood test", "USG only"], a: 1 },
            { q: "A female factor of infertility is:", opts: ["Low sperm count", "Ovulation disorder", "Varicocele", "Azoospermia"], a: 1 }
        ],
        drill: ["Infertility 1 yr", "Primary", "Secondary", "Sperm", "Ovulation", "Tubal HSG", "Both partners"]
    };
    K[232] = kitInfertile;
    K[233] = kitInfertile;
    K[234] = kitInfertile;

    /* ---- Surrogacy Bill (ID 236) ---- */
    K[236] = {
        lines: [
            "India's <b>Surrogacy (Regulation) Act 2021</b> allows only <b>altruistic surrogacy</b>.",
            "<b>Commercial surrogacy (paying for it) is banned</b>.",
            "The surrogate must be a <b>close relative, married, and have a child of her own</b>.",
            "Intended parents must be a <b>married Indian couple</b> with proven infertility.",
            "Aim: prevent <b>exploitation</b> of poor women."
        ],
        story: "India's Surrogacy Bill turned surrogacy from a <b>business into a family favour</b>. Earlier, poor women were <b>renting their wombs for money</b> and being exploited — so the law <b>banned all commercial (paid) surrogacy</b>. Now a woman can carry a baby for someone only <b>out of kindness (altruistic)</b>, and she must be a <b>close relative</b> who is <b>already married with her own child</b> (so she understands and isn't coerced). The couple asking must be a <b>married Indian couple</b> who medically can't conceive. The whole point: <b>wombs are not for sale</b>.",
        mnemonic: {
            word: "A-NO-C",
            parts: ["A = Altruistic only", "NO Commercial (banned)", "C = Close relative surrogate"],
            local: "“Bhaade ki kokh band. Sirf rishtedaar, muft madad ke liye.”"
        },
        palace: "A **'for rent' sign crossed out**. A **kind sister (close relative)** offering help **for free**. A **law book stamped 2021** and a **married couple** holding a baby.",
        terms: [
            ["Altruistic surrogacy", "Free, out of kindness — allowed"],
            ["Commercial surrogacy", "Paid surrogacy — banned"],
            ["Close relative", "Who the surrogate must be"],
            ["Surrogacy Act 2021", "The regulating law"]
        ],
        diagram:
"   SURROGACY ACT 2021 (India)\n" +
"   ALLOWED: altruistic (free)\n" +
"   BANNED : commercial (paid)\n" +
"   surrogate: close relative,\n" +
"     married, has own child\n" +
"   parents: married Indian couple",
        dcap: "Altruistic yes · commercial no",
        why: [
            "Commercial surrogacy led to exploitation and commodification of poor women, so the law restricts it to altruistic arrangements.",
            "Requiring the surrogate to be a close relative with her own child reduces coercion and emotional/physical risk.",
            "Limiting to infertile married Indian couples prevents misuse and 'rent-a-womb' tourism."
        ],
        recall: "Surrogacy Act 2021 = <b>only altruistic allowed, commercial banned.</b> Surrogate = <b>close relative, married, own child.</b> Parents = married infertile Indian couple.",
        viva: [
            "What type of surrogacy is legal in India?",
            "What does the Surrogacy Act 2021 ban?",
            "Who can be a surrogate mother?",
            "Who can opt for surrogacy?",
            "What is the aim of the Surrogacy Act?"
        ],
        mcq: [
            { q: "Which surrogacy is allowed in India?", opts: ["Commercial", "Altruistic", "Paid", "International"], a: 1 },
            { q: "Commercial surrogacy in India is:", opts: ["Legal", "Banned", "Encouraged", "Tax-free"], a: 1 },
            { q: "The surrogate mother must be:", opts: ["Any stranger", "A close relative who is married with a child", "Unmarried", "A foreigner"], a: 1 },
            { q: "The Surrogacy Act was passed in:", opts: ["2000", "2010", "2021", "1991"], a: 2 },
            { q: "The main aim of the Act is to prevent:", opts: ["Infertility", "Exploitation of women", "Twin pregnancy", "Abortion"], a: 1 }
        ],
        drill: ["Surrogacy Act 2021", "Altruistic only", "Commercial banned", "Close relative", "Married couple", "No exploitation"]
    };

    /* ---- Uterine prolapse (ID 237) ---- */
    K[237] = {
        lines: [
            "<b>Uterine prolapse</b> = the uterus <b>descends into or beyond the vaginal canal</b>.",
            "Caused by <b>weak pelvic-floor muscles and ligaments</b> (multiple births, heavy lifting, age).",
            "Degrees: <b>1st (within vagina), 2nd (cervix at introitus), 3rd (fully outside)</b>.",
            "Symptoms: <b>something coming down, dragging pain, urinary/bowel problems</b>.",
            "Manage: <b>pessary or pelvic-floor exercises (mild)</b>; <b>surgery (hysterectomy/repair) for severe</b>, with pre & post-op care."
        ],
        story: "The uterus is normally <b>held up like a hammock</b> by pelvic-floor muscles and ligaments. After <b>many births, heavy lifting or ageing</b>, the <b>hammock stretches and sags</b>, and the womb starts <b>slipping down</b>. In <b>1st degree</b> it just sags inside; in <b>2nd degree</b> the cervix <b>peeks at the doorway (introitus)</b>; in <b>3rd degree</b> the whole womb <b>falls right out</b>. The woman feels like <b>“something is coming down”</b> with a dragging ache. Mild cases get a <b>supportive ring (pessary)</b> or <b>pelvic-floor exercises</b> to re-tighten the hammock; severe cases need <b>surgery</b> to repair or remove the womb.",
        mnemonic: {
            word: "1-2-3",
            parts: ["1st = descent within vagina", "2nd = cervix at introitus", "3rd = completely outside"],
            local: "“Hammock dheeli = prolapse. Halka ho to pessary/exercise, zyada ho to surgery.”"
        },
        palace: "A **sagging hammock** with a womb slipping through. Three stages: **sagging inside (1)**, **at the doorway (2)**, **fallen out (3)**. A **support ring (pessary)** and a **woman doing Kegels**, then a **surgeon**.",
        terms: [
            ["Prolapse", "Uterus descending down/out"],
            ["Pessary", "Supportive ring holding it up"],
            ["Pelvic floor", "The hammock muscles"],
            ["Hysterectomy", "Surgical removal for severe cases"]
        ],
        diagram:
"   UTERINE PROLAPSE degrees\n" +
"   1 = descent within vagina\n" +
"   2 = cervix at introitus\n" +
"   3 = completely outside\n" +
"   Rx: pessary/Kegels | surgery",
        dcap: "Within → introitus → outside",
        why: [
            "Vaginal births, especially instrumental/multiple, stretch and tear pelvic supports, predisposing to prolapse.",
            "Raised intra-abdominal pressure (heavy lifting, chronic cough) pushes the uterus down through the weakened floor.",
            "A pessary mechanically supports the uterus; surgery is definitive when conservative measures fail."
        ],
        recall: "Uterine prolapse = descent into/out of vagina. <b>Degrees: 1st (within), 2nd (cervix at introitus), 3rd (outside).</b> Manage: pessary/Kegels (mild), surgery (severe).",
        viva: [
            "Define uterine prolapse.",
            "Name the degrees of uterine prolapse.",
            "What causes uterine prolapse?",
            "What is a pessary?",
            "When is surgery indicated for prolapse?"
        ],
        mcq: [
            { q: "Uterine prolapse is descent of the uterus into or beyond the:", opts: ["Bladder", "Vaginal canal", "Rectum", "Abdomen"], a: 1 },
            { q: "In 2nd-degree prolapse, the cervix is at the:", opts: ["Fundus", "Introitus", "Outside completely", "Inside abdomen"], a: 1 },
            { q: "3rd-degree prolapse means the uterus is:", opts: ["Within the vagina", "At the introitus", "Completely outside", "Normal"], a: 2 },
            { q: "A non-surgical treatment of mild prolapse is:", opts: ["Hysterectomy", "Pessary and pelvic-floor exercises", "Chemotherapy", "Radiation"], a: 1 },
            { q: "A cause of uterine prolapse is:", opts: ["Single birth", "Multiple births and weak pelvic floor", "Young age only", "Exercise"], a: 1 }
        ],
        drill: ["Prolapse", "1st within", "2nd introitus", "3rd outside", "Pessary", "Kegels", "Surgery"]
    };

})();
