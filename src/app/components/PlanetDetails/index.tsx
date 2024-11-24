import type { ReactElement } from 'react';
import planetSchema from '../../schemas/planets';

type PlanetDetailsProps = {
  details: unknown;
  index: number;
};

async function PeopleDetails({ details, index }: PlanetDetailsProps): Promise<ReactElement> {
  const planetDetails = planetSchema.safeParse(details);
  const prefix = `planet-details-${index}`;

  if (!planetDetails.success) {
    console.log(planetDetails.error);

    return <p>Details couldn't be loaded</p>;
  }

  const { name, diameter, climate, terrain, population } = planetDetails.data;

  return (
    <dl role="list" className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>

      <dt id={`${prefix}-diameter`}>Diameter:</dt>
      <dd aria-labelledby={`${prefix}-diameter`}>{diameter} km</dd>

      <dt id={`${prefix}-climate`}>Mass:</dt>
      <dd aria-labelledby={`${prefix}-climate`}>{climate}</dd>

      <dt id={`${prefix}-terrain`}>Terrain:</dt>
      <dd aria-labelledby={`${prefix}-terrain`}>{terrain}</dd>

      <dt id={`${prefix}-population`}>Population:</dt>
      <dd aria-labelledby={`${prefix}-population`}>{population}</dd>
    </dl>
  );
}

export default PeopleDetails;