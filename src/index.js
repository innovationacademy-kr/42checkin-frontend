import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { LoginProvider } from './contexts/LoginContext';
import configureStore from './redux/configureStore';

import reportWebVitals from './reportWebVitals';
import './index.css';
import './fonts/Futura.ttc';

ReactDOM.render(
  <Provider store={configureStore}>
    <LoginProvider>
      <App />
    </LoginProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
