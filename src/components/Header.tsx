// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="text-xl">Gestão de Produtos</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline">Produtos</Link>
          </li>
          <li>
            <Link to="/clientes" className="hover:underline">Clientes</Link>
          </li>
          <li>
            <Link to="/pedido/1/itens" className="hover:underline">Itens Pedidos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
