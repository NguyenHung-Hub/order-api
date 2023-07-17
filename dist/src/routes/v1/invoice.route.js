"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoice_controller_1 = require("../../controllers/invoice.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const invoice_dto_1 = require("../../dtos/invoice.dto");
const router = express_1.default.Router();
router.post("/", invoice_controller_1.create);
router.get("/", invoice_controller_1.get);
router.put("/", (0, validation_middleware_1.validationMiddleware)(invoice_dto_1.UpdateInvoiceDto), invoice_controller_1.update);
router.put("/done", (0, validation_middleware_1.validationMiddleware)(invoice_dto_1.UpdateQuantityDone), invoice_controller_1.updateQuantityDone);
router.put("/delivered", (0, validation_middleware_1.validationMiddleware)(invoice_dto_1.UpdateQuantityDelivered), invoice_controller_1.updateQuantityDelivered);
exports.default = router;
//# sourceMappingURL=invoice.route.js.map