var parser = require('./node_modules/babylon-lightscript');
var compiler = require('./node_modules/babel-plugin-lightscript');

var compilerShim = require('../compilerShim')
var parserShim = require('../parserShim')

module.exports = {
  compile: compilerShim(compiler),
  parse: parserShim(parser)
}
