import { LoaderCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { CategoryPayload } from '../../../../../services/get-category-entries/get-category-entries';
import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import CategoryDetailsList from '../../components/CategoryDetailsList';
import ToggleBar from '../ToggleBar';

type CategoryDetailsProps = {
  categoryEntriesPromise: Promise<CategoryPayload>;
  hasExpandedParameter: boolean;
  category: string;
  pageNumber: string;
  componentName: string;
};

export default async function CategoryDetails({
  categoryEntriesPromise,
  hasExpandedParameter,
  category,
  pageNumber,
  componentName,
}: CategoryDetailsProps) {
  const categoryEntries = await categoryEntriesPromise;

  const { entries } = categoryEntries;
  const nextPage = categoryEntries.pagination?.next ?? null;
  const previousPage = categoryEntries.pagination?.previous ?? null;

  const revalidateCurrentCategoryPage = async () => {
    'use server';

    revalidatePath('/categories/[...slug]', 'page');
  };

  return (
    <>
      <div className="mb-6">
        <CategoryDetailsHeader
          category={category}
          pageNumber={pageNumber}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>

      <ErrorBoundary fallback={<p>Failed to load entries for category.</p>}>
        {entries.length ? (
          <>
            <ToggleBar onRevalidateCurrentCategoryPage={revalidateCurrentCategoryPage} />

            <div className="mt-6">
              <Suspense
                fallback={
                  <LoaderCircle
                    aria-label="Loading a new page"
                    className="motion-safe:animate-spin text-gray-300"
                    size={32}
                  />
                }
              >
                <CategoryDetailsList
                  entries={entries}
                  componentName={componentName}
                  hasExpandedParameter={hasExpandedParameter}
                />
              </Suspense>
            </div>
          </>
        ) : (
          <p>No entries found for this category.</p>
        )}
      </ErrorBoundary>
    </>
  );
}
