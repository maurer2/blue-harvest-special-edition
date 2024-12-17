import { z } from 'zod';

const rootCategoriesSchema = z.object({
  message: z.union([z.literal('ok'), z.literal('error'), z.literal('fail')]),
  result: z.record(z.string().min(1), z.string().url()),
});
// .passthrough();

export default rootCategoriesSchema;
export type RootCategories = z.infer<typeof rootCategoriesSchema>;
