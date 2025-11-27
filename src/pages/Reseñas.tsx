import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import './Reseña.css'; 

interface Resena {
  id: number;
  usuario: string;
  rating: number;
  comentario: string;
  fecha: string;
}

// --- TU LISTA COMPLETA DE ZAPATILLAS PARA EL CARRUSEL ---
const ZAPATILLAS_CARRUSEL = [
  "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fdbb7b3d39f64ae0a41b8e4ac0e149aa_9366/Zapatillas_Dame_X_Negro_JP6090_01_00_standard.jpg",
  "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7765415ffc944868860294b4f1b32a6f_9366/Harden_Volume_9_Rojo_JS1304_01_00_standard.jpg",
  "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/e33dcc08e33e4950b92f41895017201c_9366/Zapatillas_Anthony_Edwards_1_Low_Turquesa_JQ6135_01_00_standard.jpg",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1402989-1200-1200?v=638888885307530000&width=1200&height=1200&aspect=true",
  "https://anta.com/cdn/shop/files/ANTA-KAI-2-Triple-Black-Media-3_900x.jpg?v=1748327213",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1214803-1200-1200?v=638726464510200000&width=1200&height=1200&aspect=true",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1314532-1200-1200?v=638809440120900000&width=1200&height=1200&aspect=true",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1294547-1200-1200?v=638804214147730000&width=1200&height=1200&aspect=true",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1486906-1200-1200?v=638968351212630000&width=1200&height=1200&aspect=true",
  "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0de143535947404c99350cbbea293441_9366/Zapatillas_Anthony_Edwards_2_Azul_JR4359_01_00_standard.jpg",
  "https://images.stockx.com/images/Nike-Sabrina-2-Doernbecher-Sophia-Womens-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1738344458",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1385873-1200-1200?v=638882236814730000&width=1200&height=1200&aspect=true",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1403479-1200-1200?v=638888887301900000&width=1200&height=1200&aspect=true",
  "https://newbalance.cl/media/catalog/product/z/a/zapatillas-basquetbol-hombre-new-balance-kawhi-iv-rosada-lateral.png?optimize=low&bg-color=255,255,255&fit=bounds&height=650&width=650&canvas=650:650",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1468152-1200-1200?v=638968274844230000&width=1200&height=1200&aspect=true",
  "https://nikeclprod.vtexassets.com/arquivos/ids/1469232-1200-1200?v=638968278218030000&width=1200&height=1200&aspect=true"
];

export function Reseñas() {
  const { user, token, isAuthenticated } = useAuth();
  
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const PRODUCT_ID = "tienda_general"; 

  useEffect(() => {
    fetchResenas();
  }, []);

  const fetchResenas = async () => {
    try {
      const res = await fetch(`http://localhost:8082/api/v1/resenas/product/${PRODUCT_ID}`);
      if (res.ok) {
        const data = await res.json();
        setResenas(data);
      }
    } catch (error) {
      console.error("Error cargando reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newRating === 0) {
      alert("¡Por favor selecciona las estrellas! ⭐");
      return;
    }

    const nuevaResenaData = {
      productId: PRODUCT_ID,
      usuario: user?.nombre || "Anónimo", 
      email: user?.email,
      rating: newRating,
      comentario: newComment
    };

    try {
      const res = await fetch('http://localhost:8082/api/v1/resenas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(nuevaResenaData)
      });

      if (res.ok) {
        alert("¡Gracias por tu reseña! 🏀");
        setNewComment('');
        setNewRating(0);
        fetchResenas(); // Recargar lista
      } else {
        alert("Hubo un error al enviar tu opinión.");
      }
    } catch (error) {
      console.error("Error enviando:", error);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "star" : "star-vacia"}>
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <>
      {/* --- CARRUSEL INFINITO (MARQUEE) --- */}
      <div className="carrusel-container">
        <div className="carrusel-track">
             {/* Renderizamos la lista DOS VECES para el efecto infinito */}
             {[...ZAPATILLAS_CARRUSEL, ...ZAPATILLAS_CARRUSEL].map((imgUrl, index) => (
               <div key={index} className="carrusel-item">
                 <img src={imgUrl} alt="Zapatilla" />
               </div>
             ))}
        </div>
      </div>

      {/* --- SECCIÓN DE COMENTARIOS --- */}
      <main className="reseñas">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>⭐️ Opiniones de la Comunidad AirLegacy ⭐️</h2>

        {isAuthenticated ? (
          <div className="resena-form-container">
            <h3>¿Qué opinas, {user?.nombre}?</h3>
            <form onSubmit={handleSubmit}>
              
              <div className="star-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star-input ${star <= newRating ? 'selected' : ''}`}
                    onClick={() => setNewRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea 
                className="resena-textarea"
                placeholder="Escribe tu experiencia aquí..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              
              <button type="submit" className="btn-enviar-resena">Publicar Reseña</button>
            </form>
          </div>
        ) : (
          <div className="login-warning">
            <p>🔒 <strong>Inicia Sesión</strong> para poder dejar tu reseña y calificación.</p>
          </div>
        )}

        <section className="reseña-list">
          {loading ? (
            <p style={{ textAlign: 'center' }}>Cargando comentarios...</p>
          ) : resenas.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Aún no hay reseñas. ¡Sé el primero en comentar!</p>
          ) : (
            [...resenas].reverse().map((resena) => (
              <article className="reseña-card" key={resena.id}>
                <h3>{resena.usuario}</h3>
                <div className="estrellas">
                  {renderStars(resena.rating)}
                </div>
                <p>{resena.comentario}</p>
                <small style={{ color: '#999', display: 'block', marginTop: '10px' }}>
                  {resena.fecha}
                </small>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
}