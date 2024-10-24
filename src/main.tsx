import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


//provavelme nem vai precisar mudar nada aqui maximo importar alguma coisa
const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element to render the app.');
}
