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

  const { name } = peopleDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="People details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>
    </dl>
  );
}

export default PeopleDetails;
