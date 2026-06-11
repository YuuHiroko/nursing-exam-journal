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

    let currentQuestions = [];
    let currentIndex = 0;
    let activeUnit = 'all';
    let activeMarks = 'all';

    // Merge all unit data
    function getAllQuestions() {
        const unit1 = window.QUESTIONS_DATA || [];
        const unit2 = window.QUESTIONS_DATA_UNIT2 || [];
        return [...unit1, ...unit2];
    }

    function getUnitLabel(unit) {
        const labels = { 1: 'UNIT I', 2: 'UNIT II' };
        return labels[unit] || 'UNIT ' + unit;
    }

    function renderQuestions() {
        listContainer.innerHTML = '';
        const all = getAllQuestions();
        
        currentQuestions = all.filter(q => {
            const unitMatch = activeUnit === 'all' || q.unit == activeUnit;
            const marksMatch = activeMarks === 'all' || q.marks == activeMarks;
            return unitMatch && marksMatch;
        });

        // Update header
        if (activeUnit === 'all') {
            sectionTitle.textContent = 'ALL ARCHIVED QUESTIONS';
            sectionSubtitle.textContent = currentQuestions.length + ' questions across all units';
        } else {
            const unitNames = { '1': 'UNIT I: INTRODUCTION TO MIDWIFERY', '2': 'UNIT II: ANATOMY & PHYSIOLOGY' };
            sectionTitle.textContent = unitNames[activeUnit] || 'UNIT ' + activeUnit;
            sectionSubtitle.textContent = currentQuestions.length + ' questions';
        }
        
        if (currentQuestions.length === 0) {
            listContainer.innerHTML = '<div style="padding:2rem;text-align:center;"><span class="mono-label">NO ENTRIES FOUND FOR THIS CRITERIA.</span></div>';
            return;
        }

        currentQuestions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            const num = String(index + 1).padStart(2, '0');
            
            card.innerHTML =
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
            listContainer.appendChild(card);
        });
    }

    // Modal Logic
    function openModal(index) {
        if (!currentQuestions[index]) return;
        currentIndex = index;
        const q = currentQuestions[index];
        
        modalTitle.textContent = q.question;
        modalMeta.textContent = 'REPEATED: ' + q.repeated + ' TIMES | ' + q.years;
        modalMarks.textContent = q.marks + ' MARKS';
        modalUnit.textContent = getUnitLabel(q.unit);
        modalBody.innerHTML = q.answer;
        
        questionCounter.textContent = (index + 1) + ' / ' + currentQuestions.length;
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === currentQuestions.length - 1;
        
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        overlay.scrollTop = 0;
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

    // Initialize
    setTimeout(() => renderQuestions(), 50);
});
