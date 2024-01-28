import express from "express";
import * as controllers from "../controllers/district";

const router = express.Router();

router.get("/all", controllers.getAllDistricts);
router.get("/get", controllers.getDistricts);

export default router;
