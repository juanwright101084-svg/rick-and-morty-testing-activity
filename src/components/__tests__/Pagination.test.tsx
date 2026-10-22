// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('muestra la página actual y enlaza a la página siguiente', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next/i }))
      .toHaveAttribute('href', '/?page=3');
  });

  it('deshabilita Previous en la primera página', () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.queryByRole('link', { name: /previous/i }))
      .not.toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
  });

  it('deshabilita Next en la última página', () => {
    render(<Pagination currentPage={5} totalPages={5} />);

    expect(screen.queryByRole('link', { name: /next/i }))
      .not.toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });
});