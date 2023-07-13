import { IInvoice } from "../interfaces/invoice.interface";
import ISocket from "../interfaces/socket.interface";
import { Socket } from "socket.io";

class InvoiceSocket implements ISocket {
    private static socket: Socket;

    handleConnection(socket: Socket) {
        InvoiceSocket.socket = socket;
    }

    middleware(socket: Socket, next: any) {
        return next();
    }
}
export default InvoiceSocket;
