import { type ReactElement, lazy } from 'react';

import DetailsToggle from '../DetailsToggle';

type CategoryDetailsHeaderProps = {
  entries: unknown[];
  componentName: string;
  hasExpandedParameter: boolean;
};

async function CategoryDetailsList({
  entries,
  componentName,
  hasExpandedParameter,
}: CategoryDetailsHeaderProps): Promise<ReactElement> {
  const ComponentForCategory = lazy(() => import(`../../components/${componentName}`));

  return (
    <ol
      className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 has-[*>details[open]]:items-stretch"
      role="grid"
      aria-label="List of results"
    >
      {entries.map((entry, index) => {
        const entryObject = entry as Record<string, unknown>;
        const title = (entryObject?.name as string) || (entryObject?.properties?.title as string);

        return (
          <li className="contents" key={title} role="gridcell">
            <DetailsToggle
              toggleText={title}
              hasForceExpand={hasExpandedParameter}
              key={hasExpandedParameter.toString()}
            >
              <ComponentForCategory details={entry} index={index} />
            </DetailsToggle>
          </li>
        );
      })}
    </ol>
  );
}

export default CategoryDetailsList;
