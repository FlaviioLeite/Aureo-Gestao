import React, { useState } from 'react';
import './TransactionList.css'; // Certifique-se de criar o CSS ajustado.
import './TransactionList.css'; // Importando o CSS
import './TransactionForm.css'; // Importando o CSS

interface TransactionFormProps {
  onAddTransaction: (transaction: { description: string; amount: number; date: string }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    onAddTransaction({
      description,
      amount: parseFloat(amount),
      date,
    });

    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="transaction-form">
      <h2>Adicionar Transação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Valor</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default TransactionForm;
