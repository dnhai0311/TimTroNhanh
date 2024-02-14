import express from 'express';
import * as userController from '../controllers/user';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);
router.get('/current', userController.getCurrentUser);
router.get('/posts', userController.getAllPosts);
router.put('/update', userController.updateUser);

export default router;
