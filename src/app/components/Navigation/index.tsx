import Link from 'next/link';
import type { ReactElement } from 'react';

type NavigationProps = {
  categories: Record<string, string> | null;
};

async function Navigation({ categories }: NavigationProps): Promise<ReactElement> {
  const entries = categories !== null ? Object.entries(categories) : [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_1fr]">
      <Link href="/">
        <h1>Blue Harvest (SE)</h1>
      </Link>

      {entries.length ? (
        <ul className="flex flex-wrap gap-4 sm:flex-nowrap">
          {entries.map(([name]) => (
            <li key={name}>
              <Link href={`/${name}/1`} className="capitalize">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Navigation;
