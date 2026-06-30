# Browser Fingerprint Access System

## Overview

The Nursing Exam Journal now uses a browser fingerprint-based access control system. Each user gets a **permanent access code** that is bound to their specific browser/device. Only that browser can use that code to access the app.

- **No self-registration:** Only administrators assign access codes
- **Permanent codes:** Codes never change; if a user gets a new device, admin updates the fingerprint
- **Stable fingerprints:** Each browser has a unique, stable identifier across page reloads
- **Auto-login:** Users who have accessed before are automatically authenticated
- **Logout available:** Users can logout and re-authenticate if needed

---

## User Experience

### First Visit

1. User opens the app
2. A Material Design 3 dialog appears with:
   - A lock icon and "Access Required" message
   - Their unique **Device ID** (e.g., `K2X9-P7M4-LA81`)
   - A button to copy the Device ID
   - An input field for "Access Code"
3. User copies the Device ID and sends it to the administrator
4. Administrator creates a permanent access code and sends it to the user
5. User enters the code and clicks UNLOCK
6. App verifies: code exists AND fingerprint matches current browser
7. If valid → app unlocks and session is stored
8. If invalid → specific error message explains why

### Returning Visit (Same Browser)

1. User opens the app
2. System detects stored session and valid fingerprint
3. App automatically unlocks (no gate shown)
4. User proceeds to study

### Logout

1. User clicks the logout button (⬅️ icon in top-right)
2. Session is cleared
3. Gate is shown again for re-authentication
4. Fingerprint mapping remains (stored in config)

### Device Change

If the user changes browsers or devices:

1. They open the app on the new browser
2. Gate shows a new Device ID
3. They send the new Device ID to the administrator
4. Administrator updates the fingerprint mapping for that code
5. User re-enters their (same) access code on the new browser
6. Access granted on the new device

---

## Administrator Setup

### 1. Configure Access Codes

Edit `fingerprint-gate.js` and add access codes:

```javascript
const ACCESS_CODES = {
  "NEJ-7K9M-X2QP": {
    owner: "Student A",
    shortId: "K2X9-P7M4-LA81",
    fingerprint: "8762683dffe0dd678614c563df0b19b23ea2d4a0c630cb5322491fcb0ac6c2f6",
    activatedAt: "2025-06-29T14:30:00Z"
  },
  "NEJ-B4TR-91WL": {
    owner: "Student B",
    shortId: "R5B8-Q3N9-X7C2",
    fingerprint: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2",
    activatedAt: "2025-06-29T15:00:00Z"
  }
};
```

### 2. Registration Workflow

**Step 1: User sends Device ID**
- User runs the gate and sees their Device ID (e.g., `K2X9-P7M4-LA81`)
- User copies it and sends to administrator

**Step 2: Admin creates access code**
- Create a permanent code (e.g., `NEJ-7K9M-X2QP`)
  - Format: `XXX-YYYY-ZZZZ` (3 uppercase letters, 3 uppercase letters, 4 uppercase letters)
  - Can be any combination; generate with a memorable pattern
- Get the full SHA-256 fingerprint:
  - Ask user to open the gate
  - The gate displays the Device ID
  - Copy the **full fingerprint hash** from the browser's localStorage via developer console:
    ```javascript
    // In browser console on the gate
    JSON.parse(localStorage.getItem('fence-access-session'))?.fingerprintFull
    // Or directly from the GateController:
    window.GateController?.getCurrentFingerprint?.()
    ```
  - Or use the Device ID shown and manually verify with the user

**Step 3: Admin maps code to fingerprint**
- Add the code to `ACCESS_CODES` in `fingerprint-gate.js`
- Map code → fingerprint (the full SHA-256 hash, not the shortened Device ID)
- Record the activation timestamp

**Step 4: Admin gives code to user**
- User receives the access code (e.g., `NEJ-7K9M-X2QP`)

**Step 5: User authenticates**
- User enters the code in the gate
- App verifies: code exists AND fingerprint matches
- If valid → unlocked and session stored
- If invalid → error message ("Access code not found" or "This access code is already registered to another browser")

### 3. Device Upgrade (User Gets New Device)

**Step 1: User sends new Device ID**
- User opens gate on new device
- Sees new Device ID
- Sends it to administrator

**Step 2: Admin updates fingerprint**
- Get the new Device ID from the gate on the new browser
- Update the code's fingerprint in `ACCESS_CODES`:
  ```javascript
  "NEJ-7K9M-X2QP": {
    owner: "Student A",
    shortId: "R5B8-Q3N9-X7C2",  // new Device ID
    fingerprint: "new_sha256_hash_here",  // new full fingerprint
    activatedAt: "2025-06-29T14:30:00Z"  // keep original
  }
  ```

**Step 3: User re-authenticates**
- User re-enters the same access code on the new browser
- App verifies fingerprint against the updated mapping
- Unlocked on new device

**Key:** The access code **never changes**. Only the fingerprint is updated.

---

## Technical Details

### Fingerprint Generation

The fingerprint is generated from stable browser properties:

```javascript
{
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  screenResolution: "1920x1080",
  colorDepth: 24,
  timezone: "America/New_York",
  cpuCores: 8,
  deviceMemory: 16,
  touchSupport: false,
  maxTouchPoints: 0
}
```

These properties are hashed using SHA-256, producing a 64-character hex string (256 bits).

