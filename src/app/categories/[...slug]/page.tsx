import { LoaderCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense, lazy } from 'react';

import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import DetailsToggle from '../../components/DetailsToggle';
import Masthead from '../../components/Masthead';
import ToggleBar from '../../components/ToggleBar';
import fetcher from '../../helpers/fetcher';
import payloadSchema, { type Payload } from '../../schemas/payload';
import type { RootCategories } from '../../schemas/root-categories';
import rootCategoriesSchema from '../../schemas/root-categories';
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

  const revalidateCurrentCategoryPage = async () => {
    'use server';

    revalidatePath('/categories/[...slug]', 'page');
  };

  const entries: Payload['results'] = response?.results ?? [];
  const nextPage = response?.next ?? null;
  const previousPage = response?.previous ?? null;
  const hasExpandedParam = (expandedParam ?? null) !== null;

  return (
    <>
      <div className="mb-6">
        <Masthead categories={categories} />
      </div>

      <main className="m-6 max-w-[calc(1920px-theme(spacing.6)-theme(spacing.6))]">
        <div className="mb-6">
          <CategoryDetailsHeader
            category={category}
            pageNumber={pageNumber}
            nextPage={nextPage}
            previousPage={previousPage}
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
            <ToggleBar onRevalidateCurrentCategoryPage={revalidateCurrentCategoryPage} />
            <ol
              className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 has-[*>details[open]]:items-stretch"
              role="grid"
              aria-label="List of results"
            >
              {entries.map((entry, index) => (
                <li
                  className="contents"
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
