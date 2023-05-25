import { IInvoice } from "@interfaces/invoice.interface";
import ISocket from "@interfaces/socket.interface";
import { Socket } from "socket.io";

class WaiterSocket implements ISocket {
    private static socket: Socket;

    handleConnection(socket: Socket) {
        WaiterSocket.socket = socket;

        socket.on("orderingTheMeal", (data: string) => {
            console.log("> joinRoomShopWaiter: ", data);
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
