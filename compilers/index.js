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
  "oigroup@1.1.0",
  require("./oigroup_lightscript_1_1_0/compiler.js")
);

addCompiler(
  "oigroup@2.0.0-rc.1",
  require("./oigroup_lightscript_2_0_0_rc_1/compiler.js")
);

compilers["latest"] = compilers["oigroup@2.0.0-rc.1"]

module.exports = compilers;
