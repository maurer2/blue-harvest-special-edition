import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it } from 'vitest';

import StarshipDetails from '.';

type StarshipDetailsProps = ComponentPropsWithoutRef<typeof StarshipDetails>;

describe.skip('StarshipDetails', () => {
  const props: StarshipDetailsProps = {
    details: {
      name: 'CR90 corvette',
      model: 'CR90 corvette',
      manufacturer: 'Corellian Engineering Corporation',
      cost_in_credits: '3500000',
      length: '150',
      max_atmosphering_speed: '950',
      crew: '30-165',
      passengers: '600',
      cargo_capacity: '3000000',
      consumables: '1 year',
      hyperdrive_rating: '2.0',
      MGLT: '60',
      starship_class: 'corvette',
      pilots: [],
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      created: '2014-12-10T14:20:33.369000Z',
      edited: '2014-12-20T21:23:49.867000Z',
      url: 'https://swapi.dev/api/starships/2/',
    },
    index: 0,
  };

  async function renderSeverComponent(currentProps: StarshipDetailsProps = props) {
    const component = await StarshipDetails({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list', { name: 'Starship details' })).toBeInTheDocument();
  });

  it('should render correct values', async () => {
    await renderSeverComponent();

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Name:' })).toHaveTextContent('CR90 corvette');

    expect(screen.getByText('Model:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Model:' })).toHaveTextContent('CR90 corvette');

    expect(screen.getByText('Cost in credits:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Cost in credits:' })).toHaveTextContent(
      '3500000',
    );

    expect(screen.getByText('Crew:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Crew:' })).toHaveTextContent('30-165');

    expect(screen.getByText('Passengers:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Passengers:' })).toHaveTextContent('600');

    expect(screen.getByText('Cargo Capacity:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Cargo Capacity:' })).toHaveTextContent(
      '3000000 t',
    );

    expect(screen.getByText('Starship class:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Starship class:' })).toHaveTextContent(
      'corvette',
    );
  });

  it('should render error message if data is incorrect', async () => {
    await renderSeverComponent({
      details: {},
      index: 0,
    });

    expect(screen.getByText("Details couldn't be loaded.")).toBeInTheDocument();
  });
});
