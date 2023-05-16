import express from "express";
import {
    create,
    deleteCategory,
    get,
    update,
} from "../../controllers/category.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateCategoryDto } from "../../dtos/category.dto";
const router = express.Router();

router.post("/", validationMiddleware(CreateCategoryDto), create);
router.get("/", get);
router.put("/", update);
router.delete("/", deleteCategory);

export default router;
