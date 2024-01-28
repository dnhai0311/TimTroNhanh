import * as services from "../services/province";

export const getAllProvinces = async (req, res) => {
  try {
    const response = await services.getAllProvincesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};

export const getProvinces = async (req, res) => {
  try {
    const response = await services.getProvincesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller: " + error,
    });
  }
};
