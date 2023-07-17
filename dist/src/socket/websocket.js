"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["GET", "POST"],
};
class Websocket extends socket_io_1.Server {
    static getInstance(httpServer) {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer, { cors: WEBSOCKET_CORS });
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