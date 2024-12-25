import { z } from 'zod';

import detailsWrapperSchema from '../details-wrapper';

const vehiclesSchema = detailsWrapperSchema.extend({
  result: detailsWrapperSchema.shape.result.extend({
    properties: z.object({
      url: z.string().url(),
      created: z.string(), // "2024-12-25T19:22:05.408Z"
      edited: z.string(), // "2024-12-25T19:22:05.408Z"
      name: z.string(),

      model: z.string(),
      vehicle_class: z.string(),
      manufacturer: z.string(),
      cost_in_credits: z.string(),
      length: z.string(),
      crew: z.string(),
      passengers: z.string(),
      max_atmosphering_speed: z.string(),
      cargo_capacity: z.string(),
      consumables: z.string(),
      films: z.array(z.unknown()),
      pilots: z.array(z.unknown()),
    }),
  }),
});

export default vehiclesSchema;
export type Vehicle = z.infer<typeof vehiclesSchema>;
