const CACHE_NAME = 'anxiapp-cache-v1';
const cacheFiles = [
  '/AnxiAPP/',
  '/AnxiAPP/index.html',
  '/AnxiAPP/login.html',
  '/AnxiAPP/manifest.json',
  '/AnxiAPP/icons/icon-192.png',
  '/AnxiAPP/icons/icon-512.png',
];

// 安裝階段：將重要資源加入快取
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

// 取用階段：從快取回應或 fallback 到網路
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 更新階段：清除舊版快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
