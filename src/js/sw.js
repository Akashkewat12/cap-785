// Service Worker for caching pages
const CACHE_NAME = 'website-cache-v1';
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
];

// Install event - cache the essential files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(function(response) {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Add to cache
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(function() {
            // If network fails and the request is for a page, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});