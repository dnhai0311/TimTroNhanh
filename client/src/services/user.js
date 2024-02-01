import axiosConfig from "../axiosConfig";
import axios from "axios";

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

export const apiUploadAvatar = async (avatar) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      data: avatar,
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
