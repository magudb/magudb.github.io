const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const pkg = require('./package.json');

// Build version: uses GitHub run number in CI, falls back to package version locally
const buildVersion = process.env.BUILD_VERSION
  ? `${pkg.version}-build.${process.env.BUILD_VERSION}`
  : `${pkg.version}-dev`;

// Short commit SHA for cache busting (first 7 chars)
const commitSha = process.env.COMMIT_SHA
  ? process.env.COMMIT_SHA.substring(0, 7)
  : 'local';

const cacheVersion = `${buildVersion}+${commitSha}`;

console.log(`Building with cache version: ${cacheVersion}`);

module.exports = {
  mode: "production",
  entry: './_src/app.js',
  output: {
    path: path.resolve(__dirname, "assets/js/"),
    filename: "app.js"
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // Use build version as cache identifier for automatic cache busting
      cacheId: `udbjorg-net-v${cacheVersion}`,

      // Service worker behavior
      clientsClaim: true,
      skipWaiting: true,
      navigationPreload: true,
      cleanupOutdatedCaches: true,

      // Output location
      swDest: "../../service-worker.js",

      // Runtime caching strategies (order matters - more specific patterns first)
      runtimeCaching: [
        {
          // Images - cache first since they rarely change
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: `images-v${cacheVersion}`,
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
        {
          // CSS and JS - stale while revalidate for quick loads with updates
          urlPattern: /\.(?:css|js)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: `static-v${cacheVersion}`,
          },
        },
        {
          // HTML pages - network first for fresh content
          urlPattern: /\.(?:html)$|\/[^.]*$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: `pages-v${cacheVersion}`,
            networkTimeoutSeconds: 3,
          },
        },
        {
          // Fonts - cache first, rarely change
          urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: `fonts-v${cacheVersion}`,
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
            },
          },
        },
      ],

      modifyURLPrefix: {
        '': '/assets/js/'
      },
    }),
  ],
};
