import { TASKS_LOADED } from './utilityActionTypes';

const initialState = {
    tasksLoaded: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TASKS_LOADED:
            return Object.assign({}, { tasksLoaded: true });

        default:
            return state;
    }
};
