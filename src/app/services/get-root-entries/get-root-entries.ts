// import { unstable_cacheTag as cacheTag } from 'next/cache';
import { z } from 'zod';

import fetcher from '../../helpers/fetcher';

const responseMessage = z.union([z.literal('ok'), z.literal('error'), z.literal('fail')]);

const rootCategoryEntriesPayloadSchema = z.object({
  message: responseMessage,
  result: z.record(z.string().min(1), z.string().url()),
});

type RootCategoryEntriesPayload = z.infer<typeof rootCategoryEntriesPayloadSchema>;

const getRootCategoryEntries = (): Promise<RootCategoryEntriesPayload> => {
  // 'use cache';
  // cacheTag('root-category-entries');

  return fetcher(`https://swapi.tech/api`, rootCategoryEntriesPayloadSchema);
};

export default getRootCategoryEntries;
export { rootCategoryEntriesPayloadSchema, type RootCategoryEntriesPayload };
