'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactElement } from 'react';
import { use } from 'react';

import type { Film } from '../../../../../schemas/details/films';
import DetailsKeyValueList from '../DetailsKeyValueList';

type FilmsDetailsProps = {
  itemDetailsPromise: Promise<Film>;
};

export default function FilmsDetails({ itemDetailsPromise }: FilmsDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const {
    title,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
    // characters,
    // planets,
    // starships,
    // vehicles,
    // species,
  } = details.result.properties;

  const listDetails: ComponentProps<typeof DetailsKeyValueList>['details'] = [
    {
      name: 'Episode id',
      value: episode_id.toString(),
    },
    {
      name: 'Opening Crawl',
      value: opening_crawl,
    },
    {
      name: 'Director',
      value: director,
    },
    {
      name: 'Producer',
      value: producer,
    },
    {
      name: 'Release date',
      value: release_date,
    },
    // {
    //   name: 'characters',
    //   value: characters,
    // },
    // {
    //   name: 'planets',
    //   value: planets,
    // },
    // {
    //   name: 'starships',
    //   value: starships,
    // },
    // {
    //   name: 'vehicles',
    //   value: vehicles,
    // },
    // {
    //   name: 'species',
    //   value: species,
    // },
  ];

  return (
    <article>
      <h1 className="mb-6">{title}</h1>

      <DetailsKeyValueList listLabel="Film details" listName="film" details={listDetails} />

      <button
        onClick={router.back}
        className="mt-6 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
