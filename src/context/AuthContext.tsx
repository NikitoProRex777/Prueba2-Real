import React, { createContext, useContext, useState, useEffect } from 'react';

// Definimos la forma del Usuario tal cual viene del Backend
interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
  zapatillaFavorita: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 1. Al cargar la página, revisamos si ya había sesión guardada
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Función LOGIN: Conecta con Spring Boot
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8081/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();
      
      // data viene como: { token: "...", role: "...", usuario: "...", id: ... }
      // Construimos el objeto usuario para guardar en React
      const userData: User = {
        id: data.id || 0,
        nombre: data.usuario, // El backend devuelve "usuario", nosotros usamos "nombre"
        email: email,
        role: data.role,
        zapatillaFavorita: data.zapatillaFavorita
      };

      // Guardamos en estado y localStorage
      setToken(data.token);
      setUser(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));

    } catch (error) {
      console.error("Error Login:", error);
      throw error; // Lanzamos el error para que la página de Login muestre la alerta
    }
  };

  // 3. Función LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};