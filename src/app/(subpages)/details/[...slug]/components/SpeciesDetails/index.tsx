'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactElement } from 'react';
import { use } from 'react';

import type { Species } from '../../../../../schemas/details/species';
import DetailsKeyValueList from '../DetailsKeyValueList';

type SpeciesDetailsProps = {
  itemDetailsPromise: Promise<Species>;
};

export default function SpeciesDetails({ itemDetailsPromise }: SpeciesDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const {
    name,
    classification,
    designation,
    average_height,
    average_lifespan,
    hair_colors,
    skin_colors,
    eye_colors,
    // homeworld,
    language,
    // people
  } = details.result.properties;

  const listDetails: ComponentProps<typeof DetailsKeyValueList>['details'] = [
    {
      name: 'Classification',
      value: classification,
    },
    {
      name: 'Designation',
      value: designation,
    },
    {
      name: 'Average height',
      value: average_height,
    },
    {
      name: 'Average lifespan',
      value: average_lifespan,
    },
    {
      name: 'Hair colors',
      value: hair_colors,
    },
    {
      name: 'Skin colors',
      value: skin_colors,
    },
    {
      name: 'Eye colors',
      value: eye_colors,
    },
    //  {
    //    name: 'Homeworld',
    //    value: homeworld,
    //  },
    {
      name: 'Language',
      value: language,
    },
    //  {
    //    name: 'People',
    //    value: people,
    //  },
  ];

  return (
    <article>
      <h1 className="mb-6">{name}</h1>

      <DetailsKeyValueList listLabel="Species details" listName="species" details={listDetails} />

      <button
        onClick={router.back}
        className="mt-6 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
