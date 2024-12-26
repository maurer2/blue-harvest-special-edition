import { LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { CategoryPayload } from '../../../../../services/get-category-entries/get-category-entries';
import CategoryDetailsHeader from '../../components/CategoryDetailsHeader';
import CategoryDetailsList from '../../components/CategoryDetailsList';

type CategoryDetailsProps = {
  categoryEntriesPromise: Promise<CategoryPayload>;
  category: string;
  pageNumber: string;
};

export default async function CategoryDetails({
  categoryEntriesPromise,
  category,
  pageNumber,
}: CategoryDetailsProps) {
  const categoryEntries = await categoryEntriesPromise;

  const { entries } = categoryEntries;
  const nextPage = categoryEntries.pagination?.next ?? null;
  const previousPage = categoryEntries.pagination?.previous ?? null;

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
          <Suspense
            fallback={
              <LoaderCircle
                aria-label="Loading a new page"
                className="motion-safe:animate-spin text-gray-300"
                size={32}
              />
            }
          >
            <CategoryDetailsList entries={entries} category={category} />
          </Suspense>
        ) : (
          <p>No entries found for this category.</p>
        )}
      </ErrorBoundary>
    </>
  );
}
