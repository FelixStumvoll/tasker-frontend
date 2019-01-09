import { LOGIN, LOGOUT } from './authActionTypes';

const session = JSON.parse(localStorage.getItem('sessionData'));

const initialState = {
    bearer: session ? session.bearer : undefined,
    authenticated: session && session.bearer ? !!session.bearer : false,
    username: session ? session.username : undefined
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return Object.assign({}, state, {
                authenticated: true,
                bearer: payload.bearer,
                username: payload.username
            });

        case LOGOUT: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: undefined,
                username: undefined
            });
        }

        default:
            return state;
    }
};
