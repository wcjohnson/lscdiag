var transform = require('babel-standalone').transform;

function compilerShim(compilerPlugin) {
  return function compile(src, opts) {
    var ast, code, map, rst;

    // default opts
    if (!opts) opts = {};
    if (!opts.plugins) opts.plugins = [];
    if (opts.compilerPluginOpts) delete opts.compilerPluginOpts;
    opts.plugins.unshift(compilerPlugin);
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
}

module.exports = compilerShim
