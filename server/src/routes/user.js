import express from 'express';
import * as userController from '../controllers/user';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get', userController.getUser);
router.use(verifyToken);
router.get('/current', userController.getCurrentUser);
router.get('/posts', userController.getAllPosts);
router.put('/update', userController.updateUser);
router.put('/reset-password', userController.resetPassword);
router.get('/total', userController.getTotalUsersByType);
router.get('/all', userController.getAllUsers);
router.put('/:userId/update-status', userController.updateUserStatus);

export default router;
