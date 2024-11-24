import { Suspense, lazy } from 'react';
import Link from 'next/link';

import Navigation, { NavigationLoading } from '../components/Navigation';
import fetcher from '../helpers/fetcher';
import type { RootCategories } from '../schemas/root-categories';
import rootCategoriesSchema from '../schemas/root-categories';
import { notFound } from 'next/navigation';
import useCategoryData from '../hooks/use-category-data';
import pageSchema from '../schemas/page';

type CategoryProps = {
  params: Promise<{ slug: string }>;
};

const categoriesMap = {
  people: lazy(() => import('../components/PeopleDetails')),
};

export default async function Category({ params }: CategoryProps) {
  const category = (await params).slug[0];
  const page = (await params).slug[1];

  let categories: RootCategories | null = null;

  try {
    categories = await fetcher('https://swapi.dev/api', rootCategoriesSchema);
  } catch {
    categories = null;
  }

  const ComponentForCategory =
    category in categoriesMap ? categoriesMap[category as keyof typeof categoriesMap] : null;

  const [response, nextPage, previousPage, currentPageAsNumber, hasNextPage, hasPrevPage] =
    await useCategoryData({
      category,
      page,
      schema: pageSchema,
    });

  if (response === null || ComponentForCategory === null) {
    return notFound();
  }

  const entries = response?.results ?? [];

  return (
    <div>
      <Suspense fallback={<NavigationLoading />}>
        <Navigation categories={categories} />
      </Suspense>

      <article>
        <div className="grid grid-cols-2">
          <h2 className="col-span-full">
            Category: <span className="capitalize">{category}</span> (page {page})
          </h2>
          <Link href={`/${category}/${currentPageAsNumber - 1}`} inert={!hasPrevPage}>
            Previous page
          </Link>
          <Link href={`/${category}/${currentPageAsNumber + 1}`} inert={!hasNextPage}>
            Next page
          </Link>
        </div>

        {entries.length ? (
          <ul className="grid grid-cols-4 gap-4">
            {entries.map((entry) => (
              <li className="overflow-hidden border p-4">
                <ComponentForCategory details={entry} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No entries found</p>
        )}
      </article>
    </div>
  );
}
