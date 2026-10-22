import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCharacters } from '@/lib/api';
import Home from '../page';

vi.mock('@/lib/api', () => ({
  getCharacters: vi.fn(),
}));

vi.mock('@/components/CharacterCard', () => ({
  default: ({ character }: { character: { name: string } }) => (
    <div data-testid="character-card">{character.name}</div>
  ),
}));

vi.mock('@/components/Pagination', () => ({
  default: ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => (
    <div data-testid="pagination">{`Página ${currentPage} de ${totalPages}`}</div>
  ),
}));

const mockGetCharacters = vi.mocked(getCharacters);

beforeEach(() => {
  vi.clearAllMocks();
  mockGetCharacters.mockResolvedValue({
    results: [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ],
    info: { pages: 5 },
  } as Awaited<ReturnType<typeof getCharacters>>);
});

describe('Home', () => {
  it('muestra personajes y usa página 1 cuando no se indica página', async () => {
    render(await Home({ searchParams: Promise.resolve({}) }));

    expect(screen.getByRole('heading', { name: 'Rick and Morty Characters' })).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toHaveTextContent('Página 1 de 5');
    expect(mockGetCharacters).toHaveBeenCalledWith(1);
  });

  it('usa el número de página indicado', async () => {
    render(await Home({ searchParams: Promise.resolve({ page: '3' }) }));

    expect(mockGetCharacters).toHaveBeenCalledWith(3);
    expect(screen.getByTestId('pagination')).toHaveTextContent('Página 3 de 5');
  });

  it('usa página 1 si page no es un string', async () => {
    render(await Home({ searchParams: Promise.resolve({ page: ['2'] }) }));

    expect(mockGetCharacters).toHaveBeenCalledWith(1);
  });
});
