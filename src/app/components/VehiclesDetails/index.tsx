import Link from 'next/link';
import type { ReactElement } from 'react';

import vehiclesSchema from '../../schemas/categories/vehicles';

type VehiclesDetailsProps = {
  details: unknown;
  index: number;
};

async function VehiclesDetails({ details, index }: VehiclesDetailsProps): Promise<ReactElement> {
  const vehiclesDetails = vehiclesSchema.safeParse(details);
  const prefix = `vehicle-details-${index}`;

  if (!vehiclesDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, uid } = vehiclesDetails.data;

  return (
    <>
      <dl
        role="list"
        className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
        aria-label="Vehicle details"
      >
        <dt id={`${prefix}-name`}>Name:</dt>
        <dd aria-labelledby={`${prefix}-name`}>{name}</dd>
      </dl>
      <Link href={`/details/vehicles/${uid}`}>View details</Link>
    </>
  );
}

export default VehiclesDetails;
