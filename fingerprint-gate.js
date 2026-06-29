/**
 * Fingerprint Access Gate System (v2)
 *
 * Modular, Material Design 3 authentication system with browser fingerprint binding.
 * Replaces the simple PIN gate with a robust, admin-managed access code system.
 *
 * Modules:
 *   - FingerprintManager: Generate, hash, and display device fingerprints
 *   - AccessCodeManager: Validate codes against configuration
 *   - StorageManager: Manage persistent sessions with versioning
 *   - GateUI: Material Design 3 gate interface
 *   - GateController: Orchestrate authentication flow
 */

(function() {
  'use strict';

  // ============================================================================
  // ADMIN CONFIGURATION: Permanent Access Code Mappings
  // ============================================================================
  // Each access code maps to a unique browser fingerprint.
  // Admins assign codes permanently; users keep the same code even if device changes.
  // Only the fingerprint is updated by admins when a user switches devices.

  const ACCESS_CODES = {
    // Add access codes here
    // The administrator assigns codes by matching the Device ID shown on the gate
    // to a permanent access code that belongs to one user
    // 
    // Example:
    // "NEJ-7K9M-X2QP": {
    //   owner: "Student A",
    //   shortId: "K2X9-P7M4-LA81",  // displayed Device ID
    //   fingerprint: "abc123def456ghi789jklmnopqrstuvwxyz0123456789abcdef",  // from gate
    //   activatedAt: "2025-06-29T14:30:00Z"
    // }
  };

  // ============================================================================
  // FingerprintManager: Generate unique device fingerprints
  // ============================================================================

  const FingerprintManager = (() => {
    // Collect stable browser properties for fingerprinting.
    // These properties should remain consistent across page reloads on the same browser/device.
    function collectProperties() {
      const props = {
        // Core identifiers
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        
        // Display properties (stable)
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        
        // System properties
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cpuCores: navigator.hardwareConcurrency || 0,
        deviceMemory: navigator.deviceMemory || 0,
        
        // Capabilities
        touchSupport: !!(navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0),
        onLine: navigator.onLine,
        maxTouchPoints: navigator.maxTouchPoints || 0,
      };

      return props;
    }

    // Simple SHA-256 implementation (for client-side hashing)
    // In production, use a proven crypto library
    async function sha256(message) {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    // Convert SHA-256 hash to friendly 12-char Device ID
    // Example: "K2X9-P7M4-LA81"
    function formatShortId(fullHash) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1
      let shortId = '';
      for (let i = 0; i < fullHash.length && shortId.length < 12; i++) {
        const byte = parseInt(fullHash.substr(i * 2, 2), 16);
        shortId += chars[byte % chars.length];
      }
      // Format as XXX-XXX-XXX
      return shortId.slice(0, 3) + '-' + shortId.slice(3, 6) + '-' + shortId.slice(6, 9);
    }

    return {
      async generate() {
        const props = collectProperties();
        const jsonStr = JSON.stringify(props);
        const fullHash = await sha256(jsonStr);
        const shortId = formatShortId(fullHash);
        return { shortId, fullHash, properties: props };
      },
    };
  })();

  // ============================================================================
  // AccessCodeManager: Validate access codes against configuration
  // ============================================================================

  const AccessCodeManager = (() => {
    return {
      validate(code, currentFingerprint) {
        // Code must exist in ACCESS_CODES
        if (!ACCESS_CODES[code]) {
          return { valid: false, reason: 'not-found', message: 'Access code not found.' };
        }

        const codeEntry = ACCESS_CODES[code];

        // Fingerprint must match exactly (use full hash, not shortId)
        if (codeEntry.fingerprint !== currentFingerprint) {
          return {
            valid: false,
            reason: 'fingerprint-mismatch',
            message: 'Device changed. This browser is not registered for this access code. Please contact the administrator if you intentionally changed devices.',
          };
        }

        return { valid: true, reason: 'success', entry: codeEntry };
      },

      getCodeOwner(code) {
        return ACCESS_CODES[code]?.owner || null;
      },

      isCodeRegistered(code) {
        return !!ACCESS_CODES[code];
      },
    };
  })();

  // ============================================================================
  // StorageManager: Persistent session storage with versioning
  // ============================================================================

  const StorageManager = (() => {
    const STORAGE_KEY = 'fence-access-session';

    const schema = {
      version: 2,
      accessCode: '',
      fingerprint: '', // full SHA-256 hash (not displayed)
      shortId: '', // displayed Device ID
      activatedAt: '', // ISO timestamp
      lastUsed: '', // ISO timestamp
    };

    return {
      saveSession(accessCode, fingerprintData) {
        const session = {
          version: 2,
          accessCode,
          fingerprint: fingerprintData.fullHash,
          shortId: fingerprintData.shortId,
          activatedAt: new Date().toISOString(),
          lastUsed: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        return session;
      },

      loadSession() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        try {
          const session = JSON.parse(stored);
          // Validate schema version and required fields
          if (session.version !== 2 || !session.accessCode || !session.fingerprint) {
            return null;
          }
          return session;
        } catch (e) {
          return null;
        }
      },

      updateLastUsed() {
        const session = this.loadSession();
        if (session) {
          session.lastUsed = new Date().toISOString();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        }
      },

      clearSession() {
        localStorage.removeItem(STORAGE_KEY);
      },

      isSessionValid(storedSession, currentFingerprint) {
        if (!storedSession) return false;
        // Fingerprint must match exactly (no multi-device sharing)
        if (storedSession.fingerprint !== currentFingerprint) return false;
        // Code must still be registered
        if (!AccessCodeManager.isCodeRegistered(storedSession.accessCode)) return false;
        return true;
      },
    };
  })();

  // ============================================================================
  // GateUI: Material Design 3 gate interface
  // ============================================================================

  const GateUI = (() => {
    let dialogEl = null;
    let inputEl = null;
    let submitBtn = null;
    let errorEl = null;
    let deviceIdEl = null;

    function createGateDialog(deviceId) {
      const container = document.createElement('div');
      container.id = 'fingerprint-gate-container';
      container.innerHTML = `
        <md-dialog id="fingerprint-gate-dialog" modal>
          <div slot="headline">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px;">lock</span>
            Access Required
          </div>
          <div slot="content" style="padding: 16px 0;">
            <div style="margin-bottom: 24px;">
              <div style="font-size: 0.875rem; color: var(--md-sys-color-on-surface-variant); margin-bottom: 8px;">
                Your Device ID
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div id="device-id-display" style="
                  font-family: var(--md-font-mono, 'Courier New', monospace);
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: var(--md-sys-color-primary);
                  letter-spacing: 0.1em;
                ">
                  ${deviceId}
                </div>
                <button id="copy-device-id" type="button" style="
                  appearance: none;
                  background: none;
                  border: 0;
                  padding: 8px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: var(--md-sys-color-primary);
                  border-radius: 8px;
                  transition: background-color 0.2s;
                " title="Copy Device ID">
                  <span class="material-symbols-outlined" id="copy-icon">content_copy</span>
                </button>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <label for="access-code-input" style="
                display: block;
                font-size: 0.875rem;
                color: var(--md-sys-color-on-surface-variant);
                margin-bottom: 8px;
              ">
                Enter your Access Code
              </label>
              <md-outlined-text-field
                id="access-code-input"
                placeholder="NEJ-7K9M-X2QP"
                type="text"
                style="width: 100%;"
              ></md-outlined-text-field>
            </div>

            <div id="gate-error" style="
              display: none;
              padding: 12px;
              background-color: var(--md-sys-color-error-container);
              color: var(--md-sys-color-on-error-container);
              border-radius: 8px;
              font-size: 0.875rem;
              margin-bottom: 16px;
              animation: slideUp 0.3s ease-out;
            "></div>
          </div>

          <div slot="actions" style="display: flex; gap: 8px; justify-content: flex-end;">
            <md-filled-button id="unlock-button" type="button">
              <span class="material-symbols-outlined" slot="icon">lock_open</span>
              UNLOCK
            </md-filled-button>
          </div>
        </md-dialog>

        <style>
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          #fingerprint-gate-dialog::backdrop {
            background-color: rgba(0, 0, 0, 0.4);
          }

          #fingerprint-gate-dialog {
            --md-dialog-container-color: var(--md-sys-color-surface-dim);
            max-width: 400px;
          }

          #copy-device-id:hover {
            background-color: var(--md-sys-color-primary-container);
          }

          #copy-device-id:active {
            background-color: var(--md-sys-color-primary, rgba(0, 0, 0, 0.1));
          }

          #access-code-input {
            --md-outlined-text-field-container-shape: 8px;
            font-family: var(--md-font-mono, 'Courier New', monospace);
            letter-spacing: 0.05em;
          }

          md-filled-button {
            --md-filled-button-container-shape: 8px;
          }
        </style>
      `;

      document.body.insertBefore(container, document.body.firstChild);

      // Wait for Material Web to upgrade elements
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          dialogEl = document.getElementById('fingerprint-gate-dialog');
          inputEl = document.getElementById('access-code-input');
          submitBtn = document.getElementById('unlock-button');
          errorEl = document.getElementById('gate-error');
          deviceIdEl = document.getElementById('device-id-display');

          // Show the dialog
          if (dialogEl && typeof dialogEl.show === 'function') {
            dialogEl.show();
          }

          resolve();
        });
      });
    }

    return {
      async render(deviceId, onUnlock, onLogout) {
        await createGateDialog(deviceId);

        // Setup copy-to-clipboard
        const copyBtn = document.getElementById('copy-device-id');
        if (copyBtn) {
          copyBtn.addEventListener('click', async () => {
            try {
              await navigator.clipboard.writeText(deviceId);
              const icon = document.getElementById('copy-icon');
              icon.textContent = 'check';
              setTimeout(() => {
                icon.textContent = 'content_copy';
              }, 2000);
            } catch (e) {
              console.error('[v0] Copy failed:', e);
            }
          });
        }

        // Setup input validation on blur
        if (inputEl) {
          inputEl.addEventListener('blur', () => {
            if (!inputEl.value.trim()) {
              this.showError('Please enter your access code.');
            } else {
              this.clearError();
            }
          });
        }

        // Setup unlock button
        if (submitBtn) {
          submitBtn.addEventListener('click', () => onUnlock(inputEl?.value || ''));
        }

        // Setup enter key on input
        if (inputEl) {
          inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              onUnlock(inputEl.value || '');
            }
          });
        }
      },

      showError(message) {
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.style.display = 'block';
        }
      },

      clearError() {
        if (errorEl) {
          errorEl.style.display = 'none';
          errorEl.textContent = '';
        }
      },

      setLoading(isLoading) {
        if (submitBtn) {
          submitBtn.disabled = isLoading;
          submitBtn.textContent = isLoading ? 'Validating...' : 'Unlock';
        }
      },

      hide() {
        if (dialogEl && typeof dialogEl.close === 'function') {
          dialogEl.close();
        }
        const container = document.getElementById('fingerprint-gate-container');
        if (container) {
          container.style.display = 'none';
        }
      },

      show() {
        if (dialogEl && typeof dialogEl.show === 'function') {
          dialogEl.show();
        }
        const container = document.getElementById('fingerprint-gate-container');
        if (container) {
          container.style.display = 'block';
        }
      },

      getInputValue() {
        return inputEl?.value || '';
      },

      clearInput() {
        if (inputEl) {
          inputEl.value = '';
        }
      },
    };
  })();

  // ============================================================================
  // GateController: Orchestrate authentication flow
  // ============================================================================

  const GateController = (() => {
    let isUnlocked = false;
    let currentFingerprint = null;

    async function initializeFingerprint() {
      const fp = await FingerprintManager.generate();
      currentFingerprint = fp.fullHash;
      return fp;
    }

    async function checkStoredSession() {
      const stored = StorageManager.loadSession();
      if (stored && StorageManager.isSessionValid(stored, currentFingerprint)) {
        // Valid stored session — auto-unlock
        StorageManager.updateLastUsed();
        return true;
      }
      return false;
    }

    async function handleUnlock(code) {
      GateUI.setLoading(true);
      GateUI.clearError();

      // Simulate validation delay (in reality, this could be a server call)
      await new Promise((resolve) => setTimeout(resolve, 500));

      const validation = AccessCodeManager.validate(code, currentFingerprint);

      if (!validation.valid) {
        GateUI.showError(validation.message);
        GateUI.setLoading(false);
        return;
      }

      // Valid code + matching fingerprint
      const fingerprintData = await FingerprintManager.generate();
      StorageManager.saveSession(code, fingerprintData);

      // Hide gate and show app
      GateUI.hide();
      isUnlocked = true;

      // Fire custom event to trigger app initialization
      window.dispatchEvent(new CustomEvent('gate-unlocked', { detail: { code } }));

      GateUI.setLoading(false);
    }

    async function handleLogout() {
      StorageManager.clearSession();
      isUnlocked = false;
      GateUI.clearInput();
      GateUI.show();
    }

    return {
      async initialize() {
        // Step 1: Generate fingerprint
        const fp = await initializeFingerprint();

        // Step 2: Always render gate UI (even for auto-unlock, so it's available for logout)
        await GateUI.render(fp.shortId, handleUnlock, handleLogout);

        // Step 3: Check for stored session
        const hasValidSession = await checkStoredSession();
        if (hasValidSession) {
          isUnlocked = true;
          GateUI.hide();
          window.dispatchEvent(new CustomEvent('gate-unlocked'));
          return;
        }

        // If no valid session, gate is already shown
      },

      logout() {
        handleLogout();
      },

      isUnlocked() {
        return isUnlocked;
      },

      getCurrentFingerprint() {
        return currentFingerprint;
      },
    };
  })();

  // ============================================================================
  // Initialize on DOMContentLoaded
  // ============================================================================

  // Expose GateController with all methods
  window.GateController = GateController;

  // Hide app until authentication completes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      GateController.initialize();
    });
  } else {
    // Already loaded
    GateController.initialize();
  }
})();
