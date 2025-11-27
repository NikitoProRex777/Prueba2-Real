
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../context/CartContext';
import type { Producto } from '../data/producto';

// 1. Mock de producto para usar en los tests
const mockProduct: Producto = {
  id: 'p1',
  name: 'Zapatilla de Prueba',
  price: 100,
  imageUrl: 'test.jpg',
  alt: 'Zapatilla de prueba',
  brand: 'TestBrand',
  description: 'Una descripción de prueba.',
  availableSizes: ['US 9', 'US 10'],
  stock: { 'US 9': 5, 'US 10': 3 },
};

const mockProduct2: Producto = {
    id: 'p2',
    name: 'Otra Zapatilla',
    price: 50,
    imageUrl: 'test2.jpg',
    alt: 'Otra zapatilla de prueba',
    brand: 'TestBrand',
    description: 'Otra descripción.',
    availableSizes: ['US 8'],
    stock: { 'US 8': 10 },
  };

// 2. Componente de Test para interactuar con el contexto
const TestComponent = () => {
  const { 
    cartItems, 
    addItemToCart, 
    removeFromCart, 
    incrementItem, 
    decrementItem, 
    getCartTotalItems, 
    getCartTotalPrice 
  } = useCart();

  return (
    <div>
      <div data-testid="total-items">Total Items: {getCartTotalItems()}</div>
      <div data-testid="total-price">Total Price: {getCartTotalPrice()}</div>

      {/* Botones para interactuar con el carrito */}
      <button onClick={() => addItemToCart(mockProduct, 'US 9')}>Add Mock Product 1 (US 9)</button>
      <button onClick={() => addItemToCart(mockProduct2, 'US 8')}>Add Mock Product 2 (US 8)</button>
      
      {/* Listamos los items para verificar su estado */}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.product.name} (Size: {item.size}) - Qty: {item.quantity}</span>
            <button onClick={() => incrementItem(item.id)}>Increment</button>
            <button onClick={() => decrementItem(item.id)}>Decrement</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 3. Suite de tests para CartContext
describe('CartContext', () => {

  // Función helper para renderizar el componente con el provider
  const renderWithProvider = () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  };

  it('should have an empty cart on initial state', () => {
    renderWithProvider();
    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 0');
  });

  it('should add an item to the cart', () => {
    renderWithProvider();
    const addButton = screen.getByText('Add Mock Product 1 (US 9)');
    fireEvent.click(addButton);

    // Verificar que los totales se actualizan
    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 100');

    // Verificar que el item aparece en la lista
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 1')).toBeInTheDocument();
  });

  it('should increment quantity if the same item (product + size) is added again', () => {
    renderWithProvider();
    const addButton = screen.getByText('Add Mock Product 1 (US 9)');
    
    // Añadir el mismo producto dos veces
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 200');
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 2')).toBeInTheDocument();
  });

  it('should handle increment and decrement actions', () => {
    renderWithProvider();
    const addButton = screen.getByText('Add Mock Product 1 (US 9)');
    fireEvent.click(addButton); // Cantidad: 1

    // Buscar el botón de incrementar asociado al item
    const incrementButton = screen.getByRole('button', { name: /Increment/i });
    fireEvent.click(incrementButton); // Cantidad: 2

    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 200');
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 2')).toBeInTheDocument();

    const decrementButton = screen.getByRole('button', { name: /Decrement/i });
    fireEvent.click(decrementButton); // Cantidad: 1

    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 100');
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 1')).toBeInTheDocument();
  });

  it('should not decrement quantity below 1', () => {
    renderWithProvider();
    const addButton = screen.getByText('Add Mock Product 1 (US 9)');
    fireEvent.click(addButton); // Cantidad: 1

    const decrementButton = screen.getByRole('button', { name: /Decrement/i });
    fireEvent.click(decrementButton); // Intento de bajar de 1
    
    // La cantidad debe seguir siendo 1
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 1')).toBeInTheDocument();
    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 1');
  });

  it('should remove an item from the cart', () => {
    renderWithProvider();
    const addButton = screen.getByText('Add Mock Product 1 (US 9)');
    fireEvent.click(addButton);

    // Asegurarse de que el item está ahí
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 1')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeButton);

    // Verificar que el item ya no está y el carrito está vacío
    expect(screen.queryByText('Zapatilla de Prueba (Size: US 9) - Qty: 1')).not.toBeInTheDocument();
    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 0');
  });

  it('should correctly calculate totals with different items', () => {
    renderWithProvider();
    const addButton1 = screen.getByText('Add Mock Product 1 (US 9)');
    const addButton2 = screen.getByText('Add Mock Product 2 (US 8)');

    fireEvent.click(addButton1); // 1 item, total 100
    fireEvent.click(addButton2); // 2 items, total 150
    fireEvent.click(addButton1); // 3 items (dos del p1), total 250

    expect(screen.getByTestId('total-items')).toHaveTextContent('Total Items: 3');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total Price: 250');
    
    expect(screen.getByText('Zapatilla de Prueba (Size: US 9) - Qty: 2')).toBeInTheDocument();
    expect(screen.getByText('Otra Zapatilla (Size: US 8) - Qty: 1')).toBeInTheDocument();
  });
});
