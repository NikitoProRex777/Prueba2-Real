import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductoDetalle.css';


interface ProductoDetalle {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  descripcion: string; 
  categoria: string;
  stock: Record<string, number>;

}

export function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const { addItemToCart } = useCart();
  
  const [producto, setProducto] = useState<ProductoDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8090/api/v1/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProducto(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Selecciona una talla");
      return;
    }
    if (producto) {
    
      const productoParaCarrito = {
        id: producto.id,
        name: producto.nombre,
        price: producto.precio,
        imageUrl: producto.imagenUrl,
        brand: producto.categoria
      };
      
      addItemToCart(productoParaCarrito as any, selectedSize);
      alert("¡Agregado al carrito!");
    }
  };

  if (loading) return <div className="loading-container">Cargando...</div>;
  if (!producto) return <div className="error-container">Producto no encontrado</div>;

  // Obtenemos las tallas disponibles desde el Stock
  const tallasDisponibles = producto.stock ? Object.keys(producto.stock) : [];

  return (
    <div className="detalle-wrapper">
      <div className="detalle-card">
        <div className="detalle-image-section">
          <img src={producto.imagenUrl} alt={producto.nombre} />
        </div>

        <div className="detalle-info-section">
          <div className="header-info">
            <span className="brand-tag">{producto.categoria}</span>
          </div>
          
          <h1>{producto.nombre}</h1>
          
          <h2 className="price-tag">
            {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(producto.precio)}
          </h2>
          
          <p className="description-text">{producto.descripcion}</p>

          <div className="size-section">
            <h4>Tallas Disponibles:</h4>
            <div className="sizes-grid">
              {tallasDisponibles.length > 0 ? tallasDisponibles.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  disabled={producto.stock[size] === 0}
                >
                  {size}
                </button>
              )) : <p>No hay tallas disponibles</p>}
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="btn-add-cart">
              AÑADIR AL CARRITO
            </button>
            <Link to="/catalogo" className="btn-back">Volver</Link>
          </div>
        </div>
      </div>
    </div>
  );
}