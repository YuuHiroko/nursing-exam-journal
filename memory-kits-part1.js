/* ============================================================================
   MEMORY KITS — PART 1 (window.MEMORY_KITS)
   "Never-Forget" memory-coach data for starred OBG questions.
   Grouped by topic. Duplicate questions share the same kit object by reference
   so nothing is written twice. All fields documented in memory-coach.js.
   ============================================================================ */
window.MEMORY_KITS = (function () {
    var K = {};

    /* ======================================================================
       LABOUR & BIRTH CLUSTER (3★)
       ====================================================================== */

    /* ---- Cardinal movements of labour (IDs 47, 60) ---- */
    var kitCardinal = {
        lines: [
            "Labour is not a straight slide — the baby's head must twist and bend to pass a curved pelvis.",
            "These automatic adjustments are the <b>cardinal movements</b>, done passively by uterine contractions.",
            "Order: <b>Engagement → Descent → Flexion → Internal rotation → Crowning → Extension → Restitution → External rotation → Expulsion</b>.",
            "Flexion is the hero — it presents the smallest head diameter (suboccipitobregmatic, 9.5 cm).",
            "Internal rotation turns the occiput to the front (under the pubic arch) so the head can slip out."
        ],
        story: "Imagine a sleepy baby trying to leave a spiral staircase fire-escape. First it <b>Engages</b> its head through the doorway, then <b>Descends</b> down the steps. A kind nurse whispers <b>“tuck your chin”</b> — that's <b>Flexion</b> — so the head becomes its smallest ball-shape. Halfway down, the stairs twist, so the baby does an <b>Internal Rotation</b> spin to face the exit. At the last step the head reaches the light (<b>Crowning</b>), the baby looks UP to see the sun (<b>Extension</b>), then politely says sorry to the mother by turning the head back (<b>Restitution</b>), rotates the shoulders (<b>External Rotation</b>), and — WHOOSH — the whole body is <b>Expelled</b> into the nurse's arms.",
        mnemonic: {
            word: "EDFICERE E",
            parts: [
                "E = Engagement", "D = Descent", "F = Flexion", "I = Internal rotation",
                "C = Crowning", "E = Extension", "R = Restitution", "E = External rotation", "E = Expulsion"
            ],
            local: "Classic version: “Every Darling Fetus Is Coming Early, Ready Enough”"
        },
        palace: "Walk into your hostel room. **Door** = the baby's head Engaging through it. You **Descend** the **staircase**. At the mirror you tuck your chin = **Flexion**. The room **spins** you to face the window = **Internal rotation**. You push the **crown** of your head through the **window** = Crowning, then look up at the **sun** = Extension. You apologise to the wall (**Restitution**), rotate your **shoulders** (External rotation) and **leap** out = Expulsion.",
        terms: [
            ["Engagement", "Head 'booked' through the pelvic doorway"],
            ["Flexion", "Baby tucking chin to chest like a shy nod"],
            ["Internal rotation", "The spin — occiput turns to the front"],
            ["Crowning", "Head visible at the vulva like a crown"],
            ["Restitution", "Head untwists back to face the thigh"],
            ["Suboccipitobregmatic", "Smallest 'ticket size' 9.5 cm in full flexion"]
        ],
        diagram:
"   CARDINAL MOVEMENTS (Vertex)\n" +
"   ---------------------------\n" +
"   1 ENGAGE    head enters pelvis\n" +
"   2 DESCEND   moves down\n" +
"   3 FLEX      chin->chest (9.5cm)\n" +
"   4 INT.ROT   occiput->front\n" +
"   5 CROWN     head at vulva\n" +
"   6 EXTEND    head born\n" +
"   7 RESTITUTE head untwists\n" +
"   8 EXT.ROT   shoulders turn\n" +
"   9 EXPEL     body born!",
        dcap: "E-D-F-I-C-E-R-E-E : redraw in 30 s",
        why: [
            "The pelvis is curved and narrower at the outlet, so a rigid straight head would get stuck — flexion + rotation solve this.",
            "Flexion reduces the presenting diameter from 11.5 cm (occipitofrontal) to 9.5 cm — a smaller circle fits a tighter tube.",
            "Internal rotation uses the widest part of the pelvic outlet (antero-posterior) for the head's longest diameter.",
            "Restitution & external rotation realign the head with the shoulders so the shoulders rotate and deliver next."
        ],
        recall: "Say the 9 moves in order: <b>Engagement, Descent, Flexion, Internal rotation, Crowning, Extension, Restitution, External rotation, Expulsion.</b> Flexion gives the smallest diameter 9.5 cm; internal rotation brings occiput anterior.",
        viva: [
            "What are the cardinal movements of labour, in order?",
            "Which movement presents the smallest diameter of the fetal head?",
            "What is the suboccipitobregmatic diameter and why does it matter?",
            "In which direction does the occiput rotate during internal rotation?",
            "What is the difference between restitution and external rotation?"
        ],
        mcq: [
            { q: "Smallest presenting diameter in a well-flexed vertex is:", opts: ["Occipitofrontal 11.5 cm", "Suboccipitobregmatic 9.5 cm", "Mentovertical 13.5 cm", "Bitemporal 8 cm"], a: 1 },
            { q: "Crowning means:", opts: ["Head enters the pelvis", "Head visible at the vulva and does not recede", "Shoulders rotate", "Placenta separates"], a: 1 },
            { q: "Internal rotation turns the occiput towards the:", opts: ["Sacrum", "Symphysis pubis (anterior)", "Right lateral", "No rotation"], a: 1 },
            { q: "Which is the FIRST cardinal movement?", opts: ["Flexion", "Descent", "Engagement", "Extension"], a: 2 },
            { q: "Restitution is:", opts: ["The body being expelled", "The head untwisting to realign with shoulders", "The cervix dilating", "The placenta delivering"], a: 1 }
        ],
        drill: ["Engagement", "Descent", "Flexion", "Internal rotation", "Crowning", "Extension", "Restitution", "External rotation", "Expulsion"]
    };
    K[47] = kitCardinal;
    K[60] = kitCardinal;
    K[44] = kitCardinal; // mechanism of labour in LOA — same cardinal movements

    /* ---- Stages of labour (IDs 42, 43, 59, 98, 99) ---- */
    var kitStages = {
        lines: [
            "Normal labour = spontaneous, term (37–42 wk), vertex baby, delivered within ~18 hours, no complications.",
            "Labour has <b>4 stages</b>: opening, birth, placenta, observation.",
            "<b>1st stage</b> = onset of true labour → cervix fully dilated (10 cm); ~12 h in primi, ~6 h in multi.",
            "<b>2nd stage</b> = full dilatation → birth of baby (~1–2 h primi). <b>3rd</b> = baby → placenta out (5–15 min).",
            "<b>4th stage</b> = 1 hour of close observation for bleeding after the placenta."
        ],
        story: "Think of labour as a <b>4-act play</b>. <b>Act 1 “The Opening”</b> — the cervix, a stubborn door, slowly opens from 0 to 10 cm while the mother waits the longest (this act is the marathon). <b>Act 2 “The Star Appears”</b> — the baby makes its grand entrance and is born. <b>Act 3 “The Supporting Actor Leaves”</b> — the placenta, having done its job, exits in 5–15 minutes. <b>Act 4 “The Security Watch”</b> — for one hour the nurse stands guard checking the uterus stays firm and no bleeding sneaks back.",
        mnemonic: {
            word: "O B P O",
            parts: ["1 = Opening of cervix (to 10 cm)", "2 = Birth of baby", "3 = Placenta delivered", "4 = Observation 1 hour"],
            local: "Yad rakho: “OPEN, BABY, PLACENTA, OBSERVE” — 4 darwaze."
        },
        palace: "Your day = the 4 stages. **Morning** you OPEN the door (cervix opens) = Stage 1. **Afternoon** the BABY arrives at your door = Stage 2. **Evening** you take out the PLACENTA like a delivered parcel = Stage 3. **Night** you OBSERVE/wait one hour before sleeping = Stage 4.",
        terms: [
            ["Effacement", "Cervix thinning like paper"],
            ["Dilatation", "Cervix opening 0→10 cm"],
            ["Show", "Blood-stained mucus plug falling out"],
            ["Stage 2", "The 'pushing & birth' act"],
            ["Stage 3", "Placenta's exit, 5–15 min"]
        ],
        diagram:
"   THE 4 STAGES OF LABOUR\n" +
"   Stage | What happens        | Primi\n" +
"   ------+---------------------+--------\n" +
"    1    | onset -> 10 cm      | ~12 h\n" +
"    2    | 10 cm -> baby born  | ~1-2 h\n" +
"    3    | baby -> placenta    | 5-15 m\n" +
"    4    | observe 1 hour      | 1 h",
        dcap: "0→10cm → baby → placenta → watch",
        why: [
            "Stage 1 is longest because the cervix must first thin (efface) then open — primis take longer as tissues have never stretched before.",
            "Stage 3 is kept short & actively managed because a relaxed uterus after separation is the main bleeding (PPH) risk.",
            "Stage 4 observation catches early PPH — most atonic bleeds happen in the first hour after the placenta."
        ],
        recall: "4 stages: <b>1 = cervix opens to 10 cm, 2 = baby born, 3 = placenta out (5–15 min), 4 = observe 1 hour.</b> Primi stage 1 ≈ 12 h.",
        viva: [
            "Name the four stages of labour.",
            "What defines the end of the first stage?",
            "How long is the third stage normally?",
            "Why is the fourth stage important?",
            "What is the normal duration of the first stage in a primigravida?"
        ],
        mcq: [
            { q: "The second stage of labour ends with:", opts: ["Full dilatation", "Birth of the baby", "Delivery of placenta", "1 hour observation"], a: 1 },
            { q: "Third stage of labour normally lasts:", opts: ["12 hours", "1–2 hours", "5–15 minutes", "24 hours"], a: 2 },
            { q: "Full cervical dilatation is:", opts: ["4 cm", "7 cm", "10 cm", "2 cm"], a: 2 },
            { q: "Fourth stage of labour is:", opts: ["Birth of baby", "1 hour of observation after placenta", "Cervical dilatation", "Placental separation"], a: 1 },
            { q: "First stage in a multigravida is usually about:", opts: ["12 h", "6 h", "24 h", "1 h"], a: 1 }
        ],
        drill: ["Stage 1: cervix to 10 cm", "Stage 2: baby born", "Stage 3: placenta", "Stage 4: observe 1 hr", "Effacement", "Dilatation", "Show"]
    };
    K[42] = kitStages;
    K[43] = kitStages;
    K[59] = kitStages;
    K[98] = kitStages;
    K[99] = kitStages;

    /* ---- True vs False labour (IDs 45, 100) ---- */
    var kitTrueFalse = {
        lines: [
            "<b>True labour</b> pains are regular, get stronger and closer, and dilate the cervix.",
            "<b>False labour</b> (Braxton Hicks) pains are irregular, weak, stay the same, and don't change the cervix.",
            "Walking makes true pains <b>stronger</b>; rest makes false pains <b>disappear</b>.",
            "True labour brings a <b>show</b> and cervical effacement + dilatation; false labour does not.",
            "Sedation does not stop true labour but relieves false labour."
        ],
        story: "Two neighbours knock on your door. <b>“True” Tina</b> knocks <b>regularly</b>, each knock <b>louder</b> and <b>closer</b> together, and she won't leave no matter how much you ignore her — she even pushes the door <b>open</b> (cervix dilates) and leaves a <b>show</b> of muddy footprints. <b>“False” Farida</b> knocks <b>randomly</b>, always at the <b>same weak</b> strength, and the moment you lie down and rest she <b>gives up and goes home</b>, leaving no trace.",
        mnemonic: {
            word: "R-I-D-E-S",
            parts: ["R = Regular", "I = Increasing intensity", "D = Dilates cervix", "E = Enhanced by walking", "S = Show present"],
            local: "True pain RIDES you to delivery. False pain just sits (irregular, no dilatation, relieved by rest)."
        },
        palace: "Stand at your gate. A **regular drumbeat** getting louder = true labour. The door **opens wider** = cervical dilatation. Muddy **footprints** on the floor = the show. Now a **random tapping** that stops when you sit on the **sofa** = false labour.",
        terms: [
            ["Braxton Hicks", "The 'practice' false contractions"],
            ["Show", "Blood-stained mucus = true labour sign"],
            ["Effacement", "Cervix thinning (only in true)"],
            ["Regular rhythm", "The drumbeat of true labour"]
        ],
        diagram:
"   TRUE vs FALSE LABOUR\n" +
"   Feature    TRUE          FALSE\n" +
"   ---------+-------------+-----------\n" +
"   Rhythm   | regular     | irregular\n" +
"   Intensity| increasing  | same/weak\n" +
"   Walking  | worse       | relieved\n" +
"   Cervix   | efface+open | no change\n" +
"   Show     | present     | absent\n" +
"   Sedation | no relief   | relieved",
        dcap: "Regular + dilates = TRUE",
        why: [
            "True contractions are driven by real oxytocin surges and prostaglandins, so they are rhythmic and progressive.",
            "Cervical change only happens when contractions are strong & coordinated — weak Braxton Hicks can't efface or dilate.",
            "Walking increases pressure of the head on the cervix → intensifies true labour; rest reduces uterine irritability → settles false labour."
        ],
        recall: "True = <b>Regular, Increasing, Dilates cervix, Enhanced by walking, Show (RIDES).</b> False = irregular, weak, no dilatation, relieved by rest.",
        viva: [
            "Give three differences between true and false labour pain.",
            "What is a 'show' and which type of labour has it?",
            "How does walking affect true versus false labour?",
            "What happens to the cervix in true labour?",
            "What are Braxton Hicks contractions?"
        ],
        mcq: [
            { q: "A feature of TRUE labour is:", opts: ["Irregular contractions", "No cervical change", "Progressive cervical dilatation", "Relieved by rest"], a: 2 },
            { q: "False labour pain is usually relieved by:", opts: ["Walking", "Sedation/rest", "Oxytocin", "Pushing"], a: 1 },
            { q: "The 'show' in labour is:", opts: ["Meconium", "Blood-stained mucus discharge", "Amniotic fluid", "Lochia"], a: 1 },
            { q: "In true labour, contractions:", opts: ["Stay the same", "Become regular and stronger", "Disappear with rest", "Are painless"], a: 1 },
            { q: "Braxton Hicks contractions are seen in:", opts: ["True labour", "False labour", "Second stage", "Third stage"], a: 1 }
        ],
        drill: ["True = regular", "True = dilates", "False = irregular", "Show", "Braxton Hicks", "RIDES"]
    };
    K[45] = kitTrueFalse;
    K[100] = kitTrueFalse;

    /* ---- Third stage / AMTSL + management (ID 46) ---- */
    var kitThird = {
        lines: [
            "The <b>third stage</b> = from birth of baby to delivery of the placenta (5–15 min).",
            "It is managed <b>actively (AMTSL)</b> to prevent postpartum haemorrhage.",
            "AMTSL = <b>Oxytocin 10 IU IM</b> within 1 minute + <b>Controlled Cord Traction</b> + <b>Uterine massage</b>.",
            "Signs of placental separation: cord lengthens, uterus becomes globular & firm, gush of blood, uterus rises.",
            "Never pull the cord without a contracted uterus — risk of inversion and bleeding."
        ],
        story: "The placenta is a guest who must leave politely. The midwife uses the <b>“AMTSL three-step checkout”</b>: first she hands the guest a <b>strong coffee</b> (<b>Oxytocin 10 IU</b>) so the uterus wakes up and contracts; then she gently <b>walks the guest out by the hand</b> (<b>Controlled Cord Traction</b> with counter-traction guarding the uterus); finally she <b>rubs the host's belly</b> (<b>uterine massage</b>) to keep it firm so it doesn't bleed after the guest leaves. The guest signals it is ready to leave by <b>dropping a rope</b> (cord lengthens) and a <b>goodbye splash</b> (gush of blood).",
        mnemonic: {
            word: "O-C-M",
            parts: ["O = Oxytocin 10 IU IM within 1 min", "C = Controlled Cord Traction", "M = uterine Massage"],
            local: "Separation signs — “L-G-G-R”: Lengthening of cord, Globular uterus, Gush of blood, Rises up."
        },
        palace: "Your kitchen = third stage. You **inject coffee** into the wall (oxytocin) so the room tightens. You **pull a rope** steadily while holding the wall (CCT + counter-traction). You **rub** the wall till it's firm (massage). The rope **drops lower** and **water splashes** = placenta separated.",
        terms: [
            ["AMTSL", "Active 3-step management to stop bleeding"],
            ["Controlled Cord Traction", "Gentle steady pull on the cord"],
            ["Counter-traction", "Other hand guarding the uterus"],
            ["Globular firm uterus", "The 'ball' sign of separation"]
        ],
        diagram:
"   AMTSL (3 steps)\n" +
"   1 OXYTOCIN 10 IU IM (<1 min)\n" +
"   2 CCT  --pull cord, guard fundus\n" +
"   3 MASSAGE uterus till firm\n" +
"   SEPARATION SIGNS:\n" +
"   cord lengthens | gush of blood\n" +
"   uterus globular, firm, rises",
        dcap: "Oxytocin → CCT → Massage",
        why: [
            "Oxytocin makes the uterus contract strongly, shearing the placenta off its bed and clamping bleeding vessels.",
            "Controlled traction only works once the uterus is contracted; pulling too early can invert the uterus or tear the cord.",
            "Massage keeps the myometrium contracted so the spiral arteries at the placental site stay kinked and closed."
        ],
        recall: "AMTSL = <b>Oxytocin 10 IU IM (within 1 min) → Controlled Cord Traction → uterine Massage.</b> Separation signs: cord lengthens, globular firm uterus, gush of blood.",
        viva: [
            "What are the three components of AMTSL?",
            "What dose and route of oxytocin is used?",
            "Name two signs of placental separation.",
            "Why is counter-traction applied during CCT?",
            "What is the danger of pulling the cord before separation?"
        ],
        mcq: [
            { q: "In AMTSL, oxytocin given is:", opts: ["5 IU IV", "10 IU IM within 1 minute", "10 IU IV slowly", "2 IU SC"], a: 1 },
            { q: "A sign of placental separation is:", opts: ["Uterus becomes soft", "Cord lengthens with a gush of blood", "Fundus descends", "FHR drops"], a: 1 },
            { q: "Controlled cord traction should be done only when:", opts: ["Cervix is 4 cm", "Uterus is well contracted", "Baby is crowning", "Bladder is full"], a: 1 },
            { q: "The third stage is managed actively mainly to prevent:", opts: ["Sepsis", "Postpartum haemorrhage", "Retained placenta", "Shock"], a: 1 },
            { q: "Normal duration of the third stage is:", opts: ["5–15 minutes", "1–2 hours", "12 hours", "24 hours"], a: 0 }
        ],
        drill: ["Oxytocin 10 IU", "Controlled cord traction", "Uterine massage", "Cord lengthens", "Gush of blood", "Globular uterus"]
    };
    K[46] = kitThird;

    /* ---- Partograph (ID 48) ---- */
    var kitParto = {
        lines: [
            "A <b>partograph</b> is a single chart recording labour progress + maternal & fetal condition.",
            "Plotting starts in the <b>active phase at 4 cm</b> dilatation.",
            "It has an <b>Alert line</b> (expected 1 cm/hour) and an <b>Action line</b> (4 hours to the right).",
            "Crossing the alert line = slow labour; crossing the action line = intervene / refer.",
            "It is an early-warning tool that detects prolonged / obstructed labour and prevents complications."
        ],
        story: "The partograph is a <b>railway timetable</b> for the baby's journey. The cervix is a train that must move <b>1 cm every hour</b>. The <b>Alert line</b> is the first station master waving a <b>yellow flag</b> — “train is late, watch closely.” If the train keeps dawdling and crosses the <b>Action line</b> 4 hours later, the <b>red flag</b> comes down — “call for help, refer or intervene now!” Without this timetable, a stuck train (obstructed labour) could crash quietly.",
        mnemonic: {
            word: "4-1-4",
            parts: ["4 = start plotting at 4 cm", "1 = cervix should open 1 cm/hour", "4 = action line is 4 h right of alert"],
            local: "Components 3 hissab: Fetal (FHR), Labour (dilatation, descent, contractions), Maternal (BP, pulse, temp, urine, drugs)."
        },
        palace: "Your study table = the partograph. The **x-axis is a clock**, the **y-axis is 0–10 cm**. You plot an **X at 4 cm** to start. Draw a **yellow diagonal line** (alert). 4 cm to its right draw a **red line** (action). Your plotted X's must stay LEFT of the yellow line.",
        terms: [
            ["Alert line", "Yellow 'warning' line — 1 cm/hr"],
            ["Action line", "Red 'act now' line, 4 h later"],
            ["Active phase", "From 4 cm dilatation"],
            ["Cervicograph", "The dilatation-vs-time graph"]
        ],
        diagram:
"   cm |10 . . . . . . X\n" +
"      | 8 . . . . X  /|\n" +
"      | 6 . . X   / A|C\n" +
"      | 4 X .  /  L |T\n" +
"      | 2   /  E  I |\n" +
"      | 0 /  R  O  N\n" +
"      +----------------> hours\n" +
"     plot X from 4 cm; keep LEFT of ALERT",
        dcap: "Start at 4 cm · 1 cm/hr · act at action line",
        why: [
            "Labour normally progresses ~1 cm/hour in the active phase, so the alert line is simply that expected speed drawn as a line.",
            "The 4-hour gap between alert and action gives time to reassess, hydrate, and transfer before true obstruction sets in.",
            "Recording FHR, contractions and maternal vitals on the SAME page means a single glance reveals both slow labour and distress."
        ],
        recall: "Partograph = one-page labour chart. <b>Start at 4 cm, expect 1 cm/hr, alert line then action line 4 h later.</b> Crossing action line = intervene.",
        viva: [
            "At what cervical dilatation do you start plotting on a partograph?",
            "What is the difference between the alert and action lines?",
            "What rate of cervical dilatation is expected in the active phase?",
            "Name the three groups of information recorded on a partograph.",
            "Why is the partograph called an early-warning tool?"
        ],
        mcq: [
            { q: "Plotting on a partograph begins at:", opts: ["2 cm", "4 cm", "7 cm", "10 cm"], a: 1 },
            { q: "Expected cervical dilatation in the active phase is:", opts: ["0.5 cm/hr", "1 cm/hr", "3 cm/hr", "5 cm/hr"], a: 1 },
            { q: "The action line lies how many hours right of the alert line?", opts: ["1 hour", "2 hours", "4 hours", "6 hours"], a: 2 },
            { q: "Crossing the action line indicates:", opts: ["Normal labour", "Need for intervention/referral", "False labour", "Imminent birth"], a: 1 },
            { q: "Which is NOT recorded on a partograph?", opts: ["FHR", "Cervical dilatation", "Maternal BP", "Cord blood pH"], a: 3 }
        ],
        drill: ["4 cm start", "1 cm/hr", "Alert line", "Action line", "FHR", "Descent", "Contractions"]
    };
    K[48] = kitParto;

    /* ---- Episiotomy (IDs 49, 193) ---- */
    var kitEpis = {
        lines: [
            "An <b>episiotomy</b> is a planned surgical cut of the perineum in the second stage to widen the outlet.",
            "It is <b>NOT routine</b> — done only for rigid perineum, big baby, instrumental delivery, or fetal distress.",
            "Commonest type = <b>mediolateral</b> (angled away from the anus, safer); median is straight down.",
            "Repaired in <b>3 layers</b> — vaginal mucosa, muscle, skin — with absorbable sutures.",
            "Nursing care = perineal hygiene, pain relief, cold/warm comfort, and watching for infection or haematoma."
        ],
        story: "The perineum is a <b>curtain</b> that sometimes is too tight for the baby to pass. Instead of letting it tear <b>jaggedly</b> like cheap cloth, the doctor makes one <b>neat scissor snip</b> angled <b>away</b> from the anus (<b>mediolateral</b>) so the tear never reaches the back passage. After the baby is born, the curtain is stitched back in <b>three layers</b> like a sandwich — inner lining (vaginal mucosa), the filling (muscle), and the outer cover (skin). The nurse then becomes the <b>“curtain caretaker”</b>: keeps it clean, dry, iced and watches it doesn't swell (haematoma) or get infected.",
        mnemonic: {
            word: "R-B-I-F",
            parts: ["R = Rigid perineum", "B = Big baby / Breech", "I = Instrumental (forceps/ventouse)", "F = Fetal distress"],
            local: "Types — Mediolateral (safest, commonest) aur Median (seedha, par tear risk zyada)."
        },
        palace: "Your **curtain** at home. You snip it **diagonally away from the door (anus)** = mediolateral. Then you stitch a **3-layer sandwich** — cloth, sponge, cover. Finally you **ice** the curtain and **keep it clean** while checking for **swelling**.",
        terms: [
            ["Mediolateral", "Angled cut, safest & commonest"],
            ["Median", "Straight cut — neat but can extend to anus"],
            ["3-layer repair", "Mucosa + muscle + skin sandwich"],
            ["Haematoma", "Blood collection = watch for swelling"]
        ],
        diagram:
"   EPISIOTOMY types\n" +
"   vaginal opening (O)\n" +
"        |\\   <- mediolateral (angled)\n" +
"        | \\  away from anus\n" +
"        |  \\ \n" +
"       ( )   <- anus (avoid!)\n" +
"   median = straight down |",
        dcap: "Cut angled AWAY from the anus",
        why: [
            "A clean surgical cut heals better and is easier to repair than a ragged spontaneous tear.",
            "Mediolateral is preferred because the angle directs any extension AWAY from the anal sphincter, preventing 3rd/4th-degree tears.",
            "Repairing in three anatomical layers restores each tissue plane so the perineal body regains strength and the wound heals without a fistula."
        ],
        recall: "Episiotomy = planned perineal cut, NOT routine. <b>Indications R-B-I-F. Mediolateral commonest. Repair 3 layers.</b> Care: hygiene, pain, watch infection/haematoma.",
        viva: [
            "Define episiotomy and name its commonest type.",
            "Why is mediolateral preferred over median?",
            "List two indications for an episiotomy.",
            "In how many layers is an episiotomy repaired?",
            "What complications does the nurse watch for after episiotomy?"
        ],
        mcq: [
            { q: "The commonest type of episiotomy is:", opts: ["Median", "Mediolateral", "Lateral", "J-shaped"], a: 1 },
            { q: "Mediolateral episiotomy is directed away from the:", opts: ["Vagina", "Urethra", "Anus", "Clitoris"], a: 2 },
            { q: "Episiotomy is repaired in how many layers?", opts: ["One", "Two", "Three", "Four"], a: 2 },
            { q: "An indication for episiotomy is:", opts: ["Routine in all deliveries", "Rigid perineum / fetal distress", "First stage of labour", "Postpartum"], a: 1 },
            { q: "Current WHO guidance on episiotomy is:", opts: ["Always routine", "Selective, only when indicated", "Never indicated", "Only in C-section"], a: 1 }
        ],
        drill: ["Mediolateral", "Not routine", "Rigid perineum", "Instrumental", "3-layer repair", "Watch haematoma"]
    };
    K[49] = kitEpis;
    K[193] = kitEpis;

    /* ---- Immediate care of newborn + APGAR (IDs 56, 70, 71, 73) ---- */
    var kitNewborn = {
        lines: [
            "Immediate newborn care = first actions in the <b>Golden Hour</b> after birth.",
            "Sequence: <b>Dry & stimulate → Warmth (skin-to-skin) → Cord care → Airway/Breathing → Feed within 1 hour → Protect</b> (Vit K, eye care, vaccines).",
            "A normal newborn = born 37–42 weeks, weighs 2.5–4 kg, no birth defects.",
            "The <b>APGAR score</b> at 1 & 5 minutes checks 5 signs, each scored 0–2, total out of 10.",
            "Score 7–10 = healthy; 4–6 = moderate asphyxia; 0–3 = severe, needs resuscitation."
        ],
        story: "A tiny astronaut just crash-landed from the warm spaceship (womb) into a cold world. The rescue team (nurse) follows the <b>“DRY-WARM-CORD-BREATHE-FEED”</b> drill: first <b>towel-dry</b> the shivering astronaut (this also makes him cry = breathing!), then wrap him in a <b>warm hug on mother's chest</b> (skin-to-skin), tie off his <b>fuel hose</b> (cord), check his <b>oxygen pipe is clear</b> (airway), and plug him into his <b>first meal</b> (breastfeed within the hour). Then a strict inspector, <b>Dr. Virginia Apgar</b>, gives him a <b>report card out of 10</b>.",
        mnemonic: {
            word: "APGAR",
            parts: ["A = Appearance (colour)", "P = Pulse (heart rate)", "G = Grimace (reflex)", "A = Activity (tone)", "R = Respiration"],
            local: "Care order — “DRY karo, WARM rakho, CORD bandho, BREATHE karwao, FEED do.”"
        },
        palace: "Your bathroom = the golden hour. **Towel** = dry & stimulate. **Warm shower / mother's hug** = warmth. **Tap with a clamp** = cord care. **Mirror you breathe on** = airway/breathing. **Breakfast table** = feed in 1 hour. On the fridge a **scorecard /10** = APGAR.",
        terms: [
            ["Appearance", "Colour — pink=2, blue=0"],
            ["Pulse", "Heart rate — ≥100 gets 2"],
            ["Grimace", "Reflex — cry/cough=2"],
            ["Activity", "Muscle tone — active=2"],
            ["Respiration", "Breathing — good cry=2"],
            ["Golden Hour", "First 60–90 min, life-saving window"]
        ],
        diagram:
"   APGAR (0,1,2 each; /10)\n" +
"   A Appearance  pink=2\n" +
"   P Pulse       >=100=2\n" +
"   G Grimace     cry=2\n" +
"   A Activity    active=2\n" +
"   R Respiration good cry=2\n" +
"   7-10 ok | 4-6 moderate | 0-3 severe\n" +
"   CARE: Dry-Warm-Cord-Breathe-Feed",
        dcap: "5 signs, 0–2 each; do at 1 & 5 min",
        why: [
            "Drying prevents evaporative heat loss AND stimulates the first breath — two jobs in one wipe.",
            "Skin-to-skin uses the mother's chest as a perfect incubator, stabilising temperature, heart rate and blood sugar.",
            "APGAR is done at 1 & 5 minutes because the 1-min score shows how well the baby tolerated birth, and the 5-min score shows response to resuscitation.",
            "Each APGAR sign maps to a vital function — colour (oxygenation), pulse (cardiac), grimace (neurological), tone (neuromuscular), respiration (respiratory)."
        ],
        recall: "Newborn care = <b>Dry, Warm, Cord, Breathe, Feed (within 1 hr), Protect (Vit K/vaccines).</b> APGAR = Appearance, Pulse, Grimace, Activity, Respiration, 0–2 each; 7–10 normal.",
        viva: [
            "What are the five components of the APGAR score?",
            "At what times is the APGAR score recorded?",
            "What APGAR score indicates severe birth asphyxia?",
            "List the steps of immediate newborn care in order.",
            "Why is the first hour after birth called the Golden Hour?"
        ],
        mcq: [
            { q: "APGAR is assessed at:", opts: ["Birth only", "1 and 5 minutes", "10 and 30 minutes", "1 hour"], a: 1 },
            { q: "Which is NOT an APGAR component?", opts: ["Appearance", "Pulse", "Weight", "Respiration"], a: 2 },
            { q: "An APGAR of 7–10 indicates:", opts: ["Severe asphyxia", "Moderate asphyxia", "Healthy newborn", "Need for ventilation"], a: 2 },
            { q: "A normal newborn's birth weight is:", opts: ["1.5–2 kg", "2.5–4 kg", "4.5–5 kg", "Below 2.5 kg"], a: 1 },
            { q: "First breastfeed should ideally be given within:", opts: ["24 hours", "6 hours", "1 hour", "3 days"], a: 2 }
        ],
        drill: ["Appearance", "Pulse", "Grimace", "Activity", "Respiration", "Dry-Warm-Cord-Breathe-Feed", "Golden Hour"]
    };
    K[56] = kitNewborn;
    K[70] = kitNewborn;
    K[71] = kitNewborn;
    K[73] = kitNewborn;

    return K;
})();
