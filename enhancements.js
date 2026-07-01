// THE NURSING EXAM JOURNAL — ENHANCEMENT LAYER
// Standalone, framework-free, zero-dependency progressive enhancements.
// Loaded BEFORE app.js so window.toast() is available to page logic.
// Every feature is self-isolating: one failing block never breaks another.

(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Toast notifications (public API: window.toast) ───────────
    // Defined synchronously so callers loaded after this file can use it.
    (function () {
        var stack = null;
        var ICONS = { success: 'check_circle', info: 'info', warn: 'warning' };

        function ensureStack() {
            if (stack && document.body.contains(stack)) return stack;
            stack = document.createElement('div');
            stack.className = 'toast-stack';
            stack.setAttribute('aria-live', 'polite');
            (document.body || document.documentElement).appendChild(stack);
            return stack;
        }

        function toast(msg, type) {
            type = type || 'info';
            try {
                var s = ensureStack();
                while (s.children.length >= 3) s.removeChild(s.firstChild);

                var el = document.createElement('div');
                el.className = 'toast ' + type;
                el.setAttribute('role', 'status');
                el.innerHTML = '<span class="toast-icon material-symbols-outlined" aria-hidden="true"></span><span class="toast-msg"></span>';
                el.querySelector('.toast-icon').textContent = ICONS[type] || ICONS.info;
                el.querySelector('.toast-msg').textContent = msg;
                s.appendChild(el);

                var hideTimer;
                function remove() {
                    if (el._removed) return;
                    el._removed = true;
                    el.classList.add('toast-out');
                    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 240);
                }
                function arm() { hideTimer = setTimeout(remove, 3000); }
                el.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
                el.addEventListener('mouseleave', arm);
                el.addEventListener('click', remove);
                arm();
            } catch (e) { /* never let a toast crash the page */ }
        }

        window.toast = toast;
        window.NEJ = window.NEJ || {};
        window.NEJ.toast = toast;
    })();

    // ── Everything below needs the DOM ───────────────────────────
    function onReady(fn) {
        if (document.readyState === 'loading')
            document.addEventListener('DOMContentLoaded', fn);
        else fn();
    }

    onReady(function () {

        // ── 1. Material ripple (JS-positioned ink) ───────────────
        if (!reduceMotion) {
            var RIPPLE_SEL = '.filter-btn,.unit-btn,.status-btn,.nav-btn,' +
                '.syllabus-btn,.mark-done-btn,.timer-btn,.search-clear';
            document.addEventListener('pointerdown', function (e) {
                if (e.button) return;                       // primary button only
                var btn = e.target.closest && e.target.closest(RIPPLE_SEL);
                if (!btn || btn.disabled) return;
                var rect = btn.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height);
                var ink = document.createElement('span');
                ink.className = 'ripple-ink';
                ink.style.width = ink.style.height = size + 'px';
                ink.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ink.style.top = (e.clientY - rect.top - size / 2) + 'px';
                btn.appendChild(ink);
                ink.addEventListener('animationend', function () {
                    if (ink.parentNode) ink.parentNode.removeChild(ink);
                });
            }, { passive: true });
        }

        // ── 1b. Material Web ripple on question cards ────────────
        // Uses the real <md-ripple> component from @material/web for
        // authentic M3 ink. Re-applied as the list re-renders.
        (function () {
            if (reduceMotion || !('customElements' in window)) return;
            var list = document.getElementById('questions-list');
            if (!list) return;
            function addRipple(card) {
                if (card.querySelector(':scope > md-ripple')) return;
                card.appendChild(document.createElement('md-ripple'));
            }
            function scan() {
                var cards = list.querySelectorAll('.question-card');
                for (var i = 0; i < cards.length; i++) addRipple(cards[i]);
            }
            customElements.whenDefined('md-ripple').then(function () {
                scan();
                new MutationObserver(scan).observe(list, { childList: true });
            }).catch(function () {});
        })();

        // ── 2. Reading progress bar ──────────────────────────────
        (function () {
            var bar = document.createElement('div');
            bar.className = 'reading-bar';
            document.body.appendChild(bar);

            var overlay = document.getElementById('answer-overlay');
            var modalBody = document.getElementById('modal-body');
            var readerProgressFill = document.getElementById('reader-progress-fill'); // native div fill
            var ticking = false, flashed = false;

            function compute() {
                ticking = false;
                var pct = 0, max;
                var modalOpen = overlay && !overlay.classList.contains('hidden');
                if (modalOpen && modalBody) {
                    max = modalBody.scrollHeight - modalBody.clientHeight;
                    pct = max > 8 ? (modalBody.scrollTop / max) * 100 : 0;
                } else {
                    max = document.documentElement.scrollHeight - window.innerHeight;
                    pct = max > 8 ? (window.scrollY / max) * 100 : 0;
                }
                pct = Math.max(0, Math.min(100, pct));
                bar.style.width = pct + '%';
                // Drive the native reader progress fill while modal is open.
                if (readerProgressFill && modalOpen) readerProgressFill.style.width = pct + '%';
                if (pct >= 99.5 && !flashed) {
                    flashed = true;
                    if (!reduceMotion) {
                        bar.classList.add('flash');
                        setTimeout(function () { bar.classList.remove('flash'); }, 500);
                    }
                } else if (pct < 99.5) { flashed = false; }
            }
            function onScroll() {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(compute);
            }
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onScroll, { passive: true });
            if (modalBody) modalBody.addEventListener('scroll', onScroll, { passive: true });
            // Recompute when the modal opens/closes (its hidden class toggles).
            if (overlay) {
                new MutationObserver(function () { flashed = false; onScroll(); })
                    .observe(overlay, { attributes: true, attributeFilter: ['class'] });
            }
            compute();
        })();

        // ── 3. Mobile swipe navigation inside the reader ─────────
        (function () {
            var modal = document.querySelector('.article-modal');
            if (!modal) return;
            var sx = 0, sy = 0, tracking = false;
            modal.addEventListener('touchstart', function (e) {
                if (e.touches.length !== 1) { tracking = false; return; }
                // Don't hijack a swipe that starts on a horizontally scrollable
                // element (wide tables, flowcharts) — let it scroll instead.
                var n = e.target;
                while (n && n !== modal && n.nodeType === 1) {
                    if (n.scrollWidth > n.clientWidth + 4) {
                        var ox = window.getComputedStyle(n).overflowX;
                        if (ox === 'auto' || ox === 'scroll') { tracking = false; return; }
                    }
                    n = n.parentNode;
                }
                tracking = true;
                sx = e.changedTouches[0].clientX;
                sy = e.changedTouches[0].clientY;
            }, { passive: true });
            modal.addEventListener('touchend', function (e) {
                if (!tracking) return;
                tracking = false;
                var dx = e.changedTouches[0].clientX - sx;
                var dy = e.changedTouches[0].clientY - sy;
                if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
                var id = dx < 0 ? 'next-question' : 'prev-question';
                var btn = document.getElementById(id);
                if (btn && !btn.disabled) btn.click();
            }, { passive: true });
        })();

        // ── 4. Study timer (Pomodoro 25 / 5) ─────────────────────
        (function () {
            var display = document.getElementById('timer-display');
            var stateEl = document.getElementById('timer-state');
            var toggleBtn = document.getElementById('timer-toggle');
            var resetBtn = document.getElementById('timer-reset');
            var box = document.getElementById('study-timer');
            if (!display || !toggleBtn || !resetBtn) return;

            var FOCUS = 25 * 60, BREAK = 5 * 60;
            var mode = 'focus', remaining = FOCUS, running = false, tid = null;

            function fmt(s) {
                var m = Math.floor(s / 60), sec = s % 60;
                return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
            }
            function paint() {
                display.textContent = fmt(remaining);
                if (stateEl) stateEl.textContent = (mode === 'focus' ? 'FOCUS · POMODORO' : 'BREAK · REST');
                if (box) box.classList.toggle('is-break', mode === 'break');
                toggleBtn.textContent = running ? 'Pause' : 'Start';
            }
            function tick() {
                remaining--;
                if (remaining <= 0) {
                    var wasFocus = mode === 'focus';
                    mode = wasFocus ? 'break' : 'focus';
                    remaining = wasFocus ? BREAK : FOCUS;
                    if (window.toast) window.toast(wasFocus ? 'Focus done — take a 5 min break' : 'Break over — back to focus', 'success');
                }
                paint();
            }
            function start() { if (running) return; running = true; tid = setInterval(tick, 1000); paint(); }
            function pause() { running = false; if (tid) clearInterval(tid); tid = null; paint(); }
            toggleBtn.addEventListener('click', function () { running ? pause() : start(); });
            resetBtn.addEventListener('click', function () {
                pause(); mode = 'focus'; remaining = FOCUS; paint();
            });
            paint();
        })();

        // ── 5. Stats count-up on scroll-into-view ────────────────
        (function () {
            var targets = document.querySelectorAll('[data-count-animate]');
            if (!targets.length || !('IntersectionObserver' in window) || reduceMotion) return;
            function countUp(el) {
                var goal = parseInt(String(el.textContent).replace(/[^0-9]/g, ''), 10);
                if (!isFinite(goal) || goal <= 0) return;
                var dur = 900, start = null;
                var ease = function (t) { return 1 - Math.pow(1 - t, 4); };
                function step(ts) {
                    if (start === null) start = ts;
                    var p = Math.min((ts - start) / dur, 1);
                    el.textContent = String(Math.round(ease(p) * goal));
                    if (p < 1) requestAnimationFrame(step);
                    else el.textContent = String(goal);
                }
                requestAnimationFrame(step);
            }
            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (en.isIntersecting) { countUp(en.target); obs.unobserve(en.target); }
                });
            }, { threshold: 0.5 });
            targets.forEach(function (t) { obs.observe(t); });
        })();

        // ── 6. Keyboard shortcuts + help overlay ─────────────────
        (function () {
            var overlay = document.createElement('div');
            overlay.className = 'kbd-help-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-label', 'Keyboard shortcuts');
            overlay.innerHTML =
                '<div class="kbd-help-card">' +
                    '<h3>Keyboard shortcuts <button class="kbd-help-close" type="button" aria-label="Close">×</button></h3>' +
                    '<div class="kbd-row"><span>Search questions</span><span><kbd>/</kbd> or <kbd>S</kbd></span></div>' +
                    '<div class="kbd-row"><span>Previous / next answer</span><span><kbd>←</kbd> <kbd>→</kbd></span></div>' +
                    '<div class="kbd-row"><span>Toggle dark mode</span><span><kbd>D</kbd></span></div>' +
                    '<div class="kbd-row"><span>Start / pause timer</span><span><kbd>T</kbd></span></div>' +
                    '<div class="kbd-row"><span>Close reader / dialog</span><span><kbd>Esc</kbd></span></div>' +
                    '<div class="kbd-row"><span>This help</span><span><kbd>?</kbd></span></div>' +
                '</div>';
            document.body.appendChild(overlay);

            var lastFocus = null;
            function show() {
                lastFocus = document.activeElement;
                overlay.classList.add('show');
                var closeBtn = overlay.querySelector('.kbd-help-close');
                if (closeBtn) closeBtn.focus();
            }
            function hide() {
                overlay.classList.remove('show');
                if (lastFocus && lastFocus.focus) lastFocus.focus();
                lastFocus = null;
            }
            overlay.addEventListener('click', function (e) { if (e.target === overlay) hide(); });
            overlay.querySelector('.kbd-help-close').addEventListener('click', hide);
            // Keep focus inside the dialog while it is open (focus trap).
            overlay.addEventListener('keydown', function (e) {
                if (e.key !== 'Tab' || !overlay.classList.contains('show')) return;
                var f = overlay.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
                if (!f.length) return;
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            });

            document.addEventListener('keydown', function (e) {
                if (e.metaKey || e.ctrlKey || e.altKey) return;

                // Escape closes the help dialog; otherwise let app.js handle it (reader).
                if (e.key === 'Escape') { if (overlay.classList.contains('show')) hide(); return; }

                // Never hijack keys while the user is typing in a field.
                var t = e.target, tag = (t.tagName || '').toLowerCase();
                if (tag === 'input' || tag === 'textarea' || t.isContentEditable) return;

                // Suppress global shortcuts while the answer reader is open so focus
                // stays contained in that modal (Escape above still closes it).
                var rdr = document.getElementById('answer-overlay');
                if (rdr && !rdr.classList.contains('hidden')) return;

                if (e.key === '?') {
                    e.preventDefault();
                    overlay.classList.contains('show') ? hide() : show();
                } else if (e.key === '/' || e.key === 's' || e.key === 'S') {
                    var search = document.getElementById('q-search');
                    if (search) { e.preventDefault(); search.focus(); if (search.select) search.select(); }
                } else if (e.key === 'd' || e.key === 'D') {
                    var theme = document.getElementById('theme-toggle');
                    if (theme) theme.click();
                } else if (e.key === 't' || e.key === 'T') {
                    var timer = document.getElementById('timer-toggle');
                    if (timer) timer.click();
                }
            });
        })();
    });
})();
