import CategoryTiles from './components/CategoryTiles';
import Navigation from './components/Navigation';
import fetcher from './helpers/fetcher';
import type { RootCategories } from './schemas/root-categories';
import rootCategoriesSchema from './schemas/root-categories';

export default async function Home() {
  const categories: RootCategories | null = await fetcher(
    'https://swapi.dev/api',
    rootCategoriesSchema,
  );

  return (
    <div className="min-h-screen pb-32">
      <nav className="mb-6 bg-teal-300 p-6">
        <Navigation categories={null} />
      </nav>
      <main className="m-6">
        <CategoryTiles categories={categories} />
      </main>
    </div>
  );
}
