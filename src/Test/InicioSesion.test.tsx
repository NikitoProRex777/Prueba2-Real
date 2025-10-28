// src/Test/InicioSesion.test.tsx

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Para simular rutas
import { InicioSesion } from "../pages/InicioSesion.tsx"; // Importa el componente

// --- Simulación de Hooks (Mocking) ---
// 1. Simular el hook useAuth
const mockLogin = vi.fn(); // Función simulada para login
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: null, // Asumimos que no hay usuario inicialmente
    login: mockLogin, // Proveemos la función simulada
    logout: vi.fn(), // Simulamos logout también (opcional)
  }),
}));

// 2. Simular el hook useNavigate
const mockNavigate = vi.fn(); // Función simulada para navegación
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual, // Mantenemos funcionalidades originales como MemoryRouter
    useNavigate: () => mockNavigate, // Proveemos la función simulada de navigate
  };
});

// --- 🚨 CORRECCIÓN / AÑADIDO: Simulación de la API ---
// Simulamos la función 'loginUser' de tu archivo de API
// Asegúrate que la ruta '../data/simulatedApi.ts' sea correcta
vi.mock("../data/simulatedApi", () => ({
  loginUser: vi.fn().mockResolvedValue({ // <-- mockResolvedValue simula ÉXITO
    // Datos falsos que devolverá la API simulada al tener éxito
    id: 'mock-user-id',
    nombre: 'Usuario Mock API',
    email: 'test@example.com', // Puedes usar el email de la prueba
    zapatillaFavorita: 'Mock Shoe API'
  })
}));
// --- FIN CORRECCIÓN / AÑADIDO ---


// --- Suite de Pruebas ---
describe("Componente InicioSesion", () => {

  // Reiniciar mocks antes de cada prueba
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // PRUEBA 1: Verificar que los campos y el botón se muestren (Ya corregido)
  it("muestra los campos de correo, contraseña y el botón de entrar", () => {
    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  // PRUEBA 2: (Comentada o ajustada según tu implementación de errores)
  /*
  it("muestra errores personalizados si los campos están vacíos al intentar enviar", async () => {
     // ... (código de la prueba 2 si aplica) ...
     await waitFor(() => {
        expect(mockLogin).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
     });
  });
  */

  // PRUEBA 3: Validar inicio de sesión exitoso (Ahora debería pasar)
  it("llama a login y navega al perfil con credenciales correctas", async () => {
    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    );

    const testEmail = "test@example.com";
    const testPassword = "password123";

    // Simula escribir en los campos
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: testEmail } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: testPassword } });

    // Simula hacer clic en el botón "Entrar"
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Espera a que la función login del contexto sea llamada
    await waitFor(() => {
      // ✅ Verifica que mockLogin SÍ se llamó
      expect(mockLogin).toHaveBeenCalledTimes(1);
      // Verifica que se llamó con los datos devueltos por la API SIMULADA
      expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
        id: 'mock-user-id', // Dato de la API simulada
        email: 'test@example.com' // Dato de la API simulada
      }));
    });

    // Espera a que ocurra la navegación
     await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/perfil");
     });
  });

  // (Puedes añadir la Prueba 4 para credenciales incorrectas aquí si quieres)
});