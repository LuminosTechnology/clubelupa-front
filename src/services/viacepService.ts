import axios from "axios";

type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export const fetchCep = async (value: string) => {
  const cep = value.replace(/\D/g, "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const response = await axios.get<ViaCepResponse>(url);
  return response.data;
};
