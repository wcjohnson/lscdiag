var defaultParserOpts = {
  sourceType: "module",
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  plugins: ["lightscript", "flow", "jsx", "asyncFunctions", "asyncGenerators", "classConstructorCall", "classProperties", "decorators", "doExpressions", "exponentiationOperator", "exportExtensions", "functionBind", "functionSent", "objectRestSpread", "trailingFunctionCommas", "dynamicImport"]
}

function parserShim(parser) {
  return function parse(code, opts) {
    var ast;

    if (!opts) opts = defaultParserOpts;

    try {
      ast = parser.parse(code, opts);
    } catch (err) {
      return {
        lsc: code,
        errorMessage: err.message,
        errorMarker: err.loc
      };
    }

    return { lsc: code, ast: ast };
  }
}

module.exports = parserShim;
