import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const initialState = {};

export const history = createBrowserHistory();

let middlewares = [thunk, routerMiddleware(history)];
let middlewareEnhancer = applyMiddleware(...middlewares);
let storeEnhancers = [middlewareEnhancer];
let composedEnhancers = composeWithDevTools(...storeEnhancers);

export default createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
);
