import config from "../config";
import { ISocketHandler } from "../interfaces/socket.interface";
import { Server, Socket } from "socket.io";

const ENV = config.env;
const WEBSOCKET_CORS = {
    origin: ENV.includes("development")
        ? config.SOCKET_CORS_LOCAL
        : config.SOCKET_CORS_PROD,
    methods: ["GET", "POST"],
};

class Websocket extends Server {
    private static io: Websocket;

    public static getInstance(httpServer: any): Websocket {
        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer, {
                cors: WEBSOCKET_CORS,
                transports: ["websocket", "polling"],
            });
        }
        return Websocket.io;
    }

    public initializeHandlers(socketHandlers: Array<ISocketHandler>) {
        socketHandlers.forEach((element) => {
            console.log("Init namespace: ", element.path);

            let namespace = Websocket.io.of(element.path, (socket: Socket) => {
                element.handler.handleConnection(socket);
            });

            if (element.handler.middleware) {
                namespace.use(element.handler.middleware);
            }
        });
    }
}

export default Websocket;
