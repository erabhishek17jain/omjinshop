import axios from 'axios';

import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

// Get Category Category ---ADMIN
export const getAllCategory = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });
        const { data } = await axios.get(`/api/v1/category`);

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data.category,
        });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAdminCategory = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/category`);

        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data.category,
        });
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New/Update Category
export const newCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CATEGORY_REQUEST });
        const config = { header: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put('/api/v1/admin/category/new', categoryData, config);

        dispatch({
            type: NEW_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Category ---ADMIN
export const updateCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        const config = { header: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`/api/v1/admin/category/${categoryId}`, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Category Category ---ADMIN
export const deleteCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/category?id=${categoryId}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};
