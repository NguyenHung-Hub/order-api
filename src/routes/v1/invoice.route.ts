import express from "express";
import {
    create,
    get,
    update,
    updateQuantityDelivered,
    updateQuantityDone,
} from "@controllers/invoice.controller";
import { validationMiddleware } from "@middlewares/validation.middleware";
import {
    UpdateInvoiceDto,
    UpdateQuantityDelivered,
    UpdateQuantityDone,
} from "@dtos/invoice.dto";
const router = express.Router();

router.post("/", create);
router.get("/", get);
router.put("/", validationMiddleware(UpdateInvoiceDto), update);
router.put(
    "/done",
    validationMiddleware(UpdateQuantityDone),
    updateQuantityDone
);
router.put(
    "/delivered",
    validationMiddleware(UpdateQuantityDelivered),
    updateQuantityDelivered
);
export default router;
