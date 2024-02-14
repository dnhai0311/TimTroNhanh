import express from 'express';
import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/register', authController.Register);
router.post('/login', authController.Login);

export default router;
