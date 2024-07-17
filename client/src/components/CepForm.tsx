import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface CepResponse {
  id: number;
  cep: string;
  address: string;
}

const CepForm = () => {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setAddress(null);
    try {
      const response = await axios.post<{ address: CepResponse }>(`${import.meta.env.VITE_BACKEND_URL}/cep`, { cep });
      setAddress(response.data.address.address);
    } catch (error) {
      setError("CEP não encontrado ou inválido.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Consulta de CEP</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cep">
            CEP
          </label>
          <InputMask
            id="cep"
            mask="99999-999"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o CEP"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enviar
        </button>
      </form>
      {address && (
        <div className="mt-6 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold">Endereço:</h2>
          <p>{address}</p>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded shadow-md">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CepForm;
