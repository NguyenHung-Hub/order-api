import express from "express";
import { create, get } from "../../controllers/invoice.controller";
const router = express.Router();

router.post("/", create);
router.get("/", get);
export default router;
