import axiosConfig from "../axiosConfig";

export const apiGetAllPosts = async () => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: "/api/v1/post/all",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const apiGetPosts = async (
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
) => {
  try {
    const response = await axiosConfig({
      method: "get",
      url: `/api/v1/post/get`,
      params: {
        page,
        conditions,
        sortType,
        sortOrder,
        districtId,
        provinceId,
        minPrice,
        maxPrice,
        minAcreage,
        maxAcreage,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
