import { TASK_UPDATE, TASK_CREATE } from './taskActionTypes';

export const createTask = task => ({
    type: TASK_CREATE,
    payload: { task }
});

export const updateTask = task => ({
    type: TASK_UPDATE,
    payload: { task }
});
