import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

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
vi.mock('./components/Masthead', () => ({
  default: () => <div data-testid="masthead-component">Masthead component</div>,
}));
vi.mock('./components/CategoryTiles', () => ({
  default: () => <div data-testid="category-tiles-component">CategoryTiles component</div>,
}));

export const server = setupServer();

describe.skip('HomePage', () => {
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

    expect(await screen.findByTestId('masthead-component')).toBeInTheDocument();
    expect(await screen.findByTestId('category-tiles-component')).toBeInTheDocument();
  });
});
