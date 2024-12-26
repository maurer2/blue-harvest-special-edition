'use client';

import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { use } from 'react';

import type { Film } from '../../../../../schemas/details/films';

type FilmsDetailsProps = {
  itemDetailsPromise: Promise<Film>;
};

export default function FilmsDetails({ itemDetailsPromise }: FilmsDetailsProps): ReactElement {
  const details = use(itemDetailsPromise);
  const router = useRouter();

  const { title } = details.result.properties;

  return (
    <article>
      <h2>{title}</h2>

      <code className="whitespace-pre-wrap block">{JSON.stringify(details, null, 4)}</code>

      <button
        onClick={router.back}
        className="mt-8 flex items-center border p-4 px-4 py-2 outline-none hover:border-teal-300 hover:bg-transparent hover:text-teal-300 focus-visible:border-teal-300 focus-visible:text-teal-300"
      >
        Go back
      </button>
    </article>
  );
}
