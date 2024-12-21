import { LoaderCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense, lazy } from 'react';

import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import DetailsToggle from '../../components/DetailsToggle';
import Masthead from '../../components/Masthead';
import ToggleBar from '../../components/ToggleBar';
import fetcher from '../../helpers/fetcher';
import rootCategoriesSchema from '../../schemas/root-categories';
import getCategoryEntries from '../../services/get-category-entries/get-category-entries';
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

  const revalidateCurrentCategoryPage = async () => {
    'use server';

    revalidatePath('/categories/[...slug]', 'page');
  };

  const [categoriesPayload, categoryEntries] = await Promise.allSettled([
    fetcher('https://swapi.tech/api', rootCategoriesSchema),
    getCategoryEntries(category, pageNumber),
  ]);

  const hasEntriesForMasthead = categoriesPayload.status === 'fulfilled';
  const hasEntriesForCategory = categoryEntries.status === 'fulfilled';

  const entries = hasEntriesForCategory ? categoryEntries.value.entries : [];
  const nextPage = hasEntriesForCategory ? (categoryEntries.value.pagination?.next ?? null) : null;
  const previousPage = hasEntriesForCategory
    ? (categoryEntries.value.pagination?.previous ?? null)
    : null;
  const hasExpandedParam = (expandedParam ?? null) !== null;

  return (
    <>
      <div className="mb-6">
        <Masthead categories={hasEntriesForMasthead ? categoriesPayload.value.result : undefined} />
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

        <Suspense
          fallback={
            <LoaderCircle
              aria-label="Loading a new page"
              className="animate-spin text-gray-300"
              size={64}
            />
          }
        >
          {entries.length ? (
            <>
              <ToggleBar onRevalidateCurrentCategoryPage={revalidateCurrentCategoryPage} />
              <ol
                className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 has-[*>details[open]]:items-stretch"
                role="grid"
                aria-label="List of results"
              >
                {entries.map((entry, index) => {
                  const entryObject = entry as Record<string, unknown>;
                  const title =
                    (entryObject?.name as string) ||
                    (entryObject?.title as string) ||
                    (entryObject?.properties?.title as string);

                  return (
                    <li className="contents" key={title} role="gridcell">
                      <DetailsToggle
                        toggleText={title}
                        hasForceExpand={hasExpandedParam}
                        key={hasExpandedParam.toString()}
                      >
                        <ComponentForCategory details={entry} index={index} />
                      </DetailsToggle>
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            <p>No entries found for this category.</p>
          )}
        </Suspense>
      </main>
    </>
  );
}
