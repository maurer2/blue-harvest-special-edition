import Link from 'next/link';
import type { ReactElement } from 'react';
import { z } from 'zod';

const detailsEntrySchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string(),
});

type PlanetDetailsProps = {
  details: unknown;
  category: string;
};

async function CategoryDetailsListEntry({
  details,
  category,
}: PlanetDetailsProps): Promise<ReactElement> {
  const entryDetails = detailsEntrySchema.safeParse(details);

  if (!entryDetails.success) {
    return <p>Details couldn't be loaded.</p>;
  }

  const { uid, name } = entryDetails.data;

  return (
    <Link
      className="flex border p-4 text-center justify-center items-center px-4 py-2 grow outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      href={`/details/${category}/${uid}`}
    >
      {name}
    </Link>
  );
}

export default CategoryDetailsListEntry;
