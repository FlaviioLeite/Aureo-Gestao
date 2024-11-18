import React, { useState } from 'react';
import './TransactionList.css';
import './TransactionForm.css';
interface Transaction {
  description: string;
  amount: number;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [filterText, setFilterText] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const onFilterChangeText = (value: string) => {
    setFilterText(value);
  };

  const onFilterChangeDate = (value: string) => {
    setFilterDate(value);
  };

  const handleFilterClick = () => {
    // A filtragem será feita quando o botão for clicado
  };

  const filteredTransactions = transactions.filter((transaction) => {
    // Filtra por descrição
    const matchesDescription = transaction.description.toLowerCase().includes(filterText.toLowerCase());

    // Filtra por data se fornecida
    const matchesDate = filterDate ? transaction.date.includes(filterDate) : true;

    return matchesDescription && matchesDate;
  });

  return (
    <div className="transaction-list-container">
      <h2>Lista de Transações</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrar por descrição"
          value={filterText}
          onChange={(e) => onFilterChangeText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por data (dd/mm/aaaa)"
          value={filterDate}
          onChange={(e) => onFilterChangeDate(e.target.value)}
        />
        <button onClick={handleFilterClick}>Filtrar</button>
      </div>
      {filteredTransactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.description}</td>
                <td>R$ {transaction.amount.toFixed(2)}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-transactions">Nenhuma transação encontrada</p>
      )}
    </div>
  );
};

export default TransactionList;
