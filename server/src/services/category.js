import db from "../models";

export const getCategoriesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.CATEGORY.findAll({
        raw: true,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "FAILED TO GET CATEGORIES",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
