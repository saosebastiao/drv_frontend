module.exports = function(source) {
  this.cacheable();
  return `@import './src/config/global';
    ${source}`;
}