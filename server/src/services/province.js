import db from "../models";

export const getAllProvincesService = async () => {
  try {
    const response = await db.PROVINCE.findAll({
      raw: true,
      attributes: ["id", "value"],
    });

    return {
      err: response.length > 0 ? 0 : 1,
      msg: response.length > 0 ? "OK" : "Failed to get provinces.",
      response,
    };
  } catch (error) {
    throw error;
  }
};

export const getProvincesService = async () => {
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

    return {
      err: uniqueResponse.length > 0 ? 0 : 1,
      msg: uniqueResponse.length > 0 ? "OK" : "Failed to get provinces.",
      response: uniqueResponse,
    };
  } catch (error) {
    throw error;
  }
};
