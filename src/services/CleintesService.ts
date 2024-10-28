import { Cliente } from '../types/Cliente';

// Simulação de um banco de dados em memória
const clientesDB: Cliente[] = []; // Usando 'const' porque 'clientesDB' não será reatribuído

// Função para obter um cliente por ID
export const obterClientePorId = async (id: number): Promise<Cliente | undefined> => {
  return clientesDB.find(cliente => cliente.id === id);
};

// Função para atualizar um cliente
export const updateCliente = async (cliente: Cliente): Promise<void> => {
  const index = clientesDB.findIndex(c => c.id === cliente.id);
  if (index !== -1) {
    clientesDB[index] = { ...clientesDB[index], ...cliente };
    console.log('Cliente atualizado:', clientesDB[index]);
  } else {
    throw new Error('Cliente não encontrado');
  }
};