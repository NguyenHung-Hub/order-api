import { IInvoice } from "@interfaces/invoice.interface";
import ISocket, {
    IJoinRoomData,
    INotifyPrintOrderDone,
} from "@interfaces/socket.interface";
import { Socket } from "socket.io";
import Websocket from "./websocket";
import ClientInfo from "./clientInfo";

class ManagerSocket implements ISocket {
    private static socket: Socket;

    handleConnection(socket: Socket) {
        ManagerSocket.socket = socket;
        const clientInfo = ClientInfo.getInstance();

        socket.on("connection", (data) => {
            console.log(`file: waiter.socket.ts:20 > CONNECTION:`, data);
        });

        socket.on("joinRoomShopManager", (data: IJoinRoomData) => {
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

    middleware(socket: Socket, next: any) {
        return next();
    }

    public static emitInvoiceToWaiter(invoice: IInvoice) {
        const room = `${invoice.shopId.toString()}_waiter`;
        console.log("> emitInvoiceToWaiter", room);
        ManagerSocket.socket.to(room).emit("newInvoiceWaiter", invoice);
    }
}
export default ManagerSocket;
