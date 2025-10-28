// src/pages/Inicio.tsx
import { Link } from 'react-router-dom';
import { TodoslosProductos } from '../data/producto.ts'; // Asegúrate que la ruta sea correcta (¿producto.ts o products.ts?)

export function Inicio() {
  
  // Filtra los productos que quieres mostrar en "Destacados"
  // (Usando los IDs 'p5', 'p4', 'p6' como en tu versión)
  const idsDestacados = ['p5', 'p4', 'p6']; 
  const productosDestacados = TodoslosProductos.filter(p => 
    idsDestacados.includes(p.id)
  );

  return (
    <>
      {/* --- 1. Sección HERO --- */}
      <section className="hero">
        <h1>Domina la cancha con estilo</h1>
        <p>Las mejores zapatillas y accesorios de básquet en un solo lugar.</p>
        <Link to="/catalogo" className="btn-principal">Ver Catálogo</Link>
      </section>

      {/* --- 2. Sección VIDEO --- */}
      <section className="video-promo">
        <h2>Mira la inspiración en acción 🏀</h2>
        <div className="video-container">
          <iframe 
            width="560" 
            height="315"
            src="https://www.youtube.com/embed/CXLM08fZO5o?si=EaXN0XhfEoDepLOC"
            title="YouTube video player" 
            frameBorder="0" // Se usa 'frameBorder' en JSX
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen // Se usa 'allowFullScreen' en JSX
          >
          </iframe>
        </div>
      </section>

      {/* --- 3. Sección PRODUCTOS DESTACADOS --- */}
      <section className="productos">
        <h2>🔥 Productos Destacados</h2>
        
        <div className="grid-productos">
          {productosDestacados.map((producto) => (
            <article className="card" key={producto.id}>
              <img src={producto.imageUrl} alt={producto.alt} />
              <h3>{producto.name}</h3>
              <p className="precio">${producto.price.toLocaleString('es-CL')} CLP</p>
              
              {/* Usa el className correcto para que el estilo coincida */}
              <Link to={`/producto/${producto.id}`} className="btn-detalle"> 
                Ver Detalle
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}