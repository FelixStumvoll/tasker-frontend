import { FETCH_START, FETCH_FINISHED, FETCH_FAILED } from './fetchActionTypes';

const initialState = {
    loading: false,
    success: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_START:
            return Object.assign({}, state, { loading: true, success: false });
        case FETCH_FINISHED:
            return Object.assign({}, state, { loading: false, success: true });
        case FETCH_FAILED:
            return Object.assign({}, state, { loading: false, success: false });

        default:
            return state;
    }
};
