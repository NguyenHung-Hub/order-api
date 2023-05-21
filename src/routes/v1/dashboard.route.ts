import express from "express";
import { get } from "../../controllers/dashboard.controller";
const router = express.Router();

router.get("/", get);

export default router;
