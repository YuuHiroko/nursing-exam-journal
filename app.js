// THE NURSING EXAM JOURNAL
// Minimalist Monochrome / Newsprint App Logic

document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('questions-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Modal elements
    const overlay = document.getElementById('answer-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-question-title');
    const modalMeta = document.getElementById('modal-meta');
    const modalMarks = document.getElementById('modal-marks');
    const modalBody = document.getElementById('modal-body');
    const questionCounter = document.getElementById('question-counter');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');

    let currentQuestions = [];
    let currentIndex = 0;

    function renderQuestions(filter = 'all') {
        listContainer.innerHTML = '';
        const data = window.QUESTIONS_DATA || [];
        
        currentQuestions = data.filter(q => filter === 'all' || q.marks == filter);
        
        if (currentQuestions.length === 0) {
            listContainer.innerHTML = `<div class="question-card" style="justify-content:center; padding: 2rem;"><span class="mono-label">NO ENTRIES FOUND FOR THIS CRITERIA.</span></div>`;
            return;
        }

        currentQuestions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            
            // Format number: 01, 02...
            const num = String(index + 1).padStart(2, '0');
            
            card.innerHTML = `
                <div class="q-number">${num}</div>
                <div class="q-content">
                    <h3 class="q-text">${q.question}</h3>
                    <div class="q-meta">
                        <span>REPEATED: ${q.repeated} TIMES</span>
                        <span>YEARS: ${q.years}</span>
                    </div>
                </div>
                <div class="q-marks-area">
                    <span class="marks-badge">${q.marks} MARKS</span>
                </div>
            `;
            
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
        modalMeta.textContent = `REPEATED: ${q.repeated} TIMES | ${q.years}`;
        modalMarks.textContent = `${q.marks} MARKS`;
        modalBody.innerHTML = q.answer;
        
        questionCounter.textContent = `${index + 1} / ${currentQuestions.length}`;
        
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

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (overlay.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) openModal(currentIndex - 1);
        if (e.key === 'ArrowRight' && !nextBtn.disabled) openModal(currentIndex + 1);
    });

    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderQuestions(btn.dataset.filter);
        });
    });

    // Initialize
    if (typeof window.QUESTIONS_DATA !== 'undefined') {
        renderQuestions();
    } else {
        // Wait briefly for data.js to load if deferred
        setTimeout(() => renderQuestions(), 100);
    }
});
