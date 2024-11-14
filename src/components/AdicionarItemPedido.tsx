// components/AdicionarItemPedido.tsx
import React, { useState } from 'react';
import { PedidoItem } from '../types/pedidoTypes';

interface AdicionarItemPedidoProps {
  onAdd: (item: PedidoItem) => void;
}

const AdicionarItemPedido: React.FC<AdicionarItemPedidoProps> = ({ onAdd }) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [precoUnitario, setPrecoUnitario] = useState<number>(0);

  const handleAddClick = () => {
    if (quantidade > 0 && precoUnitario > 0) {
      onAdd({ id: Date.now(), produtoId: 0, pedidoId: 0, nomeProduto, quantidade, precoUnitario });
      setNomeProduto('');
      setQuantidade(1);
      setPrecoUnitario(0);
    } else {
      alert("Quantidade deve ser maior que 0 e Preço Unitário deve ser positivo.");
    }
  };

  return (
    <div>
      <h3>Adicionar Item</h3>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChange={(e) => setNomeProduto(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
        min="1"
      />
      <input
        type="number"
        placeholder="Preço Unitário"
        value={precoUnitario}
        onChange={(e) => setPrecoUnitario(Number(e.target.value))}
        min="0.01"
        step="0.01"
      />
      <button onClick={handleAddClick}>Adicionar</button>
    </div>
  );
};

export default AdicionarItemPedido;
