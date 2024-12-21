import { z } from 'zod';

const planetsSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string(),
});

export default planetsSchema;
export type Planet = z.infer<typeof planetsSchema>;
