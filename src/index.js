import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import configureStore from 'reducers/store1';
import { Provider } from 'react-redux'
import { statePrototype } from 'utils/constants';
import App from 'App';
import './index.css';

const initialState = statePrototype;
let store = configureStore(initialState)

const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
