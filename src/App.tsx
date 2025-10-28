import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Tus componentes
import { Header } from './Components/Header'; // Asume export function Header
import { Footer } from './Components/Footer'; // Asume export function Footer

// Páginas (Usaremos imports con nombre {} consistentemente)
import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Reseñas } from './pages/Reseñas';
import { Perfil } from './pages/Perfil';
import { InicioSesion } from './pages/InicioSesion'; // Eliminado duplicado
import { Registro } from './pages/Registro';
import { ProductoDetalle } from './pages/ProductoDetalle';
import { Carrito } from './pages/Carrito';
import { Checkout } from './pages/Checkout'; // Eliminado duplicado, asume archivo 'Checkout.tsx'
import { Novedades } from './pages/Novedades';
import { Contactanos } from './pages/Contactanos';

// Componente Layout principal
function MainLayout() {
  return (
    <div className="site-container"> 
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

// Componente App principal
function App() {
  return (
    <AuthProvider> {/* AuthProvider envuelve todo */}
      <CartProvider> {/* CartProvider envuelve las rutas */}
        <Routes>
          {/* Rutas dentro del Layout Principal */}
          <Route path="/" element={<MainLayout />}>
            
            {/* Página de Inicio */}
            <Route index element={<Inicio />} /> 
            
            {/* Otras páginas */}
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="reseñas" element={<Reseñas />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="novedades" element={<Novedades />} />
            <Route path="login" element={<InicioSesion />} /> 
            <Route path="registro" element={<Registro />} />
            <Route path="producto/:id" element={<ProductoDetalle />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="contactanos" element={<Contactanos />} />

            {/* Puedes añadir una ruta para "Página no encontrada" (404) aquí */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}

          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; // Asegúrate que main.tsx importe 'App' sin llaves