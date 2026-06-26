/* ════════════════════════════════════════════════════════════════
   LEARN ABOUT — Interactive study modules (Google "Learn About" style)
   Injected into EVERY answer. Renders five Material Design 3 modules:
     • Build your vocab        (term + IPA + speak + definition)
     • Why it matters          (clinical significance)
     • Stop & think            (reflective prompt)
     • Test your knowledge     (interactive, context-aware quiz)
     • Common misconception    (wrong ✗  vs  right ✓)

   Content is generated from a curated midwifery / OBG term bank that
   covers every unit. Terms are matched against the OPEN question so the
   modules are specific to it; the quiz is built from the terms actually
   detected in the current answer wherever possible. Selection is
   deterministic per question (stable on re-open) and lightweight.

   Exposes window.injectLearnAbout(container, question) — called from
   openModal() after the answer HTML is rendered.
   ════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ---- 1. Curated term bank ---------------------------------------
       Each entry: term, ipa, def, matters, mis{wrong,right}, unit,
       keys[] (lowercase strings matched in question+answer text) and an
       optional curated `quiz` testing a fact stated in that answer.
       `unit` lets the quiz draw sibling distractors from the same topic
       family. Definitions are paraphrased (never copied from answers).
       ---------------------------------------------------------------- */
    var TERMS = {
        /* ── Unit I — Introduction, maternal health ─────────────── */
        maternal_mortality: {
            unit: 1, term: 'Maternal Mortality', ipa: '/məˈtɜːnəl mɔːˈtælɪti/',
            keys: ['maternal mortality', 'maternal death'],
            def: 'The death of a woman during pregnancy, childbirth, or within 42 days of delivery, from any pregnancy-related cause.',
            matters: 'It is a key indicator of a health system. Most maternal deaths are preventable, so recognising danger signs early is a core midwifery responsibility.',
            mis: { wrong: 'Maternal mortality includes any death of a pregnant woman, including accidents.', right: 'It counts only deaths from pregnancy-related causes — accidental or incidental deaths are excluded.' },
            quiz: { q: 'A woman dies of post-partum haemorrhage on day 3 after delivery. This is classified as:', opts: [{ t: 'A maternal death', correct: true }, { t: 'An incidental death', correct: false }] }
        },
        maternal_morbidity: {
            unit: 1, term: 'Maternal Morbidity', ipa: '/məˈtɜːnəl mɔːˈbɪdɪti/',
            keys: ['maternal morbidity', 'morbidity'],
            def: 'Any short- or long-term illness or disability that results from pregnancy or childbirth but does not cause death.',
            matters: 'For every maternal death, many more women suffer lasting morbidity such as fistula or anaemia, so prevention is just as important.',
            mis: { wrong: 'Morbidity and mortality mean the same thing.', right: 'Mortality means death; morbidity means illness or disability that the woman survives.' }
        },
        nrhm: {
            unit: 1, term: 'National Health Mission (NRHM)', ipa: '/ˈnæʃənəl hɛlθ ˈmɪʃən/',
            keys: ['nrhm', 'national rural health', 'national health mission'],
            def: 'An Indian government programme to strengthen health care, especially maternal and child health, in rural and under-served areas.',
            matters: 'It funds the ASHA worker, JSY cash incentives and institutional delivery — the backbone of community maternal care in India.',
            mis: { wrong: 'NRHM only builds hospitals.', right: 'It mainly strengthens community-level care — ASHAs, referral transport and incentives for safe delivery.' }
        },
        rch: {
            unit: 1, term: 'Reproductive & Child Health (RCH)', ipa: '/ˌriːprəˈdʌktɪv/',
            keys: ['rch', 'reproductive and child health'],
            def: 'A national programme integrating maternal health, child health, family planning and adolescent care into one service package.',
            matters: 'It shifts care from isolated schemes to a continuum from pre-pregnancy through childhood, improving coverage.',
            mis: { wrong: 'RCH deals only with childbirth.', right: 'It spans the whole reproductive life cycle, including family planning and adolescent health.' }
        },
        safe_motherhood: {
            unit: 1, term: 'Safe Motherhood', ipa: '/seɪf ˈmʌðəhʊd/',
            keys: ['safe motherhood', 'safe mother'],
            def: 'A set of efforts ensuring every woman receives the care she needs to be safe and healthy through pregnancy and childbirth.',
            matters: 'Its pillars — antenatal care, skilled birth attendance and emergency obstetric care — together prevent most maternal deaths.',
            mis: { wrong: 'Safe motherhood begins only when labour starts.', right: 'It begins before pregnancy and continues through the postnatal period.' }
        },

        /* ── Unit II — Anatomy & physiology ─────────────────────── */
        female_pelvis: {
            unit: 2, term: 'Female (Gynaecoid) Pelvis', ipa: '/ˈfiːmeɪl ˈpɛlvɪs/',
            keys: ['female pelvis', 'gynaecoid', 'pelvis'],
            def: 'The bony ring that supports the trunk and forms the birth canal; the rounded gynaecoid type is the most favourable for birth.',
            matters: 'Its shape and diameters decide whether the baby can pass through, so pelvic assessment guides the mode of delivery.',
            mis: { wrong: 'All pelvis types are equally good for childbirth.', right: 'The gynaecoid (round) type is ideal; android and platypelloid shapes can obstruct labour.' },
            quiz: { q: 'The type of pelvis most favourable for normal vaginal delivery is the:', opts: [{ t: 'Gynaecoid pelvis', correct: true }, { t: 'Android pelvis', correct: false }] }
        },
        menstrual_cycle: {
            unit: 2, term: 'Menstrual Cycle', ipa: '/ˈmɛnstruəl ˈsaɪkəl/',
            keys: ['menstrual cycle', 'menstruation', 'menstrual'],
            def: 'The roughly 28-day hormonal cycle that prepares the uterus for pregnancy, with menstrual, proliferative and secretory phases.',
            matters: 'Knowing the cycle underpins fertility awareness, family planning and detecting menstrual disorders.',
            mis: { wrong: 'Ovulation happens during menstruation.', right: 'Ovulation occurs around day 14 — roughly mid-cycle — not during the bleed.' },
            quiz: { q: 'In a typical 28-day menstrual cycle, ovulation occurs around day:', opts: [{ t: '14', correct: true }, { t: '28', correct: false }] }
        },
        fertilization: {
            unit: 2, term: 'Fertilization', ipa: '/ˌfɜːtɪlaɪˈzeɪʃən/',
            keys: ['fertilization', 'fertilisation'],
            def: 'The fusion of a sperm and an ovum to form a zygote, normally occurring in the ampulla of the fallopian tube.',
            matters: 'It marks the start of pregnancy; the usual tubal site explains why tubal damage leads to ectopic pregnancy.',
            mis: { wrong: 'Fertilization normally happens inside the uterus.', right: 'It normally happens in the outer (ampullary) part of the fallopian tube.' },
            quiz: { q: 'Fertilization of the ovum normally takes place in the:', opts: [{ t: 'Ampulla of the fallopian tube', correct: true }, { t: 'Uterine cavity', correct: false }] }
        },
        fetal_circulation: {
            unit: 2, term: 'Fetal Circulation', ipa: '/ˈfiːtəl ˌsɜːkjʊˈleɪʃən/',
            keys: ['fetal circulation', 'foetal circulation', 'ductus', 'foramen ovale'],
            def: 'The unique blood flow of the fetus using shunts (ductus venosus, foramen ovale, ductus arteriosus) that bypass the lungs and liver.',
            matters: 'These shunts close at birth; failure to close causes congenital heart problems the newborn nurse must recognise.',
            mis: { wrong: 'The fetal lungs oxygenate the blood before birth.', right: 'The placenta does the gas exchange; fetal blood bypasses the non-functioning lungs.' },
            quiz: { q: 'Before birth, fetal gas exchange (oxygenation) takes place at the:', opts: [{ t: 'Placenta', correct: true }, { t: 'Lungs', correct: false }] }
        },
        placenta: {
            unit: 2, term: 'Placenta', ipa: '/pləˈsɛntə/',
            keys: ['placenta', 'functions of placenta'],
            def: 'The organ joining mother and fetus that carries out nutrition, respiration, excretion, hormone production and protection.',
            matters: 'Its functions sustain fetal life; placental problems threaten growth, while retained placenta causes haemorrhage.',
            mis: { wrong: 'The placenta only supplies food to the baby.', right: 'It also handles gas exchange, waste removal, hormones and passive immunity.' }
        },
        amniotic_fluid: {
            unit: 2, term: 'Amniotic Fluid', ipa: '/ˌæmniˈɒtɪk ˈfluːɪd/',
            keys: ['amniotic fluid', 'liquor', 'amniotic'],
            def: 'The fluid surrounding the fetus that cushions it, allows movement, maintains temperature and aids lung development.',
            matters: 'Too little (oligohydramnios) or too much (polyhydramnios) signals problems, so its volume is assessed in pregnancy.',
            mis: { wrong: 'Amniotic fluid is just waste water.', right: 'It actively protects the fetus, allows movement and helps the lungs mature.' },
            quiz: { q: 'An abnormally low amniotic fluid volume is called:', opts: [{ t: 'Oligohydramnios', correct: true }, { t: 'Polyhydramnios', correct: false }] }
        },

        /* ── Unit III — Antenatal care ──────────────────────────── */
        signs_pregnancy: {
            unit: 3, term: 'Signs of Pregnancy', ipa: '/saɪnz əv ˈprɛɡnənsi/',
            keys: ['signs and symptoms of pregnancy', 'signs of pregnancy', 'diagnosis of pregnancy'],
            def: 'Indicators grouped as presumptive (felt by the woman), probable (found on examination) and positive (proof of a fetus).',
            matters: 'Only positive signs — fetal heart, fetal movements felt by examiner, ultrasound — truly confirm pregnancy.',
            mis: { wrong: 'A missed period proves pregnancy.', right: 'Amenorrhoea is only a presumptive sign; confirmation needs a positive sign.' },
            quiz: { q: 'Which of these is a POSITIVE (confirmatory) sign of pregnancy?', opts: [{ t: 'Fetal heart sounds', correct: true }, { t: 'Morning sickness', correct: false }] }
        },
        antenatal_care: {
            unit: 3, term: 'Antenatal Care (ANC)', ipa: '/ˌæntiˈneɪtəl kɛə/',
            keys: ['antenatal care', 'antenatal advice', 'antenatal period', 'anc'],
            def: 'The planned care of a woman through pregnancy to keep mother and fetus healthy and to detect problems early.',
            matters: 'Regular visits catch anaemia, hypertension and growth problems before they become emergencies.',
            mis: { wrong: 'Antenatal care is only needed if the woman feels unwell.', right: 'It is routine for every pregnancy — many dangerous conditions are silent at first.' },
            quiz: { q: 'The main purpose of antenatal care is to:', opts: [{ t: 'Detect and prevent problems early', correct: true }, { t: 'Only confirm the due date', correct: false }] }
        },
        high_risk_pregnancy: {
            unit: 3, term: 'High-Risk Pregnancy', ipa: '/haɪ rɪsk ˈprɛɡnənsi/',
            keys: ['high-risk pregnancy', 'high risk pregnancy', 'high-risk factor'],
            def: 'A pregnancy in which the mother or baby has a raised chance of illness or death because of medical, obstetric or social factors.',
            matters: 'Early identification lets the midwife refer the woman for specialist care and closer monitoring.',
            mis: { wrong: 'A high-risk pregnancy always ends badly.', right: 'With early identification and proper care, most high-risk pregnancies have good outcomes.' }
        },
        minor_disorders: {
            unit: 3, term: 'Minor Disorders of Pregnancy', ipa: '/ˈmaɪnə dɪsˈɔːdəz/',
            keys: ['minor disorders', 'minor ailment'],
            def: 'Common, non-dangerous discomforts of pregnancy such as nausea, heartburn, constipation and backache.',
            matters: 'Reassurance and simple advice manage them, but the midwife must distinguish them from serious warning signs.',
            mis: { wrong: 'All vomiting in pregnancy is a harmless minor disorder.', right: 'Severe, persistent vomiting (hyperemesis gravidarum) is a serious condition, not a minor one.' }
        },
        immunization_tt: {
            unit: 3, term: 'Tetanus Immunization (TT/Td)', ipa: '/ˈtɛtənəs ˌɪmjʊnaɪˈzeɪʃən/',
            keys: ['immunization during pregnancy', 'tt', 'td', 'tetanus'],
            def: 'Tetanus toxoid given in pregnancy to protect both mother and newborn from tetanus.',
            matters: 'It prevents neonatal tetanus, once a major killer of newborns delivered in unclean conditions.',
            mis: { wrong: 'TT in pregnancy protects only the mother.', right: 'Antibodies cross the placenta and also protect the newborn from tetanus.' }
        },
        ifa: {
            unit: 3, term: 'Iron–Folic Acid (IFA)', ipa: '/ˈaɪən ˈfoʊlɪk ˈæsɪd/',
            keys: ['ifa', 'iron-folic', 'iron folic', 'folic acid'],
            def: 'Iron and folic acid supplements given in pregnancy to prevent and treat anaemia and neural-tube defects.',
            matters: 'Routine IFA prophylaxis is a simple, cheap way to cut anaemia, a major indirect cause of maternal death.',
            mis: { wrong: 'IFA should be started only once anaemia appears.', right: 'It is given prophylactically to all pregnant women to prevent anaemia.' }
        },

        /* ── Unit IV — Labour ───────────────────────────────────── */
        normal_labour: {
            unit: 4, term: 'Normal Labour', ipa: '/ˈnɔːməl ˈleɪbə/',
            keys: ['normal labour', 'define labour', 'define normal labour'],
            def: 'Spontaneous onset at term of regular painful contractions leading to vaginal birth of a single baby in vertex position, without complications.',
            matters: 'Defining "normal" lets the midwife recognise when labour deviates and needs intervention.',
            mis: { wrong: 'Any vaginal birth counts as normal labour.', right: 'Normal labour must be spontaneous, term, single, vertex and complication-free.' },
            quiz: { q: 'For labour to be called "normal", the presentation should be:', opts: [{ t: 'Vertex (head first)', correct: true }, { t: 'Breech', correct: false }] }
        },
        stages_labour: {
            unit: 4, term: 'Stages of Labour', ipa: '/ˈsteɪdʒɪz əv ˈleɪbə/',
            keys: ['stages of labour', 'first stage', 'second stage', 'third stage'],
            def: 'Labour in four stages: 1st (dilatation), 2nd (delivery of baby), 3rd (delivery of placenta) and 4th (first hour after birth).',
            matters: 'Each stage has its own care; the third stage is when most life-threatening haemorrhage occurs.',
            mis: { wrong: 'Labour ends once the baby is born.', right: 'The third stage (placental delivery) and fourth stage (recovery hour) still follow.' },
            quiz: { q: 'Delivery of the placenta occurs during which stage of labour?', opts: [{ t: 'Third stage', correct: true }, { t: 'First stage', correct: false }] }
        },
        mechanism_labour: {
            unit: 4, term: 'Mechanism of Labour', ipa: '/ˈmɛkənɪzəm əv ˈleɪbə/',
            keys: ['mechanism of labour', 'cardinal movements', 'loa'],
            def: 'The series of passive movements (cardinal movements) the fetal head makes to pass through the pelvis during birth.',
            matters: 'Understanding it helps the midwife support each movement and detect when descent is not progressing.',
            mis: { wrong: 'The fetal head passes straight down without rotating.', right: 'It descends, flexes, internally rotates, extends and restitutes — a coordinated sequence.' },
            quiz: { q: 'The cardinal movements of labour describe movements of the fetal:', opts: [{ t: 'Head through the pelvis', correct: true }, { t: 'Mother\u2019s pelvis', correct: false }] }
        },
        partograph: {
            unit: 4, term: 'Partograph', ipa: '/ˈpɑːtəɡrɑːf/',
            keys: ['partograph', 'partogram', 'alert line', 'action line'],
            def: 'A pre-printed chart that records the progress of labour and the condition of mother and fetus over time.',
            matters: 'Crossing the alert and action lines warns of obstructed or prolonged labour, prompting timely referral.',
            mis: { wrong: 'The partograph is used only after delivery.', right: 'It is used during the active phase of labour to track progress in real time.' },
            quiz: { q: 'Cervical dilatation crossing the action line on a partograph indicates:', opts: [{ t: 'Abnormal, prolonged labour', correct: true }, { t: 'Normal progress', correct: false }] }
        },
        episiotomy: {
            unit: 4, term: 'Episiotomy', ipa: '/ɪˌpiːziˈɒtəmi/',
            keys: ['episiotomy'],
            def: 'A planned surgical cut to the perineum during birth to enlarge the vaginal opening.',
            matters: 'When indicated it can prevent uncontrolled tears, but routine use is no longer recommended.',
            mis: { wrong: 'An episiotomy should be done for every delivery.', right: 'It is done only when indicated — routine episiotomy is not recommended.' },
            quiz: { q: 'The most commonly recommended type of episiotomy incision is:', opts: [{ t: 'Mediolateral', correct: true }, { t: 'Median only in all cases', correct: false }] }
        },
        amtsl: {
            unit: 4, term: 'Active Management of 3rd Stage (AMTSL)', ipa: '/ˈæktɪv ˈmænɪdʒmənt/',
            keys: ['active management of third stage', 'amtsl', 'third stage of labour'],
            def: 'A package — uterotonic drug, controlled cord traction and uterine massage — used to deliver the placenta and prevent PPH.',
            matters: 'AMTSL roughly halves the risk of post-partum haemorrhage, the leading cause of maternal death.',
            mis: { wrong: 'AMTSL just means waiting for the placenta to come out.', right: 'It is active: give a uterotonic, apply controlled cord traction and massage the uterus.' },
            quiz: { q: 'The first step of active management of the third stage is to give a:', opts: [{ t: 'Uterotonic drug (e.g. oxytocin)', correct: true }, { t: 'Pain-relief drug', correct: false }] }
        },
        induction_labour: {
            unit: 4, term: 'Induction of Labour', ipa: '/ɪnˈdʌkʃən əv ˈleɪbə/',
            keys: ['induction of labour', 'induction'],
            def: 'Artificially starting labour before it begins on its own, using methods such as prostaglandins or oxytocin.',
            matters: 'It is done when continuing the pregnancy is riskier than delivery, but it needs careful fetal monitoring.',
            mis: { wrong: 'Induction is the same as augmentation.', right: 'Induction starts labour; augmentation speeds up labour that has already begun.' }
        },

        /* ── Unit V — Puerperium & newborn feeding ──────────────── */
        puerperium: {
            unit: 5, term: 'Puerperium', ipa: '/ˌpjuːəˈpɪəriəm/',
            keys: ['puerperium', 'postnatal', 'postpartum', 'post natal'],
            def: 'The period of about 6 weeks after delivery during which the body returns to its non-pregnant state.',
            matters: 'It is when involution, lactation and bonding occur — and when PPH, sepsis and thromboembolism most threaten the mother.',
            mis: { wrong: 'The puerperium lasts only until discharge from hospital.', right: 'It lasts roughly 6 weeks, until the reproductive organs return to normal.' },
            quiz: { q: 'The normal puerperium lasts approximately:', opts: [{ t: '6 weeks', correct: true }, { t: '2 weeks', correct: false }] }
        },
        involution: {
            unit: 5, term: 'Uterine Involution', ipa: '/ˌɪnvəˈluːʃən/',
            keys: ['involution'],
            def: 'The process by which the uterus returns to its non-pregnant size after delivery.',
            matters: 'Tracking fundal height each day confirms normal recovery; a poorly contracting uterus warns of PPH or infection.',
            mis: { wrong: 'The uterus stays the same size after delivery.', right: 'It steadily shrinks, descending about one finger-breadth per day after birth.' },
            quiz: { q: 'After delivery the uterine fundus normally descends by about:', opts: [{ t: '1 finger-breadth per day', correct: true }, { t: '5 cm per day', correct: false }] }
        },
        lochia: {
            unit: 5, term: 'Lochia', ipa: '/ˈloʊkiə/',
            keys: ['lochia'],
            def: 'The vaginal discharge after childbirth, made of blood, mucus and uterine tissue, changing colour over time.',
            matters: 'Watching lochia helps detect retained products or infection: a foul smell or fresh bleeding is a red flag.',
            mis: { wrong: 'Lochia stays bright red for the whole puerperium.', right: 'It changes from red (rubra) to pink (serosa) to white (alba) over the weeks.' },
            quiz: { q: 'The first, red-coloured lochia seen after birth is called lochia:', opts: [{ t: 'Rubra', correct: true }, { t: 'Alba', correct: false }] }
        },
        colostrum: {
            unit: 5, term: 'Colostrum', ipa: '/kəˈlɒstrəm/',
            keys: ['colostrum'],
            def: 'The thick, yellowish first milk produced in late pregnancy and the first few days after birth.',
            matters: 'It is rich in antibodies and acts as the baby\'s first immunisation, protecting against infection.',
            mis: { wrong: 'Colostrum is "dirty milk" that should be discarded.', right: 'It is highly protective and should be the baby\'s very first feed.' },
            quiz: { q: 'Colostrum is especially valuable because it is rich in:', opts: [{ t: 'Antibodies', correct: true }, { t: 'Fat only', correct: false }] }
        },
        lactation: {
            unit: 5, term: 'Lactation', ipa: '/lækˈteɪʃən/',
            keys: ['lactation', 'breastfeeding', 'breast feeding', 'breast milk'],
            def: 'The production and release of breast milk, driven by the hormones prolactin (milk making) and oxytocin (milk ejection).',
            matters: 'Correct positioning and frequent suckling keep milk flowing; problems here cause feeding failure and engorgement.',
            mis: { wrong: 'Mothers should feed on a strict clock schedule.', right: 'Feeding on demand maintains supply far better than rigid timing.' },
            quiz: { q: 'The hormone responsible for the milk ejection ("let-down") reflex is:', opts: [{ t: 'Oxytocin', correct: true }, { t: 'Prolactin', correct: false }] }
        },
        afterpains: {
            unit: 5, term: 'Afterpains', ipa: '/ˈɑːftəpeɪnz/',
            keys: ['afterpains', 'after pains', 'after-pains'],
            def: 'Cramping uterine contractions felt for a few days after birth as the uterus involutes, often stronger during breastfeeding.',
            matters: 'They are normal and reassuring (the uterus is contracting), but severe pain may need simple analgesia.',
            mis: { wrong: 'Afterpains are a sign of infection.', right: 'They are a normal part of involution, especially in multiparous women and during feeds.' }
        },
        postpartum_blues: {
            unit: 5, term: 'Postpartum Blues', ipa: '/poʊstˈpɑːtəm bluːz/',
            keys: ['postpartum blues', 'postnatal blues', 'baby blues', 'psychological complication'],
            def: 'A brief, common period of tearfulness and mood swings in the first days after birth that resolves on its own.',
            matters: 'It must be told apart from postnatal depression and psychosis, which are serious and need treatment.',
            mis: { wrong: 'Postpartum blues and postnatal depression are the same thing.', right: 'Blues are mild and self-limiting; depression is persistent, severe and needs treatment.' }
        },
        mastitis: {
            unit: 5, term: 'Mastitis', ipa: '/mæˈstaɪtɪs/',
            keys: ['mastitis', 'breast problem', 'breast engorgement'],
            def: 'Painful inflammation of breast tissue during lactation, often with infection.',
            matters: 'Continued breastfeeding plus antibiotics usually resolves it; untreated mastitis can form a breast abscess.',
            mis: { wrong: 'Breastfeeding must stop during mastitis.', right: 'Continued feeding or expressing actually helps clear the blocked, infected duct.' },
            quiz: { q: 'During mastitis, breastfeeding from the affected breast should usually be:', opts: [{ t: 'Continued', correct: true }, { t: 'Stopped completely', correct: false }] }
        },

        /* ── Unit VI — The newborn ──────────────────────────────── */
        normal_newborn: {
            unit: 6, term: 'Normal Newborn', ipa: '/ˈnɔːməl ˈnjuːbɔːn/',
            keys: ['normal newborn', 'essential care of newborn', 'essential newborn care', 'care of newborn'],
            def: 'A baby born at term (37–42 weeks) with normal weight and vital signs who adapts well to life outside the womb.',
            matters: 'Essential newborn care — warmth, early breastfeeding, cord and eye care — prevents most early newborn deaths.',
            mis: { wrong: 'A newborn should be bathed immediately after birth.', right: 'Bathing is delayed; the priority is drying, warmth and skin-to-skin contact.' },
            quiz: { q: 'The single most important first step of essential newborn care is to:', opts: [{ t: 'Dry and keep the baby warm', correct: true }, { t: 'Give an immediate bath', correct: false }] }
        },
        apgar: {
            unit: 6, term: 'APGAR Score', ipa: '/ˈæpɡɑːr skɔː/',
            keys: ['apgar', 'apgar score'],
            def: 'A score (0–10) assessing a newborn at 1 and 5 minutes using Appearance, Pulse, Grimace, Activity and Respiration.',
            matters: 'It gives a quick, standard picture of how well a baby is adapting and guides the need for resuscitation.',
            mis: { wrong: 'A low 1-minute APGAR always means permanent brain damage.', right: 'Many babies with a low 1-minute score recover fully by 5 minutes with simple support.' },
            quiz: { q: 'The APGAR score is routinely assessed at 1 minute and at:', opts: [{ t: '5 minutes', correct: true }, { t: '30 minutes', correct: false }] }
        },
        caput: {
            unit: 6, term: 'Caput Succedaneum', ipa: '/ˈkæpʊt ˌsʌksɪˈdeɪniəm/',
            keys: ['caput succedaneum', 'caput'],
            def: 'A soft, diffuse swelling of the newborn\'s scalp from pressure during birth that crosses suture lines.',
            matters: 'It is harmless and resolves in a few days; the midwife reassures parents and distinguishes it from cephalhaematoma.',
            mis: { wrong: 'Caput succedaneum is the same as cephalhaematoma.', right: 'Caput crosses suture lines and fades fast; a cephalhaematoma does not cross sutures and lasts weeks.' },
            quiz: { q: 'A scalp swelling that CROSSES the suture lines in a newborn is a:', opts: [{ t: 'Caput succedaneum', correct: true }, { t: 'Cephalhaematoma', correct: false }] }
        },
        cephalhaematoma: {
            unit: 6, term: 'Cephalhaematoma', ipa: '/ˌsɛfəlhiːməˈtoʊmə/',
            keys: ['cephalhaematoma', 'cephalohematoma'],
            def: 'A collection of blood under the scalp bone covering of a newborn that does not cross suture lines.',
            matters: 'It resolves over weeks but can worsen jaundice, so the baby needs monitoring.',
            mis: { wrong: 'A cephalhaematoma crosses the suture lines.', right: 'It is bounded by sutures because the bleed is under the periosteum of one bone.' }
        },
        fontanelle: {
            unit: 6, term: 'Fontanelle', ipa: '/ˌfɒntəˈnɛl/',
            keys: ['fontanel', 'fontanelle', 'fontanels'],
            def: 'A soft "gap" between the skull bones of a baby; the anterior fontanelle closes by about 18 months, the posterior by 6–8 weeks.',
            matters: 'A sunken fontanelle suggests dehydration and a bulging one raised pressure — quick clinical clues.',
            mis: { wrong: 'Touching the fontanelle will hurt the baby\'s brain.', right: 'Gentle handling is safe; a tough membrane protects the brain beneath.' },
            quiz: { q: 'A sunken anterior fontanelle in a baby most suggests:', opts: [{ t: 'Dehydration', correct: true }, { t: 'Overhydration', correct: false }] }
        },
        bfhi: {
            unit: 6, term: 'Baby Friendly Hospital Initiative', ipa: '/ˈbeɪbi ˈfrɛndli/',
            keys: ['bfhi', 'baby friendly'],
            def: 'A WHO/UNICEF programme promoting breastfeeding through "Ten Steps", including early initiation and rooming-in.',
            matters: 'BFHI practices raise breastfeeding rates, protecting newborns from infection and improving bonding.',
            mis: { wrong: 'BFHI encourages giving formula to "top up" newborns.', right: 'It discourages routine formula and promotes exclusive breastfeeding from birth.' }
        },
        neonate: {
            unit: 6, term: 'Neonate', ipa: '/ˈniːoʊneɪt/',
            keys: ['neonate', 'neonatal'],
            def: 'A newborn baby in the first 28 days of life.',
            matters: 'This is the most vulnerable period of life; warmth, feeding and infection prevention are the pillars of care.',
            mis: { wrong: 'The neonatal period covers the whole first year.', right: 'It covers only the first 28 days of life.' },
            quiz: { q: 'The neonatal period is defined as the first:', opts: [{ t: '28 days of life', correct: true }, { t: '12 months of life', correct: false }] }
        },
        asphyxia: {
            unit: 6, term: 'Birth Asphyxia', ipa: '/bɜːθ æsˈfɪksiə/',
            keys: ['asphyxia', 'resuscitation', 'birth asphyxia'],
            def: 'A condition where the newborn fails to start or sustain breathing, leading to low oxygen.',
            matters: 'Prompt resuscitation in the "golden minute" after birth prevents brain damage and death.',
            mis: { wrong: 'A baby who is blue but has a heartbeat needs no help.', right: 'It needs immediate resuscitation — drying, warmth and ventilation in the first minute.' },
            quiz: { q: 'The crucial first minute after birth for resuscitation is called the:', opts: [{ t: 'Golden minute', correct: true }, { t: 'Silent minute', correct: false }] }
        },
        jaundice: {
            unit: 6, term: 'Neonatal Jaundice', ipa: '/ˈdʒɔːndɪs/',
            keys: ['jaundice', 'bilirubin', 'kernicterus'],
            def: 'Yellowing of a newborn\'s skin and eyes due to a high level of bilirubin in the blood.',
            matters: 'Mild physiological jaundice is common, but very high bilirubin can damage the brain (kernicterus) and needs phototherapy.',
            mis: { wrong: 'All newborn jaundice is dangerous.', right: 'Physiological jaundice after day 2 is usually harmless; jaundice on day 1 is the worrying type.' },
            quiz: { q: 'Newborn jaundice appearing within the first 24 hours of life is:', opts: [{ t: 'Pathological (abnormal)', correct: true }, { t: 'Always physiological', correct: false }] }
        },

        /* ── Unit VII — Family planning ─────────────────────────── */
        contraception: {
            unit: 7, term: 'Contraception', ipa: '/ˌkɒntrəˈsɛpʃən/',
            keys: ['contraception', 'contraceptive', 'family planning'],
            def: 'The deliberate use of methods to prevent pregnancy; methods are temporary (spacing) or permanent.',
            matters: 'Good contraceptive counselling lets couples space and limit births, improving maternal and child health.',
            mis: { wrong: 'All contraceptive methods are permanent.', right: 'Most are temporary and reversible; only sterilisation is permanent.' },
            quiz: { q: 'Which contraceptive method is permanent (irreversible)?', opts: [{ t: 'Tubectomy / vasectomy', correct: true }, { t: 'Oral contraceptive pills', correct: false }] }
        },
        iucd: {
            unit: 7, term: 'Intrauterine Device (IUCD)', ipa: '/ˌɪntrəˈjuːərɪn/',
            keys: ['iucd', 'iud', 'intrauterine', 'copper-t', 'copper t', 'copper-t'],
            def: 'A small device placed inside the uterus to provide long-acting reversible contraception.',
            matters: 'It offers years of protection without daily effort, making it a key family-planning option.',
            mis: { wrong: 'An IUCD causes permanent infertility.', right: 'It is fully reversible — fertility returns after removal.' },
            quiz: { q: 'A copper IUCD (Copper-T) is best described as a contraceptive that is:', opts: [{ t: 'Long-acting and reversible', correct: true }, { t: 'Permanent', correct: false }] }
        },
        tubectomy: {
            unit: 7, term: 'Tubectomy', ipa: '/tjuːˈbɛktəmi/',
            keys: ['tubectomy', 'sterilization', 'sterilisation', 'tubal ligation'],
            def: 'A permanent female sterilisation method in which the fallopian tubes are cut or blocked.',
            matters: 'It suits couples who have completed their family; counselling about its permanence is essential.',
            mis: { wrong: 'Tubectomy can be easily reversed whenever wanted.', right: 'It is meant to be permanent; reversal is difficult and often unsuccessful.' }
        },
        emergency_contraception: {
            unit: 7, term: 'Emergency Contraception', ipa: '/ɪˈmɜːdʒənsi/',
            keys: ['emergency contraceptive', 'emergency contraception', 'morning after'],
            def: 'Methods used after unprotected sex to prevent pregnancy, such as emergency pills or a copper IUCD.',
            matters: 'It is most effective the sooner it is used, ideally within 72 hours, so prompt counselling matters.',
            mis: { wrong: 'Emergency pills cause abortion.', right: 'They mainly prevent or delay ovulation; they do not end an established pregnancy.' },
            quiz: { q: 'Emergency contraceptive pills work best when taken within:', opts: [{ t: '72 hours of intercourse', correct: true }, { t: '2 weeks of intercourse', correct: false }] }
        },
        preconception: {
            unit: 7, term: 'Preconception Care', ipa: '/ˌpriːkənˈsɛpʃən/',
            keys: ['preconception', 'planned parenthood', 'preconceptional'],
            def: 'Care given before pregnancy to optimise health — folic acid, vaccination, control of disease and counselling.',
            matters: 'Many birth defects and complications are prevented before conception, not during pregnancy.',
            mis: { wrong: 'Care can only help once a woman is already pregnant.', right: 'Preconception care (e.g. folic acid) prevents problems before pregnancy begins.' }
        },

        /* ── OBG-II — High-risk, abnormal labour, gynaec ────────── */
        abortion: {
            unit: 8, term: 'Abortion', ipa: '/əˈbɔːʃən/',
            keys: ['abortion', 'threatened abortion', 'septic abortion', 'miscarriage'],
            def: 'The ending of a pregnancy before viability (before 20–24 weeks or fetal weight < 500 g), spontaneous or induced.',
            matters: 'Types range from threatened to septic abortion; septic abortion is life-threatening and needs urgent care.',
            mis: { wrong: 'Threatened abortion always ends in loss of the pregnancy.', right: 'With rest and care many threatened abortions continue to a healthy birth.' },
            quiz: { q: 'Bleeding in early pregnancy with a CLOSED cervix and a live fetus is:', opts: [{ t: 'Threatened abortion', correct: true }, { t: 'Inevitable abortion', correct: false }] }
        },
        mtp: {
            unit: 8, term: 'Medical Termination of Pregnancy', ipa: '/ˈmɛdɪkəl ˌtɜːmɪˈneɪʃən/',
            keys: ['mtp', 'medical termination', 'termination of pregnancy'],
            def: 'The legal ending of a pregnancy within limits set by the MTP Act, by medical or surgical methods.',
            matters: 'Safe, legal MTP prevents the deaths and injuries caused by unsafe, illegal abortion.',
            mis: { wrong: 'MTP can be done at any stage of pregnancy on request.', right: 'It is allowed only within the gestational limits and conditions of the MTP Act.' }
        },
        hydatidiform_mole: {
            unit: 8, term: 'Hydatidiform Mole', ipa: '/ˌhaɪdəˈtɪdɪfɔːm moʊl/',
            keys: ['hydatidiform mole', 'vesicular mole', 'molar pregnancy', 'hyadatidiform'],
            def: 'An abnormal pregnancy in which the placenta develops into a mass of fluid-filled grape-like vesicles, with no normal fetus.',
            matters: 'It causes very high hCG, severe vomiting and bleeding, and can become cancer, so follow-up hCG is vital.',
            mis: { wrong: 'A molar pregnancy contains a normal baby.', right: 'There is no normal fetus — only abnormal placental tissue.' },
            quiz: { q: 'A uterus larger than dates with grape-like vesicles passed per vagina suggests:', opts: [{ t: 'Hydatidiform mole', correct: true }, { t: 'Normal pregnancy', correct: false }] }
        },
        ectopic: {
            unit: 8, term: 'Ectopic Pregnancy', ipa: '/ɛkˈtɒpɪk ˈprɛɡnənsi/',
            keys: ['ectopic'],
            def: 'A pregnancy that implants outside the uterine cavity, most often in a fallopian tube.',
            matters: 'A ruptured ectopic causes severe internal bleeding and shock — a true surgical emergency.',
            mis: { wrong: 'An ectopic pregnancy can grow safely to term.', right: 'It cannot — it must be treated, as it can rupture and cause fatal bleeding.' },
            quiz: { q: 'The most common site of an ectopic pregnancy is the:', opts: [{ t: 'Fallopian tube', correct: true }, { t: 'Ovary', correct: false }] }
        },
        placenta_praevia: {
            unit: 9, term: 'Placenta Praevia', ipa: '/pləˈsɛntə ˈpriːviə/',
            keys: ['placenta praevia', 'placenta previa'],
            def: 'A placenta implanted in the lower uterus, partly or wholly covering the cervix (internal os).',
            matters: 'It causes painless bright-red bleeding late in pregnancy; a vaginal exam can trigger torrential bleeding and must be avoided.',
            mis: { wrong: 'Bleeding from placenta praevia is painful.', right: 'It is classically painless, bright-red and recurrent — unlike painful abruptio placentae.' },
            quiz: { q: 'Painless, bright-red bleeding in the third trimester suggests:', opts: [{ t: 'Placenta praevia', correct: true }, { t: 'Abruptio placentae', correct: false }] }
        },
        abruptio: {
            unit: 9, term: 'Abruptio Placentae', ipa: '/əˈbrʌpʃioʊ pləˈsɛnti/',
            keys: ['abruptio', 'abruption', 'accidental haemorrhage'],
            def: 'Premature separation of a normally situated placenta from the uterine wall after 20 weeks.',
            matters: 'It causes painful bleeding and can rapidly threaten mother and baby; it is an obstetric emergency.',
            mis: { wrong: 'All the blood lost in abruption is visible externally.', right: 'Bleeding may be concealed behind the placenta, so blood loss is often far greater than what is seen.' },
            quiz: { q: 'Painful uterine bleeding with a tense, tender uterus suggests:', opts: [{ t: 'Abruptio placentae', correct: true }, { t: 'Placenta praevia', correct: false }] }
        },
        pph: {
            unit: 9, term: 'Post-partum Haemorrhage (PPH)', ipa: '/poʊst ˈpɑːtəm ˈhɛmərɪdʒ/',
            keys: ['post-partum haemorrhage', 'postpartum haemorrhage', 'pph', 'haemorrhage', 'hemorrhage'],
            def: 'Blood loss over 500 mL after vaginal delivery (or 1000 mL after caesarean) within 24 hours of birth.',
            matters: 'PPH is the leading direct cause of maternal death; fast recognition and active third-stage management save lives.',
            mis: { wrong: 'Only a torn birth canal causes PPH.', right: 'The commonest cause is an atonic uterus — remember the "4 Ts": Tone, Tissue, Trauma, Thrombin.' },
            quiz: { q: 'The single most common cause of primary post-partum haemorrhage is:', opts: [{ t: 'Atonic uterus', correct: true }, { t: 'Cervical tear', correct: false }] }
        },
        eclampsia: {
            unit: 9, term: 'Eclampsia', ipa: '/ɪˈklæmpsiə/',
            keys: ['eclampsia'],
            def: 'The onset of convulsions in a woman with pre-eclampsia, not caused by any other brain condition.',
            matters: 'Eclampsia is a life-threatening emergency; protect the airway, prevent injury and give magnesium sulphate.',
            mis: { wrong: 'High blood pressure alone means eclampsia.', right: 'Hypertension with proteinuria is pre-eclampsia; it becomes eclampsia only once convulsions occur.' },
            quiz: { q: 'The drug of choice to control and prevent eclamptic convulsions is:', opts: [{ t: 'Magnesium sulphate', correct: true }, { t: 'Calcium gluconate', correct: false }] }
        },
        pre_eclampsia: {
            unit: 9, term: 'Pre-eclampsia', ipa: '/ˌpriː ɪˈklæmpsiə/',
            keys: ['pre-eclampsia', 'preeclampsia', 'pregnancy induced hypertension', 'pih'],
            def: 'A pregnancy disorder after 20 weeks marked by high blood pressure and protein in the urine.',
            matters: 'It can progress to eclampsia and organ damage; regular BP and urine checks catch it early.',
            mis: { wrong: 'Swelling of the feet always means pre-eclampsia.', right: 'Mild ankle oedema is common; the key signs are raised BP plus proteinuria.' },
            quiz: { q: 'Pre-eclampsia is diagnosed by high blood pressure plus:', opts: [{ t: 'Protein in the urine', correct: true }, { t: 'Sugar in the urine', correct: false }] }
        },
        anaemia: {
            unit: 9, term: 'Anaemia in Pregnancy', ipa: '/əˈniːmiə/',
            keys: ['anaemia', 'anemia'],
            def: 'A haemoglobin level below 11 g/dL during pregnancy, most often due to iron deficiency.',
            matters: 'Anaemia raises the risk of low birth weight, preterm birth and poor tolerance of blood loss at delivery.',
            mis: { wrong: 'Anaemia in pregnancy is harmless and needs no treatment.', right: 'It is a major indirect cause of maternal death and needs iron-folic acid and diet advice.' },
            quiz: { q: 'In pregnancy, anaemia is defined as a haemoglobin below:', opts: [{ t: '11 g/dL', correct: true }, { t: '13 g/dL', correct: false }] }
        },
        gestational_diabetes: {
            unit: 9, term: 'Gestational Diabetes', ipa: '/dʒɛˈsteɪʃənəl ˌdaɪəˈbiːtiːz/',
            keys: ['gestational diabetes', 'gdm'],
            def: 'Glucose intolerance first recognised during pregnancy, usually resolving after delivery.',
            matters: 'It increases the risk of a large baby, birth injury and later type-2 diabetes, so screening and control matter.',
            mis: { wrong: 'Gestational diabetes always continues for life.', right: 'It usually resolves after birth, though it raises future diabetes risk.' },
            quiz: { q: 'A common complication of poorly controlled gestational diabetes is:', opts: [{ t: 'A large baby (macrosomia)', correct: true }, { t: 'A very small baby', correct: false }] }
        },
        breech: {
            unit: 10, term: 'Breech Presentation', ipa: '/briːtʃ/',
            keys: ['breech'],
            def: 'When the baby\'s buttocks or feet, rather than the head, are positioned to be born first.',
            matters: 'It raises the risk of cord prolapse and difficult birth, often guiding a decision toward caesarean delivery.',
            mis: { wrong: 'A breech baby can never be turned.', right: 'External cephalic version (ECV) can sometimes turn the baby to a head-down position.' },
            quiz: { q: 'In a breech presentation, the part that presents first is the:', opts: [{ t: 'Buttocks or feet', correct: true }, { t: 'Head', correct: false }] }
        },
        caesarean: {
            unit: 10, term: 'Caesarean Section', ipa: '/sɪˈzɛəriən ˈsɛkʃən/',
            keys: ['caesarean', 'cesarean', 'lscs', 'c-section'],
            def: 'Delivery of the baby through a surgical incision in the mother\'s abdomen and uterus.',
            matters: 'It is life-saving when vaginal birth is unsafe, but carries surgical risks, so it is done on clear indication.',
            mis: { wrong: 'A caesarean is always safer than a vaginal birth.', right: 'It is major surgery with its own risks; it is preferred only when indicated.' },
            quiz: { q: 'A caesarean section delivers the baby through an incision in the:', opts: [{ t: 'Abdomen and uterus', correct: true }, { t: 'Vagina', correct: false }] }
        },
        oxytocin: {
            unit: 4, term: 'Oxytocin', ipa: '/ˌɒksɪˈtoʊsɪn/',
            keys: ['oxytocin', 'uterotonic', 'syntocinon'],
            def: 'A hormone (and drug) that makes the uterus contract; used to induce or augment labour and to prevent PPH.',
            matters: 'Given after birth it sharply reduces post-partum haemorrhage as part of active third-stage management.',
            mis: { wrong: 'Oxytocin is given to relax the uterus.', right: 'It contracts the uterus — relaxation is done with tocolytic drugs instead.' },
            quiz: { q: 'Oxytocin acts on the uterus to cause:', opts: [{ t: 'Contraction', correct: true }, { t: 'Relaxation', correct: false }] }
        }
    };

    /* ---- 2. Build a flat list + match index ------------------------ */
    var ALL = Object.keys(TERMS).map(function (id) {
        var t = TERMS[id]; t.id = id; return t;
    });
    // Match keys sorted longest-first so specific phrases win over generic.
    var MATCHERS = [];
    ALL.forEach(function (t) {
        (t.keys || []).forEach(function (k) { MATCHERS.push({ key: k, term: t }); });
    });
    MATCHERS.sort(function (a, b) { return b.key.length - a.key.length; });

    var UNIT_FALLBACK = {
        1: 'maternal_mortality', 2: 'placenta', 3: 'antenatal_care',
        4: 'normal_labour', 5: 'puerperium', 6: 'apgar', 7: 'contraception',
        8: 'abortion', 9: 'pph', 10: 'breech', 11: 'contraception'
    };

    /* ---- 3. Deterministic helpers (stable per question) ----------- */
    function seedFrom(str) {
        var h = 2166136261;
        for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
        return h;
    }
    function rng(seed) { // mulberry32
        return function () {
            seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
            var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }
    function shuffle(arr, rand) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(rand() * (i + 1));
            var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    /* ---- 4. Pick the most relevant terms for this question --------
       Terms whose key appears in the QUESTION are the topic and rank
       first (most specific key wins); terms found only in the ANSWER
       body follow as supporting context (used as quiz distractors). -- */
    function pickTerms(q) {
        var qText = (q.question || '').toLowerCase().replace(/<[^>]*>/g, ' ');
        var aText = (q.answer || '').toLowerCase().replace(/<[^>]*>/g, ' ');
        var inQ = [], inA = [], seen = {};
        MATCHERS.forEach(function (m) {
            if (seen[m.term.id]) return;
            if (qText.indexOf(m.key) !== -1) { seen[m.term.id] = 1; inQ.push(m.term); }
        });
        MATCHERS.forEach(function (m) {
            if (seen[m.term.id]) return;
            if (aText.indexOf(m.key) !== -1) { seen[m.term.id] = 1; inA.push(m.term); }
        });
        var found = inQ.concat(inA);
        if (!found.length) {
            var fb = TERMS[UNIT_FALLBACK[q.unit] || 'maternal_mortality'];
            if (fb) found.push(fb);
        }
        return found;
    }

    /* ---- 5. Context-aware quiz ------------------------------------
       Priority:
       (a) ≥2 known terms detected in THIS answer → ask the learner to
           pick which term matches the primary term's description, using
           the OTHER detected terms as distractors (fully context-specific).
       (b) the primary term has a curated fact quiz tied to the answer.
       (c) build a description-match quiz with sibling unit terms.
       Selection is deterministic per question. -------------------- */
    function buildQuiz(q, terms) {
        var rand = rng(seedFrom(q.question || q.answer || 'x'));
        var primary = terms[0];

        // (a) multiple detected terms → distinguish them
        var others = terms.slice(1).filter(function (t) { return t.term !== primary.term; });
        if (others.length >= 1) {
            var picks = shuffle(others, rand).slice(0, 2);
            var opts = [{ t: primary.term, correct: true }].concat(
                picks.map(function (d) { return { t: d.term, correct: false }; }));
            return { q: 'Based on this answer, which term matches: \u201C' + primary.def + '\u201D', opts: shuffle(opts, rand) };
        }

        // (b) curated fact quiz on the detected term
        if (primary.quiz) {
            return { q: primary.quiz.q, opts: shuffle(primary.quiz.opts.slice(), rand) };
        }

        // (c) description-match with sibling unit distractors
        var siblings = ALL.filter(function (t) { return t.unit === primary.unit && t.id !== primary.id; });
        if (siblings.length >= 1) {
            var sib = shuffle(siblings, rand).slice(0, 2);
            var o = [{ t: primary.term, correct: true }].concat(
                sib.map(function (d) { return { t: d.term, correct: false }; }));
            return { q: 'Based on this answer, which term matches: \u201C' + primary.def + '\u201D', opts: shuffle(o, rand) };
        }
        return null;
    }

    /* ---- 6. Builders for each module ----------------------------- */
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    var seq = 0;

    function vocabModule(t, hid) {
        return '' +
        '<section class="la-card la-vocab" role="group" aria-labelledby="' + hid + '">' +
            '<h3 class="la-head" id="' + hid + '"><span class="material-symbols-outlined" aria-hidden="true">menu_book</span>Build your vocab</h3>' +
            '<p class="la-term">' + esc(t.term) + '</p>' +
            '<div class="la-ipa-row">' +
                '<span class="la-ipa">' + esc(t.ipa) + '</span>' +
                '<button class="la-speak" type="button" data-speak="' + esc(t.term) + '" aria-label="Hear how to pronounce ' + esc(t.term) + '">' +
                    '<span class="material-symbols-outlined" aria-hidden="true">volume_up</span></button>' +
            '</div>' +
            '<p class="la-text">' + esc(t.def) + '</p>' +
        '</section>';
    }

    function mattersModule(t, hid) {
        return '' +
        '<section class="la-card la-matters" role="group" aria-labelledby="' + hid + '">' +
            '<h3 class="la-head" id="' + hid + '"><span class="material-symbols-outlined" aria-hidden="true">lightbulb</span>Why it matters</h3>' +
            '<p class="la-subtitle">' + esc(t.term) + '</p>' +
            '<p class="la-text">' + esc(t.matters) + '</p>' +
        '</section>';
    }

    function thinkModule(t, hid) {
        var prompt = 'How would an alert nurse-midwife recognise <strong>' + esc(t.term) +
            '</strong> early in a real patient, and what would be your first action?';
        return '' +
        '<section class="la-card la-think" role="group" aria-labelledby="' + hid + '">' +
            '<h3 class="la-head" id="' + hid + '"><span class="material-symbols-outlined" aria-hidden="true">psychology</span>Stop &amp; think</h3>' +
            '<p class="la-text">We\u2019ve just covered <strong>' + esc(t.term) + '</strong>. ' +
                'Pause before reading on and connect it to bedside care.</p>' +
            '<p class="la-think-q">' + prompt + '</p>' +
        '</section>';
    }

    function quizModule(quiz, hid) {
        if (!quiz) return '';
        var id = 'la-quiz-' + (++seq);
        var qid = id + '-q';
        var opts = quiz.opts.map(function (o) {
            return '<button class="la-option" type="button" role="radio" aria-checked="false" ' +
                'data-correct="' + (o.correct ? '1' : '0') + '">' +
                '<span class="la-option-text">' + esc(o.t) + '</span>' +
                '<span class="material-symbols-outlined la-option-mark" aria-hidden="true"></span></button>';
        }).join('');
        return '' +
        '<section class="la-card la-quiz" id="' + id + '" role="group" aria-labelledby="' + hid + '">' +
            '<h3 class="la-head la-head-quiz" id="' + hid + '"><span class="material-symbols-outlined" aria-hidden="true">quiz</span>Test your knowledge</h3>' +
            '<div class="la-quiz-grid">' +
                '<p class="la-quiz-q" id="' + qid + '">' + esc(quiz.q) + '</p>' +
                '<div class="la-options" role="radiogroup" aria-labelledby="' + qid + '">' + opts + '</div>' +
            '</div>' +
            '<p class="la-quiz-feedback" role="status" aria-live="polite" hidden></p>' +
        '</section>';
    }

    function misconceptionModule(t, hid) {
        return '' +
        '<section class="la-card la-mis" role="group" aria-labelledby="' + hid + '">' +
            '<h3 class="la-head la-head-mis" id="' + hid + '"><span class="material-symbols-outlined" aria-hidden="true">error</span>Common misconception</h3>' +
            '<div class="la-mis-row la-mis-wrong">' +
                '<span class="material-symbols-outlined la-mis-icon" aria-hidden="true">cancel</span>' +
                '<p><span class="sr-only">Misconception: </span>' + esc(t.mis.wrong) + '</p>' +
            '</div>' +
            '<div class="la-mis-row la-mis-right">' +
                '<span class="material-symbols-outlined la-mis-icon" aria-hidden="true">check_circle</span>' +
                '<p><span class="sr-only">Correct: </span>' + esc(t.mis.right) + '</p>' +
            '</div>' +
        '</section>';
    }

    /* ---- 7. Assemble + inject ------------------------------------ */
    function buildPanel(q) {
        var terms = pickTerms(q);
        var primary = terms[0];
        var quiz = buildQuiz(q, terms);
        var b = 'la-h-' + (++seq);

        var modules = [
            vocabModule(primary, b + 'v'),
            mattersModule(primary, b + 'm'),
            thinkModule(primary, b + 't'),
            quizModule(quiz, b + 'q'),
            misconceptionModule(primary, b + 'x')
        ].join('');

        return '' +
        '<div class="learn-about" role="region" aria-label="Learn About: interactive study modules">' +
            '<div class="la-banner">' +
                '<span class="material-symbols-outlined" aria-hidden="true">school</span>' +
                '<div>' +
                    '<span class="la-banner-kicker">LEARN ABOUT</span>' +
                    '<span class="la-banner-title">Interactive study modules</span>' +
                '</div>' +
            '</div>' +
            modules +
        '</div>';
    }

    function wire(root) {
        // Pronunciation
        root.querySelectorAll('.la-speak').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var text = btn.getAttribute('data-speak');
                if ('speechSynthesis' in window && text) {
                    window.speechSynthesis.cancel();
                    var u = new SpeechSynthesisUtterance(text);
                    u.rate = 0.85; u.pitch = 1;
                    window.speechSynthesis.speak(u);
                } else if (window.toast) {
                    window.toast('Pronunciation not supported on this device', 'warn');
                }
            });
        });

        // Interactive, accessible quiz
        root.querySelectorAll('.la-quiz').forEach(function (quiz) {
            var feedback = quiz.querySelector('.la-quiz-feedback');
            var options = quiz.querySelectorAll('.la-option');

            function answer(opt) {
                if (quiz.classList.contains('answered')) return;
                quiz.classList.add('answered');
                var correct = opt.getAttribute('data-correct') === '1';
                options.forEach(function (o) {
                    var isC = o.getAttribute('data-correct') === '1';
                    o.classList.add(isC ? 'is-correct' : 'is-wrong-dim');
                    o.setAttribute('aria-checked', o === opt ? 'true' : 'false');
                    o.disabled = true;
                    o.tabIndex = -1;
                    var mark = o.querySelector('.la-option-mark');
                    if (mark) mark.textContent = isC ? 'check_circle' : '';
                    if (isC) o.setAttribute('aria-label', o.querySelector('.la-option-text').textContent + ' — correct answer');
                });
                if (!correct) {
                    opt.classList.add('is-chosen-wrong');
                    opt.setAttribute('aria-label', opt.querySelector('.la-option-text').textContent + ' — your answer, incorrect');
                }
                if (feedback) {
                    feedback.hidden = false;
                    feedback.textContent = correct
                        ? 'Correct! Nicely reasoned.'
                        : 'Not quite — the highlighted option is correct. Review it above.';
                    feedback.classList.toggle('ok', correct);
                    feedback.classList.toggle('no', !correct);
                }
                if (window.toast) window.toast(correct ? 'Correct answer' : 'Review this one', correct ? 'success' : 'info');
            }

            options.forEach(function (opt, idx) {
                opt.addEventListener('click', function () { answer(opt); });
                // Roving arrow-key navigation within the radiogroup
                opt.addEventListener('keydown', function (e) {
                    if (quiz.classList.contains('answered')) return;
                    var next = null;
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = options[(idx + 1) % options.length];
                    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = options[(idx - 1 + options.length) % options.length];
                    if (next) { e.preventDefault(); next.focus(); }
                });
            });
        });
    }

    window.injectLearnAbout = function (container, q) {
        if (!container || !q) return;
        // never duplicate: remove any previously injected panel first
        var existing = container.querySelector('.learn-about');
        if (existing) existing.remove();
        container.insertAdjacentHTML('beforeend', buildPanel(q));
        var root = container.querySelector('.learn-about');
        if (root) wire(root);
    };
})();
