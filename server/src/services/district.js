import db from "../models";

export const getDistrictsService = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.DISTRICT.findAll({
        where: { provinceId },
        raw: true,
        attributes: ["id", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get Districts.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
