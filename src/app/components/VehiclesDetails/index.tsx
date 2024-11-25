import type { ReactElement } from 'react';

import vehiclesSchema from '../../schemas/vehicles';

type VehiclesDetailsProps = {
  details: unknown;
  index: number;
};

async function VehiclesDetails({ details, index }: VehiclesDetailsProps): Promise<ReactElement> {
  const vehiclesDetails = vehiclesSchema.safeParse(details);
  const prefix = `vehicle-details-${index}`;

  if (!vehiclesDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { name, model, cost_in_credits, crew, passengers, cargo_capacity } = vehiclesDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="Vehicle details"
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
    </dl>
  );
}

export default VehiclesDetails;
