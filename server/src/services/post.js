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
      attributes: ["id", "title", "description", "updatedAt", "star"],
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
      where: {
        status: "approved",
        expiredAt: {
          [db.Sequelize.Op.gt]: db.Sequelize.literal("NOW()"),
        },
      },
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
          attributes: ["name", "phone", "avatar"],
        },
      ],
      attributes: ["id", "title", "description", "updatedAt", "star"],
    };

    if (conditions) {
      queryOptions.where = { ...queryOptions.where, ...conditions };
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

    if (sortType === "price" || sortType === "acreage") {
      queryOptions.order = [["attribute", sortType, sortOrder]];
    } else {
      queryOptions.order = [[sortType, sortOrder]];
    }

    // if (sortType === "price") {
    //   queryOptions.order = [["attribute", "price", sortOrder]];
    // } else if (sortType === "acreage") {
    //   queryOptions.order = [["attribute", "acreage", sortOrder]];
    // } else {
    //   queryOptions.order = [[sortType, sortOrder]];
    // }

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

export const createPostService = async (id, body) => {
  try {
    let idPost = await db.POST.max("id");
    let idAttribute = await db.ATTRIBUTE.max("id");
    let idImg = await db.IMAGE.max("id");

    const response = await db.POST.create({
      id: +idPost + 1,
      title: body.title,
      description: body.description,
      star: 0,
      attributeId: +idAttribute + 1,
      categoryCode: body.categoryCode,
      userId: id,
      imgsId: +idImg + 1,
    });

    await db.ATTRIBUTE.create({
      id: +idAttribute + 1,
      price: +body.price,
      acreage: +body.acreage,
      address: body.address,
      districtId: body.districtId,
    });

    await db.IMAGE.create({
      id: +idImg + 1,
      path: JSON.stringify(body.ImgUrls),
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "OK" : "FAILED TO CREATE POST",
      response,
    };
  } catch (error) {
    throw error;
  }
};
