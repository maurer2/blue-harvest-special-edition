import Link from 'next/link';
import type { ReactElement } from 'react';

import NavigationEntry from '../NavigationEntry';

type NavigationProps = {
  categories: Record<string, string> | null;
};

async function Navigation({ categories }: NavigationProps): Promise<ReactElement> {
  const entries = categories !== null ? Object.entries(categories) : [];

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-[max-content_1fr]"
      aria-label="Main navigation with Home button"
    >
      <h1>
        <Link href="/" className="underline-offset-4 hover:underline">
          Blue Harvest (SE)
        </Link>
      </h1>

      {entries.length ? (
        <ul className="flex flex-wrap gap-6 sm:flex-nowrap" role="list">
          {entries.map(([name]) => (
            <li key={name} role="listitem">
              <NavigationEntry name={name} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default Navigation;
