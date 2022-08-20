import { SET_PATH } from '../constants/pathConstants';

// add path
export const setPath = (path) => async (dispatch, getState) => {
    dispatch({
        type: SET_PATH,
        payload: {
            path: path,
        },
    });
    // localStorage.setItem('pathItems', JSON.stringify(getState().path.pathItems));
};
