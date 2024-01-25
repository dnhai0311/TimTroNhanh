import actionTypes from "./actionTypes";
import {
  apiGetPrices,
  apiGetAcreages,
  apiGetCategories,
} from "../../services/app";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apiGetCategories();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        msg: response.data.msg,
        categories: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORIES,
      categories: null,
    });
  }
};

export const getPrices = () => async (dispatch) => {
  try {
    const response = await apiGetPrices();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PRICES,
        prices: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRICES,
        msg: response.data.msg,
        prices: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRICES,
      prices: null,
      msg: error,
    });
  }
};
export const getAcreages = () => async (dispatch) => {
  try {
    const response = await apiGetAcreages();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ACREAGES,
        acreages: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ACREAGES,
        msg: response.data.msg,
        acreages: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ACREAGES,
      acreages: null,
      msg: error,
    });
  }
};
