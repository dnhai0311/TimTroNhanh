import axiosConfig from "../axiosConfig";

export const apiGetCurrentUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/user/current",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
