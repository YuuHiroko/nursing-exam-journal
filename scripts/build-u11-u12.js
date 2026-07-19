'use strict';
const fs = require('fs');
const path = require('path');

const diagramsPath = path.join(__dirname, '..', 'diagrams.js');

// Appends: close last truncated function (}), comma, two new window.DIAGRAMS entries,
// closing };, and the activation IIFE.
// The file ends mid-object with an open function body (no closing }) so we must
// first close the function with }, then comma, then new entries.

const chunk1 = `
  },

  // --- triageFlowchart: START Triage 4-Colour Decision Flowchart ---
  triageFlowchart: function () {
    var W = 520, H = 490;
    var svg = '';

    // Arrow marker
    svg += '<defs>'
      + '<marker id="tri-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">'
      + '<path d="M0,0 L0,6 L8,3 z" fill="#475569"/>'
      + '</marker>'
      + '</defs>';

    // Background
    svg += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#f8fafc" rx="12"/>';

    // Helper: box
    function bx(x, y, w, h, fill, stroke, text, sub, tc) {
      var o = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h
        + '" rx="7" fill="' + fill + '" stroke="' + (stroke || fill) + '" stroke-width="2"/>';
      o += '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 - (sub ? 7 : 0))
        + '" text-anchor="middle" dominant-baseline="middle" fill="' + (tc || '#fff')
        + '" font-size="12" font-weight="700">' + text + '</text>';
      if (sub) {
        o += '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 10)
          + '" text-anchor="middle" dominant-baseline="middle" fill="' + (tc || '#fff')
          + '" font-size="9.5">' + sub + '</text>';
      }
      return o;
    }

    // Helper: diamond
    function dm(cx, cy, hw, hh, fill, lbl) {
      var pts = cx + ',' + (cy - hh) + ' '
              + (cx + hw) + ',' + cy + ' '
              + cx + ',' + (cy + hh) + ' '
              + (cx - hw) + ',' + cy;
      var o = '<polygon points="' + pts
        + '" fill="' + fill + '" stroke="#64748b" stroke-width="2"/>';
      o += '<text x="' + cx + '" y="' + (cy + 4)
        + '" text-anchor="middle" dominant-baseline="middle" fill="#1e293b" font-size="11" font-weight="700">'
        + lbl + '</text>';
      return o;
    }

    // Helper: arrow line
    function ar(x1, y1, x2, y2) {
      return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2
        + '" stroke="#475569" stroke-width="1.5" marker-end="url(#tri-arrow)"/>';
    }

    // Helper: YES/NO label
    function lbl(x, y, text, color) {
      return '<text x="' + x + '" y="' + y + '" fill="' + color
        + '" font-size="10" font-weight="700">' + text + '</text>';
    }

    // START box
    svg += bx(185, 12, 150, 34, '#1e293b', '#0f172a', 'DISASTER SCENE', 'START Triage', '#f1f5f9');

    // Arrow START -> D1
    svg += ar(260, 46, 260, 86);

    // D1: Can walk? cy=100
    svg += dm(260, 100, 70, 22, '#e2e8f0', 'Can walk?');
    // YES -> GREEN right
    svg += ar(330, 100, 408, 100);
    svg += lbl(335, 97, 'YES', '#16a34a');
    svg += bx(410, 84, 96, 32, '#16a34a', '#15803d', 'GREEN', 'Minor T3', '#fff');
    // NO down
    svg += ar(260, 122, 260, 152);
    svg += lbl(263, 144, 'NO', '#ef4444');

    // D2: Breathing? cy=166
    svg += dm(260, 166, 70, 22, '#e2e8f0', 'Breathing?');
    // YES down -> D3
    svg += ar(260, 188, 260, 218);
    svg += lbl(263, 210, 'YES', '#16a34a');
    // NO right -> open airway
    svg += ar(330, 166, 392, 166);
    svg += lbl(334, 163, 'NO', '#ef4444');
    svg += bx(394, 150, 110, 32, '#fef3c7', '#d97706', 'Open airway', '', '#92400e');
    // open airway -> BLACK if still no breathing
    svg += ar(449, 182, 449, 212);
    svg += lbl(452, 204, 'No breathing', '#374151');
    svg += bx(401, 214, 96, 32, '#374151', '#1f2937', 'BLACK', 'Dead T4', '#fff');

    // D3: RR > 30/min? cy=232
    svg += dm(260, 232, 76, 22, '#e2e8f0', 'RR > 30/min?');
    // YES right -> RED
    svg += ar(336, 232, 392, 232);
    svg += lbl(340, 229, 'YES', '#ef4444');
    svg += bx(394, 216, 96, 32, '#ef4444', '#dc2626', 'RED', 'Immediate T1', '#fff');
    // NO down
    svg += ar(260, 254, 260, 284);
    svg += lbl(263, 276, 'NO', '#16a34a');

    // D4: Cap refill > 2s? cy=298
    svg += dm(260, 298, 82, 22, '#e2e8f0', 'Cap refill > 2s?');
    // YES right -> RED
    svg += ar(342, 298, 392, 298);
    svg += lbl(346, 295, 'YES', '#ef4444');
    svg += bx(394, 282, 96, 32, '#ef4444', '#dc2626', 'RED', 'Immediate T1', '#fff');
    // NO down
    svg += ar(260, 320, 260, 350);
    svg += lbl(263, 342, 'NO', '#16a34a');

    // D5: Obeys commands? cy=364
    svg += dm(260, 364, 84, 22, '#e2e8f0', 'Obeys commands?');
    // NO left -> RED
    svg += ar(176, 364, 112, 364);
    svg += lbl(116, 361, 'NO', '#ef4444');
    svg += bx(14, 348, 96, 32, '#ef4444', '#dc2626', 'RED', 'Immediate T1', '#fff');
    // YES right -> YELLOW
    svg += ar(344, 364, 392, 364);
    svg += lbl(348, 361, 'YES', '#16a34a');
    svg += bx(394, 348, 96, 32, '#d97706', '#b45309', 'YELLOW', 'Delayed T2', '#fff');

    // Colour legend bottom
    var legY = 420;
    var cols = [
      {c: '#16a34a', t: 'GREEN — Minor (T3)'},
      {c: '#374151', t: 'BLACK — Dead (T4)'},
      {c: '#ef4444', t: 'RED — Immediate (T1)'},
      {c: '#d97706', t: 'YELLOW — Delayed (T2)'}
    ];
    for (var i = 0; i < cols.length; i++) {
      var lx = 12 + i * 126;
      svg += '<rect x="' + lx + '" y="' + legY + '" width="12" height="12" rx="3" fill="' + cols[i].c + '"/>';
      svg += '<text x="' + (lx + 16) + '" y="' + (legY + 10) + '" fill="#374151" font-size="8.5">' + cols[i].t + '</text>';
    }

    return '<div class="interactive-diagram nrs-diagram">'
      + '<div class="diagram-title">🚨 START Triage — 4-Colour Decision Flowchart</div>'
      + '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key">Step 1: Can walk? → GREEN. Step 2: No breathing after airway opened → BLACK. Step 3: RR &gt;30/min → RED. Step 4: Cap refill &gt;2s → RED. Step 5: Cannot obey commands → RED. All else → YELLOW. Complete in &lt;60 seconds per patient.</div>'
      + '</div>';
  },

  // --- bmwColourCoding: BMW Colour-Coded Bin Segregation ---
  bmwColourCoding: function () {
    var W = 540, H = 400;
    var svg = '';

    // Background
    svg += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#f8fafc" rx="12"/>';

    var bins = [
      {
        color: '#d97706', stroke: '#b45309', label: 'YELLOW',
        container: 'Yellow Bag',
        wastes: ['Anatomical waste', 'Soiled dressings', 'Expired medicines', 'Micro-waste'],
        treatment: 'Incineration / deep burial',
        tx: 10
      },
      {
        color: '#dc2626', stroke: '#b91c1c', label: 'RED',
        container: 'Red Bag',
        wastes: ['Contaminated plastics', 'IV tubing & catheters', 'Gloves & blood bags'],
        treatment: 'Autoclave + shred → recycle',
        tx: 140
      },
      {
        color: '#64748b', stroke: '#475569', label: 'WHITE',
        container: 'Puncture-proof container',
        wastes: ['Needles & syringes', 'Blades & broken glass'],
        treatment: 'Autoclave + shred + encapsulate',
        tx: 270
      },
      {
        color: '#2563eb', stroke: '#1d4ed8', label: 'BLUE',
        container: 'Cardboard box',
        wastes: ['Vials & ampoules', 'Slides (non-blood)'],
        treatment: 'Disinfect + shred/recycle',
        tx: 400
      }
    ];
    var binW = 124, binH = 300, binY = 20;

    for (var i = 0; i < bins.length; i++) {
      var b = bins[i];
      var cx = b.tx + binW / 2;
      var delay = (i * 0.6).toFixed(1);

      // Bin outline with pulsing stroke
      svg += '<rect x="' + b.tx + '" y="' + binY + '" width="' + binW + '" height="' + binH
        + '" rx="10" fill="#fff" stroke="' + b.color + '" stroke-width="3">'
        + '<animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.4s" begin="' + delay + 's" repeatCount="indefinite"/>'
        + '</rect>';

      // Coloured header band
      svg += '<rect x="' + b.tx + '" y="' + binY + '" width="' + binW + '" height="48" rx="10" fill="' + b.color + '"/>';
      svg += '<rect x="' + b.tx + '" y="' + (binY + 30) + '" width="' + binW + '" height="18" fill="' + b.color + '"/>';

      // Label + container in header
      svg += '<text x="' + cx + '" y="' + (binY + 17) + '" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">' + b.label + '</text>';
      svg += '<text x="' + cx + '" y="' + (binY + 40) + '" text-anchor="middle" fill="#fff" font-size="8.5">' + b.container + '</text>';

      // WASTE TYPES heading
      svg += '<text x="' + cx + '" y="' + (binY + 63) + '" text-anchor="middle" fill="#475569" font-size="8" font-weight="700">WASTE TYPES</text>';
      for (var w = 0; w < b.wastes.length; w++) {
        svg += '<text x="' + cx + '" y="' + (binY + 77 + w * 15) + '" text-anchor="middle" fill="#334155" font-size="7.5">' + b.wastes[w] + '</text>';
      }

      // Divider
      var treatY = binY + 77 + b.wastes.length * 15 + 6;
      svg += '<line x1="' + (b.tx + 8) + '" y1="' + treatY + '" x2="' + (b.tx + binW - 8) + '" y2="' + treatY + '" stroke="' + b.color + '" stroke-width="1" stroke-dasharray="3,2"/>';

      // TREATMENT heading
      svg += '<text x="' + cx + '" y="' + (treatY + 14) + '" text-anchor="middle" fill="#475569" font-size="8" font-weight="700">TREATMENT</text>';

      // Treatment text (word-wrap simple split)
      var words = b.treatment.split(' ');
      var half = Math.ceil(words.length / 2);
      var line1 = words.slice(0, half).join(' ');
      var line2 = words.slice(half).join(' ');
      svg += '<text x="' + cx + '" y="' + (treatY + 27) + '" text-anchor="middle" fill="#1e293b" font-size="7.5">' + line1 + '</text>';
      if (line2) {
        svg += '<text x="' + cx + '" y="' + (treatY + 40) + '" text-anchor="middle" fill="#1e293b" font-size="7.5">' + line2 + '</text>';
      }

      // Pulsing fill tint at bottom of bin
      svg += '<rect x="' + (b.tx + 6) + '" y="' + (binY + binH - 34) + '" width="' + (binW - 12) + '" height="26" rx="6" fill="' + b.color + '" fill-opacity="0.1">'
        + '<animate attributeName="fill-opacity" values="0;0.6;0" dur="2.4s" begin="' + delay + 's" repeatCount="indefinite"/>'
        + '</rect>';
    }

    // Bottom note
    var noteY = binY + binH + 18;
    svg += '<text x="' + (W / 2) + '" y="' + noteY + '" text-anchor="middle" fill="#64748b" font-size="9">Max storage 48hrs on-site · Transport in covered vehicles to CBWTF · Never mix general + BMW waste</text>';

    return '<div class="interactive-diagram nrs-diagram">'
      + '<div class="diagram-title">♻ BMW Colour-Coded Bin Segregation — BMW Rules 2016</div>'
      + '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key">Yellow → incinerate. Red (contaminated plastics) → autoclave + recycle. White (sharps) → puncture-proof → autoclave + shred + encapsulate. Blue (glass) → disinfect + recycle. Key rule: segregate at point of generation; NEVER recap needles; store max 48hrs; wear PPE always.</div>'
      + '</div>';
  }

`;

