"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const user_dto_1 = require("../../dtos/user.dto");
const router = express_1.default.Router();
router.post("/register", (0, validation_middleware_1.validationMiddleware)(user_dto_1.CreateUserDto), auth_controller_1.register);
router.post("/register/shop", (0, validation_middleware_1.validationMiddleware)(user_dto_1.CreateUserDto), auth_controller_1.registerShop);
router.post("/login", (0, validation_middleware_1.validationMiddleware)(user_dto_1.LoginDto), auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.route.js.map