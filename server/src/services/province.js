import db from "../models";

export const getProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.PROVINCE.findAll({
        raw: true,
        attributes: ["id", "name"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get provinces.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
