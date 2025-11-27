
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Contactanos } from '../pages/Contactanos';

// Mock para la función alert de window
const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('Contactanos Form', () => {

  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    alertSpy.mockClear();
    render(<Contactanos />);
  });

  it('should render the form with all fields and no initial errors', () => {
    expect(screen.getByRole('heading', { name: /Contáctanos/i })).toBeInTheDocument();
    
    // Usamos getByLabelText que es más accesible
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();

    // Asegurarse de que no hay mensajes de error al inicio
    expect(screen.queryByText(/no puede estar vacío/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
  });

  it('should show validation errors when submitting the form empty', async () => {
    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(submitButton);

    // Los mensajes de error aparecen de forma asíncrona, usamos waitFor
    await waitFor(() => {
      expect(screen.getByText('El nombre no puede estar vacío.')).toBeInTheDocument();
      expect(screen.getByText('El email es obligatorio.')).toBeInTheDocument();
      expect(screen.getByText('El mensaje no puede estar vacío.')).toBeInTheDocument();
    });

    // La alerta no debe haber sido llamada
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('should show an error for an invalid email format', async () => {
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Enviar/i });

    // Llenamos el formulario (dejando el email inválido)
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Este es un mensaje lo suficientemente largo.' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Formato de email no válido.')).toBeInTheDocument();
    });
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('should show an error for a message that is too short', async () => {
    const submitButton = screen.getByRole('button', { name: /Enviar/i });

    // Llenamos el formulario con un mensaje corto
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Corta' } });

    fireEvent.click(submitButton);
    
    await waitFor(() => {
        expect(screen.getByText('El mensaje debe tener al menos 10 caracteres.')).toBeInTheDocument();
    });
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('should submit the form successfully and clear the fields', async () => {
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const mensajeInput = screen.getByLabelText(/Mensaje/i);
    const submitButton = screen.getByRole('button', { name: /Enviar/i });

    // Llenamos el formulario con datos válidos
    fireEvent.change(nombreInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@example.com' } });
    fireEvent.change(mensajeInput, { target: { value: 'Este es un mensaje de prueba válido y lo suficientemente largo.' } });

    // Verificamos que los inputs tienen los valores escritos
    expect(nombreInput).toHaveValue('Test User');
    expect(emailInput).toHaveValue('test.user@example.com');

    // Enviamos el formulario
    fireEvent.click(submitButton);

    await waitFor(() => {
      // 1. Verificar que la alerta fue llamada con el mensaje correcto
      expect(alertSpy).toHaveBeenCalledWith('Gracias Test User, tu mensaje ha sido enviado!');
    });

    // 2. Verificar que los campos se limpiaron después del envío exitoso
    expect(nombreInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(mensajeInput).toHaveValue('');
  });
});
