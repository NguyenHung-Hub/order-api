"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../../controllers/product.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const product_dto_1 = require("../../dtos/product.dto");
const router = express_1.default.Router();
router.post("/", (0, validation_middleware_1.validationMiddleware)(product_dto_1.CreateProductDto), product_controller_1.create);
router.get("/", product_controller_1.get);
router.get("/categories", product_controller_1.getByCategories);
router.get("/category", product_controller_1.getByCategory);
router.get("/recommend", product_controller_1.getRecommend);
exports.default = router;
//# sourceMappingURL=product.route.js.map