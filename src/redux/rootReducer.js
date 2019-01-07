import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import taskReducer from '../components/task/taskReducer';
import loginReducer from '../components/loginPage/loginReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        tasks: taskReducer,
        login: loginReducer
    });
