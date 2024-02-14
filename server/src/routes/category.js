import express from 'express';
import * as categoryControllers from '../controllers/category';

const router = express.Router();

router.get('/all', categoryControllers.getCategories);

export default router;
