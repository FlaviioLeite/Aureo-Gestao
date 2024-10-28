// src/types/Cliente.ts
export interface Cliente {
    id: number;
    nome: string;
    contato: string;
    endereco: string; // Adicione esta linha
    cpf_cnpj: string; // Adicione esta linha
  }