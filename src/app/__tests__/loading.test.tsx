import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from '../loading';

describe('Loading', () => {
  it('muestra los esqueletos de carga', () => {
    const { container } = render(<Loading />);

    expect(
      container.querySelectorAll('.animate-pulse').length,
    ).toBeGreaterThan(0);
  });
});