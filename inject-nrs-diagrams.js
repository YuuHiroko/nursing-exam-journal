const fs = require('fs');

// ─── DIAGRAM HTML HELPERS ────────────────────────────────────────────────────

const evidencePyramid = `
<div class="evidence-pyramid">
  <div class="pyramid-title">📊 Levels of Evidence Pyramid — EBP</div>
  <div class="pyramid-level pyramid-level-1">Systematic Reviews &amp; Meta-analyses<div class="pyramid-label">Highest evidence — synthesizes all RCTs</div></div>
  <div class="pyramid-level pyramid-level-2">Randomized Controlled Trials (RCTs)<div class="pyramid-label">Gold standard for experimental research</div></div>
  <div class="pyramid-level pyramid-level-3">Cohort &amp; Case-Control Studies<div class="pyramid-label">Observational — follows groups over time</div></div>
  <div class="pyramid-level pyramid-level-4">Cross-sectional &amp; Survey Studies<div class="pyramid-label">Single point-in-time data collection</div></div>
  <div class="pyramid-level pyramid-level-5">Case Reports &amp; Case Series<div class="pyramid-label">Clinical observations, no control group</div></div>
  <div class="pyramid-level pyramid-level-6">Expert Opinion &amp; Editorials<div class="pyramid-label">Lowest level — personal expertise only</div></div>
  <div class="pyramid-arrows">
    <div class="pyramid-arrow-label">⬆ Stronger evidence</div>
    <div class="pyramid-arrow-label">⬆ Higher quality</div>
  </div>
</div>`;

const hypothesisTree = `
<div class="tree-diagram">
  <div class="tree-title">🌳 Types of Hypothesis — Classification Tree</div>
  <div class="tree-root">
    <div class="tree-node root">Hypothesis</div>
    <div class="tree-connector"></div>
    <div style="position:relative; width:100%;">
      <div class="tree-branches">
        <div class="tree-branch-wrap">
          <div class="tree-branch-connector"></div>
          <div class="tree-node branch">Research Hypothesis (H₁)</div>
          <div class="tree-branch-connector"></div>
          <div class="tree-sub-branches">
            <div class="tree-branch-wrap">
              <div class="tree-branch-connector"></div>
              <div class="tree-node leaf-blue">Directional<br><small>→ predicts direction</small></div>
            </div>
            <div class="tree-branch-wrap">
              <div class="tree-branch-connector"></div>
              <div class="tree-node leaf-green">Non-Directional<br><small>→ predicts difference</small></div>
            </div>
          </div>
        </div>
        <div class="tree-branch-wrap">
          <div class="tree-branch-connector"></div>
          <div class="tree-node branch">Null Hypothesis (H₀)</div>
          <div class="tree-branch-connector"></div>
          <div class="tree-sub-branches">
            <div class="tree-branch-wrap">
              <div class="tree-branch-connector"></div>
              <div class="tree-node leaf-red">Statistical Null<br><small>→ no effect</small></div>
            </div>
            <div class="tree-branch-wrap">
              <div class="tree-branch-connector"></div>
              <div class="tree-node leaf-amber">Nil Hypothesis<br><small>→ no relationship</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

const variableDiagram = `
<div class="variable-diagram">
  <div class="var-title">🔗 Variable Relationship Diagram</div>
  <div class="var-main-row">
    <div class="var-box iv">
      <div class="var-box-label">Independent Variable</div>
      <div class="var-box-name">Cause / Input</div>
      <div class="var-box-example">e.g., Foot massage, Teaching programme</div>
    </div>
    <div class="var-arrow">→</div>
    <div class="var-box dv">
      <div class="var-box-label">Dependent Variable</div>
      <div class="var-box-name">Effect / Output</div>
      <div class="var-box-example">e.g., Pain score, Knowledge level</div>
    </div>
  </div>
  <div class="var-confounders-label">↕ Confounding / Extraneous Variables (may interfere):</div>
  <div class="var-confounders">
    <div class="var-box cv" style="min-width:100px; padding:0.5rem;">
      <div class="var-box-label">Confounding</div>
      <div class="var-box-name" style="font-size:0.76rem">Age, Gender</div>
    </div>
    <div class="var-box ev" style="min-width:100px; padding:0.5rem;">
      <div class="var-box-label">Extraneous</div>
      <div class="var-box-name" style="font-size:0.76rem">Environment, Stress</div>
    </div>
  </div>
