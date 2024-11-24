import { lazy } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';

import Navigation from '../components/Navigation';
import fetcher from '../helpers/fetcher';
import type { RootCategories } from '../schemas/root-categories';
import rootCategoriesSchema from '../schemas/root-categories';
import pageSchema, { type Page } from '../schemas/page';

type CategoryProps = {
  params: Promise<{ slug: string }>;
};

const categoriesMap = {
  people: lazy(() => import('../components/PeopleDetails')),
  planets: lazy(() => import('../components/PlanetDetails')),
  films: lazy(() => import('../components/Films')),
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

  const response: Page | null = await fetcher(
    `https://swapi.dev/api/${category}?page=${page}`,
    pageSchema,
  );
  const nextPage = response?.next ?? null;
  const previousPage = response?.previous ?? null;

  if (!ComponentForCategory || response === null) {
    return notFound();
  }

  const currentPageAsNumber = parseInt(page, 10);
  const hasNextPage = nextPage !== null;
  const hasPrevPage = previousPage !== null;

  const entries: Page['results'] = response?.results ?? [];

  return (
    <>
      <nav className="mb-4 bg-teal-300 p-6">
        <Navigation categories={categories} />
      </nav>

      <main className="m-6">
        <article>
          <div className="mb-6 grid grid-cols-2">
            <h2 className="col-span-full mb-6">
              <span className="text-xl capitalize">{category}</span> (page {page})
            </h2>
            <Link
              href={`/${category}/${currentPageAsNumber - 1}`}
              className={clsx(
                'item-center hover:border-gray mr-auto items-center border bg-teal-300 px-4 py-2 hover:bg-transparent',
                {
                  'line-through opacity-50': !hasPrevPage,
                },
              )}
              inert={!hasPrevPage}
            >
              Previous page
            </Link>
            <Link
              href={`/${category}/${currentPageAsNumber + 1}`}
              className={clsx(
                'item-center hover:border-gray ml-auto items-center border bg-teal-300 px-4 py-2 hover:bg-transparent',
                {
                  'line-through opacity-50': !hasNextPage,
                },
              )}
              inert={!hasNextPage}
            >
              Next page
            </Link>
          </div>

          {entries.length ? (
            <ol
              className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              role="list"
            >
              {entries.map((entry, index) => (
                <li
                  className="overflow-hidden border p-4"
                  key={entry.name || entry.title}
                  role="listitem"
                >
                  <ComponentForCategory details={entry} index={index} />
                </li>
              ))}
            </ol>
          ) : (
            <p>No entries found for this category.</p>
          )}
        </article>
      </main>
    </>
  );
}
