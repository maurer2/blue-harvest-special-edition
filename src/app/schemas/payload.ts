import { z } from 'zod';

const payloadSchema = z.union([
  // without pagination, e.g. https://swapi.tech/api/films
  // todo: merge with root-categories
  z.object({
    message: z.union([z.literal('ok'), z.literal('error'), z.literal('fail')]),
    // singular
    result: z.record(z.string().min(1), z.string().url()),
  }),
  // with pagination, e.g. https://swapi.tech/api/people
  z.object({
    total_records: z.number(),
    total_pages: z.number(),
    previous: z.string().nullable(),
    next: z.string().nullable(),
    // plural
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
  }),
]);

export default payloadSchema;
export type Payload = z.infer<typeof payloadSchema>;
