import CategoryTiles from './components/CategoryTiles';
import Navigation from './components/Masthead';
import fetcher from './helpers/fetcher';
import rootCategoriesSchema from './schemas/root-categories';

export default async function Home() {
  const categories = await fetcher('https://swapi.tech/api/', rootCategoriesSchema).catch(() => {
    return undefined;
  });

  return (
    <div className="min-h-screen pb-32">
      <nav className="mb-6 bg-teal-300">
        <Navigation />
      </nav>
      <main className="m-6">
        <CategoryTiles categories={categories?.result} />
      </main>
    </div>
  );
}
