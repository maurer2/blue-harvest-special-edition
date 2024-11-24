import Link from 'next/link';
import type { ReactElement } from 'react';
import NavigationEntry from '../NavigationEntry';

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
              <NavigationEntry name={name} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Navigation;