const closing = `};


// --- ACTIVATION ---
(function () {
  var reduceMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function eachSvg(el, fn) {
    var svgs = el.querySelectorAll('svg');
    for (var i = 0; i < svgs.length; i++) { try { fn(svgs[i]); } catch (e) {} }
  }

  window.activateDiagrams = function () {
    var slots = document.querySelectorAll('[data-diagram]');
    for (var i = 0; i < slots.length; i++) {
      var name = slots[i].getAttribute('data-diagram');
      if (!window.DIAGRAMS[name]) continue;
      slots[i].innerHTML = window.DIAGRAMS[name]();
      slots[i].removeAttribute('data-diagram');
      var box = slots[i].querySelector('.interactive-diagram') || slots[i];
      var label = (box.querySelector('.diagram-title') || {}).textContent || name;
      eachSvg(box, function (s) {
        s.setAttribute('role', 'img');
        s.setAttribute('aria-label', label.replace(/\s+/g, ' ').trim());
      });
    }
  };

  document.addEventListener('visibilitychange', function () {
    if (reduceMotion) return;
    var boxes = document.querySelectorAll('.interactive-diagram');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if (document.hidden) {
        box.classList.add('diagram-paused');
        eachSvg(box, function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
      } else {
        box.classList.remove('diagram-paused');
        eachSvg(box, function (s) { if (s.unpauseAnimations) s.unpauseAnimations(); });
      }
    }
  });
})();
`;

fs.appendFileSync(diagramsPath, chunk1 + closing, 'utf8');
console.log('Done: appended triageFlowchart + bmwColourCoding + closing }; + activation IIFE to diagrams.js');
