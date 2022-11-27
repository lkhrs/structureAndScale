let coreAssets = [
  "style.css",
  "index.html",
  "index.js",
  "treasure.html",
  "treasure.js",
  "dice.html",
  "dice.js",
  "offline.html",
];

// Cache coreAssets
self.addEventListener("install", function (event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open("app").then(function (cache) {
      for (let asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    })
  );
});

// Listen for request events
self.addEventListener("fetch", function (event) {
  // Get the request
  let request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (request.cache === "only-if-cached" && request.mode !== "same-origin")
    return;

  // HTML files (network first)
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return caches.match(request).then(function (response) {
            return response || caches.match("offline.html");
          });
        })
    );
  }
  // Other assets (cache first)
  if (
    request.headers.get("Accept").includes("application/javascript") ||
    request.headers.get("Accept").includes("text/css")
  ) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            return response;
          })
        );
      })
    );
  }
});
