import db from "../models";

export const getAllPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.POST.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.IMAGE,
            as: "images",
            attributes: ["path"],
          },
          {
            model: db.ATTRIBUTE,
            as: "attribute",
            attributes: ["price", "acreage", "address"],
          },
          {
            model: db.USER,
            as: "user",
            attributes: ["name", "phone"],
          },
        ],
        attributes: ["id", "name", "info", "updatedAt", "star"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "FAILED TO GET POST",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsService = (page, conditions, sortType, sortOrder) =>
  new Promise(async (resolve, reject) => {
    try {
      const queryOptions = {
        raw: true,
        nest: true,
        offset: page * +process.env.PAGE_DISPLAYED || 0,
        limit: +process.env.PAGE_DISPLAYED,
        include: [
          {
            model: db.IMAGE,
            as: "images",
            attributes: ["path"],
          },
          {
            model: db.ATTRIBUTE,
            as: "attribute",
            attributes: ["price", "acreage", "address"],
          },
          {
            model: db.USER,
            as: "user",
            attributes: ["name", "phone"],
          },
        ],
        attributes: ["id", "name", "info", "updatedAt", "star"],
      };

      if (conditions) {
        queryOptions.where = conditions;
      }
      if (sortType === "price") {
        queryOptions.order = [["attribute", "price", sortOrder]];
      } else if (sortType === "acreage") {
        queryOptions.order = [["attribute", "acreage", sortOrder]];
      } else {
        queryOptions.order = [[sortType, sortOrder]];
      }

      const response = await db.POST.findAndCountAll(queryOptions);
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "FAILED TO GET POST",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
