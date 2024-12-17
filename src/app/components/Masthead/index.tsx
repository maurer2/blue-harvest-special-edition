import Link from 'next/link';
import type { ReactElement } from 'react';

import NavigationEntry from '../NavigationEntry';

type MastheadProps = {
  categories?: Record<string, string>;
};

async function Masthead({ categories }: MastheadProps): Promise<ReactElement> {
  const navigationEntries = typeof categories !== 'undefined' ? Object.entries(categories) : [];

  return (
    <header
      role="banner"
      className="grid grid-cols-1 gap-6 sm:grid-cols-[max-content_1fr] bg-teal-300 p-6"
    >
      <Link
        href="/"
        title="Go back to the homepage"
        className="capitalize underline-offset-4 outline-none hover:text-white hover:underline focus-visible:text-white focus-visible:underline"
      >
        Blue Harvest (SE)
      </Link>

      {navigationEntries.length ? (
        <nav className="flex flex-wrap gap-6 sm:flex-nowrap">
          {navigationEntries.map(([name]) => (
            <NavigationEntry name={name} key={name} />
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export default Masthead;
