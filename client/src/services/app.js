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

export const apiGetAllDistricts = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/district/all",
        params: {
          provinceId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDistricts = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/district/get",
        params: {
          provinceId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAllGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
