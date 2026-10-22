import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Character } from '@/types/rickandmorty';
import CharacterCard from '../CharacterCard';

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string }) => (
    <img src={props.src} alt={props.alt} />
  ),
}));

const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://example.com/rick.png',
  location: { name: 'Earth' },
} as Character;

describe('CharacterCard', () => {
  it('muestra el personaje y enlaza a su página', () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/character/1');
    expect(screen.getByRole('img', { name: 'Rick Sanchez' })).toHaveAttribute(
      'src',
      'https://example.com/rick.png',
    );
  });

  it('usa el color verde para un personaje vivo', () => {
    const { container } = render(<CharacterCard character={character} />);

    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
  });

  it('usa el color rojo para un personaje muerto', () => {
    const deadCharacter = { ...character, status: 'Dead' } as Character;
    const { container } = render(<CharacterCard character={deadCharacter} />);

    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
  });

  it('usa el color gris para el estado unknown', () => {
    const unknownCharacter = { ...character, status: 'unknown' } as Character;
    const { container } = render(<CharacterCard character={unknownCharacter} />);

    expect(container.querySelector('.bg-gray-500')).toBeInTheDocument();
  });

  it('usa el color gris para un estado no reconocido', () => {
    const unexpectedCharacter = {
      ...character,
      status: 'Unknown status',
    } as Character;
    const { container } = render(<CharacterCard character={unexpectedCharacter} />);

    expect(container.querySelector('.bg-gray-500')).toBeInTheDocument();
  });
});