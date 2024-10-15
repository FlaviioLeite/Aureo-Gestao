import React from 'react';

import '../styles/Home.css'; // Importa os estilos da Home
// tsx da home nada importante tambem, se quiser pode adicinar mais coisas na home
const Home: React.FC = () => {
  return (
    <div className="home">
    
      <h2>Bem-vindo ao Sistema de Gestão de Produtos!</h2>
      <p>Use o menu acima para navegar entre as telas do aplicativo.</p>
      {/* Adicione mais conteúdo ou funcionalidades conforme necessário */}
    </div>
  );
};

export default Home;
