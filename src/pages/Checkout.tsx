// src/pages/Checkout.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Assuming you have CartContext
import { useNavigate } from 'react-router-dom';

// 1. Reutilizamos los mismos estilos de formulario
import './FormStyles.css'; // Make sure this CSS file exists and has styles for .is-invalid and .invalid-feedback

// 2. Define the shape for your errors state
interface FormErrors {
  nombre?: string;
  tarjeta?: string;
  vencimiento?: string;
  cvc?: string;
}

export function Checkout() {
  const { getCartTotalPrice, cartItems } = useCart(); // Assuming these exist in CartContext
  const navigate = useNavigate();

  // States for form fields
  const [nombre, setNombre] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvc, setCvc] = useState('');

  // 3. State to hold validation errors
  const [errores, setErrores] = useState<FormErrors>({});

  const totalPagar = getCartTotalPrice();

  // Helper function for price formatting
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  // 4. Validation function
  const validarFormulario = (): boolean => {
    const nuevosErrores: FormErrors = {};
    let esValido = true;

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre en la tarjeta es obligatorio.';
      esValido = false;
    }
    // Simple validation for card number (e.g., length) - adjust as needed
    if (!tarjeta.replace(/\s/g, '').match(/^\d{16}$/)) { // Remove spaces, check 16 digits
      nuevosErrores.tarjeta = 'Número de tarjeta inválido (debe tener 16 dígitos).';
      esValido = false;
    }
    // Simple validation for expiration (MM/AA format)
    if (!vencimiento.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      nuevosErrores.vencimiento = 'Formato inválido (MM/AA).';
      esValido = false;
    }
    // Simple validation for CVC (3 or 4 digits)
    if (!cvc.match(/^\d{3,4}$/)) {
      nuevosErrores.cvc = 'CVC inválido (3 o 4 dígitos).';
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  // 5. Submit handler with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form first
    if (validarFormulario()) {
      // If valid, proceed with fake payment
      console.log('Formulario válido, procesando pago...');
      alert('¡Pago ficticio realizado con éxito!');
      
      // Optional: Clear cart after payment
      // clearCart(); // You'd need this function in CartContext

      // Redirect to home
      navigate('/');
    } else {
      console.log('Formulario inválido, revisa los campos.');
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0 && window.location.pathname !== '/carrito') { // Avoid infinite loop if already on carrito
    navigate('/carrito');
    return null; 
  }

  return (
    <div className="form-container">
      <div className="form-box" style={{ maxWidth: '550px' }}>
        <h2>Resumen del Pago</h2>
        
        <div style={{ textAlign: 'center', margin: '1rem 0 2rem 0' }}>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>Total a Pagar:</p>
          <p style={{ fontSize: '2.5rem', margin: 0, fontWeight: 700 }}>
            {formatPrice(totalPagar)}
          </p>
        </div>

        {/* 6. Add noValidate to the form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* --- Nombre --- */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre en la Tarjeta</label>
            <input 
              type="text" 
              id="nombre"
              // 7. Apply conditional error class
              className={errores.nombre ? 'is-invalid' : ''} 
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); setErrores(prev => ({...prev, nombre: undefined})); }} // Clear error on change
              placeholder="Juan Pérez"
              required 
            />
            {/* 8. Display custom error message */}
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          {/* --- Tarjeta --- */}
          <div className="form-group">
            <label htmlFor="tarjeta">Número de la Tarjeta</label>
            <input 
              type="text" 
              id="tarjeta"
              className={errores.tarjeta ? 'is-invalid' : ''}
              value={tarjeta}
              onChange={(e) => { setTarjeta(e.target.value); setErrores(prev => ({...prev, tarjeta: undefined})); }}
              placeholder="**** **** **** 1234"
              maxLength={19} // Allow spaces but validate length
              required 
            />
            {errores.tarjeta && <div className="invalid-feedback">{errores.tarjeta}</div>}
          </div>

          {/* --- Vencimiento y CVC --- */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="vencimiento">Vencimiento (MM/AA)</label>
              <input 
                type="text" 
                id="vencimiento"
                className={errores.vencimiento ? 'is-invalid' : ''}
                value={vencimiento}
                onChange={(e) => { setVencimiento(e.target.value); setErrores(prev => ({...prev, vencimiento: undefined})); }}
                placeholder="12/28"
                maxLength={5} // MM/AA
                required 
              />
              {errores.vencimiento && <div className="invalid-feedback">{errores.vencimiento}</div>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="cvc">CVC</label>
              <input 
                type="text" 
                id="cvc"
                className={errores.cvc ? 'is-invalid' : ''}
                value={cvc}
                onChange={(e) => { setCvc(e.target.value); setErrores(prev => ({...prev, cvc: undefined})); }}
                placeholder="123"
                maxLength={4} // CVC can be 3 or 4 digits
                required 
              />
              {errores.cvc && <div className="invalid-feedback">{errores.cvc}</div>}
            </div>
          </div>

          <button type="submit" className="form-submit-button" style={{ background: '#28a745', marginTop: '1rem' }}>
            Pagar Ahora
          </button>
        </form>
      </div>
    </div>
  );
}