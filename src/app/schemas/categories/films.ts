import { z } from 'zod';

const filmsSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string(),
});

export default filmsSchema;
export type Film = z.infer<typeof filmsSchema>;
