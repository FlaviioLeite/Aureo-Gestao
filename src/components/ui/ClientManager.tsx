import React, { useState, useEffect } from 'react';

interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string; 
}


interface ClientesManagerProps {
  clientes: Cliente[];
  onSave: (cliente: Cliente) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (clienteId: number) => void;
}

const ClientesManager: React.FC<ClientesManagerProps> = ({
  clientes,
  onSave,
  onEdit,
  onDelete,
}) => {
  // Estados locais para armazenar os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  // Preenche os campos ao editar um cliente existente
  useEffect(() => {
    if (editingCliente) {
      setName(editingCliente.name);
      setEmail(editingCliente.email);
      setPhone(editingCliente.phone);
      setCpfCnpj(editingCliente.cpfCnpj);
    }
  }, [editingCliente]);

  // Função para salvar ou atualizar um cliente
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

  // Reseta o formulário após salvar ou cancelar a edição
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

      {/* Formulário para adicionar ou editar clientes */}
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

      {/* Listagem de Clientes */}
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

export default ClientesManager;