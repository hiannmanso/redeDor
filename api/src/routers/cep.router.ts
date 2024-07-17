import { Router } from "express";
import cepController from "../controllers/cep.controller.js";
import validateCep from "../middlewares/validateCep.middleware.js";

const routerCep = Router();

routerCep.post("/cep", validateCep, cepController.getCep);

export default routerCep;
