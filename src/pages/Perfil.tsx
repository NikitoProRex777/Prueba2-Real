// src/pages/Perfil.tsx
import React, { useState } from 'react';
// 1. Importa Navigate (para redirigir si no hay sesión)
import { Link, Navigate } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaEdit, 
  FaSave,
  FaSignOutAlt
} from 'react-icons/fa';

// 2. Importa el hook
import { useAuth } from '../context/AuthContext.tsx';
import './Perfil.css'; 

export function Perfil() {
  
  // 3. Obtiene el usuario REAL y la función logout
  const { user, logout } = useAuth();

  // 4. VERIFICACIÓN DE SEGURIDAD:
  // Si no hay usuario, redirige a la página principal
  if (!user) {
    // (replace evita que el usuario pueda volver con "atrás")
    return <Navigate to="/" replace />; 
  }

  // 5. El estado inicial ahora usa los datos reales del 'user'
  const [userData, setUserData] = useState({
    nombre: user.nombre,
    email: user.email,
    zapatillaFavorita: user.zapatillaFavorita
  });

  const [isEditing, setIsEditing] =useState(false);

  // (Tu función handleChange no cambia)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // (Tu función handleToggleEdit no cambia)
  const handleToggleEdit = () => {
    if (isEditing) {
      alert('Perfil actualizado (simulado)');
    }
    setIsEditing(!isEditing); 
  };

  // 6. Conecta la función de cerrar sesión
  const handleCerrarSesion = () => {
    logout();
    // No necesitas redirigir, el "if (!user)" se encargará
    // de hacerlo automáticamente en el próximo renderizado.
  };

  return (
    <div className="perfil-container-simple">
      
      {/* 7. Muestra los datos REALES */}
      <div className="perfil-saludo">
        <FaUserCircle size={60} />
        <h3>¡Hola, {user.nombre.split(' ')[0]}!</h3>
      </div>

      <div className="perfil-content-simple">
        {/* ... (el header 'Mi Perfil') ... */}

        <div className="perfil-card">
          <div className="card-header">
            <h3>Información Personal</h3>
            {/* ... (el botón de editar) ... */}
          </div>
          
          <div className="card-body">
            {isEditing ? (
              <form className="perfil-form">
                {/* ... (inputs) ... */}
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={userData.email} // Muestra el email real
                  disabled 
                />
                {/* ... (otros inputs) ... */}
              </form>
            ) : (
              <div className="perfil-info-view">
                {/* 8. Muestra los datos REALES */}
                <p><strong>Nombre Completo:</strong> {userData.nombre}</p>
                <p><strong>Correo Electrónico:</strong> {userData.email}</p>
                <p><strong>Zapatilla Favorita:</strong> {userData.zapatillaFavorita}</p>
              </div>
            )}
          </div>
          
          <div className="card-footer">
            <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}