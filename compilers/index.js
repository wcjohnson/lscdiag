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
  "oigroup@1.1.0",
  require("./oigroup_lightscript_1_1_0/compiler.js")
);
addCompiler(
  "oigroup@2.0.0-alpha.1",
  require("./oigroup_lightscript_2_0_0_alpha_1/compiler.js")
);
addCompiler(
  "oigroup@2.0.0-alpha.2",
  require("./oigroup_lightscript_2_0_0_alpha_2/compiler.js")
);
addCompiler(
  "oigroup@2.0.0-alpha.3",
  require("./oigroup_lightscript_2_0_0_alpha_3/compiler.js")
);

compilers["latest"] = compilers["oigroup@1.1.0"]

module.exports = compilers;
