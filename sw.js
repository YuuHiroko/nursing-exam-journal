// THE NURSING EXAM JOURNAL — service worker
// Runtime cache-first with background refresh, so the app works offline
// after the first online visit. Cross-origin (fonts) is left to the network.
// Bump CACHE to invalidate every cached asset in one shot.

var CACHE = 'nej-cache-v3';

self.addEventListener('install', function (e) {
    // Activate this worker as soon as it finishes installing.
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil((async function () {
        var keys = await caches.keys();
        await Promise.all(keys.map(function (k) {
            return k === CACHE ? null : caches.delete(k);
        }));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', function (e) {
    var req = e.request;
    if (req.method !== 'GET') return;

    var url;
    try { url = new URL(req.url); } catch (err) { return; }

    // Google Fonts (CSS + font files) are the only cross-origin assets.
    // Cache-first so the app keeps its Material typography + icons offline
    // after the first online visit. (Material components themselves are
    // bundled locally in vendor/ — no CDN involved.)
    if (url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
        e.respondWith((async function () {
            var cache = await caches.open(CACHE);
            var cached = await cache.match(req);
            if (cached) return cached;
            try {
                var res = await fetch(req);
                if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
                return res;
            } catch (err) {
                return cached || Response.error();
            }
        })());
        return;
    }

    if (url.origin !== self.location.origin) return;   // other cross-origin → network

    // Navigations: the HTML shell carries the ?v= cache-busters, so it must be
    // fresh whenever the device is online — otherwise a fixed answer would never
    // reach students. Network-first, falling back to cache only when offline.
    if (req.mode === 'navigate') {
        e.respondWith((async function () {
            var cache = await caches.open(CACHE);
            try {
                var fresh = await fetch(req);
                if (fresh && fresh.ok) cache.put(req, fresh.clone());
                return fresh;
            } catch (err) {
                return (await cache.match(req)) ||
                       (await cache.match('index.html')) ||
                       (await cache.match('./')) ||
                       Response.error();
            }
        })());
        return;
    }

    // Static assets (CSS / JS / data / images): stale-while-revalidate.
    // Each carries a ?v= or hashed URL, so a bumped version is a new cache key
    // requested by the always-fresh HTML — no stale code is pinned.
    e.respondWith((async function () {
        var cache = await caches.open(CACHE);
        var cached = await cache.match(req);
        if (cached) {
            e.waitUntil((async function () {
                try {
                    var fresh = await fetch(req);
                    if (fresh && fresh.ok && fresh.type === 'basic') await cache.put(req, fresh.clone());
                } catch (err) { /* offline — keep the cached copy */ }
            })());
            return cached;
        }
        var res = await fetch(req);
        if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
        return res;
    })());
});
