import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routers/index";
import { handleError } from "./middlewares/handleError.middleware";
const server = express();

server.use(cors());
server.use(express.json());
server.use(router);
server.use(handleError);

export default server;
