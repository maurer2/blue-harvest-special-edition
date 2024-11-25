import type { ReactElement } from 'react';

import starshipsSchema from '../../schemas/starships';

type StarshipDetailsProps = {
  details: unknown;
  index: number;
};

async function StarshipsDetails({ details, index }: StarshipDetailsProps): Promise<ReactElement> {
  const starshipDetails = starshipsSchema.safeParse(details);
  const prefix = `starship-details-${index}`;

  if (!starshipDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, model, cost_in_credits, crew, passengers, cargo_capacity, starship_class } =
    starshipDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="Starship details"
    >
      <dt id={`${prefix}-name`}>Name:</dt>
      <dd aria-labelledby={`${prefix}-name`}>{name}</dd>

      <dt id={`${prefix}-model`}>Model:</dt>
      <dd aria-labelledby={`${prefix}-model`}>{model}</dd>

      <dt id={`${prefix}-cost-in-credits`}>Cost in credits:</dt>
      <dd aria-labelledby={`${prefix}-cost-in-credits`}>{cost_in_credits}</dd>

      <dt id={`${prefix}-crew`}>Crew:</dt>
      <dd aria-labelledby={`${prefix}-crew`}>{crew}</dd>

      <dt id={`${prefix}-passengers`}>Passengers:</dt>
      <dd aria-labelledby={`${prefix}-passengers`}>{passengers}</dd>

      <dt id={`${prefix}-cargo-capacity`}>Cargo Capacity:</dt>
      <dd aria-labelledby={`${prefix}-cargo-capacity`}>{cargo_capacity} t</dd>

      <dt id={`${prefix}-starship-class`}>Starship class:</dt>
      <dd aria-labelledby={`${prefix}-starship-class`}>{starship_class}</dd>
    </dl>
  );
}

export default StarshipsDetails;
