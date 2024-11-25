import type { ReactElement } from 'react';

import speciesSchema from '../../schemas/species';

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

  const { name, classification, average_height, skin_colors, hair_colors } = speciesDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="Species details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>

      <dt id={`${prefix}-classification`}>Classification:</dt>
      <dd aria-labelledby={`${prefix}-classification`}>{classification}</dd>

      <dt id={`${prefix}-average-height`}>Average Height:</dt>
      <dd aria-labelledby={`${prefix}-average-height`}>{average_height} cm</dd>

      <dt id={`${prefix}-skin-colours`}>Skin colours:</dt>
      <dd aria-labelledby={`${prefix}-skin-colours`}>{skin_colors}</dd>

      <dt id={`${prefix}-hair-colours`}>Hair colours:</dt>
      <dd aria-labelledby={`${prefix}-hair-colours`}>{hair_colors}</dd>
    </dl>
  );
}

export default SpeciesDetails;
