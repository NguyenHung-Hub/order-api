import express from "express";
import {
    create,
    get,
    updateStatusRead,
} from "../../controllers/notification.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateNotificationDto } from "@dtos/notification.dto";
const router = express.Router();

router.post("/", validationMiddleware(CreateNotificationDto), create);
router.get("/", get);
router.put("/", updateStatusRead);

export default router;
