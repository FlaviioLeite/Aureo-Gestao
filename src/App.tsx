import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductManager from './components/ProductManager';
import Header from './components/Header';
import ClientesManager from './components/ui/ClientManager';
import PedidoItens from './Pages/PedidoItens';

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
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [clienteToEdit, setClienteToEdit] = useState<Cliente | undefined>(undefined);
  
  // Filtros e ordenação para produtos
  const [nameFilter, setNameFilter] = useState<string>('');
  const [supplierFilter, setSupplierFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Filtros para clientes
  const [nameFilterCliente, setNameFilterCliente] = useState<string>('');
  const [emailFilterCliente, setEmailFilterCliente] = useState<string>('');

  // Funções de gerenciamento de produtos
  const handleSaveProduct = (product: Product) => {
    if (productToEdit) {
      setProducts(products.map((p) => (p.id === productToEdit.id ? { ...product, id: p.id } : p)));
      setProductToEdit(undefined);
    } else {
      const newProduct = { ...product, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  // Funções de gerenciamento de clientes
  const handleSaveCliente = (cliente: Cliente) => {
    if (clienteToEdit) {
      setClientes(clientes.map((c) => (c.id === clienteToEdit.id ? { ...cliente, id: c.id } : c)));
      setClienteToEdit(undefined);
    } else {
      const newCliente = { ...cliente, id: clientes.length + 1 };
      setClientes([...clientes, newCliente]);
    }
  };

  const handleEditCliente = (cliente: Cliente) => {
    setClienteToEdit(cliente);
  };

  const handleDeleteCliente = (clienteId: number) => {
    setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
  };

  // Filtros para produtos
  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleSupplierFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplierFilter(e.target.value);
  };

  const handleSortOrderChange = (value: 'asc' | 'desc') => {
    setSortOrder(value);
  };

  const getFilteredAndSortedProducts = () => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .filter((product) =>
        product.supplier.toLowerCase().includes(supplierFilter.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
  };

  // Filtros para clientes
  const handleNameFilterClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilterCliente(e.target.value);
  };

  const handleEmailFilterClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFilterCliente(e.target.value);
  };

  const getFilteredClientes = () => {
    return clientes
      .filter((cliente) =>
        cliente.name.toLowerCase().includes(nameFilterCliente.toLowerCase())
      )
      .filter((cliente) =>
        cliente.email.toLowerCase().includes(emailFilterCliente.toLowerCase())
      );
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <ProductManager
                products={getFilteredAndSortedProducts()}
                onSave={handleSaveProduct}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                nameFilter={nameFilter}
                supplierFilter={supplierFilter}
                sortOrder={sortOrder}
                onNameFilterChange={handleNameFilterChange}
                onSupplierFilterChange={handleSupplierFilterChange}
                onSortOrderChange={handleSortOrderChange}
                productToEdit={productToEdit}
              />
            }
          />
          <Route
            path="/clientes"
            element={
              <ClientesManager
                clientes={getFilteredClientes()}
                onSave={handleSaveCliente}
                onEdit={handleEditCliente}
                onDelete={handleDeleteCliente}
                 nameFilter={nameFilterCliente}
                 emailFilter={emailFilterCliente}
                 onNameFilterChange={handleNameFilterClienteChange}
                 onEmailFilterChange={handleEmailFilterClienteChange}
              />
            }
          />
           <Route path="/pedido/:pedidoId/itens" element={<PedidoItens />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
