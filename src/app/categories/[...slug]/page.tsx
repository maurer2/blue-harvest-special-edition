import { LoaderCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import CategoryDetailsList from '../../components/CategoryDetailsList';
import Masthead from '../../components/Masthead';
import ToggleBar from '../../components/ToggleBar';
import fetcher from '../../helpers/fetcher';
import rootCategoriesSchema from '../../schemas/root-categories';
import getCategoryEntries from '../../services/get-category-entries/get-category-entries';
import { CATEGORIES_MAP, QUERY_PARAM_KEYS } from './constants';

type CategoryProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Category({ params, searchParams }: CategoryProps) {
  const category = (await params).slug[0];
  const pageNumber = (await params).slug[1];
  const expandedParam = (await searchParams)?.[QUERY_PARAM_KEYS.EXPANDED];

  const componentName =
    category in CATEGORIES_MAP ? CATEGORIES_MAP[category as keyof typeof CATEGORIES_MAP] : null;
  if (!componentName) {
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
  const expandedParameter = (expandedParam ?? null) !== null;

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

        {entries.length ? (
          <>
            <ToggleBar onRevalidateCurrentCategoryPage={revalidateCurrentCategoryPage} />
            <Suspense
              fallback={
                <LoaderCircle
                  aria-label="Loading a new page"
                  className="animate-spin text-gray-300"
                  size={64}
                />
              }
            >
              <CategoryDetailsList
                entries={entries}
                componentName={componentName}
                hasExpandedParameter={expandedParameter}
              />
            </Suspense>
          </>
        ) : (
          <p>No entries found for this category.</p>
        )}
      </main>
    </>
  );
}
