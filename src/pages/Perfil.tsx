import { Navigate } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaSignOutAlt
} from 'react-icons/fa';

import { useAuth } from '../context/AuthContext';
import './Perfil.css'; 

export function Perfil() {
  
  // 1. Obtenemos el usuario DIRECTAMENTE del contexto
  const { user, logout } = useAuth();

  // 2. Si no hay usuario, fuera
  if (!user) {
    return <Navigate to="/login" replace />; 
  }

  const handleCerrarSesion = () => {
    logout();
  };

  // Función auxiliar para mostrar el nombre del rol bonito
  const getRoleName = (role: string) => {
    if (role === 'ROLE_ADMIN') return 'Administrador';
    if (role === 'ROLE_USER') return 'Usuario';
    return role; // Por si acaso llega otro valor
  };

  return (
    <div className="perfil-container-simple">
      
      <div className="perfil-saludo">
        <FaUserCircle size={60} />
        <h3>¡Hola, {user.nombre}!</h3>
      </div>

      <div className="perfil-content-simple">
        <div className="perfil-card">
          <div className="card-header">
            <h3>Información Personal</h3>
          </div>
          
          <div className="card-body">
            <div className="perfil-info-view">
              <p><strong>Nombre Completo:</strong> {user.nombre}</p>
              
              <p><strong>Correo Electrónico:</strong> {user.email}</p>
              
              <p>
                <strong>Zapatilla Favorita:</strong> 
                {user.zapatillaFavorita ? (
                   <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
                     {user.zapatillaFavorita}
                   </span>
                ) : (
                   <span style={{ color: '#999', fontStyle: 'italic', marginLeft: '5px' }}>
                     (No especificada)
                   </span>
                )}
              </p>
              <p>
                <strong>Rol:</strong> 
                <span className="badge-role">
                  {getRoleName(user.role)}
                </span>
              </p>
            </div>
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