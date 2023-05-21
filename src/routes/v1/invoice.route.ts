import express from "express";
import { create, getByUser } from "../../controllers/invoice.controller";
const router = express.Router();

router.post("/", create);
router.get("/", getByUser);
export default router;
