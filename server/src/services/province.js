import db from "../models";

export const getAllProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.PROVINCE.findAll({
        raw: true,
        attributes: ["id", "value"],
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

export const getProvincesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.PROVINCE.findAll({
        include: [
          {
            model: db.DISTRICT,
            as: "districts",
            attributes: [],
            include: [
              {
                model: db.ATTRIBUTE,
                as: "attributes",
                required: true,
                attributes: [],
              },
            ],
          },
        ],
        attributes: ["id", "value"],
        raw: true,
        where: {
          "$districts.attributes.id$": { [db.Sequelize.Op.ne]: null },
        },
      });

      const uniqueMap = response.reduce((map, item) => {
        const key = `${item.id}-${item.value}`;
        map[key] = item;
        return map;
      }, {});

      const uniqueResponse = Object.values(uniqueMap);

      resolve({
        err: uniqueResponse.length > 0 ? 0 : 1,
        msg: uniqueResponse.length > 0 ? "OK" : "Failed to get provinces.",
        response: uniqueResponse,
      });
    } catch (error) {
      reject(error);
    }
  });
