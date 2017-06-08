var parser = require('./node_modules/@oigroup/babylon-lightscript');
var compiler = require('./node_modules/@oigroup/babel-plugin-lightscript');

var compilerShim = require('../compilerShim')
var parserShim = require('../parserShim')

module.exports = {
  compile: compilerShim(compiler),
  parse: parserShim(parser)
}
