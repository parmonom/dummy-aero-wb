const staticCacheName = 'site-static-v0.1.10';
const assets = [
    './',
    './index.html',
    './about.html',
    './database.html',
    './js/ui.js',
    './js/app.js',
    './js/graph.js',
    './js/import_db.js',
    './js/render_db.js',
    './js/vendor/nouislider.min.js',
    './js/vendor/materialize.min.js',
    './js/vendor/d3.v6.min.js',
    './css/styles.css',
    './css/materialize.min.css',
    './css/nouislider.min.css',
    './img/google-icons/error_outline_black_24dp.svg',
    './img/google-icons/airline_seat_recline_extra-24px.svg',
    './img/google-icons/local_gas_station-24px.svg',
    './img/google-icons/airplanemode_active-24px.svg',
    './img/google-icons/luggage-24px.svg',
    './img/google-icons/ballast-24px.svg',
    './img/google-icons/menu-24px.svg'
];

// install event
self.addEventListener('install', evt => {
    console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    console.log('service worker activated');
    //remove old cache
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
