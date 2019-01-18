import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import taskReducer from './reducers/taskReducer/taskReducer';
import authReducer from './reducers/authReducer/authReducer';
import fetchReducer from './reducers/fetchReducer/fetchReducer';
import searchtermReducer from './reducers/searchtermReducer/searchtermReducer';
import notificationReducer from './reducers/notificationReducer/notificationReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        tasks: taskReducer,
        auth: authReducer,
        fetch: fetchReducer,
        searchterm: searchtermReducer,
        notification: notificationReducer
    });
