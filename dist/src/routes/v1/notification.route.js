"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../../controllers/notification.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const notification_dto_1 = require("../../dtos/notification.dto");
const router = express_1.default.Router();
router.post("/", (0, validation_middleware_1.validationMiddleware)(notification_dto_1.CreateNotificationDto), notification_controller_1.create);
router.get("/", notification_controller_1.get);
router.put("/", notification_controller_1.updateStatusRead);
exports.default = router;
//# sourceMappingURL=notification.route.js.map