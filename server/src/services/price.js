import db from "../models";

export const getPricesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.PRICE.findAll({
        raw: true,
        nest: true,
        attributes: ["id", "value"],
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
