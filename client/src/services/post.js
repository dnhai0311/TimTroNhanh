import axiosConfig from "../axiosConfig";

export const apiGetAllPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPosts = (page, conditions, sortType, sortOrder) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/get`,
        params: { page, conditions, sortType, sortOrder },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
