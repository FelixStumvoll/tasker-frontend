import { combineReducers } from 'redux';

import taskReducer from '../components/task/taskReducer';

export default combineReducers({
    tasks: taskReducer
});
