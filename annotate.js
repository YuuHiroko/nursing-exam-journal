// ════════════════════════════════════════════════════════════════
// ANNOTATION TOOLBAR — Pen / Highlighter / Eraser for Answer Reader
// Floating bottom pill, auto-save per question to localStorage.
// ════════════════════════════════════════════════════════════════

(function () {
    'use strict';

    // ── Constants ────────────────────────────────────────────────
    var STORAGE_PREFIX = 'annot_';
    var PEN_COLORS = [
        { name: 'Black',  value: '#1d1b20' },
        { name: 'Red',    value: '#d32f2f' },
        { name: 'Blue',   value: '#1565c0' },
        { name: 'Green',  value: '#2e7d32' },
        { name: 'Purple', value: '#7b1fa2' },
        { name: 'Orange', value: '#e65100' }
    ];
    var HL_COLORS = [
        { name: 'Yellow',  value: '#ffeb3b' },
        { name: 'Cyan',    value: '#00e5ff' },
        { name: 'Pink',    value: '#f48fb1' },
        { name: 'Lime',    value: '#c6ff00' }
    ];

    // ── State ────────────────────────────────────────────────────
    var canvas = null;
    var ctx = null;
    var toolbar = null;
    var bodyEl = null;           // .article-body that scrolls
    var modalEl = null;          // the overlay container
    var currentKey = '';
    var activeTool = 'none';     // none | pen | highlighter | eraser
    var penColor = PEN_COLORS[0].value;
    var hlColor = HL_COLORS[0].value;
    var penWidth = 2.5;
    var hlWidth = 18;
    var eraserWidth = 24;
    var drawing = false;
    var strokes = [];            // array of completed stroke image-data snapshots for undo
    var saveTimeout = null;
    var savedIndicator = null;
    var resizeObserver = null;

    // ── Helpers ──────────────────────────────────────────────────
    function toast(msg, type) { if (window.toast) window.toast(msg, type); }

    function saveToStorage() {
        if (!canvas || !currentKey) return;
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function () {
            try {
                var dataUrl = canvas.toDataURL('image/png');
                // Check if canvas is blank (all transparent)
                var blank = isCanvasBlank();
                if (blank) {
                    localStorage.removeItem(STORAGE_PREFIX + currentKey);
                } else {
                    localStorage.setItem(STORAGE_PREFIX + currentKey, dataUrl);
                }
                showSaved();
            } catch (e) {
                if (e.name === 'QuotaExceededError' || e.code === 22) {
                    toast('Storage full — annotation not saved', 'error');
                }
            }
        }, 400);
    }

    function isCanvasBlank() {
        if (!ctx || !canvas) return true;
        var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (var i = 3; i < pixels.length; i += 4) {
            if (pixels[i] !== 0) return false;
        }
        return true;
    }

    function loadFromStorage() {
        if (!canvas || !ctx || !currentKey) return;
        var data = null;
        try { data = localStorage.getItem(STORAGE_PREFIX + currentKey); } catch (e) {}
        if (!data) return;
        var img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            pushSnapshot();
        };
        img.src = data;
    }

    function pushSnapshot() {
        if (!ctx || !canvas) return;
        strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        // Cap undo history at 30 to avoid memory bloat
        if (strokes.length > 30) strokes.shift();
    }

    function undo() {
        if (!ctx || !canvas || strokes.length < 2) {
            // If only 1 snapshot (initial), clear
            if (strokes.length <= 1) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                strokes = [];
                pushSnapshot();
                saveToStorage();
            }
            return;
        }
        strokes.pop();  // remove current state
        var prev = strokes[strokes.length - 1];
        ctx.putImageData(prev, 0, 0);
        saveToStorage();
    }

    function clearAll() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes = [];
        pushSnapshot();
        saveToStorage();
        toast('Annotations cleared', 'info');
    }

    function showSaved() {
        if (!savedIndicator) return;
        savedIndicator.classList.add('visible');
        setTimeout(function () {
            if (savedIndicator) savedIndicator.classList.remove('visible');
        }, 1200);
    }

    // ── Canvas sizing ───────────────────────────────────────────
    function sizeCanvas() {
        if (!canvas || !bodyEl) return;
        // Save current drawing
        var tmp = null;
        if (canvas.width > 0 && canvas.height > 0) {
            try { tmp = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch (e) {}
        }
        var rect = bodyEl.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        var w = bodyEl.scrollWidth;
        var h = bodyEl.scrollHeight;

        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Restore drawing
        if (tmp) {
            try { ctx.putImageData(tmp, 0, 0); } catch (e) {}
        }
    }

    // ── Drawing handlers ────────────────────────────────────────
    function getPos(e) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.offsetWidth / (canvas.width / (window.devicePixelRatio || 1));
        var scaleY = canvas.offsetHeight / (canvas.height / (window.devicePixelRatio || 1));
        return {
            x: (e.clientX - rect.left) / scaleX,
            y: (e.clientY - rect.top) / scaleY
        };
    }

    function onPointerDown(e) {
        if (activeTool === 'none') return;
        if (e.button !== 0) return;   // left click only
        drawing = true;
        canvas.setPointerCapture(e.pointerId);

        var pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);

        if (activeTool === 'pen') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = penColor;
            ctx.lineWidth = penWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 1;
        } else if (activeTool === 'highlighter') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = hlColor;
            ctx.lineWidth = hlWidth;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 0.35;
        } else if (activeTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.lineWidth = eraserWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 1;
        }
    }

    function onPointerMove(e) {
        if (!drawing) return;
        var pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function onPointerUp(e) {
        if (!drawing) return;
        drawing = false;
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        pushSnapshot();
        saveToStorage();
    }

    // ── Tool switching ──────────────────────────────────────────
    function setTool(tool) {
        activeTool = (activeTool === tool) ? 'none' : tool;
        updateToolbarUI();
        if (canvas) {
            canvas.style.pointerEvents = (activeTool !== 'none') ? 'auto' : 'none';
            canvas.style.cursor = activeTool === 'eraser' ? 'crosshair'
                                : activeTool !== 'none' ? 'crosshair' : 'default';
        }
        // Prevent body scroll when drawing
        if (bodyEl) {
            bodyEl.style.overflowY = (activeTool !== 'none') ? 'hidden' : '';
        }
    }

    function updateToolbarUI() {
        if (!toolbar) return;
        // Active states
        toolbar.querySelectorAll('.annot-tool-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.tool === activeTool);
        });
        // Show/hide swatch row
        var swatchRow = toolbar.querySelector('.annot-swatch-row');
        if (swatchRow) {
            swatchRow.classList.toggle('visible',
                activeTool === 'pen' || activeTool === 'highlighter');
            // Populate correct swatches
            renderSwatches(swatchRow);
        }
    }

    function renderSwatches(container) {
        var colors = activeTool === 'highlighter' ? HL_COLORS : PEN_COLORS;
        var current = activeTool === 'highlighter' ? hlColor : penColor;
        container.innerHTML = '';
        colors.forEach(function (c) {
            var btn = document.createElement('button');
            btn.className = 'annot-swatch' + (c.value === current ? ' active' : '');
            btn.style.background = c.value;
            btn.setAttribute('aria-label', c.name);
            btn.type = 'button';
            // For light yellows/limes, add a subtle border for visibility
            if (c.value === '#ffeb3b' || c.value === '#c6ff00') {
                btn.style.border = '2px solid rgba(0,0,0,0.15)';
            }
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (activeTool === 'highlighter') hlColor = c.value;
                else penColor = c.value;
                renderSwatches(container);
            });
            container.appendChild(btn);
        });
    }

    // ── Build toolbar DOM ───────────────────────────────────────
    function createToolbar() {
        toolbar = document.createElement('div');
        toolbar.className = 'annot-toolbar';
        toolbar.setAttribute('role', 'toolbar');
        toolbar.setAttribute('aria-label', 'Annotation tools');

        toolbar.innerHTML =
            '<div class="annot-tools">' +
                '<button class="annot-tool-btn" data-tool="pen" type="button" aria-label="Pen" title="Pen">' +
                    '<span class="material-symbols-outlined">edit</span>' +
                '</button>' +
                '<button class="annot-tool-btn" data-tool="highlighter" type="button" aria-label="Highlighter" title="Highlighter">' +
                    '<span class="material-symbols-outlined">ink_highlighter</span>' +
                '</button>' +
                '<button class="annot-tool-btn" data-tool="eraser" type="button" aria-label="Eraser" title="Eraser">' +
                    '<span class="material-symbols-outlined">ink_eraser</span>' +
                '</button>' +
                '<span class="annot-divider"></span>' +
                '<button class="annot-tool-btn annot-action" data-action="undo" type="button" aria-label="Undo" title="Undo">' +
                    '<span class="material-symbols-outlined">undo</span>' +
                '</button>' +
                '<button class="annot-tool-btn annot-action" data-action="clear" type="button" aria-label="Clear all" title="Clear all annotations">' +
                    '<span class="material-symbols-outlined">delete_sweep</span>' +
                '</button>' +
                '<span class="annot-divider"></span>' +
                '<button class="annot-tool-btn annot-action annot-close-tool" data-action="close" type="button" aria-label="Close toolbar" title="Close annotation mode">' +
                    '<span class="material-symbols-outlined">close</span>' +
                '</button>' +
                '<span class="annot-saved-indicator" aria-live="polite">Saved ✓</span>' +
            '</div>' +
            '<div class="annot-swatch-row"></div>';

        savedIndicator = toolbar.querySelector('.annot-saved-indicator');

        // Wire tool buttons
        toolbar.querySelectorAll('[data-tool]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                setTool(btn.dataset.tool);
            });
        });

        // Wire action buttons
        toolbar.querySelectorAll('[data-action]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (btn.dataset.action === 'undo') undo();
                else if (btn.dataset.action === 'clear') clearAll();
                else if (btn.dataset.action === 'close') setTool('none');
            });
        });

        // Prevent clicks on the toolbar from closing the overlay
        toolbar.addEventListener('click', function (e) { e.stopPropagation(); });

        return toolbar;
    }

    // ── Build canvas ────────────────────────────────────────────
    function createCanvas() {
        canvas = document.createElement('canvas');
        canvas.className = 'annot-canvas';
        canvas.style.pointerEvents = 'none';
        ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.imageSmoothingEnabled = true;

        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);
        // Prevent touch scroll when drawing
        canvas.addEventListener('touchstart', function (e) {
            if (activeTool !== 'none') e.preventDefault();
        }, { passive: false });

        return canvas;
    }

    // ── Public API ──────────────────────────────────────────────
    window.initAnnotation = function (overlayEl, questionKey) {
        // Destroy any existing instance first
        window.destroyAnnotation();

        modalEl = overlayEl;
        bodyEl = overlayEl.querySelector('.article-body');
        if (!bodyEl) return;
        currentKey = questionKey;

        // Make body position relative for absolute canvas
        bodyEl.style.position = 'relative';

        // Create and insert canvas
        createCanvas();
        bodyEl.appendChild(canvas);

        // Create and insert toolbar
        var articleModal = overlayEl.querySelector('.article-modal');
        if (articleModal) {
            createToolbar();
            articleModal.appendChild(toolbar);
        }

        // Initial sizing (deferred so content is rendered)
        requestAnimationFrame(function () {
            sizeCanvas();
            loadFromStorage();
            if (strokes.length === 0) pushSnapshot();
        });

        // Observe body resize for re-layout
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(function () {
                sizeCanvas();
            });
            resizeObserver.observe(bodyEl);
        }

        activeTool = 'none';
        updateToolbarUI();
    };

    window.destroyAnnotation = function () {
        if (drawing) {
            drawing = false;
            if (ctx) {
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = 'source-over';
            }
        }
        clearTimeout(saveTimeout);
        if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        if (toolbar && toolbar.parentNode) toolbar.parentNode.removeChild(toolbar);
        if (bodyEl) {
            bodyEl.style.position = '';
            bodyEl.style.overflowY = '';
        }
        canvas = null;
        ctx = null;
        toolbar = null;
        savedIndicator = null;
        bodyEl = null;
        modalEl = null;
        strokes = [];
        activeTool = 'none';
        currentKey = '';
    };

})();
