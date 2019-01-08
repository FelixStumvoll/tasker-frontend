import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import taskReducer from '../components/task/taskReducer';
import authReducer from '../components/loginPage/authReducer';
import fetchReducer from '../components/task/fetchReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        tasks: taskReducer,
        auth: authReducer,
        fetch: fetchReducer
    });
