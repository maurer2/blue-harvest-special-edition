import { lazy } from 'react';
import { notFound } from 'next/navigation';

import Navigation from '../components/Navigation';
import CategoryDetailsHeader from '../components/CategoryDetailsHeader';
import fetcher from '../helpers/fetcher';
import type { RootCategories } from '../schemas/root-categories';
import rootCategoriesSchema from '../schemas/root-categories';
import pageSchema, { type Page } from '../schemas/page';

type CategoryProps = {
  params: Promise<{ slug: string }>;
};

const categoriesMap = {
  people: lazy(() => import('../components/PeopleDetails')),
  planets: lazy(() => import('../components/PlanetsDetails')),
  films: lazy(() => import('../components/FilmsDetails')),
};

export default async function Category({ params }: CategoryProps) {
  const category = (await params).slug[0];
  const pageNumber = (await params).slug[1];

  const ComponentForCategory =
    category in categoriesMap ? categoriesMap[category as keyof typeof categoriesMap] : null;

  const categories: RootCategories | null = await fetcher(
    'https://swapi.dev/api',
    rootCategoriesSchema,
  );
  const response: Page | null = await fetcher(
    `https://swapi.dev/api/${category}?page=${pageNumber}`,
    pageSchema,
  );
  const nextPage = response?.next ?? null;
  const previousPage = response?.previous ?? null;

  if (!ComponentForCategory || response === null) {
    return notFound();
  }

  const entries: Page['results'] = response?.results ?? [];

  return (
    <>
      <nav className="mb-4 bg-teal-300 p-6">
        <Navigation categories={categories} />
      </nav>

      <main className="m-6">
        <article>
          <div className="mb-6">
            <CategoryDetailsHeader
              category={category}
              pageNumber={pageNumber}
              nextPage={nextPage}
              previousPage={previousPage}
            />
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
