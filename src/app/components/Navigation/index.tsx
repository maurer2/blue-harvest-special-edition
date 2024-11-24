import Link from 'next/link';
import type { ReactElement } from 'react';

type NavigationProps = {
  categories: Record<string, string> | null;
};

function NavigationLoading() {
  const entries = Array.from({ length: 5 }, (_, index) => index);

  return (
    <nav className="grid grid-cols-[auto_auto_1fr] gap-4">
      <h1>Blue Harvest</h1>
      <Link href="/">Home</Link>

      <ul className="animate-pulse" aria-hidden>
        {entries.map((name) => (
          <li key={name}>
            <span>Entry</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

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
                  pathname: `/${name}`,
                  query: { p: '1' },
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
export { NavigationLoading };
