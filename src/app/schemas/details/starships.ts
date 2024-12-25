import { z } from 'zod';

import detailsWrapperSchema from '../details-wrapper';

const starshipsSchema = detailsWrapperSchema.extend({
  result: detailsWrapperSchema.shape.result.extend({
    properties: z.object({
      url: z.string().url(),
      created: z.string(), // "2024-12-25T19:22:05.408Z"
      edited: z.string(), // "2024-12-25T19:22:05.408Z"
      name: z.string(),

      model: z.string(),
      starship_class: z.string(),
      manufacturer: z.string(),
      cost_in_credits: z.string(),
      length: z.string(),
      crew: z.string(),
      passengers: z.string(),
      max_atmosphering_speed: z.string(),
      hyperdrive_rating: z.string(),
      cargo_capacity: z.string(),
      consumables: z.string(),
      pilots: z.array(z.unknown()),
    }),
  }),
});

export default starshipsSchema;
export type Starship = z.infer<typeof starshipsSchema>;
