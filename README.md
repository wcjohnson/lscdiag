# lscdiag

A static React web app for diagnosing the output of the [LightScript](http://www.lightscript.org/) compiler suite.

Try it live:

[https://wcjohnson.github.io/lscdiag](https://wcjohnson.github.io/lscdiag)

Features:

- Live compilation
- AST visualization
- Deep permalinks, including UI state and selections
- Selectable compiler versions, including experimental versions
- Selectable Babel plugins

Building:

- `npm install`
- `npm install` in each of the `compilers/*` directories, as well as the `plugins/` directory (no automated build step for this yet, sorry!)
- `npm start` for live development
- `npm run build` to generate a static build

>This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
