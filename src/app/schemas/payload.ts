import { z } from 'zod';

const payloadSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z
    .array(
      z
        .object({
          name: z.string(),
        })
        .passthrough(),
    )
    .or(
      z.array(
        z
          .object({
            title: z.string(),
          })
          .passthrough(),
      ),
    ),
});

export default payloadSchema;
export type Payload = z.infer<typeof payloadSchema>;
