import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"
import "./style.css"

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </ Router>
  </Provider>,
  document.getElementById('root')
);

