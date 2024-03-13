import actionTypes from '../actions/actionTypes';

const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: 'Đăng ký thành công',
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: 'Đăng nhập thành công',
                isAdmin: action.isAdmin,
            };
        case actionTypes.VERIFY_TOKEN_FROM_FIREBASE_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                token: action.data,
                msg: 'Đặt lại mật khẩu',
            };
        case actionTypes.VERIFY_TOKEN_FROM_FIREBASE_FAIL:
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                update: !state.update,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: '',
                isAdmin: false,
            };
        case actionTypes.SET_MSG:
            return {
                ...state,
                msg: '',
            };

        default:
            return state;
    }
};

export default authReducer;
