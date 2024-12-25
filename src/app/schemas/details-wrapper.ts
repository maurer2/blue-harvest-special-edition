import { z } from 'zod';

export const detailsWrapperSchema = z.object({
  message: z.string(),
  result: z.object({
    description: z.string(),
    uid: z.string(),
    properties: z.unknown(),
  }),
  // .passthrough(),
});

export default detailsWrapperSchema;
export type DetailsWrapper = z.infer<typeof detailsWrapperSchema>;
