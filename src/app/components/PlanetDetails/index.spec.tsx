import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import PlanetDetails from '.';

type PlanetDetailsProps = ComponentPropsWithoutRef<typeof PlanetDetails>;

describe('PlanetDetails', () => {
  const props: PlanetDetailsProps = {
    details: {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/6/',
        'https://swapi.dev/api/people/7/',
        'https://swapi.dev/api/people/8/',
        'https://swapi.dev/api/people/9/',
        'https://swapi.dev/api/people/11/',
        'https://swapi.dev/api/people/43/',
        'https://swapi.dev/api/people/62/',
      ],
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.dev/api/planets/1/',
    },
    index: 0,
  };

  async function renderSeverComponent(currentProps: PlanetDetailsProps = props) {
    const component = await PlanetDetails({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByLabelText('Planet details')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render correct values', async () => {
    await renderSeverComponent();

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Name:' })).toHaveTextContent('Tatooine');

    expect(screen.getByText('Diameter:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Diameter:' })).toHaveTextContent('10465 KM');

    expect(screen.getByText('Mass:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Mass:' })).toHaveTextContent('arid');

    expect(screen.getByText('Terrain:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Terrain:' })).toHaveTextContent('desert');

    expect(screen.getByText('Population:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Population:' })).toHaveTextContent('200000');
  });

  it('should render error message if data is incorrect', async () => {
    await renderSeverComponent({
      details: {},
      index: 0,
    });

    expect(screen.getByText("Details couldn't be loaded.")).toBeInTheDocument();
  });
});
