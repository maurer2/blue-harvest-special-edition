import Link from 'next/link';
import type { ReactElement } from 'react';

import type { RootCategoryEntriesPayload } from '../../services/get-root-entries/get-root-entries';
import NavigationEntry from '../NavigationEntry';

type MastheadProps = {
  categoriesPromise?: Promise<RootCategoryEntriesPayload>;
};

async function Masthead({ categoriesPromise }: MastheadProps): Promise<ReactElement> {
  const categories = await categoriesPromise?.catch(() => undefined);
  const entries = typeof categories !== 'undefined' ? Object.entries(categories.result) : [];

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
        Blue Harvest{' '}
        <span>
          (
          <abbr className="no-underline" title="Special Edition">
            SE
          </abbr>
          )
        </span>
      </Link>

      {entries.length ? (
        <nav className="flex flex-wrap gap-6 sm:flex-nowrap">
          {entries.map(([name]) => (
            <NavigationEntry name={name} key={name} />
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export default Masthead;
