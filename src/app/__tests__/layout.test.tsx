import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ className: 'mock-geist', variable: '--font-geist-sans' }),
  Geist_Mono: () => ({
    className: 'mock-geist-mono',
    variable: '--font-geist-mono',
  }),
}));

import RootLayout from '../layout';

describe('RootLayout', () => {
  it('incluye la estructura html, body y el contenido dentro de main', () => {
    const content = <p>Contenido de prueba</p>;
    const result = RootLayout({ children: content });

    expect(result.type).toBe('html');

    const body = result.props.children;
    expect(body.type).toBe('body');

    const main = body.props.children.find(
      (child: { type?: string }) => child?.type === 'main',
    );

    expect(main).toBeDefined();
    expect(main.props.children).toEqual(content);
  });
});