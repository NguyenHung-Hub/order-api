import { IInvoice } from "../interfaces/invoice.interface";
import ISocket, {
    IJoinRoomData,
    INotifyPrintOrderDone,
} from "../interfaces/socket.interface";
import { Socket } from "socket.io";
import Websocket from "./websocket";
import ClientInfo from "./clientInfo";
import { INotification } from "../interfaces/notification";

class WaiterSocket implements ISocket {
    private static socket: Socket;

    handleConnection(socket: Socket) {
        WaiterSocket.socket = socket;
        const clientInfo = ClientInfo.getInstance();

        socket.on("joinRoomShopWaiter", (data: IJoinRoomData) => {
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

        socket.on(
            "sendPrintOrderDone",
            (data: INotification, callback: Function) => {
                const findReceiver = clientInfo.findById(data.receiver);

                if (findReceiver) {
                    socket
                        .to(findReceiver.socketId)
                        .emit("receivePrintOrderDone", data);
                }
                callback("Sent notification to waiter");
            }
        );
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
