import React, { useEffect, useState } from 'react';

// Definindo a interface para o Pedido
interface Pedido {
  id: number; // ou string, dependendo da sua estrutura
  data: string; // ou Date, se você estiver usando objetos de data
  status: string;
}

const HistoricoPedidos: React.FC<{ clienteId: number }> = ({ clienteId }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Definindo o estado como um array de Pedido
  const [filtroStatus, setFiltroStatus] = useState<string>(''); // Definindo o estado do filtro como string

  useEffect(() => {
    const fetchPedidos = async () => {
      const response = await fetch(`/api/pedidos?clienteId=${clienteId}`);
      const data: Pedido[] = await response.json(); // Especificando o tipo da resposta
      setPedidos(data);
    };
    fetchPedidos();
  }, [clienteId]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por status"
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
      />
      <ul>
        {pedidos
          .filter(pedido => pedido.status.includes(filtroStatus))
          .map(pedido => (
            <li key={pedido.id}>
              {pedido.data} - {pedido.status}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistoricoPedidos;
