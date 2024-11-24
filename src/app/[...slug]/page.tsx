import { Suspense, lazy } from 'react';
import Link from 'next/link';

import Navigation from '../components/Navigation';
import fetcher from '../helpers/fetcher';
import type { RootCategories } from '../schemas/root-categories';
import rootCategoriesSchema from '../schemas/root-categories';
import { notFound } from 'next/navigation';
import useCategoryData from '../hooks/use-category-data';
import pageSchema, { type Page } from '../schemas/page';

type CategoryProps = {
  params: Promise<{ slug: string }>;
};

const categoriesMap = {
  people: lazy(() => import('../components/PeopleDetails')),
  planets: lazy(() => import('../components/PlanetDetails')),
};

export default async function Category({ params }: CategoryProps) {
  const category = (await params).slug[0];
  const page = (await params).slug[1];

  const categories: RootCategories | null = await fetcher(
    'https://swapi.dev/api',
    rootCategoriesSchema,
  );

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
      <Navigation categories={categories} />

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
            {entries.map((entry: Page['results'][number], index: number) => (
              <li className="overflow-hidden border p-4" key={entry.name}>
                <ComponentForCategory details={entry} index={index} />
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
