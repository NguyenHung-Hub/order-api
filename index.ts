import http from "http";
import app from "./src/app";
import config from "./src/config";
import logger from "./src/config/logger";
import { Server } from "socket.io";
import Websocket from "@socket/websocket";
import InvoiceSocket from "@socket/invoice.socket";
import WaiterSocket from "@socket/waiter.socket";

let server = http.createServer(app);
const io = Websocket.getInstance(server);

io.on("connection", (socket) => {
    console.log(`> User connect: `, socket.id);
});
io.initializeHandlers([
    { path: "/invoice", handler: new InvoiceSocket() },
    { path: "/waiter", handler: new WaiterSocket() },
]);
server.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
});
