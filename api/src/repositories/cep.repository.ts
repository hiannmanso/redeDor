import { prisma } from "../configs/batabase";

class CepRepository {
  async findCep(cep: string) {
    return await prisma.cep.findUnique({ where: { cep } });
  }

  async createCep(cep: string, address: string) {
    const result = await prisma.cep.create({
      data: { cep, address },
    });
    return result;
  }
}

export default new CepRepository();
