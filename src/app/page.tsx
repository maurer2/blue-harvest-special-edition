import { Suspense } from 'react';
import fetcher from './helpers/fetcher';
import type { RootCategories } from './schemas/root-categories';
import rootCategoriesSchema from './schemas/root-categories';
import Categories, { CategoriesLoading } from './components/Categories';
import Navigation, { NavigationLoading } from './components/Navigation';

export default async function Home() {
  let categories: RootCategories | null = null;

  try {
    categories = await fetcher('https://swapi.dev/api', rootCategoriesSchema);
  } catch {
    categories = null;
  }

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-start justify-items-center gap-16 p-8 pb-20">
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
