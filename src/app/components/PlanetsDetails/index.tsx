import Link from 'next/link';
import type { ReactElement } from 'react';

import planetsSchema from '../../schemas/categories/planets';

type PlanetDetailsProps = {
  details: unknown;
  index: number;
};

async function PlanetsDetails({ details, index }: PlanetDetailsProps): Promise<ReactElement> {
  const planetsDetails = planetsSchema.safeParse(details);
  const prefix = `planets-details-${index}`;

  if (!planetsDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, uid } = planetsDetails.data;

  return (
    <>
      <dl
        role="list"
        className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 mb-4"
        aria-label="Planet details"
      >
        <dt id={`${prefix}-name`}>Name:</dt>
        <dd aria-labelledby={`${prefix}-name`}>{name}</dd>
      </dl>
      <Link href={`/details/planets/${uid}`}>View details</Link>
    </>
  );
}

export default PlanetsDetails;
