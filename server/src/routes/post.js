import express from "express";
import * as postController from "../controllers/post";

const router = express.Router();

router.get("/all", postController.getAllPosts);
router.get("/get", postController.getPosts);

export default router;
