var parser = require('./node_modules/babylon-lightscript');
var compiler = require('./node_modules/babel-plugin-lightscript');

var react = require('babel-plugin-transform-react-jsx');
var transformClassProperties = require('babel-plugin-transform-class-properties');
var transformDecorators = require('babel-plugin-transform-decorators-legacy').default;

var transform = require('babel-standalone').transform;

var babelOpts = {
  plugins: [compiler, transformClassProperties, transformDecorators, react],
  sourceMaps: true
};

var parserOpts = {
  sourceType: "module",
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  plugins: ["lightscript", "flow", "jsx", "asyncFunctions", "asyncGenerators", "classConstructorCall", "classProperties", "decorators", "doExpressions", "exponentiationOperator", "exportExtensions", "functionBind", "functionSent", "objectRestSpread", "trailingFunctionCommas", "dynamicImport"]
};

function compile(lsc, opts) {
  var ast, code, map, rst;
  if (!opts) opts = {};
  try {
    rst = transform(lsc, babelOpts);
    ast = rst.ast; code = rst.code; map = rst.map;
  } catch (err) {
    return {
      lsc: lsc,
      errorMessage: err.message,
      errorMarker: err.loc
    };
  } return { js: code, lsc: lsc, ast: ast, map: map };
}

function parse(code, opts) {
  var ast;
  if (!opts) opts = {};
  try {
    // TODO: configurable opts
    ast = parser.parse(code, parserOpts);
  } catch (err) {
    return {
      lsc: code,
      errorMessage: err.message,
      errorMarker: err.loc
    };
  } return { lsc: code, ast: ast };
}

module.exports = {
  compile: compile,
  parse: parse
}
