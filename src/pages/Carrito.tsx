// src/pages/Carrito.tsx
import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el hook
import { Link } from 'react-router-dom'; // 'Link' ya está importado, lo cual es perfecto
import './Carrito.css'; 

export function Carrito() {
  
  // Obtenemos todo lo necesario del contexto
  const { 
    cartItems, 
    removeFromCart, 
    incrementItem, 
    decrementItem, 
    getCartTotalPrice 
  } = useCart();

  const totalPagar = getCartTotalPrice(); // Calculamos el total

  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  // Si el carrito está vacío (sin cambios)
  if (cartItems.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>No tienes productos en tu carrito. ¡Explora nuestro catálogo!</p>
        <Link to="/catalogo" className="btn-ir-tienda">
          IR A LA TIENDA
        </Link>
      </div>
    );
  }

  // Si hay items en el carrito
  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Resumen de tu Compra</h1>

      <div className="carrito-grid">
        
        {/* --- Columna de Items --- (sin cambios) */}
        <div className="carrito-items-list">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              {/* Imagen */}
              <img 
                src={item.product.imageUrl} 
                alt={item.product.alt} 
                className="cart-item-image"
              />
              
              {/* Info del Producto */}
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.product.name}</h3>
                <p className="cart-item-price">
                  {formatPrice(item.product.price)} c/u
                </p>
                <p className="cart-item-size">
                  Talla: <strong>{item.size}</strong>
                </p>
              </div>

              {/* Controles de Cantidad */}
              <div className="cart-item-controls">
                <button onClick={() => decrementItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementItem(item.id)}>+</button>
              </div>

              {/* Precio Total del Item */}
              <div className="cart-item-total">
                {formatPrice(item.product.price * item.quantity)}
              </div>

              {/* Botón Eliminar */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="cart-item-remove"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* --- Columna de Resumen --- */}
        <div className="carrito-summary">
          <div className="summary-box">
            <h2 className="summary-title">Total a Pagar</h2>
            <p className="summary-total">{formatPrice(totalPagar)}</p>
            
            {/* --- ¡AQUÍ ESTÁ LA MODIFICACIÓN! --- */}
            {/* Cambiamos el <button> por un <Link> a la ruta /checkout
                y le dejamos la misma clase para que se vea igual.
            */}
            <Link to="/checkout" className="summary-checkout-btn">
              Proceder al Pago
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}