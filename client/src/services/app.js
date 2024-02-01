import axiosConfig from "../axiosConfig";

export const apiGetCategories = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/category/all",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetPrices = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/price/all",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetAcreages = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/acreage/all",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetAllDistricts = async (provinceId) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/district/all",
      params: {
        provinceId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetDistricts = async (provinceId) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/district/get",
      params: {
        provinceId,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiAllGetProvinces = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/province/all",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetProvinces = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/province/get",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
