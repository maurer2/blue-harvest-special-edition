import { z } from 'zod';

const pageSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.any()),
});

export default pageSchema;
export type Page = z.infer<typeof pageSchema>;
