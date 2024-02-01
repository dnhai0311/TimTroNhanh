import axiosConfig from "../axiosConfig";
import axios from "axios";

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

export const apiUploadAvatar = (avatar) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: avatar,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateUser = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/user/update",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
