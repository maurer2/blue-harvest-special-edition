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

  const { name, height, gender, mass, skin_color, hair_color } = peopleDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="People details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>

      <dt id={`${prefix}-height`}>Height:</dt>
      <dd aria-labelledby={`${prefix}-height`}>{height} cm</dd>

      <dt id={`${prefix}-mass`}>Mass:</dt>
      <dd aria-labelledby={`${prefix}-mass`}>{mass} kg</dd>

      <dt id={`${prefix}-gender`}>Gender:</dt>
      <dd aria-labelledby={`${prefix}-gender`}>{gender}</dd>

      <dt id={`${prefix}-skin-colour`}>Skin colour:</dt>
      <dd aria-labelledby={`${prefix}-skin-colour`}>{skin_color}</dd>

      <dt id={`${prefix}-hair-colour`}>Hair colour:</dt>
      <dd aria-labelledby={`${prefix}-hair-colour`}>{hair_color}</dd>
    </dl>
  );
}

export default PeopleDetails;
