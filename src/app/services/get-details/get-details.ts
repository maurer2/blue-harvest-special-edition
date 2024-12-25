// import { unstable_cacheTag as cacheTag } from 'next/cache';
import fetcher from '../../helpers/fetcher';

export const CATEGORIES_SCHEMA_MAP = {
  people: () => import('../../schemas/details/people'),
  planets: () => import('../../schemas/details/planets'),
  films: () => import('../../schemas/categories/films'),
  species: () => import('../../schemas/details/species'),
  starships: () => import('../../schemas/details/starships'),
  vehicles: () => import('../../schemas/details/vehicles'),
};

const getDetails = async (category: string, id: string): Promise<unknown> => {
  if (!(category in CATEGORIES_SCHEMA_MAP)) {
    throw new Error(`Unknown category: ${category}`);
  }

  const schema = (await CATEGORIES_SCHEMA_MAP[category as keyof typeof CATEGORIES_SCHEMA_MAP]())
    .default;

  return fetcher(`https://www.swapi.tech/api/${category}/${id}`, schema);
};

export default getDetails;
