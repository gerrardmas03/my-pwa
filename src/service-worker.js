/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

// Precaching resources
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
/* eslint-enable no-restricted-globals */

// No need to export anything here
