import mongoose, { ConnectOptions } from "mongoose";
import config from "../config";

const connectDB = async () => {
    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };

    const ENV = config.env;

    try {
        const connect = await mongoose.connect(
            ENV.includes("development")
                ? config.DATABASE_URL
                : config.DATABASE_URL_PROD,
            {
                autoIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions
        );

        connect.set("debug", true);

        // console.log(">>> connect: ", connect);
        console.log("MongoDB connected!!");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
};

export default connectDB;
