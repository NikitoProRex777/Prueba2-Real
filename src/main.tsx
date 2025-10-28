// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Asegúrate que App usa 'export default'

// 1. Importa tu CSS global
import './index.css'; 

// 2. Importa el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 3. Importa el Router
import { BrowserRouter } from 'react-router-dom';

// 4. Importa tu AuthProvider
import { AuthProvider } from './context/AuthContext.tsx';

// 5. Renderiza la aplicación
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 6. El Router envuelve todo */}
    <BrowserRouter>
      {/* 7. El AuthProvider envuelve tu App */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);