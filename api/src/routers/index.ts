import { Router } from "express";
import routerCep from "./cep.router";

const router = Router();

router.use(routerCep);

export default router;
