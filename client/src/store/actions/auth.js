import actionTypes from './actionTypes';
import { apiLogin, apiRegister, apiVerifyTokenFromFirebase } from '../../services/auth';

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token,
            });
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null,
        });
    }
};

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token,
                isAdmin: response.data.isAdmin,
            });
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null,
        });
    }
};

export const verifyTokenFromFirebase = (idToken) => async (dispatch) => {
    try {
        const response = await apiVerifyTokenFromFirebase(idToken);

        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.VERIFY_TOKEN_FROM_FIREBASE_SUCCESS,
                data: response.data.token,
            });
        } else {
            dispatch({
                type: actionTypes.VERIFY_TOKEN_FROM_FIREBASE_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.VERIFY_TOKEN_FROM_FIREBASE_FAIL,
            data: null,
        });
    }
};

export const setMsg = () => ({
    type: actionTypes.SET_MSG,
});

export const logout = () => ({
    type: actionTypes.LOGOUT,
});
