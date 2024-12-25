import { LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import z from 'zod';

import Masthead from '../../../components/Masthead';
import fetcher from '../../../helpers/fetcher';
import getRootCategoryEntries from '../../../services/get-root-entries/get-root-entries';
import ItemDetails from './components/ItemDetails';

type DetailsProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Details({ params }: DetailsProps) {
  const [category, id] = (await params).slug;

  const detailsPromise = fetcher(`https://www.swapi.tech/api/${category}/${id}`, z.any());
  const categoriesPromise = getRootCategoryEntries();

  return (
    <>
      <Masthead categoriesPromise={categoriesPromise} />

      <main className="max-w-[calc(1920px-theme(spacing.6)-theme(spacing.6))] p-6">
        <h2 className="capitalize mb-4">{category}</h2>
        <ErrorBoundary fallback={<p>Failed to load item details.</p>}>
          <Suspense
            fallback={<LoaderCircle className="motion-safe:animate-spin h-12 w-12 text-gray-300" />}
          >
            <ItemDetails itemDetailsPromise={detailsPromise} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}
