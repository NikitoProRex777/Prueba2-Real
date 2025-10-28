// src/pages/Catalogo.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TodoslosProductos } from '../data/producto.ts'; // Importamos la base de datos

// Función para formatear el precio
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
};

export function Catalogo() {
  return (
    <>
      <main className="productos">
        <h2>📌 Catálogo Completo 🧾</h2>
        <div className="grid-productos">
          
          {/* Ahora "mapeamos" el array de productos en lugar de escribirlos a mano */}
          
          {TodoslosProductos.map((producto) => (
            <article className="card" key={producto.id}>
              <img src={producto.imageUrl} alt={producto.alt} />
              <h3>{producto.name}</h3>
              <p className="precio">{formatPrice(producto.price)}</p>
              
              {/* ¡CAMBIO IMPORTANTE!
                El <button> ahora es un <Link> que apunta a la ruta dinámica.
              */}
              <Link 
                to={`/producto/${producto.id}`} 
                className="btn-detalle" // Le damos una clase para estilos
              >
                Ver Detalle
              </Link>

            </article>
          ))}

        </div>
      </main>
    </>
  );
}