import { SEARCHTERM_CHANGE } from './searchtermActionTypes';

const initialState = {
    searchValue: ''
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SEARCHTERM_CHANGE:
            return Object.assign({}, state, {
                searchValue: payload.searchterm
            });
        default:
            return state;
    }
};
