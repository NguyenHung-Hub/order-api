import express from "express";
import {
    login,
    register,
    registerShop,
} from "../../controllers/auth.controller";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { CreateUserDto, LoginDto } from "../../dtos/user.dto";
const router = express.Router();

router.post("/register", validationMiddleware(CreateUserDto), register);
router.post(
    "/register/shop",
    validationMiddleware(CreateUserDto),
    registerShop
);
router.post("/login", validationMiddleware(LoginDto), login);

export default router;
