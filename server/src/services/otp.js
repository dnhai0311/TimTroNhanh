import db from '../models';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const verifyOTPService = async (phone) => {
    try {
        const user = await db.USER.findOne({
            where: { phone },
        });

        const token = jwt.sign({ id: user.id, phone: user.phone }, process.env.SECRET_KEY, {
            expiresIn: '2d',
        });

        return {
            err: user ? 0 : 1,
            msg: user ? 'Xác thực OTP thành công' : 'Xác thực thất bại',
            token: token,
        };
    } catch (error) {
        throw error;
    }
};
