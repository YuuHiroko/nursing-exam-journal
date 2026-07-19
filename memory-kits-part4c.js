/* ============================================================================
   MEMORY KITS — PART 4c : ★★ Abnormal labour + High-risk newborn
   ============================================================================ */
(function () {
    var K = window.MEMORY_KITS;

    /* ---- Prolonged labour (IDs 175,176,177) ---- */
    var kitProlonged = {
        lines: [
            "<b>Prolonged labour</b> = active phase > <b>12 h (primi)</b> or > <b>8 h (multi)</b>; cervix dilates < <b>1 cm/hr</b>.",
            "Causes = the <b>3 P's: Power, Passage, Passenger</b>.",
            "<b>Power</b> = weak contractions; <b>Passage</b> = small pelvis; <b>Passenger</b> = big baby / malposition.",
            "Diagnosed on the <b>partograph</b> (crossing alert/action line).",
            "Manage: hydrate + <b>oxytocin for Power</b>; <b>C-section for Passage</b> problems."
        ],
        story: "Labour is a <b>train journey</b> that should reach on time. When it stalls, check the <b>3 P's</b>. Is the <b>engine weak (Power)</b>? — give it fuel (<b>oxytocin</b>). Is the <b>track too narrow (Passage)</b>? — no amount of pushing helps, the train must take a <b>different route (C-section)</b>. Is the <b>cargo too big or loaded sideways (Passenger)</b>? — again, a C-section bypass may be needed. The <b>partograph is the timetable</b> that first shows the train is running late.",
        mnemonic: {
            word: "3-P",
            parts: ["P = Power (contractions)", "P = Passage (pelvis)", "P = Passenger (baby size/position)"],
            local: "“12 ghante primi, 8 ghante multi se zyada = prolonged. Power ko oxytocin, Passage ko CS.”"
        },
        palace: "A **stalled train**. Three inspectors: a **weak engine (Power)** fed with **oxytocin fuel**, a **narrow tunnel (Passage)** needing a **bypass**, and **oversized cargo (Passenger)**. A **timetable (partograph)** showing delay.",
        terms: [
            ["Power", "Strength of contractions"],
            ["Passage", "The bony pelvis"],
            ["Passenger", "The baby's size & position"],
            ["1 cm/hr", "Expected dilatation speed"]
        ],
        diagram:
"   PROLONGED LABOUR (>12h primi)\n" +
"   3 P's:\n" +
"   POWER     weak contraction->oxytocin\n" +
"   PASSAGE   small pelvis   -> C/S\n" +
"   PASSENGER big/malposition-> C/S\n" +
"   Dx: partograph crosses action line",
        dcap: "3 P's · Power→oxytocin · Passage→C/S",
        why: [
            "Labour needs adequate force (Power), an adequate bony canal (Passage), and a baby that fits (Passenger) — failure of any one stalls progress.",
            "Hypotonic contractions can be augmented with oxytocin, but a contracted pelvis (CPD) cannot be overcome by stronger pushing — hence C-section.",
            "The partograph objectively detects slow progress before obstruction causes rupture or fetal death."
        ],
        recall: "Prolonged labour = >12 h primi / >8 h multi. <b>3 P's: Power (oxytocin), Passage (C/S), Passenger (C/S).</b> Diagnose on partograph.",
        viva: [
            "Define prolonged labour.",
            "What are the 3 P's?",
            "Which P is treated with oxytocin?",
            "Which P usually needs a C-section?",
            "How is prolonged labour diagnosed?"
        ],
        mcq: [
            { q: "Prolonged labour in a primigravida is active phase beyond:", opts: ["6 h", "8 h", "12 h", "24 h"], a: 2 },
            { q: "The 3 P's of labour are Power, Passage and:", opts: ["Pain", "Passenger", "Placenta", "Pressure"], a: 1 },
            { q: "Weak uterine contractions relate to which P?", opts: ["Passage", "Power", "Passenger", "Placenta"], a: 1 },
            { q: "A contracted pelvis (Passage problem) usually requires:", opts: ["Oxytocin", "Caesarean section", "Forceps", "Rest"], a: 1 },
            { q: "Prolonged labour is best detected using:", opts: ["Ultrasound", "Partograph", "NST", "X-ray"], a: 1 }
        ],
        drill: ["Prolonged labour", "3 P's", "Power", "Passage", "Passenger", "Oxytocin", "C-section", "Partograph"]
    };
    K[175] = kitProlonged;
    K[176] = kitProlonged;
    K[177] = kitProlonged;

    /* ---- Birth canal injuries + perineal tear (IDs 191, 192) ---- */
    var kitTear = {
        lines: [
            "Birth canal injuries include <b>cervical, vaginal and perineal tears</b>.",
            "Perineal tears are graded <b>1st to 4th degree</b>.",
            "<b>1st = skin; 2nd = skin + muscle; 3rd = anal sphincter; 4th = rectal mucosa</b>.",
            "Causes: <b>precipitate labour, instrumental delivery, big baby</b>.",
            "<b>3rd/4th degree need repair in the OT</b>; always inspect systematically after every delivery."
        ],
        story: "The perineum is a <b>piece of fabric</b> that can rip to different depths as the baby pushes through. A <b>1st-degree</b> is just a <b>snag in the top layer (skin)</b>. A <b>2nd-degree</b> tears into the <b>stuffing (muscle)</b>. A <b>3rd-degree</b> rips into the <b>elastic band controlling the back passage (anal sphincter)</b> — serious. A <b>4th-degree</b> is the nightmare — the tear goes <b>all the way through into the rectum</b>. The deeper the rip, the more carefully it must be stitched, with 3rd and 4th degrees sewn in the <b>operation theatre</b> like a delicate repair job.",
        mnemonic: {
            word: "1-2-3-4",
            parts: ["1 = skin only", "2 = + muscle", "3 = + anal sphincter", "4 = + rectal mucosa"],
            local: "“Teesri aur chauthi degree OT mein repair. Har delivery ke baad check karo.”"
        },
        palace: "A **fabric tearing in 4 stages**: the **surface cloth (1)**, the **padding (2)**, an **elastic band (3 = sphincter)**, and finally **through to a red tunnel (4 = rectum)**. A **sewing kit in an OT** for the deep ones.",
        terms: [
            ["1st degree", "Skin only"],
            ["2nd degree", "Skin + muscle"],
            ["3rd degree", "Into anal sphincter"],
            ["4th degree", "Through to rectal mucosa"],
            ["Precipitate labour", "Too-fast delivery causing tears"]
        ],
        diagram:
"   PERINEAL TEAR degrees\n" +
"   1 = skin\n" +
"   2 = skin + muscle\n" +
"   3 = + anal sphincter\n" +
"   4 = + rectal mucosa (worst)\n" +
"   3/4 -> repair in OT",
        dcap: "Skin→muscle→sphincter→rectum",
        why: [
            "The perineum stretches rapidly in the second stage; if delivery is too fast or the baby too big, it tears instead of stretching.",
            "Deeper tears involving the sphincter/rectum risk incontinence and fistula, so they need expert layered repair in the OT.",
            "Systematic inspection after every delivery catches tears early, preventing haematoma and infection."
        ],
        recall: "Perineal tears: <b>1st skin, 2nd +muscle, 3rd +anal sphincter, 4th +rectal mucosa.</b> Causes: precipitate/instrumental/big baby. 3rd/4th → OT repair.",
        viva: [
            "Name the degrees of perineal tear.",
            "What structures are involved in a 3rd-degree tear?",
            "Define a 4th-degree tear.",
            "List two causes of birth canal injuries.",
            "Where are 3rd and 4th-degree tears repaired?"
        ],
        mcq: [
            { q: "A 2nd-degree perineal tear involves:", opts: ["Skin only", "Skin and muscle", "Anal sphincter", "Rectal mucosa"], a: 1 },
            { q: "A 3rd-degree tear extends into the:", opts: ["Skin", "Muscle", "Anal sphincter", "Bladder"], a: 2 },
            { q: "A 4th-degree tear involves the:", opts: ["Anal sphincter", "Rectal mucosa", "Vaginal wall only", "Cervix"], a: 1 },
            { q: "Third and fourth-degree tears should be repaired:", opts: ["On the ward", "In the operation theatre", "At home", "Never"], a: 1 },
            { q: "A cause of birth canal injury is:", opts: ["Slow labour", "Precipitate labour", "Bed rest", "Small baby"], a: 1 }
        ],
        drill: ["1st skin", "2nd muscle", "3rd sphincter", "4th rectum", "Precipitate labour", "OT repair"]
    };
    K[191] = kitTear;
    K[192] = kitTear;

    /* ---- Ventouse (ID 195) ---- */
    K[195] = {
        lines: [
            "<b>Ventouse</b> = vacuum cup applied to the fetal scalp to assist vaginal delivery.",
            "Prerequisites: <b>fully dilated cervix, vertex presentation, head engaged, membranes ruptured</b>.",
            "Used for a <b>prolonged second stage or fetal distress</b> when the baby is low.",
            "Advantage over forceps: <b>less maternal trauma</b>.",
            "Risks to baby: <b>cephalhaematoma, subgaleal haemorrhage, scalp marks</b>."
        ],
        story: "The ventouse is a <b>giant suction cup</b>, like the one used to stick a hook on a tile. When the baby's head is <b>almost out but the mother is exhausted</b>, the doctor sticks this cup on the baby's scalp, <b>pumps out the air</b> to create a vacuum grip, and <b>gently pulls in time with the mother's pushes</b> — like using a plunger to ease out a stuck cork. It leaves a temporary <b>round bump (chignon)</b> on the baby's head, and sometimes a <b>blood collection under the scalp (cephalhaematoma)</b>, but it is <b>gentler on the mother than forceps</b>.",
        mnemonic: {
            word: "C-U-P",
            parts: ["C = Cervix fully dilated + Cephalic (vertex)", "U = Uterus engaged head, membranes rUptured", "P = Pull with contractions"],
            local: "“Vacuum cup — maa ko kam chot (forceps se behtar), baby ke sar pe sujan.”"
        },
        palace: "A **suction cup stuck on a baby's head**, a **vacuum pump**, and a **hand pulling gently with each push**. A **round bump (chignon)** and a **blood blister (cephalhaematoma)** on the scalp.",
        terms: [
            ["Ventouse", "Vacuum cup for delivery"],
            ["Chignon", "Temporary suction bump on the head"],
            ["Cephalhaematoma", "Blood collection under the scalp"],
            ["Subgaleal haemorrhage", "Deeper, more dangerous bleed"]
        ],
        diagram:
"   VENTOUSE (vacuum)\n" +
"   cup on fetal scalp + traction\n" +
"   NEED: full dilation, vertex,\n" +
"         engaged, membranes ruptured\n" +
"   less maternal trauma than forceps\n" +
"   risk: cephalhaematoma, subgaleal",
        dcap: "Vacuum cup · gentler than forceps",
        why: [
            "The cup can only be applied safely when the cervix is fully dilated and the head is engaged and low — otherwise it slips or injures.",
            "Traction is applied with contractions, augmenting (not replacing) the mother's expulsive efforts.",
            "Compared to forceps, the cup occupies no space beside the head, so it causes less perineal/vaginal trauma — but more scalp injury."
        ],
        recall: "Ventouse = vacuum cup for assisted delivery. <b>Needs full dilatation, vertex, engaged, ruptured membranes. Less maternal trauma than forceps; risks cephalhaematoma.</b>",
        viva: [
            "What is a ventouse delivery?",
            "List the prerequisites for applying a ventouse.",
            "What is the advantage of ventouse over forceps?",
            "Name two fetal complications of ventouse.",
            "What is a chignon?"
        ],
        mcq: [
            { q: "Ventouse delivery uses:", opts: ["Metal blades", "A vacuum cup", "A stitch", "A balloon"], a: 1 },
            { q: "A prerequisite for ventouse is:", opts: ["Cervix 4 cm", "Fully dilated cervix", "Breech presentation", "Intact membranes"], a: 1 },
            { q: "An advantage of ventouse over forceps is:", opts: ["Less maternal trauma", "Faster", "No scalp injury", "Can be used at 4 cm"], a: 0 },
            { q: "A fetal complication of ventouse is:", opts: ["Facial nerve palsy", "Cephalhaematoma", "Fracture clavicle", "Cord prolapse"], a: 1 },
            { q: "The temporary bump from the ventouse cup is called a:", opts: ["Caput", "Chignon", "Moulding", "Hydrocele"], a: 1 }
        ],
        drill: ["Ventouse", "Vacuum cup", "Full dilatation", "Vertex engaged", "Chignon", "Cephalhaematoma"]
    };

    /* ---- Forceps (ID 196) ---- */
    K[196] = {
        lines: [
            "<b>Forceps</b> = metal instruments (blades) cradling the fetal head to assist delivery.",
            "Types: <b>outlet (Wrigley's), low (Simpson's), mid-cavity/rotational (Kielland's)</b>.",
            "Used for <b>prolonged second stage, fetal distress, or to protect a preterm head</b>.",
            "Requires full dilatation, engaged head, ruptured membranes, empty bladder.",
            "Risks: <b>facial nerve palsy, bruising, perineal tears</b>."
        ],
        story: "Forceps are a pair of <b>giant curved salad-tongs</b> designed to fit the baby's head like a <b>cage</b>. When the baby is stuck low in the pelvis, the doctor slides one <b>blade</b> on each side, locks them together, and <b>pulls in rhythm with contractions</b> to lift the baby out — like carefully tonging out a delicate pastry without crushing it. Special <b>Kielland's tongs can even rotate</b> a head that's facing the wrong way. But because the metal blades sit <b>against the baby's face</b>, they can leave <b>bruises or a temporary facial-nerve weakness</b>.",
        mnemonic: {
            word: "W-S-K",
            parts: ["W = Wrigley's (outlet)", "S = Simpson's (low)", "K = Kielland's (rotational/mid-cavity)"],
            local: "“Forceps = salad-tongs. Baby ke chehre pe nishaan ya facial palsy ho sakta hai.”"
        },
        palace: "A pair of **giant curved tongs** cradling a baby's head. Three labelled tongs on a rack: **Wrigley (outlet)**, **Simpson (low)**, **Kielland (rotates)**. A **bruised cheek** and a **drooping face (nerve palsy)**.",
        terms: [
            ["Forceps", "Metal blades cradling the head"],
            ["Outlet forceps", "Lowest, safest (Wrigley's)"],
            ["Kielland's", "Rotational forceps"],
            ["Facial nerve palsy", "Temporary face weakness from blades"]
        ],
        diagram:
"   FORCEPS delivery\n" +
"   blades cradle the fetal head\n" +
"   types: outlet(Wrigley) low(Simpson)\n" +
"          rotational(Kielland)\n" +
"   NEED: full dilation, engaged\n" +
"   risk: facial palsy, bruising, tears",
        dcap: "Metal tongs · W-S-K types",
        why: [
            "Forceps both traction AND rotate the head, making them more versatile than the ventouse for malposition.",
            "They occupy space beside the head, increasing perineal stretch — explaining higher rates of tears and episiotomy.",
            "Blade pressure on the face can bruise or transiently compress the facial nerve."
        ],
        recall: "Forceps = metal blades to assist delivery. <b>Types: outlet (Wrigley), low (Simpson), rotational (Kielland).</b> Risks: facial nerve palsy, bruising, tears.",
        viva: [
            "What is a forceps delivery?",
            "Name the types of forceps.",
            "Which forceps is used for rotation?",
            "List two indications for forceps.",
            "Name two complications of forceps delivery."
        ],
        mcq: [
            { q: "Rotational forceps are:", opts: ["Wrigley's", "Simpson's", "Kielland's", "Piper's"], a: 2 },
            { q: "Outlet forceps are exemplified by:", opts: ["Kielland's", "Wrigley's", "Simpson's", "Neville-Barnes"], a: 1 },
            { q: "A complication of forceps delivery is:", opts: ["Cephalhaematoma", "Facial nerve palsy", "Subgaleal bleed", "Chignon"], a: 1 },
            { q: "Compared with ventouse, forceps cause more:", opts: ["Scalp injury", "Maternal/perineal trauma", "Jaundice", "Retinal bleed"], a: 1 },
            { q: "Forceps can be applied only when the cervix is:", opts: ["4 cm", "7 cm", "Fully dilated", "Closed"], a: 2 }
        ],
        drill: ["Forceps", "Wrigley outlet", "Simpson low", "Kielland rotation", "Facial palsy", "Perineal tear"]
    };

    /* ---- Caesarean section (IDs 197,198,199,200) ---- */
    var kitCS = {
        lines: [
            "<b>Caesarean section</b> = delivery through incisions in the abdomen and uterus.",
            "<b>LSCS (lower segment, transverse) = 95%</b> — safer; <b>Classical (vertical, upper segment) = 5%</b>.",
            "Indications: <b>CPD, fetal distress, malpresentation, placenta praevia, failed progress</b>.",
            "Pre-op: <b>consent, NPO, IV line, crossmatch, Foley catheter, antibiotics</b>.",
            "Post-op: <b>vitals q15min, early ambulation, breastfeed within 1 hour, watch bleeding</b>."
        ],
        story: "A C-section is a <b>planned trapdoor escape</b> when the front door (vagina) is blocked or dangerous. The surgeon makes a <b>bikini-line horizontal cut (LSCS)</b> low on the belly and uterus — this heals strong and is safest, used 95% of the time. Rarely, a <b>vertical cut (classical)</b> is made higher up for emergencies or difficult access. Before the operation, the mother is prepped like a <b>pilot before take-off</b>: consent form signed, stomach empty (NPO), IV line in, blood matched, a urine tube (Foley) placed, and antibiotics given. After landing, she's watched closely and encouraged to <b>walk early and breastfeed within the hour</b>.",
        mnemonic: {
            word: "L-S-C-S",
            parts: ["L = Lower segment", "S = transVerse (Safer)", "C = 95% of cases", "S = Stronger scar, less rupture"],
            local: "Indications — “CPD, fetal distress, malpresentation, praevia, labour ruk gaya.”"
        },
        palace: "A **trapdoor in the lower belly (LSCS)** vs a **vertical door (classical)**. A **pre-flight checklist**: consent, NPO, IV, crossmatch, Foley, antibiotics. After: a **nurse checking vitals**, a **mother walking**, and a **baby at the breast**.",
        terms: [
            ["LSCS", "Lower-segment transverse cut (95%)"],
            ["Classical", "Vertical upper-segment cut (5%)"],
            ["CPD", "Baby too big for the pelvis"],
            ["Foley", "Urinary catheter keeping bladder empty"]
        ],
        diagram:
"   CAESAREAN SECTION\n" +
"   LSCS (95%) transverse lower = safer\n" +
"   Classical (5%) vertical upper\n" +
"   PRE-OP: consent,NPO,IV,xmatch,Foley\n" +
"   POST-OP: vitals, walk early, BF <1h",
        dcap: "LSCS safer · pre-op checklist",
        why: [
            "The lower uterine segment is thin and less vascular, so a transverse cut there bleeds less and heals with a stronger scar (lower rupture risk next time).",
            "A classical vertical cut through the thick upper segment bleeds more and leaves a weaker scar prone to rupture.",
            "Early ambulation prevents clots; early breastfeeding stimulates uterine contraction and bonding.",
            "An empty bladder (Foley) and antibiotic prophylaxis reduce operative injury and infection."
        ],
        recall: "C-section = delivery via abdominal+uterine cut. <b>LSCS (95%, safer) vs Classical (5%).</b> Pre-op: consent/NPO/IV/crossmatch/Foley/antibiotics. Post-op: vitals, early walk, BF <1 h.",
        viva: [
            "Define caesarean section and its two main types.",
            "Why is LSCS preferred over classical?",
            "List three indications for C-section.",
            "Outline the pre-operative preparation.",
            "What is important in post-operative care?"
        ],
        mcq: [
            { q: "The commonest type of caesarean section is:", opts: ["Classical", "LSCS", "Extraperitoneal", "Radical"], a: 1 },
            { q: "LSCS involves an incision in the:", opts: ["Upper segment, vertical", "Lower segment, transverse", "Cervix", "Fundus"], a: 1 },
            { q: "An indication for C-section is:", opts: ["Normal labour", "Cephalopelvic disproportion", "First trimester", "Threatened abortion"], a: 1 },
            { q: "Pre-operative care includes:", opts: ["Feeding the mother", "Keeping NPO and inserting a Foley", "Walking immediately", "Removing the IV line"], a: 1 },
            { q: "After C-section, breastfeeding should begin within:", opts: ["24 hours", "1 hour", "1 week", "3 days"], a: 1 }
        ],
        drill: ["LSCS 95%", "Classical 5%", "CPD", "NPO", "Foley", "Crossmatch", "Early ambulation", "BF <1h"]
    };
    K[197] = kitCS;
    K[198] = kitCS;
    K[199] = kitCS;
    K[200] = kitCS;

    /* ---- Magnesium sulphate (ID 203) ---- */
    K[203] = {
        lines: [
            "<b>MgSO4 (magnesium sulphate)</b> = drug of choice to <b>prevent and treat eclamptic convulsions</b>.",
            "Regimen (Pritchard): <b>4 g IV + 5 g IM each buttock</b> (loading), then <b>5 g IM every 4 h</b>.",
            "Before each dose, check <b>R-U-K</b>: Respiration ≥16, Urine ≥30 mL/h, Knee jerks present.",
            "Toxicity = respiratory depression / loss of reflexes.",
            "Antidote = <b>calcium gluconate 10%</b>."
        ],
        story: "MgSO4 is a <b>fire-blanket for the brain</b> that smothers eclamptic fits. But the same blanket can <b>smother the mother's breathing</b> if it builds up — so before every dose the nurse plays <b>“RUK, the gatekeeper”</b>: <b>R</b>espirations at least 16? <b>U</b>rine output at least 30 mL/hr? <b>K</b>nee jerks still present? If any answer is NO, the blanket is too thick — <b>hold the dose</b>. And kept at the bedside is the <b>“emergency fire-lifter”</b>, <b>calcium gluconate</b>, ready to peel the blanket off if she stops breathing.",
        mnemonic: {
            word: "R-U-K",
            parts: ["R = Respiration ≥16/min", "U = Urine output ≥30 mL/h", "K = Knee jerk (patellar reflex) present"],
            local: "“MgSO4 se pehle RUK check. Antidote = calcium gluconate.”"
        },
        palace: "A **fire-blanket (MgSO4)** over a sparking brain. A **gatekeeper named RUK** checking **breathing, a urine bag, and a knee hammer**. An **antidote syringe labelled calcium gluconate** on the wall.",
        terms: [
            ["MgSO4", "Anti-convulsant for eclampsia"],
            ["RUK", "Respiration, Urine, Knee jerk checks"],
            ["Pritchard regimen", "The IM dosing schedule"],
            ["Calcium gluconate", "The antidote for toxicity"]
        ],
        diagram:
"   MgSO4 (eclampsia)\n" +
"   load: 4g IV + 5g IM each buttock\n" +
"   maintain: 5g IM q4h\n" +
"   CHECK RUK before each dose:\n" +
"   Resp>=16 Urine>=30 Kneejerk present\n" +
"   ANTIDOTE: calcium gluconate 10%",
        dcap: "Check RUK · antidote calcium gluconate",
        why: [
            "Magnesium stabilises neuronal membranes and acts as a cerebral vasodilator, preventing and terminating eclamptic seizures.",
            "It is renally excreted, so oliguria causes accumulation; loss of knee jerks is the earliest sign of toxicity, before respiratory arrest.",
            "Calcium competitively reverses magnesium at the neuromuscular junction — hence calcium gluconate is the antidote."
        ],
        recall: "MgSO4 = anti-eclamptic. <b>Load 4 g IV + 10 g IM, maintain 5 g IM q4h. Check RUK (Resp≥16, Urine≥30, Knee jerk) before each dose. Antidote: calcium gluconate.</b>",
        viva: [
            "Why is MgSO4 used in eclampsia?",
            "What does RUK stand for before each dose?",
            "What is the loading dose of MgSO4?",
            "What is the earliest sign of MgSO4 toxicity?",
            "What is the antidote for MgSO4 toxicity?"
        ],
        mcq: [
            { q: "MgSO4 is the drug of choice for:", opts: ["PPH", "Eclamptic convulsions", "Anaemia", "Diabetes"], a: 1 },
            { q: "Before each MgSO4 dose, respiration should be at least:", opts: ["10/min", "12/min", "16/min", "20/min"], a: 2 },
            { q: "The earliest sign of MgSO4 toxicity is:", opts: ["Respiratory arrest", "Loss of knee jerk", "Coma", "Cardiac arrest"], a: 1 },
            { q: "Urine output before a MgSO4 dose should be at least:", opts: ["10 mL/h", "30 mL/h", "60 mL/h", "100 mL/h"], a: 1 },
            { q: "The antidote for MgSO4 toxicity is:", opts: ["Sodium bicarbonate", "Calcium gluconate", "Naloxone", "Adrenaline"], a: 1 }
        ],
        drill: ["MgSO4", "RUK", "Resp ≥16", "Urine ≥30", "Knee jerk", "Pritchard", "Calcium gluconate"]
    };

    /* ---- Methergin (ID 204) ---- */
    K[204] = {
        lines: [
            "<b>Methergin (methylergometrine)</b> = an ergot alkaloid causing <b>sustained uterine contraction</b>.",
            "Dose: <b>0.2 mg IM/IV</b>; used to <b>prevent/treat PPH</b>.",
            "It raises blood pressure.",
            "<b>Contraindicated in hypertension, PIH, and heart disease</b>.",
            "<b>Check BP before giving</b>; store in the refrigerator."
        ],
        story: "Methergin is the <b>“clamp-down” injection</b> — a powerful squeeze that makes the uterus clamp shut like a fist to stop bleeding after delivery. But this same squeeze <b>tightens blood vessels everywhere</b>, shooting the <b>blood pressure up</b>. So it's like a strong spice — <b>never give it to someone who already has high BP, PIH, or a weak heart</b>, or it could cause a stroke. The nurse's golden rule: <b>“BP first, then Methergin”</b> — and keep the vial in the <b>fridge</b> because it spoils in heat.",
        mnemonic: {
            word: "M-E-T-H-E-R-G-I-N",
            parts: ["M = Methylergometrine 0.2 mg", "E = Ergot alkaloid", "T = Tightens uterus (stops PPH)", "H = Hypertension side-effect", "NO in HTN/PIH/heart disease", "Check BP first, store in fridge"],
            local: "“Methergin = BP badhata hai. Pehle BP napo, phir do. Fridge mein rakho.”"
        },
        palace: "A **fist clamping a uterus**. A **BP cuff inflating (rising BP)**. A **red stop sign** over a **heart and a BP machine**. A **fridge** storing the vial.",
        terms: [
            ["Methergin", "Ergot drug to clamp the uterus"],
            ["0.2 mg", "The standard dose"],
            ["Contraindicated in HTN", "Because it raises BP"],
            ["Refrigerate", "It degrades in heat"]
        ],
        diagram:
"   METHERGIN 0.2 mg IM/IV\n" +
"   sustained uterine contraction\n" +
"   use: prevent/treat PPH\n" +
"   RAISES BP!\n" +
"   NO in HTN, PIH, heart disease\n" +
"   check BP first | keep in fridge",
        dcap: "Raises BP · check BP first",
        why: [
            "Ergot alkaloids cause tonic (sustained) uterine contraction, compressing placental-site vessels — effective for atony.",
            "The same vasoconstrictive effect on systemic vessels raises blood pressure, making it dangerous in hypertensive/cardiac patients.",
            "It is heat-labile, so cold storage preserves its potency."
        ],
        recall: "Methergin = ergot 0.2 mg for PPH. <b>Raises BP — contraindicated in HTN/PIH/heart disease. Check BP first, refrigerate.</b>",
        viva: [
            "What is Methergin and its dose?",
            "What is its main use?",
            "Why is it contraindicated in hypertension?",
            "What must you check before giving Methergin?",
            "How should Methergin be stored?"
        ],
        mcq: [
            { q: "Methergin is:", opts: ["Prostaglandin", "Methylergometrine (ergot)", "Oxytocin", "Magnesium"], a: 1 },
            { q: "The dose of Methergin is:", opts: ["0.5 mg", "0.2 mg", "1 mg", "10 IU"], a: 1 },
            { q: "Methergin is contraindicated in:", opts: ["Anaemia", "Hypertension/PIH", "Diabetes", "Twins"], a: 1 },
            { q: "Before giving Methergin, the nurse should check:", opts: ["Temperature", "Blood pressure", "Blood sugar", "Haemoglobin"], a: 1 },
            { q: "Methergin should be stored:", opts: ["In sunlight", "In the refrigerator", "In warm water", "Anywhere"], a: 1 }
        ],
        drill: ["Methergin", "0.2 mg", "Ergot", "Raises BP", "No in HTN/PIH", "Check BP", "Refrigerate"]
    };

    /* ---- Levels of neonatal care (ID 219) ---- */
    K[219] = {
        lines: [
            "Neonatal care is organised in <b>3 levels</b>.",
            "<b>Level I</b> = well-baby nursery for healthy newborns (basic care).",
            "<b>Level II</b> = special care unit (<b>SNCU</b>) for moderately sick babies.",
            "<b>Level III</b> = intensive care (<b>NICU</b>) with ventilators for critically ill babies.",
            "Every facility provides <b>Essential Newborn Care (ENC)</b>: warmth, cord care, breastfeeding, resuscitation."
        ],
        story: "Newborn care is like a <b>3-floor hospital building</b>. <b>Ground floor (Level I)</b> is the <b>well-baby nursery</b> — healthy babies rooming with mum, needing just warmth and feeding. <b>First floor (Level II, SNCU)</b> is the <b>special-care ward</b> — babies who need phototherapy, oxygen, or IV fluids but not life support. <b>Top floor (Level III, NICU)</b> is the <b>intensive-care penthouse</b> — with <b>ventilators and monitors</b> for the tiniest, sickest fighters. No matter the floor, every baby gets the <b>ENC basics</b>: keep warm, clean cord, breastfeed, and resuscitate if needed.",
        mnemonic: {
            word: "1-2-3",
            parts: ["1 = well-baby nursery", "2 = SNCU special care", "3 = NICU intensive (ventilators)"],
            local: "ENC — “Warm rakho, cord saaf, doodh pilao, zaroorat ho to resuscitate.”"
        },
        palace: "A **3-floor building**. Ground: **happy babies with mothers**. 1st floor: **phototherapy blue lights and oxygen**. Top: **ventilator machines beeping**. A banner across all floors: **ENC**.",
        terms: [
            ["Level I", "Well-baby nursery"],
            ["SNCU", "Level II special newborn care unit"],
            ["NICU", "Level III intensive care (ventilators)"],
            ["ENC", "Essential newborn care for all"]
        ],
        diagram:
"   LEVELS OF NEONATAL CARE\n" +
"   I   well-baby nursery (healthy)\n" +
"   II  SNCU special care (phototherapy,O2)\n" +
"   III NICU intensive (ventilators)\n" +
"   ALL: ENC = warmth,cord,BF,resuscitate",
        dcap: "Level 1/2/3 · ENC for everyone",
        why: [
            "A tiered system matches resources to need — healthy babies stay with mothers while scarce NICU beds go to the sickest.",
            "Level II manages common problems (jaundice, mild respiratory distress) close to home, avoiding unnecessary referral.",
            "Level III provides ventilation and intensive monitoring for extreme prematurity and severe illness."
        ],
        recall: "Neonatal care levels: <b>I = well-baby nursery, II = SNCU special care, III = NICU (ventilators).</b> ENC for all: warmth, cord care, breastfeeding, resuscitation.",
        viva: [
            "Name the three levels of neonatal care.",
            "What is a SNCU?",
            "Which level has ventilators?",
            "What does Essential Newborn Care include?",
            "Why is a tiered system of neonatal care useful?"
        ],
        mcq: [
            { q: "Level I neonatal care is the:", opts: ["NICU", "Well-baby nursery", "SNCU", "Ventilator unit"], a: 1 },
            { q: "SNCU corresponds to which level?", opts: ["Level I", "Level II", "Level III", "Level IV"], a: 1 },
            { q: "Ventilators are available at:", opts: ["Level I", "Level II", "Level III", "Home"], a: 2 },
            { q: "Essential Newborn Care includes all EXCEPT:", opts: ["Warmth", "Cord care", "Breastfeeding", "Routine antibiotics"], a: 3 },
            { q: "A baby needing phototherapy is usually managed at:", opts: ["Level I", "Level II (SNCU)", "Level III", "Home"], a: 1 }
        ],
        drill: ["Level I nursery", "Level II SNCU", "Level III NICU", "ENC", "Warmth", "Cord care", "Breastfeeding"]
    };

    /* ---- Preterm baby (IDs 220, 221) ---- */
    var kitPreterm = {
        lines: [
            "<b>Preterm/premature baby</b> = born before <b>37 weeks</b> or weighing < <b>2500 g</b>.",
            "Causes: <b>PIH, infections, multiple pregnancy, APH, cervical incompetence</b>.",
            "Problems: <b>RDS (breathing), hypothermia, hypoglycaemia, jaundice, NEC, IVH</b>.",
            "They have immature organs — especially lungs (low surfactant).",
            "Care: <b>KMC (kangaroo care), incubator warmth, gavage/expressed feeds</b>."
        ],
        story: "A preterm baby is a <b>cake taken out of the oven too early</b> — everything is undercooked. The <b>lungs lack surfactant</b> (the soap that keeps air-sacs open), so breathing is hard (<b>RDS</b>). The baby has <b>no fat blanket</b>, so it gets cold fast (<b>hypothermia</b>); the <b>liver can't store sugar</b> (<b>hypoglycaemia</b>) or process bilirubin (<b>jaundice</b>); and the gut and brain vessels are fragile (<b>NEC, IVH</b>). The best medicine is surprisingly low-tech: <b>Kangaroo Mother Care</b> — strap the baby skin-to-skin on the mother's chest like a joey in a pouch, keeping it warm, fed and calm.",
        mnemonic: {
            word: "R-H-H-J-N-I",
            parts: ["R = RDS (respiratory distress)", "H = Hypothermia", "H = Hypoglycaemia", "J = Jaundice", "N = NEC (gut)", "I = IVH (brain bleed)"],
            local: "Care — “KMC (maa ki chaati), incubator, gavage se doodh.”"
        },
        palace: "A **half-baked cake (baby)**. Problems as warning labels: **lungs without soap (RDS)**, a **shivering baby (hypothermia)**, a **sugar gauge on empty**, a **yellow baby (jaundice)**. The cure: a **kangaroo pouch (KMC)** on the mother's chest and a **warm incubator**.",
        terms: [
            ["Preterm", "Born before 37 weeks"],
            ["RDS", "Breathing trouble from low surfactant"],
            ["Surfactant", "The 'soap' keeping air-sacs open"],
            ["KMC", "Kangaroo care — skin-to-skin"],
            ["Gavage", "Tube feeding for weak babies"]
        ],
        diagram:
"   PRETERM (<37 wk / <2500 g)\n" +
"   problems: RDS,cold,low sugar,\n" +
"             jaundice,NEC,IVH\n" +
"   CARE: KMC skin-to-skin\n" +
"         incubator warmth\n" +
"         gavage/EBM feeds",
        dcap: "Half-baked · KMC is best medicine",
        why: [
            "Surfactant production matures late in pregnancy, so preterm lungs collapse easily → respiratory distress syndrome.",
            "Thin skin, little subcutaneous fat and a large surface area cause rapid heat loss → hypothermia.",
            "Skin-to-skin KMC stabilises temperature, heart rate, breathing and promotes breastfeeding — outperforming incubators for stable preterms."
        ],
        recall: "Preterm = <37 wk / <2500 g. <b>Problems: RDS, hypothermia, hypoglycaemia, jaundice, NEC, IVH.</b> Care: KMC skin-to-skin, incubator, gavage feeds.",
        viva: [
            "Define a preterm baby.",
            "List two causes of prematurity.",
            "Why do preterm babies develop RDS?",
            "What is Kangaroo Mother Care?",
            "List three problems of a preterm baby."
        ],
        mcq: [
            { q: "A preterm baby is born before:", opts: ["28 weeks", "37 weeks", "40 weeks", "42 weeks"], a: 1 },
            { q: "RDS in preterm babies is due to lack of:", opts: ["Surfactant", "Iron", "Calcium", "Glucose"], a: 0 },
            { q: "KMC stands for:", opts: ["Kids Medical Care", "Kangaroo Mother Care", "Kerala Maternity Centre", "Kinetic Movement Care"], a: 1 },
            { q: "A common problem of preterm babies is:", opts: ["Hypothermia", "Macrosomia", "Postmaturity", "Hydrops"], a: 0 },
            { q: "Weak preterm babies who cannot suck are fed by:", opts: ["Bottle", "Gavage (tube)", "Spoon only", "Nothing"], a: 1 }
        ],
        drill: ["Preterm <37wk", "RDS", "Surfactant", "Hypothermia", "Hypoglycaemia", "Jaundice", "KMC", "Gavage"]
    };
    K[220] = kitPreterm;
    K[221] = kitPreterm;

    /* ---- Postmaturity (IDs 223, 224) ---- */
    K[223] = {
        lines: [
            "<b>Postmaturity</b> = pregnancy going beyond <b>42 weeks (294 days)</b>.",
            "The placenta starts to <b>age and fail</b>, so the baby gets less oxygen/food.",
            "Signs in the baby: <b>dry peeling skin, absent vernix, meconium staining, long nails, alert 'old-man' look</b>.",
            "Risks: <b>meconium aspiration, cord compression, macrosomia, stillbirth</b>.",
            "Manage: <b>induce labour around 41 weeks</b> before the placenta fails."
        ],
        story: "A post-mature baby is a <b>tenant who overstayed the lease</b>. The landlord (<b>placenta</b>) has <b>retired and stopped the food and oxygen supply</b>, so the baby starts losing weight and looks like a <b>wrinkled little old man</b> — <b>dry cracked skin, no vernix cream left, long nails</b>, and wide-awake worried eyes. Hungry and stressed, the baby <b>passes stool (meconium) into the fluid</b> and may <b>inhale it at birth</b> — choking its lungs. The smart move is to <b>evict the tenant at 41 weeks</b> (induce labour) before the landlord's services shut down completely.",
        mnemonic: {
            word: "O-L-D",
            parts: ["O = Overdue (>42 weeks)", "L = Looks old (dry skin, long nails, no vernix)", "D = Danger (meconium aspiration, stillbirth)"],
            local: "“42 hafte ke baad placenta thak jaata hai — 41 hafte mein induce karo.”"
        },
        palace: "A **wrinkled old-man baby** with **peeling skin, long nails, green-stained body (meconium)**. A **tired, retired placenta**. A **calendar circled at 41 weeks** for induction.",
        terms: [
            ["Postmaturity", "Pregnancy beyond 42 weeks"],
            ["Meconium aspiration", "Baby inhaling its stool"],
            ["Placental insufficiency", "Ageing placenta failing to supply"],
            ["Old-man look", "Wrinkled, alert, wasted baby"]
        ],
        diagram:
"   POSTMATURITY (>42 wk)\n" +
"   placenta ages -> less O2/food\n" +
"   baby: dry peeling skin, no vernix,\n" +
"         long nails, meconium stain\n" +
"   risk: meconium aspiration, stillbirth\n" +
"   Rx: induce at 41 weeks",
        dcap: "Overdue · old-man look · induce at 41 wk",
        why: [
            "Beyond term the placenta undergoes senescence and infarction, reducing nutrient/oxygen transfer.",
            "Loss of vernix and subcutaneous fat gives the dry, cracked, wasted appearance.",
            "Hypoxia triggers fetal gut activity and gasping → meconium passage and aspiration risk.",
            "Inducing at 41 weeks balances the risks of expectant management (stillbirth) against early delivery."
        ],
        recall: "Postmaturity = >42 wk. <b>Signs: dry peeling skin, no vernix, long nails, meconium staining, alert old-man look.</b> Risks: meconium aspiration, stillbirth. Induce at 41 wk.",
        viva: [
            "Define postmaturity.",
            "List three signs of a post-mature baby.",
            "Why does a post-mature baby pass meconium?",
            "What is meconium aspiration syndrome?",
            "When is labour usually induced to prevent postmaturity?"
        ],
        mcq: [
            { q: "Postmaturity is pregnancy beyond:", opts: ["37 weeks", "40 weeks", "42 weeks", "28 weeks"], a: 2 },
            { q: "A sign of postmaturity is:", opts: ["Abundant vernix", "Dry peeling skin and long nails", "Lanugo", "Chubby cheeks"], a: 1 },
            { q: "The post-mature baby is at risk of:", opts: ["Meconium aspiration", "RDS", "Hypoglycaemia only", "Anaemia"], a: 0 },
            { q: "Postmaturity occurs because the:", opts: ["Baby is too small", "Placenta ages and fails", "Mother is diabetic", "Cord is short"], a: 1 },
            { q: "Labour is usually induced for postmaturity at:", opts: ["38 weeks", "41 weeks", "44 weeks", "36 weeks"], a: 1 }
        ],
        drill: ["Postmaturity >42wk", "Dry peeling skin", "No vernix", "Long nails", "Meconium aspiration", "Induce 41 wk"]
    };
    K[224] = K[223];

    /* ---- Asphyxia neonatorum (ID 225) ---- */
    K[225] = {
        lines: [
            "<b>Asphyxia neonatorum</b> = failure to <b>initiate and sustain breathing at birth</b>.",
            "Causes: maternal (<b>APH, PIH</b>), fetal (<b>prematurity, cord prolapse</b>), labour (<b>prolonged/obstructed</b>).",
            "The baby is <b>blue/pale, floppy, slow heart rate</b>.",
            "Manage by <b>Neonatal Resuscitation Protocol (NRP)</b>.",
            "NRP steps: <b>dry & stimulate → position airway → suction → bag-and-mask → intubate if needed</b>."
        ],
        story: "A baby with asphyxia is a <b>little engine that won't start</b>. Something cut off its oxygen before or during birth — a <b>bleeding placenta (APH)</b>, a <b>crushed cord</b>, or a <b>long, hard labour</b>. The newborn lies there <b>blue, floppy and silent</b> instead of pink and crying. The rescue team follows a <b>step-ladder (NRP)</b>: first <b>rub the baby dry and flick its feet (stimulate)</b> — often this alone starts the engine; if not, <b>open the airway</b>, <b>suck out mucus</b>, then <b>pump air in with a bag and mask</b>; only the most stubborn cases need a <b>breathing tube (intubation)</b>.",
        mnemonic: {
            word: "A-B-C",
            parts: ["A = Airway (position + suction)", "B = Breathing (bag & mask)", "C = Circulation (chest compressions if HR low)"],
            local: "“Pehle ragdo-jagao, phir airway kholo, phir bag se hawa.”"
        },
        palace: "A **blue floppy baby**. A **step-ladder**: **dry towel & foot-flick** → **tilted head (airway)** → **suction tube** → **bag and mask pumping** → **breathing tube**. A **heart monitor** showing a slow rate.",
        terms: [
            ["Asphyxia", "Failure to breathe at birth"],
            ["NRP", "Neonatal resuscitation protocol"],
            ["Bag and mask", "Hand-pumping air into the lungs"],
            ["Intubation", "Breathing tube for severe cases"]
        ],
        diagram:
"   ASPHYXIA NEONATORUM\n" +
"   baby blue, floppy, no cry\n" +
"   NRP ladder:\n" +
"   dry+stimulate -> airway+suction\n" +
"   -> bag & mask -> intubate\n" +
"   (chest compressions if HR<60)",
        dcap: "Stimulate → airway → bag-mask → intubate",
        why: [
            "Most compromised newborns respond to drying and stimulation alone, which triggers the gasp reflex and clears heat-losing wet skin.",
            "The head position and suction clear the airway so that subsequent ventilation is effective.",
            "Bag-and-mask ventilation inflates the lungs and is the single most effective resuscitation step; compressions are added only if the heart stays slow despite ventilation."
        ],
        recall: "Asphyxia = failure to breathe at birth. <b>Causes: APH/PIH/prematurity/cord/prolonged labour. NRP: dry & stimulate → airway + suction → bag & mask → intubate.</b>",
        viva: [
            "Define asphyxia neonatorum.",
            "List two causes of birth asphyxia.",
            "What is the first step of neonatal resuscitation?",
            "When is bag-and-mask ventilation started?",
            "When are chest compressions added?"
        ],
        mcq: [
            { q: "Asphyxia neonatorum is:", opts: ["Excessive crying", "Failure to initiate and sustain breathing", "Jaundice", "Fever"], a: 1 },
            { q: "The first step in neonatal resuscitation is:", opts: ["Intubation", "Drying and stimulation", "Chest compressions", "Drugs"], a: 1 },
            { q: "The most effective resuscitation step is:", opts: ["Suction", "Bag-and-mask ventilation", "Adrenaline", "Warming only"], a: 1 },
            { q: "Chest compressions are started when the heart rate is below:", opts: ["100/min", "80/min", "60/min", "160/min"], a: 2 },
            { q: "A cause of birth asphyxia is:", opts: ["Cord prolapse", "Macrosomia", "Postmaturity only", "Breastfeeding"], a: 0 }
        ],
        drill: ["Asphyxia", "No breathing", "Dry & stimulate", "Airway+suction", "Bag & mask", "Intubate", "NRP"]
    };

})();
