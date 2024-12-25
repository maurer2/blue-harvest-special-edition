import { z } from 'zod';

import detailsWrapperSchema from '../details-wrapper';

const filmsSchema = detailsWrapperSchema.extend({
  result: detailsWrapperSchema.shape.result.extend({
    properties: z.object({
      url: z.string().url(),
      created: z.string(), // "2024-12-25T19:22:05.408Z"
      edited: z.string(), // "2024-12-25T19:22:05.408Z"

      title: z.string(),
      episode_id: z.number(),
      opening_crawl: z.string(),
      director: z.string(),
      producer: z.string(),
      release_date: z.string(), // "1980-05-17",
      characters: z.array(z.string()),
      planets: z.array(z.string().url()),
      starships: z.array(z.string().url()),
      vehicles: z.array(z.string().url()),
      species: z.array(z.string().url()),
    }),
  }),
});

export default filmsSchema;
export type Film = z.infer<typeof filmsSchema>;
