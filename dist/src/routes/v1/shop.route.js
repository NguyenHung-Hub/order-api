"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("../../controllers/shop.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const shop_dto_1 = require("../../dtos/shop.dto");
const router = express_1.default.Router();
router.post("/", (0, validation_middleware_1.validationMiddleware)(shop_dto_1.CreateShopDto), shop_controller_1.create);
router.get("/", shop_controller_1.get);
router.put("/", shop_controller_1.update);
router.delete("/", shop_controller_1.deleteShop);
exports.default = router;
//# sourceMappingURL=shop.route.js.map