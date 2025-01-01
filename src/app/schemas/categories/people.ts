import { z } from 'zod';

const peopleSchema = z.object({
  name: z.string(),
  uid: z.string(),
  url: z.string(),
});

export default peopleSchema;
export type People = z.infer<typeof peopleSchema>;
