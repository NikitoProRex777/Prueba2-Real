// src/data/simulatedapi.ts

// --- 1. IMPORTAMOS TUS PRODUCTOS ---
// (Esto soluciona el error de Novedades.tsx)
import { TodoslosProductos, type Producto } from './producto.ts';

// --- 2. BASE DE DATOS DE USUARIOS (La mantenemos aquí) ---
// (Como no tienes users.ts, esta lista se queda aquí)
const users = [
  {
    id: 1,
    nombre: "Usuario Admin",
    email: "admin@correo.com",
    password: "123", // ¡Nunca guardes contraseñas así en un proyecto real!
    zapatillaFavorita: "Air Max 90"
  }
];

// --- LÓGICA DE USUARIOS (Sin cambios) ---
// Estas funciones usan el array 'users' de aquí arriba.
export const registerUser = (nombre: string, email: string, password: string, zapatilla: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userExists = users.find(u => u.email === email);
      if (userExists) {
        reject(new Error("El correo electrónico ya está registrado."));
      } else {
        const newUser = { id: Date.now(), nombre, email, password, zapatillaFavorita: zapatilla };
        users.push(newUser);
        console.log("Usuarios en BD simulada:", users);
        resolve(newUser);
      }
    }, 500);
  });
};

export const loginUser = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email);
      if (user && user.password === password) {
        // ¡Éxito! Devolvemos los datos del usuario (sin la contraseña)
        const { password, ...userData } = user;
        resolve(userData);
      } else {
        // Error
        reject(new Error("Email o contraseña incorrectos."));
      }
    }, 500);
  });
};

// --- 3. LÓGICA DE PRODUCTOS (Actualizada) ---

// "LEER" (Read) todos los productos
// Esta función ahora devuelve la lista correcta de product.ts
export const getProducts = () => {
  return new Promise<Producto[]>((resolve) => {
    // Simulamos un pequeño retraso de red
    setTimeout(() => {
      resolve(TodoslosProductos); // Devuelve la lista importada
    }, 300);
  });
};

// "LEER" (Read) un producto por ID
// Esta función ahora busca por 'id: string'
export const getProductById = (id: string) => {
  return new Promise<Producto>((resolve, reject) => {
    setTimeout(() => {
      const product = TodoslosProductos.find(p => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, 300);
  });
};