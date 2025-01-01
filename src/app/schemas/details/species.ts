import { z } from 'zod';

import detailsWrapperSchema from '../details-wrapper';

const speciesSchema = detailsWrapperSchema.extend({
  result: detailsWrapperSchema.shape.result.extend({
    properties: z.object({
      url: z.string().url(),
      created: z.string(), // "2024-12-25T19:22:05.408Z"
      edited: z.string(), // "2024-12-25T19:22:05.408Z"
      name: z.string(),

      classification: z.string(),
      designation: z.string(),
      average_height: z.string(),
      average_lifespan: z.string(),
      hair_colors: z.string(),
      skin_colors: z.string(),
      eye_colors: z.string(),
      homeworld: z.string().url(),
      language: z.string(),
      people: z.array(z.string().url()),
    }),
  }),
});

export default speciesSchema;
export type Species = z.infer<typeof speciesSchema>;
