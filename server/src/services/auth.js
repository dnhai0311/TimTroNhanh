import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const HashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const RegisterService = ({ name, phone, password }) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.USER.findOrCreate({
        where: { phone },
        defaults: {
          name,
          phone,
          password: HashPassword(password),
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      reslove({
        err: token ? 0 : 2,
        msg: token ? "Tạo tài khoản thành công" : "Số điện thoại bị trùng",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const LoginService = ({ phone, password }) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.USER.findOne({
        where: { phone },
      });
      const isPasswordCorrect =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isPasswordCorrect &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      reslove({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Mật khẩu không đúng"
          : "Sai số điện thoại",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
