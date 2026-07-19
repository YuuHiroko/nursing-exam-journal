/* ============================================================================
   MEMORY KITS — PART 2 : ANC · Breastfeeding · Family Planning (3★)
   Appends into window.MEMORY_KITS (created in part1).
   ============================================================================ */
(function () {
    var K = window.MEMORY_KITS;

    /* ---- Antenatal care & assessment (IDs 27, 28) ---- */
    var kitANC = {
        lines: [
            "<b>Antenatal care (ANC)</b> = systematic care of a pregnant woman from conception to onset of labour.",
            "Aim = a <b>safe pregnancy and a healthy mother AND baby</b>.",
            "Done through regular checkups: <b>history, examination, investigations, and health education</b>.",
            "India recommends a <b>minimum of 4 ANC visits</b>; programmes include RCH and PMSMA.",
            "History uses <b>B-C-M-O-M-F-P</b>: Biodata, Chief complaint, Menstrual, Obstetric, Medical, Family, Personal."
        ],
        story: "ANC is a <b>safety inspection service</b> for a 9-month construction project (the baby). The supervisor (nurse) visits at fixed intervals — <b>at least 4 times</b> — each visit checking the building (mother), the blueprint (history), and running <b>quality tests</b> (investigations) so the project finishes with <b>zero accidents</b> (healthy mother & baby). The inspection notebook is labelled <b>B-C-M-O-M-F-P</b> — she asks <b>“Beti, Complain? Monthly date? Old pregnancies? Medicine? Family? Personal habits?”</b>",
        mnemonic: {
            word: "4-AIMS",
            parts: ["A = Assess & identify high-risk early", "I = Improve health (IFA, TT, diet)", "M = Monitor mother & fetus", "S = Safe delivery + health education"],
            local: "History — “B-C-M-O-M-F-P” yaad rakho: Biodata, Complaint, Menstrual, Obstetric, Medical, Family, Personal."
        },
        palace: "Your **4 ANC visits = 4 doors** in a corridor. Behind door 1 you fill a **B-C-M-O-M-F-P register** (history). Door 2 has a **weighing scale & BP cuff** (examination). Door 3 has **blood tubes and an ultrasound screen** (investigations). Door 4 has a **teacher with a blackboard** (health education).",
        terms: [
            ["ANC", "9-month safety inspection of mother+baby"],
            ["4 ANC visits", "Minimum 4 checkups (India)"],
            ["PMSMA", "Free checkup on 9th of every month"],
            ["GPTAL", "Gravida, Para, Term, Abortion, Living"],
            ["High-risk identification", "The main goal — catch danger early"]
        ],
        diagram:
"   ANC = 4 pillars\n" +
"   1 HISTORY    B-C-M-O-M-F-P\n" +
"   2 EXAM       wt, BP, pallor, fundus\n" +
"   3 INVESTIG.  Hb, urine, USG, sugar\n" +
"   4 EDUCATION  diet, hygiene, danger\n" +
"   Visits: <=12w | 14-26w | 28-34w | 36-term",
        dcap: "History → Exam → Tests → Educate",
        why: [
            "Most maternal deaths are preventable — regular surveillance catches PIH, anaemia and malpresentation before they become emergencies.",
            "Four visits are spaced to match pregnancy milestones: booking, mid-trimester screening, growth check, and delivery planning.",
            "A structured history (B-C-M-O-M-F-P) guarantees no risk factor is missed — each letter is a category of danger."
        ],
        recall: "ANC = care from conception to labour; aim healthy mother+baby. <b>4 visits, 4 pillars (History, Exam, Investigations, Education). History = B-C-M-O-M-F-P.</b>",
        viva: [
            "Define antenatal care and state its main aim.",
            "What is the minimum number of ANC visits recommended in India?",
            "What does GPTAL stand for in obstetric history?",
            "Name the four pillars of antenatal assessment.",
            "What is the PMSMA programme?"
        ],
        mcq: [
            { q: "Minimum ANC visits recommended in India:", opts: ["2", "3", "4", "8"], a: 2 },
            { q: "Antenatal care extends from:", opts: ["Conception to labour", "Birth to 6 weeks", "12 to 28 weeks", "Labour only"], a: 0 },
            { q: "In obstetric history, 'P' in GPTAL stands for:", opts: ["Para", "Preterm", "Presentation", "Personal"], a: 0 },
            { q: "The primary goal of ANC screening is to:", opts: ["Confirm pregnancy", "Identify high-risk women early", "Determine fetal sex", "Estimate weight only"], a: 1 },
            { q: "PMSMA provides free checkup on which day of the month?", opts: ["1st", "5th", "9th", "15th"], a: 2 }
        ],
        drill: ["ANC", "4 visits", "B-C-M-O-M-F-P", "GPTAL", "High-risk", "PMSMA", "Healthy mother & baby"]
    };
    K[27] = kitANC;
    K[28] = kitANC;

    /* ---- High-risk pregnancy (IDs 31, 108, 109) ---- */
    var kitHRP = {
        lines: [
            "<b>High-risk pregnancy (HRP)</b> = mother, fetus or newborn has a greater-than-normal chance of illness or death.",
            "Only <b>15–20% of pregnancies</b> are high-risk, yet they cause <b>70–80% of perinatal deaths</b>.",
            "Screening uses the <b>ABCDE</b> framework at the first ANC contact.",
            "<b>ABCDE</b> = Age/Anthropometry, Bad obstetric history, Current pregnancy complications, Disease (medical), Environmental/social.",
            "Nurse's role = identify early, monitor closely, refer/treat in time, and educate."
        ],
        story: "A <b>security scanner</b> at the airport checks every passenger, but only a few set off the alarm. HRP screening is that scanner: of every 100 pregnant women, only <b>15–20 beep</b> — yet those few are responsible for <b>70–80% of the crashes</b>. The scanner has <b>5 detection zones (ABCDE)</b>: <b>A</b>ge (too young <18 or too old >35), <b>B</b>ad past history (previous stillbirth/abortion), <b>C</b>urrent problems (bleeding, twins, high BP), <b>D</b>isease she already carries (diabetes, anaemia, heart), and <b>E</b>nvironment (poverty, smoking, far from hospital).",
        mnemonic: {
            word: "ABCDE",
            parts: ["A = Age & Anthropometry (<18/>35, ht<145)", "B = Bad obstetric history", "C = Current pregnancy complication", "D = Disease (medical)", "E = Environmental/social"],
            local: "“15–20% risky, par 70–80% deaths” — ye line kabhi mat bhoolna."
        },
        palace: "An **airport scanner** with **5 zones (A-B-C-D-E)**. Zone A: a **teenager and an elderly woman** both beep. Zone B: a **gravestone marked 'previous loss'**. Zone C: **blood drops and twin babies**. Zone D: a **sugar cube and a heart**. Zone E: a **cigarette and an empty wallet**.",
        terms: [
            ["HRP", "Pregnancy with extra risk to mother/baby"],
            ["BOH", "Bad obstetric history (previous loss)"],
            ["Elderly primi", "First pregnancy after 35 years"],
            ["Screening", "The airport scanner at first ANC visit"]
        ],
        diagram:
"   HIGH-RISK screening = ABCDE\n" +
"   A Age <18 or >35 | ht<145cm\n" +
"   B Bad obstetric history\n" +
"   C Current problem (bleed,HTN)\n" +
"   D Disease (DM, anaemia, heart)\n" +
"   E Environment/social\n" +
"   15-20% of pregn -> 70-80% deaths",
        dcap: "Scan every woman with ABCDE",
        why: [
            "A small group causes most deaths, so universal screening + targeted intensive care gives the biggest reduction in mortality.",
            "Each ABCDE category points to a specific danger — age→cephalopelvic problems, BOH→recurrence, current→active complications, disease→systemic risk, environment→access delays.",
            "Identifying at the FIRST visit means monitoring and referral can be planned before the complication becomes an emergency."
        ],
        recall: "HRP = extra risk to mother/baby. <b>15–20% of pregnancies cause 70–80% of perinatal deaths. Screen with ABCDE</b> (Age, Bad history, Current, Disease, Environment).",
        viva: [
            "Define high-risk pregnancy.",
            "What percentage of pregnancies are high-risk and what share of deaths do they cause?",
            "What does ABCDE stand for in HRP screening?",
            "Give two examples of 'bad obstetric history'.",
            "What is the nurse's role in managing a high-risk pregnancy?"
        ],
        mcq: [
            { q: "High-risk pregnancies form what share of all pregnancies?", opts: ["1–2%", "15–20%", "50%", "80%"], a: 1 },
            { q: "High-risk pregnancies contribute to what % of perinatal deaths?", opts: ["10%", "30%", "70–80%", "100%"], a: 2 },
            { q: "In ABCDE screening, 'B' stands for:", opts: ["Blood pressure", "Bad obstetric history", "Birth weight", "Bleeding"], a: 1 },
            { q: "An 'elderly primigravida' is a first pregnancy above age:", opts: ["25", "30", "35", "40"], a: 2 },
            { q: "A maternal height below which value suggests contracted pelvis risk?", opts: ["160 cm", "150 cm", "145 cm", "140 cm"], a: 2 }
        ],
        drill: ["HRP", "15-20%", "70-80% deaths", "ABCDE", "BOH", "Elderly primi", "Early identification"]
    };
    K[31] = kitHRP;
    K[108] = kitHRP;
    K[109] = kitHRP;

    /* ---- Abdominal examination / Leopold's (ID 39) ---- */
    var kitLeopold = {
        lines: [
            "Abdominal examination assesses the baby's <b>size, lie, presentation, position and wellbeing</b>.",
            "Three steps: <b>Inspection (look) → Palpation (feel) → Auscultation (listen)</b>.",
            "Palpation uses <b>4 Leopold's grips</b>: fundal, lateral (umbilical), first pelvic (Pawlik), second pelvic.",
            "Empty the bladder first; woman lies with knees slightly bent.",
            "Auscultation finds the fetal heart — best heard over the fetal back/shoulder."
        ],
        story: "You are a <b>detective</b> solving the case of “Where is the baby hiding?” First you <b>LOOK</b> at the tummy (inspection) for size and shape. Then you interrogate the belly with <b>4 grip-witnesses (Leopold)</b>: the <b>Fundal</b> grip asks “what's at the top?” (head or bottom?), the <b>Lateral/Umbilical</b> grips ask “which side is the back?”, the <b>first Pelvic (Pawlik)</b> grip asks “what's entering the pelvis?”, and the <b>second Pelvic</b> grip asks “is the head engaged?” Finally you <b>LISTEN</b> with a stethoscope for the tiny galloping heartbeat over the baby's back.",
        mnemonic: {
            word: "I-P-A",
            parts: ["I = Inspection (look)", "P = Palpation (4 Leopold grips)", "A = Auscultation (fetal heart)"],
            local: "Leopold grips — “Fundal, Umbilical (lateral), Pawlik (1st pelvic), 2nd pelvic.” Look-Feel-Listen."
        },
        palace: "A **criminal's belly** on your table. You **stare** at it (inspection). You press **top = fundal**, **two sides = lateral**, **lower grip = Pawlik**, **deep pelvis = 2nd pelvic**. Then you put your **ear to a radio** playing a gallop = auscultation of the fetal heart.",
        terms: [
            ["Fundal grip", "Feels the top — head or breech?"],
            ["Lateral grip", "Finds the fetal back"],
            ["Pawlik's grip", "First pelvic grip — what's presenting"],
            ["Lie", "Baby's long axis vs mother's (longitudinal)"],
            ["Presentation", "The part entering the pelvis first"]
        ],
        diagram:
"   LEOPOLD'S 4 GRIPS\n" +
"      [Fundal]   top: head/buttock\n" +
"   [Lateral L][Lateral R] back side\n" +
"      [Pawlik]   suprapubic grip\n" +
"      [2nd Pelvic] engagement?\n" +
"   then AUSCULTATE over the back",
        dcap: "Look → 4 grips → Listen",
        why: [
            "Inspection first gives context (size, shape, scars) so palpation findings are interpreted correctly.",
            "Each Leopold grip answers one clinical question, so doing all four builds a complete 3-D map of the fetus.",
            "The fetal heart is loudest over the fetal back because the back conducts sound directly to the uterine wall."
        ],
        recall: "Abdominal exam = <b>Inspection → Palpation (4 Leopold grips: fundal, lateral, Pawlik, 2nd pelvic) → Auscultation.</b> Empty bladder, knees bent.",
        viva: [
            "Name the four Leopold's manoeuvres.",
            "What does the fundal grip determine?",
            "Why must the bladder be emptied before abdominal examination?",
            "Where is the fetal heart best heard?",
            "What is the difference between lie and presentation?"
        ],
        mcq: [
            { q: "The first step of abdominal examination is:", opts: ["Auscultation", "Palpation", "Inspection", "Percussion"], a: 2 },
            { q: "Pawlik's grip is the:", opts: ["Fundal grip", "First pelvic grip", "Lateral grip", "Second pelvic grip"], a: 1 },
            { q: "The fetal heart is best heard over the:", opts: ["Fetal limbs", "Fetal back", "Mother's fundus", "Umbilicus"], a: 1 },
            { q: "Lateral (umbilical) grip helps identify:", opts: ["Engagement", "Position of the fetal back", "Fetal heart", "Lie"], a: 1 },
            { q: "The second pelvic grip assesses:", opts: ["Fetal back", "Engagement of the head", "Fundal height", "Fetal heart rate"], a: 1 }
        ],
        drill: ["Inspection", "Palpation", "Auscultation", "Fundal", "Lateral", "Pawlik", "2nd pelvic", "Lie/Presentation"]
    };
    K[39] = kitLeopold;

    /* ---- Breastfeeding (ID 65) ---- */
    var kitBF = {
        lines: [
            "Breast milk is the baby's <b>perfect, complete, free</b> first food.",
            "It protects the baby with <b>antibodies</b> against infection.",
            "It helps the mother — <b>uterus shrinks, less bleeding, natural child spacing</b>, less breast/ovarian cancer.",
            "Success depends on <b>correct positioning and attachment (latch)</b>.",
            "The nurse <b>teaches, supports and protects</b> breastfeeding."
        ],
        story: "Breast milk is a <b>magic home-delivery restaurant</b> that opens 24/7, serves food at the <b>perfect temperature</b>, never needs a bill, and adds a free <b>invisible shield (antibodies)</b> with every meal. The restaurant's owner (mother) gets cashback too — her <b>belly deflates faster</b> (involution) and she <b>bleeds less</b>. But the door only opens if the baby uses the right <b>“door-handle grip”</b> — mouth wide, covering most of the dark ring (areola), chin touching the breast. The nurse is the <b>restaurant manager</b> teaching this grip.",
        mnemonic: {
            word: "B-E-S-T",
            parts: ["B = Bonding + Baby's antibodies", "E = Economical & sterile", "S = Shrinks uterus, Spaces babies", "T = Total nutrition, correct Temperature"],
            local: "Latch — “Muh khula, areola andar, chin breast ko chhoo, neeche ka honth bahar.”"
        },
        palace: "A **golden restaurant** in your room. The **door handle = areola** the baby grabs wide. Inside, a **shield on the wall** = antibodies. A **shrinking balloon** = the uterus involuting. A **zero-rupee bill** = free & clean milk.",
        terms: [
            ["Colostrum", "First thick yellow milk = 'first vaccine'"],
            ["Areola", "Dark ring the baby must latch onto"],
            ["Positioning", "Baby straight, facing, close, supported"],
            ["Attachment", "Mouth covers most of the areola"],
            ["Prolactin", "Hormone that makes milk"]
        ],
        diagram:
"   GOOD LATCH          BAD LATCH\n" +
"   mouth WIDE          lips closed\n" +
"   areola mostly in    nipple only\n" +
"   chin touches breast chin away\n" +
"   lower lip out       cheek dimples\n" +
"   BENEFITS: antibodies+free+involution",
        dcap: "Latch onto the AREOLA, not the nipple",
        why: [
            "Colostrum and milk contain IgA antibodies that coat the baby's gut, blocking germs the baby has never met.",
            "Suckling releases oxytocin, which contracts the uterus — reducing postpartum bleeding and speeding involution.",
            "Latching onto the areola (not the nipple) compresses the milk sinuses under it, giving good milk flow without sore, cracked nipples."
        ],
        recall: "Breastfeeding = <b>best complete food, antibodies for baby, involution+spacing for mother, free & clean.</b> Key = correct positioning & attachment (areola latch).",
        viva: [
            "List three advantages of breastfeeding for the baby.",
            "List two advantages of breastfeeding for the mother.",
            "What is colostrum and why is it important?",
            "Describe correct attachment (latch).",
            "What is the role of the nurse in promoting breastfeeding?"
        ],
        mcq: [
            { q: "The first milk secreted after delivery is:", opts: ["Mature milk", "Colostrum", "Foremilk", "Transitional milk"], a: 1 },
            { q: "Correct attachment means the baby's mouth covers most of the:", opts: ["Nipple only", "Areola", "Chin", "Cheek"], a: 1 },
            { q: "Breastfeeding helps the mother's uterus by:", opts: ["Delaying involution", "Promoting involution via oxytocin", "Increasing bleeding", "Causing infection"], a: 1 },
            { q: "Which hormone is mainly responsible for milk production?", opts: ["Oxytocin", "Prolactin", "Oestrogen", "Progesterone"], a: 1 },
            { q: "Exclusive breastfeeding is recommended for the first:", opts: ["3 months", "6 months", "1 year", "2 years"], a: 1 }
        ],
        drill: ["Colostrum", "Antibodies", "Areola latch", "Involution", "Prolactin", "Free & clean", "6 months exclusive"]
    };
    K[65] = kitBF;

    /* ---- Family planning / contraception (IDs 78, 79, 80, 81, 82, 84) ---- */
    var kitFP = {
        lines: [
            "<b>Contraception</b> = preventing pregnancy; family planning = spacing/limiting children by choice.",
            "Methods are <b>temporary (spacing)</b> or <b>permanent (terminal)</b>.",
            "Temporary: <b>barrier, IUCD, hormonal pills, natural methods</b>.",
            "Permanent: <b>tubectomy (female)</b> and <b>vasectomy (male)</b>.",
            "The nurse's role = counsel, motivate, and help couples choose the right method."
        ],
        story: "Family planning is like <b>controlling the taps of a water tank</b> (family size). Some couples use a <b>temporary tap</b> they can turn on and off — a <b>rubber barrier</b> (condom), a <b>copper coin dropped in the tank</b> (Copper-T), a <b>daily hormone pill</b>, or simply <b>counting safe days</b> (natural). Couples who are <b>“tank full, no more water ever”</b> choose a <b>permanent valve</b> — the woman's tubes are tied (<b>tubectomy</b>) or the man's pipe is snipped (<b>vasectomy</b>). The nurse is the friendly <b>plumber-counsellor</b> explaining which tap suits whom.",
        mnemonic: {
            word: "B-I-H-N + T-V",
            parts: ["B = Barrier (condom/diaphragm)", "I = IUCD (Copper-T)", "H = Hormonal (pills/injectable)", "N = Natural (rhythm/LAM)", "T = Tubectomy (permanent)", "V = Vasectomy (permanent)"],
            local: "Temporary = “B-I-H-N”; Permanent = “T-V” (Tube-Vase)."
        },
        palace: "Your **water tank**. A **rubber wall** (barrier), a **copper coin** (Copper-T) floating inside, a **daily pill jar** on the shelf, a **calendar** (natural). Two **padlocked valves**: one labelled **T** (tubectomy), one **V** (vasectomy).",
        terms: [
            ["Barrier", "Rubber wall blocking sperm"],
            ["IUCD", "Copper-T placed in the uterus"],
            ["Tubectomy", "Female tubes tied — permanent"],
            ["Vasectomy", "Male pipe snipped — permanent"],
            ["LAM", "Breastfeeding as natural contraception"]
        ],
        diagram:
"   FAMILY PLANNING\n" +
"   TEMPORARY          PERMANENT\n" +
"   Barrier (condom)   Tubectomy (F)\n" +
"   IUCD (Copper-T)    Vasectomy (M)\n" +
"   Hormonal (pills)\n" +
"   Natural (rhythm)",
        dcap: "Temporary B-I-H-N · Permanent T-V",
        why: [
            "Temporary methods suit couples who want spacing; permanent methods suit those whose family is complete — matching method to need improves acceptance.",
            "Copper-T works by making the uterus hostile to sperm, so it needs no daily action — ideal where pill compliance is poor.",
            "Vasectomy is simpler and safer than tubectomy (no abdominal surgery), yet underused — counselling helps correct myths."
        ],
        recall: "Contraception = <b>temporary (Barrier, IUCD, Hormonal, Natural) + permanent (Tubectomy, Vasectomy).</b> Nurse = counsel & help choose.",
        viva: [
            "Define contraception and name the two broad categories.",
            "Give two examples each of temporary and permanent methods.",
            "What is the difference between tubectomy and vasectomy?",
            "Why is Copper-T a popular temporary method?",
            "What is the nurse's role in the family welfare programme?"
        ],
        mcq: [
            { q: "A permanent method of contraception is:", opts: ["Condom", "Copper-T", "Tubectomy", "Oral pills"], a: 2 },
            { q: "Vasectomy is performed on the:", opts: ["Female", "Male", "Both", "Uterus"], a: 1 },
            { q: "Which is a natural method of family planning?", opts: ["Copper-T", "Rhythm method", "Oral pills", "Diaphragm"], a: 1 },
            { q: "Copper-T is classified as:", opts: ["Barrier", "IUCD", "Hormonal", "Permanent"], a: 1 },
            { q: "The simplest permanent male method is:", opts: ["Tubectomy", "Vasectomy", "Copper-T", "Pills"], a: 1 }
        ],
        drill: ["Barrier", "IUCD", "Hormonal", "Natural", "Tubectomy", "Vasectomy", "Spacing vs Limiting"]
    };
    K[78] = kitFP;
    K[79] = kitFP;
    K[80] = kitFP;
    K[81] = kitFP;
    K[82] = kitFP;
    K[84] = kitFP;

    /* ---- Copper-T / IUCD (ID 83) ---- */
    var kitCuT = {
        lines: [
            "<b>Copper-T 380A</b> = a small T-shaped plastic device wrapped with copper wire, placed inside the uterus.",
            "It prevents pregnancy for up to <b>10 years</b> and is over <b>99% effective</b>.",
            "It is <b>non-hormonal</b> and works by copper ions that are toxic to sperm.",
            "It is <b>FREE</b> at all government health centres in India.",
            "Threads hang into the vagina so the woman can check it is still in place."
        ],
        story: "Copper-T is a tiny <b>“copper bouncer”</b> standing guard inside the uterus for <b>10 long years</b>. Every sperm that tries to enter gets an <b>electric copper shock</b> (copper ions are spermicidal) and falls back — no egg ever gets fertilised. The bouncer is made of <b>plastic shaped like the letter T</b> with <b>380 square mm</b> of copper armour, and it leaves a <b>tag (threads)</b> hanging down so the woman can feel it's still on duty. Best part — the government hands out this bouncer <b>absolutely free</b>.",
        mnemonic: {
            word: "380-10-99",
            parts: ["380 = 380 sq mm of copper", "10 = works for 10 years", "99 = >99% effective"],
            local: "“Taamba bouncer — 10 saal, muft sarkari, sperm ka dushman.”"
        },
        palace: "A **T-shaped copper robot** standing in a **room (uterus)**. It zaps **tadpoles (sperm)** at the door. A **price tag reading ₹0** hangs from it, and a **string** dangles down for checking. A calendar shows **10 years** circled.",
        terms: [
            ["CuT-380A", "The copper bouncer device"],
            ["380 sq mm", "Amount of copper armour"],
            ["Copper ions", "The 'electric shock' killing sperm"],
            ["Threads", "Tag to check it's still in place"],
            ["Non-hormonal", "No daily pills, no hormones"]
        ],
        diagram:
"   COPPER-T 380A\n" +
"      <--->  horizontal arms\n" +
"        |    copper wire (380mm2)\n" +
"        |    polyethylene stem\n" +
"        |    threads -> vagina\n" +
"   10 yr | 99% | FREE | non-hormonal",
        dcap: "Copper bouncer · 10 yr · free",
        why: [
            "Copper ions paralyse and kill sperm before they reach the egg, so fertilisation never occurs — no hormones needed.",
            "A T-shape matches the uterine cavity so the device stays anchored for a decade without daily user effort.",
            "Threads allow self-checking and easy removal, giving the woman control and early warning if it is expelled."
        ],
        recall: "Copper-T 380A = <b>T-shaped, copper-wrapped IUCD; spermicidal copper ions; 10 years; >99%; FREE at govt centres; non-hormonal.</b>",
        viva: [
            "What does '380' in Copper-T 380A refer to?",
            "How does Copper-T prevent pregnancy?",
            "For how many years is Copper-T 380A effective?",
            "What is the purpose of the threads?",
            "Is Copper-T hormonal or non-hormonal?"
        ],
        mcq: [
            { q: "Copper-T 380A remains effective for up to:", opts: ["1 year", "3 years", "10 years", "Lifetime"], a: 2 },
            { q: "The '380' in CuT-380A denotes:", opts: ["380 mg weight", "380 sq mm of copper", "380 days", "Model 380"], a: 1 },
            { q: "Copper-T acts mainly by:", opts: ["Blocking ovulation", "Copper ions toxic to sperm", "Thickening mucus", "Killing the ovum"], a: 1 },
            { q: "Copper-T is a:", opts: ["Hormonal method", "Non-hormonal IUCD", "Permanent method", "Barrier method"], a: 1 },
            { q: "In India, Copper-T is available at government centres:", opts: ["At high cost", "Free of cost", "Only in cities", "Only privately"], a: 1 }
        ],
        drill: ["Copper-T 380A", "380 sq mm", "10 years", "99% effective", "Copper ions", "Threads", "Free & non-hormonal"]
    };
    K[83] = kitCuT;

    /* ---- Emergency contraception (ID 85) ---- */
    var kitEC = {
        lines: [
            "<b>Emergency contraception (EC)</b> = preventing pregnancy AFTER unprotected sex or contraceptive failure.",
            "Must be taken <b>as soon as possible</b> — best within 72 hours.",
            "Main methods: <b>Levonorgestrel pill (1.5 mg)</b> or an <b>IUCD (Copper-T)</b> inserted within 5 days.",
            "It works by <b>delaying ovulation / preventing fertilisation</b> — it does NOT cause abortion.",
            "It is a backup, not a regular method."
        ],
        story: "Emergency contraception is the <b>“last-minute parachute”</b> after a contraceptive accident. A couple realises the condom broke — panic! Within <b>72 hours</b> the woman swallows a <b>single Levonorgestrel 1.5 mg pill</b>, which tells the ovary <b>“hold the egg, don't release it yet”</b> (delays ovulation) so no egg meets the sperm. If she is late (up to 5 days), the doctor drops in a <b>Copper-T</b> as a rescue bouncer. Crucially, EC is a <b>fire-extinguisher</b>, not a daily habit — and it <b>cannot end an established pregnancy</b>.",
        mnemonic: {
            word: "72-5",
            parts: ["72 = pill within 72 hours", "5 = Copper-T within 5 days"],
            local: "“72 ghante mein golī, 5 din mein Copper-T.” EC garbhpaat NAHI karta."
        },
        palace: "A **parachute** with a tag **“use within 72 hrs”**. Below it a **single red pill (LNG 1.5 mg)** shouting **“hold the egg!”**, and a **Copper-T** waiting with a **“5-day”** badge. A crossed-out sign reads **“NOT an abortion pill.”**",
        terms: [
            ["LNG 1.5 mg", "The single emergency pill"],
            ["72 hours", "Pill window — sooner is better"],
            ["5 days", "Copper-T window"],
            ["Delays ovulation", "How EC works — NOT abortion"]
        ],
        diagram:
"   EMERGENCY CONTRACEPTION\n" +
"   unprotected sex / failure\n" +
"     |-- <=72h: LNG 1.5 mg pill\n" +
"     |-- <=5 days: Copper-T IUCD\n" +
"   acts by delaying ovulation\n" +
"   NOT effective if pregnant",
        dcap: "Pill ≤72 h · Copper-T ≤5 days",
        why: [
            "Sperm survive ~5 days but the egg only ~24 hours, so delaying ovulation by even a day or two prevents fertilisation.",
            "The earlier the pill is taken, the more likely it is taken before the LH surge — hence the 72-hour urgency.",
            "Copper-T works up to 5 days because its spermicidal + anti-implantation effect covers the full sperm-survival window."
        ],
        recall: "EC = backup after unprotected sex. <b>Levonorgestrel 1.5 mg within 72 h, or Copper-T within 5 days. Works by delaying ovulation — NOT an abortifacient.</b>",
        viva: [
            "What is emergency contraception and when is it used?",
            "Within how many hours should the LNG pill be taken?",
            "Up to how many days can a Copper-T be used as EC?",
            "How does emergency contraception work?",
            "Does emergency contraception cause abortion? Explain."
        ],
        mcq: [
            { q: "Levonorgestrel emergency pill should be taken within:", opts: ["24 hours", "72 hours", "7 days", "10 days"], a: 1 },
            { q: "The usual emergency pill dose of levonorgestrel is:", opts: ["0.5 mg", "1.5 mg", "5 mg", "10 mg"], a: 1 },
            { q: "A Copper-T used as emergency contraception can be inserted within:", opts: ["24 hours", "48 hours", "5 days", "14 days"], a: 2 },
            { q: "Emergency contraception primarily works by:", opts: ["Causing abortion", "Delaying ovulation", "Killing the embryo", "Blocking the cervix permanently"], a: 1 },
            { q: "Emergency contraception is:", opts: ["A regular daily method", "A backup, not for routine use", "A permanent method", "A surgical method"], a: 1 }
        ],
        drill: ["Emergency contraception", "LNG 1.5 mg", "72 hours", "Copper-T 5 days", "Delays ovulation", "NOT abortion"]
    };
    K[85] = kitEC;

})();
