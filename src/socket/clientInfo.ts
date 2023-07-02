import { IClientInfo } from "@interfaces/clientInfo.interface";

class ClientInfo {
    private static instance: ClientInfo;
    private info: IClientInfo[];

    constructor() {
        this.info = [];
    }

    public static getInstance(): ClientInfo {
        if (this.instance == null) {
            this.instance = new ClientInfo();
        }

        return this.instance;
    }

    public addClient(info: IClientInfo) {
        const findClient = this.info.find((i) => i.userId == info.userId);
        if (findClient) {
            this.info = this.info.map((i) => {
                if (i.userId == info.userId) {
                    return { ...i, socketId: info.socketId };
                }

                return i;
            });
        } else {
            this.info.push(info);
        }
        console.log(this.info);
    }

    public removeClient(socketId: string) {
        this.info = this.info.filter((i) => i.socketId != socketId);
        console.log(this.info);
    }

    public findById(userId: string): IClientInfo | null {
        const client = this.info.find((i) => i.userId == userId);

        if (client) {
            return client;
        }

        return null;
    }
}

export default ClientInfo;
