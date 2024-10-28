// src/components/Cliente/CadastroCliente.tsx
import React, { useState } from 'react';
import { Cliente } from '../../types/Cliente';

interface CadastroClienteProps {
  onSave: (novoCliente: Cliente) => void; // Callback para salvar cliente
}

const CadastroCliente: React.FC<CadastroClienteProps> = ({ onSave }) => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState(''); // Novo estado para endereco
  const [cpfCnpj, setCpfCnpj] = useState(''); // Novo estado para cpf_cnpj
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação
    if (!nome) {
      setError('Nome é obrigatório');
      return;
    }

    if (!/^\d{10,11}$/.test(contato)) {
      setError('Contato deve ter 10 ou 11 dígitos');
      return;
    }

    if (!endereco) {
      setError('Endereço é obrigatório');
      return;
    }

    if (!cpfCnpj) {
      setError('CPF/CNPJ é obrigatório');
      return;
    }

    // Criar novo cliente
    const novoCliente: Cliente = {
      id: Date.now(), // ou outra lógica para gerar ID
      nome,
      contato,
      endereco, // Adicionando endereco
      cpf_cnpj: cpfCnpj, // Adicionando cpf_cnpj
    };

    // Chama a função de salvar cliente
    onSave(novoCliente);
    
    // Limpa os campos
    setNome('');
    setContato('');
    setEndereco(''); // Limpa endereco
    setCpfCnpj(''); // Limpa cpf_cnpj
  };

  return (
    <div>
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contato">Contato</label>
          <input
            type="text"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cpf_cnpj">CPF/CNPJ</label>
          <input
            type="text"
            id="cpf_cnpj"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
};

export default CadastroCliente;