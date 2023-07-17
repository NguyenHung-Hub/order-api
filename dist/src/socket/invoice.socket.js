"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvoiceSocket {
    handleConnection(socket) {
        InvoiceSocket.socket = socket;
    }
    middleware(socket, next) {
        return next();
    }
}
exports.default = InvoiceSocket;
//# sourceMappingURL=invoice.socket.js.map