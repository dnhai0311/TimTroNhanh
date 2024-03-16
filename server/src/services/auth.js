import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const HashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const RegisterService = async ({ name, phone, password, isHost }) => {
    try {
        const [user, created] = await db.USER.findOrCreate({
            where: { phone },
            defaults: {
                name,
                phone,
                password: HashPassword(password),
                type: isHost ? '1' : '0',
            },
        });

        const token = created
            ? jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, {
                  expiresIn: '2d',
              })
            : null;

        return {
            err: token ? 0 : 2,
            msg: token ? 'Tạo tài khoản thành công' : 'Số điện thoại bị trùng',
            token: token,
        };
    } catch (error) {
        throw error;
    }
};

export const LoginService = async ({ name, phone, password }) => {
    try {
        let user;
        if (!name) {
            user = await db.USER.findOne({
                where: { phone },
            });
        } else {
            user = await db.ADMIN.findOne({
                where: { name },
            });
        }
        const isPasswordCorrect = user && bcrypt.compareSync(password, user.password);

        if (user.status === 'disable') {
            return {
                err: 1,
                msg: 'Tài khoản đã bị khóa',
            };
        }

        const token = isPasswordCorrect
            ? jwt.sign(
                  {
                      id: user.id,
                      [name ? 'name' : 'phone']: name || user.phone,
                      ...(name ? { isAdmin: true } : {}),
                  },
                  process.env.SECRET_KEY,
                  {
                      expiresIn: '2d',
                  },
              )
            : null;

        return {
            err: token ? 0 : 2,
            msg: token
                ? 'Đăng nhập thành công'
                : user
                ? 'Mật khẩu không đúng'
                : name
                ? 'Sai tên tài khoản admin'
                : 'Sai số điện thoại',
            token: token,
            isAdmin: name ? true : false,
        };
    } catch (error) {
        throw error;
    }
};
