// src/services/pedidoService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajuste conforme a URL da sua API

export const listarItensPedido = async (pedidoId: number) => {
  try {
    const response = await axios.get(`${API_URL}/api/pedidos/${pedidoId}/itens`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar itens do pedido:', error);
    throw error;
  }
};

export const adicionarItemPedido = async (pedidoId: number, item: { nome: string; quantidade: number; precoUnitario: number }) => {
  try {
    const response = await axios.post(`${API_URL}/api/pedidos/${pedidoId}/itens`, item);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar item ao pedido:', error);
    throw error;
  }
};
