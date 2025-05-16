import express from "express";
import { getDeviation, getStats } from "../controller/cryptoController";

const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);

export default router;
