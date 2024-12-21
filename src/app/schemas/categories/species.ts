import { z } from 'zod';

const speciesSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export default speciesSchema;
export type Species = z.infer<typeof speciesSchema>;
