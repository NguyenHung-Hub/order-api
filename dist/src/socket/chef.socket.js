"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChefSocket {
    handleConnection(socket) {
        ChefSocket.socket = socket;
        socket.on("joinRoomShopChef", (shopId) => {
            const room = `${shopId}_chef`;
            console.log("> joinRoomShopChef: ", room);
            socket.join(room);
        });
        socket.on("connection", (data) => {
            console.log(`file: chef.socket.ts:20 > CONNECTION:`, data);
        });
        socket.on("newInvoiceChef", (data) => {
            const room = `${data.shopId.toString()}_chef`;
            socket.to(room).emit("newOrderChef", data);
            console.log(`file: chef.socket.ts:25 > room:`, room);
        });
    }
    middleware(socket, next) {
        return next();
    }
    static emitInvoiceToWaiter(invoice) {
        const room = `${invoice.shopId.toString()}_waiter`;
        console.log("> emitInvoiceToWaiter", room);
        ChefSocket.socket.to(room).emit("newInvoiceWaiter", invoice);
    }
}
exports.default = ChefSocket;
//# sourceMappingURL=chef.socket.js.map