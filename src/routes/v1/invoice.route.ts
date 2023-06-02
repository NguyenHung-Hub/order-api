import express from "express";
import { create, get, update } from "../../controllers/invoice.controller";
import { validationMiddleware } from "@middlewares/validation.middleware";
import { UpdateInvoiceDto } from "@dtos/invoice.dto";
const router = express.Router();

router.post("/", create);
router.get("/", get);
router.put("/", validationMiddleware(UpdateInvoiceDto), update);
export default router;
