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

export const createPost = async (req, res) => {
  const { id } = req.user;
  const {
    title,
    description,
    categoryCode,
    price,
    acreage,
    address,
    districtId,
    ImgUrls,
  } = req.body;
  // console.log(description);
  try {
    if (
      !title ||
      !description ||
      !categoryCode ||
      !price ||
      !acreage ||
      !address ||
      !districtId ||
      !ImgUrls
    ) {
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });
    }
    const response = await postService.createPostService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller " + error,
    });
  }
};
