import { Socket } from "socket.io";

export default interface ISocket {
    handleConnection(socket: Socket): void;
    middleware(socket: Socket, next: any): void;
}

export interface ISocketHandler {
    path: string;
    handler: ISocket;
}

export interface IServerToClientEvents {
    newInvoice: (invoiceId: string) => void;
}
export interface IClientToServerEvents {
    newInvoice: (invoiceId: string) => void;
}

export interface IInterServerEvents {
    ping: () => void;
}

export interface ISocketData {}