</div>`;

const researchProcessSteps = `
<div class="process-steps">
  <div class="ps-title">🔬 Steps in the Research Process (Scientific Method)</div>
  <div class="ps-step"><div class="ps-num">1</div><div class="ps-content"><strong>Identify &amp; Define the Problem</strong><span>Select a researchable, feasible, relevant nursing problem. Write a clear problem statement.</span></div><div class="ps-icon">🔍</div></div>
  <div class="ps-step"><div class="ps-num">2</div><div class="ps-content"><strong>Review of Literature (ROL)</strong><span>Search existing studies, journals, textbooks. Identify what is already known and the gap.</span></div><div class="ps-icon">📚</div></div>
  <div class="ps-step"><div class="ps-num">3</div><div class="ps-content"><strong>Formulate Aims, Objectives &amp; Hypothesis</strong><span>State what the study will achieve and predict the expected outcome (hypothesis).</span></div><div class="ps-icon">🎯</div></div>
  <div class="ps-step"><div class="ps-num">4</div><div class="ps-content"><strong>Select Research Design</strong><span>Experimental / Quasi-experimental / Descriptive / Correlational, etc.</span></div><div class="ps-icon">📐</div></div>
  <div class="ps-step"><div class="ps-num">5</div><div class="ps-content"><strong>Select Sample &amp; Setting</strong><span>Define population, choose sampling method (random, purposive), calculate sample size.</span></div><div class="ps-icon">👥</div></div>
  <div class="ps-step"><div class="ps-num">6</div><div class="ps-content"><strong>Develop Data Collection Tool</strong><span>Structured interview, questionnaire, observation checklist, physiological measures.</span></div><div class="ps-icon">📋</div></div>
  <div class="ps-step"><div class="ps-num">7</div><div class="ps-content"><strong>Collect Data</strong><span>Carry out the study — implement intervention (if experimental), collect measurements.</span></div><div class="ps-icon">📊</div></div>
  <div class="ps-step"><div class="ps-num">8</div><div class="ps-content"><strong>Analyze Data</strong><span>Apply statistical tests (mean, SD, t-test, chi-square) or qualitative analysis.</span></div><div class="ps-icon">🔢</div></div>
  <div class="ps-step"><div class="ps-num">9</div><div class="ps-content"><strong>Interpret Results &amp; Draw Conclusions</strong><span>Accept/reject hypothesis, compare with previous studies, state limitations.</span></div><div class="ps-icon">💡</div></div>
  <div class="ps-step"><div class="ps-num">10</div><div class="ps-content"><strong>Communicate &amp; Utilize Findings</strong><span>Publish in journals, present at conferences, apply in nursing practice (EBP).</span></div><div class="ps-icon">📢</div></div>
