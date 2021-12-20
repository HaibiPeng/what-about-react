import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider, createStore, combineReducers } from "./redux-lib";
import counterReducer from "./counterStore";

const rootReducer = combineReducers({
  counter: counterReducer
});
const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

