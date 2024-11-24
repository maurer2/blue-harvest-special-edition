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
    <ul className="list-disc">
      {entries.map(([name]) => (
        <li key={name}>
          <Link href={`/${name}/1`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
export { CategoriesLoading };
