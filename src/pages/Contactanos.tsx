// src/pages/Contactanos.tsx
import React, { useState } from "react"; 

// 1. Importamos el CSS que crearemos en el siguiente paso
import './Contactanos.css';

// 2. Usamos 'export function' (exportación con nombre)
export function Contactanos() {
  // Estados para los valores de los inputs
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado para los mensajes de error
  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  // 3. Función de validación (se ejecuta al escribir y al enviar)
  const validarFormulario = () => {
    const nuevosErrores = { nombre: "", email: "", mensaje: "" };
    let esValido = true;

    // Validación de Nombre
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío.";
      esValido = false;
    }

    // Validación de Email (expresión regular)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
      esValido = false;
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = "Formato de email no válido.";
      esValido = false;
    }

    // Validación de Mensaje
    if (!mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
      esValido = false;
    } else if (mensaje.length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido; // Devuelve si el formulario es válido o no
  };

  // 4. Función que se ejecuta al presionar "Enviar"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue

    // Solo si la validación es exitosa, se envía
    if (validarFormulario()) {
      alert(`Gracias ${nombre}, tu mensaje ha sido enviado!`);
      
      // Limpiamos el formulario
      setNombre("");
      setEmail("");
      setMensaje("");
      setErrores({ nombre: "", email: "", mensaje: "" });
    }
  };

  return (
    // Contenedor principal con nuestra clase CSS
    <div className="contactanos-container">
      <h1 className="text-white fw-bold display-5 mb-3">Contáctanos</h1>
      <p className="lead text-white mb-4">
        Envíanos tus dudas o comentarios.
      </p>

      {/* Usamos clases de Bootstrap (como pide la rúbrica) */}
      <form
        onSubmit={handleSubmit}
        className="w-100"
        style={{ maxWidth: "600px" }}
        noValidate // Desactiva la validación HTML para usar la nuestra
      >
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label text-white">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onBlur={validarFormulario} // Valida al salir del campo
          />
          {/* Mensaje de error (usando clases de Bootstrap) */}
          {errores.nombre && (
            <div className="invalid-feedback d-block">{errores.nombre}</div>
          )}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validarFormulario} // Valida al salir del campo
          />
          {errores.email && (
            <div className="invalid-feedback d-block">{errores.email}</div>
          )}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label text-white">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onBlur={validarFormulario} // Valida al salir del campo
            rows={5}
          ></textarea>
          {errores.mensaje && (
            <div className="invalid-feedback d-block">{errores.mensaje}</div>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="btn btn-light w-100"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}