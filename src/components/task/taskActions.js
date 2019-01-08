import {
    TASK_UPDATE,
    TASK_CREATE,
    TASK_START_EDIT,
    TASK_END_EDIT
} from './taskActionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';
import { apiUrl } from '../../config';

export const createTask = () => async dispatch => {
    let response = await axios.post(`${apiUrl}/task`);

    if (response.status === 201) {
        dispatch({
            type: TASK_CREATE,
            payload: { task: response.data.task }
        });
        dispatch(push(`/task/${response.data.task._id}`));
    }
};

export const updateTask = task => async dispatch => {
    try {
        let response = await axios.put(`${apiUrl}/task/${task._id}`, { task });

        if (response.status === 200) {
            dispatch({ type: TASK_UPDATE, payload: { task } });
        }
    } catch (ex) {}
};

export const updateTaskTags = (taskId, tags) => (dispatch, getState) => {
    let task = getState().tasks.find(task => task._id === taskId);
    if (!task) return;
    task.tags = tags;

    dispatch(updateTask(task));
};