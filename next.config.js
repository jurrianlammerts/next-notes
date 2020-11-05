const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  imagesFolder: 'images',
  handleImages: ['jpeg', 'png', 'svg', 'webp'],
  removeOriginalExtension: false,
  optimizeImages: true,
  optimizeImagesInDev: true,
});
