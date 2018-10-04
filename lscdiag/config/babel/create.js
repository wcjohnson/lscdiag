/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const path = require('path');

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === 'undefined') {
    value = defaultValue;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`Preset react-app: '${name}' option must be a boolean.`);
  }

  return value;
};

module.exports = function(api, opts, env) {
  if (!opts) {
    opts = {};
  }

  var isEnvDevelopment = env === 'development';
  var isEnvProduction = env === 'production';
  var isEnvTest = env === 'test';

  var isFlowEnabled = validateBoolOption('flow', opts.flow, true);
  var areHelpersEnabled = validateBoolOption('helpers', opts.helpers, true);
  var useAbsoluteRuntime = validateBoolOption(
    'absoluteRuntime',
    opts.absoluteRuntime,
    true
  );

  var absoluteRuntimePath = undefined;
  if (useAbsoluteRuntime) {
    absoluteRuntimePath = path.dirname(
      require.resolve('@babel/runtime/package.json')
    );
  }

  if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
    throw new Error(
      'Using `babel-preset-react-app` requires that you specify `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(env) +
        '.'
    );
  }

  // babel-preset-env options
  var envPresetOptions;
  if (isEnvTest) {
    // ES features necessary for user's Node version
    envPresetOptions = {
      targets: {
        node: 'current',
      },
    }
  } else if (isEnvProduction || isEnvDevelopment) {
    envPresetOptions = {
      // We want Create React App to be IE 9 compatible until React itself
      // no longer works with IE 9
      targets: {
        ie: 9,
      },
      // Users cannot override this behavior because this Babel
      // configuration is highly tuned for ES5 support
      ignoreBrowserslistConfig: true,
      // If users import all core-js they're probably not concerned with
      // bundle size. We shouldn't rely on magic to try and shrink it.
      useBuiltIns: false,
      // Do not transform modules to CJS
      modules: false,
    }
  }

  // Babel plugins
  var plugins = [
    // Experimental macros support. Will be documented after it's had some time
    // in the wild.
    require('babel-plugin-macros'),
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: areHelpersEnabled,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules: isEnvDevelopment || isEnvProduction,
        // Undocumented option that lets us encapsulate our runtime, ensuring
        // the correct version is used
        // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
        absoluteRuntime: absoluteRuntimePath,
      },
    ],
    isEnvProduction && [
      // Remove PropTypes from production build
      require('babel-plugin-transform-react-remove-prop-types').default,
      {
        removeImport: true,
      },
    ],
    // Adds syntax support for import()
    require('@babel/plugin-syntax-dynamic-import').default,
    isEnvTest &&
      // Transform dynamic import to require
      require('babel-plugin-transform-dynamic-import').default,
  ].filter(Boolean)

  return {
    presets: [
      [
        require('@babel/preset-react').default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true,
        },
      ],
      [
        require('@lightscript/babel-preset').default,
        {
          env: envPresetOptions,
          additionalPlugins: plugins
        }
      ]
    ].filter(Boolean),
  };
};
