// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductManager from './components/ProductManager';
import Header from './components/Header';
import ClientesManager from './components/ui/ClientManager';
import PedidoItens from './Pages/PedidoItens';
import TransactionForm from './components/Transactions/TransactionForm';
import TransactionList from './components/Transactions/TransactionList';

// Interface para Produto
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  supplier: string;
}

// Interface para Cliente
interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);  // Adicionei o estado de transações

  const handleSaveProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleSaveCliente = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
  };

  const handleAddTransaction = (transaction: any) => {
    setTransactions([...transactions, transaction]);  // Adicionando transação
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<ProductManager products={products} onSave={handleSaveProduct} />}
          />
          <Route
            path="/clientes"
            element={<ClientesManager clientes={clientes} onSave={handleSaveCliente} />}
          />
          <Route path="/pedido/:pedidoId/itens" element={<PedidoItens />} />
          <Route
            path="/transactions"
            element={
              <div>
                <TransactionForm onAddTransaction={handleAddTransaction} />
                <TransactionList transactions={transactions} />
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
