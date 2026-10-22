import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCharacter, getCharacters, getEpisodes } from '../api';

const API_URL = 'https://rickandmortyapi.com/api';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getCharacters', () => {
  it('solicita la página 1 por defecto y devuelve los datos', async () => {
    const data = { results: [{ id: 1, name: 'Rick Sanchez' }] };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getCharacters()).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/character?page=1`);
  });

  it('solicita la página indicada', async () => {
    const data = { results: [] };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getCharacters(3)).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/character?page=3`);
  });

  it('lanza un error si la respuesta falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    await expect(getCharacters()).rejects.toThrow('Failed to fetch characters');
  });
});

describe('getCharacter', () => {
  it('solicita el personaje por su identificador y devuelve los datos', async () => {
    const data = { id: 1, name: 'Rick Sanchez' };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getCharacter('1')).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/character/1`);
  });

  it('lanza un error si la respuesta falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    await expect(getCharacter('999')).rejects.toThrow(
      'Failed to fetch character details',
    );
  });
});

describe('getEpisodes', () => {
  it('devuelve un arreglo vacío sin llamar a fetch cuando no hay identificadores', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(getEpisodes([])).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('solicita varios episodios y devuelve el arreglo', async () => {
    const data = [{ id: 1 }, { id: 2 }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getEpisodes(['1', '2'])).resolves.toEqual(data);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/episode/1,2`);
  });

  it('convierte la respuesta de un solo episodio en un arreglo', async () => {
    const data = { id: 1, name: 'Pilot' };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getEpisodes(['1'])).resolves.toEqual([data]);
  });

  it('lanza un error si la respuesta falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    await expect(getEpisodes(['1'])).rejects.toThrow('Failed to fetch episodes');
  });
});
