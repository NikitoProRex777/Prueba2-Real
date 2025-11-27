import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const { token } = useAuth();
  const { clearCart, getCartTotalPrice } = useCart();
  const navigate = useNavigate();
  const total = getCartTotalPrice();

  const handlePagar = async () => {
    try {
      // Llamamos al endpoint de Orden (Puerto 8084)
      const res = await fetch('http://localhost:8084/api/v1/orders/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        alert("¡Compra realizada con éxito! Gracias por tu preferencia.");
        await clearCart(); // Limpiamos carrito
        navigate('/'); // Volver al inicio
      } else {
        alert("Error al procesar el pago.");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center', padding: '30px', border: '1px solid #eee', borderRadius: '10px' }}>
      <h1>Finalizar Compra</h1>
      <p>Estás a un paso de tener tus zapatillas.</p>
      
      <h2>Total a pagar: {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(total)}</h2>
      
      <button 
        onClick={handlePagar}
        style={{ 
            marginTop: '20px', padding: '15px 40px', fontSize: '18px', 
            background: '#28a745', color: 'white', border: 'none', 
            borderRadius: '50px', cursor: 'pointer' 
        }}
      >
        CONFIRMAR PAGO 💳
      </button>
    </div>
  );
}