import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './authActionTypes';

const session = JSON.parse(localStorage.getItem('sessionData'));

const initialState = {
    bearer: session ? session.bearer : undefined,
    authenticated: session && session.bearer ? !!session.bearer : false,
    username: session ? session.username : undefined,
    loginFailed: false
};

export default (state = initialState, { type, payload }) => {
    console.log('type', type);

    switch (type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                bearer: payload.bearer,
                username: payload.username,
                loginFailed: false
            });

        case LOGIN_FAILED: {
            return Object.assign({}, state, {
                authenticated: false,
                loginFailed: true
            });
        }

        case LOGOUT: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: undefined,
                username: undefined,
                loginFailed: false
            });
        }

        default:
            return state;
    }
};
