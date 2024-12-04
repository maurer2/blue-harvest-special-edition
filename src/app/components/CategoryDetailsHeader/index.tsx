import type { ReactElement } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { QUERY_PARAM_KEYS } from '../../categories/[...slug]/constants';

type CategoryDetailsHeaderProps = {
  category: string;
  pageNumber: string;
  nextPage: string | null;
  previousPage: string | null;
  hasExpandedParam: boolean;
};

async function CategoryDetailsHeader({
  category,
  pageNumber,
  nextPage,
  previousPage,
  hasExpandedParam,
}: CategoryDetailsHeaderProps): Promise<ReactElement> {
  const currentPageAsNumber = parseInt(pageNumber, 10);
  const hasNextPage = nextPage !== null;
  const hasPrevPage = previousPage !== null;

  const newQueryParam = hasExpandedParam ? `?${QUERY_PARAM_KEYS.EXPANDED}` : '';

  return (
    <>
      <h2 className="mb-6 text-xl capitalize">{category}</h2>
      <div className="flex gap-6">
        <Link
          href={`/categories/${category}/${currentPageAsNumber - 1}${newQueryParam}`}
          className={clsx(
            'item-hover:border-gray flex grow-0 items-center border p-4 px-4 py-2 capitalize outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300',
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
          href={`/categories/${category}/${currentPageAsNumber + 1}${newQueryParam}`}
          className={clsx(
            'item-hover:border-gray flex grow-0 items-center border p-4 px-4 py-2 capitalize outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300',
            {
              'line-through opacity-50': !hasNextPage,
            },
          )}
          inert={!hasNextPage}
        >
          Next page
        </Link>
      </div>
    </>
  );
}

export default CategoryDetailsHeader;
