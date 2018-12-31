const cacheName = "v1";
const cacheAssets = [
  "sounds/clap.wav",
  "sounds/hi-hat.wav",
  "sounds/kick.mp3",
  "sounds/openhat.wav",
  "sounds/orchhit.wav",
  "sounds/ride.wav",
  "sounds/snare.wav",
  "sounds/tom.wav"
];

//Call Install event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//Call Activate event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
//Call Fetch Event--the idea here is to fetch sound effects from //cache to eliminate network lag
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
