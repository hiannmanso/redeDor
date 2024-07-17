import { Request, Response } from "express";
import cepService from "../services/cep.service";

class CepController {
  async getCep(req: Request, res: Response) {
    const { cep } = req.body;

    try {
      const address = await cepService.getAddress(cep);
      console.log(cep);
      return res.status(200).json({ address });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}

export default new CepController();
