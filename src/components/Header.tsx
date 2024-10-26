import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 
/* tsx da header nada importante  */ 
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
          {/* Adicione mais links conforme necessário */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
