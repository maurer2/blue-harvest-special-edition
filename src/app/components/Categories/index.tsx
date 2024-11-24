import Link from 'next/link';
import type { ReactElement } from 'react';

type CategoriesProps = {
  categories: Record<string, string> | null;
};

async function Categories({ categories }: CategoriesProps): Promise<ReactElement> {
  const entries = categories !== null ? Object.entries(categories) : [];

  if (!entries.length) {
    return <p>No categories found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {entries.map(([name]) => (
        <li className="contents" key={name}>
          <Link
            href={`/${name}/1`}
            className="flex aspect-square items-center justify-center border p-4 text-center capitalize hover:border-teal-300 hover:text-teal-300"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
