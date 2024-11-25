import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import VehiclesDetails from '.';

type VehiclesDetailsProps = ComponentPropsWithoutRef<typeof VehiclesDetails>;

describe('VehicleDetails', () => {
  const props: VehiclesDetailsProps = {
    details: {
      name: 'Sand Crawler',
      model: 'Digger Crawler',
      manufacturer: 'Corellia Mining Corporation',
      cost_in_credits: '150000',
      length: '36.8 ',
      max_atmosphering_speed: '30',
      crew: '46',
      passengers: '30',
      cargo_capacity: '50000',
      consumables: '2 months',
      vehicle_class: 'wheeled',
      pilots: [],
      films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/5/'],
      created: '2014-12-10T15:36:25.724000Z',
      edited: '2014-12-20T21:30:21.661000Z',
      url: 'https://swapi.dev/api/vehicles/4/',
    },
    index: 0,
  };

  async function renderSeverComponent(currentProps: VehiclesDetailsProps = props) {
    const component = await VehiclesDetails({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list', { name: 'Vehicle details' })).toBeInTheDocument();
  });

  it('should render correct values', async () => {
    await renderSeverComponent();

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Name:' })).toHaveTextContent('Sand Crawler');

    expect(screen.getByText('Model:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Model:' })).toHaveTextContent('Digger Crawler');

    expect(screen.getByText('Cost in credits:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Cost in credits:' })).toHaveTextContent(
      '150000',
    );

    expect(screen.getByText('Crew:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Crew:' })).toHaveTextContent('46');

    expect(screen.getByText('Passengers:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Passengers:' })).toHaveTextContent('30');

    expect(screen.getByText('Cargo Capacity:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Cargo Capacity:' })).toHaveTextContent(
      '50000 t',
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
