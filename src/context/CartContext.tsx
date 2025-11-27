
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// 1. Definimos los tipos
export interface CartItem {
  productId: string;
  nombreProducto: string;
  precio: number;
  imagenUrl: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (product: any, size: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotalItems: () => number;
  getCartTotalPrice: () => number;
}

// 2. Creamos el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Definimos las props del Provider explícitamente
interface CartProviderProps {
  children: React.ReactNode; // Usamos React.ReactNode directamente para evitar errores de import
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { token, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // --- Cargar Carrito ---
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    try {
      const res = await fetch('http://localhost:8084/api/v1/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.items) setCartItems(data.items);
      }
    } catch (error) {
      console.error("Error cargando carrito:", error);
    }
  };

  // --- Agregar Item ---
  const addItemToCart = async (product: any, size: string) => {
    const newItem: CartItem = {
      productId: product.id,
      nombreProducto: product.name || product.nombre,
      precio: product.price || product.precio,
      imagenUrl: product.imageUrl || product.imagenUrl,
      size: size,
      quantity: 1
    };

    setCartItems(prev => [...prev, newItem]);

    if (isAuthenticated && token) {
      try {
        await fetch('http://localhost:8084/api/v1/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newItem)
        });
      } catch (error) {
        console.error("Error guardando en backend:", error);
      }
    }
  };

  // --- Vaciar ---
  const clearCart = async () => {
    setCartItems([]);
    if (isAuthenticated && token) {
      try {
        await fetch('http://localhost:8084/api/v1/cart/clear', {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Error vaciando:", error);
      }
    }
  };

  const getCartTotalItems = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const getCartTotalPrice = () => cartItems.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, clearCart, getCartTotalItems, getCartTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
};