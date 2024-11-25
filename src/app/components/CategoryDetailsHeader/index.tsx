import type { ReactElement } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

type CategoryDetailsHeaderProps = {
  category: string;
  pageNumber: string;
  nextPage: string | null;
  previousPage: string | null;
};

async function CategoryDetailsHeader({
  category,
  pageNumber,
  nextPage,
  previousPage,
}: CategoryDetailsHeaderProps): Promise<ReactElement> {
  const currentPageAsNumber = parseInt(pageNumber, 10);
  const hasNextPage = nextPage !== null;
  const hasPrevPage = previousPage !== null;

  return (
    <>
      <h2 className="col-span-full mb-6 text-xl capitalize">{category}</h2>
      <div className="flex gap-6">
        <Link
          href={`/categories/${category}/${currentPageAsNumber - 1}`}
          className={clsx(
            'item-hover:border-gray flex grow-0 items-center border bg-teal-300 px-4 py-2 hover:bg-transparent',
            {
              'line-through opacity-50': !hasPrevPage,
            },
          )}
          inert={!hasPrevPage}
        >
          Previous page
        </Link>
        <p className="grow-1 flex grow items-center bg-gray-100 px-4 py-2 text-center">
          <span className="grow">{pageNumber}</span>
        </p>
        <Link
          href={`/categories/${category}/${currentPageAsNumber + 1}`}
          className={clsx(
            'hover:border-gray flex grow-0 items-center border bg-teal-300 px-4 py-2 hover:bg-transparent',
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
