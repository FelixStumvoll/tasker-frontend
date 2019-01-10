import {
    TASK_CREATE,
    TASK_REMOVE,
    TASK_UPDATE,
    TASK_FETCH_FINISHED
} from './taskActionTypes';

const initialState = [];

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case TASK_UPDATE:
            let updateIndex = getTaskById(payload.task._id, state);

            return [
                ...state.slice(0, updateIndex),
                Object.assign({}, payload.task),
                ...state.slice(updateIndex + 1)
            ];

        case TASK_CREATE:
            return [Object.assign({}, payload.task), ...state];

        case TASK_REMOVE:
            return [...state.filter(task => task._id !== payload.task._id)];
        case TASK_FETCH_FINISHED:
            return [...payload.tasks];
        default:
            return state;
    }
};

const getTaskById = (id, state) => {
    return state.findIndex(item => item._id === id);
};
