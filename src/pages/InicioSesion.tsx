// src/pages/InicioSesion.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import { useNavigate } from 'react-router-dom';   // Importa el hook para redirigir

// 1. ¡Importa tu API simulada! (Asegúrate de que la ruta sea correcta)
import { loginUser } from '../data/simulatedApi.ts'; 

// 2. Importa los estilos compartidos para formularios
import './FormStyles.css'; // Asegúrate de que este archivo exista

// 3. Exporta con nombre (para que coincida con tu import en App.tsx)
export function InicioSesion() {
  const { login } = useAuth(); // Obtiene la función login del contexto
  const navigate = useNavigate(); // Hook para redirigir

  // Estados para los inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para manejar errores y carga
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();   // Evita que la página se recargue
    setIsLoading(true);   // Activa el estado de carga
    setError(null);       // Limpia errores previos

    try {
      // 4. Llama a tu API simulada para intentar iniciar sesión
      const userData = await loginUser(email, password);
      
      // 5. Si la API devuelve datos (éxito), guarda el usuario en el contexto
      login(userData);
      
      // 6. Redirige al perfil del usuario
      navigate('/perfil');

    } catch (err: any) {
      // 7. Si la API lanza un error (ej: contraseña incorrecta), muestra el mensaje
      setError(err.message);
    } finally {
      // 8. Desactiva el estado de carga, independientemente del resultado
      setIsLoading(false);
    }
  };

  return (
    // Usa los estilos compartidos de FormStyles.css
    <div className="form-container">
      <div className="form-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} noValidate> {/* Añadido noValidate para mejor control */}

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@correo.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          {/* 9. Muestra el mensaje de error si existe */}
          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="form-submit-button" disabled={isLoading}>
            {/* 10. Muestra "Verificando..." o "Entrar" */}
            {isLoading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}