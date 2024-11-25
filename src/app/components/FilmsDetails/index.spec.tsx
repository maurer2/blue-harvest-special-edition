import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ComponentPropsWithoutRef } from 'react';

import FilmDetails from '.';

type FilmDetailsProps = ComponentPropsWithoutRef<typeof FilmDetails>;

describe('FilmDetails', () => {
  const props: FilmDetailsProps = {
    details: {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl:
        "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/3/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/5/',
        'https://swapi.dev/api/people/6/',
        'https://swapi.dev/api/people/7/',
        'https://swapi.dev/api/people/8/',
        'https://swapi.dev/api/people/9/',
        'https://swapi.dev/api/people/10/',
        'https://swapi.dev/api/people/12/',
        'https://swapi.dev/api/people/13/',
        'https://swapi.dev/api/people/14/',
        'https://swapi.dev/api/people/15/',
        'https://swapi.dev/api/people/16/',
        'https://swapi.dev/api/people/18/',
        'https://swapi.dev/api/people/19/',
        'https://swapi.dev/api/people/81/',
      ],
      planets: [
        'https://swapi.dev/api/planets/1/',
        'https://swapi.dev/api/planets/2/',
        'https://swapi.dev/api/planets/3/',
      ],
      starships: [
        'https://swapi.dev/api/starships/2/',
        'https://swapi.dev/api/starships/3/',
        'https://swapi.dev/api/starships/5/',
        'https://swapi.dev/api/starships/9/',
        'https://swapi.dev/api/starships/10/',
        'https://swapi.dev/api/starships/11/',
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/13/',
      ],
      vehicles: [
        'https://swapi.dev/api/vehicles/4/',
        'https://swapi.dev/api/vehicles/6/',
        'https://swapi.dev/api/vehicles/7/',
        'https://swapi.dev/api/vehicles/8/',
      ],
      species: [
        'https://swapi.dev/api/species/1/',
        'https://swapi.dev/api/species/2/',
        'https://swapi.dev/api/species/3/',
        'https://swapi.dev/api/species/4/',
        'https://swapi.dev/api/species/5/',
      ],
      created: '2014-12-10T14:23:31.880000Z',
      edited: '2014-12-20T19:49:45.256000Z',
      url: 'https://swapi.dev/api/films/1/',
    },
    index: 0,
  };

  async function renderSeverComponent(currentProps: FilmDetailsProps = props) {
    const component = await FilmDetails({ ...currentProps });

    return render(component);
  }

  it('should render', async () => {
    await renderSeverComponent();

    expect(screen.getByRole('list', { name: 'Film details' })).toBeInTheDocument();
  });

  it('should render correct values', async () => {
    await renderSeverComponent();

    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Title:' })).toHaveTextContent('A New Hope');

    expect(screen.getByText('Episode:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Episode:' })).toHaveTextContent('4');

    expect(screen.getByText('Director:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Director:' })).toHaveTextContent('George Lucas');

    expect(screen.getByText('Release date:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Release date:' })).toHaveTextContent(
      '1977-05-25',
    );

    expect(screen.getByText('Population:')).toBeInTheDocument();
    expect(screen.getByRole('definition', { name: 'Population:' })).toHaveTextContent(
      'Gary Kurtz, Rick McCallum',
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
