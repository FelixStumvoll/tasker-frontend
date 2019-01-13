import { SHOW_MESSAGE, HIDE_MESSAGE } from './notificationActionTypes';

const notificationStyles = {
    positive: {
        border: '#1a9612',
        background: '#8bd18a',
        shadow: 'rgba(26,150,18,0.5);'
    },
    negative: {
        border: '#D9312F',
        background: '#ebb7b7',
        shadow: 'rgba(217, 49, 47, 0.5)'
    },
    info: {}
};

const initialState = {
    show: false,
    notificationType: undefined,
    message: '',
    style: undefined,
    delay: 0,
    id: undefined
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_MESSAGE:
            return Object.assign({}, state, payload, {
                show: true,
                style: notificationStyles[payload.notificationType]
            });

        case HIDE_MESSAGE:
            return Object.assign({}, state, { show: false });
        default:
            return state;
    }
};
