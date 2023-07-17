"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const area_controller_1 = require("../../controllers/area.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const area_dto_1 = require("../../dtos/area.dto");
const table_dto_1 = require("../../dtos/table.dto");
const router = express_1.default.Router();
router.post("/", (0, validation_middleware_1.validationMiddleware)(area_dto_1.CreateAreaDto), area_controller_1.create);
router.get("/", area_controller_1.get);
router.put("/", area_controller_1.update);
router.delete("/", area_controller_1.deleteArea);
router.post("/table", (0, validation_middleware_1.validationMiddleware)(table_dto_1.CreateTableDto), area_controller_1.createTable);
router.put("/table", (0, validation_middleware_1.validationMiddleware)(table_dto_1.UpdateTableDto), area_controller_1.updateTable);
router.delete("/table", area_controller_1.deleteTable);
exports.default = router;
//# sourceMappingURL=area.route.js.map