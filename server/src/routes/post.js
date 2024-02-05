import express from "express";
import * as postController from "../controllers/post";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get("/all", postController.getAllPosts);
router.get("/get", postController.getPosts);

router.use(verifyToken);
router.post("/create-new", postController.createPost);

export default router;
