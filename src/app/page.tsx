import { Suspense } from 'react';
import fetcher from './helpers/fetcher';
import type { RootCategories } from './schemas/root-categories';
import rootCategoriesSchema from './schemas/root-categories';
import Categories, { CategoriesLoading } from './components/Categories';
import Navigation from './components/Navigation';

export default async function Home() {
  const categories: RootCategories | null = await fetcher(
    'https://swapi.dev/api',
    rootCategoriesSchema,
  );

  return (
    <div className="grid min-h-screen items-start p-8 pb-20">
      <Navigation categories={null} />
      <main className="row-start-2 flex flex-col items-center gap-8">
        <h2>Categories</h2>
        <Suspense fallback={<CategoriesLoading />}>
          <Categories categories={categories} />
        </Suspense>
      </main>
    </div>
  );
}
