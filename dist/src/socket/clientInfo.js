"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientInfo {
    constructor() {
        this.info = [];
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new ClientInfo();
        }
        return this.instance;
    }
    addClient(info) {
        const findClient = this.info.find((i) => i.userId == info.userId);
        if (findClient) {
            this.info = this.info.map((i) => {
                if (i.userId == info.userId) {
                    return { ...i, socketId: info.socketId };
                }
                return i;
            });
        }
        else {
            this.info.push(info);
        }
        console.log(this.info);
    }
    removeClient(socketId) {
        this.info = this.info.filter((i) => i.socketId != socketId);
        console.log(this.info);
    }
    findById(userId) {
        const client = this.info.find((i) => i.userId == userId);
        if (client) {
            return client;
        }
        return null;
    }
}
exports.default = ClientInfo;
//# sourceMappingURL=clientInfo.js.map