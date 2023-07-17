"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("../../controllers/role.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const role_dto_1 = require("../../dtos/role.dto");
const router = express_1.default.Router();
router.post("/", (0, validation_middleware_1.validationMiddleware)(role_dto_1.CreateRoleDto), role_controller_1.create);
router.get("/", role_controller_1.get);
router.put("/", role_controller_1.update);
router.delete("/", role_controller_1.deleteRole);
exports.default = router;
//# sourceMappingURL=role.route.js.map