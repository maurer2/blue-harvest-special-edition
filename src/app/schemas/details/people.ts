import { z } from 'zod';

import detailsWrapperSchema from '../details-wrapper';

const peopleSchema = detailsWrapperSchema.extend({
  result: detailsWrapperSchema.shape.result.extend({
    properties: z.object({
      url: z.string().url(),
      created: z.string(), // "2024-12-25T19:22:05.408Z"
      edited: z.string(), // "2024-12-25T19:22:05.408Z"
      name: z.string(),

      birth_year: z.string(),
      eye_color: z.string(),
      gender: z.string(),
      hair_color: z.string(),
      height: z.string(),
      homeworld: z.string().url(),
      mass: z.string(),
      skin_color: z.string(),
    }),
  }),
});

export default peopleSchema;
export type People = z.infer<typeof peopleSchema>;
