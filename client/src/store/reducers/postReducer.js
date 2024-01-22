import actionTypes from "../actions/actionTypes";

const initState = {
  post: [],
  msg: "",
  total: 0,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        total: action.total || 0,
      };
    default:
      return state;
  }
};

export default postReducer;
