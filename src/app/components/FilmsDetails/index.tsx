import Link from 'next/link';
import type { ReactElement } from 'react';

import filmsSchema from '../../schemas/categories/films';

type FilmsDetailsProps = {
  details: unknown;
  index: number;
};

async function FilmsDetails({ details, index }: FilmsDetailsProps): Promise<ReactElement> {
  const filmsDetails = filmsSchema.safeParse(details);
  const prefix = `film-details-${index}`;

  console.log(details);

  if (!filmsDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, uid } = filmsDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 mb-4"
      aria-label="Film details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>

      <Link href={`/details/films/${uid}`}>View details</Link>
    </dl>
  );
}

export default FilmsDetails;
