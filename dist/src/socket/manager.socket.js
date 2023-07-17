"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientInfo_1 = __importDefault(require("./clientInfo"));
class ManagerSocket {
    handleConnection(socket) {
        ManagerSocket.socket = socket;
        const clientInfo = clientInfo_1.default.getInstance();
        socket.on("connection", (data) => {
            console.log(`file: waiter.socket.ts:20 > CONNECTION:`, data);
        });
        socket.on("joinRoomShopManager", (data) => {
            const room = `${data.shopId}_manager`;
            console.log("> joinRoomShopManager: ", room, socket.id);
            socket.join(room);
            clientInfo.addClient({
                socketId: socket.id,
                type: "manager",
                userId: data.userId,
            });
        });
        socket.on("disconnect", (data) => {
            clientInfo.removeClient(socket.id);
        });
        socket.on("sendInvoicePrint", (data) => {
            const room = `${data.shopId.toString()}_manager`;
            socket.to(room).emit("receiveInvoicePrint", data);
            console.log(`file: waiter.socket.ts:25 > room:`, room);
        });
    }
    middleware(socket, next) {
        return next();
    }
    static emitInvoiceToWaiter(invoice) {
        const room = `${invoice.shopId.toString()}_waiter`;
        console.log("> emitInvoiceToWaiter", room);
        ManagerSocket.socket.to(room).emit("newInvoiceWaiter", invoice);
    }
}
exports.default = ManagerSocket;
//# sourceMappingURL=manager.socket.js.map