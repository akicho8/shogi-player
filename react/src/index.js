import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import CalculatorContainer from './CalculatorContainer';
import registerServiceWorker from './registerServiceWorker';
// import FormDemo1 from './FormDemo1';
// import Example0010 from './Example0010';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './reducer';

import 'bulma/css/bulma.css'

// const store = createStore(reducer);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
