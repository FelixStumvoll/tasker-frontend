import axios from 'axios';
import { push } from 'connected-react-router';
import apiUrl from '../../../common/apiUrl';
import { LOGIN, LOGOUT } from './authActionTypes';
import { fetchTasks } from '../taskReducer/taskActions';
import {
    FETCH_START,
    FETCH_FINISHED,
    FETCH_FAILED
} from '../fetchReducer/fetchActionTypes';
import routes from '../../../common/routes';
import { showMessage } from '../notificationReducer/notificationActions';
import notificationType from '../../../common/notificationType';
import errorMessages from '../../../common/errorMessages';

export const login = (username, password) => async dispatch => {
    try {
        dispatch({ type: FETCH_START });
        let response = await axios.post(`${apiUrl}/auth/login`, {
            username,
            password
        });

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
    } catch (ex) {
        let errMsg = ex.response
            ? errorMessages.loginFailed
            : errorMessages.loginFailedNoConnection;

        dispatch(showMessage(notificationType.negative, errMsg));
        dispatch({ type: FETCH_FAILED });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('sessionData');
    dispatch(push(routes.login));
    dispatch({ type: LOGOUT });
};
