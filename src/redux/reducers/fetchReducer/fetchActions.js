import { FETCH_START, FETCH_FINISHED } from './fetchActionTypes';

export const fetchStart = fetchType => ({
    type: FETCH_START,
    payload: { fetchType }
});

export const fetchFinished = () => ({
    type: FETCH_FINISHED
});
