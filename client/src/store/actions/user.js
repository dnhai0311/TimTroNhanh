import actionTypes from "./actionTypes";
import { apiGetCurrentUser } from "../../services/user";

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await apiGetCurrentUser();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        user: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        msg: response.data.msg,
      });
      dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT_USER,
      user: null,
    });
    dispatch({
      type: actionTypes.LOGOUT,
    });
  }
};
