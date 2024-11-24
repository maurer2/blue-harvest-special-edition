import Link from 'next/link';

import fetcher from '../../../helpers/fetcher';
import peopleSchema, { type People } from '../../../schemas/people';

type PeopleProps = {
  category: string;
  page: string;
};

export default async function People({ category, page }: PeopleProps) {
  let response: People | null = null;
  let nextPage: string | null = null;
  let previousPage: string | null = null;

  try {
    response = await fetcher(`https://swapi.dev/api/${category}?page=${page}`, peopleSchema);

    nextPage = response?.next ?? null;
    previousPage = response?.previous ?? null;
  } catch {
    response = null;
    console.warn("Couldn't load page");
  }

  const hasNextPage = nextPage !== null;
  const hasPrevPage = previousPage !== null;
  const currentPageAsNumber = parseInt(page, 10);

  return (
    <article>
      <div className="grid grid-cols-2">
        <h2 className="col-span-full">
          Category: <span className="capitalize">{category}</span> (page {page})
        </h2>
        <Link href={`/${category}/${currentPageAsNumber - 1}`} inert={!hasPrevPage}>
          Previous page
        </Link>
        <Link href={`/${category}/${currentPageAsNumber + 1}`} inert={!hasNextPage}>
          Next page
        </Link>
      </div>

      <pre>{response !== null ? <code>{JSON.stringify(response, null, 4)}</code> : null}</pre>
    </article>
  );
}
