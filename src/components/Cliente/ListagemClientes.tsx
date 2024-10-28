// src/components/Cliente/ListagemClientes.tsx
import React from 'react';
import { Cliente } from '../../types/Cliente';

interface ListagemClientesProps {
  clientes: Cliente[];
  onEdit: (clienteEditado: Cliente) => void; // Altera para aceitar apenas um cliente
}

const ListagemClientes: React.FC<ListagemClientesProps> = ({ clientes, onEdit }) => {
  const handleEdit = (cliente: Cliente) => {
    // Aqui você pode abrir um modal ou outro componente para editar o cliente
    onEdit(cliente); // Chama a função onEdit passando o cliente editado
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.contato}
            <button onClick={() => handleEdit(cliente)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListagemClientes;