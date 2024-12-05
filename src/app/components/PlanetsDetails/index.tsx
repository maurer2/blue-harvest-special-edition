import type { ReactElement } from 'react';

import planetsSchema from '../../schemas/planets';

type PlanetDetailsProps = {
  details: unknown;
  index: number;
};

async function PlanetsDetails({ details, index }: PlanetDetailsProps): Promise<ReactElement> {
  const planetDetails = planetsSchema.safeParse(details);
  const prefix = `planet-details-${index}`;

  if (!planetDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, diameter, climate, terrain, population } = planetDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="Planet details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>

      <dt id={`${prefix}-diameter`}>Diameter:</dt>
      <dd aria-labelledby={`${prefix}-diameter`}>{diameter} KM</dd>

      <dt id={`${prefix}-climate`}>Climate:</dt>
      <dd aria-labelledby={`${prefix}-climate`}>{climate}</dd>

      <dt id={`${prefix}-terrain`}>Terrain:</dt>
      <dd aria-labelledby={`${prefix}-terrain`}>{terrain}</dd>

      <dt id={`${prefix}-population`}>Population:</dt>
      <dd aria-labelledby={`${prefix}-population`}>{population}</dd>
    </dl>
  );
}

export default PlanetsDetails;
