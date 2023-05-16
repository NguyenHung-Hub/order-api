import express from "express";
import {
    create,
    get,
    update,
    deleteArea,
    createTable,
    updateTable,
    deleteTable,
} from "../../controllers/area.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateAreaDto } from "../../dtos/area.dto";
import { CreateTableDto, UpdateTableDto } from "../../dtos/table.dto";

const router = express.Router();

router.post("/", validationMiddleware(CreateAreaDto), create);
router.get("/", get);
router.put("/", update);
router.delete("/", deleteArea);

router.post("/table", validationMiddleware(CreateTableDto), createTable);
router.put("/table", validationMiddleware(UpdateTableDto), updateTable);
router.delete("/table", deleteTable);
export default router;
