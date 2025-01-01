import { z } from 'zod';

import detailsWrapperSchema from '../details-wrapper';

const planetsSchema = detailsWrapperSchema.extend({
  result: detailsWrapperSchema.shape.result.extend({
    properties: z.object({
      url: z.string().url(),
      created: z.string(), // "2024-12-25T19:22:05.408Z"
      edited: z.string(), // "2024-12-25T19:22:05.408Z"
      name: z.string(),
      diameter: z.string(),
      rotation_period: z.string(),
      orbital_period: z.string(),
      gravity: z.string(),
      population: z.string(),
      climate: z.string(),
      terrain: z.string(),
      surface_water: z.string(),
    }),
  }),
});

export default planetsSchema;
export type Planet = z.infer<typeof planetsSchema>;
