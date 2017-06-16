var compiler = require('./node_modules/@oigroup/babel-plugin-lightscript');
var getMetadata = require('./node_modules/@oigroup/babel-plugin-lightscript/lib/config').getMetadata;

var configurableCompilerShim = require('../configurableCompilerShim')

var shim = configurableCompilerShim(compiler, getMetadata());

module.exports = shim;
