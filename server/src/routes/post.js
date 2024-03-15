import express from 'express';
import * as postController from '../controllers/post';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get', postController.getPosts);
router.get('/get-one', postController.getOnePost);
router.get('/rated-posts', postController.getRated);

router.use(verifyToken);
router.post('/create-new', postController.createPost);
router.put('/update', postController.updatePost);
router.delete('/delete', postController.deletePost);
router.post('/like', postController.likePost);
router.post('/rate', postController.ratePost);
router.delete('/unlike', postController.unlikePost);
router.get('/all-liked-posts', postController.getAllLikedPosts);
router.get('/liked-posts', postController.getLikedPosts);
router.get('/user-like-post', postController.didUserLikePost);
router.get('/user-rate-post', postController.didUserRatePost);
router.get('/user-create-post', postController.didUserCreatePost);
router.get('/total', postController.getTotalPostsByStatus);
router.get('/all', postController.getAllPosts);

export default router;
