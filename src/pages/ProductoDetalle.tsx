import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodoslosProductos } from '../data/producto.ts'; 
import './ProductoDetalle.css'; 
import { useCart } from '../context/CartContext'; 

export function ProductoDetalle() {
  
  const { id } = useParams<{ id: string }>();
  const { addItemToCart } = useCart();
  const product = TodoslosProductos.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

 
  const [notification, setNotification] = useState({ msg: '', type: '' });

  
  const handleAddToCart = () => {
    if (!product) return; 

    if (!selectedSize) {
     
      setNotification({
        msg: "Por favor, selecciona una talla.",
        type: 'error'
      });
      setTimeout(() => setNotification({ msg: '', type: '' }), 3000);
      return;
    }

    addItemToCart(product, selectedSize);

  
    setNotification({
      msg: `${product.name} (Talla: ${selectedSize}) añadido al carrito.`,
      type: 'success'
    });
    setTimeout(() => setNotification({ msg: '', type: '' }), 3000);
  };

  
  const handleSelectSize = (talla: string) => {
    setSelectedSize(talla);
    
    if (notification.type === 'error') {
      setNotification({ msg: '', type: '' });
    }
  };

  if (!product) {
    return (
      <main className="productos" style={{ textAlign: 'center' }}>
        <h2>👟 Producto no encontrado</h2>
        <Link to="/catalogo" className="btn-principal">Volver al Catálogo</Link>
      </main>
    );
  }
  
  const tallasDisponibles = product.availableSizes || [];

  return (
    <main className="productos">
      <article className="card" style={{ maxWidth: '800px', margin: 'auto' }}>
        <img 
          src={product.imageUrl} 
          alt={product.alt} 
          style={{ height: '400px', objectFit: 'cover' }}
        />
        
        <h4 style={{ color: '#555', marginTop: '10px', fontWeight: 'normal' }}>
          {product.brand}
        </h4>
        
        <h3>{product.name}</h3>
        
        <p className="precio">
          {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price)}
        </p>
        
        <p style={{ padding: '0 20px', marginBottom: '20px', textAlign: 'left', lineHeight: '1.6' }}>
          {product.description}
        </p>

        {product.technology && (
          <div style={{ marginBottom: '25px', fontSize: '0.9em' }}>
            <strong>Tecnología Principal:</strong> {product.technology}
          </div>
        )}
        
        <div className="detalle-tallas">
          <h3 className="tallas-title">Selecciona tu talla:</h3>
          <div className="tallas-grid">
            {tallasDisponibles.length > 0 ? (
              tallasDisponibles.map(talla => (
                <button
                  key={talla}
                  className={`talla-button ${selectedSize === talla ? 'selected' : ''}`}
                  onClick={() => handleSelectSize(talla)} 
                >
                  {talla}
                </button>
              ))
            ) : (
              <p>No hay tallas disponibles para este producto.</p>
            )}
          </div>
        </div>
        
       
        {notification.msg && (
          <p className={`notification-message ${notification.type}`}>
            {notification.msg}
          </p>
        )}

       
        <button onClick={handleAddToCart}>
          Añadir al Carrito
        </button>
      </article>
    </main>
  );
}