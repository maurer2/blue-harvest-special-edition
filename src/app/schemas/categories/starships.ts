import { z } from 'zod';

const starshipsSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string(),
});

export default starshipsSchema;
export type Starship = z.infer<typeof starshipsSchema>;
