import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import config from "./config";
import { successLogHandler, errorLogHandler } from "./config/morgan";
import { errorHandler, errorHandlerCall } from "./middlewares/error";
import routes from "./routes/v1";
import connectDB from "./database";
import insert from "./seeder/product";

const app = express();

if (config.env !== "test") {
    app.use(successLogHandler);
    app.use(errorLogHandler);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ level: 7 }));
app.use(cors());
app.use("/v1", routes);
app.use(errorHandlerCall);
app.use(errorHandler);

connectDB();
insert();

export default app;
