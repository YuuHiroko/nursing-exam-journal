const fs = require('fs');

const diagramMap = [
  // Unit 2 - Fertilization
  { id: 15, file: 'data-unit2.js', diagram: 'fertilizationProcess' },

  // Unit 4 - Cervical dilation
  { id: 43, file: 'data-unit4.js', diagram: 'cervicalDilation' },
  { id: 45, file: 'data-unit4.js', diagram: 'cervicalDilation' },

  // Unit 5 - Lochia + Involution
  { id: 62, file: 'data-unit5.js', diagram: 'uterineInvolution' },
  { id: 63, file: 'data-unit5.js', diagram: 'lochiaTimeline' },
  { id: 64, file: 'data-unit5.js', diagram: 'lochiaTimeline' },
];

function injectDiagram(content, id, diagramName) {
  var tag = '\n<div data-diagram="' + diagramName + '"></div>\n';
  var idPattern = 'id: ' + id + ',';
  var idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.log('  [SKIP] id: ' + id + ' not found'); return content; }

  var afterId = content.substring(idIdx);
  if (afterId.includes('data-diagram="' + diagramName + '"')) {
    console.log('  [SKIP] id: ' + id + ' — already has ' + diagramName);
    return content;
  }

  // Insert before remember-box or keyword-box
  var rememberIdx = afterId.indexOf('<div class="remember-box">');
  var keywordIdx = afterId.indexOf('<div class="keyword-box">');
  var insertionPoint = rememberIdx !== -1 ? rememberIdx : keywordIdx;
  if (insertionPoint === -1) { console.log('  [SKIP] id: ' + id + ' — no insertion point'); return content; }

  var beforeInsert = afterId.substring(0, insertionPoint);
  var lastClose = beforeInsert.lastIndexOf('</div>');
  if (lastClose === -1) { console.log('  [SKIP] id: ' + id + ' — no </div>'); return content; }

  var globalPos = idIdx + lastClose + 6;
  content = content.substring(0, globalPos) + tag + content.substring(globalPos);
  console.log('  [OK]   id: ' + id + ' ← ' + diagramName);
  return content;
}

var byFile = {};
diagramMap.forEach(function(e) {
  if (!byFile[e.file]) byFile[e.file] = [];
  byFile[e.file].push(e);
});

var total = 0;
for (var filename in byFile) {
  var content = fs.readFileSync(filename, 'utf8');
  var entries = byFile[filename];
  var injected = 0;
  for (var i = 0; i < entries.length; i++) {
    var prev = content.length;
    content = injectDiagram(content, entries[i].id, entries[i].diagram);
    if (content.length !== prev) { injected++; total++; }
  }
  if (injected > 0) {
    fs.writeFileSync(filename, content, 'utf8');
    console.log('  ✓ ' + filename + ': ' + injected + ' diagram(s) injected\n');
  }
}

console.log('\nDone! Total new diagrams injected: ' + total);

// Verify
for (var f in byFile) {
  try {
    global.window = global.window || {};
    delete require.cache[require.resolve('./' + f)];
    require('./' + f);
    console.log('  ✓ ' + f + ' loads OK');
  } catch (err) {
    console.error('  ✗ ' + f + ' BROKEN: ' + err.message);
  }
}
