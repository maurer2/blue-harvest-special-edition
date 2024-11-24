import { type z } from 'zod';

import fetcher from '../../helpers/fetcher';

type UseCategoryDataProps = {
  category: string;
  page: string;
  schema: z.ZodTypeAny;
};

export default async function useCategoryData({ category, page, schema }: UseCategoryDataProps) {
  let response: z.infer<typeof schema> | null = null;
  let nextPage: string | null = null;
  let previousPage: string | null = null;

  try {
    response = await fetcher(`https://swapi.dev/api/${category}?page=${page}`, schema);

    nextPage = response?.next ?? null;
    previousPage = response?.previous ?? null;
  } catch {
    response = null;
    console.warn(`Couldn't load page ${page} for ${category}`);
  }

  const currentPageAsNumber = parseInt(page, 10);
  const hasNextPage = nextPage !== null;
  const hasPrevPage = previousPage !== null;

  return [
    response as z.infer<typeof schema>,
    currentPageAsNumber,
    hasNextPage,
    hasPrevPage,
  ] as const;
}
