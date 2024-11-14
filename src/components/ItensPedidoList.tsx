// components/ItensPedidoList.tsx
import React from 'react';
import { PedidoItem } from '../types/pedidoTypes';

interface ItensPedidoListProps {
  itens: PedidoItem[];
  onRemove: (itemId: number) => void;
}

const ItensPedidoList: React.FC<ItensPedidoListProps> = ({ itens, onRemove }) => {
  return (
    <div>
      <h3>Itens do Pedido</h3>
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            {item.nomeProduto} - Quantidade: {item.quantidade}, Preço Unitário: R${item.precoUnitario.toFixed(2)}
            <button onClick={() => onRemove(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItensPedidoList;
