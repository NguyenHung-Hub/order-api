"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = require("./config/morgan");
const error_1 = require("./middlewares/error");
const v1_1 = __importDefault(require("./routes/v1"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
if (config_1.default.env !== "test") {
    app.use(morgan_1.successLogHandler);
    app.use(morgan_1.errorLogHandler);
}
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)({ level: 7 }));
app.use((0, cors_1.default)({ origin: [config_1.default.SOCKET_CORS_PROD, "http://localhost:5173"] }));
app.get("/", (req, res, next) => {
    res.send("Fast Order Api");
});
app.use("/v1", v1_1.default);
app.use(error_1.errorHandlerCall);
app.use(error_1.errorHandler);
(0, database_1.default)();
exports.default = app;
//# sourceMappingURL=app.js.map