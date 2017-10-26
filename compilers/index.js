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
  "oigroup@3.1.0-alpha.0",
  require("./oigroup_lightscript_3_1_0_0/compiler.js")
);

addCompiler(
  "oigroup@3.1.0-alpha.1",
  require("./oigroup_lightscript_3_1_0_1/compiler.js")
);

compilers["latest"] = compilers["oigroup@3.0.0"];
compilers["oigroup@3.1.0-pre"] = compilers["oigroup@3.1.0-alpha.0"];

module.exports = compilers;
