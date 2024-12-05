import { lazy, Suspense } from 'react';
import { notFound } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';

import Navigation from '../../components/Navigation';
import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import DetailsToggle from '../../components/DetailsToggle';
import ToggleBar from '../../components/ToggleBar';
import fetcher from '../../helpers/fetcher';
import type { RootCategories } from '../../schemas/root-categories';
import rootCategoriesSchema from '../../schemas/root-categories';
import payloadSchema, { type Payload } from '../../schemas/payload';
import { QUERY_PARAM_KEYS } from './constants';

type CategoryProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const categoriesMap = {
  people: lazy(() => import('../../components/PeopleDetails')),
  planets: lazy(() => import('../../components/PlanetsDetails')),
  films: lazy(() => import('../../components/FilmsDetails')),
  species: lazy(() => import('../../components/SpeciesDetails')),
  vehicles: lazy(() => import('../../components/VehiclesDetails')),
  starships: lazy(() => import('../../components/StarshipsDetails')),
};

export default async function Category({ params, searchParams }: CategoryProps) {
  const category = (await params).slug[0];
  const pageNumber = (await params).slug[1];
  const expandedParam = (await searchParams)?.[QUERY_PARAM_KEYS.EXPANDED];

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
  const hasExpandedParam = (expandedParam ?? null) !== null;

  return (
    <>
      <nav className="mb-6 bg-teal-300 p-6">
        <Navigation categories={categories} />
      </nav>

      <main className="m-6 max-w-[calc(1920px-theme(spacing.6)-theme(spacing.6))]">
        <div className="mb-6">
          <CategoryDetailsHeader
            category={category}
            pageNumber={pageNumber}
            nextPage={nextPage}
            previousPage={previousPage}
            hasExpandedParam={hasExpandedParam}
          />
        </div>

        {entries.length ? (
          <Suspense
            fallback={
              <LoaderCircle
                aria-label="Loading a new page"
                className="animate-spin text-gray-300"
                size={64}
              />
            }
          >
            <ToggleBar />
            <ol
              className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              role="grid"
              aria-label="List of results"
            >
              {entries.map((entry, index) => (
                <li
                  className="overflow-hidden border p-4"
                  key={(entry.name as string) || (entry.title as string)}
                  role="gridcell"
                >
                  <DetailsToggle
                    toggleText={(entry.name as string) || (entry.title as string)}
                    hasForceExpand={hasExpandedParam}
                    key={hasExpandedParam.toString()}
                  >
                    <ComponentForCategory details={entry} index={index} />
                  </DetailsToggle>
                </li>
              ))}
            </ol>
          </Suspense>
        ) : (
          <p>No entries found for this category.</p>
        )}
      </main>
    </>
  );
}
