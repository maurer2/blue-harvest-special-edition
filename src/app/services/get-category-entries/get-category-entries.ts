// import { unstable_cacheTag as cacheTag } from 'next/cache';
import { z } from 'zod';

import fetcher from '../../helpers/fetcher';

const responseMessage = z.union([z.literal('ok'), z.literal('error'), z.literal('fail')]);

const payloadWithoutPaginationSchema = z.object({
  message: responseMessage,
  result: z.array(z.unknown()),
});
const payloadWithPaginationSchema = z.object({
  message: responseMessage,
  total_records: z.number(),
  total_pages: z.number(),
  previous: z.string().nullable(),
  next: z.string().nullable(),
  results: z.array(z.unknown()),
});

const payloadSchema = z
  .union([payloadWithoutPaginationSchema, payloadWithPaginationSchema])
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

type PayloadIn = z.input<typeof payloadSchema>;
type Payload = z.output<typeof payloadSchema>;

const getCategoryEntries = (category: string, pageNumber: string): Promise<Payload> => {
  // 'use cache';
  // cacheTag('category-entries', category, pageNumber);

  return fetcher(`https://swapi.tech/api/${category}?page=${pageNumber}&limit=10`, payloadSchema);
};

export default getCategoryEntries;
export { payloadSchema };
export type { PayloadIn, Payload };
