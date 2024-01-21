import db from "../models";

export const getPostsService = new Promise(async (resolve, reject) => {
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
          attributes: ["price", "area", "location"],
        },
        {
          model: db.USER,
          as: "user",
          attributes: ["name", "phone"],
        },
      ],
      // include: [
      //   {
      //     model: db.ATTRIBUTE,
      //     as: "attribute",
      //     attributes: ["price", "area", "location"],
      //   },
      // ],
      // include: [
      //   {
      //     model: db.USER,
      //     as: "user",
      //     attributes: ["name", "phone"],
      //   },
      // ],
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
