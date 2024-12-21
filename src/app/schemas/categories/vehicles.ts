import { z } from 'zod';

const vehiclesSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string(),
});

export default vehiclesSchema;
export type Vehicle = z.infer<typeof vehiclesSchema>;
