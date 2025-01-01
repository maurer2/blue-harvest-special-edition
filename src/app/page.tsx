import { LoaderCircle } from 'lucide-react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CategoryTiles from './components/CategoryTiles';
import Masthead from './components/Masthead';
import getRootCategoryEntries from './services/get-root-entries/get-root-entries';

export default async function Home() {
  const categoriesPromise = getRootCategoryEntries();

  return (
    <div className="min-h-screen pb-32">
      <nav className="mb-6 bg-teal-300">
        <Masthead />
      </nav>
      <main className="m-6">
        <ErrorBoundary fallback={<p>Failed to load categories.</p>}>
          <Suspense
            fallback={<LoaderCircle className="motion-safe:animate-spin h-12 w-12 text-gray-300" />}
          >
            <CategoryTiles categoriesPromise={categoriesPromise} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
