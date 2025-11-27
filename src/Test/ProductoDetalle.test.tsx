
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import { ProductoDetalle } from '../pages/ProductoDetalle';
import { CartProvider, useCart } from '../context/CartContext'; // Importamos el provider real
import { TodoslosProductos } from '../data/producto';

// Mock del módulo del contexto del carrito
vi.mock('../context/CartContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../context/CartContext')>();
  return {
    ...mod,
    useCart: vi.fn(), // Mockeamos el hook useCart
  };
});

const mockedUseCart = vi.mocked(useCart);
const addItemToCartMock = vi.fn();

describe('ProductoDetalle Page', () => {

  // Función helper para renderizar el componente con una ruta específica
  const renderWithRouter = (initialRoute: string) => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </MemoryRouter>
    );
  };
  
  beforeEach(() => {
    // Reseteamos los mocks antes de cada test
    addItemToCartMock.mockClear();
    // Configuramos el valor de retorno del hook mockeado
    mockedUseCart.mockReturnValue({
      addItemToCart: addItemToCartMock,
      // Añadimos las otras funciones y propiedades del contexto con valores por defecto
      cartItems: [],
      removeFromCart: vi.fn(),
      incrementItem: vi.fn(),
      decrementItem: vi.fn(),
      getCartTotalItems: () => 0,
      getCartTotalPrice: () => 0,
    });
  });

  it('should display "Producto no encontrado" for an invalid ID', () => {
    renderWithRouter('/producto/id-invalido');
    expect(screen.getByRole('heading', { name: /Producto no encontrado/i })).toBeInTheDocument();
  });

  it('should render product details correctly for a valid ID', () => {
    const product = TodoslosProductos[0];
    renderWithRouter(`/producto/${product.id}`);

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    
    const formattedPrice = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.price);
    expect(screen.getByText(formattedPrice)).toBeInTheDocument();
  });

  it('should show an error if trying to add to cart without selecting a size', async () => {
    const product = TodoslosProductos[0];
    renderWithRouter(`/producto/${product.id}`);

    const addToCartButton = screen.getByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor, selecciona una talla.')).toBeInTheDocument();
    });
    
    // Verificamos que la función de añadir al carrito NO fue llamada
    expect(addItemToCartMock).not.toHaveBeenCalled();
  });

  it('should call addItemToCart with the correct product and size when adding to cart', async () => {
    const product = TodoslosProductos[0];
    const selectedSize = product.availableSizes[0];
    renderWithRouter(`/producto/${product.id}`);

    // 1. Seleccionar una talla
    const sizeButton = screen.getByRole('button', { name: selectedSize });
    expect(sizeButton).not.toHaveClass('selected'); // Opcional: verificar estado inicial
    fireEvent.click(sizeButton);
    expect(sizeButton).toHaveClass('selected'); // Verificar que la talla está seleccionada

    // 2. Hacer clic en añadir al carrito
    const addToCartButton = screen.getByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(addToCartButton);
    
    // 3. Verificar que la notificación de éxito aparece
    await waitFor(() => {
        expect(screen.getByText(`${product.name} (Talla: ${selectedSize}) añadido al carrito.`)).toBeInTheDocument();
    });

    // 4. Verificar que el mock de addItemToCart fue llamado correctamente
    expect(addItemToCartMock).toHaveBeenCalledTimes(1);
    expect(addItemToCartMock).toHaveBeenCalledWith(product, selectedSize);
  });
});
