import { lazy } from 'react';
import { notFound } from 'next/navigation';

import Navigation from '../../components/Navigation';
import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import fetcher from '../../helpers/fetcher';
import type { RootCategories } from '../../schemas/root-categories';
import rootCategoriesSchema from '../../schemas/root-categories';
import payloadSchema, { type Payload } from '../../schemas/payload';

type CategoryProps = {
  params: Promise<{ slug: string[] }>;
};

const categoriesMap = {
  people: lazy(() => import('../../components/PeopleDetails')),
  planets: lazy(() => import('../../components/PlanetsDetails')),
  films: lazy(() => import('../../components/FilmsDetails')),
  species: lazy(() => import('../../components/SpeciesDetails')),
  vehicles: lazy(() => import('../../components/VehiclesDetails')),
  starships: lazy(() => import('../../components/StarshipsDetails')),
};

export default async function Category({ params }: CategoryProps) {
  const category = (await params).slug[0];
  const pageNumber = (await params).slug[1];

  const ComponentForCategory =
    category in categoriesMap ? categoriesMap[category as keyof typeof categoriesMap] : null;
  if (!ComponentForCategory) {
    return notFound();
  }

  const categories: RootCategories | null = await fetcher(
    'https://swapi.dev/api',
    rootCategoriesSchema,
  );
  const response: Payload | null = await fetcher(
    `https://swapi.dev/api/${category}?page=${pageNumber}`,
    payloadSchema,
  );

  if (!response) {
    return notFound();
  }

  const entries: Payload['results'] = response?.results ?? [];
  const nextPage = response?.next ?? null;
  const previousPage = response?.previous ?? null;

  return (
    <>
      <nav className="mb-4 bg-teal-300 p-6">
        <Navigation categories={categories} />
      </nav>

      <main className="m-6">
        <div className="mb-6">
          <CategoryDetailsHeader
            category={category}
            pageNumber={pageNumber}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </div>

        {entries.length ? (
          <ol
            className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            role="list"
          >
            {entries.map((entry, index) => (
              <li
                className="overflow-hidden border p-4"
                key={(entry.name as string) || (entry.title as string)}
                role="listitem"
              >
                <ComponentForCategory details={entry} index={index} />
              </li>
            ))}
          </ol>
        ) : (
          <p>No entries found for this category.</p>
        )}
      </main>
    </>
  );
}
