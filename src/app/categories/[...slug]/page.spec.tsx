import { expect, describe, it, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { notFound } from 'next/navigation';

import CategoryPage from './page';

const categoriesPayload = {
  people: 'https://swapi.dev/api/people',
  planets: 'https://swapi.dev/api/planets',
  films: 'https://swapi.dev/api/films',
  species: 'https://swapi.dev/api/species',
  vehicles: 'https://swapi.dev/api/vehicles',
  starships: 'https://swapi.dev/api/starships',
};
const peopleCategoryPayload = {
  count: 82,
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
      starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
};

type CategoryPageProps = ComponentPropsWithoutRef<typeof CategoryPage>;

// mock async child components to make test suite for the page component runnable
vi.mock('../../components/Navigation', () => ({
  default: () => <div data-testid="navigation-component">Navigation component</div>,
}));
vi.mock('../../components/CategoryDetailsHeader', () => ({
  default: () => (
    <div data-testid="category-details-header-component">CategoryDetailsHeader component</div>
  ),
}));
vi.mock('../../components/PeopleDetails', () => ({
  default: () => <div data-testid="people-details-component">PeopleDetails component</div>,
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

export const server = setupServer();

describe('CategoryPage', () => {
  const props: CategoryPageProps = {
    params: Promise.resolve({ slug: ['people', '1'] }),
  };

  async function renderSeverComponent(currentProps: CategoryPageProps = props) {
    const component = await CategoryPage({ ...currentProps });

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
    server.use(
      http.get('https://swapi.dev/api/people', async () => {
        return HttpResponse.json(peopleCategoryPayload);
      }),
    );

    await renderSeverComponent();

    expect(await screen.findByTestId('navigation-component')).toBeInTheDocument();
    expect(await screen.findByTestId('category-details-header-component')).toBeInTheDocument();
    expect(await screen.findByTestId('people-details-component')).toBeInTheDocument();
    expect(await screen.findByRole('list')).toBeInTheDocument();
  });

  it('should redirect to the 404 page if response for current category can not be loaded', async () => {
    server.use(
      http.get('https://swapi.dev/api', async () => {
        return HttpResponse.json(categoriesPayload);
      }),
    );
    server.use(
      http.get('https://swapi.dev/api/people', async () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Page not found',
        });
      }),
    );

    await renderSeverComponent();

    expect(notFound).toHaveBeenCalled();
  });

  it('should redirect to the 404 page if there is no details page of the current category', async () => {
    server.use(
      http.get('https://swapi.dev/api', async () => {
        return HttpResponse.json(categoriesPayload);
      }),
    );

    await renderSeverComponent({
      params: Promise.resolve({ slug: ['meow', '1'] }),
    });

    expect(notFound).toHaveBeenCalled();
  });

  it('should show an error message if results for current category is empty', async () => {
    server.use(
      http.get('https://swapi.dev/api', async () => {
        return HttpResponse.json(categoriesPayload);
      }),
    );
    server.use(
      http.get('https://swapi.dev/api/people', async () => {
        return HttpResponse.json({
          ...peopleCategoryPayload,
          results: [],
        });
      }),
    );

    await renderSeverComponent();

    expect(await screen.findByText('No entries found for this category.')).toBeInTheDocument();
  });
});
