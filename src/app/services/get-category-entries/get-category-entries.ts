// import { unstable_cacheTag as cacheTag } from 'next/cache';
import { z } from 'zod';

import fetcher from '../../helpers/fetcher';

const responseMessage = z.union([z.literal('ok'), z.literal('error'), z.literal('fail')]);

const categoryWithoutPaginationPayloadSchema = z.object({
  message: responseMessage,
  result: z.array(z.unknown()),
});
const categoryWithPaginationPayloadSchema = z.object({
  message: responseMessage,
  total_records: z.number(),
  total_pages: z.number(),
  previous: z.string().nullable(),
  next: z.string().nullable(),
  results: z.array(z.unknown()),
});

const categoryPayloadSchema = z
  .union([categoryWithoutPaginationPayloadSchema, categoryWithPaginationPayloadSchema])
  .transform((schema) => {
    if ('result' in schema) {
      return {
        entries: schema.result,
      };
    }

    return {
      entries: schema.results,
      pagination: {
        totalRecords: schema.total_records,
        totalPages: schema.total_pages,
        previous: schema.previous,
        next: schema.next,
      },
    };
  });

type CategoryPayloadIn = z.input<typeof categoryPayloadSchema>;
type CategoryPayload = z.output<typeof categoryPayloadSchema>;

const getCategoryEntries = (category: string, pageNumber: string): Promise<CategoryPayload> => {
  // 'use cache';
  // cacheTag('category-entries', category, pageNumber);

  return fetcher(
    `https://swapi.tech/api/${category}?page=${pageNumber}&limit=10`,
    categoryPayloadSchema,
  );
};

export default getCategoryEntries;
export { categoryPayloadSchema, type CategoryPayloadIn, type CategoryPayload };
