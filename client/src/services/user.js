import axiosConfig from "../axiosConfig";

export const apiGetCurrentUser = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/user/current",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiUpdateUser = async (payload) => {
  try {
    const response = await axiosConfig({
      method: "put",
      url: "/api/v1/user/update",
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
