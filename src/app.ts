import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import config from "./config";
import { successLogHandler, errorLogHandler } from "./config/morgan";
import { errorHandler, errorHandlerCall } from "./middlewares/error";
import routes from "./routes/v1";
import connectDB from "./database";

const app = express();

if (config.env !== "test") {
    app.use(successLogHandler);
    app.use(errorLogHandler);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ level: 7 }));
app.use(
    cors({ origin: ["https://noworder.netlify.app", "http://localhost:5173"] })
);

app.get("/", (req, res, next) => {
    res.send("Fast Order Api");
});
app.use("/v1", routes);
app.use(errorHandlerCall);
app.use(errorHandler);

connectDB();
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header(
//         "Access-Control-Allow-Methods",
//         "PUT, GET, POST, DELETE, OPTIONS"
//     );
//     next();
// });
export default app;
