import React, { useState } from 'react';
import './Contactanos.css'; 

export function Contactanos() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '', // Variable en español
    mensaje: ''
  });
  
  const [status, setStatus] = useState('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Conecta al puerto 8083
      const response = await fetch('http://localhost:8083/api/v1/notify/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', correo: '', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contáctanos</h1>
      <p>¿Tienes dudas? Escríbenos.</p>

      {status === 'success' && (
        <div className="status-message success">
          ✅ ¡Mensaje enviado! Revisa la consola de Java.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" name="nombre" className="form-input" placeholder="Tu Nombre" 
          value={formData.nombre} onChange={handleChange} required 
        />
        <input 
          type="email" name="correo" className="form-input" placeholder="Tu Correo" 
          value={formData.correo} onChange={handleChange} required 
        />
        <textarea 
          name="mensaje" className="form-textarea" placeholder="Tu mensaje..." 
          value={formData.mensaje} onChange={handleChange} required 
        />
        <button type="submit" className="btn-enviar">
          {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
}