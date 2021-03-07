import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch } from 'react-router-dom'
import Form2 from 'screens/Form2';import reportWebVitals from './reportWebVitals';
import App from 'App';
import configureStore from 'reducers/store1';
import { Provider } from 'react-redux'
import { statePrototype } from 'utils/constants';

const initialState = statePrototype;
let store = configureStore(initialState)

const routing = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <BrowserRouter exact path="/" component={App}>
          <App />
        </BrowserRouter>
        <BrowserRouter path="/Form2" component={Form2}>
          <Form2 />
        </BrowserRouter>
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
