import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCharacter, getEpisodes } from '@/lib/api';
import type { Character, Episode } from '@/types/rickandmorty';
import CharacterPage from '../page';

vi.mock('@/lib/api', () => ({
  getCharacter: vi.fn(),
  getEpisodes: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string }) => (
    <img src={props.src} alt={props.alt} />
  ),
}));

const mockGetCharacter = vi.mocked(getCharacter);
const mockGetEpisodes = vi.mocked(getEpisodes);

const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://example.com/rick.png',
  created: '2017-11-04T18:48:46.250Z',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
} as Character;

const episodes = [
  {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    air_date: 'December 9, 2013',
    episode: 'S01E02',
  },
] as Episode[];

describe('CharacterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra los datos del personaje y sus episodios', async () => {
    mockGetCharacter.mockResolvedValue(character);
    mockGetEpisodes.mockResolvedValue(episodes);

    render(
      await CharacterPage({
        params: Promise.resolve({ id: '1' }),
      }),
    );

    expect(
      screen.getByRole('heading', { name: 'Rick Sanchez' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    expect(screen.getByText('Episodes (2)')).toBeInTheDocument();
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('S01E02')).toBeInTheDocument();

    expect(mockGetCharacter).toHaveBeenCalledWith('1');
    expect(mockGetEpisodes).toHaveBeenCalledWith(['1', '2']);
  });

  it('muestra cero episodios si el personaje no tiene episodios', async () => {
    mockGetCharacter.mockResolvedValue({
      ...character,
      episode: [],
    });
    mockGetEpisodes.mockResolvedValue([]);

    render(
      await CharacterPage({
        params: Promise.resolve({ id: '1' }),
      }),
    );

    expect(screen.getByText('Episodes (0)')).toBeInTheDocument();
    expect(mockGetEpisodes).toHaveBeenCalledWith([]);
  });

  it('muestra el estado Dead', async () => {
    mockGetCharacter.mockResolvedValue({
      ...character,
      status: 'Dead',
      episode: [],
    });
    mockGetEpisodes.mockResolvedValue([]);

    render(
      await CharacterPage({
        params: Promise.resolve({ id: '1' }),
      }),
    );

    expect(screen.getByText('Dead - Human')).toBeInTheDocument();
  });

  it('muestra un estado distinto de Alive o Dead', async () => {
    mockGetCharacter.mockResolvedValue({
      ...character,
      status: 'unknown',
      episode: [],
    });
    mockGetEpisodes.mockResolvedValue([]);

    render(
      await CharacterPage({
        params: Promise.resolve({ id: '1' }),
      }),
    );

    expect(screen.getByText('unknown - Human')).toBeInTheDocument();
  });
});