import { expect, describe, it, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import HomePage from './page';

const categoriesPayload = {
  people: 'https://swapi.dev/api/people',
  planets: 'https://swapi.dev/api/planets',
  films: 'https://swapi.dev/api/films',
  species: 'https://swapi.dev/api/species',
  vehicles: 'https://swapi.dev/api/vehicles',
  starships: 'https://swapi.dev/api/starships',
};

// mock async child components to make test suite for the page component runnable
vi.mock('./components/Navigation', () => ({
  default: () => <div data-testid="navigation-component">Navigation component</div>,
}));
vi.mock('./components/CategoryTiles', () => ({
  default: () => <div data-testid="category-tiles-component">CategoryTiles component</div>,
}));

export const server = setupServer();

describe('HomePage', () => {
  async function renderSeverComponent() {
    const component = await HomePage();

    return render(component);
  }

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render', async () => {
    server.use(
      http.get('https://swapi.dev/api', async () => {
        return HttpResponse.json(categoriesPayload);
      }),
    );

    await renderSeverComponent();

    expect(await screen.findByTestId('navigation-component')).toBeInTheDocument();
    expect(await screen.findByTestId('category-tiles-component')).toBeInTheDocument();
  });
});
