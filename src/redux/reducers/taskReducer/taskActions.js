import axios from 'axios';
import debounce from 'debounce-promise';
import { push } from 'connected-react-router';
import axiosConfig from '../../../common/axiosConfig';
import apiUrl from '../../../common/apiUrl';
import { showMessage } from '../notificationReducer/notificationActions';
import { TASKS_LOADED } from '../utilityReducer/utilityActionTypes';
import notificationType from '../../../common/notificationType';
import {
    TASK_UPDATE,
    TASK_CREATE,
    TASK_FETCH_FINISHED,
    TASK_REMOVE
} from './taskActionTypes';
import {
    FETCH_START,
    FETCH_FAILED,
    FETCH_FINISHED
} from '../fetchReducer/fetchActionTypes';
import errorMessages from '../../../common/errorMessages';
import routes from '../../../common/routes';

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
            dispatch(push(`${routes.task}/${response.data.task._id}`));
        }
    } catch (ex) {
        dispatch(
            showMessage(
                notificationType.negative,
                errorMessages.taskCreationFailed
            )
        );
    }
};

export const removeTask = task => async (dispatch, getState) => {
    try {
        let { auth } = getState();

        await axios.delete(
            `${apiUrl}/task/${task._id}`,
            axiosConfig(auth.bearer)
        );

        dispatch({ type: TASK_REMOVE, payload: { task } });
        dispatch(push(`${routes.task}`));
    } catch (ex) {
        dispatch(
            showMessage(
                notificationType.negative,
                errorMessages.taskDeleteFailed
            )
        );
    }
};

const updateTaskFunction = async (task, dispatch, getState) => {
    try {
        dispatch({ type: TASK_UPDATE, payload: { task } });
        let { auth } = getState();
        await axios.put(
            `${apiUrl}/task/${task._id}`,
            { task },
            axiosConfig(auth.bearer)
        );
    } catch (ex) {
        dispatch(
            showMessage(
                notificationType.negative,
                errorMessages.taskUpdateFailed
            )
        );
    }
};

const debouncedUpdateTask = debounce(async (task, dispatch, getState) => {
    await updateTaskFunction(task, dispatch, getState);
}, 500);

export const updateTask = (task, immediate = true) => async (
    dispatch,
    getState
) => {
    if (immediate) {
        await updateTaskFunction(task, dispatch, getState);
    } else {
        await debouncedUpdateTask(task, dispatch, getState);
    }
};

export const updateTaskText = (taskId, text) => (dispatch, getState) => {
    let task = getState().tasks.find(task => task._id === taskId);
    if (!task) return;
    task.text = text;

    dispatch(updateTask(task, false));
};

export const updateTaskTags = (taskId, tags) => (dispatch, getState) => {
    let task = getState().tasks.find(task => task._id === taskId);
    if (!task) return;
    task.tags = tags;

    dispatch(updateTask(task));
};

export const fetchTasks = () => async (dispatch, getState) => {
    try {
        let { auth } = getState();
        dispatch({ type: FETCH_START });

        let response = await axios.get(
            `${apiUrl}/task`,
            axiosConfig(auth.bearer)
        );

        dispatch({
            type: TASK_FETCH_FINISHED,
            payload: { tasks: response.data }
        });
        dispatch({ type: TASKS_LOADED });
        dispatch(push(`${routes.task}`));
        dispatch({ type: FETCH_FINISHED });
    } catch (ex) {
        dispatch(
            showMessage(
                notificationType.negative,
                errorMessages.taskFetchFailed
            )
        );
        dispatch({ type: FETCH_FAILED });
    }
};
