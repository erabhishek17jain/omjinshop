import { REMOVE_PATH, SET_PATH } from '../constants/pathConstants';

export const pathReducer = (state = { pathItems: [] }, { type, payload }) => {
    switch (type) {
        case SET_PATH:
            return {
                ...state,
                pathItems: payload.path,
            };
        case REMOVE_PATH:
            return {
                ...state,
                pathItems: state.pathItems.filter((el) => el.title !== payload.path.title),
            };
        default:
            return state;
    }
};
