'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactElement } from 'react';
import { use } from 'react';

import type { People } from '../../../../../schemas/details/people';
import DetailsKeyValueList from '../DetailsKeyValueList';

type PeopleDetailsProps = {
  itemDetailsPromise: Promise<People>;
};

export default function PeopleDetails({ itemDetailsPromise }: PeopleDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const {
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    // homeworld,
    mass,
    skin_color,
  } = details.result.properties;

  const listDetails: ComponentProps<typeof DetailsKeyValueList>['details'] = [
    {
      name: 'Birth year',
      value: birth_year,
    },
    {
      name: 'Eye color',
      value: eye_color,
    },
    {
      name: 'Gender',
      value: gender,
    },
    {
      name: 'Hair color',
      value: hair_color,
    },
    {
      name: 'Height',
      value: height,
    },
    // {
    //   name: 'Homeworld',
    //   value: homeworld,
    // },
    {
      name: 'Mass',
      value: mass,
    },
    {
      name: 'Skin color',
      value: skin_color,
    },
  ];

  return (
    <article>
      <h1 className="mb-6">{name}</h1>

      <DetailsKeyValueList listLabel="People details" listName="people" details={listDetails} />

      <button
        onClick={router.back}
        className="mt-6 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
