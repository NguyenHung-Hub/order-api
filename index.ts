import http from "http";
import app from "./src/app";
import config from "./src/config";
import logger from "./src/config/logger";
import { Server } from "socket.io";
import Websocket from "@socket/websocket";
import InvoiceSocket from "@socket/invoice.socket";
import WaiterSocket from "@socket/waiter.socket";
import ChefSocket from "@socket/chef.socket";
import ManagerSocket from "@socket/manager.socket";
import ClientInfo from "@socket/clientInfo";

let server = http.createServer(app);

const clientInfo = ClientInfo.getInstance();
const io = Websocket.getInstance(server);

io.sockets.on("connection", (socket) => {
    console.log(`> User connect: `, socket.id);
});
io.initializeHandlers([
    { path: "/invoice", handler: new InvoiceSocket() },
    { path: "/waiter", handler: new WaiterSocket() },
    { path: "/chef", handler: new ChefSocket() },
    { path: "/manager", handler: new ManagerSocket() },
]);
server.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
});
