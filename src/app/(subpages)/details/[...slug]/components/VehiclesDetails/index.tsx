'use client';

import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactElement } from 'react';
import { use } from 'react';

import type { Vehicle } from '../../../../../schemas/details/vehicles';
import DetailsKeyValueList from '../DetailsKeyValueList';

type VehiclesDetailsProps = {
  itemDetailsPromise: Promise<Vehicle>;
};

export default function VehiclesDetails({
  itemDetailsPromise,
}: VehiclesDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const {
    name,
    model,
    vehicle_class,
    manufacturer,
    cost_in_credits,
    length,
    crew,
    passengers,
    max_atmosphering_speed,
    cargo_capacity,
    consumables,
    // films,
    // pilots,
  } = details.result.properties;

  const listDetails: ComponentProps<typeof DetailsKeyValueList>['details'] = [
    {
      name: 'Model',
      value: model,
    },
    {
      name: 'Vehicle_class',
      value: vehicle_class,
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
      name: 'Cargo capacity',
      value: cargo_capacity,
    },
    {
      name: 'consumables',
      value: consumables,
    },
    //  {
    //   name: 'Films',
    //   value: films,
    // },
    // {
    //   name: 'Pilots',
    //   value: pilots,
    // },
  ];

  return (
    <article>
      <h1 className="mb-6">{name}</h1>

      <DetailsKeyValueList listLabel="Vehicle details" listName="vehicle" details={listDetails} />

      <button
        onClick={router.back}
        className="mt-6 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
