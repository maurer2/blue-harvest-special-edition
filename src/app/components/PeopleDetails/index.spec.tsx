import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import PeopleDetails from '.';

type PeopleDetailsProps = ComponentPropsWithoutRef<typeof PeopleDetails>;

describe('PlanetDetails', () => {
  const props: PeopleDetailsProps = {
    details: {
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
    index: 0,
  };

  async function renderSeverComponent(currentProps: PeopleDetailsProps = props) {
    const component = await PeopleDetails({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list', { name: 'People details' })).toBeInTheDocument();
  });

  it('should render correct values', async () => {
    await renderSeverComponent();

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Name:' })).toHaveTextContent('Luke Skywalker');

    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Height:' })).toHaveTextContent('172 cm');

    expect(screen.getByText('Mass:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Mass:' })).toHaveTextContent('77 kg');

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Gender:' })).toHaveTextContent('male');

    expect(screen.getByText('Skin colour:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Skin colour:' })).toHaveTextContent('fair');

    expect(screen.getByText('Hair colour:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Hair colour:' })).toHaveTextContent('blond');
  });

  it('should render error message if data is incorrect', async () => {
    await renderSeverComponent({
      details: {},
      index: 0,
    });

    expect(screen.getByText("Details couldn't be loaded.")).toBeInTheDocument();
  });
});
