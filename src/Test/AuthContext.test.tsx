
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

// 1. Datos de prueba para el usuario
const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };

// 2. Componente de prueba que consume el contexto
const AuthTestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {/* Mostramos el nombre del usuario o "No user" */}
      <div data-testid="user-display">
        {user ? `Logged in as ${user.name}` : 'No user'}
      </div>

      {/* Botones para interactuar con el contexto */}
      <button onClick={() => login(mockUser)}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

// 3. Suite de tests para AuthContext
describe('AuthContext', () => {

  // Renderizamos el componente de prueba dentro del AuthProvider antes de cada test
  beforeEach(() => {
    render(
      <AuthProvider>
        <AuthTestComponent />
      </AuthProvider>
    );
  });

  it('should show "No user" on initial render', () => {
    // Verificamos que el estado inicial es 'No user'
    expect(screen.getByTestId('user-display')).toHaveTextContent('No user');
  });

  it('should update the user state on login', () => {
    // Verificamos el estado inicial
    expect(screen.getByTestId('user-display')).toHaveTextContent('No user');

    // Hacemos clic en el botón de login
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);

    // Verificamos que el display del usuario se ha actualizado con el nombre del mockUser
    expect(screen.getByTestId('user-display')).toHaveTextContent(`Logged in as ${mockUser.name}`);
  });

  it('should clear the user state on logout', () => {
    const loginButton = screen.getByRole('button', { name: /Login/i });
    const logoutButton = screen.getByRole('button', { name: /Logout/i });

    // Primero, hacemos login
    fireEvent.click(loginButton);
    expect(screen.getByTestId('user-display')).toHaveTextContent(`Logged in as ${mockUser.name}`);

    // Luego, hacemos logout
    fireEvent.click(logoutButton);
    expect(screen.getByTestId('user-display')).toHaveTextContent('No user');
  });

  it('should allow logging in again after a logout', () => {
     const loginButton = screen.getByRole('button', { name: /Login/i });
     const logoutButton = screen.getByRole('button', { name: /Logout/i });
 
     // Secuencia: login -> logout -> login
     fireEvent.click(loginButton);
     expect(screen.getByTestId('user-display')).toHaveTextContent(`Logged in as ${mockUser.name}`);
 
     fireEvent.click(logoutButton);
     expect(screen.getByTestId('user-display')).toHaveTextContent('No user');

     fireEvent.click(loginButton);
     expect(screen.getByTestId('user-display')).toHaveTextContent(`Logged in as ${mockUser.name}`);
  });

});
