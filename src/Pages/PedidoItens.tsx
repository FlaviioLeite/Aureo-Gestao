import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/pedidoItens.css"
type Item = {
  id: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
};

const PedidoItens: React.FC = () => {
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const [itens, setItens] = useState<Item[]>([]);
  const [nomeItem, setNomeItem] = useState<string>(''); // Nome do item
  const [quantidade, setQuantidade] = useState<number>(1); // Quantidade
  const [precoUnitario, setPrecoUnitario] = useState<number>(0); // Preço unitário
  const [error, setError] = useState<string | null>(null);

  const carregarItens = (pedidoId: string): Item[] => {
    const itensSalvos = localStorage.getItem(`pedido-${pedidoId}-itens`);
    if (itensSalvos) {
      return JSON.parse(itensSalvos);
    }
    return [];
  };

  useEffect(() => {
    if (pedidoId) {
      try {
        const itens = carregarItens(pedidoId);
        setItens(itens);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Erro ao carregar os itens do pedido: ${error.message}`);
        } else {
          setError('Erro desconhecido ao carregar os itens do pedido.');
        }
      }
    }
  }, [pedidoId]);

  const handleAdicionarItem = () => {
    if (nomeItem && quantidade > 0 && precoUnitario > 0) {
      try {
        const novoItem: Item = {
          id: Date.now(),
          nome: nomeItem,
          quantidade,
          precoUnitario,
        };
        const itensAtualizados = [...itens, novoItem];
        setItens(itensAtualizados);

        if (pedidoId) {
          localStorage.setItem(`pedido-${pedidoId}-itens`, JSON.stringify(itensAtualizados));
        }

        // Limpar os inputs após adicionar o item
        setNomeItem('');
        setQuantidade(1);
        setPrecoUnitario(0);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Erro ao adicionar o item: ${error.message}`);
        } else {
          setError('Erro desconhecido ao adicionar o item.');
        }
      }
    } else {
      setError('Por favor, preencha todos os campos corretamente.');
    }
  };

  const handleRemoverItem = (id: number) => {
    const itensAtualizados = itens.filter((item) => item.id !== id);
    setItens(itensAtualizados);

    if (pedidoId) {
      localStorage.setItem(`pedido-${pedidoId}-itens`, JSON.stringify(itensAtualizados));
    }
  };

  const handleEditarItem = (id: number) => {
    const item = itens.find((item) => item.id === id);
    if (item) {
      setNomeItem(item.nome);
      setQuantidade(item.quantidade);
      setPrecoUnitario(item.precoUnitario);
      handleRemoverItem(id); // Remover o item original antes de editar
    }
  };

  return (
    <div>
      <h2>Itens do Pedido {pedidoId}</h2>

      {/* Inputs para os detalhes do item */}
      <div>
        <label>
          Nome do Item:
          <input
            type="text"
            value={nomeItem}
            onChange={(e) => setNomeItem(e.target.value)}
            placeholder="Nome do item"
          />
        </label>
      </div>

      <div>
        <label>
          Quantidade:
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>

      <div>
        <label>
          Preço Unitário:
          <input
            type="number"
            value={precoUnitario}
            onChange={(e) => setPrecoUnitario(Number(e.target.value))}
            min="0"
            step="0.01"
          />
        </label>
      </div>

      {/* Exibindo mensagens de erro */}
      {error && <p className="text-red-500">{error}</p>}

      <button onClick={handleAdicionarItem}>Adicionar Item</button>

      {/* Lista de itens do pedido */}
      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            {item.nome} - Quantidade: {item.quantidade} - Preço Unitário: R${item.precoUnitario}
            <button onClick={() => handleEditarItem(item.id)}>Editar</button>
            <button onClick={() => handleRemoverItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidoItens;
