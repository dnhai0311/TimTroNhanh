import actionTypes from "./actionTypes";
import { apiGetAllPosts, apiGetPosts } from "../../services/post";

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await apiGetAllPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_POSTS,
      posts: null,
    });
  }
};

export const getPosts =
  (
    page,
    conditions,
    sortType,
    sortOrder,
    districtId,
    provinceId,
    minPrice,
    maxPrice,
    minAcreage,
    maxAcreage
  ) =>
  async (dispatch) => {
    try {
      const response = await apiGetPosts(
        page,
        conditions,
        sortType,
        sortOrder,
        districtId,
        provinceId,
        minPrice,
        maxPrice,
        minAcreage,
        maxAcreage
      );
      if (response?.data.err === 0) {
        dispatch({
          type: actionTypes.GET_POSTS,
          posts: response.data.response?.rows,
          total: response.data.response?.count,
        });
      } else {
        dispatch({
          type: actionTypes.GET_POSTS,
          msg: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: null,
      });
    }
  };
