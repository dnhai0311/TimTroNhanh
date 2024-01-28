import * as services from "../services/district";

export const getAllDistricts = async (req, res) => {
  try {
    const { provinceId } = req.query;
    const response = await services.getAllDistrictsService(provinceId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};

export const getDistricts = async (req, res) => {
  try {
    const { provinceId } = req.query;
    const response = await services.getDistrictsService(provinceId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
