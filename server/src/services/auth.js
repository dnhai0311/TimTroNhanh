import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const HashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const RegisterService = async ({ name, phone, password }) => {
  try {
    const [user, created] = await db.USER.findOrCreate({
      where: { phone },
      defaults: {
        name,
        phone,
        password: HashPassword(password),
      },
    });

    const token = created
      ? jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, {
          expiresIn: "2d",
        })
      : null;

    return {
      err: token ? 0 : 2,
      msg: token ? "Tạo tài khoản thành công" : "Số điện thoại bị trùng",
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

export const LoginService = async ({ phone, password }) => {
  try {
    const user = await db.USER.findOne({
      where: { phone },
    });

    const isPasswordCorrect =
      user && bcrypt.compareSync(password, user.password);

    const token = isPasswordCorrect
      ? jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, {
          expiresIn: "2d",
        })
      : null;

    return {
      err: token ? 0 : 2,
      msg: token
        ? "Đăng nhập thành công"
        : user
        ? "Mật khẩu không đúng"
        : "Sai số điện thoại",
      token: token,
    };
  } catch (error) {
    throw error;
  }
};
