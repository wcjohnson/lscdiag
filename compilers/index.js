var compilers = {};

function addCompiler(name, module) {
  compilers[name] = {
    compile: module.compile,
    parse: module.parse
  }
}

addCompiler(
  "lightscript@0.5.9",
  require("./lightscript_0_5_9/compiler.js")
);
addCompiler(
  "oigroup@1.0.4",
  require("./oigroup_lightscript_1_0_4/compiler.js")
);
addCompiler(
  "oigroup@2.0.0-alpha.1",
  require("./oigroup_lightscript_2_0_0_alpha_1/compiler.js")
);

compilers["latest"] = compilers["oigroup@1.0.4"]

module.exports = compilers;
