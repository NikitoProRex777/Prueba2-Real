
// CORRECTO
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';




// 1. Definimos qué datos tendrá el contexto
interface AuthContextType {
  user: any; // Aquí guardaremos los datos del usuario (o null)
  login: (userData: any) => void; // Función para iniciar sesión
  logout: () => void; // Función para cerrar sesión
}

// 2. Creamos el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Creamos el Proveedor (AuthProvider)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  // Esta es la función que llamarás desde tu página de Login (InicioSesion.tsx)
  // cuando el inicio de sesión sea exitoso.
  const login = (userData: any) => {
    setUser(userData);
    // Idealmente, aquí guardas el token en localStorage
  };

  // Esta función la llama el botón "Cerrar Sesión" del Header
  const logout = () => {
    setUser(null);
    // Aquí limpias el token de localStorage
  };

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Creamos el Hook (useAuth)
// Este es el que usa tu Header.tsx
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};