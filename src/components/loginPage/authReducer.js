import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './authActionTypes';

const bearer = localStorage.getItem('bearer');

const initialState = { bearer, authenticated: !!bearer };

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                bearer: payload.bearer,
                user: payload.user
            });

        case LOGIN_FAILED: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: undefined,
                user: undefined
            });
        }

        case LOGOUT: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: undefined,
                user: undefined
            });
        }

        default:
            return state;
    }
};
