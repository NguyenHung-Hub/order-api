"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientInfo_1 = __importDefault(require("./clientInfo"));
class WaiterSocket {
    handleConnection(socket) {
        WaiterSocket.socket = socket;
        const clientInfo = clientInfo_1.default.getInstance();
        socket.on("joinRoomShopWaiter", (data) => {
            const room = `${data.shopId}_waiter`;
            console.log("> joinRoomShopWaiter: ", room, socket.id);
            socket.join(room);
            clientInfo.addClient({
                socketId: socket.id,
                type: "waiter",
                userId: data.userId,
            });
        });
        socket.on("disconnect", (data) => {
            clientInfo.removeClient(socket.id);
        });
        socket.on("newInvoiceWaiter", (data) => {
            const room = `${data.shopId.toString()}_waiter`;
            socket.to(room).emit("newOrder", data);
            console.log(`file: waiter.socket.ts:25 > room:`, room);
        });
        socket.on("sendInvoiceItemDone", (data) => {
            console.log(`file: waiter.socket.ts:29 > data:`, data);
            const room = `${data[0].shopId.toString()}_waiter`;
            socket.to(room).emit("receiveInvoiceItemDone", data);
            console.log(`file: waiter.socket.ts:31 > room:`, room);
        });
        socket.on("sendPrintOrderDone", (data, callback) => {
            const findReceiver = clientInfo.findById(data.receiver);
            if (findReceiver) {
                socket
                    .to(findReceiver.socketId)
                    .emit("receivePrintOrderDone", data);
            }
            callback("Sent notification to waiter");
        });
    }
    middleware(socket, next) {
        return next();
    }
    static emitInvoiceToWaiter(invoice) {
        const room = `${invoice.shopId.toString()}_waiter`;
        console.log("> emitInvoiceToWaiter", room);
        WaiterSocket.socket.to(room).emit("newInvoiceWaiter", invoice);
    }
}
exports.default = WaiterSocket;
//# sourceMappingURL=waiter.socket.js.map