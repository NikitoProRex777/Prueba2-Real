import React from 'react';



type Product = {
  id: number;
  name: string;
  price: string;
 
};


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        
        <span>Imagen Zapatilla</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  );
};


const sampleProducts: Product[] = [
  { id: 1, name: 'Jordan Zion 3 "Sanctuary"', price: '$140' },
  { id: 2, name: 'Nike LeBron XXI "Akoya"', price: '$200' },
  { id: 3, name: 'Curry 11 "Bruce Lee Fire"', price: '$160' },
  { id: 4, name: 'Adidas Harden Vol. 8', price: '$160' },
];


const FeaturedProducts: React.FC = () => {
  return (
    <section className="featured-products">
      <h2 className="section-title">Novedades</h2>
      <div className="products-grid">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;