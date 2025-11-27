// src/Test/Registro.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Registro } from "../pages/Registro.tsx";

// --- Simulación de Hooks y API ---

// 1. Simular useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 2. Simular la función `registerUser` de una API (aunque esté comentada en el componente)
// Esto prepara el test para cuando se implemente la llamada a la API.
vi.mock("../data/simulatedApi", () => ({
  // Es importante simularla para que `import` no falle si se descomenta en el componente
  registerUser: vi.fn().mockResolvedValue({
    id: 'new-user-id',
    nombre: 'Usuario de Prueba',
    email: 'test@example.com',
  }),
  // Mantenemos la simulación de loginUser por si acaso
  loginUser: vi.fn(),
}));

// 3. Espía para window.alert
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

// --- Suite de Pruebas ---
describe("Componente Registro", () => {

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  // PRUEBA 1: Verificar que todos los campos y el botón se rendericen
  it("muestra los campos de nombre, correo, contraseña, confirmar contraseña y el botón de registro", () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
  });

  // PRUEBA 2: Mostrar errores de validación si las contraseñas no coinciden
  it("muestra un error de validación si las contraseñas no coinciden", async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Llenar formulario con contraseñas diferentes
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password456' } });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    // Esperar a que aparezca el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });

    // Verificar que no se haya navegado ni mostrado la alerta de éxito
    expect(alertSpy).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  // PRUEBA 3: Registro exitoso
  it("muestra una alerta y navega a /login con un registro exitoso", async () => {
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

    // Llenar el formulario correctamente
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: 'password123' } });

    // Enviar el formulario
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));
    
    // Esperar a que la alerta sea llamada
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledTimes(1);
      expect(alertSpy).toHaveBeenCalledWith('¡Registro exitoso! Serás redirigido.');
    });

    // Esperar a que la navegación ocurra
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
