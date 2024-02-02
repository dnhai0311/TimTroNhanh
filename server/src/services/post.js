import db from "../models";

export const getAllPostsService = async () => {
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

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "FAILED TO GET POST",
      response,
    };
  } catch (error) {
    throw error;
  }
};

export const getPostsService = async (
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
          attributes: ["name", "phone", "avatar"],
        },
      ],
      attributes: ["id", "name", "info", "updatedAt", "star"],
    };

    if (conditions) {
      queryOptions.where = conditions;
    }

    if (minPrice && maxPrice) {
      queryOptions.where = {
        ...queryOptions.where,
        "$attribute.price$": {
          [db.Sequelize.Op.between]: [minPrice, maxPrice],
        },
      };
    }

    if (minAcreage && maxAcreage) {
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
    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "FAILED TO GET POST",
      response,
    };
  } catch (error) {
    throw error;
  }
};
