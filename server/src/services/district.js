import db from "../models";

export const getAllDistrictsService = async (provinceId) => {
  try {
    const response = await db.DISTRICT.findAll({
      where: { provinceId },
      raw: true,
      attributes: ["id", "value"],
    });

    return {
      err: response.length > 0 ? 0 : 1,
      msg: response.length > 0 ? "OK" : "Failed to get Districts.",
      response: response,
    };
  } catch (error) {
    throw error;
  }
};

export const getDistrictsService = async (provinceId) => {
  try {
    const response = await db.DISTRICT.findAll({
      include: [
        {
          model: db.ATTRIBUTE,
          as: "attributes",
          required: true,
        },
      ],
      where: { provinceId },
    });

    return {
      err: response.length > 0 ? 0 : 1,
      msg: response.length > 0 ? "OK" : "Failed to get Districts.",
      response: response,
    };
  } catch (error) {
    throw error;
  }
};