</div>`;

const ebpProcessSteps = `
<div class="process-steps">
  <div class="ps-title">🏥 EBP Process — Five Steps (5 A's)</div>
  <div class="ps-step"><div class="ps-num">1</div><div class="ps-content"><strong>ASK — Formulate a Clinical Question</strong><span>Use PICO format: <strong>P</strong>atient, <strong>I</strong>ntervention, <strong>C</strong>omparison, <strong>O</strong>utcome. e.g., "Does foot massage reduce post-op pain in adult patients vs no massage?"</span></div><div class="ps-icon">❓</div></div>
  <div class="ps-step"><div class="ps-num">2</div><div class="ps-content"><strong>ACQUIRE — Search for Best Evidence</strong><span>Search PubMed, CINAHL, Cochrane Library, MEDLINE using keywords from your PICO question.</span></div><div class="ps-icon">🔍</div></div>
  <div class="ps-step"><div class="ps-num">3</div><div class="ps-content"><strong>APPRAISE — Critically Evaluate the Evidence</strong><span>Check validity, reliability, and relevance of studies. Use tools like CASP checklist.</span></div><div class="ps-icon">⚖️</div></div>
  <div class="ps-step"><div class="ps-num">4</div><div class="ps-content"><strong>APPLY — Integrate Evidence into Practice</strong><span>Combine best evidence + clinical expertise + patient preferences. Implement change.</span></div><div class="ps-icon">⚕️</div></div>
  <div class="ps-step"><div class="ps-num">5</div><div class="ps-content"><strong>ASSESS — Evaluate Outcomes</strong><span>Measure if the practice change improved patient outcomes. Re-audit if needed.</span></div><div class="ps-icon">📈</div></div>
</div>`;

const conceptualVsTheoreticalFlip = `
<div class="flip-card-pair">
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="fc-icon">🗺️</div>
        <div class="fc-term">Conceptual Framework</div>
        <div class="fc-hint">(hover to reveal definition)</div>
      </div>
      <div class="flip-card-back">
        <div class="fc-def">Built by the <strong>researcher</strong> using multiple concepts from different sources combined with their own logic. NOT borrowed from any single theory.</div>
        <div class="fc-example">Example: Researcher combines Roy's Adaptation + Orem's Self-Care concepts to create a new framework</div>
      </div>
    </div>
  </div>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="fc-icon">📖</div>
        <div class="fc-term">Theoretical Framework</div>
        <div class="fc-hint">(hover to reveal definition)</div>
      </div>
      <div class="flip-card-back">
        <div class="fc-def">Borrowed <strong>directly from ONE existing established theory</strong> — applied as-is to the research study without modification.</div>
        <div class="fc-example">Example: Using Orem's Self-Care Deficit Theory as-is to guide a study on self-care in diabetic patients</div>
      </div>
    </div>
  </div>
</div>`;

const limitationVsDelimitation = `
<div class="comparison-split">
  <div class="vs-badge">⚠️ Limitation <span>VS</span> Delimitation — Don't Confuse!</div>
  <div class="comp-col left">
    <div class="comp-col-title">⛔ Limitation</div>
    <div class="comp-item"><strong>Meaning:</strong> Weaknesses the researcher CANNOT control — discovered after or during study.</div>
    <div class="comp-item"><strong>Who decides:</strong> Happens naturally, not by researcher's choice.</div>
    <div class="comp-item"><strong>Effect:</strong> Reduces generalizability / validity of findings.</div>
    <div class="comp-item"><strong>Examples:</strong> Hawthorne effect, small sample size, biased self-reporting by patients.</div>
    <div class="comp-item"><strong>Mnemonic:</strong> L for "Left behind" — things the researcher couldn't fix.</div>
  </div>
  <div class="comp-col right">
    <div class="comp-col-title">✅ Delimitation</div>
    <div class="comp-item"><strong>Meaning:</strong> Boundaries the researcher INTENTIONALLY sets — decided before the study.</div>
    <div class="comp-item"><strong>Who decides:</strong> The researcher chooses these to keep the study focused.</div>
    <div class="comp-item"><strong>Effect:</strong> Narrows the scope of the study (intentionally).</div>
    <div class="comp-item"><strong>Examples:</strong> Only studying female patients, only age 20–40, only one hospital.</div>
    <div class="comp-item"><strong>Mnemonic:</strong> D for "Decided" — researcher draws a boundary deliberately.</div>
  </div>
</div>`;

const literatureSourceGrid = `
<div class="source-grid">
  <div class="source-card primary">
    <div class="sc-icon">📰</div>
    <div class="sc-type">Primary</div>
    <div class="sc-name">Research Journals</div>
    <div class="sc-eg">IJMR, JAN, Nursing Research</div>
  </div>
  <div class="source-card primary">
    <div class="sc-icon">📄</div>
    <div class="sc-type">Primary</div>
    <div class="sc-name">Dissertations &amp; Theses</div>
    <div class="sc-eg">MSc / PhD nursing theses</div>
  </div>
  <div class="source-card primary">
    <div class="sc-icon">📊</div>
    <div class="sc-type">Primary</div>
    <div class="sc-name">Govt. &amp; WHO Reports</div>
    <div class="sc-eg">NFHS, WHO Health Stats</div>
  </div>
  <div class="source-card secondary">
    <div class="sc-icon">📚</div>
    <div class="sc-type">Secondary</div>
    <div class="sc-name">Textbooks</div>
    <div class="sc-eg">Polit &amp; Beck, Burns &amp; Grove</div>
  </div>
  <div class="source-card secondary">
    <div class="sc-icon">📋</div>
    <div class="sc-type">Secondary</div>
    <div class="sc-name">Review Articles</div>
    <div class="sc-eg">Systematic reviews in journals</div>
  </div>
  <div class="source-card tertiary">
    <div class="sc-icon">🖥️</div>
    <div class="sc-type">Tertiary</div>
    <div class="sc-name">Online Databases</div>
    <div class="sc-eg">PubMed, CINAHL, Cochrane</div>
  </div>
  <div class="source-card tertiary">
    <div class="sc-icon">📰</div>
    <div class="sc-type">Tertiary</div>
    <div class="sc-name">Encyclopedias &amp; Index</div>
    <div class="sc-eg">Cumulative Index of Nursing</div>
  </div>
  <div class="source-card tertiary">
    <div class="sc-icon">🗄️</div>
    <div class="sc-type">Tertiary</div>
    <div class="sc-name">Library Catalogue</div>
    <div class="sc-eg">DELNET, INFLIBNET, IndMED</div>
  </div>
</div>`;

const literatureReviewSteps = `
<div class="cascade-flowchart">
  <div class="cfc-title">📚 Steps in Review of Literature</div>
  <div class="cfc-step"><div class="cfc-num">1</div><div class="cfc-text"><strong>Identify the topic</strong> — define the research problem clearly before searching</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">2</div><div class="cfc-text"><strong>Select databases &amp; sources</strong> — PubMed, CINAHL, Cochrane, Google Scholar, DELNET</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">3</div><div class="cfc-text"><strong>Search using keywords &amp; MeSH terms</strong> — use Boolean operators (AND, OR, NOT)</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">4</div><div class="cfc-text"><strong>Screen titles &amp; abstracts</strong> — apply inclusion / exclusion criteria</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">5</div><div class="cfc-text"><strong>Retrieve full-text articles</strong> — read complete papers that pass screening</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">6</div><div class="cfc-text"><strong>Critically appraise</strong> — evaluate validity, reliability, and relevance</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">7</div><div class="cfc-text"><strong>Synthesize &amp; summarize</strong> — group by themes, identify gaps</div></div>
  <div class="cfc-arrow-down"></div>
  <div class="cfc-step"><div class="cfc-num">8</div><div class="cfc-text"><strong>Write the ROL section</strong> — organize logically, cite all sources properly (APA format)</div></div>
</div>`;

const samplingTree = `
<div class="tree-diagram">
  <div class="tree-title">🌳 Types of Sampling — Classification</div>
  <div class="tree-root">
    <div class="tree-node root">Sampling Methods</div>
    <div class="tree-connector"></div>
    <div style="position:relative; width:100%;">
      <div class="tree-branches">
        <div class="tree-branch-wrap">
          <div class="tree-branch-connector"></div>
          <div class="tree-node branch">Probability Sampling</div>
          <div class="tree-branch-connector"></div>
          <div class="tree-sub-branches">
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-green">Simple Random</div></div>
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-green">Systematic</div></div>
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-green">Stratified</div></div>
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-green">Cluster</div></div>
          </div>
        </div>
        <div class="tree-branch-wrap">
          <div class="tree-branch-connector"></div>
          <div class="tree-node branch">Non-Probability Sampling</div>
          <div class="tree-branch-connector"></div>
          <div class="tree-sub-branches">
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-amber">Purposive</div></div>
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-amber">Convenience</div></div>
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-amber">Snowball</div></div>
            <div class="tree-branch-wrap"><div class="tree-branch-connector"></div><div class="tree-node leaf-amber">Quota</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// ─── INJECTION LOGIC ─────────────────────────────────────────────────────────

const files = ['data-nrs-unit1.js', 'data-nrs-unit2.js', 'data-nrs-unit3.js'];

// Map: question ID → diagrams to PREPEND to the answer (before existing content)
// Format: [filename, questionId, diagramsHtml]
const injections = [
  // Unit 1
  ['data-nrs-unit1.js', 1,  conceptualVsTheoreticalFlip],
  ['data-nrs-unit1.js', 8,  researchProcessSteps],
  ['data-nrs-unit1.js', 10, researchProcessSteps],
  ['data-nrs-unit1.js', 11, researchProcessSteps],
  ['data-nrs-unit1.js', 16, evidencePyramid],
  ['data-nrs-unit1.js', 17, ebpProcessSteps],
  ['data-nrs-unit1.js', 18, ebpProcessSteps],
  ['data-nrs-unit1.js', 13, limitationVsDelimitation],
  ['data-nrs-unit1.js', 22, limitationVsDelimitation],
  // Unit 2
  ['data-nrs-unit2.js', 5,  hypothesisTree],
  ['data-nrs-unit2.js', 7,  hypothesisTree],
  ['data-nrs-unit2.js', 8,  hypothesisTree],
  ['data-nrs-unit2.js', 11, hypothesisTree],
  ['data-nrs-unit2.js', 12, variableDiagram],
  ['data-nrs-unit2.js', 17, variableDiagram],
  ['data-nrs-unit2.js', 16, limitationVsDelimitation],
  // Unit 3
  ['data-nrs-unit3.js', 1,  literatureSourceGrid],
  ['data-nrs-unit3.js', 2,  literatureSourceGrid],
  ['data-nrs-unit3.js', 6,  literatureSourceGrid],
  ['data-nrs-unit3.js', 7,  literatureSourceGrid],
  ['data-nrs-unit3.js', 5,  literatureReviewSteps],
  ['data-nrs-unit3.js', 8,  literatureReviewSteps],
];

// Also inject sampling tree into Unit 1 Q10 (quantitative research steps mentions sampling)
// and into any question about sampling if it exists

let totalInjected = 0;

injections.forEach(([filename, qId, diagramHtml]) => {
  if (!require('fs').existsSync(filename)) return;
  
  let content = fs.readFileSync(filename, 'utf8');
  const idPattern = `id: ${qId},`;
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) {
    console.log(`[SKIP] ${filename} Q${qId}: id pattern not found`);
    return;
  }
  
  // Find the answer backtick opening
  const afterId = content.substring(idIdx);
  const answerStart = afterId.indexOf('answer: `');
  if (answerStart === -1) {
    console.log(`[SKIP] ${filename} Q${qId}: answer template literal not found`);
    return;
  }
  
  // Check if diagram already injected (avoid duplicates)
  const snippetCheck = diagramHtml.substring(10, 50);
  if (afterId.substring(answerStart, answerStart + 2000).includes(snippetCheck)) {
    console.log(`[SKIP] ${filename} Q${qId}: diagram already present`);
    return;
  }
  
  // Insert diagram right after the opening backtick of the answer
  const insertPos = idIdx + answerStart + 'answer: `'.length;
  content = content.substring(0, insertPos) + '\n' + diagramHtml + '\n' + content.substring(insertPos);
  
  fs.writeFileSync(filename, content, 'utf8');
  totalInjected++;
  console.log(`[INJECTED] ${filename} Q${qId}`);
});

console.log(`\n✅ Total diagrams injected: ${totalInjected}`);
