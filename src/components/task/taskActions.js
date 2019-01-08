import { TASK_UPDATE, TASK_CREATE, TASKS_FETCHED } from './taskActionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';
import { apiUrl } from '../../config';
import {
    FETCH_START,
    FETCH_FAILED,
    FETCH_FINISHED
} from '../task/fetchActionTypes';

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

export const fetchTasks = () => async (dispatch, getState) => {
    let { auth } = getState();
    dispatch({ type: FETCH_START });
    console.log('start fetch');
    try {
        let response = await axios.get(`${apiUrl}/task`, {
            headers: { Authorization: `bearer ${auth.bearer}` }
        });

        if (response.status !== 200) throw response.status;

        dispatch({ type: TASKS_FETCHED, payload: { tasks: response.data } });
        dispatch(push('/task'));
        dispatch({ type: FETCH_FINISHED });
    } catch (ex) {
        dispatch({ type: FETCH_FAILED });
    }
};
