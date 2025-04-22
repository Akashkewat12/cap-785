// service-worker.js

const CACHE_NAME = 'hannes-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/cart.html',
    '/account.html',
    '/product_details.html',
    '/src/css/main.css',
    '/src/js/script.js',
    '/images/header/complogo.png',
    '/images/header/cart.svg',
    '/images/header/favicon.svg',
    '/images/products/product-1.webp',
    '/images/products/product-2.webp',
    '/images/products/product-3.webp',
    '/images/products/product-4.webp',
    '/images/products/product-5.webp',
    '/images/products/product-6.webp',
    '/images/products/product-7.webp',
    '/images/products/product-8.webp',
    '/images/products/product-9.webp',
    '/images/products/product-10.webp',
    '/images/products/product-11.webp',
    '/images/products/product-12.webp',
    '/images/products/product-13.webp',
    '/images/products/product-14.webp',
    '/images/products/product-15.webp',
    '/images/products/product-16.webp',

    '/images/promos/exclusive.png',
    '/images/promos/exclusive2.png',

    '/images/testimonials/anne.webp',
    '/images/testimonials/jemma.webp',
    '/images/testimonials/anne.webp',
    // Add other assets like images, fonts, etc.
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
