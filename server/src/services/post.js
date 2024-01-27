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

export const getPostsService = (
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
) =>
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
            include: [
              {
                model: db.DISTRICT,
                as: "district",
                attributes: ["provinceId"],
              },
            ],
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

      if (minPrice !== "" && minPrice && maxPrice && maxPrice !== "") {
        queryOptions.where = {
          ...queryOptions.where,
          "$attribute.price$": {
            [db.Sequelize.Op.between]: [minPrice, maxPrice],
          },
        };
      }

      if (minAcreage !== "" && minAcreage && maxAcreage && maxAcreage !== "") {
        queryOptions.where = {
          ...queryOptions.where,
          "$attribute.acreage$": {
            [db.Sequelize.Op.between]: [minAcreage, maxAcreage],
          },
        };
      }

      if (sortType === "price") {
        queryOptions.order = [["attribute", "price", sortOrder]];
      } else if (sortType === "acreage") {
        queryOptions.order = [["attribute", "acreage", sortOrder]];
      } else {
        queryOptions.order = [[sortType, sortOrder]];
      }

      if (districtId && districtId !== "") {
        queryOptions.where = {
          ...queryOptions.where,
          "$attribute.districtId$": districtId,
        };
      }
      if (provinceId && provinceId !== "") {
        queryOptions.where = {
          ...queryOptions.where,
          "$attribute.district.provinceId$": provinceId,
        };
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
