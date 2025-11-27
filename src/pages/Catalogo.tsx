import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Catalogo.css'; 

// IMPORTANTE: Esta interfaz ahora coincide con tu DTO de Java
interface Producto {
  id: string;
  nombre: string;      // Antes name
  precio: number;      // Antes price
  imagenUrl: string;   // Antes imageUrl
  categoria: string;   // Antes brand
  // stock se mantiene igual
}

export function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMarca, setFiltroMarca] = useState('Todas');

  useEffect(() => {
    // Conectamos al puerto 8090
    fetch('http://localhost:8090/api/v1/products')
      .then(res => {
        if (!res.ok) throw new Error("Error servidor");
        return res.json();
      })
      .then(data => {
        console.log("Zapatillas recibidas:", data);
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filtramos usando "categoria" en lugar de "brand"
  const productosFiltrados = filtroMarca === 'Todas'
    ? productos
    : productos.filter(p => p.categoria && p.categoria.toLowerCase() === filtroMarca.toLowerCase());

  const formatPrice = (precio: number) => {
    if (!precio) return "$0";
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio);
  };

  return (
    <div className="catalogo-container">
      <h1>Catálogo Completo</h1>
      
      <div className="filtros-container">
        {['Todas', 'Nike', 'Adidas', 'Anta', 'New Balance'].map(marca => (
          <button 
            key={marca}
            className={`filtro-btn ${filtroMarca === marca ? 'active' : ''}`} 
            onClick={() => setFiltroMarca(marca)}
          >
            {marca}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Cargando catálogo...</p>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((prod) => (
            <div className="producto-card" key={prod.id}>
              <div className="card-img-container">
                {/* Usamos prod.imagenUrl y prod.nombre */}
                <img src={prod.imagenUrl} alt={prod.nombre} onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300'} />
              </div>
              <div className="producto-info">
                <span className="brand-badge">{prod.categoria}</span>
                <h3>{prod.nombre}</h3>
                <p className="price">{formatPrice(prod.precio)}</p>
                
                <Link to={`/producto/${prod.id}`} className="btn-ver-detalle">
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}