import db from "../models";

export const getAcreagesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.ACREAGE.findAll({
        raw: true,
        nest: true,
        attributes: ["id", "value", "min", "max"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "FAILED TO GET PRICES",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
