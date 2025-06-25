// webpack.mix.js
const mix = require('laravel-mix');

mix.js('js/custom_solr.js', 'dist')
  .sass('sass/custom_solr.scss', 'dist')
  .sourceMaps();
