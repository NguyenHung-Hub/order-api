import http from "http";
import app from "./src/app";
import config from "./src/config";
import logger from "./src/config/logger";

let server = http.createServer(app);
server.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
});
