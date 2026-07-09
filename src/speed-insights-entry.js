/**
 * Entry point for bundling Vercel Speed Insights into a standalone module.
 * Imports and immediately invokes injectSpeedInsights to enable performance tracking.
 */
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights when the module loads
injectSpeedInsights();
