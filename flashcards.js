/* ============================================================================
   flashcards.js — in-app AnkiDroid-style flashcard reviewer.
   Builds a deck per starred question from its memory kit (viva = Q&A cards,
   mcq = recall cards). Anki-like SM-2-lite scheduling with Again/Good/Easy,
   flip animation, and localStorage persistence. Exposes
   window.injectFlashcards(container, question).
   ============================================================================ */
(function () {
    'use strict';

    var LS_KEY = 'nej_flash_v1';

    /* ---------- storage ---------- */
    function loadStore() {
        try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
        catch (e) { return {}; }
    }
    function saveStore(s) {
        try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch (e) {}
    }

    /* ---------- deck builder ---------- */
    // Build cards from a memory kit: viva Q&A + mcq recall.
    function buildDeck(q) {
        var kits = window.MEMORY_KITS || {};
        var kit = kits[q.id];
        if (!kit) return [];
        var cards = [];
        (kit.viva || []).forEach(function (v, i) {
            // viva entries are questions; pair with the recall summary as the answer
            cards.push({
                id: q.id + '_v' + i,
                front: v,
                back: kit.recall || 'See the memory kit above.'
            });
        });
        (kit.mcq || []).forEach(function (m, i) {
            var letters = ['A', 'B', 'C', 'D'];
            var opts = m.opts.map(function (o, j) { return letters[j] + ') ' + o; }).join('   ');
            cards.push({
                id: q.id + '_m' + i,
                front: m.q + '<br><span class="fc-opts">' + opts + '</span>',
                back: '<b>' + letters[m.a] + ') ' + m.opts[m.a] + '</b>'
            });
        });
        return cards;
    }

    /* ---------- scheduling (SM-2 lite) ---------- */
    function scheduleCard(rec, grade) {
        // grade: 0=again, 1=good, 2=easy
        var now = Date.now();
        rec = rec || { ease: 2.5, interval: 0, reps: 0, due: now };
        if (grade === 0) { // again
            rec.reps = 0;
            rec.interval = 0;
            rec.ease = Math.max(1.3, rec.ease - 0.2);
            rec.due = now; // show again this session
        } else {
            rec.reps += 1;
            if (grade === 2) rec.ease = rec.ease + 0.15;
            if (rec.reps === 1) rec.interval = 1;
            else if (rec.reps === 2) rec.interval = 3;
            else rec.interval = Math.round(rec.interval * rec.ease);
            if (grade === 2) rec.interval = Math.round(rec.interval * 1.3);
            rec.due = now + rec.interval * 86400000; // days -> ms
        }
        return rec;
    }

    /* ---------- reviewer UI ---------- */
    function openReviewer(q, cards, topicLabel) {
        // remove existing
        var old = document.getElementById('fc-overlay');
        if (old) old.remove();

        var store = loadStore();
        var deck = cards.map(function (c) {
            return { card: c, rec: store[c.id] };
        });
        // order: due first, then new
        deck.sort(function (a, b) {
            var ad = a.rec ? a.rec.due : 0, bd = b.rec ? b.rec.due : 0;
            return ad - bd;
        });

        var idx = 0, flipped = false, reviewed = 0, againIds = {};

        var ov = document.createElement('div');
        ov.id = 'fc-overlay';
        ov.className = 'fc-overlay';
        ov.innerHTML =
            '<div class="fc-modal" role="dialog" aria-modal="true" aria-label="Flashcard reviewer">' +
              '<div class="fc-topbar">' +
                '<span class="fc-title">🃏 ' + escapeHtml(topicLabel) + '</span>' +
                '<span class="fc-count" id="fc-count"></span>' +
                '<button class="fc-close" id="fc-close" aria-label="Close flashcards">✕</button>' +
              '</div>' +
              '<div class="fc-progress"><div class="fc-progress-fill" id="fc-fill"></div></div>' +
              '<div class="fc-stage" id="fc-stage">' +
                '<div class="fc-card" id="fc-card" tabindex="0" role="button" aria-label="Flashcard — tap to flip">' +
                  '<div class="fc-face fc-front" id="fc-front"></div>' +
                  '<div class="fc-face fc-back" id="fc-back"></div>' +
                '</div>' +
                '<div class="fc-hint">tap card to flip</div>' +
              '</div>' +
              '<div class="fc-actions" id="fc-actions" hidden>' +
                '<button class="fc-btn fc-again" data-g="0">Again<br><small>&lt;1m</small></button>' +
                '<button class="fc-btn fc-good" data-g="1">Good<br><small>due</small></button>' +
                '<button class="fc-btn fc-easy" data-g="2">Easy<br><small>4d</small></button>' +
              '</div>' +
              '<div class="fc-done" id="fc-done" hidden>' +
                '<div class="fc-done-emoji">🎉</div>' +
                '<div class="fc-done-text">Deck complete!</div>' +
                '<button class="fc-btn fc-good" id="fc-restart">Review again</button>' +
              '</div>' +
            '</div>';
        document.body.appendChild(ov);
        document.body.style.overflow = 'hidden';

        var card = ov.querySelector('#fc-card');
        var front = ov.querySelector('#fc-front');
        var back = ov.querySelector('#fc-back');
        var actions = ov.querySelector('#fc-actions');
        var count = ov.querySelector('#fc-count');
        var fill = ov.querySelector('#fc-fill');
        var doneBox = ov.querySelector('#fc-done');
        var stage = ov.querySelector('#fc-stage');

        function escapeHtmlLocal(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

        function render() {
            if (idx >= deck.length) { finish(); return; }
            var item = deck[idx];
            flipped = false;
            card.classList.remove('is-flipped');
            actions.hidden = true;
            front.innerHTML = item.card.front;
            back.innerHTML = item.card.back;
            count.textContent = (idx + 1) + ' / ' + deck.length;
            fill.style.width = Math.round((idx / deck.length) * 100) + '%';
            card.focus();
        }

        function flip() {
            if (idx >= deck.length) return;
            flipped = !flipped;
            card.classList.toggle('is-flipped', flipped);
            actions.hidden = !flipped;
        }

        function grade(g) {
            var item = deck[idx];
            item.rec = scheduleCard(item.rec, g);
            store[item.card.id] = item.rec;
            saveStore(store);
            reviewed++;
            if (g === 0) {
                // Again: requeue near the end of this session
                againIds[item.card.id] = true;
                deck.push(item);
            }
            idx++;
            render();
        }

        function finish() {
            stage.style.display = 'none';
            actions.hidden = true;
            count.textContent = 'Done';
            fill.style.width = '100%';
            doneBox.hidden = false;
        }

        function close() {
            ov.remove();
            document.body.style.overflow = '';
        }

        // events
        card.addEventListener('click', flip);
        card.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
        });
        actions.querySelectorAll('.fc-btn').forEach(function (b) {
            b.addEventListener('click', function () { grade(Number(b.getAttribute('data-g'))); });
        });
        ov.querySelector('#fc-close').addEventListener('click', close);
        ov.querySelector('#fc-restart').addEventListener('click', function () {
            idx = 0; reviewed = 0; againIds = {};
            doneBox.hidden = true; stage.style.display = '';
            render();
        });
        ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
            if (!document.body.contains(ov)) document.removeEventListener('keydown', esc);
        });
        // swipe (mobile)
        var sx = 0;
        card.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
        card.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - sx;
            if (Math.abs(dx) > 60 && flipped) {
                grade(dx > 0 ? 1 : 0); // swipe right = good, left = again
            }
        }, { passive: true });

        render();
    }

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ---------- public: inject a "Study Flashcards" launcher ---------- */
    window.injectFlashcards = function (container, q) {
        if (!container || !q) return;
        container.querySelectorAll('.fc-launcher').forEach(function (n) { n.remove(); });
        var cards = buildDeck(q);
        if (!cards.length) return;
        var topicSlug = (window.QUESTION_TOPIC || {})[q.id] || 'Topic';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'fc-launcher';
        btn.innerHTML = '<span class="fc-launcher-ico">🃏</span>' +
            '<span class="fc-launcher-txt">Study Flashcards</span>' +
            '<span class="fc-launcher-count">' + cards.length + ' cards</span>';
        btn.addEventListener('click', function () { openReviewer(q, cards, 'Flashcards'); });

        // place at the very top of the answer for visibility
        var kit = container.querySelector('.mc-kit');
        if (kit && kit.parentNode === container) container.insertBefore(btn, kit);
        else container.insertBefore(btn, container.firstChild);
    };

    /* expose deck count for stats if needed */
    window.flashcardDeckSize = function (q) { return buildDeck(q).length; };
})();
