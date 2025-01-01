import type { CATEGORIES } from '../../../constants';

export const CATEGORIES_COMPONENT_MAP: Record<(typeof CATEGORIES)[number], string> = {
  people: 'PeopleDetails',
  planets: 'PlanetsDetails',
  films: 'FilmsDetails',
  species: 'SpeciesDetails',
  vehicles: 'VehiclesDetails',
  starships: 'StarshipsDetails',
};
