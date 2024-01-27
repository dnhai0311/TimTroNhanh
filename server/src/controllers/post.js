import * as postService from "../services/post";

export const getAllPosts = async (req, res) => {
  try {
    const response = await postService.getAllPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller " + error,
    });
  }
};

export const getPosts = async (req, res) => {
  const {
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
  } = req.query;
  try {
    const response = await postService.getPostsService(
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
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller " + error,
    });
  }
};
