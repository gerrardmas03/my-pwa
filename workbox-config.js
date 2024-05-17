// workbox-config.js
module.exports = {
    globDirectory: 'build/',
    globPatterns: [
      '**/*.{html,js,css,png,jpg,svg}'
    ],
    swDest: 'build/service-worker.js',
    swSrc: 'src/service-worker.js',
  };
  