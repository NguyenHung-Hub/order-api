import { IInvoice } from "@interfaces/invoice.interface";
import ISocket from "@interfaces/socket.interface";
import { Socket } from "socket.io";
import Websocket from "./websocket";

class WaiterSocket implements ISocket {
    private static socket: Socket;

    handleConnection(socket: Socket) {
        WaiterSocket.socket = socket;

        socket.on("joinRoomShopWaiter", (shopId: string) => {
            const room = `${shopId}_waiter`;
            console.log("> joinRoomShopWaiter: ", room);
            socket.join(room);
        });

        socket.on("connection", (data) => {
            console.log(`file: waiter.socket.ts:20 > CONNECTION:`, data);
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
    }

    middleware(socket: Socket, next: any) {
        return next();
    }

    public static emitInvoiceToWaiter(invoice: IInvoice) {
        const room = `${invoice.shopId.toString()}_waiter`;
        console.log("> emitInvoiceToWaiter", room);
        WaiterSocket.socket.to(room).emit("newInvoiceWaiter", invoice);
    }
}
export default WaiterSocket;
