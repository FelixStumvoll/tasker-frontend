import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const initialState = {};

let middlewares = [thunk];
let middlewareEnhancer = applyMiddleware(...middlewares);
let storeEnhancers = [middlewareEnhancer];
let composedEnhancers = composeWithDevTools(...storeEnhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
