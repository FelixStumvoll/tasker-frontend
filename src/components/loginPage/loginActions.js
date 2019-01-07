import axios from 'axios';
import { push } from 'connected-react-router';
import { apiUrl } from '../../config';
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './loginActionTypes';

export const login = (username, password) => async dispatch => {
    let response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password
    });

    if (response.status === 200) {
        let { data } = response;
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { bearer: data.bearer, user: data.username }
        });
        dispatch(push('/task'));
    } else {
        dispatch({ type: LOGIN_FAILED });
    }
};

export const logout = () => ({ type: LOGOUT });
