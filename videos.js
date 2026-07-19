/* ============================================================================
   videos.js — EASY-TO-UNDERSTAND video lessons per question's TOPIC.
   Strategy: bias the YouTube search toward channels famous for simple,
   beginner-friendly explanations (RegisteredNurseRN, Osmosis, Global Health
   Media, NursingSOS, Sarah Lavonne, Simple Nursing, Dr. Najeeb). Each topic
   carries its own hand-tuned query so the top results are the easiest videos.
   Click-to-load iframe; offline shows a graceful "browse on YouTube" card.
   Exposes window.injectVideo(container, question).
   ============================================================================ */
(function () {
    'use strict';

    /* Hand-tuned, EASY-focused queries per topic.
       Format: "<topic> <easy-educator channel>" so the simplest lessons rank first.
       Channels chosen because their entire style is "easy to understand". */
    var TOPIC_QUERY = {
        "cardinal-movements":   "mechanism of labour cardinal movements registerednursern",
        "stages-labour":        "stages of labour registerednursern easy",
        "true-false-labour":    "true vs false labor sarah lavonne",
        "amtsl-third-stage":    "active management third stage labour global health media",
        "partograph":           "partograph global health media",
        "episiotomy":           "episiotomy osmosis easy",
        "newborn-apgar":        "apgar score registerednursern",
        "anc":                  "antenatal care nursing sos easy",
        "high-risk-pregnancy":  "high risk pregnancy osmosis easy",
        "leopold":              "leopold maneuvers registerednursern",
        "breastfeeding":        "breastfeeding latch global health media",
        "family-planning":      "contraception methods osmosis easy",
        "copper-t":             "copper iud osmosis easy",
        "emergency-contraception": "emergency contraception osmosis easy",
        "abortion":             "types of abortion osmosis easy",
        "mtp":                  "medical termination of pregnancy dr najeeb",
        "aph":                  "antepartum hemorrhage osmosis easy",
        "placenta-previa":      "placenta previa osmosis",
        "abruptio":             "abruptio placentae osmosis",
        "previa-vs-abruptio":   "placenta previa vs abruptio registerednursern",
        "pih":                  "preeclampsia osmosis easy",
        "gdm":                  "gestational diabetes osmosis easy",
        "pph":                  "postpartum hemorrhage registerednursern",
        "fertilization":        "fertilization osmosis easy",
        "fetal-circulation":    "fetal circulation osmosis",
        "placenta-functions":   "placenta function osmosis easy",
        "amniotic-fluid":       "amniotic fluid registerednursern",
        "induction":            "induction of labour osmosis easy",
        "puerperium":           "postpartum recovery registerednursern",
        "oxytocin":             "oxytocin dr najeeb lectures",
        "lactation":            "lactation physiology osmosis",
        "vesicular-mole":       "hydatidiform mole osmosis",
        "incompetent-os":       "cervical insufficiency osmosis",
        "anaemia":              "anemia in pregnancy osmosis easy",
        "eclampsia":            "eclampsia osmosis magnesium sulfate",
        "hyperemesis":          "hyperemesis gravidarum osmosis",
        "rh":                   "rh incompatibility osmosis easy",
        "anti-d":               "rhogam anti d registerednursern",
        "polyhydramnios":       "polyhydramnios osmosis",
        "oligohydramnios":      "oligohydramnios osmosis",
        "twins":                "twin pregnancy osmosis easy",
        "cord":                 "umbilical cord registerednursern",
        "prolonged-labour":     "obstructed labour osmosis easy",
        "perineal-tear":        "perineal tears osmosis easy",
        "ventouse":             "vacuum assisted delivery osmosis",
        "forceps":              "forceps delivery osmosis",
        "c-section":            "cesarean section osmosis easy",
        "mgso4":                "magnesium sulfate eclampsia dr najeeb",
        "methergin":            "methylergometrine dr najeeb",
        "neonatal-levels":      "levels of neonatal care registerednursern",
        "preterm":              "preterm baby care osmosis easy",
        "postmaturity":         "post term pregnancy osmosis",
        "asphyxia":             "neonatal resuscitation global health media",
        "maternal-mortality":   "maternal mortality global health media",
        "nurse-role":           "role of nurse midwife nursing sos",
        "menstrual-cycle":      "menstrual cycle osmosis easy",
        "physio-changes":       "physiological changes pregnancy osmosis",
        "diet":                 "pregnancy nutrition registerednursern",
        "fetal-skull":          "fetal skull fontanelles nursing sos",
        "pnc":                  "postnatal care registerednursern",
        "anc-tests":            "fetal monitoring nst bpp osmosis",
        "bishop":               "bishop score registerednursern",
        "rollover":             "rollover test preeclampsia nursing",
        "psych-puerperium":     "postpartum depression psychosis osmosis",
        "iugr":                 "iugr osmosis easy",
        "breech":               "breech presentation ecv osmosis",
        "sepsis":               "puerperal sepsis osmosis",
        "kmc":                  "kangaroo mother care global health media",
        "hiv":                  "hiv pregnancy pmtct global health media",
        "infertility":          "infertility osmosis easy",
        "surrogacy":            "surrogacy explained easy",
        "prolapse":             "uterine prolapse osmosis"
    };

    function esc(s) {
        return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/>/g, '&gt;');
    }
    function pretty(slug) {
        return String(slug || '').replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    }

    function buildCard(q) {
        var topicSlug = (window.QUESTION_TOPIC || {})[q.id];
        if (!topicSlug) return '';
        var label = pretty(topicSlug);
        var query = TOPIC_QUERY[topicSlug] || (label + ' nursing lecture easy explanation');
        var hindiQuery = label + ' nursing in hindi';
        var searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
        var hindiUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(hindiQuery);
        var embedUrl = 'https://www.youtube.com/embed?listType=search&list=' + encodeURIComponent(query);

        return '' +
        '<div class="vid-card" role="region" aria-label="Easy video lessons">' +
          '<div class="vid-head"><span class="vid-ico">▶</span><span class="vid-head-title">Easy Video Lessons</span>' +
          '<span class="vid-topic">' + esc(label) + '</span></div>' +
          '<div class="vid-frame" data-embed="' + esc(embedUrl) + '">' +
            '<button type="button" class="vid-thumb vid-thumb-search" aria-label="Play easy videos on ' + esc(label) + '">' +
              '<span class="vid-thumb-bg" aria-hidden="true"></span>' +
              '<span class="vid-thumb-label">' + esc(label) + '</span>' +
              '<span class="vid-play" aria-hidden="true">▶</span>' +
            '</button>' +
            '<div class="vid-meta">' +
              '<div class="vid-title">Simple, easy-to-understand lessons on <b>' + esc(label) + '</b></div>' +
              '<div class="vid-channel">Sourced from beginner-friendly educators (RegisteredNurseRN, Osmosis, Global Health Media, NursingSOS). Tap to play the easiest match.</div>' +
              '<a class="vid-open" href="' + searchUrl + '" target="_blank" rel="noopener">All easy videos ↗</a>' +
              '<a class="vid-open vid-open-hindi" href="' + hindiUrl + '" target="_blank" rel="noopener">हिंदी में देखें ↗</a>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    function wire(scope) {
        scope.querySelectorAll('.vid-frame').forEach(function (frame) {
            if (frame.getAttribute('data-wired')) return;
            frame.setAttribute('data-wired', '1');
            var thumb = frame.querySelector('.vid-thumb');
            if (!thumb) return;
            thumb.addEventListener('click', function () {
                var src = frame.getAttribute('data-embed');
                if (!src) return;
                var iframe = document.createElement('iframe');
                iframe.className = 'vid-iframe';
                iframe.setAttribute('src', src + '&autoplay=1');
                iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('title', 'Easy video lessons');
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                frame.innerHTML = '';
                frame.appendChild(iframe);
            });
        });
    }

    window.injectVideo = function (container, q) {
        if (!container || !q) return;
        container.querySelectorAll('.vid-card').forEach(function (n) { n.remove(); });
        var html = buildCard(q);
        if (!html) return;
        var wrap = document.createElement('div');
        wrap.innerHTML = html;
        var node = wrap.firstElementChild || wrap.firstChild;
        var kit = container.querySelector('.mc-kit');
        if (kit && kit.parentNode === container) container.insertBefore(node, kit);
        else container.appendChild(node);
        wire(container);
    };

    /* exposed for review/debug */
    window.TOPIC_VIDEO_QUERY = TOPIC_QUERY;
})();
