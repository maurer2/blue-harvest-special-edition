import type { ReactElement } from 'react';

import filmsSchema from '../../schemas/categories/films';

type FilmsDetailsProps = {
  details: unknown;
  index: number;
};

async function FilmsDetails({ details, index }: FilmsDetailsProps): Promise<ReactElement> {
  const planetDetails = filmsSchema.safeParse(details);
  const prefix = `film-details-${index}`;

  if (!planetDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { title, episode_id, director, release_date, producer } = planetDetails.data;

  return (
    <dl
      role="list"
      className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1"
      aria-label="Film details"
    >
      <dt id={`${prefix}-title`}>Title:</dt>
      <dd aria-labelledby={`${prefix}-title`}>{title}</dd>

      <dt id={`${prefix}-episode-id`}>Episode:</dt>
      <dd aria-labelledby={`${prefix}-episode-id`}>{episode_id} km</dd>

      <dt id={`${prefix}-director`}>Director:</dt>
      <dd aria-labelledby={`${prefix}-director`}>{director}</dd>

      <dt id={`${prefix}-release-date`}>Release date:</dt>
      <dd aria-labelledby={`${prefix}-release-date`}>{release_date}</dd>

      <dt id={`${prefix}-producer`}>Population:</dt>
      <dd aria-labelledby={`${prefix}-producer`}>{producer}</dd>
    </dl>
  );
}

export default FilmsDetails;
