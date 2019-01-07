import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './loginActionTypes';

const initialState = { bearer: undefined, authenticated: false, user: {} };

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                bearer: payload.bearer
            });

        case LOGIN_FAILED: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: undefined
            });
        }

        case LOGOUT: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: undefined
            });
        }

        default:
            return state;
    }
};
