/* ============================================================================
   MEMORY KITS — PART 3 : OBG-II EMERGENCIES (3★)
   Abortion · MTP · APH (Previa/Abruptio) · PIH · GDM · PPH
   ============================================================================ */
(function () {
    var K = window.MEMORY_KITS;

    /* ---- Abortion types (IDs 111, 112, 113, 114, 115, 116, 117) ---- */
    var kitAbortion = {
        lines: [
            "<b>Abortion</b> = expulsion of products of conception (POC) before <b>28 weeks</b> or <b>1000 g</b>.",
            "Types: <b>threatened, inevitable, incomplete, complete, missed, septic, habitual</b>.",
            "<b>Threatened</b> = bleeding, os closed, fetus alive — pregnancy may continue.",
            "<b>Incomplete</b> = part expelled, some retained, os open, continued bleeding.",
            "<b>Septic</b> = abortion + infection — a medical emergency; antibiotics FIRST, then evacuate."
        ],
        story: "Think of pregnancy as a <b>bird's nest on a tree</b>. In <b>Threatened</b>, the nest shakes and a twig (blood) falls, but the <b>door stays shut</b> and the chick (fetus) is alive — you can still save it with rest. In <b>Inevitable</b>, the branch has snapped and the door is <b>open</b> — the nest WILL fall. In <b>Incomplete</b>, half the nest falls out and half is <b>stuck</b> (keeps bleeding). In <b>Complete</b>, the whole nest is out and bleeding stops. In <b>Missed</b>, the chick silently died but the nest <b>stays put</b>. In <b>Septic</b>, the nest gets <b>maggots (infection)</b> — kill the germs FIRST, then clean out the nest.",
        mnemonic: {
            word: "T-I-I-C-M-S-H",
            parts: ["T = Threatened", "I = Inevitable", "I = Incomplete", "C = Complete", "M = Missed", "S = Septic", "H = Habitual"],
            local: "Septic rule — “Pehle ANTIBIOTIC, phir evacuation.” (ampicillin+gentamicin+metronidazole)"
        },
        palace: "A **tree with 7 nests**. Nest 1 **shakes, door shut** = threatened. Nest 2 **branch cracking, door open** = inevitable. Nest 3 **half-fallen** = incomplete. Nest 4 **empty on ground** = complete. Nest 5 **silent, still hanging** = missed. Nest 6 **swarming with flies** = septic. Nest 7 **keeps falling every season** = habitual.",
        terms: [
            ["POC", "Products of conception (the 'nest')"],
            ["Threatened", "Bleeding + closed os + live fetus"],
            ["Incomplete", "Part out, part retained, os open"],
            ["Missed", "Dead fetus retained in uterus"],
            ["Septic", "Abortion + infection — emergency"]
        ],
        diagram:
"   ABORTION (<28 wk / 1000 g)\n" +
"   Threatened  bleed, os CLOSED\n" +
"   Inevitable  bleed+cramp, os OPEN\n" +
"   Incomplete  part out, os open\n" +
"   Complete    all out, os closed\n" +
"   Missed      fetus dead, retained\n" +
"   Septic      + INFECTION (ABx 1st!)",
        dcap: "Closed os=threatened · open os=inevitable",
        why: [
            "A closed os in threatened abortion means the uterus has not committed to expulsion, so rest + progesterone can save the pregnancy.",
            "Incomplete abortion keeps bleeding because retained tissue prevents the uterus from contracting down — so evacuation is needed.",
            "Septic abortion needs antibiotics BEFORE evacuation because instrumenting an infected uterus can push bacteria into the blood (septic shock)."
        ],
        recall: "Abortion = POC out before 28 wk/1000 g. <b>Types T-I-I-C-M-S-H.</b> Threatened = closed os, save it. Septic = antibiotics FIRST, then evacuate.",
        viva: [
            "Define abortion and give its cut-off gestation/weight.",
            "Differentiate threatened from inevitable abortion.",
            "What is an incomplete abortion and how is it managed?",
            "Why are antibiotics given before evacuation in septic abortion?",
            "What is a missed abortion?"
        ],
        mcq: [
            { q: "Abortion is expulsion of POC before:", opts: ["20 weeks", "28 weeks / 1000 g", "37 weeks", "12 weeks"], a: 1 },
            { q: "In threatened abortion the cervical os is:", opts: ["Open", "Closed", "Fully dilated", "Absent"], a: 1 },
            { q: "Retained products with continued bleeding describe:", opts: ["Complete", "Incomplete", "Missed", "Threatened"], a: 1 },
            { q: "First step in septic abortion management is:", opts: ["Immediate evacuation", "IV antibiotics", "Oxytocin", "Blood transfusion"], a: 1 },
            { q: "A dead fetus retained in the uterus is called:", opts: ["Missed abortion", "Complete abortion", "Habitual abortion", "Septic abortion"], a: 0 }
        ],
        drill: ["Abortion <28wk", "Threatened", "Inevitable", "Incomplete", "Complete", "Missed", "Septic", "Habitual"]
    };
    K[111] = kitAbortion;
    K[112] = kitAbortion;
    K[113] = kitAbortion;
    K[114] = kitAbortion;
    K[115] = kitAbortion;
    K[116] = kitAbortion;
    K[117] = kitAbortion;

    /* ---- Threatened abortion management (ID 118) ---- */
    var kitThreatened = {
        lines: [
            "<b>Threatened abortion</b> = uterine bleeding before 28 weeks with a <b>closed os</b> and a live fetus.",
            "Occurs in <b>20–25% of pregnancies</b>; about half continue normally.",
            "Management aims to <b>continue the pregnancy</b>.",
            "Key steps: <b>bed rest, progesterone support, avoid coitus/strain, ultrasound monitoring</b>.",
            "Nurse provides <b>reassurance and emotional support</b> — vital for the anxious mother."
        ],
        story: "A woman is carrying a <b>delicate glass lamp</b> (the pregnancy) and notices a <b>crack with a drip</b> (spotting). The door is still <b>closed</b> and the light is still <b>on</b> (fetal heart present) — so the rescue plan is <b>“freeze and protect”</b>: she lies down (<b>bed rest</b>), gets a <b>glue injection</b> (<b>progesterone</b>) to strengthen the glass, and everyone tiptoes around her (<b>no lifting, no sex</b>). An <b>ultrasound</b> is the torch checking the light still glows. The nurse holds her hand and whispers <b>“half of these lamps survive — stay calm.”</b>",
        mnemonic: {
            word: "R-E-S-T",
            parts: ["R = Rest (bed rest)", "E = Evaluate (ultrasound, fetal heart)", "S = Support (progesterone + emotional)", "T = no Travail (avoid coitus/strain)"],
            local: "“Os band, bachcha zinda — Aaram, Progesterone, Ultrasound.”"
        },
        palace: "Your **bedside lamp with a crack**. You **lie it flat** (bed rest), apply **glue** (progesterone), shine a **torch** (ultrasound) to check the light, and put up a **'do not disturb'** sign (avoid coitus/strain).",
        terms: [
            ["Closed os", "The door is shut — pregnancy can continue"],
            ["Progesterone", "The 'glue' hormone supporting pregnancy"],
            ["Spotting", "Mild painless bleeding"],
            ["Viable fetus", "Fetal heart present on ultrasound"]
        ],
        diagram:
"   THREATENED ABORTION\n" +
"   bleed + os CLOSED + live fetus\n" +
"   Rx: REST | PROGESTERONE | USG\n" +
"       avoid coitus/strain\n" +
"       reassure (50% continue)",
        dcap: "Closed os + live fetus = rest & support",
        why: [
            "Because the os is closed and the fetus is alive, the bleeding is from the placental edge, not expulsion — so pregnancy can continue.",
            "Progesterone relaxes the myometrium and supports the endometrium, reducing further separation.",
            "Rest and avoiding coitus reduce mechanical stimulation of the cervix, lowering the chance of the bleed progressing."
        ],
        recall: "Threatened abortion = bleeding, <b>closed os, live fetus.</b> Manage with <b>R-E-S-T: Rest, Evaluate (USG), Support (progesterone + emotional), no Travail.</b>",
        viva: [
            "Define threatened abortion.",
            "What is the key diagnostic sign of threatened abortion?",
            "Outline the management of threatened abortion.",
            "What drug is given to support the pregnancy?",
            "What is the nurse's most important supportive role?"
        ],
        mcq: [
            { q: "The key sign of threatened abortion is:", opts: ["Open os", "Closed os with live fetus", "Severe pain", " expelled products"], a: 1 },
            { q: "Management of threatened abortion includes:", opts: ["Immediate evacuation", "Bed rest and progesterone", "Oxytocin infusion", "Hysterectomy"], a: 1 },
            { q: "Threatened abortion occurs in about what % of pregnancies?", opts: ["1–2%", "20–25%", "60%", "90%"], a: 1 },
            { q: "Which hormone is given to support the pregnancy?", opts: ["Oxytocin", "Progesterone", "Oestrogen", "Prolactin"], a: 1 },
            { q: "A woman with threatened abortion should be advised to avoid:", opts: ["Rest", "Ultrasound", "Coitus and straining", "Fluids"], a: 2 }
        ],
        drill: ["Threatened", "Closed os", "Live fetus", "Bed rest", "Progesterone", "Ultrasound", "Reassure"]
    };
    K[118] = kitThreatened;

    /* ---- MTP 1st & 2nd trimester (IDs 119, 120) ---- */
    var kitMTP = {
        lines: [
            "<b>MTP</b> = legal, voluntary termination of pregnancy under the <b>MTP Act 1971 (amended 2021)</b>.",
            "Allowed up to <b>20 weeks</b> routinely, up to <b>24 weeks</b> in special categories.",
            "<b>First trimester (≤12 wk):</b> medical (mifepristone + misoprostol) up to 9 wk; suction evacuation/MVA up to 12 wk.",
            "<b>Second trimester (13–20 wk):</b> needs cervical ripening + stronger contractions.",
            "Second-trimester methods: <b>mifepristone+misoprostol, extra-/intra-amniotic instillation, D&E</b>."
        ],
        story: "Ending a pregnancy legally is like <b>demolishing a building</b> — the method depends on how tall it already is. A <b>small hut (1st trimester, ≤12 wk)</b> can be cleared by <b>two magic pills</b> — <b>mifepristone</b> (cuts the power/progesterone) then <b>misoprostol</b> (makes the walls contract and push everything out) — or by a <b>vacuum cleaner</b> (<b>suction evacuation/MVA</b>). A <b>taller building (2nd trimester)</b> needs <b>heavier machinery</b>: the same pills in higher doses, or <b>saline injected around/inside the sac</b> to start contractions, or a careful <b>D&E</b> dismantling. The <b>MTP Act</b> is the legal permit for all this demolition.",
        mnemonic: {
            word: "20/24-9/12",
            parts: ["20 = legal limit 20 weeks", "24 = special cases to 24 weeks", "9 = medical MTP up to 9 weeks", "12 = suction evacuation up to 12 weeks"],
            local: "“Mifepristone power cut, Misoprostol dhakka.” 2nd trimester mein D&E ya saline."
        },
        palace: "Two **buildings**. A **small hut (≤12 wk)** demolished by **two pills** and a **vacuum hose (MVA)**. A **tall block (13–20 wk)** demolished by **bigger pills + saline hose + D&E crane**. A **permit stamped “MTP Act 20/24 weeks”** is pinned on the gate.",
        terms: [
            ["Mifepristone", "Anti-progesterone — 'cuts the power'"],
            ["Misoprostol", "Prostaglandin — makes uterus contract"],
            ["MVA", "Manual vacuum aspiration (suction)"],
            ["D&E", "Dilatation & evacuation (2nd trimester)"],
            ["MTP Act", "Legal permit — up to 20/24 weeks"]
        ],
        diagram:
"   MTP methods by trimester\n" +
"   1st (<=12wk): mife+miso (<=9)\n" +
"                 suction/MVA (<=12)\n" +
"   2nd (13-20wk): mife+miso\n" +
"                 saline instillation\n" +
"                 D&E\n" +
"   Legal: 20 wk (24 special)",
        dcap: "Mife+Miso early · suction ≤12 · D&E later",
        why: [
            "Mifepristone blocks progesterone (the hormone maintaining pregnancy), so the decidua breaks down; misoprostol then expels it — effective when the conceptus is small.",
            "Beyond 9–12 weeks the fetus is larger, so mechanical suction or D&E is more reliable than drugs alone.",
            "Second-trimester methods must first ripen the cervix and generate stronger contractions to expel a bigger fetus safely."
        ],
        recall: "MTP under MTP Act ≤20 wk (24 special). <b>1st trimester: mifepristone+misoprostol (≤9 wk), suction/MVA (≤12 wk). 2nd trimester: mife+miso, saline, D&E.</b>",
        viva: [
            "Up to how many weeks is MTP legally permitted in India?",
            "What drugs are used for medical MTP and how do they act?",
            "What is the method of choice for MTP at 10 weeks?",
            "Name two methods of second-trimester MTP.",
            "What does MVA stand for?"
        ],
        mcq: [
            { q: "Routine MTP in India is legal up to:", opts: ["12 weeks", "20 weeks", "28 weeks", "24 weeks always"], a: 1 },
            { q: "Medical MTP is preferred up to:", opts: ["6 weeks", "9 weeks", "16 weeks", "20 weeks"], a: 1 },
            { q: "Mifepristone acts by blocking:", opts: ["Oestrogen", "Progesterone", "Oxytocin", "Prolactin"], a: 1 },
            { q: "Suction evacuation (MVA) is the method of choice up to:", opts: ["9 weeks", "12 weeks", "20 weeks", "24 weeks"], a: 1 },
            { q: "A second-trimester MTP method is:", opts: ["Copper-T insertion", "Dilatation & evacuation", "Condom", "Rhythm method"], a: 1 }
        ],
        drill: ["MTP Act", "20/24 weeks", "Mifepristone", "Misoprostol", "MVA/suction", "D&E", "Saline"]
    };
    K[119] = kitMTP;
    K[120] = kitMTP;

    /* ---- APH causes (ID 128) ---- */
    var kitAPH = {
        lines: [
            "<b>Antepartum haemorrhage (APH)</b> = bleeding from the genital tract after <b>28 weeks</b> and before delivery.",
            "Two big placental causes: <b>placenta praevia</b> and <b>abruptio placenta</b>.",
            "Other placental cause: <b>vasa praevia</b>.",
            "Local/incidental causes: <b>show, cervical erosion, polyp, trauma, cervical cancer</b>.",
            "APH is an obstetric emergency — identify the cause fast, because treatment differs."
        ],
        story: "APH is a <b>“red alarm after 28 weeks”</b>. Two villains cause most of the bleeding: <b>Praevia Peter</b>, who parked the placenta <b>right over the exit door</b> so it bleeds <b>painlessly</b> when the door stretches; and <b>Abruptio Anita</b>, who <b>rips the placenta off the wall</b> causing <b>severe pain</b> and hidden bleeding. A third sneaky robber, <b>Vasa Victor</b>, has fetal vessels running across the door that tear. The <b>local troublemakers</b> — show, erosion, polyp, trauma — cause smaller, harmless leaks.",
        mnemonic: {
            word: "P-A-V + local",
            parts: ["P = Placenta praevia", "A = Abruptio placenta", "V = Vasa praevia", "local = show/erosion/polyp/trauma"],
            local: "“28 hafte ke baad ka bleeding = APH. Praevia = painless, Abruptio = painful.”"
        },
        palace: "A **red alarm bell** over a door labelled **28 weeks**. Three villains: **Peter parked over the door** (praevia, painless), **Anita ripping the wall** (abruptio, painful), **Victor with torn wires** (vasa praevia). Small drips from a **tap, a polyp bump, and a scratch** = local causes.",
        terms: [
            ["Placenta praevia", "Placenta over the os — painless bleed"],
            ["Abruptio placenta", "Placenta tears off — painful bleed"],
            ["Vasa praevia", "Fetal vessels crossing the os"],
            ["Show", "Blood-stained mucus plug (harmless)"]
        ],
        diagram:
"   APH (>28 wk)\n" +
"   PLACENTAL:  praevia | abruptio | vasa\n" +
"   LOCAL:      show, erosion, polyp,\n" +
"               trauma, ca cervix\n" +
"   praevia=PAINLESS  abruptio=PAINFUL",
        dcap: "P-A-V placental + local causes",
        why: [
            "After 28 weeks the lower uterine segment stretches; a placenta sitting over it (praevia) shears and bleeds without pain.",
            "Abruption bleeds into the muscle, causing pain and a hard uterus, and the blood may be concealed — so shock can be out of proportion.",
            "Local cervical lesions bleed small amounts and are not life-threatening, which is why identifying the cause changes urgency."
        ],
        recall: "APH = bleeding after 28 wk. <b>Causes: Placental (Praevia, Abruptio, Vasa) + Local (show, erosion, polyp, trauma).</b> Praevia painless, Abruptio painful.",
        viva: [
            "Define antepartum haemorrhage.",
            "Name the two main placental causes of APH.",
            "What is vasa praevia?",
            "List two local causes of APH.",
            "Why is APH considered an obstetric emergency?"
        ],
        mcq: [
            { q: "APH is bleeding from the genital tract after:", opts: ["20 weeks", "28 weeks", "37 weeks", "12 weeks"], a: 1 },
            { q: "Painless APH is characteristic of:", opts: ["Abruptio placenta", "Placenta praevia", "Vasa praevia", "Cervical polyp"], a: 1 },
            { q: "Painful APH with a hard uterus suggests:", opts: ["Placenta praevia", "Abruptio placenta", "Show", "Cervical erosion"], a: 1 },
            { q: "Fetal vessels crossing the internal os describe:", opts: ["Placenta praevia", "Vasa praevia", "Abruptio", "Show"], a: 1 },
            { q: "Which is a local cause of APH?", opts: ["Placenta praevia", "Abruptio", "Cervical polyp", "Vasa praevia"], a: 2 }
        ],
        drill: ["APH >28wk", "Placenta praevia", "Abruptio", "Vasa praevia", "Show", "Painless vs Painful"]
    };
    K[128] = kitAPH;

    /* ---- Placenta praevia (IDs 123, 125) ---- */
    var kitPraevia = {
        lines: [
            "<b>Placenta praevia</b> = placenta implanted in the lower uterine segment, partly/fully covering the internal os.",
            "Classic sign = <b>sudden, painless, bright-red bleeding</b> after 28 weeks, often with malpresentation.",
            "Four grades <b>I–IV</b> (low-lying → marginal → partial → complete).",
            "<b>NEVER do a per-vaginal (PV) examination</b> — it can trigger torrential bleeding.",
            "Manage: conservative if <36 wk & stable (rest + betamethasone); <b>C-section</b> at 37 wk or if bleeding heavy."
        ],
        story: "The placenta is a <b>doormat</b> that got laid <b>right across the baby's exit door</b>. Every time the door (cervix) stretches, the doormat <b>rubs and bleeds</b> — but <b>painlessly</b>, because it's just a surface scrape. The doormat can cover the door <b>a little (Grade I)</b> or <b>completely (Grade IV)</b> — and if it fully blocks the door, the baby <b>cannot come out the front way</b> and needs a <b>trapdoor escape (C-section)</b>. The golden rule: <b>never poke the doormat with a finger (no PV exam)</b> or it will bleed like a burst pipe.",
        mnemonic: {
            word: "P-R-A-E-V-I-A",
            parts: ["P = Painless bleeding", "R = Recurrent (warning bleeds)", "A = After 28 weeks", "Bright red blood", "4 grades I–IV", "No PV exam!", "C-section if complete"],
            local: "“Painless laal bleeding + malpresentation = praevia. Ungli (PV) kabhi nahi!”"
        },
        palace: "A **doorway blocked by a red doormat**. It bleeds **bright red** but the woman is **smiling (painless)**. A **forbidden finger** with a red cross (no PV). A **trapdoor in the ceiling** = C-section. Four doormats stacked = grades I–IV.",
        terms: [
            ["Lower uterine segment", "Where the placenta wrongly parks"],
            ["Painless APH", "The classic praevia warning"],
            ["Grade IV (complete)", "Fully covers os — needs C-section"],
            ["Betamethasone", "Steroid to mature fetal lungs"],
            ["No PV exam", "Poking it causes torrential bleed"]
        ],
        diagram:
"   PLACENTA PRAEVIA grades\n" +
"   I low-lying (not reach os)\n" +
"   II marginal (reach,not cover)\n" +
"   III partial  | IV complete\n" +
"   SIGN: painless bright-red bleed\n" +
"   RULE: NO PV exam!  -> C/S if IV",
        dcap: "Painless bleed · no PV · C/S for grade IV",
        why: [
            "Bleeding is painless because it comes from separation at the placental edge, not into the muscle.",
            "The lower segment stretches in late pregnancy, shearing the low placenta — hence recurrent 'warning' bleeds.",
            "A complete praevia physically blocks the outlet, so vaginal delivery is impossible and C-section is mandatory.",
            "PV exam can dislodge the placenta and cause catastrophic haemorrhage — diagnosis is by ultrasound instead."
        ],
        recall: "Praevia = placenta over os → <b>painless bright-red APH + malpresentation. Grades I–IV. NO PV exam. Conservative <36 wk; C-section for complete/heavy bleed.</b>",
        viva: [
            "Define placenta praevia and name its grades.",
            "What is the classic presentation of placenta praevia?",
            "Why is PV examination contraindicated in placenta praevia?",
            "How is placenta praevia diagnosed?",
            "When is conservative management appropriate?"
        ],
        mcq: [
            { q: "Placenta praevia typically presents with:", opts: ["Painful bleeding", "Painless bright-red bleeding", "Concealed bleeding", "No bleeding"], a: 1 },
            { q: "The investigation of choice for placenta praevia is:", opts: ["PV examination", "Ultrasound", "X-ray", "Amniocentesis"], a: 1 },
            { q: "Complete (Grade IV) placenta praevia usually requires:", opts: ["Vaginal delivery", "Caesarean section", "Induction", "Forceps"], a: 1 },
            { q: "Which is contraindicated in placenta praevia?", opts: ["Ultrasound", "Per-vaginal examination", "Bed rest", "Betamethasone"], a: 1 },
            { q: "Betamethasone in praevia is given to:", opts: ["Stop bleeding", "Mature fetal lungs", "Lower BP", "Prevent infection"], a: 1 }
        ],
        drill: ["Praevia", "Painless bleed", "Grades I-IV", "No PV exam", "Ultrasound", "C-section", "Betamethasone"]
    };
    K[123] = kitPraevia;
    K[125] = kitPraevia;

    /* ---- Abruptio placenta (IDs 126, 129) ---- */
    var kitAbruptio = {
        lines: [
            "<b>Abruptio placenta</b> = premature separation of a normally-sited placenta before delivery.",
            "Presents with <b>sudden severe abdominal pain</b> and a <b>woody-hard, tender uterus</b>.",
            "<b>Shock is out of proportion</b> to visible bleeding (concealed haemorrhage).",
            "Complications: <b>DIC, renal failure, fetal death, Couvelaire uterus</b>.",
            "Manage: <b>IV access, blood transfusion, correct DIC, deliver urgently</b>."
        ],
        story: "The placenta is a <b>sticker</b> that normally peels off AFTER the baby is born. In abruption, a thug (<b>high BP / trauma</b>) <b>rips the sticker off the wall too early</b>. Blood gushes <b>into the wall</b> (concealed), making the uterus as <b>hard and painful as a wooden board</b> and soaking it purple (<b>Couvelaire uterus</b>). The mother goes into <b>deep shock</b> even though <b>only a trickle</b> of blood shows outside — because most blood is trapped inside. It's a race: <b>pour blood back in (transfusion), fix the clotting (DIC), and get the baby out NOW.</b>",
        mnemonic: {
            word: "P-A-I-N-F-U-L",
            parts: ["P = Painful bleeding", "A = After 28 weeks", "I = Increased uterine tone (woody hard)", "N = No relation to visible blood (shock severe)", "F = Fetal distress/death", "U = Urgent delivery", "L = Look for DIC"],
            local: "“Dard + lakdi-jaisa hard pet + zyada shock, kam bleeding = abruptio.”"
        },
        palace: "A **sticker ripped off a wall**, blood **soaking into the wall** turning it **purple (Couvelaire)**. The wall is **wooden and tender**. A **tiny red drip outside** but a **collapsed woman (severe shock)**. A **fire extinguisher = transfusion** and an **exit door = urgent delivery**.",
        terms: [
            ["Concealed haemorrhage", "Blood trapped inside the uterus"],
            ["Woody-hard uterus", "Board-like tender abdomen"],
            ["Couvelaire uterus", "Purple blood-soaked uterus"],
            ["DIC", "Clotting system breakdown"],
            ["Disproportionate shock", "Shock worse than visible blood"]
        ],
        diagram:
"   ABRUPTIO PLACENTA\n" +
"   placenta tears off EARLY\n" +
"   pain + woody-hard uterus\n" +
"   shock >> visible blood\n" +
"   -> DIC, renal failure, IUD\n" +
"   Rx: IV + blood + deliver NOW",
        dcap: "Painful · hard uterus · shock >> blood",
        why: [
            "Blood tracks into the myometrium, making it rigid and tender and explaining pain out of proportion to visible loss.",
            "Retroplacental clot consumes clotting factors, triggering DIC — so coagulation must be corrected alongside transfusion.",
            "Shock is disproportionate because much of the blood loss is concealed within the uterus, not seen externally.",
            "The only definitive treatment is to empty the uterus (deliver), removing the source of bleeding and the DIC trigger."
        ],
        recall: "Abruptio = normally-sited placenta separates early → <b>painful bleed, woody-hard uterus, shock >> visible blood, DIC risk.</b> Manage: IV, blood, correct DIC, deliver urgently.",
        viva: [
            "Define abruptio placenta.",
            "Why is shock out of proportion to visible bleeding in abruption?",
            "What is a Couvelaire uterus?",
            "List two complications of abruptio placenta.",
            "Outline the emergency management of abruption."
        ],
        mcq: [
            { q: "Abruptio placenta presents with:", opts: ["Painless bleeding", "Painful bleeding with hard uterus", "No symptoms", "Itching"], a: 1 },
            { q: "In abruption, shock is:", opts: ["Equal to blood loss", "Out of proportion to visible blood", "Absent", "Mild"], a: 1 },
            { q: "A blood-soaked purple uterus is called:", opts: ["Bicornuate uterus", "Couvelaire uterus", "Didelphys", "Fibroid"], a: 1 },
            { q: "A major complication of abruption is:", opts: ["DIC", "Hyperemesis", "Molar pregnancy", "Prolapse"], a: 0 },
            { q: "Definitive treatment of severe abruption is:", opts: ["Bed rest", "Urgent delivery", "Antibiotics", "Tocolysis"], a: 1 }
        ],
        drill: ["Abruptio", "Painful bleed", "Woody-hard uterus", "Concealed blood", "DIC", "Couvelaire", "Urgent delivery"]
    };
    K[126] = kitAbruptio;
    K[129] = kitAbruptio;

    /* ---- Previa vs Abruptio difference (IDs 124, 127, 130) ---- */
    var kitDiff = {
        lines: [
            "Both cause APH after 28 weeks, but they are <b>opposites</b> in presentation.",
            "<b>Praevia</b> = painless bleeding, soft uterus, often malpresentation, shock matches blood loss.",
            "<b>Abruptio</b> = painful bleeding, woody-hard tender uterus, shock out of proportion.",
            "Praevia blood is <b>bright red</b>; abruptio blood is <b>dark</b> and may be concealed.",
            "A clear <b>comparison table</b> is the examiner's favourite answer."
        ],
        story: "Two sisters both cause bleeding, but their <b>personalities are opposite</b>. <b>Praevia</b> is the <b>calm, smiling sister</b> — she bleeds <b>bright red, painlessly</b>, her belly stays <b>soft</b>, the baby lies <b>any which way (malpresentation)</b>, and her shock matches the blood you see. <b>Abruptio</b> is the <b>angry, screaming sister</b> — she bleeds <b>dark blood, painfully</b>, her belly turns <b>hard as wood</b> and tender, the baby is usually <b>head-down (normal)</b>, and her shock is <b>far worse</b> than the visible blood because she hides most of it inside.",
        mnemonic: {
            word: "P-A-I-N vs P-A-I-N-L-E-S-S",
            parts: ["Praevia: Painless, soft uterus, malpresentation, shock=blood", "Abruptio: Painful, hard uterus, normal lie, shock>>blood"],
            local: "“Praevia = muskurati behen (painless, soft). Abruptio = chillaati behen (painful, hard).”"
        },
        palace: "Two doors. **Door 1 (Praevia)**: a smiling woman, **bright red** pool, a **soft pillow** belly, baby lying **sideways**. **Door 2 (Abruptio)**: a screaming woman, **dark** blood, a **wooden plank** belly, baby **head-down**, a **collapsed body** beside.",
        terms: [
            ["Painless + soft", "Praevia signature"],
            ["Painful + hard", "Abruptio signature"],
            ["Malpresentation", "Common in praevia"],
            ["Concealed blood", "Explains abruptio's severe shock"]
        ],
        diagram:
"   PRAEVIA   vs   ABRUPTIO\n" +
"   pain: none | severe\n" +
"   uterus: soft | woody hard\n" +
"   blood: bright| dark/concealed\n" +
"   lie: malpres.| normal\n" +
"   shock: =blood| >>blood\n" +
"   FHR: usually+| often absent",
        dcap: "Painless-soft vs Painful-hard",
        why: [
            "Praevia bleeds from the placental edge (surface) — painless; abruptio bleeds into muscle — painful and rigid.",
            "A praevia occupies the lower segment, so the baby can't engage head-down → malpresentation; abruption's placenta is normally sited so lie is normal.",
            "Abruptio's concealed haemorrhage means external blood underestimates true loss — hence shock out of proportion.",
            "Fetal heart is usually present in praevia (surface bleed) but often absent in severe abruption (placenta separated = no oxygen)."
        ],
        recall: "<b>Praevia = painless, bright red, soft uterus, malpresentation, shock=blood. Abruptio = painful, dark, woody-hard uterus, normal lie, shock>>blood.</b>",
        viva: [
            "Give three differences between placenta praevia and abruptio placenta.",
            "Which condition shows malpresentation and why?",
            "In which is shock out of proportion to blood loss?",
            "Compare the uterine findings in the two conditions.",
            "Compare the colour of blood in praevia and abruptio."
        ],
        mcq: [
            { q: "Painless APH with a soft uterus indicates:", opts: ["Abruptio", "Placenta praevia", "Vasa praevia", "Rupture uterus"], a: 1 },
            { q: "Woody-hard tender uterus is seen in:", opts: ["Placenta praevia", "Abruptio placenta", "Show", "Polyp"], a: 1 },
            { q: "Shock out of proportion to blood loss occurs in:", opts: ["Placenta praevia", "Abruptio placenta", "Cervical erosion", "Vasa praevia"], a: 1 },
            { q: "Malpresentation is commonly associated with:", opts: ["Abruptio", "Placenta praevia", "Vasa praevia", "Show"], a: 1 },
            { q: "Bright-red bleeding is typical of:", opts: ["Abruptio placenta", "Placenta praevia", "Concealed haemorrhage", "DIC"], a: 1 }
        ],
        drill: ["Praevia painless", "Abruptio painful", "Soft vs hard", "Bright vs dark", "Malpresentation", "Shock proportion"]
    };
    K[124] = kitDiff;
    K[127] = kitDiff;
    K[130] = kitDiff;

    /* ---- PIH / Pre-eclampsia (IDs 136, 137, 138, 139) ---- */
    var kitPIH = {
        lines: [
            "<b>PIH</b> = BP ≥ <b>140/90</b> after <b>20 weeks</b> in a previously normal woman.",
            "Add <b>proteinuria (≥300 mg/24h)</b> and it becomes <b>pre-eclampsia</b>.",
            "Add <b>seizures</b> and it becomes <b>eclampsia</b> — a killer.",
            "Root cause = abnormal placentation → <b>endothelial dysfunction</b> → vasospasm.",
            "Manage: <b>antihypertensives (methyldopa/nifedipine), MgSO4 for seizure prevention, timely delivery</b>."
        ],
        story: "PIH is a <b>plumbing disaster</b>. The placenta's pipes were laid badly (abnormal placentation), so the whole water system (blood vessels) goes into <b>spasm</b> and the pressure (BP) shoots up after the 5th month. The high pressure <b>cracks the kidney filter</b>, so protein leaks into urine (<b>pre-eclampsia</b>). If the pressure is not controlled, it <b>blasts the brain's circuits</b> causing fits (<b>eclampsia</b>). The plumbers' tools: <b>methyldopa/nifedipine</b> to lower pressure, <b>MgSO4</b> as a <b>fire-blanket</b> to stop the brain from fitting, and finally <b>delivering the baby</b> to remove the faulty plumbing.",
        mnemonic: {
            word: "140/90-20-P-S",
            parts: ["140/90 = BP threshold", "20 = after 20 weeks", "P = Proteinuria → pre-eclampsia", "S = Seizures → eclampsia"],
            local: "“BP badha + protein urine + fits = PIH ka khatra. MgSO4 = fits ka blanket.”"
        },
        palace: "A **water pump (placenta)** with **bent pipes**. A **pressure gauge reading 140/90**. The **kidney as a leaking sieve** dripping **protein**. The **brain sparking** with a **MgSO4 fire-blanket** thrown over it. A **calendar marked 20 weeks**.",
        terms: [
            ["PIH", "High BP after 20 weeks"],
            ["Proteinuria", "Protein leaking in urine"],
            ["Eclampsia", "PIH + seizures"],
            ["MgSO4", "Anti-seizure 'fire blanket'"],
            ["HELLP", "Severe form — liver + blood breakdown"]
        ],
        diagram:
"   PIH ladder\n" +
"   Gest.HTN  BP>=140/90, no protein\n" +
"   PRE-ECLAMPSIA + proteinuria\n" +
"   ECLAMPSIA  + seizures\n" +
"   Rx: methyldopa/nifedipine\n" +
"       MgSO4 (seizure) | deliver",
        dcap: "140/90 after 20wk + protein + fits",
        why: [
            "Abnormal placentation releases factors that damage endothelium, causing generalised vasospasm → hypertension.",
            "Vasospasm in the glomeruli makes them leaky, so protein appears in urine — the marker of pre-eclampsia.",
            "Cerebral vasospasm and oedema lower the seizure threshold; MgSO4 (a cerebral vasodilator + membrane stabiliser) prevents fits.",
            "Only delivery removes the diseased placenta, the root cause — so it is the definitive cure."
        ],
        recall: "PIH = BP ≥140/90 after 20 wk. <b>+proteinuria = pre-eclampsia, +seizures = eclampsia.</b> Treat: antihypertensives, MgSO4 for seizures, deliver.",
        viva: [
            "Define PIH and give its diagnostic BP and timing.",
            "Differentiate pre-eclampsia from eclampsia.",
            "Which drug is used for seizure prophylaxis and why?",
            "Name two antihypertensives used in pregnancy.",
            "What is the definitive treatment of PIH?"
        ],
        mcq: [
            { q: "PIH is diagnosed when BP is ≥140/90 after:", opts: ["12 weeks", "20 weeks", "28 weeks", "37 weeks"], a: 1 },
            { q: "Pre-eclampsia = PIH plus:", opts: ["Seizures", "Proteinuria", "Bleeding", "Fever"], a: 1 },
            { q: "The drug of choice to prevent eclamptic seizures is:", opts: ["Methyldopa", "Magnesium sulphate", "Nifedipine", "Oxytocin"], a: 1 },
            { q: "Eclampsia is PIH with:", opts: ["Proteinuria", "Convulsions", "Oedema", "Headache only"], a: 1 },
            { q: "Definitive treatment of PIH is:", opts: ["Antihypertensives", "Bed rest", "Delivery of the baby", "Diuretics"], a: 2 }
        ],
        drill: ["PIH 140/90", "After 20 wk", "Proteinuria", "Pre-eclampsia", "Eclampsia", "MgSO4", "Methyldopa", "Deliver"]
    };
    K[136] = kitPIH;
    K[137] = kitPIH;
    K[138] = kitPIH;
    K[139] = kitPIH;

    /* ---- GDM / Diabetes in pregnancy (IDs 144, 145) ---- */
    var kitGDM = {
        lines: [
            "<b>GDM</b> = glucose intolerance first appearing or recognised during pregnancy.",
            "Placental hormones (hPL, cortisol, oestrogen) cause natural <b>insulin resistance</b>.",
            "Effects on mother: <b>PIH, polyhydramnios, infections, operative delivery, future type-2 DM</b>.",
            "Effects on fetus: <b>macrosomia (big baby), birth injury, neonatal hypoglycaemia, stillbirth</b>.",
            "Manage: <b>medical nutrition therapy, glucose monitoring, insulin if needed</b>, careful delivery timing."
        ],
        story: "Pregnancy turns the mother's body into a <b>sugar factory on strike</b>. The placenta releases <b>anti-insulin hormones</b> (hPL, cortisol) that jam the insulin keys, so sugar piles up in the blood. This extra sugar is like <b>over-feeding the baby through a pipe</b> — the baby grows <b>fat and huge (macrosomia)</b>, gets <b>stuck at delivery</b> (shoulder dystocia), and after birth its own pancreas, used to high sugar, <b>over-makes insulin</b> and crashes the baby's sugar (<b>neonatal hypoglycaemia</b>). The fix: a <b>diet chart (MNT)</b>, regular <b>sugar checks</b>, and <b>insulin</b> if the strike continues — because insulin molecules are too big to cross and hurt the baby.",
        mnemonic: {
            word: "S-U-G-A-R",
            parts: ["S = Screen (OGCT/OGTT)", "U = Urine & blood sugar monitoring", "G = Growth of fetus (macrosomia watch)", "A = Adjust diet (MNT) + insulin", "R = Review delivery timing"],
            local: "“Maa mein zyada cheeni = bada bachcha, mushkil delivery, baby ka sugar crash.”"
        },
        palace: "A **sugar factory with jammed locks (insulin resistance)**. Sugar flows through a **pipe to a giant baby (macrosomia)**. The baby's **pancreas is overworking** then **crashing (hypoglycaemia)**. A **diet chart**, a **glucometer**, and an **insulin pen** sit on the shelf.",
        terms: [
            ["GDM", "Diabetes first found in pregnancy"],
            ["Insulin resistance", "Placental hormones jam insulin"],
            ["Macrosomia", "Big baby >4 kg"],
            ["Neonatal hypoglycaemia", "Baby's sugar crash after birth"],
            ["MNT", "Medical nutrition therapy (diet)"]
        ],
        diagram:
"   GDM\n" +
"   placental hormones -> insulin resist\n" +
"   MOTHER: PIH,polyhydramnios, infection\n" +
"   FETUS : macrosomia, injury, hypoG, SB\n" +
"   Rx: MNT + monitor + insulin\n" +
"       (insulin too big to cross placenta)",
        dcap: "Big baby + sugar crash · insulin safe",
        why: [
            "Placental hormones antagonise insulin so the mother shunts glucose to the fetus — in GDM this overshoots, raising maternal glucose.",
            "Fetal hyperglycaemia stimulates fetal insulin, a growth hormone — producing macrosomia and fat shoulders (birth injury risk).",
            "After cord clamping the glucose supply stops but fetal insulin stays high → neonatal hypoglycaemia in the first hours.",
            "Insulin is used (not oral drugs) because it does not cross the placenta and is safe for the fetus."
        ],
        recall: "GDM = glucose intolerance in pregnancy. <b>Mother: PIH, polyhydramnios, infection, future DM. Fetus: macrosomia, injury, hypoglycaemia.</b> Manage: MNT, monitor, insulin.",
        viva: [
            "Define gestational diabetes mellitus.",
            "Why does pregnancy cause insulin resistance?",
            "List two effects of GDM on the fetus.",
            "Why is insulin preferred over oral drugs in pregnancy?",
            "What is the target of medical nutrition therapy in GDM?"
        ],
        mcq: [
            { q: "GDM is glucose intolerance first recognised:", opts: ["Before pregnancy", "During pregnancy", "After delivery", "In the newborn"], a: 1 },
            { q: "The commonest fetal effect of GDM is:", opts: ["IUGR", "Macrosomia", "Anaemia", "Deafness"], a: 1 },
            { q: "Neonatal hypoglycaemia occurs because:", opts: ["Fetal insulin remains high after birth", "Mother stops feeding", "Placenta stays", "Baby is cold"], a: 0 },
            { q: "Insulin is preferred in pregnancy because it:", opts: ["Is cheap", "Does not cross the placenta", "Tastes good", "Needs no monitoring"], a: 1 },
            { q: "First-line management of GDM is:", opts: ["Insulin", "Medical nutrition therapy", "Surgery", "Bed rest"], a: 1 }
        ],
        drill: ["GDM", "Insulin resistance", "Macrosomia", "Neonatal hypoglycaemia", "MNT", "Insulin safe", "Monitor sugar"]
    };
    K[144] = kitGDM;
    K[145] = kitGDM;

    /* ---- PPH (IDs 211, 212, 213, 214, 215, 216) ---- */
    var kitPPH = {
        lines: [
            "<b>PPH</b> = blood loss ≥ <b>500 mL</b> after vaginal delivery or ≥ <b>1000 mL</b> after C-section.",
            "<b>Primary</b> within 24 h; <b>Secondary</b> 24 h–6 weeks.",
            "Causes = <b>4 T's: Tone (70%), Trauma (20%), Tissue (10%), Thrombin (1%)</b>.",
            "Atonic uterus (Tone) is the commonest cause.",
            "Manage: <b>rub the uterus + oxytocin + IV fluids + bimanual compression</b>; prevent with <b>AMTSL</b>."
        ],
        story: "After the baby leaves, the uterus is a <b>deflating balloon</b> that must <b>squeeze shut</b> to close the taps where the placenta was attached. PPH happens when one of <b>4 villains</b> stops this: <b>Tone</b> (the balloon stays soft and floppy — 70% of cases), <b>Trauma</b> (a tear in the pipe), <b>Tissue</b> (a piece of placenta left behind keeping the tap open), and <b>Thrombin</b> (the blood forgets how to clot). The nurse becomes a <b>firefighter</b>: <b>rub the balloon hard (fundal massage)</b>, inject <b>oxytocin</b> to make it squeeze, run in <b>IV fluids/blood</b>, and if needed <b>clamp it with two hands (bimanual compression)</b>.",
        mnemonic: {
            word: "4-T",
            parts: ["T = Tone (atony, 70%)", "T = Trauma (tears, 20%)", "T = Tissue (retained placenta, 10%)", "T = Thrombin (clotting, 1%)"],
            local: "“500 mL vaginal, 1000 mL CS. Uterus ko RAGDO, oxytocin do.”"
        },
        palace: "A **soft balloon (atony)** leaking water, a **torn pipe (trauma)**, a **stuck rag (tissue)** in the tap, and **runny paint (thrombin)** that won't clot. You **rub the balloon**, spray **oxytocin glue**, and **squeeze with two hands**.",
        terms: [
            ["Atony", "Soft floppy uterus — top cause"],
            ["4 T's", "Tone, Trauma, Tissue, Thrombin"],
            ["Fundal massage", "Rubbing the uterus to make it firm"],
            ["Bimanual compression", "Two-handed squeeze of the uterus"],
            ["AMTSL", "Active 3rd-stage care to PREVENT PPH"]
        ],
        diagram:
"   PPH >=500mL (>=1000 CS)\n" +
"   4 T's: TONE 70% | TRAUMA 20%\n" +
"          TISSUE 10%| THROMBIN 1%\n" +
"   Rx: RUB uterus + oxytocin\n" +
"       + IV fluids + bimanual\n" +
"   Prevent: AMTSL",
        dcap: "4 T's · rub + oxytocin · prevent AMTSL",
        why: [
            "The uterus stops bleeding by contracting and kinking the spiral arteries at the placental site — atony defeats this 'living ligature'.",
            "Retained tissue physically prevents the uterus from contracting down, so the bleeding vessels stay open.",
            "Oxytocin and massage both drive myometrial contraction, the single most effective first response to atony.",
            "AMTSL (oxytocin + CCT + massage) keeps the uterus contracted through the third stage, cutting PPH incidence dramatically."
        ],
        recall: "PPH = ≥500 mL (≥1000 CS). <b>4 T's: Tone 70%, Trauma 20%, Tissue 10%, Thrombin 1%.</b> Manage: rub uterus, oxytocin, IV fluids, bimanual compression. Prevent: AMTSL.",
        viva: [
            "Define postpartum haemorrhage with its volumes.",
            "What are the 4 T's of PPH?",
            "Which is the commonest cause of PPH?",
            "Outline the immediate management of atonic PPH.",
            "How is PPH prevented?"
        ],
        mcq: [
            { q: "Primary PPH is blood loss ≥500 mL within:", opts: ["1 hour", "24 hours", "6 weeks", "7 days"], a: 1 },
            { q: "The commonest cause of PPH is:", opts: ["Trauma", "Uterine atony", "Retained placenta", "Coagulopathy"], a: 1 },
            { q: "The 4 T's of PPH include all EXCEPT:", opts: ["Tone", "Trauma", "Tissue", "Tumour"], a: 3 },
            { q: "First drug given in atonic PPH is:", opts: ["Magnesium sulphate", "Oxytocin", "Methyldopa", "Antibiotics"], a: 1 },
            { q: "PPH is best prevented by:", opts: ["Bed rest", "AMTSL", "Antibiotics", "Iron tablets"], a: 1 }
        ],
        drill: ["PPH 500mL", "Tone 70%", "Trauma", "Tissue", "Thrombin", "Rub uterus", "Oxytocin", "AMTSL"]
    };
    K[211] = kitPPH;
    K[212] = kitPPH;
    K[213] = kitPPH;
    K[214] = kitPPH;
    K[215] = kitPPH;
    K[216] = kitPPH;

})();
