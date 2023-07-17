"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connectDB = async () => {
    const options = {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
    };
    const ENV = config_1.default.env;
    try {
        const connect = await mongoose_1.default.connect(ENV.includes("development")
            ? config_1.default.DATABASE_URL
            : config_1.default.DATABASE_URL_PROD, {
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connect.set("debug", true);
        // console.log(">>> connect: ", connect);
        console.log("MongoDB connected!!");
    }
    catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=index.js.map