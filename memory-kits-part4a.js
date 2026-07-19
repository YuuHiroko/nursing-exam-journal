/* ============================================================================
   MEMORY KITS — PART 4a : ★★ Anatomy/Physiology + Drugs
   ============================================================================ */
(function () {
    var K = window.MEMORY_KITS;

    /* ---- Fertilization (ID 15) ---- */
    K[15] = {
        lines: [
            "Fertilization = sperm meets egg in the <b>ampulla of the fallopian tube</b> to form a <b>zygote (46 chromosomes)</b>.",
            "It must happen within <b>24 hours of ovulation</b> (the egg's short life).",
            "6 steps: <b>Capacitation → Acrosome reaction → Penetration → Cortical reaction → Fusion of nuclei → Sex determination</b>.",
            "The <b>sperm decides the baby's sex</b> — X sperm = girl, Y sperm = boy.",
            "Only one sperm enters; the egg then seals its wall to block the rest."
        ],
        story: "The egg is a <b>princess in a tower (ampulla)</b> who lives only <b>24 hours</b>. Millions of sperm race to reach her, but first each must <b>“sharpen its key”</b> (capacitation) and wear a <b>drill helmet</b> (acrosome). The fastest sperm <b>drills through the wall</b> (penetration), and the moment it enters, the princess slams a <b>steel shutter</b> (cortical reaction) so no rival can follow. Their <b>nuclei merge</b> into one, and the sperm reveals its secret card — <b>X = princess, Y = prince</b> — deciding the royal baby's sex.",
        mnemonic: {
            word: "C-A-P-C-F-S",
            parts: ["C = Capacitation", "A = Acrosome reaction", "P = Penetration", "C = Cortical reaction", "F = Fusion of nuclei", "S = Sex determination"],
            local: "“Sperm ka drill (acrosome), egg ka shutter (cortical). X = ladki, Y = ladka.”"
        },
        palace: "A **tower (ampulla)**. Sperm with **drill helmets** climb it. One **drills in**, a **steel shutter** slams behind it, two **nuclei shake hands**, and a **card flips X or Y**.",
        terms: [
            ["Capacitation", "Sperm 'sharpening its key' in the tract"],
            ["Acrosome", "The drill-helmet with enzymes"],
            ["Cortical reaction", "The steel shutter blocking other sperm"],
            ["Zygote", "The fused 46-chromosome cell"],
            ["Ampulla", "The tower room where fertilization happens"]
        ],
        diagram:
"   FERTILIZATION (ampulla)\n" +
"   sperm->CAPACITATE->ACROSOME drill\n" +
"   ->PENETRATE egg->CORTICAL shutter\n" +
"   ->FUSE nuclei = ZYGOTE (46)\n" +
"   sex: X=girl  Y=boy (sperm decides)",
        dcap: "Drill in · shutter slams · nuclei fuse",
        why: [
            "Capacitation and the acrosome reaction equip the sperm to digest the egg's protective coats — without them penetration is impossible.",
            "The cortical reaction is the egg's defense against polyspermy, which would create a lethal triploid embryo.",
            "The egg lives only ~24 hours, so fertilization must occur within this window after ovulation.",
            "Sex is determined by the sperm because only sperm carry either X or Y; the egg always carries X."
        ],
        recall: "Fertilization in the ampulla → zygote (46). <b>Steps C-A-P-C-F-S.</b> Within 24 h of ovulation. Sperm decides sex (X girl, Y boy).",
        viva: [
            "Where does fertilization normally occur?",
            "List the steps of fertilization.",
            "What is the acrosome reaction?",
            "What prevents polyspermy?",
            "Which gamete determines the baby's sex and how?"
        ],
        mcq: [
            { q: "Fertilization normally occurs in the:", opts: ["Uterus", "Ampulla of fallopian tube", "Ovary", "Cervix"], a: 1 },
            { q: "The zygote has how many chromosomes?", opts: ["23", "46", "44", "92"], a: 1 },
            { q: "Polyspermy is prevented by the:", opts: ["Acrosome reaction", "Cortical reaction", "Capacitation", "Ovulation"], a: 1 },
            { q: "The baby's sex is determined by the:", opts: ["Ovum", "Sperm", "Uterus", "Placenta"], a: 1 },
            { q: "The ovum remains fertilizable for about:", opts: ["72 hours", "48 hours", "24 hours", "1 week"], a: 2 }
        ],
        drill: ["Ampulla", "Zygote 46", "Capacitation", "Acrosome", "Cortical reaction", "X girl Y boy"]
    };

    /* ---- Fetal circulation (ID 16) ---- */
    K[16] = {
        lines: [
            "Fetal circulation <b>bypasses the non-working lungs</b> because the placenta does the breathing.",
            "It uses <b>3 special shunts</b> (shortcuts).",
            "<b>Ductus venosus</b> skips the liver; <b>foramen ovale</b> crosses the heart right→left; <b>ductus arteriosus</b> skips the lungs.",
            "The <b>placenta acts as the fetal lung</b> (oxygen + nutrition source).",
            "After the <b>first breath</b>, all 3 shunts close permanently."
        ],
        story: "The fetus lives in a <b>house with the kitchen chimney blocked</b> (lungs full of fluid), so smoke can't go out the normal way. It builds <b>3 secret tunnels</b>: the <b>Ductus Venosus</b> highway lets blood <b>skip the liver</b>; the <b>Foramen Ovale</b> is a <b>trapdoor in the heart</b> letting blood jump from the right room straight to the left; and the <b>Ductus Arteriosus</b> is a <b>bypass road around the lungs</b>. The <b>placenta is the oxygen cylinder</b> outside the house. The moment the baby is born and takes its <b>first cry-breath</b>, the chimney opens and <b>all 3 tunnels slam shut forever</b>.",
        mnemonic: {
            word: "D-F-D",
            parts: ["D = Ductus Venosus (skip liver)", "F = Foramen Ovale (heart R→L)", "D = Ductus Arteriosus (skip lungs)"],
            local: "“Teen shunt — liver skip, heart trapdoor, lung skip. Pehli saans mein sab band.”"
        },
        palace: "A **house with 3 tunnels**. A **highway skipping the liver-factory**, a **trapdoor between two heart rooms**, a **bypass bridge over the lung-park**. An **oxygen cylinder (placenta)** outside. A **crying baby** slamming all three shut.",
        terms: [
            ["Ductus venosus", "Shortcut skipping the liver"],
            ["Foramen ovale", "Trapdoor right→left atrium"],
            ["Ductus arteriosus", "Bypass around the lungs"],
            ["Placenta", "The fetal lung/oxygen cylinder"],
            ["Umbilical vein", "Carries oxygenated blood to baby"]
        ],
        diagram:
"   FETAL CIRCULATION shunts\n" +
"   placenta->umbilical VEIN (O2)\n" +
"   1 ductus VENOSUS (skip liver)\n" +
"   2 foramen OVALE  (heart R->L)\n" +
"   3 ductus ARTERIOSUS(skip lung)\n" +
"   birth -> 1st breath -> all close",
        dcap: "3 shunts · closed by first breath",
        why: [
            "The fetal lungs are fluid-filled and high-resistance, so most blood is shunted past them to the body and brain.",
            "Oxygenated blood comes from the placenta, not the lungs, so it must be directed to vital organs via the shunts.",
            "At birth, lung expansion drops pulmonary resistance and rising oxygen closes the shunts functionally, then anatomically."
        ],
        recall: "Fetal circulation bypasses lungs via <b>3 shunts: Ductus venosus (liver), Foramen ovale (heart), Ductus arteriosus (lungs).</b> Placenta = fetal lung; first breath closes all.",
        viva: [
            "Name the three fetal shunts.",
            "What is the function of the foramen ovale?",
            "Which shunt bypasses the liver?",
            "What acts as the fetal lung?",
            "What happens to the shunts after birth?"
        ],
        mcq: [
            { q: "The shunt that bypasses the fetal liver is:", opts: ["Foramen ovale", "Ductus arteriosus", "Ductus venosus", "Umbilical artery"], a: 2 },
            { q: "The foramen ovale shunts blood from:", opts: ["Left to right atrium", "Right to left atrium", "Aorta to pulmonary", "Liver to heart"], a: 1 },
            { q: "The ductus arteriosus bypasses the:", opts: ["Liver", "Lungs", "Heart", "Kidneys"], a: 1 },
            { q: "Oxygenated blood reaches the fetus through the:", opts: ["Umbilical artery", "Umbilical vein", "Ductus arteriosus", "Aorta"], a: 1 },
            { q: "Fetal shunts close after:", opts: ["Cord clamping only", "The first breath", "Weaning", "6 weeks"], a: 1 }
        ],
        drill: ["Ductus venosus", "Foramen ovale", "Ductus arteriosus", "Placenta=lung", "First breath closes", "Umbilical vein"]
    };

    /* ---- Functions of placenta (ID 17) ---- */
    K[17] = {
        lines: [
            "The placenta is the baby's <b>all-in-one life-support machine</b>.",
            "It works as <b>lungs</b> (O₂/CO₂ exchange), <b>gut</b> (nutrition) and <b>kidneys</b> (waste removal).",
            "It is a <b>hormone factory</b> — hCG, hPL, oestrogen, progesterone.",
            "It passes <b>IgG antibodies</b> (immunity) and acts as a <b>selective security barrier</b>.",
            "It weighs ~<b>500 g</b> and comes out as the afterbirth in the third stage."
        ],
        story: "The placenta is a <b>5-star hotel</b> for the baby. Its <b>air-conditioner (lungs)</b> supplies oxygen, the <b>restaurant (gut)</b> delivers food, the <b>sewage plant (kidneys)</b> flushes waste, the <b>pharmacy (hormones)</b> manufactures hCG/hPL/oestrogen/progesterone, and the <b>security guard</b> checks every visitor — letting in <b>IgG bodyguards (antibodies)</b> but stopping most germs. After 9 months the hotel is demolished (weighs 500 g) and thrown out as the afterbirth.",
        mnemonic: {
            word: "R-E-S-P-E-C-T",
            parts: ["R = Respiration (gas exchange)", "E = Excretion", "S = Secretion of hormones", "P = Protection (barrier)", "E = Eating (nutrition)", "C = Circulation link", "T = Transfer of IgG immunity"],
            local: "“Placenta = saans, khana, sauchalaya, pharmacy aur bodyguard — sab ek mein.”"
        },
        palace: "A **5-star hotel**. An **AC (lungs)**, a **restaurant (nutrition)**, a **sewage pipe (excretion)**, a **pharmacy counter (hormones)**, and a **security gate** letting in **IgG bodyguards** only.",
        terms: [
            ["Gas exchange", "The AC — O₂ in, CO₂ out"],
            ["hCG", "Hormone keeping pregnancy early"],
            ["hPL", "Hormone causing insulin resistance"],
            ["IgG transfer", "Antibody bodyguards crossing over"],
            ["Selective barrier", "The security guard"]
        ],
        diagram:
"   PLACENTA = 5-in-1\n" +
"   LUNGS  O2/CO2 exchange\n" +
"   GUT    nutrition\n" +
"   KIDNEY waste removal\n" +
"   GLAND  hCG,hPL,est,prog\n" +
"   GUARD  barrier + IgG in\n" +
"   ~500 g, out in 3rd stage",
        dcap: "Lungs+Gut+Kidney+Gland+Guard",
        why: [
            "The fetus cannot breathe, eat or excrete, so the placenta performs all three via the maternal circulation.",
            "hCG maintains the corpus luteum early; later the placenta takes over oestrogen/progesterone production to sustain pregnancy.",
            "Only IgG (small enough) crosses, giving the newborn passive immunity for its first months."
        ],
        recall: "Placenta = <b>lungs, gut, kidneys, hormone factory (hCG/hPL/oestrogen/progesterone), IgG immunity, selective barrier.</b> ~500 g, out in 3rd stage.",
        viva: [
            "List the functions of the placenta.",
            "Which hormones does the placenta secrete?",
            "Which antibody crosses the placenta?",
            "What is the approximate weight of the placenta?",
            "In which stage of labour is the placenta delivered?"
        ],
        mcq: [
            { q: "Which antibody crosses the placenta?", opts: ["IgA", "IgG", "IgM", "IgE"], a: 1 },
            { q: "The placenta secretes all EXCEPT:", opts: ["hCG", "hPL", "Progesterone", "Insulin"], a: 3 },
            { q: "The placenta weighs approximately:", opts: ["100 g", "250 g", "500 g", "1 kg"], a: 2 },
            { q: "Gas exchange in the fetus occurs across the:", opts: ["Lungs", "Placenta", "Liver", "Cord"], a: 1 },
            { q: "The placenta is delivered in which stage?", opts: ["First", "Second", "Third", "Fourth"], a: 2 }
        ],
        drill: ["Gas exchange", "Nutrition", "Excretion", "hCG/hPL", "IgG", "Barrier", "500 g"]
    };

    /* ---- Types of separation of placenta (ID 18) ---- */
    K[18] = {
        lines: [
            "The placenta separates in <b>2 ways</b> after delivery.",
            "<b>Schultze</b> method = centre separates first, shiny fetal side appears — <b>80%, safer, less bleeding</b>.",
            "<b>Duncan</b> method = edge separates first, rough maternal side appears — <b>20%, more bleeding</b>.",
            "Signs of separation: <b>GUSH</b> — Globular uterus, Uterus rises, Sudden gush of blood, Hanging (lengthening) cord.",
            "Knowing the type helps predict blood loss."
        ],
        story: "The placenta peels off the uterine wall like a <b>sticker</b> in two styles. <b>Schultze</b> is the <b>neat child</b> — peels from the <b>centre</b>, so the <b>shiny fetal side</b> slides out first like a clean plate, trapping blood behind it (less bleeding). <b>Duncan</b> is the <b>messy child</b> — peels from the <b>edge</b>, so the <b>rough maternal side</b> shows first and blood dribbles out along the way. The sticker announces it's loose with <b>GUSH</b>: the uterus becomes a <b>ball (Globular)</b>, <b>rises Up</b>, gives a <b>Sudden gush</b>, and the cord <b>Hangs longer</b>.",
        mnemonic: {
            word: "S-shiny / D-dirty",
            parts: ["S = Schultze, Shiny fetal side, Safer (80%)", "D = Duncan, Dirty/rough maternal side, more blood (20%)", "GUSH = Globular, Up, Sudden gush, Hanging cord"],
            local: "“Schultze = shiny, safe. Duncan = dirty, zyada khoon.”"
        },
        palace: "A **sticker on a wall**. One peels **centre-first showing a shiny plate (Schultze)**; another peels **edge-first showing rough glue (Duncan)** dripping blood. A **globular ball rising**, a **sudden splash**, a **cord hanging down**.",
        terms: [
            ["Schultze", "Centre-first, shiny side, safer"],
            ["Duncan", "Edge-first, rough side, more bleed"],
            ["GUSH", "Signs of separation"],
            ["Globular uterus", "The 'ball' sign"]
        ],
        diagram:
"   SEPARATION types\n" +
"   SCHULTZE centre 1st, shiny, 80%\n" +
"   DUNCAN   edge 1st, rough, 20% +blood\n" +
"   SIGNS (GUSH): Globular, Up,\n" +
"           Sudden gush, Hanging cord",
        dcap: "Schultze shiny-safe · Duncan dirty",
        why: [
            "Schultze separates from the centre, so the retroplacental clot is contained and expelled with the placenta — less visible bleeding.",
            "Duncan separates from the edge, letting blood escape along the margin — hence more external bleeding.",
            "The signs of separation (GUSH) reflect the uterus contracting down and the placenta descending into the lower segment/vagina."
        ],
        recall: "Placental separation: <b>Schultze (centre, shiny, 80%, safer) vs Duncan (edge, rough, 20%, more bleed).</b> Signs = <b>GUSH</b> (Globular, Up, Sudden gush, Hanging cord).",
        viva: [
            "Name the two types of placental separation.",
            "Which type is commoner and safer?",
            "Which side appears first in Schultze separation?",
            "What does GUSH stand for?",
            "Why does Duncan separation bleed more?"
        ],
        mcq: [
            { q: "The commoner type of placental separation is:", opts: ["Duncan", "Schultze", "Central", "Marginal"], a: 1 },
            { q: "In Schultze separation, which side appears first?", opts: ["Maternal", "Fetal (shiny)", "Edge", "Membranes"], a: 1 },
            { q: "Duncan separation is associated with:", opts: ["Less bleeding", "More bleeding", "No bleeding", "Shiny side first"], a: 1 },
            { q: "A sign of placental separation is:", opts: ["Uterus becomes soft", "Cord lengthens with gush of blood", "Fundus descends", "FHR drops"], a: 1 },
            { q: "Schultze separation occurs in about:", opts: ["20%", "50%", "80%", "100%"], a: 2 }
        ],
        drill: ["Schultze", "Duncan", "Shiny fetal side", "Rough maternal side", "GUSH", "Globular uterus"]
    };

    /* ---- Amniotic fluid (IDs 19, 20, 21) ---- */
    var kitAF = {
        lines: [
            "Amniotic fluid = clear, straw-coloured liquid around the baby.",
            "Normal volume peaks at 36–38 weeks (~<b>800–1000 mL</b>).",
            "Functions: <b>protects, cushions, allows movement, develops lungs & gut, regulates temperature</b>.",
            "Too much = <b>polyhydramnios (>2000 mL)</b>; too little = <b>oligohydramnios (<300 mL)</b>.",
            "Assessed by ultrasound using AFI (amniotic fluid index)."
        ],
        story: "Amniotic fluid is the baby's <b>private swimming pool</b>. It is a <b>shock-absorbing cushion</b> so the baby doesn't bump its head, a <b>gym</b> where the baby kicks and grows muscles, a <b>practice pool</b> the baby <b>breathes and swallows</b> to build its lungs and gut, and a <b>constant warm bath</b> keeping the temperature steady. Too much water and the pool overflows (<b>polyhydramnios</b>); too little and the baby is cramped in a <b>dry bucket</b> (<b>oligohydramnios</b>).",
        mnemonic: {
            word: "S-P-A-C-E",
            parts: ["S = Shock absorber (cushion)", "P = Prevents adhesions, allows movement", "A = Airways & gut develop", "C = Constant temperature", "E = Equal pressure on cord"],
            local: "“800–1000 mL normal. Zyada = poly, kam = oligo.”"
        },
        palace: "A **swimming pool** with a baby inside. A **cushion**, a **dumbbell (movement)**, **lungs and a stomach** inflating, a **thermostat**. Two warning signs: an **overflowing pool (poly)** and a **dry bucket (oligo)**.",
        terms: [
            ["Polyhydramnios", "Overflowing pool >2000 mL"],
            ["Oligohydramnios", "Dry bucket <300 mL"],
            ["AFI", "Ultrasound measure of fluid"],
            ["Cushion", "Shock absorber for the baby"]
        ],
        diagram:
"   AMNIOTIC FLUID (800-1000 mL)\n" +
"   protect | cushion | movement\n" +
"   lung+gut develop | warm bath\n" +
"   >2000 = POLYhydramnios\n" +
"   <300  = OLIGOhydramnios",
        dcap: "800-1000 normal · poly>2000 · oligo<300",
        why: [
            "Fluid cushions the fetus from trauma and equalises pressure so the cord isn't compressed.",
            "Fetal breathing and swallowing of fluid are essential for lung and gut maturation.",
            "Volume reflects fetal health — too little often signals renal problems or placental insufficiency; too much signals diabetes or anomalies."
        ],
        recall: "Amniotic fluid = <b>cushion, movement, lung/gut development, temperature.</b> Normal 800–1000 mL; <b>poly >2000, oligo <300.</b>",
        viva: [
            "What is the normal volume of amniotic fluid at term?",
            "List three functions of amniotic fluid.",
            "Define polyhydramnios and oligohydramnios.",
            "How is amniotic fluid assessed?",
            "Why is amniotic fluid important for lung development?"
        ],
        mcq: [
            { q: "Normal amniotic fluid volume at term is about:", opts: ["100 mL", "300 mL", "800–1000 mL", "3000 mL"], a: 2 },
            { q: "Polyhydramnios is fluid exceeding:", opts: ["1000 mL", "1500 mL", "2000 mL", "500 mL"], a: 2 },
            { q: "Oligohydramnios is fluid below:", opts: ["300 mL", "800 mL", "1000 mL", "2000 mL"], a: 0 },
            { q: "A function of amniotic fluid is:", opts: ["Producing hormones", "Cushioning the fetus", "Making RBCs", "Forming the placenta"], a: 1 },
            { q: "Amniotic fluid is measured by:", opts: ["X-ray", "AFI on ultrasound", "CT scan", "MRI only"], a: 1 }
        ],
        drill: ["Amniotic fluid", "800-1000 mL", "Polyhydramnios", "Oligohydramnios", "AFI", "Cushion"]
    };
    K[19] = kitAF;
    K[20] = kitAF;
    K[21] = kitAF;

    /* ---- Induction of labour (IDs 54, 194) ---- */
    var kitIOL = {
        lines: [
            "<b>Induction of labour (IOL)</b> = starting labour artificially before it begins on its own.",
            "Done when continuing pregnancy is <b>riskier than delivering</b>.",
            "Indications: <b>post-term, pre-eclampsia, PROM, diabetes, IUGR</b>.",
            "Methods: <b>medical (prostaglandins, oxytocin), surgical (ARM/amniotomy), mechanical (Foley, sweeping)</b>.",
            "The <b>Bishop score</b> tells if the cervix is favourable (≥6 = ready)."
        ],
        story: "Sometimes the baby is a <b>tenant who won't leave</b> even though the building (uterus) is becoming unsafe — the landlord (doctor) must <b>start the eviction</b> (induction). The reasons: the rent is <b>overdue (post-term)</b>, the building has <b>high pressure (pre-eclampsia)</b>, the <b>water tank already burst (PROM)</b>, there's <b>too much sugar (diabetes)</b>, or the tenant <b>isn't growing (IUGR)</b>. Eviction tools: <b>hormone keys (prostaglandins/oxytocin)</b>, <b>breaking the water bag (ARM)</b>, or a <b>Foley balloon pushing the door</b>. The <b>Bishop score</b> is the landlord's checklist to see if the door (cervix) is unlocked.",
        mnemonic: {
            word: "P-P-P-D-I",
            parts: ["P = Post-term", "P = Pre-eclampsia", "P = PROM", "D = Diabetes", "I = IUGR"],
            local: "Methods — “Prostaglandin, Oxytocin, ARM, Foley.” Bishop ≥6 = cervix ready."
        },
        palace: "A **tenant who won't leave**. The landlord holds **hormone keys**, a **water-bag pin (ARM)**, and a **Foley balloon**. A **checklist clipboard = Bishop score** shows a tick at **6**.",
        terms: [
            ["IOL", "Artificially starting labour"],
            ["ARM", "Breaking the water bag (amniotomy)"],
            ["Prostaglandin", "Cervical-ripening hormone"],
            ["Oxytocin", "Contraction-starting hormone drip"],
            ["Bishop score", "The 'is cervix ready' checklist"]
        ],
        diagram:
"   INDUCTION of labour\n" +
"   WHY: post-term,PIH,PROM,DM,IUGR\n" +
"   HOW: PGE2 gel | oxytocin drip\n" +
"        ARM (break waters) | Foley\n" +
"   Bishop >=6 = favourable cervix",
        dcap: "Why P-P-P-D-I · how medical/surgical",
        why: [
            "Induction is justified only when the intrauterine environment becomes more dangerous than delivery (e.g. failing placenta).",
            "Prostaglandins ripen (soften) the cervix so oxytocin and ARM can work effectively.",
            "A Bishop score ≥6 predicts successful induction because the cervix is already soft, thin, dilating and the head is low."
        ],
        recall: "IOL = start labour artificially. <b>Indications P-P-P-D-I. Methods: prostaglandins, oxytocin, ARM, Foley. Bishop ≥6 = favourable.</b>",
        viva: [
            "Define induction of labour.",
            "List three indications for induction.",
            "Name the methods of induction.",
            "What is the role of the Bishop score?",
            "What is ARM?"
        ],
        mcq: [
            { q: "An indication for induction of labour is:", opts: ["Normal term pregnancy", "Post-term pregnancy", "First trimester", "Threatened abortion"], a: 1 },
            { q: "ARM stands for:", opts: ["Artificial rupture of membranes", "Active rotational movement", "Antenatal risk marker", "Amniotic fluid measurement"], a: 0 },
            { q: "A Bishop score indicating a favourable cervix is:", opts: ["≥2", "≥4", "≥6", "≥10"], a: 2 },
            { q: "Which drug is used for cervical ripening?", opts: ["Prostaglandin", "Magnesium sulphate", "Methyldopa", "Antibiotic"], a: 0 },
            { q: "Oxytocin in induction is given as:", opts: ["Single IM bolus", "Titrated IV infusion", "Oral tablet", "Rectal suppository"], a: 1 }
        ],
        drill: ["IOL", "Post-term", "PROM", "Prostaglandin", "Oxytocin", "ARM", "Bishop ≥6"]
    };
    K[54] = kitIOL;
    K[194] = kitIOL;

    /* ---- Puerperium (IDs 61, 210) ---- */
    var kitPuerp = {
        lines: [
            "<b>Puerperium</b> = the <b>6 weeks</b> after delivery when the body returns to its non-pregnant state.",
            "Big changes: <b>uterus shrinks (involution), lochia flows, milk comes in</b>.",
            "Postnatal care = check <b>vitals, uterus, lochia, perineum, breastfeeding</b>.",
            "Minor problems: <b>afterpains, constipation, urinary retention, breast engorgement, haemorrhoids</b>.",
            "Management is mostly <b>supportive, education and reassurance</b>."
        ],
        story: "The puerperium is the mother's <b>“factory reset” period</b> — 6 weeks for her body to uninstall the pregnancy. The <b>uterus shrinks</b> like a deflating balloon back to fist-size (involution), a <b>bloody discharge called lochia</b> drains like a wound healing, and the <b>breasts switch on</b> like a new milk machine. The nurse visits like a <b>service technician</b>, checking the <b>vitals dials, the shrinking uterus, the lochia colour, the perineum stitches and the milk flow</b>, while soothing the small glitches — crampy <b>afterpains</b>, <b>constipation</b>, <b>leaky breasts</b>.",
        mnemonic: {
            word: "6-W-I-L-M",
            parts: ["6 = 6 weeks duration", "W = Womb involution", "I = lochia (dIscharge)", "L = Lactation begins", "M = Monitor vitals/perineum/breast"],
            local: "Minor problems — “Afterpains, Constipation, Urine rukna, Breast fulna, Bawaseer.”"
        },
        palace: "A **deflating balloon (uterus)** shrinking to a **fist**, a **tri-coloured tap (lochia: red→pink→white)**, a **milk machine switching on**. A **nurse with a checklist** ticking vitals, perineum, breast.",
        terms: [
            ["Involution", "Uterus shrinking back to normal"],
            ["Lochia", "Post-delivery discharge (red→pink→white)"],
            ["Afterpains", "Crampy contractions while uterus shrinks"],
            ["Engorgement", "Overfull painful breasts"]
        ],
        diagram:
"   PUERPERIUM = 6 weeks\n" +
"   uterus: involution (shrinks)\n" +
"   lochia: rubra->serosa->alba\n" +
"   breasts: milk comes in\n" +
"   minor: afterpains,constipation\n" +
"          urine retention,engorgement",
        dcap: "6 weeks · involution · lochia · lactation",
        why: [
            "Involution returns the uterus to pelvic size by ~6 weeks through autolysis and contraction — preventing late PPH.",
            "Lochia is the shedding of the decidua as the placental site heals; its changing colour tracks normal healing.",
            "Suckling drives both milk production and uterine contraction, linking breastfeeding to faster involution."
        ],
        recall: "Puerperium = <b>6 weeks, involution, lochia (rubra→serosa→alba), lactation.</b> Monitor vitals/uterus/perineum/breast. Minor: afterpains, constipation, retention, engorgement.",
        viva: [
            "Define puerperium and its duration.",
            "What is involution?",
            "Name the three types of lochia in order.",
            "List three minor complications of the puerperium.",
            "What is the focus of postnatal care?"
        ],
        mcq: [
            { q: "The puerperium lasts for:", opts: ["1 week", "6 weeks", "6 months", "1 year"], a: 1 },
            { q: "Involution refers to:", opts: ["Breast milk production", "Uterus returning to normal size", "Lochia flow", "Ovulation"], a: 1 },
            { q: "The correct order of lochia is:", opts: ["Alba, serosa, rubra", "Rubra, serosa, alba", "Serosa, rubra, alba", "Rubra, alba, serosa"], a: 1 },
            { q: "A minor puerperal complication is:", opts: ["PPH", "Breast engorgement", "Eclampsia", "Sepsis"], a: 1 },
            { q: "Crampy pains during involution are called:", opts: ["Afterpains", "Labour pains", "Braxton Hicks", "Dysmenorrhoea"], a: 0 }
        ],
        drill: ["Puerperium 6 wk", "Involution", "Lochia rubra-serosa-alba", "Lactation", "Afterpains", "Engorgement"]
    };
    K[61] = kitPuerp;
    K[210] = kitPuerp;

    /* ---- Oxytocin (ID 101) ---- */
    K[101] = {
        lines: [
            "Oxytocin = a hormone from the <b>posterior pituitary gland</b>.",
            "Synthetic forms = <b>Syntocinon / Pitocin</b>.",
            "Two big actions: <b>contracts the uterus</b> and <b>ejects milk (let-down reflex)</b>.",
            "Uses: <b>induction/augmentation of labour, prevention & treatment of PPH</b>.",
            "AMTSL dose: <b>10 IU IM</b> within 1 minute of birth."
        ],
        story: "Oxytocin is the body's <b>“squeeze hormone”</b> — a tiny messenger from the pituitary that makes smooth muscle squeeze. In labour it <b>squeezes the uterus</b> to push the baby out; after delivery it <b>squeezes the uterus shut</b> to stop bleeding (PPH); and during breastfeeding it <b>squeezes the milk glands</b> so milk sprays out (let-down). Doctors bottle this squeeze as <b>Pitocin</b> to start labour, strengthen weak contractions, or rescue a bleeding uterus.",
        mnemonic: {
            word: "S-Q-U-E-E-Z-E",
            parts: ["S = Starts labour (induction)", "Q = Quickens weak contractions", "U = Uterus contracts", "E = Ejects milk (let-down)", "E = Ends bleeding (PPH)", "Z = 10 IU IM in AMTSL", "E = from postErior pituitary"],
            local: "“Oxytocin = nichod hormone — uterus bhi, doodh bhi.”"
        },
        palace: "A **pituitary gland** spraying a **squeeze gun**. It squeezes a **uterus (labour)**, squeezes a **bleeding tap shut (PPH)**, and squeezes a **milk carton (let-down)**. A vial labelled **10 IU IM**.",
        terms: [
            ["Pitocin/Syntocinon", "Bottled synthetic oxytocin"],
            ["Let-down reflex", "Milk ejection by oxytocin"],
            ["Posterior pituitary", "Where natural oxytocin is made"],
            ["10 IU IM", "AMTSL anti-bleeding dose"]
        ],
        diagram:
"   OXYTOCIN (post. pituitary)\n" +
"   uterus: contract -> labour/PPH\n" +
"   breast: milk let-down\n" +
"   uses: induce, augment, PPH\n" +
"   AMTSL: 10 IU IM <1 min",
        dcap: "Squeeze uterus + squeeze milk",
        why: [
            "Oxytocin receptors in the myometrium trigger strong rhythmic contractions — useful to start or strengthen labour.",
            "Post-delivery, contraction of the myometrium kinks the placental-site vessels, so oxytocin is first-line for atony/PPH.",
            "Oxytocin contracts myoepithelial cells around the alveoli, ejecting milk — the let-down reflex triggered by suckling."
        ],
        recall: "Oxytocin = posterior pituitary 'squeeze' hormone. <b>Contracts uterus (induce/augment/PPH) + milk let-down. AMTSL 10 IU IM.</b>",
        viva: [
            "Where is oxytocin produced?",
            "Name two clinical uses of oxytocin.",
            "What is the milk let-down reflex?",
            "What is the AMTSL dose of oxytocin?",
            "Why is oxytocin given in PPH?"
        ],
        mcq: [
            { q: "Oxytocin is secreted by the:", opts: ["Anterior pituitary", "Posterior pituitary", "Ovary", "Placenta"], a: 1 },
            { q: "Synthetic oxytocin is called:", opts: ["Methergin", "Pitocin", "MgSO4", "Prolactin"], a: 1 },
            { q: "The milk let-down reflex is caused by:", opts: ["Prolactin", "Oxytocin", "Oestrogen", "Progesterone"], a: 1 },
            { q: "AMTSL oxytocin dose is:", opts: ["2 IU IV", "5 IU IM", "10 IU IM", "20 IU IV"], a: 2 },
            { q: "Oxytocin is used to treat which type of PPH?", opts: ["Traumatic", "Atonic", "Coagulopathy", "Retained"], a: 1 }
        ],
        drill: ["Oxytocin", "Posterior pituitary", "Pitocin", "Let-down", "Uterine contraction", "10 IU IM"]
    };

    /* ---- Lactation physiology & management (IDs 103, 104) ---- */
    var kitLact = {
        lines: [
            "Lactation = secretion and ejection of breast milk, driven by <b>two hormones = two reflexes</b>.",
            "<b>Prolactin</b> = makes milk (secretion).",
            "<b>Oxytocin</b> = ejects milk (let-down).",
            "Both are triggered by the <b>baby's suckling</b>.",
            "Stages: <b>mammogenesis → lactogenesis → galactopoiesis</b>."
        ],
        story: "The breast is a <b>milk factory</b> with <b>two workers</b>. <b>Prolactin</b> is the <b>production manager</b> who manufactures milk in the factory (alveoli). <b>Oxytocin</b> is the <b>delivery boy</b> who squeezes the milk out through the ducts to the baby. The baby's <b>suckling is the doorbell</b> that rings BOTH workers — the more the baby rings, the more milk is made and delivered. So <b>“supply follows demand”</b>: frequent suckling = more milk.",
        mnemonic: {
            word: "P-O",
            parts: ["P = Prolactin Produces milk", "O = Oxytocin Out-flows (let-down)"],
            local: "Stages — Mammogenesis (breast bana), Lactogenesis (doodh shuru), Galactopoiesis (doodh chalta rahe)."
        },
        palace: "A **milk factory**. A **manager (Prolactin)** making milk, a **delivery boy (Oxytocin)** pushing it out. The baby **rings a doorbell (suckling)** that summons both. Three **signboards**: breast built → milk starts → milk maintained.",
        terms: [
            ["Prolactin", "Production manager — makes milk"],
            ["Oxytocin", "Delivery boy — let-down"],
            ["Suckling", "The doorbell triggering both reflexes"],
            ["Galactopoiesis", "Maintaining milk supply"]
        ],
        diagram:
"   LACTATION = 2 reflexes\n" +
"   suckling -> PROLACTIN -> make milk\n" +
"   suckling -> OXYTOCIN  -> eject milk\n" +
"   mammo->lacto->galactopoiesis\n" +
"   supply follows demand",
        dcap: "Prolactin makes · Oxytocin ejects",
        why: [
            "Suckling stimulates the nipple nerves, signalling the pituitary to release prolactin (anterior) and oxytocin (posterior).",
            "Prolactin rises after each feed to prepare the next supply — so frequent feeding maintains production.",
            "Oxytocin let-down can be conditioned to baby's cry or even thought — explaining why stress inhibits flow."
        ],
        recall: "Lactation = <b>Prolactin makes milk, Oxytocin ejects (let-down); both triggered by suckling. Stages mammo→lacto→galactopoiesis. Supply follows demand.</b>",
        viva: [
            "Which hormone produces milk and which ejects it?",
            "What triggers the milk reflexes?",
            "Name the stages of lactation.",
            "Why does frequent feeding increase milk supply?",
            "What is the let-down reflex?"
        ],
        mcq: [
            { q: "Milk production is controlled by:", opts: ["Oxytocin", "Prolactin", "Oestrogen", "Progesterone"], a: 1 },
            { q: "The milk ejection (let-down) reflex is due to:", opts: ["Prolactin", "Oxytocin", "hCG", "hPL"], a: 1 },
            { q: "Both lactation reflexes are triggered by:", opts: ["Hormones only", "Baby's suckling", "Mother's diet", "Sleep"], a: 1 },
            { q: "Galactopoiesis refers to:", opts: ["Breast growth", "Start of milk", "Maintenance of milk", "Weaning"], a: 2 },
            { q: "Milk supply mainly depends on:", opts: ["Mother's weight", "Frequency of suckling", "Mother's age", "Baby's weight"], a: 1 }
        ],
        drill: ["Prolactin", "Oxytocin", "Suckling", "Let-down", "Galactopoiesis", "Supply=demand"]
    };
    K[103] = kitLact;
    K[104] = kitLact;

})();
