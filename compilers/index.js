var compilers = {};

function addCompiler(name, module) {
  compilers[name] = {
    compile: module.compile,
    parse: module.parse,
    metadata: module.metadata
  }
}

addCompiler(
  "lightscript@0.5.9",
  require("./lightscript_0_5_9/compiler.js")
);

addCompiler(
  "oigroup@2.3.2",
  require("./oigroup_lightscript_2_3_2/compiler.js")
);

addCompiler(
  "oigroup@3.0.0",
  require("./oigroup_lightscript_3_0_0/compiler.js")
);

addCompiler(
  "oigroup@3.1.1",
  require("./oigroup_lightscript_3_1_1/compiler.js")
);

addCompiler(
  "oigroup@4.0.0-alpha",
  require("./oigroup_lightscript_4_0_0/compiler.js")
);

compilers["latest"] = compilers["oigroup@3.1.1"];

module.exports = compilers;
