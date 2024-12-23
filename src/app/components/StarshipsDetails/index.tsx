import Link from 'next/link';
import type { ReactElement } from 'react';

import starshipsSchema from '../../schemas/categories/starships';

type StarshipDetailsProps = {
  details: unknown;
  index: number;
};

async function StarshipsDetails({ details, index }: StarshipDetailsProps): Promise<ReactElement> {
  const starshipsDetails = starshipsSchema.safeParse(details);
  const prefix = `starship-details-${index}`;

  if (!starshipsDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, uid } = starshipsDetails.data;

  return (
    <>
      <dl
        role="list"
        className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
        aria-label="Starship details"
      >
        <dt id={`${prefix}-name`}>Name:</dt>
        <dd aria-labelledby={`${prefix}-name`}>{name}</dd>
      </dl>
      <Link href={`/details/starships/${uid}`}>View details</Link>
    </>
  );
}

export default StarshipsDetails;
