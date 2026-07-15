// ═══════════════════════════════════════════════════════════════
// INTERACTIVE DIAGRAM COMPONENTS v2 — diagrams.js
// Rich animated SVG diagrams for medical education.
// ═══════════════════════════════════════════════════════════════

window.DIAGRAMS = {

  // ─── 1. FETAL CIRCULATION — Moving blood cells ───────────────
  fetalCirculation: function () {
    // Blood cell particle that moves along a path
    function bloodCell(pathD, color, dur, delay) {
      var id = 'fc-p' + Math.random().toString(36).substr(2, 5);
      return '<circle r="5" fill="' + color + '" opacity="0.9">' +
        '<animateMotion dur="' + dur + 's" repeatCount="indefinite" begin="' + delay + 's">' +
          '<mpath href="#' + id + '"/>' +
        '</animateMotion>' +
      '</circle>' +
      '<path id="' + id + '" d="' + pathD + '" fill="none" stroke="none"/>';
    }

    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#9829; Animated: Fetal Circulation &mdash; Watch Blood Cells Flow</div>' +
      '<svg viewBox="0 0 560 560" width="100%" style="max-width:560px;display:block;margin:0 auto;">' +
      '<defs>' +
        '<radialGradient id="fcg1"><stop offset="0%" stop-color="#ef9a9a"/><stop offset="100%" stop-color="#c62828"/></radialGradient>' +
        '<radialGradient id="fcg2"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#2e7d32"/></radialGradient>' +
        '<filter id="fc-glow"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
        '<style>' +
          '.fc2-vessel-r{fill:none;stroke:#d32f2f;stroke-width:4;stroke-linecap:round;opacity:.3}' +
          '.fc2-vessel-b{fill:none;stroke:#1565c0;stroke-width:4;stroke-linecap:round;opacity:.3}' +
          '.fc2-shunt{fill:none;stroke:#9c27b0;stroke-width:3;stroke-dasharray:8 4;animation:fc2-glow 2s ease-in-out infinite alternate;cursor:pointer}' +
          '.fc2-shunt:hover{stroke-width:5;stroke:#e040fb;filter:url(#fc-glow)}' +
          '@keyframes fc2-glow{from{opacity:.5}to{opacity:1}}' +
          '@keyframes fc2-beat{0%,100%{transform:scale(1)}15%{transform:scale(1.08)}30%{transform:scale(1)}}' +
          '.fc2-heart{animation:fc2-beat .8s ease-in-out infinite;transform-origin:280px 230px}' +
          '.fc2-lbl{font:bold 11px var(--font-body,sans-serif);fill:var(--color-foreground,#222)}' +
          '.fc2-slbl{font:bold 10px var(--font-mono,monospace);fill:#9c27b0}' +
        '</style>' +
      '</defs>' +

      // ── ORGANS ──
      // Placenta
      '<ellipse cx="280" cy="510" rx="100" ry="35" fill="url(#fcg2)" stroke="#2e7d32" stroke-width="2"/>' +
      '<text x="280" y="515" text-anchor="middle" class="fc2-lbl" fill="#fff" font-size="14">PLACENTA</text>' +
      '<text x="280" y="530" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#c8e6c9">(O&#8322; source for baby)</text>' +

      // Liver
      '<rect x="165" y="340" width="85" height="45" rx="14" fill="#a1887f" stroke="#5d4037" stroke-width="1.5" opacity="0.7"/>' +
      '<text x="207" y="367" text-anchor="middle" class="fc2-lbl" fill="#fff" font-size="11">LIVER</text>' +

      // Lungs (faded - not working)
      '<ellipse cx="160" cy="220" rx="50" ry="30" fill="#e3f2fd" stroke="#90caf9" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 3"/>' +
      '<text x="160" y="218" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#90a4ae">LUNG</text>' +
      '<text x="160" y="230" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#b0bec5">(collapsed)</text>' +
      '<ellipse cx="400" cy="220" rx="50" ry="30" fill="#e3f2fd" stroke="#90caf9" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 3"/>' +
      '<text x="400" y="218" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#90a4ae">LUNG</text>' +
      '<text x="400" y="230" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#b0bec5">(collapsed)</text>' +

      // Heart with 4 chambers
      '<g class="fc2-heart">' +
        '<rect x="240" y="195" width="80" height="70" rx="18" fill="url(#fcg1)" stroke="#b71c1c" stroke-width="2.5"/>' +
        '<line x1="280" y1="195" x2="280" y2="265" stroke="#fff" stroke-width="1" opacity="0.5"/>' +
        '<line x1="240" y1="230" x2="320" y2="230" stroke="#fff" stroke-width="1" opacity="0.5"/>' +
        '<text x="258" y="217" text-anchor="middle" font="bold 10px sans-serif" fill="#fff">RA</text>' +
        '<text x="302" y="217" text-anchor="middle" font="bold 10px sans-serif" fill="#fff">LA</text>' +
        '<text x="258" y="252" text-anchor="middle" font="bold 10px sans-serif" fill="#fff">RV</text>' +
        '<text x="302" y="252" text-anchor="middle" font="bold 10px sans-serif" fill="#fff">LV</text>' +
      '</g>' +

      // Brain
      '<ellipse cx="280" cy="70" rx="55" ry="28" fill="#fff9c4" stroke="#f9a825" stroke-width="2"/>' +
      '<text x="280" y="74" text-anchor="middle" class="fc2-lbl" font-size="12">BRAIN</text>' +

      // Lower body
      '<rect x="380" y="400" width="75" height="35" rx="12" fill="#e8eaf6" stroke="#7986cb" stroke-width="1.5"/>' +
      '<text x="417" y="422" text-anchor="middle" class="fc2-lbl" font-size="10">Lower Body</text>' +

      // ── VESSEL PATHS (faint background) ──
      '<path d="M240,480 L207,385" class="fc2-vessel-r"/>' +   // Umb vein
      '<path d="M207,340 L260,270" class="fc2-vessel-r"/>' +   // DV path
      '<path d="M300,195 L300,150 L280,100" class="fc2-vessel-r"/>' + // Aorta up
      '<path d="M320,195 L380,300 L400,400" class="fc2-vessel-r"/>' + // Aorta down
      '<path d="M430,435 L450,470 L330,500" class="fc2-vessel-b"/>' + // Umb arteries

      // ── SHUNTS (purple, animated glow) ──
      // 1. Ductus Venosus
      '<path d="M207,350 C210,310 240,290 260,270" class="fc2-shunt"/>' +
      '<text x="140" y="310" class="fc2-slbl">&#9312; Ductus</text>' +
      '<text x="140" y="322" class="fc2-slbl">   Venosus</text>' +
      '<text x="140" y="334" style="font:8px var(--font-mono,monospace)" fill="#7b1fa2">(bypasses liver)</text>' +

      // 2. Foramen Ovale
      '<line x1="278" y1="212" x2="282" y2="212" class="fc2-shunt" stroke-width="5"/>' +
      '<text x="280" y="186" text-anchor="middle" class="fc2-slbl">&#9313; Foramen Ovale</text>' +
      '<text x="280" y="176" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#7b1fa2">(RA &#8594; LA, skips lungs)</text>' +

      // 3. Ductus Arteriosus
      '<path d="M240,200 C255,175 305,175 320,195" class="fc2-shunt"/>' +
      '<text x="280" y="162" text-anchor="middle" class="fc2-slbl">&#9314; Ductus Arteriosus</text>' +
      '<text x="280" y="152" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#7b1fa2">(PA &#8594; Aorta)</text>' +

      // ── MOVING BLOOD CELLS ──
      // Oxygenated cells (RED) — placenta → liver → DV → heart → brain
      bloodCell('M240,480 L207,385', '#f44336', 2, 0) +
      bloodCell('M240,480 L207,385', '#f44336', 2, 1) +
      bloodCell('M207,350 C210,310 240,290 260,270', '#f44336', 1.5, 0.3) +
      bloodCell('M207,350 C210,310 240,290 260,270', '#f44336', 1.5, 1) +
      bloodCell('M300,195 L300,150 L280,100', '#f44336', 1.8, 0) +
      bloodCell('M300,195 L300,150 L280,100', '#f44336', 1.8, 0.9) +
      bloodCell('M320,195 L380,300 L400,400', '#ef5350', 2.5, 0.2) +
      bloodCell('M320,195 L380,300 L400,400', '#ef5350', 2.5, 1.3) +

      // Deoxygenated cells (BLUE) — lower body → umbilical arteries → placenta
      bloodCell('M430,435 L450,470 L330,500', '#1e88e5', 2, 0.5) +
      bloodCell('M430,435 L450,470 L330,500', '#1e88e5', 2, 1.5) +

      // ── VESSEL LABELS ──
      '<text x="190" y="445" class="fc2-lbl" fill="#d32f2f" font-size="10" transform="rotate(-65,190,445)">Umbilical Vein</text>' +
      '<text x="195" y="460" style="font:8px var(--font-mono,monospace)" fill="#ef9a9a" transform="rotate(-65,195,460)">(O&#8322;-rich!)</text>' +
      '<text x="445" y="458" class="fc2-lbl" fill="#1565c0" font-size="10">Umb. Arteries</text>' +
      '<text x="445" y="470" style="font:8px var(--font-mono,monospace)" fill="#90caf9">(CO&#8322; waste)</text>' +
      '<text x="335" y="148" class="fc2-lbl" fill="#d32f2f" font-size="10">Aorta &#8593;</text>' +
      '<text x="255" y="280" class="fc2-lbl" fill="#546e7a" font-size="9">IVC</text>' +

      // Legend
      '<rect x="10" y="10" width="155" height="85" rx="10" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)"/>' +
      '<circle cx="25" cy="30" r="5" fill="#f44336"/><text x="35" y="34" class="fc2-lbl" font-size="10">Oxygenated blood</text>' +
      '<circle cx="25" cy="50" r="5" fill="#1e88e5"/><text x="35" y="54" class="fc2-lbl" font-size="10">Deoxygenated blood</text>' +
      '<line x1="18" y1="70" x2="35" y2="70" stroke="#9c27b0" stroke-width="3" stroke-dasharray="6 3"/>' +
      '<text x="40" y="74" class="fc2-lbl" font-size="10">Shunt (hover me!)</text>' +
      '<text x="85" y="90" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#9c27b0">animated &#9679; = blood cells</text>' +

      '</svg>' +
      '<div class="diagram-key">' +
        '<strong>Watch the red &amp; blue dots move!</strong> Red cells carry O&#8322; from placenta to brain. Blue cells carry waste back. ' +
        '<strong>Hover the purple shunt lines</strong> to see all 3 fetal shortcuts that bypass the lungs. ' +
        'After birth: first cry &#8594; lungs open &#8594; all 3 shunts close permanently.' +
      '</div>' +
    '</div>';
  },

  // ─── 2. FERTILIZATION — Animated sperm-meets-egg ─────────────
  fertilizationProcess: function () {
    // Multiple sperm swimming toward egg
    function sperm(startX, startY, endX, endY, dur, delay, fails) {
      var id = 'sp' + Math.random().toString(36).substr(2, 4);
      var path = 'M' + startX + ',' + startY + ' C' + (startX - 20) + ',' + (startY - 30) + ' ' + (endX + 40) + ',' + (endY + 20) + ' ' + endX + ',' + endY;
      var opacity = fails ? '0' : '1';
      return '<g>' +
        '<circle r="4" fill="#1565c0">' +
          '<animateMotion dur="' + dur + 's" begin="' + delay + 's" fill="freeze" repeatCount="' + (fails ? 'indefinite' : '1') + '">' +
            '<mpath href="#' + id + '"/>' +
          '</animateMotion>' +
          (fails ? '' : '<animate attributeName="opacity" from="1" to="0" begin="' + (delay + dur) + 's" dur="0.3s" fill="freeze"/>') +
        '</circle>' +
        '<path id="' + id + '" d="' + path + '" fill="none" stroke="none"/>' +
      '</g>';
    }

    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128171; Animated: Fertilization &mdash; Sperm Meets Egg</div>' +
      '<svg viewBox="0 0 500 350" width="100%" style="max-width:500px;display:block;margin:0 auto;">' +
      '<defs><style>' +
        '@keyframes fert-glow{0%,100%{stroke-width:2;stroke:#f9a825}50%{stroke-width:4;stroke:#ff6f00}}' +
        '@keyframes fert-shield{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-30}}' +
        '@keyframes fert-flash{0%{opacity:0}50%{opacity:1}100%{opacity:0}}' +
        '.fert-corona{fill:none;stroke:#ffcc80;stroke-width:2;stroke-dasharray:4 3;animation:fert-shield 2s linear infinite}' +
        '.fert-zona{fill:none;stroke:#f9a825;stroke-width:3;animation:fert-glow 3s ease-in-out infinite}' +
      '</style></defs>' +

      // Labels
      '<text x="250" y="25" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground,#222)">SITE: Ampulla of Fallopian Tube</text>' +

      // Fallopian tube background
      '<path d="M0,175 Q100,130 200,160 Q300,190 400,160 Q450,150 500,175" fill="none" stroke="#ffccbc" stroke-width="60" opacity="0.3"/>' +
      '<path d="M0,175 Q100,130 200,160 Q300,190 400,160 Q450,150 500,175" fill="none" stroke="#ff8a65" stroke-width="2" opacity="0.4"/>' +

      // EGG - layered structure
      // Corona Radiata (outer)
      '<circle cx="320" cy="175" r="55" class="fert-corona"/>' +
      '<text x="320" y="120" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#e65100">Corona Radiata</text>' +

      // Zona Pellucida (middle)
      '<circle cx="320" cy="175" r="40" class="fert-zona"/>' +
      '<text x="390" y="155" style="font:9px var(--font-mono,monospace)" fill="#f57f17">Zona Pellucida</text>' +

      // Egg cell (center)
      '<circle cx="320" cy="175" r="25" fill="#fff9c4" stroke="#f9a825" stroke-width="1.5"/>' +
      '<circle cx="320" cy="175" r="10" fill="#fff176" stroke="#f57f17" stroke-width="1"/>' +
      '<text x="320" y="179" text-anchor="middle" font="bold 9px sans-serif" fill="#e65100">OVUM</text>' +
      '<text x="320" y="169" text-anchor="middle" font="7px sans-serif" fill="#ef6c00">23 chr</text>' +

      // Cortical reaction flash (appears after winner sperm enters)
      '<circle cx="320" cy="175" r="42" fill="none" stroke="#ff6f00" stroke-width="3" opacity="0">' +
        '<animate attributeName="opacity" values="0;0;0;0.8;0;0.6;0" dur="8s" repeatCount="indefinite"/>' +
        '<animate attributeName="r" values="42;42;42;48;42;46;42" dur="8s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<text x="320" y="245" text-anchor="middle" style="font:bold 9px var(--font-mono,monospace)" fill="#e65100" opacity="0">' +
        '<animate attributeName="opacity" values="0;0;0;1;1;1;0" dur="8s" repeatCount="indefinite"/>' +
        'CORTICAL REACTION! Gate closed!' +
      '</text>' +

      // Swimming sperm (one winner, others fail)
      sperm(50, 200, 280, 175, 4, 0, false) +   // THE WINNER
      sperm(30, 140, 260, 150, 5, 0.5, true) +
      sperm(60, 250, 265, 195, 4.5, 0.3, true) +
      sperm(20, 180, 270, 170, 6, 1, true) +
      sperm(40, 220, 260, 185, 5.5, 0.7, true) +
      sperm(70, 160, 268, 162, 5, 1.2, true) +
      sperm(10, 195, 272, 178, 4.8, 0.4, true) +
      sperm(55, 130, 265, 155, 5.2, 0.8, true) +

      // Sperm labels
      '<text x="60" y="270" style="font:9px var(--font-mono,monospace)" fill="#1565c0">300 million sperm</text>' +
      '<text x="60" y="282" style="font:9px var(--font-mono,monospace)" fill="#1565c0">race to the egg...</text>' +
      '<text x="60" y="294" style="font:bold 9px var(--font-mono,monospace)" fill="#d32f2f">Only 1 wins!</text>' +

      // Step labels at bottom
      '<rect x="10" y="305" width="480" height="40" rx="8" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)"/>' +
      '<text x="250" y="322" text-anchor="middle" style="font:10px var(--font-body,sans-serif)" fill="var(--color-foreground,#222)">' +
        '<tspan font-weight="bold">Steps:</tspan> Capacitation (7hr) &#8594; Acrosome Reaction &#8594; Penetration &#8594; Cortical Block &#8594; Fusion = Zygote (46 chr)</text>' +
      '<text x="250" y="338" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#7b1fa2">' +
        'Sperm carries X=Girl(XX) or Y=Boy(XY) &mdash; FATHER determines sex!</text>' +

      '</svg>' +
      '<div class="diagram-key">' +
        'Watch the <strong>blue sperm cells swim toward the egg</strong>. One penetrates, then the <strong>cortical reaction flashes</strong> (orange burst) to block all others. ' +
        'The animated dashed circles show the protective layers being dissolved by enzymes.' +
      '</div>' +
    '</div>';
  },

  // ─── 3. CERVICAL DILATION — Animated progress ───────────────
  cervicalDilation: function () {
    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128308; Animated: Cervical Dilation &mdash; 0 to 10 cm</div>' +
      '<svg viewBox="0 0 500 280" width="100%" style="max-width:500px;display:block;margin:0 auto;">' +
      '<defs><style>' +
        '.cd-lbl{font:10px var(--font-mono,monospace);fill:var(--color-foreground,#222);text-anchor:middle}' +
      '</style></defs>' +

      // Title
      '<text x="250" y="25" text-anchor="middle" style="font:bold 13px var(--font-body,sans-serif)" fill="var(--color-foreground)">Cervical Os Dilation During Labour</text>' +

      // 5 circles showing progressive dilation
      // 0 cm (closed)
      '<circle cx="60" cy="120" r="3" fill="#e8eaf6" stroke="#3f51b5" stroke-width="2"/>' +
      '<circle cx="60" cy="120" r="25" fill="none" stroke="#ccc" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<text x="60" y="160" class="cd-lbl" font-weight="bold">0 cm</text>' +
      '<text x="60" y="175" class="cd-lbl" font-size="8">Closed</text>' +

      // 2 cm (latent)
      '<circle cx="150" cy="120" r="8" fill="#c5cae9" stroke="#3f51b5" stroke-width="2"/>' +
      '<circle cx="150" cy="120" r="25" fill="none" stroke="#ccc" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<text x="150" y="160" class="cd-lbl" font-weight="bold">2 cm</text>' +
      '<text x="150" y="175" class="cd-lbl" font-size="8">Latent</text>' +

      // 4 cm (active starts)
      '<circle cx="240" cy="120" r="16" fill="#9fa8da" stroke="#3f51b5" stroke-width="2">' +
        '<animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<circle cx="240" cy="120" r="25" fill="none" stroke="#ff6f00" stroke-width="2" stroke-dasharray="3 3"/>' +
      '<text x="240" y="160" class="cd-lbl" font-weight="bold" fill="#e65100">4 cm</text>' +
      '<text x="240" y="175" class="cd-lbl" font-size="8" fill="#e65100">ACTIVE!</text>' +

      // 7 cm (transition)
      '<circle cx="330" cy="120" r="28" fill="#7986cb" stroke="#3f51b5" stroke-width="2">' +
        '<animate attributeName="r" values="26;30;26" dur="1.5s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<text x="330" y="160" class="cd-lbl" font-weight="bold">7 cm</text>' +
      '<text x="330" y="175" class="cd-lbl" font-size="8">Transition</text>' +

      // 10 cm (fully dilated!)
      '<circle cx="430" cy="120" r="42" fill="#5c6bc0" stroke="#283593" stroke-width="3">' +
        '<animate attributeName="r" values="40;44;40" dur="1s" repeatCount="indefinite"/>' +
        '<animate attributeName="fill" values="#5c6bc0;#3949ab;#5c6bc0" dur="1s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<text x="430" y="115" text-anchor="middle" font="bold 12px sans-serif" fill="#fff">10 cm</text>' +
      '<text x="430" y="130" text-anchor="middle" font="bold 9px sans-serif" fill="#c5cae9">FULLY</text>' +
      '<text x="430" y="142" text-anchor="middle" font="bold 9px sans-serif" fill="#c5cae9">DILATED!</text>' +

      // Arrows between stages
      '<path d="M85,120 L125,120" fill="none" stroke="#9e9e9e" stroke-width="1.5" marker-end="url(#cd-arr)"/>' +
      '<path d="M175,120 L215,120" fill="none" stroke="#9e9e9e" stroke-width="1.5" marker-end="url(#cd-arr)"/>' +
      '<path d="M265,120 L305,120" fill="none" stroke="#9e9e9e" stroke-width="1.5" marker-end="url(#cd-arr)"/>' +
      '<path d="M360,120 L385,120" fill="none" stroke="#9e9e9e" stroke-width="1.5" marker-end="url(#cd-arr)"/>' +
      '<defs><marker id="cd-arr" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5" fill="#9e9e9e"/></marker></defs>' +

      // Phase labels at bottom
      '<rect x="15" y="200" width="200" height="65" rx="8" fill="#e8eaf6" stroke="#9fa8da"/>' +
      '<text x="115" y="218" text-anchor="middle" style="font:bold 10px var(--font-body,sans-serif)" fill="#3f51b5">Latent Phase</text>' +
      '<text x="115" y="232" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#5c6bc0">0&#8594;4 cm | Slow | 8-12 hrs</text>' +
      '<text x="115" y="246" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#5c6bc0">Contractions: mild, irregular</text>' +
      '<text x="115" y="258" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#5c6bc0">Graph: below Alert line</text>' +

      '<rect x="235" y="200" width="250" height="65" rx="8" fill="#c5cae9" stroke="#5c6bc0"/>' +
      '<text x="360" y="218" text-anchor="middle" style="font:bold 10px var(--font-body,sans-serif)" fill="#283593">Active Phase</text>' +
      '<text x="360" y="232" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#3f51b5">4&#8594;10 cm | Fast | 1 cm/hr</text>' +
      '<text x="360" y="246" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#3f51b5">Contractions: strong, regular</text>' +
      '<text x="360" y="258" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#3f51b5">Graph: on/above Alert line</text>' +

      '</svg>' +
      '<div class="diagram-key">' +
        'Circles show actual size of cervical opening. <strong>Pulsing circles = active dilation</strong>. ' +
        '4 cm = active labour starts (plot on partograph). 10 cm = ready to push!' +
      '</div>' +
    '</div>';
  },

  // ─── 4. LOCHIA CHANGES — Color transition timeline ──────────
  lochiaTimeline: function () {
    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#127752; Animated: Lochia Changes After Delivery</div>' +
      '<svg viewBox="0 0 500 200" width="100%" style="max-width:500px;display:block;margin:0 auto;">' +
      '<defs>' +
        '<linearGradient id="loc-g1" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#c62828"/>' +
          '<stop offset="30%" stop-color="#c62828"/>' +
          '<stop offset="40%" stop-color="#e91e63"/>' +
          '<stop offset="55%" stop-color="#f48fb1"/>' +
          '<stop offset="70%" stop-color="#ffe0b2"/>' +
          '<stop offset="100%" stop-color="#fafafa"/>' +
        '</linearGradient>' +
        '<style>' +
          '.loc-lbl{font:10px var(--font-mono,monospace);fill:var(--color-foreground,#222);text-anchor:middle}' +
        '</style>' +
      '</defs>' +

      // Title
      '<text x="250" y="22" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground)">Postnatal Lochia: Color Changes Over 6 Weeks</text>' +

      // Main gradient bar
      '<rect x="30" y="45" width="440" height="40" rx="10" fill="url(#loc-g1)" stroke="var(--color-border,#ccc)" stroke-width="1.5"/>' +

      // Animated scanner line
      '<rect x="30" y="42" width="3" height="46" fill="#222" rx="1" opacity="0.7">' +
        '<animate attributeName="x" from="30" to="467" dur="6s" repeatCount="indefinite"/>' +
      '</rect>' +

      // Phase dividers
      '<line x1="163" y1="40" x2="163" y2="90" stroke="var(--color-foreground)" stroke-width="1" stroke-dasharray="3 2"/>' +
      '<line x1="295" y1="40" x2="295" y2="90" stroke="var(--color-foreground)" stroke-width="1" stroke-dasharray="3 2"/>' +

      // Day markers
      '<text x="30" y="105" class="loc-lbl">Day 1</text>' +
      '<text x="163" y="105" class="loc-lbl">Day 4</text>' +
      '<text x="295" y="105" class="loc-lbl">Day 10</text>' +
      '<text x="470" y="105" class="loc-lbl">6 weeks</text>' +

      // Phase labels
      '<rect x="40" y="120" width="110" height="70" rx="8" fill="#ffebee" stroke="#c62828" stroke-width="1.5"/>' +
      '<text x="95" y="138" text-anchor="middle" style="font:bold 11px var(--font-body,sans-serif)" fill="#c62828">Lochia Rubra</text>' +
      '<text x="95" y="153" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#d32f2f">Day 1-4</text>' +
      '<text x="95" y="166" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#d32f2f">BRIGHT RED</text>' +
      '<text x="95" y="179" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#e57373">Blood + decidua</text>' +

      '<rect x="170" y="120" width="115" height="70" rx="8" fill="#fce4ec" stroke="#e91e63" stroke-width="1.5"/>' +
      '<text x="227" y="138" text-anchor="middle" style="font:bold 11px var(--font-body,sans-serif)" fill="#c2185b">Lochia Serosa</text>' +
      '<text x="227" y="153" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#d81b60">Day 5-9</text>' +
      '<text x="227" y="166" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#d81b60">PINK-BROWN</text>' +
      '<text x="227" y="179" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#ec407a">Serous + WBCs</text>' +

      '<rect x="305" y="120" width="165" height="70" rx="8" fill="#fff8e1" stroke="#ff8f00" stroke-width="1.5"/>' +
      '<text x="387" y="138" text-anchor="middle" style="font:bold 11px var(--font-body,sans-serif)" fill="#e65100">Lochia Alba</text>' +
      '<text x="387" y="153" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#ef6c00">Day 10 onwards</text>' +
      '<text x="387" y="166" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#ef6c00">YELLOWISH-WHITE</text>' +
      '<text x="387" y="179" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="#ff9800">Mucus + epithelial</text>' +

      '</svg>' +
      '<div class="diagram-key">' +
        'The <strong>animated scanner line</strong> moves across the gradient showing how lochia color changes over 6 weeks. ' +
        '<strong>Red &#8594; Pink &#8594; White</strong>. If lochia returns to red or becomes foul-smelling = DANGER sign (infection)!' +
      '</div>' +
    '</div>';
  },

  // ─── 5. UTERINE INVOLUTION — Animated shrinking ─────────────
  uterineInvolution: function () {
    // Counters synced to the 8s shrink cycle. SMIL can't animate <text> content,
    // so we stack the 6 values and cross-fade them with a discrete opacity step.
    var days = ['1', '3', '7', '10', '14', '42'];
    var wts  = ['1000g', '750g', '500g', '300g', '100g', '60g'];
    function counterSteps(arr, x, y, size) {
      var keyTimes = '0;0.1667;0.3333;0.5;0.6667;0.8333;1', out = '';
      for (var k = 0; k < arr.length; k++) {
        var v = [];
        for (var m = 0; m < 6; m++) { v.push(m === k ? '1' : '0'); }
        v.push(k === 0 ? '1' : '0');   // 7th key wraps back to the first frame
        out += '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="var(--font-mono,monospace)" font-size="' + size + '" font-weight="bold" fill="#e91e63" opacity="' + (k === 0 ? '1' : '0') + '">' +
          '<animate attributeName="opacity" calcMode="discrete" values="' + v.join(';') + '" keyTimes="' + keyTimes + '" dur="8s" repeatCount="indefinite"/>' +
          arr[k] + '</text>';
      }
      return out;
    }
    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128315; Animated: Uterine Involution &mdash; Day-by-Day Shrinking</div>' +
      '<svg viewBox="0 0 500 320" width="100%" style="max-width:500px;display:block;margin:0 auto;">' +

      // Body outline (simplified torso)
      '<rect x="150" y="60" width="200" height="230" rx="30" fill="#fce4ec" stroke="#f48fb1" stroke-width="1.5" opacity="0.3"/>' +

      // Reference lines
      '<line x1="130" y1="120" x2="370" y2="120" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="4 3"/>' +
      '<text x="380" y="124" style="font:9px var(--font-mono,monospace)" fill="#757575">Umbilicus</text>' +

      '<line x1="130" y1="250" x2="370" y2="250" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="4 3"/>' +
      '<text x="380" y="254" style="font:9px var(--font-mono,monospace)" fill="#757575">Symphysis Pubis</text>' +

      // Animated uterus (shrinking)
      '<ellipse cx="250" cy="120" rx="55" ry="70" fill="#e91e63" opacity="0.6" stroke="#c2185b" stroke-width="2">' +
        '<animate attributeName="ry" values="70;60;48;35;22;14" dur="8s" repeatCount="indefinite"/>' +
        '<animate attributeName="cy" values="120;140;160;185;210;240" dur="8s" repeatCount="indefinite"/>' +
        '<animate attributeName="rx" values="55;48;40;32;22;14" dur="8s" repeatCount="indefinite"/>' +
        '<animate attributeName="opacity" values="0.6;0.55;0.5;0.45;0.4;0.35" dur="8s" repeatCount="indefinite"/>' +
      '</ellipse>' +

      // Day counter
      '<rect x="30" y="60" width="80" height="50" rx="10" fill="var(--color-card,#fff)" stroke="#e91e63" stroke-width="2"/>' +
      '<text x="70" y="82" text-anchor="middle" style="font:bold 10px var(--font-mono,monospace)" fill="#c2185b">DAY</text>' +
      counterSteps(days, 70, 101, '17px') +

      // Weight counter
      '<rect x="30" y="120" width="80" height="40" rx="10" fill="var(--color-card,#fff)" stroke="#e91e63" stroke-width="1.5"/>' +
      '<text x="70" y="140" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="#c2185b">Weight:</text>' +
      counterSteps(wts, 70, 156, '12px') +

      // Day markers on the side
      '<circle cx="370" cy="120" r="4" fill="#e91e63"/><text x="395" y="124" style="font:9px var(--font-mono,monospace)" fill="#c2185b">Day 1: At umbilicus</text>' +
      '<circle cx="370" cy="155" r="3" fill="#ec407a"/><text x="395" y="159" style="font:9px var(--font-mono,monospace)" fill="#c2185b">Day 3: 3 fingers below</text>' +
      '<circle cx="370" cy="185" r="3" fill="#f06292"/><text x="395" y="189" style="font:9px var(--font-mono,monospace)" fill="#c2185b">Day 7: Halfway</text>' +
      '<circle cx="370" cy="210" r="3" fill="#f48fb1"/><text x="395" y="214" style="font:9px var(--font-mono,monospace)" fill="#c2185b">Day 10: Pelvic brim</text>' +
      '<circle cx="370" cy="240" r="3" fill="#f8bbd0"/><text x="395" y="244" style="font:9px var(--font-mono,monospace)" fill="#c2185b">Day 14: Not palpable!</text>' +

      // Bottom info
      '<rect x="30" y="275" width="440" height="35" rx="8" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)"/>' +
      '<text x="250" y="293" text-anchor="middle" style="font:10px var(--font-body,sans-serif)" fill="var(--color-foreground,#222)">' +
        '<tspan font-weight="bold">Rate:</tspan> ~1 cm (1 finger-breadth) per day | ' +
        '<tspan font-weight="bold">1000g &#8594; 60g</tspan> in 6 weeks | ' +
        '<tspan font-weight="bold">Oxytocin</tspan> from breastfeeding speeds involution' +
      '</text>' +

      '</svg>' +
      '<div class="diagram-key">' +
        '<strong>Watch the uterus shrink!</strong> From umbilicus level (Day 1) to non-palpable (Day 14). ' +
        'Breastfeeding releases oxytocin which contracts the uterus = faster involution.' +
      '</div>' +
    '</div>';
  },

  // ─── 6. MENSTRUAL CYCLE — With hormone waves ────────────────
  menstrualCycle: function () {
    var r = 140, cx = 200, cy = 200;
    function arc(startDeg, endDeg, color) {
      var s = (startDeg - 90) * Math.PI / 180;
      var e = (endDeg - 90) * Math.PI / 180;
      var x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
      var x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
      var large = (endDeg - startDeg > 180) ? 1 : 0;
      return '<path d="M' + cx + ',' + cy + ' L' + x1.toFixed(1) + ',' + y1.toFixed(1) +
        ' A' + r + ',' + r + ' 0 ' + large + ',1 ' + x2.toFixed(1) + ',' + y2.toFixed(1) +
        ' Z" fill="' + color + '" stroke="var(--color-card,#fff)" stroke-width="2" class="mc-sector"/>';
    }
    function labelPos(midDeg) {
      var a = (midDeg - 90) * Math.PI / 180;
      return { x: (cx + (r * 0.65) * Math.cos(a)).toFixed(1), y: (cy + (r * 0.65) * Math.sin(a)).toFixed(1) };
    }

    var menstrualEnd = (5 / 28) * 360;
    var prolifEnd = (14 / 28) * 360;
    var ovulEnd = prolifEnd + (1 / 28) * 360;
    var secretEnd = 360;
    var p1 = labelPos(menstrualEnd / 2);
    var p2 = labelPos((menstrualEnd + prolifEnd) / 2);
    var p4 = labelPos((ovulEnd + secretEnd) / 2);

    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128312; Animated: Menstrual Cycle &mdash; 28-Day Phases + Hormone Waves</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;align-items:flex-start">' +

      // Circular chart
      '<svg viewBox="0 0 400 400" width="48%" style="min-width:200px;max-width:380px;">' +
      '<defs><style>' +
        '.mc-sector{transition:transform .3s,filter .3s;transform-origin:200px 200px;cursor:pointer}' +
        '.mc-sector:hover{transform:scale(1.05);filter:brightness(1.15) drop-shadow(0 0 6px rgba(0,0,0,.2))}' +
      '</style></defs>' +
      arc(0, menstrualEnd, '#c62828') +
      arc(menstrualEnd, prolifEnd, '#2e7d32') +
      arc(prolifEnd, ovulEnd, '#ff6f00') +
      arc(ovulEnd, secretEnd, '#1565c0') +
      '<text x="' + p1.x + '" y="' + p1.y + '" text-anchor="middle" font="bold 11px sans-serif" fill="#fff">Menstrual</text>' +
      '<text x="' + p1.x + '" y="' + (parseFloat(p1.y) + 13) + '" text-anchor="middle" font="9px monospace" fill="#ffcdd2">Day 1-5</text>' +
      '<text x="' + p2.x + '" y="' + p2.y + '" text-anchor="middle" font="bold 11px sans-serif" fill="#fff">Proliferative</text>' +
      '<text x="' + p2.x + '" y="' + (parseFloat(p2.y) + 13) + '" text-anchor="middle" font="9px monospace" fill="#c8e6c9">Day 6-14</text>' +
      '<text x="' + p4.x + '" y="' + p4.y + '" text-anchor="middle" font="bold 11px sans-serif" fill="#fff">Secretory</text>' +
      '<text x="' + p4.x + '" y="' + (parseFloat(p4.y) + 13) + '" text-anchor="middle" font="9px monospace" fill="#bbdefb">Day 15-28</text>' +
      // Ovulation pulse
      '<circle cx="' + (cx + r * Math.cos((prolifEnd - 90) * Math.PI / 180)).toFixed(1) + '" cy="' + (cy + r * Math.sin((prolifEnd - 90) * Math.PI / 180)).toFixed(1) + '" r="10" fill="#ff6f00" stroke="#fff" stroke-width="2">' +
        '<animate attributeName="r" values="8;16;8" dur="1.2s" repeatCount="indefinite"/>' +
        '<animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="indefinite"/>' +
      '</circle>' +
      '<text x="' + (cx + (r + 22) * Math.cos((prolifEnd - 90) * Math.PI / 180)).toFixed(1) + '" y="' + (cy + (r + 22) * Math.sin((prolifEnd - 90) * Math.PI / 180)).toFixed(1) + '" text-anchor="middle" font="bold 11px monospace" fill="#ff6f00">OVULATION</text>' +
      '<circle cx="200" cy="200" r="42" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)" stroke-width="2"/>' +
      '<text x="200" y="196" text-anchor="middle" font="bold 16px serif" fill="var(--color-foreground,#222)">28</text>' +
      '<text x="200" y="212" text-anchor="middle" font="10px sans-serif" fill="var(--color-muted-foreground,#888)">DAYS</text>' +
      '</svg>' +

      // Hormone wave chart
      '<svg viewBox="0 0 300 380" width="48%" style="min-width:200px;max-width:300px;">' +
      '<defs><style>' +
        '@keyframes hw-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}' +
        '.hw-line{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:1;animation:hw-draw 4s ease-out forwards}' +
      '</style></defs>' +
      '<text x="150" y="18" text-anchor="middle" style="font:bold 11px var(--font-body,sans-serif)" fill="var(--color-foreground)">Hormone Levels</text>' +

      // X axis
      '<line x1="30" y1="350" x2="280" y2="350" stroke="var(--color-border,#ccc)" stroke-width="1"/>' +
      '<text x="30" y="368" font="8px monospace" fill="#999">Day 1</text>' +
      '<text x="140" y="368" font="8px monospace" fill="#ff6f00">Day 14</text>' +
      '<text x="260" y="368" font="8px monospace" fill="#999">Day 28</text>' +
      '<line x1="148" y1="30" x2="148" y2="350" stroke="#ff6f00" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>' +

      // FSH curve (blue, peaks early)
      '<path d="M30,320 Q80,200 148,290 Q200,330 280,330" class="hw-line" pathLength="1" stroke="#2196f3" style="animation-delay:0s"/>' +
      '<text x="70" y="210" font="bold 9px monospace" fill="#2196f3">FSH</text>' +

      // LH curve (orange, sharp spike at day 14)
      '<path d="M30,330 Q100,320 140,330 L148,100 L156,310 Q200,340 280,340" class="hw-line" pathLength="1" stroke="#ff6f00" style="animation-delay:0.5s"/>' +
      '<text x="160" y="95" font="bold 9px monospace" fill="#ff6f00">LH SURGE!</text>' +

      // Estrogen curve (green, rises then falls)
      '<path d="M30,340 Q80,300 120,200 Q140,170 148,180 Q200,250 240,280 Q260,300 280,320" class="hw-line" pathLength="1" stroke="#4caf50" style="animation-delay:1s"/>' +
      '<text x="110" y="190" font="bold 9px monospace" fill="#4caf50">Estrogen</text>' +

      // Progesterone curve (purple, rises after ovulation)
      '<path d="M30,345 Q100,340 148,340 Q180,250 210,180 Q230,170 250,200 Q270,280 280,330" class="hw-line" pathLength="1" stroke="#9c27b0" style="animation-delay:1.5s"/>' +
      '<text x="220" y="170" font="bold 9px monospace" fill="#9c27b0">Progesterone</text>' +

      // Endometrium thickness bar
      '<text x="150" y="40" text-anchor="middle" style="font:10px var(--font-body,sans-serif)" fill="var(--color-foreground)">Endometrium</text>' +
      '<rect x="30" y="48" width="250" height="15" rx="4" fill="#eee" stroke="#ccc"/>' +
      '<rect x="30" y="48" width="0" height="15" rx="4" fill="#e91e63" opacity="0.6">' +
        '<animate attributeName="width" values="250;50;100;180;250;250;250" dur="6s" repeatCount="indefinite"/>' +
      '</rect>' +
      '<text x="155" y="59" text-anchor="middle" font="8px monospace" fill="#fff">sheds &#8594; rebuilds &#8594; thick &#8594; sheds</text>' +

      '</svg>' +
      '</div>' +
      '<div class="diagram-key">' +
        '<strong>Hover pie sectors</strong> to highlight phases. Watch <strong>hormone curves draw themselves</strong> — ' +
        'the LH spike triggers ovulation on Day 14! The endometrium bar shows lining thickness cycling. ' +
        'Remember: <strong>M-P-O-S</strong> = "My Period Occurs Soon"' +
      '</div>' +
    '</div>';
  },

  // ─── 7. FETAL SKULL — Interactive ────────────────────────────
  fetalSkull: function () {
    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128128; Interactive: Fetal Skull &mdash; Fontanelles, Sutures &amp; Diameters</div>' +
      '<svg viewBox="0 0 500 440" width="100%" style="max-width:500px;display:block;margin:0 auto;">' +
      '<defs><style>' +
        '.fs2-bone{fill:var(--color-card,#fffdf5);stroke:var(--color-foreground,#222);stroke-width:1.5}' +
        '.fs2-suture{fill:none;stroke:#8d6e63;stroke-width:2.5;stroke-dasharray:6 3}' +
        '@keyframes fs2-pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}' +
        '.fs2-af{fill:#fff176;stroke:#f9a825;stroke-width:2.5;animation:fs2-pulse 2s ease-in-out infinite;transform-origin:250px 155px;cursor:pointer}' +
        '.fs2-pf{fill:#a5d6a7;stroke:#43a047;stroke-width:2;animation:fs2-pulse 2.5s ease-in-out infinite;transform-origin:250px 290px;cursor:pointer}' +
        '.fs2-dim{stroke-width:2.5;cursor:pointer;transition:all .3s}' +
        '.fs2-dim:hover{stroke-width:5;filter:drop-shadow(0 0 4px currentColor)}' +
        '.fs2-dlbl{font:bold 10px var(--font-mono,monospace);pointer-events:none}' +
      '</style></defs>' +

      // Skull outline
      '<ellipse cx="250" cy="200" rx="165" ry="190" class="fs2-bone"/>' +

      // Sutures with labels
      '<line x1="250" y1="15" x2="250" y2="130" class="fs2-suture"/>' +
      '<path d="M125,135 Q250,160 375,135" class="fs2-suture"/>' +
      '<line x1="250" y1="180" x2="250" y2="370" class="fs2-suture"/>' +
      '<path d="M125,300 Q250,275 375,300" class="fs2-suture"/>' +

      // Suture labels
      '<text x="205" y="55" style="font:italic 9px var(--font-body,sans-serif)" fill="#8d6e63">Frontal S.</text>' +
      '<text x="370" y="125" style="font:italic 9px var(--font-body,sans-serif)" fill="#8d6e63">Coronal S.</text>' +
      '<text x="270" y="260" style="font:italic 9px var(--font-body,sans-serif)" fill="#8d6e63">Sagittal S.</text>' +
      '<text x="370" y="318" style="font:italic 9px var(--font-body,sans-serif)" fill="#8d6e63">Lambdoid S.</text>' +

      // Bone labels
      '<text x="180" y="85" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground)">Frontal</text>' +
      '<text x="320" y="85" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground)">Frontal</text>' +
      '<text x="145" y="220" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground)">Parietal</text>' +
      '<text x="355" y="220" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground)">Parietal</text>' +
      '<text x="250" y="355" text-anchor="middle" style="font:bold 12px var(--font-body,sans-serif)" fill="var(--color-foreground)">Occipital</text>' +

      // Anterior Fontanelle (diamond, pulsing)
      '<polygon points="250,120 275,155 250,190 225,155" class="fs2-af"/>' +
      '<text x="250" y="158" text-anchor="middle" font="bold 8px sans-serif" fill="#e65100">Bregma</text>' +
      '<text x="300" y="140" style="font:bold 10px var(--font-body,sans-serif)" fill="#e65100">Anterior F.</text>' +
      '<text x="300" y="153" style="font:9px var(--font-mono,monospace)" fill="#ef6c00">Diamond &#9830;</text>' +
      '<text x="300" y="165" style="font:8px var(--font-mono,monospace)" fill="#ff8f00">Closes: 18 months</text>' +

      // Posterior Fontanelle (triangle, pulsing)
      '<polygon points="250,278 268,298 232,298" class="fs2-pf"/>' +
      '<text x="250" y="293" text-anchor="middle" font="bold 7px sans-serif" fill="#2e7d32">&#9652;</text>' +
      '<text x="300" y="293" style="font:bold 10px var(--font-body,sans-serif)" fill="#2e7d32">Posterior F.</text>' +
      '<text x="300" y="306" style="font:9px var(--font-mono,monospace)" fill="#43a047">Triangle &#9650;</text>' +
      '<text x="300" y="318" style="font:8px var(--font-mono,monospace)" fill="#66bb6a">Closes: 6-8 weeks</text>' +

      // ── DIAMETERS (hoverable) ──
      // Biparietal
      '<line x1="85" y1="200" x2="415" y2="200" class="fs2-dim" stroke="#1565c0"/>' +
      '<rect x="185" y="206" width="130" height="18" rx="4" fill="#e3f2fd" stroke="#1565c0" stroke-width="1"/>' +
      '<text x="250" y="219" text-anchor="middle" class="fs2-dlbl" fill="#1565c0">Biparietal 9.5 cm</text>' +

      // Suboccipitobregmatic
      '<line x1="250" y1="135" x2="250" y2="365" class="fs2-dim" stroke="#d32f2f" opacity="0.6"/>' +
      '<rect x="115" y="374" width="135" height="18" rx="4" fill="#ffebee" stroke="#d32f2f" stroke-width="1"/>' +
      '<text x="182" y="387" text-anchor="middle" class="fs2-dlbl" fill="#d32f2f">SOB 9.5 cm (best!)</text>' +

      // Submentobregmatic
      '<line x1="170" y1="135" x2="330" y2="365" class="fs2-dim" stroke="#4caf50" opacity="0.4"/>' +
      '<rect x="290" y="374" width="150" height="18" rx="4" fill="#e8f5e9" stroke="#4caf50" stroke-width="1"/>' +
      '<text x="365" y="387" text-anchor="middle" class="fs2-dlbl" fill="#4caf50">S.mentobregmatic 9.5cm</text>' +

      // Info box
      '<rect x="10" y="400" width="480" height="35" rx="8" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)"/>' +
      '<text x="250" y="417" text-anchor="middle" style="font:10px var(--font-body,sans-serif)" fill="var(--color-foreground)">' +
        '<tspan font-weight="bold" fill="#d32f2f">SOB 9.5cm</tspan> = well-flexed vertex (BEST for delivery!) | ' +
        '<tspan font-weight="bold" fill="#1565c0">Biparietal 9.5cm</tspan> = widest transverse</text>' +
      '<text x="250" y="432" text-anchor="middle" style="font:9px var(--font-mono,monospace)" fill="var(--color-muted-foreground)">' +
        'Presenting part in vertex = Occiput. Denominator = O. Position = LOA (most common).</text>' +

      '</svg>' +
      '<div class="diagram-key">' +
        '<strong>Pulsing shapes</strong> = fontanelles (&#9830; diamond = anterior, &#9650; triangle = posterior). ' +
        '<strong>Hover diameter lines</strong> to highlight. The anterior fontanelle helps identify position during vaginal exam.' +
      '</div>' +
    '</div>';
  },

  // ─── 8. MECHANISM OF LABOUR — Rich step-through ─────────────
  mechanismOfLabour: function () {
    var steps = [
      { n: '1', title: 'Engagement', desc: 'Widest diameter of head enters pelvic inlet in transverse position. Biparietal diameter passes through.', icon: '&#8595;', color: '#1565c0' },
      { n: '2', title: 'Descent', desc: 'Continuous downward movement through the pelvis. Aided by uterine contractions and maternal pushing.', icon: '&#11015;', color: '#0d47a1' },
      { n: '3', title: 'Flexion', desc: 'Chin touches chest — presents the SMALLEST diameter (SOB 9.5cm). Better flexion = easier delivery!', icon: '&#128170;', color: '#2e7d32' },
      { n: '4', title: 'Internal Rotation', desc: 'Head rotates 90° from transverse to AP diameter. Occiput turns to face symphysis pubis (anterior).', icon: '&#128260;', color: '#7b1fa2' },
      { n: '5', title: 'Extension', desc: 'Head extends as it passes under the symphysis pubis. Occiput slides out first, then face sweeps over perineum.', icon: '&#8593;', color: '#c62828' },
      { n: '6', title: 'Restitution', desc: 'Head rotates 45° back to realign with the shoulders. Undoes the internal rotation.', icon: '&#128260;', color: '#00695c' },
      { n: '7', title: 'External Rotation', desc: 'Head rotates another 45° as shoulders enter AP diameter of the outlet.', icon: '&#128260;', color: '#4527a0' },
      { n: '8', title: 'Expulsion', desc: 'Anterior shoulder delivers under symphysis, posterior shoulder sweeps over perineum. Body follows easily!', icon: '&#127881;', color: '#bf360c' }
    ];

    var html = '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128118; Animated: Cardinal Movements of Normal Labour</div>' +
      '<div class="mol-container">';

    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      var delay = (i * 0.12).toFixed(2);
      html += '<div class="mol-step" style="animation-delay:' + delay + 's;border-left-color:' + s.color + '">' +
        '<div class="mol-num" style="background:' + s.color + '">' + s.n + '</div>' +
        '<div class="mol-content">' +
          '<div class="mol-title">' + s.icon + ' ' + s.title + '</div>' +
          '<div class="mol-desc">' + s.desc + '</div>' +
        '</div>';
      if (i < steps.length - 1) {
        html += '<div class="mol-arrow">&#8595;</div>';
      }
      html += '</div>';
    }

    html += '</div>' +
      '<div class="diagram-key"><strong>Mnemonic:</strong> "' +
      '<span style="color:#1565c0">E</span>very ' +
      '<span style="color:#0d47a1">D</span>arn ' +
      '<span style="color:#2e7d32">F</span>ool ' +
      '<span style="color:#7b1fa2">I</span>n ' +
      '<span style="color:#c62828">E</span>ngland ' +
      '<span style="color:#00695c">R</span>ides ' +
      '<span style="color:#4527a0">E</span>lectric ' +
      '<span style="color:#bf360c">E</span>els" — each step animates in sequence. Hover to highlight!</div>' +
    '</div>';
    return html;
  },

  // ─── 9. ESSENTIAL NEWBORN CARE — Enhanced ───────────────────
  essentialNewbornCare: function () {
    var steps = [
      { emoji: '&#128118;', title: 'Receive Baby', time: '0 sec', desc: 'Place on mother\'s abdomen', color: '#c62828' },
      { emoji: '&#129528;', title: 'Dry &amp; Stimulate', time: '30 sec', desc: 'Rub back, flick soles gently', color: '#e65100' },
      { emoji: '&#127777;&#65039;', title: 'Warmth (KMC)', time: 'Immediate', desc: 'Skin-to-skin, cap on head', color: '#ef6c00' },
      { emoji: '&#9986;&#65039;', title: 'Clamp &amp; Cut Cord', time: '1-3 min', desc: 'Delayed clamping, 2 clamps', color: '#2e7d32' },
      { emoji: '&#128168;', title: 'Clear Airway', time: 'Only if needed', desc: 'Suction mouth then nose', color: '#1565c0' },
      { emoji: '&#128203;', title: 'APGAR at 1 &amp; 5 min', time: '1 min, 5 min', desc: 'Score out of 10', color: '#4527a0' },
      { emoji: '&#129329;', title: 'Breastfeeding', time: 'Within 1 hour', desc: 'Colostrum = liquid gold!', color: '#ad1457' },
      { emoji: '&#128137;', title: 'Vitamin K + Vaccines', time: 'Before discharge', desc: 'Vit K IM, BCG, OPV-0, HepB-0', color: '#00695c' }
    ];

    var html = '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#127775; Animated: Essential Newborn Care &mdash; The Golden Hour</div>' +
      '<div class="enc-flow">';

    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      var delay = (i * 0.15).toFixed(2);
      html += '<div class="enc-step" style="animation-delay:' + delay + 's">' +
        '<div class="enc-icon" style="border-color:' + s.color + '">' + s.emoji + '</div>' +
        '<div class="enc-info">' +
          '<div class="enc-title" style="color:' + s.color + '">' + s.title + '</div>' +
          '<div class="enc-time">' + s.time + ' &mdash; ' + s.desc + '</div>' +
        '</div>' +
      '</div>';
      if (i < steps.length - 1) {
        html += '<div class="enc-connector"><div class="enc-dot"></div></div>';
      }
    }

    html += '</div>' +
      '<div class="diagram-key"><strong>DWCABFV</strong> = Dry, Warmth, Cord, Airway, Breastfeed, Vitamin K. ' +
      'Animated dots travel between steps showing the sequence. Hover icons to enlarge!</div>' +
    '</div>';
    return html;
  },

  // ─── 10. PLACENTA FUNCTIONS — Hub-spoke ─────────────────────
  placentaFunctions: function () {
    var funcs = [
      { icon: '&#127747;', name: 'Respiratory', desc: 'O&#8322; in, CO&#8322; out', angle: 0, color: '#d32f2f' },
      { icon: '&#127829;', name: 'Nutritive', desc: 'Glucose, amino acids', angle: 51, color: '#e65100' },
      { icon: '&#128701;', name: 'Excretory', desc: 'Urea, bilirubin out', angle: 103, color: '#2e7d32' },
      { icon: '&#128737;', name: 'Protective', desc: 'Barrier (imperfect!)', angle: 154, color: '#1565c0' },
      { icon: '&#9878;', name: 'Endocrine', desc: 'hCG, hPL, Est, Prog', angle: 206, color: '#7b1fa2' },
      { icon: '&#128230;', name: 'Storage', desc: 'Glycogen, iron, fat', angle: 257, color: '#00695c' },
      { icon: '&#128170;', name: 'Immune', desc: 'IgG &#8594; baby', angle: 309, color: '#4527a0' }
    ];

    var cx = 220, cy = 200, r = 130, ir = 42;
    var html = '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#127793; Interactive: 7 Functions of the Placenta</div>' +
      '<svg viewBox="0 0 440 420" width="100%" style="max-width:440px;display:block;margin:0 auto;">' +
      '<defs><style>' +
        '.pf-spoke{stroke:var(--color-border,#ccc);stroke-width:1.5;stroke-dasharray:4 3}' +
        '.pf-node{cursor:pointer;transition:transform .3s}' +
        '.pf-node:hover{transform:scale(1.15)}' +
        '@keyframes pf-orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}' +
        '.pf-orbit{animation:pf-orbit 20s linear infinite;transform-origin:220px 200px}' +
      '</style></defs>';

    // Rotating orbit ring
    html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="var(--color-border,#eee)" stroke-width="1" stroke-dasharray="2 4"/>';

    // Orbiting dot
    html += '<circle cx="' + (cx + r) + '" cy="' + cy + '" r="4" fill="var(--color-accent,#e91e63)" class="pf-orbit"/>';

    // Center hub
    html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + ir + '" fill="var(--color-primary,#222)"/>';
    html += '<text x="' + cx + '" y="' + (cy - 6) + '" text-anchor="middle" font="bold 13px serif" fill="#fff">Placenta</text>';
    html += '<text x="' + cx + '" y="' + (cy + 9) + '" text-anchor="middle" font="9px monospace" fill="#ccc">500g | 20cm</text>';
    html += '<text x="' + cx + '" y="' + (cy + 21) + '" text-anchor="middle" font="8px monospace" fill="#aaa">All-in-One!</text>';

    for (var i = 0; i < funcs.length; i++) {
      var f = funcs[i];
      var a = (f.angle - 90) * Math.PI / 180;
      var nx = cx + r * Math.cos(a);
      var ny = cy + r * Math.sin(a);

      html += '<line x1="' + cx + '" y1="' + cy + '" x2="' + nx.toFixed(1) + '" y2="' + ny.toFixed(1) + '" class="pf-spoke"/>';
      html += '<g class="pf-node" style="transform-origin:' + nx.toFixed(1) + 'px ' + ny.toFixed(1) + 'px">';
      html += '<circle cx="' + nx.toFixed(1) + '" cy="' + ny.toFixed(1) + '" r="34" fill="' + f.color + '" opacity="0.12" stroke="' + f.color + '" stroke-width="2"/>';
      html += '<text x="' + nx.toFixed(1) + '" y="' + (ny - 8).toFixed(1) + '" text-anchor="middle" font-size="20">' + f.icon + '</text>';
      html += '<text x="' + nx.toFixed(1) + '" y="' + (ny + 9).toFixed(1) + '" text-anchor="middle" style="font:bold 10px var(--font-body,sans-serif)" fill="' + f.color + '">' + f.name + '</text>';
      html += '<text x="' + nx.toFixed(1) + '" y="' + (ny + 22).toFixed(1) + '" text-anchor="middle" style="font:8px var(--font-mono,monospace)" fill="var(--color-muted-foreground,#888)">' + f.desc + '</text>';
      html += '</g>';
    }

    html += '<rect x="25" y="378" width="390" height="32" rx="8" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)"/>';
    html += '<text x="220" y="399" text-anchor="middle" style="font:10px var(--font-mono,monospace)" fill="var(--color-foreground)"><tspan font-weight="bold">PRENSS+I</tspan> = Protective, Respiratory, Excretory, Nutritive, Storage, Secretory + Immune</text>';

    html += '</svg></div>';
    return html;
  },

  // ─── 11. APGAR SCORE — Interactive grid ──────────────────────
  apgarScore: function () {
    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128203; Interactive: APGAR Score Chart</div>' +
      '<div class="apgar-grid">' +
        '<div class="apgar-row apgar-header">' +
          '<div class="apgar-cell apgar-sign">Sign</div>' +
          '<div class="apgar-cell apgar-0">Score 0</div>' +
          '<div class="apgar-cell apgar-1">Score 1</div>' +
          '<div class="apgar-cell apgar-2">Score 2 (Best)</div>' +
        '</div>' +
        '<div class="apgar-row">' +
          '<div class="apgar-cell apgar-sign"><strong>A</strong>ppearance (Color)</div>' +
          '<div class="apgar-cell apgar-0">Blue / Pale all over</div>' +
          '<div class="apgar-cell apgar-1">Pink body, blue hands/feet</div>' +
          '<div class="apgar-cell apgar-2">Completely pink &#10084;&#65039;</div>' +
        '</div>' +
        '<div class="apgar-row">' +
          '<div class="apgar-cell apgar-sign"><strong>P</strong>ulse (Heart Rate)</div>' +
          '<div class="apgar-cell apgar-0">Absent (no heartbeat)</div>' +
          '<div class="apgar-cell apgar-1">&lt; 100 beats/min (slow)</div>' +
          '<div class="apgar-cell apgar-2">&gt; 100 beats/min &#128147;</div>' +
        '</div>' +
        '<div class="apgar-row">' +
          '<div class="apgar-cell apgar-sign"><strong>G</strong>rimace (Reflex)</div>' +
          '<div class="apgar-cell apgar-0">No response to stimulation</div>' +
          '<div class="apgar-cell apgar-1">Grimace / weak cry</div>' +
          '<div class="apgar-cell apgar-2">Vigorous cry / cough &#128557;</div>' +
        '</div>' +
        '<div class="apgar-row">' +
          '<div class="apgar-cell apgar-sign"><strong>A</strong>ctivity (Tone)</div>' +
          '<div class="apgar-cell apgar-0">Limp / floppy</div>' +
          '<div class="apgar-cell apgar-1">Some flexion of limbs</div>' +
          '<div class="apgar-cell apgar-2">Active movement &#128170;</div>' +
        '</div>' +
        '<div class="apgar-row">' +
          '<div class="apgar-cell apgar-sign"><strong>R</strong>espiration (Breathing)</div>' +
          '<div class="apgar-cell apgar-0">Absent (not breathing)</div>' +
          '<div class="apgar-cell apgar-1">Slow / irregular / weak</div>' +
          '<div class="apgar-cell apgar-2">Strong cry, regular &#128172;</div>' +
        '</div>' +
        '<div class="apgar-result">' +
          '<span class="apgar-badge good">7-10 = Normal baby &#127881;</span>' +
          '<span class="apgar-badge moderate">4-6 = Moderate asphyxia</span>' +
          '<span class="apgar-badge severe">0-3 = SEVERE &#8594; Resuscitate!</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  },

  // ─── 12. STAGES OF LABOUR — Animated timeline (Unit 4) ──────
  stagesOfLabour: function () {
    var stages = [
      { n: '1', name: 'Dilatation', sub: 'Onset of true labour &rarr; full dilatation (10 cm)', detail: 'Latent 0&rarr;4 cm (slow), then Active 4&rarr;10 cm (~1 cm/hr). By far the longest stage.', dur: 'Primi ~12 hr &middot; Multi ~6&ndash;8 hr', col: '#1565c0', w: 46 },
      { n: '2', name: 'Expulsion', sub: 'Full dilatation &rarr; birth of the baby', detail: 'Mother bears down with contractions; the cardinal movements deliver the head, then the body.', dur: 'Primi &le;2 hr &middot; Multi &le;1 hr', col: '#c62828', w: 20 },
      { n: '3', name: 'Placental', sub: 'Birth of baby &rarr; delivery of placenta', detail: 'Separation signs: cord lengthens, gush of blood, uterus rises &amp; hardens. Use AMTSL.', dur: '5&ndash;15 min (&le;30)', col: '#2e7d32', w: 16 },
      { n: '4', name: 'Recovery', sub: 'First 1&ndash;2 hours after the placenta', detail: 'Close watch for PPH: check uterine tone, bleeding, BP &amp; pulse. The &ldquo;golden hour.&rdquo;', dur: '1&ndash;2 hr watch', col: '#6a1b9a', w: 18 }
    ];
    var html = '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#9201;&#65039; Animated: The 4 Stages of Labour</div>' +
      '<style>' +
        '.sl-track{position:relative;display:flex;width:100%;height:52px;border-radius:10px;overflow:hidden;border:1px solid var(--color-border,#ddd)}' +
        '.sl-seg{display:flex;align-items:center;justify-content:center;color:#fff;padding:.2rem;text-align:center;min-width:0;font-family:var(--font-body,sans-serif);font-size:.78rem;font-weight:700;line-height:1.1}' +
        '.sl-marker{position:absolute;top:-2px;bottom:-2px;width:3px;background:#111;box-shadow:0 0 7px rgba(0,0,0,.55);animation:sl-sweep 12s linear infinite}' +
        '.sl-marker::after{content:"";position:absolute;top:-5px;left:-4px;width:11px;height:11px;border-radius:50%;background:#111}' +
        '@keyframes sl-sweep{0%{left:0}100%{left:calc(100% - 3px)}}' +
        '.sl-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.6rem;margin-top:.9rem}' +
        '.sl-card{border-top:4px solid var(--sc);border-radius:8px;padding:.6rem .7rem;background:color-mix(in oklch,var(--sc) 8%,transparent);animation:sl-in .5s cubic-bezier(.16,1,.3,1) both}' +
        '@keyframes sl-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}' +
        '.sl-card h4{margin:0 0 .2rem;font-family:var(--font-body,sans-serif);font-size:.86rem;color:var(--sc)}' +
        '.sl-sub{font-family:var(--font-mono,monospace);font-size:.66rem;color:var(--color-muted-foreground,#777);margin-bottom:.3rem}' +
        '.sl-det{font-size:.78rem;line-height:1.4}' +
        '.sl-dur{display:inline-block;margin-top:.4rem;font-family:var(--font-mono,monospace);font-size:.66rem;font-weight:700;color:var(--sc)}' +
      '</style>' +
      '<div class="sl-track">';
    for (var i = 0; i < stages.length; i++) {
      var s = stages[i];
      html += '<div class="sl-seg" style="flex:' + s.w + ' ' + s.w + ' 0;background:' + s.col + '">' + s.n + '. ' + s.name + '</div>';
    }
    html += '<div class="sl-marker"></div></div><div class="sl-cards">';
    for (var j = 0; j < stages.length; j++) {
      var c = stages[j];
      html += '<div class="sl-card" style="--sc:' + c.col + ';animation-delay:' + (j * 0.12).toFixed(2) + 's">' +
        '<h4>Stage ' + c.n + ': ' + c.name + '</h4>' +
        '<div class="sl-sub">' + c.sub + '</div>' +
        '<div class="sl-det">' + c.detail + '</div>' +
        '<div class="sl-dur">' + c.dur + '</div>' +
      '</div>';
    }
    html += '</div>' +
      '<div class="diagram-key"><strong>Watch the marker sweep</strong> across the four stages &mdash; each segment&rsquo;s width shows how long that stage lasts (Stage 1 dominates). <strong>Stage 4</strong> is the critical PPH-watch window. Remember the flow: <em>Dilate &rarr; Deliver &rarr; Detach (placenta) &rarr; Observe.</em></div>' +
    '</div>';
    return html;
  },

  // ─── 13. NST (CTG) — Animated reactive trace (Unit 3) ────────
  nstTrace: function () {
    return '<div class="interactive-diagram">' +
      '<div class="diagram-title">&#128147; Animated: Non-Stress Test (CTG) &mdash; A Reactive Trace</div>' +
      '<svg viewBox="0 0 520 250" width="100%" style="max-width:520px;display:block;margin:0 auto;">' +
      '<defs><style>' +
        '@keyframes nst-bounce{0%,100%{opacity:.4;transform:translateY(0)}50%{opacity:1;transform:translateY(-4px)}}' +
        '.nst-mv{animation:nst-bounce 1.4s ease-in-out infinite}' +
        '.nst-mv2{animation:nst-bounce 1.4s ease-in-out infinite;animation-delay:.5s}' +
      '</style></defs>' +
      // CTG paper + gridlines
      '<rect x="52" y="34" width="438" height="150" fill="var(--color-card,#fff)" stroke="var(--color-border,#ccc)"/>' +
      '<line x1="52" y1="70" x2="490" y2="70" stroke="var(--color-border,#eee)" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<line x1="52" y1="110" x2="490" y2="110" stroke="#ef9a9a" stroke-width="1" stroke-dasharray="4 3"/>' +
      '<line x1="52" y1="150" x2="490" y2="150" stroke="var(--color-border,#eee)" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<text x="46" y="73" text-anchor="end" font-size="9" fill="var(--color-muted-foreground,#888)">160</text>' +
      '<text x="46" y="113" text-anchor="end" font-size="9" fill="#d32f2f">140</text>' +
      '<text x="46" y="153" text-anchor="end" font-size="9" fill="var(--color-muted-foreground,#888)">100</text>' +
      '<text x="271" y="200" text-anchor="middle" font-size="9" fill="var(--color-muted-foreground,#888)">&larr; 20 minutes &rarr;</text>' +
      // FHR trace: baseline 140 with two accelerations
      '<path d="M52,110 L120,110 Q150,111 165,85 Q185,79 205,86 Q222,111 255,110 L305,110 Q335,111 350,83 Q370,78 388,84 Q404,111 435,110 L490,110" fill="none" stroke="#d32f2f" stroke-width="2.5" stroke-linejoin="round"/>' +
      // acceleration labels
      '<text x="185" y="70" text-anchor="middle" font-size="9" font-weight="bold" fill="#2e7d32">&#8593;15+ bpm</text>' +
      '<text x="369" y="66" text-anchor="middle" font-size="9" font-weight="bold" fill="#2e7d32">&#8593;15+ bpm</text>' +
      // moving scan cursor
      '<rect x="52" y="32" width="2.5" height="154" rx="1" fill="#111" opacity="0.55"><animate attributeName="x" from="52" to="487" dur="7s" repeatCount="indefinite"/></rect>' +
      // fetal-movement markers under each acceleration
      '<line x1="185" y1="185" x2="185" y2="205" stroke="#2e7d32" stroke-width="1" stroke-dasharray="2 2"/>' +
      '<line x1="369" y1="185" x2="369" y2="205" stroke="#2e7d32" stroke-width="1" stroke-dasharray="2 2"/>' +
      '<g class="nst-mv" style="transform-origin:185px 218px"><text x="185" y="224" text-anchor="middle" font-size="20">&#128118;</text></g>' +
      '<g class="nst-mv2" style="transform-origin:369px 218px"><text x="369" y="224" text-anchor="middle" font-size="20">&#128118;</text></g>' +
      '<text x="277" y="240" text-anchor="middle" font-size="9" fill="#2e7d32">baby moves &rarr; heart rate jumps up (acceleration)</text>' +
      '</svg>' +
      '<div class="diagram-key"><strong>Watch the heart-rate line rise</strong> each time the baby moves. A <strong>Reactive</strong> (normal) NST = <strong>at least 2 accelerations of &ge;15 bpm lasting &ge;15 seconds within 20 minutes</strong>. No accelerations = non-reactive &rarr; do a biophysical profile.</div>' +
    '</div>';
  },

  // ─── NRS-1. RESEARCH PROCESS FLOWCHART ───────────────────────
  researchProcess: function () {
    var steps = [
      ['Problem Identification','#6366f1'],['Literature Review','#8b5cf6'],
      ['Conceptual Framework','#a855f7'],['Research Design','#ec4899'],
      ['Sampling','#f43f5e'],['Data Collection','#ef4444'],
      ['Data Analysis','#f97316'],['Report Writing','#eab308'],
      ['Utilization / EBP','#22c55e']
    ];
    // 3x3 grid, left-to-right top-to-bottom
    var bW=130,bH=54,rr=10,gapX=60,gapY=20,startX=18,startY=30;
    var positions=[];
    for(var i=0;i<9;i++){
      var col=i%3, row=Math.floor(i/3);
      positions.push([startX+col*(bW+gapX), startY+row*(bH+gapY)]);
    }
    var arrows='';
    for(var a=0;a<steps.length-1;a++){
      var p0=positions[a],p1=positions[a+1];
      var isSameRow=(Math.floor(a/3)===Math.floor((a+1)/3));
      var x1,y1,x2,y2,d;
      if(isSameRow){
        x1=p0[0]+bW; y1=p0[1]+bH/2; x2=p1[0]; y2=p1[1]+bH/2;
        d='M'+x1+','+y1+' L'+x2+','+y2;
      } else {
        // wrap: right-end of last col row to left-start of first col next row
        x1=p0[0]+bW/2; y1=p0[1]+bH;
        x2=p1[0]+bW/2; y2=p1[1];
        d='M'+x1+','+y1+' C'+x1+','+(y1+12)+' '+x2+','+(y2-12)+' '+x2+','+y2;
      }
      arrows+='<path d="'+d+'" fill="none" stroke="#94a3b8" stroke-width="1.8" marker-end="url(#rpa)">'
        +'<animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="'+(a*0.3)+'s" repeatCount="indefinite"/>'
        +'</path>';
    }
    var boxes='';
    for(var b=0;b<steps.length;b++){
      var s=steps[b],px=positions[b][0],py=positions[b][1],c=s[1],delay=(b*0.35).toFixed(2);
      boxes+='<rect x="'+px+'" y="'+py+'" width="'+bW+'" height="'+bH+'" rx="'+rr+'" fill="'+c+'" opacity="0.12">'
        +'<animate attributeName="opacity" values="0.08;0.22;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/>'
        +'</rect>'
        +'<rect x="'+px+'" y="'+py+'" width="'+bW+'" height="'+bH+'" rx="'+rr+'" fill="none" stroke="'+c+'" stroke-width="2">'
        +'<animate attributeName="stroke-width" values="1.5;3;1.5" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/>'
        +'</rect>'
        +'<circle cx="'+(px+16)+'" cy="'+(py+16)+'" r="10" fill="'+c+'"/>'
        +'<text x="'+(px+16)+'" y="'+(py+20)+'" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">'+(b+1)+'</text>';
      var words=s[0].split(' ');
      var line1=words.slice(0,2).join(' '), line2=words.slice(2).join(' ');
      boxes+='<text x="'+(px+bW/2+4)+'" y="'+(py+28)+'" text-anchor="middle" fill="'+c+'" font-size="9.5" font-weight="600">'+line1+'</text>';
      if(line2) boxes+='<text x="'+(px+bW/2+4)+'" y="'+(py+42)+'" text-anchor="middle" fill="'+c+'" font-size="9.5" font-weight="600">'+line2+'</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">⚗ Animated: 9 Steps of the Research Process</div>'
      +'<svg viewBox="0 0 576 248" width="100%" style="max-width:576px;display:block;margin:0 auto;">'
        +'<defs><marker id="rpa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +arrows+boxes
      +'</svg>'
      +'<div class="diagram-key"><strong>9 Steps glow in sequence.</strong> Research flows from Problem Identification → Literature Review → Framework → Design → Sampling → Data Collection → Analysis → Report → EBP Utilization. Each step builds on the last.</div>'
    +'</div>';
  },

  // ─── NRS-2. EBP TRIAD — Pulsing Venn Diagram ─────────────────
  ebpTriad: function () {
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">⊕ Animated: Evidence-Based Practice (EBP) Triad</div>'
      +'<svg viewBox="0 0 460 350" width="100%" style="max-width:460px;display:block;margin:0 auto;">'
        +'<defs>'
          +'<filter id="ebpglow"><feGaussianBlur stdDeviation="5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
        +'</defs>'
        // Research Evidence — top-left
        +'<ellipse cx="175" cy="148" rx="105" ry="90" fill="#6366f1" fill-opacity="0.1" stroke="#6366f1" stroke-width="2">'
          +'<animate attributeName="rx" values="105;112;105" dur="4s" repeatCount="indefinite"/>'
          +'<animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="4s" repeatCount="indefinite"/>'
        +'</ellipse>'
        // Clinical Expertise — top-right
        +'<ellipse cx="285" cy="148" rx="105" ry="90" fill="#ec4899" fill-opacity="0.1" stroke="#ec4899" stroke-width="2">'
          +'<animate attributeName="rx" values="105;112;105" dur="4s" begin="1.3s" repeatCount="indefinite"/>'
          +'<animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="4s" begin="1.3s" repeatCount="indefinite"/>'
        +'</ellipse>'
        // Patient Values — bottom
        +'<ellipse cx="230" cy="228" rx="105" ry="90" fill="#22c55e" fill-opacity="0.1" stroke="#22c55e" stroke-width="2">'
          +'<animate attributeName="rx" values="105;112;105" dur="4s" begin="2.6s" repeatCount="indefinite"/>'
          +'<animate attributeName="fill-opacity" values="0.08;0.18;0.08" dur="4s" begin="2.6s" repeatCount="indefinite"/>'
        +'</ellipse>'
        // EBP glowing centre
        +'<circle cx="230" cy="178" r="30" fill="#fff" opacity="0.92" filter="url(#ebpglow)">'
          +'<animate attributeName="r" values="26;34;26" dur="2s" repeatCount="indefinite"/>'
        +'</circle>'
        +'<text x="230" y="174" text-anchor="middle" fill="#1e293b" font-size="10.5" font-weight="800">EBP</text>'
        +'<text x="230" y="188" text-anchor="middle" fill="#475569" font-size="8.5">Best Practice</text>'
        // Labels
        +'<text x="138" y="92" text-anchor="middle" fill="#4f46e5" font-size="12" font-weight="700">Research</text>'
        +'<text x="138" y="108" text-anchor="middle" fill="#4f46e5" font-size="12" font-weight="700">Evidence</text>'
        +'<text x="322" y="92" text-anchor="middle" fill="#be185d" font-size="12" font-weight="700">Clinical</text>'
        +'<text x="322" y="108" text-anchor="middle" fill="#be185d" font-size="12" font-weight="700">Expertise</text>'
        +'<text x="230" y="316" text-anchor="middle" fill="#15803d" font-size="12" font-weight="700">Patient Values &amp; Context</text>'
        // Intersection pulse dots
        +'<circle cx="230" cy="122" r="5" fill="#6366f1"><animate attributeName="r" values="4;9;4" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/></circle>'
        +'<circle cx="192" cy="210" r="5" fill="#22c55e"><animate attributeName="r" values="4;9;4" dur="2s" begin="0.7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.7s" repeatCount="indefinite"/></circle>'
        +'<circle cx="268" cy="210" r="5" fill="#ec4899"><animate attributeName="r" values="4;9;4" dur="2s" begin="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1.4s" repeatCount="indefinite"/></circle>'
      +'</svg>'
      +'<div class="diagram-key"><strong>EBP = Research Evidence + Clinical Expertise + Patient Values.</strong> The three pulsing circles must overlap at the glowing centre for true Evidence-Based Practice. The intersection points show where partial integration occurs.</div>'
    +'</div>';
  },

  // ─── NRS-3. SCIENTIFIC METHOD CYCLE — Spinning animated cycle ─
  scientificMethod: function () {
    var steps3=[
      {l:'Observation',c:'#6366f1',a:-90},
      {l:'Hypothesis',c:'#8b5cf6',a:-30},
      {l:'Experiment',c:'#ec4899',a:30},
      {l:'Analysis',c:'#f43f5e',a:90},
      {l:'Conclusion',c:'#f97316',a:150},
      {l:'Theory / EBP',c:'#22c55e',a:210}
    ];
    var cx3=230,cy3=175,r3=120,rN=38;
    var nodes3='',arrs3='';
    for(var n=0;n<steps3.length;n++){
      var s3=steps3[n],rad3=s3.a*Math.PI/180;
      var nx3=cx3+r3*Math.cos(rad3), ny3=cy3+r3*Math.sin(rad3);
      var d3=(n*0.5).toFixed(1);
      nodes3+='<circle cx="'+nx3+'" cy="'+ny3+'" r="'+rN+'" fill="'+s3.c+'" opacity="0.12">'
        +'<animate attributeName="opacity" values="0.08;0.22;0.08" dur="3s" begin="'+d3+'s" repeatCount="indefinite"/>'
        +'</circle>'
        +'<circle cx="'+nx3+'" cy="'+ny3+'" r="'+rN+'" fill="none" stroke="'+s3.c+'" stroke-width="2">'
        +'<animate attributeName="stroke-width" values="1.5;3;1.5" dur="3s" begin="'+d3+'s" repeatCount="indefinite"/>'
        +'</circle>';
      var ws3=s3.l.split(' ');
      if(ws3.length===1){
        nodes3+='<text x="'+nx3+'" y="'+(ny3+4)+'" text-anchor="middle" fill="'+s3.c+'" font-size="10" font-weight="700">'+s3.l+'</text>';
      } else {
        nodes3+='<text x="'+nx3+'" y="'+(ny3-3)+'" text-anchor="middle" fill="'+s3.c+'" font-size="9.5" font-weight="700">'+ws3[0]+'</text>';
        nodes3+='<text x="'+nx3+'" y="'+(ny3+11)+'" text-anchor="middle" fill="'+s3.c+'" font-size="9.5" font-weight="700">'+ws3.slice(1).join(' ')+'</text>';
      }
      var ns3=steps3[(n+1)%steps3.length],nrad3=ns3.a*Math.PI/180;
      var nx4=cx3+r3*Math.cos(nrad3), ny4=cy3+r3*Math.sin(nrad3);
      var mpx3=(nx3+nx4)/2+(cx3-(nx3+nx4)/2)*0.4;
      var mpy3=(ny3+ny4)/2+(cy3-(ny3+ny4)/2)*0.4;
      arrs3+='<path d="M'+nx3+','+ny3+' Q'+mpx3+','+mpy3+' '+nx4+','+ny4+'" fill="none" stroke="#cbd5e1" stroke-width="1.5" marker-end="url(#sma)">'
        +'<animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="3s" begin="'+d3+'s" repeatCount="indefinite"/>'
        +'</path>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">⟳ Animated: The Scientific Method Cycle</div>'
      +'<svg viewBox="0 0 460 350" width="100%" style="max-width:460px;display:block;margin:0 auto;">'
        +'<defs>'
          +'<marker id="sma" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker>'
          +'<linearGradient id="smg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="50%" stop-color="#ec4899"/><stop offset="100%" stop-color="#22c55e"/></linearGradient>'
        +'</defs>'
        // Rotating dashed ring
        +'<circle cx="'+cx3+'" cy="'+cy3+'" r="'+(r3+22)+'" fill="none" stroke="url(#smg)" stroke-width="1.5" stroke-dasharray="10 14" opacity="0.35">'
          +'<animateTransform attributeName="transform" type="rotate" from="0 '+cx3+' '+cy3+'" to="360 '+cx3+' '+cy3+'" dur="18s" repeatCount="indefinite"/>'
        +'</circle>'
        +arrs3+nodes3
        // Centre label
        +'<circle cx="'+cx3+'" cy="'+cy3+'" r="33" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>'
        +'<text x="'+cx3+'" y="'+(cy3-4)+'" text-anchor="middle" fill="#334155" font-size="9.5" font-weight="700">Scientific</text>'
        +'<text x="'+cx3+'" y="'+(cy3+10)+'" text-anchor="middle" fill="#334155" font-size="9.5" font-weight="700">Method</text>'
        +'<text x="230" y="336" text-anchor="middle" fill="#64748b" font-size="9.5" font-family="monospace">Steps glow in sequence — the cycle repeats</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>Scientific Method is cyclic:</strong> Observation → Hypothesis → Experiment → Analysis → Conclusion → Theory/EBP → loops back to new Observations. This iterative process is the foundation of evidence-based nursing research.</div>'
    +'</div>';
  },

  // ─── NRS-4. RESEARCH DESIGN TREE — animated classification ─────
  researchDesignTree: function () {
    function rdtNode(x, y, w, h, label, sub, color, delay) {
      return '<g>'
        +'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" fill="'+color+'" fill-opacity="0.12" stroke="'+color+'" stroke-width="2">'
          +'<animate attributeName="fill-opacity" values="0.06;0.22;0.06" dur="3.2s" begin="'+delay+'s" repeatCount="indefinite"/>'
        +'</rect>'
        +'<text x="'+(x+w/2)+'" y="'+(y+h/2-3)+'" text-anchor="middle" fill="'+color+'" font-size="10.5" font-weight="700">'+label+'</text>'
        + (sub ? '<text x="'+(x+w/2)+'" y="'+(y+h/2+11)+'" text-anchor="middle" fill="'+color+'" font-size="8" font-weight="500">'+sub+'</text>' : '')
        +'</g>';
    }
    function rdtEdge(x1, y1, x2, y2, color, delay) {
      return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="1.6">'
        +'<animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="3.2s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
    }
    var W = 520, rootY = 14;
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🌳 Animated: Classification of Research Designs</div>'
      +'<svg viewBox="0 0 '+W+' 380" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        + rdtEdge(W/2, rootY+34, 90, 92, '#6366f1', 0.2)
        + rdtEdge(W/2, rootY+34, W/2, 92, '#8b5cf6', 0.6)
        + rdtEdge(W/2, rootY+34, W-90, 92, '#22c55e', 1.0)
        + rdtNode(W/2-70, rootY, 140, 34, 'Research Design', '', '#334155', 0)
        + rdtNode(20, 92, 140, 34, 'Quantitative', 'numbers', '#6366f1', 0.2)
        + rdtNode(W/2-70, 92, 140, 34, 'Qualitative', 'words', '#8b5cf6', 0.6)
        + rdtNode(W-160, 92, 140, 34, 'Mixed', 'both', '#22c55e', 1.0)
        + rdtEdge(90, 126, 60, 190, '#6366f1', 0.4)
        + rdtEdge(90, 126, 160, 190, '#6366f1', 0.8)
        + rdtNode(10, 190, 100, 30, 'Experimental', 'True / Quasi', '#6366f1', 0.4)
        + rdtNode(110, 190, 100, 30, 'Non-Exp.', 'Descriptive', '#6366f1', 0.8)
        + rdtEdge(W/2, 126, W/2, 190, '#8b5cf6', 1.0)
        + rdtNode(W/2-60, 190, 120, 30, 'Phenomenology', 'Grounded / Ethnography', '#8b5cf6', 1.0)
        + rdtEdge(W-90, 126, W-90, 190, '#22c55e', 1.2)
        + rdtNode(W-150, 190, 120, 30, 'QUAN + QUAL', 'convergent', '#22c55e', 1.2)
      +'</svg>'
      +'<div class="diagram-key"><strong>Every research design fits one of three families.</strong> Quantitative (numbers, measurable) splits into Experimental &amp; Non-Experimental; Qualitative (words, meaning) uses approaches like Phenomenology; Mixed Methods blends both. Nodes pulse in reading order.</div>'
    +'</div>';
  },

  // ─── NRS-5. VARIABLE FLOW — animated causal arrow ────────────
  variableFlow: function () {
    var path = 'M120,60 C200,60 200,60 300,60';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🔗 Animated: Independent → Dependent Variable</div>'
      +'<svg viewBox="0 0 420 200" width="100%" style="max-width:420px;display:block;margin:0 auto;">'
        +'<defs><marker id="vf-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#6366f1"/></marker></defs>'
        +'<rect x="20" y="35" width="100" height="50" rx="8" fill="#6366f1" fill-opacity="0.12" stroke="#6366f1" stroke-width="2"><animate attributeName="fill-opacity" values="0.08;0.2;0.08" dur="3s" repeatCount="indefinite"/></rect>'
        +'<text x="70" y="58" text-anchor="middle" fill="#4f46e5" font-size="11" font-weight="700">Independent</text>'
        +'<text x="70" y="72" text-anchor="middle" fill="#4f46e5" font-size="9">Variable (Cause)</text>'
        +'<path d="'+path+'" fill="none" stroke="#6366f1" stroke-width="2.5" marker-end="url(#vf-arrow)"/>'
        +'<text x="210" y="50" text-anchor="middle" fill="#64748b" font-size="9.5" font-weight="700">CAUSES →</text>'
        +'<circle r="5" fill="#f43f5e"><animateMotion dur="2.4s" repeatCount="indefinite" path="'+path+'"/></circle>'
        +'<rect x="300" y="35" width="100" height="50" rx="8" fill="#ec4899" fill-opacity="0.12" stroke="#ec4899" stroke-width="2"><animate attributeName="fill-opacity" values="0.08;0.2;0.08" dur="3s" begin="1.2s" repeatCount="indefinite"/></rect>'
        +'<text x="350" y="58" text-anchor="middle" fill="#be185d" font-size="11" font-weight="700">Dependent</text>'
        +'<text x="350" y="72" text-anchor="middle" fill="#be185d" font-size="9">Variable (Effect)</text>'
        +'<text x="210" y="120" text-anchor="middle" fill="#94a3b8" font-size="9">↕ Confounding / Extraneous variables may interfere</text>'
        +'<rect x="40" y="135" width="150" height="40" rx="7" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="5 4"><animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.6s" repeatCount="indefinite"/></rect>'
        +'<text x="115" y="152" text-anchor="middle" fill="#b45309" font-size="9.5" font-weight="700">Confounding</text>'
        +'<text x="115" y="166" text-anchor="middle" fill="#b45309" font-size="8">Age, Gender, Stress</text>'
        +'<rect x="230" y="135" width="150" height="40" rx="7" fill="#14b8a6" fill-opacity="0.12" stroke="#14b8a6" stroke-width="1.6" stroke-dasharray="5 4"><animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.6s" begin="1.3s" repeatCount="indefinite"/></rect>'
        +'<text x="305" y="152" text-anchor="middle" fill="#0f766e" font-size="9.5" font-weight="700">Extraneous</text>'
        +'<text x="305" y="166" text-anchor="middle" fill="#0f766e" font-size="8">Environment, Bias</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>Change in the Independent Variable causes change in the Dependent Variable.</strong> The red particle travels the causal arrow. Confounding &amp; extraneous variables (dashed) can distort the true relationship and must be controlled.</div>'
    +'</div>';
  },

  // ─── NRS-6. HYPOTHESIS TREE — animated classification ───────
  hypothesisTree: function () {
    function htNode(x, y, w, h, label, sub, color, delay) {
      return '<g>'
        +'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" fill="'+color+'" fill-opacity="0.12" stroke="'+color+'" stroke-width="2">'
          +'<animate attributeName="fill-opacity" values="0.06;0.22;0.06" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(x+w/2)+'" y="'+(y+h/2-2)+'" text-anchor="middle" fill="'+color+'" font-size="10" font-weight="700">'+label+'</text>'
        + (sub ? '<text x="'+(x+w/2)+'" y="'+(y+h/2+12)+'" text-anchor="middle" fill="'+color+'" font-size="7.5">'+sub+'</text>' : '')
        +'</g>';
    }
    function htEdge(x1, y1, x2, y2, color, delay) {
      return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="1.6">'
        +'<animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
    }
    var W = 460;
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🌳 Animated: Classification of Hypothesis</div>'
      +'<svg viewBox="0 0 '+W+' 300" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        + htEdge(W/2, 48, 110, 100, '#6366f1', 0.3)
        + htEdge(W/2, 48, W-110, 100, '#ec4899', 0.7)
        + htNode(W/2-65, 14, 130, 34, 'Hypothesis', '', '#334155', 0)
        + htNode(40, 100, 140, 32, 'Research H₁', 'directional?', '#6366f1', 0.3)
        + htNode(W-180, 100, 140, 32, 'Null H₀', 'no effect', '#ec4899', 0.7)
        + htEdge(110, 132, 70, 186, '#6366f1', 0.5)
        + htEdge(110, 132, 170, 186, '#6366f1', 0.9)
        + htNode(10, 186, 100, 30, 'Directional', 'predicts way', '#6366f1', 0.5)
        + htNode(120, 186, 100, 30, 'Non-Dir.', 'predicts diff', '#6366f1', 0.9)
        + htEdge(W-110, 132, W-150, 186, '#ec4899', 1.1)
        + htEdge(W-110, 132, W-50, 186, '#ec4899', 1.4)
        + htNode(W-200, 186, 100, 30, 'Statistical', 'no relation', '#ec4899', 1.1)
        + htNode(W-100, 186, 100, 30, 'Substantive', 'nil', '#ec4899', 1.4)
      +'</svg>'
      +'<div class="diagram-key"><strong>A hypothesis is either Research (H₁) or Null (H₀).</strong> H₁ predicts a relationship/difference and may be Directional or Non-Directional. H₀ states no effect and appears as Statistical or Substantive (Nil). Branches glow in sequence.</div>'
    +'</div>';
  },

  // ─── NRS-7. SAMPLING TECHNIQUES TREE — probability vs non-prob ─
  samplingTree: function () {
    function stNode(x, y, w, h, label, sub, color, delay) {
      return '<g>'
        +'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" fill="'+color+'" fill-opacity="0.12" stroke="'+color+'" stroke-width="2">'
          +'<animate attributeName="fill-opacity" values="0.06;0.22;0.06" dur="3.2s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(x+w/2)+'" y="'+(y+h/2-2)+'" text-anchor="middle" fill="'+color+'" font-size="9.5" font-weight="700">'+label+'</text>'
        + (sub ? '<text x="'+(x+w/2)+'" y="'+(y+h/2+11)+'" text-anchor="middle" fill="'+color+'" font-size="7.5" font-weight="500">'+sub+'</text>' : '')
        +'</g>';
    }
    function stEdge(x1, y1, x2, y2, color, delay) {
      return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="1.6">'
        +'<animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="3.2s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
    }
    var W = 560;
    var pc = '#6366f1', nc = '#ec4899';
    var prob = [['Simple Random','lottery / RNG'],['Systematic','every kth'],['Stratified','by subgroup'],['Cluster','by area']];
    var nprob = [['Convenience','who is handy'],['Purposive','expert pick'],['Quota','fixed slots'],['Snowball','referral chain']];
    var svg = '';
    // root + two families
    svg += stEdge(W/2, 48, W/4, 100, pc, 0.2) + stEdge(W/2, 48, 3*W/4, 100, nc, 0.6);
    svg += stNode(W/2-70, 14, 140, 34, 'Sampling', '', '#334155', 0);
    svg += stNode(W/4-80, 100, 160, 34, 'Probability', 'random · known chance', pc, 0.2);
    svg += stNode(3*W/4-80, 100, 160, 34, 'Non-Probability', 'non-random · unknown chance', nc, 0.6);
    // leaves for each family, 2 rows of 2
    var lw = 118, lh = 34;
    for (var i = 0; i < 4; i++) {
      var col = i % 2, row = Math.floor(i / 2);
      var pxP = W/4 - 124 + col * (lw + 6), pyP = 172 + row * (lh + 12);
      svg += stEdge(W/4, 134, pxP + lw/2, pyP, pc, 0.4 + i*0.12);
      svg += stNode(pxP, pyP, lw, lh, prob[i][0], prob[i][1], pc, 0.4 + i*0.12);
      var pxN = 3*W/4 - 124 + col * (lw + 6), pyN = 172 + row * (lh + 12);
      svg += stEdge(3*W/4, 134, pxN + lw/2, pyN, nc, 0.5 + i*0.12);
      svg += stNode(pxN, pyN, lw, lh, nprob[i][0], nprob[i][1], nc, 0.5 + i*0.12);
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🌳 Animated: Types of Sampling Techniques</div>'
      +'<svg viewBox="0 0 '+W+' 268" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Two big families of sampling.</strong> <span style="color:#6366f1">Probability</span> = everyone has a known, equal-ish chance (random) → best for generalising. <span style="color:#ec4899">Non-Probability</span> = researcher picks (non-random) → quick &amp; cheap but risk of bias. Branches glow in reading order.</div>'
    +'</div>';
  },

  // ─── NRS-8. SAMPLING PROCESS — animated linear steps ──────────
  samplingProcess: function () {
    var steps = [
      ['Define Population','who to study','#6366f1'],
      ['Identify Sampling Frame','the name list','#8b5cf6'],
      ['Choose Technique','random / non-random','#a855f7'],
      ['Decide Sample Size','how many','#ec4899'],
      ['Select the Sample','draw units','#f43f5e'],
      ['Collect & Check','field the study','#22c55e']
    ];
    var bW=160,bH=44,gapY=16,startX=(560-bW)/2,startY=16;
    var svg='';
    for(var i=0;i<steps.length;i++){
      var y=startY+i*(bH+gapY),s=steps[i],c=s[2],delay=(i*0.35).toFixed(2);
      if(i<steps.length-1){
        var ny=y+bH;
        svg+='<line x1="'+(startX+bW/2)+'" y1="'+ny+'" x2="'+(startX+bW/2)+'" y2="'+(ny+gapY)+'" stroke="#94a3b8" stroke-width="1.8" marker-end="url(#spa)">'
          +'<animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
      }
      svg+='<rect x="'+startX+'" y="'+y+'" width="'+bW+'" height="'+bH+'" rx="10" fill="'+c+'" fill-opacity="0.12" stroke="'+c+'" stroke-width="2">'
        +'<animate attributeName="fill-opacity" values="0.08;0.22;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<circle cx="'+(startX+18)+'" cy="'+(y+bH/2)+'" r="11" fill="'+c+'"/>'
        +'<text x="'+(startX+18)+'" y="'+(y+bH/2+4)+'" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">'+(i+1)+'</text>'
        +'<text x="'+(startX+bW/2+10)+'" y="'+(y+bH/2-3)+'" text-anchor="middle" fill="'+c+'" font-size="10.5" font-weight="700">'+s[0]+'</text>'
        +'<text x="'+(startX+bW/2+10)+'" y="'+(y+bH/2+11)+'" text-anchor="middle" fill="'+c+'" font-size="8" font-weight="500">'+s[1]+'</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🪜 Animated: The Sampling Process (Step by Step)</div>'
      +'<svg viewBox="0 0 560 372" width="100%" style="max-width:560px;display:block;margin:0 auto;">'
        +'<defs><marker id="spa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Sampling = shrinking a big population into a manageable, representative group.</strong> Start by defining who you want (population), list them (frame), pick a method, decide how many, draw the units, then collect. Steps glow top-to-bottom.</div>'
    +'</div>';
  },

  // ─── NRS-9. POPULATION vs SAMPLE — nested funnel ──────────────
  populationSample: function () {
    // big circle of dots = population, highlighted subset = sample
    var dots='', cx=150, cy=150, R=110;
    var pts=[];
    var golden=2.399963; // radians, deterministic spiral (no Math.random)
    for(var i=0;i<80;i++){
      var r=R*Math.sqrt((i+0.5)/80);
      var ang=i*golden;
      var x=cx+r*Math.cos(ang), y=cy+r*Math.sin(ang);
      pts.push([x,y]);
      var sampled=(i%7===0); // ~11 highlighted
      if(sampled){
        dots+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="5" fill="#f43f5e"><animate attributeName="r" values="4;6.5;4" dur="2s" begin="'+((i%7)*0.2).toFixed(1)+'s" repeatCount="indefinite"/></circle>';
      } else {
        dots+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="3.4" fill="#6366f1" opacity="0.35"/>';
      }
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🎯 Animated: Population → Sample</div>'
      +'<svg viewBox="0 0 460 320" width="100%" style="max-width:460px;display:block;margin:0 auto;">'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="'+(R+14)+'" fill="#6366f1" fill-opacity="0.05" stroke="#6366f1" stroke-width="2" stroke-dasharray="6 5">'
          +'<animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite"/></circle>'
        +dots
        +'<text x="'+cx+'" y="'+(cy+R+40)+'" text-anchor="middle" fill="#4f46e5" font-size="12" font-weight="700">POPULATION (all units)</text>'
        // arrow + sample callout
        +'<line x1="272" y1="150" x2="322" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#psa)"/>'
        +'<defs><marker id="psa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +'<circle cx="390" cy="150" r="52" fill="#f43f5e" fill-opacity="0.08" stroke="#f43f5e" stroke-width="2">'
          +'<animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle>'
        +'<circle cx="374" cy="136" r="6" fill="#f43f5e"/><circle cx="404" cy="140" r="6" fill="#f43f5e"/>'
        +'<circle cx="382" cy="164" r="6" fill="#f43f5e"/><circle cx="406" cy="166" r="6" fill="#f43f5e"/>'
        +'<text x="390" y="222" text-anchor="middle" fill="#e11d48" font-size="12" font-weight="700">SAMPLE</text>'
        +'<text x="390" y="238" text-anchor="middle" fill="#fb7185" font-size="8.5" font-family="monospace">(the red subset)</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>The Sample is a small slice drawn from the whole Population.</strong> Red dots = the units actually chosen to study; faded blue = everyone else. A good sample mirrors the population so findings can be generalised back to it.</div>'
    +'</div>';
  },

  // ─── NRS-10. DATA COLLECTION METHODS — animated hub & spokes ──
  dataCollectionMethods: function () {
    var cx=230, cy=175, r=118, rN=44;
    var methods=[
      {l:'Interview',s:'ask · talk',c:'#6366f1',a:-90},
      {l:'Questionnaire',s:'written Qs',c:'#8b5cf6',a:-30},
      {l:'Observation',s:'watch',c:'#ec4899',a:30},
      {l:'Records',s:'existing data',c:'#f43f5e',a:90},
      {l:'Scales/Tests',s:'measure',c:'#f97316',a:150},
      {l:'Biophysical',s:'BP · labs',c:'#22c55e',a:210}
    ];
    var nodes='',spokes='';
    for(var n=0;n<methods.length;n++){
      var m=methods[n],rad=m.a*Math.PI/180;
      var nx=cx+r*Math.cos(rad), ny=cy+r*Math.sin(rad),d=(n*0.4).toFixed(1);
      spokes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+nx.toFixed(1)+'" y2="'+ny.toFixed(1)+'" stroke="'+m.c+'" stroke-width="1.6">'
        +'<animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="3s" begin="'+d+'s" repeatCount="indefinite"/></line>';
      nodes+='<circle cx="'+nx.toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="'+rN+'" fill="'+m.c+'" opacity="0.12">'
        +'<animate attributeName="opacity" values="0.08;0.22;0.08" dur="3s" begin="'+d+'s" repeatCount="indefinite"/></circle>'
        +'<circle cx="'+nx.toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="'+rN+'" fill="none" stroke="'+m.c+'" stroke-width="2">'
        +'<animate attributeName="stroke-width" values="1.5;3;1.5" dur="3s" begin="'+d+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+nx.toFixed(1)+'" y="'+(ny-2)+'" text-anchor="middle" fill="'+m.c+'" font-size="9.5" font-weight="700">'+m.l+'</text>'
        +'<text x="'+nx.toFixed(1)+'" y="'+(ny+11)+'" text-anchor="middle" fill="'+m.c+'" font-size="7.5">'+m.s+'</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🧰 Animated: Methods of Data Collection</div>'
      +'<svg viewBox="0 0 460 350" width="100%" style="max-width:460px;display:block;margin:0 auto;">'
        +spokes+nodes
        +'<circle cx="'+cx+'" cy="'+cy+'" r="40" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>'
        +'<text x="'+cx+'" y="'+(cy-4)+'" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">Data</text>'
        +'<text x="'+cx+'" y="'+(cy+10)+'" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">Collection</text>'
        +'<text x="230" y="340" text-anchor="middle" fill="#64748b" font-size="9.5" font-family="monospace">6 main ways to gather your data</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>Pick the tool that fits your question.</strong> Interview &amp; Questionnaire = ask people; Observation = watch behaviour; Records = use what already exists; Scales/Tests = measure traits; Biophysical = clinical measures (BP, labs). Spokes glow around the hub.</div>'
    +'</div>';
  },

  // ─── NRS-11. RELIABILITY vs VALIDITY — dartboard analogy ──────
  reliabilityValidity: function () {
    function board(cx, cy, title, sub, shots, titleColor) {
      var g='<g>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="60" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1.5"/>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="40" fill="#fff" stroke="#c7d2fe" stroke-width="1.2"/>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="20" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5"/>'
        +'<circle cx="'+cx+'" cy="'+cy+'" r="6" fill="#ef4444"/>';
      for(var i=0;i<shots.length;i++){
        var sx=cx+shots[i][0], sy=cy+shots[i][1];
        g+='<circle cx="'+sx+'" cy="'+sy+'" r="4.5" fill="#1e293b" opacity="0.85">'
          +'<animate attributeName="r" values="3;5.5;3" dur="2.5s" begin="'+(i*0.2).toFixed(1)+'s" repeatCount="indefinite"/></circle>';
      }
      g+='<text x="'+cx+'" y="'+(cy+82)+'" text-anchor="middle" fill="'+titleColor+'" font-size="11.5" font-weight="700">'+title+'</text>'
        +'<text x="'+cx+'" y="'+(cy+97)+'" text-anchor="middle" fill="#64748b" font-size="8.5" font-family="monospace">'+sub+'</text>'
        +'</g>';
      return g;
    }
    // tight+off-centre = reliable not valid; tight+centre = both; scattered = neither
    var reliableNotValid=[[22,-14],[26,-8],[20,-18],[28,-12]];
    var both=[[3,-4],[-5,3],[2,5],[-3,-2]];
    var neither=[[-30,20],[25,-25],[-10,-30],[35,15]];
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🎯 Animated: Reliability vs Validity (Dartboard)</div>'
      +'<svg viewBox="0 0 560 220" width="100%" style="max-width:560px;display:block;margin:0 auto;">'
        + board(95, 90, 'Reliable, NOT Valid', 'consistent · off-target', '#6366f1', reliableNotValid)
        + board(280, 90, 'Reliable AND Valid', 'consistent · on-target', '#22c55e', both)
        + board(465, 90, 'Neither', 'scattered · off-target', '#ef4444', neither)
      +'</svg>'
      +'<div class="diagram-key"><strong>Reliability = consistency; Validity = accuracy (hitting the bullseye).</strong> Left: shots cluster tightly but miss centre (reliable, not valid). Middle: tight AND on the bullseye (the goal). Right: scattered everywhere (neither). A tool must be reliable <em>and</em> valid to trust the data.</div>'
    +'</div>';
  },

  // ─── NRS-12. PILOT STUDY — mini trial before main study ───────
  pilotStudy: function () {
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🚀 Animated: Pilot Study before the Main Study</div>'
      +'<svg viewBox="0 0 520 240" width="100%" style="max-width:520px;display:block;margin:0 auto;">'
        +'<defs><marker id="pla" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        // small pilot flask
        +'<rect x="30" y="70" width="150" height="80" rx="12" fill="#f59e0b" fill-opacity="0.12" stroke="#f59e0b" stroke-width="2">'
          +'<animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" repeatCount="indefinite"/></rect>'
        +'<text x="105" y="102" text-anchor="middle" fill="#b45309" font-size="13" font-weight="700">PILOT STUDY</text>'
        +'<text x="105" y="120" text-anchor="middle" fill="#b45309" font-size="9">small-scale trial</text>'
        +'<text x="105" y="134" text-anchor="middle" fill="#b45309" font-size="8" font-family="monospace">5–10% of sample</text>'
        // feedback loop arrow (test → fix → back)
        +'<path d="M105,155 C105,195 105,205 105,205 L200,205" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#pla)">'
          +'<animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite"/></path>'
        +'<text x="150" y="225" text-anchor="middle" fill="#ef4444" font-size="8.5" font-family="monospace">find &amp; fix problems</text>'
        // arrow to main
        +'<line x1="185" y1="110" x2="330" y2="110" stroke="#94a3b8" stroke-width="2.2" marker-end="url(#pla)">'
          +'<animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="0.5s" repeatCount="indefinite"/></line>'
        +'<text x="257" y="100" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">refine →</text>'
        +'<circle r="5" fill="#f59e0b"><animateMotion dur="2.6s" repeatCount="indefinite" path="M185,110 L330,110"/></circle>'
        // big main flask
        +'<rect x="335" y="45" width="160" height="130" rx="14" fill="#22c55e" fill-opacity="0.12" stroke="#22c55e" stroke-width="2.5">'
          +'<animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" begin="1s" repeatCount="indefinite"/></rect>'
        +'<text x="415" y="100" text-anchor="middle" fill="#15803d" font-size="15" font-weight="700">MAIN STUDY</text>'
        +'<text x="415" y="120" text-anchor="middle" fill="#15803d" font-size="10">full-scale research</text>'
        +'<text x="415" y="136" text-anchor="middle" fill="#15803d" font-size="8.5" font-family="monospace">whole sample</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>A Pilot Study is a mini dress-rehearsal of the main study.</strong> Run on a tiny group first to test the tool, timing &amp; feasibility → spot and fix problems → then launch the full-scale study with confidence. Saves money, time &amp; avoids big mistakes.</div>'
    +'</div>';
  },

  // ─── CHN-1. LEVELS OF PREVENTION — animated 3-tier ladder ─────
  levelsOfPrevention: function () {
    var tiers=[
      {l:'PRIMARY',s:'before disease · stop it starting',ex:'immunisation · health education · nutrition',c:'#22c55e'},
      {l:'SECONDARY',s:'early disease · catch it early',ex:'screening · early diagnosis · prompt Rx',c:'#f59e0b'},
      {l:'TERTIARY',s:'after disease · limit damage',ex:'rehabilitation · prevent disability',c:'#ef4444'}
    ];
    var svg='',W=520,bW=440,bH=66,startX=(W-bW)/2,startY=16,gapY=14;
    for(var i=0;i<tiers.length;i++){
      var y=startY+i*(bH+gapY),t=tiers[i],delay=(i*0.4).toFixed(1);
      if(i<tiers.length-1){
        var ny=y+bH;
        svg+='<line x1="'+(W/2)+'" y1="'+ny+'" x2="'+(W/2)+'" y2="'+(ny+gapY)+'" stroke="#94a3b8" stroke-width="1.8" marker-end="url(#lpa)">'
          +'<animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
      }
      svg+='<rect x="'+startX+'" y="'+y+'" width="'+bW+'" height="'+bH+'" rx="12" fill="'+t.c+'" fill-opacity="0.12" stroke="'+t.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.08;0.22;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<circle cx="'+(startX+30)+'" cy="'+(y+bH/2)+'" r="16" fill="'+t.c+'"/>'
        +'<text x="'+(startX+30)+'" y="'+(y+bH/2+5)+'" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">'+(i+1)+'</text>'
        +'<text x="'+(startX+60)+'" y="'+(y+24)+'" fill="'+t.c+'" font-size="14" font-weight="700">'+t.l+'</text>'
        +'<text x="'+(startX+60)+'" y="'+(y+40)+'" fill="'+t.c+'" font-size="9.5" font-weight="500">'+t.s+'</text>'
        +'<text x="'+(startX+60)+'" y="'+(y+55)+'" fill="#64748b" font-size="8.5" font-family="monospace">'+t.ex+'</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🛡️ Animated: Three Levels of Prevention</div>'
      +'<svg viewBox="0 0 '+W+' 258" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="lpa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Prevention works at 3 stages of disease.</strong> <span style="color:#22c55e">Primary</span> stops disease before it starts (immunise, educate). <span style="color:#f59e0b">Secondary</span> catches it early (screening, prompt treatment). <span style="color:#ef4444">Tertiary</span> limits damage after (rehab, prevent disability). Tiers glow top-to-bottom.</div>'
    +'</div>';
  },

  // ─── NRS-13. MEASUREMENT SCALES (NOIR) — climbing ladder ───────
  measurementScales: function () {
    var levels=[
      {l:'RATIO',s:'true zero · all maths',ex:'weight, height, age, BP',c:'#22c55e'},
      {l:'INTERVAL',s:'equal gaps · no true zero',ex:'temp °C, IQ, Likert',c:'#f97316'},
      {l:'ORDINAL',s:'ranked · unequal gaps',ex:'mild/mod/severe pain',c:'#8b5cf6'},
      {l:'NOMINAL',s:'labels only · no order',ex:'gender, blood group',c:'#6366f1'}
    ];
    var W=520,bW=300,bH=52,gapY=10,startY=14,leftPad=40;
    var svg='';
    for(var i=0;i<levels.length;i++){
      // each higher level shifts right + sits higher = climbing staircase
      var lv=levels[i],y=startY+i*(bH+gapY),x=leftPad+(levels.length-1-i)*30,delay=(i*0.35).toFixed(1);
      svg+='<rect x="'+x+'" y="'+y+'" width="'+bW+'" height="'+bH+'" rx="10" fill="'+lv.c+'" fill-opacity="0.12" stroke="'+lv.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(x+16)+'" y="'+(y+24)+'" fill="'+lv.c+'" font-size="14" font-weight="700">'+lv.l+'</text>'
        +'<text x="'+(x+16)+'" y="'+(y+40)+'" fill="'+lv.c+'" font-size="9" font-weight="500">'+lv.s+'</text>'
        +'<text x="'+(x+bW-12)+'" y="'+(y+bH/2+3)+'" text-anchor="end" fill="#64748b" font-size="8.5" font-family="monospace">'+lv.ex+'</text>';
    }
    // upward arrow showing increasing precision
    svg+='<line x1="22" y1="'+(startY+levels.length*(bH+gapY)-gapY)+'" x2="22" y2="'+startY+'" stroke="#94a3b8" stroke-width="2" marker-end="url(#msa)">'
      +'<animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/></line>'
      +'<text x="16" y="'+(startY+90)+'" fill="#64748b" font-size="9" font-weight="700" transform="rotate(-90,16,'+(startY+90)+')">more precision →</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🪜 Animated: 4 Levels of Data (NOIR)</div>'
      +'<svg viewBox="0 0 '+W+' 268" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="msa" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0,6 L4,0 L8,6z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Climb NOIR — each step up adds mathematical power.</strong> <span style="color:#6366f1">Nominal</span> = labels only (count). <span style="color:#8b5cf6">Ordinal</span> = ranked but gaps unequal. <span style="color:#f97316">Interval</span> = equal gaps, no true zero (temp °C). <span style="color:#22c55e">Ratio</span> = true zero, all maths (weight). Higher = more precise stats.</div>'
    +'</div>';
  },

  // ─── NRS-14. RELIABILITY TYPES — animated classification tree ──
  reliabilityTree: function () {
    function rtNode(x, y, w, h, label, sub, color, delay) {
      return '<g>'
        +'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" fill="'+color+'" fill-opacity="0.12" stroke="'+color+'" stroke-width="2">'
          +'<animate attributeName="fill-opacity" values="0.06;0.22;0.06" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(x+w/2)+'" y="'+(y+h/2-2)+'" text-anchor="middle" fill="'+color+'" font-size="9.5" font-weight="700">'+label+'</text>'
        + (sub ? '<text x="'+(x+w/2)+'" y="'+(y+h/2+11)+'" text-anchor="middle" fill="'+color+'" font-size="7.5">'+sub+'</text>' : '')
        +'</g>';
    }
    function rtEdge(x1, y1, x2, y2, color, delay) {
      return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+color+'" stroke-width="1.6">'
        +'<animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
    }
    var W=560,c='#0d9488';
    var leaves=[
      ['Test-Retest','stability · over time'],
      ['Inter-Rater','2 raters agree'],
      ['Intra-Rater','same rater, 2 times'],
      ['Parallel Forms','2 equal versions'],
      ['Internal Consist.','Cronbach α']
    ];
    var svg='';
    svg+=rtNode(W/2-70, 12, 140, 34, 'Reliability', 'consistency', '#334155', 0);
    var lw=100,lh=44,total=leaves.length,gap=8;
    var rowW=total*lw+(total-1)*gap, x0=(W-rowW)/2, ly=110;
    for(var i=0;i<total;i++){
      var lx=x0+i*(lw+gap),cx=lx+lw/2,delay=(0.3+i*0.2).toFixed(1);
      svg+=rtEdge(W/2, 46, cx, ly, c, delay);
      svg+=rtNode(lx, ly, lw, lh, leaves[i][0], leaves[i][1], c, delay);
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🔁 Animated: Types of Reliability</div>'
      +'<svg viewBox="0 0 '+W+' 180" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>All reliability = does the tool give consistent results?</strong> Test-Retest (stable over time), Inter-Rater (different raters agree), Intra-Rater (same rater agrees with self), Parallel Forms (two equal versions match), Internal Consistency (items hang together — Cronbach α ≥ 0.70). Branches glow in order.</div>'
    +'</div>';
  },

  // ─── NRS-15. ETHICAL PRINCIPLES — pulsing hub & spokes ────────
  ethicalPrinciples: function () {
    var cx=230, cy=180, r=125, rN=42;
    var pr=[
      {l:'Autonomy',s:'right to choose',c:'#6366f1',a:-90},
      {l:'Beneficence',s:'do good',c:'#8b5cf6',a:-38},
      {l:'Non-malef.',s:'do no harm',c:'#ec4899',a:14},
      {l:'Justice',s:'fairness',c:'#f43f5e',a:66},
      {l:'Veracity',s:'truthful',c:'#f97316',a:118},
      {l:'Confidential',s:'keep private',c:'#22c55e',a:170},
      {l:'Fidelity',s:'keep promises',c:'#0d9488',a:222}
    ];
    var nodes='',spokes='';
    for(var n=0;n<pr.length;n++){
      var p=pr[n],rad=p.a*Math.PI/180;
      var nx=cx+r*Math.cos(rad), ny=cy+r*Math.sin(rad),d=(n*0.35).toFixed(1);
      spokes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+nx.toFixed(1)+'" y2="'+ny.toFixed(1)+'" stroke="'+p.c+'" stroke-width="1.6">'
        +'<animate attributeName="stroke-opacity" values="0.25;0.9;0.25" dur="3s" begin="'+d+'s" repeatCount="indefinite"/></line>';
      nodes+='<circle cx="'+nx.toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="'+rN+'" fill="'+p.c+'" opacity="0.12">'
        +'<animate attributeName="opacity" values="0.08;0.22;0.08" dur="3s" begin="'+d+'s" repeatCount="indefinite"/></circle>'
        +'<circle cx="'+nx.toFixed(1)+'" cy="'+ny.toFixed(1)+'" r="'+rN+'" fill="none" stroke="'+p.c+'" stroke-width="2">'
        +'<animate attributeName="stroke-width" values="1.5;3;1.5" dur="3s" begin="'+d+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+nx.toFixed(1)+'" y="'+(ny-2)+'" text-anchor="middle" fill="'+p.c+'" font-size="8.5" font-weight="700">'+p.l+'</text>'
        +'<text x="'+nx.toFixed(1)+'" y="'+(ny+10)+'" text-anchor="middle" fill="'+p.c+'" font-size="7">'+p.s+'</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">⚖️ Animated: Ethical Principles in Research</div>'
      +'<svg viewBox="0 0 460 360" width="100%" style="max-width:460px;display:block;margin:0 auto;">'
        +spokes+nodes
        +'<circle cx="'+cx+'" cy="'+cy+'" r="40" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>'
        +'<text x="'+cx+'" y="'+(cy-3)+'" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">Research</text>'
        +'<text x="'+cx+'" y="'+(cy+11)+'" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">Ethics</text>'
        +'<text x="230" y="350" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">7 principles protect every participant</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>Ethics protects the participant.</strong> Autonomy (right to choose) · Beneficence (do good) · Non-maleficence (do no harm) · Justice (fair treatment) · Veracity (truthful reporting) · Confidentiality (keep data private) · Fidelity (keep promises). All spokes glow around the ethics hub.</div>'
    +'</div>';
  },

  // ─── NRS-16. INFORMED CONSENT — 3 pillars → valid consent ─────
  informedConsent: function () {
    var pillars=[
      {l:'INFORMATION',s:'full disclosure of','d':'purpose · risks · benefits','c':'#6366f1'},
      {l:'COMPREHENSION',s:'participant truly','d':'understands it all','c':'#8b5cf6'},
      {l:'VOLUNTARINESS',s:'free choice —','d':'no coercion','c':'#22c55e'}
    ];
    var svg='',W=520,pW=150,pH=110,gap=15,startX=(W-(3*pW+2*gap))/2,topY=30;
    for(var i=0;i<pillars.length;i++){
      var p=pillars[i],x=startX+i*(pW+gap),delay=(i*0.4).toFixed(1);
      svg+='<rect x="'+x+'" y="'+topY+'" width="'+pW+'" height="'+pH+'" rx="12" fill="'+p.c+'" fill-opacity="0.12" stroke="'+p.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(x+pW/2)+'" y="'+(topY+34)+'" text-anchor="middle" fill="'+p.c+'" font-size="26" font-weight="700">'+(i+1)+'</text>'
        +'<text x="'+(x+pW/2)+'" y="'+(topY+60)+'" text-anchor="middle" fill="'+p.c+'" font-size="11" font-weight="700">'+p.l+'</text>'
        +'<text x="'+(x+pW/2)+'" y="'+(topY+78)+'" text-anchor="middle" fill="'+p.c+'" font-size="8">'+p.s+'</text>'
        +'<text x="'+(x+pW/2)+'" y="'+(topY+92)+'" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">'+p.d+'</text>';
      // arrow down to the result bar
      svg+='<line x1="'+(x+pW/2)+'" y1="'+(topY+pH)+'" x2="'+(x+pW/2)+'" y2="'+(topY+pH+22)+'" stroke="#94a3b8" stroke-width="1.8" marker-end="url(#ica)">'
        +'<animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></line>';
    }
    var barY=topY+pH+22;
    svg+='<rect x="'+startX+'" y="'+barY+'" width="'+(3*pW+2*gap)+'" height="42" rx="12" fill="#0d9488" fill-opacity="0.15" stroke="#0d9488" stroke-width="2.5">'
      +'<animate attributeName="fill-opacity" values="0.1;0.28;0.1" dur="2.5s" repeatCount="indefinite"/></rect>'
      +'<text x="'+(W/2)+'" y="'+(barY+27)+'" text-anchor="middle" fill="#0f766e" font-size="13" font-weight="700">✔ VALID INFORMED CONSENT</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">📝 Animated: 3 Pillars of Informed Consent</div>'
      +'<svg viewBox="0 0 '+W+' 210" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="ica" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>All 3 pillars must stand — miss one and consent is invalid.</strong> <span style="color:#6366f1">Information</span> (tell them everything) + <span style="color:#8b5cf6">Comprehension</span> (they understand it) + <span style="color:#22c55e">Voluntariness</span> (they choose freely, no pressure) = valid informed consent. Based on Nuremberg Code &amp; Declaration of Helsinki.</div>'
    +'</div>';
  },

  // ─── CHN2. WHO GROWTH CHART — weight-for-age curves + a child's rising then faltering line ───
  growthChart: function () {
    var W=540,H=320,x0=54,x1=508,y0=24,yB=258;   // plot box
    var maxAge=60,maxW=20;                          // 0–60 months, 0–20 kg
    function px(age){ return x0+(age/maxAge)*(x1-x0); }
    function py(w){ return yB-(w/maxW)*(yB-y0); }
    function poly(pts){ var s=''; for(var i=0;i<pts.length;i++){ s+=(i?' ':'')+px(pts[i][0]).toFixed(1)+','+py(pts[i][1]).toFixed(1); } return s; }
    // WHO weight-for-age reference bands (approx): [ageMonths, weightKg]
    var median=[[0,3.3],[12,9.6],[24,12.2],[36,14.3],[48,16.3],[60,18.3]];
    var sd2=[[0,2.5],[12,7.7],[24,10.0],[36,11.8],[48,13.4],[60,15.0]];   // -2SD (MAM line)
    var sd3=[[0,2.1],[12,6.9],[24,8.9],[36,10.5],[48,11.9],[60,13.3]];    // -3SD (SAM line)
    // A real child: grows well, then the line goes FLAT (growth faltering) after 24m
    var child=[[0,3.2],[6,7.2],[12,9.2],[18,10.4],[24,11.0],[30,11.1],[36,11.0]];
    var grid='';
    for(var a=0;a<=60;a+=12){ grid+='<line x1="'+px(a)+'" y1="'+y0+'" x2="'+px(a)+'" y2="'+yB+'" stroke="#e2e8f0" stroke-width="1"/>'
      +'<text x="'+px(a)+'" y="'+(yB+16)+'" text-anchor="middle" fill="#64748b" font-size="9">'+a+'</text>'; }
    for(var w=0;w<=20;w+=5){ grid+='<line x1="'+x0+'" y1="'+py(w)+'" x2="'+x1+'" y2="'+py(w)+'" stroke="#e2e8f0" stroke-width="1"/>'
      +'<text x="'+(x0-8)+'" y="'+(py(w)+3)+'" text-anchor="end" fill="#64748b" font-size="9">'+w+'</text>'; }
    // the moving dot follows the child's line
    var dots=''; for(var i=0;i<child.length;i++){ dots+='<circle cx="'+px(child[i][0])+'" cy="'+py(child[i][1])+'" r="3.5" fill="#2563eb"/>'; }
    var mover='<circle r="6" fill="#2563eb" opacity="0.9"><animateMotion dur="5s" repeatCount="indefinite" path="M'+px(0)+','+py(child[0][1])
      +' L'+child.map(function(p){return px(p[0]).toFixed(0)+','+py(p[1]).toFixed(0);}).join(' L')+'"/></circle>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">📈 Animated: WHO Growth Chart — Watch the Child\'s Line</div>'
      +'<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +grid
        +'<line x1="'+x0+'" y1="'+y0+'" x2="'+x0+'" y2="'+yB+'" stroke="#94a3b8" stroke-width="1.5"/>'
        +'<line x1="'+x0+'" y1="'+yB+'" x2="'+x1+'" y2="'+yB+'" stroke="#94a3b8" stroke-width="1.5"/>'
        +'<text x="'+((x0+x1)/2)+'" y="'+(H-6)+'" text-anchor="middle" fill="#475569" font-size="10" font-weight="600">Age (months)</text>'
        +'<text x="16" y="'+((y0+yB)/2)+'" text-anchor="middle" fill="#475569" font-size="10" font-weight="600" transform="rotate(-90 16 '+((y0+yB)/2)+')">Weight (kg)</text>'
        // reference bands
        +'<polyline points="'+poly(median)+'" fill="none" stroke="#22c55e" stroke-width="2.5"/>'
        +'<polyline points="'+poly(sd2)+'" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>'
        +'<polyline points="'+poly(sd3)+'" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4"/>'
        +'<text x="'+(x1-2)+'" y="'+(py(18.3)-4)+'" text-anchor="end" fill="#16a34a" font-size="9" font-weight="700">Median (normal)</text>'
        +'<text x="'+(x1-2)+'" y="'+(py(15.0)-4)+'" text-anchor="end" fill="#d97706" font-size="9" font-weight="700">-2SD (MAM)</text>'
        +'<text x="'+(x1-2)+'" y="'+(py(13.3)+12)+'" text-anchor="end" fill="#dc2626" font-size="9" font-weight="700">-3SD (SAM)</text>'
        // child line: healthy climb then flat = faltering
        +'<polyline points="'+poly(child)+'" fill="none" stroke="#2563eb" stroke-width="3"/>'
        +dots+mover
        +'<text x="'+px(30)+'" y="'+(py(11.1)-10)+'" text-anchor="middle" fill="#1d4ed8" font-size="9" font-weight="700">⚠ line goes FLAT = growth faltering</text>'
      +'</svg>'
      +'<div class="diagram-key"><strong>Plot weight against age every month.</strong> A line rising along the <span style="color:#16a34a">green median</span> = healthy. Crossing below the <span style="color:#d97706">-2SD amber line</span> = Moderate malnutrition (MAM); below the <span style="color:#dc2626">-3SD red line</span> = Severe (SAM → refer to NRC). A <span style="color:#1d4ed8">FLAT line</span> (no weight gain) is the earliest danger sign — catch it before the child falls into the red zone.</div>'
    +'</div>';
  },

  // ─── CHN2. NATIONAL IMMUNIZATION SCHEDULE — a timeline from birth to 5 years ───
  immunizationTimeline: function () {
    var stops=[
      {age:'Birth',v:'BCG · OPV-0 · Hep-B',c:'#ef4444'},
      {age:'6 wk',v:'OPV-1 · Penta-1 · RVV-1 · fIPV-1',c:'#f59e0b'},
      {age:'10 wk',v:'OPV-2 · Penta-2 · RVV-2',c:'#f59e0b'},
      {age:'14 wk',v:'OPV-3 · Penta-3 · RVV-3 · fIPV-2',c:'#f59e0b'},
      {age:'9 mo',v:'MR-1 · Vit-A-1 · JE-1',c:'#22c55e'},
      {age:'16-24 mo',v:'DPT-B1 · OPV-B · MR-2 · Vit-A-2',c:'#0ea5e9'},
      {age:'5-6 yr',v:'DPT-B2',c:'#6366f1'}
    ];
    var W=560,lineY=70,x0=40,x1=520,n=stops.length,svg='';
    svg+='<line x1="'+x0+'" y1="'+lineY+'" x2="'+x1+'" y2="'+lineY+'" stroke="#cbd5e1" stroke-width="3"/>';
    // travelling pulse along the timeline
    svg+='<circle r="6" fill="#2563eb" opacity="0.85"><animate attributeName="cx" values="'+x0+';'+x1+'" dur="6s" repeatCount="indefinite"/><animate attributeName="cy" values="'+lineY+';'+lineY+'" dur="6s" repeatCount="indefinite"/></circle>';
    for(var i=0;i<n;i++){
      var s=stops[i],cx=x0+(i/(n-1))*(x1-x0),delay=(i*0.5).toFixed(1);
      svg+='<circle cx="'+cx+'" cy="'+lineY+'" r="9" fill="'+s.c+'" stroke="#fff" stroke-width="2">'
        +'<animate attributeName="r" values="7;11;7" dur="2.5s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+cx+'" y="'+(lineY-18)+'" text-anchor="middle" fill="'+s.c+'" font-size="11" font-weight="700">'+s.age+'</text>';
      // vaccine label below, wrapped in a tspan box
      var ty=lineY+26+((i%2)*0)+0;
      svg+='<text x="'+cx+'" y="'+(lineY+26)+'" text-anchor="middle" fill="#475569" font-size="7.5" font-family="monospace">'
        +s.v.split(' · ').map(function(part,k){return '<tspan x="'+cx+'" dy="'+(k?9:0)+'">'+part+'</tspan>';}).join('')
        +'</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">💉 Animated: National Immunization Schedule — Birth to 6 Years</div>'
      +'<svg viewBox="0 0 '+W+' 150" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Follow the child\'s age along the line.</strong> <span style="color:#ef4444">Birth</span> = BCG + OPV-0 + Hep-B. <span style="color:#f59e0b">6/10/14 weeks</span> = the primary Penta + OPV + RVV series. <span style="color:#22c55e">9 months</span> = Measles-Rubella + Vitamin A. <span style="color:#0ea5e9">16-24 months</span> = boosters. <span style="color:#6366f1">5-6 yr</span> = final DPT booster. Free under UIP — protects against 12 diseases.</div>'
    +'</div>';
  },

  // ─── CHN2. COLD CHAIN — the temperature zones vaccines must stay in ───
  coldChain: function () {
    var W=520,svg='';
    var zones=[
      {t:'-15° to -25°C',lbl:'FREEZER',v:'OPV · BCG · Measles/MR',note:'keep FROZEN',c:'#2563eb',y:24},
      {t:'+2° to +8°C',lbl:'REFRIGERATOR',v:'DPT · Penta · Hep-B · TT · IPV',note:'NEVER freeze these!',c:'#16a34a',y:112},
      {t:'above +8°C',lbl:'DANGER ZONE',v:'vaccine DAMAGED by heat',note:'VVM turns dark → discard',c:'#ef4444',y:200}
    ];
    for(var i=0;i<zones.length;i++){
      var z=zones[i],delay=(i*0.4).toFixed(1);
      svg+='<rect x="40" y="'+z.y+'" width="440" height="76" rx="12" fill="'+z.c+'" fill-opacity="0.12" stroke="'+z.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.08;0.22;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="60" y="'+(z.y+30)+'" fill="'+z.c+'" font-size="15" font-weight="700">'+z.t+'</text>'
        +'<text x="60" y="'+(z.y+50)+'" fill="'+z.c+'" font-size="10" font-weight="600">'+z.lbl+' — '+z.note+'</text>'
        +'<text x="60" y="'+(z.y+66)+'" fill="#64748b" font-size="9" font-family="monospace">'+z.v+'</text>';
    }
    // a thermometer on the right
    svg+='<rect x="470" y="24" width="14" height="176" rx="7" fill="#e2e8f0"/>'
      +'<rect x="470" y="24" width="14" height="176" rx="7" fill="url(#ccgrad)" opacity="0.6"/>'
      +'<circle cx="477" cy="212" r="14" fill="#ef4444"/>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🧊 Animated: Cold Chain — The 3 Temperature Zones</div>'
      +'<svg viewBox="0 0 '+W+' 240" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><linearGradient id="ccgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2563eb"/><stop offset="50%" stop-color="#16a34a"/><stop offset="100%" stop-color="#ef4444"/></linearGradient></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Every vaccine has a safe zone.</strong> <span style="color:#2563eb">Freezer (-15 to -25°C)</span> for OPV, BCG, Measles. <span style="color:#16a34a">Fridge (+2 to +8°C)</span> for DPT/Penta/Hep-B/TT — <strong>freezing destroys these!</strong> <span style="color:#ef4444">Above +8°C</span> = heat damage; the VVM sticker turns dark and the vial must be discarded. The cold chain keeps vaccines in their zone from factory to child.</div>'
    +'</div>';
  },

  // ─── CHN2-U3. DEMOGRAPHIC TRANSITION — birth & death rate curves crossing over 4 stages ───
  demographicTransition: function () {
    var W=560,x0=50,x1=530,y0=30,yB=240,maxR=50;
    var stages=['Stage 1\\nHigh Stationary','Stage 2\\nEarly Expanding','Stage 3\\nLate Expanding','Stage 4\\nLow Stationary'];
    var birth=[42,42,30,13], death=[40,26,13,11];
    function px(i){ return x0+(i/3)*(x1-x0); }
    function py(r){ return yB-(r/maxR)*(yB-y0); }
    function line(vals){ var s=''; for(var i=0;i<vals.length;i++){ s+=(i?' ':'')+px(i).toFixed(0)+','+py(vals[i]).toFixed(0); } return s; }
    var svg='';
    // stage bands + labels
    for(var i=0;i<4;i++){ var bx=x0+(i/4)*(x1-x0), bw=(x1-x0)/4;
      svg+='<rect x="'+bx+'" y="'+y0+'" width="'+bw+'" height="'+(yB-y0)+'" fill="'+(i%2?'#f1f5f9':'#f8fafc')+'"/>';
      var parts=stages[i].split('\\n');
      svg+='<text x="'+(bx+bw/2)+'" y="'+(yB+18)+'" text-anchor="middle" fill="#475569" font-size="9" font-weight="700">'+parts[0]+'</text>'
        +'<text x="'+(bx+bw/2)+'" y="'+(yB+30)+'" text-anchor="middle" fill="#94a3b8" font-size="7.5">'+parts[1]+'</text>'; }
    svg+='<line x1="'+x0+'" y1="'+y0+'" x2="'+x0+'" y2="'+yB+'" stroke="#94a3b8" stroke-width="1.5"/>'
      +'<line x1="'+x0+'" y1="'+yB+'" x2="'+x1+'" y2="'+yB+'" stroke="#94a3b8" stroke-width="1.5"/>';
    // gap between the curves shaded = population growth
    svg+='<polygon points="'+line(birth)+' '+px(3).toFixed(0)+','+py(death[3]).toFixed(0)+' '+px(2).toFixed(0)+','+py(death[2]).toFixed(0)+' '+px(1).toFixed(0)+','+py(death[1]).toFixed(0)+' '+px(0).toFixed(0)+','+py(death[0]).toFixed(0)+'" fill="#22c55e" fill-opacity="0.12"/>';
    svg+='<polyline points="'+line(birth)+'" fill="none" stroke="#ef4444" stroke-width="3"><animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></polyline>'
      +'<polyline points="'+line(death)+'" fill="none" stroke="#2563eb" stroke-width="3"><animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="3s" begin="0.5s" repeatCount="indefinite"/></polyline>'
      +'<text x="'+(px(0)+6)+'" y="'+(py(birth[0])-6)+'" fill="#ef4444" font-size="10" font-weight="700">Birth rate</text>'
      +'<text x="'+(px(0)+6)+'" y="'+(py(death[0])+16)+'" fill="#2563eb" font-size="10" font-weight="700">Death rate</text>'
      +'<text x="'+px(2)+'" y="'+(py(30)-20)+'" text-anchor="middle" fill="#16a34a" font-size="9" font-weight="700">gap = population growth</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">📉 Animated: Demographic Transition — 4 Stages</div>'
      +'<svg viewBox="0 0 '+W+' 285" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Both rates start high, then fall at different times.</strong> Stage 1: high birth &amp; death (slow growth). Stage 2: death rate <span style="color:#2563eb">drops</span> first (fast growth — India was here). Stage 3: birth rate <span style="color:#ef4444">falls</span> too (growth slows). Stage 4: both low (stable). The <span style="color:#16a34a">green gap</span> between the curves = how fast the population is growing.</div>'
    +'</div>';
  },

  // ─── CHN2-U3. EPIDEMIOLOGICAL TRIAD — Host / Agent / Environment triangle ───
  epidemiologicalTriad: function () {
    var W=520,cx=260,ax=[260,120,400],ay=[60,250,250];
    var nodes=[
      {t:'AGENT',s:'the CAUSE',ex:'bacteria · virus · toxin · deficiency',c:'#ef4444'},
      {t:'HOST',s:'the PERSON',ex:'age · immunity · habits · genetics',c:'#2563eb'},
      {t:'ENVIRONMENT',s:'the SURROUNDINGS',ex:'water · sanitation · climate · crowding',c:'#16a34a'}
    ];
    var svg='<polygon points="'+ax[0]+','+ay[0]+' '+ax[1]+','+ay[1]+' '+ax[2]+','+ay[2]+'" fill="none" stroke="#cbd5e1" stroke-width="2.5" stroke-dasharray="7 5"><animate attributeName="stroke-dashoffset" values="0;24" dur="2s" repeatCount="indefinite"/></polygon>';
    // balance dot in the centre
    svg+='<circle cx="'+cx+'" cy="190" r="7" fill="#f59e0b"><animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite"/></circle>'
      +'<text x="'+cx+'" y="'+178+'" text-anchor="middle" fill="#d97706" font-size="8" font-weight="700">balance = health</text>';
    for(var i=0;i<3;i++){ var n=nodes[i],delay=(i*0.4).toFixed(1);
      svg+='<circle cx="'+ax[i]+'" cy="'+ay[i]+'" r="42" fill="'+n.c+'" fill-opacity="0.14" stroke="'+n.c+'" stroke-width="3">'
        +'<animate attributeName="fill-opacity" values="0.08;0.26;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+ax[i]+'" y="'+(ay[i]-4)+'" text-anchor="middle" fill="'+n.c+'" font-size="12" font-weight="700">'+n.t+'</text>'
        +'<text x="'+ax[i]+'" y="'+(ay[i]+10)+'" text-anchor="middle" fill="'+n.c+'" font-size="8" font-weight="600">'+n.s+'</text>'
        +'<text x="'+ax[i]+'" y="'+(ay[i]+(i?58:-52))+'" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="monospace">'+n.ex+'</text>'; }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🔺 Animated: Epidemiological Triad</div>'
      +'<svg viewBox="0 0 '+W+' 330" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Disease needs all 3 corners to meet.</strong> <span style="color:#ef4444">Agent</span> (the germ/cause) + <span style="color:#2563eb">Host</span> (the person&apos;s body &amp; defences) + <span style="color:#16a34a">Environment</span> (water, crowding, climate). When these three are in <span style="color:#d97706">balance</span> the person stays healthy; tip the balance (weak host, dirty environment, strong agent) and disease appears. Break any one corner to stop the disease.</div>'
    +'</div>';
  },

  // ─── CHN2-U3. CHAIN OF INFECTION — 6 links in a circle with a travelling germ ───
  diseaseTransmission: function () {
    var W=520,cx=260,cy=180,R=130,n=6;
    var links=[
      {t:'Infectious Agent',ex:'bacteria · virus',c:'#ef4444'},
      {t:'Reservoir',ex:'human · animal · soil',c:'#f59e0b'},
      {t:'Portal of Exit',ex:'cough · stool · blood',c:'#eab308'},
      {t:'Mode of Transmission',ex:'air · water · contact · vector',c:'#22c55e'},
      {t:'Portal of Entry',ex:'mouth · nose · skin',c:'#0ea5e9'},
      {t:'Susceptible Host',ex:'low immunity · young · old',c:'#6366f1'}
    ];
    var svg='',pathPts=[];
    for(var i=0;i<n;i++){ var ang=(-90+i*(360/n))*Math.PI/180, x=cx+R*Math.cos(ang), y=cy+R*Math.sin(ang); pathPts.push([x,y]); }
    // arrows between consecutive links (curved via straight for simplicity)
    for(var i=0;i<n;i++){ var a=pathPts[i],b=pathPts[(i+1)%n];
      svg+='<line x1="'+a[0].toFixed(0)+'" y1="'+a[1].toFixed(0)+'" x2="'+b[0].toFixed(0)+'" y2="'+b[1].toFixed(0)+'" stroke="#cbd5e1" stroke-width="2" marker-end="url(#cia)"/>'; }
    // travelling germ around the loop
    var mpath='M'+pathPts.map(function(p){return p[0].toFixed(0)+','+p[1].toFixed(0);}).join(' L')+' Z';
    svg+='<circle r="7" fill="#dc2626"><animateMotion dur="7s" repeatCount="indefinite" path="'+mpath+'"/></circle>';
    for(var i=0;i<n;i++){ var p=pathPts[i],l=links[i],delay=(i*0.5).toFixed(1);
      svg+='<circle cx="'+p[0].toFixed(0)+'" cy="'+p[1].toFixed(0)+'" r="30" fill="'+l.c+'" fill-opacity="0.15" stroke="'+l.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.1;0.28;0.1" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+p[0].toFixed(0)+'" y="'+(p[1]-2).toFixed(0)+'" text-anchor="middle" fill="'+l.c+'" font-size="8.5" font-weight="700">'+(i+1)+'</text>'
        +'<text x="'+p[0].toFixed(0)+'" y="'+(p[1]+10).toFixed(0)+'" text-anchor="middle" fill="#64748b" font-size="6.5" font-family="monospace">'+l.ex+'</text>'
        +'<text x="'+p[0].toFixed(0)+'" y="'+(p[1]+(p[1]<cy?-36:44)).toFixed(0)+'" text-anchor="middle" fill="'+l.c+'" font-size="8.5" font-weight="700">'+l.t+'</text>'; }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🔗 Animated: Chain of Infection</div>'
      +'<svg viewBox="0 0 '+W+' 360" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="cia" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Infection spreads as an unbroken loop.</strong> Agent → Reservoir → Portal of Exit → Mode of Transmission → Portal of Entry → Susceptible Host → back to a new Agent. The red germ travels the whole chain. <strong>Nursing goal:</strong> break ANY one link — kill the agent, isolate the reservoir, hand-washing (exit/entry), vector control, or immunise the host — and transmission stops.</div>'
    +'</div>';
  },

  // ─── CHN2-U3. VITAL STATISTICS INDICATORS — gauges for India's key rates ───
  vitalStatsIndicators: function () {
    var W=520,rows=[
      {k:'CBR',n:'Crude Birth Rate',val:19.5,max:40,unit:'/1000 pop',tgt:21,c:'#22c55e'},
      {k:'CDR',n:'Crude Death Rate',val:6.0,max:40,unit:'/1000 pop',tgt:9,c:'#0ea5e9'},
      {k:'IMR',n:'Infant Mortality Rate',val:28,max:100,unit:'/1000 live births',tgt:25,c:'#f59e0b'},
      {k:'MMR',n:'Maternal Mortality Ratio',val:97,max:300,unit:'/100000 live births',tgt:70,c:'#ef4444'}
    ];
    var barX=150,barW=300,svg='';
    for(var i=0;i<rows.length;i++){ var r=rows[i],y=30+i*62,delay=(i*0.3).toFixed(1);
      var w=(r.val/r.max)*barW, tx=barX+(r.tgt/r.max)*barW;
      svg+='<text x="20" y="'+(y+16)+'" fill="'+r.c+'" font-size="15" font-weight="700">'+r.k+'</text>'
        +'<text x="20" y="'+(y+30)+'" fill="#64748b" font-size="7.5">'+r.n+'</text>'
        +'<rect x="'+barX+'" y="'+y+'" width="'+barW+'" height="22" rx="11" fill="#e2e8f0"/>'
        +'<rect x="'+barX+'" y="'+y+'" width="0" height="22" rx="11" fill="'+r.c+'"><animate attributeName="width" values="0;'+w.toFixed(0)+'" dur="1.4s" begin="'+delay+'s" fill="freeze"/></rect>'
        +'<line x1="'+tx.toFixed(0)+'" y1="'+(y-4)+'" x2="'+tx.toFixed(0)+'" y2="'+(y+26)+'" stroke="#0f172a" stroke-width="2" stroke-dasharray="3 2"/>'
        +'<text x="'+tx.toFixed(0)+'" y="'+(y-7)+'" text-anchor="middle" fill="#0f172a" font-size="7">target '+r.tgt+'</text>'
        +'<text x="'+(barX+barW+8)+'" y="'+(y+16)+'" fill="'+r.c+'" font-size="12" font-weight="700">'+r.val+'</text>'; }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">📊 Animated: India&apos;s Vital Statistics (approx. current)</div>'
      +'<svg viewBox="0 0 '+W+' 280" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Vital rates tell the health of a population.</strong> <span style="color:#22c55e">CBR</span> ≈ 19.5 and <span style="color:#0ea5e9">CDR</span> ≈ 6 per 1000. <span style="color:#f59e0b">IMR</span> ≈ 28 per 1000 live births (SDG target &lt;25). <span style="color:#ef4444">MMR</span> ≈ 97 per 1,00,000 live births (target &lt;70 by 2030). The dashed line marks the goal — bars falling below it = success. (Values shift yearly; quote latest SRS.)</div>'
    +'</div>';
  },

  // ─── CHN2-U3. IDSP REPORTING — surveillance flow PHC → District → State → National ───
  idspReporting: function () {
    var W=520,levels=[
      {t:'Sub-centre / PHC',s:'reporting units fill S · P · L forms',c:'#22c55e'},
      {t:'District Surveillance Unit (DSU)',s:'compiles data, detects outbreaks early',c:'#0ea5e9'},
      {t:'State Surveillance Unit (SSU)',s:'analyses trends, alerts districts',c:'#6366f1'},
      {t:'Central Surveillance Unit (CSU / NCDC)',s:'national picture, rapid response',c:'#ef4444'}
    ];
    var svg='',bW=380,x=(W-bW)/2,y0=20,bH=52,gap=22;
    for(var i=0;i<levels.length;i++){ var L=levels[i],y=y0+i*(bH+gap),delay=(i*0.4).toFixed(1);
      if(i<levels.length-1){ var ny=y+bH; svg+='<line x1="'+(W/2)+'" y1="'+ny+'" x2="'+(W/2)+'" y2="'+(ny+gap)+'" stroke="#94a3b8" stroke-width="2" marker-end="url(#ida)"><animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></line>'; }
      svg+='<rect x="'+x+'" y="'+y+'" width="'+bW+'" height="'+bH+'" rx="10" fill="'+L.c+'" fill-opacity="0.13" stroke="'+L.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.08;0.22;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(W/2)+'" y="'+(y+23)+'" text-anchor="middle" fill="'+L.c+'" font-size="12" font-weight="700">'+L.t+'</text>'
        +'<text x="'+(W/2)+'" y="'+(y+40)+'" text-anchor="middle" fill="#64748b" font-size="8.5">'+L.s+'</text>'; }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🖥️ Animated: IDSP Surveillance Reporting Flow</div>'
      +'<svg viewBox="0 0 '+W+' 300" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="ida" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Data flows up, alerts flow down.</strong> Reporting units (SC/PHC) send <strong>S</strong>-form (Syndromic, by health worker), <strong>P</strong>-form (Presumptive, by doctor) and <strong>L</strong>-form (Laboratory confirmed) → <span style="color:#0ea5e9">District</span> → <span style="color:#6366f1">State</span> → <span style="color:#ef4444">Central (NCDC)</span>. The aim is <strong>early detection of outbreaks</strong> so response starts before a disease spreads.</div>'
    +'</div>';
  },

  // ─── CHN2-U3. ENDEMIC → EPIDEMIC → PANDEMIC — spread scale with growing reach ───
  endemicPandemicScale: function () {
    var W=520,steps=[
      {t:'Sporadic',s:'scattered single cases',c:'#94a3b8',r:8},
      {t:'Endemic',s:'always present in an area',c:'#22c55e',r:20},
      {t:'Epidemic',s:'sudden rise, many at once',c:'#f59e0b',r:34},
      {t:'Pandemic',s:'across countries / world',c:'#ef4444',r:48}
    ];
    var svg='',n=steps.length;
    for(var i=0;i<n;i++){ var s=steps[i],cx=70+i*140,cy=95,delay=(i*0.4).toFixed(1);
      svg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+s.r+'" fill="'+s.c+'" fill-opacity="0.2" stroke="'+s.c+'" stroke-width="2.5">'
        +'<animate attributeName="r" values="'+(s.r-3)+';'+(s.r+3)+';'+(s.r-3)+'" dur="2.5s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+cx+'" y="'+(cy+62)+'" text-anchor="middle" fill="'+s.c+'" font-size="12" font-weight="700">'+s.t+'</text>'
        +'<text x="'+cx+'" y="'+(cy+76)+'" text-anchor="middle" fill="#64748b" font-size="7.5">'+s.s+'</text>';
      if(i<n-1){ svg+='<line x1="'+(cx+s.r+6)+'" y1="'+cy+'" x2="'+(70+(i+1)*140-steps[i+1].r-6)+'" y2="'+cy+'" stroke="#cbd5e1" stroke-width="2" marker-end="url(#epa)"/>'; } }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🌍 Animated: Sporadic → Endemic → Epidemic → Pandemic</div>'
      +'<svg viewBox="0 0 '+W+' 190" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="epa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>The circles grow with geographic spread.</strong> <span style="color:#94a3b8">Sporadic</span> = odd scattered cases (e.g. tetanus). <span style="color:#22c55e">Endemic</span> = constantly present in an area (e.g. malaria in parts of India). <span style="color:#f59e0b">Epidemic</span> = sudden sharp rise above normal (e.g. cholera outbreak). <span style="color:#ef4444">Pandemic</span> = spreads across many countries (e.g. COVID-19).</div>'
    +'</div>';
  },

  // ─── CHN2-U4. FAMILY PLANNING METHODS — tree: Temporary vs Permanent ───
  familyPlanningMethods: function () {
    var W=560,rootX=280,rootY=34;
    var branches=[
      {t:'TEMPORARY (Spacing)',c:'#2563eb',x:150,y:120,kids:[
        {l:'Barrier',e:'condom · diaphragm'},
        {l:'Hormonal',e:'OCP · injectable · implant'},
        {l:'IUCD',e:'Cu-T 380A · LNG-IUS'},
        {l:'Natural',e:'rhythm · LAM · withdrawal'}
      ]},
      {t:'PERMANENT (Terminal)',c:'#ef4444',x:420,y:120,kids:[
        {l:'Tubectomy',e:'female sterilisation'},
        {l:'Vasectomy',e:'male · NSV'}
      ]}
    ];
    var svg='<circle cx="'+rootX+'" cy="'+rootY+'" r="26" fill="#0d9488" fill-opacity="0.15" stroke="#0d9488" stroke-width="2.5"><animate attributeName="fill-opacity" values="0.1;0.28;0.1" dur="3s" repeatCount="indefinite"/></circle>'
      +'<text x="'+rootX+'" y="'+(rootY-2)+'" text-anchor="middle" fill="#0f766e" font-size="10" font-weight="700">FAMILY</text>'
      +'<text x="'+rootX+'" y="'+(rootY+10)+'" text-anchor="middle" fill="#0f766e" font-size="10" font-weight="700">PLANNING</text>';
    for(var b=0;b<branches.length;b++){ var br=branches[b],delay=(b*0.3).toFixed(1);
      svg+='<line x1="'+rootX+'" y1="'+(rootY+26)+'" x2="'+br.x+'" y2="'+(br.y-22)+'" stroke="'+br.c+'" stroke-width="2"/>'
        +'<rect x="'+(br.x-95)+'" y="'+(br.y-22)+'" width="190" height="34" rx="9" fill="'+br.c+'" fill-opacity="0.14" stroke="'+br.c+'" stroke-width="2.5"><animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+br.x+'" y="'+(br.y-1)+'" text-anchor="middle" fill="'+br.c+'" font-size="10.5" font-weight="700">'+br.t+'</text>';
      for(var k=0;k<br.kids.length;k++){ var kid=br.kids[k],ky=br.y+34+k*40, kdelay=((b*0.3)+(k*0.2)).toFixed(1);
        svg+='<line x1="'+br.x+'" y1="'+(br.y+12)+'" x2="'+(br.x-70)+'" y2="'+(ky+13)+'" stroke="'+br.c+'" stroke-width="1.2" stroke-opacity="0.5"/>'
          +'<rect x="'+(br.x-70)+'" y="'+ky+'" width="150" height="30" rx="7" fill="'+br.c+'" fill-opacity="0.08" stroke="'+br.c+'" stroke-width="1.5">'
          +'<animate attributeName="fill-opacity" values="0.05;0.18;0.05" dur="3s" begin="'+kdelay+'s" repeatCount="indefinite"/></rect>'
          +'<text x="'+(br.x-62)+'" y="'+(ky+13)+'" fill="'+br.c+'" font-size="9" font-weight="700">'+kid.l+'</text>'
          +'<text x="'+(br.x-62)+'" y="'+(ky+24)+'" fill="#64748b" font-size="7" font-family="monospace">'+kid.e+'</text>'; }
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🌳 Animated: Methods of Family Planning</div>'
      +'<svg viewBox="0 0 '+W+' 300" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Two big families of methods.</strong> <span style="color:#2563eb">Temporary (spacing)</span> — used to delay or space births, and fully reversible: Barrier (condom), Hormonal (OCP, injectable), IUCD (Cu-T), Natural (rhythm/LAM). <span style="color:#ef4444">Permanent (terminal)</span> — one-time, for couples who want no more children: Tubectomy (female) &amp; Vasectomy/NSV (male). The nurse counsels the couple to choose freely — target-free.</div>'
    +'</div>';
  },

  // ─── CHN2-U4. IUCD PLACEMENT — Cu-T inside the uterus ───
  iucdPlacement: function () {
    var W=420;
    // simple uterus outline (inverted triangle body + cervix), Cu-T inside
    var svg='<path d="M120,60 Q210,30 300,60 L300,70 Q300,150 240,210 Q210,240 210,255 Q210,240 180,210 Q120,150 120,70 Z" fill="#fce7f3" stroke="#db2777" stroke-width="3"/>'
      // fallopian tubes
      +'<path d="M120,66 Q70,55 55,80" fill="none" stroke="#db2777" stroke-width="3"/>'
      +'<path d="M300,66 Q350,55 365,80" fill="none" stroke="#db2777" stroke-width="3"/>'
      +'<circle cx="52" cy="84" r="9" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>'
      +'<circle cx="368" cy="84" r="9" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>'
      // cervix canal
      +'<rect x="200" y="252" width="20" height="34" rx="5" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>'
      // Cu-T device (drawn, then fades in via animation)
      +'<g stroke="#0f766e" stroke-width="4" fill="none" stroke-linecap="round">'
        +'<line x1="130" y1="86" x2="290" y2="86"><animate attributeName="stroke-dasharray" values="0 200;200 0" dur="1.4s" fill="freeze"/></line>'
        +'<line x1="210" y1="86" x2="210" y2="200"><animate attributeName="stroke-dasharray" values="0 140;140 0" dur="1.4s" begin="0.6s" fill="freeze"/></line>'
      +'</g>'
      // copper coil hint + thread
      +'<line x1="210" y1="200" x2="210" y2="284" stroke="#0f766e" stroke-width="1.6" stroke-dasharray="3 3"/>'
      +'<text x="210" y="300" text-anchor="middle" fill="#0f766e" font-size="8">thread (check in vagina)</text>'
      +'<text x="308" y="86" fill="#0f766e" font-size="11" font-weight="700">Cu-T 380A</text>'
      // moving ovum/sperm blocked
      +'<text x="210" y="130" text-anchor="middle" fill="#db2777" font-size="8" font-weight="700">Cu ions ✕ sperm</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🔬 Animated: IUCD (Cu-T) Placement in the Uterus</div>'
      +'<svg viewBox="0 0 '+W+' 320" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>The Cu-T sits inside the uterus.</strong> A doctor/trained nurse inserts it through the cervix; the two arms open out and the stem points down, with a <strong>thread</strong> hanging into the vagina (so the woman can check it is in place). <strong>How it works:</strong> copper releases ions that are toxic to sperm and stop fertilisation; it also makes the uterine lining unfriendly to implantation. Cu-T 380A lasts up to 10 years, fully reversible.</div>'
    +'</div>';
  },

  // ─── CHN2-U4. MTP ACT TIMELINE — 1971 → 2002 → 2021 ───
  mtpTimeline: function () {
    var W=560,lineY=80,x0=60,x1=500,stops=[
      {yr:'1971',t:'MTP Act passed',d:'legal abortion up to 20 wk · 1-2 doctors',c:'#2563eb'},
      {yr:'2002/03',t:'Amendment',d:'medical abortion (pills) allowed · decentralised approval',c:'#f59e0b'},
      {yr:'2021',t:'Amendment',d:'limit raised to 24 wk (special groups) · confidentiality · unmarried women included',c:'#16a34a'}
    ];
    var n=stops.length,svg='<line x1="'+x0+'" y1="'+lineY+'" x2="'+x1+'" y2="'+lineY+'" stroke="#cbd5e1" stroke-width="3"/>';
    svg+='<circle r="6" fill="#db2777"><animate attributeName="cx" values="'+x0+';'+x1+'" dur="5s" repeatCount="indefinite"/><animate attributeName="cy" values="'+lineY+';'+lineY+'" dur="5s" repeatCount="indefinite"/></circle>';
    for(var i=0;i<n;i++){ var s=stops[i],cx=x0+(i/(n-1))*(x1-x0),delay=(i*0.5).toFixed(1);
      svg+='<circle cx="'+cx+'" cy="'+lineY+'" r="11" fill="'+s.c+'" stroke="#fff" stroke-width="2.5"><animate attributeName="r" values="9;13;9" dur="2.5s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+cx+'" y="'+(lineY-20)+'" text-anchor="middle" fill="'+s.c+'" font-size="14" font-weight="700">'+s.yr+'</text>'
        +'<text x="'+cx+'" y="'+(lineY+28)+'" text-anchor="middle" fill="'+s.c+'" font-size="10" font-weight="700">'+s.t+'</text>';
      // wrapped detail
      var words=s.d.split(' · ');
      for(var k=0;k<words.length;k++){ svg+='<text x="'+cx+'" y="'+(lineY+42+k*11)+'" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="monospace">'+words[k]+'</text>'; }
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">📅 Animated: MTP Act — 1971 → 2002 → 2021</div>'
      +'<svg viewBox="0 0 '+W+' 170" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>The law widened over 50 years.</strong> <span style="color:#2563eb">1971</span>: abortion made legal up to 20 weeks with doctor approval. <span style="color:#f59e0b">2002</span>: medical abortion pills allowed, approval decentralised. <span style="color:#16a34a">2021</span>: upper limit raised to <strong>24 weeks</strong> for special categories (rape/incest/minors/disability), confidentiality protected, and access extended to unmarried women. Purpose: safe, legal abortion to cut maternal deaths from unsafe abortion.</div>'
    +'</div>';
  },

  // ─── CHN2-U4. INDIA POPULATION GROWTH — 1947 → 2024 ───
  populationGrowth: function () {
    var W=560,x0=54,x1=520,y0=26,yB=230;
    var pts=[[1947,0.34],[1961,0.44],[1971,0.55],[1981,0.68],[1991,0.85],[2001,1.03],[2011,1.21],[2024,1.44]];
    var minYr=1947,maxYr=2024,maxP=1.6;
    function px(y){ return x0+((y-minYr)/(maxYr-minYr))*(x1-x0); }
    function py(p){ return yB-(p/maxP)*(yB-y0); }
    var line=''; for(var i=0;i<pts.length;i++){ line+=(i?' ':'')+px(pts[i][0]).toFixed(0)+','+py(pts[i][1]).toFixed(0); }
    var svg='';
    for(var p=0;p<=1.5;p+=0.5){ svg+='<line x1="'+x0+'" y1="'+py(p)+'" x2="'+x1+'" y2="'+py(p)+'" stroke="#e2e8f0" stroke-width="1"/>'
      +'<text x="'+(x0-8)+'" y="'+(py(p)+3)+'" text-anchor="end" fill="#64748b" font-size="8">'+p.toFixed(1)+'B</text>'; }
    svg+='<line x1="'+x0+'" y1="'+y0+'" x2="'+x0+'" y2="'+yB+'" stroke="#94a3b8" stroke-width="1.5"/>'
      +'<line x1="'+x0+'" y1="'+yB+'" x2="'+x1+'" y2="'+yB+'" stroke="#94a3b8" stroke-width="1.5"/>';
    // area under curve
    svg+='<polygon points="'+px(1947).toFixed(0)+','+yB+' '+line+' '+px(2024).toFixed(0)+','+yB+'" fill="#f59e0b" fill-opacity="0.12"/>';
    svg+='<polyline points="'+line+'" fill="none" stroke="#f59e0b" stroke-width="3"><animate attributeName="stroke-dasharray" values="0 900;900 0" dur="2.5s" fill="freeze"/></polyline>';
    var marks=[[1947,0.34,'1947 · 34 cr'],[1991,0.85,'1991 · 85 cr'],[2024,1.44,'2024 · 1.44 B']];
    for(var m=0;m<marks.length;m++){ var mk=marks[m];
      svg+='<circle cx="'+px(mk[0]).toFixed(0)+'" cy="'+py(mk[1]).toFixed(0)+'" r="5" fill="#d97706"/>'
        +'<text x="'+px(mk[0]).toFixed(0)+'" y="'+(py(mk[1])-10).toFixed(0)+'" text-anchor="'+(m===0?'start':(m===2?'end':'middle'))+'" fill="#b45309" font-size="9" font-weight="700">'+mk[2]+'</text>'; }
    svg+='<text x="'+((x0+x1)/2)+'" y="'+(yB+40)+'" text-anchor="middle" fill="#475569" font-size="10" font-weight="600">Year (1947 → 2024)</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">📈 Animated: India&apos;s Population Growth</div>'
      +'<svg viewBox="0 0 '+W+' 285" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Population more than quadrupled since Independence.</strong> ≈34 crore in 1947 → 85 crore by 1991 → <strong>1.44 billion in 2024</strong> (India now the world&apos;s most populous country). The steep climb = the "population explosion" &mdash; driven by falling death rates while birth rates stayed high. Family planning aims to flatten this curve toward a stable population (replacement TFR ≈ 2.1).</div>'
    +'</div>';
  },

  // ─── CHN2-U4. WOMEN EMPOWERMENT CYCLE — virtuous circle ───
  womenEmpowermentCycle: function () {
    var W=520,cx=260,cy=185,R=125,n=6;
    var steps=[
      {t:'Education',c:'#6366f1'},
      {t:'Economic independence',c:'#0ea5e9'},
      {t:'Delayed marriage',c:'#14b8a6'},
      {t:'Fewer children',c:'#22c55e'},
      {t:'Better health',c:'#f59e0b'},
      {t:'More opportunity',c:'#ef4444'}
    ];
    var pts=[];
    for(var i=0;i<n;i++){ var ang=(-90+i*(360/n))*Math.PI/180; pts.push([cx+R*Math.cos(ang),cy+R*Math.sin(ang)]); }
    var svg='';
    for(var i=0;i<n;i++){ var a=pts[i],b=pts[(i+1)%n];
      svg+='<line x1="'+a[0].toFixed(0)+'" y1="'+a[1].toFixed(0)+'" x2="'+b[0].toFixed(0)+'" y2="'+b[1].toFixed(0)+'" stroke="#cbd5e1" stroke-width="2" marker-end="url(#wea)"/>'; }
    var mpath='M'+pts.map(function(p){return p[0].toFixed(0)+','+p[1].toFixed(0);}).join(' L')+' Z';
    svg+='<circle r="6" fill="#8b5cf6"><animateMotion dur="7s" repeatCount="indefinite" path="'+mpath+'"/></circle>';
    svg+='<text x="'+cx+'" y="'+(cy-4)+'" text-anchor="middle" fill="#7c3aed" font-size="11" font-weight="700">WOMEN</text>'
      +'<text x="'+cx+'" y="'+(cy+10)+'" text-anchor="middle" fill="#7c3aed" font-size="11" font-weight="700">EMPOWERMENT</text>';
    for(var i=0;i<n;i++){ var p=pts[i],s=steps[i],delay=(i*0.4).toFixed(1);
      svg+='<circle cx="'+p[0].toFixed(0)+'" cy="'+p[1].toFixed(0)+'" r="30" fill="'+s.c+'" fill-opacity="0.15" stroke="'+s.c+'" stroke-width="2.5">'
        +'<animate attributeName="fill-opacity" values="0.1;0.28;0.1" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+p[0].toFixed(0)+'" y="'+(p[1]+3).toFixed(0)+'" text-anchor="middle" fill="'+s.c+'" font-size="7.5" font-weight="700">'+s.t.split(' ').map(function(w,k){return '<tspan x="'+p[0].toFixed(0)+'" dy="'+(k?9:0)+'">'+w+'</tspan>';}).join('')+'</text>'; }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">♀️ Animated: The Women Empowerment Cycle</div>'
      +'<svg viewBox="0 0 '+W+' 370" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="wea" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Empowerment feeds itself — a virtuous circle.</strong> Education → economic independence → later marriage → fewer, healthier children → better health &amp; more opportunity → which supports the next girl&apos;s education. Each step strengthens the next, so investing in one girl&apos;s schooling lifts the whole family and slows population growth.</div>'
    +'</div>';
  },

  // ─── CHN2-U5. OCCUPATIONAL HAZARDS TREE — central node + 5 branches ───
  occupationalHazardsTree: function () {
    var W=560,cx=110,cy=190;
    var br=[
      {t:'PHYSICAL',ic:'🔊',ex:'noise · heat · radiation · vibration',c:'#ef4444'},
      {t:'CHEMICAL',ic:'☣️',ex:'dust · fumes · lead · pesticides',c:'#f59e0b'},
      {t:'BIOLOGICAL',ic:'🦠',ex:'infection · needle-stick · zoonosis',c:'#16a34a'},
      {t:'ERGONOMIC',ic:'🪑',ex:'posture · lifting · repetitive strain',c:'#0ea5e9'},
      {t:'PSYCHOSOCIAL',ic:'🧠',ex:'stress · burnout · shift work',c:'#8b5cf6'}
    ];
    var bx=360,y0=44,gap=76,svg='';
    for(var i=0;i<5;i++){ var by=y0+i*gap,delay=(i*0.3).toFixed(1);
      svg+='<path d="M'+(cx+52)+','+cy+' C'+(bx-90)+','+cy+' '+(bx-90)+','+by+' '+(bx-46)+','+by+'" fill="none" stroke="'+br[i].c+'" stroke-width="2.5" stroke-opacity="0.55" stroke-dasharray="6 5"><animate attributeName="stroke-dashoffset" values="22;0" dur="1.4s" begin="'+delay+'s" repeatCount="indefinite"/></path>'
        +'<rect x="'+(bx-46)+'" y="'+(by-22)+'" width="176" height="44" rx="9" fill="'+br[i].c+'" fill-opacity="0.12" stroke="'+br[i].c+'" stroke-width="2"><animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(bx-30)+'" y="'+(by+5)+'" font-size="15">'+br[i].ic+'</text>'
        +'<text x="'+(bx+2)+'" y="'+(by-4)+'" fill="'+br[i].c+'" font-size="10.5" font-weight="700">'+br[i].t+'</text>'
        +'<text x="'+(bx+2)+'" y="'+(by+11)+'" fill="#64748b" font-size="7" font-family="monospace">'+br[i].ex+'</text>'; }
    svg+='<circle cx="'+cx+'" cy="'+cy+'" r="52" fill="#0f766e" fill-opacity="0.14" stroke="#0f766e" stroke-width="3"><animate attributeName="r" values="49;54;49" dur="2.6s" repeatCount="indefinite"/></circle>'
      +'<text x="'+cx+'" y="'+(cy-8)+'" text-anchor="middle" fill="#0f766e" font-size="11" font-weight="700">OCCUP.</text>'
      +'<text x="'+cx+'" y="'+(cy+6)+'" text-anchor="middle" fill="#0f766e" font-size="11" font-weight="700">HAZARDS</text>'
      +'<text x="'+cx+'" y="'+(cy+20)+'" text-anchor="middle" fill="#0f766e" font-size="8" font-weight="600">5 types</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">⚠️ Animated: The 5 Types of Occupational Hazards</div>'
      +'<svg viewBox="0 0 '+W+' 400" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Every job carries hazards — remember "PCBEP".</strong> <span style="color:#ef4444">Physical</span> (noise, heat, radiation), <span style="color:#f59e0b">Chemical</span> (dust, fumes, lead), <span style="color:#16a34a">Biological</span> (infections, needle-stick), <span style="color:#0ea5e9">Ergonomic</span> (bad posture, lifting) and <span style="color:#8b5cf6">Psychosocial</span> (stress, burnout). A miner faces dust, a nurse faces infection, a clerk faces eye-strain — the nurse must recognise all five to protect workers.</div>'
    +'</div>';
  },

  // ─── CHN2-U5. NEEDLE-STICK INJURY PROTOCOL — timed flowchart ───
  nsiProtocol: function () {
    var W=560,steps=[
      {t:'INJURY',s:'needle prick / splash',c:'#ef4444',clk:'0 min'},
      {t:'WASH',s:'wash with soap + running water 15 min; do NOT squeeze',c:'#f59e0b',clk:'immediately'},
      {t:'REPORT',s:'inform in-charge; record in NSI register',c:'#eab308',clk:'at once'},
      {t:'TEST SOURCE',s:'test source patient — HIV / HBsAg / HCV',c:'#22c55e',clk:'&lt; 1 hr'},
      {t:'START PEP',s:'begin Post-Exposure Prophylaxis if risk',c:'#0ea5e9',clk:'within 2 hr'},
      {t:'FOLLOW-UP',s:'re-test at 6 weeks · 3 months · 6 months',c:'#8b5cf6',clk:'6wk–6mo'}
    ];
    var x0=40,bw=210,bh=42,gap=52,svg='';
    for(var i=0;i<steps.length;i++){ var y=30+i*gap,s=steps[i],delay=(i*0.4).toFixed(1);
      if(i<steps.length-1){ svg+='<line x1="'+(x0+bw/2)+'" y1="'+(y+bh)+'" x2="'+(x0+bw/2)+'" y2="'+(y+gap)+'" stroke="#94a3b8" stroke-width="2" marker-end="url(#nsia)"/>'; }
      svg+='<rect x="'+x0+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="8" fill="'+s.c+'" fill-opacity="0.13" stroke="'+s.c+'" stroke-width="2"><animate attributeName="fill-opacity" values="0.08;0.26;0.08" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>'
        +'<text x="'+(x0+10)+'" y="'+(y+17)+'" fill="'+s.c+'" font-size="11" font-weight="700">'+(i+1)+'. '+s.t+'</text>'
        +'<text x="'+(x0+10)+'" y="'+(y+32)+'" fill="#64748b" font-size="7.5">'+s.s+'</text>'
        +'<circle cx="'+(x0+bw+70)+'" cy="'+(y+bh/2)+'" r="19" fill="#fff7ed" stroke="'+s.c+'" stroke-width="2"/>'
        +'<text x="'+(x0+bw+70)+'" y="'+(y+bh/2-2)+'" text-anchor="middle" font-size="10">⏱️</text>'
        +'<text x="'+(x0+bw+70)+'" y="'+(y+bh/2+11)+'" text-anchor="middle" fill="'+s.c+'" font-size="7" font-weight="700">'+s.clk+'</text>'; }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">💉 Animated: Needle-Stick Injury (NSI) Protocol</div>'
      +'<svg viewBox="0 0 '+W+' 360" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'
        +'<defs><marker id="nsia" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#94a3b8"/></marker></defs>'
        +svg
      +'</svg>'
      +'<div class="diagram-key"><strong>Time is everything after a needle-stick.</strong> Wash → Report → Test the source → and above all <strong>start PEP within 2 hours</strong> (never later than 72 hours) — the sooner PEP begins, the better it blocks HIV. Do <em>not</em> squeeze or suck the wound. Follow-up testing at 6 weeks, 3 months and 6 months confirms whether infection occurred.</div>'
    +'</div>';
  },

  // ─── CHN2-U5. ESI BENEFITS WHEEL — 6 benefits radiating from centre ───
  esiActBenefits: function () {
    var W=520,cx=260,cy=195,R=128,n=6;
    var ben=[
      {t:'Sickness',ex:'70% wages · up to 91 days/yr',c:'#0ea5e9'},
      {t:'Maternity',ex:'100% wages · 26 weeks',c:'#ec4899'},
      {t:'Disablement',ex:'90% wages (temp / permanent)',c:'#f59e0b'},
      {t:'Dependants',ex:'90% wages to family if death at work',c:'#ef4444'},
      {t:'Medical',ex:'full care — worker + family',c:'#16a34a'},
      {t:'Funeral',ex:'₹15,000 for last rites',c:'#8b5cf6'}
    ];
    var pts=[];
    for(var i=0;i<n;i++){ var ang=(-90+i*(360/n))*Math.PI/180; pts.push([cx+R*Math.cos(ang),cy+R*Math.sin(ang)]); }
    var svg='';
    for(var i=0;i<n;i++){ var p=pts[i],b=ben[i],delay=(i*0.35).toFixed(1);
      svg+='<line x1="'+cx+'" y1="'+cy+'" x2="'+p[0].toFixed(0)+'" y2="'+p[1].toFixed(0)+'" stroke="'+b.c+'" stroke-width="2" stroke-opacity="0.4"/>'
        +'<circle cx="'+p[0].toFixed(0)+'" cy="'+p[1].toFixed(0)+'" r="34" fill="'+b.c+'" fill-opacity="0.14" stroke="'+b.c+'" stroke-width="2.5"><animate attributeName="fill-opacity" values="0.1;0.28;0.1" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></circle>'
        +'<text x="'+p[0].toFixed(0)+'" y="'+(p[1]-2).toFixed(0)+'" text-anchor="middle" fill="'+b.c+'" font-size="9.5" font-weight="700">'+b.t+'</text>'
        +'<text x="'+p[0].toFixed(0)+'" y="'+(p[1]+(p[1]<cy?-40:46)).toFixed(0)+'" text-anchor="middle" fill="#64748b" font-size="6.8" font-family="monospace">'+b.ex+'</text>'; }
    svg+='<circle cx="'+cx+'" cy="'+cy+'" r="40" fill="#0f766e" fill-opacity="0.15" stroke="#0f766e" stroke-width="3"><animate attributeName="r" values="37;42;37" dur="2.6s" repeatCount="indefinite"/></circle>'
      +'<text x="'+cx+'" y="'+(cy-4)+'" text-anchor="middle" fill="#0f766e" font-size="13" font-weight="700">ESI</text>'
      +'<text x="'+cx+'" y="'+(cy+11)+'" text-anchor="middle" fill="#0f766e" font-size="8" font-weight="600">6 benefits</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🛡️ Animated: The 6 Benefits of the ESI Scheme</div>'
      +'<svg viewBox="0 0 '+W+' 390" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>ESI Act 1948 protects the worker from "womb to tomb".</strong> Six cash + care benefits: <span style="color:#0ea5e9">Sickness</span>, <span style="color:#ec4899">Maternity</span>, <span style="color:#f59e0b">Disablement</span>, <span style="color:#ef4444">Dependants&apos;</span>, <span style="color:#16a34a">Medical</span> and <span style="color:#8b5cf6">Funeral</span>. Funded by employer (3.25%) + employee (0.75%) contributions, it covers a worker earning ≤ ₹21,000/month and their family.</div>'
    +'</div>';
  },

  // ─── CHN2-U5. OCCUPATIONAL DISEASES — Industry→Hazard→Disease→Prevention ───
  occupationalDiseases: function () {
    var W=560,rows=[
      {ind:'Mining / Quarry',hz:'Silica dust',dis:'Silicosis',pv:'Wet drilling + N95 mask',c:'#ef4444'},
      {ind:'Construction',hz:'Asbestos fibres',dis:'Asbestosis',pv:'Ban asbestos + PPE',c:'#f59e0b'},
      {ind:'Battery / Paint',hz:'Lead fumes',dis:'Lead poisoning',pv:'Ventilation + blood-lead check',c:'#16a34a'},
      {ind:'Textile mill',hz:'Cotton dust',dis:'Byssinosis',pv:'Dust extraction + masks',c:'#0ea5e9'},
      {ind:'Factory / Airport',hz:'Loud noise',dis:'Noise-induced hearing loss',pv:'Ear plugs + noise limits',c:'#8b5cf6'}
    ];
    var cols=[{x:14,w:118,h:'INDUSTRY'},{x:146,w:104,h:'HAZARD'},{x:264,w:132,h:'DISEASE'},{x:410,w:136,h:'PREVENTION'}];
    var svg='';
    for(var c=0;c<cols.length;c++){ svg+='<text x="'+(cols[c].x+cols[c].w/2)+'" y="22" text-anchor="middle" fill="#334155" font-size="9.5" font-weight="700">'+cols[c].h+'</text>'; }
    for(var i=0;i<rows.length;i++){ var y=36+i*58,r=rows[i],delay=(i*0.3).toFixed(1),cell=[r.ind,r.hz,r.dis,r.pv];
      for(var c=0;c<4;c++){ var col=cols[c];
        svg+='<rect x="'+col.x+'" y="'+y+'" width="'+col.w+'" height="44" rx="7" fill="'+r.c+'" fill-opacity="'+(c===2?0.2:0.1)+'" stroke="'+r.c+'" stroke-width="'+(c===2?2.2:1.6)+'"><animate attributeName="fill-opacity" values="'+(c===2?'0.14;0.32;0.14':'0.06;0.2;0.06')+'" dur="3s" begin="'+delay+'s" repeatCount="indefinite"/></rect>';
        var words=cell[c].split(' '),ty=y+(words.length>2?15:26);
        svg+='<text x="'+(col.x+col.w/2)+'" y="'+ty+'" text-anchor="middle" fill="'+(c===2?r.c:'#475569')+'" font-size="8" font-weight="'+(c===2?700:600)+'">'+words.map(function(w,k){return '<tspan x="'+(col.x+col.w/2)+'" dy="'+(k?9:0)+'">'+w+'</tspan>';}).join('')+'</text>';
        if(c<3){ svg+='<text x="'+(col.x+col.w+2)+'" y="'+(y+26)+'" fill="#94a3b8" font-size="12">→</text>'; } }
    }
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🏭 Animated: Occupational Diseases — Industry → Hazard → Disease → Prevention</div>'
      +'<svg viewBox="0 0 '+W+' 340" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Each industry has a signature disease — and each is preventable.</strong> Silica dust → <span style="color:#ef4444">Silicosis</span>; asbestos → <span style="color:#f59e0b">Asbestosis</span>; lead → <span style="color:#16a34a">lead poisoning</span>; cotton dust → <span style="color:#0ea5e9">Byssinosis</span>; loud noise → <span style="color:#8b5cf6">hearing loss</span>. Control the hazard at source (wet drilling, ventilation, substitution) + PPE + regular screening = disease prevented.</div>'
    +'</div>';
  },

  // ─── CHN2-U5. ERGONOMICS POSTURE — wrong (red) vs correct (green) ───
  ergonomicsPosture: function () {
    var W=520,svg='';
    // left panel — WRONG (desk, slouched)
    svg+='<rect x="14" y="30" width="230" height="300" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>'
      +'<text x="129" y="52" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="700">✗ WRONG POSTURE</text>'
      // slouched figure
      +'<circle cx="90" cy="120" r="15" fill="#fca5a5"/>'
      +'<path d="M90,135 Q70,175 82,220" fill="none" stroke="#ef4444" stroke-width="9" stroke-linecap="round"/>'
      +'<line x1="82" y1="220" x2="150" y2="222" stroke="#ef4444" stroke-width="9" stroke-linecap="round"/>'
      +'<line x1="90" y1="150" x2="140" y2="170" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>'
      // stress marks on back
      +'<text x="60" y="175" fill="#dc2626" font-size="14" font-weight="700">⚡<animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/></text>'
      +'<text x="150" y="210" fill="#dc2626" font-size="12" font-weight="700">⚡<animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/></text>'
      +'<rect x="140" y="222" width="70" height="8" fill="#94a3b8"/>'
      +'<text x="129" y="315" text-anchor="middle" fill="#b91c1c" font-size="8">bent back · craned neck · no support</text>';
    // right panel — CORRECT (upright)
    svg+='<rect x="276" y="30" width="230" height="300" rx="12" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>'
      +'<text x="391" y="52" text-anchor="middle" fill="#16a34a" font-size="12" font-weight="700">✓ CORRECT POSTURE</text>'
      +'<circle cx="360" cy="110" r="15" fill="#86efac"/>'
      +'<line x1="360" y1="125" x2="360" y2="215" stroke="#16a34a" stroke-width="9" stroke-linecap="round"><animate attributeName="stroke" values="#16a34a;#22c55e;#16a34a" dur="2.4s" repeatCount="indefinite"/></line>'
      +'<line x1="360" y1="215" x2="420" y2="217" stroke="#16a34a" stroke-width="9" stroke-linecap="round"/>'
      +'<line x1="360" y1="150" x2="410" y2="150" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/>'
      +'<rect x="352" y="215" width="16" height="55" fill="#16a34a" fill-opacity="0.25"/>' // chair back support
      +'<rect x="410" y="150" width="60" height="8" fill="#94a3b8"/>' // desk at elbow height
      +'<text x="391" y="315" text-anchor="middle" fill="#15803d" font-size="8">straight spine · neck neutral · back supported</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      +'<div class="diagram-title">🪑 Animated: Ergonomics — Wrong vs Correct Posture</div>'
      +'<svg viewBox="0 0 '+W+' 345" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">'+svg+'</svg>'
      +'<div class="diagram-key"><strong>Ergonomics = fitting the job to the worker, not the worker to the job.</strong> <span style="color:#ef4444">Wrong:</span> bent back and craned neck strain the spine (⚡ pain points) → back-ache &amp; repetitive-strain injury. <span style="color:#16a34a">Correct:</span> straight spine, neutral neck, feet flat, screen at eye level, back supported. For lifting: bend the knees, not the back, and keep the load close.</div>'
    +'</div>';
  },

  // ─── CHN2-U9. REFERRAL SYSTEM — stepped upward + back-referral ──
  referralSystem: function () {
    // Levels: SC, PHC, CHC, DH, Medical College
    var levels = [
      { name: 'Sub-Centre (SC)', pop: 'Pop: ~5,000', color: '#4caf50', y: 390, x: 60 },
      { name: 'PHC', pop: 'Pop: 30,000', color: '#2196f3', y: 300, x: 170 },
      { name: 'CHC', pop: 'Pop: 1,20,000', color: '#9c27b0', y: 210, x: 280 },
      { name: 'District Hospital', pop: 'District', color: '#ff9800', y: 120, x: 390 },
      { name: 'Medical College', pop: 'State/Regional', color: '#f44336', y: 40, x: 500 }
    ];
    var W = 640, H = 460, svg = '';
    // gradient defs + arrow marker
    svg += '<defs>'
      + '<marker id="rs-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 Z" fill="#37474f"/></marker>'
      + '<marker id="rs-arr-back" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 Z" fill="#90a4ae"/></marker>'
      + '</defs>';
    // Background
    svg += '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="12" fill="#f8f9fa"/>';
    // Title
    svg += '<text x="'+W/2+'" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#263238">Referral System in India — Upward &amp; Back-Referral</text>';
    // Draw forward referral arrows (upward-stepped diagonal)
    for (var i = 0; i < levels.length - 1; i++) {
      var l = levels[i], n = levels[i + 1];
      var bx = l.x + 95, by = l.y + 22, ex = n.x, ey = n.y + 22;
      svg += '<line x1="'+bx+'" y1="'+by+'" x2="'+ex+'" y2="'+ey+'" stroke="#37474f" stroke-width="2.5" marker-end="url(#rs-arr)">'
        + '<animate attributeName="stroke-dasharray" values="0,200;200,0" dur="2s" begin="'+(i*0.4)+'s" repeatCount="indefinite"/>'
        + '</line>';
    }
    // Draw back-referral arrows (dotted, going downward)
    for (var j = 1; j < levels.length; j++) {
      var lo = levels[j], lp = levels[j - 1];
      var bx2 = lo.x + 5, by2 = lo.y + 35, ex2 = lp.x + 90, ey2 = lp.y + 35;
      svg += '<line x1="'+bx2+'" y1="'+by2+'" x2="'+ex2+'" y2="'+ey2+'" stroke="#90a4ae" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#rs-arr-back)" opacity="0.7"/>';
    }
    // Draw level boxes
    for (var k = 0; k < levels.length; k++) {
      var lv = levels[k];
      svg += '<rect x="'+lv.x+'" y="'+lv.y+'" width="100" height="44" rx="8" fill="'+lv.color+'" opacity="0.9"/>'
        + '<text x="'+(lv.x+50)+'" y="'+(lv.y+17)+'" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">'+lv.name+'</text>'
        + '<text x="'+(lv.x+50)+'" y="'+(lv.y+32)+'" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.85)">'+lv.pop+'</text>';
    }
    // Legend
    svg += '<line x1="30" y1="430" x2="90" y2="430" stroke="#37474f" stroke-width="2.5"/>'
      + '<polygon points="90,426 90,434 98,430" fill="#37474f"/>'
      + '<text x="102" y="434" font-size="9" fill="#37474f">Upward Referral</text>'
      + '<line x1="220" y1="430" x2="280" y2="430" stroke="#90a4ae" stroke-width="1.5" stroke-dasharray="5 4"/>'
      + '<polygon points="280,426 280,434 288,430" fill="#90a4ae"/>'
      + '<text x="292" y="434" font-size="9" fill="#90a4ae">Back-Referral</text>';
    return '<div class="interactive-diagram chn-diagram">'
      + '<div class="diagram-title">&#8599; Animated: Referral System — SC to Medical College</div>'
      + '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key">Referral flows <strong>upward</strong> (SC → PHC → CHC → District Hospital → Medical College) when a case exceeds the facility\'s capacity. <strong>Back-referral</strong> (dotted) returns stabilised patients to lower levels for follow-up, reducing burden on higher centres. Every level must maintain a referral register and provide a referral slip.</div>'
      + '</div>';
  },

  // ─── CHN2-U9. THREE-TIER SYSTEM — SC / PHC / CHC boxes ─────────
  threeTierSystem: function () {
    var W = 580, H = 380, svg = '';
    var tiers = [
      {
        label: 'Tier 1 — Sub-Centre (SC)', pop: 'Population: ~5,000',
        color: '#4caf50', y: 280, staff: 'ANM (F) + MPHW (M)', beds: 'No indoor beds'
      },
      {
        label: 'Tier 2 — PHC', pop: 'Population: 30,000',
        color: '#2196f3', y: 160, staff: 'Medical Officer + 14 staff', beds: '6 indoor beds'
      },
      {
        label: 'Tier 3 — CHC', pop: 'Population: 1,20,000',
        color: '#9c27b0', y: 40, staff: '4 Specialists + 21 staff', beds: '30 indoor beds'
      }
    ];
    svg += '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="12" fill="#f3f4f6"/>';
    svg += '<text x="'+W/2+'" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1a202c">Three-Tier Rural Health Infrastructure</text>';
    // Arrow between tiers
    svg += '<defs><marker id="tt-arr" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 Z" fill="#64748b"/></marker></defs>';
    // Vertical connector lines
    svg += '<line x1="290" y1="130" x2="290" y2="155" stroke="#64748b" stroke-width="2" marker-end="url(#tt-arr)"/>';
    svg += '<line x1="290" y1="250" x2="290" y2="275" stroke="#64748b" stroke-width="2" marker-end="url(#tt-arr)"/>';
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i];
      svg += '<rect x="80" y="'+t.y+'" width="420" height="100" rx="10" fill="'+t.color+'" opacity="0.12" stroke="'+t.color+'" stroke-width="2"/>'
        + '<rect x="80" y="'+t.y+'" width="420" height="28" rx="10" fill="'+t.color+'" opacity="0.85"/>'
        + '<text x="290" y="'+(t.y+19)+'" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">'+t.label+'</text>'
        + '<text x="170" y="'+(t.y+52)+'" text-anchor="middle" font-size="9" fill="'+t.color+'" font-weight="600">'+t.pop+'</text>'
        + '<text x="170" y="'+(t.y+68)+'" text-anchor="middle" font-size="9" fill="#374151">'+t.staff+'</text>'
        + '<text x="170" y="'+(t.y+84)+'" text-anchor="middle" font-size="9" fill="#374151">'+t.beds+'</text>'
        + '<text x="420" y="'+(t.y+52)+'" text-anchor="middle" font-size="22" fill="'+t.color+'" opacity="0.25" font-weight="900">'+(3-i)+'</text>';
    }
    svg += '<text x="290" y="365" text-anchor="middle" font-size="8" fill="#6b7280">DH (District Hospital) and Medical College form higher referral levels above CHC</text>';
    return '<div class="interactive-diagram chn-diagram">'
      + '<div class="diagram-title">&#127981; Three-Tier Rural Health System — SC, PHC &amp; CHC</div>'
      + '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key"><strong>Tier 1 (SC):</strong> Closest to community; 1 ANM + 1 MPHW per 5,000 population (3,000 in hilly/tribal areas). <strong>Tier 2 (PHC):</strong> First contact with a qualified doctor; 30,000 population; 6 indoor beds; delivers 24×7 delivery services at upgraded PHCs. <strong>Tier 3 (CHC):</strong> 4-specialist hospital (surgeon, physician, obs-gyn, paediatrician); 1,20,000 population; 30 beds; designated as First Referral Unit (FRU).</div>'
      + '</div>';
  },

  // ─── CHN2-U9. PHC STRUCTURE — layout, staff, services ──────────
  phcStructure: function () {
    var W = 580, H = 420, svg = '';
    svg += '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="12" fill="#e3f2fd"/>';
    svg += '<text x="'+W/2+'" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0d47a1">Primary Health Centre (PHC) — Structure &amp; Functions</text>';
    svg += '<text x="'+W/2+'" y="38" text-anchor="middle" font-size="9" fill="#1565c0">Population: 30,000 (hilly/tribal: 20,000)</text>';
    // Building outline
    svg += '<rect x="20" y="50" width="380" height="330" rx="8" fill="#fff" stroke="#1e88e5" stroke-width="2"/>';
    svg += '<text x="210" y="68" text-anchor="middle" font-size="10" font-weight="700" fill="#1565c0">PHC Building Layout</text>';
    // Rooms
    var rooms = [
      { label: 'OPD (Outdoor)', x: 30, y: 78, w: 110, h: 50, c: '#bbdefb' },
      { label: 'Labour Room', x: 155, y: 78, w: 110, h: 50, c: '#f8bbd0' },
      { label: 'Laboratory', x: 280, y: 78, w: 110, h: 50, c: '#dcedc8' },
      { label: 'Pharmacy', x: 30, y: 145, w: 110, h: 50, c: '#fff9c4' },
      { label: '6-Bed Ward', x: 155, y: 145, w: 235, h: 50, c: '#e8eaf6' },
      { label: 'MO Quarters', x: 30, y: 212, w: 110, h: 50, c: '#ffe0b2' },
      { label: 'Staff Quarters', x: 155, y: 212, w: 110, h: 50, c: '#f3e5f5' },
      { label: 'Store / Records', x: 280, y: 212, w: 110, h: 50, c: '#e0f2f1' },
      { label: 'Waiting Area', x: 30, y: 279, w: 360, h: 45, c: '#fce4ec' }
    ];
    for (var i = 0; i < rooms.length; i++) {
      var r = rooms[i];
      svg += '<rect x="'+r.x+'" y="'+r.y+'" width="'+r.w+'" height="'+r.h+'" rx="5" fill="'+r.c+'" stroke="#90caf9" stroke-width="1"/>'
        + '<text x="'+(r.x+r.w/2)+'" y="'+(r.y+r.h/2+4)+'" text-anchor="middle" font-size="8.5" fill="#1a237e" font-weight="600">'+r.label+'</text>';
    }
    // Staff panel
    svg += '<rect x="415" y="50" width="155" height="330" rx="8" fill="#fff" stroke="#1e88e5" stroke-width="2"/>';
    svg += '<text x="492" y="68" text-anchor="middle" font-size="10" font-weight="700" fill="#1565c0">Staff (14 posts)</text>';
    var staff = ['Medical Officer (1)','Nurse-Midwife (1)','Health Worker F (1)','Health Asst F (1)','Health Asst M (1)','Pharmacist (1)','Lab Technician (1)','Driver (1)','Class IV (4)'];
    for (var s = 0; s < staff.length; s++) {
      svg += '<text x="422" y="'+(86 + s * 22)+'" font-size="8" fill="#1a237e">• '+staff[s]+'</text>';
    }
    // Pulsing plus on building
    svg += '<text x="210" y="360" text-anchor="middle" font-size="28" fill="#1e88e5" opacity="0.18" font-weight="900">&#x2695;</text>';
    return '<div class="interactive-diagram chn-diagram">'
      + '<div class="diagram-title">&#127977; PHC — Layout, Staff &amp; Services</div>'
      + '<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+W+'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key"><strong>PHC</strong> is the cornerstone of rural health — first contact with a medically qualified doctor. Key services: OPD, maternal &amp; child health, family planning, immunisation, school health, nutrition, basic lab, emergency care. Upgraded PHCs provide 24×7 delivery. One PHC per 30,000 population (20,000 in hilly/tribal); 1 MO + 14 paramedical staff; 6 indoor beds.</div>'
      + '</div>';
  },

  // ─── CHN2-U9. HEALTHCARE ORGANISATION — animated pyramid ───────
  healthcareOrganisation: function () {
    var W = 560, H = 430, svg = '';
    svg += '<rect x="0" y="0" width="'+W+'" height="'+H+'" rx="12" fill="#fafafa"/>';
    svg += '<text x="'+W/2+'" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#263238">Healthcare Organisation in India — Administrative Hierarchy</text>';
    // Pyramid levels (top → bottom)
    var lvls = [
      { label: 'MoHFW + DGHS', sub: '(Central)', color: '#b71c1c', tw: 120, y: 38 },
      { label: 'State Health Dept / DHS', sub: '(State)', color: '#e53935', tw: 200, y: 88 },
      { label: 'District Health Officer (DMO)', sub: '(District)', color: '#fb8c00', tw: 260, y: 138 },
      { label: 'Community Health Centre (CHC)', sub: '1,20,000 pop', color: '#fdd835', tw: 330, y: 188 },
      { label: 'Primary Health Centre (PHC)', sub: '30,000 pop', color: '#43a047', tw: 400, y: 238 },
      { label: 'Sub-Centre (SC)', sub: '5,000 pop', color: '#1e88e5', tw: 470, y: 288 }
    ];
    var cx = W / 2;
    // Draw trapezoid layers
    for (var i = 0; i < lvls.length; i++) {
      var lv = lvls[i], h = 46;
      var top = lv.tw, bot = (lvls[i + 1] ? lvls[i + 1].tw : lv.tw + 60);
      var x1 = cx - top / 2, x2 = cx + top / 2;
      var x3 = cx + bot / 2, x4 = cx - bot / 2;
      svg += '<polygon points="'+x1+','+(lv.y)+' '+x2+','+(lv.y)+' '+x3+','+(lv.y+h)+' '+x4+','+(lv.y+h)+'" fill="'+lv.color+'" opacity="0.82">'
        + '<animate attributeName="opacity" values="0.75;0.92;0.75" dur="'+(2.5+i*0.3)+'s" repeatCount="indefinite"/>'
        + '</polygon>'
        + '<text x="'+cx+'" y="'+(lv.y+20)+'" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff">'+lv.label+'</text>'
        + '<text x="'+cx+'" y="'+(lv.y+34)+'" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.85)">'+lv.sub+'</text>';
    }
    // Base label
    svg += '<text x="'+cx+'" y="362" text-anchor="middle" font-size="8.5" fill="#546e7a">↑ Central authority &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Community-level ↓</text>';
    // Ministry label callout
    svg += '<text x="30" y="68" font-size="8" fill="#b71c1c" font-weight="700">Central</text>'
      + '<text x="30" y="118" font-size="8" fill="#e53935" font-weight="700">State</text>'
      + '<text x="30" y="168" font-size="8" fill="#fb8c00" font-weight="700">District</text>'
      + '<text x="30" y="218" font-size="8" fill="#f9a825" font-weight="700">Block</text>'
      + '<text x="30" y="268" font-size="8" fill="#43a047" font-weight="700">PHC</text>'
      + '<text x="30" y="318" font-size="8" fill="#1e88e5" font-weight="700">Village</text>';
    svg += '<text x="' + (W / 2) + '" y="400" text-anchor="middle" font-size="8" fill="#78909c">NHM integrates vertical programmes across all tiers under unified command.</text>';
    return '<div class="interactive-diagram chn-diagram">'
      + '<div class="diagram-title">&#127963; Animated: Healthcare Organisation — Administrative Pyramid</div>'
      + '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key"><strong>Central:</strong> Ministry of Health &amp; Family Welfare (MoHFW) + Directorate General of Health Services (DGHS) set policy. <strong>State:</strong> State Health Dept / DHS implement &amp; supervise. <strong>District:</strong> District Medical Officer ordinates district health. <strong>CHC:</strong> 1,20,000 population; First Referral Unit (FRU). <strong>PHC:</strong> 30,000 population; first doctor contact. <strong>SC:</strong> Village-level; ANM + MPHW.</div>'
      + '</div>';
  },

  // --- CHN2-U9. PANCHAYATI RAJ --- 3-tier pyramid
  panchayatiRaj: function () {
    var W = 540, H = 420, svg = '';
    svg += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="12" fill="#f1f8e9"/>';
    svg += '<text x="' + (W / 2) + '" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1b5e20">Panchayati Raj Institutions (PRI) — Three-Tier System</text>';
    svg += '<text x="' + (W / 2) + '" y="38" text-anchor="middle" font-size="9" fill="#388e3c">73rd Constitutional Amendment Act, 1992</text>';
    var tiers = [
      { label: 'Zila Parishad', level: 'District level', color: '#1b5e20', sub: 'Oversees all panchayats in district', y: 60, w: 160, h0: 'District planning', h1: 'Budget sanction', h2: 'Inter-block coordination' },
      { label: 'Panchayat Samiti', level: 'Block / Taluka level', color: '#388e3c', sub: 'Coordinates block-level development', y: 175, w: 280, h0: 'PHC oversight', h1: 'Health schemes', h2: 'ASHA coordination' },
      { label: 'Gram Panchayat', level: 'Village level', color: '#66bb6a', sub: 'Gram Sabha — all adult voters', y: 290, w: 400, h0: 'Village health register', h1: 'VHSNC support', h2: 'Nutrition &amp; Jan Aushadhi' }
    ];
    var cx = W / 2;
    svg += '<defs><marker id="pri-arr" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 Z" fill="#388e3c"/></marker></defs>';
    svg += '<line x1="' + cx + '" y1="152" x2="' + cx + '" y2="170" stroke="#388e3c" stroke-width="2" marker-end="url(#pri-arr)"/>';
    svg += '<line x1="' + cx + '" y1="267" x2="' + cx + '" y2="285" stroke="#388e3c" stroke-width="2" marker-end="url(#pri-arr)"/>';
    for (var i = 0; i < tiers.length; i++) {
      var t = tiers[i];
      svg += '<rect x="' + (cx - t.w / 2) + '" y="' + t.y + '" width="' + t.w + '" height="92" rx="10" fill="' + t.color + '" opacity="0.1" stroke="' + t.color + '" stroke-width="2.5"/>'
        + '<rect x="' + (cx - t.w / 2) + '" y="' + t.y + '" width="' + t.w + '" height="30" rx="10" fill="' + t.color + '" opacity="0.88"/>'
        + '<text x="' + cx + '" y="' + (t.y + 20) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">' + t.label + '</text>'
        + '<text x="' + cx + '" y="' + (t.y + 50) + '" text-anchor="middle" font-size="9" fill="' + t.color + '" font-weight="700">' + t.level + '</text>'
        + '<text x="' + cx + '" y="' + (t.y + 66) + '" text-anchor="middle" font-size="8.5" fill="#374151">' + t.sub + '</text>'
        + '<text x="' + (cx - t.w / 2 + 10) + '" y="' + (t.y + 84) + '" font-size="7.5" fill="#555">▶ ' + t.h0 + '  ▶ ' + t.h1 + '  ▶ ' + t.h2 + '</text>';
    }
    svg += '<rect x="' + (cx - 140) + '" y="398" width="280" height="18" rx="5" fill="#c8e6c9"/>'
      + '<text x="' + cx + '" y="411" text-anchor="middle" font-size="8.5" fill="#1b5e20" font-weight="600">Gram Sabha = all adult villagers — supreme body at village level</text>';
    return '<div class="interactive-diagram chn-diagram">'
      + '<div class="diagram-title">&#127968; Panchayati Raj — 3-Tier Local Self-Government</div>'
      + '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key"><strong>Gram Panchayat</strong> (village) → <strong>Panchayat Samiti</strong> (block) → <strong>Zila Parishad</strong> (district). Established by the 73rd CAA, 1992. Health role: Gram Panchayat chairs VHSNC and oversees ASHA &amp; Sub-Centre activities; Panchayat Samiti supervises PHC functioning; Zila Parishad coordinates district NHM programmes. <strong>Gram Sabha</strong> (all adult villagers) approves the Village Health, Sanitation &amp; Nutrition Plan (VHSNP).</div>'
      + '</div>';
  },

  // ─── CHN2-U10. ASHA ROLES — radial wheel with 9 functions ───────────────
  ashaRoles: function () {
    var W = 560, cx = 280, cy = 215, R = 148, n = 9;
    var roles = [
      { t: 'Maternal Health', ex: 'ANC · delivery escort · JSY', ic: '🤰', c: '#ec4899' },
      { t: 'Immunisation', ex: 'track 0–5 yrs · dropouts', ic: '💉', c: '#0ea5e9' },
      { t: 'Disease Surveillance', ex: 'TB · malaria · diarrhoea', ic: '🔍', c: '#ef4444' },
      { t: 'Drug Kit', ex: 'ORS · IFA · OCP · condoms', ic: '💊', c: '#f59e0b' },
      { t: 'Family Planning', ex: 'counsel · distribute · refer', ic: '👨‍👩‍👧', c: '#8b5cf6' },
      { t: 'Nutrition', ex: 'Vit A · breastfeeding · ICDS', ic: '🥗', c: '#16a34a' },
      { t: 'Sanitation', ex: 'ODF · safe water · hygiene', ic: '🚰', c: '#06b6d4' },
      { t: 'VHSNC', ex: 'Secretary · untied fund', ic: '🏘️', c: '#d97706' },
      { t: 'Record Keeping', ex: 'birth/death · ASHA diary', ic: '📋', c: '#6366f1' }
    ];
    var pts = [];
    for (var i = 0; i < n; i++) {
      var ang = (-90 + i * (360 / n)) * Math.PI / 180;
      pts.push([cx + R * Math.cos(ang), cy + R * Math.sin(ang)]);
    }
    var svg = '';
    // spokes + nodes
    for (var i = 0; i < n; i++) {
      var p = pts[i], r = roles[i], delay = (i * 0.3).toFixed(1);
      svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0].toFixed(0) + '" y2="' + p[1].toFixed(0) + '" stroke="' + r.c + '" stroke-width="2" stroke-opacity="0.35"/>';
      svg += '<circle cx="' + p[0].toFixed(0) + '" cy="' + p[1].toFixed(0) + '" r="36" fill="' + r.c + '" fill-opacity="0.13" stroke="' + r.c + '" stroke-width="2.5">'
           + '<animate attributeName="fill-opacity" values="0.08;0.28;0.08" dur="3s" begin="' + delay + 's" repeatCount="indefinite"/>'
           + '</circle>';
      svg += '<text x="' + p[0].toFixed(0) + '" y="' + (parseFloat(p[1]) - 5).toFixed(0) + '" text-anchor="middle" font-size="14">' + r.ic + '</text>';
      svg += '<text x="' + p[0].toFixed(0) + '" y="' + (parseFloat(p[1]) + 10).toFixed(0) + '" text-anchor="middle" fill="' + r.c + '" font-size="8.5" font-weight="700">' + r.t + '</text>';
      svg += '<text x="' + p[0].toFixed(0) + '" y="' + (parseFloat(p[1]) + 22).toFixed(0) + '" text-anchor="middle" fill="#64748b" font-size="6.5" font-family="monospace">' + r.ex + '</text>';
    }
    // centre hub
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="46" fill="#16a34a" fill-opacity="0.16" stroke="#16a34a" stroke-width="3">'
         + '<animate attributeName="r" values="43;49;43" dur="2.8s" repeatCount="indefinite"/>'
         + '</circle>';
    svg += '<text x="' + cx + '" y="' + (cy - 8) + '" text-anchor="middle" fill="#16a34a" font-size="13" font-weight="700">ASHA</text>';
    svg += '<text x="' + cx + '" y="' + (cy + 8) + '" text-anchor="middle" fill="#16a34a" font-size="8" font-weight="600">9 key roles</text>';
    svg += '<text x="' + cx + '" y="' + (cy + 22) + '" text-anchor="middle" fill="#16a34a" font-size="7">since 2005 · NRHM</text>';
    return '<div class="interactive-diagram nrs-diagram">'
      + '<div class="diagram-title">🌟 Animated: ASHA — 9 Roles of the Village Health Champion</div>'
      + '<svg viewBox="0 0 ' + W + ' 430" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key"><strong>ASHA (since 2005, NRHM)</strong> is selected from the same village — 1 per 1,000 population. She is the community&apos;s link to the health system. Her 9 core roles span the full RMNCH+A cycle plus sanitation, surveillance, and governance. She earns performance-based incentives (not a salary) — e.g. ₹600 per institutional delivery escorted under JSY.</div>'
      + '</div>';
  },

  // ─── CHN2-U10. HEALTH TEAM HIERARCHY — stepped org chart ────────────────
  healthTeamHierarchy: function () {
    var W = 560, levels = [
      { lbl: 'Medical Officer (MO)', sub: 'Head of PHC · diagnosis · team management', c: '#0f766e', y: 24, bw: 320 },
      { lbl: 'PHN / Health Visitor', sub: 'Field supervision · training · health camps', c: '#0ea5e9', y: 96, bw: 290 },
      { lbl: 'ANM (Female HW) + MPHW (Male HW)', sub: 'Sub-Centre · MCH/immunization / sanitation · vector control', c: '#8b5cf6', y: 168, bw: 400 },
      { lbl: 'ASHA', sub: 'Village volunteer · link worker · 1 per 1,000 pop', c: '#16a34a', y: 240, bw: 260 },
      { lbl: 'Community / Families', sub: 'Population served · 30,000 per PHC area', c: '#f59e0b', y: 312, bw: 480 }
    ];
    var bh = 52, svg = '';
    // connector lines between levels
    for (var i = 0; i < levels.length - 1; i++) {
      var cur = levels[i], nxt = levels[i + 1];
      svg += '<line x1="' + (W / 2) + '" y1="' + (cur.y + bh) + '" x2="' + (W / 2) + '" y2="' + nxt.y + '" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4">'
           + '<animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" begin="' + (i * 0.4).toFixed(1) + 's" repeatCount="indefinite"/>'
           + '</animate></line>';
    }
    // boxes
    for (var i = 0; i < levels.length; i++) {
      var lv = levels[i], x = (W - lv.bw) / 2, delay = (i * 0.35).toFixed(1);
      svg += '<rect x="' + x.toFixed(0) + '" y="' + lv.y + '" width="' + lv.bw + '" height="' + bh + '" rx="10" fill="' + lv.c + '" fill-opacity="0.14" stroke="' + lv.c + '" stroke-width="2">'
           + '<animate attributeName="fill-opacity" values="0.08;0.24;0.08" dur="3s" begin="' + delay + 's" repeatCount="indefinite"/>'
           + '</rect>';
      svg += '<text x="' + (W / 2) + '" y="' + (lv.y + 20) + '" text-anchor="middle" fill="' + lv.c + '" font-size="11" font-weight="700">' + lv.lbl + '</text>';
      svg += '<text x="' + (W / 2) + '" y="' + (lv.y + 37) + '" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="monospace">' + lv.sub + '</text>';
    }
    return '<div class="interactive-diagram nrs-diagram">'
      + '<div class="diagram-title">🏥 Animated: PHC Health Team — Hierarchy &amp; Roles</div>'
      + '<svg viewBox="0 0 ' + W + ' 380" width="100%" style="max-width:' + W + 'px;display:block;margin:0 auto;">' + svg + '</svg>'
      + '<div class="diagram-key"><strong>The PHC health team</strong> is a 5-level structure serving 30,000 people. The <strong style="color:#0f766e">MO</strong> leads, the <strong style="color:#0ea5e9">PHN/HV</strong> supervises field workers, the <strong style="color:#8b5cf6">ANM + MPHW</strong> provide front-line services at the Sub-Centre (5,000 pop), <strong style="color:#16a34a">ASHA</strong> is the village volunteer linking community to the system, and the <strong style="color:#f59e0b">Community</strong> is the ultimate beneficiary. Each level has distinct job responsibilities and reports upward.</div>'
      + '</div>';
  }

};


// --- ACTIVATION ---
// Find every [data-diagram] placeholder, replace with the live HTML.
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
      // Accessibility label on every SVG inside this diagram.
      var label = (box.querySelector('.diagram-title') || {}).textContent || name;
      eachSvg(box, function (s) {
        s.setAttribute('role', 'img');
        s.setAttribute('aria-label', label.replace(/\s+/g, ' ').trim());
      });
    }
  };

  // Pause while the tab is hidden; resume on return.
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
