import uuid from 'uuid/v4';
import { SHOW_MESSAGE, HIDE_MESSAGE } from './notificationActionTypes';

export const showMessage = (notificationType, message, delay = 7000) => ({
    type: SHOW_MESSAGE,
    payload: { notificationType, message, delay, id: uuid() }
});

export const hideMessage = () => ({
    type: HIDE_MESSAGE
});
