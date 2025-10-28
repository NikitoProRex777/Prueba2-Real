// src/Components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// Importamos su CSS, que crearemos en el siguiente paso
import './ProductCard.css'; 
import type { Producto } from '../data/producto.ts';

// Definimos las props que recibirá el componente
interface ProductCardProps {
  product: Producto;
}

export function ProductCard({ product }: ProductCardProps) {

  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-image-link">
        {/* Usamos los nombres de campos de tu interface 'Producto' */}
        <img src={product.imageUrl} alt={product.alt} className="product-image" />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.brand}</span>
        <h3 className="product-name">
          <Link to={`/producto/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>

      {/* Botón que lleva a los detalles (como lo definimos antes) */}
      <Link 
        to={`/producto/${product.id}`} 
        className="add-to-cart-button"
      >
        Ver Detalles
      </Link>
    </div>
  );
}