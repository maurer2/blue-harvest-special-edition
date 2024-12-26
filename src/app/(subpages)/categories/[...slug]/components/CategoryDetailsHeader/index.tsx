'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';

type CategoryDetailsHeaderProps = {
  category: string;
  pageNumber: string;
  nextPage: string | null;
  previousPage: string | null;
};

function CategoryDetailsHeader({
  category,
  pageNumber,
  nextPage,
  previousPage,
}: CategoryDetailsHeaderProps): ReactElement {
  const searchParams = useSearchParams();

  const currentPageAsNumber = parseInt(pageNumber, 10);
  const hasNextPage = nextPage !== null;
  const hasPrevPage = previousPage !== null;

  return (
    <header aria-label="Category title and category level navigation">
      <h1 className="mb-6 text-xl capitalize">{category}</h1>
      <div className="flex gap-6">
        <Link
          href={`/categories/${category}/${currentPageAsNumber - 1}?${searchParams}`}
          className={clsx(
            'flex grow-0 items-center border px-4 py-2 capitalize outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300',
            {
              'line-through opacity-50': !hasPrevPage,
            },
          )}
          inert={!hasPrevPage}
        >
          Previous page
        </Link>
        <p
          className="grow-1 flex grow items-center bg-gray-100 px-4 py-2 text-center"
          data-testid="current-page-number"
          aria-label="Current page number"
        >
          <span className="grow">{pageNumber}</span>
        </p>
        <Link
          href={`/categories/${category}/${currentPageAsNumber + 1}?${searchParams}`}
          className={clsx(
            'flex grow-0 items-center border px-4 py-2 capitalize outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300',
            {
              'line-through opacity-50': !hasNextPage,
            },
          )}
          inert={!hasNextPage}
        >
          Next page
        </Link>
      </div>
    </header>
  );
}

export default CategoryDetailsHeader;
