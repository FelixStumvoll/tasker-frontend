import { TASKS_LOADED, SEARCHTERM_CHANGE } from './utilityActionTypes';
import debounce from 'debounce-promise';

export const tasksFetched = () => ({
    type: TASKS_LOADED
});

const debouncedChangeSearchterm = debounce((searchTerm, dispatch) => {
    let correctedSearchTerm = searchTerm.trim();
    dispatch({
        type: SEARCHTERM_CHANGE,
        payload: { searchTerm: correctedSearchTerm }
    });
}, 250);

export const changeSearchterm = searchTerm => dispatch => {
    debouncedChangeSearchterm(searchTerm, dispatch);
};
