import { TASK_UPDATE, TASK_CREATE, TASK_START_EDIT, TASK_END_EDIT } from './taskActionTypes';

export const createTask = task => ({
    type: TASK_CREATE,
    payload: { task }
});

export const updateTask = task => ({
    type: TASK_UPDATE,
    payload: { task }
});

export const startEditTask = id => ({
    type: TASK_START_EDIT,
    payload: { id }
});

export const endEditTask = id => ({
    type: TASK_END_EDIT,
    payload: {id}
});
