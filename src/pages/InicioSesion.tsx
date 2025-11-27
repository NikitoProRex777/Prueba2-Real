import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos nuestro contexto
import './FormStyles.css';

export function InicioSesion() {
  const { login } = useAuth(); // Sacamos la función login del contexto
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Llamamos a la función del AuthContext
      // Esto hará el fetch a http://localhost:8081/api/v1/auth/login
      await login(email, password);

      // 2. Si no hay error, redirigimos al Perfil o Home
      navigate('/perfil'); 

    } catch (err) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Iniciar Sesión</h2>
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="form-submit-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
}