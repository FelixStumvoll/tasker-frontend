import {
    TASK_UPDATE,
    TASK_CREATE,
    TASK_FETCH_FINISHED,
    TASK_REMOVE
} from './taskActionTypes';
import axios from 'axios';
import { push } from 'connected-react-router';
import { apiUrl } from '../../../config';
import {
    FETCH_START,
    FETCH_FAILED,
    FETCH_FINISHED
} from '../fetchReducer/fetchActionTypes';
import axiosConfig from '../../../utils/axiosConfig';
import { TASKS_LOADED } from '../utilityReducer/utilityActionTypes';

export const createTask = () => async (dispatch, getState) => {
    try {
        let { auth } = getState();
        let response = await axios.post(
            `${apiUrl}/task`,
            {},
            axiosConfig(auth.bearer)
        );

        if (response.status === 201) {
            dispatch({
                type: TASK_CREATE,
                payload: { task: response.data.task }
            });
            dispatch(push(`/task/${response.data.task._id}`));
        }
    } catch (ex) {}
};

export const removeTask = task => async (dispatch, getState) => {
    try {
        let { auth } = getState();

        let response = await axios.delete(
            `${apiUrl}/task/${task._id}`,
            axiosConfig(auth.bearer)
        );

        if (response.status === 200) {
            dispatch({ type: TASK_REMOVE, payload: { task } });
            dispatch(push('/task'));
        }
    } catch (ex) {}
};

export const updateTask = task => async (dispatch, getState) => {
    try {
        let { auth } = getState();
        let response = await axios.put(
            `${apiUrl}/task/${task._id}`,
            { task },
            axiosConfig(auth.bearer)
        );

        if (response.status === 200) {
            dispatch({ type: TASK_UPDATE, payload: { task } });
        }
    } catch (ex) {}
};

export const updateTaskTags = (taskId, tags) => (dispatch, getState) => {
    try {
        let task = getState().tasks.find(task => task._id === taskId);
        if (!task) return;
        task.tags = tags;

        dispatch(updateTask(task));
    } catch (ex) {}
};

export const fetchTasks = () => async (dispatch, getState) => {
    let { auth } = getState();
    dispatch({ type: FETCH_START });

    try {
        let response = await axios.get(
            `${apiUrl}/task`,
            axiosConfig(auth.bearer)
        );

        if (response.status !== 200) throw response.status;

        dispatch({
            type: TASK_FETCH_FINISHED,
            payload: { tasks: response.data }
        });
        dispatch({ type: TASKS_LOADED });
        dispatch(push('/task'));
        dispatch({ type: FETCH_FINISHED });
    } catch (ex) {
        dispatch({ type: FETCH_FAILED });
    }
};
