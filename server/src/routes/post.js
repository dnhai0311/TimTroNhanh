import express from 'express';
import * as postController from '../controllers/post';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/all', postController.getAllPosts);
router.get('/get', postController.getPosts);
router.get('/get-one', postController.getOnePost);

router.use(verifyToken);
router.post('/create-new', postController.createPost);
router.put('/update', postController.updatePost);
router.delete('/delete', postController.deletePost);
router.post('/like', postController.likePost);
router.delete('/unlike', postController.unlikePost);
router.get('/all-liked-posts', postController.getAllLikedPosts);
router.get('/liked-posts', postController.getLikedPosts);
router.get('/user-post', postController.didUserLikePost);

export default router;
