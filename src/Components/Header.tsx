import React from 'react';
import { NavLink } from 'react-router-dom';

// 1. IMPORTAMOS TUS CONTEXTOS
import { useCart } from '../context/CartContext';
// ¡NUEVO! Importamos el contexto de autenticación
import { useAuth } from '../context/AuthContext.tsx'; 

// 2. IMPORTAMOS EL CSS
import './Header.css'; 

export function Header() {
  
  // Lógica del Carrito (como la tenías)
  const { getCartTotalItems } = useCart();
  const totalItems = getCartTotalItems();

  // ¡NUEVO! Lógica de Autenticación
  // Obtenemos el 'user' del contexto. Si 'user' no es null, está logueado.
  // También obtenemos 'logout' para el botón de cerrar sesión.
  const { user, logout } = useAuth(); 

  return (
    <header className="header-container">
      
      {/* Logo */}
      <div className="logo">
        <NavLink to="/">AirLegacy</NavLink>
      </div>

      {/* Navegación Principal (Secciones de Tienda + Reseñas) */}
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/catalogo">Catálogo</NavLink></li>
          <li><NavLink to="/novedades">Novedades</NavLink></li>
          <li><NavLink to="/reseñas">Reseñas</NavLink></li>
          
          {/* --- ¡AQUÍ ESTÁ LA MODIFICACIÓN! --- */}
          <li><NavLink to="/contactanos">Contáctanos</NavLink></li>

        </ul>
      </nav>

      {/* Navegación de Usuario (Perfil, Login y Carrito) */}
      <nav className="user-nav">
        <ul>
          
          {/* --- 3. ¡AQUÍ ESTÁ LA MAGIA! RENDERIZADO CONDICIONAL --- */}
          {user ? (
            // Si SÍ hay un usuario logueado, mostramos Perfil y Salir
            <>
              <li><NavLink to="/perfil">Perfil</NavLink></li>
              <li>
                {/* Añadimos un botón para cerrar sesión */}
                <button onClick={logout} className="logout-button">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            // Si NO hay usuario, mostramos Login y Registro
            <>
              <li><NavLink to="/login">Inicio Sesion</NavLink></li>
              <li><NavLink to="/registro">Registro</NavLink></li>
            </>
          )}

          {/* Tu Carrito (siempre visible) */}
          <li>
            <NavLink to="/carrito">
              🛒
              {totalItems > 0 && (
                <span style={{ marginLeft: '4px' }}>
                  ({totalItems})
                </span>
              )}
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}