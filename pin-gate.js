// THE NURSING EXAM JOURNAL — DEVICE PIN GATE
// ---------------------------------------------------------------------------
// A lightweight client-side access gate for assessment/exam use.
//
//  • A predefined list of PINs (below) unlocks the site.
//  • On the first correct PIN, this browser/phone is "fingerprinted" and
//    remembered, so the same device skips PIN entry on later visits.
//  • Clearing site data, or opening on a different device/browser, asks again.
//
// NOTE: This is a *soft* gate. Because the site is fully static (no server),
// the PIN list lives in this file and a determined user can read it. It stops
// casual access and ties a device to a remembered PIN — it is not encryption.
// ---------------------------------------------------------------------------

(function () {
    'use strict';

    // ── EDIT ME ─────────────────────────────────────────────────────────────
    // Add/replace the PINs you hand out. One per student is a good pattern.
    var VALID_PINS = [
        '4729',
        '8156',
        '3094',
        '6271',
        '5810'
    ];
    // ────────────────────────────────────────────────────────────────────────

    var STORAGE_KEY = 'examGateAuth_v1';

    // Stable-ish device fingerprint from non-PII browser/hardware signals.
    function deviceFingerprint() {
        var n = navigator || {};
        var s = (typeof screen !== 'undefined') ? screen : {};
        var tz = 0;
        try { tz = new Date().getTimezoneOffset(); } catch (e) { tz = 0; }
        var parts = [
            n.userAgent || '',
            n.language || '',
            n.platform || '',
            n.hardwareConcurrency || '',
            n.maxTouchPoints || 0,
            (s.width || 0) + 'x' + (s.height || 0) + 'x' + (s.colorDepth || 0),
            tz
        ].join('|');
        // djb2-xor hash → short base36 string
        var h = 5381;
        for (var i = 0; i < parts.length; i++) {
            h = (((h << 5) + h) ^ parts.charCodeAt(i)) >>> 0;
        }
        return h.toString(36);
    }

    function readAuth() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
        catch (e) { return null; }
    }

    function writeAuth(pin, fp) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ pin: pin, fp: fp }));
        } catch (e) { /* storage may be unavailable; gate still works per-session */ }
    }

    var fp = deviceFingerprint();
    var stored = readAuth();
    var unlocked = !!(stored &&
                      stored.fp === fp &&
                      VALID_PINS.indexOf(stored.pin) !== -1);

    // Lock the page BEFORE first paint to avoid any content flash.
    if (!unlocked) {
        document.documentElement.classList.add('gate-locked');
    }

    // Build + wire the gate overlay once the DOM is ready.
    function init() {
        if (unlocked) return;

        var gate = document.createElement('div');
        gate.id = 'pin-gate';
        gate.setAttribute('role', 'dialog');
        gate.setAttribute('aria-modal', 'true');
        gate.setAttribute('aria-label', 'Enter access PIN');
        gate.innerHTML =
            '<div class="pin-card">' +
                '<span class="pin-eyebrow">RESTRICTED · ASSESSMENT MODE</span>' +
                '<h2 class="pin-title">ENTER ACCESS PIN</h2>' +
                '<p class="pin-sub">This device must be unlocked with a valid PIN. ' +
                    'Your device will be remembered after the first correct entry.</p>' +
                '<form class="pin-form" id="pin-form" autocomplete="off" novalidate>' +
                    '<input class="pin-input" id="pin-input" type="password" ' +
                        'inputmode="numeric" autocomplete="one-time-code" ' +
                        'autocapitalize="off" autocorrect="off" spellcheck="false" ' +
                        'aria-label="Access PIN" placeholder="••••" />' +
                    '<button class="pin-btn" id="pin-submit" type="submit">UNLOCK</button>' +
                '</form>' +
                '<p class="pin-error" id="pin-error" role="alert" aria-live="assertive"></p>' +
                '<span class="pin-device">DEVICE ID · ' + fp.toUpperCase() + '</span>' +
            '</div>';

        document.body.appendChild(gate);

        var form = gate.querySelector('#pin-form');
        var input = gate.querySelector('#pin-input');
        var error = gate.querySelector('#pin-error');

        // Clear the error as the user edits.
        input.addEventListener('input', function () {
            error.textContent = '';
            gate.classList.remove('shake');
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var pin = (input.value || '').trim();

            if (!pin) {
                fail('Enter your PIN.');
                return;
            }
            if (VALID_PINS.indexOf(pin) === -1) {
                fail('Incorrect PIN. Try again.');
                return;
            }

            // Success: remember this device, then unlock.
            writeAuth(pin, fp);
            document.documentElement.classList.remove('gate-locked');
            gate.classList.add('pin-done');
            // Remove the node after the fade so it can't be focused again.
            setTimeout(function () {
                if (gate.parentNode) gate.parentNode.removeChild(gate);
            }, 320);
        });

        function fail(msg) {
            error.textContent = msg;
            gate.classList.remove('shake');
            // reflow to restart the shake animation
            void gate.offsetWidth;
            gate.classList.add('shake');
            input.select();
        }

        // Autofocus the field for quick entry.
        setTimeout(function () { input.focus(); }, 50);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
