const cacheId = "restaurant-v1";
const cacheFiles = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
    "/js/dbhelper.js",
    "/js/main.js",
    "/js/restaurant_info.js",
    "/js/register.js",
    "/data/restaurants.json",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg"
];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(cacheId).then(cache => {
            return cache.addAll(cacheFiles);
        })
        .catch(error => {
            console.log("Caches open failed: " + error);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log('Found', event.request, ' in cache');
                return response;
            } else {
                console.log('Could not find ', event.request, ' in cache, will fetch it');
                return fetch(event.request)
                    .then(response => {
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var cloneResponse = response.clone();
                        caches.open(cacheId).then(cache => {
                            cache.put(event.request, cloneResponse);
                        });
                        return response;
                    })
                    .catch(error => {
                        console.log("Caches open failed: " + error);
                    });
            }
        })
    );
});