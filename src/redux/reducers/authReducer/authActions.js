import axios from 'axios';
import { push } from 'connected-react-router';
import { apiUrl } from '../../../config';
import { LOGIN, LOGOUT } from './authActionTypes';
import { fetchTasks } from '../taskReducer/taskActions';
import {
    FETCH_START,
    FETCH_FINISHED,
    FETCH_FAILED
} from '../fetchReducer/fetchActionTypes';

export const login = (username, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_START });
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
            dispatch({ type: FETCH_FINISHED });
            dispatch({
                type: LOGIN,
                payload: { bearer: data.bearer, username: data.user }
            });

            dispatch(fetchTasks());
        } else {
            throw response.status;
        }
    } catch (ex) {
        dispatch({ type: FETCH_FAILED });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('sessionData');
    dispatch(push('/login'));
    dispatch({ type: LOGOUT });
};
