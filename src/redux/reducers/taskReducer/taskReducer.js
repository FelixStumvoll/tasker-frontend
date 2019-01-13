import {
    TASK_CREATE,
    TASK_REMOVE,
    TASK_UPDATE,
    TASK_FETCH_FINISHED
} from './taskActionTypes';

const initialState = { tasksLoaded: false, taskList: [] };

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case TASK_UPDATE:
            let updateIndex = getTaskById(payload.task._id, state);

            return Object.assign({}, state, {
                taskList: [
                    ...state.slice(0, updateIndex),
                    Object.assign({}, payload.task),
                    ...state.slice(updateIndex + 1)
                ]
            });

        case TASK_CREATE:
            return Object.assign({}, state, {
                taskList: [Object.assign({}, payload.task), ...state.taskList]
            });

        case TASK_REMOVE:
            return Object.assign({}, state, {
                taskList: [
                    ...state.taskList.filter(
                        task => task._id !== payload.task._id
                    )
                ]
            });

        case TASK_FETCH_FINISHED:
            return Object.assign(
                {},
                { tasksLoaded: true, taskList: [...payload.tasks] }
            );
        default:
            return state;
    }
};

const getTaskById = (id, state) => {
    return state.findIndex(item => item._id === id);
};
