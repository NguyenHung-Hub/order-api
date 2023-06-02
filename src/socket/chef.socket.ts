import { IInvoice } from "@interfaces/invoice.interface";
import ISocket from "@interfaces/socket.interface";
import { Socket } from "socket.io";

class ChefSocket implements ISocket {
    private static socket: Socket;

    handleConnection(socket: Socket) {
        ChefSocket.socket = socket;

        socket.on("joinRoomShopChef", (shopId: string) => {
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

    middleware(socket: Socket, next: any) {
        return next();
    }

    public static emitInvoiceToWaiter(invoice: IInvoice) {
        const room = `${invoice.shopId.toString()}_waiter`;
        console.log("> emitInvoiceToWaiter", room);
        ChefSocket.socket.to(room).emit("newInvoiceWaiter", invoice);
    }
}
export default ChefSocket;
