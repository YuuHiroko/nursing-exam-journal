/* ============================================================================
   memory-coach.js — "Never-Forget" memory kits for starred OBG questions.
   Exposes window.injectMemoryCoach(container, question). Called from app.js
   right after the answer + Learn-About modules are injected.

   Each kit is generated from a compact data object (window.MEMORY_KITS[id])
   so the HTML is built once here and never duplicated across 171 answers.
   Kit fields (all optional except a few core ones):
     lines   : [5 strings]        — the topic in 5 plain lines
     story   : string (HTML ok)   — crazy / funny linking story
     mnemonic: {word, parts:[..], local} — acronym + breakdown (+ Hindi/Marathi)
     palace  : string (HTML ok)   — memory-palace walk-through (use <b class="mc-stop">)
     terms   : [[term, image],..] — difficult term → easy image/character
     diagram : string             — ASCII art (raw, drawn in <pre>)
     dcap    : string             — diagram caption
     why     : [strings]          — the logical "why" behind each point
     recall  : string (HTML ok)   — the hidden 10-second recall answer
     viva    : [5 strings]        — viva questions
     mcq     : [{q, opts:[4], a}] — MCQs (a = index of correct opt 0-3)
     drill   : [strings]          — key words repeated for the chip wall
   ============================================================================ */
(function () {
    'use strict';

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    /* Allow a tiny safe subset (<b>,<strong>,<i>,<em>,<br>) in story/palace/recall */
    function rich(s) {
        var t = esc(s);
        return t
            .replace(/&lt;(\/?)(b|strong|i|em)&gt;/g, '<$1$2>')
            .replace(/&lt;br\s*\/?&gt;/g, '<br>');
    }
    /* Mark memory-palace stops: wraps **Stop** into styled span */
    function palaceRich(s) {
        return rich(s).replace(/\*\*(.+?)\*\*/g, '<span class="mc-stop">$1</span>');
    }

    function sec(num, icon, label, inner) {
        return '' +
            '<div class="mc-sec">' +
              '<span class="mc-sec-label"><span class="mc-num">' + num + '</span>' + icon + ' ' + label + '</span>' +
              inner +
            '</div>';
    }

    function buildKit(k) {
        var h = '';
        h += '<div class="mc-kit" role="region" aria-label="Memory coach kit">';
        h += '<div class="mc-kit-header"><span class="mc-brain">🧠</span>' +
             '<span class="mc-kit-title">Never-Forget Memory Kit</span>' +
             '<span class="mc-kit-sub">Memory Champion Mode</span></div>';
        h += '<div class="mc-kit-body">';

        if (k.lines && k.lines.length) {
            h += sec(1, '📖', 'The Topic in 5 Lines',
                '<ul class="mc-lines">' + k.lines.map(function (l) { return '<li>' + rich(l) + '</li>'; }).join('') + '</ul>');
        }
        if (k.story) {
            h += sec(2, '🎬', 'The Crazy Story (link it & never forget it)',
                '<div class="mc-story">' + rich(k.story) + '</div>');
        }
        if (k.mnemonic) {
            var m = k.mnemonic;
            var wordHtml = esc(m.word).split('').map(function (c, i) {
                return (i % 2 === 0) ? '<span>' + c + '</span>' : c;
            }).join('');
            var parts = (m.parts || []).map(function (p) { return esc(p); }).join(' · ');
            h += sec(3, '🔤', 'Power Mnemonic',
                '<div class="mc-mnemonic"><div class="mc-word">' + wordHtml + '</div>' +
                (parts ? '<div class="mc-break">' + parts + '</div>' : '') +
                (m.local ? '<div class="mc-local">🗣️ ' + esc(m.local) + '</div>' : '') +
                '</div>');
        }
        if (k.palace) {
            h += sec(4, '🏰', 'Memory Palace — walk through it',
                '<div class="mc-palace">' + palaceRich(k.palace) + '</div>');
        }
        if (k.terms && k.terms.length) {
            h += sec(5, '🎭', 'Hard Terms → Easy Pictures',
                '<div class="mc-terms">' + k.terms.map(function (t) {
                    return '<div class="mc-term"><span class="mc-t">' + esc(t[0]) + '</span><span class="mc-arrow">→</span><span>' + rich(t[1]) + '</span></div>';
                }).join('') + '</div>');
        }
        if (k.diagram) {
            h += sec(6, '✏️', '30-Second Exam Diagram (redraw this)',
                '<pre class="mc-diagram">' + esc(k.diagram) + '</pre>' +
                (k.dcap ? '<div class="mc-diagram-caption">' + esc(k.dcap) + '</div>' : ''));
        }
        if (k.why && k.why.length) {
            h += sec(7, '💡', 'The “Why” — so it makes sense, not rote',
                '<ul class="mc-why">' + k.why.map(function (w) { return '<li>' + rich(w) + '</li>'; }).join('') + '</ul>');
        }
        if (k.recall) {
            h += sec(8, '⏱️', '10-Second Recall Challenge',
                '<div class="mc-recall"><div class="mc-timer">0:10</div>' +
                '<p>Close your eyes. Recite the whole topic out loud in 10 seconds — <b>no peeking</b>. Then tap to check.</p>' +
                '<button type="button" class="mc-recall-toggle">Reveal answer</button>' +
                '<div class="mc-recall-answer">' + rich(k.recall) + '</div></div>');
        }
        if (k.viva && k.viva.length) {
            h += sec(9, '🎤', 'Viva — active recall questions',
                '<div class="mc-viva"><ol>' + k.viva.map(function (v) { return '<li>' + rich(v) + '</li>'; }).join('') + '</ol></div>');
        }
        if (k.mcq && k.mcq.length) {
            var letters = ['A', 'B', 'C', 'D'];
            h += sec(10, '✅', 'MCQs — test yourself',
                '<div class="mc-mcq"><ol>' + k.mcq.map(function (m) {
                    var opts = m.opts.map(function (o, i) { return letters[i] + ') ' + o; }).join(' &nbsp; ');
                    return '<li><span class="mc-q">' + rich(m.q) + '</span>' +
                           '<span class="mc-opts">' + esc(opts) + '</span>' +
                           '<span class="mc-ans">Ans: ' + letters[m.a] + ' — ' + esc(m.opts[m.a]) + '</span></li>';
                }).join('') + '</ol></div>');
        }
        if (k.drill && k.drill.length) {
            h += sec(11, '🔁', 'Key-Word Drill (say each 3×)',
                '<div class="mc-drill">' + k.drill.map(function (d) { return '<span class="mc-chip">' + esc(d) + '</span>'; }).join('') + '</div>');
        }

        h += '</div></div>';
        return h;
    }

    function wireRecall(root) {
        root.querySelectorAll('.mc-recall-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var box = btn.closest('.mc-recall');
                if (!box) return;
                box.classList.toggle('open');
                btn.textContent = box.classList.contains('open') ? 'Hide answer' : 'Reveal answer';
            });
        });
    }

    /* Public: called by app.js after answer injection. */
    window.injectMemoryCoach = function (container, q) {
        if (!container || !q) return;
        // de-dupe
        container.querySelectorAll('.mc-kit').forEach(function (n) { n.remove(); });
        var kits = window.MEMORY_KITS || {};
        var kit = kits[q.id];
        if (!kit) return;
        var wrap = document.createElement('div');
        wrap.innerHTML = buildKit(kit);
        var node = wrap.firstElementChild || wrap.firstChild || wrap;
        container.appendChild(node);
        wireRecall(node);
    };
})();
