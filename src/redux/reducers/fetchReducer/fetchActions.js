import { FETCH_START, FETCH_FINISHED, FETCH_FAILED } from './fetchActionTypes';

export const fetchStart = () => ({
    type: FETCH_START
});

export const fetchFinished = () => ({
    type: FETCH_FINISHED
});

export const fetchFailed = () => ({
    type: FETCH_FAILED
});
