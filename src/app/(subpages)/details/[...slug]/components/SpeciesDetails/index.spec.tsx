import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it } from 'vitest';

import SpeciesDetails from '.';

type SpeciesDetailsProps = ComponentPropsWithoutRef<typeof SpeciesDetails>;

describe.skip('FilmsDetails', () => {
  const props: SpeciesDetailsProps = {
    details: {
      name: 'Human',
      classification: 'mammal',
      designation: 'sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel, grey, amber',
      average_lifespan: '120',
      homeworld: 'https://swapi.dev/api/planets/9/',
      language: 'Galactic Basic',
      people: [
        'https://swapi.dev/api/people/66/',
        'https://swapi.dev/api/people/67/',
        'https://swapi.dev/api/people/68/',
        'https://swapi.dev/api/people/74/',
      ],
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      created: '2014-12-10T13:52:11.567000Z',
      edited: '2014-12-20T21:36:42.136000Z',
      url: 'https://swapi.dev/api/species/1/',
    },
    index: 0,
  };

  async function renderSeverComponent(currentProps: SpeciesDetailsProps = props) {
    const component = await SpeciesDetails({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list', { name: 'Species details' })).toBeInTheDocument();
  });

  it('should render correct values', async () => {
    await renderSeverComponent();

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Name:' })).toHaveTextContent('Human');

    expect(screen.getByText('Classification:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Classification:' })).toHaveTextContent('mammal');

    expect(screen.getByText('Average Height:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Average Height:' })).toHaveTextContent('180 cm');

    expect(screen.getByText('Skin colours:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Skin colours:' })).toHaveTextContent(
      'caucasian, black, asian, hispanic',
    );

    expect(screen.getByText('Hair colours:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Hair colours:' })).toHaveTextContent(
      'blonde, brown, black, red',
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
