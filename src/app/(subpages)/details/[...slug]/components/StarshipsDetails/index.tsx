'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactElement } from 'react';
import { use } from 'react';

import type { Starship } from '../../../../../schemas/details/starships';
import DetailsKeyValueList from '../DetailsKeyValueList';

type StarshipsDetailsProps = {
  itemDetailsPromise: Promise<Starship>;
};

export default function StarshipsDetails({
  itemDetailsPromise,
}: StarshipsDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const {
    name,
    model,
    starship_class,
    manufacturer,
    cost_in_credits,
    length,
    crew,
    passengers,
    max_atmosphering_speed,
    hyperdrive_rating,
    cargo_capacity,
    consumables,
    // pilots,
  } = details.result.properties;

  const listDetails: ComponentProps<typeof DetailsKeyValueList>['details'] = [
    {
      name: 'Model',
      value: model,
    },
    {
      name: 'Starship class',
      value: starship_class,
    },
    {
      name: 'Manufacturer',
      value: manufacturer,
    },
    {
      name: 'Cost in credits',
      value: cost_in_credits,
    },
    {
      name: 'Length',
      value: length,
    },
    {
      name: 'Crew',
      value: crew,
    },
    {
      name: 'Passengers',
      value: passengers,
    },
    {
      name: 'Max atmosphering speed',
      value: max_atmosphering_speed,
    },
    {
      name: 'Hyperdrive rating',
      value: hyperdrive_rating,
    },
    {
      name: 'Cargo capacity',
      value: cargo_capacity,
    },
    {
      name: 'consumables',
      value: consumables,
    },
    // {
    //   name: 'Pilotes',
    //   value: pilotes,
    // },
  ];

  return (
    <article>
      <h1 className="mb-6">{name}</h1>

      <DetailsKeyValueList listLabel="Starship details" listName="starship" details={listDetails} />

      <button
        onClick={router.back}
        className="mt-6 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
