'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

type ItemDetails = {
  itemDetailsPromise: Promise<unknown>;
};

export default function ItemDetails({ itemDetailsPromise }: ItemDetails) {
  const router = useRouter();
  const details = use(itemDetailsPromise);

  return (
    <div>
      <code className="whitespace-pre-wrap block">{JSON.stringify(details, null, 4)}</code>

      <button onClick={router.back} className="mt-8">
        Go back
      </button>
    </div>
  );
}
