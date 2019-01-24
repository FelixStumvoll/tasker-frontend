import { FETCH_START, FETCH_FINISHED } from './fetchActionTypes';

const initialState = {
    loading: false,
    fetchType: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_START:
            return Object.assign({}, state, { loading: true }, payload);
        case FETCH_FINISHED:
            return Object.assign({}, state, {
                loading: false,
                fetchType: null
            });
        default:
            return state;
    }
};
