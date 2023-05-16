import express from "express";
import {
    create,
    deleteRole,
    get,
    update,
} from "../../controllers/role.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateRoleDto } from "../../dtos/role.dto";
const router = express.Router();

router.post("/", validationMiddleware(CreateRoleDto), create);
router.get("/", get);
router.put("/", update);
router.delete("/", deleteRole);

export default router;
