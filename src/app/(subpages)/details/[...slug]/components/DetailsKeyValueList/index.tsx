import { Fragment, type ReactElement } from 'react';

type DetailsKeyValueListProps = {
  listLabel: string;
  listName: string;
  details: Array<{ name: string; value: string | string[] }>;
};

export default function DetailsKeyValueList({
  listLabel,
  listName,
  details,
}: DetailsKeyValueListProps): ReactElement | null {
  if (!details.length) {
    return null;
  }

  return (
    <dl
      role="list"
      className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-4 gap-y-2 mb-4 bg-gray-200 p-4"
      aria-label={listLabel}
    >
      {details.map(({ name, value }) => {
        const nameAsId = name.toLowerCase().replace(/\s/g, '-');
        const entryLabel = `${listName}-${nameAsId}`;
        const valueAsString = Array.isArray(value) ? value.join(', ') : value;

        return (
          <Fragment key={name}>
            <dt id={entryLabel}>{name}</dt>
            <dd aria-labelledby={entryLabel}>{valueAsString}</dd>
          </Fragment>
        );
      })}
    </dl>
  );
}
