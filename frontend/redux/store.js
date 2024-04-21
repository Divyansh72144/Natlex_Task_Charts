import { createStore,compose } from 'redux';
import chartDataReducer from './reducer';

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(chartDataReducer, compose(
  ReactReduxDevTools)
);

export default store;