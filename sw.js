const CACHE_NAME = 'ecom-cache-v2';  // Changed to v2 to force update
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

// Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache all URLs:', error);
            })
    );
});

// Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone();
                return fetch(fetchRequest)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        if (event.request.mode === 'navigate') {
                            return caches.match('/');
                        }
                    });
            })
    );
});

// Activate
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
});