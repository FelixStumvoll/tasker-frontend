import axios from 'axios';
import debounce from 'debounce-promise';
import apiUrl from '../../../common/apiUrl';
import { showMessage } from '../../../redux/reducers/notificationReducer/notificationActions';
import notificationTypes from '../../../common/notificationType';

export default debounce(async values => {
    let { username } = values;

    if (username) {
        let response = await axios
            .post(`${apiUrl}/auth/usernameAvailable`, {
                username: username
            })
            .catch(err => {
                showMessage(
                    notificationTypes.negative,
                    `Could not reach Server\nCan't check if username is valid`
                );
            });

        if (!response.data) {
            // eslint-disable-next-line
            throw { username: 'username is already taken' };
        }
    }
}, 250);
