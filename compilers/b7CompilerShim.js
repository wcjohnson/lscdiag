var transform = require('@babel/standalone').transform;
var prettier = require('@oigroup/prettier-babylon');

function configurableCompilerShim(compilerPlugin, metadata) {
  var compile = function compile(src, opts) {
    var ast, code, map, rst, prettyCode;

    opts = Object.assign({}, opts);
    if (!opts.plugins) opts.plugins = [];
    if (opts.compilerPluginOpts) {
      opts.plugins.unshift([compilerPlugin, opts.compilerPluginOpts])
      delete opts.compilerPluginOpts
    } else {
      opts.plugins.unshift(compilerPlugin);
    }

    opts.sourceMaps = true;

    try {
      rst = transform(src, opts);
      ast = rst.ast; code = rst.code; map = rst.map;
    } catch (err) {
      return {
        lsc: src,
        errorMessage: err.message,
        errorMarker: err.loc
      };
    }

    try {
      prettyCode = prettier.format(code);
      code = prettyCode;
    } catch (err) {
      console.log("Prettier error", err);
    }

    return { js: code, lsc: src, ast: ast, map: map };
  }

  var parse = function parse(code, opts) {
    var ast, config;

    opts = Object.assign({}, opts);
    opts.parserOpts = { sourceType: "module "};
    config = metadata.getCompilerConfiguration(null, code, opts)

    try {
      ast = metadata.parse(code, config);
    } catch (err) {
      return {
        lsc: code,
        errorMessage: err.message,
        errorMarker: err.loc
      };
    }

    return { lsc: code, ast: ast };
  }

  return { compile: compile, parse: parse, metadata: metadata }
}

module.exports = configurableCompilerShim
