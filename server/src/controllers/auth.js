import * as authService from "../services/auth";

export const Register = async (req, res) => {
  const { name, phone, password } = req.body;
  try {
    if (!name || !phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });
    const response = await authService.RegisterService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at auth controller" + error,
    });
  }
};

export const Login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password)
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });
    const response = await authService.LoginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at auth controller" + error,
    });
  }
};
