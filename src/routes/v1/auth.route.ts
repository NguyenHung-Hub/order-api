import express from "express";
import { login, register } from "../../controllers/auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateUserDto } from "../../dtos/user.dto";
const router = express.Router();

router.post("/", validationMiddleware(CreateUserDto), register);
router.post("/login", validationMiddleware(CreateUserDto), login);

export default router;
