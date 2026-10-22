import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PruebasPage from '../page';

describe('PruebasPage', () => {
  it('muestra el título y la descripción', () => {
    render(<PruebasPage />);

    expect(
      screen.getByRole('heading', { name: 'Pruebas automatizadas' })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Estas pruebas verifican los componentes/)
    ).toBeInTheDocument();
  });

  it('enlaza al reporte de cobertura', () => {
    render(<PruebasPage />);

    expect(
      screen.getByRole('link', { name: 'Ver reporte de cobertura' })
    ).toHaveAttribute('href', '/coverage/index.html');
  });
});
