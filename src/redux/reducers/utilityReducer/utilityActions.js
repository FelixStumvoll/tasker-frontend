import { TASKS_LOADED, SEARCHTERM_CHANGE } from './utilityActionTypes';

export const tasksFetched = () => ({
    type: TASKS_LOADED
});

export const changeSearchterm = searchTerm => dispatch => {
    let correctedSearchTerm;
    if (!new RegExp('\\S.*').test(searchTerm)) {
        correctedSearchTerm = '';
    } else {
        correctedSearchTerm = searchTerm;
    }
    dispatch({
        type: SEARCHTERM_CHANGE,
        payload: { searchTerm: correctedSearchTerm }
    });
};
