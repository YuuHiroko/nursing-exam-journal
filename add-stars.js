#!/usr/bin/env node
/**
 * add-stars.js
 * Adds a `stars` field to every OBG question across all data-*.js files.
 *
 * Stars legend:
 *   3 = VVV IMPORTANT (Must Do First)
 *   2 = VV IMPORTANT
 *   1 = IMPORTANT
 */

const fs = require('fs');
const path = require('path');

// Priority map: questionId -> stars
const STARS_RAW = {

  // 3 STARS (VVV IMPORTANT)
  // Preeclampsia/PIH
  136: 3, 137: 3, 138: 3, 139: 3,
  // Labour
  42: 3, 43: 3, 44: 3, 45: 3, 46: 3, 59: 3,
  // True vs False Labour
  100: 3,
  // Physiology of Labour
  98: 3, 99: 3,
  // Cardinal Movements
  47: 3, 60: 3,
  // ANC
  28: 3, 110: 3,
  // Antenatal Assessment
  27: 3,
  // Leopold's Maneuvers
  39: 3,
  // APH - Placenta Previa
  123: 3, 124: 3, 125: 3,
  // APH - Abruptio Placentae
  126: 3, 129: 3,
  // Difference Placenta Previa vs Abruptio
  127: 3, 128: 3, 130: 3,
  // PPH
  211: 3, 212: 3, 213: 3, 214: 3, 215: 3, 216: 3,
  // Partograph
  48: 3,
  // Abortion
  111: 3, 112: 3, 113: 3, 114: 3, 115: 3, 116: 3, 117: 3, 118: 3,
  // MTP
  119: 3, 120: 3,
  // High-Risk Pregnancy
  108: 3, 109: 3, 31: 3,
  // GDM
  144: 3, 145: 3,
  // Episiotomy
  49: 3, 193: 3,
  // Family Planning
  78: 3, 79: 3, 80: 3, 81: 3, 82: 3, 83: 3, 84: 3,
  // Emergency Contraception
  85: 3,
  // Immediate Care of Newborn
  56: 3, 70: 3, 71: 3,
  // APGAR
  73: 3,
  // Exclusive Breastfeeding
  65: 3,

  // 2 STARS (VV IMPORTANT)
  // Anaemia
  131: 2, 132: 2, 133: 2, 134: 2, 135: 2,
  // Eclampsia
  140: 2, 141: 2,
  // Hyperemesis
  149: 2, 150: 2,
  // Vesicular Mole
  121: 2,
  // Rh Incompatibility
  153: 2, 154: 2, 155: 2, 156: 2, 157: 2,
  // Multiple Pregnancy
  167: 2, 168: 2, 169: 2,
  // PROM / Incompetent Os
  122: 2,
  // Preterm/Prematurity
  220: 2, 221: 2,
  // Prolonged Labour
  175: 2, 176: 2, 177: 2,
  // LSCS
  197: 2, 198: 2, 199: 2, 200: 2,
  // Induction of Labour
  54: 2, 194: 2,
  // Forceps
  196: 2,
  // Ventouse
  195: 2,
  // Fetal Development
  15: 2,
  // Fetal Circulation
  16: 2,
  // Placenta
  17: 2, 18: 2,
  // Umbilical Cord
  170: 2,
  // Amniotic Fluid
  19: 2, 20: 2, 21: 2,
  159: 2, 160: 2, 161: 2, 162: 2, 163: 2, 164: 2, 165: 2, 166: 2,
  // Puerperium
  61: 2, 210: 2,
  // Lactation
  103: 2, 104: 2,
  // Neonatal Resuscitation
  225: 2,
  // Low Birth Weight
  219: 2,
  // Postmaturity
  223: 2, 224: 2,
  // Birth Canal Injuries
  191: 2, 192: 2,
  // Oxytocin
  101: 2,
  // Mag Sulphate
  203: 2,
  // Methergine
  204: 2,
  // Anti-D
  158: 2,

  // 1 STAR (IMPORTANT)
  // Maternal Mortality
  1: 1, 2: 1, 3: 1, 4: 1,
  // Diet
  33: 1, 93: 1,
  // Physiological Changes
  23: 1, 24: 1, 25: 1, 26: 1, 35: 1,
  // Menstrual Cycle
  14: 1,
  // Fetal Skull
  37: 1, 75: 1,
  // USG/Investigations
  94: 1, 95: 1, 96: 1,
  // Roll Over Test
  142: 1,
  // Role of Nurse
  5: 1,
  // PNC
  68: 1, 62: 1, 63: 1, 64: 1,
  // KMC
  222: 1,
  // IUGR
  171: 1, 172: 1,
  // HIV in Pregnancy
  228: 1, 229: 1, 230: 1, 231: 1,
  // Surrogacy
  236: 1,
  // Bishop Score
  58: 1, 202: 1,
  // Infertility
  232: 1, 233: 1, 234: 1,
  // Uterine Prolapse
  237: 1,
  // Psychological Puerperium
  105: 1,
  // Puerperal Pyrexia
  206: 1, 207: 1, 208: 1,
  // Malpresentation / ECV
  178: 1, 179: 1, 180: 1,
  // Amniocentesis
  97: 1,
  // Antenatal visits
  110: 1,
};

// Resolve: higher star wins for duplicate keys
const FINAL_STARS = {};
for (const [id, s] of Object.entries(STARS_RAW)) {
  const n = Number(id);
  if (!FINAL_STARS[n] || FINAL_STARS[n] < s) {
    FINAL_STARS[n] = s;
  }
}

const FILES = [
  'data.js',
  'data-unit2.js',
  'data-unit3.js',
  'data-unit4.js',
  'data-unit5.js',
  'data-unit6.js',
  'data-unit7.js',
  'data-obg2.js',
];

let totalPatched = 0;

for (const file of FILES) {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.warn('  Warning: Skipping ' + file + ' (not found)');
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let patchedInFile = 0;

  // Remove any existing stars lines first (for idempotency)
  content = content.replace(/    stars: \d+,\n/g, '');

  // Insert stars: N, after each "    id: N," line
  content = content.replace(
    /( {4}id:\s*)(\d+)(,\n)/g,
    function(match, prefix, idStr, suffix) {
      const id = Number(idStr);
      const stars = FINAL_STARS[id];
      if (stars === undefined) return match;
      patchedInFile++;
      totalPatched++;
      return prefix + idStr + suffix + '    stars: ' + stars + ',\n';
    }
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('OK ' + file + ': ' + patchedInFile + ' questions starred');
}

console.log('\nDone! Total questions starred: ' + totalPatched);
