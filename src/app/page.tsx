import fetcher from './helpers/fetcher';
import type { RootCategories } from './schemas/root-categories';
import rootCategoriesSchema from './schemas/root-categories';
import Categories from './components/Categories';
import Navigation from './components/Navigation';

export default async function Home() {
  const categories: RootCategories | null = await fetcher(
    'https://swapi.dev/api',
    rootCategoriesSchema,
  );

  return (
    <div className="min-h-screen bg-teal-50 pb-32">
      <nav className="mb-4 bg-teal-300 p-6">
        <Navigation categories={null} />
      </nav>
      <main className="m-6">
        <Categories categories={categories} />
      </main>
    </div>
  );
}
