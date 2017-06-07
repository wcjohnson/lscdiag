import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
unregister();
