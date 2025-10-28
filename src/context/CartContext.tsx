// src/context/CartContext.tsx
import React, { createContext, useContext, useState,type ReactNode } from 'react';
// Importamos tu interface de producto
import type { Producto } from '../data/producto.ts'; 

// 1. Definimos el item del carrito (Producto + talla + cantidad)
export interface CartItem {
  id: string; // ID único (ej: 'p1-US9')
  product: Producto;
  size: string;
  quantity: number;
}

// 2. Definimos el tipo del Contexto
interface CartContextType {
  cartItems: CartItem[];
  // La función ahora debe aceptar 'product' Y 'size'
  addItemToCart: (product: Producto, size: string) => void;
  removeFromCart: (cartId: string) => void;
  incrementItem: (cartId: string) => void;
  decrementItem: (cartId: string) => void;
  getCartTotalItems: () => number;
  getCartTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Creamos el Proveedor (Provider)
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 4. Lógica para AÑADIR item (con talla)
  const addItemToCart = (product: Producto, size: string) => {
    // Creamos un ID único para la combinación producto+talla
    const cartId = `${product.id}-${size}`; 

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === cartId);

      if (existingItem) {
        // Si ya existe (mismo producto, misma talla), solo incrementamos la cantidad
        return prevItems.map(item =>
          item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si es nuevo, lo añadimos al array
        const newItem: CartItem = { id: cartId, product, size, quantity: 1 };
        return [...prevItems, newItem];
      }
    });
    console.log(`Añadido: ${product.name}, Talla: ${size}`);
  };

  // 5. Lógica para QUITAR item (por su ID único)
  const removeFromCart = (cartId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== cartId));
  };

  // 6. Lógica para INCREMENTAR
  const incrementItem = (cartId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 7. Lógica para DECREMENTAR
  const decrementItem = (cartId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 8. Lógica para OBTENER TOTAL DE ITEMS (para el Header)
  const getCartTotalItems = () => {
    // Suma las 'quantity' de todos los items
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 9. Lógica para OBTENER PRECIO TOTAL (para el Carrito)
  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };


  const value = {
    cartItems,
    addItemToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
    getCartTotalItems,
    getCartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 10. Hook para consumir el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};