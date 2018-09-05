import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const AsyncMode = React.unstable_AsyncMode;

ReactDOM.render(<AsyncMode>
    <App />
  </AsyncMode>, document.getElementById('root'));
registerServiceWorker();
