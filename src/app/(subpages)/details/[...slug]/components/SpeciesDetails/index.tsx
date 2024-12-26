'use client';

import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { use } from 'react';

import type { Species } from '../../../../../schemas/details/species';

type SpeciesDetailsProps = {
  itemDetailsPromise: Promise<Species>;
};

export default function SpeciesDetails({ itemDetailsPromise }: SpeciesDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const { name } = details.result.properties;

  return (
    <article>
      <h2>{name}</h2>

      <code className="whitespace-pre-wrap block">{JSON.stringify(details, null, 4)}</code>

      <button
        onClick={router.back}
        className="mt-8 flex items-center border px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
