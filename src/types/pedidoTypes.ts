// types/pedidoTypes.ts
export interface PedidoItem {
  id: number;
  produtoId: number;
  pedidoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}
