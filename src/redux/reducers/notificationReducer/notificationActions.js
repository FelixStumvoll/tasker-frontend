import { SHOW_MESSAGE, HIDE_MESSAGE } from './notificationActionTypes';

export const showMessage = (notificationType, message, delay = 7000) => ({
    type: SHOW_MESSAGE,
    payload: { notificationType, message, delay }
});

export const hideMessage = () => ({
    type: HIDE_MESSAGE
});
