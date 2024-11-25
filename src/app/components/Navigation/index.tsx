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
      className="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_1fr]"
      aria-label="Main navigation with Home button"
    >
      <h1>
        <Link href="/">Blue Harvest (SE)</Link>
      </h1>

      {entries.length ? (
        <ul className="flex flex-wrap gap-4 sm:flex-nowrap" role="list">
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
