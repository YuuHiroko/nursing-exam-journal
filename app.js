// THE NURSING EXAM JOURNAL
// Minimalist Monochrome / Newsprint App Logic — Multi-Unit Support

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('questions-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const unitBtns = document.querySelectorAll('.unit-btn');
    const sectionTitle = document.getElementById('section-title');
    const sectionSubtitle = document.getElementById('section-subtitle');
    
    // Modal elements
    const overlay = document.getElementById('answer-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-question-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalMarks = document.getElementById('modal-marks');
    const modalUnit = document.getElementById('modal-unit');
    const modalBody = document.getElementById('modal-body');
    const questionCounter = document.getElementById('question-counter');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const markDoneBtn = document.getElementById('mark-done');
    const questionToggle = document.getElementById('question-toggle');
    const articleHeader = document.getElementById('article-header');
    const navToggle = document.getElementById('nav-toggle');
    const navBackdrop = document.getElementById('nav-backdrop');
    const sidebarEl = document.getElementById('sidebar');

    // Syllabus view elements
    const syllabusBtn = document.getElementById('syllabus-btn');
    const progressRow = document.querySelector('.progress-row');

    let currentQuestions = [];
    let currentIndex = 0;
    let activeUnit = 'all';
    let activeMarks = 'all';
    let activeStatus = 'all';            // all | todo | done | starred
    let activeSearch = '';               // live keyword search term
    let showSyllabus = false;            // when true, main area shows the syllabus

    const toast = (msg, type) => { if (window.toast) window.toast(msg, type); };

    // Per-session preference: keep the question stem expanded across prev/next.
    let cuffExpanded = false;
    try { cuffExpanded = sessionStorage.getItem('cuffExpanded') === '1'; } catch (e) {}

    // Reference-counted scroll lock shared by the reader modal AND the nav drawer,
    // so closing one never unlocks the page while the other is still open.
    let scrollLocks = 0;
    function lockScroll() { scrollLocks++; document.body.classList.add('scroll-locked'); }
    function unlockScroll() { scrollLocks = Math.max(0, scrollLocks - 1); if (!scrollLocks) document.body.classList.remove('scroll-locked'); }

    // Question Cuff — collapse/expand the question stem in the reader header.
    function setToggleLabel(expanded) {
        if (questionToggle && questionToggle.firstChild)
            questionToggle.firstChild.textContent = expanded ? 'collapse question ' : 'read full question ';
    }
    function setCuff(expanded) {
        if (!questionToggle) return;
        modalTitle.classList.toggle('is-clamped', !expanded);
        questionToggle.setAttribute('aria-expanded', String(expanded));
        setToggleLabel(expanded);
    }

    // ── Completion checklist (persisted per device) ──────────────
    const DONE_KEY = 'examDone_v1';
    function loadDone() {
        try { return new Set(JSON.parse(localStorage.getItem(DONE_KEY)) || []); }
        catch (e) { return new Set(); }
    }
    const doneSet = loadDone();
    const qKey = q => q.unit + '-' + q.id;
    const isDone = q => doneSet.has(qKey(q));
    function saveDone() {
        try { localStorage.setItem(DONE_KEY, JSON.stringify([...doneSet])); } catch (e) {}
    }
    function setDone(q, done) {
        const k = qKey(q);
        if (done) doneSet.add(k); else doneSet.delete(k);
        saveDone();
    }

    // ── Bookmarks / starred questions (persisted per device) ─────
    const STAR_KEY = 'examStar_v1';
    function loadStar() {
        try { return new Set(JSON.parse(localStorage.getItem(STAR_KEY)) || []); }
        catch (e) { return new Set(); }
    }
    const starSet = loadStar();
    const isStarred = q => starSet.has(qKey(q));
    function saveStar() {
        try { localStorage.setItem(STAR_KEY, JSON.stringify([...starSet])); } catch (e) {}
    }
    function setStar(q, v) {
        const k = qKey(q);
        if (v) starSet.add(k); else starSet.delete(k);
        saveStar();
    }

    // Highlight every occurrence of the live-search term inside a question.
    function highlightTerm(text, term) {
        text = String(text == null ? '' : text);
        if (!term) return text;
        const lc = text.toLowerCase(), t = term.toLowerCase();
        let out = '', i = 0, j;
        while ((j = lc.indexOf(t, i)) !== -1) {
            out += text.slice(i, j) + '<mark>' + text.slice(j, j + term.length) + '</mark>';
            i = j + term.length;
        }
        return out + text.slice(i);
    }

    // Progress bar + per-unit / overall counters.
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const statCompleted = document.getElementById('stat-completed');
    const statusBtns = document.querySelectorAll('.status-btn');
    function updateProgress() {
        const all = getAllQuestions();
        // scope = current unit + marks filter (ignore the status filter so the bar shows true progress)
        const scope = all.filter(q =>
            (activeUnit === 'all' || q.unit == activeUnit) &&
            (activeMarks === 'all' || q.marks == activeMarks));
        const doneInScope = scope.filter(isDone).length;
        const pct = scope.length ? Math.round((doneInScope / scope.length) * 100) : 0;
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressText) progressText.textContent = doneInScope + ' / ' + scope.length + ' done (' + pct + '%)';
        if (statCompleted) statCompleted.textContent = String(all.filter(isDone).length);
        const statTotal = document.getElementById('stat-total');
        if (statTotal) statTotal.textContent = String(all.length);
    }

    // Merge all unit data
    function getAllQuestions() {
        const unit1 = window.QUESTIONS_DATA || [];
        const unit2 = window.QUESTIONS_DATA_UNIT2 || [];
        const unit3 = window.QUESTIONS_DATA_UNIT3 || [];
        const unit4 = window.QUESTIONS_DATA_UNIT4 || [];
        const unit5 = window.QUESTIONS_DATA_UNIT5 || [];
        const unit6 = window.QUESTIONS_DATA_UNIT6 || [];
        const unit7 = window.QUESTIONS_DATA_UNIT7 || [];
        const obg2  = window.QUESTIONS_DATA_OBG2 || [];   // OBG-II (high-risk), units 8-11
        // NRS — Nursing Research & Statistics (VII Sem), units 101-108
        const nrs1  = window.QUESTIONS_DATA_NRS_UNIT1 || [];
        const nrs2  = window.QUESTIONS_DATA_NRS_UNIT2 || [];
        const nrs3  = window.QUESTIONS_DATA_NRS_UNIT3 || [];
        const nrs4  = window.QUESTIONS_DATA_NRS_UNIT4 || [];
        const nrs5  = window.QUESTIONS_DATA_NRS_UNIT5 || [];
        // CHN-II — Community Health Nursing - II, units 201+
        const chn2u1 = window.QUESTIONS_DATA_CHN2_UNIT1 || [];
        const chn2u2 = window.QUESTIONS_DATA_CHN2_UNIT2 || [];
        const chn2u3 = window.QUESTIONS_DATA_CHN2_UNIT3 || [];
        const chn2u4 = window.QUESTIONS_DATA_CHN2_UNIT4 || [];
        const chn2u5 = window.QUESTIONS_DATA_CHN2_UNIT5 || [];
        const chn2u6 = window.QUESTIONS_DATA_CHN2_UNIT6 || [];
        const chn2u7 = window.QUESTIONS_DATA_CHN2_UNIT7 || [];
        const chn2u8 = window.QUESTIONS_DATA_CHN2_UNIT8 || [];
        const chn2u9 = window.QUESTIONS_DATA_CHN2_UNIT9 || [];
        const chn2u10 = window.QUESTIONS_DATA_CHN2_UNIT10 || [];
        const chn2u11 = window.QUESTIONS_DATA_CHN2_UNIT11 || [];
        const chn2u12 = window.QUESTIONS_DATA_CHN2_UNIT12 || [];
        const chn2u13 = window.QUESTIONS_DATA_CHN2_UNIT13 || [];
        return [...unit1, ...unit2, ...unit3, ...unit4, ...unit5, ...unit6, ...unit7, ...obg2, ...nrs1, ...nrs2, ...nrs3, ...nrs4, ...nrs5, ...chn2u1, ...chn2u2, ...chn2u3, ...chn2u4, ...chn2u5, ...chn2u6, ...chn2u7, ...chn2u8, ...chn2u9, ...chn2u10, ...chn2u11, ...chn2u12, ...chn2u13];
    }

    function getUnitLabel(unit) {
        const labels = {
            1: 'UNIT I', 2: 'UNIT II', 3: 'UNIT III', 4: 'UNIT IV', 5: 'UNIT V', 6: 'UNIT VI', 7: 'UNIT VII',
            8: 'OBG-II · HIGH-RISK PREG', 9: 'OBG-II · ABNORMAL LABOUR',
            10: 'OBG-II · HIGH-RISK NB', 11: 'OBG-II · GYNAEC',
            // NRS — Nursing Research & Statistics
            101: 'NRS · UNIT I', 102: 'NRS · UNIT II', 103: 'NRS · UNIT III', 104: 'NRS · UNIT IV',
            105: 'NRS · UNIT V', 106: 'NRS · UNIT VI', 107: 'NRS · UNIT VII', 108: 'NRS · UNIT VIII',
            // CHN-II — Community Health Nursing - II
            201: 'CHN-II · UNIT I — Common Conditions & First Aid', 202: 'CHN-II · UNIT II — Reproductive, Maternal & Child Health',
            203: 'CHN-II · UNIT III — Demography, Surveillance & Data', 204: 'CHN-II · UNIT IV — Population & Family Planning',
            205: 'CHN-II · UNIT V — Occupational Health',
            206: 'CHN-II · UNIT VI — Geriatric Health Care',
            207: 'CHN-II · UNIT VII — Mental Health Disorders',
            208: 'CHN-II · UNIT VIII — HMIS',
            209: 'CHN-II · UNIT IX — Management of Delivery of CH Services',
            210: 'CHN-II · UNIT X — Leadership, Supervision & Monitoring',
            211: 'CHN-II · UNIT XI — Disaster Management',
            212: 'CHN-II · UNIT XII — Bio-Medical Waste Management',
            213: 'CHN-II · UNIT XIII — Health Agencies'
        };
        return labels[unit] || 'UNIT ' + unit;
    }

    function renderQuestions() {
        listContainer.innerHTML = '';
        const all = getAllQuestions();
        
        const term = activeSearch.trim().toLowerCase();
        currentQuestions = all.filter(q => {
            const unitMatch = activeUnit === 'all' || q.unit == activeUnit;
            const marksMatch = activeMarks === 'all' || q.marks == activeMarks;
            let statusMatch = true;
            if (activeStatus === 'done') statusMatch = isDone(q);
            else if (activeStatus === 'todo') statusMatch = !isDone(q);
            else if (activeStatus === 'starred') statusMatch = isStarred(q);
            const searchMatch = !term || String(q.question || '').toLowerCase().includes(term);
            return unitMatch && marksMatch && statusMatch && searchMatch;
        });

        // Update header
        if (activeUnit === 'all') {
            sectionTitle.textContent = 'ALL ARCHIVED QUESTIONS';
            sectionSubtitle.textContent = currentQuestions.length + ' questions across all units';
        } else {
            const unitNames = {
                '1': 'UNIT I: INTRODUCTION TO MIDWIFERY',
                '2': 'UNIT II: ANATOMY & PHYSIOLOGY',
                '3': 'UNIT III: NORMAL PREGNANCY (ANTENATAL)',
                '4': 'UNIT IV: LABOUR & BIRTH',
                '5': 'UNIT V: POSTPARTUM CARE',
                '6': 'UNIT VI: CARE OF NORMAL NEONATE',
                '7': 'UNIT VII: FAMILY WELFARE SERVICES',
                '8': 'OBG-II UNIT I: HIGH-RISK PREGNANCY',
                '9': 'OBG-II UNIT II & III: ABNORMAL LABOUR & POSTNATAL PROBLEMS',
                '10': 'OBG-II UNIT IV: HIGH-RISK NEWBORN',
                '11': 'OBG-II UNIT V: GYNAECOLOGICAL DISORDERS',
                // NRS — Nursing Research & Statistics
                '101': 'NRS UNIT I: INTRODUCTION TO RESEARCH & RESEARCH PROCESS',
                '102': 'NRS UNIT II: RESEARCH PROCESS (CONTD.)',
                '103': 'NRS UNIT III: REVIEW OF LITERATURE',
                '104': 'NRS UNIT IV: RESEARCH APPROACHES & DESIGNS',
                '105': 'NRS UNIT V: SAMPLING & DATA COLLECTION',
                '106': 'NRS UNIT VI: ANALYSIS OF DATA',
                '107': 'NRS UNIT VII: INTRODUCTION TO STATISTICS',
                '108': 'NRS UNIT VIII: COMMUNICATION & UTILIZATION OF RESEARCH',
                // CHN-II — Community Health Nursing - II
                '201': 'CHN-II UNIT I: COMMON CONDITIONS, EMERGENCIES & FIRST AID',
                '202': 'CHN-II UNIT II: REPRODUCTIVE, MATERNAL, NEWBORN, CHILD & ADOLESCENT HEALTH',
                '203': 'CHN-II UNIT III: DEMOGRAPHY, SURVEILLANCE & INTERPRETATION OF DATA',
                '204': 'CHN-II UNIT IV: POPULATION AND ITS CONTROL',
                '205': 'CHN-II UNIT V: OCCUPATIONAL HEALTH',
                '206': 'CHN-II UNIT VI: GERIATRIC HEALTH CARE',
                '207': 'CHN-II UNIT VII: MENTAL HEALTH DISORDERS',
                '208': 'CHN-II UNIT VIII: HEALTH MANAGEMENT INFORMATION SYSTEM (HMIS)',
                '209': 'CHN-II UNIT IX: MANAGEMENT OF DELIVERY OF COMMUNITY HEALTH SERVICES',
                '210': 'CHN-II UNIT X: LEADERSHIP, SUPERVISION AND MONITORING',
                '211': 'CHN-II UNIT XI: DISASTER MANAGEMENT',
                '212': 'CHN-II UNIT XII: BIO-MEDICAL WASTE MANAGEMENT',
                '213': 'CHN-II UNIT XIII: HEALTH AGENCIES'
            };
            sectionTitle.textContent = unitNames[activeUnit] || 'UNIT ' + activeUnit;
            sectionSubtitle.textContent = currentQuestions.length + ' questions';
        }

        if (term) {
            sectionSubtitle.textContent = 'Showing ' + currentQuestions.length + ' of ' +
                all.length + ' questions for "' + activeSearch.trim() + '"';
        } else if (activeStatus === 'starred') {
            sectionSubtitle.textContent = currentQuestions.length + ' bookmarked question' +
                (currentQuestions.length === 1 ? '' : 's');
        }

        if (currentQuestions.length === 0) {
            // If an OBG-II unit is selected but its dataset hasn't loaded yet,
            // kick off the lazy load and show a loading state instead of "none found".
            const isOBG2Unit = ['8', '9', '10', '11'].indexOf(String(activeUnit)) !== -1;
            const obg2 = window.__obg2;
            if (obg2 && isOBG2Unit && obg2.status !== 'ready' && obg2.status !== 'error') {
                listContainer.innerHTML = '<div class="loading-state" role="status" aria-live="polite">' +
                    '<md-circular-progress indeterminate aria-label="Loading questions"></md-circular-progress>' +
                    '<span class="mono-label">LOADING OBG-II QUESTIONS…</span></div>';
                obg2.load();
                return;
            }
            listContainer.innerHTML = '<div style="padding:2rem;text-align:center;"><span class="mono-label">NO ENTRIES FOUND FOR THIS CRITERIA.</span></div>';
            return;
        }

        currentQuestions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card' + (isDone(q) ? ' is-done' : '');
            card.dataset.qkey = qKey(q);
            // Accessible "clickable card" pattern: the question heading holds a
            // real <button> whose accessible name equals its visible text
            // (WCAG 2.5.3), and a stretched overlay makes the whole card
            // clickable. md-ripple/md-focus-ring provide the M3 interaction.
            const num = String(index + 1).padStart(2, '0');

            const starred = isStarred(q);
            card.innerHTML =
                '<md-ripple></md-ripple>' +
                '<button class="q-check" type="button" aria-pressed="' + isDone(q) + '" ' +
                    'aria-label="Mark as completed" title="Mark as completed">' +
                    '<span class="q-check-tick material-symbols-outlined" aria-hidden="true">check</span></button>' +
                '<div class="q-number" aria-hidden="true">' + num + '</div>' +
                '<div class="q-content">' +
                    '<h3 class="q-text">' +
                        '<button class="q-open" type="button">' +
                            '<md-focus-ring></md-focus-ring>' +
                            highlightTerm(q.question, activeSearch.trim()) +
                        '</button>' +
                    '</h3>' +
                    '<div class="q-meta">' +
                        '<span>' + getUnitLabel(q.unit) + '</span>' +
                        '<span>REPEATED: ' + q.repeated + 'x</span>' +
                        '<span>' + q.years + '</span>' +
                        (q.stars ? '<span class="priority-stars stars-' + q.stars + '" title="' + (q.stars === 3 ? 'VVV Important — Must Study' : q.stars === 2 ? 'VV Important' : 'Important') + '">' + '★'.repeat(q.stars) + '</span>' : '') +
                    '</div>' +
                '</div>' +
                '<div class="q-marks-area">' +
                    '<button class="q-bookmark' + (starred ? ' starred' : '') + '" type="button" ' +
                        'aria-pressed="' + starred + '" aria-label="Bookmark question" title="Bookmark">' +
                        '<span class="material-symbols-outlined' + (starred ? ' filled' : '') + '" aria-hidden="true">' +
                        (starred ? 'star' : 'star_border') + '</span></button>' +
                    '<span class="marks-badge">' + q.marks + ' M</span>' +
                '</div>';

            // The stretched .q-open button is the primary control; native
            // button semantics give Enter/Space activation for free.
            card.querySelector('.q-open').addEventListener('click', () => openModal(index));
            const chk = card.querySelector('.q-check');
            chk.addEventListener('click', (e) => {
                e.stopPropagation();                 // don't open the modal
                const nowDone = !isDone(q);
                setDone(q, nowDone);
                card.classList.toggle('is-done', nowDone);
                chk.setAttribute('aria-pressed', nowDone);
                updateProgress();
                toast(nowDone ? 'Question marked complete ✓' : 'Marked as to-do', nowDone ? 'success' : 'info');
                if (activeStatus !== 'all') renderQuestions();  // drop/add from filtered view
            });
            const star = card.querySelector('.q-bookmark');
            star.addEventListener('click', (e) => {
                e.stopPropagation();                 // don't open the modal
                const nowStar = !isStarred(q);
                setStar(q, nowStar);
                star.classList.toggle('starred', nowStar);
                star.setAttribute('aria-pressed', nowStar);
                var starIcon = star.querySelector('.material-symbols-outlined');
                if (starIcon) {
                    starIcon.textContent = nowStar ? 'star' : 'star_border';
                    starIcon.classList.toggle('filled', nowStar);
                }
                toast(nowStar ? 'Bookmarked' : 'Bookmark removed', 'info');
                if (activeStatus === 'starred' && !nowStar) renderQuestions();  // drop from starred view
            });
            listContainer.appendChild(card);
        });

        updateProgress();
    }

    // ── Syllabus view ────────────────────────────────────────────
    // Renders the official MUHS/INC course outline (window.SYLLABUS_DATA)
    // into the main content area, in newsprint house style.
    const esc = (s) => String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    function ul(items, cls) {
        return '<ul class="' + cls + '">' +
            items.map(i => '<li>' + esc(i) + '</li>').join('') + '</ul>';
    }

    function renderUnit(u) {
        const hours = [];
        if (u.hours) {
            if (u.hours.t) hours.push(u.hours.t + ' T');
            if (u.hours.l) hours.push(u.hours.l + ' L');
            if (u.hours.c) hours.push(u.hours.c + ' C');
        }
        const hoursHtml = hours.length
            ? '<span class="syl-hours">' + hours.map(h => '<span>' + h + '</span>').join('') + '</span>'
            : '';

        const outcomes = (u.outcomes && u.outcomes.length)
            ? '<div class="syl-outcomes"><span class="syl-mini-label">Learning Outcomes</span>' +
                ul(u.outcomes, 'syl-outcome-list') + '</div>'
            : '';

        const topics = (u.topics || []).map(t => {
            const head = t.heading
                ? '<h5 class="syl-topic-head">' + esc(t.heading) + '</h5>' : '';
            return '<div class="syl-topic">' + head + ul(t.items, 'syl-content-list') + '</div>';
        }).join('');

        return '<article class="syl-unit">' +
            '<div class="syl-unit-head">' +
                '<span class="syl-unit-roman">UNIT ' + esc(u.roman) + '</span>' +
                '<h4 class="syl-unit-title">' + esc(u.title) + '</h4>' +
                hoursHtml +
            '</div>' +
            outcomes +
            '<div class="syl-content"><span class="syl-mini-label">Content</span>' + topics + '</div>' +
        '</article>';
    }

    function renderPracticum(course) {
        const blocks = [];
        if (course.practiceCompetencies && course.practiceCompetencies.length) {
            blocks.push('<div class="syl-prac-block"><h5 class="syl-topic-head">Practice Competencies</h5>' +
                ul(course.practiceCompetencies, 'syl-content-list syl-ol') + '</div>');
        }
        if (course.skillLab && course.skillLab.length) {
            blocks.push('<div class="syl-prac-block"><h5 class="syl-topic-head">Skill Lab — Procedures</h5>' +
                ul(course.skillLab, 'syl-content-list syl-ol') + '</div>');
        }
        if (course.clinical && course.clinical.length) {
            const post = course.clinical.map(c =>
                '<div class="syl-posting">' +
                    '<div class="syl-posting-head"><span class="syl-posting-area">' + esc(c.area) + '</span>' +
                        '<span class="syl-hours"><span>' + esc(c.weeks) + '</span></span></div>' +
                    ul(c.skills, 'syl-content-list') +
                '</div>').join('');
            blocks.push('<div class="syl-prac-block"><h5 class="syl-topic-head">Clinical Postings</h5>' + post + '</div>');
        }
        if (!blocks.length) return '';
        return '<details class="syl-details"><summary>Practicum — Skill Lab & Clinical Postings</summary>' +
            '<div class="syl-details-body">' + blocks.join('') + '</div></details>';
    }

    function renderCourse(course) {
        const meta = [
            'Placement: ' + course.placement,
            'Theory: ' + course.theory,
            course.practicum
        ].filter(Boolean).map(m => '<span>' + esc(m) + '</span>').join('');

        const comp = (course.competencies && course.competencies.length)
            ? '<details class="syl-details"><summary>Course Competencies</summary>' +
                '<div class="syl-details-body">' + ul(course.competencies, 'syl-content-list syl-ol') + '</div></details>'
            : '';

        const units = course.units.map(renderUnit).join('');

        return '<section class="syl-course" id="syl-' + esc(course.id) + '">' +
            '<header class="syl-course-head">' +
                '<span class="syl-course-code">' + esc(course.course) + '</span>' +
                '<h3 class="syl-course-title">' + esc(course.fullTitle) +
                    (course.subtitle ? ' <em>' + esc(course.subtitle) + '</em>' : '') + '</h3>' +
                '<div class="syl-course-meta">' + meta + '</div>' +
                (course.description ? '<p class="syl-desc">' + esc(course.description) + '</p>' : '') +
            '</header>' +
            comp +
            '<div class="syl-units">' + units + '</div>' +
            renderPracticum(course) +
        '</section>';
    }

    function renderSyllabus() {
        const data = window.SYLLABUS_DATA;
        sectionTitle.textContent = 'COURSE SYLLABUS';
        if (!data || !data.courses) {
            listContainer.innerHTML = '<div style="padding:2rem;text-align:center;"><span class="mono-label">SYLLABUS DATA NOT LOADED.</span></div>';
            return;
        }
        sectionSubtitle.textContent = 'MUHS / INC B.Sc Nursing — official course outline';

        const nav = '<div class="syl-jump">' +
            data.courses.map(c => '<a href="#syl-' + esc(c.id) + '">' + esc(c.course) + '</a>').join('') +
        '</div>';

        const courses = data.courses.map(renderCourse).join('');

        const refs = (data.references && data.references.length)
            ? '<section class="syl-course"><header class="syl-course-head">' +
                '<h3 class="syl-course-title">Reference Books</h3></header>' +
                ul(data.references, 'syl-content-list') + '</section>'
            : '';

        listContainer.innerHTML = '<div class="syllabus-wrap">' + nav + courses + refs + '</div>';
    }

    function enterSyllabus() {
        showSyllabus = true;
        unitBtns.forEach(b => b.classList.remove('active'));
        if (syllabusBtn) syllabusBtn.classList.add('active');
        if (progressRow) progressRow.style.display = 'none';
        renderSyllabus();
        try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
    }

    function exitSyllabus() {
        showSyllabus = false;
        if (syllabusBtn) syllabusBtn.classList.remove('active');
        if (progressRow) progressRow.style.display = '';
    }

    // Modal Logic
    function openModal(index) {
        if (!currentQuestions[index]) return;
        currentIndex = index;
        const q = currentQuestions[index];

        modalTitle.innerHTML = q.question;
        if (articleHeader) articleHeader.dataset.marks = q.marks;   // marks-weight spine tint
        if (questionToggle) questionToggle.hidden = true;
        setCuff(false);                                             // start collapsed; measured below
        modalMeta.textContent = 'REPEATED: ' + q.repeated + ' TIMES | ' + q.years;
        modalMarks.textContent = q.marks + ' MARKS';
        modalUnit.textContent = getUnitLabel(q.unit);

        questionCounter.textContent = (index + 1) + ' / ' + currentQuestions.length;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === currentQuestions.length - 1;

        // Completion toggle for this question (reflect + wire)
        if (markDoneBtn) {
            const markDoneLabel = document.getElementById('mark-done-label');
            const markDoneIcon = document.getElementById('mark-done-icon');
            const syncBtn = () => {
                const d = isDone(q);
                markDoneBtn.classList.toggle('done', d);
                markDoneBtn.setAttribute('aria-pressed', String(d));
                if (markDoneLabel) markDoneLabel.textContent = d ? 'Completed' : 'Mark as completed';
                if (markDoneIcon) markDoneIcon.textContent = d ? 'check_circle' : 'radio_button_unchecked';
            };
            syncBtn();
            markDoneBtn.onclick = () => {
                const nd = !isDone(q);
                setDone(q, nd);
                syncBtn();
                const card = listContainer.querySelector('[data-qkey="' + qKey(q) + '"]');
                if (card) card.classList.toggle('is-done', nd);
                updateProgress();
                toast(nd ? 'Question marked complete ✓' : 'Marked as to-do', nd ? 'success' : 'info');
            };
        }

        // Show modal BEFORE injecting content so CSS animations fire on a visible element.
        // (Animations on display:none elements don't run — they'd skip to end-state instantly.)
        // Lock scroll only on a true open transition — openModal is ALSO the
        // prev/next handler, so re-entrant calls must not stack the lock.
        const wasHidden = overlay.classList.contains('hidden');
        if (wasHidden) {
            lastFocusedEl = document.activeElement;   // remember trigger for restore
        }
        overlay.classList.remove('hidden');
        if (wasHidden) { lockScroll(); focusReader(); }
        overlay.scrollTop = 0;
        modalBody.scrollTop = 0;

        // Inject answer in the next animation frame — guarantees the overlay is painted
        // before animation timers start, so slideUp / fadeIn / scaleIn all play correctly.
        requestAnimationFrame(() => {
            modalBody.innerHTML = q.answer || '';
            if (window.activateDiagrams) window.activateDiagrams();
            // Append Google "Learn About" interactive study modules to every answer
            if (window.injectLearnAbout) window.injectLearnAbout(modalBody, q);
            // MCQ Quiz interactivity: click option → green/red + show answer
            modalBody.querySelectorAll('.mcq-item').forEach(function(item) {
                var opts = item.querySelectorAll('.mcq-option');
                var ans = item.querySelector('.mcq-answer');
                var answered = false;
                opts.forEach(function(opt) {
                    opt.addEventListener('click', function() {
                        if (answered) return;
                        answered = true;
                        var isCorrect = opt.getAttribute('data-correct') === 'true';
                        opt.classList.add(isCorrect ? 'correct' : 'wrong');
                        // Also highlight the correct one
                        opts.forEach(function(o) {
                            if (o.getAttribute('data-correct') === 'true') o.classList.add('correct');
                            o.style.pointerEvents = 'none';
                        });
                        if (ans) ans.classList.add('show');
                    });
                });
            });
            // Annotation overlay: pen / highlighter / eraser with auto-save
            if (window.initAnnotation) window.initAnnotation(overlay, qKey(q));
            // Question Cuff: reveal the toggle only when the stem exceeds 2 lines;
            // short questions render in full with no chrome.
            if (questionToggle) {
                const overflows = modalTitle.scrollHeight > modalTitle.clientHeight + 1;
                questionToggle.hidden = !overflows;
                if (!overflows) modalTitle.classList.remove('is-clamped');
                else if (cuffExpanded) setCuff(true);   // honour per-session preference
            }
        });
    }

    // Focus management: remember the trigger, move focus into the reader on
    // open, restore it on close, and trap Tab within the dialog (M3 a11y).
    let lastFocusedEl = null;
    function focusReader() {
        if (closeModalBtn && typeof closeModalBtn.focus === 'function') {
            requestAnimationFrame(() => closeModalBtn.focus());
        }
    }
    function getFocusable() {
        const modal = overlay.querySelector('.article-modal');
        if (!modal) return [];
        return Array.prototype.filter.call(
            modal.querySelectorAll('md-icon-button, md-text-button, md-filled-button, button, [href], input, [tabindex]:not([tabindex="-1"]):not(.focus-sentinel)'),
            (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );
    }
    // Sentinels wrap focus around the dialog.
    overlay.querySelectorAll('.focus-sentinel').forEach((s) => {
        s.addEventListener('focus', () => {
            const f = getFocusable();
            if (!f.length) return;
            (s.dataset.sentinel === 'start' ? f[f.length - 1] : f[0]).focus();
        });
    });

    function closeModal() {
        if (overlay.classList.contains('hidden')) return;   // balance the single lock
        // Tear down annotation canvas + toolbar before hiding
        if (window.destroyAnnotation) window.destroyAnnotation();
        overlay.classList.add('hidden');
        unlockScroll();
        // Restore focus to the card that opened the reader.
        if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
            lastFocusedEl.focus();
            lastFocusedEl = null;
        }
    }

    // Event Listeners
    closeModalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) openModal(currentIndex - 1);
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentQuestions.length - 1) openModal(currentIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (overlay.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) openModal(currentIndex - 1);
        if (e.key === 'ArrowRight' && !nextBtn.disabled) openModal(currentIndex + 1);
    });

    // Syllabus toggle
    if (syllabusBtn) {
        syllabusBtn.addEventListener('click', () => {
            if (showSyllabus) { exitSyllabus(); renderQuestions(); }
            else enterSyllabus();
        });
    }

    // Unit filtering
    unitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            exitSyllabus();
            unitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeUnit = btn.dataset.unit;
            renderQuestions();
            toast('Showing ' + currentQuestions.length + ' questions', 'info');
        });
    });

    // Marks filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            exitSyllabus();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMarks = btn.dataset.filter;
            renderQuestions();
            toast('Showing ' + currentQuestions.length + ' questions', 'info');
        });
    });

    // Status (checklist) filtering — All / To-Do / Done / Starred
    statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            exitSyllabus();
            statusBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeStatus = btn.dataset.status;
            renderQuestions();
        });
    });

    // ── Live keyword search (debounced, combines with all filters) ──
    // #q-search is a native <input type="search"> that fires standard 'input' events.
    const searchInput = document.getElementById('q-search');
    const searchClearBtn = document.getElementById('q-search-clear');
    let searchDebounce;
    function toggleClear(v) {
        if (searchClearBtn) searchClearBtn.hidden = !v;
    }
    function applySearch(val) {
        activeSearch = val;
        toggleClear(!!val);
        exitSyllabus();
        renderQuestions();
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const v = searchInput.value;
            toggleClear(!!v);
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => applySearch(v), 150);
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                clearTimeout(searchDebounce);
                applySearch('');
                searchInput.blur();
            }
        });
    }
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            clearTimeout(searchDebounce);
            applySearch('');
            if (searchInput) searchInput.focus();
            toast('Showing all ' + getAllQuestions().length + ' questions', 'info');
        });
    }

    // ── Question Cuff toggle (expand / collapse the stem in place) ──
    if (questionToggle) {
        questionToggle.addEventListener('click', () => {
            const expand = modalTitle.classList.contains('is-clamped');   // clamped → expand
            setCuff(expand);
            cuffExpanded = expand;
            try { sessionStorage.setItem('cuffExpanded', expand ? '1' : '0'); } catch (e) {}
        });
    }

    // ── Mobile navigation drawer ───────────────────────────────────
    // Reuses the SAME <aside id="sidebar"> as a slide-in panel on ≤900px.
    function drawerOpen() { return document.body.classList.contains('nav-open'); }
    function openDrawer() {
        document.body.classList.add('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
        lockScroll();
        const first = document.getElementById('syllabus-btn');  // avoid auto-popping the keyboard
        if (first) first.focus();
    }
    function closeDrawer() {
        if (!drawerOpen()) return;
        document.body.classList.remove('nav-open');
        if (navToggle) { navToggle.setAttribute('aria-expanded', 'false'); navToggle.focus(); }
        unlockScroll();
    }
    if (navToggle) navToggle.addEventListener('click', () => { drawerOpen() ? closeDrawer() : openDrawer(); });
    if (navBackdrop) navBackdrop.addEventListener('click', closeDrawer);
    // Picking any filter/unit/status/syllabus closes the drawer (mobile only).
    if (sidebarEl) sidebarEl.addEventListener('click', (e) => {
        if (drawerOpen() && e.target.closest('.unit-btn, .filter-btn, .status-btn, #syllabus-btn')) closeDrawer();
    });
    // Escape closes the drawer; focus stays trapped inside while open.
    document.addEventListener('keydown', (e) => {
        if (!drawerOpen()) return;
        if (e.key === 'Escape') { closeDrawer(); return; }
        if (e.key === 'Tab' && sidebarEl) {
            const items = sidebarEl.querySelectorAll('a[href], button:not([disabled]):not([hidden]), input, [tabindex]:not([tabindex="-1"])');
            const visible = Array.prototype.filter.call(items, el => el.offsetParent !== null);
            if (!visible.length) return;
            const first = visible[0], last = visible[visible.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
    // Leaving the mobile breakpoint with the drawer open: tidy up.
    window.addEventListener('resize', () => { if (window.innerWidth > 900 && drawerOpen()) closeDrawer(); });

    // ── Lazy-load the large OBG-II dataset (~1 MB) ─────────────────
    // Units 1–7 render instantly from the small, eagerly-loaded data
    // files; OBG-II is fetched after first paint (or immediately when an
    // OBG-II unit is selected) and merged in with a graceful re-render.
    let obg2Status = window.QUESTIONS_DATA_OBG2 ? 'ready' : 'idle';   // idle | loading | ready | error
    function loadOBG2(onReady) {
        if (obg2Status === 'ready') { if (onReady) onReady(); return; }
        if (obg2Status === 'loading') return;
        obg2Status = 'loading';
        const s = document.createElement('script');
        s.src = 'data-obg2.js?v=3';
        s.async = true;
        s.onload = () => {
            obg2Status = 'ready';
            renderQuestions();           // merge OBG-II into the current view
            if (onReady) onReady();
        };
        s.onerror = () => { obg2Status = 'error'; renderQuestions(); };
        document.body.appendChild(s);
    }
    // Expose so renderQuestions() can react to OBG-II selection / empty state.
    window.__obg2 = { get status() { return obg2Status; }, load: loadOBG2 };

    // Initialize: render units 1–7 immediately.
    renderQuestions();

    // Warm OBG-II in the background once the main thread is idle.
    if (obg2Status === 'idle') {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => loadOBG2(), { timeout: 2000 });
        } else {
            setTimeout(() => loadOBG2(), 400);
        }
    }
});
