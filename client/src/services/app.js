import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/category/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/price/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAcreages = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/acreage/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
