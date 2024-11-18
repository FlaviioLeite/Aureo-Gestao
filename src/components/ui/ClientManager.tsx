import React, { useState, useEffect } from 'react';
import { Cliente } from '../../types/Cliente'; // Ajuste o caminho conforme necessário

interface ClientManagerProps {
  clientes: Cliente[];
  onSave: (cliente: Cliente) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (clienteId: number) => void;
}

const ClientManager: React.FC<ClientManagerProps> = ({
  clientes,
  onSave,
  onEdit,
  onDelete,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    if (editingCliente) {
      setName(editingCliente.name);
      setEmail(editingCliente.email);
      setPhone(editingCliente.phone);
      setCpfCnpj(editingCliente.cpfCnpj);
    }
  }, [editingCliente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cliente: Cliente = {
      id: editingCliente ? editingCliente.id : clientes.length + 1,
      name,
      email,
      phone,
      cpfCnpj,
    };

    if (editingCliente) {
      onEdit(cliente);
    } else {
      onSave(cliente);
    }

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCpfCnpj('');
    setEditingCliente(null);
  };

  return (
    <div>
      <h2>Gerenciamento de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF/CNPJ:</label>
          <input
            type="text"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingCliente ? 'Atualizar Cliente' : 'Salvar Cliente'}
        </button>
        {editingCliente && <button onClick={resetForm}>Cancelar</button>}
      </form>

      <h3>Clientes Cadastrados</h3>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <p>Nome: {cliente.name}</p>
            <p>Email: {cliente.email}</p>
            <p>Telefone: {cliente.phone}</p>
            <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
            <button onClick={() => setEditingCliente(cliente)}>Editar</button>
            <button onClick={() => onDelete(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientManager;
