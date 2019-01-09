import { TASKS_LOADED, SEARCHTERM_CHANGE } from './utilityActionTypes';

const initialState = {
    tasksLoaded: false,
    searchTerm: ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TASKS_LOADED:
            return Object.assign({}, state, { tasksLoaded: true });
        case SEARCHTERM_CHANGE:
            return Object.assign({}, state, { searchTerm: payload.searchTerm });
        default:
            return state;
    }
};
