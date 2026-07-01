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
  }

};


// ─── ACTIVATION ────────────────────────────────────────────────
// Find every [data-diagram] placeholder, replace with the live HTML,
// and let the browser run animations immediately. No pausing on inject —
// every previous attempt to start-paused caused race conditions in the
// modal context where IntersectionObserver fires before layout settles.
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
      // No pausing on inject — CSS @media (prefers-reduced-motion) scoped to
      // non-diagram elements handles the reduce-motion case for the rest of the page.
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
