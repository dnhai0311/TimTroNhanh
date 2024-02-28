import express from 'express';
import * as otpController from '../controllers/otp';

const router = express.Router();

router.post('/verify', otpController.verifyOTP);

export default router;
