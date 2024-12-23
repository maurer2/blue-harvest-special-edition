import Link from 'next/link';
import type { ReactElement } from 'react';

import peopleSchema from '../../schemas/categories/people';

type PeopleDetailsProps = {
  details: unknown;
  index: number;
};

async function PeopleDetails({ details, index }: PeopleDetailsProps): Promise<ReactElement> {
  const peopleDetails = peopleSchema.safeParse(details);
  const prefix = `people-details-${index}`;

  if (!peopleDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, uid } = peopleDetails.data;

  return (
    <>
      <dl
        role="list"
        className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 mb-4"
        aria-label="People details"
      >
        <dt id={`${prefix}-name`}>Name:</dt>
        <dd aria-labelledby={`${prefix}-name`}>{name}</dd>
      </dl>
      <Link href={`/details/people/${uid}`}>View details</Link>
    </>
  );
}

export default PeopleDetails;
