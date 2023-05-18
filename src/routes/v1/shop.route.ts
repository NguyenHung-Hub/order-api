import express from "express";
import {
    create,
    deleteShop,
    get,
    update,
} from "../../controllers/shop.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateShopDto } from "../../dtos/shop.dto";
const router = express.Router();

router.post("/", validationMiddleware(CreateShopDto), create);
router.get("/", get);
router.put("/", update);
router.delete("/", deleteShop);

export default router;
