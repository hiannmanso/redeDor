import axios from "axios";
import cepRepository from "../repositories/cep.repository";
import { CepAddress } from "../interfaces/cep.interface";

class CepService {
  async getAddress(cep: string): Promise<CepAddress> {
    const existingCep = await cepRepository.findCep(cep);
    if (existingCep) {
      return existingCep;
    }

    const response = await axios.get(
      `https://ws.apicep.com/cep.json?code=${cep}`
    );
    if (response.data && response.data.address) {
      const result = await cepRepository.createCep(cep, response.data.address);
      return result;
    }

    throw new Error("CEP não encontrado.");
  }
}

export default new CepService();
