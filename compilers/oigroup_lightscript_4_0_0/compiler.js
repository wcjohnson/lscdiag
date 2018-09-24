var compiler = require('./node_modules/@lightscript/transform');
var getMetadata = require('./node_modules/@lightscript/transform').api.tooling.getCompilerMetadata;

var makeShim = require('../b7CompilerShim')

var shim = makeShim(compiler, getMetadata());

module.exports = shim;
