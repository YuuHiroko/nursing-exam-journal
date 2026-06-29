/* ════════════════════════════════════════════════════════════════
   THE NURSING EXAM JOURNAL — PDF EXPORT SYSTEM (Phase 1 · Free)

   A professional, fully-offline "export to PDF" engine built on the
   browser's NATIVE print pipeline. This guarantees:
     • Real, searchable, selectable, copyable text (never screenshots)
     • Faithful Material Design 3 typography, tables, flowcharts,
       diagrams and images (it reuses the app's own index.css)
     • Zero dependencies / works 100% offline

   Modules (kept independent of the auth system):
     • ExportManager            — permission gate (future-ready)
     • CoverPageGenerator       — professional cover page
     • TableOfContentsGenerator — clickable, anchored contents
     • LayoutEngine             — assembles the printable document
     • PrintRenderer            — drives window.print() + cleanup
     • ExportDialog             — Material Design 3 options dialog
     • PDFManager               — orchestrator / public entry point

   Public API:  window.PDFExport.open()
   ════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';

    var APP_VERSION = 'Vol. 01 · 2026';
    var ROOT_ID = 'pdf-print-root';
    var STYLE_ID = 'pdf-export-styles';

    /* ----------------------------------------------------------------
       ExportManager — single source of truth for "may the user export?"
       Currently always true. Designed so authentication / premium /
       licence / subscription checks can be added later WITHOUT touching
       the rendering engine.
    ---------------------------------------------------------------- */
    var ExportManager = {
        canExport: function () { return true; },
        reason: function () { return null; }
    };

    /* ---------------------------------------------------------------- */
    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function api() { return window.ExamApp || {}; }
    function qKey(q) { return q.unit + '-' + q.id; }
    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    var UNIT_FULL = {
        1: 'Unit I — Introduction to Midwifery',
        2: 'Unit II — Anatomy & Physiology of Reproduction',
        3: 'Unit III — Normal Pregnancy (Antenatal Care)',
        4: 'Unit IV — Labour & Birth',
        5: 'Unit V — Postpartum Care',
        6: 'Unit VI — Care of the Normal Neonate',
        7: 'Unit VII — Family Welfare Services',
        8: 'OBG-II Unit I — High-Risk Pregnancy',
        9: 'OBG-II Units II & III — Abnormal Labour & Postnatal Problems',
        10: 'OBG-II Unit IV — High-Risk Newborn',
        11: 'OBG-II Unit V — Gynaecological Disorders'
    };
    function unitFull(u) { return UNIT_FULL[u] || ('Unit ' + u); }
    function isOBG2(u) { return Number(u) >= 8; }
    function subjectOf(u) {
        return isOBG2(u)
            ? 'Obstetrics & Gynaecological Nursing II (High-Risk & Abnormal)'
            : 'Midwifery & Obstetrical Nursing II';
    }
    // "Important" = a question repeated across multiple past exams.
    function isImportant(q) { return Number(q.repeated) >= 2; }

    /* ----------------------------------------------------------------
       Question collection per export scope.
    ---------------------------------------------------------------- */
    function collectQuestions(scope) {
        var A = api();
        var all = (A.getAllQuestions ? A.getAllQuestions() : []) || [];
        var cur = A.getCurrentQuestion ? A.getCurrentQuestion() : null;
        var activeUnit = A.getActiveUnit ? A.getActiveUnit() : 'all';

        switch (scope) {
            case 'current-answer':
                return cur ? [cur] : [];
            case 'current-unit': {
                var u = cur ? cur.unit : activeUnit;
                if (u === 'all' || u == null) return all.slice();
                return all.filter(function (q) { return q.unit == u; });
            }
            case 'entire-subject': {
                var u2 = cur ? cur.unit : activeUnit;
                var obg = isOBG2(u2 === 'all' ? 1 : u2);
                return all.filter(function (q) { return isOBG2(q.unit) === obg; });
            }
            case 'bookmarked':
                return all.filter(function (q) { return A.isStarred && A.isStarred(q); });
            case 'completed':
                return all.filter(function (q) { return A.isDone && A.isDone(q); });
            case 'important':
                return all.filter(isImportant);
            case 'all':
            default:
                return all.slice();
        }
    }

    // Stable ordering: unit ascending, then by id.
    function sortQuestions(qs) {
        return qs.slice().sort(function (a, b) {
            if (a.unit !== b.unit) return Number(a.unit) - Number(b.unit);
            return Number(a.id) - Number(b.id);
        });
    }

    /* ----------------------------------------------------------------
       CoverPageGenerator
    ---------------------------------------------------------------- */
    var CoverPageGenerator = {
        build: function (meta) {
            return '' +
            '<section class="pdf-cover">' +
                '<div class="pdf-cover-rule"></div>' +
                '<div class="pdf-cover-kicker">THE NURSING EXAM JOURNAL</div>' +
                '<h1 class="pdf-cover-title">' + esc(meta.title) + '</h1>' +
                '<div class="pdf-cover-subject">' + esc(meta.subject) + '</div>' +
                '<div class="pdf-cover-rule"></div>' +
                '<dl class="pdf-cover-meta">' +
                    '<div><dt>Scope</dt><dd>' + esc(meta.scopeLabel) + '</dd></div>' +
                    '<div><dt>Unit</dt><dd>' + esc(meta.unitLabel) + '</dd></div>' +
                    '<div><dt>Questions</dt><dd>' + esc(meta.count) + '</dd></div>' +
                    '<div><dt>Exported</dt><dd>' + esc(meta.date) + '</dd></div>' +
                    '<div><dt>Edition</dt><dd>' + esc(meta.version) + '</dd></div>' +
                '</dl>' +
                '<div class="pdf-cover-footer">MUHS B.Sc Nursing · Curated model answers for exam scoring</div>' +
            '</section>';
        }
    };

    /* ----------------------------------------------------------------
       TableOfContentsGenerator — clickable anchored contents.
       (Chrome's "Save as PDF" preserves internal #anchor links.)
    ---------------------------------------------------------------- */
    var TableOfContentsGenerator = {
        build: function (qs) {
            var rows = qs.map(function (q, i) {
                var anchor = 'pdf-q-' + qKey(q);
                var title = String(q.question || '').replace(/<[^>]+>/g, '');
                if (title.length > 110) title = title.slice(0, 110) + '…';
                return '' +
                '<li class="pdf-toc-row">' +
                    '<a class="pdf-toc-link" href="#' + anchor + '">' +
                        '<span class="pdf-toc-num">' + (i + 1) + '.</span>' +
                        '<span class="pdf-toc-text">' + esc(title) + '</span>' +
                        '<span class="pdf-toc-marks">' + esc(q.marks) + 'm</span>' +
                    '</a>' +
                '</li>';
            }).join('');
            return '' +
            '<section class="pdf-toc">' +
                '<h2 class="pdf-toc-heading">Table of Contents</h2>' +
                '<ol class="pdf-toc-list">' + rows + '</ol>' +
            '</section>';
        }
    };

    /* ----------------------------------------------------------------
       LayoutEngine — builds the full printable document into #pdf-print-root.
    ---------------------------------------------------------------- */
    var LayoutEngine = {
        getRoot: function () {
            var root = document.getElementById(ROOT_ID);
            if (!root) {
                root = document.createElement('div');
                root.id = ROOT_ID;
                root.setAttribute('aria-hidden', 'true');
                document.body.appendChild(root);
            }
            return root;
        },

        clear: function () {
            var root = document.getElementById(ROOT_ID);
            if (root) root.innerHTML = '';
        },

        buildDocument: function (qs, opts, meta) {
            var root = this.getRoot();
            root.innerHTML = '';

            // Theme + include toggles applied as classes for print CSS to act on.
            root.className = 'pdf-theme-' + opts.theme +
                (opts.images ? '' : ' pdf-no-images') +
                (opts.flowcharts ? '' : ' pdf-no-flowcharts') +
                (opts.diagrams ? '' : ' pdf-no-diagrams') +
                (opts.learnAbout ? '' : ' pdf-no-learnabout');
            root.setAttribute('data-paper', opts.paper);

            var html = '';
            if (opts.cover) html += CoverPageGenerator.build(meta);
            if (opts.toc && qs.length > 1) html += TableOfContentsGenerator.build(qs);

            // Question sections — each starts on a fresh page.
            html += qs.map(function (q, i) {
                var anchor = 'pdf-q-' + qKey(q);
                return '' +
                '<article class="pdf-question" id="' + anchor + '">' +
                    '<header class="pdf-q-head">' +
                        '<span class="pdf-q-index">Q' + (i + 1) + '</span>' +
                        '<span class="pdf-q-badges">' +
                            '<span class="pdf-q-badge pdf-q-marks">' + esc(q.marks) + ' MARKS</span>' +
                            '<span class="pdf-q-badge pdf-q-unit">' + esc(unitFull(q.unit)) + '</span>' +
                            '<span class="pdf-q-badge pdf-q-rep">Repeated ' + esc(q.repeated) + '× · ' + esc(q.years) + '</span>' +
                        '</span>' +
                    '</header>' +
                    '<h3 class="pdf-q-title">' + (q.question || '') + '</h3>' +
                    '<div class="pdf-q-answer" data-answer-for="' + anchor + '">' + (q.answer || '') + '</div>' +
                '</article>';
            }).join('');

            root.innerHTML = html;

            // Render data-diagram slots inside the print root (if enabled).
            if (opts.diagrams && typeof window.activateDiagrams === 'function') {
                try { window.activateDiagrams(); } catch (e) {}
            }

            // Inject "Learn About" study modules per question (if enabled).
            if (opts.learnAbout && typeof window.injectLearnAbout === 'function') {
                var sections = root.querySelectorAll('.pdf-q-answer');
                for (var k = 0; k < sections.length; k++) {
                    try { window.injectLearnAbout(sections[k], qs[k]); } catch (e) {}
                }
            }

            return root;
        }
    };

    // Wait for every image inside the print root to finish loading so the
    // browser paginates with real heights (prevents blank/cut images).
    function preloadImages(root) {
        var imgs = Array.prototype.slice.call(root.querySelectorAll('img'));
        if (!imgs.length) return Promise.resolve();
        return Promise.all(imgs.map(function (img) {
            if (img.complete && img.naturalWidth > 0) return Promise.resolve();
            return new Promise(function (resolve) {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
                setTimeout(resolve, 4000); // safety timeout
            });
        }));
    }

    /* ----------------------------------------------------------------
       PrintRenderer — flips the document into print mode and prints.
    ---------------------------------------------------------------- */
    var PrintRenderer = {
        _wasDark: false,
        _bound: false,

        print: function () {
            var html = document.documentElement;
            // Force a clean LIGHT palette for the PDF regardless of screen theme.
            this._wasDark = html.classList.contains('dark');
            if (this._wasDark) html.classList.remove('dark');
            document.body.classList.add('pdf-printing');

            if (!this._bound) {
                this._bound = true;
                var self = this;
                window.addEventListener('afterprint', function () { self.cleanup(); });
            }
            // Defer to allow the layout flip + light palette to settle.
            var self2 = this;
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    try { window.print(); }
                    catch (e) { self2.cleanup(); }
                });
            });
        },

        cleanup: function () {
            document.body.classList.remove('pdf-printing');
            if (this._wasDark) document.documentElement.classList.add('dark');
            this._wasDark = false;
            LayoutEngine.clear();
        }
    };

    /* ----------------------------------------------------------------
       Progress overlay (Preparing → … → Finalizing).
    ---------------------------------------------------------------- */
    var Progress = {
        el: null,
        ensure: function () {
            if (this.el) return this.el;
            var o = document.createElement('div');
            o.className = 'pdf-progress';
            o.setAttribute('role', 'status');
            o.setAttribute('aria-live', 'polite');
            o.innerHTML =
                '<div class="pdf-progress-card">' +
                    '<md-circular-progress indeterminate aria-hidden="true"></md-circular-progress>' +
                    '<div class="pdf-progress-title">Preparing PDF</div>' +
                    '<div class="pdf-progress-step" id="pdf-progress-step">Starting…</div>' +
                '</div>';
            document.body.appendChild(o);
            this.el = o;
            return o;
        },
        show: function () { this.ensure().classList.add('is-open'); },
        step: function (text) {
            this.ensure();
            var s = document.getElementById('pdf-progress-step');
            if (s) s.textContent = text;
        },
        hide: function () { if (this.el) this.el.classList.remove('is-open'); }
    };

    /* ----------------------------------------------------------------
       PDFManager — orchestrates a single export run.
    ---------------------------------------------------------------- */
    var PDFManager = {
        run: function (opts) {
            if (!ExportManager.canExport()) {
                toast(ExportManager.reason() || 'Export is not available.', 'error');
                return;
            }

            var A = api();
            var needsOBG2 = (opts.scope === 'entire-subject' || opts.scope === 'all' ||
                             opts.scope === 'important' || opts.scope === 'bookmarked' ||
                             opts.scope === 'completed');

            var proceed = function () {
                Progress.show();
                Progress.step('Collecting questions…');
                wait(140).then(function () {
                    var qs = sortQuestions(collectQuestions(opts.scope));
                    if (!qs.length) {
                        Progress.hide();
                        toast('No questions match this selection.', 'info');
                        return;
                    }

                    var first = qs[0];
                    var units = {};
                    qs.forEach(function (q) { units[q.unit] = true; });
                    var unitKeys = Object.keys(units);
                    var unitLabel = unitKeys.length === 1
                        ? unitFull(first.unit)
                        : (unitKeys.length + ' units');

                    var meta = {
                        title: SCOPE_TITLES[opts.scope] || 'Study Compilation',
                        subject: subjectOf(first.unit),
                        scopeLabel: SCOPE_LABELS[opts.scope] || 'Custom Selection',
                        unitLabel: unitLabel,
                        count: qs.length + (qs.length === 1 ? ' question' : ' questions'),
                        date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
                        version: APP_VERSION
                    };

                    Progress.step('Rendering pages…');
                    return wait(140).then(function () {
                        var root = LayoutEngine.buildDocument(qs, opts, meta);
                        Progress.step('Optimizing layout…');
                        return wait(140).then(function () {
                            Progress.step('Generating table of contents…');
                            return wait(120).then(function () {
                                Progress.step('Finalizing PDF…');
                                return preloadImages(root).then(function () {
                                    Progress.hide();
                                    PrintRenderer.print();
                                });
                            });
                        });
                    });
                }).catch(function (err) {
                    Progress.hide();
                    if (window.console) console.log('[v0] PDF export error:', err);
                    toast('Could not generate the PDF. Please try again.', 'error');
                });
            };

            if (needsOBG2 && typeof A.ensureOBG2 === 'function') {
                Progress.show();
                Progress.step('Loading question bank…');
                A.ensureOBG2(function () { proceed(); });
            } else {
                proceed();
            }
        }
    };

    var SCOPE_TITLES = {
        'current-answer': 'Model Answer',
        'current-unit': 'Unit Compilation',
        'entire-subject': 'Complete Subject Guide',
        'bookmarked': 'Bookmarked Questions',
        'completed': 'Completed Questions',
        'important': 'Most Important Questions',
        'all': 'Full Question Bank'
    };
    var SCOPE_LABELS = {
        'current-answer': 'Current Answer',
        'current-unit': 'Current Unit',
        'entire-subject': 'Entire Subject',
        'bookmarked': 'Bookmarked Questions',
        'completed': 'Completed Questions',
        'important': 'Important Questions',
        'all': 'All Questions'
    };

    /* ----------------------------------------------------------------
       ExportDialog — Material Design 3 options dialog.
    ---------------------------------------------------------------- */
    var ExportDialog = {
        dialog: null,   // the overlay element
        card: null,

        build: function () {
            if (this.dialog) return this.dialog;

            function chk(id, label, checked) {
                return '<label class="pdf-check">' +
                    '<md-checkbox id="pdf-' + id + '" ' + (checked ? 'checked' : '') + ' touch-target="wrapper"></md-checkbox>' +
                    '<span>' + label + '</span></label>';
            }

            var overlay = document.createElement('div');
            overlay.id = 'pdf-export-dialog';
            overlay.className = 'pdf-dialog-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'pdf-dialog-headline');
            overlay.innerHTML = '' +
                '<div class="pdf-dialog-card" role="document">' +
                    '<h2 class="pdf-dialog-headline" id="pdf-dialog-headline">' +
                        '<md-icon aria-hidden="true">picture_as_pdf</md-icon>Export PDF</h2>' +
                    '<div class="pdf-dialog-body">' +
                        '<p class="pdf-field-note" id="pdf-subject-note"></p>' +

                        '<label class="pdf-field-label" for="pdf-scope">Export</label>' +
                        '<select class="pdf-select" id="pdf-scope"></select>' +

                        '<label class="pdf-field-label">Include</label>' +
                        '<div class="pdf-checks">' +
                            chk('inc-learn', 'Learn About modules', true) +
                            chk('inc-diagrams', 'Diagrams', true) +
                            chk('inc-flow', 'Flowcharts', true) +
                            chk('inc-images', 'Images', true) +
                            chk('inc-toc', 'Table of Contents', true) +
                            chk('inc-cover', 'Cover Page', true) +
                        '</div>' +

                        '<div class="pdf-row">' +
                            '<div class="pdf-col">' +
                                '<label class="pdf-field-label" for="pdf-theme">Theme</label>' +
                                '<select class="pdf-select" id="pdf-theme">' +
                                    '<option value="color">Full Color</option>' +
                                    '<option value="print">Print Friendly</option>' +
                                    '<option value="contrast">High Contrast</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="pdf-col">' +
                                '<label class="pdf-field-label" for="pdf-paper">Paper Size</label>' +
                                '<select class="pdf-select" id="pdf-paper">' +
                                    '<option value="a4">A4</option>' +
                                    '<option value="letter">Letter</option>' +
                                '</select>' +
                            '</div>' +
                        '</div>' +

                        '<p class="pdf-tip">Tip: in the print dialog choose <strong>\u201CSave as PDF\u201D</strong>, and enable <strong>\u201CHeaders and footers\u201D</strong> for page numbers.</p>' +
                    '</div>' +
                    '<div class="pdf-dialog-actions">' +
                        '<md-text-button id="pdf-cancel">Cancel</md-text-button>' +
                        '<md-filled-button id="pdf-confirm">' +
                            '<md-icon slot="icon">picture_as_pdf</md-icon>Export PDF' +
                        '</md-filled-button>' +
                    '</div>' +
                '</div>';

            document.body.appendChild(overlay);
            this.dialog = overlay;
            this.card = overlay.querySelector('.pdf-dialog-card');

            var self = this;
            // Confirm.
            overlay.querySelector('#pdf-confirm').addEventListener('click', function () {
                var opts = self.readOptions();
                self.close();
                setTimeout(function () { PDFManager.run(opts); }, 60);
            });
            // Cancel.
            overlay.querySelector('#pdf-cancel').addEventListener('click', function () { self.close(); });
            // Backdrop click closes.
            overlay.addEventListener('mousedown', function (e) {
                if (e.target === overlay) self.close();
            });
            // Esc closes.
            overlay.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') { e.stopPropagation(); self.close(); }
            });

            return overlay;
        },

        close: function () {
            if (!this.dialog) return;
            this.dialog.classList.remove('is-open');
            document.body.classList.remove('pdf-dialog-lock');
        },

        // Populate the scope <select> based on whether a reader is open.
        refreshScopes: function () {
            var A = api();
            var modalOpen = A.isModalOpen ? A.isModalOpen() : false;
            var activeUnit = A.getActiveUnit ? A.getActiveUnit() : 'all';
            var sel = this.dialog.querySelector('#pdf-scope');
            var note = this.dialog.querySelector('#pdf-subject-note');

            var opts = [];
            if (modalOpen) opts.push(['current-answer', 'Current Answer']);
            opts.push(['current-unit', 'Current Unit']);
            opts.push(['entire-subject', 'Entire Subject']);
            opts.push(['important', 'Important Questions']);
            opts.push(['bookmarked', 'Bookmarked Questions']);
            opts.push(['completed', 'Completed Questions']);
            opts.push(['all', 'All Questions']);

            sel.innerHTML = opts.map(function (o) {
                return '<option value="' + o[0] + '">' + o[1] + '</option>';
            }).join('');

            // Sensible default.
            sel.value = modalOpen ? 'current-answer'
                : (activeUnit === 'all' ? 'entire-subject' : 'current-unit');

            // Subject hint.
            var cur = A.getCurrentQuestion ? A.getCurrentQuestion() : null;
            var refUnit = cur ? cur.unit : (activeUnit === 'all' ? 1 : activeUnit);
            if (note) note.textContent = 'Subject: ' + subjectOf(refUnit);
        },

        readOptions: function () {
            var d = this.dialog;
            var val = function (id) { var n = d.querySelector(id); return n ? n.value : ''; };
            var on = function (id) { var n = d.querySelector(id); return !!(n && n.checked); };
            return {
                scope: val('#pdf-scope'),
                theme: val('#pdf-theme'),
                paper: val('#pdf-paper'),
                learnAbout: on('#pdf-inc-learn'),
                diagrams: on('#pdf-inc-diagrams'),
                flowcharts: on('#pdf-inc-flow'),
                images: on('#pdf-inc-images'),
                toc: on('#pdf-inc-toc'),
                cover: on('#pdf-inc-cover')
            };
        },

        open: function () {
            if (!ExportManager.canExport()) {
                toast(ExportManager.reason() || 'Export is not available.', 'error');
                return;
            }
            this.build();
            this.refreshScopes();
            this.dialog.classList.add('is-open');
            document.body.classList.add('pdf-dialog-lock');
            // Focus the primary action for accessibility.
            var confirm = this.dialog.querySelector('#pdf-confirm');
            if (confirm && confirm.focus) { try { confirm.focus(); } catch (e) {} }
        }
    };

    /* ---------------------------------------------------------------- */
    function toast(msg, type) {
        if (typeof window.toast === 'function') window.toast(msg, type);
        else if (window.console) console.log('[v0] ' + msg);
    }

    /* ----------------------------------------------------------------
       Inject print + dialog styles once.
    ---------------------------------------------------------------- */
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var css = PRINT_CSS;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.head.appendChild(style);
    }

    /* ----------------------------------------------------------------
       Public bootstrap + button wiring.
    ---------------------------------------------------------------- */
    function wireButtons() {
        var toolbarBtn = document.getElementById('export-pdf-toolbar');
        if (toolbarBtn) toolbarBtn.addEventListener('click', function () { ExportDialog.open(); });

        var modalBtn = document.getElementById('export-pdf-modal');
        if (modalBtn) modalBtn.addEventListener('click', function () { ExportDialog.open(); });
    }

    window.PDFExport = {
        open: function () { ExportDialog.open(); },
        canExport: function () { return ExportManager.canExport(); }
    };

    function init() {
        injectStyles();
        wireButtons();
    }

    /* ════════════════════════════════════════════════════════════════
       PRINT + DIALOG CSS
    ════════════════════════════════════════════════════════════════ */
    var PRINT_CSS = [
        /* The printable document is hidden on screen; only shown when printing. */
        '#' + ROOT_ID + '{display:none;}',

        /* ---- Options dialog (custom overlay so layout is fully controlled) ---- */
        'body.pdf-dialog-lock{overflow:hidden;}',
        '.pdf-dialog-overlay{position:fixed;inset:0;z-index:2900;display:none;align-items:center;justify-content:center;padding:1.5rem;background:rgba(20,20,28,.5);backdrop-filter:blur(2px);}',
        '.pdf-dialog-overlay.is-open{display:flex;}',
        '.pdf-dialog-card{width:100%;max-width:540px;max-height:88vh;display:flex;flex-direction:column;background:var(--md-sys-color-surface,#fbf8ff);color:var(--md-sys-color-on-surface,#1b1b21);border-radius:24px;box-shadow:0 16px 48px rgba(0,0,0,.32);overflow:hidden;}',
        '.pdf-dialog-headline{display:flex;align-items:center;gap:.5rem;margin:0;padding:1.4rem 1.5rem .8rem;font:700 1.4rem/1.2 var(--font-serif,Georgia,serif);color:var(--md-sys-color-on-surface,#1b1b21);}',
        '.pdf-dialog-headline md-icon{color:var(--md-sys-color-tertiary,#c01975);}',
        '.pdf-dialog-body{flex:1;overflow-y:auto;padding:0 1.5rem .5rem;}',
        '.pdf-dialog-actions{display:flex;justify-content:flex-end;gap:.5rem;padding:1rem 1.5rem 1.3rem;border-top:1px solid var(--md-sys-color-outline-variant,#c7c5d0);}',
        '.pdf-field-note{margin:0 0 .75rem;font:600 .8rem/1.4 var(--font-mono,monospace);letter-spacing:.04em;color:var(--md-sys-color-tertiary,#c01975);text-transform:uppercase;}',
        '.pdf-field-label{display:block;margin:1rem 0 .4rem;font:600 .7rem/1.2 var(--font-mono,monospace);letter-spacing:.12em;text-transform:uppercase;color:var(--md-sys-color-on-surface-variant,#46464f);}',
        '.pdf-select{width:100%;padding:.6rem .75rem;font-size:.95rem;color:var(--md-sys-color-on-surface,#1b1b21);background:var(--md-sys-color-surface-container-low,#f5f2fa);border:1px solid var(--md-sys-color-outline-variant,#c7c5d0);border-radius:8px;appearance:none;cursor:pointer;}',
        '.pdf-select:focus{outline:2px solid var(--md-sys-color-primary,#4a52cc);outline-offset:1px;}',
        '.pdf-checks{display:grid;grid-template-columns:1fr 1fr;gap:.25rem .5rem;}',
        '.pdf-check{display:flex;align-items:center;gap:.4rem;font-size:.92rem;color:var(--md-sys-color-on-surface,#1b1b21);}',
        '.pdf-row{display:flex;gap:1rem;}.pdf-col{flex:1;min-width:0;}',
        '.pdf-tip{margin:1.1rem 0 0;font-size:.78rem;line-height:1.5;color:var(--md-sys-color-on-surface-variant,#46464f);background:var(--md-sys-color-surface-container,#efedf4);padding:.6rem .75rem;border-radius:8px;}',

        /* ---- Progress overlay ---- */
        '.pdf-progress{position:fixed;inset:0;z-index:3000;display:none;align-items:center;justify-content:center;background:rgba(20,20,28,.55);backdrop-filter:blur(2px);}',
        '.pdf-progress.is-open{display:flex;}',
        '.pdf-progress-card{background:var(--md-sys-color-surface,#fff);color:var(--md-sys-color-on-surface,#1b1b21);padding:2rem 2.5rem;border-radius:16px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.3);min-width:260px;}',
        '.pdf-progress-card md-circular-progress{margin:0 auto .9rem;--md-circular-progress-size:48px;}',
        '.pdf-progress-title{font:700 1.05rem/1.2 var(--font-sans,sans-serif);margin-bottom:.3rem;}',
        '.pdf-progress-step{font:500 .85rem/1.4 var(--font-mono,monospace);color:var(--md-sys-color-on-surface-variant,#46464f);}',

        /* ================= PRINT MODE ================= */
        '@media print{',
            '@page{size:A4;margin:16mm 14mm;}',
            'body.pdf-printing > *:not(#' + ROOT_ID + '){display:none !important;}',
            'body.pdf-printing{background:#fff !important;overflow:visible !important;}',
            '#' + ROOT_ID + '{display:block !important;color:#111;background:#fff;font-family:var(--font-sans,"Inter",sans-serif);}',
            '#' + ROOT_ID + '[data-paper="letter"]{}',

            /* Cover page */
            '.pdf-cover{break-after:page;page-break-after:always;min-height:90vh;display:flex;flex-direction:column;justify-content:center;text-align:center;padding:2rem;}',
            '.pdf-cover-rule{height:3px;background:#111;margin:1.2rem auto;width:60%;}',
            '.pdf-cover-kicker{font:700 .8rem/1.2 var(--font-mono,monospace);letter-spacing:.32em;text-transform:uppercase;color:#c01975;}',
            '.pdf-cover-title{font:800 2.6rem/1.1 var(--font-serif,Georgia,serif);margin:1.4rem 0 .6rem;color:#111;}',
            '.pdf-cover-subject{font:500 1.15rem/1.4 var(--font-sans,sans-serif);color:#333;}',
            '.pdf-cover-meta{display:grid;grid-template-columns:1fr 1fr;gap:.6rem 2rem;max-width:460px;margin:1.5rem auto 0;text-align:left;}',
            '.pdf-cover-meta div{border-bottom:1px solid #ddd;padding:.35rem 0;}',
            '.pdf-cover-meta dt{font:600 .65rem/1.2 var(--font-mono,monospace);letter-spacing:.14em;text-transform:uppercase;color:#888;}',
            '.pdf-cover-meta dd{margin:.15rem 0 0;font-size:.95rem;color:#111;}',
            '.pdf-cover-footer{margin-top:2.5rem;font:500 .8rem/1.4 var(--font-mono,monospace);color:#999;}',

            /* Table of contents */
            '.pdf-toc{break-after:page;page-break-after:always;}',
            '.pdf-toc-heading{font:800 1.8rem/1.2 var(--font-serif,Georgia,serif);border-bottom:3px solid #111;padding-bottom:.5rem;margin:0 0 1.2rem;}',
            '.pdf-toc-list{list-style:none;margin:0;padding:0;counter-reset:none;}',
            '.pdf-toc-row{break-inside:avoid;}',
            '.pdf-toc-link{display:flex;align-items:baseline;gap:.6rem;text-decoration:none;color:#111;padding:.4rem 0;border-bottom:1px dotted #ccc;}',
            '.pdf-toc-num{font:700 .9rem/1.3 var(--font-mono,monospace);color:#c01975;min-width:2.2em;}',
            '.pdf-toc-text{flex:1;font-size:.95rem;line-height:1.4;}',
            '.pdf-toc-marks{font:600 .7rem/1.2 var(--font-mono,monospace);color:#666;white-space:nowrap;}',

            /* Question sections */
            '.pdf-question{break-before:page;page-break-before:always;padding-top:.2rem;}',
            '.pdf-question:first-of-type{break-before:auto;page-break-before:auto;}',
            '.pdf-q-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;border-bottom:2px solid #111;padding-bottom:.5rem;margin-bottom:.8rem;}',
            '.pdf-q-index{font:800 1.4rem/1 var(--font-serif,Georgia,serif);color:#c01975;}',
            '.pdf-q-badges{display:flex;flex-wrap:wrap;gap:.3rem;justify-content:flex-end;}',
            '.pdf-q-badge{font:600 .6rem/1.3 var(--font-mono,monospace);letter-spacing:.08em;text-transform:uppercase;padding:.2rem .45rem;border-radius:4px;border:1px solid #ccc;color:#333;}',
            '.pdf-q-marks{background:#111;color:#fff;border-color:#111;}',
            '.pdf-q-unit{background:#ffd8e7;color:#3e0023;border-color:#ffd8e7;}',
            '.pdf-q-title{font:700 1.15rem/1.4 var(--font-sans,sans-serif);color:#111;margin:0 0 1rem;}',

            /* Never split these blocks across a page break */
            '.pdf-q-answer table,.pdf-q-answer .answer-table-wrap,.pdf-q-answer .answer-table,.pdf-q-answer .flowchart,.pdf-q-answer .figure-block,.pdf-q-answer .definition-box,.pdf-q-answer .keyword-box,.pdf-q-answer .dont-confuse,.pdf-q-answer .exam-tip,.pdf-q-answer .in-short,.pdf-q-answer .la-embed,.pdf-q-answer .answer-section{break-inside:avoid;page-break-inside:avoid;}',
            '.pdf-q-answer h3{break-after:avoid;page-break-after:avoid;}',
            '.pdf-q-answer img{max-width:100% !important;height:auto !important;}',

            /* Kill on-screen animations during print so content is fully visible */
            '#' + ROOT_ID + ' *{animation:none !important;transition:none !important;opacity:1 !important;transform:none !important;}',

            /* Include toggles */
            '.pdf-no-images .figure-block,.pdf-no-images img{display:none !important;}',
            '.pdf-no-flowcharts .flowchart{display:none !important;}',
            '.pdf-no-diagrams [data-diagram],.pdf-no-diagrams .diagram-figure,.pdf-no-diagrams svg{display:none !important;}',
            '.pdf-no-learnabout .la-embed{display:none !important;}',

            /* Print-friendly theme: drop heavy fills/shadows to save ink */
            '.pdf-theme-print .definition-box,.pdf-theme-print .keyword-box,.pdf-theme-print .dont-confuse,.pdf-theme-print .exam-tip,.pdf-theme-print .in-short,.pdf-theme-print .flowchart{background:#fff !important;box-shadow:none !important;border:1px solid #999 !important;}',
            '.pdf-theme-print .pdf-q-unit{background:#fff !important;color:#111 !important;border-color:#999 !important;}',
            '.pdf-theme-print *{box-shadow:none !important;}',

            /* High-contrast theme: bold black structure */
            '.pdf-theme-contrast{color:#000 !important;}',
            '.pdf-theme-contrast .pdf-q-answer table,.pdf-theme-contrast .pdf-q-answer th,.pdf-theme-contrast .pdf-q-answer td,.pdf-theme-contrast .definition-box,.pdf-theme-contrast .keyword-box,.pdf-theme-contrast .dont-confuse,.pdf-theme-contrast .exam-tip,.pdf-theme-contrast .in-short,.pdf-theme-contrast .flowchart{border:2px solid #000 !important;background:#fff !important;color:#000 !important;}',
            '.pdf-theme-contrast .answer-text,.pdf-theme-contrast li,.pdf-theme-contrast p{color:#000 !important;}',
        '}'
    ].join('\n');

    /* Boot — runs after PRINT_CSS is defined so injectStyles() always has the CSS. */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
