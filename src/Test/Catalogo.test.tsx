
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Catalogo } from '../pages/Catalogo';
import { TodoslosProductos } from '../data/producto';

describe('Catalogo Page', () => {

  beforeEach(() => {
    // Renderizamos el componente dentro de MemoryRouter porque Catalogo usa <Link>
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );
  });

  it('should render the main heading', () => {
    // Verificamos que el título principal de la página está presente
    expect(screen.getByRole('heading', { name: /Catálogo Completo/i })).toBeInTheDocument();
  });

  it('should render a card for each product from the data source', () => {
    // Obtenemos el número de productos que deberían mostrarse
    const numeroDeProductos = TodoslosProductos.length;

    // Buscamos todos los elementos que son un enlace con el texto "Ver Detalle"
    const linksDeDetalle = screen.getAllByRole('link', { name: /Ver Detalle/i });

    // Verificamos que la cantidad de enlaces coincida con la cantidad de productos
    expect(linksDeDetalle).toHaveLength(numeroDeProductos);
  });

  it('should display the name and price for each product', () => {
    // Iteramos sobre nuestra base de datos de prueba
    for (const producto of TodoslosProductos) {
      // Trim el nombre por si tiene espacios al inicio o final
      const trimmedName = producto.name.trim();
      
      // Buscamos el elemento con el nombre (permitiendo espacios) usando una función matcher
      const productName = screen.getByText((content) => {
        return content.trim() === trimmedName;
      });
      expect(productName).toBeInTheDocument();

      // Encontramos la tarjeta del producto (el elemento 'article' padre)
      const card = productName.closest('article');
      expect(card).not.toBeNull();

      if (card) {
        // Verificamos que el precio formateado esté dentro de la tarjeta específica
        const formattedPrice = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
          .format(producto.price)
          .replace(/\u00A0/g, ' ');

        // Buscamos el precio dentro de la tarjeta, permitiendo cualquier tipo de espacio
        const priceElement = Array.from(card.querySelectorAll('*')).find(el => {
          const normalizedContent = el.textContent?.replace(/\s+/g, ' ') || '';
          const normalizedPrice = formattedPrice.replace(/\s+/g, ' ');
          return normalizedContent === normalizedPrice;
        });

        expect(priceElement).toBeTruthy();
      }
    }
  });

  it('should have correct links for each product detail page', () => {
    // Tomamos el primer producto como ejemplo
    const primerProducto = TodoslosProductos[0];
    
    // Buscamos el enlace asociado al primer producto.
    // Para ello, encontramos la tarjeta del producto y luego el enlace dentro de ella.
    const nombrePrimerProducto = screen.getByText(primerProducto.name);
    const card = nombrePrimerProducto.closest('article'); // Busca el 'article' padre
    
    // Aseguramos que la tarjeta se encontró
    expect(card).not.toBeNull();

    if (card) {
        // Encontramos el enlace dentro de la tarjeta
        const link = card.querySelector('a');
        expect(link).toHaveAttribute('href', `/producto/${primerProducto.id}`);
    }
  });

});
