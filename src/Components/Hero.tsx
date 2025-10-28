import React from 'react';


const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Domina la Cancha</h1>
        <p className="hero-subtitle">
          Los últimos lanzamientos de performance y estilo
          están en AirLegacy.
        </p>
        <button className="hero-button">Ver Colección</button>
      </div>
    </section>
  );
};

export default Hero;