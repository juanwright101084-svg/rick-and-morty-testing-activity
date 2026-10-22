import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorPage from '../error';

describe('ErrorPage', () => {
  const reset = vi.fn();

  beforeEach(() => {
    reset.mockClear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('muestra el mensaje y registra el error', () => {
    const error = new Error('Error de prueba');

    render(<ErrorPage error={error} reset={reset} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it('llama a reset al pulsar Try again', () => {
    const error = new Error('Error de prueba');

    render(<ErrorPage error={error} reset={reset} />);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
});