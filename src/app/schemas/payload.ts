import { z } from 'zod';

const responseMessage = z.union([z.literal('ok'), z.literal('error'), z.literal('fail')]);

const payloadSchema = z.union([
  // without pagination, e.g. https://swapi.tech/api/films
  // todo: merge with root-categories
  z.object({
    message: responseMessage,
    // singular
    result: z.array(z.any()),
  }),
  // with pagination, e.g. https://swapi.tech/api/people
  z.object({
    message: responseMessage,
    total_records: z.number(),
    total_pages: z.number(),
    previous: z.string().nullable(),
    next: z.string().nullable(),
    // plural
    results: z.array(z.any()),
  }),
]);

export default payloadSchema;
export type Payload = z.infer<typeof payloadSchema>;
