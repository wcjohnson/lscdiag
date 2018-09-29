// Based loosely on babel-preset-react-app

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
var isEnvDevelopment = env === 'development';
var isEnvProduction = env === 'production';
var isEnvTest = env === 'test';

// Babel-preset-env options
let envOpts;
if (isEnvTest) {
  envOpts = {
    targets: { node: 'current' }
  }
} else {
  envOpts = {
    targets: { ie: 9 },
    ignoreBrowserslistConfig: true,
    useBuiltIns: false,
    modules: false
  }
}

module.exports = {
  presets: [
    ['@lightscript',
      {
        env: envOpts
      }
    ],
    ['@babel/preset-react',
      {
        development: isEnvDevelopment || isEnvTest,
        useBuiltIns: true
      }
    ]
  ].filter(Boolean),
  plugins: [
    // Polyfill Babel runtime
    ['@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        // Use modules in dev or prod under Webpack
        useESModules: isEnvDevelopment || isEnvProduction
      }
    ],
    // Strip prop types in production
    isEnvProduction && ['babel-plugin-transform-react-remove-prop-types',
      { removeImport: true }
    ],
    // Allow the use of generators
    !isEnvTest && ['@babel/plugin-transform-regenerator',
      { async: false }
    ]
  ].filter(Boolean)
}
