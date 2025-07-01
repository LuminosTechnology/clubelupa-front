export interface AffiliateData {
  /* ─── campos de cadastro ─────────────────────────────── */
  id: number;
  nome_fantasia: string;
  cnpj?: string;
  tempo_empresa?: number;
  telefone?: string;
  email?: string;

  /* ─── campos de atualização ──────────────────────────── */
  nome_local?: string;
  celular?: string;
  horario_funcionamento?: string;
  cep?: string;
  bairro?: string;
  rua?: string;
  cidade?: string;
  uf?: string;
  categoria?: string;
  demais_categorias?: string;
  instagram?: string;
  site?: string;

  /* ─── auxiliares ─────────────────────────────────────── */
  foto_perfil?: string;
  created_at?: string;
  updated_at?: string;

  /** Cor opcional para estilizar o card (podemos gerar no front) */
  color?: string;

  /** Benefícios / texto promocional (a API ainda não envia) */
  benefits?: string;
}
