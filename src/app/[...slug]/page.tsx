import { Suspense, lazy } from 'react';
import Navigation, { NavigationLoading } from '../components/Navigation';
import fetcher from '../helpers/fetcher';
import type { RootCategories } from '../schemas/root-categories';
import rootCategoriesSchema from '../schemas/root-categories';
import { notFound } from 'next/navigation';

type CategoryProps = {
  params: Promise<{ slug: string }>;
};

const categoriesMap = {
  people: lazy(() => import('./components/People')),
};

export default async function Category({ params }: CategoryProps) {
  const category = (await params).slug[0];
  const page = (await params).slug[1] ?? 1;

  let categories: RootCategories | null = null;

  try {
    categories = await fetcher('https://swapi.dev/api', rootCategoriesSchema);
  } catch {
    categories = null;
  }

  const ComponentForCategory =
    category in categoriesMap ? categoriesMap[category as keyof typeof categoriesMap] : null;

  if (ComponentForCategory === null) {
    return notFound();
  }

  return (
    <div>
      <Suspense fallback={<NavigationLoading />}>
        <Navigation categories={categories} />
      </Suspense>

      <ComponentForCategory category={category} page={page} />
    </div>
  );
}
