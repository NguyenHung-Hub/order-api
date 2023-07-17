"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../../controllers/category.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const category_dto_1 = require("../../dtos/category.dto");
const router = express_1.default.Router();
router.post("/", (0, validation_middleware_1.validationMiddleware)(category_dto_1.CreateCategoryDto), category_controller_1.create);
router.get("/", category_controller_1.get);
router.put("/", category_controller_1.update);
router.delete("/", category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.route.js.map