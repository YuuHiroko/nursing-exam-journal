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

    let currentQuestions = [];
    let currentIndex = 0;
    let activeUnit = 'all';
    let activeMarks = 'all';
    let activeStatus = 'all';            // all | todo | done

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
        return [...unit1, ...unit2, ...unit3, ...unit4, ...unit5, ...unit6, ...unit7, ...obg2];
    }

    function getUnitLabel(unit) {
        const labels = {
            1: 'UNIT I', 2: 'UNIT II', 3: 'UNIT III', 4: 'UNIT IV', 5: 'UNIT V', 6: 'UNIT VI', 7: 'UNIT VII',
            8: 'OBG-II · HIGH-RISK PREG', 9: 'OBG-II · ABNORMAL LABOUR',
            10: 'OBG-II · HIGH-RISK NB', 11: 'OBG-II · GYNAEC'
        };
        return labels[unit] || 'UNIT ' + unit;
    }

    function renderQuestions() {
        listContainer.innerHTML = '';
        const all = getAllQuestions();
        
        currentQuestions = all.filter(q => {
            const unitMatch = activeUnit === 'all' || q.unit == activeUnit;
            const marksMatch = activeMarks === 'all' || q.marks == activeMarks;
            const statusMatch = activeStatus === 'all' ||
                (activeStatus === 'done' ? isDone(q) : !isDone(q));
            return unitMatch && marksMatch && statusMatch;
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
                '11': 'OBG-II UNIT V: GYNAECOLOGICAL DISORDERS'
            };
            sectionTitle.textContent = unitNames[activeUnit] || 'UNIT ' + activeUnit;
            sectionSubtitle.textContent = currentQuestions.length + ' questions';
        }
        
        if (currentQuestions.length === 0) {
            listContainer.innerHTML = '<div style="padding:2rem;text-align:center;"><span class="mono-label">NO ENTRIES FOUND FOR THIS CRITERIA.</span></div>';
            return;
        }

        currentQuestions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card' + (isDone(q) ? ' is-done' : '');
            card.dataset.qkey = qKey(q);
            const num = String(index + 1).padStart(2, '0');

            card.innerHTML =
                '<button class="q-check" type="button" aria-pressed="' + isDone(q) + '" ' +
                    'aria-label="Mark as completed" title="Mark as completed">' +
                    '<span class="q-check-tick">&#10003;</span></button>' +
                '<div class="q-number">' + num + '</div>' +
                '<div class="q-content">' +
                    '<h3 class="q-text">' + q.question + '</h3>' +
                    '<div class="q-meta">' +
                        '<span>' + getUnitLabel(q.unit) + '</span>' +
                        '<span>REPEATED: ' + q.repeated + 'x</span>' +
                        '<span>' + q.years + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="q-marks-area">' +
                    '<span class="marks-badge">' + q.marks + ' M</span>' +
                '</div>';

            card.addEventListener('click', () => openModal(index));
            const chk = card.querySelector('.q-check');
            chk.addEventListener('click', (e) => {
                e.stopPropagation();                 // don't open the modal
                const nowDone = !isDone(q);
                setDone(q, nowDone);
                card.classList.toggle('is-done', nowDone);
                chk.setAttribute('aria-pressed', nowDone);
                updateProgress();
                if (activeStatus !== 'all') renderQuestions();  // drop/add from filtered view
            });
            listContainer.appendChild(card);
        });

        updateProgress();
    }

    // Modal Logic
    function openModal(index) {
        if (!currentQuestions[index]) return;
        currentIndex = index;
        const q = currentQuestions[index];
        
        modalTitle.innerHTML = q.question;
        modalMeta.textContent = 'REPEATED: ' + q.repeated + ' TIMES | ' + q.years;
        modalMarks.textContent = q.marks + ' MARKS';
        modalUnit.textContent = getUnitLabel(q.unit);
        modalBody.innerHTML = q.answer;
        
        // Activate interactive diagrams (if any placeholders exist)
        if (window.activateDiagrams) window.activateDiagrams();
        
        questionCounter.textContent = (index + 1) + ' / ' + currentQuestions.length;

        // Completion toggle for this question (reflect + wire)
        if (markDoneBtn) {
            const syncBtn = () => {
                const d = isDone(q);
                markDoneBtn.classList.toggle('done', d);
                markDoneBtn.setAttribute('aria-pressed', String(d));
                markDoneBtn.innerHTML = d ? '&#10003; Completed' : 'Mark as completed';
            };
            syncBtn();
            markDoneBtn.onclick = () => {
                const nd = !isDone(q);
                setDone(q, nd);
                syncBtn();
                const card = listContainer.querySelector('[data-qkey="' + qKey(q) + '"]');
                if (card) card.classList.toggle('is-done', nd);
                updateProgress();
            };
        }

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === currentQuestions.length - 1;
        
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        overlay.scrollTop = 0;
        modalBody.scrollTop = 0;
    }

    function closeModal() {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
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

    // Unit filtering
    unitBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            unitBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeUnit = btn.dataset.unit;
            renderQuestions();
        });
    });

    // Marks filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMarks = btn.dataset.filter;
            renderQuestions();
        });
    });

    // Status (checklist) filtering — All / To-Do / Done
    statusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            statusBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeStatus = btn.dataset.status;
            renderQuestions();
        });
    });

    // Initialize (sync — data scripts load before app.js)
    renderQuestions();
});
