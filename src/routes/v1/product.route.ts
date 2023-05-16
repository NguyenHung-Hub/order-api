import express from "express";
import {
    create,
    get,
    getByCategories,
    getByCategory,
    getRecommend,
} from "../../controllers/product.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateProductDto } from "../../dtos/product.dto";
const router = express.Router();

router.post("/", validationMiddleware(CreateProductDto), create);
router.get("/", get);
router.get("/categories", getByCategories);
router.get("/category", getByCategory);
router.get("/recommend", getRecommend);

export default router;
