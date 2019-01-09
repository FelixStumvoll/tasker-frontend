import axios from 'axios';
import { push } from 'connected-react-router';
import { apiUrl } from '../../../config';
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './authActionTypes';
import { fetchTasks } from '../taskReducer/taskActions';

export const login = (username, password) => async (dispatch, getState) => {
    try {
        let response = await axios.post(`${apiUrl}/auth/login`, {
            username,
            password
        });

        if (response.status === 200) {
            let { data } = response;
            localStorage.setItem(
                'sessionData',
                JSON.stringify({
                    bearer: data.bearer,
                    username: data.user
                })
            );
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { bearer: data.bearer, username: data.user }
            });

            dispatch(fetchTasks());
        } else {
            dispatch({ type: LOGIN_FAILED });
        }
    } catch (ex) {
        dispatch({ type: LOGIN_FAILED });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('sessionData');
    dispatch(push('/login'));
    dispatch({ type: LOGOUT });
};
