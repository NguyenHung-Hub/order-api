"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const socket_io_1 = require("socket.io");
const ENV = config_1.default.env;
const WEBSOCKET_CORS = {
    origin: ENV.includes("development")
        ? config_1.default.SOCKET_CORS_LOCAL
        : config_1.default.SOCKET_CORS_PROD,
    methods: ["GET", "POST"],
    credentials: true,
};
class Websocket extends socket_io_1.Server {
    static getInstance(httpServer) {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer, {
                cors: WEBSOCKET_CORS,
                transports: ["websocket", "polling"],
            });
        }
        return Websocket.io;
    }
    initializeHandlers(socketHandlers) {
        socketHandlers.forEach((element) => {
            console.log("Init namespace: ", element.path);
            let namespace = Websocket.io.of(element.path, (socket) => {
                element.handler.handleConnection(socket);
            });
            if (element.handler.middleware) {
                namespace.use(element.handler.middleware);
            }
        });
    }
}
exports.default = Websocket;
//# sourceMappingURL=websocket.js.map