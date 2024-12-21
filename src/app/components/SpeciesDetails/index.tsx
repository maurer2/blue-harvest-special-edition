import type { ReactElement } from 'react';

import speciesSchema from '../../schemas/categories/species';

type SpeciesDetailsProps = {
  details: unknown;
  index: number;
};

async function SpeciesDetails({ details, index }: SpeciesDetailsProps): Promise<ReactElement> {
  const speciesDetails = speciesSchema.safeParse(details);
  const prefix = `species-details-${index}`;

  if (!speciesDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name } = speciesDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="Species details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>
    </dl>
  );
}

export default SpeciesDetails;
