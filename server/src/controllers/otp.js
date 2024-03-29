import admin from '../middlewares/firebase-admin';
import * as otpService from '../services/otp';

export const verifyOTP = async (req, res) => {
    try {
        const { idToken } = req.query;
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const phone = decodedToken.phone_number.replace('+84', '0');
        const response = await otpService.verifyOTPService(phone);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at controller ' + error,
        });
    }
};
