import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import ProductManager from './components/ProductManager'; 
import Header from './components/Header'; 

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  supplier: string; 
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string>(''); 
  const [supplierFilter, setSupplierFilter] = useState<string>(''); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 

  const handleSaveProduct = (product: Product) => {
    if (productToEdit) {
      // Atualiza um produto existente
      setProducts(products.map((p) => (p.id === productToEdit.id ? { ...product, id: p.id } : p)));
      setProductToEdit(undefined);
    } else {
      // Adiciona um novo produto
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

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleSupplierFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplierFilter(e.target.value);
  };

  const handleSortOrderChange = (value: 'asc' | 'desc') => { 
    setSortOrder(value);
  };

  // Função para filtrar e ordenar os produtos
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
        </Routes>
      </main>
    </Router>
  );
};

export default App;
