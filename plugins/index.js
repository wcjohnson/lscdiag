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

module.exports = plugins;
