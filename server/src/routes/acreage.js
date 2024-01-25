import express from "express";
import * as acreageService from "../controllers/acreage";

const router = express.Router();

router.get("/all", acreageService.getAcreages);

export default router;
