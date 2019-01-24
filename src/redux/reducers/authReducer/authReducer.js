import { LOGIN, LOGOUT } from './authActionTypes';

const session = JSON.parse(localStorage.getItem('sessionData'));

const initialState = {
    bearer: session ? session.bearer : null,
    authenticated: session && session.bearer ? !!session.bearer : false,
    username: session ? session.username : null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
            return Object.assign(
                {},
                state,
                {
                    authenticated: true
                },
                payload
            );

        case LOGOUT: {
            return Object.assign({}, state, {
                authenticated: false,
                bearer: null,
                username: null
            });
        }

        default:
            return state;
    }
};
