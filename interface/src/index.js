import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware} from 'redux';
import {reducer} from './reducers';
import {BrowserRouter} from 'react-router-dom';


const store = createStore(reducer, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
