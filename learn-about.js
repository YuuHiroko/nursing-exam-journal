/* ════════════════════════════════════════════════════════════════
   LEARN ABOUT — Interactive study modules (Google "Learn About" style)
   Injected into EVERY answer. Renders five Material Design 3 modules:
     • Build your vocab        (term + IPA + speak + definition)
     • Why it matters          (clinical significance)
     • Stop & think            (reflective prompt)
     • Test your knowledge     (interactive single-answer quiz)
     • Common misconception    (wrong ✗  vs  right ✓)

   Content is generated from a curated midwifery / OBG term bank so the
   modules are relevant to whatever question is open. Exposes
   window.injectLearnAbout(container, question) — called from openModal().
   ════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    /* ---- 1. Curated term bank --------------------------------------
       key (lowercase, matched against question + answer text) → entry.
       Each entry powers the vocab, why-it-matters, misconception and
       quiz modules. Keep definitions exam-simple. ------------------- */
    var TERMS = {
        'maternal mortality': {
            term: 'Maternal Mortality', ipa: '/məˈtɜːnəl mɔːˈtælɪti/',
            def: 'The death of a woman during pregnancy, childbirth, or within 42 days of delivery, from any pregnancy-related cause.',
            matters: 'It is a key indicator of a country\'s health system. Most maternal deaths are preventable, so recognising danger signs early is a core midwifery responsibility.',
            mis: { wrong: 'Maternal mortality includes any death of a pregnant woman, including accidents.', right: 'It counts only deaths from pregnancy-related causes — accidental or incidental deaths are excluded.' },
            quiz: { q: 'A woman dies of post-partum haemorrhage on day 3 after delivery. This is classified as:', opts: [{ t: 'A maternal death', correct: true }, { t: 'An incidental death', correct: false }] }
        },
        'haemorrhage': {
            term: 'Post-partum Haemorrhage (PPH)', ipa: '/poʊst ˈpɑːtəm ˈhɛmərɪdʒ/',
            def: 'Blood loss of more than 500 mL after vaginal delivery (or 1000 mL after caesarean) within 24 hours of birth.',
            matters: 'PPH is the leading direct cause of maternal death. Fast recognition and active management of the third stage of labour save lives.',
            mis: { wrong: 'Only a torn birth canal causes PPH.', right: 'The commonest cause is an atonic uterus (a uterus that fails to contract) — the "4 Ts" are Tone, Tissue, Trauma and Thrombin.' },
            quiz: { q: 'The single most common cause of primary post-partum haemorrhage is:', opts: [{ t: 'Atonic uterus', correct: true }, { t: 'Cervical tear', correct: false }] }
        },
        'pph': { alias: 'haemorrhage' },
        'eclampsia': {
            term: 'Eclampsia', ipa: '/ɪˈklæmpsiə/',
            def: 'The onset of convulsions (fits) in a woman with pre-eclampsia, not caused by any other brain condition.',
            matters: 'Eclampsia is a life-threatening obstetric emergency. The midwife must protect the airway, prevent injury and prepare magnesium sulphate.',
            mis: { wrong: 'High blood pressure alone means eclampsia.', right: 'Hypertension with protein in urine is pre-eclampsia; it becomes eclampsia only once convulsions occur.' },
            quiz: { q: 'The drug of choice to control and prevent eclamptic convulsions is:', opts: [{ t: 'Magnesium sulphate', correct: true }, { t: 'Calcium gluconate', correct: false }] }
        },
        'pre-eclampsia': {
            term: 'Pre-eclampsia', ipa: '/ˌpriː ɪˈklæmpsiə/',
            def: 'A pregnancy disorder after 20 weeks marked by high blood pressure and protein in the urine (proteinuria).',
            matters: 'It can progress to eclampsia and organ damage. Regular blood-pressure and urine checks in antenatal care catch it early.',
            mis: { wrong: 'Swelling of the feet always means pre-eclampsia.', right: 'Mild ankle oedema is common in normal pregnancy; the key signs are raised BP plus proteinuria.' },
            quiz: { q: 'Pre-eclampsia is diagnosed by high blood pressure plus:', opts: [{ t: 'Protein in the urine', correct: true }, { t: 'Sugar in the urine', correct: false }] }
        },
        'placenta praevia': {
            term: 'Placenta Praevia', ipa: '/pləˈsɛntə ˈpriːviə/',
            def: 'A placenta implanted in the lower part of the uterus, partly or completely covering the cervix (internal os).',
            matters: 'It causes painless bright-red bleeding in late pregnancy. A vaginal examination can trigger torrential bleeding, so it must be avoided.',
            mis: { wrong: 'Bleeding from placenta praevia is painful.', right: 'It is classically painless, bright-red and recurrent — unlike the painful bleeding of abruptio placentae.' },
            quiz: { q: 'Painless, bright-red bleeding in the third trimester suggests:', opts: [{ t: 'Placenta praevia', correct: true }, { t: 'Abruptio placentae', correct: false }] }
        },
        'abruptio': {
            term: 'Abruptio Placentae', ipa: '/əˈbrʌpʃioʊ pləˈsɛnti/',
            def: 'Premature separation of a normally situated placenta from the uterine wall after 20 weeks of pregnancy.',
            matters: 'It causes painful bleeding and can rapidly threaten both mother and baby; it is an obstetric emergency needing urgent delivery.',
            mis: { wrong: 'All the blood lost in abruption is visible externally.', right: 'Bleeding may be concealed behind the placenta, so blood loss is often far greater than what is seen.' },
            quiz: { q: 'Painful uterine bleeding with a tense, tender uterus suggests:', opts: [{ t: 'Abruptio placentae', correct: true }, { t: 'Placenta praevia', correct: false }] }
        },
        'anaemia': {
            term: 'Anaemia in Pregnancy', ipa: '/əˈniːmiə/',
            def: 'A haemoglobin level below 11 g/dL during pregnancy, most often due to iron deficiency.',
            matters: 'Anaemia raises the risk of low birth weight, preterm birth and poor tolerance of blood loss at delivery.',
            mis: { wrong: 'Anaemia in pregnancy is harmless and needs no treatment.', right: 'It is a major indirect cause of maternal death and needs iron-folic acid supplementation and diet advice.' },
            quiz: { q: 'In pregnancy, anaemia is defined as a haemoglobin below:', opts: [{ t: '11 g/dL', correct: true }, { t: '13 g/dL', correct: false }] }
        },
        'oxytocin': {
            term: 'Oxytocin', ipa: '/ˌɒksɪˈtoʊsɪn/',
            def: 'A hormone (and drug) that makes the uterus contract; used to induce or augment labour and to prevent PPH.',
            matters: 'As part of active management of the third stage, oxytocin given after birth sharply reduces post-partum haemorrhage.',
            mis: { wrong: 'Oxytocin is given to relax the uterus.', right: 'It contracts the uterus — relaxation of the uterus is done with tocolytic drugs instead.' },
            quiz: { q: 'Oxytocin acts on the uterus to cause:', opts: [{ t: 'Contraction', correct: true }, { t: 'Relaxation', correct: false }] }
        },
        'partograph': {
            term: 'Partograph', ipa: '/ˈpɑːtəɡrɑːf/',
            def: 'A pre-printed chart used to record the progress of labour and the condition of mother and fetus over time.',
            matters: 'Crossing the "alert" and "action" lines warns of obstructed or prolonged labour early, prompting timely referral.',
            mis: { wrong: 'The partograph is only used after delivery.', right: 'It is used during the active phase of labour to track progress in real time.' },
            quiz: { q: 'Cervical dilatation crossing the action line on a partograph indicates:', opts: [{ t: 'Abnormal, prolonged labour', correct: true }, { t: 'Normal progress', correct: false }] }
        },
        'apgar': {
            term: 'APGAR Score', ipa: '/ˈæpɡɑːr/',
            def: 'A score (0–10) assessing a newborn at 1 and 5 minutes using Appearance, Pulse, Grimace, Activity and Respiration.',
            matters: 'It gives a quick, standard picture of how well a baby is adapting to life outside the womb and guides resuscitation.',
            mis: { wrong: 'A low 1-minute APGAR always means permanent brain damage.', right: 'Many babies with a low 1-minute score recover fully by 5 minutes with simple support.' },
            quiz: { q: 'The "A" and "P" in APGAR stand for Appearance and:', opts: [{ t: 'Pulse', correct: true }, { t: 'Posture', correct: false }] }
        },
        'puerperium': {
            term: 'Puerperium', ipa: '/ˌpjuːəˈpɪəriəm/',
            def: 'The period of about 6 weeks after delivery during which the body returns to its non-pregnant state.',
            matters: 'It is when involution, lactation and bonding occur — and when PPH, sepsis and thromboembolism most threaten the mother.',
            mis: { wrong: 'The puerperium lasts only until the day of discharge.', right: 'It lasts roughly 6 weeks, until the reproductive organs return to normal.' },
            quiz: { q: 'The normal puerperium lasts approximately:', opts: [{ t: '6 weeks', correct: true }, { t: '2 weeks', correct: false }] }
        },
        'lochia': {
            term: 'Lochia', ipa: '/ˈloʊkiə/',
            def: 'The vaginal discharge after childbirth, made of blood, mucus and uterine tissue, changing colour over time.',
            matters: 'Watching lochia helps detect retained products or infection: a foul smell or fresh bleeding is a red flag.',
            mis: { wrong: 'Lochia stays bright red for the whole puerperium.', right: 'It changes from red (rubra) to pink (serosa) to white (alba) over the weeks.' },
            quiz: { q: 'The first, red-coloured lochia seen after birth is called lochia:', opts: [{ t: 'Rubra', correct: true }, { t: 'Alba', correct: false }] }
        },
        'colostrum': {
            term: 'Colostrum', ipa: '/kəˈlɒstrəm/',
            def: 'The thick, yellowish first milk produced in late pregnancy and the first few days after birth.',
            matters: 'It is rich in antibodies and acts as the baby\'s first immunisation, protecting against infection.',
            mis: { wrong: 'Colostrum is "dirty milk" that should be discarded.', right: 'It is highly protective and should be the baby\'s very first feed.' },
            quiz: { q: 'Colostrum is especially valuable because it is rich in:', opts: [{ t: 'Antibodies', correct: true }, { t: 'Fat only', correct: false }] }
        },
        'episiotomy': {
            term: 'Episiotomy', ipa: '/ɪˌpiːziˈɒtəmi/',
            def: 'A planned surgical cut to the perineum during birth to enlarge the vaginal opening.',
            matters: 'When indicated it can prevent uncontrolled tears, but routine use is no longer recommended.',
            mis: { wrong: 'An episiotomy should be done for every delivery.', right: 'It is done only when indicated — routine episiotomy is not recommended.' },
            quiz: { q: 'The most commonly used type of episiotomy incision is:', opts: [{ t: 'Mediolateral', correct: true }, { t: 'Transverse', correct: false }] }
        },
        'ectopic': {
            term: 'Ectopic Pregnancy', ipa: '/ɛkˈtɒpɪk ˈprɛɡnənsi/',
            def: 'A pregnancy that implants outside the uterine cavity, most often in a fallopian tube.',
            matters: 'A ruptured ectopic causes severe internal bleeding and shock — a true surgical emergency.',
            mis: { wrong: 'An ectopic pregnancy can grow safely to term.', right: 'It cannot — it must be treated, as it can rupture and cause fatal bleeding.' },
            quiz: { q: 'The most common site of an ectopic pregnancy is the:', opts: [{ t: 'Fallopian tube', correct: true }, { t: 'Ovary', correct: false }] }
        },
        'gestational diabetes': {
            term: 'Gestational Diabetes', ipa: '/dʒɛˈsteɪʃənəl ˌdaɪəˈbiːtiːz/',
            def: 'Glucose intolerance first recognised during pregnancy, usually resolving after delivery.',
            matters: 'It increases the risk of a large baby, birth injury and later type-2 diabetes, so screening and control matter.',
            mis: { wrong: 'Gestational diabetes always continues for life.', right: 'It usually resolves after birth, though it raises future diabetes risk.' },
            quiz: { q: 'A common complication of poorly controlled gestational diabetes is:', opts: [{ t: 'A large baby (macrosomia)', correct: true }, { t: 'A very small baby', correct: false }] }
        },
        'breech': {
            term: 'Breech Presentation', ipa: '/briːtʃ/',
            def: 'When the baby\'s buttocks or feet, rather than the head, are positioned to be born first.',
            matters: 'It raises the risk of cord prolapse and birth difficulty, often guiding a decision toward caesarean delivery.',
            mis: { wrong: 'A breech baby can never be turned.', right: 'External cephalic version (ECV) can sometimes turn the baby to a head-down position.' },
            quiz: { q: 'In a breech presentation, the part that presents first is the:', opts: [{ t: 'Buttocks or feet', correct: true }, { t: 'Head', correct: false }] }
        },
        'caesarean': {
            term: 'Caesarean Section', ipa: '/sɪˈzɛəriən ˈsɛkʃən/',
            def: 'Delivery of the baby through a surgical incision in the mother\'s abdomen and uterus.',
            matters: 'It is life-saving when vaginal birth is unsafe, but carries surgical risks, so it should be done on clear indication.',
            mis: { wrong: 'A caesarean is always safer than a vaginal birth.', right: 'It is major surgery with its own risks; it is preferred only when indicated.' },
            quiz: { q: 'A caesarean section delivers the baby through an incision in the:', opts: [{ t: 'Abdomen and uterus', correct: true }, { t: 'Vagina', correct: false }] }
        },
        'involution': {
            term: 'Uterine Involution', ipa: '/ˌɪnvəˈluːʃən/',
            def: 'The process by which the uterus returns to its non-pregnant size after delivery.',
            matters: 'Tracking fundal height each day confirms normal recovery; a poorly contracting uterus warns of PPH or infection.',
            mis: { wrong: 'The uterus stays the same size after delivery.', right: 'It steadily shrinks, descending about 1 finger-breadth per day after birth.' },
            quiz: { q: 'After delivery the uterine fundus normally descends by about:', opts: [{ t: '1 cm (1 finger) per day', correct: true }, { t: '5 cm per day', correct: false }] }
        },
        'mastitis': {
            term: 'Mastitis', ipa: '/mæˈstaɪtɪs/',
            def: 'Painful inflammation of breast tissue during lactation, often with infection.',
            matters: 'Continued breastfeeding plus antibiotics usually resolves it; untreated mastitis can form a breast abscess.',
            mis: { wrong: 'Breastfeeding must stop during mastitis.', right: 'Continued feeding or expressing actually helps clear the blocked, infected duct.' },
            quiz: { q: 'During mastitis, breastfeeding from the affected breast should usually be:', opts: [{ t: 'Continued', correct: true }, { t: 'Stopped completely', correct: false }] }
        },
        'iucd': {
            term: 'Intrauterine Contraceptive Device (IUCD)', ipa: '/ˌɪntrəˈjuːərɪn/',
            def: 'A small device placed inside the uterus to provide long-acting reversible contraception.',
            matters: 'It offers years of protection without daily effort, making it a key option in family-planning counselling.',
            mis: { wrong: 'An IUCD causes permanent infertility.', right: 'It is fully reversible — fertility returns after removal.' },
            quiz: { q: 'A copper IUCD is best described as a contraceptive that is:', opts: [{ t: 'Long-acting and reversible', correct: true }, { t: 'Permanent', correct: false }] }
        },
        'neonate': {
            term: 'Neonate', ipa: '/ˈniːoʊneɪt/',
            def: 'A newborn baby in the first 28 days of life.',
            matters: 'This is the most vulnerable period of life; warmth, feeding and infection prevention are the pillars of newborn care.',
            mis: { wrong: 'The neonatal period covers the whole first year.', right: 'It covers only the first 28 days of life.' },
            quiz: { q: 'The neonatal period is defined as the first:', opts: [{ t: '28 days of life', correct: true }, { t: '12 months of life', correct: false }] }
        },
        'asphyxia': {
            term: 'Birth Asphyxia', ipa: '/æsˈfɪksiə/',
            def: 'A condition where the newborn fails to start or sustain breathing, leading to low oxygen.',
            matters: 'Prompt resuscitation in the "golden minute" after birth prevents brain damage and death.',
            mis: { wrong: 'A baby who is blue but has a heartbeat needs no help.', right: 'It needs immediate resuscitation — drying, warmth and ventilation in the first minute.' },
            quiz: { q: 'The first minute after birth, crucial for resuscitation, is called the:', opts: [{ t: 'Golden minute', correct: true }, { t: 'Silent minute', correct: false }] }
        },
        'jaundice': {
            term: 'Neonatal Jaundice', ipa: '/ˈdʒɔːndɪs/',
            def: 'Yellowing of a newborn\'s skin and eyes due to a high level of bilirubin in the blood.',
            matters: 'Mild physiological jaundice is common, but very high bilirubin can damage the brain (kernicterus) and needs phototherapy.',
            mis: { wrong: 'All newborn jaundice is dangerous.', right: 'Physiological jaundice after day 2 is usually harmless; jaundice on day 1 is the worrying type.' },
            quiz: { q: 'Newborn jaundice appearing within the first 24 hours of life is:', opts: [{ t: 'Pathological (abnormal)', correct: true }, { t: 'Always physiological', correct: false }] }
        }
    };

    /* per-unit fallback term so every answer still gets real content */
    var UNIT_FALLBACK = {
        1: 'maternal mortality', 2: 'oxytocin', 3: 'anaemia',
        4: 'partograph', 5: 'puerperium', 6: 'apgar', 7: 'iucd'
    };

    function resolve(key) {
        var e = TERMS[key];
        if (e && e.alias) return TERMS[e.alias];
        return e;
    }

    /* ---- 2. Pick the most relevant terms for this question -------- */
    function pickTerms(q) {
        var hay = ((q.question || '') + ' ' + (q.answer || ''))
            .toLowerCase().replace(/<[^>]*>/g, ' ');
        var found = [];
        var seen = {};
        Object.keys(TERMS).forEach(function (key) {
            if (TERMS[key].alias) return;
            if (hay.indexOf(key) !== -1) {
                var e = resolve(key);
                if (e && !seen[e.term]) { seen[e.term] = 1; found.push(e); }
            }
        });
        // longest / most specific term first
        found.sort(function (a, b) { return b.term.length - a.term.length; });
        if (!found.length) {
            var fb = resolve(UNIT_FALLBACK[q.unit] || 'maternal mortality');
            if (fb) found.push(fb);
        }
        return found;
    }

    /* ---- 3. Builders for each module ----------------------------- */
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    function vocabModule(t) {
        return '' +
        '<section class="la-card la-vocab">' +
            '<div class="la-head"><span class="material-symbols-outlined" aria-hidden="true">menu_book</span>Build your vocab</div>' +
            '<h4 class="la-term">' + esc(t.term) + '</h4>' +
            '<div class="la-ipa-row">' +
                '<span class="la-ipa">' + esc(t.ipa) + '</span>' +
                '<button class="la-speak" type="button" data-speak="' + esc(t.term) + '" aria-label="Pronounce ' + esc(t.term) + '">' +
                    '<span class="material-symbols-outlined" aria-hidden="true">volume_up</span></button>' +
            '</div>' +
            '<p class="la-text">' + esc(t.def) + '</p>' +
        '</section>';
    }

    function mattersModule(t) {
        return '' +
        '<section class="la-card la-matters">' +
            '<div class="la-head"><span class="material-symbols-outlined" aria-hidden="true">lightbulb</span>Why it matters</div>' +
            '<h4 class="la-subtitle">' + esc(t.term) + '</h4>' +
            '<p class="la-text">' + esc(t.matters) + '</p>' +
        '</section>';
    }

    function thinkModule(q, t) {
        var prompt = 'Consider how <strong>' + esc(t.term) + '</strong> applies in real practice. ' +
            'How would an alert nurse midwife recognise it early, and what first action would you take?';
        return '' +
        '<section class="la-card la-think">' +
            '<div class="la-head"><span class="material-symbols-outlined" aria-hidden="true">psychology</span>Stop &amp; think</div>' +
            '<p class="la-text">We\'ve been studying <strong>' + esc(t.term) + '</strong>. ' +
                'Pause before reading on and connect it to patient care.</p>' +
            '<p class="la-think-q">' + prompt + '</p>' +
        '</section>';
    }

    var quizSeq = 0;
    function quizModule(t) {
        if (!t.quiz) return '';
        var id = 'la-quiz-' + (++quizSeq);
        var opts = t.quiz.opts.map(function (o, i) {
            return '<button class="la-option" type="button" data-correct="' + (o.correct ? '1' : '0') + '" ' +
                'data-quiz="' + id + '">' + esc(o.t) +
                '<span class="material-symbols-outlined la-option-mark" aria-hidden="true"></span></button>';
        }).join('');
        return '' +
        '<section class="la-card la-quiz" id="' + id + '">' +
            '<div class="la-head la-head-quiz"><span class="material-symbols-outlined" aria-hidden="true">help</span>Test your knowledge</div>' +
            '<div class="la-quiz-grid">' +
                '<p class="la-quiz-q">' + esc(t.quiz.q) + '</p>' +
                '<div class="la-options">' + opts + '</div>' +
            '</div>' +
            '<p class="la-quiz-feedback" hidden></p>' +
        '</section>';
    }

    function misconceptionModule(t) {
        return '' +
        '<section class="la-card la-mis">' +
            '<div class="la-head la-head-mis"><span class="material-symbols-outlined" aria-hidden="true">cancel</span>Common misconception</div>' +
            '<div class="la-mis-row la-mis-wrong">' +
                '<span class="material-symbols-outlined la-mis-icon" aria-hidden="true">dangerous</span>' +
                '<p>' + esc(t.mis.wrong) + '</p>' +
            '</div>' +
            '<div class="la-mis-row la-mis-right">' +
                '<span class="material-symbols-outlined la-mis-icon" aria-hidden="true">check_circle</span>' +
                '<p>' + esc(t.mis.right) + '</p>' +
            '</div>' +
        '</section>';
    }

    /* ---- 4. Assemble + inject ------------------------------------ */
    function buildPanel(q) {
        var terms = pickTerms(q);
        var primary = terms[0];
        var quizTerm = terms.find(function (t) { return t.quiz; }) || primary;

        var modules = [
            vocabModule(primary),
            mattersModule(primary),
            thinkModule(q, primary),
            quizModule(quizTerm),
            misconceptionModule(primary)
        ].join('');

        return '' +
        '<div class="learn-about" role="group" aria-label="Interactive learning modules">' +
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

        // Interactive quiz
        root.querySelectorAll('.la-quiz').forEach(function (quiz) {
            var feedback = quiz.querySelector('.la-quiz-feedback');
            quiz.querySelectorAll('.la-option').forEach(function (opt) {
                opt.addEventListener('click', function () {
                    if (quiz.classList.contains('answered')) return;
                    quiz.classList.add('answered');
                    var correct = opt.getAttribute('data-correct') === '1';
                    quiz.querySelectorAll('.la-option').forEach(function (o) {
                        var isC = o.getAttribute('data-correct') === '1';
                        o.classList.add(isC ? 'is-correct' : 'is-wrong-dim');
                        var mark = o.querySelector('.la-option-mark');
                        if (mark) mark.textContent = isC ? 'check_circle' : '';
                        o.disabled = true;
                    });
                    if (!correct) opt.classList.add('is-chosen-wrong');
                    if (feedback) {
                        feedback.hidden = false;
                        feedback.textContent = correct
                            ? 'Correct! Nicely reasoned.'
                            : 'Not quite — the highlighted answer is correct. Review it above.';
                        feedback.classList.toggle('ok', correct);
                        feedback.classList.toggle('no', !correct);
                    }
                    if (window.toast) window.toast(correct ? 'Correct answer' : 'Review this one', correct ? 'success' : 'info');
                });
            });
        });
    }

    window.injectLearnAbout = function (container, q) {
        if (!container || !q) return;
        // avoid duplicate injection on re-entrant opens
        var existing = container.querySelector('.learn-about');
        if (existing) existing.remove();
        container.insertAdjacentHTML('beforeend', buildPanel(q));
        var root = container.querySelector('.learn-about');
        if (root) wire(root);
    };
})();
