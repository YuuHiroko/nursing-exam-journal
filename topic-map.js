/* ============================================================================
   topic-map.js — maps every starred question id -> topic slug.
   Used by video-data.js and flashcard-data.js so all questions sharing a
   topic get the same video + flashcard deck.
   ============================================================================ */
window.QUESTION_TOPIC = (function () {
    var M = {};
    function set(slug, ids) { ids.forEach(function (id) { M[id] = slug; }); }

    set("cardinal-movements", [44, 47, 60]);
    set("stages-labour", [42, 43, 59, 98, 99]);
    set("true-false-labour", [45, 100]);
    set("amtsl-third-stage", [46]);
    set("partograph", [48]);
    set("episiotomy", [49, 193]);
    set("newborn-apgar", [56, 70, 71, 73]);
    set("anc", [27, 28]);
    set("high-risk-pregnancy", [31, 108, 109]);
    set("leopold", [39]);
    set("breastfeeding", [65]);
    set("family-planning", [78, 79, 80, 81, 82, 84]);
    set("copper-t", [83]);
    set("emergency-contraception", [85]);
    set("abortion", [111, 112, 113, 114, 115, 116, 117, 118]);
    set("mtp", [119, 120]);
    set("aph", [128]);
    set("placenta-previa", [123, 125]);
    set("abruptio", [126, 129]);
    set("previa-vs-abruptio", [124, 127, 130]);
    set("pih", [136, 137, 138, 139]);
    set("gdm", [144, 145]);
    set("pph", [211, 212, 213, 214, 215, 216]);
    set("fertilization", [15]);
    set("fetal-circulation", [16]);
    set("placenta-functions", [17]);
    set("amniotic-fluid", [18, 19, 20, 21]); // 18=separation but close enough grouping for placenta; adjust below
    set("induction", [54, 194]);
    set("puerperium", [61, 210]);
    set("oxytocin", [101]);
    set("lactation", [103, 104]);
    set("vesicular-mole", [121]);
    set("incompetent-os", [122]);
    set("anaemia", [131, 132, 133, 134, 135]);
    set("eclampsia", [140, 141]);
    set("hyperemesis", [149, 150]);
    set("rh", [153, 154, 155, 156, 157]);
    set("anti-d", [158]);
    set("polyhydramnios", [159, 160, 161]);
    set("oligohydramnios", [162, 163, 164, 165, 166]);
    set("twins", [167, 168, 169]);
    set("cord", [170]);
    set("prolonged-labour", [175, 176, 177]);
    set("perineal-tear", [191, 192]);
    set("ventouse", [195]);
    set("forceps", [196]);
    set("c-section", [197, 198, 199, 200]);
    set("mgso4", [203]);
    set("methergin", [204]);
    set("neonatal-levels", [219]);
    set("preterm", [220, 221]);
    set("postmaturity", [223, 224]);
    set("asphyxia", [225]);
    set("maternal-mortality", [1, 2, 3, 4]);
    set("nurse-role", [5]);
    set("menstrual-cycle", [14]);
    set("physio-changes", [23, 24, 25, 26, 35]);
    set("diet", [33, 93]);
    set("fetal-skull", [37, 75]);
    set("pnc", [62, 63, 64, 68]);
    set("anc-tests", [94, 95, 96, 97, 110]);
    set("bishop", [58, 202]);
    set("rollover", [142]);
    set("psych-puerperium", [105]);
    set("iugr", [171, 172]);
    set("breech", [178, 179, 180]);
    set("sepsis", [206, 207, 208]);
    set("kmc", [222]);
    set("hiv", [228, 229, 230, 231]);
    set("infertility", [232, 233, 234]);
    set("surrogacy", [236]);
    set("prolapse", [237]);

    return M;
})();
