import {
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_SUCCESS,
    CLEAR_ERRORS,
} from '../constants/categoryConstants';

export const categoryReducer = (state = { reviews: [] }, { type, payload }) => {
    switch (type) {
        case ALL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                reviews: payload,
            };
        case ALL_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newCategoryReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_CATEGORY_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case NEW_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_CATEGORY_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            };
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case UPDATE_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const categoryDeleteReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                loading: false,
                isDeleted: payload,
            };
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case DELETE_CATEGORY_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
