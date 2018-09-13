var plugins = {};

function addPlugin(name, pluginEntry) {
  plugins[name] = pluginEntry;
}

addPlugin(
  "transform-react-jsx",
  require("./flat/node_modules/babel-plugin-transform-react-jsx")
);

addPlugin(
  "transform-class-properties",
  require("./flat/node_modules/babel-plugin-transform-class-properties")
);

addPlugin(
  "transform-decorators-legacy",
  require("./flat/node_modules/babel-plugin-transform-decorators-legacy").default
);

addPlugin(
  "transform-flow-strip-types",
  require("./flat/node_modules/babel-plugin-transform-flow-strip-types")
);

module.exports = plugins;
