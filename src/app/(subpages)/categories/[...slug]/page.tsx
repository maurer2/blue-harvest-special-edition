import { LoaderCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Masthead from '../../../components/Masthead';
import { CATEGORIES } from '../../../constants';
import getCategoryEntries from '../../../services/get-category-entries/get-category-entries';
import getRootCategoryEntries from '../../../services/get-root-entries/get-root-entries';
import CategoryDetails from './components/CategoryDetails';

type CategoryProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Category({ params }: CategoryProps) {
  const [category, pageNumber] = (await params).slug;

  if (!CATEGORIES.includes(category)) {
    return notFound();
  }

  const categoriesPromise = getRootCategoryEntries();
  const categoryEntriesPromise = getCategoryEntries(category, pageNumber);

  return (
    <>
      <Masthead categoriesPromise={categoriesPromise} />

      <main className="max-w-[calc(1920px-theme(spacing.6)-theme(spacing.6))] p-6">
        <ErrorBoundary fallback={<p>Failed to load category details.</p>}>
          <Suspense
            fallback={<LoaderCircle className="motion-safe:animate-spin h-12 w-12 text-gray-300" />}
          >
            <CategoryDetails
              categoryEntriesPromise={categoryEntriesPromise}
              category={category}
              pageNumber={pageNumber}
            />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
