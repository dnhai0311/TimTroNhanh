import * as postService from "../services/post";
import { getImgsPath } from "../services/image";
import { filter } from "../ultils/commons/filter";
import { deleteImage } from "../middlewares/cloudinary";

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

export const getOnePost = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await postService.getOnePostService(id);
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

export const updatePost = async (req, res) => {
  const {
    idPost,
    title,
    description,
    categoryCode,
    price,
    acreage,
    address,
    districtId,
    ImgUrls,
    userId,
  } = req.body;
  const { id } = req.user;
  try {
    if (
      !idPost ||
      !title ||
      !description ||
      !categoryCode ||
      !price ||
      !acreage ||
      !address ||
      !districtId ||
      !ImgUrls ||
      !userId
    ) {
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });
    }
    if (id != userId) {
      console.log(id);
      console.log(userId);
      return res.status(401).json({
        err: 1,
        msg: "user isn't matching",
      });
    }
    const paths = await getImgsPath(idPost);
    const deletedPosts = filter(paths.path, ImgUrls);
    if (deletedPosts.length > 0) {
      for (const publicId of deletedPosts) {
        deleteImage(publicId);
      }
    }

    const response = await postService.updatePostService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at controller " + error,
    });
  }
};
