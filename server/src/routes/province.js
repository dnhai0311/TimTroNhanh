import express from "express";
import * as controllers from "../controllers/province";

const router = express.Router();

router.get("/all", controllers.getAllProvinces);
router.get("/get", controllers.getProvinces);

export default router;
