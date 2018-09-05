import { HIDE_MODAL, SHOW_MODAL } from './modalActionTypes';

const initialState = {};

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case SHOW_MODAL:
            let { modalType } = payload;
            return { ...state, modalType };
        case HIDE_MODAL:
            return null;

        default:
            return state;
    }
};
