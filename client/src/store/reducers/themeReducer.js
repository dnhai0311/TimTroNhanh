import actionTypes from '../actions/actionTypes';

const themeReducer = (state = { isDarkMode: false }, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_THEME:
            return { ...state, isDarkMode: !state.isDarkMode };
        default:
            return state;
    }
};

export default themeReducer;
