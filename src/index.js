import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

