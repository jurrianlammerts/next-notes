// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [
    optimizedImages,
    {
      imagesFolder: 'images',
      optimizeImages: true,
      optimizeImagesInDev: false,
    },
  ],

  // your other plugins here
]);
