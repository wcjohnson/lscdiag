var plugins = {};

function addPlugin(name, pluginEntry) {
  plugins[name] = pluginEntry;
}

addPlugin(
  "partial-application@1.6.0-alpha.1",
  require("./flat/node_modules/babel-plugin-partial-application")
);

addPlugin(
  "partial-application@1.6.0-alpha.2",
  require("./partial-application_1_6_0_alpha_2/node_modules/babel-plugin-partial-application")
);

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
