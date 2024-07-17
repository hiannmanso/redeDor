import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CepService from "../services/cep.service";
import cepRepository from "../repositories/cep.repository";
import { CepAddress } from "../interfaces/cep.interface";

const mockAxios = new MockAdapter(axios);

jest.mock("../repositories/cep.repository");

describe("CepService", () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  it("should return address from repository if it exists", async () => {
    const cep = "01001000";
    const existingCep: CepAddress = {
      id: 1,
      cep,
      address: "Praça da Sé, Sé, São Paulo/SP",
    };
    (cepRepository.findCep as jest.Mock).mockResolvedValue(existingCep);

    const result = await CepService.getAddress(cep);

    expect(result).toEqual(existingCep);
    expect(cepRepository.findCep).toHaveBeenCalledWith(cep);
  });

  it("should fetch address from API and save it to the repository if not found", async () => {
    const cep = "01001001";
    const address = "Rua Teste, Centro, São Paulo/SP";
    const newCep: CepAddress = { id: 2, cep, address };
    (cepRepository.findCep as jest.Mock).mockResolvedValue(null);

    mockAxios.onGet(`https://ws.apicep.com/cep.json?code=${cep}`).reply(200, {
      code: cep,
      address,
    });

    (cepRepository.createCep as jest.Mock).mockResolvedValue(newCep);

    const result = await CepService.getAddress(cep);

    expect(result).toEqual(newCep);
    expect(cepRepository.findCep).toHaveBeenCalledWith(cep);
    expect(cepRepository.createCep).toHaveBeenCalledWith(cep, address);
  });

  it("should throw an error if API does not return address", async () => {
    const cep = "01001002";
    (cepRepository.findCep as jest.Mock).mockResolvedValue(null);

    mockAxios
      .onGet(`https://ws.apicep.com/cep.json?code=${cep}`)
      .reply(200, {});

    await expect(CepService.getAddress(cep)).rejects.toThrow(
      "CEP não encontrado."
    );
    expect(cepRepository.findCep).toHaveBeenCalledWith(cep);
  });
});
