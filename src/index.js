import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SlidePuzzleController from './SlidePuzzleController';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SlidePuzzleController />, document.getElementById('root'));
registerServiceWorker();
