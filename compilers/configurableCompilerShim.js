var transform = require('babel-standalone').transform;

function configurableCompilerShim(compilerPlugin, metadata) {
  var parser = metadata.parser;

  var compile = function compile(src, opts) {
    var ast, code, map, rst;

    // default opts
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

    return { js: code, lsc: src, ast: ast, map: map };
  }

  var parse = function parse(code, opts) {
    var ast;

    var parserOpts = metadata.getParserOpts(opts);

    try {
      ast = parser.parse(code, parserOpts);
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
