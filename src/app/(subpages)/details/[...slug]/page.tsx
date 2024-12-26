import { LoaderCircle } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import Masthead from '../../../components/Masthead';
import getDetails from '../../../services/get-details/get-details';
import getRootCategoryEntries from '../../../services/get-root-entries/get-root-entries';
import { CATEGORIES_COMPONENT_MAP } from './constants';

type DetailsProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Details({ params }: DetailsProps) {
  const [category, id] = (await params).slug;

  const detailsPromise = getDetails(category, id);
  const categoriesPromise = getRootCategoryEntries();

  const componentName = CATEGORIES_COMPONENT_MAP[category as keyof typeof CATEGORIES_COMPONENT_MAP];
  const DetailsComponent = lazy(() => import(`./components/${componentName}`));

  return (
    <>
      <Masthead categoriesPromise={categoriesPromise} />

      <main className="max-w-[calc(1920px-theme(spacing.6)-theme(spacing.6))] p-6">
        <h2 className="mb-4">Details</h2>
        <ErrorBoundary fallback={<p>Failed to load item details</p>}>
          <Suspense
            fallback={<LoaderCircle className="motion-safe:animate-spin h-12 w-12 text-gray-300" />}
          >
            <DetailsComponent itemDetailsPromise={detailsPromise} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
