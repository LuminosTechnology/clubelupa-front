export type Affiliate = {
  id: number;
  nome_completo: string;
  data_nascimento: string; // formato YYYY-MM-DD
  telefone: string;
  status: string;
  created_at: string; // formato ISO
  updated_at: string;
  email: string;
  nome_marca: string;
  cep: string;
  bairro: string;
  rua: string;
  numero_endereco: string;
  complemento?: string;
  cidade: string;
  uf: string;
  categoria: string;

  instagram: string | null;
  site: string | null;
};

export interface CreateAffiliateRequest {
  nome_completo: string;
  data_nascimento: string;
  telefone: string;
  email: string;
  nome_marca: string;
  categoria: string;

  cep: string;
  bairro: string;
  rua: string;
  numero_endereco: string;
  complemento?: string;
  cidade: string;
  uf: string;

  instagram: string | null;
  site: string | null;

  codigo_aprovacao?: string;
}
