import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; // Asegúrate de tener tus estilos

export function Registro() {
  const navigate = useNavigate();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zapatillaFavorita, setZapatillaFavorita] = useState(''); // ¡Nuevo campo!
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Objeto que espera tu Backend Java
    const nuevoUsuario = {
      nombre,
      email,
      password,
      zapatillaFavorita,
      role: "ROLE_USER" // Asignamos rol por defecto desde el front (o deja que el back lo haga)
    };

    try {
      // 1. Petición REAL al Backend
      const response = await fetch('http://localhost:8081/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        // Si el backend dice "Email ya existe", lo mostramos
        const msg = await response.text();
        throw new Error(msg);
      }

      // 2. Éxito
      alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
      navigate('/login'); // Redirigimos al Login

    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Crear Cuenta</h2>
        {error && <div className="alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label>Zapatilla Favorita</label>
            <input 
              type="text" 
              value={zapatillaFavorita} 
              onChange={e => setZapatillaFavorita(e.target.value)} 
              placeholder="Ej: Jordan 1" 
              required 
            />
          </div>

          <button type="submit" className="form-submit-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
}