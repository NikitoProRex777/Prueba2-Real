// src/pages/Novedades.tsx
import React, { useEffect, useState } from 'react';

// 1. Importamos la API y los componentes
import { getProducts } from '../data/simulatedApi.ts';
import { ProductCard } from '../Components/ProductCard.tsx';
import type { Producto } from '../data/producto.ts';

// 2. Reutilizamos el CSS del catálogo para la grilla
import './Catalogo.css'; 
// 3. Importamos un CSS nuevo para el banner
import './Novedades.css'; 

export function Novedades() {
  // 4. Estados para guardar los productos y la carga
  const [novedades, setNovedades] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 5. useEffect para cargar los datos
  useEffect(() => {
    const loadData = async () => {
      try {
        const allProducts = await getProducts();
        
        // --- ¡AQUÍ ESTÁ LA LÓGICA DE "NOVEDADES"! ---
        // Tomamos los últimos 9 productos de tu lista
        const recentProducts = allProducts.slice(-9);
        
        setNovedades(recentProducts.reverse()); // .reverse() para mostrar el más nuevo primero

      } catch (error) {
        console.error("Error al cargar novedades:", error);
      } finally {
        setIsLoading(false); // Terminamos de cargar
      }
    };

    loadData();
  }, []); // El array vacío [] significa que solo se ejecuta 1 vez

  // 6. Mostramos un mensaje de "Cargando..."
  if (isLoading) {
    return <div className="loading-message">Cargando lanzamientos...</div>;
  }

  return (
    <div className="novedades-page-container">
      
      {/* 7. Banner/Hero para la página */}
      <div className="novedades-hero">
        <h1>Nuevos Lanzamientos</h1>
        <p>Descubre lo último en tecnología y estilo de la temporada.</p>
      </div>

      {/* 8. Contenedor de la grilla (reutilizado de Catalogo.css) */}
      <div className="catalogo-container">
        {/* Grilla de productos (reutilizado de Catalogo.css) */}
        <div className="product-grid">
          {novedades.map(producto => (
            // ¡Reutilizamos el componente ProductCard!
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      </div>
    </div>
  );
}