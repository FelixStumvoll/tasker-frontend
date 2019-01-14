import { SEARCHTERM_CHANGE } from './searchtermActionTypes';
import debounce from 'debounce-promise';

const debouncedChangeSearchterm = debounce((searchterm, dispatch) => {
    let correctedSearchterm = searchterm.trim();
    dispatch({
        type: SEARCHTERM_CHANGE,
        payload: { searchterm: correctedSearchterm }
    });
}, 250);

export const changeSearchterm = searchterm => async dispatch => {
    await debouncedChangeSearchterm(searchterm, dispatch);
};
