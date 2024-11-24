import Link from 'next/link';
import type { ReactElement } from 'react';

type CategoriesProps = {
  categories: Record<string, string> | null;
};

function CategoriesLoading() {
  const entries = Array.from({ length: 3 }, (_, index) => index);

  return (
    <ul className="animate-pulse" aria-hidden>
      {entries.map((name) => (
        <li key={name}>
          <span>Entry</span>
        </li>
      ))}
    </ul>
  );
}

async function Categories({ categories }: CategoriesProps): Promise<ReactElement> {
  const entries = categories !== null ? Object.entries(categories) : [];

  if (!entries.length) {
    return <p>No results found</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {entries.map(([name]) => (
        <li className="contents" key={name}>
          <Link
            href={`/${name}/1`}
            className="flex aspect-square items-center justify-center border p-4 text-center capitalize"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
export { CategoriesLoading };
