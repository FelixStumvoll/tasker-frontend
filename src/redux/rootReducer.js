import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import taskReducer from './reducers/taskReducer/taskReducer';
import authReducer from './reducers/authReducer/authReducer';
import fetchReducer from './reducers/fetchReducer/fetchReducer';
import utilityReducer from './reducers/utilityReducer/utilityReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        tasks: taskReducer,
        auth: authReducer,
        fetch: fetchReducer,
        utility: utilityReducer
    });
