import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Carrito.css';

export function Carrito() {
  const { cartItems, clearCart, getCartTotalPrice } = useCart();
  const navigate = useNavigate();
  const total = getCartTotalPrice();

  const formatPrice = (val: number) => 
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);

  if (cartItems.length === 0) {
    return (
      <div className="carrito-vacio" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/catalogo" style={{ textDecoration: 'underline', color: 'blue' }}>
          Ir a comprar zapatillas
        </Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1>Tu Carrito de Compras</h1>
      
      <div className="carrito-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item" style={{ 
              display: 'flex', alignItems: 'center', gap: '20px', 
              borderBottom: '1px solid #eee', padding: '15px' 
          }}>
            <img src={item.imagenUrl} alt={item.nombreProducto} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            
            <div style={{ flex: 1 }}>
              <h3>{item.nombreProducto}</h3>
              <p>Talla: <strong>{item.size}</strong></p>
            </div>
            
            <div style={{ fontWeight: 'bold' }}>
              {formatPrice(item.precio)}
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-summary" style={{ marginTop: '30px', textAlign: 'right' }}>
        <h2>Total: {formatPrice(total)}</h2>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => clearCart()} style={{ padding: '10px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Vaciar Carrito
          </button>
          
          <button 
            onClick={() => navigate('/checkout')} 
            style={{ padding: '10px 20px', background: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Ir a Pagar (Checkout)
          </button>
        </div>
      </div>
    </div>
  );
}