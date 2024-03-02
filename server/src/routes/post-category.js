import express from 'express';
import * as postCategoryController from '../controllers/post-category';

const router = express.Router();

router.get('/all', postCategoryController.getPostCategories);

export default router;
