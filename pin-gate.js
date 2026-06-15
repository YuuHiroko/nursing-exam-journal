// THE NURSING EXAM JOURNAL — DEVICE PIN GATE
// ---------------------------------------------------------------------------
// A lightweight client-side access gate for assessment/exam use.
//
//  • A predefined list of PINs (below) unlocks the site.
//  • On the first correct PIN, this browser/phone is "fingerprinted" and
//    remembered, so the same device skips PIN entry on later visits.
//  • HARD DEVICE LOCK: the first PIN a device uses is bound to that device.
//    That device will then ONLY accept that same PIN — a different valid PIN
//    is rejected. The binding survives clearing the unlock state.
//  • Opening on a different device/browser asks for a PIN again.
//
// NOTE: This is a *soft* gate, even with the device lock. Because the site is
// fully static (no server), the PIN list lives in this file and a determined
// user can read it, and the lock is per-device localStorage (no shared
// registry) — so the SAME PIN can still be claimed on a second device. Closing
// that gap needs a backend. This stops casual sharing; it is not encryption.
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

    var STORAGE_KEY = 'examGateAuth_v1';   // current unlock state (skip re-entry)
    var BIND_KEY    = 'examGateBind_v1';   // permanent device→PIN lock (survives re-lock)

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

    // Permanent device→PIN binding: the first PIN a device unlocks with is the
    // ONLY PIN that device will ever accept. Unlike auth, this is not cleared on
    // re-lock, so a single phone can't be cycled through multiple PINs.
    function readBind() {
        try { return JSON.parse(localStorage.getItem(BIND_KEY)); }
        catch (e) { return null; }
    }

    function writeBind(pin, fp) {
        try {
            if (!localStorage.getItem(BIND_KEY)) {
                localStorage.setItem(BIND_KEY, JSON.stringify({ pin: pin, fp: fp }));
            }
        } catch (e) { /* storage may be unavailable */ }
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
                    'The first PIN used locks to this device — it can’t be ' +
                    'switched to another PIN later.</p>' +
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

            // Hard device lock: once this device is bound to a PIN, it will
            // only ever accept that same PIN.
            var bind = readBind();
            if (bind && bind.pin !== pin) {
                fail('This device is already registered to a different PIN.');
                return;
            }

            // Success: bind device→PIN (first time only), remember, then unlock.
            writeBind(pin, fp);
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
