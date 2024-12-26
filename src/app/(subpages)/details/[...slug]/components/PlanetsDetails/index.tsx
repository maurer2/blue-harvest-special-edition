'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactElement } from 'react';
import { use } from 'react';

import type { Planet } from '../../../../../schemas/details/planets';
import DetailsKeyValueList from '../DetailsKeyValueList';

type PlanetsDetailsProps = {
  itemDetailsPromise: Promise<Planet>;
};

export default function PlanetsDetails({ itemDetailsPromise }: PlanetsDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const {
    name,
    diameter,
    rotation_period,
    orbital_period,
    gravity,
    population,
    climate,
    terrain,
    surface_water,
  } = details.result.properties;

  const listDetails: ComponentProps<typeof DetailsKeyValueList>['details'] = [
    {
      name: 'Diameter',
      value: diameter,
    },
    {
      name: 'Rotation period',
      value: rotation_period,
    },
    {
      name: 'Orbital period',
      value: orbital_period,
    },
    {
      name: 'Gravity',
      value: gravity,
    },
    {
      name: 'Population',
      value: population,
    },
    {
      name: 'Climate',
      value: climate,
    },
    {
      name: 'Terrain',
      value: terrain,
    },
    {
      name: 'Surface water',
      value: surface_water,
    },
  ];

  return (
    <article>
      <h1 className="mb-6">{name}</h1>

      <DetailsKeyValueList listLabel="Planet details" listName="planet" details={listDetails} />

      <button
        onClick={router.back}
        className="mt-6 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
