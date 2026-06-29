// ============================================================================
// PDF EXPORT SYSTEM — Nursing Exam Journal
// ============================================================================
// Modular PDF generation system with Material Design 3 UI
// Supports: offline, searchable PDFs with smart pagination
// ============================================================================

const PDFExportSystem = (() => {
  'use strict';

  // Configuration
  const CONFIG = {
    appName: 'Nursing Exam Journal',
    appVersion: '2.0',
    pageFormats: { A4: [210, 297], A3: [297, 420], Letter: [215.9, 279.4] },
    defaultFormat: 'A4',
    themes: ['full-color', 'print-friendly', 'high-contrast'],
    defaultTheme: 'print-friendly'
  };

  // ────────────────────────────────────────────────────────────────────────
  // 1. PDFManager — Core PDF generation
  // ────────────────────────────────────────────────────────────────────────
  
  const PDFManager = (() => {
    let currentPDF = null;
    let progress = { step: 0, total: 6, message: '' };

    function updateProgress(step, message) {
      progress = { step, total: 6, message };
      window.dispatchEvent(new CustomEvent('pdf-progress', { detail: progress }));
    }

    async function generatePDF(options) {
      try {
        updateProgress(1, 'Preparing PDF...');
        
        const pages = [];
        
        // Step 1: Cover page
        updateProgress(2, 'Generating cover page...');
        pages.push(CoverPageGenerator.generate(options));
        
        // Step 2: Table of contents
        updateProgress(3, 'Creating table of contents...');
        pages.push(TableOfContentsGenerator.generate(options.questions));
        
        // Step 3: Collect questions
        updateProgress(4, 'Collecting questions...');
        const questionPages = await collectQuestionPages(options.questions, options.theme);
        pages.push(...questionPages);
        
        // Step 4: Render to HTML
        updateProgress(5, 'Rendering pages...');
        const htmlContent = LayoutEngine.renderPages(pages, options);
        
        // Step 5: Generate PDF (using native print-to-PDF)
        updateProgress(6, 'Finalizing PDF...');
        downloadPDF(htmlContent, options);
        
        window.dispatchEvent(new CustomEvent('pdf-complete'));
      } catch (e) {
        console.error('[PDF] Generation failed:', e);
        throw e;
      }
    }

    function collectQuestionPages(questions, theme) {
      return questions.map(q => ({
        type: 'question',
        data: q,
        theme: theme
      }));
    }

    function downloadPDF(htmlContent, options) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for images to load, then trigger print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }

    return {
      canExport: () => true, // Future: check permissions
      generatePDF,
      updateProgress: (step, msg) => updateProgress(step, msg)
    };
  })();

  // ────────────────────────────────────────────────────────────────────────
  // 2. LayoutEngine — Page layout and formatting
  // ────────────────────────────────────────────────────────────────────────
  
  const LayoutEngine = (() => {
    function renderPages(pages, options) {
      const css = getPageStyles(options.theme);
      let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${CONFIG.appName}</title>
          <style>${css}</style>
        </head>
        <body class="pdf-export theme-${options.theme}">
      `;

      // Add pages
      pages.forEach((page, idx) => {
        if (page.type === 'cover') {
          html += renderCoverPage(page.data);
        } else if (page.type === 'toc') {
          html += renderTOC(page.data);
        } else if (page.type === 'question') {
          html += renderQuestionPage(page.data, options);
        }
      });

      html += `</body></html>`;
      return html;
    }

    function renderCoverPage(data) {
      return `
        <div class="page page-cover">
          <div class="cover-content">
            <h1 class="cover-title">${CONFIG.appName}</h1>
            <p class="cover-subtitle">Study Materials</p>
            <div class="cover-meta">
              <p><strong>Subject:</strong> ${data.subject || 'Midwifery & Obstetrical Nursing'}</p>
              <p><strong>Total Questions:</strong> ${data.totalQuestions || 0}</p>
              <p><strong>Export Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Version:</strong> ${CONFIG.appVersion}</p>
            </div>
          </div>
        </div>
      `;
    }

    function renderTOC(items) {
      let html = `<div class="page page-toc"><h2>Table of Contents</h2><ol class="toc-list">`;
      items.forEach(item => {
        html += `<li><a href="#q${item.id}">${item.question.substring(0, 60)}...</a></li>`;
      });
      html += `</ol></div>`;
      return html;
    }

    function renderQuestionPage(question, options) {
      const stripHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
      };

      return `
        <div class="page page-question" id="q${question.id}">
          <div class="question-header">
            <span class="q-number">Q${question.id}</span>
            <span class="q-marks">${question.marks}M</span>
            <span class="q-unit">Unit ${question.unit}</span>
          </div>
          
          <h3 class="question-title">${question.question}</h3>
          
          <div class="question-answer">
            ${question.answer || '<p>No answer provided</p>'}
          </div>
          
          <div class="page-footer">
            <span class="footer-unit">Unit ${question.unit}</span>
            <span class="footer-page">Page ${question.id}</span>
          </div>
        </div>
      `;
    }

    function getPageStyles(theme) {
      const baseStyles = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; }
        .page { page-break-after: always; padding: 40px; min-height: 297mm; }
        
        .page-cover { display: flex; align-items: center; justify-content: center; text-align: center; background: #f5f5f5; }
        .cover-content { max-width: 400px; }
        .cover-title { font-size: 48px; font-weight: bold; margin-bottom: 20px; }
        .cover-subtitle { font-size: 24px; color: #666; margin-bottom: 40px; }
        .cover-meta { text-align: left; font-size: 14px; }
        .cover-meta p { margin: 10px 0; }
        
        .page-toc h2 { margin-bottom: 20px; }
        .toc-list { margin-left: 30px; }
        .toc-list li { margin: 8px 0; }
        .toc-list a { text-decoration: none; color: #0066cc; }
        
        .question-header { display: flex; gap: 15px; margin-bottom: 15px; font-size: 12px; }
        .q-number { font-weight: bold; background: #e0e0e0; padding: 3px 8px; border-radius: 3px; }
        .q-marks { background: #fff3cd; padding: 3px 8px; border-radius: 3px; }
        .q-unit { color: #666; }
        
        .question-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; line-height: 1.4; }
        .question-answer { font-size: 13px; line-height: 1.7; }
        .question-answer p { margin-bottom: 10px; }
        .question-answer h3 { font-size: 14px; font-weight: bold; margin-top: 12px; margin-bottom: 8px; }
        .question-answer ol, .question-answer ul { margin-left: 20px; margin-bottom: 10px; }
        .question-answer li { margin-bottom: 5px; }
        
        .page-footer { border-top: 1px solid #ddd; padding-top: 10px; margin-top: 20px; font-size: 11px; color: #999; display: flex; justify-content: space-between; }
        
        @media print {
          body { margin: 0; padding: 0; }
          .page { page-break-after: always; padding: 30px; }
        }
      `;

      const themeStyles = {
        'full-color': `
          .page { background: white; }
          .question-header { background: #e3f2fd; }
          .q-marks { background: #fff9c4; }
        `,
        'print-friendly': `
          .page { background: white; }
          .question-header { background: #f5f5f5; }
          .question-title { color: #000; }
          img { filter: grayscale(100%); }
        `,
        'high-contrast': `
          .page { background: white; }
          .question-title { color: #000; font-weight: bold; }
          .question-answer { color: #000; }
          .page-footer { color: #333; }
        `
      };

      return baseStyles + (themeStyles[theme] || themeStyles['print-friendly']);
    }

    return {
      renderPages,
      getPageStyles
    };
  })();

  // ────────────────────────────────────────────────────────────────────────
  // 3. CoverPageGenerator — Generate professional cover
  // ────────────────────────────────────────────────────────────────────────
  
  const CoverPageGenerator = (() => {
    function generate(options) {
      return {
        type: 'cover',
        data: {
          subject: options.subject || 'Midwifery & Obstetrical Nursing',
          totalQuestions: options.questions.length,
          exportDate: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        }
      };
    }

    return { generate };
  })();

  // ────────────────────────────────────────────────────────────────────────
  // 4. TableOfContentsGenerator — Generate clickable TOC
  // ────────────────────────────────────────────────────────────────────────
  
  const TableOfContentsGenerator = (() => {
    function generate(questions) {
      return {
        type: 'toc',
        data: questions.map(q => ({
          id: q.id,
          question: q.question,
          marks: q.marks,
          unit: q.unit
        }))
      };
    }

    return { generate };
  })();

  // ────────────────────────────────────────────────────────────────────────
  // 5. ExportDialog — Material Design 3 export UI
  // ────────────────────────────────────────────────────────────────────────
  
  const ExportDialog = (() => {
    let dialogEl = null;
    let selectedQuestions = [];

    function createDialog(questions, currentQuestion) {
      const html = `
        <md-dialog id="pdf-export-dialog" class="pdf-dialog">
          <div slot="headline">Export PDF</div>
          
          <form id="pdf-form" slot="content" class="pdf-form">
            <div class="form-group">
              <label><strong>Subject:</strong></label>
              <p>Midwifery & Obstetrical Nursing II</p>
            </div>
            
            <div class="form-group">
              <label><strong>Export Options:</strong></label>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="export-type" value="current-answer" />
                  Current Answer
                </label>
                <label class="radio-option">
                  <input type="radio" name="export-type" value="current-unit" />
                  Current Unit
                </label>
                <label class="radio-option">
                  <input type="radio" name="export-type" value="entire-subject" checked />
                  Entire Subject
                </label>
                <label class="radio-option">
                  <input type="radio" name="export-type" value="bookmarked" />
                  Bookmarked Questions
                </label>
                <label class="radio-option">
                  <input type="radio" name="export-type" value="completed" />
                  Completed Questions
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label><strong>Include:</strong></label>
              <div class="checkbox-group">
                <label class="checkbox-option">
                  <input type="checkbox" name="include-toc" checked />
                  Table of Contents
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="include-cover" checked />
                  Cover Page
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="include-diagrams" checked />
                  Diagrams
                </label>
                <label class="checkbox-option">
                  <input type="checkbox" name="include-images" checked />
                  Images
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label><strong>Theme:</strong></label>
              <select name="theme" id="pdf-theme">
                <option value="full-color">Full Color</option>
                <option value="print-friendly" selected>Print Friendly</option>
                <option value="high-contrast">High Contrast</option>
              </select>
            </div>
            
            <div class="form-group">
              <label><strong>Paper Size:</strong></label>
              <select name="page-format" id="pdf-format">
                <option value="A4" selected>A4</option>
                <option value="A3">A3</option>
                <option value="Letter">Letter</option>
              </select>
            </div>
          </form>
          
          <div slot="actions">
            <md-text-button form="pdf-form" id="pdf-cancel">Cancel</md-text-button>
            <md-filled-button form="pdf-form" id="pdf-export">Export PDF</md-filled-button>
          </div>
        </md-dialog>
      `;

      const container = document.createElement('div');
      container.innerHTML = html;
      dialogEl = container.querySelector('#pdf-export-dialog');
      
      setupEventListeners(questions, currentQuestion);
      return dialogEl;
    }

    function setupEventListeners(questions, currentQuestion) {
      const form = document.getElementById('pdf-form');
      const exportBtn = document.getElementById('pdf-export');
      const cancelBtn = document.getElementById('pdf-cancel');

      exportBtn.addEventListener('click', async () => {
        const exportType = form.querySelector('input[name="export-type"]:checked').value;
        const theme = form.querySelector('select[name="theme"]').value;
        
        const selectedQuestions = getSelectedQuestions(exportType, questions, currentQuestion);
        
        if (selectedQuestions.length === 0) {
          alert('No questions to export');
          return;
        }

        const options = {
          questions: selectedQuestions,
          subject: 'Midwifery & Obstetrical Nursing II',
          theme: theme,
          includeTOC: form.querySelector('input[name="include-toc"]').checked,
          includeCover: form.querySelector('input[name="include-cover"]').checked
        };

        await PDFManager.generatePDF(options);
      });

      cancelBtn.addEventListener('click', () => {
        dialogEl.close();
      });
    }

    function getSelectedQuestions(exportType, questions, currentQuestion) {
      switch (exportType) {
        case 'current-answer':
          return currentQuestion ? [currentQuestion] : [];
        case 'current-unit':
          return questions.filter(q => q.unit === currentQuestion.unit);
        case 'entire-subject':
          return questions;
        case 'bookmarked':
          return questions.filter(q => localStorage.getItem(`bookmarked-${q.id}`));
        case 'completed':
          return questions.filter(q => localStorage.getItem(`completed-${q.id}`));
        default:
          return questions;
      }
    }

    function open(questions, currentQuestion) {
      const dialog = createDialog(questions, currentQuestion);
      document.body.appendChild(dialog);
      dialog.showModal?.();
    }

    return {
      open,
      createDialog
    };
  })();

  // ────────────────────────────────────────────────────────────────────────
  // Main Export API (Future-proof for permissions)
  // ────────────────────────────────────────────────────────────────────────

  return {
    canExport: () => PDFManager.canExport(),
    openExportDialog: (questions, currentQuestion) => ExportDialog.open(questions, currentQuestion),
    generatePDF: (options) => PDFManager.generatePDF(options)
  };
})();

// Export as global
window.PDFExportSystem = PDFExportSystem;
