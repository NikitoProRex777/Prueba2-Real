// src/pages/Registro.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Reutilizamos los mismos estilos de formulario
import './FormStyles.css'; 
// (Si tienes una API simulada de registro, impórtala aquí)
// import { registerUser } from '../data/simulatedapi.ts'; 
// (Si usas AuthContext para loguear después del registro)
// import { useAuth } from '../context/AuthContext';

export function Registro() {
  const navigate = useNavigate();
  // const { login } = useAuth(); // Descomenta si logueas al usuario después

  // --- Estados para los campos del formulario ---
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- Estado para los errores de validación ---
  const [errores, setErrores] = useState<{
    nombre?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // --- Función de Validación ---
  const validarFormulario = (): boolean => {
    const nuevosErrores: typeof errores = {};
    let esValido = true;

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
      esValido = false;
    }
    if (!email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
      esValido = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Validación simple de formato email
      nuevosErrores.email = 'El formato del correo no es válido.';
      esValido = false;
    }
    if (!password) {
      nuevosErrores.password = 'La contraseña es obligatoria.';
      esValido = false;
    } else if (password.length < 6) { // Ejemplo: Mínimo 6 caracteres
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
      esValido = false;
    }
    if (password !== confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.';
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  // --- Manejador del Envío ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validarFormulario()) {
      console.log('Formulario de registro válido, procesando...');
      // --- SIMULACIÓN DE REGISTRO ---
      try {
        // (Aquí llamarías a tu API simulada de registro)
        // const newUser = await registerUser({ nombre, email, password });
        
        // (Simulamos éxito)
        alert('¡Registro exitoso! Serás redirigido.');
        
        // (Opcional: Iniciar sesión automáticamente después del registro)
        // const loginData = { id: newUser.id, nombre, email, zapatillaFavorita: '' }; // Datos para el login
        // login(loginData);
        
        navigate('/login'); // O redirige a '/perfil' si inicias sesión

      } catch (error: any) {
        // (Manejo de errores si la API falla, ej: email ya existe)
        setErrores({ email: error.message }); 
        console.error('Error en el registro:', error);
      }
      // --- FIN SIMULACIÓN ---
    } else {
      console.log('Formulario de registro inválido.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Crear Cuenta</h2>
        
        {/* 2. Añadimos noValidate al formulario */}
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Campo Nombre */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} // Clase condicional
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
            {/* Mensaje de error personalizado */}
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>
          
          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>

          {/* Campo Contraseña */}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {errores.password && <div className="invalid-feedback">{errores.password}</div>}
          </div>

          {/* Campo Confirmar Contraseña */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            {errores.confirmPassword && <div className="invalid-feedback">{errores.confirmPassword}</div>}
          </div>

          <button type="submit" className="form-submit-button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}