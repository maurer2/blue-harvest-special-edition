import { type ReactElement } from 'react';

import CategoryDetailsListEntry from '../CategoryDetailsListEntry';

type CategoryDetailsHeaderProps = {
  entries: unknown[];
  category: string;
};

async function CategoryDetailsList({
  entries,
  category,
}: CategoryDetailsHeaderProps): Promise<ReactElement> {
  return (
    <ol
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-stretch"
      role="grid"
      aria-label="List of results"
    >
      {entries.map((entry) => {
        const entryObject = entry as Record<string, unknown>;
        const title = entryObject?.name as string;

        return (
          <li className="flex" key={title} role="gridcell">
            <CategoryDetailsListEntry details={entry} category={category} />
          </li>
        );
      })}
    </ol>
  );
}

export default CategoryDetailsList;
