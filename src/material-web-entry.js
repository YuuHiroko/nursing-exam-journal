/**
 * Material Web entry — registers ONLY the components this app uses.
 * Bundled by scripts/build-mwc.mjs into vendor/material-web.min.js and
 * committed so gh-pages serves Material Design 3 entirely from origin
 * (no CDN). Keep this list tight: every import adds to the payload.
 */

// Buttons
import '@material/web/button/filled-button.js';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/iconbutton/icon-button.js';

// Selection / form controls
import '@material/web/checkbox/checkbox.js';
import '@material/web/switch/switch.js';
import '@material/web/textfield/outlined-text-field.js';

// Navigation
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';

// Chips
import '@material/web/chips/chip-set.js';
import '@material/web/chips/filter-chip.js';

// Overlays / feedback
import '@material/web/dialog/dialog.js';
import '@material/web/progress/linear-progress.js';
import '@material/web/progress/circular-progress.js';

// Primitives shared across the UI
import '@material/web/icon/icon.js';
import '@material/web/ripple/ripple.js';
import '@material/web/focus/md-focus-ring.js';
import '@material/web/divider/divider.js';

// Expose the M3 typescale stylesheet so the app can adopt it once.
export { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
