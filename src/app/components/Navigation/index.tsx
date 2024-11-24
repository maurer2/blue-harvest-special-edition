import Link from 'next/link';
import type { ReactElement } from 'react';

type NavigationProps = {
  categories: Record<string, string> | null;
};

async function Navigation({ categories }: NavigationProps): Promise<ReactElement> {
  const entries = categories !== null ? Object.entries(categories) : [];

  return (
    <nav className="grid grid-cols-[auto_auto_1fr] gap-4">
      <h1>Blue Harvest</h1>

      <Link href="/">Home</Link>

      {entries.length ? (
        <ul className="flex gap-4">
          {entries.map(([name]) => (
            <li key={name}>
              <Link
                href={{
                  pathname: `/${name}/1`,
                }}
                className="capitalize"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

export default Navigation;
