"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app"));
const config_1 = __importDefault(require("./src/config"));
const logger_1 = __importDefault(require("./src/config/logger"));
const websocket_1 = __importDefault(require("./src/socket/websocket"));
const invoice_socket_1 = __importDefault(require("./src/socket/invoice.socket"));
const waiter_socket_1 = __importDefault(require("./src/socket/waiter.socket"));
const chef_socket_1 = __importDefault(require("./src/socket/chef.socket"));
const manager_socket_1 = __importDefault(require("./src/socket/manager.socket"));
const clientInfo_1 = __importDefault(require("./src/socket/clientInfo"));
let server = http_1.default.createServer(app_1.default);
const clientInfo = clientInfo_1.default.getInstance();
const io = websocket_1.default.getInstance(server);
io.sockets.on("connection", (socket) => {
    console.log(`> User connect: `, socket.id);
});
io.initializeHandlers([
    { path: "/invoice", handler: new invoice_socket_1.default() },
    { path: "/waiter", handler: new waiter_socket_1.default() },
    { path: "/chef", handler: new chef_socket_1.default() },
    { path: "/manager", handler: new manager_socket_1.default() },
]);
server.listen(config_1.default.port, () => {
    logger_1.default.info(`Server listening on port ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map