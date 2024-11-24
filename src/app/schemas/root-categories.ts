import { z } from 'zod';

const rootCategoriesSchema = z.record(z.string().min(1), z.string().url());

export default rootCategoriesSchema;
export type RootCategories = z.infer<typeof rootCategoriesSchema>;
