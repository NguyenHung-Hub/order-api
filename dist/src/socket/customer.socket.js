"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WaiterSocket {
    handleConnection(socket) {
        WaiterSocket.socket = socket;
        socket.on("orderingTheMeal", (data) => {
            console.log("> joinRoomShopWaiter: ", data);
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
//# sourceMappingURL=customer.socket.js.map