A shortened 12-character Device ID is derived from this hash and displayed to users for easy copying.

### Storage Schema

Session data stored in browser localStorage (`fence-access-session`):

```javascript
{
  version: 2,
  accessCode: "NEJ-7K9M-X2QP",
  fingerprint: "K2X9-P7M4-LA81",
  fingerprintFull: "8762683dffe0dd678614c563df0b19b23ea2d4a0c630cb5322491fcb0ac6c2f6",
  activatedAt: "2025-06-29T14:30:00Z",
  lastUsed: "2025-06-29T15:45:00Z"
}
```

### Validation Logic

When user submits a code:

1. Check if code exists in `ACCESS_CODES` config
2. If not → error: "Access code not found."
3. If yes, get the fingerprint from config
4. Generate current browser fingerprint
5. Compare full SHA-256 hashes
6. If match → unlock, store session, fire `gate-unlocked` event
7. If no match → error: "This access code is already registered to another browser."

### Auto-Login

On page load:

1. Check localStorage for `fence-access-session`
2. If found, parse it to get stored fingerprint and code
3. Generate current browser fingerprint
4. If stored fingerprint === current fingerprint → auto-unlock
5. If mismatch → show gate (fingerprint changed, requires re-auth)

### Logout

1. User clicks logout button in top-right
2. System clears `fence-access-session` from localStorage
3. Removes `app-unlocked` class from body
4. Shows gate again
5. Fingerprint mapping in config remains unchanged

---

## Error Messages

| Scenario | Error Message |
|----------|---------------|
| Empty input | (validation on blur) |
| Invalid code | "Access code not found." |
| Valid code, wrong device | "This access code is already registered to another browser." |
| Successful validation | App unlocks, session stored, auto-login on return |

---

## Material Design 3 Components Used

- `md-dialog` — Modal gate overlay (non-dismissible)
- `md-outlined-text-field` — Access code input with validation
- `md-filled-button` — UNLOCK button with lock_open icon
- `md-circular-progress` — Loading spinner during validation
- `md-icon-button` — Copy Device ID button and logout button
- `md-icon` — Visual indicators (lock, lock_open, check, error)

---

## Important Rules

1. **One-to-one mapping:** One code = one browser fingerprint (no sharing)
2. **Permanent codes:** Codes never regenerate; only fingerprint updates
3. **Admin control:** Users cannot register themselves; only admins assign codes
4. **Display rule:** Never show full SHA-256 hash to users (only shortened Device ID)
5. **Validation rule:** Always validate using full SHA-256 hash
6. **Content security:** No app content visible until auth succeeds
7. **One active session per code:** If same code authenticated on different browser, new browser locked out until fingerprint updated

---

## Future: Backend Integration

The validation logic is designed to be swapped from client-side to server-side without UI changes:

Current (client-side):
```javascript
AccessCodeManager.validate(code, fingerprint) → {valid, message}
```

Future (server-side):
```javascript
async AccessCodeManager.validate(code, fingerprint) {
  const resp = await fetch('/api/validate-access', {code, fingerprint});
  return resp.json();  // {valid, message}
}
```

UI, storage, and fingerprinting remain unchanged.

---

## Troubleshooting

### "This access code is already registered to another browser"

**Cause:** User is trying to use an access code on a different browser than it was registered for.

**Solution:** 
- If intentional (device upgrade): Admin updates the fingerprint for that code
- If accidental: User needs a different access code, or admin registers this browser

### "Access code not found"

**Cause:** Code entered doesn't exist in `ACCESS_CODES` config.

**Solution:**
- User re-checks the code from admin
- Admin verifies the code was added to `fingerprint-gate.js`
- Admin may have typo; codes are case-sensitive

### Auto-unlock not working on return visit

**Cause:** Fingerprint changed (browser update, cache cleared, different browser profile).

**Solution:**
- Re-enter access code to authenticate
- If fingerprint intentionally changed, admin updates config
- Browser local storage may be cleared; session data lost

### Logout button not working

**Cause:** Rare edge case with module initialization timing.

**Solution:**
- Refresh page
- Re-authenticate with access code
- Check browser console for errors

---

## Configuration Example

```javascript
// fingerprint-gate.js

const ACCESS_CODES = {
  "STU-001-ALPHA": {
    owner: "Priya Sharma",
    shortId: "A1B2-C3D4-E5F6",
    fingerprint: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2",
    activatedAt: "2025-06-29T10:00:00Z"
  },
  "STU-002-BETA": {
    owner: "Anil Kumar",
    shortId: "F6E5-D4C3-B2A1",
    fingerprint: "f6e5d4c3b2a19z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4",
    activatedAt: "2025-06-29T10:15:00Z"
  },
  "STU-003-GAMMA": {
    owner: "Meera Singh",
    shortId: "X1Y2-Z3A4-B5C6",
    fingerprint: "x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2",
    activatedAt: "2025-06-29T10:30:00Z"
  }
};
```

---

## Code Deployment

After updating `ACCESS_CODES`:

1. Update `fingerprint-gate.js` with new codes
2. Bump the version number in `index.html`:
   ```html
   <script src="fingerprint-gate.js?v=8"></script>
   ```
3. Commit and push changes
4. Deploy to production
5. Clear browser cache (hard refresh with Ctrl+Shift+R / Cmd+Shift+R)
6. Notify users of new access codes
