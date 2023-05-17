import express from "express";
import { create } from "../../controllers/invoice.controller";
const router = express.Router();

router.post("/", create);

export default router;
